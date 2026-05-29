import { Categoria } from "../tipos/categoria";

// Listado estático de categorías disponibles en el ecommerce.
export const CATEGORIAS_MOCK: Categoria[] = [
  {
    id: "cat-1",
    nombre: "Tecnología",
    descripcion: "Dispositivos electrónicos, accesorios inteligentes y gadgets de última generación.",
    slug: "tecnologia",
    imagen: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-2",
    nombre: "Calzado",
    descripcion: "Zapatillas, zapatos y botas deportivas y casuales de las mejores marcas.",
    slug: "calzado",
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-3",
    nombre: "Moda",
    descripcion: "Ropa moderna, abrigos, chaquetas y accesorios textiles para cada temporada.",
    slug: "moda",
    imagen: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-4",
    nombre: "Accesorios",
    descripcion: "Mochilas, relojes, gafas de sol y complementos de estilo premium.",
    slug: "accesorios",
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
  }
];
