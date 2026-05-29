import { realizarPeticionGet, realizarPeticionPost, realizarPeticionPatch } from "./cliente-api";
import { Pedido } from "../tipos/pedido";
import { Producto } from "../tipos/producto";

// Recupera el listado completo de pedidos registrados en el backend para fines administrativos.
export async function listarPedidos(): Promise<Pedido[]> {
  const respuesta = await realizarPeticionGet<{ exito: boolean; datos: Pedido[] }>("/pedidos");
  return respuesta.datos;
}

// Envía una petición de tipo PATCH para actualizar el estado del despacho de una orden.
export async function actualizarEstadoPedido(
  pedidoId: string,
  estado: "pendiente" | "completado"
): Promise<Pedido> {
  const respuesta = await realizarPeticionPatch<{ exito: boolean; datos: Pedido }, { estado: string }>(
    `/pedidos/${pedidoId}`,
    { estado }
  );
  return respuesta.datos;
}

// Recupera el listado completo de productos comerciales para administración.
export async function listarProductosAdmin(): Promise<Producto[]> {
  const respuesta = await realizarPeticionGet<{ exito: boolean; datos: Producto[] }>("/productos");
  return respuesta.datos;
}

// Envía una petición de tipo POST para registrar un nuevo producto en el backend.
export async function crearProducto(datos: Omit<Producto, "precioFinal">): Promise<Producto> {
  const respuesta = await realizarPeticionPost<{ exito: boolean; datos: Producto }, Omit<Producto, "precioFinal">>(
    "/productos",
    datos
  );
  return respuesta.datos;
}

// Envía una petición de tipo PATCH para actualizar de forma parcial un producto.
export async function actualizarProducto(
  productoId: string,
  datos: Partial<Omit<Producto, "id">>
): Promise<Producto> {
  const respuesta = await realizarPeticionPatch<{ exito: boolean; datos: Producto }, Partial<Omit<Producto, "id">>>(
    `/productos/${productoId}`,
    datos
  );
  return respuesta.datos;
}
