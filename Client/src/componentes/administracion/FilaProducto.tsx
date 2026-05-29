"use client";

import React from "react";
import { Producto } from "@/tipos/producto";
import { formatearMoneda } from "@/utilidades/formatear";
import { EstadoStock } from "./EstadoStock";

interface PropiedadesFila {
  producto: Producto;
}

// Renderiza una fila individual representativa de un producto dentro de la grilla de administración.
export function FilaProducto({ producto }: PropiedadesFila) {
  return (
    <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors text-zinc-900 dark:text-zinc-100">
      <td className="px-6 py-4 font-mono font-bold text-xs text-zinc-950 dark:text-zinc-50">
        {producto.id}
      </td>
      <td className="px-6 py-4">
        {producto.imagenes[0] ? (
          <img src={producto.imagenes[0]} alt={producto.nombre} className="size-10 object-cover rounded-xl border dark:border-zinc-800" />
        ) : (
          <div className="size-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
        )}
      </td>
      <td className="px-6 py-4">
        <div className="font-semibold text-zinc-900 dark:text-zinc-100">{producto.nombre}</div>
        <div className="text-xs text-zinc-400 capitalize">{producto.categoria}</div>
      </td>
      <td className="px-6 py-4 font-mono text-zinc-500">{formatearMoneda(producto.precioBase)}</td>
      <td className="px-6 py-4 font-semibold text-destructive">{producto.descuento}%</td>
      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-50">{formatearMoneda(producto.precioFinal)}</td>
      <td className="px-6 py-4">
        <EstadoStock productoId={producto.id} stockActual={producto.stock} />
      </td>
    </tr>
  );
}
