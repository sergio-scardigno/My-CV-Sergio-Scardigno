import type { ComponentType } from "react";

import { HomelabTopology } from "./homelab-topology";
import { PresidioPipeline } from "./presidio-pipeline";
import { ZfsThermalFork } from "./zfs-thermal-fork";

export { HomelabTopology, PresidioPipeline, ZfsThermalFork };

/** Las claves que un caso puede declarar en `diagram`. */
export type DiagramKey = "homelab" | "presidio";

export const DIAGRAMS: Record<
  DiagramKey,
  ComponentType<{ className?: string }>
> = {
  homelab: HomelabTopology,
  presidio: PresidioPipeline,
};
