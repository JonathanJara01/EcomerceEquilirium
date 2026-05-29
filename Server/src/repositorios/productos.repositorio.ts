import { Producto } from "../tipos/producto";
import { PRODUCTOS_MOCK } from "../datos/productos.mock";

// Repositorio encargado de gestionar el acceso directo a los datos de productos.
export class ProductosRepositorio {
  // Retorna el listado completo de productos comerciales.
  async obtenerProductos(): Promise<Producto[]> {
    return PRODUCTOS_MOCK;
  }

  // Busca y retorna un único producto por su identificador.
  async obtenerProductoPorId(productoId: string): Promise<Producto | null> {
    const producto = PRODUCTOS_MOCK.find((p) => p.id === productoId);
    return producto || null;
  }

  // Registra un nuevo producto en la colección mutable.
  async crearProducto(producto: Producto): Promise<Producto> {
    PRODUCTOS_MOCK.push(producto);
    return producto;
  }

  // Actualiza los campos especificados de un producto por su clave primaria.
  async actualizarProducto(
    productoId: string,
    datos: Partial<Producto>
  ): Promise<Producto | null> {
    const indice = PRODUCTOS_MOCK.findIndex((p) => p.id === productoId);
    if (indice === -1) return null;

    PRODUCTOS_MOCK[indice] = {
      ...PRODUCTOS_MOCK[indice],
      ...datos
    };
    return PRODUCTOS_MOCK[indice];
  }
}
