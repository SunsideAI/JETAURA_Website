"use client";

import type { HeadlinesProps } from "./types";

export default function Headlines({ headline1Ref, headline2Ref, ctaRef }: HeadlinesProps) {
  return (
    <>
      {/* Headline 1 — Stage 1-2 */}
      <div
        ref={headline1Ref}
        className="absolute inset-0 flex items-center justify-center z-[6] pointer-events-none"
      >
        <h1
          style={{
            fontFamily: "var(--font-display, 'Editorial New', 'Times New Roman', serif)",
            fontSize: "clamp(40px, 7vw, 64px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "#F5F2EC",
            textAlign: "center",
            margin: 0,
          }}
        >
          <span style={{ display: "block" }}>Beyond</span>
          <span
            style={{
              display: "block",
              fontStyle: "italic",
              color: "rgba(245, 242, 236, 0.55)",
            }}
          >
            schedules.
          </span>
        </h1>
      </div>

      {/* Headline 2 — Stage 3-4 */}
      <div
        ref={headline2Ref}
        className="absolute inset-0 flex items-center justify-center z-[6] pointer-events-none opacity-0"
        style={{ transform: "translateY(80px)" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display, 'Editorial New', 'Times New Roman', serif)",
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#F5F2EC",
            textAlign: "center",
            margin: 0,
          }}
        >
          <span style={{ display: "block" }}>Anywhere.</span>
          <span
            style={{
              display: "block",
              fontStyle: "italic",
              color: "rgba(245, 242, 236, 0.55)",
            }}
          >
            Within 90 minutes.
          </span>
        </h2>
      </div>

      {/* CTA — Stage 5 */}
      <div
        ref={ctaRef}
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center z-[10] opacity-0"
        style={{ paddingBottom: "70px", gap: "16px" }}
      >
        <button
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#B8956A",
            background: "transparent",
            border: "0.5px solid rgba(184, 149, 106, 0.7)",
            padding: "12px 32px",
            cursor: "pointer",
            outline: "none",
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLButtonElement).style.outlineColor = "#B8956A";
            (e.currentTarget as HTMLButtonElement).style.outlineWidth = "1px";
            (e.currentTarget as HTMLButtonElement).style.outlineStyle = "solid";
            (e.currentTarget as HTMLButtonElement).style.outlineOffset = "3px";
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLButtonElement).style.outline = "none";
          }}
        >
          Configure your flight
        </button>

        {/* Scroll hint */}
        <span
          className="scroll-hint opacity-0"
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(245, 242, 236, 0.4)",
          }}
        >
          Press space or scroll to continue ↓
        </span>
      </div>
    </>
  );
}
