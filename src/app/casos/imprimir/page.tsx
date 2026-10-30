import { Metadata } from "next";

import { CaseStudyCard } from "@/components/case-study-card";
import { Section } from "@/components/ui/section";
import { CASE_FAMILIES, caseStudiesByFamily } from "@/data/case-studies";
import { RESUME_DATA } from "@/data/resume-data";

export const metadata: Metadata = {
  title: `Dossier de casos | ${RESUME_DATA.name}`,
  // No se indexa: duplicaría el contenido de /casos/[slug].
  robots: { index: false, follow: false },
};

export default function ImprimirPage() {
  const familias = CASE_FAMILIES.map((family) => ({
    family,
    items: caseStudiesByFamily(family.id),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="container relative mx-auto overflow-auto p-4 print:p-0 md:p-16">
      <section className="mx-auto w-full max-w-3xl space-y-8">
        <Section>
          <h1 className="type-display text-3xl">
            {RESUME_DATA.name} · Dossier de casos
          </h1>
          <p className="measure text-pretty leading-relaxed text-muted-foreground">
            Todos los casos completos en una sola página, para imprimir o
            guardar como PDF.
          </p>
        </Section>

        {familias.map(({ family, items }, index) => (
          <Section
            key={family.id}
            className={index > 0 ? "print-force-new-page" : undefined}
          >
            <h2 className="type-display-sm text-xl">{family.label}</h2>
            <div className="flex flex-col gap-3">
              {items.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </Section>
        ))}
      </section>
    </main>
  );
}
