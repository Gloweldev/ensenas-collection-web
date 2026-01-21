"use client";

import { motion } from "framer-motion";
import {
    Upload,
    Hand,
    LayoutDashboard,
    Trophy,
    User,
    Users,
    Globe,
    ClipboardList
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { UserMenu } from "@/components/ui/UserMenu";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        // { icon: Upload, label: "Upload", href: "#" }, // Upload button is separate in desktop, but in dock it is an item
        { icon: Globe, label: "Misión", href: "/nuestra-mision" },
        // { icon: Trophy, label: "Community", href: "#" },
        // { icon: User, label: "Perfil", href: "#" },
    ];

    const dockItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: ClipboardList, label: "Asignaciones", href: "/assignments" },
        { icon: Users, label: "Comunidad", href: "/community" },
        { icon: Globe, label: "Misión", href: "/nuestra-mision" },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Top Navigation - Desktop */}
            <header
                className="hidden lg:flex sticky top-0 z-50 items-center justify-between border-b border-white/5 bg-[#161122]/80 backdrop-blur-md px-4 py-3 lg:px-10"
            >
                <div className="flex items-center gap-4 text-white ml-2">
                    <Link href="/dashboard" className="hover:opacity-90 transition-opacity">
                        <Logo width={140} height={40} />
                    </Link>
                </div>

                {/* Center Navigation */}
                <div className="flex flex-1 justify-center">
                    <nav className="flex items-center gap-1 rounded-full bg-white/5 p-1 border border-white/10 backdrop-blur-sm">
                        <Link
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all ${isActive("/dashboard")
                                ? "bg-[#6324eb]/20 border border-[#6324eb]/20 text-white shadow-[0_0_15px_rgba(99,36,235,0.25)] hover:bg-[#6324eb]/30"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            href="/dashboard"
                        >
                            <LayoutDashboard className={`w-[18px] h-[18px] ${isActive("/dashboard") ? "text-[#8b5cf6]" : ""}`} />
                            Dashboard
                        </Link>
                        <Link
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all ${isActive("/assignments")
                                ? "bg-[#6324eb]/20 border border-[#6324eb]/20 text-white shadow-[0_0_15px_rgba(99,36,235,0.25)] hover:bg-[#6324eb]/30"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            href="/assignments"
                        >
                            <ClipboardList className={`w-[18px] h-[18px] ${isActive("/assignments") ? "text-[#8b5cf6]" : ""}`} />
                            Asignaciones
                        </Link>
                        <Link
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all ${isActive("/community")
                                ? "bg-[#6324eb]/20 border border-[#6324eb]/20 text-white shadow-[0_0_15px_rgba(99,36,235,0.25)] hover:bg-[#6324eb]/30"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            href="/community"
                        >
                            <Users className={`w-[18px] h-[18px] ${isActive("/community") ? "text-[#8b5cf6]" : ""}`} />
                            Comunidad
                        </Link>
                        <Link
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all ${isActive("/nuestra-mision")
                                ? "bg-[#6324eb]/20 border border-[#6324eb]/20 text-white shadow-[0_0_15px_rgba(99,36,235,0.25)] hover:bg-[#6324eb]/30"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            href="/nuestra-mision"
                        >
                            <Globe className={`w-[18px] h-[18px] ${isActive("/nuestra-mision") ? "text-[#8b5cf6]" : ""}`} />
                            Nuestra Misión
                        </Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <UserMenu initial="A" className="w-10 h-10" />
                </div>
            </header>

            {/* Mobile Top Bar */}
            <div
                className="lg:hidden sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#161122]/80 backdrop-blur-md px-4 py-3"
            >
                <div className="flex items-center gap-3 ml-2">
                    <Link href="/dashboard" className="hover:opacity-90 transition-opacity">
                        <Logo width={120} height={35} />
                    </Link>
                </div>
                <UserMenu initial="A" className="w-9 h-9 text-sm" />
            </div>

            {/* Page Content */}
            <div className="flex-1 flex flex-col">
                {children}
            </div>

            {/* Bottom Navigation Dock - Mobile Only */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe"
            >
                <div className="mx-4 mb-4 rounded-3xl border border-white/10 bg-[#161122] shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-around px-2 py-3">
                        {dockItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (
                                <Link href={item.href} key={item.label} className="w-full">
                                    <div
                                        className={`w-full flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-2xl transition-all ${active
                                            ? "bg-[#6324eb]/20 text-[#6324eb]"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${active ? "drop-shadow-[0_0_8px_rgba(99,36,235,0.6)]" : ""}`} />
                                        <span className="text-[10px] font-semibold">{item.label}</span>
                                        {active && (
                                            <div
                                                className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#6324eb] rounded-full"
                                            />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <style jsx global>{`
                /* Safe area padding for iOS notch */
                .pb-safe {
                    padding-bottom: env(safe-area-inset-bottom);
                }
            `}</style>
        </div>
    );
}
