# UI/UX Audit — PROMATION USA rebuild

Date: 2026-08-26. Target: the Next.js rebuild in this repo.
Method: instrumented the running site over Chrome DevTools Protocol — 20 page/viewport combinations at 1440×900 and 390×844 (real device emulation), plus keyboard traversal, performance measurement against the **production build**, and layout forensics on every element that overflows the viewport.

Measured, not eyeballed. Where a check produced a result I could not trust, that is stated rather than reported as a finding.

---

## Summary

The build is in good shape on the fundamentals that are usually broken: focus visibility, heading structure, landmarks, alt text, layout stability and load performance all pass cleanly. The problems are concentrated in three places — a layout bug that breaks mobile on the catalogue pages, the near-total absence of product photography on the pages that sell, and control targets too small to use.

| Area | Verdict |
|---|---|
| Keyboard & focus | **Pass** — 22/22 tab stops have visible focus, order is logical |
| Heading structure | **Pass** — one `h1` per page, no skipped levels |
| Landmarks & alt text | **Pass** — `main`/`nav`/`header`/`footer` present, 0 missing alts |
| Layout stability (CLS) | **Pass** — 0.0013–0.0035 |
| Load performance | **Pass** — production LCP 992 ms (home), 112 ms (product) |
| Colour contrast | **Pass** — no verified failures (see note) |
| Mobile layout | **Fail** — horizontal overflow on catalogue pages |
| Product imagery | **Fail** — none rendered on any product page |
| Control sizing | **Fail** — carousel controls 2 px tall |

---

## Critical

### 1. Horizontal overflow on every catalogue page (mobile)

At 390 px the document scrolls to **406 px** on `/robotic-soldering-glance`, `/quick-usa-6101a1` and `/et8484-dispensing-robot`. Users get a sideways scrollbar and content that drifts off-screen.

**Root cause, traced to the element:** the sidebar cards compute to `left: 48px` when they should sit at `16px`. The ancestor chain shows the offset comes from `transform: matrix(1, 0, 0, 1, 32, 0)` on a `Reveal` wrapper.

`Reveal` animates in from a directional offset ([Reveal.tsx](../../src/components/fx/Reveal.tsx)):

```ts
left:  { x: 32, y: 0 },
right: { x: -32, y: 0 },
```

Anything using `direction="left"` sits 32 px to the right of its final position **until it scrolls into view**. On desktop there is slack in the gutter to absorb it; on mobile the container is already full-width minus a 16 px pad, so the offset pushes 32 px past the viewport edge.

This is not limited to the pages tested — it affects any page with a horizontal `Reveal` below the fold.

**Severity corrected after verification.** Follow-up testing showed this is *not* user-facing:
`window.scrollTo(400, 0)` leaves `scrollX` at **0** — sideways scrolling is blocked — and the
displaced element carries `opacity: 0` while it is displaced, because the offset only exists in
`Reveal`'s pre-reveal state. So a measurement tool sees a 406 px document; a user sees nothing.
Downgraded from **Critical** to **Low / hygiene**.

**What the investigation did surface** is a real problem: `body` carried `overflow-x: hidden`,
which makes the body a scroll container and is a known way to break `position: sticky` in
descendants — see finding 8.

### 2. Product pages carry no imagery

`/quick-usa-6101a1` and `/et8484-dispensing-robot` render **zero images**. The template never renders product photography — there is no `Image` usage in [[slug]/page.tsx](../../src/app/[slug]/page.tsx) — and the data is mostly empty anyway:

| Category | Products with images |
|---|---|
| soldering | 7 / 24 |
| pcb-handling | 2 / 25 |
| cobots | 1 / 10 |
| x-ray | 1 / 2 |
| dispensing, screw-driving, laser-marking, mobile-robots, services | **0** |
| **Total** | **11 / 107** |

**Correction on re-inspection:** even that 11 is optimistic. Of the 20 image entries in the catalogue, only **3 are real URLs** (all on `/pcb-handling`); the other 17 are descriptive notes left by the content extraction — strings like `"Equipment photo (no alt text)"` and `"Product photographs showing unit design, nozzles, and filter components"`. The usable total is **one product**.

