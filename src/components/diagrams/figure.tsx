import { cn } from "@/lib/utils";

/**
 * El contenedor de un diagrama.
 *
 * `data-decoration` y `print:hidden` lo sacan de la impresión: el PDF es la
 * versión en texto. Por eso ningún diagrama es el único portador de un dato:
 * cada uno ilustra algo que también está escrito al lado.
 *
 * El `print:hidden` va en el envoltorio y no en el `<svg>`, así el hueco que
 * deja en la grilla también se cierra en el papel.
 */
export function DiagramFigure({
  children,
  caption,
  className,
}: {
  children: React.ReactNode;
  caption?: string;
  className?: string;
}) {
  return (
    <figure
      data-decoration
      className={cn(
        "my-4 rounded-md border border-rule bg-card p-4 print:hidden",
        className,
      )}
    >
      {/*
       * En un teléfono, encoger un diagrama de 640 unidades a 343px deja el
       * texto en ~5px. Mejor que se desplace a un ancho legible: en escritorio
       * el SVG ya es más ancho que el mínimo y no aparece ninguna barra.
       */}
      <div className="overflow-x-auto">
        <div className="[&>svg]:h-auto [&>svg]:w-full [&>svg]:min-w-[520px]">
          {children}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 border-t border-rule pt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
