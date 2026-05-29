import { Pedido, DatosCliente, ItemPedido } from "../tipos/pedido";
import { PedidosRepositorio } from "../repositorios/pedidos.repositorio";
import { PRODUCTOS_MOCK } from "../datos/productos.mock";

// Servicio encargado de procesar la lógica de creación de órdenes y validaciones de stock.
export class PedidosServicio {
  private pedidosRepo = new PedidosRepositorio();

  // Valida el stock actual, reduce el inventario en memoria y registra el pedido de compra.
  async crearPedido(
    cliente: DatosCliente,
    itemsInput: { productoId: string; cantidad: number }[]
  ): Promise<Pedido> {
    const itemsValidados: ItemPedido[] = [];
    let total = 0;

    // Fase 1: Validar existencias de todos los productos antes de alterar el stock.
    for (const item of itemsInput) {
      const producto = PRODUCTOS_MOCK.find((p) => p.id === item.productoId);
      if (!producto) {
        throw new Error(`Producto con ID ${item.productoId} no encontrado.`);
      }
      if (producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para el producto ${producto.nombre}.`);
      }

      total += producto.precioFinal * item.cantidad;
      itemsValidados.push({
        productoId: producto.id,
        nombre: producto.nombre,
        precioUnitario: producto.precioFinal,
        cantidad: item.cantidad
      });
    }

    // Fase 2: Reducir stock real en memoria tras confirmación.
    for (const item of itemsInput) {
      const producto = PRODUCTOS_MOCK.find((p) => p.id === item.productoId);
      if (producto) {
        producto.stock -= item.cantidad;
      }
    }

    // Fase 3: Formatear y registrar el pedido en la colección.
    const nuevoPedido: Pedido = {
      id: `ped_${Math.random().toString(36).substring(2, 9)}`,
      cliente,
      items: itemsValidados,
      total,
      fecha: new Date().toISOString(),
      estado: "pendiente"
    };

    return this.pedidosRepo.guardarPedido(nuevoPedido);
  }

  // Retorna el listado completo de pedidos registrados para la administración.
  async listarPedidos(): Promise<Pedido[]> {
    return this.pedidosRepo.obtenerPedidos();
  }

  // Lógica para actualizar el estado del pedido a pendiente o completado.
  async actualizarEstadoPedido(
    pedidoId: string,
    nuevoEstado: "pendiente" | "completado"
  ): Promise<Pedido> {
    if (nuevoEstado !== "pendiente" && nuevoEstado !== "completado") {
      throw new Error("Estado de pedido inválido. Solo se admite 'pendiente' o 'completado'.");
    }

    const pedidoActualizado = await this.pedidosRepo.actualizarEstadoPedido(pedidoId, nuevoEstado);
    if (!pedidoActualizado) {
      throw new Error(`Pedido con ID ${pedidoId} no encontrado.`);
    }

    return pedidoActualizado;
  }
}
