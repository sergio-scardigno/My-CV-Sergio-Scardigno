import type { ComponentType, SVGProps } from "react";

/**
 * Marcas de tecnología, dibujadas a mano y agrupadas por lo que la cosa *es*,
 * no por su marca. Dos razones:
 *
 * 1. Clasificar ya es información: "esto es almacenamiento", "esto es una
 *    base de datos". Cincuenta y cinco logos no dicen nada que el texto del
 *    chip no diga; catorce categorías sí.
 * 2. No se copia arte de marca registrada. Son formas geométricas propias.
 *
 * Todas en 24x24, con `currentColor`, para que hereden el color del chip y
 * funcionen igual en claro y en oscuro.
 */

type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Contenedores y orquestación: una caja dentro de otra. */
const Container: Glyph = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <rect x="8" y="8" width="8" height="8" rx="1" />
  </svg>
);

/** Cloud: volumen por encima de una línea de base. */
const Cloud: Glyph = (props) => (
  <svg {...base} {...props}>
    <path d="M6 14a3 3 0 0 1 .6-5.9 4.5 4.5 0 0 1 8.6-.6A3.5 3.5 0 0 1 18 14Z" />
    <path d="M4 18h16" />
  </svg>
);

/** Almacenamiento: platos apilados. */
const Storage: Glyph = (props) => (
  <svg {...base} {...props}>
    <ellipse cx="12" cy="6" rx="8" ry="2.6" />
    <path d="M4 6v5c0 1.4 3.6 2.6 8 2.6s8-1.2 8-2.6V6" />
    <path d="M4 13c0 1.4 3.6 2.6 8 2.6s8-1.2 8-2.6" />
    <path d="M4 13v5c0 1.4 3.6 2.6 8 2.6s8-1.2 8-2.6v-5" />
  </svg>
);

/** Red: nodos unidos. */
const Network: Glyph = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="4.5" r="2.2" />
    <circle cx="5" cy="19" r="2.2" />
    <circle cx="19" cy="19" r="2.2" />
    <path d="M12 6.7V12m0 0-5.6 4.9M12 12l5.6 4.9" />
  </svg>
);

/** Base de datos: cilindro con sus cortes. */
const Database: Glyph = (props) => (
  <svg {...base} {...props}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.6" />
    <path d="M4.5 5.5v13c0 1.4 3.4 2.6 7.5 2.6s7.5-1.2 7.5-2.6v-13" />
    <path d="M4.5 12c0 1.4 3.4 2.6 7.5 2.6s7.5-1.2 7.5-2.6" />
  </svg>
);

/** Lenguaje: los signos con los que se escribe. */
const Language: Glyph = (props) => (
  <svg {...base} {...props}>
    <path d="M8.5 7.5 4 12l4.5 4.5" />
    <path d="M15.5 7.5 20 12l-4.5 4.5" />
    <path d="M13.2 5.5l-2.4 13" />
  </svg>
);

/** Frontend: el marco de una ventana. */
const Frontend: Glyph = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M6.5 6.5h.01M9.5 6.5h.01" />
  </svg>
);

/** Backend: un rack con sus bahías. */
const Backend: Glyph = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" />
    <path d="M7 7h.01M7 17h.01" />
  </svg>
);

/** Máquina: el silicio. */
const Machine: Glyph = (props) => (
  <svg {...base} {...props}>
    <rect x="6" y="6" width="12" height="12" rx="1.5" />
    <path d="M10 2.5v3.5M14 2.5v3.5M10 18v3.5M14 18v3.5M2.5 10H6M2.5 14H6M18 10h3.5M18 14h3.5" />
  </svg>
);

/** Pipeline: etapas encadenadas. */
const Pipeline: Glyph = (props) => (
  <svg {...base} {...props}>
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="19" cy="12" r="2.2" />
    <path d="M7.2 12h3.3m3 0h3.3" />
    <path d="M11.8 9.6 14.2 12l-2.4 2.4" />
  </svg>
);

