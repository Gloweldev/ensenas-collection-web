import axios from 'axios';
import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Auto-attach Firebase token
apiClient.interceptors.request.use(
    async (config) => {
        try {
            // Get current user from Firebase
            const currentUser = auth.currentUser;

            if (currentUser) {
                // Get fresh ID token
                const token = await currentUser.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting auth token:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: Handle auth errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const { status } = error.response;

            // Handle 401 Unauthorized
            if (status === 401) {
                console.error('Unauthorized - Token expired or invalid');
                // Force logout and redirect to login
                await auth.signOut();
                window.location.href = '/';
            }

            // Handle 403 Forbidden (e.g., banned user)
            if (status === 403) {
                console.error('Forbidden - Access denied');
                const errorMessage = error.response.data?.error || 'Access denied';

                // If banned, logout and show message
                if (errorMessage.includes('suspended') || errorMessage.includes('banned')) {
                    await auth.signOut();
                    window.location.href = '/?error=banned';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
