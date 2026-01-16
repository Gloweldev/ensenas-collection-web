"use client";

import { useRouter } from "next/navigation";
import Login from "@/features/auth/Login";

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#161121]">
            <Login
                onSwitchToRegister={() => router.push("/register")}
                isTransitioning={false}
            />
        </div>
    );
}
