/**
 * Ad landing pages.
 *
 * The audit's relaunch gate was explicit: ads never land on the current site.
 * These are the pages they land on instead — one per product line plus the
 * offer, built to the wireframe: minimal header, a headline that matches the
 * ad query verbatim, three proof points, a short RFQ above the fold, one spec
 * or model block, and a single repeated CTA.
 *
 * All of them are `noindex`. A landing page duplicates the category page it
 * shadows, and letting both compete in organic search is how you lose the
 * category page you actually want ranking.
 */

export type LandingPage = {
  slug: string;
  /** Matches the ad group's query intent, verbatim where possible. */
  headline: string;
  subhead: string;
  metaTitle: string;
  /** Three, no more — the wireframe is deliberate about this. */
  proof: string[];
  /** Category key whose models are shown. */
  category: string;
  /** The one thing this page asks for. */
  cta: { label: string; href: string };
  bullets: { heading: string; body: string }[];
};

const COMMON_PROOF = [
  "Held in US stock — lead time is a delivery date",
  "Configured and run on your part by IPC-certified engineers",
  "Free proof of concept before you commit",
];

export const landingPages: LandingPage[] = [
  {
    slug: "robotic-soldering",
    headline: "Robotic soldering systems, in US stock",
    subhead:
      "Benchtop and in-line selective soldering — iron tip, laser and hot bar. Send us your board and we will run it before you buy.",
    metaTitle: "Robotic Soldering Systems — US Stock",
    proof: COMMON_PROOF,
    category: "soldering",
    cta: { label: "Get a quote", href: "/contact" },
    bullets: [
      {
        heading: "Single or dual head",
        body: "A second head roughly halves cycle time on high-joint-count boards — cheaper than a second machine.",
      },
      {
        heading: "Iron tip or laser",
        body: "Contact heat for accessible joints with real thermal mass; laser for heat-sensitive parts and joints a tip cannot reach.",
      },
      {
        heading: "Proven on your board first",
        body: "We run your actual assembly, film it, and return cycle times and joint quality with the quote.",
      },
    ],
  },
  {
    slug: "robotic-screw-driving",
    headline: "Automated screw driving robots",
    subhead:
      "Auto-feed, torque-controlled screw driving with a per-fastener record. US stock, US support, and a trial on your part.",
    metaTitle: "Automated Screw Driving Robots — US Stock",
    proof: COMMON_PROOF,
    category: "screw-driving",
    cta: { label: "Get a quote", href: "/contact" },
    bullets: [
      {
        heading: "Feed reliability first",
        body: "The feeder decides whether a cell runs unattended. We select it against a sample of your actual fastener, not a part number.",
      },
      {
        heading: "Torque and angle logged",
        body: "Every fastener recorded — the difference between assembling a product and being able to prove you assembled it correctly.",
      },
      {
        heading: "Benchtop, not a project",
        body: "The most affordable robotic assembly step most manufacturers will buy, and the quickest to get into production.",
      },
    ],
  },
  {
    slug: "robotic-dispensing",
    headline: "Precision dispensing robots",
    subhead:
      "Adhesives, coatings, potting and solder paste. We match the valve to your fluid and dispense it before you buy.",
    metaTitle: "Precision Dispensing Robots — US Stock",
    proof: COMMON_PROOF,
    category: "dispensing",
    cta: { label: "Get a quote", href: "/contact" },
    bullets: [
      {
        heading: "The valve is the decision",
        body: "Viscosity, filler content and pot life determine the valve, and the valve determines most of the quote. Send us the fluid.",
      },
      {
        heading: "Dots, beads, fills and spray",
        body: "One platform covers most electronics dispensing with a valve change rather than a second machine.",
      },
      {
        heading: "Tested on your material",
        body: "We dispense your actual fluid on your actual part and show you the result first.",
      },
    ],
  },
  {
    slug: "pcb-handling",
    headline: "PCB handling and conveyor systems",
    subhead:
      "Loaders, conveyors, buffers, turners and inverters. SMEMA compatible, priced per station, held in US stock.",
    metaTitle: "PCB Handling & Conveyor Systems — US Stock",
    proof: COMMON_PROOF,
    category: "pcb-handling",
    cta: { label: "Get a quote", href: "/contact" },
    bullets: [
      {
        heading: "SMEMA compatible",
        body: "Drops into an existing line alongside other manufacturers' printers, placement and reflow equipment.",
      },
      {
        heading: "Priced per station",
        body: "Build toward the bottleneck rather than specifying a whole line at once.",
      },
      {
        heading: "Stops the waiting",
        body: "Handling equipment does not make a process faster — it stops your expensive machines idling between them.",
      },
    ],
  },
  {
    slug: "pcb-laser-marking",
    headline: "PCB laser marking machines",
    subhead:
      "Permanent, high-contrast 2D codes and serials that survive wash and reflow. Test-marked on your substrate first.",
    metaTitle: "PCB Laser Marking Machines — US Stock",
    proof: COMMON_PROOF,
    category: "laser-marking",
    cta: { label: "Get a quote", href: "/contact" },
    bullets: [
      {
        heading: "Marks that survive the process",
        body: "A laser mark is a permanent change to the surface, so it outlasts the aqueous wash and thermal cycles that lift labels.",
      },
      {
        heading: "Fiber, CO2 or UV",
        body: "The substrate decides the source. We test-mark your actual material before specifying anything.",
      },
      {
        heading: "Built for traceability",
        body: "Serial generation, database connection and verification — the parts that turn a mark into a traceability programme.",
      },
    ],
  },
  {
    slug: "collaborative-robots",
    headline: "Collaborative robots for electronics assembly",
    subhead:
      "TechMan cobots with built-in vision, TM5 through TM20. Integrated and supported in the US.",
    metaTitle: "Collaborative Robots for Electronics Assembly",
    proof: COMMON_PROOF,
    category: "cobots",
    cta: { label: "Get a quote", href: "/contact" },
    bullets: [
      {
        heading: "Vision built into the arm",
        body: "Alignment and inspection without a separate camera integration project.",
      },
      {
        heading: "Taught, not programmed",
        body: "Hand-guiding and a flow-based interface, so a manufacturing engineer can build a working task without robot code.",
      },
      {
        heading: "Sized to the real payload",
        body: "Part plus gripper plus cable at full reach — the number first-time buyers usually get wrong.",
      },
    ],
  },
  {
    slug: "free-pcb-trial",
    headline: "Send us your board. We will run it free.",
    subhead:
      "Before you commit to a machine, watch it run your actual part. Cycle times, joint quality, footage and a quote — no cost, no obligation.",
    metaTitle: "Free PCB Trial — See It Run Your Board",
    proof: [
      "Your actual board, not a demo piece",
      "Run by IPC-certified engineers in our Kenosha lab",
      "Footage, cycle times and a quote returned",
    ],
    category: "soldering",
    cta: { label: "Request the trial", href: "/pcb-trial" },
    bullets: [
      {
        heading: "Send us the part",
        body: "Ship the assembly — or the fluid, the fastener, the part you need marked — and tell us the process you are trying to automate.",
      },
      {
        heading: "We run it and film it",
        body: "Our engineers set up the machine you are evaluating, run your actual part, and record the result.",
      },
      {
        heading: "You get the numbers",
        body: "Cycle times, joint quality, footage of the run, and a quote for the configuration that produced it.",
      },
    ],
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((l) => l.slug === slug);
}
