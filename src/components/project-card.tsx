import Image from "next/image";
import Link from "next/link";

import { Card } from "./ui/card";
import { StackChips } from "./stack-chips";
import { SITE_HOST } from "@/lib/site";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  /** Ruta al caso de estudio, si el proyecto tiene uno escrito. */
  caseHref?: string;
  /** Captura del proyecto. Sin ella la tarjeta queda igual, solo en texto. */
  image?: { src: string; alt: string; width: number; height: number };
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  caseHref,
  image,
}: Props) {
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

        {/*
         * El enlace al caso va aparte del título: el título lleva al repo, y
         * esto al formato largo. En papel, la ruta escrita.
         */}
        {caseHref ? (
          <>
            <Link
              href={caseHref}
              className="w-fit font-mono text-[10px] text-muted-foreground underline underline-offset-4 hover:text-foreground print:hidden"
            >
              El caso completo
            </Link>
            <div className="hidden font-mono text-[10px] text-muted-foreground print:block">
              {SITE_HOST}
              {caseHref}
            </div>
          </>
        ) : null}

        <StackChips stack={tags} className="mt-auto pt-1" />
      </div>
    </Card>
  );
}
