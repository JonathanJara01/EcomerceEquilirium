// Formatea un valor numérico a formato de divisa chilena (CLP).
export function formatearMoneda(valor: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0
  }).format(valor);
}
