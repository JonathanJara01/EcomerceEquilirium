"use client";

import React, { useState } from "react";
import { Boton } from "@/componentes/ui/boton";

interface PropiedadesFormularioEnvio {
  alEnviar: (datos: DatosEnvio) => void;
}

export interface DatosEnvio {
  nombre: string;
  correo: string;
  direccion: string;
  ciudad: string;
  telefono: string;
}

// Renderiza el formulario interactivo para capturar los datos de facturación y despacho.
export function FormularioEnvio({ alEnviar }: PropiedadesFormularioEnvio) {
  const [datos, setDatos] = useState<DatosEnvio>({
    nombre: "",
    correo: "",
    direccion: "",
    ciudad: "",
    telefono: ""
  });

  const alCambiar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const alProcesar = (e: React.FormEvent) => {
    e.preventDefault();
    alEnviar(datos);
  };

  return (
    <form onSubmit={alProcesar} className="space-y-4 bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 border-b pb-2 dark:border-zinc-800">
        Información de Despacho
      </h3>
      <div>
        <label className="block text-xs font-semibold text-zinc-550 dark:text-zinc-400 mb-1">Nombre Completo</label>
        <input type="text" name="nombre" value={datos.nombre} onChange={alCambiar} required className="w-full px-3 py-2 border rounded-xl bg-transparent text-sm focus:outline-none focus:border-primary dark:border-zinc-800" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-zinc-550 dark:text-zinc-400 mb-1">Correo Electrónico</label>
        <input type="email" name="correo" value={datos.correo} onChange={alCambiar} required className="w-full px-3 py-2 border rounded-xl bg-transparent text-sm focus:outline-none focus:border-primary dark:border-zinc-800" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-zinc-550 dark:text-zinc-400 mb-1">Dirección de Despacho</label>
        <input type="text" name="direccion" value={datos.direccion} onChange={alCambiar} required className="w-full px-3 py-2 border rounded-xl bg-transparent text-sm focus:outline-none focus:border-primary dark:border-zinc-800" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-550 dark:text-zinc-400 mb-1">Ciudad</label>
          <input type="text" name="ciudad" value={datos.ciudad} onChange={alCambiar} required className="w-full px-3 py-2 border rounded-xl bg-transparent text-sm focus:outline-none focus:border-primary dark:border-zinc-800" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-550 dark:text-zinc-400 mb-1">Teléfono</label>
          <input type="tel" name="telefono" value={datos.telefono} onChange={alCambiar} required className="w-full px-3 py-2 border rounded-xl bg-transparent text-sm focus:outline-none focus:border-primary dark:border-zinc-800" />
        </div>
      </div>
      <Boton type="submit" className="w-full mt-4 font-bold">
        Confirmar Pedido
      </Boton>
    </form>
  );
}
