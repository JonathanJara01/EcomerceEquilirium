import { Producto } from "@/tipos/producto";
import { Tarjeta, TarjetaCabecera, TarjetaContenido, TarjetaPie, TarjetaTitulo } from "@/componentes/ui/tarjeta";
import { Insignia } from "@/componentes/ui/insignia";
import { formatearMoneda } from "@/utilidades/formatear";
import Image from "next/image";
import Link from "next/link";
import { Boton } from "@/componentes/ui/boton";
import { ShoppingCart } from "lucide-react";
import { usarCarritoStore } from "@/almacenes/carrito.store";
import { RUTAS } from "@/constantes/rutas";

interface PropiedadesTarjetaProducto {
  producto: Producto;
}

// Renderiza la tarjeta visual de un producto dentro del catálogo del ecommerce con interacción de compra y redirección.
export function TarjetaProducto({ producto }: PropiedadesTarjetaProducto) {
  const tieneDescuento = producto.descuento > 0;
  const agregarProducto = usarCarritoStore((s) => s.agregarProducto);

  return (
    <Tarjeta className="flex flex-col h-full border border-zinc-200/60 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white dark:bg-zinc-900 dark:border-zinc-850">
      <Link href={RUTAS.producto(producto.id)} className="block relative aspect-square w-full overflow-hidden rounded-t-2xl bg-zinc-100">
        <Image
          src={producto.imagenes[0]}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {tieneDescuento && (
          <div className="absolute top-3 left-3 z-10">
            <Insignia variant="destructive" className="font-bold text-[10px] uppercase">
              -{producto.descuento}% desc.
            </Insignia>
          </div>
        )}
      </Link>
      <TarjetaCabecera className="px-4 pt-4 pb-0 flex-none">
        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          {producto.categoria}
        </span>
        <Link href={RUTAS.producto(producto.id)} className="hover:underline">
          <TarjetaTitulo className="mt-1 line-clamp-1 text-base font-bold text-zinc-800 dark:text-zinc-100">
            {producto.nombre}
          </TarjetaTitulo>
        </Link>
      </TarjetaCabecera>
      <TarjetaContenido className="px-4 py-2 flex-1">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {producto.descripcion}
        </p>
      </TarjetaContenido>
      <TarjetaPie className="px-4 py-3 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex flex-col">
          {tieneDescuento && (
            <span className="text-[10px] line-through text-zinc-400">
              {formatearMoneda(producto.precioBase)}
            </span>
          )}
          <span className="text-sm font-black text-zinc-900 dark:text-zinc-50">
            {formatearMoneda(producto.precioFinal)}
          </span>
        </div>
        <Boton
          onClick={() => agregarProducto(producto, 1)}
          size="icon-sm"
          className="rounded-full shadow-sm cursor-pointer"
          title="Añadir al carrito"
        >
          <ShoppingCart className="size-3.5" />
        </Boton>
      </TarjetaPie>
    </Tarjeta>
  );
}

