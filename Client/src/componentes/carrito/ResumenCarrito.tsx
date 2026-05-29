"use client";

import React from "react";
import Link from "next/link";
import { usarCarritoStore } from "@/almacenes/carrito.store";
import { formatearMoneda } from "@/utilidades/formatear";
import { Boton } from "@/componentes/ui/boton";
import { RUTAS } from "@/constantes/rutas";
import { PanelClose, PanelPie } from "@/componentes/ui/panel-deslizable";

// Componente granular que representa el pie y resumen financiero del carrito de compras.
export function ResumenCarrito() {
  const { items, limpiarCarrito } = usarCarritoStore();
  const totalPrecio = items.reduce((tot, i) => tot + i.producto.precioFinal * i.cantidad, 0);

  if (items.length === 0) return null;

  return (
    <PanelPie className="border-t pt-4 dark:border-zinc-800 space-y-3">
      <div className="flex justify-between items-center text-sm font-semibold">
        <span>Total estimado:</span>
        <span className="text-base text-primary">{formatearMoneda(totalPrecio)}</span>
      </div>
      <div className="flex flex-col gap-2">
        <PanelClose render={
          <Link href={RUTAS.checkout} className="w-full">
            <Boton className="w-full">Iniciar Pago</Boton>
          </Link>
        } />
        <Boton variant="ghost" size="sm" className="text-zinc-500 hover:text-red-500" onClick={limpiarCarrito}>
          Vaciar Carrito
        </Boton>
      </div>
    </PanelPie>
  );
}
