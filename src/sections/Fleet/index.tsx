"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO    = "var(--font-mono, 'JetBrains Mono', monospace)";

const AIRCRAFT = [
  {
    name:  "Gulfstream G650",
    specs: "7,500 nm · 13 PAX · Mach 0.925",
    img:   "https://images.unsplash.com/photo-1559628233-100c798642d1?auto=format&fit=crop&w=900&q=80",
    desc:  { en: "Ultra long-range excellence.", de: "Ultraweite Reichweite." },
  },
  {
    name:  "Bombardier Global 7500",
    specs: "7,700 nm · 14 PAX · Mach 0.925",
    img:   "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=900&q=80",
    desc:  { en: "The pinnacle of range.", de: "Maximale Reichweite." },
  },
  {
    name:  "Dassault Falcon 8X",
    specs: "6,450 nm · 12 PAX · Mach 0.90",
    img:   "https://images.unsplash.com/photo-1540962351926-511599bfb47d?auto=format&fit=crop&w=900&q=80",
    desc:  { en: "European refinement.", de: "Europäische Raffinesse." },
  },
];

const copy = {
  en: { label: "OUR FLEET",      heading: "Exceptional aircraft.",       link: "VIEW DETAILS →" },
  de: { label: "UNSERE FLOTTE",  heading: "Außergewöhnliche Flugzeuge.", link: "DETAILS →" },
};

export default function Fleet() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section
      id="fleet"
      style={{
        background: "#0A0A0B",
        padding:    "clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <p
            style={{
              fontFamily:    MONO,
              fontSize:      "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "rgba(245, 242, 236, 0.4)",
              margin:        "0 0 20px",
            }}
          >
            {t.label}
          </p>
          <h2
            style={{
              fontFamily:    DISPLAY,
              fontSize:      "clamp(36px, 5vw, 72px)",
              fontWeight:    400,
              color:         "#F5F2EC",
              margin:        0,
              lineHeight:    1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {t.heading}
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "1px", background: "rgba(245, 242, 236, 0.07)" }}
        >
          {AIRCRAFT.map((ac) => (
            <div
              key={ac.name}
              style={{
                background:   "#0D0D0F",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  aspectRatio: "16 / 9",
                  overflow:    "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ac.img}
                  alt={ac.name}
                  style={{
                    width:      "100%",
                    height:     "100%",
                    objectFit:  "cover",
                    display:    "block",
                  }}
                />
              </div>

              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontFamily:    DISPLAY,
                    fontSize:      "20px",
                    fontWeight:    400,
                    color:         "#F5F2EC",
                    margin:        "0 0 8px",
                    letterSpacing: "-0.01em",
                    lineHeight:    1.2,
                  }}
                >
                  {ac.name}
                </h3>

                <p
                  style={{
                    fontFamily:    MONO,
                    fontSize:      "11px",
                    letterSpacing: "0.15em",
                    color:         "rgba(245, 242, 236, 0.45)",
                    margin:        "0 0 16px",
                  }}
                >
                  {ac.specs}
                </p>

                <p
                  style={{
                    fontFamily:    MONO,
                    fontSize:      "12px",
                    color:         "rgba(245, 242, 236, 0.5)",
                    margin:        "0 0 20px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {ac.desc[lang]}
                </p>

                <a
                  href="#"
                  style={{
                    fontFamily:     MONO,
                    fontSize:       "11px",
                    letterSpacing:  "0.18em",
                    textTransform:  "uppercase",
                    color:          "rgba(245, 242, 236, 0.5)",
                    textDecoration: "none",
                    transition:     "opacity 200ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
                >
                  {t.link}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
