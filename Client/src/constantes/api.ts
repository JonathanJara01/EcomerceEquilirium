// URL base para comunicar el cliente frontend con el backend Server.
// Lee la variable de entorno NEXT_PUBLIC_API_URL con valor de contingencia a localhost:3001.
export const URL_BASE_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

