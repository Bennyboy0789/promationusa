"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GTM_ID, track } from "@/lib/analytics";

/**
 * Google Tag Manager plus site-wide conversion instrumentation.
 *
 * Two halves, deliberately independent:
 *
 *  - The container only renders when `NEXT_PUBLIC_GTM_ID` is set, so no tag
 *    ships until PROMATION has a container of their own.
 *  - The click listener runs regardless. Its pushes are harmless with no
 *    container attached, and running it unconditionally means the day the ID
 *    lands, every CTA on the site is already instrumented — no second pass.
 *
 * Clicks are captured by delegation rather than by handlers on each CTA. A
 * distributed set of onClick props rots: someone adds a phone link six months
 * from now and it silently goes unmeasured. One listener at the document root
 * cannot be forgotten.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "a[href], button[data-cta]"
      ) as HTMLAnchorElement | HTMLButtonElement | null;
      if (!el) return;

      const label =
        el.getAttribute("data-cta") ?? el.textContent?.trim().slice(0, 60) ?? "";
      const href = el.getAttribute("href") ?? "";
      const location = window.location.pathname;

      // An explicit marker always wins over the href heuristic — a store order
      // and a trial request are both `mailto:` links, but they are different
      // conversions and collapsing them would make the funnel unreadable.
      const marked: Record<string, "store_enquiry" | "trial_request"> = {
        "store-order": "store_enquiry",
        "trial-request": "trial_request",
      };
      const cta = el.dataset.cta;

      if (cta && marked[cta]) {
        track(marked[cta], { label, location });
      } else if (href.startsWith("tel:")) {
        track("phone_click", { label, location });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { label, location });
      } else if (/\.pdf($|\?)/i.test(href)) {
        track("spec_download", { label, location, href });
      } else if (cta) {
        track("cta_click", { label, location, href });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
