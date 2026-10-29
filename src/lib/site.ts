/**
 * URL pública del sitio. Hace falta para que las imágenes de Open Graph
 * resuelvan: sin `metadataBase`, Next no puede convertir una ruta relativa en
 * absoluta y LinkedIn no muestra vista previa.
 *
 * En Vercel, VERCEL_PROJECT_PRODUCTION_URL existe en tiempo de build. Si algún
 * día hay dominio propio, se define NEXT_PUBLIC_SITE_URL y listo.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Para imprimir el link en el PDF: "cv-sergio-scardigno.vercel.app/casos/slug". */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
