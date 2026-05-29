import { Producto } from "./producto";

// Representa un ítem dentro del carrito de compras en el cliente.
export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
