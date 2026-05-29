import { useQuery } from "@tanstack/react-query";
import { obtenerProductos } from "../servicios/productos.servicio";
import { PRODUCTOS_KEYS } from "./productos.keys";

// Hook personalizado para consultar y almacenar en caché la lista filtrada de productos.
export function useProductos(filtrosQuery: string = "") {
  return useQuery({
    queryKey: PRODUCTOS_KEYS.filtrados(filtrosQuery),
    queryFn: () => obtenerProductos(filtrosQuery),
    staleTime: 1000 * 60 * 5 // Sincronización de caché por 5 minutos
  });
}
