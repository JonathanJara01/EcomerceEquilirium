"use client";

import React, { useState } from "react";
import { useProductos } from "@/consultas/useProductos";
import { useCategorias } from "@/consultas/useCategorias";
import { FiltrosTienda } from "./FiltrosTienda";
import { EstadoCatalogo } from "./EstadoCatalogo";

// Renderiza la maquetación principal de la tienda, controlando los estados y hooks de la API del catálogo.
export function VistaTienda() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // Construye la cadena de consulta query en base a los criterios de búsqueda y categoría seleccionada.
  const parametros = new URLSearchParams();
  if (busqueda) parametros.set("busqueda", busqueda);
  if (categoriaSeleccionada) parametros.set("categoria", categoriaSeleccionada);
  const filtrosQuery = parametros.toString() ? `?${parametros.toString()}` : "";

  const { data: productos, isLoading, isError } = useProductos(filtrosQuery);
  const { data: categorias } = useCategorias();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 flex-1">
      <div className="border-b pb-6 mb-8 border-zinc-200/80 dark:border-zinc-800/80">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Nuestra Tienda
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          Explora nuestra colección selecta de artículos premium y encuentra el equilibrio de tu estilo.
        </p>
      </div>

      <FiltrosTienda
        busqueda={busqueda}
        alCambiarBusqueda={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        alCambiarCategoria={setCategoriaSeleccionada}
        categorias={categorias || []}
      />

      <EstadoCatalogo
        cargando={isLoading}
        error={isError}
        productos={productos || []}
      />
    </div>
  );
}
