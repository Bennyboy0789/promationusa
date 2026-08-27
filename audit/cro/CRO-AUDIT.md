# Conversion Rate Optimisation Audit — promationusa.com rebuild

Instrumented audit of the Next.js rebuild running locally. Every number below
was measured in a real browser via the Chrome DevTools Protocol at two viewports — desktop
1440×900 and mobile 390×844 (iPhone 14 metrics, `mobile: true`, DPR 3) — not estimated from
source. 14 pages × 2 viewports = 28 measured page states. Raw data: `raw-measurements.json`.

**What was measured per page:** count and pixel position of every conversion element (quote
links, `tel:` links, trial CTAs), whether any of them sits above the fold *in the page body*
(as distinct from the persistent header), full document height, presence and depth of forms
with field and required-field counts, whether trust proof renders within 800px of the first
CTA, and whether any analytics or tag manager is installed.

**Method note.** Header and footer CTAs were counted separately from body CTAs throughout.
This matters: the sticky header carries a phone number and a Quote button on every page, so
"zero CTAs" would be misleading. Where this report says a page has no conversion path, it
means *in the content* — the header is still there, and that distinction is called out.

---

## Scorecard

| Dimension | Result |
|---|---|
| Conversion measurement | **None.** No GA4, no GTM, no tag of any kind, on any of 14 pages |
| Pages with an above-fold body CTA (desktop) | **2 of 14** — `/` and `/contact` |
| Pages with an above-fold body CTA (mobile) | **2 of 14** — the same two |
| Pages with zero body conversion path | **3** — `/news`, `/careers`, `/partners` |
| Worst first-CTA depth | `/products` — **8.65 screens** desktop, **20.68 screens** mobile |
| Primary form | 14 fields, 11 required, **1.55 screens** below the fold (2.63 on mobile) |
| Trust proof near the first CTA | 9 of 14 pages yes, 5 no |

---

## Finding 1 — There is no conversion measurement. *(Critical)*

`GA4: false. GTM: false.` On all 28 measured page states. No analytics library, no tag
manager container, no pixel.

This is first not because it is the hardest problem but because it invalidates the rest.
Every recommendation in this document is a hypothesis, and right now none of them can be
tested. The site cannot currently answer: how many people reached the contact form, how many
abandoned it, which product pages produce enquiries, whether anyone taps the phone number,
whether the store converts at all.

The original website audit already established the scale of the gap — Universal Analytics
died in mid-2023 and GA4 was never installed on the live site, so PROMATION has had **no
analytics of any kind for roughly three years**. The rebuild has so far inherited that state.

**Do before launch:**

1. GA4 property created under PROMATION's own account (so they own the data), deployed
   through the GTM container we already have access to.
2. Conversion events defined up front rather than retrofitted: `quote_submit`,
   `phone_click`, `trial_request`, `store_enquiry`, `spec_download`, plus `form_start` and
   `form_abandon` on the contact form specifically — see Finding 4 for why abandonment is the
   number that matters most here.
3. Search Console verified and linked to GA4.

---

## Finding 2 — `/products` is a conversion desert. *(Critical)*

The catalogue index is the deepest page on the site (8,994px desktop, 19,651px mobile) and
the first conversion element in its body does not appear until **7,788px down — 8.65 screens**.
On mobile it is **17,450px — 20.68 screens.** A visitor scrolling the product catalogue on a
phone passes twenty screens of machines before the page offers them a single way to act.

This is the page most likely to receive category and model search traffic, and it currently
functions as a browse-only index. It has three body CTAs and all three are at the bottom.

**Fix:** put a quote/trial CTA in the page header block above the category grid, and repeat a
compact one every 6–8 product cards. The `RequestQuoteBlock` component already exists — this
is placement work, not new construction.

---

## Finding 3 — Only two pages offer an action above the fold. *(High)*

`/` (first body CTA at 0.62 screens) and `/contact` (0.53) are the only pages where a visitor
who does not scroll is offered anything. On mobile the picture is identical.

Depth of first body CTA, in screens:

| Page | Desktop | Mobile |
|---|---|---|
| `/contact` | 0.53 | 0.64 |
| `/` | 0.62 | 0.54 |
| `/store/quick-191ad` | 1.02 | 1.64 |
| `/robotic-soldering-glance` | 1.03 | 6.17 |
| `/pcb-trial` | 1.24 | 1.94 |
| `/et8484-dispensing-robot` | 1.27 | 2.39 |
| `/why-promation` | 1.35 | 2.25 |
| `/quick-usa-6101a1` | 1.65 | 2.65 |
| `/what-we-do` | 2.15 | 3.59 |
| `/store` | 3.68 | 12.11 |
| `/products` | 8.65 | 20.68 |

