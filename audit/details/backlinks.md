# Backlink Profile Analysis — promationusa.com
Date: 2026-08-08
Sources: Common Crawl CDX index (free, confidence 0.50), direct HTTP verification of candidate linking pages (confidence 0.90 for confirmed hyperlinks). No Moz/Bing/DataForSEO credentials configured (Tier 0 only). No live web-search tool was available in this session — DuckDuckGo HTML search returned a bot-challenge page (blocked), and Bing HTML search returned an empty/bot-blocked result page, so broad "site:-exclusion" search discovery was not possible. Findings below rely on Common Crawl + direct fetches of named candidate sites/pages only (per task brief), not an exhaustive web search.

## Common Crawl (Tier 0, confidence 0.50)
- Queried CC-MAIN-2026-30 and CC-MAIN-2026-25 indexes for `promationusa.com`.
- CC-MAIN-2026-30: only 1 capture — `robots.txt`, with HTTP status **403** (blocked).
- CC-MAIN-2026-25: **0 captures** ("No Captures found for: promationusa.com").
- Root cause found: promationusa.com's robots.txt (Squarespace-generated) explicitly disallows `CCBot` (and ClaudeBot, GPTBot, Amazonbot, Bytespider, etc.) for `User-agent: *` sections that include CCBot. Verified live: `curl -A "CCBot/2.0..." https://www.promationusa.com/robots.txt` → 403, while a normal browser UA → 200.
- Standard search engine bots (Googlebot/Bingbot) are **not** in the blocked UA list, so this is Squarespace's default AI/archival-crawler block, not a traditional-SEO robots block — but it means Common Crawl (and thus CC-derived domain graph / PageRank / in-degree metrics) has **zero usable data** for this domain. Domain-level CC graph metrics: **unavailable**, not merely low.

## Confirmed backlinks (direct fetch verification)
| Linking domain | Page | Link type | Anchor text | Confidence |
|---|---|---|---|---|
| smttoday.com | /2026/07/17/promation-highlights-top-10-reasons-.../ | Dofollow (`rel="noopener"` only, no nofollow) | "www.promationusa.com" (naked URL) | 0.90 (verified href) |
| smttoday.com | /2026/02/25/promation-expands-into-mexico-.../ | Dofollow, same pattern | "www.promationusa.com" | 0.90 |
| smttoday.com | 2 more press-release articles found via on-site search (4/28/2026 UberSMT piece; 7/17/2026 duplicate) not individually fetched | Likely same pattern | — | 0.60 (unverified, inferred from search index) |
| globalsmt.net | /new-products/promation-usa-launches-next-generation-panda-laser-marking-system-.../ (sister publication, same press-release network as smttoday.com) | **No promationusa.com href or text found** in fetched HTML — link either absent, JS-rendered, or paginated out of the static response | n/a | 0.70 (verified absence in static HTML; not 100% certain nothing renders client-side) |
| horizonsales.com (named distributor partner) | /supplier/promation/ dedicated supplier page | Only present in **schema.org JSON-LD `sameAs`** field (`"sameAs":["https://www.promationusa.com"]`) — **no visible/crawlable `<a href>` anchor link found** in page body | n/a (structured data only) | 0.90 |
| panda-usa.com | homepage meta description: "Panda Robotics, a Division of PROMATION USA" | This is PROMATION's **own subsidiary/brand site**, not a third-party domain — not a true external backlink candidate | n/a | 0.85 |

## Not confirmed / no signal found
- circuitsassembly.com — 0 mentions in on-site search.
- emsnow.com — 1 loose text match, no promationusa.com href; inconclusive, likely unrelated snippet.
- iconnect007.com — 1 loose text match via search endpoint, no href; inconclusive.
- quick-global.com — search endpoint returned 404 (no results page format found); could not verify.
- techman-robot.com / tm-robot.com — unreachable (connection failure / 404) within budget; could not verify partner reciprocal link.
- No trade-show exhibitor listing pages (SMTA, IPC APEX, Productronica, Automate) were checked due to time cutoff.

## Anchor text pattern
- All confirmed dofollow links use the **naked URL as anchor text** ("www.promationusa.com"), not branded or keyword-rich anchors. This is a low-diversity but low-risk (non-manipulative) pattern — typical of press-release boilerplate, not manual link building.

## Toxic-link risk signals
- No evidence of paid-link networks, PBNs, or spammy directories in the confirmed set.
- All confirmed links come from legitimate SMT/electronics-manufacturing trade publications — low toxicity risk.
- Risk is not "toxic links" but **link scarcity**: very few confirmed, independently-earned dofollow links.

## Data freshness
- Common Crawl: quarterly, current snapshot from ~July 2026, but domain not captured (crawler blocked).
- Direct verification fetches: real-time (2026-08-08).
