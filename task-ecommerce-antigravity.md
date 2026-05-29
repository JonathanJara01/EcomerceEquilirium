# TASK.md — Ecommerce Next.js + React + TypeScript + shadcn UI

## Objetivo general
Construir un ecommerce moderno, modular y escalable usando **Next.js**, **React**, **TypeScript**, **pnpm**, **Zustand**, **TanStack Query/Table** y la librería visual de **shadcn UI / shadcnspace Ecommerce Shop**.

Referencia visual obligatoria:
https://dashboard.shadcnspace.com/apps/ecommerce/shop

El ecommerce debe respetar buenas prácticas de arquitectura, nombres en español, comentarios en español, archivos pequeños y separación clara de responsabilidades.

---

## Regla principal antes de tocar código
Antes de crear, modificar, eliminar o mover cualquier archivo, debes pedir autorización explícita.

No realices cambios automáticos sin explicar primero:

1. Qué archivo vas a crear o modificar.
2. Por qué es necesario.
3. Qué responsabilidad tendrá.
4. Qué impacto tendrá en el ecommerce.
5. Qué alternativas existen si aplica.

Después de explicar, espera aprobación antes de continuar.

---

## Reglas obligatorias de código

### 1. Límite máximo por archivo
Ningún archivo puede superar las **100 líneas de código**.

Si un archivo se acerca a ese límite, debes dividirlo en:

- componentes pequeños,
- hooks personalizados,
- stores,
- helpers,
- tipos,
- servicios,
- constantes,
- esquemas,
- adaptadores.

No se permiten archivos gigantes ni componentes monolíticos.

---

### 2. Idioma obligatorio del código
Todos los nombres deben estar en **español**.

Esto aplica para:

- componentes,
- funciones,
- hooks,
- stores,
- variables,
- carpetas propias,
- archivos propios,
- tipos,
- interfaces,
- constantes,
- servicios,
- helpers.

Ejemplos correctos:

```ts
ProductoCard.tsx
TablaProductos.tsx
useProductos.ts
usarCarrito.ts
producto.servicio.ts
carrito.store.ts
obtenerProductos()
agregarProductoAlCarrito()
Producto
ProductoDetalle
EstadoPedido
```

Ejemplos incorrectos:

```ts
ProductCard.tsx
ProductsTable.tsx
useProducts.ts
cartStore.ts
getProducts()
addToCart()
```

Solo se permite inglés cuando sea obligatorio por la librería, framework o API externa, por ejemplo:

```ts
export default
metadata
children
params
searchParams
queryKey
queryFn
```

---

### 3. Comentarios obligatorios en español
Cada función debe tener un comentario superior como título explicando qué hace.

Ejemplo obligatorio:

```ts
// Obtiene el listado de productos desde la API.
export async function obtenerProductos() {
  return clienteApi.get('/productos');
}
```

Cada sección modificada también debe incluir comentarios claros en español cuando aporte guía técnica.

No agregar comentarios obvios o innecesarios.

---

### 4. Buenas prácticas con React y TypeScript
Debes aplicar estas reglas:

- Usar componentes pequeños y reutilizables.
- Separar lógica de UI.
- Usar tipos explícitos para entidades principales.
- Evitar `any` salvo caso justificado y autorizado.
- Evitar lógica compleja dentro del JSX.
- Evitar props enormes.
- Crear helpers para formateos.
- Crear hooks para lógica reutilizable.
- Mantener componentes visuales enfocados solo en renderizar.
- Mantener servicios enfocados solo en comunicación con API.
- Mantener stores enfocados solo en estado global necesario.
- No duplicar lógica entre componentes.
- No hardcodear datos del ecommerce si deben venir desde API o mock controlado.

---

### 5. Next.js + pnpm
La API y el frontend deben desarrollarse dentro de Next.js usando `pnpm`.

Reglas:

- Usar App Router.
- Usar Route Handlers para API interna.
- No usar `npm`.
- No usar `yarn`.
- Todos los comandos sugeridos deben usar `pnpm`.
- No ejecutar `pnpm build`, `tsc`, reinicios Docker ni validaciones locales salvo que el usuario lo solicite explícitamente.

