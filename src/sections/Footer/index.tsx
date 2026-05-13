"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO    = "var(--font-mono, 'JetBrains Mono', monospace)";
const BODY    = "var(--font-body, 'Inter Tight', sans-serif)";

const copy = {
  en: {
    tagline:   "Private aviation, redefined.",
    services:  "SERVICES",
    company:   "COMPANY",
    contact:   "CONTACT",
    svcLinks:  ["Fleet", "Charter", "Experience", "Membership"],
    coLinks:   ["About", "News", "Blog", "Careers"],
    copyright: "© 2026 JETAURA",
    rights:    "All rights reserved.",
  },
  de: {
    tagline:   "Privatfliegen, neu definiert.",
    services:  "DIENSTE",
    company:   "UNTERNEHMEN",
    contact:   "KONTAKT",
    svcLinks:  ["Flotte", "Charter", "Erlebnis", "Mitgliedschaft"],
    coLinks:   ["Über uns", "News", "Blog", "Karriere"],
    copyright: "© 2026 JETAURA",
    rights:    "Alle Rechte vorbehalten.",
  },
};

const linkStyle: React.CSSProperties = {
  display:        "block",
  fontFamily:     MONO,
  fontSize:       "12px",
  letterSpacing:  "0.06em",
  color:          "rgba(245, 242, 236, 0.5)",
  textDecoration: "none",
  lineHeight:     1,
  padding:        "5px 0",
  transition:     "opacity 200ms ease",
};

const colLabelStyle: React.CSSProperties = {
  fontFamily:    MONO,
  fontSize:      "10px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color:         "rgba(245, 242, 236, 0.35)",
  marginBottom:  "16px",
  display:       "block",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={linkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <footer
      style={{
        background: "#0D0D0F",
        borderTop:  "0.5px solid rgba(245, 242, 236, 0.07)",
        padding:    "64px clamp(20px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: "clamp(32px, 4vw, 64px)", marginBottom: "48px" }}
        >
          {/* Col 1: Brand */}
          <div>
            <span
              style={{
                fontFamily:    DISPLAY,
                fontSize:      "14px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color:         "#F5F2EC",
                display:       "block",
                marginBottom:  "10px",
              }}
            >
              JETAURA
            </span>
            <span
              style={{
                fontFamily:    MONO,
                fontSize:      "11px",
                color:         "rgba(245, 242, 236, 0.35)",
                display:       "block",
                marginBottom:  "16px",
                letterSpacing: "0.06em",
              }}
            >
              Est. 2026 · Frankfurt
            </span>
            <p
              style={{
                fontFamily:  BODY,
                fontSize:    "13px",
                lineHeight:  1.6,
                color:       "rgba(245, 242, 236, 0.4)",
                margin:      0,
                maxWidth:    "200px",
              }}
            >
              {t.tagline}
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <span style={colLabelStyle}>{t.services}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {t.svcLinks.map((l) => (
                <NavLink key={l} href="#">{l}</NavLink>
              ))}
            </div>
          </div>

          {/* Col 3: Company */}
          <div>
            <span style={colLabelStyle}>{t.company}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {t.coLinks.map((l) => (
                <NavLink key={l} href="#">{l}</NavLink>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <span style={colLabelStyle}>{t.contact}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["+49 69 000 0000", "charter@jetaura.com", "Frankfurt, Germany"].map((line) => (
                <span
                  key={line}
                  style={{
                    fontFamily:    MONO,
                    fontSize:      "12px",
                    letterSpacing: "0.04em",
                    color:         "rgba(245, 242, 236, 0.5)",
                    display:       "block",
                  }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop:      "0.5px solid rgba(245, 242, 236, 0.07)",
            paddingTop:     "24px",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            flexWrap:       "wrap",
            gap:            "8px",
          }}
        >
          <span
            style={{
              fontFamily:    MONO,
              fontSize:      "11px",
              letterSpacing: "0.08em",
              color:         "rgba(245, 242, 236, 0.3)",
            }}
          >
            {t.copyright}
          </span>
          <span
            style={{
              fontFamily:    MONO,
              fontSize:      "11px",
              letterSpacing: "0.08em",
              color:         "rgba(245, 242, 236, 0.3)",
            }}
          >
            {t.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
