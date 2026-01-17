import { useAuth } from '@/context/auth-context';

import { getApiUrl } from '@/config/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface UploadTarget {
    recordingId: number;
    uploadUrl: string;
    key: string;
}

interface InitUploadResponse {
    success: boolean;
    data: {
        recordings: UploadTarget[];
        expiresIn: number;
    };
}

export interface VideoMetadata {
    fps?: number;
    width?: number;
    height?: number;
    deviceLabel?: string;
    browser?: string;
    mimeType?: string;
    userAgent?: string;
}

interface UploadProgress {
    recordingId: number;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    error?: string;
}

export interface RecordingUpload {
    blob: Blob;
    recordingId?: number;
    uploadUrl?: string;
    key?: string;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    error?: string;
}

/**
 * Initialize upload session and get presigned URLs
 */
export async function initializeUpload(
    token: string,
    assignmentId: number,
    count: number,
    contentType: string = 'video/webm',
    metadata?: VideoMetadata
): Promise<UploadTarget[]> {
    const response = await fetch(`${API_BASE_URL}/recordings/init-upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignmentId, count, contentType, metadata }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to initialize upload');
    }

    const data: InitUploadResponse = await response.json();
    return data.data.recordings;
}

/**
 * Upload a single blob to S3 using presigned URL
 */
export async function uploadToS3(
    uploadUrl: string,
    blob: Blob,
    onProgress?: (progress: number) => void
): Promise<void> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable && onProgress) {
                const progress = Math.round((event.loaded / event.total) * 100);
                onProgress(progress);
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
}

/**
 * Confirm uploads are complete
 */
export async function confirmUpload(
    token: string,
    recordingIds: number[]
): Promise<void> {
    const response = await fetch(getApiUrl('/recordings/confirm-upload'), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordingIds }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to confirm upload');
    }
}

/**
 * Upload all recordings with progress tracking
 */
export async function uploadAllRecordings(
    token: string,
    assignmentId: number,
    blobs: Blob[],
    onProgressUpdate: (uploads: RecordingUpload[]) => void,
    metadata?: VideoMetadata
): Promise<number[]> {
    // Initialize upload state
    const uploads: RecordingUpload[] = blobs.map(blob => ({
        blob,
        progress: 0,
        status: 'pending',
    }));
    onProgressUpdate([...uploads]);

    // Get presigned URLs
    const targets = await initializeUpload(token, assignmentId, blobs.length, 'video/webm', metadata);

    // Associate targets with uploads
    targets.forEach((target, index) => {
        if (uploads[index]) {
            uploads[index].recordingId = target.recordingId;
            uploads[index].uploadUrl = target.uploadUrl;
            uploads[index].key = target.key;
        }
    });
    onProgressUpdate([...uploads]);

    // Upload each blob
    const uploadPromises = uploads.map(async (upload, index) => {
        if (!upload.uploadUrl) {
            upload.status = 'error';
            upload.error = 'No upload URL';
            onProgressUpdate([...uploads]);
            return;
        }

        upload.status = 'uploading';
        onProgressUpdate([...uploads]);

        try {
            await uploadToS3(upload.uploadUrl, upload.blob, (progress) => {
                upload.progress = progress;
                onProgressUpdate([...uploads]);
            });

            upload.status = 'completed';
            upload.progress = 100;
            onProgressUpdate([...uploads]);
        } catch (error) {
            upload.status = 'error';
            upload.error = error instanceof Error ? error.message : 'Upload failed';
            onProgressUpdate([...uploads]);
        }
    });

    await Promise.all(uploadPromises);

    // Return the recording IDs that were successfully uploaded
    return uploads
        .filter(u => u.status === 'completed' && u.recordingId)
        .map(u => u.recordingId as number);
}
