/**
 * Conversion tracking.
 *
 * Everything funnels through `dataLayer`, so GTM is the single integration
 * point and GA4 is configured inside the container rather than in this repo.
 * If no container is configured the pushes still happen — they simply queue in
 * an array nothing reads, which keeps every call site safe to write today and
 * live the moment `NEXT_PUBLIC_GTM_ID` is set.
 *
 * The event names here are the ones the CRO audit asks for. Defining them up
 * front matters: retrofitting event names after launch means the historical
 * data is unusable for comparison.
 */

export type ConversionEvent =
  /** Long enquiry form on /contact submitted */
  | "quote_submit"
  /** Short 3-field RFQ submitted */
  | "quick_rfq_submit"
  /** A `tel:` link was activated */
  | "phone_click"
  /** A `mailto:` link was activated */
  | "email_click"
  /** Free proof-of-concept requested */
  | "trial_request"
  /** A store part enquiry was started */
  | "store_enquiry"
  /** A spec sheet or PDF was opened */
  | "spec_download"
  /** First interaction with any form field */
  | "form_start"
  /** Form was started but the visitor left without submitting */
  | "form_abandon"
  /** Any element carrying `data-cta` was clicked */
  | "cta_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(
  event: ConversionEvent,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
