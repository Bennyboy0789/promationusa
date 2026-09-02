/**
 * Metadata for the YouTube videos this site embeds.
 *
 * Captured from YouTube once and committed, rather than fetched at build time —
 * the values do not change, and a build that scrapes a third party is a build
 * that breaks when they change their markup. Refresh by re-running the capture
 * script if a video is replaced.
 *
 * Every field here is required by Google for a VideoObject to be eligible: an
 * entry missing `uploadDate` or `name` should be left out rather than guessed.
 */

export type VideoMeta = {
  /** YouTube video id. */
  id: string;
  name: string;
  description: string;
  /** ISO 8601 date-time, as published by YouTube. */
  uploadDate: string;
  /** ISO 8601 duration, e.g. PT1M33S. */
  duration: string | null;
};

export const videoMeta: Record<string, VideoMeta> = {
  "D7ks2W81Od8": {
    id: "D7ks2W81Od8",
    name: "PCB Laser Marking Machine by PANDA Robotics USA (A Specialty Division of PROMATION USA)",
    description: "The Next Generation PCB Laser Marking Machine by PANDA Robotics USA (A Specialty Division by PROMATION USA) is officially here.  Automation Evolved: Excellen...",
    uploadDate: "2025-10-16T11:55:47-07:00",
    duration: "PT1M33S",
  },
  "iylr6jqpZ38": {
    id: "iylr6jqpZ38",
    name: "🔥 Robotic Screw Driving Solutions by PROMATION USA 🇺🇸 #asmr #robot #fyp #screwdriver #pcbassembly",
    description: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
    uploadDate: "2024-11-07T09:15:49-08:00",
    duration: "PT15S",
  },
  "UIvVR398Xnc": {
    id: "UIvVR398Xnc",
    name: "TS SERIES - Intelligent Hand Soldering Solutions by PROMATION USA",
    description: "2018 All New:  QUICK - TS SERIES- Intelligent Hand Soldering SolutionsAvailable at:  www.promationusa.comAll Rights Reserved.PROMATIONmarketingQUICK Solderin...",
    uploadDate: "2017-12-07T05:33:10-08:00",
    duration: "PT7M20S",
  },
  "Yhje3IpHRAk": {
    id: "Yhje3IpHRAk",
    name: "PROMATION ET9584EYA Dual-Slide Soldering Robot",
    description: "PROMATION ET9584EYA Dual-Slide Soldering Robot- Our Dual Slide Soldering Machine allows client greater flexibility and processing power for difficult to sold...",
    uploadDate: "2022-09-26T12:52:57-07:00",
    duration: "PT3M",
  },
  "wV97cjFbw-M": {
    id: "wV97cjFbw-M",
    name: "QUICK ET9484E Soldering Robot by PROMATION USA",
    description: "Video Overview on the New QUICK ET9484E Soldering Robot by PROMATION USA.  This solution is part of the All New Economy Series Soldering Robot Line by PROMAT...",
    uploadDate: "2021-01-14T12:11:11-08:00",
    duration: "PT2M40S",
  },
  "kWYu9dnmKtc": {
    id: "kWYu9dnmKtc",
    name: "QUICK 9744CJ PRO MODEL SOLDERING MACHINE by PROMATION USA",
    description: "QUICK 9744CJ PRO MODEL Soldering Machine by PROMATION USA- Exclusively designed for Contract Manufacturing, this QUICK Soldering Solution features the larges...",
    uploadDate: "2021-10-05T08:53:29-07:00",
    duration: "PT6M38S",
  },
  "mvz8xD3vjlY": {
    id: "mvz8xD3vjlY",
    name: "Solder Wire Preheat Kit by PROMATION USA",
    description: "Product Overview:  Solder Wire Preheat Kit by PROMATION USAHigh performance soldering meets compact design.  Our Solder Wire Preheat Kits can be added onto v...",
    uploadDate: "2021-12-22T09:23:06-08:00",
    duration: "PT2M10S",
  },
  "9bp6SsbO5CA": {
    id: "9bp6SsbO5CA",
    name: "QUICK ESC40AC SAFETY ENCLOSURE by PROMATION USA",
    description: "QUICK ESC40AC Safety Enclosure by PROMATION USA",
    uploadDate: "2021-10-08T06:00:09-07:00",
    duration: "PT58S",
  },
  "fbCTXU-AZ28": {
    id: "fbCTXU-AZ28",
    name: "PCB Conveyor Installation Quick-Start Guide - PROMATION USA",
    description: "PCB Conveyor Installation Quick-Start Guide by PROMATION USA- PROMATION USA Team provides techniques to achieve proper installation of your new PCB Handling ...",
    uploadDate: "2022-01-26T09:39:15-08:00",
    duration: "PT7M23S",
  },
  "M1wLAcfIbQI": {
    id: "M1wLAcfIbQI",
    name: "PRO 4.0 : Intelligent Line Control Solution by PROMATION USA",
    description: "The PRO 4.0 Intelligent Line Control Solution is an Award Winning Technology developed by PROMATION USA to link all equipment within the SMT Production Line ...",
    uploadDate: "2018-11-21T12:26:17-08:00",
    duration: "PT5M58S",
  },
  "Y_O7jOYViQk": {
    id: "Y_O7jOYViQk",
    name: "NEW TECHMAN AI COBOT INSTALLATION!  (LEARN, EDUCATE, GROW)",
    description: "HOW TO INSTALL YOUR NEW TECHMAN AI COLLABORATIVE ROBOT\"Learn, Educate, Grow\" Series by PROMATION USAStart you automation journey with us today: www.promation...",
    uploadDate: "2023-01-03T08:26:37-08:00",
    duration: "PT4M7S",
  },
  "_lxd0V_wIW8": {
    id: "_lxd0V_wIW8",
    name: "ONROBOT \"PLUG & PLAY\" OPTIONS FOR TECHMAN AI COBOT! (LEARN, EDUCATE, GROW)",
    description: "INSTALLING ONROBOT \"PLUG & PLAY\" OPTIONS ON TECHMAN AI COLLABORATIVE ROBOTS- \"Learn, Educate, Grow\" Series by PROMATION USAStart your automation journey with...",
    uploadDate: "2023-01-04T05:30:17-08:00",
    duration: "PT6M4S",
  },
};

/** Pull a YouTube id out of any of the URL shapes the content uses. */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{6,})/);
  return m ? m[1] : null;
}

export function getVideoMeta(url: string): VideoMeta | null {
  const id = youtubeId(url);
  return id ? (videoMeta[id] ?? null) : null;
}
