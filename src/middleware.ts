import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Por ahora, permitir acceso a todas las rutas
    // Firebase Auth maneja la autenticación en el cliente
    // Este middleware puede mejorarse después para verificar tokens

    return NextResponse.next();
}

// Configurar qué rutas proteger (deshabilitado por ahora)
export const config = {
    matcher: [],
};
