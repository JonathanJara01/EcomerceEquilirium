import { create } from "zustand";
import { Producto } from "../tipos/producto";

interface EstadoFavoritos {
  favoritos: Producto[];
  agregarFavorito: (producto: Producto) => void;
  eliminarFavorito: (productoId: string) => void;
  esFavorito: (productoId: string) => boolean;
}

// Almacén de Zustand en español para el manejo del listado de productos favoritos.
export const usarFavoritosStore = create<EstadoFavoritos>((set, get) => ({
  favoritos: [],

  agregarFavorito: (producto) =>
    set((estado) => {
      if (estado.favoritos.some((p) => p.id === producto.id)) return {};
      return { favoritos: [...estado.favoritos, producto] };
    }),

  eliminarFavorito: (productoId) =>
    set((estado) => ({
      favoritos: estado.favoritos.filter((p) => p.id !== productoId)
    })),

  esFavorito: (productoId) => {
    return get().favoritos.some((p) => p.id === productoId);
  }
}));
