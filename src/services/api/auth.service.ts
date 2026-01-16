/**
 * Auth API Service
 * Handles all authentication-related API calls
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Sync user with backend database
 * @param token - Firebase ID token
 */
export const syncUserWithBackend = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/auth/sync`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
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
