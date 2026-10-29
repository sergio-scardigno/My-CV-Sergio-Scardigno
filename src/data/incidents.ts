import type { CaseSlug } from "./case-studies";

/**
 * Incidentes y postmortems: problemas reales de producción, con la hipótesis
 * equivocada incluida. Es lo que no se puede generar sin haber estado ahí.
 *
 * El campo con más valor es `hypotheses`: la tentación es escribir solo la
 * correcta, pero la equivocada es la que prueba que estuviste ahí.
 */

export type IncidentSeverity = "Alta" | "Media" | "Baja";

export type HypothesisStatus = "confirmada" | "descartada";

export interface Hypothesis {
  text: string;
  status: HypothesisStatus;
}

export interface Incident {
  title: string;
  /** Formato AAAA-MM, o AAAA-MM-DD si se sabe el día. Opcional: no se inventa. */
  date?: string;
  duration?: string;
  severity: IncidentSeverity;
  system: string;
  stack: readonly string[];
  /** Qué se vio desde afuera, sin explicar la causa todavía. */
  symptom: string;
  hypotheses: readonly Hypothesis[];
  diagnosis: string;
  /** Opcional: si no recordás cómo se resolvió, se omite antes que inventarlo. */
  fix?: string;
  prevention?: string;
  lesson?: string;
  link?: string;
  /** El caso al que pertenece. Lo valida el compilador. */
  caseSlug?: CaseSlug;
}

