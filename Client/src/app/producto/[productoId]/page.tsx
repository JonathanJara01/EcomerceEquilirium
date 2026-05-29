"use client";

import React from "react";
import { VistaDetalleProducto } from "@/componentes/productos/VistaDetalleProducto";

// Orquesta la ruta del detalle de producto dinámico y delega toda la carga y maquetación visual al componente modular.
export default function PaginaDetalle({ params }: { params: Promise<{ productoId: string }> }) {
  const { productoId } = React.use(params);
  return <VistaDetalleProducto productoId={productoId} />;
}
