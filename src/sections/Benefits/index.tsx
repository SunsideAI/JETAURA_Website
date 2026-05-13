"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const MONO = "var(--font-mono, 'JetBrains Mono', monospace)";
const BODY = "var(--font-body, 'Inter Tight', sans-serif)";

const ITEMS = {
  en: [
    { title: "Exclusive Access",     desc: "World-class private jet experiences." },
    { title: "24/7 Availability",    desc: "Around the clock. Around the world." },
    { title: "Global Reach",         desc: "Every destination. Anytime." },
    { title: "Privacy Guaranteed",   desc: "Discretion is our standard." },
  ],
  de: [
    { title: "Exklusiver Zugang",    desc: "Erstklassige Privatjet-Erlebnisse." },
    { title: "24/7 Verfügbar",       desc: "Rund um die Uhr. Rund um die Welt." },
    { title: "Globale Reichweite",   desc: "Jedes Ziel. Jederzeit." },
    { title: "Diskretion",           desc: "Vertraulichkeit ist unser Standard." },
  ],
};

const ICON_COLOR = "rgba(245, 242, 236, 0.45)";

function Icon({ index }: { index: number }) {
  const s = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: ICON_COLOR,
    strokeWidth: 0.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (index) {
    case 0: return <svg {...s}><polygon points="12,2 21,7.5 21,16.5 12,22 3,16.5 3,7.5" /></svg>;
    case 1: return <svg {...s}><circle cx="12" cy="12" r="9" /><polyline points="12,6 12,12 15.5,14.5" /></svg>;
    case 2: return <svg {...s}><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><line x1="3" y1="12" x2="21" y2="12" /></svg>;
    case 3: return <svg {...s}><path d="M12 2L4 5.5v7c0 4.5 3.5 7 8 8.5 4.5-1.5 8-4 8-8.5v-7z" /></svg>;
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
              padding: "clamp(32px, 4vw, 52px) clamp(28px, 3.5vw, 52px)",
              borderRight: i < 3 ? "0.5px solid rgba(245, 242, 236, 0.07)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Icon index={i} />
            <div
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#F5F2EC",
                lineHeight: 1,
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontFamily: BODY,
                fontSize: "14px",
                lineHeight: 1.6,
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
