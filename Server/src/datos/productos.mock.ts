import { Producto } from "../tipos/producto";
import { PRODUCTOS_TECNOLOGIA_MOCK } from "./productos-tecnologia.mock";
import { PRODUCTOS_MODA_MOCK } from "./productos-moda.mock";

// Combina y expone el listado completo de productos del ecommerce.
export const PRODUCTOS_MOCK: Producto[] = [
  ...PRODUCTOS_TECNOLOGIA_MOCK,
  ...PRODUCTOS_MODA_MOCK
];
