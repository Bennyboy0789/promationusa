# Schema.org / Structured Data Audit — promationusa.com
Audited live (rendered HTML fetched via curl) on 2026-08-08.
Platform: Squarespace 7.1.

## 1. Pages Audited & What Schema Exists

Every page on the site (all 12 checked) ships the **same 3 Squarespace-native JSON-LD blocks** in the `<head>`, regardless of page content/type:

| Page | Squarespace default (WebSite/Organization/LocalBusiness) | Page-specific schema |
|---|---|---|
| `/` (home) | Yes | — |
| `/what-we-do` | Yes | — |
| `/pcb-handling` (category) | Yes | None (no ItemList/CollectionPage for the product grid) |
| `/quick-usa-6101a1` (product) | Yes | **None** — this is a regular content page, not a `/store` item, so Squarespace does NOT auto-generate Product schema |
| `/9544cj` (product) | Yes | **None** — same as above |
| `/news` (blog index) | Yes | None (no ItemList/Blog schema for the index) |
| `/news/2025/10/28/the-next-generation-of-laser-marking-by-panda-robotics-usa` | Yes | **`Article`** (auto-generated) |
| `/events` | Yes | **None** — despite the page rendering structured event data (dates, venues, times) in HTML, no `Event` JSON-LD is emitted. All listed events are from **2023** (stale). |
| `/contact` | Yes | — |
| `/store` (index) | Yes | None (no ItemList of the 21 products) |
| `/store/quick-ts1200` (store product) | Yes | **`Product`** w/ nested `Offer` (auto-generated, because this item lives in the Commerce/`/store` system) |
| `/careers` | Yes | **None** — despite an actual open req ("Robotic Soldering Technician — Kenosha, WI, Full-time") in page copy, no `JobPosting` schema exists |

**Key structural finding:** Product schema is only emitted for items sold through Squarespace Commerce under `/store/*`. The 19 non-commerce "product" pages (e.g. `/quick-usa-6101a1`, `/9544cj`) that live under category sections like `/pcb-handling` get **zero** Product markup — they only inherit the generic sitewide WebSite/Organization/LocalBusiness blocks. This is the single biggest structured-data gap on the site given it's described as a 21-product catalog.

No Microdata or RDFa found anywhere (`itemscope` count = 0 on all 12 pages). All markup is JSON-LD, which is correct per Google preference.

## 2. Raw Squarespace Default Blocks (identical on every page)

```json
{
  "@context": "http://schema.org",
  "@type": "WebSite",
  "url": "https://www.promationusa.com",
  "name": "PROMATION USA",
  "description": "<p><strong>PROMATION</strong> provides premium automated solutions...</p>",
  "image": "//images.squarespace-cdn.com/.../website+logo+2021+on+white.jpg"
}
```
```json
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "legalName": "PROMATION INC.  USA",
  "address": "9900 58th Place  Suite#100\nKenosha, WI, 53144\nUnited States",
  "email": "sales@promationusa.com",
  "telephone": "(262) 764-4832",
  "sameAs": [
    "https://www.youtube.com/channel/UCjKi1_rUM2q2pAiAO626yDw",
    "https://www.facebook.com/PROMATIONUSA/",
    "http://instagram.com/promationusa",
    "https://www.linkedin.com/company/promation-usa/"
  ]
}
```
```json
{
  "@context": "http://schema.org",
  "@type": "LocalBusiness",
  "name": "PROMATION INC.  USA",
  "address": "9900 58th Place  Suite#100\nKenosha, WI, 53144\nUnited States",
  "image": "https://static1.squarespace.com/.../1781191193689/",
  "openingHours": "Mo 08:00-17:00, Tu 08:00-17:00, We 08:00-17:00, Th 08:00-17:00, Fr 08:00-17:00, , "
}
```

Article block (`/news/.../the-next-generation-of-laser-marking...`):
```json
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "The Next Generation of Laser Marking by PANDA ROBOTICS USA — PROMATION USA",
  "url": "https://www.promationusa.com/news/2025/10/28/the-next-generation-of-laser-marking-by-panda-robotics-usa",
  "datePublished": "2025-10-28T10:59:31-0500",
  "dateModified": "2025-10-28T11:05:57-0500",
  "headline": "The Next Generation of Laser Marking by PANDA ROBOTICS USA",
  "author": "PROMATION Inc.",
  "publisher": {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "PROMATION USA",
    "logo": {"@type": "ImageObject", "url": "https://static1.squarespace.com/.../1781191193689/"}
  },
  "image": "http://static1.squarespace.com/.../IMG_0380.jpeg?format=1500w"
}
```

