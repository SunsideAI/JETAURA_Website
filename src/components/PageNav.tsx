"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO = "var(--font-mono, 'JetBrains Mono', monospace)";

export default function PageNav() {
  const { lang, toggleLang } = useLanguage();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 32px",
        background: "rgba(10, 10, 11, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(245, 242, 236, 0.07)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: DISPLAY,
          fontSize: "14px",
          fontWeight: 400,
          letterSpacing: "0.42em",
          color: "#F5F2EC",
          textTransform: "uppercase",
          lineHeight: 1,
          textDecoration: "none",
        }}
      >
        JETAURA
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
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

        <Link
          href="/"
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(245, 242, 236, 0.55)",
            textDecoration: "none",
            transition: "color 250ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 242, 236, 0.55)")}
        >
          {lang === "en" ? "← BACK" : "← ZURÜCK"}
        </Link>
      </div>
    </header>
  );
}
