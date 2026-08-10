# Conversion Rate Optimization (CRO) Audit — promationusa.com
Audited 2026-08-08 against the live site. Evidence: desktop/mobile screenshots (`screenshots/`), saved HTML (`page_*.html`, store pages), live fetches of `/careers`, `/tm12`, `/virtual-training-gallery`.

**Overall conversion score: 31/100**

Primary conversions assessed: (1) sales inquiries phone/email, (2) quote requests, (3) store parts orders, (4) newsletter signups, (5) resume submissions.

---

## 1. Conversion paths — clicks from entry page to a human

| Entry page | Path to inquiry | Clicks + friction |
|---|---|---|
| Model page (/9544cj, /tm12) | Small tertiary right-aligned "Request info" link → /contact → scroll past stars/awards/map → 11-required-field form | 2 clicks + ~3 screens of scroll + 11 fields |
| Category pages (/pcb-handling, /robotic-soldering-glance, TM cobot pages) | **No CTA at all in page body** — user must find "Contact" in nav | 2 clicks, zero on-page prompting |
| Home | Hero "GET STARTED" is baked into the banner **image**; the whole slide has a `clickthroughUrl` to /contact but there is no real button element — discoverability is luck | 1-2 clicks |
| Store product | Add To Cart → checkout (see §7) | n/a |

There is no path shorter than "find contact page, scroll, complete a long form." No sticky header CTA, no phone in header, no chat, no per-product inline form.

### CTA inventory (site-wide button sweep of saved HTML)
- /9544cj + /tm12: `Request info` → /contact (tertiary style, small, right-aligned, easily missed)
- /pcb-handling: `product catalog` → brochure PDF
- /quick-usa-6101a1: `buy now` → store
- /robotic-soldering-glance, /what-we-do, TM pages, /events, home: **zero CTA buttons**
- The string "request a quote" / "RFQ" / "get a quote" appears **nowhere on the site**. For a capital-equipment B2B seller, the single highest-intent phrase buyers look for is absent.

## 2. Contact page & form (/contact) — the main conversion point, badly compromised

Above the fold: a decorative 5-star graphic, "CONTACT OUR AWARD WINNING TEAM TODAY!", and a large photo of trophies. **No phone, no email, no form visible without scrolling.** The phone number ("SPEAK WITH THE EXPERTS NOW! 1.262.764.4832") and form appear 1–2 screens down, after a Google map.

Form fields (Squarespace "EMAIL US!" form): Company Name*, First Name*, Last Name*, Email*, newsletter checkbox, Phone (optional), Country, Address Line 1*, Address Line 2, City*, State*, Zip*, **PROMATION Model Number***, message*. That is **11 required inputs**, including a full postal address and a required model number:
- Requiring the buyer's full street address for a first inquiry is classic form-abandonment friction; nothing about an email reply requires it.
- Requiring a **model number** actively blocks the highest-value visitor: the one who doesn't yet know which model they need.
- The optional field is Phone — the one field sales actually wants.
- **Known/confirmed defect:** the fixed cookie-consent bar renders directly over the Submit button region (see `screenshots/contact_mobile_full.png`) until dismissed — an obscured primary CTA.
- No response-time promise ("we reply within 1 business day"), no named human, no photo of the actual team, no confirmation expectations set.

## 3. Phone prominence & tel: linking
- **Zero `tel:` links anywhere on the site** (grepped every saved page: only one `mailto:sales@promationusa.com` per page, no tel). On mobile, the number is plain text — click-to-call is impossible without copy/paste. For a company whose #1 conversion is a phone call, this is the cheapest possible fix.
- Phone appears only mid-scroll on /contact and as small text in the footer. Not in the header on any page.

