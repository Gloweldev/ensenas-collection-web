"use client";

import { useRef, useState, useEffect, RefObject } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, RotateCcw, AlertTriangle, Loader2, Maximize2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { StreamingRecording } from "@/hooks/use-streaming-upload";
import { VideoReviewCard } from "../VideoReviewCard";
import { QualityGuideModal } from "./QualityGuideModal";
import { RerecordModal } from "./RerecordModal";
import { IncompleteSubmissionModal } from "./IncompleteSubmissionModal";

type StudioState = "brief" | "countdown" | "recording" | "resting" | "complete";

interface StudioPhaseProps {
    signName: string;
    slug?: string; // For building the back-to-briefing link
    studioState: StudioState;
    setStudioState: (state: StudioState | "submitted") => void;
    countdown: number;
    recordingTime: number;
    currentRep: number;
    repetitions: number;
    recDuration: number;
    restCountdown: number;
    webcamRef: RefObject<Webcam>;
    onSkipCountdown: () => void;
    // Streaming recording props
    recordings?: StreamingRecording[];
    isUploading?: boolean;
    overallProgress?: number;
    allCompleted?: boolean;
    onDeleteRecording?: (recordingId: string) => void;
    onSubmit?: () => void;
    onCancel?: () => void;
    // Smart Re-record props
    initialRepetitions?: number;
    onSmartRerecord?: (count: number) => void;
}

