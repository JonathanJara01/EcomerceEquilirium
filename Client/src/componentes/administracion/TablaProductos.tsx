"use client";

import React from "react";
import { Producto } from "@/tipos/producto";
import { FilaProducto } from "./FilaProducto";

interface PropiedadesTabla {
  productos: Producto[];
}

// Tabla contenedora simple que estructura el listado administrativo de productos del catálogo.
export function TablaProductos({ productos }: PropiedadesTabla) {
  return (
    <div className="overflow-x-auto border dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-semibold text-zinc-500 uppercase">
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Imagen</th>
            <th className="px-6 py-4">Producto</th>
            <th className="px-6 py-4">Precio Base</th>
            <th className="px-6 py-4">Descuento</th>
            <th className="px-6 py-4">Precio Final</th>
            <th className="px-6 py-4">Stock (Edición en Línea)</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-zinc-800">
          {productos.map((prod) => (
            <FilaProducto key={prod.id} producto={prod} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
