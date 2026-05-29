import { useQuery } from "@tanstack/react-query";
import { obtenerProductoPorId } from "../servicios/productos.servicio";
import { PRODUCTOS_KEYS } from "./productos.keys";

// Hook personalizado para consultar y almacenar en caché el detalle de un producto específico.
export function useProductoDetalle(productoId: string) {
  return useQuery({
    queryKey: PRODUCTOS_KEYS.detalle(productoId),
    queryFn: () => obtenerProductoPorId(productoId),
    enabled: Boolean(productoId),
    staleTime: 1000 * 60 * 10 // Sincronización de caché por 10 minutos
  });
}