The category page `/robotic-soldering-glance` shows the sharpest desktop-to-mobile
degradation on the site: 1.03 screens becomes 6.17, because the desktop CTA lives in a
sidebar that reflows to the bottom of the stack on mobile. `/store` degrades the same way,
3.68 to 12.11.

Model pages (`/quick-usa-6101a1`, `/et8484-dispensing-robot`) are the healthiest non-home
pages — five body CTAs each, first CTA around 1.3–1.65 screens, trust proof adjacent. Those
are the template to copy, not to change.

**Fix:** category and store pages need a CTA that survives the mobile reflow — either a
duplicate above the product grid, or a CTA block ordered before the sidebar content in the
mobile stack.

---

## Finding 4 — The contact form asks for 14 fields before it asks for the enquiry. *(High)*

Measured: **14 fields, 11 required**, form top at 1,392px — **1.55 screens** below the fold
on desktop, **2.63 screens** on mobile.

The required set includes the full company postal address — line 1, city, state, ZIP,
country — and a **PROMATION model number**, before the visitor may describe what they need.
That last one is the most consequential: it requires the prospect to already know which
machine they want, which is precisely what a visitor still evaluating suppliers does not know.

This is a faithful rebuild of the live site's form, built to parity at your explicit
instruction, and it should stay — the fields are presumably what their process needs. The
recommendation is therefore additive rather than a replacement:

**Fix:** add a short RFQ path alongside it, not instead of it. Three fields — email, company,
"what are you trying to automate?" — placed above the fold on `/contact` and embedded on
category and model pages. Route the long form to a "Formal quote request" tab or an anchor
below it. The full form still exists for people ready to use it; the short one catches
everyone who is not. Then instrument both and let the data decide, which is only possible
once Finding 1 is fixed.

