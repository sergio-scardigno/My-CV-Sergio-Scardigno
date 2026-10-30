/**
 * La infraestructura del homelab, como está armada de verdad.
 *
 * Lo que el diagrama tiene que dejar claro es la decisión de seguridad: una
 * sola entrada por túnel y ningún puerto abierto en el router. Por eso el
 * "sin puertos abiertos" se dibuja: la ausencia es la decisión.
 *
 * El ancho de cada línea de texto está medido contra su caja: la mono anda en
 * ~0.6em por carácter, así que a 10px entran unos 41 caracteres cada 250px.
 */
const SEGMENTS = ["servicios", "gestión", "clientes", "datos", "invitados"];

const WORKLOADS = [
  ["scraper bursátil", "bases de datos"],
  ["scraper de jurisprudencia", "rutinas que exporta a Garmin"],
  ["pilotos de clientes", "sitios antes de publicarlos"],
];

export function HomelabTopology({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 320"
      className={className}
      role="img"
      aria-labelledby="homelab-title homelab-desc"
    >
      <title id="homelab-title">
        Topología del homelab sobre HP ProLiant con Proxmox y ZFS
      </title>
      <desc id="homelab-desc">
        El acceso desde internet entra por un único túnel; el router no tiene
        ningún puerto abierto. Un MikroTik parte la red en cinco segmentos. Las
        cargas corren sobre un HP ProLiant ML310e Gen8 v2 con Xeon y 32 GB de
        RAM, con los discos en espejo ZFS y tres copias de respaldo con fechas
        distintas renovadas cada mes.
      </desc>

      <g className="font-mono" fontSize="11">
        {/* La entrada: un solo punto, y lo que deliberadamente no existe */}
        <text x="0" y="14" className="fill-muted-foreground">
          internet
        </text>
        <path d="M30 22 v14" className="stroke-rule" />

        <rect
          x="0"
          y="36"
          width="84"
          height="26"
          rx="3"
          className="fill-none stroke-signal"
        />
        <text x="14" y="53" className="fill-signal-ink" fontWeight="500">
          túnel
        </text>

        <g className="stroke-muted-foreground">
          <path d="M104 42 l9 9 M113 42 l-9 9" />
        </g>
        <text x="122" y="49" className="fill-muted-foreground" fontSize="10">
          sin puertos abiertos en el router
        </text>

        {/* El MikroTik parte la red */}
        <path d="M42 62 v18" className="stroke-rule" />
        <rect
          x="0"
          y="80"
          width="178"
          height="26"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="14" y="97" className="fill-foreground" fontWeight="500">
          MikroTik
        </text>

        {/* Los cinco segmentos, en una fila pareja */}
        <path d="M42 106 v12" className="stroke-rule" />
        <path d="M42 118 H596" className="stroke-rule" />
        {SEGMENTS.map((name, i) => {
          const x = 42 + i * 138;
          return (
            <g key={name}>
              <path d={`M${x} 118 v10`} className="stroke-rule" />
              <text
                x={x}
                y={141}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="10"
              >
                {name}
              </text>
            </g>
          );
        })}

        {/* El servidor, a todo el ancho para que el texto no se desborde */}
        <path d="M320 146 v12" className="stroke-rule" />
        <rect
          x="0"
          y="158"
          width="640"
          height="88"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="14" y="176" className="fill-foreground" fontWeight="500">
          HP ProLiant ML310e Gen8 v2
        </text>
        <text x="236" y="176" className="fill-muted-foreground" fontSize="10">
          Xeon E3-1270 v3 · 32 GB · Proxmox · comprado usado
        </text>
        <path d="M14 186 H626" className="stroke-rule" strokeDasharray="2 3" />

        {WORKLOADS.map(([left, right], row) => (
          <g key={left}>
            <text
              x="14"
              y={204 + row * 14}
              className="fill-muted-foreground"
              fontSize="10"
            >
              {left}
            </text>
            <text
              x="320"
              y={204 + row * 14}
              className="fill-muted-foreground"
              fontSize="10"
            >
              {right}
            </text>
          </g>
        ))}

        {/* Los discos en espejo */}
        <path d="M80 246 v14" className="stroke-rule" />
        <text x="0" y="278" className="fill-muted-foreground" fontSize="10">
          espejo ZFS
        </text>
        <g className="fill-card stroke-rule">
          <ellipse cx="92" cy="268" rx="14" ry="4.5" />
          <path d="M78 268 v9 a14 4.5 0 0 0 28 0 v-9" />
          <ellipse cx="130" cy="268" rx="14" ry="4.5" />
          <path d="M116 268 v9 a14 4.5 0 0 0 28 0 v-9" />
        </g>
        <text x="156" y="272" className="fill-muted-foreground" fontSize="10">
          2 SAS de 1 TB, más 3 de 4 TB migrados sin pérdida
        </text>

        {/* Las tres copias: el espejo no alcanza */}
        <path d="M80 246 v14 M80 296 v-10" className="stroke-rule" />
        <text x="0" y="304" className="fill-muted-foreground" fontSize="10">
          3 copias
        </text>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={80 + i * 20}
            y="294"
            width="16"
            height="14"
            rx="2"
            className="fill-card stroke-rule"
          />
        ))}
        <text x="156" y="304" className="fill-muted-foreground" fontSize="10">
          fechas distintas, renovadas cada mes, con restauración probada
        </text>
      </g>
    </svg>
  );
}
