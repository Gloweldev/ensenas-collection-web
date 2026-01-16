"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Building2, Home, Info } from "lucide-react";

interface OnboardingStep3Props {
    onSelect: (regional: string) => void;
    selectedRegional?: string;
}

export default function OnboardingStep3({ onSelect, selectedRegional }: OnboardingStep3Props) {
    const [selected, setSelected] = useState<string>(selectedRegional || "");

    const handleSelect = (regional: string) => {
        setSelected(regional);
        onSelect(regional);
    };

    const regionalOptions = [
        {
            id: "standard",
            icon: GraduationCap,
            title: "Estándar / Escolar",
            subtitle: "Lengua de señas oficial basada en el currículo institucional.",
            color: "blue"
        },
        {
            id: "northern",
            icon: MapPin,
            title: "Estilo Norte",
            subtitle: "Dialectos regionales y variaciones comunes en territorios del norte.",
            color: "emerald"
        },
        {
            id: "central",
            icon: Building2,
            title: "Estilo Central",
            subtitle: "Variaciones urbanas típicas de áreas metropolitanas centrales.",
            color: "amber"
        },
        {
            id: "home-sign",
            icon: Home,
            title: "Señas Caseras",
            subtitle: "Variaciones informales domésticas usadas en contextos familiares.",
            color: "purple"
        }
    ];

    const colorClasses = {
        blue: {
            bg: "bg-blue-500/10 dark:bg-blue-500/20",
            text: "text-blue-600 dark:text-blue-300"
        },
        emerald: {
            bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
            text: "text-emerald-600 dark:text-emerald-300"
        },
        amber: {
            bg: "bg-amber-500/10 dark:bg-amber-500/20",
            text: "text-amber-600 dark:text-amber-300"
        },
        purple: {
            bg: "bg-purple-500/10 dark:bg-purple-500/20",
            text: "text-purple-600 dark:text-purple-300"
        }
    };

    return (
        <div className="w-full max-w-[960px] flex flex-col gap-8">
            {/* Progress Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-2"
            >
                <div className="flex justify-between items-end mb-1">
                    <p className="text-gray-300 text-sm font-medium tracking-wide uppercase">Paso 3 de 3</p>
                    <p className="text-[#6324eb] font-bold text-sm">100%</p>
                </div>
                <div className="h-1.5 w-full bg-[#2f2447] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "66%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.7, ease: "easeOut" as const }}
                        className="h-full bg-[#6324eb] rounded-full shadow-[0_0_10px_rgba(99,36,235,0.5)]"
                    />
                </div>
            </motion.div>

            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        Calibración <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6324eb] to-blue-400">Regional</span>
                    </h1>
                    <p className="text-lg text-[#a492c8] max-w-2xl leading-relaxed">
                        Selecciona tu variante lingüística preferida para optimizar el motor de reconocimiento para tu dialecto específico.
                    </p>
                </div>
            </motion.div>

            {/* Options Grid */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2"
            >
                {regionalOptions.map((option, index) => {
                    const Icon = option.icon;
                    const isSelected = selected === option.id;
                    const colors = colorClasses[option.color as keyof typeof colorClasses];

                    return (
                        <motion.button
                            key={option.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                            onClick={() => handleSelect(option.id)}
                            className={`
                                group text-left p-6 rounded-xl flex flex-col gap-4 relative h-full
                                transition-all duration-300 backdrop-blur-md
                                ${isSelected
                                    ? 'bg-[#2d2447]/80 border-2 border-[#6324eb] shadow-[0_0_15px_rgba(99,36,235,0.2)]'
                                    : 'bg-white/3 border border-white/5 hover:bg-white/6 hover:transform hover:-translate-y-0.5 hover:border-[#6324eb]/30'
                                }
                            `}
                        >
                            {/* Radio Indicator */}
                            <div className={`
                                absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center transition-all
                                ${isSelected
                                    ? 'border-2 border-[#6324eb]'
                                    : 'border border-[#a492c8] group-hover:border-[#6324eb]'
                                }
                            `}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: isSelected ? 1 : 0 }}
                                    className="w-2.5 h-2.5 rounded-full bg-[#6324eb]"
                                />
                            </div>

                            {/* Icon Container */}
                            <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-2`}>
                                <Icon className={`w-7 h-7 ${colors.text}`} />
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className={`text-lg font-bold mb-1 transition-colors ${isSelected ? 'text-white' : 'text-white group-hover:text-[#6324eb]'}`}>
                                    {option.title}
                                </h3>
                                <p className="text-sm text-[#a492c8] leading-relaxed">
                                    {option.subtitle}
                                </p>
                            </div>

                            {/* Selected Glow Effect */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-b from-[#6324eb]/10 to-transparent rounded-xl pointer-events-none" />
                            )}
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Info Alert */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 flex gap-3 items-start"
            >
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-200/80">
                    <span className="font-bold text-blue-200">Consejo:</span> Siempre puedes recalibrar la configuración regional más tarde desde el menú de configuración principal del dashboard. La IA también se adaptará a tu estilo específico de señas con el tiempo.
                </p>
            </motion.div>
        </div>
    );
}
