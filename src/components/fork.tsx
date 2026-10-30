import { cn } from "@/lib/utils";

/**
 * La bifurcación: el recurso recurrente de la página.
 *
 * Los datos de Sergio tienen una sola forma repetida: *elegí esto, no aquello,
 * porque*. Aparece en `CaseDecision` (choice / instead / why) y en las
 * hipótesis de un incidente (confirmada / descartada). Es lo que distingue
 * este CV, así que se dibuja igual en los dos lugares.
 *
 * Es N:M a propósito, no 1:1. El incidente del SQL Server 2000 tiene cuatro
 * hipótesis confirmadas y tres descartadas: un componente que asuma "una
 * elegida y una descartada" se come el resto sin avisar.
 */
interface ForkProps {
  /** Lo que quedó en pie. */
  taken: readonly string[];
  /** Lo que se descartó en el camino. Puede venir vacío. */
  rejected?: readonly string[];
  /** El motivo, cuando el dato existe. En los incidentes vive en `diagnosis`. */
  why?: string;
  takenLabel?: string;
  rejectedLabel?: string;
  /** Atenúa la rama descartada al cargar. Solo para el especimen del hero. */
  animate?: boolean;
  className?: string;
}

const LABEL =
  "font-mono text-[11px] leading-5 text-muted-foreground sm:text-right";

export function Fork({
  taken,
  rejected,
  why,
  takenLabel = "elegí",
  rejectedLabel = "en vez de",
  animate = false,
  className,
}: ForkProps) {
  const hasRejected = rejected !== undefined && rejected.length > 0;

  return (
    <div className={cn("space-y-1.5", className)}>
      {hasRejected ? (
        <div className="grid gap-x-3 sm:grid-cols-[5.5rem_1fr]">
          <span className={LABEL}>{rejectedLabel}</span>
          <ul className="space-y-1">
            {rejected.map((item) => (
              <li
                key={item}
                className={cn(
                  "text-pretty text-sm leading-relaxed text-muted-foreground",
                  animate && "specimen-discarded",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-x-3 sm:grid-cols-[5.5rem_1fr]">
        <span className={cn(LABEL, "text-signal-ink")}>{takenLabel}</span>
        <ul className="relative space-y-1">
          {/*
           * El codo de la bifurcación, dibujado con bordes en vez de un "└"
           * de texto: así escala con el tipo y no depende de la fuente.
           * Solo aparece cuando hay una rama descartada de la que salir.
           */}
          {hasRejected ? (
            <span
              aria-hidden="true"
              data-decoration
              className={cn(
                "absolute -left-3 top-0 hidden h-[0.85rem] w-2 rounded-bl-[3px] border-b border-l border-rule sm:block",
                animate && "specimen-rule",
              )}
            />
          ) : null}
          {taken.map((item) => (
            <li
              key={item}
              className="text-pretty text-sm font-medium leading-relaxed text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {why ? (
        <div className="grid gap-x-3 sm:grid-cols-[5.5rem_1fr]">
          <span className={LABEL}>porque</span>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {why}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/** Parte las hipótesis por estado para alimentar la bifurcación. */
export function hypothesesToFork(
  hypotheses: readonly { text: string; status: "confirmada" | "descartada" }[],
) {
  return {
    taken: hypotheses
      .filter((h) => h.status === "confirmada")
      .map((h) => h.text),
    rejected: hypotheses
      .filter((h) => h.status === "descartada")
      .map((h) => h.text),
  };
}
