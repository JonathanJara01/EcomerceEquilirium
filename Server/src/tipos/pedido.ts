// Interfaz representativa de un ítem individual dentro de un pedido de compra.
export interface ItemPedido {
  productoId: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
}

// Interfaz representativa de la información de despacho del cliente/comprador.
export interface DatosCliente {
  nombre: string;
  correo: string;
  direccion: string;
  ciudad: string;
  telefono: string;
}

// Interfaz principal representativa de un pedido o transacción comercial.
export interface Pedido {
  id: string;
  cliente: DatosCliente;
  items: ItemPedido[];
  total: number;
  fecha: string;
  estado: "pendiente" | "completado";
}
