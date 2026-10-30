import Image from "next/image";

import { Card } from "./ui/card";
import { StackChips } from "./stack-chips";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  /** Captura del proyecto. Sin ella la tarjeta queda igual, solo en texto. */
  image?: { src: string; alt: string; width: number; height: number };
}

export function ProjectCard({ title, description, tags, link, image }: Props) {
  return (
    <Card className="flex break-inside-avoid flex-col overflow-hidden rounded-md border border-rule">
      {image ? (
        <div
          data-decoration
          className="relative aspect-[16/9] w-full border-b border-rule bg-muted print:hidden"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 640px) 45vw, 90vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-y-2 p-3">
        <h3 className="text-pretty text-sm font-medium leading-snug text-foreground">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>

        {/* En papel el enlace no se puede seguir: va escrito. */}
        {link ? (
          <div className="hidden font-mono text-[10px] text-muted-foreground print:block">
            {link.replace("https://", "").replace("www.", "")}
          </div>
        ) : null}

        <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        <StackChips stack={tags} className="mt-auto pt-1" />
      </div>
    </Card>
  );
}
