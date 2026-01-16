import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "EnSeñas AI | The Neural Translation Engine for LSM",
    description: "La primera IA capaz de traducir Lengua de Señas Mexicana en tiempo real. Ayúdanos a construir el futuro de la inclusión.",
    keywords: ["LSM", "Lengua de Señas", "IA", "AI", "Traductor", "Inclusión", "México", "Deep Tech"],
    openGraph: {
        title: "EnSeñas AI - Decoding the Invisible Language",
        description: "Construyendo el puente entre el silencio y la voz. Únete a la recolección de datos.",
        type: "website",
        images: ["/og-marketing.jpg"], // Ensure this exists or is a placeholder
        siteName: "EnSeñas AI",
    },
    twitter: {
        card: "summary_large_image",
        title: "EnSeñas AI | Neural Translation",
        description: "La revolución de la accesibilidad comienza contigo.",
    }
};

import { MarketingHeader } from "@/components/marketing/MarketingHeader";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-zinc-950 text-white min-h-screen selection:bg-[#6324eb] selection:text-white`}>
            <MarketingHeader />
            <main className="relative">
                {children}
            </main>
            <footer className="border-t border-white/5 bg-zinc-950 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-zinc-500 text-sm">
                        © 2025 EnSeñas AI. All systems operational.
                    </div>
                    <div className="flex gap-6">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-zinc-500">SYSTEM STATUS: ONLINE</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
