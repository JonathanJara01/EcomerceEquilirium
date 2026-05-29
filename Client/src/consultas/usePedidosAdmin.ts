import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listarPedidos, actualizarEstadoPedido } from "@/servicios/administracion.servicio";

// Hook de consulta para listar de forma reactiva los pedidos del servidor.
export function usarPedidosAdmin() {
  return useQuery({
    queryKey: ["pedidos-admin"],
    queryFn: listarPedidos
  });
}

// Hook de mutación para disparar el cambio de estado de envío en el backend y refrescar la caché.
export function usarActualizarEstadoPedido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pedidoId,
      estado
    }: {
      pedidoId: string;
      estado: "pendiente" | "completado";
    }) => actualizarEstadoPedido(pedidoId, estado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos-admin"] });
    }
  });
}
