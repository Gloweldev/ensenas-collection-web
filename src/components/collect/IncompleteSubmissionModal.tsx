import { AlertTriangle, RotateCcw, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IncompleteSubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    missingCount: number;
    onRecordMissing: () => void;
    onConfirmSubmit: () => void;
}

export function IncompleteSubmissionModal({
    isOpen,
    onClose,
    missingCount,
    onRecordMissing,
    onConfirmSubmit
}: IncompleteSubmissionModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-[#090513] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 md:p-8">
                        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-amber-500" />
                        </div>

                        <h3 className="text-2xl font-bold text-white text-center mb-2">
                            Faltan {missingCount} {missingCount === 1 ? 'toma' : 'tomas'}
                        </h3>

                        <p className="text-zinc-400 text-center text-sm md:text-base mb-8 leading-relaxed">
                            Te sugerimos completar todas las repeticiones para asegurar la mejor calidad de datos. ¿Qué deseas hacer?
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onRecordMissing}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#6324eb] hover:bg-[#501ac2] text-white font-bold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#6324eb]/20"
                            >
                                <RotateCcw className="w-5 h-5" />
                                <span>Grabar faltantes</span>
                            </button>

                            <button
                                onClick={onConfirmSubmit}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium rounded-xl transition-all"
                            >
                                <span>Enviar lo que tengo</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
