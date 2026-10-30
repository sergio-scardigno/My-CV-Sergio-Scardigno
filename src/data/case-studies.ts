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

import type { DiagramKey } from "@/components/diagrams";

export type CaseFamily =
  | "oss"
  | "propio"
  | "organismo"
  | "homelab"
  | "clientes";

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
  | "oficia-gestion-juridica"
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
  /**
   * El diagrama que le corresponde, si tiene uno dibujado. Es decoración de
   * pantalla: no se imprime, y nunca es el único portador de un dato.
   */
  diagram?: DiagramKey;
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
    id: "propio",
    label: "Desarrollo de soluciones propias",
    blurb: "Software que nadie pidió: se construye porque el problema existe.",
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
    diagram: "presidio",
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
    slug: "oficia-gestion-juridica",
    family: "propio",
    title: "Un sistema de gestión jurídica que se lleva los datos del anterior",
    status: "En curso",
    period: "2026 - hoy",
    role: "Diseño, desarrollo y documentación",
    featured: true,
    metaDescription:
      "Reconstrucción funcional de un sistema de gestión para estudios jurídicos, con la misma estructura de tablas para que los datos migren sin pérdidas.",
    summary: {
      problem:
        "Un estudio que lleva años sobre un sistema de gestión cerrado queda atado a él: sus expedientes, movimientos y cuentas viven en una base de la que no hay cómo sacarlos sin perder nada por el camino.",
      result:
        "Un programa escrito desde cero que reproduce la estructura de 52 tablas del sistema de origen, de modo que la migración es una copia byte por byte y no una traducción.",
    },
    problem:
      "Un estudio jurídico que trabaja hace años sobre un sistema de gestión cerrado no se puede mudar. Las personas, los procesos, las partes, los movimientos, la agenda, las pruebas y las cuentas están en una base propietaria, y cualquier alternativa lo obliga a cargar todo de nuevo a mano o a aceptar una migración que deja cosas en el camino. El problema no era escribir otro programa de gestión: era que el estudio pudiera llevarse lo suyo.",
    constraints: [
      "Los datos tienen que pasar intactos: mismos identificadores, sellos de edición, nulos y convenciones de grabado",
      "El binario del sistema de origen está empaquetado y protegido, así que extraerle la lógica de forma estática no es viable",
      "El contenido de fábrica del proveedor —modelos de escritos, sets de cálculo, diccionario— es obra ajena y no se puede copiar",
      "Tiene que correr en las máquinas que el estudio ya tiene, en red local y sin instalar nada",
      "Los usuarios ya saben operar el sistema anterior: cambiarles la forma de trabajar les cuesta el día a día",
    ],
    decisions: [
      {
        choice:
          "Reproducir las mismas 52 tablas del sistema de origen en una base Firebird propia",
        instead: "diseñar un esquema nuevo y escribir un conversor",
        why: "con el mismo esquema la migración es una copia byte por byte y los procesos del estudio siguen apuntando a las tablas de referencia; un esquema nuevo mete una traducción en el medio, y la traducción es justo donde se pierden los sellos, los nulos y las convenciones de grabado",
      },
      {
        choice:
          "Rehacer la disposición de las pantallas tal como el estudio ya las usa, con la barra de teclas F2 a F12, las solapas al pie y los punteros",
        instead: "diseñar una interfaz nueva y mejor",
        why: "el estudio trabaja con esas pantallas todos los días; una interfaz mejor en abstracto los obliga a reaprender el oficio, que es exactamente el costo que la migración tenía que evitar",
      },
      {
        choice:
          "Declarar por escrito que el método no es un clean-room estricto",
        instead:
          "presentarlo como clean-room y dejar el punto flojo sin mencionar",
        why: "la observación y la escritura estuvieron a cargo de la misma persona, así que no se puede afirmar que el original no fue visto; sostener una garantía que no se tiene es más frágil que admitir el límite y dejar el código a la vista para que cualquiera lo verifique",
      },
      {
        choice:
          "Importar sólo las filas de modelos, sets y diccionario que creó o modificó el estudio, e informar cuántas quedaron afuera",
        instead: "copiar la base de origen entera",
        why: "los datos del estudio son del estudio y se los puede llevar, pero el contenido de fábrica es obra del proveedor; el informe deja el recorte a la vista en vez de que el estudio lo descubra usándolo",
      },
      {
        choice:
          "C# con WinForms, compilado con el .NET Framework 4.8 que ya trae Windows",
        instead: "un stack actual o una aplicación web",
        why: "no hay que instalar runtime ni servidor en las máquinas del estudio: se compila con lo que el sistema operativo ya tiene y queda un ejecutable",
      },
    ],
    result: [
      "92 archivos de C# y unas 39.800 líneas, con una autoprueba de 511 comprobaciones que corre sobre una carpeta temporal y nunca toca los datos",
      "Las mismas 52 tablas en Firebird embebido, con un importador que respalda antes, compara después y no duplica si se lo corre dos veces",
      "Funciona en puesto único o con servidor y terminales: red cifrada, bloqueos compartidos entre terminales y respaldo diario",
      "Módulos de personas, procesos, movimientos, agenda, gestiones, pruebas, contables y caja, modelos y escritos, base jurídica, parámetros y supervisión",
      "Motor de escritos que entiende la sintaxis de los modelos del sistema de origen, más 78 modelos propios redactados desde cero",
      "Cálculos contables con nueve pautas: interés fijo, tasas variables, índices, aritmética, memorias y condicionales",
      "Código bajo MIT y contenido redactado bajo CC BY-SA 4.0",
    ],
    open: [
      "Las facturas no emiten CAE de la AFIP ni salen por correo: hace falta el certificado del estudio",
      "En listados faltan las solapas de rubros contables y pruebas, y el formato por modelo de listado",
      "En movimientos faltan la importación, la presentación en PDF y los archivos externos",
      "La base jurídica todavía no tiene compilación",
    ],
    wrong:
      "El método no es un clean-room estricto y no tiene sentido disimularlo: observar el sistema de origen y escribir el código lo hizo la misma persona, así que no se puede afirmar que el original no fue visto. Para una garantía estricta habría que rehacerlo con dos equipos separados y una especificación funcional cerrada. Está escrito en la documentación, en la sección del método, en vez de quedar tapado.",
    stack: ["C#", "WinForms", ".NET Framework 4.8", "Firebird", "SQL"],
  },

  {
    slug: "homelab-proliant-proxmox",
    family: "homelab",
    title: "Infraestructura propia sobre un ProLiant de segunda mano",
    status: "En producción",
    period: "2026 - hoy",
    role: "Diseño, operación y mantenimiento",
    featured: true,
    diagram: "homelab",
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
