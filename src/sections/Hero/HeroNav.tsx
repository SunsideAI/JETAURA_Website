"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { HeroNavProps } from "./types";

const ITEMS = {
  en: ["Fleet", "Charter", "Experience", "News", "Blog", "About"],
  de: ["Flotte", "Charter", "Erlebnis", "News", "Blog", "Über uns"],
};

const MONO    = "var(--font-mono, 'JetBrains Mono', monospace)";
const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";

export default function HeroNav({ navRef }: HeroNavProps) {
  const { lang, toggleLang } = useLanguage();

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between opacity-0"
      style={{ padding: "18px 32px" }}
    >
      {/* Left: wordmark */}
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: "16px",
          fontWeight: 400,
          letterSpacing: "0.42em",
          color: "#F5F2EC",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        JETAURA
      </span>

      {/* Center: nav items */}
      <nav className="absolute left-1/2" style={{ transform: "translateX(-50%)" }}>
        <ul className="flex items-center list-none m-0 p-0" style={{ gap: "28px" }}>
          {ITEMS[lang].map((label) => (
            <li key={label}>
              <a
                href="#"
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245, 242, 236, 0.55)",
                  textDecoration: "none",
                  transition: "color 250ms ease",
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

      {/* Right: EN/DE + CTA */}
      <div className="flex items-center" style={{ gap: "22px" }}>
        {/* Language toggle */}
        <button
          onClick={toggleLang}
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "rgba(245, 242, 236, 0.6)",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: 0,
          }}
        >
          <span style={{ opacity: lang === "en" ? 1 : 0.3, transition: "opacity 250ms" }}>EN</span>
          <span style={{ opacity: 0.25 }}>·</span>
          <span style={{ opacity: lang === "de" ? 1 : 0.3, transition: "opacity 250ms" }}>DE</span>
        </button>

        {/* CTA */}
        <button
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F5F2EC",
            background: "transparent",
            border: "0.5px solid rgba(245, 242, 236, 0.35)",
            padding: "10px 22px",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 250ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245, 242, 236, 0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245, 242, 236, 0.35)")}
        >
          {lang === "en" ? "Request a flight" : "Flug anfragen"}
        </button>
      </div>
    </div>
  );
}
