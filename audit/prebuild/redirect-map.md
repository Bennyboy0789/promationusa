# PROMATION USA — Migration 301 Redirect Map

Date: 2026-08-10 · Companion to `audit/prebuild/redirect-map.csv` (351 rows)
Inputs: `audit/prebuild/content-inventory.csv` (348 old URLs + verdicts) and `audit/prebuild/site-architecture.md` (new URL tree). Model slugs cross-checked against `src/content/products.json` and `src/content/news.json`.

`old_url` is the absolute legacy URL; `new_url` is a root-relative path in the new tree (platform-agnostic — prepend the production origin at deploy time).

---

## 1. Counts

### By action

| Action | Rows | Meaning |
|---|---:|---|
| `301` | 187 | KEEP/REWRITE page whose URL changes (flat slug → `/[category]/[model-slug]`, slug cleanups, hub consolidations, dated news URLs flattened) |
| `301-to-parent` | 118 | KILL pages: 101 `/news/tag/*` archives → `/news`, 15 stale event pages → `/events`, `/landing-promationusa` → `/`, `/techman-usa-1` → `/cobots` |
| `unchanged` | 36 | URL identical in the new tree (`/`, `/about`, core pages, `/pcb-handling` hub, `/store` + 21 store products, `/news`, `/events`, `/news/panda-soldering-systems`) |
| `301-consolidate` | 10 | MERGE rows collapsed **directly** to the merge-target's *new* home (single hop — never via the old canonical) |
| **Total** | **351** | 348 inventory rows + 3 added rows (`/`, `/et8484-dispensing-robot`, `/about`; `/techman-usa-1` was already in the inventory) |

### By priority

| Priority | Rows | Definition |
|---|---:|---|
| P1 | 200 | Pages that rank / earn traffic today: all product model pages, category hubs, store index + products, homepage, `/et8484-dispensing-robot` |
| P2 | 33 | Ordinary keeps: core company pages, news index + posts, utility/service pages |
| P3 | 118 | Kills (tag archives, stale events, duplicate landing page, dead alias) |

Cross-tab: 301 = 167 P1 / 20 P2 · 301-consolidate = 9 P1 / 1 P2 · unchanged = 24 P1 / 12 P2 · 301-to-parent = 118 P3.

---

## 2. The 20 highest-value redirects

The crown jewels of the migration — QUICK model pages holding page-1 branded rankings (COMP §1 SERP note), the store, and the seven hub consolidations. These must return exactly one `301` with zero intermediate hops on launch day.

| # | Old URL | New URL | Why it matters |
|---|---|---|---|
| 1 | `/quick-9434-soldering-robot` | `/robotic-soldering/quick-9434` | Page-1 branded ranking; named in task + architecture |
| 2 | `/et9484e` | `/robotic-soldering/et9484e` | Ranking QUICK E-series soldering model |
| 3 | `/9252n` | `/robotic-soldering/quick-9252n` | Ranking QUICK soldering model |
| 4 | `/et7383k` | `/screw-driving/et7383k` | ET7383K screw-driving family head |
| 5 | `/et7383kc-screw-driving-robot` | `/screw-driving/et7383kc` | Canonical survivor of the ET7383KC pair |
| 6 | `/et7383kc` | `/screw-driving/et7383kc` | Duplicate half of the pair — consolidated, single hop |
| 7 | `/et8484-dispensing-robot-copy` | `/dispensing/et8484` | The *ranking* live `-copy` slug for ET8484 |
| 8 | `/et8484-dispensing-robot` | `/dispensing/et8484` | 404 today; canonical slug likely in historical links/Ads finals |
| 9 | `/9544cj` | `/robotic-soldering/quick-9544cj` | QUICK PRO flagship (NPI-award family) |
| 10 | `/9733d-pro-model` | `/robotic-soldering/quick-9733d` | QUICK PRO model (page rebuilt — copy error fixed) |
| 11 | `/9744cj-pro-model` | `/robotic-soldering/quick-9744cj` | QUICK PRO model |
| 12 | `/9394f` | `/robotic-soldering/quick-9394f` | Model with dedicated press-release history |
| 13 | `/7483kxz` | `/screw-driving/et7483kxzc` | Legacy alias folded into ET7483KXZC per architecture §1.3 |
| 14 | `/techman-collaborative-robots` | `/cobots` | Canonical of the 4-page TechMan cluster → new cobot hub |
| 15 | `/tm-robots-at-a-glance` (+ `/tm-robot-usa`, `/techman-usa`, `/techman-usa-1`) | `/cobots` | Four-way merge, all single-hop |
| 16 | `/robotic-soldering-glance` (+ `/soldering-robot-central`) | `/robotic-soldering` | Flagship category hub consolidation |
| 17 | `/auto-dispensing-at-a-glance` | `/dispensing` | Dispensing hub replacement |
| 18 | `/auto-screw-driving-at-a-glance` | `/screw-driving` | Screw-driving hub replacement |
| 19 | `/panda-robotics-usa` (+ `/panda-robotics`, `/laser-marking-at-a-glance`) | `/laser-marking` | Cannibalizing PANDA/laser trio → one hub |
| 20 | `/store` + all 21 `/store/*` products | unchanged | Live commerce — protect with `unchanged`; verify no accidental rewrites |

