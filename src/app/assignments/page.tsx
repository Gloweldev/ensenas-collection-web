"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import {
    ClipboardList,
    CheckCircle2,
    Camera,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useAssignments } from "@/hooks/use-assignments";
import { Skeleton } from "@/components/ui/skeleton";

// Helper function for category display
const getCategoryLabel = (category: string): string => {
    const categoryMap: Record<string, string> = {
        'social': 'Social',
        'verb': 'Verbos',
        'context': 'Contexto',
        'question': 'Preguntas',
    };
    return categoryMap[category] || category;
};

const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
        'social': 'bg-blue-500/20 text-blue-400 border-blue-500/20',
        'verb': 'bg-green-500/20 text-green-400 border-green-500/20',
        'context': 'bg-orange-500/20 text-orange-400 border-orange-500/20',
        'question': 'bg-purple-500/20 text-purple-400 border-purple-500/20',
    };
    return colorMap[category] || 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
};

export default function AssignmentsPage() {
    const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
    const { assignments, isLoading } = useAssignments();
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    // Filter assignments based on status
    const pendingAssignments = assignments.filter((a: any) => a.status === 'available');
    const completedAssignments = assignments.filter((a: any) => a.status === 'completed' || a.status === 'pending');

    const displayedPending = pendingAssignments.slice(0, page * ITEMS_PER_PAGE);
    const displayedCompleted = completedAssignments.slice(0, page * ITEMS_PER_PAGE);

    const hasMorePending = pendingAssignments.length > displayedPending.length;
    const hasMoreCompleted = completedAssignments.length > displayedCompleted.length;

    const handleTabChange = (tab: "pending" | "completed") => {
        setActiveTab(tab);
        setPage(1);
    };

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
                    <div className="flex flex-col gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                                Asignaciones de Grabación
                            </h1>
                            <p className="text-slate-400 font-light text-lg">
                                Gestiona y expande tu contribución al dataset.
                            </p>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 p-1 bg-black/20 rounded-2xl border border-white/5 w-fit backdrop-blur-md">
                            <button
                                onClick={() => handleTabChange("pending")}
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
                                onClick={() => handleTabChange("completed")}
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
                                {isLoading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <Skeleton key={i} className="h-48 rounded-3xl bg-white/5" />
                                        ))}
                                    </div>
                                ) : activeTab === "pending" ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                            {displayedPending.map((assignment) => (
                                                <div
                                                    key={assignment.id}
                                                    className="group relative bg-[#1e1a2f]/60 hover:bg-[#1e1a2f] border border-white/5 hover:border-[#6324eb]/30 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col gap-4"
                                                >
                                                    {/* Card Header */}
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(assignment.category)}`}>
                                                                    {getCategoryLabel(assignment.category)}
                                                                </span>
                                                            </div>
                                                            <h3 className="text-xl font-bold text-white group-hover:text-[#6324eb] transition-colors">
                                                                {assignment.slug.replace(/_/g, ' ').toUpperCase()}
                                                            </h3>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#6324eb]/20 group-hover:scale-110 transition-all duration-300">
                                                            <Camera className="w-5 h-5 text-slate-400 group-hover:text-[#6324eb]" />
                                                        </div>
                                                    </div>

                                                    {/* Footer Button */}
                                                    <div className="pt-2 mt-auto">
                                                        <Link href={`/collect/${assignment.slug}`} className="block">
                                                            <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-[#6324eb] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                                                                Iniciar Captura
                                                                <ArrowRight className="w-4 h-4" />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Load More Pending */}
                                        {hasMorePending && (
                                            <div className="mt-8 flex justify-center">
                                                <button
                                                    onClick={() => setPage(p => p + 1)}
                                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10"
                                                >
                                                    Cargar más ({pendingAssignments.length - displayedPending.length})
                                                </button>
                                            </div>
                                        )}

                                        {/* Empty State */}
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
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-3">
                                            {displayedCompleted.map((assignment) => (
                                                <div
                                                    key={assignment.id}
                                                    className="group flex flex-col md:flex-row items-center justify-between p-4 bg-[#1e1a2f]/40 border border-white/5 rounded-2xl hover:bg-[#1e1a2f]/80 hover:border-[#6324eb]/20 transition-all duration-300"
                                                >
                                                    <div className="flex items-center gap-5 w-full md:w-auto">
                                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-white mb-1">{assignment.slug.replace(/_/g, ' ').toUpperCase()}</h3>
                                                            <p className="text-xs text-slate-400 flex items-center gap-2">
                                                                <span className="text-emerald-400">
                                                                    {assignment.status === 'completed' ? 'Completado' : 'En Revisión'}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pl-16 md:pl-0">
                                                        <p className="hidden md:block text-xs text-slate-500 text-right mr-4 max-w-[200px]">
                                                            Ayuda grabando variantes con diferente ropa o luz.
                                                        </p>
                                                        <Link href={`/collect/${assignment.slug}`}>
                                                            <button className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 whitespace-nowrap">
                                                                <Camera className="w-4 h-4" />
                                                                Grabar Variante
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Load More Completed */}
                                        {hasMoreCompleted && (
                                            <div className="mt-8 flex justify-center">
                                                <button
                                                    onClick={() => setPage(p => p + 1)}
                                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10"
                                                >
                                                    Cargar más ({completedAssignments.length - displayedCompleted.length})
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
