import { NextRequest, NextResponse } from "next/server";
import { ProductosServicio } from "../../../../servicios/productos.servicio";
import { RespuestaExito, RespuestaError } from "../../../../tipos/respuesta-api";
import { Producto } from "../../../../tipos/producto";

// Encabezados de CORS para permitir peticiones cruzadas desde el frontend Client/.
const CABECERAS_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

// Procesa la petición GET para buscar y retornar el detalle de un producto específico por su ID.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productoId: string }> }
) {
  const { productoId } = await params;
  const servicio = new ProductosServicio();
  const producto = await servicio.obtenerProductoPorId(productoId);

  if (!producto) {
    const error: RespuestaError = {
      exito: false,
      mensaje: `No se encontró ningún producto con el identificador '${productoId}'`,
      codigoError: "PRODUCTO_NO_ENCONTRADO"
    };
    return NextResponse.json(error, { status: 404, headers: CABECERAS_CORS });
  }

  const exito: RespuestaExito<Producto> = {
    exito: true,
    datos: producto
  };

  return NextResponse.json(exito, { headers: CABECERAS_CORS });
}

// Procesa la petición PATCH para actualizar de forma parcial los datos de un producto.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productoId: string }> }
) {
  try {
    const { productoId } = await params;
    const cuerpo = await request.json();

    if (!cuerpo || Object.keys(cuerpo).length === 0) {
      return NextResponse.json(
        { exito: false, mensaje: "Debe enviar al menos un campo para actualizar." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    // Estrategia de Rechazo: Validar que no se envíen campos no permitidos
    const camposPermitidos = ["nombre", "descripcion", "precioBase", "descuento", "stock", "destacado"];
    const camposEnviados = Object.keys(cuerpo);
    const campoNoPermitido = camposEnviados.find((c) => !camposPermitidos.includes(c));

    if (campoNoPermitido) {
      return NextResponse.json(
        {
          exito: false,
          mensaje: `El campo '${campoNoPermitido}' no está permitido para actualización. Solo se permite: ${camposPermitidos.join(", ")}`
        },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    if (cuerpo.precioBase !== undefined && (typeof cuerpo.precioBase !== "number" || cuerpo.precioBase < 0)) {
      return NextResponse.json(
        { exito: false, mensaje: "El precioBase debe ser un número no negativo." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    if (cuerpo.stock !== undefined && (typeof cuerpo.stock !== "number" || cuerpo.stock < 0)) {
      return NextResponse.json(
        { exito: false, mensaje: "El stock debe ser un número entero no negativo." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    const servicio = new ProductosServicio();
    const productoActualizado = await servicio.actualizarProducto(productoId, cuerpo);

    if (!productoActualizado) {
      return NextResponse.json(
        { exito: false, mensaje: `No se encontró ningún producto con el identificador '${productoId}'` },
        { status: 404, headers: CABECERAS_CORS }
      );
    }

    return NextResponse.json(
      { exito: true, datos: productoActualizado },
      { headers: CABECERAS_CORS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { exito: false, mensaje: err.message || "Error al actualizar el producto." },
      { status: 500, headers: CABECERAS_CORS }
    );
  }
}

// Procesa peticiones OPTIONS de preflight para CORS.
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CABECERAS_CORS });
}
