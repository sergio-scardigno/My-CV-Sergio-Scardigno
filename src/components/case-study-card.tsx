import { Badge } from "./ui/badge";
import { Fork } from "./fork";
import { StackChips } from "./stack-chips";
import { DiagramFigure } from "./diagrams/figure";
import { DIAGRAMS } from "./diagrams";
import { caseStatusVariant, resultLabel } from "@/lib/status";
import type { CaseStudy } from "@/data/case-studies";

interface Props {
  caseStudy: CaseStudy;
  /** 1 en la página propia del caso, 3 donde va dentro de una sección. */
  headingLevel?: 1 | 3;
}

/**
 * El rótulo de un bloque. En minúscula y alineado contra el mismo canal que
 * usa la bifurcación, para que todo el caso tenga un solo borde izquierdo.
 */
function Block({
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
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-x-2 text-sm leading-relaxed text-muted-foreground"
        >
          <span
            aria-hidden="true"
            data-decoration
            className="mt-2 h-px w-2 shrink-0 bg-rule"
          />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyCard({ caseStudy, headingLevel = 3 }: Props) {
  const Heading = headingLevel === 1 ? "h1" : "h3";
  const headingClass =
    headingLevel === 1
      ? "type-display text-2xl sm:text-3xl"
      : "type-display-sm text-lg";
  const Diagram = caseStudy.diagram ? DIAGRAMS[caseStudy.diagram] : undefined;

  return (
    <article className="flex break-inside-avoid flex-col gap-y-4 border-t border-rule py-5">
      <div className="space-y-2">
        <Heading className={`measure-tight text-pretty ${headingClass}`}>
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

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted-foreground">
          <Badge variant={caseStatusVariant(caseStudy.status)}>
            {caseStudy.status}
          </Badge>
          {caseStudy.period ? (
            <span className="tabular-nums">{caseStudy.period}</span>
          ) : null}
          <span>{caseStudy.role}</span>
        </div>
      </div>

      <div className="measure space-y-3">
        <Block label="problema">
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {caseStudy.problem}
          </p>
        </Block>

        <Block label="no se podía">
          <BulletList items={caseStudy.constraints} />
        </Block>
      </div>

      {/*
       * Las decisiones son el corazón del caso: cada una con lo que se
       * descartó y por qué. Es la misma bifurcación que las hipótesis de un
       * incidente, porque es la misma forma de pensar.
       */}
      <div className="measure space-y-4 border-l border-rule pl-4">
        {caseStudy.decisions.map((decision) => (
          <Fork
            key={decision.choice}
            taken={[decision.choice]}
            rejected={[decision.instead]}
            why={decision.why}
          />
        ))}
      </div>

      {Diagram ? (
        <DiagramFigure>
          <Diagram />
        </DiagramFigure>
      ) : null}

      <div className="measure space-y-3">
        <Block label={resultLabel(caseStudy.status).toLowerCase()}>
          <BulletList items={caseStudy.result} />
        </Block>

        {caseStudy.open?.length ? (
          <Block label="abierto">
            <BulletList items={caseStudy.open} />
          </Block>
        ) : null}

        {caseStudy.wrong ? (
          <Block label="salió mal">
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {caseStudy.wrong}
            </p>
          </Block>
        ) : null}
      </div>

      <StackChips stack={caseStudy.stack} />
    </article>
  );
}
