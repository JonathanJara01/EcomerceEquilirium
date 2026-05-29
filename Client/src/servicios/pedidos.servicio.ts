import { realizarPeticionPost } from "./cliente-api";
import { ItemCarrito } from "../tipos/carrito";

interface CargaPedido {
  cliente: {
    nombre: string;
    correo: string;
    direccion: string;
    ciudad: string;
    telefono: string;
  };
  items: {
    productoId: string;
    cantidad: number;
  }[];
}

// Envía el registro del pedido de compra al servidor para validar stock y procesar cobro simulado.
export async function crearPedido(
  cliente: CargaPedido["cliente"],
  items: ItemCarrito[]
): Promise<any> {
  const itemsCarga = items.map((it) => ({
    productoId: it.producto.id,
    cantidad: it.cantidad
  }));

  return realizarPeticionPost<any, CargaPedido>("/pedidos", {
    cliente,
    items: itemsCarga
  });
}
