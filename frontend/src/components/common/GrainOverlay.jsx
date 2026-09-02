/**
 * GrainOverlay — Fixed SVG noise texture over the entire viewport.
 * Very low opacity; slow drift animation adds depth without distraction.
 * pointer-events: none so it never blocks interaction.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ opacity: 0.035 }}
    >
      <svg
        className="absolute inset-0 w-[200%] h-[200%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
