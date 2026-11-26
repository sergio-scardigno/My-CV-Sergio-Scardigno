import { cn } from "@/lib/utils";

/**
 * El video de un caso: la pantalla andando, cuando hay una grabación.
 *
 * Mismo criterio que `DiagramFigure`: es decoración de pantalla, no se imprime
 * y nunca es el único portador de un dato. Lo que se ve en el video también
 * está escrito en el caso.
 *
 * Las grabaciones son verticales (1080x1920). A ancho completo, un 9:16 empuja
 * el texto media pantalla hacia abajo, así que se topa en 360 px y queda
 * arriba del contenido, no en el medio.
 *
 * `preload="metadata"` baja los primeros kilobytes y no el archivo entero, y
 * no hay `autoPlay`: un video que arranca solo con sonido en un CV es una
 * emboscada.
 */
export function VideoFigure({
  src,
  caption,
  className,
}: {
  /** Ruta en public/videos. */
  src: string;
  /** El epígrafe. Es también el nombre accesible del reproductor. */
  caption: string;
  className?: string;
}) {
  return (
    <figure
      data-decoration
      className={cn("my-2 w-full max-w-[360px] print:hidden", className)}
    >
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        aria-label={caption}
        width={1080}
        height={1920}
        className="aspect-[9/16] w-full rounded-md border border-rule bg-muted"
      />
      <figcaption className="mt-2 border-t border-rule pt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
