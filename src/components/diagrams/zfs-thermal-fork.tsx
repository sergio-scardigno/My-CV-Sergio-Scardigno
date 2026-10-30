/**
 * El especimen del hero: por qué un pool degradado con SMART impecable no es
 * un disco muriéndose.
 *
 * Lo que hace al diagrama es la contradicción de las dos lecturas de arriba.
 * De ahí salen dos caminos: el que parecía obvio y no lleva a nada, y el que
 * sí. La escala de temperatura está porque es el dato que cerró el caso.
 */
export function ZfsThermalFork({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 230"
      className={className}
      role="img"
      aria-labelledby="thermal-title thermal-desc"
    >
      <title id="thermal-title">
        Diagnóstico del pool ZFS degradado con SMART impecable
      </title>
      <desc id="thermal-desc">
        Dos lecturas contradictorias: zpool status marca el pool como degradado
        mientras smartctl reporta los discos como sanos. De ahí salen dos
        caminos: la hipótesis de un disco a punto de fallar, descartada por el
        SMART limpio, y la medición de temperatura, que dio 60 °C, por encima
        del rango de operación recomendado. La causa estaba afuera del disco.
      </desc>

      {/* Las dos lecturas que no cierran entre sí */}
      <g className="font-mono" fontSize="11">
        <rect
          x="1"
          y="1"
          width="232"
          height="34"
          rx="3"
          className="fill-none stroke-rule"
        />
        <text x="13" y="16" className="fill-muted-foreground">
          zpool status
        </text>
        <text x="13" y="29" className="fill-signal-ink" fontWeight="500">
          DEGRADED
        </text>

        <rect
          x="1"
          y="47"
          width="232"
          height="34"
          rx="3"
          className="fill-none stroke-rule"
        />
        <text x="13" y="62" className="fill-muted-foreground">
          smartctl health
        </text>
        <text x="13" y="75" className="fill-confirm" fontWeight="500">
          PASSED
        </text>
      </g>

      {/* La contradicción: lo que obliga a buscar en otro lado */}
      <g>
        <path
          d="M233 18 h22 a8 8 0 0 1 8 8 v14 a8 8 0 0 0 8 8 h10"
          className="fill-none stroke-rule"
        />
        <path
          d="M233 64 h22 a8 8 0 0 0 8 -8 v-14 a8 8 0 0 1 8 -8 h10"
          className="fill-none stroke-rule"
        />
      </g>

      {/* Rama descartada: dejada en trazo cortado y sin color */}
      <g className="font-mono" fontSize="11">
        <path
          d="M281 41 h26 a8 8 0 0 1 8 -8 v-12 a8 8 0 0 1 8 -8 h18"
          className="fill-none stroke-rule"
          strokeDasharray="3 3"
        />
        <text x="345" y="17" className="fill-muted-foreground">
          un disco a punto de fallar
        </text>
        <g className="stroke-muted-foreground">
          <path d="M566 9 l10 10 M576 9 l-10 10" />
        </g>
        <text x="345" y="31" className="fill-muted-foreground" fontSize="10">
          descartada: el SMART estaba limpio
        </text>
      </g>

      {/* Rama confirmada: la medición */}
      <g className="font-mono" fontSize="11">
        <path
          d="M281 41 h26 a8 8 0 0 0 8 8 v18 a8 8 0 0 0 8 8 h18"
          className="fill-none stroke-signal"
        />
        <text x="345" y="71" className="fill-foreground" fontWeight="500">
          temperatura del disco
        </text>
      </g>

      {/* La escala: el rango recomendado y los 60 °C medidos afuera de él */}
      <g className="font-mono" fontSize="10">
        <rect
          x="345"
          y="88"
          width="180"
          height="8"
          rx="4"
          className="fill-muted stroke-rule"
        />
        <rect
          x="345"
          y="88"
          width="126"
          height="8"
          rx="4"
          className="fill-confirm/20"
        />
        <path d="M471 84 v16" className="stroke-rule" />
        <text x="345" y="112" className="fill-muted-foreground">
          rango de operación
        </text>
        <text x="476" y="112" className="fill-muted-foreground">
          45 °C
        </text>

        {/* La lectura real, fuera del rango */}
        <circle cx="560" cy="92" r="4" className="fill-signal" />
        <path d="M525 92 h31" className="stroke-signal" strokeDasharray="2 3" />
        <text
          x="548"
          y="76"
          className="fill-signal-ink font-medium"
          fontSize="13"
        >
          60 °C
        </text>
      </g>

      {/* La conclusión */}
      <g className="font-mono" fontSize="11">
        <path d="M1 140 h638" className="stroke-rule" />
        <text x="1" y="160" className="fill-muted-foreground">
          el disco estaba sano: lo que estaba mal era el aire alrededor
        </text>
        <text x="1" y="182" className="fill-foreground" fontSize="11">
          lo movimos cerca de un cooler y quedó un control diario de temperatura
        </text>
        <text x="1" y="208" className="fill-muted-foreground" fontSize="10">
          cambiar el disco habría gastado un disco y dejado el problema intacto:
          el nuevo se habría calentado igual
        </text>
      </g>
    </svg>
  );
}
