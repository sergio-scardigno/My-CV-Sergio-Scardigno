/**
 * Casos de estudio: el formato largo de un proyecto.
 *
 * La diferencia con `projects`: un caso tiene problema, restricciones y
 * decisiones con su alternativa descartada. Si es solo un repo con una
 * descripción y un stack, va en `projects`.
 *
 * Regla de contenido: ningún campo se rellena por simetría. Un caso con cuatro
 * campos reales vale más que uno con ocho donde dos son inventados. Si el dato
 * no existe, se omite el campo.
 */

export type CaseFamily = "oss" | "organismo" | "homelab" | "clientes";

export type CaseStatus = "En curso" | "En producción" | "Terminado";

/**
 * Los slugs son URLs públicas: una vez compartido un caso, no se cambian.
 * Sin acentos ni ñ, minúsculas y guiones.
 *
 * Nunca puede ser "imprimir": ese segmento es la ruta /casos/imprimir y en el
 * app router el segmento estático le gana al dinámico.
 */
export type CaseSlug =
  | "presidio-anonimizacion-legal"
  | "homelab-proliant-proxmox"
  | "vigilador-camaras-yolo"
  | "looker-studio-meta-ads"
  | "manual-proyecto-ia"
  | "costos-shop-estacion-servicio"
  | "mapa-escolar-angular"
  | "jenkins-ci-cd-dgcye"
  | "diera-laravel-upgrade";

export interface CaseDecision {
  choice: string;
  instead: string;
  why: string;
}

export interface CaseStudy {
  slug: CaseSlug;
  family: CaseFamily;
  title: string;
  status: CaseStatus;
  /** Opcional: si no hay fecha confiable, no se inventa. */
  period?: string;
  role: string;
  /** Las dos líneas del CV y del hub. Se escriben a mano, no se recortan del texto largo. */
  summary: { problem: string; result: string };
  problem: string;
  constraints: readonly string[];
  decisions: readonly CaseDecision[];
  /** Si el caso está "En curso", esto es dónde está hoy, no un resultado cerrado. */
  result: readonly string[];
  open?: readonly string[];
  wrong?: string;
  stack: readonly string[];
  link?: { label: string; href: string };
  /** Solo los destacados entran en el CV. Cuatro o cinco como máximo. */
  featured?: boolean;
  /** ~155 caracteres para la metadata. Si falta, se usa summary.problem. */
  metaDescription?: string;
}

