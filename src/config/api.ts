export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    TIMEOUT: 15000,
} as const;

export const getApiUrl = (path: string) => {
    // Ensure BASE_URL doesn't have trailing slash
    const cleanBase = API_CONFIG.BASE_URL.replace(/\/+$/, '');
    // Ensure path starts with slash
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    // Always append /api/v1
    return `${cleanBase}/api/v1${cleanPath}`;
};
