"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/utilidades/utils"
import { Boton } from "@/componentes/ui/boton"
import { XIcon } from "lucide-react"

// Componente base que define el estado de visibilidad del panel lateral.
const PanelDeslizable = (props: SheetPrimitive.Root.Props) => <SheetPrimitive.Root data-slot="sheet" {...props} />

// Componente disparador que al hacer click abre el panel deslizable.
const PanelTrigger = (props: SheetPrimitive.Trigger.Props) => <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />

// Componente disparador de cierre dentro del panel lateral.
const PanelClose = (props: SheetPrimitive.Close.Props) => <SheetPrimitive.Close data-slot="sheet-close" {...props} />

// Fondo oscuro y translúcido que acompaña al panel lateral.
const PanelOverlay = ({ className, ...props }: SheetPrimitive.Backdrop.Props) => (
  <SheetPrimitive.Backdrop
    data-slot="sheet-overlay"
    className={cn("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", className)}
    {...props}
  />
)

// Contenedor principal que se desplaza desde un borde de la pantalla.
const PanelContenido = ({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) => (
  <SheetPrimitive.Portal>
    <PanelOverlay />
    <SheetPrimitive.Popup
      data-slot="sheet-content"
      data-side={side}
      className={cn(
        "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <SheetPrimitive.Close data-slot="sheet-close" render={<Boton variant="ghost" className="absolute top-3 right-3" size="icon-sm" />}>
          <XIcon />
          <span className="sr-only">Cerrar</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Popup>
  </SheetPrimitive.Portal>
)

// Cabecera del panel para ubicar títulos y descripciones informativas.
const PanelCabecera = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sheet-header" className={cn("flex flex-col gap-0.5 p-4", className)} {...props} />
)

// Pie del panel para ubicar botones de acción principales al final.
const PanelPie = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)

// Título accesible e informativo del panel deslizable.
const PanelTitulo = ({ className, ...props }: SheetPrimitive.Title.Props) => (
  <SheetPrimitive.Title data-slot="sheet-title" className={cn("font-heading text-base font-medium text-foreground", className)} {...props} />
)

// Descripción informativa y de accesibilidad secundaria del panel deslizable.
const PanelDescripcion = ({ className, ...props }: SheetPrimitive.Description.Props) => (
  <SheetPrimitive.Description data-slot="sheet-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
)

export {
  PanelDeslizable,
  PanelTrigger,
  PanelClose,
  PanelContenido,
  PanelCabecera,
  PanelPie,
  PanelTitulo,
  PanelDescripcion,
}
