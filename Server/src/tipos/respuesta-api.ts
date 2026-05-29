// Metadatos para respuestas que requieran paginación o conteo.
export interface MetadatosPaginacion {
  total: number;
  pagina: number;
  paginasTotales: number;
  limite: number;
}

// Representa una respuesta exitosa de la API.
export interface RespuestaExito<T> {
  exito: true;
  datos: T;
  metadatos?: MetadatosPaginacion;
}

// Representa una respuesta fallida de la API.
export interface RespuestaError {
  exito: false;
  mensaje: string;
  codigoError?: string;
}
