"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { completeOnboarding } from "@/services/api/user.service";
import OnboardingFlow, { OnboardingData } from "@/features/onboarding/OnboardingFlow";
import { toast } from "sonner";

export default function OnboardingPage() {
    const router = useRouter();
    const { refreshProfile } = useAuth();

    const handleComplete = async (data: OnboardingData) => {
        try {
            console.log("Onboarding data received:", data);

            // Map onboarding data to API format
            const apiData = {
                hearingStatus: data.identity, // Maps to 'deaf', 'hard_of_hearing', 'hearing', 'coda'
                lsmVariant: data.regional,
                ageRange: data.demographics.ageRange,
                gender: data.demographics.gender,
            };

            console.log("Sending to API:", apiData);

            // Call backend API
            const response = await completeOnboarding(apiData);

            console.log("API response:", response);

            toast.success('¡Onboarding completado!');

            // Refresh user profile to update onboardingCompleted status
            await refreshProfile();

            // Route guard will automatically redirect to dashboard
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Onboarding error:", error);

            // Handle specific errors
            if (error.response?.status === 403) {
                toast.error('El onboarding ya ha sido completado');
                router.push("/dashboard");
            } else if (error.response?.status === 400) {
                console.error("Validation error details:", error.response?.data);
                toast.error('Datos inválidos. Por favor verifica la información.');
            } else {
                toast.error('Error al completar el onboarding. Inténtalo de nuevo.');
            }
        }
    };

    return <OnboardingFlow onComplete={handleComplete} />;
}
