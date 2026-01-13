"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HandHeart, EarOff, Users } from "lucide-react";

interface OnboardingStep1Props {
    onSelect: (identity: string) => void;
    selectedIdentity?: string;
}

export default function OnboardingStep1({ onSelect, selectedIdentity }: OnboardingStep1Props) {
    const [selected, setSelected] = useState<string>(selectedIdentity || "");

    const handleSelect = (identity: string) => {
        setSelected(identity);
        onSelect(identity);
    };

    const identityOptions = [
        {
            id: "deaf",
            icon: HandHeart,
            title: "Sordo/a",
            subtitle: "Usuario principal de lengua de señas",
            color: "purple"
        },
        {
            id: "hard-of-hearing",
            icon: EarOff,
            title: "Hipoacúsico/a",
            subtitle: "Usuario de tecnología asistiva",
            color: "blue"
        },
        {
            id: "hearing",
            icon: Users,
            title: "Oyente",
            subtitle: "Aprendiendo o interpretando",
            color: "purple"
        }
    ];

    return (
        <div className="w-full max-w-[840px] flex flex-col gap-8 sm:gap-12">
            {/* Progress Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-3"
            >
                <div className="flex justify-between items-end">
                    <span className="text-purple-400 font-bold uppercase tracking-wider text-xs">Paso 1 de 3</span>
                    <span className="text-slate-400 text-xs font-medium">33% Completado</span>
                </div>
                <div className="h-1.5 w-full bg-[#1c162e] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "33%" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#6324eb] to-blue-500 rounded-full shadow-[0_0_10px_rgba(99,36,235,0.6)]"
                    />
                </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center space-y-4"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                    Ayúdanos a calibrar la <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">IA</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Para proporcionar la traducción más precisa y ajustar la velocidad de reconocimiento, selecciona el perfil que mejor te describe.
                </p>
            </motion.div>

            {/* Selection Grid */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
                {identityOptions.map((option, index) => {
                    const Icon = option.icon;
                    const isSelected = selected === option.id;

                    return (
                        <motion.button
                            key={option.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                            onClick={() => handleSelect(option.id)}
                            className={`
                                group relative overflow-hidden rounded-2xl p-6 md:p-8 
                                flex flex-col items-center justify-center gap-5 text-center 
                                min-h-[260px] cursor-pointer
                                transition-all duration-300
                                ${isSelected
                                    ? 'bg-[#2d2447]/80 border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                                    : 'bg-[#1e192d]/60 border border-white/8 hover:bg-[#2d2447]/70 hover:border-[#6324eb]/40'
                                }
                                backdrop-blur-xl
                            `}
                        >
                            {/* Background Gradient */}
                            <div className={`
                                absolute inset-0 bg-gradient-to-b transition-opacity duration-300
                                ${isSelected ? 'from-blue-500/10 to-transparent opacity-100' : 'from-transparent to-[#6324eb]/5 opacity-0 group-hover:opacity-100'}
                            `} />

                            {/* Icon Container */}
                            <div className={`
                                w-20 h-20 rounded-full flex items-center justify-center 
                                transition-all duration-300 shadow-lg z-10
                                ${isSelected
                                    ? 'bg-blue-500/20 border border-blue-500/30 scale-105 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                                    : 'bg-[#1c162e] border border-white/5 group-hover:scale-110 group-hover:border-[#6324eb]/30'
                                }
                            `}>
                                <Icon className={`w-10 h-10 ${isSelected ? 'text-blue-400' : 'text-purple-400'}`} />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-1 z-10">
                                <h3 className="text-white text-xl font-bold">{option.title}</h3>
                                <p className={`text-sm ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                                    {option.subtitle}
                                </p>
                            </div>

                            {/* Checkmark Indicator */}
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg z-10"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
}
