/**
 * Buyer's guides and cost guides.
 *
 * The audit found this is the page type winning every non-branded category
 * query PROMATION currently loses, and that cost questions have no credible
 * answer anywhere in the market — a gap a distributor can fill and a
 * manufacturer structurally cannot.
 *
 * **On prices.** No guide states a dollar figure. PROMATION has not confirmed
 * whether they will publish bands, and inventing one would be worse than
 * useless — a buyer who is quoted differently stops trusting the whole site.
 * The guides instead explain what moves the price, what the relative cost
 * classes are, and commit to a range on request. If PROMATION approves bands,
 * the `priceNote` on each guide is the single place they drop in.
 */

export type GuideSection = { heading: string; body: string[] };

export type Guide = {
  slug: string;
  title: string;
  /** SERP title; kept under 60 characters with the brand suffix dropped. */
  metaTitle: string;
  description: string;
  /** Self-contained answer for featured snippets and answer engines. */
  definition: string;
  kind: "cost" | "buyers" | "decision" | "technical";
  /** Category key this guide belongs to, for cross-linking. */
  category?: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  priceNote?: string;
};

const RANGE_ON_REQUEST =
  "We publish a range per model on request rather than a headline figure, because the configuration moves the number more than the machine does. Tell us the part and the volume and we will send the band for a build that actually suits it.";