## 4. Trust elements near CTAs
- **Scam banner:** a 3-line, all-caps black banner ("BEWARE OF SCAMS... COPYRIGHT INFRINGEMENT IS A FELONY... $250,000 FINE...") is the first content on **every page**, above the logo, consuming ~14% of the mobile viewport. First impression is legal threat + fraud anxiety — the exact opposite of trust-building, and it pushes the real content down. Belongs as a one-line dismissible notice or a footer/security page.
- The 5-star graphic on /contact is decorative (not linked to any review platform, no count, no source) — borders on implying reviews that aren't shown. Store product reviews are **disabled in config** (`productReviewsEnabled:false`), so zero genuine social proof exists anywhere.
- Awards are shown as an **unlabeled photo of trophies**; nowhere are the awards named near a CTA (e.g., "Global Technology Award winner").
- Real trust assets exist but are buried in body copy with no CTA: "ONE YEAR Return on Investment", IPC-certified staff, free "Proof of Concept" lab, 20 years' experience, "PROMATION proudly serves USA, Mexico, Canada, and Europe."
- Store: "2-Day Shipping On All Orders!" is a good signal but floats alone in ~400px of dead white space; commerce config has `returnPolicy:null, termsOfService:null, privacyPolicy:null` — no policy links at checkout, a standard trust/abandonment factor.

## 5. Store checkout friction (/store)
- Above the fold: empty white space + shipping line, no products without scrolling (see `store_desktop_full.png`).
- `expressCheckout:true` in commerce config — buyers are pushed straight to checkout after adding an item, which suppresses multi-item cart building in a **consumables store** where tips + belts + filters naturally combine. (Verify intended.)
- Conveyor belts: 80 size variants in one dropdown, plus a **modal "BELT LENGTH VERIFICATION" checkbox form intercepting Add To Cart** — defensible for returns, but it's an extra interstitial on the buy button.
- All 80 belt variants priced identically ($37.50) and all 16 tip variants at $94 — if wrong, an ordering-error/refund generator.
- No return policy, no reviews, no payment-method badges, weak product titles (raw part numbers). No cross-sell links from equipment pages into store consumables (one generic /store link on /robotic-soldering-glance).

## 6. Newsletter signup
- Footer: "Subscribe for new updates and product launches!" + email + Sign Up; plus a checkbox on the contact form and a store mailing-list opt-in ("news, updates, and special offers!").
- Value proposition is generic — no incentive (no brochure, no soldering-defect guide, no new-product early access framing), no frequency promise, no sample issue. Placement is footer-only; never promoted contextually (e.g., after reading a robot page).

## 7. Lead magnets
- The product-line brochure `/s/PROMATION-PRODUCT-LINE-BROCHURE-rev-1.pdf` is **ungated and linked from exactly one page** (/pcb-handling, as a "product catalog" button). Zero lead capture, zero site-wide promotion. This is a ready-made lead magnet being given away invisibly.
- No per-model spec-sheet PDFs (specs are pasted as ~monospaced text with `&nbsp;` runs on model pages) — B2B buyers routinely need a PDF to circulate internally; offering "Download the 9544CJ spec sheet" for an email is a standard, easy lead capture.
- The **free "Proof of Concept" soldering-lab offer** ("Submit your PCB for trial today!") — arguably their strongest offer — is plain text on /robotic-soldering-glance with **no link, no form, no CTA button**.

## 8. Mobile conversion
- No click-to-call (no tel: links) — the single biggest mobile failure.
- Scam banner + cookie bar bracket the small screen; cookie bar overlaps the contact Submit.
- Hamburger nav works; no horizontal scroll; forms render fine — the blockers are the same desktop ones amplified.

## 9. Resume submissions (/careers)
- Application = "send your formal resume to: **Sales@promationusa.com**" (the sales inbox), email not hyperlinked, with a required subject-line convention ("YourName-Resume") and "up to 1 business week" response. No form, no upload, no ATS, no confirmation. Minor conversion, but maximal friction for it.

