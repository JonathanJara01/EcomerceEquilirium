// Interfaz representativa de un producto en el frontend.
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precioBase: number;
  descuento: number;
  precioFinal: number;
  stock: number;
  imagenes: string[];
  categoria: string;
  calificacion: number;
  destacado: boolean;
}
