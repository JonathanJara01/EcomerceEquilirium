import { Producto } from "../tipos/producto";

// Listado de productos de tecnología en el ecommerce.
export const PRODUCTOS_TECNOLOGIA_MOCK: Producto[] = [
  {
    id: "prod-tec-1",
    nombre: "Audífonos Inalámbricos Pro-Sound",
    descripcion: "Auriculares con cancelación activa de ruido, batería de 40 horas y sonido de alta fidelidad.",
    precioBase: 129990,
    descuento: 15,
    precioFinal: 110492,
    stock: 25,
    imagenes: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
    ],
    categoria: "tecnologia",
    calificacion: 4.8,
    destacado: true
  },
  {
    id: "prod-tec-2",
    nombre: "Teclado Mecánico RGB Aurora",
    descripcion: "Teclado compacto 75% con switches mecánicos silenciosos y retroiluminación personalizada.",
    precioBase: 89990,
    descuento: 0,
    precioFinal: 89990,
    stock: 12,
    imagenes: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop"
    ],
    categoria: "tecnologia",
    calificacion: 4.6,
    destacado: false
  },
  {
    id: "prod-tec-3",
    nombre: "Reloj Inteligente Fit-X5",
    descripcion: "Smartwatch deportivo con sensor de ritmo cardíaco, GPS integrado y resistencia al agua 5 ATM.",
    precioBase: 199990,
    descuento: 25,
    precioFinal: 149993,
    stock: 8,
    imagenes: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ],
    categoria: "tecnologia",
    calificacion: 4.7,
    destacado: true
  },
  {
    id: "prod-tec-4",
    nombre: "Parlante Bluetooth SoundWave",
    descripcion: "Altavoz portátil resistente al agua IPX7 con sonido estéreo 360 y 15 horas de batería.",
    precioBase: 49990,
    descuento: 10,
    precioFinal: 44991,
    stock: 30,
    imagenes: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop"
    ],
    categoria: "tecnologia",
    calificacion: 4.5,
    destacado: false
  }
];
