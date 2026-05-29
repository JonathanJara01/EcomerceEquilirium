import { Producto } from "./producto";

// Representa un ítem individual dentro de la orden de compra en el cliente.
export interface ItemPedido {
  productoId: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

// Representa los datos personales y de despacho provistos por el comprador en el cliente.
export interface DatosCliente {
  nombre: string;
  correo: string;
  direccion: string;
  ciudad: string;
  telefono: string;
}

// Representa la estructura consolidada de un pedido de compra retornado por la API en el cliente.
export interface Pedido {
  id: string;
  cliente: DatosCliente;
  items: ItemPedido[];
  total: number;
  fecha: string;
  estado: "pendiente" | "completado";
}
