import { create } from "zustand";
import { ItemCarrito } from "../tipos/carrito";
import { Producto } from "../tipos/producto";

interface EstadoCarrito {
  items: ItemCarrito[];
  agregarProducto: (producto: Producto, cantidad: number) => void;
  eliminarProducto: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  limpiarCarrito: () => void;
}

// Almacén de Zustand en español para el manejo del estado del carrito de compras.
export const usarCarritoStore = create<EstadoCarrito>((set) => ({
  items: [],

  agregarProducto: (producto, cantidad) =>
    set((estado) => {
      const itemExistente = estado.items.find((i) => i.producto.id === producto.id);
      if (itemExistente) {
        return {
          items: estado.items.map((i) =>
            i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
          )
        };
      }
      return { items: [...estado.items, { producto, cantidad }] };
    }),

  eliminarProducto: (productoId) =>
    set((estado) => ({
      items: estado.items.filter((i) => i.producto.id !== productoId)
    })),

  actualizarCantidad: (productoId, cantidad) =>
    set((estado) => ({
      items: estado.items.map((i) =>
        i.producto.id === productoId ? { ...i, cantidad: Math.max(1, cantidad) } : i
      )
    })),

  limpiarCarrito: () => set({ items: [] })
}));
