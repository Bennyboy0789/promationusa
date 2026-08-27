/**
 * Hub copy that cannot be derived from the catalogue.
 *
 * Two things live here per category:
 *
 *  - `definition` — a 40–60 word answer to "what is this?", written to be
 *    quotable on its own. AI answer engines and featured snippets lift a
 *    self-contained paragraph; they cannot lift one that depends on the
 *    sentence before it.
 *  - `faqs` — the buying questions the category SERPs show and nobody in the
 *    competitive set answers. These render visibly on the page, which is the
 *    condition for marking them up as FAQPage.
 *
 * Answers deliberately avoid naming a price. PROMATION has not confirmed
 * whether they will publish bands, so the copy commits to ranges being
 * available on request rather than inventing figures.
 */

export type CategoryContent = {
  definition: string;
  faqs: { q: string; a: string }[];
};

export const categoryContent: Record<string, CategoryContent> = {
  soldering: {
    definition:
      "A robotic soldering system automates through-hole and selective solder joints using a programmed iron or laser head. Instead of an operator touching each joint, the machine repeats a taught path at a fixed temperature, feed rate and dwell — producing the same joint on the first board of a shift and the thousandth.",
    faqs: [
      {
        q: "How much does a robotic soldering machine cost?",
        a: "Benchtop soldering robots occupy a different price class from in-line selective systems, and the configuration — single or dual head, laser or iron, vision, nitrogen, fixturing — moves the figure more than the base machine does. We publish a range for each model on request, and we will tell you which class your part actually needs rather than quoting the largest machine.",
      },
      {
        q: "Is a soldering robot worth it for our volume?",
        a: "The usual break-even is not volume alone but joints per board multiplied by rework rate. Lines running repetitive through-hole work with an experienced operator shortage tend to justify a benchtop cell quickly; low-mix, low-joint-count work often does not. Send us the board and we will run it, so the decision rests on your cycle time rather than a generic estimate.",
      },
      {
        q: "What is the difference between iron and laser soldering?",
        a: "An iron tip conducts heat through physical contact and suits accessible joints with a solid thermal path. Laser soldering delivers energy without touching the board, which matters for heat-sensitive components, tight pitches and joints an iron cannot physically reach. Many lines end up using both.",
      },
      {
        q: "Can a soldering robot handle our existing boards?",
        a: "Usually, but the answer depends on joint access, board warpage and fixturing rather than on the machine. This is why we run the part before quoting: you see the actual cycle time and joint quality on your own assembly first.",
      },
    ],
  },

  "pcb-handling": {
    definition:
      "PCB handling equipment moves bare and populated boards between process steps — loading magazines, conveying, buffering, turning, inverting and unloading. It is the connective tissue of an SMT line: the machines that decide whether printers, placement and reflow run continuously or wait on an operator.",
    faqs: [
      {
        q: "What does a PCB handling line cost?",
        a: "Individual conveyors and stations sit at the low end; a full loader-to-unloader configuration depends on lane count, length, board size and whether SMEMA integration and traceability are required. We price per station so you can stage the build rather than commit to a whole line at once.",
      },
      {
        q: "Is your equipment SMEMA compatible?",
        a: "Yes. SMEMA handshaking is standard across the handling range, so the machines drop into existing lines alongside other manufacturers' printers, placement and reflow equipment without custom integration work.",
      },
      {
        q: "What board sizes can you handle?",
        a: "Standard machines cover the common SMT envelope, and width adjustment is motorised on most models. Oversized, heavy or unusually thin boards are a configuration question rather than a yes-or-no one — tell us the dimensions and we will confirm before you order.",
      },
    ],
  },

  dispensing: {
    definition:
      "A robotic dispensing system applies a controlled volume of fluid — adhesive, solder paste, potting compound, conformal coating or grease — along a programmed path. Repeatability comes from holding pressure, speed and needle height constant, which is what separates a machine dot from a hand-laid bead.",
    faqs: [
      {
        q: "How much does a dispensing robot cost?",
        a: "Benchtop dispensing robots start well below the price of an in-line system, and the valve is often a larger cost driver than the motion platform. Because valve choice depends entirely on your fluid's viscosity and cure behaviour, we quote the combination rather than the robot alone.",
      },
      {
        q: "Which valve do we need for our fluid?",
        a: "Viscosity, filler content, pot life and the shape you need — dot, bead, fill or spray — determine it. Send us the fluid and the part; we will dispense it and show you the result before you commit to a valve.",
      },
      {
        q: "Can it handle potting, gasketing and glue dots on one machine?",
        a: "Often yes, with valve changes rather than separate machines, provided the volumes and tolerances are in the same class. Where they are not, we will say so — running one machine badly across three jobs costs more than it saves.",
      },
    ],
  },

  "screw-driving": {
    definition:
      "A robotic screw driving system feeds, positions and torques fasteners automatically, logging the torque and angle of every screw. It removes the two failure modes hand assembly cannot eliminate: the screw that was never driven, and the one driven to the wrong torque with nothing to prove it.",
    faqs: [
      {
        q: "How much does a screw driving robot cost?",
        a: "Benchtop auto-feed cells are the most affordable robotic assembly step most manufacturers will buy, sitting well under the cost of a cobot-based cell. Imported machines anchor expectations low; the difference in what you pay us is US stock, US support and an applications lab that proves the machine on your part first.",
      },
      {
        q: "Benchtop cell or a cobot?",
        a: "A benchtop cell is faster to deploy, cheaper and more repeatable when the work stays in one fixture. A cobot earns its cost when the same arm must serve several stations or reach parts a fixed gantry cannot. Most electronics assembly we see is the former.",
      },
      {
        q: "Will it handle our screw size and torque range?",
        a: "Feeder and driver are selected to the fastener, so the honest answer needs the screw. Send us a sample with the target torque and we will confirm feed reliability — the feeder, not the driver, is what usually decides whether a fastener automates well.",
      },
      {
        q: "Does it record torque for traceability?",
        a: "Yes. Torque and angle are captured per fastener, which is the point for anyone shipping into automotive, medical or defence where an assembly record is required rather than optional.",
      },
    ],
  },

  "laser-marking": {
    definition:
      "PCB laser marking applies permanent, high-contrast identifiers — 2D codes, serial numbers, logos — directly onto boards and components without ink or labels. Because the mark is created in the substrate rather than applied to it, it survives the wash, reflow and handling that defeat printed labels.",
    faqs: [
      {
        q: "Which laser type is right for PCB marking?",
        a: "Fiber lasers suit metal and most component marking; CO2 works on organics and some coatings; UV marks heat-sensitive substrates with minimal thermal effect, which is why it is common for bare boards and sensitive assemblies. The substrate decides, not the preference.",
      },
      {
        q: "Will the mark survive reflow and cleaning?",
        a: "A correctly set laser mark is a permanent change to the surface, so it survives the aqueous wash and thermal cycles that lift labels and smear ink. That permanence is the reason traceability programmes specify it.",
      },
      {
        q: "Does it support IPC-1782 traceability?",
        a: "Laser marking supplies the unique, permanent identifier those traceability requirements assume. The marking system handles the identifier; the record itself lives in your MES, and we can advise on how the two connect.",
      },
    ],
  },

  cobots: {
    definition:
      "A collaborative robot is an industrial arm designed to work beside people without a safety cage, using force limiting and integrated vision instead of guarding. In electronics manufacturing they handle tending, inspection and material movement — the repetitive tasks between processes rather than the processes themselves.",
    faqs: [
      {
        q: "Do collaborative robots need safety fencing?",
        a: "Not usually, which is most of their appeal — but the requirement is set by a risk assessment of the whole application, not by the arm. An inherently safe arm carrying a sharp tool or a heavy part can still need guarding.",
      },
      {
        q: "How hard are they to program?",
        a: "TechMan arms are taught by hand-guiding and a flow-based interface rather than by writing robot code, so a manufacturing engineer can build a working task without a robotics background. We include training either way.",
      },
      {
        q: "What payload do we need?",
        a: "Payload is the part plus the gripper plus any cable or hose carried at full reach — the gripper is what most first-time buyers forget. TM5 through TM20 covers the range electronics assembly typically needs; tell us the part and we will size it.",
      },
    ],
  },

  "mobile-robots": {
    definition:
      "An autonomous mobile robot moves material between stations without fixed tracks or floor markings, navigating from an onboard map and re-routing around obstacles. On an electronics line they connect processes that are near each other in sequence but not in space.",
    faqs: [
      {
        q: "How is an AMR different from an AGV?",
        a: "An AGV follows a fixed path laid into the floor. An AMR navigates from a map and chooses its own route, so it handles a changed layout or a blocked aisle without re-engineering the facility.",
      },
      {
        q: "Do we need to modify our facility?",
        a: "Rarely. Mapping replaces the tape, magnets or wire an AGV would require, which is what makes an AMR practical in a plant whose layout still changes.",
      },
    ],
  },

  "xray-inspection": {
    definition:
      "X-ray inspection images solder joints hidden beneath component bodies — BGAs, QFNs, connectors — where optical inspection cannot see. It is how voids, shorts, insufficient solder and head-in-pillow defects are found without destroying the board.",
    faqs: [
      {
        q: "When do we need X-ray rather than AOI?",
        a: "As soon as you place bottom-terminated parts. AOI inspects what a camera can see; once the joint is under the component body, X-ray is the only non-destructive way to inspect it.",
      },
      {
        q: "Can it count components on reels?",
        a: "Yes — X-ray component counting is a common secondary use and often justifies the machine on inventory accuracy alone, separately from its inspection role.",
      },
    ],
  },
};
