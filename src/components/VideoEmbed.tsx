import { videoMeta } from "@/lib/videos";
import { VideoObjectJsonLd } from "@/components/JsonLd";

/**
 * A YouTube embed with its structured data attached.
 *
 * Keeping the two together means a video can never be added to a page without
 * its markup — the schema was the thing most likely to be forgotten when these
 * were hand-placed one at a time.
 *
 * `youtube-nocookie.com` is used deliberately: a training library is browsed,
 * not just watched, so a visitor may load half a dozen players in one visit.
 * The no-cookie host serves the same video without setting tracking cookies
 * until playback starts. Both hosts are permitted by the CSP.
 */
export function VideoEmbed({
  id,
  pageUrl,
  className = "",
}: {
  id: string;
  /** Site-relative path of the page the video appears on, for the schema. */
  pageUrl: string;
  className?: string;
}) {
  const meta = videoMeta[id];

  return (
    <figure className={className}>
      {meta && (
        <VideoObjectJsonLd
          id={meta.id}
          name={meta.name}
          description={meta.description}
          uploadDate={meta.uploadDate}
          duration={meta.duration}
          pageUrl={pageUrl}
        />
      )}
      <div className="border-beam clip-corner p-1.5">
        <div className="clip-corner relative aspect-video overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={meta?.name ?? "PROMATION USA training video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      {meta && (
        <figcaption className="mt-3">
          <p className="font-display text-sm font-semibold leading-snug text-slate-900">
            {meta.name}
          </p>
          {meta.duration && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {readableDuration(meta.duration)}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/** PT6M38S → "6 min 38 sec", which is what a viewer is deciding on. */
function readableDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  const [, h, min, s] = m;
  const parts: string[] = [];
  if (h) parts.push(`${h} hr`);
  if (min) parts.push(`${min} min`);
  if (s) parts.push(`${s} sec`);
  return parts.join(" ");
}
