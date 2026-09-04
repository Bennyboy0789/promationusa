import type { Metadata } from "next";
import { WorkTableConfigurator } from "@/components/WorkTableConfigurator";

/**
 * Prototype requested by Mike on the website review call: a configurator for
 * the most option-heavy product PROMATION builds — the inspection station /
 * work table ("overhead lights, or no lights, or rear parts trays, or swing
 * arms... widths, lengths, and conveyance type").
 *
 * Deliberately unlinked: not in the nav, not in the sitemap, and noindexed.
 * It exists so the team can react to a working page before the sales process
 * is asked to absorb it. Option ranges are indicative until engineering
 * confirms them — the page says so on its face.
 */
export const metadata: Metadata = {
  title: "Work Table Configurator",
  description:
    "Configure a PROMATION inspection station / work table — conveyance, width, length, lighting and accessories.",
  robots: { index: false, follow: false },
};

export default function WorkTableConfiguratorPage() {
  return <WorkTableConfigurator />;
}
