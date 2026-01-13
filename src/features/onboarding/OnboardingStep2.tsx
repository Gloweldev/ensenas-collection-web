"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface OnboardingStep2Props {
    onDataChange: (data: { ageRange: string; gender: string }) => void;
    initialData?: { ageRange: string; gender: string };
}

export default function OnboardingStep2({ onDataChange, initialData }: OnboardingStep2Props) {
    const [ageRange, setAgeRange] = useState(initialData?.ageRange || "");
    const [gender, setGender] = useState(initialData?.gender || "");

    const handleAgeChange = (value: string) => {
        setAgeRange(value);
        onDataChange({ ageRange: value, gender });
    };

    const handleGenderChange = (value: string) => {
        setGender(value);
        onDataChange({ ageRange, gender: value });
    };

    return (
        <div className="w-full max-w-2xl">
            {/* Progress Steps */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 px-2"
            >
                <div className="flex justify-between items-end mb-3">
                    <span className="text-white font-medium">Paso 2 de 3</span>
                    <span className="text-sm text-gray-400">Demografía</span>
                </div>
                <div className="h-2 w-full bg-[#2f2447] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "33%" }}
                        animate={{ width: "66%" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="h-full bg-[#6324eb] rounded-full shadow-[0_0_12px_rgba(99,36,235,0.6)]"
                    />
                </div>
            </motion.div>

            {/* Glass Card Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#1e172e]/60 backdrop-blur-xl border border-white/8 rounded-2xl p-8 md:p-12 shadow-2xl"
            >
                {/* Card Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-10 text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        Balancea el dataset
                    </h2>
                    <p className="text-[#a492c8] text-lg font-light leading-relaxed max-w-xl">
                        Para ayudar a nuestra IA a reconocer la lengua de señas con precisión en todos los grupos, cuéntanos un poco sobre ti. Valoramos la diversidad de datos.
                    </p>
                </motion.div>

                {/* Form Inputs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="space-y-8"
                >
                    {/* Age Input */}
                    <div className="group space-y-2">
                        <label
                            className="block text-sm font-medium text-gray-300 transition-colors group-focus-within:text-[#6324eb]"
                            htmlFor="age-select"
                        >
                            Rango de Edad
                        </label>
                        <Select value={ageRange} onValueChange={handleAgeChange}>
                            <SelectTrigger
                                id="age-select"
                                className="w-full h-12 bg-[#2a2238] border-[#433366] text-white hover:border-gray-500 focus:ring-2 focus:ring-[#6324eb] focus:border-[#6324eb] transition-all"
                            >
                                <SelectValue placeholder="Selecciona tu rango de edad..." />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2a2238] border-[#433366] text-white">
                                <SelectGroup>
                                    <SelectItem value="18-24" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">18 - 24</SelectItem>
                                    <SelectItem value="25-34" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">25 - 34</SelectItem>
                                    <SelectItem value="35-44" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">35 - 44</SelectItem>
                                    <SelectItem value="45-54" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">45 - 54</SelectItem>
                                    <SelectItem value="55+" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">55+</SelectItem>
                                    <SelectItem value="na" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">Prefiero no decir</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Gender Input */}
                    <div className="group space-y-2">
                        <label
                            className="block text-sm font-medium text-gray-300 transition-colors group-focus-within:text-[#6324eb]"
                            htmlFor="gender-select"
                        >
                            Identidad de Género
                        </label>
                        <Select value={gender} onValueChange={handleGenderChange}>
                            <SelectTrigger
                                id="gender-select"
                                className="w-full h-12 bg-[#2a2238] border-[#433366] text-white hover:border-gray-500 focus:ring-2 focus:ring-[#6324eb] focus:border-[#6324eb] transition-all"
                            >
                                <SelectValue placeholder="Selecciona género..." />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2a2238] border-[#433366] text-white">
                                <SelectGroup>
                                    <SelectItem value="female" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">Femenino</SelectItem>
                                    <SelectItem value="male" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">Masculino</SelectItem>
                                    <SelectItem value="non-binary" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">No binario</SelectItem>
                                    <SelectItem value="transgender" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">Transgénero</SelectItem>
                                    <SelectItem value="other" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">Otro</SelectItem>
                                    <SelectItem value="na" className="focus:bg-[#6324eb]/20 focus:text-white cursor-pointer">Prefiero no decir</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </motion.div>
            </motion.div>

            {/* Privacy Hint */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center gap-2"
            >
                <Lock className="w-4 h-4" />
                Tus datos son anonimizados y utilizados únicamente para entrenamiento de la IA.
            </motion.p>
        </div>
    );
}
