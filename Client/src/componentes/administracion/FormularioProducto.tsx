"use client";

import React, { useState } from "react";
import { usarCrearProducto } from "@/consultas/useProductosAdmin";
import { Boton } from "@/componentes/ui/boton";
import { RefreshCw } from "lucide-react";

interface PropiedadesFormulario {
  alCerrar: () => void;
}

// Formulario de creación estricta de productos.
export function FormularioProducto({ alCerrar }: PropiedadesFormulario) {
  const { mutate: crear, isPending } = usarCrearProducto();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoria, setCategoria] = useState("tecnologia");
  const [imagenUrl, setImagenUrl] = useState("");
  const [destacado, setDestacado] = useState(false);

  const alEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    // POST: envía obligatoriamente los 6 campos requeridos por el backend
    crear(
      {
        id: "",
        nombre,
        descripcion,
        precioBase,
        stock,
        categoria,
        imagenes: [imagenUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600"],
        destacado,
        descuento: 0,
        calificacion: 5
      },
      {
        onSuccess: () => {
          setNombre("");
          setDescripcion("");
          setPrecioBase(0);
          setStock(0);
          setCategoria("tecnologia");
          setImagenUrl("");
          setDestacado(false);
          alCerrar();
        }
      }
    );
  };

  return (
    <form onSubmit={alEnviar} className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
      <h3 className="font-black text-zinc-900 dark:text-zinc-50 tracking-tight text-sm">
        Nuevo Producto
      </h3>
      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Nombre</label>
        <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full text-sm px-3 py-2 border rounded-xl dark:bg-zinc-950 dark:border-zinc-800" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Descripción</label>
        <textarea required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full text-sm px-3 py-2 border rounded-xl dark:bg-zinc-950 dark:border-zinc-800 h-16 resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Precio Base</label>
          <input required type="number" min="0" value={precioBase} onChange={(e) => setPrecioBase(Number(e.target.value))} className="w-full text-sm px-3 py-2 border rounded-xl dark:bg-zinc-950 dark:border-zinc-800" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Stock</label>
          <input required type="number" min="0" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="w-full text-sm px-3 py-2 border rounded-xl dark:bg-zinc-950 dark:border-zinc-800" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Categoría</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full text-sm px-3 py-2 border rounded-xl dark:bg-zinc-950 dark:border-zinc-800">
            <option value="tecnologia">Tecnología</option>
            <option value="calzado">Calzado</option>
            <option value="moda">Moda</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>
        <div className="space-y-1 flex flex-col justify-end pb-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={destacado} onChange={(e) => setDestacado(e.target.checked)} className="rounded" />
            <label className="text-xs font-semibold text-zinc-500">Destacado</label>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Imagen URL</label>
        <input required type="url" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} className="w-full text-sm px-3 py-2 border rounded-xl dark:bg-zinc-950 dark:border-zinc-800" />
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Boton type="button" variant="outline" size="sm" onClick={alCerrar} className="cursor-pointer font-bold">Cancelar</Boton>
        <Boton type="submit" size="sm" disabled={isPending} className="cursor-pointer font-bold flex gap-1 items-center">
          {isPending && <RefreshCw className="size-3 animate-spin" />}
          <span>Crear Producto</span>
        </Boton>
      </div>
    </form>
  );
}
