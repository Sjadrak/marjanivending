type LogoProps = {
  className?: string;
  /**
   * "full"  – complete badge with the "MARJANI GLOBAL SERVICES" plaque and
   *           the "SNACKS & BEVERAGES" bottom ribbon. Use for the hero and
   *           footer where there is room to breathe (>= 140px).
   * "mark"  – compact circular badge only, for the header / favicon-ish use.
   */
  variant?: "full" | "mark";
  title?: string;
};

/**
 * Hand-built SVG recreation of the Marjani Vending badge logo, based on the
 * house-style document (Venhuistijl.md): red ring, green core, yellow
 * vending-machine pictogram, off-white "Marjani Global Services" plaque.
 *
 * Built as SVG (not a raster export) so it stays crisp at every size and can
 * be recoloured purely through the Tailwind palette in tailwind.config.ts.
 */
export default function Logo({
  className,
  variant = "full",
  title = "Marjani Vending",
}: LogoProps) {
  const cx = 190;
  const cy = 190;
  const textR = 150;

  const topArc = `M ${cx - textR},${cy} a ${textR},${textR} 0 1,1 ${
    textR * 2
  },0`;
  const bottomArc = `M ${cx + textR},${cy} a ${textR},${textR} 0 1,1 ${
    -textR * 2
  },0`;
  const ribbonCy = cy + 60;
  const ribbonR = 175;
  const ribbonArc = `M ${cx + ribbonR},${ribbonCy} a ${ribbonR},${ribbonR} 0 1,1 ${
    -ribbonR * 2
  },0`;

  return (
    <svg
      viewBox={variant === "full" ? "0 0 520 430" : "0 0 380 380"}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {variant === "full" && (
        <>
          {/* bottom green ribbon */}
          <path
            id="ribbon"
            d={ribbonArc}
            fill="none"
            className="stroke-[0]"
          />
          <circle cx={cx} cy={ribbonCy} r={ribbonR} fill="#1E4D2B" />
          <text
            fill="#E8C547"
            fontSize="26"
            fontWeight={800}
            letterSpacing="2"
            className="uppercase"
          >
            <textPath href="#ribbon" startOffset="50%" textAnchor="middle">
              Snacks &amp; Beverages
            </textPath>
          </text>
        </>
      )}

      {/* outer yellow ring */}
      <circle cx={cx} cy={cy} r={182} fill="#E8C547" />
      {/* red ring */}
      <circle cx={cx} cy={cy} r={172} fill="#A62621" />
      {/* thin yellow divider */}
      <circle
        cx={cx}
        cy={cy}
        r={128}
        fill="none"
        stroke="#E8C547"
        strokeWidth={6}
      />
      {/* green core */}
      <circle cx={cx} cy={cy} r={122} fill="#1E4D2B" />

      {/* arced ring text */}
      <path id="top-arc" d={topArc} fill="none" />
      <path id="bottom-arc" d={bottomArc} fill="none" />
      <text
        fill="#F2F0E6"
        fontSize="34"
        fontWeight={800}
        letterSpacing="3"
        className="uppercase"
      >
        <textPath href="#top-arc" startOffset="50%" textAnchor="middle">
          Marjani
        </textPath>
      </text>
      <text
        fill="#F2F0E6"
        fontSize="30"
        fontWeight={800}
        letterSpacing="3"
        className="uppercase"
      >
        <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle">
          Vending
        </textPath>
      </text>

      {/* vending machine pictogram */}
      <g transform={`translate(${cx - 34}, ${cy - 58})`}>
        <rect
          x="0"
          y="0"
          width="68"
          height="116"
          rx="6"
          fill="#E8C547"
          stroke="#1E4D2B"
          strokeWidth="3"
        />
        <rect x="8" y="10" width="20" height="16" fill="#1E4D2B" />
        <rect x="32" y="10" width="20" height="16" fill="#1E4D2B" />
        <rect x="8" y="30" width="20" height="16" fill="#1E4D2B" />
        <rect x="32" y="30" width="20" height="16" fill="#1E4D2B" />
        <rect x="8" y="50" width="44" height="10" fill="#1E4D2B" />
        <circle cx="58" cy="72" r="5" fill="#1E4D2B" />
        <rect x="8" y="82" width="30" height="6" fill="#1E4D2B" />
        <rect x="8" y="92" width="30" height="6" fill="#1E4D2B" />
        <rect x="8" y="102" width="52" height="10" fill="#1E4D2B" />
      </g>

      {variant === "full" && (
        <g transform={`translate(${cx + 150}, ${cy - 55}) rotate(-6)`}>
          <rect
            x="0"
            y="0"
            width="150"
            height="112"
            rx="10"
            fill="#F2F0E6"
            stroke="#1E4D2B"
            strokeWidth="6"
          />
          <text
            x="75"
            y="42"
            textAnchor="middle"
            fill="#A62621"
            fontSize="26"
            fontWeight={800}
            className="uppercase"
          >
            Marjani
          </text>
          <text
            x="75"
            y="70"
            textAnchor="middle"
            fill="#1E4D2B"
            fontSize="20"
            fontWeight={800}
            className="uppercase"
          >
            Global
          </text>
          <text
            x="75"
            y="94"
            textAnchor="middle"
            fill="#1E4D2B"
            fontSize="20"
            fontWeight={800}
            className="uppercase"
          >
            Services
          </text>
        </g>
      )}
    </svg>
  );
}
