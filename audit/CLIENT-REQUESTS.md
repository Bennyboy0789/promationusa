# What we need from PROMATION

Consolidated from the website audit, the competitive research, the Google Ads forensics and the
UI/UX audit. Ordered by what unblocks the most work.

---

## 1. Photography — the biggest single blocker

This is the one thing holding back both the product pages and the visual design. Everything else
on this list is a form or a login; this needs a camera.

**The situation:** of 107 products in the catalogue, **one** has usable photography. The other
image entries turned out to be descriptive notes from the content extraction, not pictures.
Separately, every existing category photo has PROMATION's **blue diagonal graphic burned into the
image file** — the largest genuinely clean rectangle in those files is 121–330 px wide, so they
cannot be used as full-bleed backgrounds. Only one asset on the whole site (`hq.webp`, the PANDA
cell) is high-resolution and clean.

**What to ask for, in priority order:**

1. **Product shots for the machines that sell** — the QUICK soldering models, the ET dispensing
   series, and the screw-driving range. Even a consistent set of 10–15 hero models transforms the
   product pages.
2. **Category photography for screw driving and X-ray inspection** — these two have *no* imagery
   at all, so they currently show a typographic placeholder while every other line shows a machine.
   Screw driving especially, since the research identified it as the most winnable category.
3. **Clean, high-resolution versions without the blue graphic** — wide format (2000 px+) so they
   can carry full-bleed sections the way `hq.webp` does.
4. **A headshot of Gary Goldberg** for the quote on `/what-we-do` — the slot is built and currently
   renders a monogram. Worth getting **Mike Goldberg's** at the same time, since he is quoted
   across most of the press releases.

If a shoot is not realistic, ask whether they have an existing product-photography library from
the OEMs (QUICK, PANDA, TechMan, SEAMARK usually supply dealer image kits).

---

## 2. Access — free, fast, and it closes the biggest analytical gap

- **Google Search Console.** No property appears to be verified. This is the single biggest hole in
  the audit: we have no data on what the site actually earns in impressions, which queries it
  appears for, or how much of it is indexed. Free, takes minutes.
- **Google Analytics.** There is currently **no analytics of any kind** running — Universal
  Analytics died in mid-2023 and GA4 was never installed. With GTM access already granted we can
  deploy GA4 ourselves; we just need confirmation to proceed and a property created under their
  account so they own the data.
- **Google Ads.** The account has served **zero impressions since November 2024** after roughly nine
  years of continuous advertising. Two things needed: someone to check billing/suspension status,
  and an export of the **all-time search terms report** — a decade of real converting queries is the
  only keyword-demand data available to us right now.

---

## 3. Business questions that change what we build

These are the ones where a wrong assumption costs real build time.

- **Which product lines actually drive revenue, and which do they want to grow?** The content plan
  currently prioritises by SEO opportunity. If screw driving is 5% of revenue and soldering is 70%
  through relationships, the priority order changes.
- **Are they willing to publish price bands?** A large part of the strategy — the cost guides, price
  columns, "starting at" anchors — rests on doing the one thing no manufacturer in their competitive
  set does. Plenty of distributors refuse on principle. Better to know now than after it is built.
- **Which markets genuinely matter?** The site claims Mexico, Canada and Europe with no supporting
  content anywhere. Are those real targets or aspirational boilerplate?
- **Do they do demos — in person, virtual, or both?** The demo CTA appears throughout the wireframes.
  Their site advertises a virtual video session, so that much is safe.

---

## 4. Facts we need to state correctly

- **The ET8484 / ET8384 question.** The page at `/et8484-dispensing-robot` describes an **ET8384**
  while the URL says ET8484. The published title carried an internal note about the discrepancy —
  that note is now removed, but the underlying question stands: which machine is this page for? The
  answer decides whether the URL or the content changes.
- **The install-base number.** "X,XXX systems installed in North America" is an uncontested trust
  signal — the research found that **nobody** in any of their five categories publishes one. Only
  they know the figure. It is built into the design already, waiting on a number.
- **Canonical company details** — one name, one address format, one phone format. There are
  currently four phone formats across the site, and at least one third-party listing carries a wrong
  address.
- **Is the free PCB trial still an active offer?** The wireframes and the new `/pcb-trial` page lean
  on it as a primary conversion asset.
- **YouTube view counts** from their own Studio. The claim that the screw-driving video performs
  well is plausible and strategically useful, but view counts are not externally measurable.

---

## 5. Content they alone can supply

- **Testimonials or a case study** — 4–6 with names and company logos. The competitive research
  found this is where they lose most visibly: rivals show rated testimonials and NASA/Boeing logos,
  PROMATION shows none. Even two named quotes would close most of the gap.
- **Spec sheets / PDFs** for the model pages. Spec tables are the page type that ranks in this
  market, and someone has to supply the numbers for the models that lack them.
- **Any channel relationships** with YJ LINK or NUTEK, if they exist — it changes whether those
  companies are treated as competitors or partners.

---

## Suggested framing for the conversation

Items 1 and 2 unblock the most work for the least effort on their side. If the call is short, lead
with **photography** and **Search Console access** — the first is the visual ceiling on the rebuild,
the second is the measurement floor for everything after launch.
