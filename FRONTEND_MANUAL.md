# EnSeñas AI - Manual Técnico Frontend (v1.0 - Collection Phase)

**Versión del Sistema:** 1.0.0 (Deep Tech Release)
**Última Actualización:** 16 de Enero, 2026
**Objetivo:** Recolección de Datos de Lengua de Señas Mexicana (LSM)

---

## 1. Visión General y Arquitectura

Este frontend está construido sobre **Next.js 14 (App Router)** y diseñado para ser una plataforma de "Deep Tech": robusta, oscura ("The Black Box") y eficiente. Su propósito principal en la **v1** es coordinar a miles de voluntarios para grabar un dataset masivo de videos para entrenamiento de IA.

### Estructura de Directorios Clave
```
src/
├── app/
│   ├── (marketing)/      # Landing Page Corporativa (Root)
│   ├── login/            # Página de Ingreso (Wrapper)
│   ├── register/         # Página de Registro (Wrapper)
│   ├── onboarding/       # Flujo de datos demográficos
│   ├── collect/          # [CORE] El Estudio de Grabación
│   └── dashboard/        # Panel de Usuario (Selección de tareas)
├── components/
│   ├── collect/          # Componentes del Estudio (Cámara, Instrucciones)
│   └── marketing/        # Componentes de Landing (Header, Footer)
├── hooks/
│   └── use-streaming-upload.ts  # [CORE] Lógica del motor de grabación
└── context/
    └── auth-context.tsx  # Manejo de sesión (Google/Facebook/Email)
```

---

## 2. Módulos Detallados

### 2.1 Landing Page Corporativa (`src/app/(marketing)`)
La cara pública de la plataforma. No es solo informativa; establece la identidad de "Alta Tecnología".
-   **Diseño "Black Box":** Fondo `zinc-950` con texturas de grilla SVG y acentos `Electric Purple (#6324eb)`.
-   **Navegación Limpia (Clean IO):**
    -   Usa un componente cliente (`MarketingHeader.tsx`) que intercepta los clics.
    -   Ejecuta `scrollIntoView` suave hacia las secciones (`#mision`, `#tecnologia`).
    -   **Resultado:** El usuario navega sin que la URL cambie (siempre es `tudominio.com/`), dando sensación de aplicación nativa.
-   **Routing:** Mantiene separada la lógica de marketing de la aplicación real. El Layout (`layout.tsx`) inyecta las fuentes `Inter` y `JetBrains Mono`.

### 2.2 Autenticación (`/login`, `/register`)
Hemos separado el Auth en rutas dedicadas para mejorar el SEO y permitir compartir enlaces directos.
-   **Wrappers:** `src/app/login/page.tsx` y `register/page.tsx` son envoltorios simples que renderizan los componentes complejos `Login.tsx` y `Register.tsx`.
-   **Animaciones:** Usamos `Framer Motion` para transiciones de entrada/salida.
-   **Lógica:**
    -   `Login.tsx`: Maneja inicio de sesión. Al éxito -> redirige a `/dashboard`.
    -   `Register.tsx`: Maneja creación de cuenta. Al éxito -> redirige a `/onboarding`.
    -   **Onboarding:** Es un paso crítico post-registro para capturar metadatos del usuario (región, edad, género) que son vitales para etiquetar los datos de la IA.

---

## 3. El Estudio de Grabación ("Collection Studio v1")

Este es el núcleo de la aplicación (`src/app/collect/[slug]`). Es donde ocurre la recolección de datos.

### 3.1 Flujo de Estados (`StudioPhase`)
El estudio no es estático; es una máquina de estados finitos gestionada en `page.tsx`:
1.  **`initial`**: Carga de recursos.
2.  **`brief`**: Muestra al usuario qué seña debe hacer (video de referencia + explicación).
3.  **`countdown`**: Conteo 3-2-1 para preparar al usuario.
4.  **`recording`**: Captura activa del stream de video.
5.  **`review`**: Permite al usuario ver su grabación y decidir si `Guardar` o `Reintentar`.
6.  **`submitted`**: Éxito y limpieza para la siguiente seña.

### 3.2 Motor de Grabación (`useStreamingUpload.ts`)
Este **Custom Hook** es el cerebro técnico.
-   **Funciones:**
    -   `startRecording()`: Inicia la captura del `MediaRecorder`.
    -   `stopRecording()`: Finaliza y genera un `Blob`.
    -   `uploadRecording()`: Gestiona la subida a S3/MinIO.
    -   `restoreRecordings()`: **CRÍTICO**. Permite inyectar grabaciones recuperadas de una sesión anterior.

### 3.3 Persistencia de Sesión (Session Resilience)
Para evitar la pérdida de datos si el navegador se cierra o refresca:
1.  **Guardado Automático:** Cada vez que el usuario completa una grabación (estado `complete`), guardamos un snapshot en `localStorage` con los IDs de los videos y el estado actual.
2.  **Recuperación Inteligente:**
    -   Al cargar la página, verificamos si existe una sesión pendiente en `localStorage` (válida por 24h).
    -   Si existe, contactamos al Backend para obtener **URLs Presignadas** de los videos que ya se subieron.
    -   Restauramos el estado visual para que el usuario continúe exactamente donde se quedó.
3.  **Limpieza:** El almacenamiento solo se borra si el usuario presiona "Cancelar" explícitamente o termina todo el flujo ("Submit").

### 3.4 Calidad de Datos
-   **Validación de Hardware:** Antes de permitir grabar, verificamos permisos de cámara y micrófono.
-   **Metadatos:** Cada video se etiqueta automáticamente con el ID del usuario, la palabra objetivo (`slug`) y el timestamp.

---

## 4. Guía para Desarrolladores

### Agregar una nueva funcionalidad al Dashboard
1.  Edite `src/features/dashboard/Dashboard.tsx`.
2.  Las "Tareas" son tarjetas que redirigen a `/collect/[palabra]`.
3.  Asegúrese de que la palabra exista en la base de datos de "Assignments".

### Modificar la duración de grabación
En `src/app/collect/[slug]/page.tsx`, busque la constante `MAX_RECORDING_DURATION` (actualmente 5s) o la lógica dentro del `useEffect` de grabación.

### Despliegue
El proyecto está optimizado para **Vercel**. Asegúrese de configurar las variables de entorno para:
-   `NEXT_PUBLIC_API_URL`: Backend.
-   `NEXT_PUBLIC_FIREBASE_*`: Autenticación.

---

**EnSeñas AI Dev Team**
