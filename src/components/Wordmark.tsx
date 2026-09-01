import Image from "next/image";

/**
 * The PROMATION wordmark.
 *
 * The supplied file had no alpha channel — the white background was baked in,
 * which showed as a pale rectangle on every surface here (the page is #f6f9fd,
 * the scrolled header is white at 85%). Blend modes did not solve it: the
 * animated header forms its own stacking context, so `mix-blend-multiply` had
 * nothing to multiply against. The mark is served instead as a PNG whose
 * coverage was recovered from the original — each pixel is a blend of one blue
 * and white, so the alpha is exact rather than thresholded, and the curves keep
 * their antialiasing. It sits correctly on any background, light or dark.
 *
 * The mark reads "promation" alone. "USA" still belongs in the *accessible*
 * name and in the schema: the audit found four unrelated companies trading as
 * Promation, and the Organization node carries a `disambiguatingDescription`
 * for exactly that reason. Callers set the link's `aria-label`, so the full
 * legal identity survives for screen readers and crawlers without appearing in
 * the lockup.
 */
export function Wordmark({
  className = "",
  height = 32,
}: {
  className?: string;
  /** Rendered height in px; width follows the 5.03:1 aspect ratio. */
  height?: number;
}) {
  const width = Math.round(height * (1247 / 248));
  return (
    <Image
      src="/promation-logo.png"
      alt="PROMATION"
      width={width}
      height={height}
      priority
      className={className}
      style={{ height, width }}
    />
  );
}
