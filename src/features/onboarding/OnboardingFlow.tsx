"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import OnboardingStep1 from "./OnboardingStep1";
import OnboardingStep2 from "./OnboardingStep2";
import OnboardingStep3 from "./OnboardingStep3";

interface OnboardingFlowProps {
    onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
    identity: string;
    demographics: {
        ageRange: string;
        gender: string;
    };
    regional: string;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [onboardingData, setOnboardingData] = useState<OnboardingData>({
        identity: "",
        demographics: { ageRange: "", gender: "" },
        regional: ""
    });

    const handleStep1Select = (identity: string) => {
        setOnboardingData(prev => ({ ...prev, identity }));
    };

    const handleStep2DataChange = (demographics: { ageRange: string; gender: string }) => {
        setOnboardingData(prev => ({ ...prev, demographics }));
    };

    const handleStep3Select = (regional: string) => {
        setOnboardingData(prev => ({ ...prev, regional }));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Complete onboarding
            onComplete(onboardingData);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canContinue = () => {
        switch (currentStep) {
            case 1:
                return onboardingData.identity !== "";
            case 2:
                return onboardingData.demographics.ageRange !== "" && onboardingData.demographics.gender !== "";
            case 3:
                return onboardingData.regional !== "";
            default:
                return false;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen w-full flex-col overflow-hidden bg-[#0f0b1a]"
        >
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#6324eb]/20 rounded-full blur-[120px] opacity-30" />
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] opacity-20" />
            </div>

            {/* Layout Container */}
            <div className="flex h-full grow flex-col max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8">
                {/* Minimal Header with Logo */}
                <header className="flex items-center justify-between py-6 z-10">



                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Logo width={160} height={50} />
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => onComplete(onboardingData)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1c162e] border border-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-sm font-medium"
                    >
                        <span className="hidden sm:inline">Guardar y Salir</span>
                        <span className="sm:hidden">Salir</span>
                    </motion.button>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col justify-center items-center py-8 sm:py-12 relative z-0">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <OnboardingStep1
                                    onSelect={handleStep1Select}
                                    selectedIdentity={onboardingData.identity}
                                />
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <OnboardingStep2
                                    onDataChange={handleStep2DataChange}
                                    initialData={onboardingData.demographics}
                                />
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                            >
                                <OnboardingStep3
                                    onSelect={handleStep3Select}
                                    selectedRegional={onboardingData.regional}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* Footer / Navigation Actions */}
                <footer className="py-6 border-t border-white/5 flex justify-between items-center z-10 mt-auto">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="px-6 py-3 rounded-xl text-slate-500 font-medium hover:text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Atrás
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!canContinue()}
                        className="group relative px-8 py-3.5 rounded-xl bg-[#6324eb] hover:bg-[#8b5cf6] text-white font-bold transition-all shadow-lg hover:shadow-[0_0_20px_rgba(99,36,235,0.5)] flex items-center gap-2 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:bg-[#6324eb]"
                    >
                        <span className="relative z-10">
                            {currentStep === 3 ? "Inicializar Motor" : `Continuar al Paso ${currentStep + 1}`}
                        </span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />

                        {/* Button internal glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </button>
                </footer>
            </div>
        </motion.div>
    );
}
