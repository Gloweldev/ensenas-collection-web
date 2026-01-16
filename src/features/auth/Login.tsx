"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Zap, Shield, Accessibility } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Logo } from "@/components/ui/Logo";

interface LoginProps {
    onSwitchToRegister?: () => void;
    isTransitioning?: boolean;
}

export default function Login({ onSwitchToRegister, isTransitioning = false }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithFacebook } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login:", { email, password });
        // TODO: Integrar con Firebase email/password auth
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            // Error is handled in auth context with toast
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
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
        <div className="flex min-h-screen w-full overflow-hidden">
            {/* Left Side: Immersive Visual - Slides out when transitioning */}
            <motion.div
                className="hidden lg:flex w-1/2 relative flex-col justify-between overflow-hidden"
                initial={{ x: -100, opacity: 0 }}
                animate={{
                    x: isTransitioning ? -500 : 0,
                    opacity: isTransitioning ? 0 : 1
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKQXsS18QdFVGDCDZqkI6Pvz8cmi3jNMYncg-WhcfxKBFge4xTZpRSKd0Q8s064P_1R6iHbHSN1_7CUa3fEGyg5-pAU7e4AapEcmjjLuzGHcJlhBsSyx9-9IBYQ88xmxMMdezVK-JZzpGbcm8c0M_Nlp3gzbTjV9aC2v3VLrCzQJusDUN3lZq3P6GIuGaC5zF-t2uKX0Q-LgLQTLccutQB-IYFymV5xik8iKFJ2e8OPaH9pgSelD9iD2BYI2Dw1Y9HIO3QqqYPS_g")'
                    }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#161121] via-[#161121]/60 to-transparent" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#161121]/40 to-transparent" />

                {/* Branding */}
                <div className="relative z-20 p-12">
                    <Logo width={180} height={60} />
                </div>

                {/* Hero Text */}
                <div className="relative z-20 p-12 mb-10">
                    <div className="max-w-md space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-sm">
                            Conectando a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6324eb] to-purple-400">460M personas</span>.
                        </h1>
                        <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-[90%]">
                            Experimenta la interpretación de lengua de señas en tiempo real impulsada por IA que conecta mundos sin fronteras.
                        </p>

                    </div>
                </div>
            </motion.div>

            {/* Right Side: Auth Form - Moves to center when transitioning */}
            <motion.div
                className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 relative"
                initial={{ x: 100, opacity: 0 }}
                animate={{
                    x: isTransitioning ? -400 : 0,
                    opacity: 1
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* Mobile Background */}
                <div
                    className="lg:hidden absolute inset-0 z-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3hyHW8Tpo5xMceNpW07oDHc7_lRyMrvHJZ91uQVAoQQuyIGTdzwAZljWKWTJ-dWc_Jco2KDlCGjB0Gqmkw3im1J9YGrH8j9k7WC9eYtTrz6rxMlpIJU812lJ4Am5PUoGKXho1ZwRCJhvmSHQjuXnyVZ1ahzDMFhQUMWFRy6d0L0JiBvXJJURpXeqIPcJpS8_bLK5Ty5lxmAfj9C_5mde_5ubs5y7TZEUqtNx0il84DnzT18ofal14BW0HUHKH2YbVV_21XMOdmis")'
                    }}
                />

                {/* Auth Container */}
                <div className="w-full max-w-[440px] relative z-10">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <Logo width={160} height={50} />
                    </div>

                    {/* Glass Card */}
                    <div className="glass-panel rounded-2xl p-8 md:p-10 w-full">
                        <div className="flex flex-col gap-1 mb-8">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Bienvenido de nuevo</h2>
                            <p className="text-gray-400 text-sm font-normal">
                                Ingresa tus datos para acceder a tu espacio de trabajo.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-300" htmlFor="email">
                                    Correo Electrónico
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#6324eb] transition-colors duration-200">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        className="w-full h-12 rounded-lg bg-[#221a33]/80 border border-[#433366] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6324eb] focus:border-[#6324eb] pl-10 pr-4 transition-all duration-200"
                                        id="email"
                                        placeholder="nombre@ejemplo.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-300" htmlFor="password">
                                        Contraseña
                                    </label>
                                    <a className="text-xs font-medium text-[#6324eb] hover:text-[#501dbd] transition-colors" href="#">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#6324eb] transition-colors duration-200">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        className="w-full h-12 rounded-lg bg-[#221a33]/80 border border-[#433366] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6324eb] focus:border-[#6324eb] pl-10 pr-4 transition-all duration-200"
                                        id="password"
                                        placeholder="Ingresa tu contraseña"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                className="mt-2 w-full h-12 bg-[#6324eb] hover:bg-[#501dbd] text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-[#6324eb]/25"
                                type="submit"
                            >
                                <span>Iniciar Sesión</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-[#161121] text-gray-500 uppercase tracking-wider">
                                    O continúa con
                                </span>
                            </div>
                        </div>

                        {/* Social Auth */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleGoogleLogin}
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
                                type="button"
                                onClick={handleFacebookLogin}
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

                        {/* Footer Link */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-400">
                                ¿No tienes una cuenta?{" "}
                                <button
                                    onClick={onSwitchToRegister}
                                    className="font-semibold text-[#6324eb] hover:text-[#501dbd] transition-colors"
                                >
                                    Regístrate
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Helper Links */}
                    <div className="mt-6 flex justify-center gap-6 text-xs text-gray-500">
                        <a className="hover:text-gray-300 transition-colors" href="#">
                            Política de Privacidad
                        </a>
                        <a className="hover:text-gray-300 transition-colors" href="#">
                            Términos de Servicio
                        </a>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>
        </div>
    );
}
