import { cn } from "@/lib/utils";

/**
 * La bitácora: el modo de layout de lo narrativo y fechado (experiencia,
 * casos, incidentes, publicaciones).
 *
 * Canal angosto a la izquierda con los datos de máquina en mono, columna ancha
 * con la prosa y medida acotada. Lo enumerable (educación, certificados,
 * proyectos, skills) NO usa esto: va en grillas compactas, porque 34 renglones
 * de bitácora serían un muro.
 *
 * `break-inside-avoid` vive acá: antes lo traía la Card que estas filas
 * reemplazan, y sin él las filas se parten entre dos páginas al imprimir.
 */

export function LogList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-rule", className)} {...props} />;
}

interface LogRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Los datos duros: fechas, sistema, severidad, período. */
  meta: React.ReactNode;
}

export function LogRow({ meta, className, children, ...props }: LogRowProps) {
  return (
    <div
      className={cn(
        "grid break-inside-avoid gap-x-6 gap-y-2 border-b border-rule py-4 md:grid-cols-[7.5rem_1fr]",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-y-0.5 font-mono text-[11px] leading-5 text-muted-foreground">
        {meta}
      </div>
      <div className="measure space-y-2">{children}</div>
    </div>
  );
}

/**
 * El título de sección. Ancho expandido de Archivo, con el filete que arranca
 * la bitácora. Sin eyebrow en mayúsculas espaciadas arriba: la etiqueta de más
 * es el tell de plantilla más común y acá no agrega nada.
 */
export function SectionHeading({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("type-display-sm text-xl text-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

/** La línea de contexto que va debajo de un título, cuando hace falta. */
export function SectionLede({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "measure text-pretty text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
