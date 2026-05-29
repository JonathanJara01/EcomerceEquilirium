import { NextResponse } from "next/server";
import { CategoriasRepositorio } from "../../../repositorios/categorias.repositorio";
import { RespuestaExito } from "../../../tipos/respuesta-api";
import { Categoria } from "../../../tipos/categoria";

// Procesa la petición GET para retornar todas las categorías disponibles.
export async function GET() {
  const repositorio = new CategoriasRepositorio();
  const categorias = await repositorio.obtenerCategorias();

  const respuesta: RespuestaExito<Categoria[]> = {
    exito: true,
    datos: categorias
  };

  return NextResponse.json(respuesta);
}
