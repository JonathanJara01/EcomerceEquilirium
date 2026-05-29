"use client";

import React from "react";
import { Pedido } from "@/tipos/pedido";
import { FilaPedido } from "./FilaPedido";

interface PropiedadesTabla {
  pedidos: Pedido[];
}

// Tabla contenedora simple que estructura el listado de pedidos administrativos.
export function TablaPedidos({ pedidos }: PropiedadesTabla) {
  return (
    <div className="overflow-x-auto border dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-semibold text-zinc-500 uppercase">
            <th className="px-6 py-4">ID de Orden</th>
            <th className="px-6 py-4">Cliente</th>
            <th className="px-6 py-4">Fecha</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-zinc-800">
          {pedidos.map((ped) => (
            <FilaPedido key={ped.id} pedido={ped} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