export const guides: Guide[] = [
  // ---------------------------------------------------------------- cost ---
  {
    slug: "how-much-does-a-robotic-soldering-machine-cost",
    title: "How much does a robotic soldering machine cost?",
    metaTitle: "How Much Does a Robotic Soldering Machine Cost?",
    description:
      "What actually drives the price of a soldering robot — head type, axes, vision, nitrogen and fixturing — and how the cost classes compare.",
    definition:
      "A robotic soldering machine's price is set less by the base machine than by its configuration. Head type (iron or laser), number of heads, vision alignment, nitrogen, fume extraction and part-specific fixturing each move the figure, and a benchtop cell and an in-line selective system are different cost classes entirely.",
    kind: "cost",
    category: "soldering",
    priceNote: RANGE_ON_REQUEST,
    sections: [
      {
        heading: "The three cost classes",
        body: [
          "Benchtop single-head cells are the entry point — one iron head, a fixed work area, manual load and unload. They suit repetitive through-hole work on a bench where an operator currently sits.",
          "Dual-head and vision-equipped benchtop systems sit above that. A second head roughly halves cycle time on high-joint-count boards, and vision alignment earns its cost the moment board warpage or panel variation starts producing missed joints.",
          "In-line selective systems are a different purchase altogether: SMEMA-integrated, conveyorised, running unattended between a printer and reflow. These are line investments, not bench investments, and are priced accordingly.",
        ],
      },
      {
        heading: "What moves the price most",
        body: [
          "Fixturing is the cost most buyers underestimate. A machine runs a taught path; holding your board flat and repeatably in the same position is what makes that path produce the same joint every time. Fixture cost scales with board complexity and mix.",
          "Laser heads cost more than iron tips and are worth it when joints are heat-sensitive, tightly pitched, or physically unreachable by a tip. Many lines end up running both.",
          "Nitrogen improves wetting and reduces dross but adds a gas supply and its running cost. It is a process decision rather than a default.",
          "Vision, fume extraction, solder-feed monitoring and safety enclosure are each optional and each real money.",
        ],
      },
      {
        heading: "The costs that are not the machine",
        body: [
          "Consumables — tips, feed tubes, filters — are an ongoing line item. Tip life depends on temperature, alloy and duty cycle more than on brand.",
          "Training and integration time. A machine that sits unused because nobody was trained is the most expensive outcome available.",
          "Support distance. An imported machine bought direct is cheaper on paper; the cost appears the first time it stops and the engineer who can help is eight time zones away.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a soldering robot cheaper than an operator?",
        a: "The comparison that matters is not machine versus wage but machine versus wage plus rework plus the cost of not being able to hire. Lines running repetitive through-hole work with a shortage of experienced hand-solder operators tend to justify a benchtop cell quickly. Low-mix, low-joint-count work often does not.",
      },
      {
        q: "What is the cheapest way to start?",
        a: "A single-head benchtop cell on your highest-volume, most repetitive board. Prove the process on one job, then extend. Buying a line-scale system to automate a bench-scale problem is the most common expensive mistake in this category.",
      },
      {
        q: "Do you publish prices?",
        a: RANGE_ON_REQUEST,
      },
    ],
  },
  {
    slug: "how-much-does-a-dispensing-robot-cost",
    title: "How much does a dispensing robot cost?",
    metaTitle: "How Much Does a Dispensing Robot Cost?",
    description:
      "Why the valve often costs more than the motion platform, and what actually drives the price of an automated dispensing system.",
    definition:
      "For a dispensing robot the valve is frequently a larger cost driver than the robot. The motion platform is comparatively standardised; matching a valve to your fluid's viscosity, filler content and cure behaviour is the engineering, and it is what the quote turns on.",
    kind: "cost",
    category: "dispensing",
    priceNote: RANGE_ON_REQUEST,
    sections: [
      {
        heading: "Valve first, robot second",
        body: [
          "Time-pressure valves are the simplest and cheapest, and adequate for stable, low-viscosity fluids where shot-to-shot variation of a few percent is acceptable.",
          "Auger and progressive-cavity valves hold volume far more tightly and handle filled or thixotropic materials, at a step up in cost and maintenance.",
          "Jetting valves dispense without touching the surface, reaching places a needle cannot and running faster. They are the top of the range and are specified for a reason, not by default.",
        ],
      },
      {
        heading: "What else is in the number",
        body: [
          "Heated valves and heated reservoirs for materials whose viscosity is temperature-sensitive.",
          "Height sensing or vision, which keeps standoff constant across a warped or variable-height assembly.",
          "Fixturing, again — a bead is only repeatable if the part is.",
          "Two-part meter-mix systems for potting are a materially different class from single-component dispensing.",
        ],
      },
      {
        heading: "Benchtop versus in-line",
        body: [
          "Benchtop cells cover most electronics applications: conformal coating on a panel, glue dots, gasketing, potting a small assembly.",
          "In-line systems justify themselves when dispensing must keep pace with an existing conveyorised line rather than run as a separate operation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which valve do we need?",
        a: "Viscosity, filler content, pot life and the shape you need — dot, bead, fill or spray — decide it. Send us the fluid and the part; we will dispense it and show you the result before you commit to a valve.",
      },
      {
        q: "Can one machine do potting, gasketing and glue dots?",
        a: "Often yes, with valve changes rather than separate machines, provided the volumes and tolerances are in the same class. Where they are not we will say so — running one machine badly across three jobs costs more than it saves.",
      },
      { q: "Do you publish prices?", a: RANGE_ON_REQUEST },
    ],
  },
  {
    slug: "how-much-does-a-screw-driving-robot-cost",
    title: "How much does a screw driving robot cost?",
    metaTitle: "How Much Does a Screw Driving Robot Cost?",
    description:
      "Benchtop screw driving is the most affordable robotic assembly step most manufacturers will buy. What sets the price, and what imports leave out.",
    definition:
      "A benchtop auto-feed screw driving cell is typically the most affordable robotic assembly step a manufacturer will buy — materially below the cost of a cobot-based cell doing the same job. The price is set by the feeder, the driver's torque range and the fixturing, not by the gantry.",
    kind: "cost",
    category: "screw-driving",
    priceNote: RANGE_ON_REQUEST,
    sections: [
      {
        heading: "The feeder decides more than the driver",
        body: [
          "Feed reliability, not driving, is what makes or breaks a screw-driving cell. A feeder that jams on your fastener every two hundred cycles turns an unattended process back into a supervised one.",
          "Fastener geometry — head type, length-to-diameter ratio, coating, whether it is captive — determines which feeder works. This is why we ask for a sample rather than a part number.",
        ],
      },
      {
        heading: "Torque control and traceability",
        body: [
          "A driver that reports torque and angle per fastener is the difference between assembling a product and being able to prove you assembled it correctly. For automotive, medical and defence work that record is a requirement rather than a feature.",
          "Torque range must bracket your fastener with margin at both ends; a driver at the top of its range is a driver that drifts.",
        ],
      },
      {
        heading: "What the import price leaves out",
        body: [
          "Chinese imports anchor the price expectation for this class of machine, and the machines themselves are often the same class we sell.",
          "The difference in what you pay is US stock, a lead time that is a delivery date, an applications lab that proves the machine on your part before purchase, and support from the engineers who configured it. Whether that difference is worth it depends on how much an unsupported stoppage costs you.",
        ],
      },
    ],
    faqs: [
      {
        q: "Benchtop cell or a cobot?",
        a: "A benchtop cell is faster to deploy, cheaper and more repeatable when the work stays in one fixture. A cobot earns its cost when the same arm must serve several stations or reach parts a fixed gantry cannot. Most electronics assembly we see is the former.",
      },
      {
        q: "Will it handle our screw size and torque range?",
        a: "The honest answer needs the screw. Send us a sample with the target torque and we will confirm feed reliability — the feeder, not the driver, is what usually decides whether a fastener automates well.",
      },
      { q: "Do you publish prices?", a: RANGE_ON_REQUEST },
    ],
  },
  {
    slug: "how-much-does-pcb-handling-equipment-cost",
    title: "How much does PCB handling equipment cost?",
    metaTitle: "How Much Does PCB Handling Equipment Cost?",
    description:
      "Conveyors, loaders, buffers and inverters are priced per station. What each one costs you to leave out is usually the bigger number.",
    definition:
      "PCB handling is priced per station rather than per line, which means it can be staged. A single transfer conveyor is a small purchase; a full magazine-loader-to-unloader configuration is set by lane count, length, board size and whether SMEMA integration and traceability are required.",
    kind: "cost",
    category: "pcb-handling",
    priceNote: RANGE_ON_REQUEST,
    sections: [
      {
        heading: "Priced per station, so buy in stages",
        body: [
          "Most lines are not rebuilt at once. Adding a magazine loader at the front removes one operator from a bench; adding a buffer between two processes stops the faster one idling.",
          "Because each station is separately priced and SMEMA-compatible, the build order can follow the bottleneck rather than a masterplan.",
        ],
      },
      {
        heading: "What changes the number",
        body: [
          "Lane count. Dual-lane doubles throughput and costs accordingly.",
          "Board size envelope, especially oversized, very thin or heavy assemblies, which need different support and clamping.",
          "Motorised width adjustment versus manual — worth it as soon as changeovers are frequent.",
          "Traceability: barcode scanning and data capture add hardware and integration.",
        ],
      },
      {
        heading: "The cost of not automating handling",
        body: [
          "Handling equipment rarely improves the process it feeds — it improves the utilisation of everything around it. A printer waiting on an operator is an expensive machine running at a fraction of its capacity.",
          "The honest way to size this is to measure how long your placement or reflow equipment spends waiting.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is your handling equipment SMEMA compatible?",
        a: "Yes. SMEMA handshaking is standard across the range, so machines drop into existing lines alongside other manufacturers' printers, placement and reflow equipment without custom integration work.",
      },
      {
        q: "Can we start with one conveyor and add later?",
        a: "That is the normal path. Each station is priced and integrated independently, so the line can grow toward the bottleneck rather than being specified all at once.",
      },
      { q: "Do you publish prices?", a: RANGE_ON_REQUEST },
    ],
  },
  {
    slug: "how-much-does-a-pcb-laser-marking-machine-cost",
    title: "How much does a PCB laser marking machine cost?",
    metaTitle: "How Much Does a PCB Laser Marking Machine Cost?",
    description:
      "Laser source, marking field, handling and software each move the price. What a traceability programme actually needs to buy.",
    definition:
      "The price of a PCB laser marking machine is driven by the laser source (fiber, CO2 or UV), the marking field size, whether it is a standalone or in-line unit, and the software that connects marks to your traceability database. The laser itself is often not the largest line item.",
    kind: "cost",
    category: "laser-marking",
    priceNote: RANGE_ON_REQUEST,
    sections: [
      {
        heading: "Source type sets the floor",
        body: [
          "Fiber lasers are the workhorse for metal and most component marking, and the most common choice.",
          "CO2 suits organics and certain coatings.",
          "UV marks heat-sensitive substrates with minimal thermal effect, which is why it appears on bare boards and delicate assemblies — and it is the most expensive of the three.",
        ],
      },
      {
        heading: "Standalone or in-line",
        body: [
          "A standalone bench unit marks panels as a separate operation and is the cheaper entry.",
          "An in-line unit sits in the conveyor and marks without an operator, which is what a real traceability programme needs and is priced as line equipment.",
        ],
      },
      {
        heading: "Software is part of the purchase",
        body: [
          "A mark is only useful if something records what it means. Serial generation, database connection and verification reading are where a marking machine becomes a traceability system.",
          "Budget for the integration with your MES, not just the marking hardware.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which laser type is right for PCB marking?",
        a: "The substrate decides. Fiber for metal and most components, CO2 for organics and some coatings, UV for heat-sensitive substrates where thermal effect must be minimal.",
      },
      {
        q: "Will the mark survive reflow and cleaning?",
        a: "A correctly set laser mark is a permanent change to the surface, so it survives the aqueous wash and thermal cycles that lift labels and smear ink. That permanence is why traceability programmes specify it.",
      },
      { q: "Do you publish prices?", a: RANGE_ON_REQUEST },
    ],
  },

  // -------------------------------------------------------------- buyers ---
  {
    slug: "robotic-soldering-buyers-guide",
    title: "Robotic soldering: a buyer's guide",
    metaTitle: "Robotic Soldering Buyer's Guide",
    description:
      "How to specify a soldering robot: joint access, thermal mass, head type, fixturing and the questions worth asking any supplier.",
    definition:
      "Specifying a soldering robot starts with the joint, not the machine. Joint access, thermal mass, pitch and board warpage determine whether an iron tip or a laser is appropriate, how many heads are worth having, and whether vision alignment is optional or essential.",
    kind: "buyers",
    category: "soldering",
    sections: [
      {
        heading: "Start with the joint",
        body: [
          "Can a tip physically reach it? Tip access is the first disqualifier and the one most easily checked with a sample board.",
          "What is the thermal mass on either side? A heavy ground plane pulls heat away and changes dwell time far more than the machine does.",
          "What is the pitch, and how close is the nearest heat-sensitive component?",
        ],
      },
      {
        heading: "Then the throughput",
        body: [
          "Count joints per board, not boards per hour. Cycle time is joints multiplied by dwell plus travel.",
          "A second head is the cheapest way to halve cycle time on a high-joint-count board — cheaper than a second machine.",
        ],
      },
      {
        heading: "Then the variation",
        body: [
          "How much do your boards vary — warp, panel-to-panel offset, mixed products? Vision alignment stops that variation becoming missed joints.",
          "How often do you change over? Fixture design and program storage matter more in a high-mix shop than raw speed does.",
        ],
      },
      {
        heading: "Questions worth asking any supplier",
        body: [
          "Will you run my board before I buy, and will you show me the footage?",
          "Where is the machine held, and what is the lead time in days?",
          "Who supports it, and are they the people who configured it?",
          "What are the consumables, what do they cost, and are they in stock?",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between iron and laser soldering?",
        a: "An iron tip conducts heat through physical contact and suits accessible joints with a solid thermal path. Laser soldering delivers energy without touching the board, which matters for heat-sensitive components, tight pitches and joints an iron cannot physically reach.",
      },
      {
        q: "How do we know it will work on our board?",
        a: "Send it. We run your actual assembly on the machine you are evaluating, film the run, and return cycle times and joint quality. That is a better answer than any specification comparison.",
      },
    ],
  },
  {
    slug: "screw-driving-buyers-guide",
    title: "Robotic screw driving: a buyer's guide",
    metaTitle: "Robotic Screw Driving Buyer's Guide",
    description:
      "Feeder reliability, torque control, traceability and fixturing — how to specify a benchtop screw driving cell that actually runs unattended.",
    definition:
      "A robotic screw driving cell feeds, positions and torques fasteners automatically while logging torque and angle for each one. It removes the two failure modes hand assembly cannot: the screw that was never driven, and the one driven to the wrong torque with nothing to prove it.",
    kind: "buyers",
    category: "screw-driving",
    sections: [
      {
        heading: "Feed reliability is the whole game",
        body: [
          "A cell that jams intermittently is a supervised cell, which defeats the purpose. Feeder selection against your actual fastener is the single most important specification decision.",
          "Send a sample. Head geometry, length-to-diameter ratio, coating and finish all affect feeding in ways a datasheet will not tell you.",
        ],
      },
      {
        heading: "Torque, angle and the record",
        body: [
          "Specify a driver whose range brackets your target torque with margin. Running at the top of a driver's range invites drift.",
          "Decide up front whether you need the per-fastener record. Retrofitting traceability is more expensive than specifying it.",
        ],
      },
      {
        heading: "Fixturing and part presentation",
        body: [
          "The cell drives where it is told. Repeatability comes from the part being in the same place every cycle.",
          "Consider how the operator loads and unloads — a fixture that is awkward to load costs cycle time forever.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does it record torque for traceability?",
        a: "Yes. Torque and angle are captured per fastener, which is the point for anyone shipping into automotive, medical or defence where an assembly record is required rather than optional.",
      },
      {
        q: "How many screws per minute?",
        a: "Realistic throughput depends on travel distance between fastening points and feed cycle far more than on driver speed. We measure it on your part rather than quoting a headline rate.",
      },
    ],
  },
  {
    slug: "dispensing-buyers-guide",
    title: "Robotic dispensing: a buyer's guide",
    metaTitle: "Robotic Dispensing Buyer's Guide",
    description:
      "Valve selection, fluid behaviour, height sensing and shot repeatability — how to specify a dispensing system around your material.",
    definition:
      "Specifying a dispensing system means specifying the valve. Viscosity, filler content, pot life and the shape required — dot, bead, fill or spray — determine the valve, and the valve determines most of the quote. The motion platform is the easy part.",
    kind: "buyers",
    category: "dispensing",
    sections: [
      {
        heading: "Characterise the fluid first",
        body: [
          "Viscosity and whether it is shear-thinning. A thixotropic material behaves differently under pressure than at rest, and valve choice must account for it.",
          "Filler content and abrasiveness, which drive wear and therefore maintenance interval.",
          "Pot life and cure mechanism, which decide whether meter-mix is required.",
        ],
      },
      {
        heading: "Then the geometry",
        body: [
          "A dot, a continuous bead, a filled cavity and a sprayed coating are four different processes. Some valves do several well; none do all four.",
          "Standoff consistency matters more than most buyers expect — height sensing or vision keeps it constant across warped or variable-height assemblies.",
        ],
      },
      {
        heading: "Then repeatability",
        body: [
          "Shot-to-shot volume variation is the number to ask about, not maximum speed.",
          "Temperature stability of both fluid and environment affects it more than the robot's positional accuracy does.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you test our fluid before we buy?",
        a: "Yes, and you should insist on it with any supplier. Send the fluid and the part; we dispense it and show you the result.",
      },
      {
        q: "What maintenance does a dispensing valve need?",
        a: "It depends on the material more than the valve. Abrasive filled compounds wear wetted parts faster; clean low-viscosity fluids can run a long time between service. We will tell you the realistic interval for your material.",
      },
    ],
  },
  {
    slug: "pcb-handling-buyers-guide",
    title: "PCB handling: a buyer's guide",
    metaTitle: "PCB Handling Equipment Buyer's Guide",
    description:
      "How to specify conveyors, loaders, buffers, inverters and inspection stations so an SMT line stops waiting on operators.",
    definition:
      "PCB handling equipment moves bare and populated boards between process steps — loading, conveying, buffering, turning, inverting and unloading. It is the connective tissue of an SMT line: the machines that decide whether printers, placement and reflow run continuously or wait on an operator.",
    kind: "buyers",
    category: "pcb-handling",
    sections: [
      {
        heading: "Find the waiting",
        body: [
          "Handling equipment does not make a process faster; it stops the process idling. Measure where your line waits before specifying anything.",
          "The most common answer is the front — a placement machine waiting for an operator to load magazines.",
        ],
      },
      {
        heading: "Specify the envelope honestly",
        body: [
          "Board size range including the awkward outliers, not the typical case.",
          "Thickness range, weight, and whether boards are panelised.",
          "Pass line height must match the equipment either side, which is the most common integration mistake.",
        ],
      },
      {
        heading: "Buffering and mixed flow",
        body: [
          "A buffer between two processes with different cycle times recovers throughput that is otherwise lost to blocking.",
          "Inverters, turners and shuttles exist because line geometry rarely matches process order.",
        ],
      },
    ],
    faqs: [
      {
        q: "What board sizes can you handle?",
        a: "Standard machines cover the common SMT envelope with motorised width adjustment on most models. Oversized, heavy or unusually thin boards are a configuration question — tell us the dimensions and we will confirm before you order.",
      },
      {
        q: "Will it integrate with our existing line?",
        a: "SMEMA handshaking is standard, so the machines work alongside other manufacturers' equipment. Pass line height and board envelope are the two things to confirm.",
      },
    ],
  },
  {
    slug: "laser-marking-buyers-guide",
    title: "PCB laser marking: a buyer's guide",
    metaTitle: "PCB Laser Marking Buyer's Guide",
    description:
      "Source selection, marking field, contrast, verification and MES integration — specifying a marking system for real traceability.",
    definition:
      "PCB laser marking applies permanent, high-contrast identifiers — 2D codes, serial numbers, logos — directly onto boards and components without ink or labels. Because the mark is created in the substrate rather than applied to it, it survives the wash, reflow and handling that defeat printed labels.",
    kind: "buyers",
    category: "laser-marking",
    sections: [
      {
        heading: "Match the source to the substrate",
        body: [
          "Test-mark your actual material before specifying. Contrast and legibility vary far more by substrate than by machine.",
          "Fiber, CO2 and UV are not interchangeable — see the source comparison guide.",
        ],
      },
      {
        heading: "Specify verification, not just marking",
        body: [
          "A 2D code nobody can read is worse than no code. Grade the mark to a standard and verify it in-process.",
          "Decide whether verification happens at the marker or downstream.",
        ],
      },
      {
        heading: "Connect it to something",
        body: [
          "Serial generation, database write and later lookup are what make marks into traceability.",
          "Plan the MES integration alongside the hardware purchase, not after it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does laser marking support IPC-1782 traceability?",
        a: "Laser marking supplies the unique, permanent identifier those requirements assume. The marking system handles the identifier; the record itself lives in your MES, and we can advise on how the two connect.",
      },
      {
        q: "Will marking damage the board?",
        a: "Correctly specified, no — parameters are set so the mark is in the surface layer only. This is exactly what a test mark on your own substrate confirms.",
      },
    ],
  },
  {
    slug: "collaborative-robot-buyers-guide",
    title: "Collaborative robots: a buyer's guide",
    metaTitle: "Collaborative Robot Buyer's Guide",
    description:
      "Payload, reach, guarding, programming and where a cobot genuinely beats a fixed cell in electronics manufacturing.",
    definition:
      "A collaborative robot is an industrial arm designed to work beside people without a safety cage, using force limiting and integrated vision instead of guarding. In electronics manufacturing they handle tending, inspection and material movement — the repetitive tasks between processes rather than the processes themselves.",
    kind: "buyers",
    category: "cobots",
    sections: [
      {
        heading: "Size it honestly",
        body: [
          "Payload is the part plus the gripper plus any cable or hose carried at full reach. The gripper is what first-time buyers forget.",
          "Reach must cover the whole working envelope including the awkward corner, not the typical pick point.",
        ],
      },
      {
        heading: "Guarding is an application decision",
        body: [
          "A force-limited arm is not automatically a cage-free installation. The requirement is set by a risk assessment of the whole application — an inherently safe arm carrying a sharp tool or a heavy part can still need guarding.",
        ],
      },
      {
        heading: "Where a cobot beats a fixed cell",
        body: [
          "When one arm must serve several stations, or reach parts a fixed gantry cannot.",
          "When the task changes often enough that re-teaching beats re-tooling.",
          "When floor space rules out a caged cell.",
          "For single-fixture repetitive work, a purpose-built cell is usually faster, cheaper and more repeatable.",
        ],
      },
    ],
    faqs: [
      {
        q: "How hard are they to program?",
        a: "TechMan arms are taught by hand-guiding and a flow-based interface rather than by writing robot code, so a manufacturing engineer can build a working task without a robotics background. Training is included either way.",
      },
      {
        q: "Do collaborative robots need safety fencing?",
        a: "Not usually, which is most of their appeal — but the requirement comes from a risk assessment of the application, not from the arm's rating alone.",
      },
    ],
  },

  // ------------------------------------------------------------ decision ---
  {
    slug: "benchtop-vs-cobot-screw-driving",
    title: "Benchtop cell vs cobot for screw driving",
    metaTitle: "Benchtop Cell vs Cobot for Screw Driving",
    description:
      "A decision matrix: when a fixed benchtop screw driving cell beats a collaborative robot, and when it does not.",
    definition:
      "For screw driving, a fixed benchtop cell is faster to deploy, cheaper and more repeatable whenever the work stays in one fixture. A collaborative robot earns its higher cost when the same arm must serve multiple stations, handle frequent task changes, or reach geometry a fixed gantry cannot.",
    kind: "decision",
    category: "screw-driving",
    sections: [
      {
        heading: "Choose a benchtop cell when",
        body: [
          "The part is presented in one fixture and the fastening pattern is fixed.",
          "Cycle time matters — a purpose-built gantry is faster than an articulated arm over short repetitive moves.",
          "You want the shortest path from purchase to production.",
          "Budget is the constraint. This is the cheapest robotic assembly step available.",
        ],
      },
      {
        heading: "Choose a cobot when",
        body: [
          "One arm should serve several operations, screw driving being only one of them.",
          "Product mix changes often enough that re-teaching is cheaper than re-fixturing.",
          "The fastening geometry is not reachable by a fixed vertical gantry.",
          "Floor layout or human interaction rules out an enclosed cell.",
        ],
      },
      {
        heading: "What does not change either way",
        body: [
          "The feeder still decides reliability.",
          "The fixture still decides repeatability.",
          "The torque record still has to come from the driver.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which is more accurate?",
        a: "A fixed gantry is generally more repeatable over a small envelope than an articulated arm, because it has fewer axes and shorter lever arms. For most electronics fastening that difference is not the deciding factor — feed reliability is.",
      },
    ],
  },
  {
    slug: "iron-vs-laser-soldering",
    title: "Iron tip vs laser soldering",
    metaTitle: "Iron Tip vs Laser Soldering Robots",
    description:
      "Contact versus non-contact heat: which joints suit an iron tip, which need a laser, and why many lines run both.",
    definition:
      "An iron tip conducts heat into a joint through physical contact and suits accessible joints with a solid thermal path. A laser delivers energy without touching the board, which matters for heat-sensitive components, tight pitches and joints an iron cannot physically reach. Many production lines end up using both.",
    kind: "decision",
    category: "soldering",
    sections: [
      {
        heading: "Iron tip",
        body: [
          "Efficient heat transfer into high-thermal-mass joints — ground planes, heavy pads, connector shells.",
          "Lower machine cost and well-understood process.",
          "Consumable tips that wear and need managing.",
          "Requires physical access with a tip and its approach angle.",
        ],
      },
      {
        heading: "Laser",
        body: [
          "No contact, so no mechanical force on a delicate joint and no tip to wear.",
          "Reaches recessed or shadowed joints an iron cannot approach.",
          "Very localised heat, which protects nearby heat-sensitive parts.",
          "Higher machine cost, and reflective or unusual surfaces need process development.",
        ],
      },
      {
        heading: "How to decide",
        body: [
          "Run the board. Access and thermal mass are the deciding factors, and both are obvious within one trial and ambiguous in any specification comparison.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is laser soldering faster?",
        a: "Per joint it can be, because there is no tip approach and retraction. Over a whole board the difference is usually dominated by travel between joints, so the honest answer comes from running your part.",
      },
    ],
  },
  {
    slug: "amr-vs-agv",
    title: "AMR vs AGV for material movement",
    metaTitle: "AMR vs AGV: Which Suits Your Line?",
    description:
      "Map-based autonomous navigation versus fixed-path guided vehicles, and what each costs you in facility change.",
    definition:
      "An AGV follows a fixed path laid into the floor as tape, wire or magnets. An AMR navigates from an onboard map and chooses its own route, so it handles a changed layout or a blocked aisle without re-engineering the facility. The distinction is who decides the route.",
    kind: "decision",
    category: "mobile-robots",
    sections: [
      {
        heading: "AGV",
        body: [
          "Deterministic and simple where the route genuinely never changes.",
          "Requires physical infrastructure in the floor, and changing the route means changing the floor.",
          "Stops when the path is blocked.",
        ],
      },
      {
        heading: "AMR",
        body: [
          "Maps the space and re-routes around obstacles.",
          "No floor infrastructure, so layout changes are a software matter.",
          "Higher unit cost, lower cost of change.",
        ],
      },
      {
        heading: "Which fits an electronics plant",
        body: [
          "Most electronics plants change layout more often than they expect to, which is the argument for AMRs.",
          "Where a route is genuinely permanent and traffic is heavy, an AGV can still be the right answer.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we need to modify our facility for an AMR?",
        a: "Rarely. Mapping replaces the tape, magnets or wire an AGV would require, which is what makes an AMR practical in a plant whose layout still changes.",
      },
    ],
  },
  {
    slug: "selective-vs-wave-soldering",
    title: "Selective vs wave soldering",
    metaTitle: "Selective vs Wave Soldering",
    description:
      "Wave soldering treats the whole board. Selective treats the joint. Which one suits mixed-technology assemblies.",
    definition:
      "Wave soldering passes the entire underside of a board over molten solder, which is efficient for boards that are predominantly through-hole. Selective soldering treats individual joints or small groups, which suits mixed-technology assemblies where most of the board is surface mount and only a few through-hole joints remain.",
    kind: "decision",
    category: "soldering",
    sections: [
      {
        heading: "Wave suits",
        body: [
          "High through-hole content across the whole board.",
          "High volume, low mix, stable product.",
          "Boards that tolerate whole-underside thermal exposure.",
        ],
      },
      {
        heading: "Selective suits",
        body: [
          "Mixed-technology boards with a handful of through-hole joints among surface-mount components.",
          "Assemblies with heat-sensitive parts that must not see a wave.",
          "Higher mix, where masking and fixturing for a wave becomes the dominant cost.",
        ],
      },
      {
        heading: "Where robotic soldering fits",
        body: [
          "A robotic soldering cell is selective soldering at bench scale — it treats one joint at a time with a taught path, which is why it fits low-to-medium volume mixed assemblies particularly well.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a soldering robot replace our wave machine?",
        a: "If the board is mostly surface mount with limited through-hole content, frequently yes, and it removes the masking and fixturing a wave demands. For a board that is genuinely mostly through-hole at volume, a wave is still more efficient.",
      },
    ],
  },

  // ------------------------------------------------------------ technical ---
  {
    slug: "fiber-vs-co2-vs-uv-laser-marking",
    title: "Fiber vs CO2 vs UV laser marking",
    metaTitle: "Fiber vs CO2 vs UV Laser Marking",
    description:
      "Three laser sources, three sets of substrates. Which one marks your material without damaging it.",
    definition:
      "Fiber, CO2 and UV lasers differ in wavelength, and wavelength determines which materials absorb the energy. Fiber suits metals and most component marking, CO2 suits organics and some coatings, and UV marks heat-sensitive substrates with minimal thermal effect. The substrate decides, not the preference.",
    kind: "technical",
    category: "laser-marking",
    sections: [
      {
        heading: "Fiber",
        body: [
          "Around 1064nm. Strongly absorbed by metals.",
          "The default for component bodies, metal housings and most industrial marking.",
          "Efficient, long-lived and the most common choice.",
        ],
      },
      {
        heading: "CO2",
        body: [
          "Around 10.6µm. Absorbed by organics — polymers, coatings, some laminates.",
          "Poor on bare metal without a marking compound.",
        ],
      },
      {
        heading: "UV",
        body: [
          "Around 355nm. 'Cold' marking with minimal heat-affected zone.",
          "The choice for heat-sensitive substrates and fine features where thermal damage is the risk.",
          "The most expensive of the three.",
        ],
      },
      {
        heading: "How to choose without guessing",
        body: [
          "Send the substrate. A test mark on your own material settles contrast, legibility and thermal effect in a way no wavelength table can.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which laser marks bare PCB laminate best?",
        a: "UV is usually specified where thermal effect on the laminate must be minimal, though the right answer depends on the specific material stack. This is exactly the case for a test mark before purchase.",
      },
    ],
  },
  {
    slug: "pcb-traceability-guide",
    title: "PCB traceability: a practical guide",
    metaTitle: "PCB Traceability: A Practical Guide",
    description:
      "Unique identifiers, permanent marking, data capture and what IPC-1782 actually asks of an assembly line.",
    definition:
      "PCB traceability means each board carries a unique, permanently readable identifier, and every process it passes through records what happened against that identifier. The mark is the easy half; the data capture and the database behind it are where traceability programmes succeed or fail.",
    kind: "technical",
    category: "laser-marking",
    sections: [
      {
        heading: "The identifier",
        body: [
          "It must be unique, permanent and machine-readable after every process the board will see — including aqueous wash and reflow.",
          "That requirement is why laser marking displaces labels and ink in serious programmes.",
        ],
      },
      {
        heading: "The capture points",
        body: [
          "Decide which processes must record against the identifier: paste, placement, reflow, inspection, test, rework.",
          "Every capture point needs a reader and a route into the database.",
        ],
      },
      {
        heading: "The record",
        body: [
          "IPC-1782 frames traceability in terms of the level of detail retained and for how long. The standard describes what to record; your MES holds it.",
          "Agree retention and granularity before buying hardware — they determine how much you need.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we need laser marking for traceability?",
        a: "You need an identifier that survives the whole process. Labels and ink often do not survive wash and reflow, which is why laser marking is specified — but the requirement is permanence, not the technology itself.",
      },
    ],
  },
  {
    slug: "smema-integration-guide",
    title: "SMEMA integration: what it means in practice",
    metaTitle: "SMEMA Integration Explained",
    description:
      "What SMEMA handshaking actually does between machines, and the two things to check before assuming equipment will connect.",
    definition:
      "SMEMA is the electrical handshake that lets adjacent SMT machines tell each other a board is ready to pass and ready to receive. It is what allows equipment from different manufacturers to form a continuous line without custom integration, and it is a signalling standard rather than a mechanical one.",
    kind: "technical",
    category: "pcb-handling",
    sections: [
      {
        heading: "What SMEMA does",
        body: [
          "Two signals in each direction: machine ready, board available. That is enough to sequence a line without a central controller.",
          "It says nothing about board size, height or speed — only about readiness.",
        ],
      },
      {
        heading: "The two things it does not solve",
        body: [
          "Pass line height. Two SMEMA-compatible machines at different heights still will not pass a board. This is the most common integration mistake.",
          "Board envelope. Width adjustment range and thickness capability must overlap across the line.",
        ],
      },
      {
        heading: "Practical checks before ordering",
        body: [
          "Measure the pass line height of the machines either side.",
          "Confirm minimum and maximum board width and thickness at every station.",
          "Confirm the connector and signal convention with the supplier.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will your conveyors connect to our existing line?",
        a: "SMEMA handshaking is standard across our handling range, so signalling is not the issue. Confirm pass line height and board envelope and the connection is normally straightforward.",
      },
    ],
  },
  {
    slug: "robotic-soldering-roi",
    title: "Robotic soldering ROI: how to model it honestly",
    metaTitle: "Robotic Soldering ROI: An Honest Model",
    description:
      "The variables that actually drive payback on a soldering cell — and the ones vendors quote that do not.",
    definition:
      "Payback on a robotic soldering cell is driven by joints per board multiplied by rework rate, not by headcount alone. A line running repetitive through-hole work with an experienced-operator shortage justifies a cell quickly; low-mix, low-joint-count work often does not, regardless of labour cost.",
    kind: "technical",
    category: "soldering",
    sections: [
      {
        heading: "Count what you actually lose today",
        body: [
          "Rework hours, not just first-pass labour. A joint reworked twice costs several times what it cost to make.",
          "Scrap attributable to hand soldering.",
          "Throughput lost to operator availability and training time.",
        ],
      },
      {
        heading: "Be honest about what the machine costs to run",
        body: [
          "Consumables, nitrogen if used, and maintenance.",
          "Programming and fixturing time per new product.",
          "The learning period before the cell reaches steady-state yield.",
        ],
      },
      {
        heading: "The variable most models omit",
        body: [
          "Hiring. In many regions the binding constraint is not the wage but the inability to find experienced hand-solder operators at all. A model that assumes you could simply hire more is modelling a world you may not be in.",
        ],
      },
    ],
    faqs: [
      {
        q: "What payback period is realistic?",
        a: "It varies too much by joint count and rework rate for a headline figure to be meaningful. Run your board with us, take the measured cycle time and first-pass yield, and put your own labour and rework numbers against it. That is a model you can defend internally.",
      },
    ],
  },
  {
    slug: "when-to-automate-electronics-assembly",
    title: "When to automate an assembly step",
    metaTitle: "When to Automate an Assembly Step",
    description:
      "A practical test for whether a manual step is worth automating — and the signals that it is not, yet.",
    definition:
      "An assembly step is worth automating when it is repetitive, when its quality depends on operator consistency, and when the volume is stable enough that fixturing will not be redesigned every quarter. Volume alone is a poor predictor; repeatability and rework rate are better ones.",
    kind: "technical",
    sections: [
      {
        heading: "Signals it is ready",
        body: [
          "The same motion is repeated many times per board.",
          "Quality varies measurably by operator or by shift.",
          "Rework is a recurring line item rather than an exception.",
          "The product will exist in roughly this form for long enough to amortise fixturing.",
        ],
      },
      {
        heading: "Signals it is not, yet",
        body: [
          "The design is still changing shape month to month.",
          "Volume is genuinely low and the step is quick.",
          "The real bottleneck is somewhere else — automating a non-bottleneck buys nothing.",
        ],
      },
      {
        heading: "The cheapest way to find out",
        body: [
          "Run the step on a machine before buying one. Measured cycle time and first-pass yield on your own part settle the argument faster than any business case built on estimates.",
        ],
      },
    ],
    faqs: [
      {
        q: "What volume justifies automation?",
        a: "There is no threshold that holds across applications. A low-volume board with forty difficult joints can justify a cell that a high-volume board with four joints cannot. Count joints and rework, not units.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const GUIDE_KIND_LABEL: Record<Guide["kind"], string> = {
  cost: "Cost guide",
  buyers: "Buyer's guide",
  decision: "Comparison",
  technical: "Technical guide",
};
