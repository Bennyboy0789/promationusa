# Visual / Above-the-Fold / Mobile Audit — promationusa.com

Method: Playwright (chromium) installed successfully. Captured desktop (1440x900) and mobile (390x844, iPhone UA) viewport + full-page screenshots for /, /pcb-handling, /robotic-soldering-glance, /store, /contact.
Screenshots saved to: `...\scratchpad\audit\screenshots\` (10 viewport shots + 10 full-page shots).

## Overall Visual/UX Score: 42/100

## Cross-page issues

1. **Scam-warning banner dominates the very top of every page (High/Critical trust & UX issue).** A dense 3-line, all-caps black bar ("BEWARE OF SCAMS INVOLVING UNAUTHORIZED PROMATION USA DISTRIBUTORS...") is the first thing rendered on every page, above the logo and nav. On mobile it consumes ~14% of the 844px viewport before any brand content appears. Legal/scam warnings as the primary first impression create anxiety and look unprofessional; this belongs in a footer, a dismissible one-line strip, or a dedicated trust/security page — not hero real estate on every single page load.
2. **Persistent cookie-consent bar overlaps content (Medium).** The bottom-fixed cookie banner ("Select 'Accept all'...") sits over footer navigation on /store and directly over the Submit button on the /contact form in full-page mobile captures, creating an accidental-tap/obscured-CTA risk until dismissed.
3. **Small/dense typography (Medium).** Nav items, sidebar product-category lists, and the scam banner all render in small all-caps text (~10-11px effective at mobile scale); sidebar link text on /pcb-handling and /robotic-soldering-glance is tightly packed with little touch-target spacing (looks <48px tall per row).
4. **No visible hamburger-menu open state issue but nav duplicates concerns (Low).** Mobile nav collapses correctly to a hamburger icon (good), but no visual affordance (e.g., label, contrasting background) — icon is a thin 3-line glyph that could be easy to miss against white header.

## Page-specific

- **Home (/)**: Above-the-fold desktop shows scam banner + nav + a decent hero ("Premium PCB Handling Solutions" + "GET STARTED" CTA button) — hero itself is good, high-contrast CTA is visible without scrolling on desktop. On mobile, hero CTA is visible but pushed further down by the scam banner + wasted whitespace; page is very short overall (hero → video teaser → footer), meaning little content depth.
- **/pcb-handling**: Above the fold on both desktop and mobile is a left-hand product sidebar + heading "PCB Handling" with only descriptive text — no CTA (quote/contact button) visible without scrolling. Good heading hierarchy (H1 "PCB Handling" clear), but sidebar list is a wall of small gray links with no active-state emphasis besides bold.
- **/robotic-soldering-glance**: Same sidebar pattern; above-the-fold shows intro paragraph and starts loading a large product image but no CTA before scroll.
- **/store**: Weakest above-the-fold. Desktop and mobile both show a huge empty white area (~350-400px) with only the text "2-Day Shipping On All Orders!" — no product visible, no CTA, no value proposition, before requiring a scroll to reach the product grid. This is dead space on a commerce page where above-the-fold should showcase products or a clear shop CTA.
- **/contact**: Above the fold is a 5-star icon graphic + "Contact our award winning team today!" heading + a large trophy/award photo — no phone number, email, or contact form visible without scrolling (phone number "1.262.764.4832" and the form appear only after 1-2 scrolls). Weak for a contact page whose entire purpose is fast access to contact methods.

## Mobile responsiveness
No horizontal scroll observed on any captured page at 390px width. Nav correctly collapses to hamburger. Images scale within containers without visible overflow. Cookie bar overlap (see above) is the main functional defect found. Font sizes for body copy on interior pages appear acceptable (~14-16px); nav/sidebar/banner text is undersized.

## Layout-shift risk
Full-page screenshots show no obvious shift artifacts (all elements loaded before capture via networkidle+500ms wait), but the store page's large empty gap between hero text and product grid suggests a lazy-loaded/late-rendering section that could cause a visible pop-in for real users on slower connections.
