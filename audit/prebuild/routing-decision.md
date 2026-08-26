# Routing Decision — flat slugs vs. category-nested URLs

Date: 2026-08-10. **Internal decision record — not a client deliverable.** This is an agency/build call, made on Promation's behalf; the client deck states the resulting approach, not the deliberation. Affects the redirect map (`redirect-map.csv`, 351 rows), the site architecture (`site-architecture.md`), and the wireframe set.

**Decision: category-nested (Option B).** Rationale and safeguards below.

---

## The situation

The architecture blueprint and the 301 redirect map both target **category-nested URLs**:

```
/robotic-soldering                      ← category hub
/robotic-soldering/quick-9434           ← model page
/dispensing/et8484
/compare/quick-vs-japan-unix
/guides/soldering-robot-cost
```

The code currently in the repo implements **flat slugs** via a single dynamic route, `src/app/[slug]/page.tsx`:

```
/quick-9434-soldering-robot
/et8484-dispensing-robot
/pcb-handling
```

That flat pattern mirrors the live site's structure. It works, and it is the reason migration looks deceptively easy — but it is a different tree than the one the redirect map and content plan assume, and the two cannot both be right.

Also present from the old structure: `/what-we-do`, `/partners`, `/virtual-training-gallery`, `/events` — all carried into the rebuild, all marked KILL or MERGE in `content-inventory.csv`.

---

## Option A — keep flat slugs

**Pros**
- Zero-change migration for the ~40 URLs that currently rank: the crown-jewel QUICK model pages keep their exact addresses, so no equity transfer risk at all on the pages that matter most.
- Simplest routing; one dynamic segment already built and working.
- Fewer redirects to test on launch day.

**Cons**
- No URL-level topical signal. `/quick-9434-soldering-robot` tells a crawler nothing about a soldering category; `/robotic-soldering/quick-9434` does.
- Breadcrumb hierarchy has to be asserted in markup only, with no path to back it.
- Category hubs and model pages live in the same namespace as `/about` and `/careers` — a flat pile of ~160 URLs with no structure for humans or crawlers to read.
- Scaling problem: comparison pages, guides, cost pages and LPs all still need their own prefixes (`/compare/`, `/guides/`, `/lp/`), so the site ends up **half-nested anyway** — the inconsistency is worse than either pure option.
- Slug collisions get likelier as the catalog grows (models across categories sharing numbers).

## Option B — category-nested (what the architecture and redirect map assume)

**Pros**
- URL states the topic. Every model page inherits its category's relevance signal, and breadcrumbs match the path.
- Hub-and-spoke internal linking becomes structural rather than conventional — the crawler sees the cluster.
- Consistent with `/compare/`, `/guides/`, `/lp/`, `/store/` — one mental model for the whole site.
- Room to grow: new categories don't collide with existing slugs.
- Matches the competitive pattern: the OEMs that rank (ASYS, GPD Global, FlexLink) all use nested category → product paths.

**Cons**
- Every ranking model page changes address, so the migration depends on the 301 map being correct and complete. Expect a temporary ranking wobble (typically days-to-weeks) even when redirects are perfect.
- Slightly more routing work: `/[category]/[model]` plus a category index route.
- Redirect chains must be avoided at all costs — old flat slug → new nested URL must be a single hop.

---

## Recommendation: Option B, with a safeguard

Go category-nested. The reason is not theoretical tidiness — it's that **the growth plan is a clustered content program**. The whole strategy (7 hubs, 13 comparison pages, 22 guides, hub-and-spoke internal linking) depends on topical grouping being legible. Flat slugs make every one of those relationships something we merely assert; nested paths make them something the URL proves. And since `/compare/`, `/guides/` and `/lp/` are nested regardless, Option A produces a permanently inconsistent tree.

The migration risk is real but bounded and one-time. It's also the *cheapest moment this will ever be* — the ranking pages are a known, finite set of about 40 URLs, and the redirect map for them already exists.

**Safeguards to apply:**

1. **Ship the 301 map with launch, not after.** Every old URL resolves in one hop; no chains, no loops. Already validated in `redirect-map.csv`.
2. **Prioritize the crown jewels.** The QUICK soldering, dispensing, and screw-driving model pages holding page-1 branded results get verified by hand, one at a time, on launch day (they're marked P1 in the map).
3. **Keep slugs recognizable.** Preserve model numbers exactly (`quick-9434`, `et8484`, `et7383k`) so brand-plus-model searches still match the URL text.
4. **Don't rename twice.** Whatever is chosen now must be final — a second URL change would cost far more than this one.
5. **Verify in Search Console** post-launch (once access exists) that the old URLs report as redirected rather than 404, and that the new URLs pick up impressions within a few weeks.

## Consequential follow-on

Whichever option is chosen, the old-structure pages carried into the rebuild — `/what-we-do`, `/partners`, `/virtual-training-gallery`, `/events` — should be resolved per `content-inventory.csv` rather than shipped as-is. `/events` in particular is 15 stale pages marked KILL; `/virtual-training-gallery` content belongs in `/demo-lab` as an activated conversion asset rather than a passive gallery.

## Also outstanding in the rebuild (found during review)

- **No JSON-LD anywhere in the codebase.** Schema is the single most uncontested advantage identified in the competitive research — only 1 of ~15 competitors runs a real Product-schema program. It needs to exist before launch, not after.
- **RFQ appears on `[slug]` pages only.** The pattern belongs on every product, category, and guide page per `page-templates.md`.
- **`fx/` component library** (CinematicHero, ParticleField, CursorGlow, PixelReveal, TiltCard) should get a Core Web Vitals check before launch — the audit scored performance 45/100 on the old site, and heavy client-side effects are the most common way a fast framework ends up with a slow LCP/INP.