Product block (`/store/quick-ts1200`):
```json
{
  "@context": "http://schema.org",
  "@type": "Product",
  "name": "QUICK TS1200 — PROMATION USA",
  "image": "http://static1.squarespace.com/.../TS1200HandSolderingStation.jpg?format=1500w",
  "description": "The QUICK TS1200 is an intelligent lead-free soldering station...",
  "brand": "PROMATION USA",
  "offers": {
    "@context": "http://schema.org",
    "@type": "Offer",
    "price": 1222.0,
    "priceCurrency": "USD",
    "url": "https://www.promationusa.com/store/quick-ts1200",
    "availability": "InStock",
    "sku": "QUICK TS1200"
  }
}
```

## 3. Validation Results (per checklist)

| Check | Result |
|---|---|
| `@context` is `https://schema.org` | **FAIL** — every single block sitewide (all 5 types) uses `http://schema.org` (no `s`). Non-fatal (Google normalizes it) but not best practice. Platform-level; not editable without full custom injection. |
| `@type` valid & not deprecated | PASS — WebSite, Organization, LocalBusiness, Article, Product, Offer are all valid, current types. No HowTo/FAQPage/SpecialAnnouncement present (good — no deprecated-type risk). |
| Required properties present | **PARTIAL FAIL** — see below per type. |
| Property value types correct | **FAIL** in 3 places (see below). |
| No placeholder text | PASS — all sampled values are real content. |
| URLs absolute | **FAIL** — WebSite `image` is protocol-relative (`//images.squarespace-cdn.com/...`); Article `image` and Product `image` are `http://` (not `https://`) even though the site itself serves over https — mixed-content/insecure-URL warning risk in validators. |
| Dates ISO 8601 | PASS — Article `datePublished`/`dateModified` are valid ISO 8601 with offset. |

Type-specific issues:
- **Organization/LocalBusiness `address`**: a single free-text string, not a `PostalAddress` object (`streetAddress`/`addressLocality`/`addressRegion`/`postalCode`/`addressCountry`). Google's Rich Results Test will accept it but it's non-conformant and weakens Knowledge Panel / Local Pack eligibility.
- **Organization missing `logo`**: `WebSite.image` and `LocalBusiness.image` are populated but `Organization.logo` (the property Google actually reads for logo rich results / Knowledge Panel) is absent.
- **LocalBusiness missing `telephone`, `geo`, `priceRange`, `url`**: present on Organization but not carried onto the LocalBusiness node.
- **`openingHours` malformed**: trailing `", , "` — empty tokens for Sat/Sun. Should either omit or explicitly state closed days.
- **Two competing entities (Organization vs. LocalBusiness) with no `@id`**: Google's Merchant/KG parsers can't tell these are the same entity, risking duplicate/conflicting entity data.
- **Article `author` is a bare string** ("PROMATION Inc."), not a `Person`/`Organization` object — fails Google's recommended (and increasingly enforced for E-E-A-T signals) author markup shape.
- **Article/Product images served over `http://`** on an https site — should be corrected to `https://`.
- **Product `Offer.availability`** uses bare string `"InStock"` instead of the schema.org enumerated URL `https://schema.org/InStock`. Works in most validators but not spec-correct.
- **Product missing** `sku`(present)/`gtin`/`mpn`, `priceValidUntil`, `aggregateRating`/`review`, and — most importantly for 2023+ Google Product rich-result eligibility — `shippingDetails` and `hasMerchantReturnPolicy`. Without these, the product cannot qualify for Google's Product snippet/Merchant listing experience even though base Product/Offer markup exists.

## 4. Missing Schema Opportunities

