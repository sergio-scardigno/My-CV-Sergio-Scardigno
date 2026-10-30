/**
 * Presidio: anonimización local con seudónimos reversibles.
 *
 * El punto del diagrama es el borde. Todo lo que tiene datos personales queda
 * adentro de la red del estudio; lo único que sale es texto con seudónimos. El
 * mapa de equivalencias es lo que permite restaurar la respuesta después, y por
 * eso el lazo se dibuja cerrado: sin él esto sería solo tapar datos.
 */
export function PresidioPipeline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 300"
      className={className}
      role="img"
      aria-labelledby="presidio-title presidio-desc"
    >
      <title id="presidio-title">
        Anonimización local de expedientes con seudónimos reversibles
      </title>
      <desc id="presidio-desc">
        Dentro de la red del estudio, el expediente pasa por OCR y detección
        local de datos personales, que se reemplazan por seudónimos numerados.
        El mapa de equivalencias queda en disco. Solo el texto con seudónimos
        sale hacia la IA en la nube; la respuesta vuelve y se restaura con ese
        mapa. Ningún dato personal cruza el borde.
      </desc>

      {/* El borde: lo que no sale de la red del estudio */}
      <rect
        x="1"
        y="14"
        width="398"
        height="222"
        rx="4"
        className="fill-none stroke-confirm"
        strokeDasharray="4 4"
      />
      <text
        x="13"
        y="9"
        className="fill-confirm font-mono font-medium"
        fontSize="10"
      >
        red del estudio · nada de esto sale
      </text>

      <g className="font-mono" fontSize="11">
        {/* El expediente */}
        <rect
          x="20"
          y="36"
          width="120"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="32" y="54" className="fill-foreground" fontWeight="500">
          expediente
        </text>
        <text x="32" y="68" className="fill-muted-foreground" fontSize="10">
          PDF escaneado
        </text>

        {/* OCR, que hace falta porque no hay capa de texto */}
        <path d="M140 57 h34" className="stroke-rule" />
        <path d="M168 53 l6 4 -6 4" className="fill-none stroke-rule" />
        <rect
          x="174"
          y="36"
          width="86"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="186" y="54" className="fill-foreground">
          OCR
        </text>
        <text x="186" y="68" className="fill-muted-foreground" fontSize="10">
          del sistema
        </text>

        {/* La detección, con los reconocedores propios */}
        <path d="M260 57 h24" className="stroke-rule" />
        <path d="M278 53 l6 4 -6 4" className="fill-none stroke-rule" />
        <rect
          x="284"
          y="36"
          width="100"
          height="42"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="296" y="54" className="fill-foreground" fontWeight="500">
          detección
        </text>
        <text x="296" y="68" className="fill-muted-foreground" fontSize="10">
          local, sin GPU
        </text>

        {/* Qué se detecta: los identificadores argentinos son propios */}
        <path d="M334 78 v18" className="stroke-rule" strokeDasharray="2 3" />
        <text x="20" y="112" className="fill-muted-foreground" fontSize="10">
          persona · domicilio ·
        </text>
        <text x="20" y="124" className="fill-signal-ink" fontSize="10">
          DNI · CUIT/CUIL
        </text>
        <text x="20" y="136" className="fill-muted-foreground" fontSize="10">
          reconocedores propios
        </text>

        {/* El reemplazo por seudónimos numerados */}
        <rect
          x="150"
          y="100"
          width="234"
          height="40"
          rx="3"
          className="fill-muted stroke-rule"
        />
        <text x="162" y="117" className="fill-foreground" fontSize="10">
          {"<PERSONA_1> <DNI_1> <DOMICILIO_1>"}
        </text>
        <text x="162" y="131" className="fill-muted-foreground" fontSize="10">
          seudónimos numerados, no asteriscos
        </text>

        {/* El mapa: lo que hace que esto sea reversible */}
        <path d="M267 140 v22" className="stroke-rule" />
        <rect
          x="150"
          y="162"
          width="234"
          height="40"
          rx="3"
          className="fill-card stroke-confirm"
        />
        <text x="162" y="179" className="fill-foreground" fontWeight="500">
          mapa de equivalencias
        </text>
        <text x="162" y="193" className="fill-muted-foreground" fontSize="10">
          en disco · permite volver atrás
        </text>

        {/* Lo único que cruza el borde */}
        <path d="M399 134 h59" className="stroke-signal" />
        <path d="M452 130 l6 4 -6 4" className="fill-none stroke-signal" />
        <text x="408" y="104" className="fill-signal-ink" fontSize="10">
          sale sin
        </text>
        <text x="408" y="116" className="fill-signal-ink" fontSize="10">
          datos reales
        </text>

        <rect
          x="458"
          y="98"
          width="120"
          height="44"
          rx="3"
          className="fill-card stroke-rule"
        />
        <text x="470" y="117" className="fill-foreground" fontWeight="500">
          IA en la nube
        </text>
        <text x="470" y="131" className="fill-muted-foreground" fontSize="10">
          resume, redacta
        </text>

        {/* La vuelta: el lazo que cierra */}
        <path
          d="M518 142 v52 a6 6 0 0 1 -6 6 H390"
          className="fill-none stroke-confirm"
        />
        <path d="M396 196 l-6 4 6 4" className="fill-none stroke-confirm" />
        <text x="150" y="216" className="fill-confirm" fontSize="10">
          vuelve y se restaura con el mapa
        </text>

        {/* El sello, que el OCR no llega a leer */}
        <path d="M1 258 h638" className="stroke-rule" />
        <text x="1" y="276" className="fill-muted-foreground" fontSize="10">
          el nombre del escribano está en un sello que el OCR no llega a leer:
        </text>
        <text x="1" y="290" className="fill-muted-foreground" fontSize="10">
          se tapa el sello completo en vez de confiar en la detección
        </text>
      </g>
    </svg>
  );
}
