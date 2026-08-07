import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PROMATION USA | Premium Electronics Manufacturing Automation",
  description:
    "PROMATION USA provides premium automated solutions for electronics manufacturing and assembly — PCB Handling Systems, Robotic Soldering, Automatic Label Placement, Laser Mark and Work Flow Solutions.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
