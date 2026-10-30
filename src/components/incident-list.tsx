import { INCIDENTS } from "@/data/incidents";
import type { Incident } from "@/data/incidents";
import { getCaseStudy } from "@/data/case-studies";
import { IncidentCard } from "./incident-card";
import { LogList } from "./logbook";

interface Props {
  /** Si se omite, muestra todos. La página de un caso pasa los suyos. */
  items?: readonly Incident[];
}

export function IncidentList({ items = INCIDENTS }: Props) {
  return (
    <LogList>
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
    </LogList>
  );
}
