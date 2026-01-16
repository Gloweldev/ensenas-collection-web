"use client";

import { motion } from "framer-motion";
import { Check, Heart, Sparkles, Video, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SuccessScreenProps {
    signName: string;
    videosSubmitted: number;
}

export default function SuccessScreen({ signName, videosSubmitted }: SuccessScreenProps) {
    return (
        <div className="min-h-screen bg-[#161121] text-white flex flex-col relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.13) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <main className="flex-grow flex items-center justify-center py-12 px-4 relative z-10">
                <div className="max-w-4xl w-full flex flex-col items-center">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                        className="mb-8 relative"
                    >
                        <div className="size-24 md:size-32 rounded-full bg-[#6324eb] flex items-center justify-center shadow-lg shadow-[#6324eb]/40">
                            <Check className="text-white w-12 h-12 md:w-16 md:h-16 stroke-[3]" />
                        </div>
                        {/* Decorative particles */}
                        <motion.div
                            animate={{
                                y: [-5, 5, -5],
                                rotate: [0, 10, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-2 -right-2 bg-yellow-400 size-4 rounded-full"
                        />
                        <motion.div
                            animate={{
                                y: [5, -5, 5],
                                rotate: [0, -10, 0]
                            }}
                            transition={{ duration: 3.5, repeat: Infinity }}
                            className="absolute -bottom-4 -left-4 bg-blue-500 size-6 rounded-full opacity-50"
                        />
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-white tracking-tight text-4xl md:text-5xl font-bold leading-tight pb-3">
                            ¡Contribución Exitosa!
                        </h1>
                        <p className="text-slate-400 text-lg font-normal">
                            Tus videos están siendo procesados.
                        </p>
                    </motion.div>

                    {/* Stats & Impact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[600px] mb-12"
                    >
                        {/* Videos Submitted */}
                        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Videos Enviados</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-white text-3xl font-bold">{videosSubmitted}</p>
                                <span className="text-[#6324eb] text-sm font-bold bg-[#6324eb]/20 px-2 py-0.5 rounded-full">
                                    &quot;{signName}&quot;
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                ¡Gracias por tu tiempo!
                            </p>
                        </div>

                        {/* Community Impact */}
                        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Impacto en la Comunidad</p>
                            <p className="text-white text-xl font-bold">Mejora del Modelo</p>
                            <p className="text-[#6324eb] text-sm font-medium leading-normal flex items-center gap-1">
                                <Heart className="w-4 h-4 fill-[#6324eb]" />
                                Ayudaste a entrenar &quot;{signName}&quot;
                            </p>
                        </div>
                    </motion.div>

                    {/* Appreciation Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="w-full max-w-[600px] flex flex-col gap-3 p-6 bg-gradient-to-br from-[#6324eb]/10 to-blue-500/10 rounded-xl border border-[#6324eb]/20 mb-12"
                    >
                        <h3 className="text-white text-lg font-bold flex items-center gap-2">
                            <Heart className="w-5 h-5 text-[#6324eb] fill-[#6324eb]" />
                            Tu Apoyo Importa
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Cada video que contribuyes ayuda a reducir la brecha de comunicación entre personas sordas y oyentes.
                            Estás siendo parte de algo más grande: construir una IA que entienda la lengua de señas mexicana.
                        </p>
                    </motion.div>

                    {/* Action Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col md:flex-row gap-6 w-full max-w-[700px]"
                    >
                        {/* Continue Recording */}
                        <Link href="/assignments" className="flex-1">
                            <button className="w-full h-full bg-gradient-to-br from-[#6324eb] to-blue-600 rounded-xl p-1 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#6324eb]">
                                <div className="bg-black/10 hover:bg-black/0 h-full w-full rounded-[10px] p-6 flex flex-col justify-between items-start transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white/70 text-sm font-bold uppercase tracking-widest">Continuar</span>
                                        <h3 className="text-white text-2xl font-bold">Grabar Otra Seña</h3>
                                    </div>
                                    <div className="mt-8 flex items-center justify-between w-full">
                                        <div className="size-12 rounded-lg bg-white/20 flex items-center justify-center">
                                            <Video className="text-white w-6 h-6" />
                                        </div>
                                        <ArrowRight className="text-white w-8 h-8" />
                                    </div>
                                </div>
                            </button>
                        </Link>

                        {/* Back to Dashboard */}
                        <Link href="/dashboard" className="flex-1">
                            <button className="w-full h-full bg-transparent border-2 border-zinc-700 hover:border-zinc-500 rounded-xl p-6 transition-all group focus:outline-none focus:ring-2 focus:ring-zinc-600">
                                <div className="flex flex-col justify-between h-full items-start">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Terminar</span>
                                        <h3 className="text-white text-2xl font-bold group-hover:text-zinc-300">Volver al Dashboard</h3>
                                    </div>
                                    <div className="mt-8 flex items-center justify-between w-full">
                                        <div className="size-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <Home className="text-zinc-400 w-6 h-6" />
                                        </div>
                                        <X className="text-zinc-500 group-hover:text-white w-6 h-6" />
                                    </div>
                                </div>
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

// Missing X import
import { X } from "lucide-react";
