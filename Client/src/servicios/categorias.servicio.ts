import { realizarPeticionGet } from "./cliente-api";
import { Categoria } from "../tipos/categoria";
import { RespuestaExito } from "../tipos/respuesta-api";

// Obtiene el catálogo de categorías activas para los filtros de la tienda.
export async function obtenerCategorias(): Promise<Categoria[]> {
  const respuesta = await realizarPeticionGet<RespuestaExito<Categoria[]>>("/api/categorias");
  return respuesta.datos;
}