These are the pages that hold page-1 rankings and the pages a buyer lands on from a model-number search. They currently present a spec table and body copy with no view of the machine. Every competitor benchmarked shows the equipment.

**Fix:** render the images that exist, then treat the remaining 96 as a content-acquisition task. This is the single highest-value visual gap on the site.

### 3. An internal annotation is published as a page title and `h1`

`/et8484-dispensing-robot` renders:

> **ET8384 Dispensing Robot (page shows ET8384; slug suggests ET8484 400mm variant)**

That is a note from the content extraction, live in the `<title>`, the `<h1>` and the browser tab. Isolated to this one product — the rest of the catalogue is clean — but it needs removing before anyone sees it, and the underlying question (is this the ET8384 or the ET8484?) needs answering.

---

## High

### 4. Carousel controls are 2 pixels tall

The six hero line-selector controls measure **77 × 2 px**. They are keyboard-focusable and in the tab order, but they are effectively impossible to hit with a mouse and unusable on touch, where the guidance floor is 24 px (WCAG 2.2 AA) and the practical floor is 44 px.

**Fix:** keep the 2 px bar as the *visual* treatment and give the button a transparent hit area of at least 24 px — vertical padding on the button with the bar as an inner element.

### 5. Small touch targets throughout (mobile)

Elements under 24 px in either dimension, per page at 390 px:

| Page | Count |
|---|---|
| `/` | 33 |
| `/products` | 29 |
| `/robotic-soldering-glance` | 20 |
| `/store`, `/contact`, `/why-promation`, `/news` | 19 each |
| `/quick-usa-6101a1` | 18 |

The recurring offenders are breadcrumb links (~17 px tall), footer and product-line links, and inline text links like "View systems →" (15 px). The header CTAs are fine — the phone and Quote buttons clear the threshold.

**Fix:** a global minimum of `min-height: 24px` with vertical padding on inline nav/footer links; 44 px on anything primary.

### 6. Meta descriptions out of range

| Page | Length | Issue |
|---|---|---|
| `/quick-usa-6101a1` | 29 | too short |
| `/robotic-soldering-glance` | 48 | too short |
| `/et8484-dispensing-robot` | 65 | too short |
| `/` | 207 | truncated in SERPs |
| `/why-promation` | 211 | truncated |
| `/pcb-trial` | 174 | slightly long |

Target 140–160. The short ones are the commercially important pages.

### 7. No skip link

Keyboard and screen-reader users traverse the full header — logo, seven nav items, phone, Quote — on every page before reaching content. A visually-hidden "Skip to content" link that appears on focus is a small addition with a real accessibility payoff.

---

## Medium

### 8. The product-page sidebar is set to `sticky` but never pins

`aside` computes `position: sticky; top: 96px`, yet it scrolls away with the page. Two causes,
both verified:

1. `body { overflow-x: hidden }` made the body a scroll container, so sticky resolved against it
   rather than the viewport. **Fixed** — changed to `overflow-x: clip`, which blocks sideways
   scrolling without creating a scroll container. Measured afterwards: zero scroll-container
   ancestors remain.
2. Even with that fixed it still cannot pin, because **the sidebar is 1040 px tall inside a
   1168 px container — only 128 px of travel**. Sticky has nowhere to go.

This one is a layout decision, not a CSS bug: either shorten the sidebar (move the specs inline
and keep only the quote card in the rail) or drop `sticky` so the intent is not misleading.

---

## Medium

- **`/why-promation` title repeats the brand:** "Why PROMATION USA — Official North American Source | PROMATION USA". The template appends `| PROMATION USA` to a title that already contains it.
- **`/products` renders 111 headings** on one page. It works, but it is a long scroll with no filtering or jump-links; the category hubs in the architecture plan are the intended fix.
- **Homepage ships ~213 KB of JavaScript** (production, 53 requests, 594 KB total). Reasonable, but the `fx/` animation library is the bulk of it and every component is client-side. Worth revisiting if mobile field data disappoints once GA4 is live.
- **Six decorative images use empty `alt`** correctly — no action, noted as verified.

---

## Verified as passing

These were tested and found genuinely healthy — worth recording so they are not re-litigated:

