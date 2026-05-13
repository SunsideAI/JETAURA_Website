"use client";

import PageNav from "@/components/PageNav";
import Footer from "@/sections/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO = "var(--font-mono, 'JetBrains Mono', monospace)";
const BODY = "var(--font-body, 'Inter Tight', sans-serif)";

const copy = {
  en: {
    label: "ABOUT JETAURA",
    headline: "Private aviation,\nredefined.",
    subtext:
      "JETAURA was founded in 2026 with a single conviction: private aviation should be effortless, discreet, and available to those who demand the finest. Based in Frankfurt, we broker access to the world's most exceptional aircraft.",
    storyHeading: "Our story.",
    storyBody:
      "We connect discerning clients with the right aircraft for every journey. Our network spans over 500 operators across 40 countries, giving you access to 2,000+ aircraft at any time.",
    stat0Value: "500+",
    stat0Label: "OPERATORS",
    stat1Value: "40",
    stat1Label: "COUNTRIES",
    stat2Value: "24/7",
    stat2Label: "SUPPORT",
    discretionHeading: "Built on discretion.",
    discretionBody:
      "Every enquiry, every flight, every client relationship is handled with absolute confidentiality. We do not publish client names. We do not share data. We simply deliver.",
  },
  de: {
    label: "ÜBER JETAURA",
    headline: "Privatfliegen,\nneu definiert.",
    subtext:
      "JETAURA wurde 2026 mit einer einzigen Überzeugung gegründet: Privatluftfahrt soll mühelos, diskret und für jene verfügbar sein, die das Beste verlangen. Von Frankfurt aus vermitteln wir Zugang zu den außergewöhnlichsten Flugzeugen der Welt.",
    storyHeading: "Unsere Geschichte.",
    storyBody:
      "Wir verbinden anspruchsvolle Kunden mit dem richtigen Flugzeug für jede Reise. Unser Netzwerk umfasst über 500 Betreiber in 40 Ländern.",
    stat0Value: "500+",
    stat0Label: "BETREIBER",
    stat1Value: "40",
    stat1Label: "LÄNDER",
    stat2Value: "24/7",
    stat2Label: "SUPPORT",
    discretionHeading: "Diskretionär durch und durch.",
    discretionBody:
      "Jede Anfrage, jeder Flug, jede Kundenbeziehung wird mit absoluter Vertraulichkeit behandelt. Wir veröffentlichen keine Kundennamen. Wir geben keine Daten weiter. Wir liefern einfach.",
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <div style={{ background: "#0A0A0B", minHeight: "100vh", color: "#F5F2EC" }}>
      <PageNav />

      {/* Page header */}
      <section
        style={{
          padding: "140px clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.4,
            display: "block",
            marginBottom: "24px",
          }}
        >
          {t.label}
        </span>

        <h1
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            margin: "0 0 32px",
            whiteSpace: "pre-line",
          }}
        >
          {t.headline}
        </h1>

        <p
          style={{
            fontFamily: BODY,
            fontSize: "18px",
            lineHeight: 1.7,
            maxWidth: "560px",
            opacity: 0.6,
            margin: 0,
          }}
        >
          {t.subtext}
        </p>
      </section>

      {/* Two-column story section */}
      <section
        style={{
          padding: "0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-5"
          style={{ gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }}
        >
          {/* Left: 60% (3/5) */}
          <div className="md:col-span-3" style={{ position: "relative" }}>
            {/* Background year number */}
            <span
              aria-hidden="true"
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(80px, 15vw, 160px)",
                fontWeight: 400,
                color: "#F5F2EC",
                opacity: 0.05,
                position: "absolute",
                top: "-0.1em",
                left: "-0.05em",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              2026
            </span>
            <div style={{ position: "relative", zIndex: 1, paddingTop: "24px" }}>
              <h2
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "36px",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  margin: "0 0 20px",
                }}
              >
                {t.storyHeading}
              </h2>
              <p
                style={{
                  fontFamily: BODY,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  opacity: 0.55,
                  margin: 0,
                  maxWidth: "480px",
                }}
              >
                {t.storyBody}
              </p>
            </div>
          </div>

          {/* Right: 40% (2/5) — intentionally sparse */}
          <div className="md:col-span-2" />
        </div>
      </section>

      {/* Key numbers strip */}
      <section
        style={{
          borderTop: "0.5px solid rgba(245, 242, 236, 0.07)",
          borderBottom: "0.5px solid rgba(245, 242, 236, 0.07)",
          padding: "0 clamp(20px, 5vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {[
            { value: t.stat0Value, label: t.stat0Label },
            { value: t.stat1Value, label: t.stat1Label },
            { value: t.stat2Value, label: t.stat2Label },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "40px 0",
                borderLeft: i > 0 ? "0.5px solid rgba(245, 242, 236, 0.07)" : "none",
                paddingLeft: i > 0 ? "clamp(20px, 4vw, 56px)" : 0,
              }}
            >
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "clamp(36px, 6vw, 64px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  display: "block",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                  display: "block",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Discretion section */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: DISPLAY,
            fontSize: "36px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            margin: "0 0 20px",
          }}
        >
          {t.discretionHeading}
        </h2>
        <p
          style={{
            fontFamily: BODY,
            fontSize: "15px",
            lineHeight: 1.7,
            opacity: 0.55,
            margin: 0,
            maxWidth: "560px",
          }}
        >
          {t.discretionBody}
        </p>
      </section>

      <Footer />
    </div>
  );
}
