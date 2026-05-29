import { NextRequest, NextResponse } from "next/server";
import { PedidosServicio } from "../../../../servicios/pedidos.servicio";

const CABECERAS_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const servicio = new PedidosServicio();

// Procesa la petición PATCH para actualizar el estado del pedido y retornar los códigos HTTP correspondientes.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ pedidoId: string }> }
) {
  const { pedidoId } = await params;
  try {
    let cuerpo;
    try {
      cuerpo = await request.json();
    } catch {
      return NextResponse.json(
        { exito: false, mensaje: "Cuerpo de petición JSON inválido o malformado." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    const { estado } = cuerpo;
    if (!estado) {
      return NextResponse.json(
        { exito: false, mensaje: "El campo 'estado' es obligatorio en el cuerpo de la petición." },
        { status: 400, headers: CABECERAS_CORS }
      );
    }

    try {
      const pedidoActualizado = await servicio.actualizarEstadoPedido(pedidoId, estado);
      return NextResponse.json(
        { exito: true, datos: pedidoActualizado },
        { status: 200, headers: CABECERAS_CORS }
      );
    } catch (error: any) {
      const mensaje = error.message || "";
      if (mensaje.includes("no encontrado")) {
        return NextResponse.json({ exito: false, mensaje }, { status: 404, headers: CABECERAS_CORS });
      }
      return NextResponse.json({ exito: false, mensaje }, { status: 400, headers: CABECERAS_CORS });
    }
  } catch (error: any) {
    return NextResponse.json(
      { exito: false, mensaje: "Error interno imprevisto al actualizar el pedido." },
      { status: 500, headers: CABECERAS_CORS }
    );
  }
}

// Procesa peticiones OPTIONS de preflight para CORS.
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CABECERAS_CORS });
}
