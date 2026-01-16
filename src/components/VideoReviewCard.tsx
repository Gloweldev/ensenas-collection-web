// Video Review Card Component
import { useState, useRef } from "react";
import { Trash2, Play, Pause, CheckCircle2, Loader2, AlertCircle, RotateCcw } from "lucide-react";

interface VideoReviewCardProps {
    index: number;
    signName: string;
    duration: number;
    videoUrl?: string;
    uploadProgress?: number;
    uploadStatus?: 'pending' | 'uploading' | 'completed' | 'error';
    isSelected?: boolean;
    onSelect?: (selected: boolean) => void;
    onDelete?: () => void;
    onRerecord?: () => void;
    disabled?: boolean;
}

function VideoReviewCard({
    index,
    signName,
    duration,
    videoUrl,
    uploadProgress = 0,
    uploadStatus = 'pending',
    isSelected = false,
    onSelect,
    onDelete,
    onRerecord,
    disabled = false,
}: VideoReviewCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const getStatusIcon = () => {
        switch (uploadStatus) {
            case 'completed':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'uploading':
                return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <div
            className="group relative flex flex-col gap-3 bg-white/5 border border-white/10 backdrop-blur-md p-3 rounded-xl transition-all hover:border-[#6324eb]/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-zinc-900 shadow-2xl">
                {videoUrl ? (
                    // Real video preview
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                ) : (
                    // Placeholder
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                        <span className="text-4xl font-bold text-zinc-700">#{index}</span>
                    </div>
                )}

                {/* Upload Progress Overlay */}
                {uploadStatus === 'uploading' && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
                        <span className="text-white text-sm font-mono">{uploadProgress}%</span>
                        <div className="w-3/4 h-1.5 bg-zinc-700 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-[#6324eb] transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Completed checkmark */}
                {uploadStatus === 'completed' && !isSelected && (
                    <div className="absolute top-2 right-2 z-10">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                )}

                {/* Selection Checkbox */}
                {onSelect && (
                    <div className="absolute top-2 left-2 z-10">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => onSelect(e.target.checked)}
                            disabled={disabled || uploadStatus === 'uploading'}
                            className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-[#6324eb] focus:ring-[#6324eb] focus:ring-offset-zinc-950 cursor-pointer disabled:opacity-50"
                        />
                    </div>
                )}

                {/* Action Buttons - show delete during uploading, completed, or error */}
                {(uploadStatus === 'uploading' || uploadStatus === 'completed' || uploadStatus === 'error') && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                        {/* Rerecord button - only when selected and completed */}
                        {isSelected && onRerecord && uploadStatus === 'completed' && (
                            <button
                                onClick={onRerecord}
                                disabled={disabled}
                                className="p-1.5 bg-zinc-950/60 hover:bg-[#6324eb] rounded-md transition-colors text-white disabled:opacity-50"
                                title="Regrabar"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        )}
                        {/* Delete button - always visible during upload or after */}
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                disabled={disabled}
                                className="p-1.5 bg-zinc-950/60 hover:bg-red-500 rounded-md transition-colors text-white disabled:opacity-50"
                                title="Eliminar"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}

                {/* Play Overlay (on hover) */}
                {isHovered && videoUrl && uploadStatus !== 'uploading' && (
                    <div
                        onClick={togglePlay}
                        className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center transition-opacity cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#6324eb] flex items-center justify-center text-white shadow-lg shadow-[#6324eb]/40">
                            {isPlaying ? (
                                <Pause className="w-6 h-6 fill-white" />
                            ) : (
                                <Play className="w-6 h-6 fill-white ml-0.5" />
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="px-1">
                <div className="flex items-center justify-between">
                    <p className="text-white font-bold text-base">
                        {String(index).padStart(2, '0')} - &quot;{signName}&quot;
                    </p>
                    {getStatusIcon()}
                </div>
                <div className="flex items-center justify-between text-zinc-400 text-xs mt-1">
                    <span>0:{String(duration).padStart(2, '0')}s</span>
                    {uploadStatus === 'completed' && (
                        <span className="text-green-500 font-medium">✓ Subido</span>
                    )}
                    {uploadStatus === 'uploading' && (
                        <span className="text-blue-400 font-medium">{uploadProgress}%</span>
                    )}
                    {uploadStatus === 'error' && (
                        <span className="text-red-500 font-medium">Error</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export { VideoReviewCard };