export function StudioPhase({
    signName,
    slug,
    studioState,
    setStudioState,
    countdown,
    recordingTime,
    currentRep,
    repetitions,
    recDuration,
    restCountdown,
    webcamRef,
    onSkipCountdown,
    recordings = [],
    isUploading = false,
    overallProgress = 0,
    allCompleted = false,
    onDeleteRecording,
    onSubmit,
    onCancel,
    initialRepetitions = 0,
    onSmartRerecord,
}: StudioPhaseProps) {
    const [showQualityModal, setShowQualityModal] = useState(false);
    const [showRerecordModal, setShowRerecordModal] = useState(false);
    const [showIncompleteModal, setShowIncompleteModal] = useState(false);

    // Calculate missing videos based on initial goal
    // If initialRepetitions is 0 (legacy/first load), fallback to current repetitions if they are higher, or just use recordings.length
    const targetCount = initialRepetitions > 0 ? initialRepetitions : Math.max(repetitions, recordings.length);
    const missingCount = Math.max(0, targetCount - recordings.length);

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
                                onClick={onSkipCountdown}
                                className="px-6 py-2 text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                            >
                                Saltar Espera
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Recording Status - Large Counter with Progress Bar */}
            {studioState === "recording" && (
                <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-between py-8">
                    {/* Top Section - Large Countdown */}
                    <div className="flex flex-col items-center gap-4">
                        {/* Sign Name */}
                        <div className="px-6 py-2 rounded-full bg-black/60 backdrop-blur-md border border-red-500/50">
                            <span className="text-white font-bold text-lg uppercase tracking-wider">
                                Grabando: {signName}
                            </span>
                        </div>

                        {/* Large Countdown Timer with Circular Progress */}
                        <div className="relative flex items-center justify-center">
                            {/* Circular Progress - fills clockwise from top */}
                            <svg className="w-36 h-36 md:w-44 md:h-44" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="6"
                                />
                                {/* Progress circle - starts from top and fills clockwise */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 45}
                                    strokeDashoffset={2 * Math.PI * 45 * (1 - recordingTime / recDuration)}
                                    transform="rotate(-90 50 50)"
                                    className="transition-all duration-100 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                />
                            </svg>
                            {/* Countdown Number - shows remaining seconds as integer */}
                            <motion.span
                                key={Math.ceil(recDuration - recordingTime)}
                                initial={{ scale: 1.3, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.15 }}
                                className="absolute text-white text-5xl md:text-6xl font-black drop-shadow-lg"
                            >
                                {Math.ceil(recDuration - recordingTime)}
                            </motion.span>
                        </div>

                        {/* Repetition Badge */}
                        <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <span className="text-white font-bold text-sm">
                                Repetición {currentRep} / {repetitions}
                            </span>
                        </div>
                    </div>

                    {/* Center - Recording Instructions */}
                    {/* Dynamic timing: 20% prep, 60% sign, 20% finish */}
                    {(() => {
                        // Calculate thresholds in seconds based on recDuration
                        // Example with 3s: step1 ends at 0.6s, step3 starts at 2.4s
                        const step1End = recDuration * 0.2;  // 20% - end of "manos abajo"
                        const step3Start = recDuration * 0.8; // 80% - start of "manos abajo"

                        const isStep1 = recordingTime < step1End;
                        const isStep3 = recordingTime >= step3Start;
                        const isStep2 = !isStep1 && !isStep3;

                        return (
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-6 text-white/80 text-sm md:text-base font-medium bg-black/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                    {/* Step 1: Manos abajo (0% - 20%) */}
                                    <span className={`flex items-center gap-2 transition-all ${isStep1 ? 'text-[#6324eb] font-bold scale-110' : 'opacity-50'}`}>
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isStep1 ? 'bg-[#6324eb]' : 'bg-[#6324eb]/20'}`}>1</span>
                                        Manos abajo
                                    </span>
                                    <span className="text-white/30">→</span>
                                    {/* Step 2: Haz la seña (20% - 80%) */}
                                    <span className={`flex items-center gap-2 transition-all ${isStep2 ? 'text-green-400 font-bold scale-110' : 'opacity-50'}`}>
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isStep2 ? 'bg-green-500' : 'bg-green-500/20'}`}>2</span>
                                        Haz la seña
                                    </span>
                                    <span className="text-white/30">→</span>
                                    {/* Step 3: Manos abajo (80% - 100%) */}
                                    <span className={`flex items-center gap-2 transition-all ${isStep3 ? 'text-[#6324eb] font-bold scale-110' : 'opacity-50'}`}>
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isStep3 ? 'bg-[#6324eb]' : 'bg-[#6324eb]/20'}`}>3</span>
                                        Manos abajo
                                    </span>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Bottom - Progress Bar */}
                    <div className="w-full max-w-lg px-8">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                                className="h-full bg-gradient-to-r from-red-500 to-red-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${(recordingTime / recDuration) * 100}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Resting Counter - More Visible */}
            {studioState === "resting" && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-md bg-blue-500/90">
                        <span className="size-3 rounded-full bg-white animate-pulse" />
                        <span className="text-white font-bold text-sm uppercase tracking-wider">
                            Descansando {restCountdown}s
                        </span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="text-white font-bold text-sm">
                            Repetición {currentRep} / {repetitions}
                        </span>
                    </div>
                </div>
            )}

            {/* Minimalist Controls - Only Cancel */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
                <button
                    onClick={onCancel}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>


            {/* Review & Submit Overlay - Full Screen Fixed */}
            <AnimatePresence>
                {studioState === "complete" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#090513] flex flex-col"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#6324eb]/20 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />

                        {/* Modal for Quality Guide */}
                        <QualityGuideModal
                            isOpen={showQualityModal}
                            onClose={() => setShowQualityModal(false)}
                        />

                        {/* Main Scrollable Content */}
                        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
                            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-32">

                                {/* Header Section */}
                                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 mb-12 border-b border-white/5 pb-8">
                                    <div className="space-y-4 max-w-3xl">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Fase de Control de Calidad
                                        </div>
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
                                            Revisar y Enviar
                                        </h2>
                                        <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
                                            Has completado las <span className="text-white font-bold">{repetitions} repeticiones</span> de <span className="text-[#6324eb] font-black">{signName}</span>.
                                            Revisa cada clip y elimina los que tengan mala iluminación o errores.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setShowQualityModal(true)}
                                        className="group flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-sm font-bold transition-all border border-white/10 hover:border-white/20 w-full xl:w-auto justify-center"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#6324eb] group-hover:bg-[#7c4dff] flex items-center justify-center transition-colors shadow-lg shadow-[#6324eb]/20">
                                            <span className="text-xs font-black">?</span>
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-xs text-zinc-400 font-medium">¿Tienes dudas?</span>
                                            <span className="block text-white">Ver Guía de Calidad</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors ml-2" />
                                    </button>
                                </div>

                                {/* Modal for Re-recording */}
                                <RerecordModal
                                    isOpen={showRerecordModal}
                                    onClose={() => setShowRerecordModal(false)}
                                    missingCount={missingCount}
                                    onConfirm={(count: number) => {
                                        setShowRerecordModal(false);
                                        if (onSmartRerecord) onSmartRerecord(count);
                                    }}
                                />

                                <IncompleteSubmissionModal
                                    isOpen={showIncompleteModal}
                                    onClose={() => setShowIncompleteModal(false)}
                                    missingCount={missingCount}
                                    onRecordMissing={() => {
                                        setShowIncompleteModal(false);
                                        setShowRerecordModal(true);
                                    }}
                                    onConfirmSubmit={() => {
                                        setShowIncompleteModal(false);
                                        if (onSubmit) onSubmit();
                                    }}
                                />

                                {/* Re-record Banner (If videos are missing) */}
                                {missingCount > 0 && recordings.length > 0 && (
                                    <div className="relative z-10 mb-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                                                <RotateCcw className="w-6 h-6 text-amber-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Faltan {missingCount} video{missingCount !== 1 ? 's' : ''}</h3>
                                                <p className="text-amber-200/80">Has eliminado grabaciones. Completa tu tarea regrabando los videos faltantes.</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowRerecordModal(true)}
                                            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl whitespace-nowrap shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
                                        >
                                            Completar Grabación
                                        </button>
                                    </div>
                                )}

                                {/* Video Grid */}
                                <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
                                    {recordings.length > 0 ? (
                                        recordings.map((recording, arrayIndex) => (
                                            <VideoReviewCard
                                                key={recording.id}
                                                index={arrayIndex + 1}
                                                signName={signName}
                                                duration={recording.duration || recDuration}
                                                videoUrl={recording.localBlobUrl || recording.previewUrl}
                                                uploadProgress={recording.uploadProgress}
                                                uploadStatus={recording.uploadStatus}
                                                onDelete={onDeleteRecording ? () => onDeleteRecording(recording.id) : undefined}
                                                disabled={false}
                                            />
                                        ))
                                    ) : studioState === "complete" ? (
                                        // Empty state - all videos deleted
                                        <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
                                            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 max-w-lg text-center backdrop-blur-sm">
                                                <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                                                    <AlertTriangle className="w-12 h-12 text-amber-500" />
                                                </div>
                                                <h3 className="text-2xl font-black text-white mb-4">
                                                    ¡Atención! Sin videos para enviar
                                                </h3>
                                                <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                                                    Has eliminado todas las grabaciones. Necesitas al menos un video válido para completar la tarea.
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        // If all deleted, suggest re-recording initial amount or at least 1
                                                        if (onSmartRerecord) {
                                                            onSmartRerecord(initialRepetitions || repetitions);
                                                        } else {
                                                            setStudioState("brief");
                                                        }
                                                    }}
                                                    className="w-full px-6 py-4 bg-[#6324eb] hover:bg-[#6324eb]/90 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-[#6324eb]/20"
                                                >
                                                    <RotateCcw className="w-5 h-5" />
                                                    Volver a Grabar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Placeholder cards
                                        Array.from({ length: repetitions }).map((_, index) => (
                                            <VideoReviewCard
                                                key={index}
                                                index={index + 1}
                                                signName={signName}
                                                duration={recDuration}
                                            />
                                        ))
                                    )}
                                </div>

                                {isUploading && (
                                    <div className="mt-12 max-w-2xl mx-auto bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Loader2 className="w-5 h-5 text-[#6324eb] animate-spin" />
                                                <span className="text-white font-bold text-lg">Subiendo videos a la nube</span>
                                            </div>
                                            <span className="text-[#6324eb] font-black text-xl">{overallProgress}%</span>
                                        </div>
                                        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#6324eb] transition-all duration-300 ease-out"
                                                style={{ width: `${overallProgress}%` }}
                                            />
                                        </div>
                                        <p className="text-zinc-500 text-sm mt-3 text-center">
                                            Por favor no cierres la pestaña hasta completar la carga.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </main>

                        {/* Fixed Actions Footer */}
                        {recordings.length > 0 && (
                            <footer className="shrink-0 bg-[#090513]/90 backdrop-blur-xl border-t border-white/10 p-4 md:p-6 lg:px-8 z-50">
                                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                                    {/* Status Info */}
                                    <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-start">
                                        <div className="flex items-center gap-4 px-5 py-3 rounded-xl bg-white/5 border border-white/5">
                                            <div className="flex -space-x-2">
                                                {recordings.slice(0, 3).map((r, i) => (
                                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#161121] flex items-center justify-center text-[10px] font-bold text-white ${r.uploadStatus === 'completed' ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                                                        {i + 1}
                                                    </div>
                                                ))}
                                                {recordings.length > 3 && (
                                                    <div className="w-8 h-8 rounded-full border-2 border-[#161121] bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white">
                                                        +{recordings.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold text-sm">
                                                    {recordings.length} {recordings.length === 1 ? 'Video' : 'Videos'} Listos
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    {isUploading ? 'Sincronizando...' : 'Sincronización completa'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <button
                                            onClick={onCancel}
                                            disabled={isUploading}
                                            className="px-8 py-4 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1 md:flex-none"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (missingCount > 0) {
                                                    setShowIncompleteModal(true);
                                                } else if (onSubmit) {
                                                    onSubmit();
                                                } else {
                                                    setStudioState("submitted");
                                                }
                                            }}
                                            disabled={!allCompleted || recordings.length === 0}
                                            className={`px-10 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex-1 md:flex-none min-w-[240px] ${missingCount > 0
                                                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                                                : 'bg-[#6324eb] hover:bg-[#501ac2] text-white shadow-[#6324eb]/20'
                                                }`}
                                        >
                                            {isUploading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Subiendo {overallProgress}%</span>
                                                </>
                                            ) : missingCount > 0 ? (
                                                <>
                                                    <AlertCircle className="w-5 h-5" />
                                                    <span>Faltan {missingCount} Videos</span>
                                                </>
                                            ) : allCompleted ? (
                                                <>
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    <span>Confirmar y Enviar</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Procesando...</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </footer>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
