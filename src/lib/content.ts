// Static site content rebuilt from the live promationusa.com pages.

export type EventEntry = {
  title: string;
  dates: string;
  location: string;
  /** original site path, e.g. /events/2023/5/17/... */
  href: string;
  description?: string;
  year: number;
};

export const events: EventEntry[] = [
  {
    title: 'Robotic Soldering "Open House" Technology Day',
    dates: "May 17–18, 2023",
    location: "PROMATION INC. USA, 9900 58th Place Suite #100, Kenosha, WI 53144",
    href: "/events/2023/5/17/robotic-soldering-open-house-technology-day",
    description:
      "PROMATION USA will be holding an OPEN HOUSE for clients (new and existing) interested in exploring, and learning more about, the world of robotic soldering.",
    year: 2023,
  },
  {
    title: "SMTA Wisconsin Chapter Expo & Tech Forum",
    dates: "May 16, 2023, 10:00 AM – 4:00 PM",
    location: "Crowne Plaza Milwaukee Airport, 6401 S. 13th Street, Milwaukee, WI 53221",
    href: "/events/2023/5/16/smta-wisconsin-chapter-expo-amp-tech-forum",
    year: 2023,
  },
  {
    title: "PROMATION USA to Display at Horizon Sales Technology Day",
    dates: "May 3–4, 2023",
    location: "Horizon Sales, 7041 Grand River Avenue Suite 300, Brighton, MI 48114",
    href: "/events/2023/5/3/promation-usa-to-display-at-horizon-sales-technology-day",
    description:
      "Horizon Sales has been a long standing sales representative firm of PROMATION USA that handles the Midwest territories within the USA.",
    year: 2023,
  },
  {
    title: "SMTA Expo — Long Island",
    dates: "October 19, 2022, 8:30 AM – 4:30 PM",
    location: "Marriott Melville, 1350 Walt Whitman Road, Melville, NY 11747",
    href: "/events/2022/10/19/smta-expo-long-island",
    description:
      "SMTA (Surface Mount Technology Association) Expos are a great place for suppliers & manufacturers within the micro-electronics industry.",
    year: 2022,
  },
  {
    title: "SMTA Expo — Space Coast",
    dates: "October 6, 2022, 8:30 AM – 4:30 PM",
    location: "Melbourne Auditorium, 625 East Hibiscus Boulevard, Melbourne, FL 32901",
    href: "/events/2022/6/7/smta-expo-space-coast",
    year: 2022,
  },
  {
    title: "SMTA Expo — Tampa Bay",
    dates: "October 4, 2022, 8:00 AM – 4:00 PM",
    location: "12600 Roosevelt Boulevard North, St. Petersburg, FL 33716",
    href: "/events/2022/9/7/smta-expo-tampa-bay",
    year: 2022,
  },
  {
    title: "SMTA Expo — Ohio Valley",
    dates: "August 24, 2022, 8:30 AM – 4:30 PM",
    location: "Best Western Plus Strongsville, 15471 Royalton Road, Strongsville, OH 44136",
    href: "/events/2022/6/7/smta-expo-ohio-valley",
    year: 2022,
  },
  {
    title: "Automate Expo — Detroit, MI USA",
    dates: "June 9, 2022",
    location: "Detroit, MI",
    href: "/events/2022/5/12/automate-expo-detroit-mi-usa",
    description:
      "Automate is the largest and most inspiring showcase of industrial automation in North America — and in 2022, we're coming home to Detroit. PROMATION USA will be supporting TECHMAN Collaborative Robots at Booth #849.",
    year: 2022,
  },
  {
    title: "2022 PROMATION USA Technology Demo Day — Open House",
    dates: "May 23–27, 2022",
    location: "PROMATION INC. USA, 9900 58th Place Suite #100, Kenosha, WI 53144",
    href: "/events/2022/5/2/2022-promation-usa-technology-demo-day-open-house",
    description:
      "The 2022 PROMATION USA Open House is a formal event, by invitation only, designed to allow Authorized Sales and Distribution Agents of PROMATION USA to attend.",
    year: 2022,
  },
  {
    title: "2020 IPC APEX EXPO",
    dates: "February 4–6, 2020",
    location: "San Diego Convention Center, San Diego, CA 92101",
    href: "/events/2020/2/4/2020-ipc-apex-expo",
    description:
      "PROMATION USA has applied for a new soldering technology award for their all new in-line robotic soldering solution: The Panda Series.",
    year: 2020,
  },
  {
    title: "2019 IPC APEX EXPO",
    dates: "January 29–31, 2019",
    location: "San Diego Convention Center, San Diego, CA",
    href: "/events/2019/1/29/ipcapex-trade-show-san-diego",
    description:
      "ALL NEW PRO 4.0 Intelligent Line Control Platform. Visit us in Booth 2851 to view our second generation PRO 4.0 Intelligent Line Control platform.",
    year: 2019,
  },
  {
    title: "SMTA Detroit",
    dates: "May 22, 2018, 9:00 AM – 10:00 AM",
    location: "Laurel Manor, Livonia, MI",
    href: "/events/2018/5/22/smta-detroit",
    description:
      "Gary Goldberg and Michael Goldberg will present at the SMTA show in Detroit May 22nd on Robotic Soldering.",
    year: 2018,
  },
  {
    title: "2018 IPC EXPO",
    dates: "February 27 – March 1, 2018",
    location: "San Diego Convention Center, 111 W Harbor Drive, San Diego, CA 92101",
    href: "/events/2017/10/4/2018-ipc-expo",
    description:
      "Get an exclusive look at the newest and hottest technology offered by PROMATION USA at the 2018 IPC APEX EXPO! Booth #2946.",
    year: 2018,
  },
  {
    title: "2017 Productronica Expo",
    dates: "November 14–16, 2017",
    location: "Munich, Germany",
    href: "/events/productronica2017",
    description:
      "PROMATION will be attending this year's Productronica Expo in Munich, Germany, available for English and Spanish on-site product demonstrations.",
    year: 2017,
  },
  {
    title: "SMTAI Expo in Guadalajara, MX",
    dates: "October 18–19, 2017",
    location: "Guadalajara, MX",
    href: "/events/2017/10/4/smtai-expo-in-guadalajara-mx",
    description: "Innovative ideas for the 'PRO' in all of us.",
    year: 2017,
  },
];

