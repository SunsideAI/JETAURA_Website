"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const MONO = "var(--font-mono, 'JetBrains Mono', monospace)";
const BODY = "var(--font-body, 'Inter Tight', sans-serif)";

const ITEMS = {
  en: [
    { title: "Exclusive Access", desc: "World-class private jet experiences." },
    { title: "24/7 Availability", desc: "Around the clock. Around the world." },
    { title: "Global Reach", desc: "Every destination. Anytime." },
    { title: "Privacy Guaranteed", desc: "Discretion is our standard." },
  ],
  de: [
    { title: "Exklusiver Zugang", desc: "Erstklassige Privatjet-Erlebnisse." },
    { title: "24/7 Verfügbar", desc: "Rund um die Uhr. Rund um die Welt." },
    { title: "Globale Reichweite", desc: "Jedes Ziel. Jederzeit." },
    { title: "Diskretion", desc: "Vertraulichkeit ist unser Standard." },
  ],
};

function Icon({ index }: { index: number }) {
  const s = { width: 22, height: 22, viewBox: "0 0 22 22", fill: "none" as const, stroke: "#B8956A", strokeWidth: 0.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (index) {
    case 0: return <svg {...s}><polygon points="11,2 20,7.5 20,14.5 11,20 2,14.5 2,7.5" /></svg>;
    case 1: return <svg {...s}><circle cx="11" cy="11" r="8.5" /><polyline points="11,5.5 11,11 14.5,13.5" /></svg>;
    case 2: return <svg {...s}><circle cx="11" cy="11" r="8.5" /><ellipse cx="11" cy="11" rx="3.8" ry="8.5" /><line x1="2.5" y1="11" x2="19.5" y2="11" /></svg>;
    case 3: return <svg {...s}><path d="M11 2L3 5.2v7c0 4.2 3.5 6.8 8 7.8 4.5-1 8-3.6 8-7.8v-7z" /></svg>;
    default: return null;
  }
}

export default function Benefits() {
  const { lang } = useLanguage();
  const items = ITEMS[lang];

  return (
    <section
      style={{
        background: "#0D0D0F",
        borderTop: "0.5px solid rgba(245, 242, 236, 0.07)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            style={{
              padding: "clamp(28px, 4vw, 48px) clamp(24px, 3vw, 44px)",
              borderRight: i < 3 ? "0.5px solid rgba(245, 242, 236, 0.07)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <Icon index={i} />
            <div
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#F5F2EC",
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontFamily: BODY,
                fontSize: "13px",
                lineHeight: 1.55,
                color: "rgba(245, 242, 236, 0.4)",
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
