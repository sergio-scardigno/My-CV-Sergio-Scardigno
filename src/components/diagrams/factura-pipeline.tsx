/**
 * Factura API: el camino de una factura hasta el CAE y el PDF.
 *
 * El punto del diagrama es el recuadro de abajo: lo que queda en la base
 * propia. El turno de numeración y la factura grabada como pendiente son lo
 * que hace que un corte de red no pierda una factura que ARCA ya aprobó, y
 * que no haya nada más que respaldar que PostgreSQL.
 *
 * Las medidas de texto están tomadas igual que en los otros diagramas: la mono
 * anda en ~0.6em por carácter, así que a 10px entran unos 58 caracteres en los
 * 348 px útiles del recuadro.
 */
export function FacturaPipeline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 300"
      className={className}
      role="img"
      aria-labelledby="factura-title factura-desc"
    >
      <title id="factura-title">
        Camino de una factura: de la API a ARCA, el CAE y el PDF con QR
      </title>
      <desc id="factura-desc">
        El front propio u otro sistema llama a Factura API, que valida, calcula
        el IVA con Decimal y numera. La API habla con ARCA por WSAA y WSFEv1, y
        ARCA devuelve el CAE con su vencimiento. Con el CAE, el PDF con el QR de
        la RG 4892 se genera a demanda y sale por mail al cliente. En la base
        propia quedan el turno de numeración con pg_advisory_lock, la factura
        grabada como pendiente antes de llamar a ARCA, y ningún PDF en disco: si
        ARCA no responde, se reconcilia con FECompConsultar en vez de reintentar
        a ciegas.
      </desc>

      <g className="font-mono" fontSize="11">
        {/* Quien pide la factura */}
        <rect
          x="16"
          y="36"
          width="112"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="28" y="54" className="fill-foreground" fontWeight="500">
          front propio
        </text>
        <text x="28" y="68" className="fill-muted-foreground" fontSize="10">
          u otro sistema
        </text>

        {/* La API: valida, calcula y numera antes de salir a ARCA */}
        <path d="M128 57 h18" className="stroke-rule" />
        <path d="M140 53 l6 4 -6 4" className="fill-none stroke-rule" />
        <rect
          x="152"
          y="36"
          width="112"
          height="56"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="164" y="54" className="fill-foreground" fontWeight="500">
          Factura API
        </text>
        <text x="164" y="68" className="fill-muted-foreground" fontSize="10">
          valida, numera
        </text>
        <text x="164" y="82" className="fill-muted-foreground" fontSize="10">
          IVA con Decimal
        </text>

        {/* ARCA, por los dos servicios que hacen falta */}
        <path d="M264 57 h18" className="stroke-rule" />
        <path d="M276 53 l6 4 -6 4" className="fill-none stroke-rule" />
        <rect
          x="288"
          y="36"
          width="112"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="300" y="54" className="fill-foreground" fontWeight="500">
          ARCA
        </text>
        <text x="300" y="68" className="fill-muted-foreground" fontSize="10">
          WSAA + WSFEv1
        </text>

        {/* La vuelta: el CAE es lo que no se puede perder */}
        <path d="M400 57 h18" className="stroke-confirm" />
        <path d="M412 53 l6 4 -6 4" className="fill-none stroke-confirm" />
        <rect
          x="424"
          y="36"
          width="112"
          height="42"
          rx="3"
          className="fill-card stroke-confirm"
        />
        <text x="436" y="54" className="fill-foreground" fontWeight="500">
          CAE
        </text>
        <text x="436" y="68" className="fill-muted-foreground" fontSize="10">
          + vencimiento
        </text>

        {/* El PDF no se guarda: se arma cuando alguien lo pide */}
        <path d="M480 78 v30" className="stroke-rule" />
        <path d="M476 104 l4 6 4 -6" className="fill-none stroke-rule" />
        <rect
          x="404"
          y="110"
          width="152"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="416" y="128" className="fill-foreground" fontWeight="500">
          PDF con QR
        </text>
        <text x="416" y="142" className="fill-muted-foreground" fontSize="10">
          RG 4892 · a demanda
        </text>

        <path d="M480 152 v30" className="stroke-rule" />
        <path d="M476 178 l4 6 4 -6" className="fill-none stroke-rule" />
        <rect
          x="404"
          y="184"
          width="152"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="416" y="202" className="fill-foreground" fontWeight="500">
          mail al cliente
        </text>
        <text x="416" y="216" className="fill-muted-foreground" fontSize="10">
          con el PDF adjunto
        </text>

        {/* Lo que queda del lado propio, que es todo el estado que hay */}
        <text
          x="13"
          y="115"
          className="fill-confirm font-mono font-medium"
          fontSize="10"
        >
          base propia · PostgreSQL · el único estado que hay
        </text>
        <rect
          x="1"
          y="120"
          width="380"
          height="166"
          rx="4"
          className="fill-none stroke-confirm"
          strokeDasharray="4 4"
        />

        <text x="16" y="142" className="fill-foreground" fontSize="10">
          turno de numeración con pg_advisory_lock, en una
        </text>
        <text x="16" y="156" className="fill-foreground" fontSize="10">
          conexión dedicada con su propio pool
        </text>

        <text x="16" y="180" className="fill-foreground" fontSize="10">
          la factura se graba pendiente, con commit, antes de
        </text>
        <text x="16" y="194" className="fill-foreground" fontSize="10">
          llamar a ARCA: si la API se cae, no se pierde
        </text>

        <text x="16" y="218" className="fill-signal-ink" fontSize="10">
          si ARCA no responde, se reconcilia con
        </text>
        <text x="16" y="232" className="fill-signal-ink" fontSize="10">
          FECompConsultar en vez de reintentar a ciegas
        </text>

        <text x="16" y="256" className="fill-muted-foreground" fontSize="10">
          ningún PDF en disco: migrar a un VPS es mover la base
        </text>
        <text x="16" y="270" className="fill-muted-foreground" fontSize="10">
          y nada más
        </text>
      </g>
    </svg>
  );
}
