/**
 * Upload API Service
 * Handles all upload-related API calls
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Get presigned URL for video upload
 * @param token - Firebase ID token
 * @param filename - Original filename
 * @param contentType - MIME type
 * @param signName - Name of the sign being recorded
 */
export const getPresignedUploadUrl = async (
    token: string,
    filename: string,
    contentType: string,
    signName: string
) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/upload/presigned-url`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename,
                contentType,
                signName,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get upload URL');
        }

        const data = await response.json();
        return data.data; // { uploadUrl, key }
    } catch (error) {
        console.error('Failed to get presigned URL:', error);
        throw error;
    }
};

/**
 * Confirm video upload
 * @param token - Firebase ID token
 * @param key - S3 object key
 * @param signName - Name of the sign
 * @param duration - Video duration in seconds
 */
export const confirmVideoUpload = async (
    token: string,
    key: string,
    signName: string,
    duration?: number
) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/upload/confirm`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key,
                signName,
                duration,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to confirm upload');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Failed to confirm upload:', error);
        throw error;
    }
};

/**
 * Upload video directly to presigned URL
 * @param uploadUrl - Presigned PUT URL
 * @param file - Video file blob
 * @param onProgress - Progress callback
 */
export const uploadVideoToStorage = async (
    uploadUrl: string,
    file: Blob,
    onProgress?: (progress: number) => void
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable && onProgress) {
                const progress = (e.loaded / e.total) * 100;
                onProgress(progress);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                resolve();
            } else {
                reject(new Error(`Upload failed with status ${xhr.status}`));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('Upload failed'));
        });

        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
    });
};
