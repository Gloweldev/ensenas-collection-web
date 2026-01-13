// Video Review Card Component
import { useState } from "react";
import { Trash2, Play } from "lucide-react";

interface VideoReviewCardProps {
    index: number;
    signName: string;
    duration: number;
}

function VideoReviewCard({ index, signName, duration }: VideoReviewCardProps) {
    const [isSelected, setIsSelected] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    // Mock accuracy - in real app this would come from AI analysis
    const accuracy = 92 + Math.floor(Math.random() * 8);

    return (
        <div
            className="group relative flex flex-col gap-3 bg-white/5 border border-white/10 backdrop-blur-md p-3 rounded-xl transition-all hover:border-[#6324eb]/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-zinc-900 shadow-2xl">
                {/* Placeholder - in real app would be video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <span className="text-4xl font-bold text-zinc-700">#{index}</span>
                </div>

                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => setIsSelected(e.target.checked)}
                        className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-[#6324eb] focus:ring-[#6324eb] focus:ring-offset-zinc-950 cursor-pointer"
                    />
                </div>

                {/* Delete Button */}
                <button className="absolute top-2 right-2 z-10 p-1.5 bg-zinc-950/60 hover:bg-red-500 rounded-md transition-colors text-white">
                    <Trash2 className="w-4 h-4" />
                </button>

                {/* Play Overlay (on hover) */}
                {isHovered && (
                    <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-[#6324eb] flex items-center justify-center text-white shadow-lg shadow-[#6324eb]/40">
                            <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="px-1">
                <p className="text-white font-bold text-base">
                    {String(index).padStart(2, '0')} - &quot;{signName}&quot;
                </p>
                <div className="flex items-center justify-between text-zinc-400 text-xs mt-1">
                    <span>0:{String(duration).padStart(2, '0')}s</span>
                    <span className="text-[#6324eb]/80 font-medium">{accuracy}% Precisión</span>
                </div>
            </div>
        </div>
    );
}

export { VideoReviewCard };
