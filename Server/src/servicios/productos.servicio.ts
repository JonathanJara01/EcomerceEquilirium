import { ProductosRepositorio } from "../repositorios/productos.repositorio";
import { Producto } from "../tipos/producto";

// Estructura para configurar criterios de filtrado y orden en la consulta de productos.
export interface OpcionesFiltrado {
  busqueda?: string;
  categoria?: string;
  precioMin?: number;
  precioMax?: number;
  ordenarPor?: string;
}

// Servicio encargado de procesar la lógica de negocio y consultas asociadas a productos.
export class ProductosServicio {
  private repositorio = new ProductosRepositorio();

  // Obtiene el catálogo de productos aplicando los filtros y ordenaciones solicitadas.
  async obtenerProductosFiltrados(opciones: OpcionesFiltrado): Promise<Producto[]> {
    let productos = await this.repositorio.obtenerProductos();

    // Filtro por búsqueda de texto
    if (opciones.busqueda) {
      const termino = opciones.busqueda.toLowerCase();
      productos = productos.filter(
        (p) => p.nombre.toLowerCase().includes(termino) || p.descripcion.toLowerCase().includes(termino)
      );
    }

    // Filtro por categoría (slug)
    if (opciones.categoria) {
      productos = productos.filter((p) => p.categoria === opciones.categoria);
    }

    // Filtro por rango de precio final (post-descuento)
    if (opciones.precioMin !== undefined) {
      productos = productos.filter((p) => p.precioFinal >= opciones.precioMin!);
    }
    if (opciones.precioMax !== undefined) {
      productos = productos.filter((p) => p.precioFinal <= opciones.precioMax!);
    }

    // Ordenación según criterio
    if (opciones.ordenarPor) {
      if (opciones.ordenarPor === "precio_asc") {
        productos.sort((a, b) => a.precioFinal - b.precioFinal);
      } else if (opciones.ordenarPor === "precio_desc") {
        productos.sort((a, b) => b.precioFinal - a.precioFinal);
      } else if (opciones.ordenarPor === "calificacion") {
        productos.sort((a, b) => b.calificacion - a.calificacion);
      }
    }

    return productos;
  }

  // Recupera un producto individual por su clave primaria.
  async obtenerProductoPorId(productoId: string): Promise<Producto | null> {
    return this.repositorio.obtenerProductoPorId(productoId);
  }

  // Registra un nuevo producto comercial calculando su precio final y asignando valores por defecto.
  async crearProducto(datos: Omit<Producto, "precioFinal">): Promise<Producto> {
    const existe = await this.repositorio.obtenerProductoPorId(datos.id || "");
    if (existe) {
      throw new Error(`El producto con ID '${datos.id}' ya existe.`);
    }

    const descuento = datos.descuento || 0;
    const precioFinal = datos.precioBase - (datos.precioBase * descuento) / 100;

    return this.repositorio.crearProducto({
      id: datos.id || `prod-${Math.random().toString(36).substring(2, 9)}`,
      nombre: datos.nombre,
      descripcion: datos.descripcion || "",
      precioBase: datos.precioBase,
      descuento,
      precioFinal,
      stock: datos.stock ?? 0,
      imagenes: datos.imagenes || [],
      categoria: datos.categoria,
      calificacion: datos.calificacion ?? 5,
      destacado: !!datos.destacado
    });
  }

  // Modifica los datos de un producto y recalcula el precio final si corresponde.
  async actualizarProducto(
    productoId: string,
    datos: Partial<Omit<Producto, "id">>
  ): Promise<Producto | null> {
    const producto = await this.repositorio.obtenerProductoPorId(productoId);
    if (!producto) return null;

    const actualizacion: Partial<Producto> = { ...datos };
    if (datos.precioBase !== undefined || datos.descuento !== undefined) {
      const base = datos.precioBase ?? producto.precioBase;
      const desc = datos.descuento ?? producto.descuento;
      actualizacion.precioFinal = base - (base * desc) / 100;
    }
    return this.repositorio.actualizarProducto(productoId, actualizacion);
  }
}
