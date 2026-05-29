// Interfaz representativa de un producto comercializado en el ecommerce.
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precioBase: number;
  descuento: number; // Porcentaje de descuento (ej: 15 para 15%)
  precioFinal: number; // Precio después de aplicar el descuento
  stock: number;
  imagenes: string[]; // Listado de URLs de imágenes
  categoria: string; // Slug de la categoría asociada
  calificacion: number; // Nota promedio del producto (de 1 a 5)
  destacado: boolean; // Indica si se muestra en portada/destacados
}
