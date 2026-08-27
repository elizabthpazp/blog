type SquigglyProps = {
  variant?: "lavender" | "sky" | "aurora" | "mint" | "rose" | "fuchsia" | "amber";
};

const GRADIENTS: Record<
  NonNullable<SquigglyProps["variant"]>,
  { stops: { offset: string; color: string }[]; glow: string }
> = {
  lavender: {
    stops: [
      { offset: "0%", color: "#ddd6fe" },
      { offset: "50%", color: "#bae6fd" },
      { offset: "100%", color: "#a7f3d0" },
    ],
    glow: "rgba(167, 243, 208, 0.55)",
  },
  aurora: {
    stops: [
      { offset: "0%", color: "#c7d2fe" },
      { offset: "50%", color: "#bae6fd" },
      { offset: "100%", color: "#fbcfe8" },
    ],
    glow: "rgba(186, 230, 253, 0.55)",
  },
  sky: {
    stops: [
      { offset: "0%", color: "#bae6fd" },
      { offset: "50%", color: "#7dd3fc" },
      { offset: "100%", color: "#67e8f9" },
    ],
    glow: "rgba(125, 211, 252, 0.5)",
  },
  mint: {
    stops: [
      { offset: "0%", color: "#a7f3d0" },
      { offset: "50%", color: "#86efac" },
      { offset: "100%", color: "#67e8f9" },
    ],
    glow: "rgba(134, 239, 172, 0.5)",
  },
  rose: {
    stops: [
      { offset: "0%", color: "#fbcfe8" },
      { offset: "50%", color: "#fda4af" },
      { offset: "100%", color: "#f9a8d4" },
    ],
    glow: "rgba(249, 168, 212, 0.5)",
  },
  fuchsia: {
    stops: [
      { offset: "0%", color: "#f0abfc" },
      { offset: "50%", color: "#e879f9" },
      { offset: "100%", color: "#c084fc" },
    ],
    glow: "rgba(217, 70, 239, 0.55)",
  },
  amber: {
    stops: [
      { offset: "0%", color: "#fde68a" },
      { offset: "50%", color: "#fdba74" },
      { offset: "100%", color: "#fda4af" },
    ],
    glow: "rgba(253, 186, 116, 0.5)",
  },
};

export default function SquigglyLines({
  variant = "lavender",
}: SquigglyProps = {}) {
  const grad = GRADIENTS[variant];
  const gradId = `squiggly-grad-${variant}`;
  const glowId = `squiggly-glow-${variant}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 418 42"
      className="absolute left-0 right-0 bottom-0 w-full h-[0.35em] sm:h-[0.5em] pointer-events-none"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          {grad.stops.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
        <filter id={glowId} x="-5%" y="-100%" width="110%" height="300%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"
        fill={`url(#${gradId})`}
        opacity="0.9"
        filter={`url(#${glowId})`}
        style={{
          filter: `drop-shadow(0 0 8px ${grad.glow})`,
        }}
      />
    </svg>
  );
}