import Image from "next/image";

/**
 * The PROMATION wordmark.
 *
 * Two things about the supplied asset shape this component:
 *
 *  1. **The supplied file had no alpha channel** — the white background was
 *     baked in, which showed as a pale rectangle on every surface here (the
 *     page is #f6f9fd, the scrolled header is white at 85%). Blend modes did
 *     not solve it: the animated header forms its own stacking context, so
 *     `mix-blend-multiply` had nothing to multiply against. The mark is now
 *     served as a PNG whose coverage was recovered from the original — each
 *     pixel is a blend of one blue and white, so the alpha is exact rather
 *     than thresholded, and the curves keep their antialiasing. It sits
 *     correctly on any background, light or dark.
 *
 *  2. **It reads "promation", not "PROMATION USA".** The USA is not
 *     decoration — the audit found four unrelated companies trading as
 *     Promation, and the schema carries a `disambiguatingDescription` for
 *     exactly that reason. So the mark supplies the name and "USA" is set
 *     beside it, which also keeps the full brand in the accessible name.
 */
/**
 * The mark's own blue, sampled from the supplied artwork.
 *
 * Used for the "USA" beside it rather than the theme's blue-600, which is
 * noticeably brighter and more saturated — the two side by side read as a
 * mismatch. Measures 4.86:1 on the page background, so it still clears AA.
 */
const MARK_BLUE = "rgb(52, 111, 182)";

export function Wordmark({
  className = "",
  height = 32,
  showUsa = true,
}: {
  className?: string;
  /** Rendered height in px; width follows the 5.03:1 aspect ratio. */
  height?: number;
  showUsa?: boolean;
}) {
  const width = Math.round(height * (1247 / 248));
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/promation-logo.png"
        alt="PROMATION"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
        style={{ height, width }}
      />
      {showUsa && (
        <span
          className="font-display font-bold tracking-tight"
          style={{ fontSize: Math.round(height * 0.62), color: MARK_BLUE }}
        >
          USA
        </span>
      )}
    </span>
  );
}
