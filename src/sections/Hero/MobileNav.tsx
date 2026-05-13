"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ITEMS = {
  en: ["Fleet", "Charter", "Experience", "News", "Blog", "About"],
  de: ["Flotte", "Charter", "Erlebnis", "News", "Blog", "Über uns"],
};

const MONO    = "var(--font-mono, 'JetBrains Mono', monospace)";
const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";

export default function MobileNav() {
  const { lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button — fixed top-right, mobile only */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed top-0 right-0 z-[60]"
        style={{
          padding: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: "22px",
              height: "0.5px",
              background: "#F5F2EC",
              opacity: i === 1 ? 0.5 : 0.85,
            }}
          />
        ))}
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex flex-col"
          style={{ background: "#0A0A0B" }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between"
            style={{ padding: "16px 20px" }}
          >
            <span
              style={{
                fontFamily: DISPLAY,
                fontSize: "15px",
                fontWeight: 400,
                letterSpacing: "0.42em",
                color: "#F5F2EC",
                textTransform: "uppercase",
              }}
            >
              JETAURA
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: "rgba(245, 242, 236, 0.7)",
                fontFamily: MONO,
                fontSize: "18px",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: "0.5px", background: "rgba(245, 242, 236, 0.08)" }} />

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center" style={{ padding: "0 28px" }}>
            <ul className="list-none m-0 p-0 flex flex-col" style={{ gap: "0" }}>
              {ITEMS[lang].map((label, i) => (
                <li key={label} style={{ borderBottom: "0.5px solid rgba(245, 242, 236, 0.07)" }}>
                  <a
                    href="#"
                    onClick={() => setOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "22px 0",
                      fontFamily: MONO,
                      fontSize: "clamp(18px, 4.5vw, 26px)",
                      fontWeight: 400,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#F5F2EC",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        color: "rgba(245, 242, 236, 0.25)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom bar */}
          <div
            style={{
              padding: "20px 28px",
              borderTop: "0.5px solid rgba(245, 242, 236, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* CTA */}
            <button
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#F5F2EC",
                background: "transparent",
                border: "0.5px solid rgba(245, 242, 236, 0.35)",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              {lang === "en" ? "Request a flight" : "Flug anfragen"}
            </button>

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
              }}
            >
              <span style={{ opacity: lang === "en" ? 1 : 0.3 }}>EN</span>
              <span style={{ opacity: 0.25 }}>·</span>
              <span style={{ opacity: lang === "de" ? 1 : 0.3 }}>DE</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
