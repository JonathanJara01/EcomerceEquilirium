import * as React from "react";
import { cn } from "@/utilidades/utils";

// Componente principal de tarjeta contenedora de información.
function Tarjeta({
  className,
  size = "default",
  ...propiedades
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...propiedades}
    />
  );
}

// Cabecera interna para títulos y acciones de la tarjeta.
function TarjetaCabecera({ className, ...propiedades }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...propiedades}
    />
  );
}

// Título de la tarjeta.
function TarjetaTitulo({ className, ...propiedades }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className)}
      {...propiedades}
    />
  );
}

// Descripción explicativa de la tarjeta.
function TarjetaDescripcion({ className, ...propiedades }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-description" className={cn("text-sm text-muted-foreground", className)} {...propiedades} />
  );
}

// Contenedor de acción especial en cabecera de la tarjeta.
function TarjetaAccion({ className, ...propiedades }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...propiedades}
    />
  );
}

// Contenedor principal de contenidos de la tarjeta.
function TarjetaContenido({ className, ...propiedades }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("px-4 group-data-[size=sm]/card:px-3", className)} {...propiedades} />
  );
}

// Pie de página de la tarjeta para botones o información adicional.
function TarjetaPie({ className, ...propiedades }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...propiedades}
    />
  );
}

export {
  Tarjeta,
  TarjetaCabecera,
  TarjetaPie,
  TarjetaTitulo,
  TarjetaAccion,
  TarjetaDescripcion,
  TarjetaContenido,
};
