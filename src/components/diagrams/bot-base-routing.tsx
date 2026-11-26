/**
 * Bot Base: de un mensaje de WhatsApp al bot que le corresponde.
 *
 * Lo que el diagrama tiene que dejar claro es que el webhook no contesta:
 * valida la firma, devuelve 200 y encola. Ahí se resuelven la ráfaga y el
 * reintento de Meta, que son los dos problemas que rompen un bot en
 * producción. La otra mitad es la bifurcación del final: el bot responde, o
 * deriva al equipo con un resumen, y nunca se queda en el medio.
 */
export function BotBaseRouting({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 340"
      className={className}
      role="img"
      aria-labelledby="botbase-title botbase-desc"
    >
      <title id="botbase-title">
        Recorrido de un mensaje de WhatsApp: webhook, cola, derivador y
        especialistas
      </title>
      <desc id="botbase-desc">
        El mensaje del cliente entra por el webhook, que valida la firma
        X-Hub-Signature-256, contesta 200 y encola el trabajo en Celery con
        debounce de ráfagas y deduplicación por wamid. La cola se la pasa al
        derivador, Recepción, que elige entre bots especialistas; cada uno tiene
        sus instrucciones, su base de conocimiento con pgvector y las reglas
        aprobadas en Entrenamiento, que mandan sobre todo lo anterior. De ahí
        sale la respuesta, por el mismo número por el que entró el mensaje, o la
        derivación al equipo, que la toma y la resuelve desde el panel propio.
      </desc>

      <g className="font-mono" fontSize="11">
        {/* El cliente, que escribe por donde le queda cómodo */}
        <rect
          x="16"
          y="36"
          width="116"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="28" y="54" className="fill-foreground" fontWeight="500">
          cliente
        </text>
        <text x="28" y="68" className="fill-muted-foreground" fontSize="10">
          WhatsApp
        </text>

        {/* El webhook no responde: valida, contesta 200 y suelta */}
        <path d="M132 57 h18" className="stroke-rule" />
        <path d="M144 53 l6 4 -6 4" className="fill-none stroke-rule" />
        <rect
          x="152"
          y="36"
          width="116"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="164" y="54" className="fill-foreground" fontWeight="500">
          webhook
        </text>
        <text x="164" y="68" className="fill-muted-foreground" fontSize="10">
          firma, 200, listo
        </text>

        {/* La cola: acá se resuelven la ráfaga y el reintento */}
        <path d="M268 57 h18" className="stroke-rule" />
        <path d="M280 53 l6 4 -6 4" className="fill-none stroke-rule" />
        <rect
          x="288"
          y="36"
          width="116"
          height="42"
          rx="3"
          className="fill-card stroke-signal"
        />
        <text x="300" y="54" className="fill-foreground" fontWeight="500">
          cola · Celery
        </text>
        <text x="300" y="68" className="fill-signal-ink" fontSize="10">
          debounce, dedup
        </text>

        {/* El derivador elige, no responde */}
        <path d="M404 57 h18" className="stroke-rule" />
        <path d="M416 53 l6 4 -6 4" className="fill-none stroke-rule" />
        <rect
          x="424"
          y="36"
          width="116"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="436" y="54" className="fill-foreground" fontWeight="500">
          derivador
        </text>
        <text x="436" y="68" className="fill-muted-foreground" fontSize="10">
          Recepción
        </text>

        {/* Qué resuelve la cola, escrito al costado */}
        <text x="16" y="100" className="fill-muted-foreground" fontSize="10">
          Meta reintenta y el cliente escribe en ráfaga:
        </text>
        <text x="16" y="114" className="fill-muted-foreground" fontSize="10">
          se contesta una sola vez, por wamid, en Redis y en la base
        </text>

        {/* Los especialistas, con el orden de precedencia dibujado */}
        <path d="M482 78 v26" className="stroke-rule" />
        <path d="M478 100 l4 6 4 -6" className="fill-none stroke-rule" />
        <rect
          x="382"
          y="106"
          width="200"
          height="86"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="394" y="124" className="fill-foreground" fontWeight="500">
          especialistas
        </text>
        <text x="394" y="140" className="fill-muted-foreground" fontSize="10">
          instrucciones propias
        </text>
        <text x="394" y="154" className="fill-muted-foreground" fontSize="10">
          conocimiento · pgvector
        </text>
        <text x="394" y="168" className="fill-signal-ink" fontSize="10">
          reglas de Entrenamiento
        </text>
        <text x="394" y="182" className="fill-signal-ink" fontSize="10">
          mandan sobre las de arriba
        </text>

        {/* La bifurcación del final: contesta, o deriva con contexto */}
        <path d="M482 192 v22" className="stroke-rule" />
        <path d="M482 214 H131 V240" className="fill-none stroke-rule" />
        <path d="M127 236 l4 6 4 -6" className="fill-none stroke-rule" />
        <path d="M482 214 H436 V240" className="fill-none stroke-confirm" />
        <path d="M432 236 l4 6 4 -6" className="fill-none stroke-confirm" />

        <rect
          x="16"
          y="240"
          width="230"
          height="46"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="28" y="259" className="fill-foreground" fontWeight="500">
          respuesta
        </text>
        <text x="28" y="274" className="fill-muted-foreground" fontSize="10">
          por el número por el que entró
        </text>

        <rect
          x="300"
          y="240"
          width="272"
          height="46"
          rx="3"
          className="fill-card stroke-confirm"
        />
        <text x="312" y="259" className="fill-foreground" fontWeight="500">
          panel propio
        </text>
        <text x="312" y="274" className="fill-muted-foreground" fontSize="10">
          pendientes · tomar · resolver
        </text>

        <text x="252" y="228" className="fill-confirm" fontSize="10">
          o deriva, con resumen
        </text>

        {/* Los otros dos canales entran por el mismo camino */}
        <path d="M1 300 h638" className="stroke-rule" />
        <text x="1" y="316" className="fill-muted-foreground" fontSize="10">
          Messenger y WhatsApp vinculado por QR entran por el mismo camino;
        </text>
        <text x="1" y="330" className="fill-muted-foreground" fontSize="10">
          el envío por QR sale por una cola propia de cada número
        </text>
      </g>
    </svg>
  );
}
