import { URL_BASE_API } from "../constantes/api";

// Ejecuta llamadas HTTP GET genéricas hacia los endpoints del Server backend.
export async function realizarPeticionGet<T>(endpoint: string): Promise<T> {
  const respuesta = await fetch(`${URL_BASE_API}${endpoint}`, {
    cache: "no-store"
  });

  if (!respuesta.ok) {
    throw new Error(`Error al consumir API [${respuesta.status}]: ${respuesta.statusText}`);
  }

  return respuesta.json();
}

// Ejecuta llamadas HTTP POST genéricas hacia los endpoints del Server backend enviando datos JSON.
export async function realizarPeticionPost<T, U>(endpoint: string, cuerpo: U): Promise<T> {
  const respuesta = await fetch(`${URL_BASE_API}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cuerpo)
  });

  if (!respuesta.ok) {
    const errorJson = await respuesta.json().catch(() => ({}));
    throw new Error(errorJson.mensaje || `Error al consumir API [${respuesta.status}]`);
  }

  return respuesta.json();
}

// Ejecuta llamadas HTTP PATCH genéricas hacia los endpoints del Server backend enviando datos JSON.
export async function realizarPeticionPatch<T, U>(endpoint: string, cuerpo: U): Promise<T> {
  const respuesta = await fetch(`${URL_BASE_API}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cuerpo)
  });

  if (!respuesta.ok) {
    const errorJson = await respuesta.json().catch(() => ({}));
    throw new Error(errorJson.mensaje || `Error al consumir API [${respuesta.status}]`);
  }

  return respuesta.json();
}
