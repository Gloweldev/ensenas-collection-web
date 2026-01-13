"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import {
    ClipboardList,
    CheckCircle2,
    Video,
    Camera,
    Clock,
    Search,
    Filter,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

// Mock Data
const assignments = [
    {
        id: "1",
        name: "HOLA",
        category: "Social",
        priority: "Alta",
        submissionCount: 0,
        difficulty: "Fácil"
    },
    {
        id: "2",
        name: "GRACIAS",
        category: "Social",
        priority: "Alta",
        submissionCount: 3,
        difficulty: "Fácil"
    },
    {
        id: "3",
        name: "AYUDA",
        category: "Emergencia",
        priority: "Crítica",
        submissionCount: 0,
        difficulty: "Media"
    },
    {
        id: "4",
        name: "BUENOS DÍAS",
        category: "Social",
        priority: "Media",
        submissionCount: 0,
        difficulty: "Fácil"
    },
    {
        id: "5",
        name: "POR FAVOR",
        category: "Social",
        priority: "Alta",
        submissionCount: 5,
        difficulty: "Fácil"
    },
    {
        id: "6",
        name: "HOSPITAL",
        category: "Lugares",
        priority: "Media",
        submissionCount: 0,
        difficulty: "Media"
    },
];

export default function AssignmentsPage() {
    const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

    const pendingAssignments = assignments.filter(a => a.submissionCount === 0);
    const completedAssignments = assignments.filter(a => a.submissionCount > 0);

    return (
        <MainLayout>
            <div className="relative min-h-screen bg-[#161121]">
                {/* Background decoration */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6324eb]/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 pb-32">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                                Asignaciones de Grabación
                            </h1>
                            <p className="text-slate-400 font-light text-lg">
                                Gestiona y expande tu contribución al dataset.
                            </p>
                        </div>

                        {/* Summary Stats */}
                        <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-2 pr-6 border border-white/5 backdrop-blur-sm">
                            <div className="bg-[#6324eb]/20 p-3 rounded-xl">
                                <Video className="w-5 h-5 text-[#6324eb]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Videos</span>
                                <span className="text-white font-bold text-lg leading-none">
                                    {assignments.reduce((acc, curr) => acc + curr.submissionCount, 0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 p-1 bg-black/20 rounded-2xl border border-white/5 w-fit backdrop-blur-md">
                            <button
                                onClick={() => setActiveTab("pending")}
                                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "pending"
                                        ? "text-white"
                                        : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                {activeTab === "pending" && (
                                    <motion.div
                                        layoutId="tab-bg"
                                        className="absolute inset-0 bg-[#6324eb] rounded-xl shadow-lg shadow-[#6324eb]/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <ClipboardList className="w-4 h-4" />
                                    Pendientes
                                    <span className="bg-black/20 px-2 py-0.5 rounded-full text-[10px] backdrop-blur-sm">
                                        {pendingAssignments.length}
                                    </span>
                                </span>
                            </button>

                            <button
                                onClick={() => setActiveTab("completed")}
                                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "completed"
                                        ? "text-white"
                                        : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                {activeTab === "completed" && (
                                    <motion.div
                                        layoutId="tab-bg"
                                        className="absolute inset-0 bg-[#6324eb] rounded-xl shadow-lg shadow-[#6324eb]/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Completadas
                                </span>
                            </button>
                        </div>

                        {/* Content Area */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="min-h-[400px]"
                            >
                                {activeTab === "pending" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {pendingAssignments.map((assignment) => (
                                            <div
                                                key={assignment.id}
                                                className="group relative bg-[#1e1a2f]/60 hover:bg-[#1e1a2f] border border-white/5 hover:border-[#6324eb]/30 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col gap-4 backdrop-blur-sm"
                                            >
                                                {/* Card Header */}
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                                                                ${assignment.category === 'Emergencia' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                                                                    assignment.category === 'Social' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                                                                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                                                                }
                                                            `}>
                                                                {assignment.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-white group-hover:text-[#6324eb] transition-colors">
                                                            "{assignment.name}"
                                                        </h3>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#6324eb]/20 group-hover:scale-110 transition-all duration-300">
                                                        <Camera className="w-5 h-5 text-slate-400 group-hover:text-[#6324eb]" />
                                                    </div>
                                                </div>

                                                {/* Card Body */}
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <Filter className="w-3.5 h-3.5 opacity-70" />
                                                        <span>{assignment.difficulty}</span>
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-slate-600" />
                                                    <div className="flex items-center gap-1.5 ">
                                                        <Clock className="w-3.5 h-3.5 opacity-70" />
                                                        <span>Prioridad {assignment.priority}</span>
                                                    </div>
                                                </div>

                                                {/* Footer Button */}
                                                <div className="pt-2 mt-auto">
                                                    <Link href={`/collect/${assignment.name.toLowerCase()}`} className="block">
                                                        <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-[#6324eb] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                                                            Iniciar Captura
                                                            <ArrowRight className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Empty State visual helper (mock) */}
                                        {pendingAssignments.length === 0 && (
                                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-2">¡Todo al día!</h3>
                                                <p className="text-slate-400 max-w-md">
                                                    Has completado todas las asignaciones pendientes. Vuelve más tarde para nuevas misiones.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        {completedAssignments.map((assignment) => (
                                            <div
                                                key={assignment.id}
                                                className="group flex flex-col md:flex-row items-center justify-between p-4 bg-[#1e1a2f]/40 border border-white/5 rounded-2xl hover:bg-[#1e1a2f]/80 hover:border-[#6324eb]/20 transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-5 w-full md:w-auto">
                                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white mb-1">{assignment.name}</h3>
                                                        <p className="text-xs text-slate-400 flex items-center gap-2">
                                                            <span className="text-emerald-400">Completado</span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                                                            {assignment.submissionCount} Videos Subidos
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pl-16 md:pl-0">
                                                    <p className="hidden md:block text-xs text-slate-500 text-right mr-4 max-w-[200px]">
                                                        Ayuda grabando variantes con diferente ropa o luz.
                                                    </p>
                                                    <button className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 whitespace-nowrap">
                                                        <Camera className="w-4 h-4" />
                                                        Grabar Variante
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
