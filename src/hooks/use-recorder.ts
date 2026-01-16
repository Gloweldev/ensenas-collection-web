import { useState, useRef, useCallback, RefObject, useMemo } from 'react';
import Webcam from 'react-webcam';

interface RecordingCapture {
    blob: Blob;
    url: string;
    index: number;
    timestamp: number;
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

interface UseRecorderOptions {
    webcamRef: RefObject<Webcam | null>;
    mimeType?: string;
}

interface UseRecorderReturn {
    startRecording: () => void;
    stopRecording: () => Blob | null;
    isRecording: boolean;
    captures: RecordingCapture[];
    clearCaptures: () => void;
    removeCapture: (captureIndex: number) => void;
    currentChunks: Blob[];
    videoMetadata: VideoMetadata | null;
}

export function useRecorder({
    webcamRef,
    mimeType = 'video/webm;codecs=vp9',
}: UseRecorderOptions): UseRecorderReturn {
    const [isRecording, setIsRecording] = useState(false);
    const [captures, setCaptures] = useState<RecordingCapture[]>([]);
    const [currentChunks, setCurrentChunks] = useState<Blob[]>([]);
    const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const captureIndexRef = useRef(0);

    const startRecording = useCallback(() => {
        // Reset chunks
        chunksRef.current = [];
        setCurrentChunks([]);

        if (!webcamRef.current?.stream) {
            console.error('No webcam stream available');
            return;
        }

        // Check for supported mimeType
        const supportedMimeType = MediaRecorder.isTypeSupported(mimeType)
            ? mimeType
            : MediaRecorder.isTypeSupported('video/webm')
                ? 'video/webm'
                : 'video/mp4';

        try {
            const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
                mimeType: supportedMimeType,
            });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    chunksRef.current.push(event.data);
                    setCurrentChunks([...chunksRef.current]);
                }
            };

            mediaRecorder.onstop = () => {
                // Create blob from chunks
                if (chunksRef.current.length > 0) {
                    const blob = new Blob(chunksRef.current, { type: supportedMimeType });
                    const url = URL.createObjectURL(blob);

                    const capture: RecordingCapture = {
                        blob,
                        url,
                        index: captureIndexRef.current++,
                        timestamp: Date.now(),
                    };

                    setCaptures(prev => [...prev, capture]);
                }
                setIsRecording(false);
            };

            mediaRecorder.onerror = (error) => {
                console.error('MediaRecorder error:', error);
                setIsRecording(false);
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start(100);
            setIsRecording(true);

            // Capture video metadata from the stream
            const stream = webcamRef.current.stream;
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                const settings = videoTrack.getSettings();
                setVideoMetadata({
                    width: settings.width,
                    height: settings.height,
                    fps: settings.frameRate,
                    deviceLabel: videoTrack.label,
                    mimeType: supportedMimeType,
                    browser: typeof navigator !== 'undefined' ? navigator.userAgent.split(' ').pop() : undefined,
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
                });
            }
        } catch (error) {
            console.error('Failed to start recording:', error);
        }
    }, [webcamRef, mimeType]);

    const stopRecording = useCallback((): Blob | null => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();

            // Return the blob synchronously if chunks exist
            if (chunksRef.current.length > 0) {
                return new Blob(chunksRef.current, { type: mimeType });
            }
        }
        return null;
    }, [mimeType]);

    const clearCaptures = useCallback(() => {
        // Revoke all object URLs to free memory
        captures.forEach(capture => URL.revokeObjectURL(capture.url));
        setCaptures([]);
        captureIndexRef.current = 0;
    }, [captures]);

    // Remove a specific capture by index
    const removeCapture = useCallback((captureIndex: number) => {
        setCaptures(prev => {
            const captureToRemove = prev.find(c => c.index === captureIndex);
            if (captureToRemove) {
                URL.revokeObjectURL(captureToRemove.url);
            }
            return prev.filter(c => c.index !== captureIndex);
        });
    }, []);

    return {
        startRecording,
        stopRecording,
        isRecording,
        captures,
        clearCaptures,
        removeCapture,
        currentChunks,
        videoMetadata,
    };
}
