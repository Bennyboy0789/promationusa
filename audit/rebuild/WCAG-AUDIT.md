# Accessibility Audit — WCAG 2.2 Level AA

Run 2026-08-27 against a local production build of the PROMATION USA rebuild.

Driven through the Chrome DevTools Protocol: structural checks evaluated in-page, contrast
resolved by the browser's own colour engine with a rendered-pixel fallback, and the
interaction criteria exercised with real `Tab` keypresses rather than inferred from markup.

**Pages audited:** `/`, `/products`, `/robotic-soldering`,
`/robotic-soldering/quick-usa-6101a1`, `/contact`, `/store`, `/news`, `/careers`,
`/book-a-demo`, `/what-we-do`, `/why-promation`, `/pcb-trial`.

## Result

**53 failures found. 53 fixed. Zero outstanding at AA.**

| Criterion | Level | Before | After |
|---|---|---|---|
| 1.4.3 Contrast (Minimum) | AA | **39 failures** | **0** |
| 2.5.8 Target Size (Minimum) | AA | **14 failures** | **0** |
| 1.3.1 Info and Relationships | A | 10 pages | **0** |
| 1.3.5 Identify Input Purpose | AA | 1 | **0** |
| 2.4.11 Focus Not Obscured | AA | fail | **pass** |

Passing before and after, verified rather than assumed:

| Criterion | Evidence |
|---|---|
| 1.1.1 Non-text Content | 565 `<img>` across the crawl, **0** missing an `alt` attribute |
| 1.3.1 headings / landmarks / tables | one `<h1>` per page, no skipped levels, `main`/`header`/`footer` present, every table has `<th>` |
| 1.4.4 Resize Text | 200% (640px viewport) — no horizontal scroll on any page |
| 1.4.10 Reflow | 320px — `scrollWidth` never exceeds `clientWidth` |
| 2.1.1 Keyboard | 66–155 focusable controls per page, all reachable |
| 2.4.1 Bypass Blocks | skip link is the first tab stop, hidden at −48px, moves to top 12px on `Tab`, 39px tall, target exists |
| 2.4.3 Focus Order | **0** positive `tabindex`; DOM order follows visual order |
| 2.4.7 Focus Visible | 40 controls sampled per page across 6 pages — **0** without a focus indicator |
| 2.3.3 Animation from Interactions | `useReducedMotion` honoured in 13 components plus a global media query |
| 3.1.1 Language of Page | `lang` on every page |
| 4.1.2 Name, Role, Value | no unnamed buttons or links, no duplicate `id`s |
| 4.1.3 Status Messages | `aria-live` on both form result regions |

---

## What was fixed

### 1.4.3 Contrast — 39 failures

Every one traced to the same cause: **Tailwind opacity modifiers on small text.**
`text-muted/70`, `text-blue-600/60`, `text-blue-600/50` and similar dilute a colour that
passes at full strength into one that does not.

| Class | Size | Effective ratio | Needed | Where |
|---|---|---|---|---|
| `text-muted/70` | 10px | **2.87** | 4.5 | footer copyright, small mono labels — 12 pages |
| `text-blue-600/50` | 11px | **2.15** | 4.5 | breadcrumb separators, eyebrow marks — 11 instances |
| `text-blue-600/70` | 11px | **3.05** | 4.5 | news card dates |
| `text-blue-600/60` | 10–11px | **2.56** | 4.5 | category eyebrows, `[01]` index numbers |
| `text-muted/50` | 24px | **2.03** | 3.0 | partner marquee |
| `text-muted/80` | 10px | **3.45** | 4.5 | demo format durations |
| `text-slate-500` | 9px | **4.09** | 4.5 | hero `1/6` counter, on the dark band |

**Fix:** the opacity modifier was removed from all 33 instances across 19 files. The base
colours pass comfortably — `text-muted` at 5.14:1, `text-blue-600` at 4.94:1. The hero
counter moved from `slate-500` to `slate-400`. No dark-background text was touched; those
use `slate`/`sky`/`white` and were already compliant.

One element was deliberately left alone: the 60px decorative opening quotation mark at
`text-blue-600/30`. It is already `aria-hidden`, which makes it pure decoration and exempt
from 1.4.3.

### 2.5.8 Target Size — 14 failures

Standalone links and one control under the 24×24px minimum.

