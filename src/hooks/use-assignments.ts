import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { useAuth } from '@/context/auth-context';

export interface Assignment {
    id: number;
    slug: string; // For URL routing: /collect/{slug}
    category: string; // For UI display
    status: 'available' | 'pending' | 'completed';
}

export interface AssignmentsData {
    assignments: Assignment[];
}

export interface UseAssignmentsReturn {
    assignments: Assignment[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Hook for Assignments page - fetches full glossary list with status
 * Endpoint: GET /assignments
 */
export function useAssignments(): UseAssignmentsReturn {
    const { user: authUser, loading: authLoading } = useAuth();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchAssignments = async () => {
        if (!authUser) return;

        try {
            setIsLoading(true);
            setError(null);

            const response = await apiClient.get<{ success: boolean; data: AssignmentsData }>('/assignments');

            if (response.data.success) {
                setAssignments(response.data.data.assignments);
            }
        } catch (err: any) {
            console.error('Error fetching assignments:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && authUser) {
            fetchAssignments();
        } else if (!authLoading && !authUser) {
            setIsLoading(false);
        }
    }, [authUser, authLoading]);

    return {
        assignments,
        isLoading,
        error,
        refetch: fetchAssignments,
    };
}
