import Link from "next/link";
import { Boton } from "@/componentes/ui/boton";
import { RUTAS } from "@/constantes/rutas";

// Renderiza la página de inicio minimalista de bienvenida para el ecommerce.
export default function PaginaInicio() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[70vh] px-4 text-center">
      <main className="max-w-xl p-10 bg-white border border-zinc-150 rounded-3xl shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Ecommerce Equilibrium
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Bienvenido a la experiencia Equilibrium. Diseñamos un espacio premium donde podrás explorar lo último en tecnología, calzado deportivo y vestuario con estilo.
        </p>
        <div className="mt-8">
          <Link href={RUTAS.tienda}>
            <Boton size="lg" className="px-8 font-semibold shadow-sm cursor-pointer">
              Explorar la Tienda
            </Boton>
          </Link>
        </div>
      </main>
    </div>
  );
}
