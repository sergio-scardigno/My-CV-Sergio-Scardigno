import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

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

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
