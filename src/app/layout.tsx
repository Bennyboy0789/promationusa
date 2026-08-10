import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { ScrollProgress } from "@/components/fx/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.promationusa.com"),
  title: {
    default: "PROMATION USA | Premium Electronics Manufacturing Automation",
    template: "%s | PROMATION USA",
  },
  description:
    "PROMATION USA provides premium automated solutions for electronics manufacturing and assembly — PCB Handling Systems, Robotic Soldering, Dispensing, Screw Driving, Laser Marking, Cobots and X-Ray Inspection.",
  keywords: [
    "PCB handling",
    "robotic soldering",
    "electronics manufacturing",
    "automation",
    "laser marking",
    "PCB assembly",
    "industrial automation",
    "PROMATION",
  ],
  openGraph: {
    title: "PROMATION USA | Premium Electronics Manufacturing Automation",
    description:
      "Premium automated solutions for electronics manufacturing and assembly.",
    type: "website",
    siteName: "PROMATION USA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
