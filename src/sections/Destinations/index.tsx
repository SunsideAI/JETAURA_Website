"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO    = "var(--font-mono, 'JetBrains Mono', monospace)";

const DESTINATIONS = [
  { city: "Paris",    code: "CDG", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
  { city: "Dubai",    code: "DXB", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" },
  { city: "New York", code: "JFK", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80" },
  { city: "London",   code: "LCY", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" },
  { city: "Monaco",   code: "MCM", img: "https://images.unsplash.com/photo-1570077188670-e3b8d47ef5d6?auto=format&fit=crop&w=600&q=80" },
  { city: "Maldives", code: "MLE", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80" },
];

const copy = {
  en: { label: "POPULAR ROUTES", heading: "Fly anywhere."          },
  de: { label: "BELIEBTE ROUTEN", heading: "Überall hinfliegen."   },
};

export default function Destinations() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section
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
          className="grid grid-cols-2 md:grid-cols-3"
          style={{ gap: "1px", background: "rgba(245, 242, 236, 0.05)" }}
        >
          {DESTINATIONS.map((d) => (
            <div
              key={d.code}
              style={{
                position:            "relative",
                aspectRatio:         "3 / 4",
                overflow:            "hidden",
                backgroundImage:     `url(${d.img})`,
                backgroundSize:      "cover",
                backgroundPosition:  "center",
                cursor:              "pointer",
              }}
            >
              <div
                style={{
                  position:   "absolute",
                  inset:      0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
                }}
              />

              <span
                style={{
                  position:      "absolute",
                  bottom:        "20px",
                  left:          "20px",
                  fontFamily:    DISPLAY,
                  fontSize:      "22px",
                  fontWeight:    400,
                  color:         "#F5F2EC",
                  letterSpacing: "-0.01em",
                  lineHeight:    1,
                }}
              >
                {d.city}
              </span>

              <span
                style={{
                  position:      "absolute",
                  bottom:        "22px",
                  right:         "20px",
                  fontFamily:    MONO,
                  fontSize:      "11px",
                  letterSpacing: "0.2em",
                  color:         "rgba(245, 242, 236, 0.6)",
                }}
              >
                {d.code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
