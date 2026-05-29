"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface PropiedadesProveedor {
  children: React.ReactNode;
}

// Proveedor global que inicializa el contexto de consultas para TanStack Query en la aplicación.
export default function ProveedorQuery({ children }: PropiedadesProveedor) {
  const [clienteQuery] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1
          }
        }
      })
  );

  return <QueryClientProvider client={clienteQuery}>{children}</QueryClientProvider>;
}
