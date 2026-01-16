import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sun, Maximize, Palette, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface QualityGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QualityGuideModal({ isOpen, onClose }: QualityGuideModalProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Iluminación",
            description: "Asegúrate de tener una fuente de luz frente a ti. Evita tener ventanas o luces fuertes detrás de de ti.",
            icon: <Sun className="w-8 h-8 text-amber-400" />,
            good: "Luz frontal suave y clara",
            bad: "Contraluz o oscuridad total",
            color: "bg-amber-500/10",
            borderColor: "border-amber-500/20"
        },
        {
            title: "Encuadre",
            description: "Tu rostro y hombros deben ser visibles. Deja espacio suficiente para que tus manos se vean completamente al hacer las señas.",
            icon: <Maximize className="w-8 h-8 text-blue-400" />,
            good: "Torso superior y espacio para manos",
            bad: "Muy cerca o muy lejos",
            color: "bg-blue-500/10",
            borderColor: "border-blue-500/20"
        },
        {
            title: "Fondo",
            description: "Usa un fondo lo más limpio posible. Una pared de color sólido es ideal para que la IA detecte mejor tus movimientos.",
            icon: <Palette className="w-8 h-8 text-purple-400" />,
            good: "Pared lisa o fondo ordenado",
            bad: "Mucho desorden o personas detrás",
            color: "bg-purple-500/10",
            borderColor: "border-purple-500/20"
        }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onClose();
            // Reset after closing animation finishes
            setTimeout(() => setCurrentStep(0), 300);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-[#1a1528] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                            <motion.div
                                className="h-full bg-[#6324eb]"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8 pb-6">
                            {/* Step Content */}
                            <div className="flex flex-col items-center text-center mt-4">
                                <motion.div
                                    key={currentStep}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className={`w-20 h-20 rounded-2xl ${steps[currentStep].color} border ${steps[currentStep].borderColor} flex items-center justify-center mb-6`}
                                >
                                    {steps[currentStep].icon}
                                </motion.div>

                                <motion.div
                                    key={`text-${currentStep}`}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h3 className="text-2xl font-black text-white mb-3">
                                        {steps[currentStep].title}
                                    </h3>
                                    <p className="text-zinc-400 mb-8 leading-relaxed">
                                        {steps[currentStep].description}
                                    </p>
                                </motion.div>

                                {/* Do's and Don'ts */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 flex flex-col items-center gap-2"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-green-400" />
                                        </div>
                                        <span className="text-green-200 text-sm font-medium">{steps[currentStep].good}</span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex flex-col items-center gap-2"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                            <X className="w-4 h-4 text-red-400" />
                                        </div>
                                        <span className="text-red-200 text-sm font-medium">{steps[currentStep].bad}</span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="p-6 bg-black/20 border-t border-white/5 flex items-center justify-between">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentStep === 0
                                        ? 'text-white/20 cursor-not-allowed'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Anterior
                            </button>

                            <div className="flex gap-2">
                                {steps.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'bg-[#6324eb] w-6' : 'bg-white/20'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#6324eb] hover:bg-[#6324eb]/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#6324eb]/20"
                            >
                                {currentStep === steps.length - 1 ? (
                                    <>
                                        Entendido
                                        <Check className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Siguiente
                                        <ChevronRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
