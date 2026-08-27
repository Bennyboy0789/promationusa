/**
 * Comparison and alternatives pages.
 *
 * The audit verified these SERPs are effectively empty: no OEM will name a
 * rival, and no distributor had bothered. That is the opening.
 *
 * **What is and is not asserted here.** Every statement about a competitor is
 * either something they publish about themselves or something the competitive
 * research directly observed (site size, whether specs are in HTML or locked in
 * PDFs, distribution model, SERP presence). No competitor specification is
 * reproduced, because we have not verified any competitor specification — and a
 * comparison table with invented figures is both a credibility risk and a legal
 * one. Where a spec-for-spec answer is needed, the page says to get it from the
 * vendor and offers to run the part instead, which is the more useful answer
 * anyway.
 *
 * Competitors are described fairly. A page that reads as a hatchet job
 * convinces nobody and reflects badly on the company publishing it.
 */

export type Comparison = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  /** Self-contained answer, written to be quotable. */
  summary: string;
  /** Category key, for cross-linking. */
  category: string;
  them: {
    name: string;
    maker: string;
    /** Verifiable strengths — stated plainly, not grudgingly. */
    strengths: string[];
    /** Where a US buyer may find them harder to work with. */
    considerations: string[];
  };
  us: {
    name: string;
    /** Slug of the model or category to link to. */
    href: string;
    strengths: string[];
  };
  /** Who should genuinely pick which. */
  verdict: string[];
  faqs: { q: string; a: string }[];
};

const SPEC_NOTE =
  "We do not reproduce another manufacturer's specifications here, because we have not verified them and a comparison table full of second-hand figures helps nobody. Get their numbers from them, get ours from the model page, and if you want the question settled properly, send us the part and we will run it.";

