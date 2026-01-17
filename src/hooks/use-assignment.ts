import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { getApiUrl } from '@/config/api';

interface Assignment {
    id: number;
    slug: string;
    category: string;
    videoReferenceUrl: string | null;
    priority: number;
}

interface UseAssignmentReturn {
    assignment: Assignment | null;
    isLoading: boolean;
    error: string | null;
}

export function useAssignment(slug: string): UseAssignmentReturn {
    const { user } = useAuth();
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAssignment = async () => {
            // Wait for user to be authenticated
            if (!user) {
                setIsLoading(true);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const token = await user.getIdToken();
                const response = await fetch(getApiUrl(`/collect/${slug}`), {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Assignment not found');
                    }
                    throw new Error('Failed to fetch assignment');
                }

                const data = await response.json();
                setAssignment(data.data);
            } catch (err) {
                console.error('Error fetching assignment:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAssignment();
    }, [slug, user]);

    return { assignment, isLoading, error };
}
