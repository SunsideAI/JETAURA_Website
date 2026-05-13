"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO    = "var(--font-mono, 'JetBrains Mono', monospace)";

const copy = {
  en: {
    heading:     "Where would you like to fly?",
    fromLabel:   "DEPARTURE",
    fromPH:      "Frankfurt FRA",
    toLabel:     "DESTINATION",
    toPH:        "New York JFK",
    cta:         "REQUEST FLIGHT",
    sub:         "Or call us · +49 69 000 000",
  },
  de: {
    heading:     "Wohin möchten Sie fliegen?",
    fromLabel:   "ABFLUG",
    fromPH:      "Frankfurt FRA",
    toLabel:     "ZIEL",
    toPH:        "New York JFK",
    cta:         "FLUG ANFRAGEN",
    sub:         "Oder rufen Sie uns an · +49 69 000 000",
  },
};

const inputBase: React.CSSProperties = {
  background:    "transparent",
  border:        "none",
  borderBottom:  "0.5px solid rgba(245, 242, 236, 0.2)",
  borderRadius:  0,
  color:         "#F5F2EC",
  fontFamily:    MONO,
  fontSize:      "14px",
  letterSpacing: "0.06em",
  padding:       "10px 0",
  width:         "100%",
  outline:       "none",
};

export default function FlightSearch() {
  const { lang } = useLanguage();
  const t = copy[lang];

  const [from, setFrom]       = useState("");
  const [to, setTo]           = useState("");
  const [fromFocus, setFromF] = useState(false);
  const [toFocus, setToF]     = useState(false);

  function swap() {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  }

  return (
    <section
      id="charter"
      style={{
        background:  "#0D0D0F",
        borderTop:   "0.5px solid rgba(245, 242, 236, 0.07)",
        padding:     "clamp(64px, 8vw, 120px) clamp(20px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily:    DISPLAY,
            fontSize:      "clamp(26px, 4vw, 48px)",
            fontWeight:    400,
            color:         "#F5F2EC",
            margin:        "0 0 clamp(40px, 5vw, 64px)",
            lineHeight:    1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {t.heading}
        </h2>

        {/* Desktop: row. Mobile: stacked with divider swap button */}
        <div className="flex flex-col md:flex-row md:items-end" style={{ gap: 0 }}>

          {/* FROM */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            <label
              style={{
                fontFamily:    MONO,
                fontSize:      "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:         "rgba(245, 242, 236, 0.4)",
              }}
            >
              {t.fromLabel}
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder={t.fromPH}
              onFocus={() => setFromF(true)}
              onBlur={() => setFromF(false)}
              style={{
                ...inputBase,
                borderBottomColor: fromFocus
                  ? "rgba(245, 242, 236, 0.6)"
                  : "rgba(245, 242, 236, 0.2)",
              }}
            />
          </div>

          {/* SWAP — horizontal on desktop, full-width divider row on mobile */}
          <button
            onClick={swap}
            aria-label="Swap airports"
            className="flex items-center justify-center md:justify-start"
            style={{
              background: "none",
              border:     "none",
              cursor:     "pointer",
              color:      "rgba(245, 242, 236, 0.35)",
              fontFamily: MONO,
              fontSize:   "14px",
              lineHeight: 1,
              flexShrink: 0,
              // Mobile: full-width row with top/bottom padding
              padding:       "18px 0",
              // Desktop override via class below
            }}
          >
            <span className="md:hidden" style={{ marginRight: "10px", fontSize: "10px", letterSpacing: "0.15em" }}>
              {t.fromLabel} ↕ {t.toLabel}
            </span>
            <span className="hidden md:inline" style={{ padding: "0 clamp(12px, 2vw, 24px)", paddingBottom: "10px" }}>↔</span>
          </button>

          {/* TO */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            <label
              className="hidden md:block"
              style={{
                fontFamily:    MONO,
                fontSize:      "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:         "rgba(245, 242, 236, 0.4)",
              }}
            >
              {t.toLabel}
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder={t.toPH}
              onFocus={() => setToF(true)}
              onBlur={() => setToF(false)}
              style={{
                ...inputBase,
                borderBottomColor: toFocus
                  ? "rgba(245, 242, 236, 0.6)"
                  : "rgba(245, 242, 236, 0.2)",
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
          <button
            style={{
              fontFamily:    MONO,
              fontSize:      "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "#F5F2EC",
              background:    "transparent",
              border:        "0.5px solid rgba(245, 242, 236, 0.5)",
              borderRadius:  0,
              padding:       "16px 40px",
              cursor:        "pointer",
              width:         "100%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.5)")}
          >
            {t.cta}
          </button>
        </div>

        <p
          style={{
            fontFamily:    MONO,
            fontSize:      "11px",
            letterSpacing: "0.08em",
            color:         "rgba(245, 242, 236, 0.3)",
            marginTop:     "20px",
            textAlign:     "center",
          }}
        >
          {t.sub}
        </p>
      </div>
    </section>
  );
}
