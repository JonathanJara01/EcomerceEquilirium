// Rutas de navegación interna para la aplicación cliente.
export const RUTAS = {
  inicio: "/",
  tienda: "/tienda",
  producto: (productoId: string) => `/producto/${productoId}`,
  carrito: "/carrito",
  checkout: "/checkout",
  adminProductos: "/admin/productos",
  adminPedidos: "/admin/pedidos"
};
