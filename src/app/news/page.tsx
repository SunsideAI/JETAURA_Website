"use client";

import PageNav from "@/components/PageNav";
import Footer from "@/sections/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO = "var(--font-mono, 'JetBrains Mono', monospace)";
const BODY = "var(--font-body, 'Inter Tight', sans-serif)";

interface Article {
  date: string;
  category: string;
  title: string;
  body: string;
}

const ARTICLES: Article[] = [
  {
    date: "2026-04-14",
    category: "FLEET",
    title: "Gulfstream G700 joins the JETAURA network",
    body: "The ultra-long-range G700 is now available for charter through JETAURA, extending our range capabilities to 7,500 nautical miles non-stop.",
  },
  {
    date: "2026-03-28",
    category: "ROUTES",
    title: "New direct connections: Frankfurt to Maldives",
    body: "JETAURA introduces a dedicated Frankfurt–Malé route option for clients seeking seamless island access without commercial connections.",
  },
  {
    date: "2026-03-10",
    category: "COMPANY",
    title: "JETAURA expands to Dubai",
    body: "Our second operational base opens in Dubai, providing regional clients in the Gulf with direct access to our concierge team.",
  },
  {
    date: "2026-02-20",
    category: "FLEET",
    title: "Bombardier Global 8000 now available",
    body: "The world's longest-range business jet joins our portfolio, capable of flying London to Sydney non-stop.",
  },
  {
    date: "2026-02-05",
    category: "EXPERIENCE",
    title: "New in-flight catering partnerships",
    body: "JETAURA has partnered with three Michelin-starred kitchens in Frankfurt, Paris and London to elevate in-flight dining.",
  },
  {
    date: "2026-01-18",
    category: "COMPANY",
    title: "JETAURA launches membership programme",
    body: "Our founding member programme offers priority access, dedicated account management and guaranteed availability for 52 charter days per year.",
  },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const labels = {
  en: { label: "NEWS", headline: "Latest updates." },
  de: { label: "NACHRICHTEN", headline: "Aktuelle Neuigkeiten." },
};

export default function NewsPage() {
  const { lang } = useLanguage();
  const t = labels[lang];
  const [featured, ...rest] = ARTICLES;

  return (
    <div style={{ background: "#0A0A0B", minHeight: "100vh", color: "#F5F2EC" }}>
      <PageNav />

      {/* Page header */}
      <section
        style={{
          padding: "140px clamp(20px, 5vw, 80px) clamp(64px, 8vw, 96px)",
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
            margin: 0,
          }}
        >
          {t.headline}
        </h1>
      </section>

      {/* Articles */}
      <section
        style={{
          padding: "0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Featured article */}
        <article
          style={{
            background: "#0D0D0F",
            padding: "40px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#F5F2EC",
                opacity: 0.7,
              }}
            >
              {featured.category}
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                opacity: 0.35,
              }}
            >
              {formatDate(featured.date)}
            </span>
          </div>

          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: "28px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}
          >
            {featured.title}
          </h2>

          <p
            style={{
              fontFamily: BODY,
              fontSize: "15px",
              lineHeight: 1.7,
              opacity: 0.55,
              margin: 0,
              maxWidth: "680px",
            }}
          >
            {featured.body}
          </p>
        </article>

        {/* Remaining 5 in 3-col grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "0 clamp(24px, 4vw, 48px)" }}
        >
          {rest.map((article) => (
            <article
              key={article.date + article.title}
              style={{
                borderTop: "0.5px solid rgba(245, 242, 236, 0.07)",
                padding: "24px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0.7,
                  }}
                >
                  {article.category}
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    opacity: 0.35,
                  }}
                >
                  {formatDate(article.date)}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "20px",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                  margin: "0 0 12px",
                }}
              >
                {article.title}
              </h3>

              <p
                style={{
                  fontFamily: BODY,
                  fontSize: "14px",
                  lineHeight: 1.65,
                  opacity: 0.45,
                  margin: 0,
                }}
              >
                {article.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
