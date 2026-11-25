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
  | "factura-api-arca"
  | "bot-base-whatsapp"
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
  /**
   * La grabación de la pantalla, si existe. Mismo criterio que el diagrama: es
   * decoración de pantalla, no se imprime y nada de lo que muestra falta en el
   * texto. El archivo vive en public/videos.
   */
  video?: { src: string; caption: string };
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
    // TODO: el `link` queda afuera hasta que el repo sea público.
    // TODO: el epígrafe del video es genérico a propósito: cambialo por lo que
    // la grabación muestra de verdad.
    slug: "factura-api-arca",
    family: "propio",
    title: "Facturación electrónica con ARCA sin entrar al facturador",
    status: "En curso",
    period: "nov. 2026 - hoy",
    role: "Diseño, desarrollo y despliegue",
    diagram: "factura",
    video: {
      src: "/videos/factura-api.mp4",
      caption: "Factura API, grabada en pantalla.",
    },
    metaDescription:
      "API de facturación electrónica contra ARCA: numera con un turno exclusivo, pide el CAE y genera el PDF con QR a demanda, sin perder ni duplicar una factura.",
    summary: {
      problem:
        "Todos los meses hay que emitir las mismas facturas de servicios entrando a mano al facturador de ARCA: es repetitivo, es propenso a errores y no se integra con ningún otro sistema.",
      result:
        "Una API que numera, emite y pide el CAE sin perder una factura que ARCA ya aprobó ni duplicar otra por un reintento, y que genera el PDF con QR a demanda.",
    },
    problem:
      "Emitir todos los meses las mismas facturas de servicios implica entrar a mano al facturador de ARCA y repetir la misma carga. Es trabajo repetitivo, es donde aparecen los errores de tipeo, y el resultado no queda en ningún lado del que otro sistema pueda leerlo.",
    constraints: [
      "No se podía emitir dos veces la misma factura: ni por un reintento, ni por un corte de red, ni por dos pedidos simultáneos",
      "No se podía perder una factura que ARCA aprobó, aunque la API se caiga justo en ese momento",
      "Las claves y los certificados no podían quedar en texto plano",
      "No podía haber un servicio pago de terceros entre la API y ARCA",
    ],
    decisions: [
      {
        choice:
          "Tomar un turno de numeración con pg_advisory_lock en una conexión dedicada, con su propio pool, y guardar la factura como pendiente, con commit, antes de llamar a ARCA",
        instead: "pedir el número y emitir dentro de una sola transacción",
        why: "si la API se cae después de que ARCA aprueba, la factura ya está grabada y se la puede reconciliar; dentro de una sola transacción, ese mismo corte la hace desaparecer de este lado y existir del otro. La prueba de carga con k6 destapó un bloqueo circular cuando las dos conexiones compartían pool, y por eso el turno tiene uno exclusivo",
      },
      {
        choice:
          "Reconciliar: consultar en ARCA con FECompConsultar si ese número ya existe y, si coincide, tomar su CAE",
        instead: "reintentar a ciegas cuando ARCA no responde",
        why: "un timeout no dice si ARCA recibió el pedido o no, y reintentar sobre esa duda es exactamente cómo se emite una factura duplicada; preguntar primero convierte la duda en un dato",
      },
      {
        choice: "Un header Idempotency-Key en la emisión",
        instead: "confiar en que el cliente no repita el pedido",
        why: "el mismo pedido con la misma clave devuelve la factura que ya se emitió en vez de una nueva, así que reintentar desde afuera es seguro",
      },
      {
        choice:
          "Generar los PDF a demanda con Jinja2 y WeasyPrint, con el QR de la RG 4892",
        instead: "guardar los PDF emitidos",
        why: "el único estado es PostgreSQL, así que migrar a un VPS es mover la base y nada más: no hay una carpeta de archivos que respaldar aparte. El render pasó a un pool de procesos porque frenaba al servidor web, y eso también lo mostró la prueba de carga",
      },
      {
        choice:
          "Facturas programadas que generan un borrador mensual, avisan por mail y se emiten con un clic después de revisar el importe",
        instead: "facturación recurrente que emite sola",
        why: "nada sale hacia ARCA sin que lo vea una persona: una factura emitida no se da de baja, se corrige con una nota de crédito, y ese es un trámite que no se arregla cambiando una línea de código",
      },
    ],
    result: [
      "Facturas A, B y C, y notas de crédito y débito, con cálculo de IVA por alícuota usando Decimal",
      "Probada de punta a punta contra la homologación de ARCA, con CAE reales en ese entorno",
      "Consulta al padrón de ARCA por CUIT para completar los datos del cliente",
      "Envío por mail, facturas programadas y borradores para revisar antes de emitir",
      "Front propio en Vite, sin framework, para el uso mensual",
      "Más de 1000 tests automáticos; 20 emisiones en paralelo dan números correlativos sin duplicados; 39 de 41 tareas del plan completas",
    ],
    open: [
      "Falta el despliegue en un VPS, con Caddy para TLS y respaldos: hasta entonces, las facturas programadas solo se preparan con la PC prendida",
      "La condición de IVA que devuelve el padrón todavía no está verificada con datos reales de producción",
    ],
    stack: [
      "Python 3.12",
      "FastAPI",
      "PostgreSQL 16",
      "SQLAlchemy 2",
      "Alembic",
      "zeep (SOAP)",
      "WeasyPrint",
      "Docker",
      "Vite",
    ],
  },

  {
    // TODO: el epígrafe del video es genérico a propósito: cambialo por lo que
    // la grabación muestra de verdad.
    slug: "bot-base-whatsapp",
    family: "oss",
    title: "Atención por WhatsApp con bots especialistas y un panel propio",
    status: "En curso",
    period: "2025 - hoy",
    role: "Diseño, desarrollo y despliegue",
    diagram: "bot-base",
    video: {
      src: "/videos/bot-base.mp4",
      caption: "Bot Base, grabado en pantalla.",
    },
    metaDescription:
      "Atención de WhatsApp de alto volumen: el webhook encola, un derivador elige entre bots especialistas y el equipo cierra lo que falta en un panel propio.",
    summary: {
      problem:
        "Una empresa con mucho volumen de mensajes por WhatsApp contesta todo a mano: los casos importantes se mezclan con las consultas repetidas y, cuando alguien toma un chat, no tiene el contexto de lo que ya se habló.",
      result:
        "Un derivador que elige entre bots especialistas, cada uno con su conocimiento y sus reglas, y un panel propio donde el equipo toma y resuelve lo que el bot no cierra.",
    },
    problem:
      "Las empresas con mucho volumen de mensajes por WhatsApp contestan todo a mano. Los casos importantes se mezclan con las consultas repetidas, y cuando alguien toma un chat no tiene el contexto de lo que ya se habló: la persona que escribe repite lo mismo dos veces, y la que atiende empieza de cero.",
    constraints: [
      "No se podía responder una vez por cada mensaje de una ráfaga, ni duplicar respuestas cuando Meta reintenta el webhook",
      "No se podía depender de una herramienta de atención de terceros",
      "No se podía atar el bot a un solo proveedor ni a un solo modelo de IA",
      "Un número vinculado por QR no podía quedar bloqueado por enviar como un robot",
    ],
    decisions: [
      {
        choice:
          "El webhook valida la firma con X-Hub-Signature-256, contesta 200 y encola el trabajo en Celery, con debounce de ráfagas y deduplicación por wamid en Redis y en la base",
        instead: "armar la respuesta adentro del webhook",
        why: "Meta reintenta: si la respuesta se arma adentro, el reintento manda el mensaje dos veces y una demora lo pierde. Con la cola en el medio, el reintento no tiene efecto y una ráfaga de mensajes se contesta una sola vez",
      },
      {
        choice:
          "Un derivador —Recepción— que elige entre bots especialistas, cada uno con sus instrucciones, su base de conocimiento en pgvector y las reglas aprobadas en Entrenamiento, que mandan sobre todo lo anterior",
        instead: "un solo bot con un prompt gigante",
        why: "cada área se ajusta sin romper las demás: corregir lo que responde una no cambia lo que responden las otras, y las reglas aprobadas tienen la última palabra sobre las instrucciones y el conocimiento",
      },
      {
        choice:
          "Panel propio en Next.js: bandeja de pendientes, tomar y resolver conversaciones, resumen de derivación, etiquetas, prioridad, equipos, leads, estadísticas, logs y auditoría",
        instead: "usar una plataforma de atención externa",
        why: "la restricción era no depender de una herramienta de terceros, y con el panel adentro el contexto de la conversación, el resumen de la derivación y la auditoría quedan en el mismo lugar que el bot, en vez de repartidos entre dos sistemas que hay que sincronizar",
      },
      {
        choice:
          "OpenRouter, OpenAI, Gemini, Anthropic y OpenCode Go, con claves cifradas con Fernet cargadas desde el panel y modelo elegible por bot, con fallback al predeterminado",
        instead: "un solo proveedor de IA",
        why: "cambiar de proveedor no obliga a tocar el código, y elegir cuál conviene deja de ser a ojo: un «Probar bot» muestra qué conocimiento y qué reglas usó cada respuesta, y un comparador corre hasta 6 modelos con el mismo contexto",
      },
      {
        choice:
          "También WhatsApp común vinculado por QR, con un servicio en Node (Fastify y Baileys) y una cola de envío por número: «escribiendo…» proporcional al largo, pausas aleatorias, topes por minuto, hora y día, y calentamiento de números nuevos",
        instead: "solo la API oficial",
        why: "es el número que la empresa ya usa, sin alta previa en la Cloud API. Asumo el riesgo de que no es un canal oficial, y por eso el envío se regula: un número que escribe como un robot termina bloqueado",
      },
    ],
    result: [
      "Tres canales: WhatsApp oficial por la Cloud API, WhatsApp vinculado por QR y Messenger. Cada conversación se responde por el número por el que entró",
      "Transcripción de audios a texto",
      "La ventana de 24 h de la Cloud API se resuelve con el envío de plantillas aprobadas desde el panel",
      "Más de 400 tests automáticos entre Python y Node, y un manual de uso de 28 capítulos",
      "Pensado como plantilla: dar de alta una empresa nueva está documentado paso a paso",
    ],
    open: [
      "El canal por QR no es oficial: Meta puede suspender un número sin aviso, y un cambio de protocolo obliga a actualizar Baileys",
      "Las plantillas con encabezado de imagen o video, o con botones de URL dinámica, todavía no se pueden enviar desde el panel",
    ],
    stack: [
      "FastAPI",
      "Celery",
      "Redis",
      "PostgreSQL",
      "pgvector",
      "Next.js",
      "Fastify",
      "Baileys",
      "WhatsApp Cloud API",
    ],
    link: {
      label: "github.com/sergio-scardigno/bot-base",
      href: "https://github.com/sergio-scardigno/bot-base",
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
