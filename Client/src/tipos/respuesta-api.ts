// Estructura de respuesta exitosa de la API en el cliente.
export interface RespuestaExito<T> {
  exito: true;
  datos: T;
}

// Estructura de respuesta fallida de la API en el cliente.
export interface RespuestaError {
  exito: false;
  mensaje: string;
}
