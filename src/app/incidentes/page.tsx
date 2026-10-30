import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { IncidentList } from "@/components/incident-list";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  title: `Incidentes y postmortems | ${RESUME_DATA.name}`,
  description:
    "Problemas reales de producción: síntoma, hipótesis equivocadas, diagnóstico, solución y qué quedó para que no vuelva a pasar.",
};

export default function IncidentesPage() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-0 md:p-16">
      <section className="mx-auto w-full max-w-3xl space-y-8">
        <Section>
          <Link
            href="/"
            className="inline-flex items-center gap-x-1 font-mono text-xs text-muted-foreground hover:underline print:hidden"
          >
            <ArrowLeftIcon className="h-3 w-3" />
            Volver al CV
          </Link>
          <h1 className="type-display text-3xl">Incidentes y postmortems</h1>
          <p className="measure text-pretty leading-relaxed text-muted-foreground">
            Cada entrada es un problema que pasó en producción, contado como lo
            viví: qué se vio desde afuera, qué pensé que era y me equivoqué,
            cómo llegué a la causa raíz, qué cambié y qué dejé para que no
            vuelva a pasar.
          </p>
        </Section>
        <Section>
          <IncidentList />
        </Section>
      </section>
    </main>
  );
}
