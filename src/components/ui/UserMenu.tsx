"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

interface UserMenuProps {
    initial?: string;
    className?: string; // For overriding button size/styles
}

export function UserMenu({ initial = "A", className }: UserMenuProps) {
    const { logout, userProfile } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Get display initial from profile or fallback
    const displayInitial = userProfile?.name
        ? userProfile.name.charAt(0).toUpperCase()
        : initial;

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "rounded-full bg-gradient-to-br from-[#6324eb] to-purple-600 border-2 border-[#6324eb]/30 flex items-center justify-center text-white font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#6324eb]/50",
                    className
                )}
            >
                {displayInitial}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1c1629] border border-white/10 shadow-xl overflow-hidden z-50 origin-top-right"
                    >
                        <div className="p-1">
                            <Link
                                href="/profile"
                                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 rounded-lg transition-colors group"
                                onClick={() => setIsOpen(false)}
                            >
                                <User className="w-4 h-4 text-slate-400 group-hover:text-[#6324eb] transition-colors" />
                                Mi Perfil
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors group text-left"
                            >
                                <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                                Cerrar sesión
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