export const INCIDENTS: readonly Incident[] = [
  {
    title: "El pool se puso degraded y el SMART estaba impecable",
    date: "2026-10-25",
    duration: "un par de horas",
    severity: "Alta",
    system: "Homelab · HP ProLiant · pool ZFS",
    caseSlug: "homelab-proliant-proxmox",
    stack: ["ZFS", "Proxmox", "Linux", "smartctl", "HP ProLiant"],
    symptom:
      "Errores en dmesg y el pool de ZFS marcado como degraded. El SMART de los discos, en cambio, daba todo en orden.",
    hypotheses: [
      {
        text: "Un disco a punto de fallar, que es lo que suele significar un pool degradado",
        status: "descartada",
      },
      {
        text: "Temperatura alta por ventilación insuficiente",
        status: "confirmada",
      },
    ],
    diagnosis:
      "El SMART limpio no cerraba con un pool degradado: si el disco se estuviera muriendo, algo tendría que haber aparecido ahí. Toqué los discos y estaban calientes, y smartctl confirmó una temperatura cercana a los 60 °C, por encima del rango de operación recomendado para un disco mecánico. El problema no estaba adentro del disco, estaba alrededor.",
    fix: "Reubiqué el disco cerca de un cooler, de modo que recibiera aire más fresco y tuviera una ventilación más apropiada.",
    prevention: "Quedó un control diario de temperatura de los discos.",
    lesson:
      "Un pool degradado no siempre significa un disco muerto. Cuando el SMART está limpio, esa contradicción es la pista: conviene buscar afuera del disco antes de reemplazarlo. Cambiarlo habría gastado un disco y dejado el problema intacto, porque el nuevo se habría calentado igual.",
  },
  {
    // Recortado a lo que consta en el artículo publicado. Faltan la fecha, la
    // duración, las hipótesis que se descartaron en el camino, cómo se resolvió
    // y qué quedó después: esos campos vuelven cuando Sergio los confirme.
    title:
      "Ubuntu 22.04 no podía conectarse a un SQL Server 2000 en producción",
    date: "2023",
    severity: "Alta",
    system: "Integración de datos · Ubuntu 22.04 ↔ SQL Server 2000",
    stack: ["Ubuntu 22.04", "SQL Server 2000", "ODBC"],
    symptom:
      "Un servidor con Ubuntu 22.04 tenía que leer datos de una base SQL Server 2000 que sigue en producción y no se puede migrar. La conexión no se podía establecer.",
    hypotheses: [
      {
        text: "No existe un conector ODBC soportado para esa combinación de versiones",
        status: "confirmada",
      },
    ],
    diagnosis:
      "Microsoft discontinuó los conectores ODBC compatibles con SQL Server 2000, y los paquetes que sí funcionaban quedaron en repositorios de Ubuntu 16.04, ya fuera de soporte. El problema no era de configuración: era de ciclo de vida de software, y por eso ninguna receta estándar servía.",
    lesson:
      "Antes de seguir probando configuraciones, verificar que la combinación de versiones esté soportada. A veces el callejón sin salida no es un error propio: es software que quedó afuera del soporte por los dos lados a la vez.",
    link: "https://www.linkedin.com/pulse/conectando-ubuntu-2204-sql-server-2000-superando-sergio-scardigno/",
  },
  // Dos incidentes tuyos que valen una entrada cada uno. Dejé los datos que
  // ya se saben y las preguntas que solo podés contestar vos.
  // {
  //   title: "Murió un disco del espejo ZFS en el ProLiant",
  //   date: "AAAA-MM",
  //   duration: "",
  //   severity: "Alta",
  //   system: "Homelab · HP ProLiant · pool ZFS en espejo",
  //   caseSlug: "homelab-proliant-proxmox",
  //   stack: ["ZFS", "Proxmox", "HP ProLiant", "iLO"],
  //   symptom: "¿Cómo te enteraste: alerta, lentitud, un servicio caído?",
  //   hypotheses: [
  //     { text: "¿Qué pensaste primero?", status: "descartada" },
  //     { text: "Disco del espejo degradado", status: "confirmada" },
  //   ],
  //   diagnosis: "¿Qué comando te lo confirmó y qué decía la salida?",
  //   fix: "¿Resilver con disco nuevo? ¿Cuánto tardó? ¿Hubo downtime?",
  //   prevention: "¿Quedó alerta de zpool status? ¿Disco de repuesto a mano?",
  //   lesson: "El espejo te salvó, pero sin alerta no te enterabas a tiempo.",
  // },
  // {
  //   title: "Errores de NCQ en los discos del ProLiant",
  //   date: "AAAA-MM",
  //   duration: "",
  //   severity: "Media",
  //   system: "Homelab · HP ProLiant",
  //   caseSlug: "homelab-proliant-proxmox",
  //   stack: ["Linux", "SATA", "dmesg", "smartctl"],
  //   symptom: "¿Qué veías: dmesg con resets, I/O lento, timeouts?",
  //   hypotheses: [
  //     { text: "Disco a punto de fallar", status: "descartada" },
  //     { text: "¿Fue controladora, cable, firmware o NCQ en sí?", status: "confirmada" },
  //   ],
  //   diagnosis: "¿Cómo separaste disco malo de incompatibilidad de controladora?",
  //   fix: "¿Desactivaste NCQ por parámetro de kernel? ¿Cambiaste cable o firmware?",
  //   prevention: "¿Quedó documentado para el próximo disco que pongas?",
  //   lesson: "",
  // },
  // Plantilla para la próxima entrada (descomentar y completar):
  // {
  //   title: "",
  //   date: "AAAA-MM",
  //   duration: "",
  //   severity: "Alta",
  //   system: "",
  //   stack: [""],
  //   symptom: "Qué se vio desde afuera, sin explicar la causa todavía.",
  //   hypotheses: [
  //     { text: "Lo primero que pensaste", status: "descartada" },
  //     { text: "Lo que era en realidad", status: "confirmada" },
  //   ],
  //   diagnosis: "Cómo llegaste a la causa raíz y con qué lo comprobaste.",
  //   fix: "Qué cambiaste para que vuelva a funcionar.",
  //   prevention: "Qué dejaste para que no vuelva a pasar.",
  //   lesson: "Qué te llevaste.",
  // },
];

export function incidentsForCase(slug: CaseSlug): readonly Incident[] {
  return INCIDENTS.filter((incident) => incident.caseSlug === slug);
}
