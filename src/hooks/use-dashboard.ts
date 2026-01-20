import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { useAuth } from '@/context/auth-context';

export interface UserProfile {
    name: string;
    streak: number;
    level: string;
    score: number;
}

export interface NextMission {
    id: number;
    slug: string;
    word?: string;
    category: string;
    priority: number;
    status: string;
}

export interface DashboardStats {
    progress: number;
    totalCompleted: number;
    totalGlossary: number;
    pending: number;
    nextMission: NextMission | null;
}

export interface PriorityAssignment {
    id: number;
    slug: string;
    word?: string;
    category: string;
    priority: number;
}

export interface DashboardData {
    user: UserProfile;
    stats: DashboardStats;
    priorityAssignments: PriorityAssignment[];
}

export interface UseDashboardReturn {
    user: UserProfile | null;
    stats: DashboardStats | null;
    priorityAssignments: PriorityAssignment[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook for Dashboard page - fetches user profile and summary stats
 * Endpoint: GET /dashboard/me
 */
export function useDashboard(): UseDashboardReturn {
    const { user: authUser, loading: authLoading } = useAuth();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [priorityAssignments, setPriorityAssignments] = useState<PriorityAssignment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchDashboardData = async () => {
        if (!authUser) return;

        try {
            setIsLoading(true);
            setError(null);

            const response = await apiClient.get<{ success: boolean; data: DashboardData }>('/dashboard/me');

            if (response.data.success) {
                setUser(response.data.data.user);
                setStats(response.data.data.stats);
                setPriorityAssignments(response.data.data.priorityAssignments || []);
            }
        } catch (err: any) {
            console.error('Error fetching dashboard data:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && authUser) {
            fetchDashboardData();
        } else if (!authLoading && !authUser) {
            // If auth done and no user, stop loading (or let auth guard handle redirect)
            setIsLoading(false);
        }
    }, [authUser, authLoading]);

    return {
        user,
        stats,
        priorityAssignments,
        isLoading,
        error,
        refetch: fetchDashboardData,
    };
}
