"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import {
    ArrowLeft,
    AlertCircle,
    Brain,
    Video,
    Zap,
    Globe,
    CheckCircle,
    FlaskConical,
    ArrowRight
} from "lucide-react";
import Link from "next/link";


// Animation variants for scroll reveal
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function NuestraMision() {
    return (
        <div className="relative flex flex-col bg-zinc-950 min-h-screen">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px"
                    }}
                />
                <div
                    className="absolute w-[600px] h-[600px] -top-32 left-1/2 -translate-x-1/2 bg-[#6324eb] rounded-full opacity-30 animate-pulse"
                    style={{
                        filter: "blur(100px)",
                        animationDuration: "10s"
                    }}
                />
                <div
                    className="absolute w-[400px] h-[400px] bottom-0 right-0 bg-[#0ea5e9] rounded-full opacity-10"
                    style={{ filter: "blur(100px)" }}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center py-12 px-4 md:px-8 lg:px-24 relative z-10 w-full">
                <div className="w-full max-w-6xl flex flex-col gap-16">
                    {/* Hero Section */}
                    <HeroSection />

                    {/* Problem Section */}
                    <ProblemSection />

                    {/* Solution Section */}
                    <SolutionSection />

                    {/* R&D Phase Section */}
                    <RDPhaseSection />

                    {/* How It Works Section */}
                    <HowItWorksSection />

                    {/* CTA Section */}
                    <CTASection />
                </div>
            </main>
        </div>
    );
}

// function BackButton() {
//     return (
//         <div className="flex justify-start w-full">
//             <Link
//                 href="/dashboard"
//                 className="group flex items-center gap-2 text-zinc-400 hover:text-[#6324eb] transition-colors text-sm font-medium uppercase tracking-wider"
//             >
//                 <ArrowLeft className="w-[18px] h-[18px] group-hover:-translate-x-1 transition-transform" />
//                 Volver al Dashboard
//             </Link>
//         </div>
//     );
// }

function HeroSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="flex flex-col items-center text-center gap-6 relative"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6324eb]/10 border border-[#6324eb]/20 text-[#8b5cf6] text-xs font-bold uppercase tracking-widest mb-2">
                Manifiesto del Proyecto v1.0
            </div>
            <h1
                className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-[1.1]"
                style={{ textShadow: "0 0 30px rgba(99, 36, 235, 0.4)" }}
            >
                La Misión de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                    EnSeñas AI
                </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Estamos construyendo la próxima generación de tecnología de asistencia para cerrar la brecha de
                comunicación, impulsada por inteligencia artificial y colaboración colectiva.
            </p>
        </motion.div>
    );
}

function ProblemSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="rounded-[2rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            style={{
                background: "rgba(24, 24, 27, 0.4)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
            }}
        >
            <div className="flex flex-col gap-6 order-2 lg:order-1">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 mb-2">
                    <AlertCircle className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                    El "Desierto de Datos" <br />
                    <span className="text-zinc-400">y la Desigualdad</span>
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                    Los modelos actuales de IA para Procesamiento de Lenguaje Natural (NLP) carecen de datos
                    de calidad en Lengua de Señas Mexicana (LSM). Los datasets existentes están fragmentados
                    y carecen de diversidad en iluminación, ángulos y tonos de piel.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                    Este "Desierto de Datos" impide la creación de traductores fiables en tiempo real,
                    perpetuando la brecha digital para millones de personas sordas.
                </p>
            </div>
            <div className="order-1 lg:order-2 bg-zinc-900/50 rounded-2xl p-8 border border-white/5 relative overflow-hidden">
                <DataComparisonChart />
            </div>
        </motion.div>
    );
}

