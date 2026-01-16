import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Iniciar Sesión | EnSeñas AI Dashboard",
    description: "Accede al estudio de grabación y contribuye al dataset más grande de Lengua de Señas Mexicana.",
    openGraph: {
        title: "EnSeñas AI - Iniciar Sesión",
        description: "Tu contribución rompe barreras de comunicación.",
        siteName: "EnSeñas AI",
        type: "website",
    }
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
