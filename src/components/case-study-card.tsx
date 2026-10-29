import { Card, CardHeader, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { CaseStudy } from "@/data/case-studies";

interface Props {
  caseStudy: CaseStudy;
  /** 1 en la página propia del caso, 3 donde va dentro de una sección. */
  headingLevel?: 1 | 3;
}

function Label({ children }: { children: string }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-x-2 text-xs leading-relaxed"
        >
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyCard({ caseStudy, headingLevel = 3 }: Props) {
  const enCurso = caseStudy.status === "En curso";
  const Heading = headingLevel === 1 ? "h1" : "h3";
  const headingSize = headingLevel === 1 ? "text-xl" : "text-base";

  return (
    <Card className="flex break-inside-avoid flex-col border border-muted p-4">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between gap-x-2">
          <Heading
            className={`text-pretty font-semibold leading-tight ${headingSize}`}
          >
            {caseStudy.link ? (
              <a
                className="hover:underline"
                href={caseStudy.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {caseStudy.title}
              </a>
            ) : (
              caseStudy.title
            )}
          </Heading>
          <Badge
            variant={enCurso ? "default" : "secondary"}
            className="shrink-0"
          >
            {caseStudy.status}
          </Badge>
        </div>
        <div className="font-mono text-[11px] tabular-nums text-muted-foreground">
          {caseStudy.period ? `${caseStudy.period} · ` : null}
          {caseStudy.role}
        </div>
      </CardHeader>

      <CardContent className="mt-3 space-y-3 p-0">
        <div className="space-y-0.5">
          <Label>Problema</Label>
          <p className="text-pretty text-xs leading-relaxed">
            {caseStudy.problem}
          </p>
        </div>

        <div className="space-y-1">
          <Label>Restricciones</Label>
          <BulletList items={caseStudy.constraints} />
        </div>

        <div className="space-y-1">
          <Label>Decisiones</Label>
          <div className="space-y-2">
            {caseStudy.decisions.map((decision) => (
              <div key={decision.choice} className="text-xs leading-relaxed">
                <span className="text-pretty font-medium">
                  {decision.choice}
                </span>
                <span className="text-pretty text-muted-foreground">
                  {" "}
                  en vez de {decision.instead}
                </span>
                <div className="text-pretty text-muted-foreground">
                  Porque {decision.why}.
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label>{enCurso ? "Dónde está hoy" : "Resultado"}</Label>
          <BulletList items={caseStudy.result} />
        </div>

        {caseStudy.open?.length ? (
          <div className="space-y-1">
            <Label>Abierto</Label>
            <BulletList items={caseStudy.open} />
          </div>
        ) : null}

        {caseStudy.wrong ? (
          <div className="space-y-0.5">
            <Label>Qué salió mal</Label>
            <p className="text-pretty text-xs leading-relaxed">
              {caseStudy.wrong}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-1 pt-1">
          {caseStudy.stack.map((tag) => (
            <Badge
              className="px-1 py-0 text-[10px]"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
