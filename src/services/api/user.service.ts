/**
 * User API Service
 * Handles user-related API calls
 */

import apiClient from '@/lib/api';

export interface UserProfile {
    id: string;
    email: string;
    name?: string;
    hearingStatus?: string;
    lsmVariant?: string;
    ageRange?: string;
    gender?: string;
    onboardingCompleted: boolean;
    lastLoginAt?: string;
    role?: string;
    createdAt: string;
}

export interface OnboardingData {
    hearingStatus: string;
    lsmVariant: string;
    ageRange?: string;
    gender?: string;
}

/**
 * Get current user profile
 */
export const getUserProfile = async (): Promise<UserProfile> => {
    const response = await apiClient.get('/users/profile');
    return response.data.data;
};

/**
 * Complete onboarding
 */
export const completeOnboarding = async (data: OnboardingData): Promise<UserProfile> => {
    const response = await apiClient.post('/users/onboarding', data);
    return response.data.data;
};
