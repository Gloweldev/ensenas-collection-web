'use client';

import { useState, useCallback, useRef } from 'react';
import { useAuth } from '@/context/auth-context';
import { getApiUrl } from '@/config/api';

export interface StreamingRecording {
    id: string;                     // Database record ID
    s3Key: string;                  // S3 object key
    uploadUrl?: string;             // Presigned PUT URL
    previewUrl: string;             // Presigned GET URL for preview
    localBlobUrl?: string;          // Local blob URL (temporary, for immediate preview)
    uploadStatus: 'pending' | 'uploading' | 'completed' | 'error';
    uploadProgress: number;
    error?: string;
    index: number;                  // Recording sequence number
}

interface UploadSingleResponse {
    success: boolean;
    data: {
        recordingId: string;
        uploadUrl: string;
        downloadUrl: string;
        key: string;
    };
}

interface VideoMetadata {
    fps?: number;
    width?: number;
    height?: number;
    deviceLabel?: string;
    browser?: string;
    mimeType?: string;
    userAgent?: string;
}

interface UseStreamingUploadOptions {
    assignmentId: number | null;
    metadata?: VideoMetadata;
}

interface UseStreamingUploadReturn {
    recordings: StreamingRecording[];
    uploadRecording: (blob: Blob, index: number) => Promise<StreamingRecording | null>;
    deleteRecording: (recordingId: string) => Promise<boolean>;
    confirmAllRecordings: () => Promise<boolean>;
    clearRecordings: () => void;
    isUploading: boolean;
    overallProgress: number;
    allCompleted: boolean;
    getRecordingIds: () => string[];
    restoreRecordings: (recordings: StreamingRecording[]) => void;
}

/**
 * Hook for streaming upload of recordings
 * Each recording is uploaded immediately after capture
 */
