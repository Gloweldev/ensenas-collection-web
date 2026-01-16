import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Registro de Voluntarios | EnSeñas AI",
    description: "Únete a la iniciativa tecnológica más importante para la inclusión en México. Ayúdanos a entrenar la IA.",
    openGraph: {
        title: "Únete a EnSeñas AI",
        description: "Revolucionando la traducción de señas con tu ayuda.",
        siteName: "EnSeñas AI",
        type: "website",
    }
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
