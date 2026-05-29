import { realizarPeticionGet } from "./cliente-api";
import { Producto } from "../tipos/producto";
import { RespuestaExito } from "../tipos/respuesta-api";

// Obtiene la lista completa de productos aplicando los filtros query pasados.
export async function obtenerProductos(query: string = ""): Promise<Producto[]> {
  const respuesta = await realizarPeticionGet<RespuestaExito<Producto[]>>(`/api/productos${query}`);
  return respuesta.datos;
}

// Obtiene el producto por su identificador exclusivo de base de datos.
export async function obtenerProductoPorId(productoId: string): Promise<Producto> {
  const respuesta = await realizarPeticionGet<RespuestaExito<Producto>>(`/api/productos/${productoId}`);
  return respuesta.datos;
}