- **Focus visibility:** all 22 tab stops sampled have a visible indicator (outline or box-shadow). Tab order follows visual order.
- **Headings:** exactly one `h1` per page across all 10 pages; no skipped levels.
- **Landmarks:** `main`, `nav`, `header`, `footer` present on every page. `lang="en"` set.
- **Images:** zero missing `alt` attributes sitewide.
- **Forms:** no unlabelled fields detected.
- **Duplicate IDs:** none.
- **Layout stability:** CLS 0.0013 (home), 0.0035 (product), 0.0000 (store) — well inside the 0.1 threshold.
- **Load performance (production build):** LCP 992 ms home, 112 ms product, 96 ms store. Localhost, so no network latency — treat as a relative signal, not a field number.
- **Mobile menu:** `aria-expanded` toggles correctly, panel contains both the quote path and the phone number.
- **No overflow** on `/`, `/products`, `/store`, `/contact`, `/why-promation`, `/news` at either viewport.

### A note on the contrast check

An automated pass initially flagged 10 contrast failures, all reporting a ratio of exactly **1.06**. That uniformity was the tell: the check resolves an element's background by walking up the DOM for a solid `background-color`, which fails when text sits over a **background image or gradient** — as it does on the parallax bands and the gradient CTA buttons. It fell back to white and reported white-on-white.

Checked against rendered screenshots, all ten are white text on dark imagery with ample contrast. **No genuine contrast failures were found**, but note that this also means contrast over imagery is unverified by measurement — if a future band uses a lighter photograph, it needs a visual check.

---

## Correction to an earlier measurement

An initial performance pass against the **dev server** reported a homepage LCP of **5,876 ms**, which would have been a critical finding. Re-measured against the production build, the same page returns **992 ms**. The dev figure was an artifact of Turbopack and HMR. Dev-mode performance numbers should not be quoted.

---

## Recommended order

1. Fix the mobile overflow (`Reveal` offsets + `overflow-x: clip`) — one change, fixes every catalogue page.
2. Remove the annotation from the ET8484 title/`h1` and settle the model number.
3. Render product imagery where data exists; start the acquisition list for the rest.
4. Give the carousel controls a 24 px hit area.
5. Raise inline link targets to a 24 px minimum.
6. Rewrite the six out-of-range meta descriptions.
7. Add the skip link.

Items 1, 2, 4 and 7 are contained changes. Item 3 is the one with real commercial upside and a dependency on the client.


---

## Fixes applied (2026-08-26)

Verified against a production build, re-measured after each change.

| # | Fix | Before → after |
|---|---|---|
| 4 | Carousel controls given a real hit area — 2 px bar kept as the visual, button padded out | **77×2 px → 77×24 px** |
| 5 | `min-height: 24px` on nav/footer links | small targets per page: **33 / 18 / 19 → 1 / 1 / 0** |
| 6 | Meta descriptions rebuilt from tagline + body + category, trimmed on a word boundary | **29 / 48 / 65 / 207 / 211 / 174 → 149–159 across all six** |
| 3 | Extraction annotation removed from the ET8484 title and `h1` | `ET8384 Dispensing Robot (page shows…)` → `ET8384 Dispensing Robot` |
| 7 | Skip link added (`.skip-link` → `#main`), visible on focus | verified under forced `:focus`: appears at top 12 px, 39 px tall |
| 8 | `body` `overflow-x: hidden` → `clip` | scroll-container ancestors: **1 → 0** |
| — | `/why-promation` title de-duplicated | `Why PROMATION USA — … \| PROMATION USA` → `Why PROMATION — …` |
| 1 | `Reveal` horizontal offsets fall back to a vertical rise below 640 px | mobile reveals no longer slide in from off-canvas |

**Still open, and why:**

- **#2 product imagery** — blocked on photography (see the client request list).
- **#8 sticky travel** — needs a layout decision on sidebar composition.
- **`/products` at 111 headings** — resolved by the category-hub architecture, not a patch.

### Two corrections to this audit's own findings

1. The mobile overflow was reported as Critical. Verification showed scrolling is blocked and the
   displaced elements are transparent — no user impact. Corrected above.
2. The skip link initially measured as "not visible on focus". That was a headless artifact:
   Chrome does not match `:focus` on programmatic focus when the page itself is unfocused. Forcing
   the pseudo-state through the debugger showed it working correctly.
