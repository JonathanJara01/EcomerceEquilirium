import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listarProductosAdmin,
  crearProducto,
  actualizarProducto
} from "@/servicios/administracion.servicio";
import { Producto } from "@/tipos/producto";

// Hook de consulta para listar reactivamente todos los productos desde la perspectiva de administración.
export function usarProductosAdmin() {
  return useQuery({
    queryKey: ["productos-admin"],
    queryFn: listarProductosAdmin
  });
}

// Hook de mutación para registrar un nuevo producto comercial en el backend.
export function usarCrearProducto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (datos: Omit<Producto, "precioFinal">) => crearProducto(datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos-admin"] });
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    }
  });
}

// Hook de mutación para actualizar parcialmente los datos o stock de un producto existente.
export function usarActualizarProducto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productoId,
      datos
    }: {
      productoId: string;
      datos: Partial<Omit<Producto, "id">>;
    }) => actualizarProducto(productoId, datos),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["productos-admin"] });
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      queryClient.invalidateQueries({ queryKey: ["producto-detalle", variables.productoId] });
    }
  });
}
