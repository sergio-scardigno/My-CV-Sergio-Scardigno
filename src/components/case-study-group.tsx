import { CASE_FAMILIES, caseStudiesByFamily } from "@/data/case-studies";
import type { CaseStudy } from "@/data/case-studies";
import { CaseStudySummary } from "./case-study-summary";
import { LogList } from "./logbook";

interface Props {
  /** Si se omite, agrupa todos los casos. */
  cases?: readonly CaseStudy[];
  /** Mostrar la frase que describe cada familia. Solo en el hub. */
  showBlurb?: boolean;
}

export function CaseStudyGroup({ cases, showBlurb = false }: Props) {
  const familias = CASE_FAMILIES.map((family) => ({
    family,
    items: cases
      ? cases.filter((caseStudy) => caseStudy.family === family.id)
      : caseStudiesByFamily(family.id),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-4">
      {familias.map(({ family, items }) => (
        <div key={family.id} className="flex flex-col gap-2">
          <div>
            <h3 className="font-mono text-xs text-muted-foreground">
              {family.label}
            </h3>
            {showBlurb ? (
              <p className="text-xs text-muted-foreground">{family.blurb}</p>
            ) : null}
          </div>
          <LogList>
            {items.map((caseStudy) => (
              <CaseStudySummary key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </LogList>
        </div>
      ))}
    </div>
  );
}
