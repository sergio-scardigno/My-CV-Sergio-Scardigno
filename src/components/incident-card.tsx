import Link from "next/link";

import { Card, CardHeader, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { Incident, IncidentSeverity } from "@/data/incidents";

interface Props {
  incident: Incident;
  /** El caso al que pertenece, si lo tiene. */
  caseStudy?: { title: string; slug: string };
}

function severityVariant(severity: IncidentSeverity) {
  if (severity === "Alta") return "destructive" as const;
  if (severity === "Media") return "default" as const;
  return "secondary" as const;
}

function Field({ label, children }: { label: string; children: string }) {
  return (
    <div className="space-y-0.5">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <p className="text-pretty text-xs leading-relaxed">{children}</p>
    </div>
  );
}

export function IncidentCard({ incident, caseStudy }: Props) {
  return (
    <Card className="flex break-inside-avoid flex-col border border-muted p-4">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between gap-x-2">
          <h3 className="text-pretty text-base font-semibold leading-tight">
            {incident.link ? (
              <a
                className="hover:underline"
                href={incident.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {incident.title}
              </a>
            ) : (
              incident.title
            )}
          </h3>
          <Badge
            variant={severityVariant(incident.severity)}
            className="shrink-0"
          >
            {incident.severity}
          </Badge>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {incident.system}
        </p>
        {incident.date || incident.duration ? (
          <div className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {incident.date}
            {incident.date && incident.duration ? " · " : null}
            {incident.duration ? `duró ${incident.duration}` : null}
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="mt-3 space-y-3 p-0">
        <Field label="Síntoma">{incident.symptom}</Field>

        <div className="space-y-0.5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Hipótesis
          </div>
          <ul className="space-y-1">
            {incident.hypotheses.map((hypothesis) => {
              const confirmada = hypothesis.status === "confirmada";

              return (
                <li
                  key={hypothesis.text}
                  className="flex items-start gap-x-2 text-xs leading-relaxed"
                >
                  <span
                    className={
                      confirmada
                        ? "font-mono text-[11px] text-green-600 dark:text-green-500"
                        : "font-mono text-[11px] text-muted-foreground"
                    }
                  >
                    {confirmada ? "✓" : "✗"}
                  </span>
                  <span
                    className={
                      confirmada
                        ? "text-pretty font-medium"
                        : "text-pretty text-muted-foreground"
                    }
                  >
                    {hypothesis.text}{" "}
                    <span className="font-mono text-[10px] uppercase">
                      ({hypothesis.status})
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <Field label="Diagnóstico">{incident.diagnosis}</Field>
        {incident.fix ? <Field label="Solución">{incident.fix}</Field> : null}
        {incident.prevention ? (
          <Field label="Prevención">{incident.prevention}</Field>
        ) : null}
        {incident.lesson ? (
          <Field label="Aprendizaje">{incident.lesson}</Field>
        ) : null}

        <div className="flex flex-wrap gap-1 pt-1">
          {incident.stack.map((tag) => (
            <Badge
              className="px-1 py-0 text-[10px]"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {caseStudy ? (
          <Link
            href={`/casos/${caseStudy.slug}`}
            className="inline-block font-mono text-[11px] text-muted-foreground hover:underline"
          >
            Parte del caso: {caseStudy.title} →
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
