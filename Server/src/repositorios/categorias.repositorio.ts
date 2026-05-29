import { Categoria } from "../tipos/categoria";
import { CATEGORIAS_MOCK } from "../datos/categorias.mock";

// Repositorio encargado de gestionar el acceso directo a los datos de categorías.
export class CategoriasRepositorio {
  // Retorna el listado completo de categorías registradas.
  async obtenerCategorias(): Promise<Categoria[]> {
    return CATEGORIAS_MOCK;
  }

  // Busca y retorna una categoría específica usando su slug identificador.
  async obtenerCategoriaPorSlug(slug: string): Promise<Categoria | null> {
    const categoria = CATEGORIAS_MOCK.find((c) => c.slug === slug);
    return categoria || null;
  }
}
