"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO    = "var(--font-mono, 'JetBrains Mono', monospace)";
const BODY    = "var(--font-body, 'Inter Tight', sans-serif)";

const FEATURES = [
  {
    img:     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    heading: { en: "Every detail, considered.",  de: "Jedes Detail, durchdacht." },
    body:    {
      en: "From your preferred cabin temperature to your choice of wine—we configure every flight around you. Our team is available 24 hours a day, seven days a week.",
      de: "Von Ihrer bevorzugten Kabinentemperatur bis zur Weinauswahl – wir konfigurieren jeden Flug um Sie herum.",
    },
    reverse: false,
  },
  {
    img:     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    heading: { en: "Any destination, any time.",  de: "Jedes Ziel, jederzeit." },
    body:    {
      en: "Access to over 5,000 airports worldwide. Land closer to your destination, on your schedule—not the airline's.",
      de: "Zugang zu über 5.000 Flughäfen weltweit. Landen Sie näher an Ihrem Ziel – nach Ihrem Zeitplan.",
    },
    reverse: true,
  },
];

const copy = {
  en: { label: "THE JETAURA EXPERIENCE" },
  de: { label: "DAS JETAURA ERLEBNIS"   },
};

export default function Experience() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section
      style={{
        background: "#0D0D0F",
        padding:    "clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily:    MONO,
            fontSize:      "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "rgba(245, 242, 236, 0.4)",
            margin:        "0 0 clamp(48px, 6vw, 80px)",
          }}
        >
          {t.label}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(64px, 8vw, 120px)" }}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`flex flex-col ${f.reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
              style={{ gap: 0, alignItems: "stretch" }}
            >
              <div
                style={{
                  flex:     1,
                  overflow: "hidden",
                  minHeight: "300px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.img}
                  alt=""
                  style={{
                    width:     "100%",
                    height:    "100%",
                    objectFit: "cover",
                    display:   "block",
                  }}
                />
              </div>

              <div
                style={{
                  flex:           1,
                  padding:        "clamp(32px, 5vw, 48px)",
                  display:        "flex",
                  flexDirection:  "column",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily:    DISPLAY,
                    fontSize:      "clamp(28px, 3.5vw, 48px)",
                    fontWeight:    400,
                    color:         "#F5F2EC",
                    margin:        "0 0 24px",
                    lineHeight:    1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.heading[lang]}
                </h3>
                <p
                  style={{
                    fontFamily:  BODY,
                    fontSize:    "15px",
                    lineHeight:  1.7,
                    color:       "rgba(245, 242, 236, 0.55)",
                    margin:      0,
                    maxWidth:    "480px",
                  }}
                >
                  {f.body[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
