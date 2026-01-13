"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import OnboardingFlow, { type OnboardingData } from "@/features/onboarding/OnboardingFlow";
import Dashboard from "@/features/dashboard/Dashboard";

type AppMode = "login" | "register" | "onboarding" | "app" | "transitioningToRegister" | "transitioningToLogin";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<AppMode>("login");

  const handleSwitchToRegister = () => {
    setMode("transitioningToRegister");
    setTimeout(() => {
      setMode("register");
    }, 600);
  };

  const handleSwitchToLogin = () => {
    setMode("transitioningToLogin");
    setTimeout(() => {
      setMode("login");
    }, 600);
  };

  const handleRegisterComplete = () => {
    // After successful registration, go to onboarding
    setMode("onboarding");
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    // Save onboarding data and proceed to dashboard
    console.log("Onboarding data:", data);
    // TODO: Save to backend/localStorage

    // Redirect to dashboard route
    router.push("/dashboard");
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#161121]">
      <AnimatePresence mode="wait">
        {(mode === "login" || mode === "transitioningToRegister") ? (
          <Login
            key="login"
            onSwitchToRegister={handleSwitchToRegister}
            isTransitioning={mode === "transitioningToRegister"}
          />
        ) : mode === "onboarding" ? (
          <OnboardingFlow
            key="onboarding"
            onComplete={handleOnboardingComplete}
          />
        ) : mode === "app" ? (
          <Dashboard key="app" />
        ) : (
          <Register
            key="register"
            onSwitchToLogin={handleSwitchToLogin}
            onRegisterComplete={handleRegisterComplete}
            isTransitioning={mode === "transitioningToLogin"}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
