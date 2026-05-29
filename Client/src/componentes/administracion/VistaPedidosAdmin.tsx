"use client";

import React from "react";
import { usarPedidosAdmin } from "@/consultas/usePedidosAdmin";
import { TablaPedidos } from "./TablaPedidos";
import Link from "next/link";
import { RUTAS } from "@/constantes/rutas";

// Orquesta la maquetación interactiva y el control administrativo de pedidos cargando sus datos asíncronamente.
export function VistaPedidosAdmin() {
  const { data: pedidos, isLoading, isError } = usarPedidosAdmin();

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-24 text-center">
        <p className="text-sm font-medium text-zinc-500 animate-pulse">Cargando pedidos registrados...</p>
      </div>
    );
  }

  if (isError || !pedidos) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-24 text-center">
        <p className="text-sm font-semibold text-destructive">No se pudo cargar la base administrativa de pedidos.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 flex-1">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Pedidos Recibidos</h2>
        <Link href={RUTAS.inicio} className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 uppercase tracking-wider">
          ← Volver a Inicio
        </Link>
      </div>
      {pedidos.length === 0 ? (
        <div className="border border-dashed dark:border-zinc-800 rounded-3xl p-12 text-center text-zinc-500">
          <p className="font-semibold text-sm">No existen pedidos registrados en la plataforma.</p>
        </div>
      ) : (
        <TablaPedidos pedidos={pedidos} />
      )}
    </div>
  );
}
