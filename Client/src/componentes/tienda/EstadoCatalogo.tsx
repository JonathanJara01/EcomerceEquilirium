"use client";

import React from "react";
import { Producto } from "@/tipos/producto";
import { TarjetaProducto } from "@/componentes/productos/TarjetaProducto";

interface PropiedadesEstado {
  cargando: boolean;
  error: boolean;
  productos: Producto[];
}

// Renderiza condicionalmente el estado del catálogo: cargando, error, vacío o la grilla con TarjetaProducto.
export function EstadoCatalogo({ cargando, error, productos }: PropiedadesEstado) {
  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-20">
        <p className="text-sm font-medium text-zinc-500 animate-pulse">
          Cargando catálogo de productos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-20 text-center px-4">
        <p className="text-sm font-semibold text-destructive">
          Error al cargar los productos del servidor.
        </p>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/10 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">No se encontraron productos coincidentes.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
