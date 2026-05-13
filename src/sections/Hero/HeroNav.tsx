"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { HeroNavProps } from "./types";

const ITEMS = {
  en: ["Fleet", "Charter", "Experience", "News", "Blog", "About"],
  de: ["Flotte", "Charter", "Erlebnis", "News", "Blog", "Über uns"],
};

const MONO = "var(--font-mono, 'JetBrains Mono', monospace)";
const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";

export default function HeroNav({ navRef }: HeroNavProps) {
  const { lang } = useLanguage();
  const items = ITEMS[lang];

  return (
    <div
      ref={navRef}
      className="absolute top-0 left-0 right-0 z-[12] hidden md:flex items-center justify-between opacity-0"
      style={{ padding: "20px 32px" }}
    >
      {/* Left: mini wordmark */}
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: "17px",
          fontWeight: 400,
          letterSpacing: "0.42em",
          color: "#F5F2EC",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        JETAURA
      </span>

      {/* Center: nav items — absolutely centered */}
      <nav
        className="absolute left-1/2"
        style={{ transform: "translateX(-50%)" }}
      >
        <ul
          className="flex items-center list-none m-0 p-0"
          style={{ gap: "clamp(20px, 2.5vw, 36px)" }}
        >
          {items.map((label) => (
            <li key={label}>
              <a
                href="#"
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(245, 242, 236, 0.55)",
                  textDecoration: "none",
                  transition: "color 300ms ease",
                  display: "block",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 242, 236, 0.55)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: CTA */}
      <button
        style={{
          fontFamily: MONO,
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#B8956A",
          background: "transparent",
          border: "0.5px solid rgba(184, 149, 106, 0.6)",
          padding: "10px 22px",
          cursor: "pointer",
          outline: "none",
          whiteSpace: "nowrap",
          transition: "border-color 300ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(184, 149, 106, 1)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(184, 149, 106, 0.6)")}
      >
        {lang === "en" ? "Request a flight" : "Flug anfragen"}
      </button>
    </div>
  );
}
