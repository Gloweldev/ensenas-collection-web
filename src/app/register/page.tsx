"use client";

import { useRouter } from "next/navigation";
import Register from "@/features/auth/Register";

export default function RegisterPage() {
    const router = useRouter();

    const handleRegisterComplete = () => {
        router.push("/onboarding");
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#161121]">
            <Register
                onSwitchToLogin={() => router.push("/login")}
                onRegisterComplete={handleRegisterComplete}
                isTransitioning={false}
            />
        </div>
    );
}
