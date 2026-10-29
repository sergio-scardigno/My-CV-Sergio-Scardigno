import { INCIDENTS } from "@/data/incidents";
import type { Incident } from "@/data/incidents";
import { getCaseStudy } from "@/data/case-studies";
import { IncidentCard } from "./incident-card";

interface Props {
  /** Si se omite, muestra todos. La página de un caso pasa los suyos. */
  items?: readonly Incident[];
}

export function IncidentList({ items = INCIDENTS }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((incident) => {
        const caseStudy = incident.caseSlug
          ? getCaseStudy(incident.caseSlug)
          : undefined;

        return (
          <IncidentCard
            key={incident.title}
            incident={incident}
            caseStudy={
              caseStudy
                ? { title: caseStudy.title, slug: caseStudy.slug }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