function DataComparisonChart() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const datasets = [
        { name: "Inglés (NLP)", tokens: "300B+", width: "100%" },
        { name: "Español (NLP)", tokens: "150B+", width: "80%" },
        { name: "LSM (Lengua de Señas)", tokens: "< 0.01B", width: "1%", alert: true }
    ];

    return (
        <div ref={ref} className="flex flex-col gap-6 relative z-10">
            {datasets.map((dataset, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-mono text-zinc-500 uppercase">
                        <span className={dataset.alert ? "text-red-400 font-bold" : ""}>{dataset.name}</span>
                        <span className={dataset.alert ? "text-red-400 font-bold" : ""}>{dataset.tokens}</span>
                    </div>
                    <div className={`h-8 w-full bg-zinc-800 rounded-lg overflow-hidden relative ${dataset.alert ? "border border-red-500/30" : ""}`}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: dataset.width } : { width: 0 }}
                            transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" as const }}
                            className={`absolute inset-y-0 left-0 ${dataset.alert ? "bg-red-500 animate-pulse" : "bg-zinc-600"}`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

function SolutionSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="rounded-[2rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            style={{
                background: "rgba(24, 24, 27, 0.4)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
            }}
        >
            <AIVisionDemo />
            <div className="flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-[#6324eb]/10 flex items-center justify-center text-[#6324eb] border border-[#6324eb]/20 mb-2">
                    <Brain className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                    Traducción Bidireccional <br />
                    <span className="text-zinc-400">Deep Tech</span>
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                    Desarrollamos traducción en tiempo real para transformar la accesibilidad en sectores
                    críticos como Gobierno, Educación y Trabajo. Nuestra tecnología permite una comunicación
                    fluida y bidireccional donde antes existían barreras insuperables.
                </p>
                <ul className="space-y-3 mt-2">
                    {[
                        "Traducción en Tiempo Real",
                        "Validación por Visión Artificial",
                        "Etiquetado Verificado por Comunidad"
                    ].map((item, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="flex items-center gap-3 text-zinc-300"
                        >
                            <CheckCircle className="w-5 h-5 text-[#6324eb]" />
                            <span>{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

function AIVisionDemo() {
    return (
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-[#6324eb]/20 group bg-zinc-900">
            <div className="absolute inset-0 bg-[#6324eb]/20 mix-blend-overlay" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-[#6324eb]/40 text-xs font-mono text-[#8b5cf6]">
                        CONFIANZA: 98.4%
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <Zap className="w-6 h-6 text-[#6324eb]/80" />
                    </motion.div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#6324eb]/30 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 border border-white/10 rounded-full" />
                    <div className="absolute w-full h-[1px] bg-[#6324eb]/40 rotate-45" />
                    <div className="absolute w-full h-[1px] bg-[#6324eb]/40 -rotate-45" />
                </div>
                <ScannerLine />
                <div className="font-mono text-xs text-[#8b5cf6]">
                    &gt; DETECTANDO PUNTOS CLAVE...<br />
                    &gt; MANO_DERECHA_DETECTADA
                </div>
            </div>
        </div>
    );
}

function ScannerLine() {
    return (
        <motion.div
            className="absolute left-0 w-full h-[2px] bg-[#6324eb]"
            style={{
                boxShadow: "0 0 10px #6324eb, 0 0 20px #8b5cf6"
            }}
            animate={{
                top: ["0%", "100%"]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
}

function RDPhaseSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between bg-gradient-to-r from-[#6324eb]/5 to-transparent"
            style={{
                background: "linear-gradient(to right, rgba(99, 36, 235, 0.05), transparent), rgba(24, 24, 27, 0.4)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
            }}
        >
            <div className="flex flex-col gap-4 max-w-2xl">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <FlaskConical className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Fase 1: Recolección y Calibración</h2>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                    Actualmente nos encontramos en una etapa intensiva de I+D. Cada dato aportado por los
                    usuarios se convierte en el "ADN" de nuestro modelo, permitiendo calibrar la precisión
                    de nuestros algoritmos de visión artificial antes del despliegue masivo.
                </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
                <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Progreso I+D</span>
                    <span className="text-2xl font-bold text-white font-mono">34%</span>
                </div>
                <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "34%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-emerald-500 relative"
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

function HowItWorksSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const steps = [
        {
            icon: Video,
            title: "1. Contribuye",
            description: "Graba palabras y frases específicas asignadas por el sistema de misiones para enriquecer el dataset.",
            color: "text-blue-400"
        },
        {
            icon: Brain,
            title: "2. Entrena",
            description: "Nuestra canalización de Visión Computarizada procesa los movimientos para su validación.",
            color: "text-[#6324eb]"
        },
        {
            icon: Globe,
            title: "3. Despliega",
            description: "Lanzamiento del MVP y liberación de datasets open-source para la comunidad global.",
            color: "text-emerald-400"
        }
    ];

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="rounded-[2rem] p-8 md:p-12 flex flex-col gap-10"
            style={{
                background: "rgba(24, 24, 27, 0.4)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
            }}
        >
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">Cómo Funciona</h2>
                <p className="text-zinc-400">
                    Un enfoque descentralizado para construir el futuro de la accesibilidad.
                </p>
            </div>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
            >
                {/* Connecting line */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent border-t border-dashed border-zinc-600 z-0" />

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="relative z-10 flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-[#6324eb]/30 transition-colors"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-zinc-950 flex items-center justify-center border border-zinc-800 shadow-lg mb-2 group">
                                <Icon className={`w-10 h-10 ${step.color} group-hover:scale-110 transition-transform`} />
                            </div>
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <p className="text-sm text-zinc-400">{step.description}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}

function CTASection() {
    return (
        <div className="flex justify-center pb-12">
            <Link href="/dashboard">
                <button className="group relative px-8 py-4 bg-[#6324eb] text-white font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(99,36,235,0.5)] hover:shadow-[0_0_30px_rgba(99,36,235,0.7)] transition-all">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative flex items-center gap-3">
                        Unirme a la Misión
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </Link>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
