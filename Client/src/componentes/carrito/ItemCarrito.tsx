"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { ItemCarrito as TipoItem } from "@/tipos/carrito";
import { formatearMoneda } from "@/utilidades/formatear";
import { SelectorCantidad } from "@/componentes/productos/SelectorCantidad";
import { Boton } from "@/componentes/ui/boton";
import { usarCarritoStore } from "@/almacenes/carrito.store";

interface PropiedadesItemCarrito {
  item: TipoItem;
}

// Componente granular que representa una fila de producto individual dentro del carrito de compras.
export function ItemCarrito({ item }: PropiedadesItemCarrito) {
  const { eliminarProducto, actualizarCantidad } = usarCarritoStore();

  return (
    <div className="flex gap-3 border-b pb-4 last:border-0 dark:border-zinc-800">
      <img
        src={item.producto.imagenes[0]}
        alt={item.producto.nombre}
        className="size-16 rounded-lg object-cover bg-zinc-100"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
          {item.producto.nombre}
        </h4>
        <p className="text-xs text-zinc-500 mb-2">
          {formatearMoneda(item.producto.precioFinal)} c/u
        </p>
        <div className="flex items-center justify-between gap-2">
          <SelectorCantidad
            cantidad={item.cantidad}
            stock={item.producto.stock}
            alCambiarCantidad={(nueva) => actualizarCantidad(item.producto.id, nueva)}
          />
          <Boton
            variant="destructive"
            size="icon-sm"
            onClick={() => eliminarProducto(item.producto.id)}
            title="Eliminar producto"
          >
            <Trash2 className="size-3.5" />
          </Boton>
        </div>
      </div>
    </div>
  );
}