export type Partner = { name: string; blurb: string };

export const partners: Partner[] = [
  { name: "QUICK", blurb: "Intelligent soldering robots & stations" },
  { name: "PANDA Robotics", blurb: "In-line soldering & laser marking" },
  { name: "TM Robot — TechMan", blurb: "Collaborative robots" },
  { name: "Omron", blurb: "Autonomous mobile robots" },
  { name: "OnRobot", blurb: "End-of-arm tooling" },
  { name: "SCHUNK", blurb: "Gripping systems & clamping technology" },
  { name: "Kester", blurb: "Solder & assembly materials" },
  { name: "Dorner", blurb: "Precision conveyor platforms" },
  { name: "Production Basics", blurb: "Technical workstations" },
  { name: "Altus Group", blurb: "European capital equipment distribution" },
  { name: "Interlatin", blurb: "Mexico & LATAM distribution" },
  { name: "RCT", blurb: "Robotic control technologies" },
  { name: "SMT Today", blurb: "Industry media partner" },
  { name: "Global SMT & Packaging", blurb: "Industry media partner" },
  { name: "GLASS", blurb: "Assisted-reality wearables" },
];

export const storeCategories = [
  "Calibration Tools",
  "Conveyor Belts",
  "Conveyor Parts",
  "Fume Extraction",
  "Hand Soldering",
  "Nitrogen Kits",
  "QUICK Solder Tips",
  "Replacement Filters",
  "Robot Consumables",
  "Solder Pots",
  "Utility Tools",
];

export type StoreProduct = { name: string; price: string; href: string };

export const storeProducts: StoreProduct[] = [
  { name: "PROMATION 191AD", price: "$345.00", href: "https://www.promationusa.com/store/quick-191ad" },
  { name: "Brass Mesh Tip Cleaner", price: "$27.50", href: "https://www.promationusa.com/store/replacement-brass-mesh-insert" },
  { name: "100% Authentic QUICK Solder Tips (912 Series)", price: "$94.00", href: "https://www.promationusa.com/store/100-authentic-quick-solder-tips-912-series" },
  { name: "310C Brass Rollers", price: "$225.00", href: "https://www.promationusa.com/store/brass-rollers" },
  { name: "OEM ESD Conveyor Belts", price: "$37.50", href: "https://www.promationusa.com/store/conveyor-belts" },
  { name: "150-Watt Soldering Robot Irons", price: "$1,855.00", href: "https://www.promationusa.com/store/quick-150watt-soldering-irons" },
  { name: "QUICK TS1200", price: "$1,222.00", href: "https://www.promationusa.com/store/quick-ts1200" },
  { name: "PROMATION 9039", price: "$3,300.00", href: "https://www.promationusa.com/store/quick-9039" },
];

