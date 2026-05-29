import { NextRequest, NextResponse } from "next/server";
import { ProductosServicio, OpcionesFiltrado } from "../../../servicios/productos.servicio";
import { RespuestaExito } from "../../../tipos/respuesta-api";
import { Producto } from "../../../tipos/producto";

// Encabezados de CORS para permitir peticiones cruzadas desde el frontend Client/.
const CABECERAS_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

// Procesa la petición GET para listar productos aplicando criterios de búsqueda, filtrado y ordenación.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const opciones: OpcionesFiltrado = {
    busqueda: searchParams.get("busqueda") || undefined,
    categoria: searchParams.get("categoria") || undefined,
    precioMin: searchParams.get("precioMin") ? Number(searchParams.get("precioMin")) : undefined,
    precioMax: searchParams.get("precioMax") ? Number(searchParams.get("precioMax")) : undefined,
    ordenarPor: searchParams.get("ordenarPor") || undefined
  };

  const servicio = new ProductosServicio();
  const productos = await servicio.obtenerProductosFiltrados(opciones);

  const respuesta: RespuestaExito<Producto[]> = {
    exito: true,
    datos: productos
  };

  return NextResponse.json(respuesta, { headers: CABECERAS_CORS });
}

// Procesa la petición POST para registrar un nuevo producto comercial.
export async function POST(request: NextRequest) {
  try {
    const cuerpo = await request.json();
    const { nombre, descripcion, precioBase, stock, categoria, imagenes } = cuerpo;

    // Validación obligatoria de los 6 campos autorizados
    if (
      nombre === undefined ||
      descripcion === undefined ||
      precioBase === undefined ||
      stock === undefined ||
      categoria === undefined ||
      imagenes === undefined
    ) {
      return NextResponse.json(
        { exito: false, mensaje: "Campos 'nombre', 'descripcion', 'precioBase', 'stock', 'categoria' e 'imagenes' son obligatorios." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    if (typeof precioBase !== "number" || precioBase < 0) {
      return NextResponse.json(
        { exito: false, mensaje: "El precioBase debe ser un número no negativo." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    if (typeof stock !== "number" || stock < 0) {
      return NextResponse.json(
        { exito: false, mensaje: "El stock debe ser un número entero no negativo." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    if (!Array.isArray(imagenes)) {
      return NextResponse.json(
        { exito: false, mensaje: "El campo 'imagenes' debe ser un arreglo de strings." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    const servicio = new ProductosServicio();
    const nuevo = await servicio.crearProducto(cuerpo);

    return NextResponse.json({ exito: true, datos: nuevo }, { status: 201, headers: CABECERAS_CORS });
  } catch (err: any) {
    const esConflicto = err.message?.includes("ya existe");
    return NextResponse.json(
      { exito: false, mensaje: err.message || "Error al registrar el producto." },
      { status: esConflicto ? 409 : 500, headers: CABECERAS_CORS }
    );
  }
}

// Procesa peticiones OPTIONS de preflight para CORS.
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CABECERAS_CORS });
}
