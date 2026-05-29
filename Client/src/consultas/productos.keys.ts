// Centralización de llaves de consulta (query keys) de TanStack Query para productos.
export const PRODUCTOS_KEYS = {
  todos: ["productos"] as const,
  filtrados: (filtros: string) => ["productos", "filtrados", filtros] as const,
  detalle: (productoId: string) => ["productos", "detalle", productoId] as const
};
