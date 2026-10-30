import type { IncidentSeverity } from "@/data/incidents";
import type { CaseStatus } from "@/data/case-studies";

/**
 * Severidad y estado en ámbar, no en rojo. Nada en estos incidentes fue una
 * catástrofe: el pool se puso "degraded" y siguió andando. El ámbar es el
 * color de "degradado pero en pie", que es justo de lo que habla el contenido.
 *
 * Un relleno ámbar lleva texto --ink encima (5.30 AA). Texto --paper sobre
 * ámbar da 2.91 y no se puede usar.
 */
export function severityVariant(
  severity: IncidentSeverity,
): "signal" | "signal-outline" | "quiet" {
  if (severity === "Alta") return "signal";
  if (severity === "Media") return "signal-outline";
  return "quiet";
}

export function caseStatusVariant(
  status: CaseStatus,
): "signal-outline" | "quiet" {
  // "En curso" es lo que todavía se mueve: se marca, el resto queda quieto.
  return status === "En curso" ? "signal-outline" : "quiet";
}

/** En un caso en curso, "result" es dónde está hoy, no un resultado cerrado. */
export function resultLabel(status: CaseStatus): string {
  return status === "En curso" ? "Dónde está hoy" : "Resultado";
}
