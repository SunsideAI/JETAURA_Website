"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { HeroNavProps } from "./types";

const ITEMS = {
  en: ["Fleet", "Charter", "Experience", "News", "Blog", "About Us"],
  de: ["Flotte", "Charter", "Erlebnis", "News", "Blog", "Über uns"],
};

export default function HeroNav({ navRef }: HeroNavProps) {
  const { lang } = useLanguage();
  const items = ITEMS[lang];

  return (
    <div
      ref={navRef}
      className="absolute left-0 right-0 flex justify-center z-[10] opacity-0"
      style={{ top: "calc(50% + clamp(52px, 7vw, 84px))" }}
      aria-label="Main navigation"
    >
      <nav>
        <ul
          className="flex items-center list-none m-0 p-0"
          style={{ gap: "clamp(18px, 2.5vw, 36px)" }}
        >
          {items.map((label) => (
            <li key={label}>
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(245, 242, 236, 0.5)",
                  textDecoration: "none",
                  display: "block",
                  transition: "color 300ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 242, 236, 0.5)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
