"use client";

import { Mail, Shield, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
    const { userProfile, user, logout } = useAuth();

    const displayUser = {
        name: userProfile?.name || user?.displayName || "Usuario",
        email: userProfile?.email || user?.email || "No email",
        role: userProfile?.role || "VOLUNTEER"
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="min-h-screen bg-[#0f0a19] p-4 pb-32 lg:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/dashboard"
                        className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
                </div>

                {/* Profile Card */}
                <div className="bg-[#161122] rounded-2xl border border-white/5 p-6 md:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6324eb] to-purple-600 flex items-center justify-center text-4xl font-bold text-white border-4 border-[#161122] shadow-xl shrink-0">
                            {displayUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{displayUser.name}</h2>
                            <div className="flex justify-center md:justify-start">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#6324eb]/10 text-[#6324eb] text-xs font-semibold mt-2 border border-[#6324eb]/20">
                                    <Shield className="w-3 h-3" />
                                    {displayUser.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/5 my-6" />

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-slate-300 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Correo Electrónico</p>
                                <p className="font-medium text-white">{displayUser.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-slate-300 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center shrink-0">
                                <Shield className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Rol de Sistema</p>
                                <p className="font-medium text-white">{displayUser.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3 rounded-xl font-semibold transition-all"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-5 h-5" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
