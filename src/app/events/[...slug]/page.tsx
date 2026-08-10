import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero, GlowButton, Chip } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { events } from "@/lib/content";

function eventPath(href: string): string[] {
  return href.replace(/^\/events\//, "").split("/");
}

export function generateStaticParams() {
  return events.map((e) => ({ slug: eventPath(e.href) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/events/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const event = events.find((e) => eventPath(e.href).join("/") === path);
  if (!event) return {};
  return { title: event.title, description: event.description };
}

export default async function EventPage({
  params,
}: PageProps<"/events/[...slug]">) {
  const { slug } = await params;
  const path = slug.join("/");
  const event = events.find((e) => eventPath(e.href).join("/") === path);
  if (!event) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Event Log — ${event.year}`}
        title={event.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: String(event.year) },
        ]}
      />
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass clip-corner space-y-6 p-8">
            <div className="flex flex-wrap gap-2">
              <Chip>{event.dates}</Chip>
            </div>
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
                {"// Location"}
              </h2>
              <p className="mt-2 text-lg text-foreground/90">{event.location}</p>
            </div>
            {event.description && (
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
                  {"// Briefing"}
                </h2>
                <p className="mt-2 leading-relaxed text-muted">{event.description}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-4 pt-2">
              <GlowButton href="/events" variant="ghost">
                Back to Events
              </GlowButton>
              <GlowButton href="/contact">Meet Us There</GlowButton>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
