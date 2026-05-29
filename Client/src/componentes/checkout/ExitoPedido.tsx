"use client";

import React from "react";
import Link from "next/link";
import { Pedido } from "@/tipos/pedido";
import { Boton } from "@/componentes/ui/boton";
import { RUTAS } from "@/constantes/rutas";

interface PropiedadesExitoPedido {
  pedido: Pedido;
}

// Renderiza una interfaz premium de agradecimiento detallando el código de transacción obtenido del backend.
export function ExitoPedido({ pedido }: PropiedadesExitoPedido) {
  return (
    <div className="container mx-auto max-w-lg px-4 py-24 text-center">
      <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-8 rounded-2xl shadow-sm space-y-4 animate-in fade-in duration-300">
        <div className="inline-flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-2xl font-bold">
          ✓
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 dark:text-zinc-50">¡Compra Procesada con Éxito!</h2>
        <p className="text-zinc-550 text-sm">
          Código de Pedido: <b className="text-primary font-mono">{pedido.id}</b>
        </p>
        <p className="text-xs text-zinc-400">
          Gracias por tu preferencia. El inventario ha sido actualizado en el backend.
        </p>
        <div className="pt-4 border-t dark:border-zinc-800">
          <Link href={RUTAS.tienda}>
            <Boton className="w-full font-bold">Seguir comprando</Boton>
          </Link>
        </div>
      </div>
    </div>
  );
}
