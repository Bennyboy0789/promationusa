/**
 * Trim a string to a SERP-safe length on a word boundary.
 *
 * Google truncates titles around 60 characters and descriptions around 160.
 * Cutting mid-word looks like a bug; cutting on a space and appending an
 * ellipsis reads as deliberate. Text already within the limit is returned
 * untouched, so nothing gains a spurious ellipsis.
 */
export function shorten(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  // Leave room for the ellipsis itself.
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return (space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:—-]+$/, "") + "…";
}
