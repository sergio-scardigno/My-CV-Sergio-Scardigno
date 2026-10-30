import Link from "next/link";

import { Badge } from "./ui/badge";
import { Fork, hypothesesToFork } from "./fork";
import { StackChips } from "./stack-chips";
import { LogRow } from "./logbook";
import { severityVariant } from "@/lib/status";
import type { Incident } from "@/data/incidents";

interface Props {
  incident: Incident;
  /** El caso al que pertenece, si lo tiene. */
  caseStudy?: { title: string; slug: string };
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-x-3 sm:grid-cols-[5.5rem_1fr]">
      <span className="font-mono text-[11px] leading-5 text-muted-foreground sm:text-right">
        {label}
      </span>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

export function IncidentCard({ incident, caseStudy }: Props) {
  return (
    <LogRow
      meta={
        <>
          <Badge
            variant={severityVariant(incident.severity)}
            className="mb-1 w-fit"
          >
            {incident.severity}
          </Badge>
          {incident.date ? (
            <span className="tabular-nums">{incident.date}</span>
          ) : null}
          {incident.duration ? <span>duró {incident.duration}</span> : null}
        </>
      }
    >
      <h3 className="text-pretty font-medium leading-snug text-foreground">
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

      <p className="font-mono text-xs text-muted-foreground">
        {incident.system}
      </p>

      <Field label="síntoma">{incident.symptom}</Field>

      {/*
       * Las hipótesis son la misma forma que las decisiones de un caso: lo que
       * pensé contra lo que era. Por eso se dibujan con la misma bifurcación.
       */}
      <Fork
        {...hypothesesToFork(incident.hypotheses)}
        takenLabel="era"
        rejectedLabel="pensé"
      />

      <Field label="diagnóstico">{incident.diagnosis}</Field>
      {incident.fix ? <Field label="solución">{incident.fix}</Field> : null}
      {incident.prevention ? (
        <Field label="prevención">{incident.prevention}</Field>
      ) : null}
      {incident.lesson ? (
        <Field label="aprendizaje">{incident.lesson}</Field>
      ) : null}

      <StackChips stack={incident.stack} className="pt-1" />

      {caseStudy ? (
        <Link
          href={`/casos/${caseStudy.slug}`}
          className="font-mono text-[11px] text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Parte del caso: {caseStudy.title}
        </Link>
      ) : null}
    </LogRow>
  );
}
