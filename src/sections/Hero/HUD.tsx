"use client";

import type { HUDProps } from "./types";

export default function HUD({ hudRef, flRef, machRef, progressRef, tailRef, logoRef }: HUDProps) {
  return (
    <div
      ref={hudRef}
      aria-hidden="true"
      className="hud-wrapper absolute inset-0 z-[10] pointer-events-none"
      style={{ padding: "18px" }}
    >
      {/* Center — JETAURA wordmark, appears in Stage 5 from the clouds */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <span
          className="jetaura-wordmark"
          style={{
            fontFamily: "var(--font-display, 'Editorial New', 'Times New Roman', serif)",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 400,
            letterSpacing: "0.45em",
            color: "#F5F2EC",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          JETAURA
        </span>
      </div>

      {/* Top-left */}
      <div
        className="hud-corner absolute top-0 left-0"
        style={{
          padding: "18px",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(245, 242, 236, 0.6)",
        }}
      >
        N° 001 — Sky Brokers
      </div>

      {/* Top-right: FL + Mach readouts */}
      <div
        className="hud-corner absolute top-0 right-0 text-right"
        style={{
          padding: "18px",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(245, 242, 236, 0.6)",
        }}
      >
        <span ref={flRef}>FL 000</span>
        {" · "}
        <span ref={machRef}>M 0.00</span>
      </div>

      {/* Bottom-left */}
      <div
        className="hud-corner absolute bottom-0 left-0"
        style={{
          padding: "18px",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(245, 242, 236, 0.6)",
        }}
      >
        Est. 2026 · Frankfurt
      </div>

      {/* Bottom-right: progress — hidden on mobile */}
      <div
        className="hud-corner absolute bottom-0 right-0 hidden md:block"
        style={{
          padding: "18px",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(245, 242, 236, 0.6)",
        }}
      >
        <span ref={progressRef}>000%</span>
      </div>

      {/* Tail number annotation — top-right under HUD, hidden initially + hidden on mobile */}
      <div
        ref={tailRef}
        className="absolute opacity-0 hidden md:block"
        style={{
          top: "44px",
          right: "18px",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: "rgba(245, 242, 236, 0.6)",
          textAlign: "right",
        }}
      >
        D-AVIA · GULFSTREAM G650
      </div>
    </div>
  );
}
