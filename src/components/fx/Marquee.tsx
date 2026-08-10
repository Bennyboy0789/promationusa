import type { ReactNode } from "react";

/** Infinite horizontal marquee. Content is duplicated for a seamless loop. */
export function Marquee({
  children,
  className = "",
  duration = 40,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  /** seconds per full loop */
  duration?: number;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden ${pauseOnHover ? "marquee-paused" : ""} ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="animate-marquee flex w-max items-center gap-16 pr-16"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {children}
        <span aria-hidden="true" className="flex items-center gap-16">
          {children}
        </span>
      </div>
    </div>
  );
}
