import Image from "next/image";
import { Metadata } from "next";
import { GlobeIcon, MailIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommandMenu } from "@/components/command-menu";
import { Section } from "@/components/ui/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProjectCard } from "@/components/project-card";
import { IncidentList } from "@/components/incident-list";
import { CaseStudyGroup } from "@/components/case-study-group";
import { Fork, hypothesesToFork } from "@/components/fork";
import { StackChips } from "@/components/stack-chips";
import { DiagramFigure } from "@/components/diagrams/figure";
import { ZfsThermalFork } from "@/components/diagrams";
import {
  LogList,
  LogRow,
  SectionHeading,
  SectionLede,
} from "@/components/logbook";
import { RESUME_DATA } from "@/data/resume-data";
import { featuredCaseStudies } from "@/data/case-studies";
import { featuredIncident } from "@/data/incidents";
import { severityVariant } from "@/lib/status";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

const ROLES = RESUME_DATA.about.split("|").map((role) => role.trim());

export default function Page() {
  const specimen = featuredIncident();

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-0 md:p-16">
      <section className="mx-auto w-full max-w-3xl space-y-10 print:space-y-6">
        <header className="flex items-start justify-between gap-x-6">
          <div className="flex-1 space-y-2">
            <h1 className="type-display text-3xl text-foreground sm:text-4xl">
              {RESUME_DATA.name}
            </h1>

            {/*
             * Los tres roles separados por un filete y no por un punto medio:
             * la cadena "A · B · C" es el tic de plantilla más reconocible.
             */}
            <p className="flex flex-wrap items-center font-mono text-sm text-muted-foreground">
              {ROLES.map((role, i) => (
                <span
                  key={role}
                  className={
                    i > 0
                      ? "before:mx-2 before:inline-block before:h-3 before:w-px before:bg-rule before:align-middle"
                      : undefined
                  }
                >
                  {role}
                </span>
              ))}
            </p>

            <p className="font-mono text-xs text-muted-foreground">
              <a
                className="inline-flex items-center gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="h-3 w-3" aria-hidden="true" />
                {RESUME_DATA.location}
              </a>
            </p>

            <div className="flex items-center gap-x-1 pt-1 print:hidden">
              {RESUME_DATA.contact.email ? (
                <Button
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a
                    href={`mailto:${RESUME_DATA.contact.email}`}
                    aria-label="Enviar un correo a Sergio Scardigno"
                  >
                    <MailIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
              {RESUME_DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              ))}
              <ThemeToggle />
            </div>

            {/*
             * En papel no hay dónde hacer clic: el correo y el teléfono van
             * escritos. Este bloque es la única forma de contacto en el PDF.
             */}
            <div className="hidden flex-col font-mono text-xs text-muted-foreground print:flex">
              {RESUME_DATA.contact.email ? (
                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                  {RESUME_DATA.contact.email}
                </a>
              ) : null}
              {RESUME_DATA.contact.tel ? (
                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                  {RESUME_DATA.contact.tel}
                </a>
              ) : null}
            </div>
          </div>

          <Image
            src={RESUME_DATA.avatarUrl}
            alt="Sergio Scardigno"
            width={112}
            height={112}
            priority
            sizes="112px"
            className="h-20 w-20 shrink-0 rounded-md border border-rule object-cover sm:h-28 sm:w-28"
          />
        </header>

        {specimen ? (
          <Section
            aria-labelledby="specimen-heading"
            className="border-y border-rule py-6"
          >
            <p className="font-mono text-[11px] text-muted-foreground">
              un incidente, completo
            </p>

            <h2
              id="specimen-heading"
              className="type-display measure-tight text-2xl text-foreground sm:text-3xl"
            >
              {specimen.title}
            </h2>

            <p className="measure text-pretty leading-relaxed text-muted-foreground">
              {specimen.symptom}
            </p>

            <Fork
              {...hypothesesToFork(specimen.hypotheses)}
              takenLabel="era"
              rejectedLabel="pensé"
              animate
              className="pt-1"
            />

            <DiagramFigure caption="El SMART limpio no cerraba con un pool degradado. Esa contradicción es la pista: cuando el disco dice estar sano, conviene medir alrededor antes de reemplazarlo.">
              <ZfsThermalFork />
            </DiagramFigure>

            {/* En papel el diagrama no está, así que el desenlace va escrito. */}
            <div className="measure hidden space-y-1 print:block">
              <p className="text-sm leading-relaxed">{specimen.diagnosis}</p>
              {specimen.fix ? (
                <p className="text-sm leading-relaxed">{specimen.fix}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted-foreground">
              <Badge variant={severityVariant(specimen.severity)}>
                {specimen.severity}
              </Badge>
              <span>{specimen.system}</span>
              {specimen.date ? <span>{specimen.date}</span> : null}
              {specimen.duration ? <span>duró {specimen.duration}</span> : null}
            </div>
          </Section>
        ) : null}

        <Section>
          <SectionHeading>Sobre mí</SectionHeading>
          <div className="measure space-y-3">
            {RESUME_DATA.summary.split("\n\n").map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-pretty leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading>Experiencia laboral</SectionHeading>
          <LogList>
            {RESUME_DATA.work.map((work) => {
              const [company, mode] = work.company.split("·");

              return (
                <LogRow
                  key={work.company}
                  meta={
                    <>
                      <span className="tabular-nums text-foreground">
                        {work.start} — {work.end}
                      </span>
                      {mode ? <span>{mode.trim()}</span> : null}
                    </>
                  }
                >
                  <h3 className="text-pretty font-medium leading-snug text-foreground">
                    {work.link && work.link !== "#" ? (
                      <a
                        className="hover:underline"
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {company.trim()}
                      </a>
                    ) : (
                      company.trim()
                    )}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {work.title}
                  </p>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {work.description}
                  </p>
                </LogRow>
              );
            })}
          </LogList>
        </Section>

        <Section className="print-force-new-page scroll-mb-16">
          <SectionHeading>Casos de estudio</SectionHeading>
          <SectionLede>
            El problema, las restricciones que no se podían mover, qué decidí y
            qué descarté.
          </SectionLede>
          <CaseStudyGroup cases={featuredCaseStudies()} />
          <a
            className="font-mono text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground print:hidden"
            href="/casos"
          >
            Ver todos los casos
          </a>
        </Section>

        <Section className="print-force-new-page scroll-mb-16">
          <SectionHeading>Incidentes y postmortems</SectionHeading>
          <SectionLede>
            Problemas reales de producción: qué se vio, qué pensé que era, qué
            resultó ser y qué dejé para que no vuelva a pasar.
          </SectionLede>
          <IncidentList />
          <a
            className="font-mono text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground print:hidden"
            href="/incidentes"
          >
            Ver todos los incidentes
          </a>
        </Section>

        <Section className="print-force-new-page scroll-mb-16">
          <SectionHeading>Otros proyectos y trabajos prácticos</SectionHeading>
          <div className="grid grid-cols-1 gap-3 print:grid-cols-2 print:gap-2 sm:grid-cols-2">
            {RESUME_DATA.projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.techStack}
                link={project.link?.href}
                image={project.image}
              />
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading>Skills</SectionHeading>
          <StackChips stack={RESUME_DATA.skills} />
        </Section>

        <Section>
          <SectionHeading>Educación</SectionHeading>
          <div className="grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {RESUME_DATA.education.map((group) => (
              <Card
                key={`${group.school}-${group.category}`}
                className="flex h-full break-inside-avoid flex-col rounded-md border border-rule p-4"
              >
                <CardHeader className="p-0">
                  {group.link !== "#" ? (
                    <a
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="text-sm font-medium leading-tight hover:underline">
                        {group.school}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="text-sm font-medium leading-tight">
                      {group.school}
                    </h3>
                  )}
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {group.category} · {group.period}
                  </p>
                </CardHeader>
                <CardContent className="mt-3 flex flex-1 flex-col space-y-2 p-0 text-xs">
                  {group.courses.map((c) => (
                    <div key={`${c.degree}-${"link" in c ? c.link : ""}`}>
                      {"link" in c && c.link ? (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium leading-tight text-foreground hover:underline"
                        >
                          {c.degree}
                        </a>
                      ) : (
                        <div className="font-medium leading-tight text-foreground">
                          {c.degree}
                        </div>
                      )}
                      <div className="text-[11px] leading-snug text-muted-foreground">
                        {c.aptitudes}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading>Certificaciones</SectionHeading>
          <div className="grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {RESUME_DATA.awards.map((award) => (
              <Card
                key={award.award}
                className="flex break-inside-avoid flex-col overflow-hidden rounded-md border border-rule"
              >
                {/*
                 * Las fuentes son capturas de diploma en 4:3. Antes se las
                 * forzaba a 100x100 y salían deformadas: ahora conservan su
                 * relación de aspecto y se recortan parejo.
                 */}
                <div
                  data-decoration
                  className="relative aspect-[4/3] w-full border-b border-rule bg-muted print:hidden"
                >
                  <Image
                    src={award.url}
                    alt={`Certificado: ${award.award}`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-y-1 p-3">
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pretty text-sm font-medium leading-snug text-foreground hover:underline"
                  >
                    {award.award}
                  </a>
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {award.year}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section className="scroll-mb-16">
          <SectionHeading>Publicaciones</SectionHeading>
          <SectionLede>
            Artículos sobre problemas que me tocó resolver, publicados en
            LinkedIn.
          </SectionLede>
          <LogList>
            {RESUME_DATA.published.map((published) => (
              <LogRow
                key={published.title}
                meta={<span className="tabular-nums">{published.year}</span>}
              >
                <h3 className="text-pretty text-sm font-medium leading-snug">
                  <a
                    href={published.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    {published.title}
                  </a>
                </h3>
                {/*
                 * Nueve resúmenes completos es donde la lectura se vuelve
                 * pesada: se recortan a dos líneas y el artículo está a un clic.
                 */}
                <p className="line-clamp-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {published.pub}
                </p>
              </LogRow>
            ))}
          </LogList>
        </Section>

        {/* El QR deja de estar al lado del nombre y queda donde se usa. */}
        <aside
          data-decoration
          className="flex items-center gap-x-4 border-t border-rule pt-6 print:hidden"
        >
          <a href="https://wa.me/qr/47SVC4PAQQ2KN1">
            <Image
              src="/myqr.png"
              width={88}
              height={88}
              alt="Código QR del WhatsApp de Sergio Scardigno"
              className="rounded-md border border-rule"
            />
          </a>
          <p className="measure-tight font-mono text-xs leading-relaxed text-muted-foreground">
            Escaneá para escribirme por WhatsApp, o usá el correo de arriba.
          </p>
        </aside>
      </section>

      <CommandMenu
        links={[
          {
            url: RESUME_DATA.personalWebsiteUrl,
            title: "Personal Website",
          },
          {
            url: "/casos",
            title: "Casos de estudio",
          },
          {
            url: "/incidentes",
            title: "Incidentes y postmortems",
          },
          ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  );
}
