"use client";

import PageNav from "@/components/PageNav";
import Footer from "@/sections/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const DISPLAY = "var(--font-display, 'Editorial New', 'Times New Roman', serif)";
const MONO = "var(--font-mono, 'JetBrains Mono', monospace)";
const BODY = "var(--font-body, 'Inter Tight', sans-serif)";

interface Post {
  date: string;
  tag: string;
  title: string;
  excerpt: string;
}

const POSTS: Post[] = [
  {
    date: "2026-04-01",
    tag: "GUIDE",
    title: "How to choose the right aircraft for your journey",
    excerpt:
      "Range, cabin configuration, and runway access: the three variables that determine which aircraft best serves your route.",
  },
  {
    date: "2026-03-15",
    tag: "INSIGHT",
    title: "Why empty legs are the best-kept secret in private aviation",
    excerpt:
      "When an aircraft needs to reposition without passengers, the result is a dramatically reduced charter rate—if you know where to look.",
  },
  {
    date: "2026-02-28",
    tag: "DESTINATION",
    title: "The case for flying into secondary airports",
    excerpt:
      "Arriving at London City instead of Heathrow. Landing in Le Bourget rather than CDG. Private aviation's true advantage is proximity.",
  },
  {
    date: "2026-02-10",
    tag: "GUIDE",
    title: "Understanding charter contracts: what to look for",
    excerpt:
      "Cancellation policies, fuel surcharges, repositioning fees: a brief guide to reading a private jet charter agreement.",
  },
  {
    date: "2026-01-22",
    tag: "INSIGHT",
    title: "The Gulfstream G700 vs the Bombardier Global 7500",
    excerpt:
      "Two aircraft, comparable range, different philosophies. We examine the cabin, the range, and the experience aboard both.",
  },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const labels = {
  en: { label: "JOURNAL", headline: "Notes on private aviation." },
  de: { label: "JOURNAL", headline: "Notizen zur Privatluftfahrt." },
};

function ReadMoreLink() {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(245, 242, 236, 0.55)",
        display: "inline-block",
        marginTop: "16px",
        cursor: "pointer",
        transition: "color 250ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 242, 236, 0.55)")}
    >
      Read more →
    </span>
  );
}

export default function BlogPage() {
  const { lang } = useLanguage();
  const t = labels[lang];
  const [featured, ...rest] = POSTS;

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

      {/* Posts */}
      <section
        style={{
          padding: "0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Featured post */}
        <article
          style={{
            background: "#0D0D0F",
            padding: "48px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              marginBottom: "24px",
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
              {featured.tag}
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
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 20px",
              maxWidth: "760px",
            }}
          >
            {featured.title}
          </h2>

          <p
            style={{
              fontFamily: BODY,
              fontSize: "16px",
              lineHeight: 1.7,
              opacity: 0.5,
              margin: 0,
              maxWidth: "640px",
            }}
          >
            {featured.excerpt}
          </p>

          <ReadMoreLink />
        </article>

        {/* Remaining 4 in 2-col grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "0 clamp(32px, 5vw, 64px)" }}
        >
          {rest.map((post) => (
            <article
              key={post.date + post.title}
              style={{
                borderTop: "0.5px solid rgba(245, 242, 236, 0.07)",
                padding: "32px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  marginBottom: "16px",
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
                  {post.tag}
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    opacity: 0.35,
                  }}
                >
                  {formatDate(post.date)}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "22px",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                  margin: "0 0 12px",
                }}
              >
                {post.title}
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
                {post.excerpt}
              </p>

              <ReadMoreLink />
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
