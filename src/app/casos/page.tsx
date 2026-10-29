import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { CaseStudyGroup } from "@/components/case-study-group";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  title: `Casos de estudio | ${RESUME_DATA.name}`,
  description:
    "El formato largo de cada proyecto: el problema, las restricciones que no se podían mover, qué decidí y qué descarté.",
  alternates: { canonical: "/casos" },
  openGraph: {
    title: `Casos de estudio | ${RESUME_DATA.name}`,
    description:
      "El problema, las restricciones, qué decidí y qué descarté en cada proyecto.",
    url: "/casos",
    type: "website",
  },
};

export default function CasosPage() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-background text-foreground print:bg-white print:text-neutral-900">
        <Section>
          <Link
            href="/"
            className="inline-flex items-center gap-x-1 font-mono text-xs text-muted-foreground hover:underline print:hidden"
          >
            <ArrowLeftIcon className="h-3 w-3" />
            Volver al CV
          </Link>
          <h1 className="text-2xl font-bold">Casos de estudio</h1>
          <p className="text-pretty font-mono text-sm text-muted-foreground">
            Cada caso cuenta el problema, las restricciones que no se podían
            mover, qué decidí y qué descarté. Los que están en curso muestran
            dónde están hoy y qué sigue abierto, en vez de un final prolijo.
          </p>
        </Section>
        <Section>
          <CaseStudyGroup showBlurb />
          <div className="flex gap-x-4 print:hidden">
            <Link
              href="/incidentes"
              className="font-mono text-xs text-muted-foreground hover:underline"
            >
              Ver los incidentes →
            </Link>
            <Link
              href="/casos/imprimir"
              className="font-mono text-xs text-muted-foreground hover:underline"
            >
              Versión para imprimir →
            </Link>
          </div>
        </Section>
      </section>
    </main>
  );
}
