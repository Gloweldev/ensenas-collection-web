"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white font-sans p-6">
            <div className="text-center space-y-6 max-w-md">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#6324eb] opacity-20 blur-2xl rounded-full" />
                    <span className="relative text-6xl font-black font-mono">404</span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight">Señal Perdida</h1>

                <p className="text-zinc-400 text-lg">
                    La página que buscas no existe o ha sido movida.
                    Nuestra IA aún no puede predecir el futuro, pero estamos trabajando en ello.
                </p>

                <div className="pt-8">
                    <Link href="/">
                        <button className="flex items-center gap-2 mx-auto px-6 py-3 bg-white text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-colors">
                            <MoveLeft className="w-4 h-4" /> Volver al Inicio
                        </button>
                    </Link>
                </div>
            </div>

            <div className="fixed bottom-6 text-xs text-zinc-600 font-mono">
                ERR_NO_DATA_FOUND
            </div>
        </div>
    );
}
