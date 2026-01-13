"use client";

import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import {
    Video,
    Flame,
    Trophy,
    ArrowRight,
    Sparkles,
    Play
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    // Data "orgánica" y simple
    const userProgress = {
        name: "Juan",
        totalVideos: 12,
        streakDays: 3,
        level: "Explorador",
        nextGoal: 20
    };

    const recommendedSigns = [
        { name: "HOLA", category: "Social", difficulty: "Fácil" },
        { name: "GRACIAS", category: "Social", difficulty: "Fácil" },
        { name: "AYUDA", category: "Emergencia", difficulty: "Media" },
    ];

    return (
        <MainLayout>
            <div className="relative flex flex-col min-h-screen bg-[#161121] text-white overflow-hidden">

                {/* Ambient Background - Organic Blobs */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#6324eb] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '8s' }} />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10" />
                </div>

                <main className="relative z-10 p-6 md:p-12 max-w-5xl mx-auto w-full flex flex-col gap-10">

                    {/* 1. Hero Personalizado */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/5 text-xs font-medium text-slate-300 backdrop-blur-sm flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-yellow-400" />
                                    Nivel {userProgress.level}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Hola, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#6324eb]">{userProgress.name}</span>
                            </h1>
                            <p className="text-slate-400 text-lg mt-2 max-w-md">
                                Tu contribución está ayudando a reducir la brecha de comunicación.
                            </p>
                        </div>

                        {/* Quick Stat Summary - Organic Card */}
                        <div className="flex gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center min-w-[100px]">
                                <span className="text-2xl font-bold text-white mb-1">{userProgress.totalVideos}</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Videos</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center min-w-[100px]">
                                <div className="flex items-center gap-1 mb-1">
                                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                                    <span className="text-2xl font-bold text-white">{userProgress.streakDays}</span>
                                </div>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Racha</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Main Action Card - "Continue Journey" */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="relative w-full rounded-3xl p-8 md:p-10 overflow-hidden group cursor-pointer border border-white/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6324eb]/20 to-blue-900/20 backdrop-blur-xl transition-all duration-500 group-hover:bg-[#6324eb]/30" />

                        {/* Interactive Shine */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ backgroundSize: '200% 100%' }} />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Continúa tu Misión</h2>
                                <p className="text-blue-200/80 mb-6 max-w-lg">
                                    Estás a solo <span className="font-bold text-white">{userProgress.nextGoal - userProgress.totalVideos} videos</span> de tu siguiente hito.
                                    Graba "Hola" para completar tu set diario.
                                </p>
                                <Link href="/assignments">
                                    <button className="px-8 py-3 rounded-full bg-white text-[#6324eb] font-bold text-sm shadow-lg shadow-[#6324eb]/25 hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2">
                                        <Play className="w-4 h-4 fill-current" />
                                        Grabar Ahora
                                    </button>
                                </Link>
                            </div>

                            {/* Circular Progress Indicator */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="50%" cy="50%" r="45%" className="stroke-white/10 fill-none" strokeWidth="8" />
                                    <circle
                                        cx="50%" cy="50%" r="45%"
                                        className="stroke-[#6324eb] fill-none"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray="283"
                                        strokeDashoffset={283 - (283 * (userProgress.totalVideos / userProgress.nextGoal))} // ~60% filled
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-xl font-bold">{Math.round((userProgress.totalVideos / userProgress.nextGoal) * 100)}%</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. Suggestions "Organic Flow" */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white/90">Sugerencias para ti</h3>
                            <Link href="/assignments" className="text-sm text-[#6324eb] hover:text-white transition-colors">Ver todo</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {recommendedSigns.map((sign, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                    className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group flex flex-col gap-3"
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider 
                                            ${sign.category === 'Social' ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'}`}>
                                            {sign.category}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#6324eb] transition-colors">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{sign.name}</h4>
                                        <p className="text-xs text-slate-400">Dificultad: {sign.difficulty}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </main>

                <style jsx>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .group-hover\:animate-shimmer:hover {
                        animation: shimmer 1.5s infinite;
                    }
                `}</style>
            </div>
        </MainLayout>
    );
}
