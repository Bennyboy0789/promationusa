# Action Plan — rebuild SEO audit

Prioritised from `FULL-AUDIT-REPORT.md` (79/100, run 2026-08-27 against a local production
build). Effort: **S** under an hour, **M** a day, **L** more than a day.

**Status: the entire High tier and most of Medium are now done** — see "Second pass" in the
report. Score moved 79 → 83. What remains below is either blocked on PROMATION or is Phase 2
content work. Completed rows are struck through rather than deleted so the plan stays readable
against the original audit.

---

## High — within a week

| # | Action | Effort | Blocked on |
|---|---|---|---|
| ~~H1~~ | ~~**Security headers**~~ — **done.** All six set in `next.config.ts`; verified with zero CSP violations across five page types. | S | — |
| ~~H2~~ | ~~**Trim news titles**~~ — **done.** Over-length titles 20 → 4; news articles drop the brand suffix so the headline gets the full 60 characters. | S | — |
| ~~H3~~ | ~~**Trim long descriptions**~~ — **done.** 14 → 0 over 160 characters. | S | — |
| **H4** | **Resolve ET8484 / ET8384.** The page at `/robotic-dispensing/et8484-dispensing-robot` describes an ET8384. It is the site's only duplicate title and only duplicate description. Either the URL or the content is wrong. | S | **PROMATION** — which machine is this page for? |
| ~~H5~~ | ~~**Publish `llms.txt`**~~ — **done.** Generated from the catalogue so a new category cannot go missing from it. | S | — |
| ~~H6~~ | ~~**Sitemap `lastmod`**~~ — **done.** All 150 entries, plus `changeFrequency` and `priority`. | S | — |

## Medium — within a month

| # | Action | Effort | Blocked on |
|---|---|---|---|
| **M1** | **Thicken the 18 store part pages** (123–169 words). Needs real compatibility and replacement data — which machines take the part, what it supersedes, when to replace it. Inventing that copy would be worse than leaving it thin. | M | **PROMATION** — parts data |
| **M2** | **Add a definition block and 2–3 FAQs to model pages**, as the hubs already have. This is what makes a page citable by an answer engine; only the 8 hubs are today. | M | — |
| ~~M3~~ | ~~**Descriptive `alt` on catalogue cards**~~ — **done.** Empty-alt images 429 → 253; the remainder are genuinely decorative. | S | — |
| **M4** | **Decide the Events question.** In the primary nav but retired from the index and sitemap. Either restore it to the sitemap or take it out of the nav. | S | **PROMATION** |
| ~~M5~~ | ~~**TM5-700 / TM5-900 shared description**~~ — **done.** The generator now leads with the model name, which also front-loads model-number search intent. | S | — |
| ~~M6~~ | ~~**Case-variant tag URLs**~~ — **done.** Tag URLs 97 → 87; old links still resolve. | S | — |
| **M7** | **Publish price bands** and add `price` to the `Offer` node. No manufacturer in any of the five categories publishes pricing; a distributor structurally can. | M | **PROMATION** — willing to publish? |

## Low — backlog

| # | Action | Effort | Blocked on |
|---|---|---|---|
| L1 | **`aggregateRating` schema.** Cannot ship without real reviews — fabricating them is a manual action risk. Needs a review-collection flow first. | M | **PROMATION** — reviews |
| L2 | **`VideoObject` schema.** The catalogue holds one video URL. The screw-driving video the research flagged as already surfacing in Google is not in the content set — get the URL and transcript. | M | **PROMATION** — video assets |
| L3 | **Author attribution** on news and future guides. Adds an E-E-A-T signal the site has no other way to earn. | S | — |
| L4 | **Reduce image source weight.** 52MB across 293 photographs. Fine to ship, worth revisiting if the repo becomes unwieldy. | S | — |

## Phase 2 — the growth programme, unchanged

These were always Phase 2 in the client deck and remain the largest available lever. They are
listed here so the plan stays whole, not because they are newly late.

- **`/compare/` — ~13 pages** into SERPs the research verified as empty: QUICK vs Japan Unix,
  Apollo Seiko alternative, 9434 vs TMT-R9800S, ET8484 vs Fisnar F4200N.2, PANDA vs INSIGNUM,
  benchtop vs cobot screwdriving.
- **`/guides/` — ~22 pages.** Cost guides first: "how much does a [soldering / dispensing /
  screwdriving] robot cost" has no credible answer anywhere in the market.
- **`/lp/` — 6–12 ad landing pages.** The gate for relaunching Google Ads, which have served
  zero impressions since November 2024.
- **`/brands/` — 5 pages.** Phase 1 in the deck, still unbuilt; needs positioning copy.

## Still needed from PROMATION

Consolidated from the blocked rows above, in the order that unblocks the most:

1. **Which machine is the ET8484 page for?** One answer clears the site's only duplicate
   title and duplicate description.
2. **GTM container ID and Resend credentials.** Until these exist there is no conversion
   measurement and enquiries fall back to `mailto:`.
3. **4–6 testimonials and an install-base number.** The largest single content gap, and the
   one place the competitive set has nothing to counter with.
4. **A decision on publishing price bands.**
5. **The screw-driving video URL** plus a transcript.
6. **Events: live or retired?**
