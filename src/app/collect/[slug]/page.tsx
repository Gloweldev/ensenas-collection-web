"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { X, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getApiUrl } from '@/config/api';
import SuccessScreen from "@/components/SuccessScreen";
import { Logo } from "@/components/ui/Logo";
import { BriefingPhase } from "@/components/collect/BriefingPhase";
import { StudioPhase } from "@/components/collect/StudioPhase";
import { useAssignment } from "@/hooks/use-assignment";
import { useRecorder, VideoMetadata } from "@/hooks/use-recorder";
import { useStreamingUpload, type StreamingRecording } from "@/hooks/use-streaming-upload";
import { useAuth } from "@/context/auth-context";

type StudioState = "brief" | "countdown" | "recording" | "resting" | "complete" | "submitted";

export default function RecordingBriefPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const signName = slug?.toUpperCase() || "HOLA";
    const { user } = useAuth();

    // Fetch assignment data
    const { assignment, isLoading, error } = useAssignment(slug);

    const [repetitions, setRepetitions] = useState(5);
    const [recDuration, setRecDuration] = useState(3);
    const [restTime, setRestTime] = useState(2);

    // Studio State Machine
    const [studioState, setStudioState] = useState<StudioState>("brief");
    const [countdown, setCountdown] = useState(15);
    const [recordingTime, setRecordingTime] = useState(0);
    const [currentRep, setCurrentRep] = useState(1);
    const [restCountdown, setRestCountdown] = useState(0);
    const [submittedVideosCount, setSubmittedVideosCount] = useState(0); // Track submitted videos for success screen

    const webcamRef = useRef<Webcam>(null);

    // Track which capture indexes have been uploaded to prevent re-upload after delete
    const uploadedIndexesRef = useRef<Set<number>>(new Set());

    // Use recorder hook for capturing video
    const { startRecording, stopRecording, captures, isRecording, videoMetadata, clearCaptures } = useRecorder({
        webcamRef,
    });

    // Use streaming upload hook - uploads to MinIO immediately after each recording
    const {
        recordings,
        uploadRecording,
        deleteRecording,
        confirmAllRecordings,
        clearRecordings,
        isUploading,
        overallProgress,
        allCompleted,
        restoreRecordings,
    } = useStreamingUpload({
        assignmentId: assignment?.id || null,
        metadata: videoMetadata || undefined,
    });

    // Upload each capture to MinIO immediately after recording stops
    // Uses uploadedIndexesRef to prevent re-uploading after delete
    useEffect(() => {
        for (const capture of captures) {
            // Skip if already uploaded
            if (uploadedIndexesRef.current.has(capture.index)) {
                continue;
            }

            // Mark as uploaded and trigger upload
            uploadedIndexesRef.current.add(capture.index);
            uploadRecording(capture.blob, capture.index);
        }
    }, [captures, uploadRecording]);

    // Recording Timer - Auto-stop after configured duration
    useEffect(() => {
        if (studioState === "recording" && recordingTime >= recDuration) {
            // Time's up - stop recording
            stopRecording();

            // Transition to next state
            if (currentRep < repetitions) {
                setStudioState("resting");
                setRestCountdown(restTime);
            } else {
                setStudioState("complete");
            }
        }
    }, [recordingTime, recDuration, studioState, currentRep, repetitions, restTime, stopRecording]);

    // Recording Timer Increment - 100ms intervals for precise step indicators
    useEffect(() => {
        if (studioState === "recording") {
            const timer = setInterval(() => {
                setRecordingTime(prev => Math.round((prev + 0.1) * 10) / 10); // Increment by 0.1s
            }, 100);
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
    }, [studioState, restCountdown, currentRep, repetitions, startRecording]);

    const skipCountdown = () => {
        setCountdown(0);
    };

    // Enter Studio
    const handleEnterStudio = () => {
        setStudioState("countdown");
        setCountdown(15);
    };

    // Handle delete recording - removes from MinIO and DB
    const handleDeleteRecording = async (recordingId: string) => {
        await deleteRecording(recordingId);
    };

    // Handle submit - just confirm all uploads (videos are already in MinIO)
    const handleSubmit = async () => {
        if (!allCompleted || recordings.length === 0) return;

        try {
            const videosCount = recordings.length; // Save count before clearing
            const success = await confirmAllRecordings();
            if (success) {
                setSubmittedVideosCount(videosCount); // Save for success screen
                clearCaptures();
                clearRecordings();
                uploadedIndexesRef.current.clear();
                setStudioState("submitted");
            }
        } catch (err) {
            console.error('Confirm failed:', err);
        }
    };

    // Handle cancel - delete all recordings from MinIO/DB and navigate to dashboard
    const handleCancel = async () => {
        try {
            // Delete all recordings from MinIO and DB
            for (const recording of recordings) {
                if (recording.id && !recording.id.startsWith('temp-')) {
                    await deleteRecording(recording.id);
                }
            }
            // Clear local state
            clearCaptures();
            clearRecordings();
            uploadedIndexesRef.current.clear();
            localStorage.removeItem(SESSION_KEY);
            // Navigate to dashboard
            router.push('/dashboard');
        } catch (err) {
            console.error('Cancel cleanup failed:', err);
            // Still navigate even if cleanup fails
            router.push('/dashboard');
        }
    };

    // Session persistence key
    const SESSION_KEY = `ensenas_session_${slug}`;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

    // Save recording IDs to localStorage for persistence across browser sessions
    useEffect(() => {
        if (recordings.length > 0 && studioState === "complete") {
            const sessionData = {
                recordingIds: recordings.map(r => r.id),
                studioState: studioState,
                timestamp: Date.now(),
            };
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        }
    }, [recordings, studioState, SESSION_KEY]);

    // Restore session on mount if we have recordings in DB
    useEffect(() => {
        const restoreSession = async () => {
            const savedSession = localStorage.getItem(SESSION_KEY);
            if (savedSession && studioState === "brief" && user) {
                try {
                    const { recordingIds, timestamp } = JSON.parse(savedSession);
                    // Session reliable for 24 hours
                    const sessionValidity = 24 * 60 * 60 * 1000;
                    if (recordingIds && recordingIds.length > 0 && Date.now() - timestamp < sessionValidity) {

                        // Fetch the actual recording objects from API to get fresh presigned URLs
                        try {
                            const token = await user.getIdToken();
                            const response = await fetch(getApiUrl(`/recordings/my-recordings?ids=${recordingIds.join(',')}`), {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });

                            if (response.ok) {
                                const data = await response.json();
                                if (data.success && data.data.recordings) {
                                    const restoredRecordings: StreamingRecording[] = data.data.recordings.map((rec: any) => ({
                                        id: rec.id,
                                        startTime: 0, // Placeholder
                                        duration: 0, // Placeholder
                                        status: 'completed',
                                        uploadProgress: 100,
                                        uploadStatus: 'completed',
                                        previewUrl: rec.previewUrl, // Use the presigned URL from backend
                                        s3Key: rec.s3Key
                                    }));

                                    if (restoredRecordings.length > 0) {
                                        restoreRecordings(restoredRecordings);
                                        // Restore uploaded indexes tracking
                                        restoredRecordings.forEach((r, i) => uploadedIndexesRef.current.add(i));

                                        // Go to complete state
                                        setStudioState("complete");
                                        return;
                                    }
                                }
                            }
                        } catch (fetchErr) {
                            console.error("Failed to fetch restored recordings:", fetchErr);
                        }
                    }
                } catch (e) {
                    // Invalid session data, remove it
                    localStorage.removeItem(SESSION_KEY);
                }
            }
        };

        restoreSession();
    }, [SESSION_KEY, user]); // Run when user is available

    // Clean up localStorage on successful submit
    useEffect(() => {
        if (studioState === "submitted") {
            localStorage.removeItem(SESSION_KEY);
        }
    }, [studioState, SESSION_KEY]);

    // Browser close / tab close - delete recordings via sendBeacon
    // Browser close / tab close - Just warn, don't delete to allow refresh persistence
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (recordings.length > 0 && studioState !== "submitted" && studioState !== "brief") {
                // Show confirmation dialog only using standard browser mechanism
                e.preventDefault();
                e.returnValue = ''; // message is ignored by modern browsers but required
                return '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [recordings, studioState]);

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
    }, [studioState, countdown, startRecording]);

    // Loading State
    if (isLoading) {
        return (
            <div className="relative w-full h-dvh bg-[#161121] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#6324eb] animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg font-medium">Cargando asignación...</p>
                    <p className="text-zinc-500 text-sm mt-2">Preparando el estudio de grabación</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="relative w-full h-dvh bg-[#161121] flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="mb-6 p-4 rounded-full bg-red-500/10 w-20 h-20 flex items-center justify-center mx-auto">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-white text-2xl md:text-3xl font-bold mb-3">Seña No Encontrada</h1>
                    <p className="text-zinc-400 text-base mb-8">
                        {error === 'Assignment not found'
                            ? `No pudimos encontrar la palabra "${signName}". Por favor verifica que existe en el glosario.`
                            : 'Ocurrió un error al cargar los datos. Por favor intenta nuevamente.'}
                    </p>
                    <Link href="/assignments">
                        <button className="px-6 py-3 bg-[#6324eb] hover:bg-[#6324eb]/90 text-white font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-[#6324eb]/25">
                            <ArrowLeft className="w-4 h-4 inline mr-2" />
                            Volver a Asignaciones
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // Brief View (Initial State)
    if (studioState === "brief") {
        return (
            <div className="relative flex flex-col min-h-screen">
                {/* Custom Header */}
                <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#161122]/80 backdrop-blur-md px-6 md:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                            <Logo width={130} height={40} />
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

                <BriefingPhase
                    signName={signName}
                    videoUrl={assignment?.videoReferenceUrl || undefined}
                    repetitions={repetitions}
                    setRepetitions={setRepetitions}
                    recDuration={recDuration}
                    setRecDuration={setRecDuration}
                    restTime={restTime}
                    setRestTime={setRestTime}
                    onEnterStudio={handleEnterStudio}
                />
            </div>
        );
    }

    // Studio View (Countdown, Recording, Resting, Complete)
    if (studioState === "countdown" || studioState === "recording" || studioState === "resting" || studioState === "complete") {
        return (
            <>
                <StudioPhase
                    signName={signName}
                    studioState={studioState}
                    setStudioState={setStudioState}
                    countdown={countdown}
                    recordingTime={recordingTime}
                    currentRep={currentRep}
                    repetitions={repetitions}
                    recDuration={recDuration}
                    restCountdown={restCountdown}
                    webcamRef={webcamRef as React.RefObject<Webcam>}
                    onSkipCountdown={skipCountdown}
                    recordings={recordings}
                    isUploading={isUploading}
                    overallProgress={overallProgress}
                    allCompleted={allCompleted}
                    onDeleteRecording={handleDeleteRecording}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    slug={slug}
                />
            </>
        );
    }

    // Success Screen
    if (studioState === "submitted") {
        return (
            <div className="relative w-full h-dvh">
                <SuccessScreen signName={signName} videosSubmitted={submittedVideosCount} />
            </div>
        );
    }

    return null;
}
