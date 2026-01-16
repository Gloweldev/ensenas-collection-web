"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
    ArrowRight,
    Users,
    Video,
    Brain,
    Heart,
    Stethoscope,
    Building2,
    GraduationCap,
    Shield,
    Sparkles,
    Target,
    Database
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
    visible: { transition: { staggerChildren: 0.1 } }
};

export default function LandingPageES() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="bg-zinc-950 font-sans text-white" ref={containerRef}>

            {/* HERO: La Promesa */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6324eb] rounded-full opacity-10 blur-[120px] animate-pulse" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6324eb]/30 bg-[#6324eb]/10 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6324eb] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6324eb]"></span>
                            </span>
                            <span className="text-xs font-medium text-zinc-300 uppercase tracking-wide">Construyendo el Futuro de la Inclusión</span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
                            ROMPIENDO LA BARRERA <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6324eb] via-purple-400 to-pink-400">
                                DEL SILENCIO
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            Estamos creando la primera inteligencia artificial que traduce Lengua de Señas Mexicana a español en tiempo real. <span className="text-white font-medium">Pero necesitamos tu ayuda</span>.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <Link href="/register">
                                <button className="group relative px-8 py-4 bg-white text-zinc-950 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 shadow-lg hover:shadow-[#6324eb]/50">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Quiero Contribuir <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                            <Link href="#mision">
                                <button className="px-8 py-4 text-zinc-300 hover:text-white font-medium text-lg transition-colors border border-zinc-700 rounded-full hover:border-zinc-500">
                                    Conocer Más
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* QUÉ ES ENSEÑAS AI */}
            <section id="mision" className="py-24 px-6 bg-zinc-950 border-y border-zinc-800">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#6324eb] font-semibold text-sm uppercase tracking-widest">Qué Estamos Construyendo</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                            ¿Qué es <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6324eb] to-purple-400">EnSeñas AI</span>?
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        {/* Explicación del Nombre */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-block mb-4">
                                <Logo width={240} height={80} />
                                <div className="flex items-center gap-3 text-zinc-400 -mt-2 pl-2">
                                    <div className="h-px bg-gradient-to-r from-[#6324eb] to-transparent w-12"></div>
                                    <span className="text-sm font-medium tracking-wide">Enseñar + Señas</span>
                                </div>
                            </div>

                            <p className="text-lg text-zinc-300 leading-relaxed">
                                Nuestro nombre refleja nuestra misión dual: <span className="text-white font-semibold">enseñar</span> a la inteligencia artificial el lenguaje de <span className="text-white font-semibold">señas</span>, y al mismo tiempo, educar a la sociedad sobre la importancia de la inclusión.
                            </p>

                            <div className="bg-[#6324eb]/5 border border-[#6324eb]/20 rounded-2xl p-6">
                                <p className="text-zinc-300 italic">
                                    "No es solo tecnología. Es un puente entre dos mundos que durante mucho tiempo han estado separados."
                                </p>
                            </div>
                        </motion.div>

                        {/* La Visión del Proyecto */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-3xl p-8"
                        >
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Brain className="w-7 h-7 text-[#6324eb]" />
                                Nuestro Objetivo
                            </h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6324eb] flex items-center justify-center text-sm font-bold">1</div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Crear el Motor de Traducción</h4>
                                        <p className="text-zinc-400 text-sm">Una inteligencia artificial capaz de interpretar Lengua de Señas Mexicana y convertirla a español hablado/escrito en tiempo real.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6324eb] flex items-center justify-center text-sm font-bold">2</div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Funcionar en Ambas Direcciones</h4>
                                        <p className="text-zinc-400 text-sm">No solo LSM → Español, sino también Español → LSM, permitiendo conversaciones naturales bidireccionales.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6324eb] flex items-center justify-center text-sm font-bold">3</div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Llegar a Donde Se Necesita</h4>
                                        <p className="text-zinc-400 text-sm">Implementar la tecnología en hospitales, escuelas y servicios públicos donde la comunicación es crítica.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Por Qué Es Diferente */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 md:p-12"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">¿En Qué Somos Diferentes?</h3>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#6324eb]/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 border border-[#6324eb]/30">
                                    <Target className="w-8 h-8 text-[#6324eb]" />
                                </div>
                                <h4 className="font-bold mb-2">No Es Un Diccionario</h4>
                                <p className="text-zinc-400 text-sm">
                                    No buscamos solo mostrar señas individuales. Queremos entender conversaciones completas con contexto y fluidez.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/30">
                                    <Shield className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h4 className="font-bold mb-2">Privado y Seguro</h4>
                                <p className="text-zinc-400 text-sm">
                                    Tus datos son solo para entrenar nuestros modelos. No vendemos información ni compartimos videos sin autorización.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mb-4 border border-pink-500/30">
                                    <Heart className="w-8 h-8 text-pink-400" />
                                </div>
                                <h4 className="font-bold mb-2">Impacto Social Primero</h4>
                                <p className="text-zinc-400 text-sm">
                                    Antes que negocio, somos una misión. Cada decisión técnica prioriza accesibilidad e inclusión real.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* EL PROBLEMA: Explicación Simple */}
            <section id="tecnologia" className="py-24 px-6 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[#6324eb] font-semibold text-sm uppercase tracking-widest">El Desafío</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">¿Por Qué No Existe Esto Ya?</h2>
                            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                                La respuesta es más simple de lo que imaginas: <span className="text-white font-semibold">falta de datos</span>.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Card: Personas Afectadas */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-3xl p-8 hover:border-[#6324eb]/50 transition-all group"
                        >
                            <div className="w-16 h-16 bg-[#6324eb]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users className="w-8 h-8 text-[#6324eb]" />
                            </div>
                            <h3 className="text-3xl font-bold mb-3">2.3 Millones</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                de personas en México viven con discapacidad auditiva. Muchas enfrentan barreras diarias en hospitales, escuelas y oficinas de gobierno.
                            </p>
                        </motion.div>

                        {/* Card: El Problema Técnico */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-3xl p-8 hover:border-[#6324eb]/50 transition-all group"
                        >
                            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Database className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-3xl font-bold mb-3">El Vacío de Datos</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Mientras que sistemas como ChatGPT fueron entrenados con billones de palabras, <span className="text-white font-semibold">no existen suficientes videos de señas etiquetados</span> para entrenar una IA confiable.
                            </p>
                        </motion.div>
                    </div>

                    {/* Visualización del Gap */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8"
                    >
                        <h4 className="text-xl font-bold mb-6 text-center">La Diferencia es Enorme</h4>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm text-zinc-400 mb-2">
                                    <span className="font-semibold">Texto para IA de Lenguaje (ej: ChatGPT)</span>
                                    <span className="font-mono">Billones de palabras</span>
                                </div>
                                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 w-full" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-zinc-400 mb-2">
                                    <span className="font-semibold">Videos de Lengua de Señas Mexicana</span>
                                    <span className="font-mono">Muy limitados</span>
                                </div>
                                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#6324eb] to-purple-500 w-[3%]" />
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-zinc-500 text-sm mt-6">
                            Sin datos de calidad, no hay IA posible. Por eso te necesitamos.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* NUESTRA SOLUCIÓN */}
            <section id="comunidad" className="py-24 px-6 bg-zinc-950 border-y border-zinc-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#6324eb] font-semibold text-sm uppercase tracking-widest">Nuestra Misión</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Construir la Base de Datos Más Grande de LSM</h2>
                        <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                            Estamos recolectando miles de videos de señas grabadas por voluntarios como tú. Cada video entrena nuestra inteligencia artificial para que un día pueda traducir conversaciones completas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Video,
                                title: "Grabas Señas",
                                desc: "Usas tu cámara para grabar señas específicas siguiendo un video de referencia. Es simple y rápido.",
                                step: "01"
                            },
                            {
                                icon: Brain,
                                title: "Entrenas la IA",
                                desc: "Tus videos se convierten en datos de entrenamiento para nuestros modelos de inteligencia artificial.",
                                step: "02"
                            },
                            {
                                icon: Sparkles,
                                title: "Creamos Inclusión",
                                desc: "Con suficientes datos, construiremos un traductor en tiempo real para hospitales, escuelas y gobierno.",
                                step: "03"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-[#6324eb]/50 transition-all group"
                            >
                                <div className="absolute top-4 right-4 text-7xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors">
                                    {item.step}
                                </div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-[#6324eb]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-7 h-7 text-[#6324eb]" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* IMPACTO REAL */}
            <section id="impacto" className="py-24 px-6 bg-zinc-950">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#6324eb] font-semibold text-sm uppercase tracking-widest">Impacto Real</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">¿Dónde Se Usará Esto?</h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Nuestro objetivo es llevar esta tecnología a todos los espacios donde la comunicación es esencial.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {[
                            {
                                icon: Stethoscope,
                                title: "Hospitales",
                                desc: "Comunicación clara en urgencias médicas donde cada segundo cuenta.",
                                gradient: "from-red-500/20 to-pink-500/20"
                            },
                            {
                                icon: GraduationCap,
                                title: "Escuelas",
                                desc: "Aulas inclusivas donde estudiantes sordos participen sin barreras.",
                                gradient: "from-blue-500/20 to-cyan-500/20"
                            },
                            {
                                icon: Building2,
                                title: "Gobierno",
                                desc: "Trámites y servicios públicos accesibles para toda la población.",
                                gradient: "from-emerald-500/20 to-green-500/20"
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="relative bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 overflow-hidden group"
                            >
                                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-zinc-700 transition-colors">
                                        <card.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Casos de Uso Adicionales */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="relative bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-zinc-700 transition-colors">
                                    <Video className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Videollamadas</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Traducción en tiempo real durante llamadas de Zoom, Meet o Teams, eliminando barreras en reuniones laborales y familiares.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ y: -8 }}
                            className="relative bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-zinc-700 transition-colors">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Trabajos Presenciales</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Integración laboral real en oficinas, tiendas y fábricas, permitiendo que personas sordas trabajen sin intermediarios.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* POR QUÉ TÚ IMPORTAS */}
            <section className="py-24 px-6 bg-zinc-950 border-y border-zinc-800">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#6324eb]/10 via-zinc-900/50 to-zinc-900/50 border border-[#6324eb]/20 rounded-3xl p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-[#6324eb] rounded-full flex items-center justify-center mx-auto mb-8">
                            <Heart className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Tu Contribución Es Esencial</h2>
                        <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                            No necesitas saber Lengua de Señas. Solo necesitas una cámara y 10 minutos. Cada video que grabas acerca este proyecto a la realidad. Miles de personas dependen de que tecnologías como esta existan.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Shield className="w-5 h-5 text-[#6324eb]" />
                                <span>100% Privado y Seguro</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Target className="w-5 h-5 text-[#6324eb]" />
                                <span>Guías Paso a Paso</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Users className="w-5 h-5 text-[#6324eb]" />
                                <span>Comunidad de Apoyo</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6324eb]/20 via-zinc-950 to-zinc-950" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            SÉ PARTE DEL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6324eb] via-purple-400 to-pink-400">
                                CAMBIO
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
                            Cada seña que grabes construye un futuro más inclusivo. Únete hoy.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                            <Link href="/register">
                                <button className="group px-10 py-5 bg-white text-zinc-950 text-xl font-bold rounded-full hover:scale-105 transition-all shadow-2xl shadow-white/20 hover:shadow-white/40">
                                    <span className="flex items-center gap-3">
                                        Comenzar Ahora
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                            <span className="text-zinc-500 text-sm">Gratis · Sin requisitos técnicos</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER MINIMALISTA */}
            <footer className="py-12 px-6 border-t border-zinc-800 bg-zinc-950">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-zinc-500 text-sm mb-4">
                        EnSeñas AI · Construyendo puentes de comunicación
                    </p>
                    <p className="text-zinc-600 text-xs">
                        © 2026 EnSeñas AI. Datos privados y protegidos. Iniciativa de impacto social.
                    </p>
                </div>
            </footer>

        </div>
    );
}