Ejemplos permitidos:

```bash
pnpm add zustand @tanstack/react-query @tanstack/react-table
pnpm dlx shadcn@latest add button card input badge dialog sheet table select checkbox
```

---

## Librerías obligatorias

### UI base
Usar la librería visual de:

```txt
https://dashboard.shadcnspace.com/apps/ecommerce/shop
```

Debe respetarse la estructura visual base del shop:

- listado de productos,
- filtros por categoría,
- ordenamiento,
- búsqueda,
- filtros por precio,
- filtros por género si aplica,
- filtros por color si aplica,
- estado vacío cuando no hay productos,
- diseño moderno tipo dashboard ecommerce.

Si la plantilla requiere key de pago, antes de integrarla debes pedir al usuario la autorización para usarla o solicitarle los archivos/licencia necesarios.

---

### Estado global con Zustand
Usar Zustand para estado global sencillo, por ejemplo:

- carrito,
- favoritos,
- sesión visual si aplica,
- preferencias de filtros compartidas,
- estado de sidebar o layout.

Reglas:

- No usar Zustand para todo.
- No guardar datos remotos pesados en Zustand si TanStack Query los puede manejar mejor.
- Separar stores por responsabilidad.
- Cada store debe estar en archivo propio.
- Cada acción debe estar nombrada en español.

Ejemplo de archivos:

```txt
src/almacenes/carrito.store.ts
src/almacenes/favoritos.store.ts
src/almacenes/filtros-productos.store.ts
```

---

### Datos remotos con TanStack Query
Usar TanStack Query para:

- consultar productos,
- consultar categorías,
- consultar detalle de producto,
- consultar pedidos,
- mutaciones de carrito persistente si aplica,
- invalidación de caché.

Reglas:

- Cada query debe estar encapsulada en hooks.
- Los `queryKey` deben estar centralizados.
- No hacer `fetch` directo dentro de componentes visuales.
- Las mutaciones deben estar separadas por responsabilidad.

Ejemplo de archivos:

```txt
src/consultas/productos.keys.ts
src/consultas/useProductos.ts
src/consultas/useProductoDetalle.ts
src/servicios/productos.servicio.ts
```

---

### Tablas con TanStack Table
Usar TanStack Table donde aplique, especialmente para:

- administración de productos,
- pedidos,
- clientes,
- inventario.

Reglas:

- Columnas en archivo separado.
- Tabla visual en componente separado.
- Filtros en componente separado.
- Paginación en componente separado.
- Nada de tablas gigantes en un solo archivo.

---

## Arquitectura sugerida

Antes de crear esta estructura, debes pedir permiso.

```txt
src/
  app/
    page.tsx
    tienda/
      page.tsx
    producto/
      [productoId]/
        page.tsx
    carrito/
      page.tsx
    checkout/
      page.tsx
    admin/
      productos/
        page.tsx
      pedidos/
        page.tsx
    api/
      productos/
        route.ts
      productos/
        [productoId]/
          route.ts
      categorias/
        route.ts
      pedidos/
        route.ts

  componentes/
    comun/
    tienda/
    productos/
    carrito/
    checkout/
    administracion/
    layout/

  almacenes/
    carrito.store.ts
    favoritos.store.ts
    filtros-productos.store.ts

  consultas/
    productos.keys.ts
    useProductos.ts
    useProductoDetalle.ts
    useCategorias.ts
    usePedidos.ts

  servicios/
    cliente-api.ts
    productos.servicio.ts
    categorias.servicio.ts
    pedidos.servicio.ts

  tipos/
    producto.ts
    categoria.ts
    carrito.ts
    pedido.ts
    usuario.ts

  constantes/
    rutas.ts
    filtros-productos.ts

  utilidades/
    formatear-moneda.ts
    formatear-fecha.ts
    calcular-total-carrito.ts

  datos/
    productos.mock.ts
    categorias.mock.ts
```

---

## Módulos mínimos del ecommerce

### 1. Tienda
Debe incluir:

