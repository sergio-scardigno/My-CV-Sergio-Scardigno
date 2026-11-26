import type { ComponentType } from "react";

import { BotBaseRouting } from "./bot-base-routing";
import { FacturaPipeline } from "./factura-pipeline";
import { HomelabTopology } from "./homelab-topology";
import { PresidioPipeline } from "./presidio-pipeline";
import { ZfsThermalFork } from "./zfs-thermal-fork";

export {
  BotBaseRouting,
  FacturaPipeline,
  HomelabTopology,
  PresidioPipeline,
  ZfsThermalFork,
};

/** Las claves que un caso puede declarar en `diagram`. */
export type DiagramKey = "homelab" | "presidio" | "factura" | "bot-base";

export const DIAGRAMS: Record<
  DiagramKey,
  ComponentType<{ className?: string }>
> = {
  homelab: HomelabTopology,
  presidio: PresidioPipeline,
  factura: FacturaPipeline,
  "bot-base": BotBaseRouting,
};
