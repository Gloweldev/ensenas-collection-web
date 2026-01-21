"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface LegalModalProps {
    children: React.ReactNode;
}

export function LegalModal({ children }: LegalModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="cursor-pointer">{children}</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col bg-[#161121] border-white/10 text-white p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 shrink-0">
                    <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Términos y Condiciones de Uso y Aviso de Privacidad
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Por favor lee atentamente antes de continuar.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 w-full min-h-0 rounded-md border border-white/5 bg-white/5">
                    <div className="px-6 pb-6 text-sm text-slate-300 space-y-4 pr-4 leading-relaxed">
                        <h3 className="text-lg font-semibold text-white mt-4 mb-2">TÉRMINOS Y CONDICIONES DE USO Y AVISO DE PRIVACIDAD DE ENSEÑAS AI</h3>

                        <h4 className="text-base font-semibold text-white mt-6">1. Aceptación de los Términos</h4>
                        <p>
                            Al registrarse y utilizar esta plataforma, el Usuario acepta los presentes Términos y Condiciones. El objetivo de esta plataforma es la recopilación de datos de video para el desarrollo de tecnología de asistencia basada en Inteligencia Artificial.
                        </p>

                        <h4 className="text-base font-semibold text-white mt-6">2. Naturaleza de los Datos Recolectados (Datos Biométricos)</h4>
                        <p>
                            El Usuario reconoce que los videos grabados constituyen Datos Personales Sensibles. Estos datos incluyen rasgos biométricos (rostro, extremidades y movimientos corporales) necesarios para que el framework de estimación de pose (RTMPose) identifique puntos clave de la Lengua de Señas Mexicana (LSM).
                        </p>

                        <h4 className="text-base font-semibold text-white mt-6">3. Cesión de Derechos de Imagen y Propiedad Intelectual</h4>
                        <p>
                            El Usuario otorga a EnSeñas AI una licencia gratuita, perpetua, global y no exclusiva para utilizar, procesar, analizar y transformar los videos subidos con el fin único de entrenar, mejorar y validar modelos de Inteligencia Artificial.
                        </p>
                        <p className="mt-2">
                            El Usuario renuncia a cualquier compensación económica derivada del uso de estos videos para el entrenamiento del modelo.
                            La Propiedad Intelectual de los algoritmos resultantes del entrenamiento pertenece exclusivamente a los desarrolladores de EnSeñas AI.
                        </p>

                        <h4 className="text-base font-semibold text-white mt-6">4. Finalidad del Tratamiento</h4>
                        <p>Los datos serán utilizados exclusivamente para:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Entrenamiento de modelos de visión por computadora.</li>
                            <li>Investigación y desarrollo de tecnologías de accesibilidad.</li>
                            <li>Validación estadística de precisión en el reconocimiento de señas.</li>
                        </ul>

                        <h4 className="text-base font-semibold text-white mt-6">5. Protección y Almacenamiento</h4>
                        <p>
                            EnSeñas AI se compromete a resguardar la información bajo estándares de seguridad en la nube (Google Cloud), limitando el acceso a personal técnico autorizado y utilizando protocolos de encriptación para la transferencia de archivos. No compartiremos su identidad personal con terceros con fines de marketing.
                        </p>

                        <h4 className="text-base font-semibold text-white mt-6">6. Limitación de Responsabilidad y Exclusión de Reclamos</h4>
                        <p>
                            El Usuario reconoce que, a pesar de implementar medidas de seguridad estándar en la industria, ninguna transmisión o almacenamiento de datos en internet es 100% seguro.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Exclusión por Incidentes:</strong> En caso de hackeo, filtración de datos, intrusión no autorizada, fallas técnicas o cualquier incidente de ciberseguridad que comprometa la información, el Usuario acepta que EnSeñas AI no será responsable por daños o perjuicios derivados de dichos eventos.</li>
                            <li><strong>Renuncia a Reclamos:</strong> El Usuario renuncia expresamente a ejercer cualquier acción legal, demanda o reclamo de indemnización contra EnSeñas AI, sus fundadores, socios o colaboradores, derivado de la pérdida, acceso no autorizado o mal uso de los datos por parte de terceros ajenos a la organización.</li>
                        </ul>

                        <h4 className="text-base font-semibold text-white mt-6">7. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h4>
                        <p>
                            Usted tiene derecho a solicitar la eliminación de sus datos de nuestra base de datos activa. Para ejercer este derecho, deberá enviar un correo electrónico a contact@ensenas.ai especificando su cuenta de registro.
                        </p>

                        <h4 className="text-base font-semibold text-white mt-6">8. Registro mediante Terceros (Google)</h4>
                        <p>
                            Al iniciar sesión con Google, autoriza a la plataforma a acceder a su nombre y correo electrónico para fines de identificación y gestión de su progreso dentro del programa de recolección de datos.
                        </p>

                        <h4 className="text-base font-semibold text-white mt-6">9. Restricción de Edad y Declaración de Veracidad</h4>
                        <p>
                            El acceso y uso de la plataforma EnSeñas AI está estrictamente reservado para personas mayores de 18 años con plena capacidad legal para obligarse.
                        </p>
                        <p className="mt-2">
                            Al aceptar estos términos, el Usuario declara bajo protesta de decir verdad que es mayor de edad. EnSeñas AI se deslinda de cualquier responsabilidad legal, civil o administrativa derivada de la falsedad en esta declaración. Si el Usuario es menor de edad y logra registrarse falseando información, lo hace bajo su propio riesgo y/o el de sus padres o tutores, liberando a EnSeñas AI de cualquier obligación de tratamiento especial de datos de menores. Nos reservamos el derecho de eliminar inmediatamente cualquier cuenta (y sus datos asociados) si detectamos o sospechamos que pertenece a un menor de 18 años, sin necesidad de previo aviso ni derecho a compensación.
                        </p>

                        <h4 className="text-base font-semibold text-white mt-6">10. Modificaciones a los Términos</h4>
                        <p>
                            EnSeñas AI se reserva el derecho de modificar, actualizar, extender o eliminar partes de estos Términos y Condiciones y/o el Aviso de Privacidad en cualquier momento y sin necesidad de notificación previa al Usuario.
                        </p>
                        <p className="mt-2">
                            Es responsabilidad exclusiva del Usuario revisar periódicamente este documento para estar al tanto de los cambios. El uso continuo de la plataforma tras la publicación de cambios constituye la aceptación plena y expresa de los nuevos términos. Si el Usuario no está de acuerdo con las modificaciones, deberá dejar de utilizar la plataforma y ejercer sus derechos ARCO para la cancelación de su cuenta.
                        </p>

                        <p className="mt-8 text-xs text-slate-500 italic pb-4">
                            Última actualización: Enero 2026
                        </p>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
