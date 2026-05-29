import Link from "next/link";
import { RUTAS } from "@/constantes/rutas";
import { PanelCarrito } from "@/componentes/carrito/PanelCarrito";

// Renderiza la cabecera de navegación principal de la aplicación cliente.
export function Cabecera() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={RUTAS.inicio} className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          EQUILIBRIUM
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href={RUTAS.inicio} className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50">
            Inicio
          </Link>
          <Link href={RUTAS.tienda} className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50">
            Tienda
          </Link>
          <Link href="#" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50">
            Favoritos
          </Link>
          <PanelCarrito />
        </nav>
      </div>
    </header>
  );
}


