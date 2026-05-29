import { NextResponse } from "next/server";

// Retorna el estado de salud del servidor y de la API.
export async function GET() {
  return NextResponse.json({
    estado: "operativo",
    api: "EcomerceEquilirium Mock API Backend",
    version: "1.0.0",
    fechaServidor: new Date().toISOString()
  });
}
