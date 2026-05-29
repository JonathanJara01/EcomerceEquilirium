"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { usarCarritoStore } from "@/almacenes/carrito.store";
import { ItemCarrito } from "./ItemCarrito";
import { ResumenCarrito } from "./ResumenCarrito";
import { Boton } from "@/componentes/ui/boton";
import {
  PanelDeslizable,
  PanelTrigger,
  PanelContenido,
  PanelCabecera,
  PanelTitulo,
  PanelDescripcion,
  PanelClose,
} from "@/componentes/ui/panel-deslizable";

// Barra lateral deslizante e interactiva que aloja la visualización general de la compra en curso.
export function PanelCarrito() {
  const items = usarCarritoStore((s) => s.items);
  const totalCantidad = items.reduce((tot, i) => tot + i.cantidad, 0);

  return (
    <PanelDeslizable>
      <PanelTrigger render={
        <Boton variant="outline" className="relative flex gap-2" size="sm">
          <ShoppingCart className="size-4" />
          <span>Carrito</span>
          {totalCantidad > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-200">
              {totalCantidad}
            </span>
          )}
        </Boton>
      } />
      <PanelContenido className="w-full sm:max-w-md">
        <PanelCabecera>
          <PanelTitulo>Mi Carrito</PanelTitulo>
          <PanelDescripcion>Gestiona los productos añadidos a tu compra.</PanelDescripcion>
        </PanelCabecera>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center gap-2 text-zinc-500">
              <ShoppingCart className="size-12 stroke-1" />
              <p className="font-medium">Tu carrito está vacío</p>
              <PanelClose render={<Boton variant="link" size="sm">Seguir comprando</Boton>} />
            </div>
          ) : (
            items.map((it) => <ItemCarrito key={it.producto.id} item={it} />)
          )}
        </div>
        <ResumenCarrito />
      </PanelContenido>
    </PanelDeslizable>
  );
}