export const whatWeDo = {
  intro:
    "PROMATION USA builds soldering, PCB handling, dispensing, screw driving and marking machines into electronics production lines across North America. Before you commit to anything, send us your board and we will run it on the machine you are considering — you get cycle times, joint quality and footage of your own part coming off it. Shops replacing a manual soldering bench typically see the machine pay for itself inside a year.",
  mission:
    "We supply PCB handling, in-line label placement, laser marking, workstation solutions and robotic soldering systems — and we hold them in US stock, so a lead time is a delivery date rather than a shipping schedule. Every system is configured by IPC-certified engineers who have run the process on a real part before it ships, and supported afterwards by the same people who set it up.",
  quote: {
    // Gary's words, verbatim. Attributed speech — do not rewrite.
    text: "PROMATION is committed to 100% customer satisfaction. Recognizing that no company is perfect, we focus on what we do during those imperfect times that differentiates us from our competitors.",
    author: "Gary Goldberg",
    role: "President & CEO",
    portrait: "/images/team/gary-goldberg-ceo.png",
  },
};

export const careers = {
  intro:
    "PROMATION USA pursues continuous product improvement and product innovation while exploring new technologies within the Micro-Electronics Manufacturing Industries. We seek team members who display a strong work ethic, a high aptitude for independent thinking, outstanding project management skills, and a strong commitment to both work and personal life. Self-motivated individuals thrive in our multi-faceted work environment.",
  applyInstructions:
    'Send formal resumes to Sales@promationusa.com with the subject line format: "YourName-Resume". Applicants will receive contact within one business week or sooner.',
  openings: [
    {
      title: "Robotic Soldering Technician",
      location: "Kenosha, WI",
      type: "Full-time",
      responsibilities: [
        "Work in a professional robotics lab assisting automation for manual manufacturing",
        "Document automation processes using Word, PowerPoint, and video",
        "Complete IPC Certification and Robotic Training",
        "Cross-train on PCB handling and PLC programming",
      ],
      beneficialSkills: [
        "Spanish",
        "Chinese",
        "IPC Certification",
        "PLC Programming",
        "AutoCAD / Solidworks",
      ],
      requirements: [
        "Ability to work in a fast-paced environment",
        "Direct customer interface",
        "Self-motivation and dependability",
        "Reliable transportation",
        "Occasional domestic travel for customer site training",
      ],
    },
  ],
};

export const contactPage = {
  headline: "Talk to an applications engineer",
  sub: "Speak with the experts now.",
  serves: ["USA", "Mexico", "Canada", "Europe"],
  hours: [
    { days: "Monday – Friday", hours: "8AM – 5PM CST" },
    { days: "Saturday & Sunday", hours: "Closed" },
  ],
};

export const training = {
  intro:
    "With over 20 years of industry experience, our team of certified experts want to share our knowledge of electronics manufacturing with you.",
  // Video ids are grouped exactly as the live gallery groups them, so the
  // library a returning customer knows is the library they find here.
  categories: [
    {
      title: "Soldering Robot Training",
      body: "Our soldering robot experts have compiled several educational videos to streamline your automation knowledge and ongoing exploration. Trust in our certified team of IPC soldering experts to fast-track your automation goals and manufacturing needs.",
      videos: [
        "Yhje3IpHRAk",
        "wV97cjFbw-M",
        "kWYu9dnmKtc",
        "mvz8xD3vjlY",
        "9bp6SsbO5CA",
      ],
    },
    {
      title: "Conveyor Training",
      body: "Setup, adjustment and maintenance walkthroughs for the PROMATION PCB handling and conveyor platform.",
      videos: ["fbCTXU-AZ28", "M1wLAcfIbQI"],
    },
    {
      title: "TechMan Cobot Training",
      body: "Programming and deployment fundamentals for the TechMan collaborative robot series.",
      videos: ["Y_O7jOYViQk", "_lxd0V_wIW8"],
    },
  ],
  youtube: "https://www.youtube.com/channel/UCjKi1_rUM2q2pAiAO626yDw",
};

export const homeVideo = "https://www.youtube.com/embed/D7ks2W81Od8";