| Target | Was | Where |
|---|---|---|
| "Division Overview →" | 175×**14** | `/products`, 10 instances |
| "View systems →" | 122×**20** | homepage hero |
| "Or call 262.764.4832" | 360×**16** / 187×**16** | model sidebar, contact form |
| Newsletter checkbox | **16×16** | contact form |

**Fix:** `min-h-[24px]` with vertical padding on the links; the checkbox grew to 24×24 so the
hit area and the visible control agree rather than padding only the label.

### 1.3.1 Info and Relationships

Every page carried two `<nav>` landmarks with only one named — the breadcrumb had
`aria-label="Breadcrumb"`, the primary navigation had nothing. A screen-reader user listing
landmarks saw two indistinguishable "navigation" entries. The header nav is now
`aria-label="Primary"`.

### 1.3.5 Identify Input Purpose

The PROMATION model-number field had no `autocomplete` token. It has no standard token
either — it is a part number, not personal data — so it is now explicitly `autocomplete="off"`
rather than silently absent.

### 2.4.11 Focus Not Obscured (Minimum)

The header is `position: sticky` and 64px tall, and the document had no `scroll-padding-top`.
Tabbing to a control just below the viewport scrolled it flush to the top, underneath the
header. `scroll-padding-top: 5.5rem` on `html` reserves the header height, which also fixes
in-page `#anchor` jumps.

Re-tested by tabbing 50 controls per page on four pages: **zero** genuinely obscured.

---

## Advisory — not counted as a failure

**1.4.12 Text Spacing.** With the WCAG test spacing applied (line-height 1.5, letter-spacing
0.12em, word-spacing 0.16em, paragraph margin 2em), the `line-clamp` excerpts on homepage and
catalogue cards truncate more text than they do normally. Whether that is a failure is
genuinely arguable: the criterion prohibits *loss of content*, and none is lost — the card is
a preview and the full text is one click away on the page it links to. Removing `line-clamp`
would let cards grow to uneven heights and break the grid.

Flagged so the decision is recorded rather than silently made. No other element clips under
the test spacing.

---

## Corrections — findings the tooling got wrong

Recorded because each would have become a false report, and because two of them cost real
time to disprove.

1. **"Zero contrast failures" on the first pass.** Tailwind v4 emits colours as `lab()` and
   `oklab()`. A parser expecting `rgb()` or hex returned null and the elements were quietly
   skipped — including every one that actually failed. Colour conversion is now done by the
   browser through a canvas, so any notation CSS accepts resolves exactly. This is what took
   the count from "0" to the real 39.

2. **Three contrast failures that were not.** "The PANDA line", the hero phone number and
   "Send us your board" were reported as white-on-white at 1.06:1. All three are white text
   on the dark hero or a parallax band. Two causes: `next/image` renders an `<img>` rather
   than a CSS background, so a check for `background-image` misses every photographic band on
   the site; and clipped screenshots of below-the-fold elements returned page background
   until the element was scrolled into view first. Verified directly — the hero backdrop
   computes to `rgb(5, 13, 26)`, which white clears easily.

3. **"Skip link does not appear on focus."** The link has `transition: top 0.18s`, and the
   probe measured its position before the transition finished. With a real `Tab` and a 500ms
   settle it moves from −48px to top 12px. Confirmed with a screenshot.

4. **"Eleven controls obscured by the header."** All eleven were *inside* the header — the
   logo and the nav links. They are not obscured by it; they are it.

5. **"Zero focus indicators found."** The first focus pass checked 0 of 40 controls because
   the CDP node-handle path failed silently. Redone with `Emulation.setFocusEmulationEnabled`
   so `:focus-visible` matches on a programmatic focus, which is also why headless runs
   normally report this criterion as failing when it does not.

## Limits

- **Automated testing reaches perhaps half of WCAG.** Everything here is machine-verifiable.
  It does not cover whether alt text is *meaningful* rather than merely present, whether
  headings describe their sections, whether error messages are actually helpful, or whether
  the reading order makes sense to someone using a screen reader. Those need a human pass,
  ideally with assistive technology.
- **Not tested with a real screen reader.** No NVDA, JAWS or VoiceOver run.
- **12 pages of 262.** Templates repeat, so coverage is broader than the count suggests, but
  the news article and store part templates were sampled rather than swept.
- **13 text/backdrop combinations remained unmeasurable** even after the pixel fallback,
  mostly small glyphs over animated gradients.
- **Local build.** No CDN, no real network, one browser engine (Chromium 151).
