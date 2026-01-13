"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import {
    X,
    ArrowLeft,
    Play,
    Repeat,
    Timer,
    Coffee,
    ArrowRight,
    Lightbulb,
    Hand,
    Square
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { VideoReviewCard } from "@/components/VideoReviewCard";
import SuccessScreen from "@/components/SuccessScreen";

type StudioState = "brief" | "countdown" | "recording" | "resting" | "complete" | "submitted";

export default function RecordingBriefPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const signName = slug?.toUpperCase() || "HOLA";

    const [repetitions, setRepetitions] = useState(5);
    const [recDuration, setRecDuration] = useState(3);
    const [restTime, setRestTime] = useState(2);

    // Studio State Machine
    const [studioState, setStudioState] = useState<StudioState>("brief");
    const [countdown, setCountdown] = useState(15);
    const [recordingTime, setRecordingTime] = useState(0);
    const [currentRep, setCurrentRep] = useState(1);
    const [restCountdown, setRestCountdown] = useState(0);

    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

    // Enter Studio
    const handleEnterStudio = () => {
        setStudioState("countdown");
        setCountdown(15);
    };

    // Countdown Logic
    useEffect(() => {
        if (studioState === "countdown" && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (studioState === "countdown" && countdown === 0) {
            // Auto-start recording
            setStudioState("recording");
            setRecordingTime(0);
            startRecording();
        }
    }, [studioState, countdown]);

    // Recording Timer - Auto-stop after configured duration
    useEffect(() => {
        if (studioState === "recording" && recordingTime >= recDuration) {
            // Time's up - stop recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.stop();
            }

            // Transition to next state
            if (currentRep < repetitions) {
                setStudioState("resting");
                setRestCountdown(restTime);
            } else {
                setStudioState("complete");
            }
        }
    }, [recordingTime, recDuration, studioState, currentRep, repetitions, restTime]);

    // Recording Timer Increment
    useEffect(() => {
        if (studioState === "recording") {
            const timer = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [studioState]);

    // Rest Timer
    useEffect(() => {
        if (studioState === "resting" && restCountdown > 0) {
            const timer = setTimeout(() => setRestCountdown(restCountdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (studioState === "resting" && restCountdown === 0) {
            // Start next repetition
            if (currentRep < repetitions) {
                setCurrentRep(prev => prev + 1);
                setRecordingTime(0);
                setStudioState("recording");
                startRecording();
            } else {
                // All repetitions complete
                setStudioState("complete");
            }
        }
    }, [studioState, restCountdown, currentRep, repetitions]);

    const startRecording = useCallback(() => {
        if (webcamRef.current && webcamRef.current.stream) {
            const stream = webcamRef.current.stream;
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: "video/webm",
            });

            mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            });

            mediaRecorderRef.current.start();
        }
    }, []);



    const skipCountdown = () => {
        setCountdown(0);
    };

    // Brief View (Initial State)
    if (studioState === "brief") {
        return (
            <div className="relative min-h-screen bg-[#161121] text-white">
                {/* Ambient Background */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6324eb] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10" />
                </div>

                {/* Custom Header */}
                <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#161122]/80 backdrop-blur-md px-6 md:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <div className="text-[#6324eb]">
                            <Hand className="w-7 h-7" />
                        </div>
                        <Link href="/dashboard">
                            <h2 className="text-lg md:text-xl font-bold tracking-tight">
                                EnSeñas AI
                                <span className="text-xs font-medium text-zinc-500 ml-2 border border-zinc-700 px-1.5 rounded uppercase">
                                    Studio
                                </span>
                            </h2>
                        </Link>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center justify-center rounded-lg h-10 px-4 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline text-sm font-medium">Atrás</span>
                        </button>
                        <Link href="/dashboard">
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </header>

                <main className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20">
                    {/* Briefing Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[960px] w-full mb-8 text-center"
                    >
                        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-2">
                            Recording Briefing
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg">
                            Prepara tu configuración para la sesión:
                            <span className="text-[#6324eb] font-semibold ml-1">&quot;{signName}&quot;</span>
                        </p>
                    </motion.div>

                    {/* Glassmorphic Briefing Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="w-full max-w-[560px] rounded-3xl overflow-hidden shadow-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                    >
                        {/* HD Video Player Component */}
                        <div className="p-6">
                            <div className="relative group aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqBkdPDEkiwtGZqAQBnEYFAU571o6la53QPV2m3p7GSox9RTZ6hojv66LamJwM5o_CBeEpg___fswl16eduM6WFyUtn_Q9RULnnqwjP86iz7ndGUHZh-7lsywlFUDypiSjvjwiiIzmZcdQsYcE_Cz3M-xmVmWGq692uIliRE2evVmzOIl4QIne2ckvM5EKcMvLiyDGTaLk-HiwBvJ-xjrcBnONGbzyeMHxkvXobLpi6NH_ylFmD50ZWbERlyn9mSJ5DSx_bQiz9Cs")' }}
                                />
                                {/* Player Overlay */}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 transition-opacity">
                                    <button className="flex items-center justify-center rounded-full size-16 bg-[#6324eb]/90 hover:bg-[#6324eb] text-white shadow-lg hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 fill-white ml-1" />
                                    </button>
                                </div>
                                {/* Controls */}
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex h-1.5 items-center mb-2">
                                        <div className="h-full w-1/3 rounded-full bg-[#6324eb]" />
                                        <div className="size-3 rounded-full bg-white shadow-md -ml-1.5 border-2 border-[#6324eb]" />
                                        <div className="h-full flex-1 rounded-full bg-zinc-600/50" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono font-medium text-zinc-300">0:01</span>
                                        <span className="text-[10px] font-mono font-medium text-zinc-300">0:03</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex justify-between items-center px-1">
                                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Video de Referencia</span>
                                <span className="text-xs text-[#6324eb] font-medium">1080p</span>
                            </div>
                        </div>

                        {/* Parameters Section */}
                        <div className="px-6 pb-4">
                            <h3 className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-4 px-1">
                                Parámetros de Sesión
                            </h3>
                            <div className="space-y-1">
                                {/* Repetitions */}
                                <div className="flex items-center gap-4 bg-zinc-800/30 hover:bg-zinc-800/50 px-4 py-3 rounded-xl border border-transparent hover:border-zinc-700/50 transition-all group">
                                    <div className="text-[#6324eb]/70 flex items-center justify-center rounded-lg bg-[#6324eb]/10 shrink-0 size-10 group-hover:text-[#6324eb] group-hover:bg-[#6324eb]/20 transition-colors">
                                        <Repeat className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-medium">Repeticiones</p>
                                        <p className="text-zinc-500 text-[11px]">Total de iteraciones</p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="flex items-center gap-4 text-white">
                                            <button
                                                onClick={() => setRepetitions(Math.max(1, repetitions - 1))}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#6324eb]/50 text-zinc-400 hover:text-white transition-all"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-bold w-4 text-center">{repetitions}</span>
                                            <button
                                                onClick={() => setRepetitions(repetitions + 1)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#6324eb]/50 text-zinc-400 hover:text-white transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Rec Duration */}
                                <div className="flex items-center gap-4 bg-zinc-800/30 hover:bg-zinc-800/50 px-4 py-3 rounded-xl border border-transparent hover:border-zinc-700/50 transition-all group">
                                    <div className="text-[#6324eb]/70 flex items-center justify-center rounded-lg bg-[#6324eb]/10 shrink-0 size-10 group-hover:text-[#6324eb] group-hover:bg-[#6324eb]/20 transition-colors">
                                        <Timer className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-medium">Duración de Grabación</p>
                                        <p className="text-zinc-500 text-[11px]">Segundos por toma</p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="flex items-center gap-4 text-white">
                                            <button
                                                onClick={() => setRecDuration(Math.max(1, recDuration - 1))}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#6324eb]/50 text-zinc-400 hover:text-white transition-all"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-bold w-4 text-center">
                                                {recDuration}<span className="text-[10px] ml-0.5">s</span>
                                            </span>
                                            <button
                                                onClick={() => setRecDuration(recDuration + 1)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#6324eb]/50 text-zinc-400 hover:text-white transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Rest Time */}
                                <div className="flex items-center gap-4 bg-zinc-800/30 hover:bg-zinc-800/50 px-4 py-3 rounded-xl border border-transparent hover:border-zinc-700/50 transition-all group">
                                    <div className="text-[#6324eb]/70 flex items-center justify-center rounded-lg bg-[#6324eb]/10 shrink-0 size-10 group-hover:text-[#6324eb] group-hover:bg-[#6324eb]/20 transition-colors">
                                        <Coffee className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-medium">Tiempo de Descanso</p>
                                        <p className="text-zinc-500 text-[11px]">Intervalo entre tomas</p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="flex items-center gap-4 text-white">
                                            <button
                                                onClick={() => setRestTime(Math.max(1, restTime - 1))}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#6324eb]/50 text-zinc-400 hover:text-white transition-all"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-bold w-4 text-center">
                                                {restTime}<span className="text-[10px] ml-0.5">s</span>
                                            </span>
                                            <button
                                                onClick={() => setRestTime(restTime + 1)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#6324eb]/50 text-zinc-400 hover:text-white transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                            <button
                                onClick={handleEnterStudio}
                                className="w-full bg-[#6324eb] hover:bg-[#6324eb]/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-[#6324eb]/25 mb-4"
                            >
                                <span>ENTRAR AL ESTUDIO</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <div className="flex items-center justify-center gap-2 text-zinc-400">
                                <Lightbulb className="w-4 h-4 text-amber-500" />
                                <p className="text-[11px] font-medium uppercase tracking-wider">
                                    Asegúrate de tener buena iluminación
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* System Status Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-12 flex flex-wrap gap-6 md:gap-8 justify-center"
                    >
                        <div className="flex items-center gap-2 text-zinc-500">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Cámara Lista</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <span className="size-2 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Motor IA Conectado</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <span className="size-2 rounded-full bg-zinc-700" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Calibrado</span>
                        </div>
                    </motion.div>
                </main>
            </div>
        );
    }

    // Studio View (Countdown & Recording)
    return (
        <div className="relative w-full h-dvh bg-black overflow-hidden">
            {/* Webcam - Adaptive Canvas */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    className="w-full h-full object-cover md:object-contain md:max-w-4xl"
                    videoConstraints={{
                        facingMode: "user",
                    }}
                />
            </div>

            {/* Recording/Resting Border */}
            {studioState === "recording" && (
                <div className="absolute inset-0 border-4 border-red-500 pointer-events-none" />
            )}
            {studioState === "resting" && (
                <div className="absolute inset-0 border-4 border-blue-500 pointer-events-none" />
            )}

            {/* Resting Overlay */}
            <AnimatePresence>
                {studioState === "resting" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="text-center"
                        >
                            <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Descansa</h2>
                            <motion.div
                                key={restCountdown}
                                initial={{ scale: 1.3, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.7, opacity: 0 }}
                                className="text-blue-500 text-7xl md:text-8xl font-bold mb-8"
                            >
                                {restCountdown}
                            </motion.div>
                            <p className="text-slate-400 text-lg">Preparándose para la siguiente repetición...</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Countdown Overlay */}
            <AnimatePresence>
                {studioState === "countdown" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="text-center"
                        >
                            <h2 className="text-white text-3xl md:text-4xl font-bold mb-8">Prepárate...</h2>

                            <motion.div
                                key={countdown}
                                initial={{ scale: 1.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className="text-[#6324eb] text-8xl md:text-9xl font-bold mb-12"
                            >
                                {countdown}
                            </motion.div>

                            <div className="text-white text-left space-y-3 mb-8 max-w-md mx-auto px-8">
                                <p className="flex items-start gap-3">
                                    <span className="text-[#6324eb] font-bold">1.</span>
                                    <span>Aléjate de la cámara hasta ver tu cintura.</span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-[#6324eb] font-bold">2.</span>
                                    <span>Ponte en posición de FIRMES (Manos a los lados).</span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="text-[#6324eb] font-bold">3.</span>
                                    <span>Espera la señal roja.</span>
                                </p>
                            </div>

                            <button
                                onClick={skipCountdown}
                                className="px-6 py-2 text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                            >
                                Saltar Espera
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Recording Status Badge with Repetition Counter */}
            {(studioState === "recording" || studioState === "resting") && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
                    <div className={`flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-md ${studioState === "recording"
                        ? "bg-red-500/90"
                        : "bg-blue-500/90"
                        }`}>
                        <span className="size-3 rounded-full bg-white animate-pulse" />
                        <span className="text-white font-bold text-sm uppercase tracking-wider">
                            {studioState === "recording" ? `Grabando ${recordingTime}s` : `Descansando ${restCountdown}s`}
                        </span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="text-white font-bold text-sm">
                            Repetición {currentRep} / {repetitions}
                        </span>
                    </div>
                </div>
            )}

            {/* Protocol Reminder */}
            {studioState === "recording" && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30">
                    <p className="text-white/70 text-sm font-mono bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
                        Firmes → Seña → Firmes
                    </p>
                </div>
            )}

            {/* Minimalist Controls - Only Cancel */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
                <Link href="/dashboard">
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </Link>
            </div>

            {/* Review & Submit Overlay */}
            <AnimatePresence>
                {studioState === "complete" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-[#161121] flex flex-col z-30 overflow-y-auto"
                    >
                        {/* Main Content */}
                        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
                            {/* Page Heading */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                                <div className="space-y-1">
                                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Review & Submit</h2>
                                    <p className="text-slate-400 text-base md:text-lg">
                                        Paso 3 de 3: Control de Calidad — {repetitions} grabaciones listas para envío final.
                                    </p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-bold transition-all border border-zinc-700">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Guía de Calidad
                                </button>
                            </div>

                            {/* Video Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                {Array.from({ length: repetitions }).map((_, index) => (
                                    <VideoReviewCard
                                        key={index}
                                        index={index + 1}
                                        signName={signName}
                                        duration={recDuration}
                                    />
                                ))}
                            </div>
                        </main>

                        {/* Sticky Actions Footer */}
                        <footer className="mt-auto bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800 py-6 px-4 md:px-6 sticky bottom-0">
                            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6 text-zinc-400">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Selección</span>
                                        <p className="text-white font-medium">{repetitions} Clips Seleccionados</p>
                                    </div>
                                    <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
                                    <p className="text-sm hidden sm:block">Pasa el cursor sobre un clip para previsualizar.</p>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <Link href="/dashboard" className="flex-1 sm:flex-none">
                                        <button className="w-full px-6 py-3 border border-zinc-700 hover:bg-zinc-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                                            <X className="w-5 h-5" />
                                            Cancelar
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => setStudioState("submitted")}
                                        className="flex-1 sm:flex-none w-full px-10 py-3 bg-[#6324eb] hover:bg-[#6324eb]/90 text-white font-black rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#6324eb]/25"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Enviar {repetitions} Videos
                                    </button>
                                </div>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Screen */}
            {studioState === "submitted" && (
                <div className="absolute inset-0 z-40">
                    <SuccessScreen signName={signName} videosSubmitted={repetitions} />
                </div>
            )}
        </div>
    );
}

// Silhouette Guide Component
function SilhouetteGuide() {
    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            {/* Head Guide */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-32 h-40 border-2 border-dashed border-white/30 rounded-full" />

            {/* Shoulder Width Guide */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-64 h-0.5 bg-white/20">
                <span className="absolute -top-5 left-0 text-xs text-white/50 font-mono">Hombros</span>
            </div>

            {/* Waist Level Guide */}
            <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-full max-w-md h-0.5 bg-white/20">
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/50 font-mono bg-black/40 px-2 py-1 rounded">
                    Torso Visible
                </span>
            </div>
        </div>
    );
}
