import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
}

export function ProjectCard({ title, description, tags, link }: Props) {
  return (
    <Card className="flex h-full flex-col gap-5 rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm transition-shadow hover:shadow-md print:border print:bg-transparent print:shadow-none">
      <CardHeader className="space-y-2 p-0">
        <CardTitle className="text-base font-semibold text-foreground">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              {title}
              <ArrowUpRight className="h-4 w-4 translate-y-[1px] text-muted-foreground transition-transform group-hover:translate-y-0 group-hover:text-foreground" />
            </a>
          ) : (
            title
          )}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex flex-wrap gap-2 p-0 font-sans text-[11px] text-muted-foreground">
        {tags.map((tag) => (
          <Badge
            className="rounded-full border border-border px-3 py-1 uppercase tracking-[0.12em]"
            variant="outline"
            key={tag}
          >
            {tag}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
