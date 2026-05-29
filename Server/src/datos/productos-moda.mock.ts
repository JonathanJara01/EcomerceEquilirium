import { Producto } from "../tipos/producto";

// Listado de productos de moda, calzado y accesorios en el ecommerce.
export const PRODUCTOS_MODA_MOCK: Producto[] = [
  {
    id: "prod-mod-1",
    nombre: "Zapatillas Deportivas SpeedRun",
    descripcion: "Calzado ultraliviano con amortiguación reactiva para running y entrenamiento diario.",
    precioBase: 79990,
    descuento: 20,
    precioFinal: 63992,
    stock: 45,
    imagenes: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
    ],
    categoria: "calzado",
    calificacion: 4.9,
    destacado: true
  },
  {
    id: "prod-mod-2",
    nombre: "Parka Térmica Explorer",
    descripcion: "Chaqueta impermeable con aislamiento térmico ecológico para climas fríos.",
    precioBase: 119990,
    descuento: 15,
    precioFinal: 101992,
    stock: 15,
    imagenes: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
    ],
    categoria: "moda",
    calificacion: 4.7,
    destacado: true
  },
  {
    id: "prod-mod-3",
    nombre: "Mochila Urbana Premium Voyager",
    descripcion: "Mochila ergonómica resistente al agua con compartimento acolchado para laptop de 16\".",
    precioBase: 59990,
    descuento: 0,
    precioFinal: 59990,
    stock: 20,
    imagenes: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop"
    ],
    categoria: "accesorios",
    calificacion: 4.5,
    destacado: false
  },
  {
    id: "prod-mod-4",
    nombre: "Lentes de Sol Retro-Classic",
    descripcion: "Gafas de sol con montura de acetato hecha a mano y protección UV400 certificada.",
    precioBase: 34990,
    descuento: 30,
    precioFinal: 24493,
    stock: 18,
    imagenes: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop"
    ],
    categoria: "accesorios",
    calificacion: 4.4,
    destacado: false
  }
];
