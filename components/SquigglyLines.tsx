type SquigglyProps = {
  variant?: "lavender" | "sky" | "aurora" | "mint" | "rose" | "fuchsia" | "amber";
};

const GRADIENTS: Record<
  NonNullable<SquigglyProps["variant"]>,
  { stops: { offset: string; color: string }[]; glow: string }
> = {
  lavender: {
    // Pastel acorde al violeta del sitio (#7c3aed / #8b5cf6): lavanda → rosa pastel → lila
    stops: [
      { offset: "0%", color: "#9879b9ff" },
      { offset: "50%", color: "#b799d6ff" },
      { offset: "100%", color: "#c8ade6ff" },
    ],
    glow: "rgba(233, 213, 255, 0.55)",
  },
  aurora: {
    stops: [
      { offset: "0%", color: "#d7c3eeff" },
      { offset: "50%", color: "#ad91caff" },
      { offset: "100%", color: "#c8ade6ff" },
    ],
    glow: "rgba(221, 214, 254, 0.5)",
  },
  sky: {
    stops: [
      { offset: "0%", color: "#ddd6fe" },
      { offset: "50%", color: "#e9d5ff" },
      { offset: "100%", color: "#fbcfe8" },
    ],
    glow: "rgba(233, 213, 255, 0.5)",
  },
  mint: {
    stops: [
      { offset: "0%", color: "#e9d5ff" },
      { offset: "50%", color: "#f5d0fe" },
      { offset: "100%", color: "#fce7f3" },
    ],
    glow: "rgba(240, 171, 252, 0.45)",
  },
  rose: {
    stops: [
      { offset: "0%", color: "#fce7f3" },
      { offset: "50%", color: "#fbcfe8" },
      { offset: "100%", color: "#e9d5ff" },
    ],
    glow: "rgba(251, 207, 232, 0.5)",
  },
  fuchsia: {
    stops: [
      { offset: "0%", color: "#e9d5ff" },
      { offset: "50%", color: "#f5d0fe" },
      { offset: "100%", color: "#f0abfc" },
    ],
    glow: "rgba(240, 171, 252, 0.5)",
  },
  amber: {
    stops: [
      { offset: "0%", color: "#fef3c7" },
      { offset: "50%", color: "#fde68a" },
      { offset: "100%", color: "#fbcfe8" },
    ],
    glow: "rgba(253, 230, 138, 0.45)",
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
      className="absolute left-1/2 -translate-x-1/2 -bottom-[0.24em] sm:-bottom-[0.28em] w-[104%] min-w-[4rem] h-[0.32em] sm:h-[0.38em] pointer-events-none overflow-visible"
      preserveAspectRatio="none"
      style={{ maxWidth: "none" }}
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
        opacity="0.95"
        filter={`url(#${glowId})`}
        style={{
          filter: `drop-shadow(0 2px 8px ${grad.glow})`,
        }}
      />
    </svg>
  );
}