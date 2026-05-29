"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usarCarritoStore } from "@/almacenes/carrito.store";
import { FormularioEnvio, DatosEnvio } from "./FormularioEnvio";
import { ResumenPedido } from "./ResumenPedido";
import { ExitoPedido } from "./ExitoPedido";
import { Pedido } from "@/tipos/pedido";
import { RUTAS } from "@/constantes/rutas";
import { crearPedido } from "@/servicios/pedidos.servicio";

// Orquesta la maquetación interactiva y el resumen comercial de la compra en la sección de checkout.
export function VistaCheckout() {
  const items = usarCarritoStore((s) => s.items);
  const limpiarCarrito = usarCarritoStore((s) => s.limpiarCarrito);
  const [pedidoCreado, setPedidoCreado] = useState<Pedido | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alProcesarOrden = async (datos: DatosEnvio) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await crearPedido(datos, items);
      if (respuesta.exito) {
        setPedidoCreado(respuesta.datos);
        limpiarCarrito();
      } else {
        setError(respuesta.mensaje || "Error al procesar la compra.");
      }
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  if (items.length === 0 && !pedidoCreado) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-24 text-center">
        <h2 className="text-xl font-extrabold text-zinc-950 dark:text-zinc-50">Tu carrito está vacío</h2>
        <p className="text-zinc-550 text-sm mt-2">Agrega productos en el catálogo antes de iniciar el pago.</p>
        <Link href={RUTAS.tienda} className="mt-6 inline-block text-xs font-bold text-primary underline uppercase tracking-wider">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  if (pedidoCreado) {
    return <ExitoPedido pedido={pedidoCreado} />;
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 flex-1">
      <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Completar Compra</h2>
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 animate-in slide-in-from-top duration-300">
          Error: {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className={`md:col-span-2 ${cargando ? "opacity-60 pointer-events-none" : ""}`}>
          <FormularioEnvio alEnviar={alProcesarOrden} />
        </div>
        <div>
          <ResumenPedido />
        </div>
      </div>
    </div>
  );
}
