import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { CaseStudyCard } from "@/components/case-study-card";
import { IncidentList } from "@/components/incident-list";
import { Section } from "@/components/ui/section";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import { incidentsForCase } from "@/data/incidents";
import { RESUME_DATA } from "@/data/resume-data";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

// Un slug que no existe es un 404 estático, no una página generada en runtime.
export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const caseStudy = getCaseStudy(params.slug);
  if (!caseStudy) return {};

  const description = caseStudy.metaDescription ?? caseStudy.summary.problem;

  return {
    title: `${caseStudy.title} | ${RESUME_DATA.name}`,
    description,
    alternates: { canonical: `/casos/${caseStudy.slug}` },
    openGraph: {
      title: caseStudy.title,
      description,
      url: `/casos/${caseStudy.slug}`,
      type: "article",
    },
  };
}

export default function CasoPage({ params }: Props) {
  const caseStudy = getCaseStudy(params.slug);
  if (!caseStudy) notFound();

  const incidentes = incidentsForCase(caseStudy.slug);

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-background text-foreground print:bg-white print:text-neutral-900">
        <Section>
          <Link
            href="/casos"
            className="inline-flex items-center gap-x-1 font-mono text-xs text-muted-foreground hover:underline print:hidden"
          >
            <ArrowLeftIcon className="h-3 w-3" />
            Todos los casos
          </Link>
          <CaseStudyCard caseStudy={caseStudy} headingLevel={1} />
        </Section>

        {incidentes.length > 0 ? (
          <Section>
            <h2 className="text-xl font-bold">Incidentes de este sistema</h2>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              Lo que se rompió, contado como pasó.
            </p>
            <IncidentList items={incidentes} />
          </Section>
        ) : null}
      </section>
    </main>
  );
}