1. **BreadcrumbList** — absent on all 12 pages, including deep pages like `/pcb-handling` → `/quick-usa-6101a1` and `/store` → `/store/quick-ts1200`. High-value, low-effort, no downside. **Critical.**
2. **Product schema on non-commerce product pages** (`/quick-usa-6101a1`, `/9544cj`, and presumably ~17 more like them) — these render spec sheets/pricing-adjacent content but get zero Product markup because they're outside the `/store` commerce template. **Critical** — this is most of the 21-item catalog.
3. **JobPosting on `/careers`** — an actual open role ("Robotic Soldering Technician," Kenosha WI, full-time) is on the page with no schema. Missing Google for Jobs eligibility entirely. **High.**
4. **Event schema on `/events`** — page has structured event data (name, start/end datetime, venue, address) rendered in HTML but no `Event` JSON-LD. Also a content-freshness issue: all listed events are dated **2023**, so even if schema were added, `startDate`s are in the past — fix content before/alongside adding schema. **High** (schema) / flag stale content separately.
5. **ItemList/CollectionPage on `/store` and `/pcb-handling`** — category/listing pages with no structured list of their child products. **Medium.**
6. **PostalAddress structuring + `geo`/`priceRange` on LocalBusiness** — needed for stronger Local Pack/Knowledge Panel eligibility for the Kenosha HQ. **Medium.**
7. **Organization `logo`** property — needed for logo rich results. **Medium.**
8. **FAQPage** — no FAQPage found anywhere (correctly, none should exist for Google rich results since this is a commercial site, restricted Aug 2023). If any "at a glance" category pages (e.g., "Robotic Soldering At a Glance") carry Q&A-style content, FAQPage markup would **not** earn a Google rich result but could still aid AI/LLM (GEO) citation — **Info priority only**, not recommended purely for Google.
9. **BlogPosting vs Article on `/news` index** — consider a `Blog`/`ItemList` wrapper on the index page itself; individual articles are fine using `Article` (NewsArticle would also be valid given editorial/press-release nature, but Article is acceptable).
10. **VideoObject** — site references a "Virtual Training Gallery" nav item; if that page hosts video content, it's a candidate for `VideoObject` (not audited directly in this pass — flag for follow-up).

## 5. No Deprecated/Restricted Schema Found
No HowTo, SpecialAnnouncement, CourseInfo, EstimatedSalary, or LearningVideo markup detected anywhere. No FAQPage present (so no existing-FAQ flag needed). Clean on this front.

---

## 6. Generated JSON-LD — Ready to Paste

**Implementation note:** Squarespace auto-injects its own WebSite/Organization/LocalBusiness blocks on every page and this cannot be removed, only supplemented via Settings → Advanced → Code Injection. Adding a second, more complete Organization/LocalBusiness block (as below) will coexist as a second entity description; to minimize duplicate-entity confusion, populate as much as possible via Squarespace's own Business Information / Local SEO settings first (address, phone, hours), and use the code-injection block below primarily to add what Squarespace's settings can't supply (`logo`, `geo`, `sameAs` completeness, `priceRange`, `@id` linking). Insert in **Header code injection** (site-wide) or per-page as needed.

### A. Organization + LocalBusiness (site-wide header injection)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.promationusa.com/#organization",
  "name": "PROMATION USA",
  "legalName": "PROMATION INC. USA",
  "url": "https://www.promationusa.com",
  "logo": "https://static1.squarespace.com/static/553aaccde4b0f11dcc2284f2/t/6361634f66ad9d79ed77b050/1781191193689/",
  "image": "https://static1.squarespace.com/static/553aaccde4b0f11dcc2284f2/t/6361634f66ad9d79ed77b050/1781191193689/",
  "description": "PROMATION USA provides premium automated solutions for electronics manufacturing and assembly, including PCB handling systems, robotic soldering, automatic label placement, laser marking, and workflow solutions.",
  "email": "sales@promationusa.com",
  "telephone": "+1-262-764-4832",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9900 58th Place, Suite 100",
    "addressLocality": "Kenosha",
    "addressRegion": "WI",
    "postalCode": "53144",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.youtube.com/channel/UCjKi1_rUM2q2pAiAO626yDw",
    "https://www.facebook.com/PROMATIONUSA/",
    "https://www.instagram.com/promationusa",
    "https://www.linkedin.com/company/promation-usa/"
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.promationusa.com/#localbusiness",
  "name": "PROMATION USA",
  "parentOrganization": { "@id": "https://www.promationusa.com/#organization" },
  "url": "https://www.promationusa.com",
  "telephone": "+1-262-764-4832",
  "email": "sales@promationusa.com",
  "image": "https://static1.squarespace.com/static/553aaccde4b0f11dcc2284f2/t/6361634f66ad9d79ed77b050/1781191193689/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9900 58th Place, Suite 100",
    "addressLocality": "Kenosha",
    "addressRegion": "WI",
    "postalCode": "53144",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.5847,
    "longitude": -87.8611
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$$"
}
```
*(Replace the placeholder `latitude`/`longitude` with the verified coordinates for 9900 58th Place, Suite 100, Kenosha, WI 53144 before publishing.)*

### B. Store Product + Offer (e.g., `/store/quick-ts1200`) — corrects existing block

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.promationusa.com/store/quick-ts1200#product",
  "name": "QUICK TS1200 Intelligent Lead-Free Soldering Station",
  "image": [
    "https://static1.squarespace.com/static/553aaccde4b0f11dcc2284f2/5a4b9d308165f549180373d9/5a4cf125ec212d8987c4a7ec/1514992081456/TS1200HandSolderingStation.jpg?format=1500w"
  ],
  "description": "The QUICK TS1200 is an intelligent lead-free soldering station. Utilizing a 120-watt power supply, this system is built for everyday soldering challenges and offers consistent soldering quality, with an ergonomic design and a bright LCD display.",
  "sku": "QUICK-TS1200",
  "mpn": "QUICK-TS1200",
  "brand": {
    "@type": "Brand",
    "name": "QUICK"
  },
  "manufacturer": {
    "@id": "https://www.promationusa.com/#organization"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.promationusa.com/store/quick-ts1200",
    "priceCurrency": "USD",
    "price": "1222.00",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@id": "https://www.promationusa.com/#organization"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "USD"
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "US"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 3,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 2,
          "maxValue": 7,
          "unitCode": "DAY"
        }
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    }
  }
}
```
*(Verify `priceValidUntil`, shipping, and return-policy values against actual PROMATION business terms — placeholders shown must be corrected before publishing, especially since `shippingDetails`/`hasMerchantReturnPolicy` are now required by Google for Product rich-result eligibility.)*

