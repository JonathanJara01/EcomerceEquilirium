"use client";

import React, { useState } from "react";
import { usarProductosAdmin } from "@/consultas/useProductosAdmin";
import { TablaProductos } from "./TablaProductos";
import { FormularioProducto } from "./FormularioProducto";
import Link from "next/link";
import { RUTAS } from "@/constantes/rutas";
import { Boton } from "@/componentes/ui/boton";
import { Plus } from "lucide-react";

// Orquesta el panel administrativo de productos permitiendo agregar, ver y disparar modificaciones.
export function VistaProductosAdmin() {
  const { data: productos, isLoading, isError } = usarProductosAdmin();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-24 text-center">
        <p className="text-sm font-medium text-zinc-500 animate-pulse">Cargando inventarios comerciales...</p>
      </div>
    );
  }

  if (isError || !productos) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-24 text-center">
        <p className="text-sm font-semibold text-destructive">No se pudo cargar la base de productos.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 flex-1">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Inventario de Productos</h2>
        <div className="flex gap-4 items-center">
          <Boton onClick={() => setMostrarFormulario(true)} className="cursor-pointer font-bold flex gap-1 items-center">
            <Plus className="size-4" />
            <span>Nuevo Producto</span>
          </Boton>
          <Link href={RUTAS.inicio} className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 uppercase tracking-wider">
            ← Volver
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {productos.length === 0 ? (
            <div className="border border-dashed dark:border-zinc-800 rounded-3xl p-12 text-center text-zinc-500">
              <p className="font-semibold text-sm">No existen productos registrados.</p>
            </div>
          ) : (
            <TablaProductos productos={productos} />
          )}
        </div>
        <div>
          {mostrarFormulario ? (
            <FormularioProducto alCerrar={() => setMostrarFormulario(false)} />
          ) : (
            <div className="border border-dashed dark:border-zinc-800 rounded-3xl p-8 text-center text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50">
              <p className="text-xs font-medium">Haga clic en "Nuevo Producto" para dar de alta un producto comercial.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