## 10. Missing B2B conversion machinery
- No RFQ/quote form (no "quote" language at all)
- No demo/lab booking flow — /virtual-training-gallery literally says "Book a Virtual Video Session Today!" with **no booking link or form** (Calendly/embedded scheduler absent)
- No live chat of any kind (no Intercom/Drift/Tawk/HubSpot detected)
- No gated content, no case studies with CTAs, no distributor-locator inquiry path
- **Measurement is broken:** the site still fires legacy Universal Analytics `UA-96180315-1` (dead since mid-2023) alongside a Google **Ads** tag (`AW-941699073`) and GTM (`GTM-PV6GFMN`). Unless GA4 lives inside GTM, they are likely buying Ads traffic with no working analytics or conversion tracking — every CRO decision is currently flying blind.
  - **Update 2026-08-10 (client-provided all-time Ads impression export + GTM container inspection):** the GTM container contains *only* Google Ads conversion machinery (2 conversion tags, enhanced conversions, conversion linker, form-submit/click/element-visibility triggers) — no GA4 anywhere. And the Ads account itself has served **zero impressions since November 2024** (after ~9 years of continuous advertising at 100k–500k impressions/month; the mid-month Oct 2024 cliff suggests billing lapse or suspension, not a deliberate pause). So the site is not currently buying traffic — the finding becomes: no analytics since mid-2023, no paid presence since Oct 2024, and no measurement in place that would have surfaced either. Raw exports: `audit/ads/`.

---

## Scorecard

| Area | Score /100 | Key driver |
|---|---|---|
| Conversion paths / CTAs | 25 | No RFQ anywhere; most product pages CTA-less; tertiary "Request info" only |
| Contact page & form | 25 | 11 required fields incl. address + model #; nothing above fold; Submit covered by cookie bar |
| Phone / click-to-call | 10 | Zero tel: links; phone absent from header |
| Trust near CTAs | 30 | Scam banner first on every page; decorative stars; reviews disabled; real proof buried |
| Store checkout | 45 | 2-day shipping good; express-checkout config, belt-verification modal, no policies/reviews |
| Newsletter | 35 | Present site-wide but zero incentive/value prop |
| Lead magnets | 15 | Brochure ungated + linked once; PoC lab offer has no CTA; no spec sheets |
| Careers | 20 | Email-to-sales-inbox with subject rules |
| Measurement | 10 | Dead UA tag + live Ads tag |
| **Overall** | **31** | |

## Prioritized recommendations

**Quick wins (hours, no redesign):**
1. Wrap every phone number in `tel:1-262-764-4832` and add phone + "Request a Quote" button to the site header.
2. Cut the contact form to Name, Company, Email, Phone, Message (drop the address block; make Model Number optional); fix the cookie bar so it never overlays the Submit button; retitle form "Request a Quote."
3. Demote the scam banner to a single dismissible line (or footer notice) so brand/hero content leads every page.
4. Add a primary-styled "Request a Quote" button (top and bottom) to every product/model/category page; link the "Submit your PCB for trial today!" line to the contact form with a pre-filled subject.
5. Install GA4/verify GTM conversion tracking before spending another Ads dollar.

**Medium (days):**
6. Promote the brochure site-wide behind a name+email gate (keep an ungated fallback); generate per-model spec-sheet PDFs as gated downloads.
7. Add an embedded scheduler (Calendly-class) for virtual training / demo booking on /virtual-training-gallery, /events, and model pages.
8. Enable Squarespace native product reviews; add return/shipping/ToS policies to checkout; reconsider express checkout to allow multi-item consumable carts.
9. Contact page: move phone + form above the fold; add a response-time promise, named sales contact, and labeled award names next to the form.
10. Careers: dedicated jobs@ address as a mailto: link or a simple upload form.

**Structural:**
11. Add cross-links from every equipment page to its consumables in the store (tips, feed tubes, filters) — revenue + repeat-purchase loop.
12. Newsletter: give it a reason to exist ("new product launches + application notes, 1×/month") and offer the brochure as the signup incentive.
