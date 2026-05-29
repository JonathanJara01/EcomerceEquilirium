import { NextResponse } from "next/server";
import { PedidosServicio } from "../../../servicios/pedidos.servicio";

const servicio = new PedidosServicio();

// Procesa la petición POST para registrar un nuevo pedido, descontar stock en memoria y retornar estados HTTP explícitos.
export async function POST(request: Request) {
  try {
    let cuerpo;
    try {
      cuerpo = await request.json();
    } catch {
      return NextResponse.json(
        { exito: false, mensaje: "Cuerpo de petición JSON inválido o malformado." },
        { status: 400 }
      );
    }

    const { cliente, items } = cuerpo;
    if (!cliente || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { exito: false, mensaje: "Datos del cliente o artículos del pedido faltantes o vacíos." },
        { status: 400 }
      );
    }

    try {
      const pedidoCreado = await servicio.crearPedido(cliente, items);
      return NextResponse.json({ exito: true, datos: pedidoCreado }, { status: 201 });
    } catch (error: any) {
      const mensaje = error.message || "";
      if (mensaje.includes("Stock insuficiente")) {
        return NextResponse.json({ exito: false, mensaje }, { status: 409 });
      }
      return NextResponse.json({ exito: false, mensaje }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { exito: false, mensaje: "Error interno imprevisto en el servidor." },
      { status: 500 }
    );
  }
}

// Procesa la petición GET para listar todos los pedidos registrados en memoria para administración.
export async function GET() {
  try {
    const listaPedidos = await servicio.listarPedidos();
    return NextResponse.json({ exito: true, datos: listaPedidos }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { exito: false, mensaje: "Error interno imprevisto al recuperar los pedidos." },
      { status: 500 }
    );
  }
}
