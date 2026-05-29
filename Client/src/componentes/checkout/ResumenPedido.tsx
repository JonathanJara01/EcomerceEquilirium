"use client";

import React from "react";
import { usarCarritoStore } from "@/almacenes/carrito.store";
import { formatearMoneda } from "@/utilidades/formatear";
import { Tarjeta, TarjetaContenido } from "@/componentes/ui/tarjeta";

// Renderiza el desglose financiero y el listado de ítems incluidos en el pedido de compra.
export function ResumenPedido() {
  const items = usarCarritoStore((s) => s.items);
  const subtotal = items.reduce((tot, i) => tot + i.producto.precioFinal * i.cantidad, 0);
  const costoEnvio = subtotal > 50000 || subtotal === 0 ? 0 : 3990;
  const total = subtotal + costoEnvio;

  return (
    <Tarjeta className="border dark:border-zinc-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-900">
      <TarjetaContenido className="p-5 space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 border-b pb-2 dark:border-zinc-800">
          Resumen del Pedido
        </h3>
        <div className="max-h-48 overflow-y-auto space-y-3 pr-1">
          {items.map((it) => (
            <div key={it.producto.id} className="flex justify-between items-center text-xs text-zinc-650 dark:text-zinc-400">
              <span className="truncate max-w-[160px] font-medium">
                {it.producto.nombre} <b className="text-[10px] text-zinc-400">x{it.cantidad}</b>
              </span>
              <span className="font-semibold">
                {formatearMoneda(it.producto.precioFinal * it.cantidad)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 dark:border-zinc-800 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-500">Subtotal</span>
            <span className="font-semibold text-zinc-850 dark:text-zinc-200">{formatearMoneda(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Costo de despacho</span>
            <span className="font-semibold text-zinc-850 dark:text-zinc-200">
              {costoEnvio === 0 ? "Gratis" : formatearMoneda(costoEnvio)}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 dark:border-zinc-800 text-sm font-bold text-zinc-950 dark:text-zinc-50">
            <span>Total estimado</span>
            <span className="text-primary">{formatearMoneda(total)}</span>
          </div>
        </div>
      </TarjetaContenido>
    </Tarjeta>
  );
}
