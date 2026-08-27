import type { Product, CategoryMeta } from "@/lib/products";
import { specLabel } from "@/lib/products";
import { categoryContent } from "@/lib/categoryContent";

/**
 * Buying questions for an individual model page.
 *
 * Everything here is derived from data the catalogue already publishes — the
 * model's own specification table, its category, its stated features. Nothing
 * is asserted that is not already on the page, which is both the honest
 * position and the condition for marking it up as FAQPage: Google requires the
 * answer to be visible, and a claim we cannot source should not be either.
 *
 * Where a model carries no specifications the spec-derived questions simply do
 * not appear, rather than being padded with generalities.
 */

export type Faq = { q: string; a: string };

/** Spec keys worth answering a question about, in the order we prefer them. */
const NOTABLE = [
  ["Working Area", "working envelope"],
  ["Work Area", "working envelope"],
  ["X-Axis Moving Range", "X-axis travel"],
  ["Pass Line Height", "pass line height"],
  ["Board Size", "board size"],
  ["PCB Size", "board size"],
  ["Temperature Range", "temperature range"],
  ["Power Consumption", "power draw"],
  ["Power", "power draw"],
  ["Voltage", "supply voltage"],
  ["Dimensions", "footprint"],
  ["Weight", "weight"],
  ["Repeatability", "repeatability"],
  ["Payload", "payload"],
  ["Program Storage Capacity", "program capacity"],
  ["Teaching Method", "teaching method"],
  ["Solder Wire Diameter", "solder wire diameter"],
  ["Interface", "line interface"],
] as const;

function specValue(product: Product, key: string): string | null {
  const specs = product.specs as Record<string, unknown> | undefined;
  if (!specs) return null;
  const hit = Object.entries(specs).find(
    ([k, v]) =>
      k.toLowerCase() === key.toLowerCase() &&
      (typeof v === "string" || typeof v === "number") &&
      String(v).trim() !== ""
  );
  return hit ? String(hit[1]) : null;
}

export function modelFaqs(product: Product, cat: CategoryMeta | undefined): Faq[] {
  const faqs: Faq[] = [];
  const name = product.title;

  // 1. Specification questions — a restatement of the table, phrased the way
  //    people search. These are the ones an answer engine can lift verbatim.
  for (const [key, phrase] of NOTABLE) {
    if (faqs.length >= 3) break;
    const value = specValue(product, key);
    if (!value) continue;
    faqs.push({
      q: `What is the ${phrase} of the ${name}?`,
      a: `${specLabel(key)}: ${value}. The full specification table for the ${name} is published on this page — we do not keep specs in PDFs or images.`,
    });
  }

  // 2. Pricing — asked constantly, answered by nobody in this market.
  faqs.push({
    q: `How much does the ${name} cost?`,
    a: `Price depends on the configuration rather than the base machine — tooling, fixturing, feeders and options move it more than the model does. Tell us the part and the volume and we will send the range for a build that suits it, along with lead time from US stock.`,
  });

  // 3. Availability and support — the distributor's actual differentiator.
  faqs.push({
    q: `What is the lead time on the ${name}?`,
    a: `PROMATION USA holds ${cat ? cat.label.toLowerCase() : "these systems"} in US stock, so a lead time is usually a delivery date rather than an ocean shipment. Configuration and testing happen here before the machine ships, and the engineers who set it up are the ones who support it afterwards.`,
  });

  // 4. Evaluation — the proof-of-concept offer, per model.
  faqs.push({
    q: `Can we see the ${name} run our part before we buy?`,
    a: `Yes. Send us the board, the fluid or the fastener and our IPC-certified engineers will run it on the ${name}, film the result, and return cycle times and joint quality alongside a quote. There is no cost and no obligation.`,
  });

  // 5. Integration, where the category makes it the obvious question.
  if (cat?.key === "pcb-handling") {
    faqs.push({
      q: `Is the ${name} SMEMA compatible?`,
      a: `Yes. SMEMA handshaking is standard across the PCB handling range, so the ${name} drops into an existing line alongside other manufacturers' printers, placement and reflow equipment without custom integration work.`,
    });
  }

  return faqs.slice(0, 6);
}

/** The category definition block, reused on model pages as citable context. */
export function categoryDefinition(cat: CategoryMeta | undefined): string | null {
  if (!cat) return null;
  return categoryContent[cat.key]?.definition ?? null;
}
