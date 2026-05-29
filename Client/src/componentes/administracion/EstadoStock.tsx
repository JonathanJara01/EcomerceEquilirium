"use client";

import React, { useState, useEffect } from "react";
import { usarActualizarProducto } from "@/consultas/useProductosAdmin";
import { RefreshCw, Edit2 } from "lucide-react";

interface PropiedadesStock {
  productoId: string;
  stockActual: number;
}

// Componente interactivo que dibuja el stock y permite editarlo en línea (PATCH) de forma ágil.
export function EstadoStock({ productoId, stockActual }: PropiedadesStock) {
  const { mutate: actualizar, isPending } = usarActualizarProducto();
  const [editando, setEditando] = useState(false);
  const [valor, setValor] = useState(stockActual);

  useEffect(() => {
    setValor(stockActual);
  }, [stockActual]);

  const alGuardar = () => {
    if (valor === stockActual) {
      setEditando(false);
      return;
    }
    actualizar(
      {
        productoId,
        datos: { stock: valor }
      },
      {
        onSuccess: () => setEditando(false),
        onError: () => setValor(stockActual)
      }
    );
  };

  const alPresionarTecla = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      alGuardar();
    } else if (e.key === "Escape") {
      setValor(stockActual);
      setEditando(false);
    }
  };

  if (editando) {
    return (
      <div className="flex items-center gap-1">
        <input
          type="number"
          min="0"
          value={valor}
          disabled={isPending}
          onChange={(e) => setValor(Number(e.target.value))}
          onBlur={alGuardar}
          onKeyDown={alPresionarTecla}
          autoFocus
          className="w-16 px-2 py-1 text-xs border rounded-lg bg-zinc-950 border-zinc-800 text-zinc-50 font-bold focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {isPending && <RefreshCw className="size-3 animate-spin text-zinc-400" />}
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditando(true)}
      className="group flex items-center gap-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 px-2 py-1 rounded-lg transition-colors w-fit"
    >
      <span className="font-bold text-zinc-900 dark:text-zinc-50">{stockActual} uds</span>
      <Edit2 className="size-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