---

## 3. Mapping conventions applied

1. **Architecture-named slugs win** (§1.2–1.3 of site-architecture.md), then inventory `[SLUG-CLEAN]` slugs (re-homed under their hub), then the old slug preserved under its category hub.
2. Bare-numeric QUICK soldering slugs get the `quick-` prefix (`/9152n` → `/robotic-soldering/quick-9152n`), matching the inventory's own SLUG-CLEAN precedent (`/9101` → `quick-9101`) and the architecture's `quick-9544cj` convention.
3. Dispensing pages drop the `-dispensing-robot` / `-copy` suffixes (`/et8253n-dispensing-robot` → `/dispensing/et8253n`) per architecture §1.3.
4. MERGE rows collapse two hops into one: the source 301s straight to the merge-target's **new** URL, never to the old canonical.
5. Dated news URLs flatten to `/news/[post-slug]` (slugs verified against `src/content/news.json`; `/news/2019` → `/news/new-products-for-2019`).
6. Re-homes dictated by the architecture: `qs-800` → dispensing; `c100` → `/screw-driving/c100-inline`; `s100-p4`/`s100t4` → inline soldering; `xc1000` → `/x-ray-inspection/xc-1000`.
7. Judgment calls (flagged `[JUDGMENT CALL]` in the CSV notes, revisit before launch): `/ar-smart-glasses` → `/store`, `/agv` → `/cobots/tm-amr`, `/official-robot-center` → `/why-promation`, `/robotics-division` → `/about`, `/new-products` → `/products`.

---

## 4. Validation rules (all pass on the current CSV)

1. **Coverage**: every one of the 348 inventory URLs has exactly one row; +3 added rows (`/`, `/et8484-dispensing-robot`, `/about`) = 351 ≥ 351 expected.
2. **No duplicate sources**: `old_url` is unique across all rows (enforced programmatically).
3. **No chains**: no `new_url` equals the path of any row whose action ≠ `unchanged`. Every target is either a brand-new path (`/robotic-soldering/...`, `/cobots`, `/why-promation`, `/book-service`) or an `unchanged` URL (`/news`, `/events`, `/products`, `/about`, `/pcb-handling`, `/store`, `/`).
4. **No loops**: no non-`unchanged` row targets its own source.
5. **Single hop for merges**: MERGE sources point at the merge-target's new home, not at the old canonical URL.
6. Re-run these checks after any manual edit — the generator script enforces all five and exits non-zero on violation.

Post-launch verification: crawl all 351 `old_url`s; expect exactly one `301` (or `200` for `unchanged`) and a `200` at the final target. Any `30x → 30x` pair or `404` is a launch blocker for P1 rows.

---

## 5. Implementation notes (platform-agnostic)

Redirects must be **server-level 301s** (permanent) — not meta refresh, not client-side JS. Preserve query strings. Serve the redirect on both `www` and apex host variants, and fold the host/HTTPS canonicalization into the same single hop wherever the platform allows.

### Next.js (`next.config.ts` `redirects()`)