export const comparisons: Comparison[] = [
  {
    slug: "quick-vs-japan-unix-soldering-robots",
    title: "QUICK vs Japan Unix soldering robots",
    metaTitle: "QUICK vs Japan Unix Soldering Robots",
    description:
      "Two established soldering-robot lines, two very different US buying experiences. How to choose between them.",
    summary:
      "Japan Unix is one of the oldest names in robotic soldering and sells into the US through a distributor. QUICK offers a broader model range at a lower price class, and in North America is stocked, configured and supported directly by PROMATION USA. The practical difference for a US buyer is less about the machines than about who answers when one stops.",
    category: "soldering",
    them: {
      name: "Japan Unix",
      maker: "Japan Unix, Tokyo",
      strengths: [
        "Long pedigree — among the first companies to build a dedicated soldering robot",
        "A large and well-maintained body of technical content, mostly in Japanese",
        "Strong engineering reputation in laser and iron soldering",
      ],
      considerations: [
        "Sold into the US through a distributor, so the manufacturer is a step removed from your support path",
        "The English-language pages carry little on-page specification detail and no direct US contact route",
        "Evaluating a machine generally means going through the distributor rather than the factory",
      ],
    },
    us: {
      name: "QUICK soldering robots",
      href: "/robotic-soldering",
      strengths: [
        "Broader model range in this catalogue — single and dual head, iron and laser, benchtop through in-line",
        "Held in US stock, so lead time is a delivery date rather than an ocean shipment",
        "Configured and run on your part in Kenosha before it ships",
        "Supported by the IPC-certified engineers who set it up",
        "Consumables — tips, feed tubes, filters — stocked domestically",
      ],
    },
    verdict: [
      "Choose Japan Unix if you have an existing relationship with their distributor, or a process already qualified on their equipment.",
      "Choose QUICK through PROMATION if you want the machine proven on your board before purchase, a domestic lead time, and support from people who have run the process.",
      "If you are choosing between them for a new line, the fastest way to decide is to send the same board to both and compare the footage.",
    ],
    faqs: [
      {
        q: "Which is better for laser soldering?",
        a: "Both build laser systems. The deciding factor is almost always your joint — access, thermal mass and nearby heat-sensitive parts — rather than the badge. Run the board on whichever machines you are shortlisting.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "apollo-seiko-alternative",
    title: "Apollo Seiko alternatives for robotic soldering",
    metaTitle: "Apollo Seiko Alternatives for Soldering Robots",
    description:
      "What to look at instead of, or alongside, Apollo Seiko — and the questions worth asking during an ownership transition.",
    summary:
      "Apollo Seiko is a long-established Japanese soldering-robot manufacturer with a well-regarded laser line. Buyers looking at alternatives usually want two things it is harder to get from an overseas manufacturer: specifications they can read without opening a PDF, and a support path that does not cross an ocean.",
    category: "soldering",
    them: {
      name: "Apollo Seiko",
      maker: "Apollo Seiko, Japan",
      strengths: [
        "In business since 1969, with deep experience in iron and laser soldering",
        "A recognised laser soldering line",
        "Established reputation among Japanese and US contract manufacturers",
      ],
      considerations: [
        "Much of the specification detail is published as images and PDFs rather than readable page content, which makes comparison slower",
        "Ownership of the business has recently changed hands, which is worth asking about if you are buying a long-life capital asset",
        "US support runs through a channel rather than directly from the manufacturer",
      ],
    },
    us: {
      name: "QUICK and PANDA soldering robots",
      href: "/robotic-soldering",
      strengths: [
        "Specifications published as readable tables on the model page, not locked in PDFs",
        "US stock and a delivery-date lead time",
        "A named North American entity responsible for support, with the engineers who configured the machine",
        "Free proof of concept — we run your board before you commit",
      ],
    },
    verdict: [
      "If continuity of support over a ten-year asset life is a concern, ask any supplier — including us — who will be supporting the machine in five years and what happens if the ownership changes.",
      "If you need a machine qualified quickly on a specific joint, the trial is the shortest path regardless of which brand you end up buying.",
    ],
    faqs: [
      {
        q: "Is Apollo Seiko still supported in the US?",
        a: "That is a question for their US channel, and a fair one to ask directly given the recent ownership change. We would ask the same about any supplier before signing.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "quick-9434-vs-thermaltronics-tmt-r9800s",
    title: "QUICK 9434 vs Thermaltronics TMT-R9800S",
    metaTitle: "QUICK 9434 vs Thermaltronics TMT-R9800S",
    description:
      "Two benchtop soldering robots aimed at similar work. Where each fits, and how to settle it with your own board.",
    summary:
      "The Thermaltronics TMT-R9800S and the QUICK 9434 are both benchtop robotic soldering systems for repetitive through-hole work. Thermaltronics is the better-known US brand name; QUICK offers a wider surrounding range and, through PROMATION, US stock with an applications lab that will run your board before you buy.",
    category: "soldering",
    them: {
      name: "Thermaltronics TMT-R9800S",
      maker: "Thermaltronics",
      strengths: [
        "Recognised US brand with an established hand-soldering reputation",
        "Curie-point heating technology in their iron range, which holds tip temperature without a sensor loop",
        "A reasonably detailed public specification page, including certifications",
      ],
      considerations: [
        "A single robotic model rather than a range, so there is less room to move up or down as needs change",
        "The public evaluation path is largely a downloadable datasheet",
      ],
    },
    us: {
      name: "QUICK 9434 soldering robot",
      href: "/robotic-soldering",
      strengths: [
        "Part of a range — single and dual head, iron and laser, benchtop through in-line — so the process can scale without changing platform",
        "Held in US stock and configured before shipping",
        "Run on your actual board first, with footage and cycle times returned",
        "Consumables stocked domestically and orderable online",
      ],
    },
    verdict: [
      "Choose the Thermaltronics if you already run their irons and want tooling and tip consistency across bench and robot.",
      "Choose the QUICK 9434 if you expect the requirement to grow — a second head, a laser variant, or an in-line move — and want that to happen within one control platform.",
      "Either way, ask both suppliers to run the same board. It is a more honest comparison than either datasheet.",
    ],
    faqs: [
      {
        q: "Which has better joint quality?",
        a: "Joint quality on a correctly set machine is dominated by the joint itself — thermal mass, access, alloy and flux — not by the brand. That is why we test rather than argue about it.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "quick-et-vs-fisnar-dispensing-robots",
    title: "QUICK ET vs Fisnar dispensing robots",
    metaTitle: "QUICK ET vs Fisnar Dispensing Robots",
    description:
      "Two benchtop dispensing platforms. What actually separates them for an electronics assembler.",
    summary:
      "Fisnar is a long-established dispensing brand with a broad accessory ecosystem behind it. The QUICK ET series covers the same benchtop territory at a different price class. For most buyers the platform matters less than the valve, and the valve depends entirely on the fluid — which is why both should be evaluated with your actual material.",
    category: "dispensing",
    them: {
      name: "Fisnar",
      maker: "Fisnar (Ellsworth Adhesives)",
      strengths: [
        "Roughly fifty years in fluid dispensing, with wide brand recognition",
        "Parent company distribution gives easy access to adhesives and accessories alongside the robot",
        "Offers a filmed sample-dispensing service, which is the right way to evaluate",
      ],
      considerations: [
        "Comparatively little published application-level content — the long tail of 'dispensing robot for [application]' is largely unaddressed",
        "Little public pricing guidance",
      ],
    },
    us: {
      name: "QUICK ET dispensing robots",
      href: "/robotic-dispensing",
      strengths: [
        "Full ET and QS benchtop range held in US stock",
        "Valve matched to your fluid rather than sold as a default configuration",
        "Free dispensing trial on your actual material, with the result returned",
        "Configured and tested domestically before shipping",
      ],
    },
    verdict: [
      "If you already buy adhesives through Ellsworth, buying the robot from the same ecosystem has real convenience value.",
      "If the fluid is unusual — filled, thixotropic, short pot life — put it in front of both suppliers and let the dispensed result decide.",
      "For entry-level benchtop work the two are close enough that support and lead time are the sensible tiebreakers.",
    ],
    faqs: [
      {
        q: "Will you test our fluid?",
        a: "Yes, and you should ask the same of any dispensing supplier. Send the fluid and the part; we dispense it and show you the result before you commit to a valve.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "nordson-efd-alternative",
    title: "Nordson EFD alternatives for benchtop dispensing",
    metaTitle: "Nordson EFD Alternatives for Dispensing",
    description:
      "Nordson is the category giant. When a benchtop alternative is the better buy, and what you give up.",
    summary:
      "Nordson EFD is the largest name in fluid dispensing, with the deepest product range and the most extensive application-lab resources in the category. Buyers look for alternatives when the requirement is a single benchtop cell rather than a programme, and when entry-level cost and lead time matter more than breadth of catalogue.",
    category: "dispensing",
    them: {
      name: "Nordson EFD",
      maker: "Nordson Corporation",
      strengths: [
        "By far the broadest dispensing catalogue in the category, with hundreds of product pages",
        "Product selector tooling and extensive application laboratories",
        "The depth of engineering support a very large manufacturer can fund",
      ],
      considerations: [
        "Little or no public pricing or cost guidance, which makes early budgeting difficult",
        "Scaled for programme-level engagements; a single benchtop cell is a small transaction for them",
      ],
    },
    us: {
      name: "QUICK ET and QS dispensing platforms",
      href: "/robotic-dispensing",
      strengths: [
        "Entry-level benchtop focus — the segment where a single cell is the whole requirement",
        "Price range published on request rather than withheld",
        "US stock and a short lead time",
        "Free trial on your fluid and your part",
      ],
    },
    verdict: [
      "Choose Nordson when the requirement spans multiple lines, needs deep process development, or sits inside a larger fluid-handling programme.",
      "Choose a benchtop alternative when you need one cell working on one process quickly, with a cost you can put in a budget this quarter.",
    ],
    faqs: [
      {
        q: "Is a cheaper dispensing robot a false economy?",
        a: "It can be, if the valve is wrong for the fluid. The robot rarely fails; the fluid path is where problems appear. Judge on the dispensed result with your own material, not on the price of the gantry.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "panda-vs-asys-insignum-laser-marking",
    title: "PANDA vs ASYS INSIGNUM laser marking",
    metaTitle: "PANDA vs ASYS INSIGNUM Laser Marking",
    description:
      "Two PCB laser marking options for a traceability programme, and what separates them for a North American buyer.",
    summary:
      "ASYS is the established European name in PCB laser marking, with a multi-model INSIGNUM range and a US subsidiary. PANDA Robotics is the US-engineered alternative in this catalogue. Both mark permanently; the differences that usually decide it are engineering location, support path and how quickly a machine can be seen running your board.",
    category: "laser-marking",
    them: {
      name: "ASYS INSIGNUM",
      maker: "ASYS Group, Germany",
      strengths: [
        "The most visible name in PCB laser marking search results, and a genuinely deep marking range",
        "Multiple models across the INSIGNUM line covering different formats",
        "A US subsidiary providing regional presence",
      ],
      considerations: [
        "Premium price positioning",
        "Comparatively little educational or traceability-methodology content published publicly",
        "Their site restricts non-browser access, which makes their content harder for AI assistants to cite when a buyer researches the category",
      ],
    },
    us: {
      name: "PANDA laser marking",
      href: "/laser-marking",
      strengths: [
        "Designed and engineered in the USA, so design and support questions go to one organisation",
        "Vision alignment and network connectivity built in, with remote diagnostic support",
        "Recognised in the 2025 TITAN Innovation Awards",
        "Test-marked on your own substrate before you buy",
      ],
    },
    verdict: [
      "Choose INSIGNUM where you already run ASYS line equipment and want a single vendor across the line.",
      "Choose PANDA where domestic engineering, a short support path and a same-week test mark matter more than European line-integration breadth.",
      "In both cases, insist on a test mark on your actual substrate. Contrast and legibility vary far more by material than by machine.",
    ],
    faqs: [
      {
        q: "Which laser type will we need?",
        a: "The substrate decides — fiber for metal and most components, CO2 for organics and some coatings, UV where thermal effect must be minimal. See the source comparison guide, then send us the material.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "yj-link-alternative",
    title: "YJ Link alternatives for PCB handling",
    metaTitle: "YJ Link Alternatives for PCB Handling",
    description:
      "A US-stocked, SMEMA-compatible handling alternative for buyers who cannot get English documentation or local support.",
    summary:
      "YJ Link is a capable Korean manufacturer of PCB handling equipment with a genuine installed base at large electronics manufacturers. For a US buyer the practical difficulty is documentation and support: very little of their material is published in English, and there is no direct US sales or service presence.",
    category: "pcb-handling",
    them: {
      name: "YJ Link",
      maker: "YJ Link, South Korea",
      strengths: [
        "Broad hardware range across conveyors, loaders and handling stations",
        "Installed at large-scale electronics manufacturers",
        "Visible presence at industry trade shows",
      ],
      considerations: [
        "Very limited English-language documentation, which slows specification and comparison",
        "No direct US sales or service organisation — support goes through representatives",
        "Harder to evaluate remotely before committing",
      ],
    },
    us: {
      name: "PROMATION PCB handling",
      href: "/pcb-handling",
      strengths: [
        "Full handling range — loaders, conveyors, buffers, turners, inverters, inspection stations",
        "SMEMA compatible, so it drops into a mixed-vendor line",
        "English specifications published as readable tables on each model page",
        "Held in US stock with domestic service",
      ],
    },
    verdict: [
      "If you already run YJ Link equipment and have a working representative relationship, continuity has value.",
      "If you are specifying a new line and need documentation your engineers can read and support you can reach the same day, a US-stocked alternative is the simpler path.",
    ],
    faqs: [
      {
        q: "Will your conveyors work alongside our existing YJ Link equipment?",
        a: "Yes, provided pass line height and board envelope match. SMEMA handshaking is standard on our range, which is what allows mixed-vendor lines to work.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "nutek-alternative",
    title: "Nutek alternatives for PCB handling",
    metaTitle: "Nutek Alternatives for PCB Handling",
    description:
      "For lines already running Nutek handling equipment, or specifying a replacement with US support.",
    summary:
      "Nutek has a long-standing reputation and one of the broadest PCB handling catalogues in the market, with a substantial installed base at large manufacturers. US buyers increasingly look for alternatives because the domestic distribution and support picture has become harder to navigate.",
    category: "pcb-handling",
    them: {
      name: "Nutek",
      maker: "Nutek, Singapore",
      strengths: [
        "Decades of experience and a very broad handling catalogue",
        "Large installed base including major manufacturers",
        "Well-regarded mechanical engineering",
      ],
      considerations: [
        "US distribution and support have been difficult to reach reliably",
        "Buyers with an existing installed base report uncertainty about parts and service routes",
      ],
    },
    us: {
      name: "PROMATION PCB handling",
      href: "/pcb-handling",
      strengths: [
        "Equivalent station types across the loading, conveying, buffering and unloading range",
        "SMEMA compatible, so individual stations can replace existing ones without rebuilding the line",
        "US stock, US service, and a stated lead time",
        "Stations priced individually so a line can be replaced in stages rather than all at once",
      ],
    },
    verdict: [
      "If you run Nutek equipment and need a station replaced or added, SMEMA compatibility means you can mix rather than rebuild.",
      "If you are specifying a new line, the decision comes down to which supplier you can actually reach when a station stops.",
    ],
    faqs: [
      {
        q: "Can we replace one Nutek station rather than the whole line?",
        a: "Usually yes. Confirm pass line height and board envelope, and a SMEMA-compatible station will slot in alongside the equipment either side.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "cti-systems-alternative",
    title: "CTI Systems alternatives for PCB handling",
    metaTitle: "CTI Systems Alternatives for PCB Handling",
    description:
      "Both are US-supported. What separates them is catalogue breadth and how a machine is evaluated before purchase.",
    summary:
      "CTI Systems is a US manufacturer of PCB handling equipment with a made-in-USA story and decades of service depth — a genuine advantage for buyers with domestic-content requirements. The comparison with PROMATION is not about support location, since both are US-supported, but about range and how the equipment can be evaluated first.",
    category: "pcb-handling",
    them: {
      name: "CTI Systems",
      maker: "CTI Systems, North Carolina",
      strengths: [
        "US manufacturing, which matters for defence and domestic-content requirements",
        "Decades of experience with parts and service depth",
        "Direct relationship with the manufacturer",
      ],
      considerations: [
        "A comparatively small published catalogue, which makes remote specification harder",
        "Limited public technical documentation for engineers comparing options",
      ],
    },
    us: {
      name: "PROMATION PCB handling",
      href: "/pcb-handling",
      strengths: [
        "Broader published range across the full handling sequence",
        "Full specifications published per model as readable tables",
        "Applications lab — the equipment can be seen running before purchase",
        "US stock and IPC-certified configuration",
      ],
    },
    verdict: [
      "If domestic manufacture is a contractual requirement, that is a real and legitimate reason to choose a US-built machine.",
      "If breadth of range and the ability to evaluate before buying matter more, the larger published catalogue is easier to specify against.",
    ],
    faqs: [
      {
        q: "Is your equipment made in the USA?",
        a: "It is held, configured, tested and supported in the USA, and some of the range is US-engineered. If you have a specific domestic-content requirement, tell us the clause and we will tell you plainly whether we meet it.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "flexlink-alternative",
    title: "FlexLink alternatives for PCB handling",
    metaTitle: "FlexLink Alternatives for PCB Handling",
    description:
      "FlexLink sells line-scale conveyor projects. When machine-level handling equipment is the better fit.",
    summary:
      "FlexLink is a large, well-resourced conveyor and automation company operating at line and factory scale. Buyers look for alternatives when the requirement is machine-level — a loader here, a buffer there — rather than a project, and when they want individual stations priced and delivered rather than a system designed.",
    category: "pcb-handling",
    them: {
      name: "FlexLink",
      maker: "FlexLink (Coesia Group)",
      strengths: [
        "Very large engineering and project-delivery capability",
        "Strong at factory-scale material flow and multi-line integration",
        "Global presence and enterprise credibility",
      ],
      considerations: [
        "Oriented toward line-scale and project-scale engagements rather than individual stations",
        "Less suited to a buyer who wants one conveyor delivered next month",
      ],
    },
    us: {
      name: "PROMATION PCB handling",
      href: "/pcb-handling",
      strengths: [
        "Stations priced and sold individually, so a line can grow toward the bottleneck",
        "SMEMA compatible with mixed-vendor lines",
        "US stock and short lead times on standard stations",
        "Specifications published per station",
      ],
    },
    verdict: [
      "Choose FlexLink for a factory-scale material-flow project where system design is the deliverable.",
      "Choose station-level handling when you know which machine is waiting and want that fixed without a project.",
    ],
    faqs: [
      {
        q: "Can we buy just one conveyor?",
        a: "Yes. Every station is priced and integrated independently, which is the normal way our customers build up a line.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "gpd-global-alternative",
    title: "GPD Global alternatives for dispensing",
    metaTitle: "GPD Global Alternatives for Dispensing",
    description:
      "GPD Global sits at the premium end. When an entry-level benchtop platform is the right purchase instead.",
    summary:
      "GPD Global builds well-regarded premium dispensing equipment and publishes some of the best application-level content in the category. Buyers look for alternatives when the requirement is entry-level benchtop dispensing rather than a premium platform, and when budget rather than capability is the binding constraint.",
    category: "dispensing",
    them: {
      name: "GPD Global",
      maker: "GPD Global, Colorado",
      strengths: [
        "Strong premium dispensing platforms with a good engineering reputation",
        "Genuinely useful published application content and video library",
        "US manufacturing and support",
      ],
      considerations: [
        "Premium positioning, which leaves the entry-level benchtop segment largely unaddressed",
        "Little public price anchoring",
      ],
    },
    us: {
      name: "QUICK ET and QS dispensing platforms",
      href: "/robotic-dispensing",
      strengths: [
        "Entry-level benchtop focus — designed for a first dispensing robot",
        "Price range shared on request",
        "US stock with a short lead time",
        "Free trial on your fluid before purchase",
      ],
    },
    verdict: [
      "Choose GPD Global where the application is demanding enough to need a premium platform and the budget supports it.",
      "Choose an entry-level benchtop platform for a first dispensing cell, or where the process is well understood and the requirement is repeatability rather than capability headroom.",
    ],
    faqs: [
      {
        q: "What do we give up at the entry level?",
        a: "Generally throughput headroom, some valve options and the very tightest volume tolerances. For dots, beads and conformal coating on electronics assemblies, that headroom often goes unused. Test with your fluid and find out before paying for it.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "janome-screw-driving-alternative",
    title: "Janome and desktop screw driving alternatives",
    metaTitle: "Janome Screw Driving Robot Alternatives",
    description:
      "Established desktop robot brands versus a turnkey screw driving cell with the feeder specified to your fastener.",
    summary:
      "Janome is a well-known desktop robot manufacturer whose arms are widely used for screw driving among other tasks. The distinction worth understanding is between buying a general-purpose desktop robot and buying a screw driving cell — where the feeder, driver and fixturing are specified together against your actual fastener.",
    category: "screw-driving",
    them: {
      name: "Janome desktop robots",
      maker: "Janome",
      strengths: [
        "Long-established, widely used desktop robot platform",
        "Flexible — the same arm handles dispensing, screw driving and other tasks",
        "Large existing user base and familiarity",
      ],
      considerations: [
        "Sold as a robot rather than as a screw driving system, so feeder and driver selection is often left to the buyer or an integrator",
        "Feed reliability against your specific fastener is the hard part, and it is not solved by the arm",
      ],
    },
    us: {
      name: "PROMATION screw driving cells",
      href: "/robotic-screw-driving",
      strengths: [
        "Sold as a cell — feeder, driver, fixturing and controller specified together",
        "Feeder selected against a sample of your actual fastener, not a part number",
        "Torque and angle recorded per fastener for traceability",
        "US stock, US support, and a trial on your part before purchase",
      ],
    },
    verdict: [
      "Choose a general-purpose desktop robot if the arm will do several different jobs and you have integration capability in house.",
      "Choose a turnkey cell if screw driving is the job and you want feed reliability to be the supplier's problem rather than yours.",
      "Either way, send a sample fastener before ordering. Feeders are where these projects succeed or fail.",
    ],
    faqs: [
      {
        q: "Why does the feeder matter so much?",
        a: "A cell that jams every couple of hundred cycles needs a person watching it, which removes the reason you bought it. Head geometry, length-to-diameter ratio and coating all affect feeding in ways a datasheet will not tell you.",
      },
      { q: "Can I compare specifications directly?", a: SPEC_NOTE },
    ],
  },
  {
    slug: "quick-vs-panda-soldering-robots",
    title: "QUICK vs PANDA soldering robots",
    metaTitle: "QUICK vs PANDA Soldering Robots",
    description:
      "Both lines are stocked and supported by PROMATION. An honest comparison of which one fits your process.",
    summary:
      "QUICK and PANDA are both stocked and supported by PROMATION USA, so this is a comparison without a sales preference attached. QUICK offers the broader model range and the lower entry point; PANDA is US-engineered with vision alignment and remote support built in. Which one fits depends on process complexity and how much of your support you want domestic.",
    category: "soldering",
    them: {
      name: "QUICK soldering robots",
      maker: "QUICK",
      strengths: [
        "The broadest range in this catalogue — single and dual head, iron and laser, benchtop to in-line",
        "The lower entry price of the two lines",
        "Well-proven, with domestically stocked consumables",
      ],
      considerations: [
        "Manufactured overseas, so engineering-level design questions route through the manufacturer",
      ],
    },
    us: {
      name: "PANDA soldering robots",
      href: "/laser-marking",
      strengths: [
        "Designed and engineered in the USA",
        "Vision alignment and network connectivity as standard, with remote diagnostic support",
        "Recognised in the 2025 TITAN Innovation Awards",
        "Same organisation for design questions and support",
      ],
    },
    verdict: [
      "Choose QUICK for the widest choice of configuration and the lowest entry point, particularly for straightforward repetitive work.",
      "Choose PANDA where board variation makes vision alignment valuable, where remote diagnostics matter, or where US engineering is a procurement preference.",
      "We stock both, so ask us to run your board on each and send the footage. There is no wrong answer for us here.",
    ],
    faqs: [
      {
        q: "Which do you recommend?",
        a: "It depends on the board. We stock both lines, so we have no incentive to steer you — send us the assembly and we will tell you which one produced the better result, with the footage to back it.",
      },
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
