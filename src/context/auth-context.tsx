"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { getUserProfile, UserProfile } from '@/services/api/user.service';
import { setCookie, getCookie, removeCookie } from '@/lib/cookies';
import { syncUserWithBackend } from '@/services/api/auth.service';

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signInWithGoogle: (termsAcceptedAt?: string) => Promise<void>;
    signInWithFacebook: (termsAcceptedAt?: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    signInWithGoogle: async () => { },
    signInWithFacebook: async () => { },
    logout: async () => { },
    refreshProfile: async () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false); // Track if Firebase has initialized
    const router = useRouter();
    const pathname = usePathname();

    // Fetch user profile from backend
    const fetchUserProfile = async () => {
        try {
            const profile = await getUserProfile();
            setUserProfile(profile);
            return profile;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    };

    useEffect(() => {
        // Monitor auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log('🔐 Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
            setUser(firebaseUser);

            if (firebaseUser) {
                // Fetch user profile from backend
                const profile = await fetchUserProfile();

                // Route Guard Logic - only execute after initialization
                if (initialized) {
                    const publicPaths = ['/', '/login', '/register'];
                    const isPublicPath = publicPaths.includes(pathname);

                    if (profile) {
                        // If user is onboarded and trying to access login/onboarding
                        if (profile.onboardingCompleted) {
                            if (pathname === '/onboarding' || isPublicPath) {
                                router.replace('/dashboard');
                            }
                        } else {
                            // If user is NOT onboarded, force redirect to onboarding
                            if (pathname !== '/onboarding') {
                                router.replace('/onboarding');
                            }
                        }
                    }
                }
            } else {
                // User is not logged in
                setUserProfile(null);

                // Route Guard - only execute after initialization
                if (initialized) {
                    const protectedPaths = ['/dashboard', '/onboarding', '/collect', '/assignments'];
                    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

                    if (isProtectedPath) {
                        router.replace('/');
                    }
                }
            }

            setLoading(false);
            setInitialized(true); // Mark as initialized after first auth state check
        });

        return () => unsubscribe();
    }, [pathname, router, initialized]);

    const signInWithGoogle = async (termsAcceptedAt?: string) => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            await syncUserWithBackend(token, termsAcceptedAt);
            setCookie('auth_session', 'true'); // Set cookie
            toast.success('¡Bienvenido de vuelta!');
            // Route guard will handle redirect
        } catch (error: any) {
            console.error('Google sign in error:', error);
            toast.error(error.message || 'Error al iniciar sesión con Google');
            throw error;
        }
    };

    const signInWithFacebook = async (termsAcceptedAt?: string) => {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            await syncUserWithBackend(token, termsAcceptedAt);
            setCookie('auth_session', 'true'); // Set cookie
            toast.success('¡Bienvenido de vuelta!');
            // Route guard will handle redirect
        } catch (error: any) {
            console.error('Facebook sign in error:', error);
            toast.error(error.message || 'Error al iniciar sesión con Facebook');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            removeCookie('auth_session'); // Remove cookie
            setUserProfile(null);
            toast.success('Sesión cerrada correctamente');
            router.push('/');
        } catch (error: any) {
            console.error('Logout error:', error);
            toast.error('Error al cerrar sesión');
            throw error;
        }
    };

    const refreshProfile = async () => {
        await fetchUserProfile();
    };

    const value: AuthContextType = {
        user,
        userProfile,
        loading,
        signInWithGoogle,
        signInWithFacebook,
        logout,
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
