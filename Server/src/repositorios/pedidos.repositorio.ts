import { Pedido } from "../tipos/pedido";
import { PEDIDOS_MOCK } from "../datos/pedidos.mock";

// Repositorio encargado del acceso directo y registro de pedidos comerciales en la base simulada.
export class PedidosRepositorio {
  // Almacena un nuevo pedido en la colección temporal en memoria.
  async guardarPedido(pedido: Pedido): Promise<Pedido> {
    PEDIDOS_MOCK.push(pedido);
    return pedido;
  }

  // Retorna el listado total de pedidos registrados.
  async obtenerPedidos(): Promise<Pedido[]> {
    return PEDIDOS_MOCK;
  }

  // Actualiza el estado de un pedido específico por su identificador.
  async actualizarEstadoPedido(
    pedidoId: string,
    nuevoEstado: "pendiente" | "completado"
  ): Promise<Pedido | null> {
    const pedido = PEDIDOS_MOCK.find((p) => p.id === pedidoId);
    if (!pedido) return null;
    pedido.estado = nuevoEstado;
    return pedido;
  }
}
