import Link from "next/link";

// Renderiza el pie de página de la aplicación cliente con información institucional básica.
export function PieDePagina() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200/80 bg-zinc-50 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="container mx-auto max-w-6xl py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">EQUILIBRIUM ECOMMERCE</span>
          <p className="mt-1">© {anioActual} Todos los derechos reservados.</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
            Términos y Condiciones
          </Link>
          <Link href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
            Privacidad
          </Link>
          <Link href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}
