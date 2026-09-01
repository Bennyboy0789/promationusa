import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/legacyRoutes";

/**
 * Security headers.
 *
 * The CSP is deliberately permissive about scripts: `unsafe-inline` is required
 * by Next's inline bootstrap and by the GTM snippet, and tightening it would
 * need a nonce plumbed through the whole app. It still blocks framing, forces
 * HTTPS for subresources and stops MIME sniffing, which is where the practical
 * risk is on a marketing site.
 *
 * `googletagmanager.com` and `google-analytics.com` are allowed so the tag can
 * load once `NEXT_PUBLIC_GTM_ID` is set; without the ID nothing is requested.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://i.ytimg.com https://img.youtube.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.resend.com",
  // YouTube embeds appear on the homepage and on press releases carrying a
  // video. Both the standard and the no-cookie player domain are listed so
  // either can be used without editing this file again.
  "frame-src https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  // Two years, subdomains included — the value Chrome's preload list requires.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
