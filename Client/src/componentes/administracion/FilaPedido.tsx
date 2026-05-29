"use client";

import React from "react";
import { Pedido } from "@/tipos/pedido";
import { Boton } from "@/componentes/ui/boton";
import { RefreshCw } from "lucide-react";
import { formatearMoneda } from "@/utilidades/formatear";
import { EstadoPedido } from "./EstadoPedido";
import { usarActualizarEstadoPedido } from "@/consultas/usePedidosAdmin";

interface PropiedadesFila {
  pedido: Pedido;
}

// Representa una fila individual dentro de la tabla de control administrativo.
export function FilaPedido({ pedido }: PropiedadesFila) {
  const { mutate: cambiarEstado, isPending } = usarActualizarEstadoPedido();

  const alCambiarEstado = () => {
    const nuevo = pedido.estado === "pendiente" ? "completado" : "pendiente";
    cambiarEstado({ pedidoId: pedido.id, estado: nuevo });
  };

  return (
    <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
      <td className="px-6 py-4 font-mono font-bold text-xs text-zinc-950 dark:text-zinc-50">
        {pedido.id}
      </td>
      <td className="px-6 py-4">
        <div className="font-semibold text-zinc-900 dark:text-zinc-100">
          {pedido.cliente.nombre}
        </div>
        <div className="text-xs text-zinc-400">{pedido.cliente.correo}</div>
      </td>
      <td className="px-6 py-4 text-xs text-zinc-500">
        {new Date(pedido.fecha).toLocaleDateString("es-CL", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </td>
      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-50">
        {formatearMoneda(pedido.total)}
      </td>
      <td className="px-6 py-4">
        <EstadoPedido estado={pedido.estado} />
      </td>
      <td className="px-6 py-4 text-right">
        <Boton
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={alCambiarEstado}
          className="cursor-pointer font-bold flex gap-1 items-center ml-auto"
        >
          {isPending && <RefreshCw className="size-3 animate-spin" />}
          <span>
            Marcar {pedido.estado === "pendiente" ? "Completado" : "Pendiente"}
          </span>
        </Boton>
      </td>
    </tr>
  );
}
