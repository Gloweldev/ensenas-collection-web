"use client";


import { Users, Hammer, Heart, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function CommunityPage() {
    return (

        <div className="relative min-h-screen bg-[#161121] flex flex-col items-center justify-center p-4 overflow-hidden">

            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6324eb]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">

                {/* Animated Icon */}
                <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-[#6324eb]/20 blur-2xl rounded-full" />
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-32 h-32 bg-gradient-to-br from-[#6324eb] to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10"
                    >
                        <Users className="w-16 h-16 text-white" />

                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 bg-white text-[#6324eb] p-2 rounded-xl shadow-lg"
                        >
                            <Heart className="w-6 h-6 fill-current" />
                        </motion.div>
                        <motion.div
                            animate={{ y: [5, -5, 5] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 bg-[#1e1a2f] border border-white/10 p-2 rounded-xl shadow-lg"
                        >
                            <Globe className="w-6 h-6 text-blue-400" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Title */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                >
                    Comunidad <span className="text-[#6324eb]">En Desarrollo</span>
                </motion.h1>

                {/* Description */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6 text-lg text-slate-300 font-light leading-relaxed"
                >
                    <p>
                        Estamos construyendo un espacio increíble para ti. Cuando esté lista, podrás disfrutar de los beneficios de ser parte de este proyecto, conectándote con una <b className="text-white">comunidad más grande</b>.
                    </p>
                    <p>
                        EnSeñas AI conectará a personas de todo el país para compartir, aprender y colaborar en la preservación y expansión de la Lengua de Señas Mexicana.
                    </p>
                </motion.div>

                {/* Feature Pills */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 flex flex-wrap justify-center gap-3"
                >
                    {['Conexión Nacional', 'Eventos Exclusivos', 'Ranking Global', 'Colaboración'].map((tag, i) => (
                        <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-medium backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Construction Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest"
                >
                    <Hammer className="w-4 h-4" />
                    Sitio en Construcción
                </motion.div>

            </div>
        </div>

    );
}
