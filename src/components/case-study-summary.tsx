import Link from "next/link";

import { Badge } from "./ui/badge";
import { LogRow } from "./logbook";
import { caseStatusVariant } from "@/lib/status";
import { SITE_HOST } from "@/lib/site";
import type { CaseStudy } from "@/data/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export function CaseStudySummary({ caseStudy }: Props) {
  const href = `/casos/${caseStudy.slug}`;

  return (
    <LogRow
      meta={
        <>
          <Badge
            variant={caseStatusVariant(caseStudy.status)}
            className="mb-1 w-fit"
          >
            {caseStudy.status}
          </Badge>
          {caseStudy.period ? (
            <span className="tabular-nums">{caseStudy.period}</span>
          ) : null}
        </>
      }
    >
      <h4 className="text-pretty font-medium leading-snug text-foreground">
        <Link className="hover:underline" href={href}>
          {caseStudy.title}
        </Link>
      </h4>

      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        {caseStudy.summary.problem}
      </p>
      <p className="text-pretty text-sm leading-relaxed text-foreground">
        {caseStudy.summary.result}
      </p>

      {/* En papel el enlace no se puede seguir: va escrito. */}
      <div className="hidden font-mono text-[10px] text-muted-foreground print:block">
        {SITE_HOST}
        {href}
      </div>
    </LogRow>
  );
}