export function useStreamingUpload({
    assignmentId,
    metadata,
}: UseStreamingUploadOptions): UseStreamingUploadReturn {
    const { user } = useAuth();
    const [recordings, setRecordings] = useState<StreamingRecording[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const uploadingCountRef = useRef(0);

    /**
     * Upload a single recording blob
     */
    const uploadRecording = useCallback(async (blob: Blob, index: number): Promise<StreamingRecording | null> => {
        if (!user || !assignmentId) {
            console.error('Missing user or assignmentId');
            return null;
        }

        const token = await user.getIdToken();

        // Create local preview immediately
        const localBlobUrl = URL.createObjectURL(blob);

        // Create placeholder recording
        const placeholder: StreamingRecording = {
            id: `temp-${Date.now()}`,
            s3Key: '',
            previewUrl: localBlobUrl,
            localBlobUrl,
            uploadStatus: 'pending',
            uploadProgress: 0,
            index,
        };

        setRecordings(prev => [...prev, placeholder]);
        const recordingIndex = recordings.length;

        try {
            uploadingCountRef.current++;
            setIsUploading(true);

            // Update status to uploading
            setRecordings(prev => prev.map((r, i) =>
                i === recordingIndex ? { ...r, uploadStatus: 'uploading' as const } : r
            ));

            // Get presigned URLs from backend
            const initResponse = await fetch(getApiUrl('/recordings/upload-single'), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assignmentId,
                    contentType: blob.type || 'video/webm',
                    metadata,
                    index,
                }),
            });

            if (!initResponse.ok) {
                throw new Error('Failed to initialize upload');
            }

            const initData: UploadSingleResponse = await initResponse.json();
            const { recordingId, uploadUrl, downloadUrl, key } = initData.data;

            // Update recording with real data
            setRecordings(prev => prev.map((r, i) =>
                i === recordingIndex ? {
                    ...r,
                    id: recordingId,
                    s3Key: key,
                    uploadUrl,
                    previewUrl: downloadUrl,
                } : r
            ));

            // Upload to S3
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        setRecordings(prev => prev.map((r, i) =>
                            i === recordingIndex ? { ...r, uploadProgress: progress } : r
                        ));
                    }
                });

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve();
                    } else {
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                });

                xhr.addEventListener('error', () => {
                    reject(new Error('Upload failed'));
                });

                xhr.open('PUT', uploadUrl);
                xhr.setRequestHeader('Content-Type', blob.type || 'video/webm');
                xhr.send(blob);
            });

            // Mark as completed - KEEP localBlobUrl for preview until session ends
            // The previewUrl (presigned GET) may have timing issues with MinIO
            const completedRecording: StreamingRecording = {
                id: recordingId,
                s3Key: key,
                previewUrl: downloadUrl,
                localBlobUrl, // Keep local blob as primary preview source
                uploadStatus: 'completed',
                uploadProgress: 100,
                index,
            };

            setRecordings(prev => prev.map((r, i) =>
                i === recordingIndex ? completedRecording : r
            ));

            // Don't revoke localBlobUrl here - keep it for preview
            // It will be cleaned up when clearRecordings() is called

            return completedRecording;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Upload failed';

            setRecordings(prev => prev.map((r, i) =>
                i === recordingIndex ? {
                    ...r,
                    uploadStatus: 'error' as const,
                    error: errorMessage,
                } : r
            ));

            return null;
        } finally {
            uploadingCountRef.current--;
            if (uploadingCountRef.current === 0) {
                setIsUploading(false);
            }
        }
    }, [user, assignmentId, metadata, recordings.length]);

    /**
     * Delete a recording from S3 and database
     */
    const deleteRecording = useCallback(async (recordingId: string): Promise<boolean> => {
        if (!user) return false;

        // Check if this is a temporary (local-only) ID
        const isLocalOnly = recordingId.startsWith('temp-');

        try {
            // Only call API if it's a real database record
            if (!isLocalOnly) {
                const token = await user.getIdToken();

                const response = await fetch(getApiUrl(`/recordings/${recordingId}`), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error('Delete API error:', response.status, errorData);
                    throw new Error('Failed to delete recording');
                }
            }

            // Remove from local state
            setRecordings(prev => {
                const recording = prev.find(r => r.id === recordingId);
                if (recording?.localBlobUrl) {
                    URL.revokeObjectURL(recording.localBlobUrl);
                }
                return prev.filter(r => r.id !== recordingId);
            });

            return true;
        } catch (error) {
            console.error('Delete recording error:', error);
            return false;
        }
    }, [user]);

    /**
     * Confirm all completed recordings
     */
    const confirmAllRecordings = useCallback(async (): Promise<boolean> => {
        if (!user) return false;

        const completedIds = recordings
            .filter(r => r.uploadStatus === 'completed')
            .map(r => r.id);

        if (completedIds.length === 0) return false;

        try {
            const token = await user.getIdToken();

            const response = await fetch(getApiUrl('/recordings/confirm-upload'), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recordingIds: completedIds }),
            });

            return response.ok;
        } catch (error) {
            console.error('Confirm recordings error:', error);
            return false;
        }
    }, [user, recordings]);

    /**
     * Restore recordings from external source (e.g. session recovery)
     */
    const restoreRecordings = useCallback((restoredRecordings: StreamingRecording[]) => {
        setRecordings(restoredRecordings);
    }, []);

    /**
     * Clear all recordings and their blob URLs
     */
    const clearRecordings = useCallback(() => {
        recordings.forEach(r => {
            if (r.localBlobUrl) {
                URL.revokeObjectURL(r.localBlobUrl);
            }
        });
        setRecordings([]);
        setIsUploading(false);
        uploadingCountRef.current = 0;
    }, [recordings]);

    /**
     * Get all recording IDs that were successfully uploaded
     */
    const getRecordingIds = useCallback((): string[] => {
        return recordings
            .filter(r => r.uploadStatus === 'completed')
            .map(r => r.id);
    }, [recordings]);

    // Calculate overall progress
    const overallProgress = recordings.length > 0
        ? Math.round(recordings.reduce((sum, r) => sum + r.uploadProgress, 0) / recordings.length)
        : 0;

    // Check if all uploads completed
    const allCompleted = recordings.length > 0 &&
        recordings.every(r => r.uploadStatus === 'completed');

    return {
        recordings,
        uploadRecording,
        deleteRecording,
        confirmAllRecordings,
        clearRecordings,
        isUploading,
        overallProgress,
        allCompleted,
        getRecordingIds,
        restoreRecordings,
    };
}