### C. NewsArticle (e.g., `/news/2025/10/28/the-next-generation-of-laser-marking-by-panda-robotics-usa`)

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.promationusa.com/news/2025/10/28/the-next-generation-of-laser-marking-by-panda-robotics-usa"
  },
  "headline": "The Next Generation of Laser Marking by PANDA ROBOTICS USA",
  "description": "PROMATION USA introduces the next generation of laser marking technology from PANDA ROBOTICS USA for electronics manufacturing applications.",
  "image": [
    "https://static1.squarespace.com/static/553aaccde4b0f11dcc2284f2/5a01efb09140b74b799a4e6b/6900e845631e710ab47c0ad1/1761667557256/IMG_0380.jpeg?format=1500w"
  ],
  "datePublished": "2025-10-28T10:59:31-05:00",
  "dateModified": "2025-10-28T11:05:57-05:00",
  "author": {
    "@type": "Organization",
    "name": "PROMATION Inc.",
    "url": "https://www.promationusa.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PROMATION USA",
    "logo": {
      "@type": "ImageObject",
      "url": "https://static1.squarespace.com/static/553aaccde4b0f11dcc2284f2/t/6361634f66ad9d79ed77b050/1781191193689/",
      "width": 600,
      "height": 60
    }
  }
}
```
*(Provide real `width`/`height` for the logo image; Google requires the logo to render legibly, min ~112x112px, ideally on a plain/transparent background.)*

### D. Bonus — BreadcrumbList template (adapt per page, e.g. for `/store/quick-ts1200`)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.promationusa.com/" },
    { "@type": "ListItem", "position": 2, "name": "Store", "item": "https://www.promationusa.com/store" },
    { "@type": "ListItem", "position": 3, "name": "QUICK TS1200", "item": "https://www.promationusa.com/store/quick-ts1200" }
  ]
}
```

### E. Bonus — JobPosting template for `/careers` (Robotic Soldering Technician req currently live on page)

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Robotic Soldering Technician",
  "description": "PROMATION USA is a family-owned company specializing in engineering automated solutions for micro-electronics manufacturers. The Robotics Technician will work within a professional robotics lab to assist in the automation of manual manufacturing processes, document automation processes, undergo IPC and robotic training, and cross-train on PCB handling solutions (conveyorized solutions/PLC programming).",
  "identifier": {
    "@type": "PropertyValue",
    "name": "PROMATION USA",
    "value": "ROBOTIC-SOLDERING-TECH-KENOSHA"
  },
  "datePosted": "2026-08-08",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "PROMATION USA",
    "sameAs": "https://www.promationusa.com",
    "logo": "https://static1.squarespace.com/static/553aaccde4b0f11dcc2284f2/t/6361634f66ad9d79ed77b050/1781191193689/"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9900 58th Place, Suite 100",
      "addressLocality": "Kenosha",
      "addressRegion": "WI",
      "postalCode": "53144",
      "addressCountry": "US"
    }
  }
}
```
*(Confirm the actual `datePosted` with PROMATION HR before publishing — the audit found no posted date on the page; using today's date as a placeholder is not compliant. Also add `validThrough` once known — Google will drop expired postings without it if too far in the past.)*

---

## Summary Score & Priorities (see chat response for the client-facing 400-word summary)
