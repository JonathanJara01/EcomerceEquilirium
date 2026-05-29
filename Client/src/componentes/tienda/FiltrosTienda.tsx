"use client";

import React from "react";
import { Categoria } from "@/tipos/categoria";

interface PropiedadesFiltros {
  busqueda: string;
  alCambiarBusqueda: (texto: string) => void;
  categoriaSeleccionada: string;
  alCambiarCategoria: (slug: string) => void;
  categorias: Categoria[];
}

// Renderiza el panel superior/lateral de búsqueda y filtrado por categoría del catálogo de la tienda.
export function FiltrosTienda({
  busqueda,
  alCambiarBusqueda,
  categoriaSeleccionada,
  alCambiarCategoria,
  categorias
}: PropiedadesFiltros) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => alCambiarBusqueda(e.target.value)}
        className="w-full md:w-72 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white dark:bg-zinc-900 dark:border-zinc-800"
      />
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <button
          onClick={() => alCambiarCategoria("")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            categoriaSeleccionada === ""
              ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:border-zinc-50"
              : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800"
          }`}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => alCambiarCategoria(cat.slug)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              categoriaSeleccionada === cat.slug
                ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:border-zinc-50"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800"
            }`}
          >
            {cat.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}
