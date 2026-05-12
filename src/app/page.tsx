import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon, Speech } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";
import Image from "next/image";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
<div className="flex items-center justify-between">
          <div className="flex gap-x-1 pr-6 font-mono text-sm text-muted-foreground print:hidden">
            <a href="https://wa.me/qr/47SVC4PAQQ2KN1">
              <Image
                src="/myqr.png"
                width={100}
                height={100}
                alt="Whatsapp de Sergio Scardigno"
                className="rounded-lg shadow-lg"
              />
            </a>
          </div>
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold">{RESUME_DATA.name}</h1>
            <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground">
              {RESUME_DATA.about}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="h-3 w-3" />
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
              {RESUME_DATA.contact.email ? (
                <Button
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a
                    href={`mailto:${RESUME_DATA.contact.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MailIcon className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {/* {RESUME_DATA.contact.tel ? (
                <Button
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`tel:${RESUME_DATA.contact.tel}`} target="_blank">
                    <PhoneIcon className="h-4 w-4" />
                  </a>
                </Button>
              ) : null} */}
              {RESUME_DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>

            <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
              {RESUME_DATA.contact.email ? (
                <a href={`mailto:${RESUME_DATA.contact.email}`} target="_blank" rel="noopener noreferrer">
                  <span className="underline">{RESUME_DATA.contact.email}</span>
                </a>
              ) : null}
              {RESUME_DATA.contact.tel ? (
                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                  <span className="underline">{RESUME_DATA.contact.tel}</span>
                </a>
              ) : null}
            </div>
          </div>

          <Avatar className="h-28 w-28 [&>img]:scale-x-[-1]">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold">Sobre mi</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground">
            {RESUME_DATA.summary}
          </p>
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Experiencia laboral</h2>
          {RESUME_DATA.work.map((work) => {
            return (
              <Card key={work.company}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a
                        className="hover:underline"
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {work.company}
                      </a>

                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500">
                      {work.start} - {work.end}
                    </div>
                  </div>

                  <h4 className="font-mono text-sm leading-none">
                    {work.title}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2 text-xs">
                  {work.description}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Educación</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
            {RESUME_DATA.education.map((group) => (
              <Card
                key={`${group.school}-${group.category}`}
                className="flex h-full flex-col rounded-md bg-white p-4 shadow-md"
              >
                <CardHeader className="p-0">
                  {group.link !== "#" ? (
                    <a
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="text-base font-semibold leading-tight hover:underline">
                        {group.school}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="text-base font-semibold leading-tight">
                      {group.school}
                    </h3>
                  )}
                  <p className="font-mono text-xs text-muted-foreground">
                    {group.category}
                  </p>
                  <div className="text-xs tabular-nums text-gray-500">
                    {group.period}
                  </div>
                </CardHeader>
                <CardContent className="mt-3 flex flex-1 flex-col space-y-2 p-0 text-xs">
                  {group.courses.map((c) => (
                    <div
                      key={`${c.degree}-${"link" in c ? c.link : ""}`}
                    >
                      {"link" in c && c.link ? (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium leading-tight hover:underline"
                        >
                          {c.degree}
                        </a>
                      ) : (
                        <div className="font-medium leading-tight">
                          {c.degree}
                        </div>
                      )}
                      <div className="text-[11px] text-gray-500">
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
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {RESUME_DATA.skills.map((skill) => {
              return <Badge key={skill}>{skill}</Badge>;
            })}
          </div>
        </Section>

        <Section className="print-force-new-page scroll-mb-16">
          <h2 className="text-xl font-bold">Proyectos</h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
            {RESUME_DATA.projects.map((project) => {
              return (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.techStack}
                  link={"link" in project ? project.link.href : undefined}
                />
              );
            })}
          </div>
        </Section>
        <Section>
          <h2 className="mt-3 text-xl font-bold">Certificaciones</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
            {RESUME_DATA.awards.map((awards) => {
              return (
                <Card
                  key={awards.award}
                  className="flex h-full flex-col rounded-md bg-white p-4 shadow-md"
                >
                  <CardHeader className="flex flex-1 flex-col gap-3 p-0 sm:flex-row sm:items-start">
                    <Image
                      src={awards.url}
                      width={100}
                      height={100}
                      alt={`Certificado: ${awards.award}`}
                      className="mx-auto shrink-0 rounded-lg shadow-lg sm:mx-0"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-start text-center sm:text-left">
                      <p className="text-sm">
                        <a
                          href={awards.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black-500 hover:underline"
                        >
                          {awards.award}
                        </a>
                      </p>
                      <div className="text-sm tabular-nums text-gray-500">
                        {awards.year}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </Section>
        <Section>
          <h2 className="mt-3 text-xl font-bold">Publicaciones</h2>
          <p>Contribuciones en trabajos publicados / sitios web / LinkedIn</p>
          {RESUME_DATA.published.map((published) => {
            return (
              <Card key={published.title}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <p className="mt-0 text-sm">
                      <a
                        href={published.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black-500 hover:underline"
                      >
                        <span className="font-bold">{published.title}</span>
                      </a>
                      <br />
                      {published.pub}
                    </p>
                    <div className="text-sm tabular-nums text-gray-500">
                      {published.year}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </Section>
      </section>

      <CommandMenu
        links={[
          {
            url: RESUME_DATA.personalWebsiteUrl,
            title: "Personal Website",
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