```ts
// next.config.ts — generated from redirect-map.csv (301 = permanent: true)
// Rows with action "unchanged" are omitted; pattern rules mop up the long tails.
const redirects = async () => [
  // --- pattern rules (cover 101 tag archives, 15 event pages, 13 dated news posts) ---
  { source: '/news/tag/:tag*', destination: '/news', permanent: true },
  { source: '/events/:year(\\d{4})/:rest*', destination: '/events', permanent: true },
  { source: '/events/productronica2017', destination: '/events', permanent: true },
  { source: '/news/:y(\\d{4})/:m(\\d{1,2})/:d(\\d{1,2})/:slug', destination: '/news/:slug', permanent: true },

  // --- explicit one-to-one rows (excerpt; emit the full list from the CSV) ---
  { source: '/quick-9434-soldering-robot', destination: '/robotic-soldering/quick-9434', permanent: true },
  { source: '/et9484e', destination: '/robotic-soldering/et9484e', permanent: true },
  { source: '/9252n', destination: '/robotic-soldering/quick-9252n', permanent: true },
  { source: '/et8484-dispensing-robot-copy', destination: '/dispensing/et8484', permanent: true },
  { source: '/et8484-dispensing-robot', destination: '/dispensing/et8484', permanent: true },
  { source: '/et7383kc-screw-driving-robot', destination: '/screw-driving/et7383kc', permanent: true },
  { source: '/et7383kc', destination: '/screw-driving/et7383kc', permanent: true },
  { source: '/techman-collaborative-robots', destination: '/cobots', permanent: true },
  { source: '/landing-promationusa', destination: '/', permanent: true },
  // ... remaining ~180 rows generated from redirect-map.csv
];
export default { redirects };
```

Note: Next.js in this repo may differ from published docs — verify the `redirects()` contract against `node_modules/next/dist/docs/` before wiring this in. Explicit rows must be emitted **before** any catch-all rewrites. Percent-encoded tag paths (`%27`, `%26`, `+`) are handled by the `:tag*` pattern.

### nginx

```nginx
# --- pattern rules ---
location ~ ^/news/tag/ { return 301 /news; }
location ~ ^/events/(\d{4})/ { return 301 /events; }
location = /events/productronica2017 { return 301 /events; }
# dated news posts -> flattened slug
rewrite ^/news/\d{4}/\d{1,2}/\d{1,2}/(.+)$ /news/$1 permanent;

# --- explicit map for one-to-one rows (generate from redirect-map.csv) ---
map $uri $new_uri {
    default "";
    /quick-9434-soldering-robot      /robotic-soldering/quick-9434;
    /et9484e                         /robotic-soldering/et9484e;
    /9252n                           /robotic-soldering/quick-9252n;
    /et8484-dispensing-robot-copy    /dispensing/et8484;
    /et8484-dispensing-robot         /dispensing/et8484;
    /et7383kc-screw-driving-robot    /screw-driving/et7383kc;
    /et7383kc                        /screw-driving/et7383kc;
    /techman-collaborative-robots    /cobots;
    /landing-promationusa            /;
    # ... remaining rows from redirect-map.csv
}
server {
    if ($new_uri != "") { return 301 $new_uri$is_args$args; }
}
```

Either way, the CSV is the single source of truth: generate the platform config from it in CI rather than hand-maintaining two lists.

---

## 6. TODO — historical Google Ads final URLs (pending client export)

> **TODO (blocked on client):** The historical Google Ads **final-URL / search-terms export** (site-architecture.md AP A2/A3) has not been delivered. When it arrives:
>
> 1. Diff every historical ad final URL against `redirect-map.csv` `old_url`s.
> 2. Any final URL already covered: no action (it inherits the mapped 301).
> 3. Any final URL **not** covered (deleted LPs, UTM-bearing variants, `/landing-*` siblings, misspelled slugs that Ads pointed at): append a row, action `301`, priority **P1** (paid history = proven commercial intent), target the matching `/lp/*` page once built, else the nearest model page or hub.
> 4. Confirm query-string passthrough so legacy `gclid`/`utm_*` parameters survive the hop.
> 5. Do not relaunch Ads until the A4 gate passes (billing, GA4, conversion actions) — redirects for ad URLs ship with the site regardless.
>
> These rows are intentionally **absent** from the CSV today; no placeholder rows were added.

---

## 7. File inventory

- `audit/prebuild/redirect-map.csv` — 351 rows, columns `old_url,action,new_url,priority,notes`
- Generator/validator script (session scratchpad): re-run after any edit to re-verify the five validation rules.
