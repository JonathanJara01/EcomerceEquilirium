import { useQuery } from "@tanstack/react-query";
import { obtenerCategorias } from "../servicios/categorias.servicio";

// Hook personalizado para consultar y almacenar en caché el listado de categorías del comercio.
export function useCategorias() {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: obtenerCategorias,
    staleTime: 1000 * 60 * 30 // Sincronización de caché por 30 minutos
  });
}
