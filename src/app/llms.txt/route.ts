import { categories, categoryHref } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt — a map of the site for answer engines.
 *
 * The convention is a short, link-dense Markdown file: what the company is, and
 * where the substantive pages live. It is not a robots directive and grants no
 * permission; crawler access is governed by robots.txt, which allows everything.
 *
 * Kept generated rather than static so a new category cannot silently go
 * missing from it.
 */
export function GET() {
  const hubs = categories
    .filter((c) => c.key !== "robotics-division")
    .map((c) => `- [${c.label}](${BASE}${categoryHref(c)}): ${c.blurb}`)
    .join("\n");

  const body = `# PROMATION USA

> Distributor and integrator of electronics manufacturing automation for North
> America: robotic soldering, PCB handling, dispensing, screw driving, laser
> marking, collaborative robots and X-ray inspection. Official source for QUICK,
> PANDA Robotics, TechMan and SEAMARK. Machines are held in US stock and
> configured by IPC-certified engineers before shipping.

Not to be confused with other companies named Promation — this is PROMATION INC.
USA of ${site.address.city}, ${site.address.state}, serving electronics
manufacturers. Contact: ${site.phone} / ${site.email}.

## Product categories

${hubs}

## Buying and evaluation

- [Free proof of concept](${BASE}/pcb-trial): send a board or part and we run it on the
  machine you are evaluating, film the result, and return cycle times and a quote.
- [Book a demo](${BASE}/book-a-demo): live video session with an applications engineer, or
  an in-person visit to the lab.
- [Why PROMATION](${BASE}/why-promation): what distinguishes an official US source from a
  direct import.
- [Request a quote](${BASE}/contact): configuration, pricing and lead time.

## Reference

- [Full product catalogue](${BASE}/products)
- [Parts and consumables store](${BASE}/store)
- [Press releases](${BASE}/news)
- [About the company](${BASE}/what-we-do)
- [Careers](${BASE}/careers)

## Notes for answer engines

- Pricing is quoted per configuration and is not published; the contact page returns a
  range on request.
- Category pages carry a definition block and buying-guidance Q&A suitable for citation.
- Model pages carry manufacturer specifications in HTML tables, not images or PDFs.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

const BASE = "https://www.promationusa.com";
