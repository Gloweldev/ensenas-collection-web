import { getApiUrl } from '@/config/api';

/**
 * Auth API Service
 * Handles all authentication-related API calls
 */

/**
 * Sync user with backend database
 * @param token - Firebase ID token
 */
export const syncUserWithBackend = async (token: string, termsAcceptedAt?: string) => {
    try {
        const response = await fetch(getApiUrl('/auth/sync'), {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                termsAcceptedAt,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to sync user with backend');
        }

        const data = await response.json();
        return data.data; // Return user profile
    } catch (error) {
        console.error('Backend sync error:', error);
        throw error;
    }
};
