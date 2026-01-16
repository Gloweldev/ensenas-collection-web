"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function MarketingHeader() {

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-zinc-950/50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Logo width={160} height={40} />
                </div>
                <nav className="hidden md:flex items-center p-1 bg-white/5 border border-white/10 rounded-full">
                    {[
                        { name: "Misión", id: "mision" },
                        { name: "Tecnología", id: "tecnologia" },
                        { name: "Comunidad", id: "comunidad" },
                        { name: "Impacto", id: "impacto" },
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={`#${item.id}`}
                            onClick={(e) => scrollToSection(e, item.id)}
                            className="px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-3 md:gap-4">
                    <a href="/login" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Ingresar
                    </a>
                    <a href="/login" className="md:hidden text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Entrar
                    </a>
                    <a href="/register" className="text-sm font-bold bg-white text-zinc-950 px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors whitespace-nowrap">
                        Contribuir
                    </a>
                </div>
            </div>
        </header>
    );
}
