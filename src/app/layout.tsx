import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Sin metadataBase, las imágenes de Open Graph relativas no resuelven y
  // LinkedIn no muestra vista previa al compartir un caso.
  metadataBase: new URL(SITE_URL),
  title: "Creado en Next.js por Sergio Scardigno",
  description: "CV de Sergio Scardigno",
  openGraph: {
    siteName: "Sergio Scardigno",
    locale: "es_AR",
    type: "website",
    images: ["/img/sergio-scardigno.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

/*
 * Archivo (Omnibus-Type, Buenos Aires) es variable con eje wdth 62-125, así que
 * el ancho expandido del display y el normal del cuerpo salen de una sola carga.
 * Pedir `axes` exige NO pasar `weight`: el peso viene del eje wght.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-archivo",
});

/*
 * IBM Plex Mono no tiene corte variable, solo pesos estáticos: sin `weight`
 * explícito el build falla. Se usa únicamente para valores de máquina.
 */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