export const CASE_FAMILIES: readonly {
  id: CaseFamily;
  label: string;
  blurb: string;
}[] = [
  {
    id: "oss",
    label: "Repos públicos",
    blurb: "Código abierto: se puede leer y correr.",
  },
  {
    id: "organismo",
    label: "Organismo público",
    blurb: "Sistemas en producción, sin código público.",
  },
  {
    id: "homelab",
    label: "Homelab",
    blurb: "Infraestructura propia: HP ProLiant, Proxmox, ZFS y LVM.",
  },
  {
    id: "clientes",
    label: "Clientes",
    blurb: "Trabajo a pedido, con presupuesto y plazo reales.",
  },
];

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    // Datos tomados del README del repo. Los tres puntos de "open" son
    // inferencias de ese README: confirmalos o corregilos.
    slug: "presidio-anonimizacion-legal",
    family: "oss",
    title: "Anonimización de documentos legales sin que salgan de la máquina",
    status: "En curso",
    period: "2025 - hoy",
    role: "Diseño, desarrollo y despliegue",
    featured: true,
    summary: {
      problem:
        "Un estudio jurídico necesita usar herramientas de IA sobre expedientes con nombres, DNI y domicilios reales, que no pueden salir de su red.",
      result:
        "Anonimización local con seudónimos reversibles: el documento se comparte sin datos personales y la respuesta se restaura con el mapa de equivalencias.",
    },
    problem:
      "Un estudio jurídico no puede mandar un expediente a una API de IA en la nube: adentro hay nombres, DNI, CUIT y domicilios de personas reales. Pero sí necesita usar esas herramientas para revisar, resumir o redactar.",
    constraints: [
      "Ningún dato personal puede salir de la red del estudio",
      "Buena parte de las escrituras son PDF escaneados, sin capa de texto",
      "El resultado tiene que poder volver a su estado original",
      "Tiene que correr en las máquinas que ya tiene el estudio, sin GPU",
    ],
    decisions: [
      {
        choice: "Microsoft Presidio corriendo local, con modelos de español",
        instead: "una API de anonimización en la nube",
        why: "mandar el documento a un servicio externo para anonimizarlo es exactamente el problema que se quería evitar",
      },
      {
        choice:
          "Seudónimos numerados (<PERSONA_1>, <DNI_1>) con mapa de equivalencias en disco",
        instead: "enmascarar con asteriscos o borrar el dato",
        why: "con máscaras el texto pierde sentido y no hay vuelta atrás; el mapa permite anonimizar, consultar afuera y restaurar los datos reales en la respuesta",
      },
      {
        choice: "Reconocedores propios de DNI y CUIT/CUIL",
        instead: "los reconocedores genéricos que trae Presidio",
        why: "los identificadores argentinos no están cubiertos de fábrica y aparecen escritos en formatos distintos en cada documento",
      },
      {
        choice: "OCR del sistema para los escaneos y tapado de sellos",
        instead: "procesar solo el texto embebido del PDF",
        why: "en las escrituras el nombre del escribano está en un sello que el OCR no llega a leer, así que se tapa el sello completo en vez de confiar en la detección",
      },
    ],
    result: [
      "Procesa .txt, .md, .csv, .tsv, .json, .log, .docx, .xlsx y .pdf",
      "Devuelve el texto anonimizado, el PDF original con los datos tapados y una versión en Markdown ordenada por cláusulas",
      "Ninguna parte del proceso se conecta a un servicio externo",
    ],
    open: [
      "El OCR depende del paquete de idioma es-MX de Windows: todavía no corre igual en Linux",
      "Sin GPU, falta medir y publicar cuánto tarda realmente con un expediente largo",
      "El umbral de confianza es un intercambio sin resolver: subirlo deja pasar datos, bajarlo tapa texto que hacía falta",
    ],
    stack: ["Python", "Microsoft Presidio", "spaCy", "OCR", "PDF"],
    link: {
      label: "github.com/sergio-scardigno/presidio",
      href: "https://github.com/sergio-scardigno/presidio",
    },
  },

  {
    slug: "homelab-proliant-proxmox",
    family: "homelab",
    title: "Infraestructura propia sobre un ProLiant de segunda mano",
    status: "En producción",
    period: "2026 - hoy",
    role: "Diseño, operación y mantenimiento",
    featured: true,
    summary: {
      problem:
        "Los servicios y los datos propios corrían sobre una PC de escritorio reciclada con un Phenom y 4 GB de RAM, que ya no daba abasto.",
      result:
        "Un HP ProLiant usado con 32 GB de RAM, red partida en cinco segmentos y acceso por túnel, donde corren scrapers, bases de datos y los pilotos de los clientes.",
    },
    problem:
      "Para tener los datos y los servicios propios en casa, y poder gestionarlos sin depender de terceros, hacía falta una máquina que aguantara varias cargas a la vez. Lo que había era una PC de escritorio armada a mano, con un Phenom y 4 GB de RAM.",
    constraints: [
      "No hay contrato de soporte: lo que se rompe lo arreglo yo, el día que se rompa",
      "El hardware llegó usado, con cinco años de uso previo",
      "Vive en una casa, así que el consumo eléctrico y el ruido son parte del requisito",
      "Los datos de los discos del servidor anterior tenían que migrar sin pérdida",
    ],
    decisions: [
      {
        choice: "Infraestructura propia en casa",
        instead: "un VPS o servicios administrados",
        why: "el objetivo era tener la información en local y gestionarla por mis propios medios, y aprender operándola de punta a punta",
      },
      {
        choice: "Un HP ProLiant ML310e Gen8 v2 usado, comprado a un revendedor",
        instead: "seguir con la PC de escritorio o comprar hardware nuevo",
        why: "por lo que cuesta una máquina de escritorio nueva se consigue hardware de servidor con cinco años de uso: Xeon, 32 GB de RAM y controladora SAS",
      },
      {
        choice:
          "Acceso remoto por túnel, con la red partida en cinco segmentos en un MikroTik",
        instead: "abrir puertos del router hacia los servicios",
        why: "un puerto abierto expone el servicio a internet entero; el túnel deja la superficie de ataque en un solo punto y la segmentación evita que algo comprometido vea el resto de la red",
      },
      {
        choice: "Tres copias con fechas distintas, renovadas cada mes",
        instead: "confiar en la redundancia de los discos",
        why: "un espejo cubre un disco muerto, pero no un borrado por error ni una corrupción: los dos discos pierden lo mismo al mismo tiempo",
      },
    ],
    result: [
      "HP ProLiant ML310e Gen8 v2 con Xeon E3-1270 v3 y 32 GB de RAM",
      "Dos discos SAS de 1 TB, más tres discos de 4 TB migrados del servidor anterior sin pérdida de datos",
      "Cinco redes separadas en un MikroTik, con acceso remoto por túnel y ningún puerto abierto al router",
      "Corre un scraper bursátil, un scraper de jurisprudencia de los poderes judiciales argentinos, bases de datos, un generador de rutinas de gimnasio que exporta a Garmin y los sitios piloto de clientes antes de publicarlos",
      "Tres copias de respaldo con fechas distintas, renovadas aproximadamente cada mes, además de la redundancia en disco",
      "Las restauraciones están probadas en la práctica: hubo que hacerlas varias veces en el servidor anterior, cuando se rompieron discos",
      "Consumo eléctrico y ruido compatibles con una casa",
    ],
    stack: ["HP ProLiant", "Proxmox", "ZFS", "LVM", "MikroTik", "Linux"],
  },

  // Plantilla para el próximo caso (descomentar y completar).
  // Para uno terminado: llená "result" y "wrong", y sacá "open".
  // Para uno en curso: "result" es dónde está hoy, y "open" lo que falta decidir.
  // {
  //   slug: "",
  //   family: "homelab",
  //   title: "",
  //   status: "En curso",
  //   period: "",
  //   role: "",
  //   summary: { problem: "", result: "" },
  //   problem: "Qué estaba mal antes, en términos de quien lo sufría.",
  //   constraints: ["Lo que no se podía tocar, apagar, gastar ni esperar"],
  //   decisions: [
  //     { choice: "Lo que elegiste", instead: "lo que descartaste", why: "por qué" },
  //   ],
  //   result: ["Con números: antes y después"],
  //   open: ["Lo que todavía no está resuelto"],
  //   wrong: "Qué salió mal o qué harías distinto.",
  //   stack: [""],
  // },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}

export function caseStudiesByFamily(family: CaseFamily): readonly CaseStudy[] {
  return CASE_STUDIES.filter((caseStudy) => caseStudy.family === family);
}

export function featuredCaseStudies(): readonly CaseStudy[] {
  return CASE_STUDIES.filter((caseStudy) => caseStudy.featured);
}