/** Modelos: varias entradas que convergen en una salida. */
const Model: Glyph = (props) => (
  <svg {...base} {...props}>
    <circle cx="5" cy="5.5" r="1.8" />
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="5" cy="18.5" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
    <path d="M6.8 5.9 17.2 11.6M6.8 12h10.4M6.8 18.1 17.2 12.4" />
  </svg>
);

/** Documento: la hoja con la esquina doblada. */
const Document: Glyph = (props) => (
  <svg {...base} {...props}>
    <path d="M6 3h8l4 4v14H6Z" />
    <path d="M14 3v4h4" />
  </svg>
);

/** Diagnóstico: la lectura de un instrumento. */
const Diagnostic: Glyph = (props) => (
  <svg {...base} {...props}>
    <path d="M3 14a9 9 0 0 1 18 0" />
    <path d="M12 14l4.5-4" />
    <path d="M3 18h18" />
  </svg>
);

/** Pago: la banda de la tarjeta. */
const Payment: Glyph = (props) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
    <path d="M2.5 10h19" />
    <path d="M6 14.5h4" />
  </svg>
);

/**
 * Qué cadena cae en qué categoría. Las claves van en minúscula y la búsqueda
 * normaliza, así que "Postgresql" y "PostgreSQL" dan lo mismo. El tipo es
 * Record<string, …> y no una unión literal: las cadenas llegan como literales
 * desde resume-data y como `readonly string[]` desde los casos e incidentes.
 */
const BY_CATEGORY: readonly (readonly [Glyph, readonly string[]])[] = [
  [
    Container,
    ["docker", "kubernetes", "helm", "argocd", "minikube", "docker compose"],
  ],
  [
    Cloud,
    [
      "aws",
      "gcp",
      "azure",
      "donweb",
      "mongodb atlas",
      "whatsapp cloud api",
      "meta graph api",
    ],
  ],
  [Storage, ["zfs", "lvm"]],
  [
    Network,
    [
      "mikrotik",
      "cámara ip",
      "camara ip",
      "telegram",
      "odbc",
      "whatsapp",
      "celery",
      "redis",
    ],
  ],
  [
    Database,
    [
      "mysql",
      "postgresql",
      "mongodb",
      "sql server 2000",
      "microsoft sql server",
    ],
  ],
  [
    Language,
    ["python", "php", "javascript", "typescript", "bash", "c#", "html", "css"],
  ],
  [
    Frontend,
    [
      "react",
      "angular",
      "vue",
      "tailwind",
      "sqlite",
      "firebird",
      "mongodb atlas",
      "c# 5",
      ".net framework 4.8",
      "next.js",
      "pyside6",
      "qt",
      "winforms",
    ],
  ],
  [
    Backend,
    [
      "laravel",
      "laravel 11",
      "express",
      "node.js",
      "bagisto 2.3",
      "wordpress",
      "full stack developer",
    ],
  ],
  [
    Machine,
    ["linux", "ubuntu 22.04", "hp proliant", "proxmox", "vagrant", "sata"],
  ],
  [
    Pipeline,
    ["jenkins", "ci/cd", "ansible", "terraform", "git", "devops", "gitops"],
  ],
  [
    Model,
    [
      "yolov8",
      "spacy",
      "microsoft presidio",
      "ocr",
      "fastapi",
      "uvicorn",
      "rag",
      "llm",
      "stt",
    ],
  ],
  [Document, ["pdf", "content", "sql"]],
  [Diagnostic, ["smartctl", "dmesg", "prometheus", "grafana"]],
  [Payment, ["mercado pago"]],
];

const REGISTRY: Record<string, Glyph> = Object.fromEntries(
  BY_CATEGORY.flatMap(([glyph, keys]) => keys.map((key) => [key, glyph])),
);

/** Devuelve la marca de una tecnología, o null si no hay ninguna que aplique. */
export function glyphFor(stack: string): Glyph | null {
  return REGISTRY[stack.trim().toLowerCase()] ?? null;
}
