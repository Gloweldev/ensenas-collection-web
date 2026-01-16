"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Info } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Logo } from "@/components/ui/Logo";

interface RegisterProps {
    onSwitchToLogin: () => void;
    onRegisterComplete?: () => void;
    isTransitioning?: boolean;
}

export default function Register({ onSwitchToLogin, onRegisterComplete, isTransitioning = false }: RegisterProps) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithFacebook } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Register:", { fullName, email, password });
        // TODO: Integrar con API de registro
        // After successful registration, trigger onboarding
        if (onRegisterComplete) {
            onRegisterComplete();
        }
    };

    const handleGoogleRegister = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            // Error is handled in auth context with toast
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookRegister = async () => {
        setIsLoading(true);
        try {
            await signInWithFacebook();
        } catch (error) {
            // Error is handled in auth context with toast
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-screen w-full flex-col overflow-hidden bg-[#161121]"
        >
            {/* Main Content Area */}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
            >
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6324eb]/20 blur-[120px] rounded-full pointer-events-none z-0" />

                <div className="w-full max-w-[480px] z-10">
                    {/* Header Section with Logo */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: isTransitioning ? 0 : 1
                        }}
                        transition={{ duration: 0.3, delay: isTransitioning ? 0 : 0.4 }}
                        className="text-center mb-8"
                    >


                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <Logo width={160} height={50} />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3 gradient-text">
                            Únete a la Misión
                        </h1>
                        <p className="text-slate-300 text-base font-normal">
                            Ayúdanos a cerrar la brecha de comunicación. <br className="hidden sm:block" />
                            Crea tu cuenta de EnSeñas AI hoy.
                        </p>
                    </motion.div>

                    {/* Card Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{
                            scale: isTransitioning ? 0.95 : 1,
                            opacity: 1,
                            x: isTransitioning ? 400 : 0
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut", delay: isTransitioning ? 0 : 0.2 }}
                        className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl"
                    >
                        {/* Social Auth */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleGoogleRegister}
                                type="button"
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 h-11 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-white text-sm font-medium"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span className="truncate">Google</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleFacebookRegister}
                                type="button"
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 h-11 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-white text-sm font-medium"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 flex-shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        <span className="truncate">Facebook</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative flex py-2 items-center mb-6">
                            <div className="flex-grow border-t border-zinc-700" />
                            <span className="flex-shrink-0 mx-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                O con correo
                            </span>
                            <div className="flex-grow border-t border-zinc-700" />
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Name Input */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-slate-200 ml-1" htmlFor="fullname">
                                    Nombre Completo
                                </label>
                                <div className="relative input-glow rounded-lg transition-all duration-200">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-zinc-400" />
                                    </span>
                                    <input
                                        className="w-full h-12 pl-10 pr-4 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#6324eb] focus:ring-1 focus:ring-[#6324eb] text-base transition-colors"
                                        id="fullname"
                                        placeholder="ej. Alex Morales"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-slate-200 ml-1" htmlFor="email">
                                    Correo Electrónico
                                </label>
                                <div className="relative input-glow rounded-lg transition-all duration-200">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-zinc-400" />
                                    </span>
                                    <input
                                        className="w-full h-12 pl-10 pr-4 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#6324eb] focus:ring-1 focus:ring-[#6324eb] text-base transition-colors"
                                        id="email"
                                        placeholder="nombre@ejemplo.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-slate-200 ml-1" htmlFor="password">
                                    Contraseña
                                </label>
                                <div className="relative input-glow rounded-lg transition-all duration-200">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-zinc-400" />
                                    </span>
                                    <input
                                        className="w-full h-12 pl-10 pr-12 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#6324eb] focus:ring-1 focus:ring-[#6324eb] text-base transition-colors"
                                        id="password"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#6324eb] hover:bg-[#521dc4] text-white text-base font-bold shadow-lg shadow-[#6324eb]/25 transition-all active:scale-[0.98]"
                                type="submit"
                            >
                                Crear Cuenta
                            </button>
                        </form>

                        {/* Footer Link Integrated */}
                        <div className="mt-8 text-center text-sm">
                            <span className="text-zinc-400">¿Ya tienes una cuenta? </span>
                            <button
                                onClick={onSwitchToLogin}
                                className="font-bold text-[#6324eb] hover:text-[#501dbd] hover:underline transition-all"
                            >
                                Iniciar Sesión
                            </button>
                        </div>

                        {/* Data Usage Footnote */}
                        <div className="mt-6 pt-6 border-t border-zinc-700/50">
                            <div className="flex items-start gap-3">
                                <Info className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-zinc-400 leading-relaxed text-left">
                                    Al registrarte, aceptas nuestros <a className="text-[#6324eb] hover:underline" href="#">Términos de Servicio</a>.
                                    Ten en cuenta que los datos de interacción no sensibles pueden ser anonimizados.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        animate={{ opacity: isTransitioning ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center mt-6 text-sm text-zinc-500"
                    >
                        © 2024 EnSeñas AI. La accesibilidad primero.
                    </motion.p>
                </div>
            </motion.main>

            <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #FFFFFF 0%, #a492c8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .input-glow:focus-within {
          box-shadow: 0 0 0 2px rgba(99, 36, 235, 0.5);
        }
      `}</style>
        </motion.div >
    );
}
