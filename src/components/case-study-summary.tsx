import Link from "next/link";

import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { SITE_HOST } from "@/lib/site";
import type { CaseStudy } from "@/data/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export function CaseStudySummary({ caseStudy }: Props) {
  const href = `/casos/${caseStudy.slug}`;

  return (
    <Card className="break-inside-avoid border border-muted p-3">
      <div className="flex items-start justify-between gap-x-2">
        <h4 className="text-pretty text-sm font-semibold leading-tight">
          <Link className="hover:underline" href={href}>
            {caseStudy.title}
          </Link>
        </h4>
        <Badge
          variant={caseStudy.status === "En curso" ? "default" : "secondary"}
          className="shrink-0"
        >
          {caseStudy.status}
        </Badge>
      </div>

      <p className="mt-1 text-pretty text-xs leading-relaxed text-muted-foreground">
        {caseStudy.summary.problem}
      </p>
      <p className="mt-1 text-pretty text-xs leading-relaxed">
        {caseStudy.summary.result}
      </p>

      <div className="mt-1 hidden font-mono text-[10px] underline print:block">
        {SITE_HOST}
        {href}
      </div>
    </Card>
  );
}
