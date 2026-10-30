import { Badge } from "./ui/badge";
import { glyphFor } from "./glyphs";
import { cn } from "@/lib/utils";

interface Props {
  stack: readonly string[];
  className?: string;
}

/**
 * Los chips de stack. Un solo lugar: antes este bloque estaba copiado igual en
 * project-card, case-study-card e incident-card.
 *
 * La marca lleva `data-decoration`, así que al imprimir desaparece y queda el
 * nombre de la tecnología, que es el dato que importa en papel.
 */
export function StackChips({ stack, className }: Props) {
  if (stack.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1", className)}>
      {stack.map((tag) => {
        const Glyph = glyphFor(tag);

        return (
          <li key={tag}>
            <Badge
              variant="secondary"
              className="gap-1 px-1.5 py-0 text-[10px] font-medium"
            >
              {Glyph ? (
                <Glyph
                  aria-hidden="true"
                  data-decoration
                  className="h-2.5 w-2.5 shrink-0 opacity-70"
                />
              ) : null}
              {tag}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}
