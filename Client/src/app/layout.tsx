import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProveedorQuery from "./proveedor-query";
import { Cabecera } from "@/componentes/layout/Cabecera";
import { PieDePagina } from "@/componentes/layout/PieDePagina";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Equilibrium",
  description: "Experiencia premium de compra de artículos de tecnología y moda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <ProveedorQuery>
          <div className="flex flex-col min-h-screen">
            <Cabecera />
            <main className="flex-1 flex flex-col">{children}</main>
            <PieDePagina />
          </div>
        </ProveedorQuery>
      </body>
    </html>
  );
}


