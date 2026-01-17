"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Video, RefreshCw, AlertCircle } from "lucide-react";
import { useState } from "react";

interface RerecordModalProps {
    isOpen: boolean;
    onClose: () => void;
    missingCount: number;
    onConfirm: (count: number) => void;
}

export function RerecordModal({ isOpen, onClose, missingCount, onConfirm }: RerecordModalProps) {
    const [selectedCount, setSelectedCount] = useState(missingCount);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-[#0f0a1f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#6324eb]/20 flex items-center justify-center">
                                <Video className="w-5 h-5 text-[#6324eb]" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Completar Grabación</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-200/80">
                                Has eliminado <strong>{missingCount} video(s)</strong>.
                                Puedes elegir cuántos quieres volver a grabar para completar tu asignación.
                            </p>
                        </div>

                        {/* Slider / Selection */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm font-medium text-zinc-400">
                                <span>Videos a grabar:</span>
                                <span className="text-white text-lg font-bold">{selectedCount}</span>
                            </div>

                            <input
                                type="range"
                                min="1"
                                max={missingCount}
                                value={selectedCount}
                                onChange={(e) => setSelectedCount(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#6324eb]"
                            />

                            <div className="flex justify-between text-xs text-zinc-600 font-medium">
                                <span>1</span>
                                <span>{missingCount} (Todos)</span>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-500 text-center">
                            Se conservarán los videos que NO eliminaste.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="p-6 pt-0 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => onConfirm(selectedCount)}
                            className="flex-[2] py-3 px-4 bg-[#6324eb] hover:bg-[#501ac2] text-white font-bold rounded-xl shadow-lg shadow-[#6324eb]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Regrabar {selectedCount} Video{selectedCount !== 1 ? 's' : ''}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
