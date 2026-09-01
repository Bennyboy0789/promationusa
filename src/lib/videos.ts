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
  "mvz8xD3vjlY": {
    id: "mvz8xD3vjlY",
    name: "Solder Wire Preheat Kit by PROMATION USA",
    description: "Product Overview:  Solder Wire Preheat Kit by PROMATION USAHigh performance soldering meets compact design.  Our Solder Wire Preheat Kits can be added onto v...",
    uploadDate: "2021-12-22T09:23:06-08:00",
    duration: "PT2M10S",
  },
  "UIvVR398Xnc": {
    id: "UIvVR398Xnc",
    name: "TS SERIES - Intelligent Hand Soldering Solutions by PROMATION USA",
    description: "2018 All New:  QUICK - TS SERIES- Intelligent Hand Soldering SolutionsAvailable at:  www.promationusa.comAll Rights Reserved.PROMATIONmarketingQUICK Solderin...",
    uploadDate: "2017-12-07T05:33:10-08:00",
    duration: "PT7M20S",
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
