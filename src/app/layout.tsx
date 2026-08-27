import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";

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
    "Robotic soldering, PCB handling, dispensing, screw driving and laser marking for electronics manufacturers — in US stock, supported by IPC-certified engineers.",
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
        <OrganizationJsonLd />
        <Analytics />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main" className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
