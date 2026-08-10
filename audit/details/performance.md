# Core Web Vitals / Performance Audit — promationusa.com
Date: 2026-08-08 | Method: Direct HTTP/HTML analysis (PSI API keyless quota exhausted — 429 RESOURCE_EXHAUSTED on both mobile and desktop, all pages; no CrUX field data or Lighthouse lab scores available in this environment)

## Pages audited
/, /pcb-handling, /robotic-soldering-glance, /store, /news

## PageSpeed Insights
Every call returned HTTP 429 `quota_limit_value: 0` — the keyless daily quota for this project is fully exhausted (not a per-request rate limit, a hard daily cap). No LCP/INP/CLS field data or Lighthouse score could be retrieved. Findings below are derived from direct measurement of HTML weight, headers, and resource composition, which is the fallback method specified.

## Network / TTFB
- All 5 pages: TTFB 77–110ms, HTML gzip-compressed, served via Fastly CDN edge cache (`Age` header present, e.g. home page Age: 17955s). TTFB is not a bottleneck.
- HTML payload (gzip): home 34.9KB, pcb-handling 36.5KB, robotic-soldering-glance 36.9KB, store 36.7KB, news 43.7KB.

## Critical finding: no viewport meta tag
Confirmed on all 5 pages, with both desktop and mobile UA fetches — zero occurrences of `width=device-width` anywhere in the served HTML. There is no `<meta name="viewport">` tag at all. This forces mobile browsers to render at a default desktop layout width (~980px) and scale down, which directly degrades mobile LCP/CLS measurement (Lighthouse mobile treats this as a top failing audit) and real-user mobile usability/interactivity (INP-affecting, since users must pinch-zoom to tap elements).

## Images (served via images.squarespace-cdn.com)
- Positive: CDN auto content-negotiates WebP regardless of Accept header/query string, with `cache-control: max-age=31536000` (1yr) — format optimization and caching are already handled.
- Negative: Hero/gallery images requested with no `?format=` width parameter, so native resolution is downloaded (e.g. a 1940×879 gallery banner = 91KB) instead of a size-matched crop for its actual display box; no `srcset`/responsive sizing observed on these elements.
- Negative: Homepage has 19 `<img>` tags, 15 lack `width`/`height` attributes (only a parallel `.thumb-image` duplicate carries `data-image-dimensions`, not a real attribute) — CLS risk during image load.
- Negative: Squarespace's slider pattern emits two `<img>` elements per gallery item (a static fallback `<img src>` plus a JS-lazy `.thumb-image[data-src]`) — risk of duplicate byte downloads for the same asset.
- Negative: Logo requested at `?format=1500w` (≈22KB) despite displaying at 1247×248 per its own `og:image:width/height` meta — oversized for its final display size.
- No native `loading="lazy"` attributes anywhere; lazy-loading is handled entirely by Squarespace's custom JS/IntersectionObserver (`data-load`, `data-src`), so images depend on JS execution rather than the browser's native mechanism.

## Render-blocking CSS
8 synchronous `<link rel="stylesheet">` tags per page (commerce bundle, search/video/socialLinks/code/spacer/form component CSS from definitions.sqspcdn.com, plus site.css) — none deferred, no critical-CSS inlining. Each adds to the critical render path before first paint, directly delaying FCP/LCP.

## JavaScript
- 52–59 `<script>` tags per page; only 2–3 carry `async`/`defer` (GTM/gtag are async — good). The bulk are Squarespace framework/component bundles loaded synchronously in `<head>`/`<body>`.
- Legacy Universal Analytics tag (`UA-96180315-1`) still present and firing — UA was sunset July 2023; this is dead-weight JS execution with no analytics value today.
- Typekit web-font loader script is `async fetchpriority="high"`, and custom `@font-face` rules correctly use `font-display: swap` — this part is well configured and should minimize font-driven CLS/FOIT.
- Multiple Google Ads conversion tracking pixels (1×1 `googleadservices.com` images) fire on every page load.

## DOM size
Approx. tag counts: home ~689, pcb-handling ~742, robotic-soldering-glance ~755, store ~855, news ~1231. Below the 1,500-element "excessive DOM" threshold everywhere, but news is trending high and worth monitoring as content grows.

## Estimated performance impact (no measured score available)
Given: fast TTFB + CDN caching (positive) offset by no viewport tag (severe, mobile-specific), 8 blocking stylesheets, unsized/full-resolution images with CLS risk, and 50+ largely synchronous scripts — this profile is consistent with a "Needs Improvement" to "Poor" mobile Lighthouse/CWV outcome, particularly for LCP and CLS. This is an inference from resource analysis, not a measured Lighthouse/CrUX score.
