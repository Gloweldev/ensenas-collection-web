"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Repeat, Timer, Coffee, ArrowRight, Lightbulb, Play, Pause, FileQuestion } from "lucide-react";

interface BriefingPhaseProps {
    signName: string;
    videoUrl?: string | null;
    repetitions: number;
    setRepetitions: (value: number) => void;
    recDuration: number;
    setRecDuration: (value: number) => void;
    restTime: number;
    setRestTime: (value: number) => void;
    onEnterStudio: () => void;
}

/**
 * Check if URL is a YouTube video
 */
function isYouTubeUrl(url: string): boolean {
    const youtubePatterns = [
        /youtube\.com\/watch\?v=/,
        /youtube\.com\/embed\//,
        /youtu\.be\//,
        /youtube\.com\/shorts\//,
    ];
    return youtubePatterns.some(pattern => pattern.test(url));
}

/**
 * Extract YouTube video ID from various URL formats
 */
function getYouTubeVideoId(url: string): string | null {
    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtube\.com\/embed\/([^?]+)/,
        /youtu\.be\/([^?]+)/,
        /youtube\.com\/shorts\/([^?]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    return null;
}

export function BriefingPhase({
    signName,
    videoUrl,
    repetitions,
    setRepetitions,
    recDuration,
    setRecDuration,
    restTime,
    setRestTime,
    onEnterStudio,
}: BriefingPhaseProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    // Detect video type
    const isYouTube = useMemo(() => videoUrl ? isYouTubeUrl(videoUrl) : false, [videoUrl]);
    const youtubeVideoId = useMemo(() => videoUrl && isYouTube ? getYouTubeVideoId(videoUrl) : null, [videoUrl, isYouTube]);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && videoRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * duration;
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="relative min-h-screen bg-[#161121] text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6324eb] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10" />
            </div>

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
                    {/* Video Player or Fallback */}
                    <div className="p-6">
                        <div className="relative group aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50">
                            {videoUrl ? (
                                isYouTube && youtubeVideoId ? (
                                    // YouTube Video Player
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${youtubeVideoId}?loop=1&playlist=${youtubeVideoId}&mute=1`}
                                        title="Video de Referencia"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    // Native Video Player (MP4, WebM, etc.)
                                    <>
                                        <video
                                            ref={videoRef}
                                            className="w-full h-full object-cover"
                                            loop
                                            muted
                                            playsInline
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                            onTimeUpdate={handleTimeUpdate}
                                            onLoadedMetadata={handleLoadedMetadata}
                                        >
                                            <source src={videoUrl} type="video/mp4" />
                                            <source src={videoUrl} type="video/webm" />
                                            Tu navegador no soporta el elemento de video.
                                        </video>

                                        {/* Player Overlay */}
                                        <div
                                            onClick={toggleVideo}
                                            className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <button className="flex items-center justify-center rounded-full size-16 bg-[#6324eb]/90 hover:bg-[#6324eb] text-white shadow-lg hover:scale-110 transition-transform">
                                                {isPlaying ? (
                                                    <Pause className="w-8 h-8 fill-white" />
                                                ) : (
                                                    <Play className="w-8 h-8 fill-white ml-1" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div
                                                ref={progressBarRef}
                                                onClick={handleProgressClick}
                                                className="flex h-1.5 items-center mb-2 cursor-pointer relative rounded-full bg-zinc-600/50 overflow-hidden"
                                            >
                                                {/* Progress fill */}
                                                <div
                                                    className="absolute left-0 h-full bg-[#6324eb] rounded-full transition-all"
                                                    style={{ width: `${progressPercentage}%` }}
                                                />
                                                {/* Progress handle */}
                                                <div
                                                    className="absolute size-3 rounded-full bg-white shadow-md border-2 border-[#6324eb] transition-all"
                                                    style={{ left: `calc(${progressPercentage}% - 6px)` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-mono font-medium text-zinc-300">
                                                    {formatTime(currentTime)}
                                                </span>
                                                <span className="text-[10px] font-mono font-medium text-zinc-300">
                                                    {formatTime(duration)}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )
                            ) : (
                                // Fallback Card - No Video Available
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 relative overflow-hidden">
                                    {/* Subtle Grid Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(156, 163, 175, 0.1) 2px, rgba(156, 163, 175, 0.1) 4px),
                                                            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(156, 163, 175, 0.1) 2px, rgba(156, 163, 175, 0.1) 4px)`
                                        }} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col items-center text-center px-8">
                                        <div className="mb-4 p-4 rounded-full bg-zinc-800/50 border border-zinc-700/50">
                                            <FileQuestion className="w-12 h-12 text-zinc-600" />
                                        </div>
                                        <h3 className="text-zinc-400 font-semibold text-lg mb-2">
                                            Referencia visual no disponible
                                        </h3>
                                        <p className="text-zinc-500 text-sm max-w-xs">
                                            Graba basándote en tu conocimiento de la seña.
                                        </p>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 right-4 w-20 h-20 border border-zinc-700/30 rounded-full" />
                                    <div className="absolute bottom-4 left-4 w-16 h-16 border border-zinc-700/30 rounded-lg rotate-45" />
                                </div>
                            )}
                        </div>
                        <div className="mt-3 flex justify-between items-center px-1">
                            <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                                {videoUrl ? (isYouTube ? "Video de YouTube" : "Video de Referencia") : "Sin Video Disponible"}
                            </span>
                            {videoUrl && (
                                <span className="text-xs text-[#6324eb] font-medium">
                                    {isYouTube ? "YouTube" : "MP4"}
                                </span>
                            )}
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
                            onClick={onEnterStudio}
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
            </main>
        </div>
    );
}