**Secondary, and a hard launch blocker:** the form submits via `mailto:`
([ContactForm.tsx:101](src/components/ContactForm.tsx#L101)). This is a deliberate interim,
but it fails silently for anyone without a configured desktop mail client — which is most
mobile users. A server endpoint is required before go-live.

---

## Finding 5 — Three pages have no conversion path in the body. *(Medium)*

`/news` (3,830px), `/careers` (2,201px) and `/partners` (2,268px) contain **zero** conversion
elements outside the header and footer.

**Mitigating factor, verified.** The header is `position: sticky` with `top: 0` and stays
pinned after scroll on all three pages, carrying both the phone link and the Quote button. At
390px the Quote button was confirmed rendered and tappable at **58×33px**. So these are not
true dead ends — a visitor always has a route out. But that route is persistent navigation
chrome, which converts far below an in-content offer, and `/news` in particular receives the
press-release traffic the original audit identified as the site's most consistent organic
entry point.

**Fix:** append `RequestQuoteBlock` to all three. On `/news`, also link each release to the
product line it concerns — the releases describe machines that have pages.

---

## Finding 6 — Trust proof is absent beside the CTA on five pages. *(Medium)*

Pages where no trust signal (certification, testimonial, install count, award, logo) renders
within 800px of the first CTA:

- `/store/quick-191ad` — a product page asking for a purchase decision with no proof adjacent
- `/contact` — the highest-intent page on the site
- `/what-we-do` — also the page with the fewest body CTAs
- `/news`, `/careers`, `/partners` — no CTA at all, per Finding 5

`/contact` is the priority. The moment before submitting a 14-field form is exactly when a
visitor needs a reason to believe the effort is worth it, and the page gives them none. The
`TrustStrip` component already exists and is used elsewhere.

**Partly blocked on client:** the strongest available trust asset — a real install-base
number, plus named testimonials — is on the outstanding request list. The competitive
research found that no competitor in any of their five categories publishes an install count,
so it is uncontested ground, but only PROMATION knows the figure.

---

## Finding 7 — `/what-we-do` has one body CTA, 2.15 screens down. *(Medium)*

The About page is a natural mid-funnel destination — someone deciding whether this is a
credible supplier — and it offers a single action, more than two screens down, with no trust
proof beside it. `/why-promation` does the same job far better: four body CTAs, first at 1.35
screens, trust adjacent.

**Fix:** add the trust strip and a second CTA to the mission section, and cross-link the two
pages so the About reader reaches `/why-promation`.

---

## Finding 8 — The store has no transactional path. *(Medium)*

`/store` has two body CTAs, first at 3.68 screens desktop and **12.11 screens** mobile.
`/store/quick-191ad` has one, and no trust proof.

Prices **are** displayed — 21 price nodes render on the store index and 5 on the product
page, verified directly in the DOM. But there is no cart and no checkout; ordering routes
through `mailto:` links. For a consumable like a $345 calibration tool that is a meaningful
friction cost: the purchase is small enough that a buyer will not compose an email for it.

**Decision needed from PROMATION** before this is worth engineering: are consumables meant to
be self-serve e-commerce, or a lead channel? If self-serve, it needs real checkout. If a lead
channel, it needs a one-click "Add to enquiry" that batches parts — not a mailto.

---

## What is working

Worth stating plainly, because these are the patterns to replicate:

- **Model pages are well built.** Five body CTAs, first CTA around 1.3–1.65 screens, trust
  proof adjacent, sensible page height. The strongest template on the site.
- **The homepage converts structurally.** First body CTA at 0.62 screens desktop and 0.54
  mobile, ten total conversion elements, trust adjacent. The lineup hero with category
  routing does the job the previous hero did not.
- **The sticky header is doing real work.** Phone plus Quote on every page at every viewport,
  verified tappable at 390px. It is the reason Finding 5 is Medium rather than Critical.
- **`/pcb-trial` and `/why-promation`** each have four body CTAs with trust proof adjacent —
  conversion pages behaving like conversion pages.

---

## Priority order

| # | Action | Severity | Blocked on |
|---|---|---|---|
| 1 | Install GA4 + GTM, define conversion events | Critical | Confirmation to proceed |
| 2 | Real form endpoint, replacing `mailto:` | Critical | — |
| 3 | CTA above the product grid on `/products`, repeated every 6–8 cards | Critical | — |
| 4 | Short 3-field RFQ alongside the full form | High | — |
| 5 | Mobile-order-safe CTA on category and store pages | High | — |
| 6 | `RequestQuoteBlock` on `/news`, `/careers`, `/partners` | Medium | — |
| 7 | `TrustStrip` on `/contact`, `/store/*`, `/what-we-do` | Medium | Install count + testimonials |
| 8 | Store: decide self-serve checkout vs. batched enquiry | Medium | PROMATION decision |

---

## Two corrections to earlier readings

Recorded because both were investigated and both proved wrong, and either would otherwise
have become a false finding in this report.

1. **"Mobile has no Quote button."** An automated selector matched the first
   `a[href="/contact"]` in the header, which is the desktop nav link, hidden at 0px width on
   mobile. The real mobile Quote button is the second match and renders at 58×33px. No
   defect — the header is fine.

2. **"Store prices are missing."** Three separate automated checks reported zero visible
   price nodes. A direct DOM walk then found `$345.00` in a visible `<p>` (520×40,
   `display:block`, `visibility:visible`, `opacity:1`), and a character-code check confirmed
   21 price nodes on the store index and 5 on the product page. The failing checks were
   mangling the `$` character through the shell → Node → CDP escaping chain. Prices render
   correctly.

---

## Limits of this audit

- All measurements are structural — CTA presence, position and count, form length, trust
  adjacency. They predict conversion friction; they do not measure conversion. Nothing here
  substitutes for the behavioural data that Finding 1 unblocks.
- Trust-signal proximity uses keyword and component detection within an 800px radius of the
  first CTA. A page could carry trust proof this method does not recognise.
- Two viewports only. Tablet was not measured.
- Measured against the local dev server, not the deployed site. Structural results (CTA
  position and count, form length, document height) are identical between dev and production
  builds; no performance figures are reported here, since those would not be valid from dev.

---

# Fixes applied

Everything below was implemented and then re-measured with the same instrument
against a **production build** (`next build` + `next start`), so the before and
after columns are comparable. Raw after-data: `raw-measurements-after.json`.

## Headline movement

| Measure | Before | After |
|---|---|---|
| Pages with an above-fold body CTA (desktop) | 2 of 14 | **10 of 14** |
| Pages with an above-fold body CTA (mobile) | 2 of 14 | **8 of 14** |
| Pages with zero body conversion path | 3 | **0** |
| `/products` first CTA, desktop | 8.65 screens | **0.51** |
| `/products` first CTA, mobile | 20.68 screens | **0.64** |
| `/store` first CTA, mobile | 12.11 screens | **0.59** |
| `/robotic-soldering-glance` first CTA, mobile | 6.17 screens | **0.60** |
| Trust proof near the first CTA | 8 of 14 | **13 of 14** |
| Shortest path to start an enquiry | 14 fields, 11 required | **3 fields** |

## First-CTA depth, in screens

| Page | Desktop before → after | Mobile before → after |
|---|---|---|
| `/products` | 8.65 → **0.51** | 20.68 → **0.64** |
| `/store` | 3.68 → **0.51** | 12.11 → **0.59** |
| `/robotic-soldering-glance` | 1.03 → **0.48** | 6.17 → **0.60** |
| `/what-we-do` | 2.15 → **0.78** | 3.59 → **1.32** |
| `/quick-usa-6101a1` | 1.65 → **0.55** | 2.65 → **0.59** |
| `/et8484-dispensing-robot` | 1.27 → **0.48** | 2.39 → **0.61** |
| `/store/quick-191ad` | 1.02 → **0.42** | 1.64 → **0.46** |
| `/news` | none → **0.51** | none → **0.59** |
| `/careers` | none → **1.73** | none → **3.03** |
| `/partners` | none → **1.81** | none → **3.97** |

## What changed

**Finding 1 — conversion measurement.** `Analytics.tsx` loads a GTM container
and a delegated click listener instruments every CTA on the site: `tel:` links,
`mailto:` links, PDF links, and anything carrying `data-cta`. Store orders and
trial requests are marked so they do not collapse into a generic email click.
Both forms emit `form_start`, `form_abandon` and a submit event. The listener
runs unconditionally, so nothing needs revisiting later; the container itself
only loads when `NEXT_PUBLIC_GTM_ID` is set, so no tag and no cookie ships until
PROMATION has a property of their own.

Delegation was chosen over per-CTA handlers deliberately: a distributed set of
`onClick` props rots the first time someone adds a link and forgets one.

*Still shows `gtm: false` in the after-data, and correctly so — the ID is not
set. That is the one CRO item that cannot be closed from inside the repo.*

**Finding 2 — `/products`.** A `CtaBar` sits directly under the hero, and an
`InlineAsk` closes every second division, so nobody scrolls more than two
divisions of machines without being offered a next step. Body CTAs went 3 → 14.

**Finding 3 — above-fold actions.** The same `CtaBar` was added to the category
and model template, `/store`, `/store/[slug]`, `/news` and `/what-we-do`. It
sits outside the sidebar, so it survives the mobile reflow that was pushing the
soldering category CTA from 1.03 screens to 6.17.

**Finding 4 — the form.** `/api/enquiry` now accepts both forms, validates
server-side, screens bots with a honeypot and delivers through Resend. The long
form is **unchanged — still 14 fields, 11 required**, exactly as specified. What
changed is that it is no longer the only way in: a three-field RFQ (work email,
company, "what are you trying to automate?") sits in the `/contact` hero at
**0.16 screens** on desktop and **0.53 screens** on mobile, and replaces the
button-only card in the model-page sidebar.

Delivery falls back to the original `mailto:` when the server has no mail
credentials, so the launch blocker is closed the moment `RESEND_API_KEY` and
`ENQUIRY_FROM` are set — with no further code change, and nothing regressing in
the meantime.

**Finding 5 — dead ends.** `/news`, `/careers` and `/partners` each gained a
`RequestQuoteBlock` with copy specific to why someone is on that page. Zero
pages now have no body conversion path.

**Findings 6 & 7 — trust and `/what-we-do`.** `TrustStrip` added beside the
`/contact` form, the store order button and the About counters. `/what-we-do`
went from 1 body CTA at 2.15 screens to 7 at 0.78, and now cross-links to
`/why-promation`.

## One number that reads worse and should not

`/contact` first-CTA depth went 0.53 → 0.96 desktop and 0.64 → 1.39 mobile, and
mobile lost its "above fold" flag. This is a measurement artefact, not a
regression: the probe counts conversion **links**, and the thing now sitting
above the fold is a **form**, whose submit control is a `<button>`. Measured
directly, the short RFQ renders at 144px on desktop and 444px on mobile — above
the fold at both, and a shorter path to an enquiry than the link it displaced.

## Still open

| # | Item | Why it is not done |
|---|---|---|
| 1 | Set `NEXT_PUBLIC_GTM_ID`, create the GA4 property | Needs a container under PROMATION's account. Code is ready. |
| 2 | Set `RESEND_API_KEY` + `ENQUIRY_FROM` | Needs a verified sending domain. Endpoint is built and tested. |
| 3 | Store: self-serve checkout vs. batched enquiry | A business decision, not an engineering one — see Finding 8. |
| 4 | Real install-base number and named testimonials | Only PROMATION has these; on the outstanding request list. |
| 5 | Per-release product links on `/news` | Needs an editorial pass mapping releases to product lines. |

Configuration for items 1 and 2 is documented in `.env.example`, including the
full list of conversion events to register in GA4.
