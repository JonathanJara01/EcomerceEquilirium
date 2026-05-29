"use client";

import React, { useState } from "react";
import { useProductoDetalle } from "@/consultas/useProductoDetalle";
import { formatearMoneda } from "@/utilidades/formatear";
import { Boton } from "@/componentes/ui/boton";
import { Insignia } from "@/componentes/ui/insignia";
import { SelectorCantidad } from "./SelectorCantidad";
import { usarCarritoStore } from "@/almacenes/carrito.store";
import { RUTAS } from "@/constantes/rutas";
import Image from "next/image";
import Link from "next/link";

interface PropiedadesVistaDetalle {
  productoId: string;
}

// Renderiza la maquetación visual premium de la ficha detallada cargando el producto asíncronamente.
export function VistaDetalleProducto({ productoId }: PropiedadesVistaDetalle) {
  const { data: producto, isLoading, isError } = useProductoDetalle(productoId);
  const [cantidad, setCantidad] = useState(1);
  const agregarProducto = usarCarritoStore((s) => s.agregarProducto);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-20">
        <p className="text-sm font-medium text-zinc-500 animate-pulse">Cargando detalles del producto...</p>
      </div>
    );
  }

  if (isError || !producto) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-20 text-center px-4">
        <p className="text-sm font-semibold text-destructive">No se pudo cargar el producto solicitado.</p>
        <Link href={RUTAS.tienda} className="mt-4 text-xs font-bold text-primary underline uppercase tracking-wider">Volver al catálogo</Link>
      </div>
    );
  }

  const tieneDescuento = producto.descuento > 0;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 flex-1">
      <Link href={RUTAS.tienda} className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider">
        ← Volver a la tienda
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border bg-zinc-50/50 dark:border-zinc-850">
          <Image src={producto.imagenes[0]} alt={producto.nombre} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
          {tieneDescuento && (
            <div className="absolute top-4 left-4 z-10">
              <Insignia variant="destructive" className="font-bold text-xs uppercase px-2.5 py-1">-{producto.descuento}% desc.</Insignia>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{producto.categoria}</span>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">{producto.nombre}</h1>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{producto.descripcion}</p>
          <div className="mt-8 flex items-baseline gap-4">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50">{formatearMoneda(producto.precioFinal)}</span>
            {tieneDescuento && <span className="text-sm line-through text-zinc-400">{formatearMoneda(producto.precioBase)}</span>}
          </div>
          <div className="mt-8 border-t border-b py-6 border-zinc-200/80 dark:border-zinc-800/80 flex items-center gap-6">
            <SelectorCantidad cantidad={cantidad} stock={producto.stock} alCambiarCantidad={setCantidad} />
            <span className="text-xs text-zinc-450 select-none">{producto.stock} unidades disponibles</span>
          </div>
          <div className="mt-8">
            <Boton size="lg" className="w-full md:w-auto px-12 font-bold cursor-pointer" onClick={() => agregarProducto(producto, cantidad)}>
              Añadir al Carrito
            </Boton>
          </div>
        </div>
      </div>
    </div>
  );
}
