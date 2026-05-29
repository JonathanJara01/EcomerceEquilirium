"use client";

import React from "react";
import { Insignia } from "@/componentes/ui/insignia";

interface PropiedadesEstado {
  estado: "pendiente" | "completado";
}

// Componente atómico que dibuja la insignia de estado del pedido.
export function EstadoPedido({ estado }: PropiedadesEstado) {
  return (
    <Insignia variant={estado === "completado" ? "default" : "destructive"}>
      {estado}
    </Insignia>
  );
}