- listado de productos,
- búsqueda,
- filtros,
- ordenamiento,
- paginación o carga controlada,
- cards de producto,
- estado vacío,
- botón para agregar al carrito,
- botón para favoritos si aplica.

---

### 2. Detalle de producto
Debe incluir:

- imagen principal,
- galería si aplica,
- nombre,
- precio,
- descuento,
- descripción,
- categoría,
- selector de cantidad,
- botón agregar al carrito,
- productos relacionados si aplica.

---

### 3. Carrito
Debe incluir:

- productos agregados,
- cantidad editable,
- eliminar producto,
- subtotal,
- descuentos si aplica,
- total,
- botón ir a checkout.

El estado del carrito debe manejarse con Zustand.

---

### 4. Checkout
Debe incluir:

- datos del comprador,
- dirección,
- resumen del pedido,
- método de pago visual,
- confirmación de orden.

No integrar pasarela real sin autorización explícita.

---

### 5. Administración básica
Debe incluir:

- tabla de productos,
- tabla de pedidos,
- filtros,
- estados visuales,
- acciones separadas por componente.

Usar TanStack Table.

---

## API interna en Next.js

Crear Route Handlers para datos iniciales.

Reglas:

- No conectar base de datos real sin autorización.
- Iniciar con datos mock organizados si el usuario lo aprueba.
- Separar datos mock en `src/datos`.
- Separar lógica de respuesta en servicios o utilidades si crece.
- Mantener cada `route.ts` bajo 100 líneas.

Ejemplo de endpoints propuestos:

```txt
GET /api/productos
GET /api/productos/:productoId
GET /api/categorias
GET /api/pedidos
POST /api/pedidos
```

---

## Flujo de trabajo obligatorio

Antes de implementar, debes presentar un plan por fases.

### Fase 1 — Análisis y permisos
1. Revisar estructura actual del proyecto.
2. Proponer carpetas y archivos.
3. Explicar impacto.
4. Pedir autorización antes de cambiar.

### Fase 2 — Instalación y UI base
1. Proponer dependencias necesarias.
2. Pedir permiso para instalarlas.
3. Integrar shadcn UI y plantilla ecommerce.
4. Separar layout base.

### Fase 3 — Tipos y datos
1. Crear tipos en español.
2. Crear mocks autorizados.
3. Crear servicios.
4. Crear hooks TanStack Query.

### Fase 4 — Tienda
1. Crear página tienda.
2. Crear filtros.
3. Crear cards.
4. Crear búsqueda.
5. Crear estados vacíos.

### Fase 5 — Carrito
1. Crear store Zustand.
2. Crear componentes de carrito.
3. Crear cálculo de totales.
4. Crear persistencia local si el usuario lo aprueba.

### Fase 6 — Checkout
1. Crear formulario visual.
2. Crear resumen de compra.
3. Crear confirmación visual.
4. No integrar pagos reales sin permiso.

### Fase 7 — Administración
1. Crear tabla de productos.
2. Crear tabla de pedidos.
3. Usar TanStack Table.
4. Separar columnas, filtros, paginación y acciones.

---

## Entregable esperado por cada fase
Al finalizar cada fase, reportar:

1. Archivos creados.
2. Archivos modificados.
3. Responsabilidad de cada archivo.
4. Confirmación de que ningún archivo supera 100 líneas.
5. Qué queda pendiente.
6. Qué permisos se requieren para continuar.

---

## Restricciones finales

No hacer lo siguiente sin permiso:

- instalar dependencias,
- modificar configuración global,
- tocar autenticación,
- conectar base de datos,
- integrar pasarela de pago,
- cambiar estructura de rutas ya existente,
- eliminar archivos,
- renombrar archivos existentes,
- modificar estilos globales,
- usar datos quemados definitivos,
- crear lógica no solicitada,
- ejecutar builds o validaciones locales.

---

## Primera tarea que debes realizar
Analiza el proyecto actual y responde únicamente con:

1. estructura detectada,
2. propuesta de arquitectura modular,
3. dependencias necesarias,
4. archivos que propones crear,
5. archivos que propones modificar,
6. explicación de por qué,
7. solicitud explícita de permiso para iniciar.

No escribas código todavía.
