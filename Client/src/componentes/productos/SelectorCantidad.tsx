"use client";

import React from "react";

interface PropiedadesSelectorCantidad {
  cantidad: number;
  stock: number;
  alCambiarCantidad: (nuevaCantidad: number) => void;
}

// Renderiza un selector numérico con botones para incrementar y decrementar la cantidad controlando el stock disponible.
export function SelectorCantidad({
  cantidad,
  stock,
  alCambiarCantidad
}: PropiedadesSelectorCantidad) {
  return (
    <div className="flex items-center border rounded-xl overflow-hidden bg-white dark:bg-zinc-900 dark:border-zinc-800">
      <button
        onClick={() => alCambiarCantidad(Math.max(1, cantidad - 1))}
        className="px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-bold cursor-pointer"
        type="button"
      >
        -
      </button>
      <span className="px-4 font-bold text-sm w-12 text-center select-none">{cantidad}</span>
      <button
        onClick={() => alCambiarCantidad(Math.min(stock, cantidad + 1))}
        className="px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-bold cursor-pointer"
        type="button"
      >
        +
      </button>
    </div>
  );
}
