"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Clouds from "./Clouds";
import Jet from "./Jet";
import HUD from "./HUD";
import Headlines from "./Headlines";
import { buildHeroTimeline, buildIdleAnimations, buildStarTwinkle } from "./animations";

gsap.registerPlugin(ScrollTrigger);

const STAR_COUNT = 60;

interface Star {
  id: number;
  top: number;
  left: number;
  opacity: number;
  size: number;
}

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    top: Math.random() * 60,
    left: Math.random() * 100,
    opacity: 0.2 + Math.random() * 0.5,
    size: 1 + Math.random() * 1.5,
  }));
}

export default function Hero() {
  const [stars, setStars] = useState<Star[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cloudBackRef = useRef<HTMLDivElement>(null);
  const cloudBackInnerRef = useRef<HTMLDivElement>(null);
  const cloudMidRef = useRef<HTMLDivElement>(null);
  const cloudMidInnerRef = useRef<HTMLDivElement>(null);
  const cloudFrontRef = useRef<HTMLDivElement>(null);
  const cloudCloseRef = useRef<HTMLDivElement>(null);
  const jetRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const flRef = useRef<HTMLSpanElement>(null);
  const machRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStars(generateStars());
  }, []);

  useEffect(() => {
    if (stars.length === 0) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        buildHeroTimeline({
          sectionRef,
          cloudBackRef,
          cloudMidRef,
          cloudFrontRef,
          cloudCloseRef,
          jetRef,
          headline1Ref,
          headline2Ref,
          ctaRef,
          flRef,
          machRef,
          progressRef,
          tailRef,
          logoRef,
          starsRef,
        });

        const idleTweens = buildIdleAnimations({ cloudBackInnerRef, cloudMidInnerRef, starsRef });

        const starEls = starsRef.current
          ? Array.from(starsRef.current.querySelectorAll<HTMLElement>(".star"))
          : [];
        const starTweens = buildStarTwinkle(starEls);

        return () => {
          idleTweens.forEach((t) => t.kill());
          starTweens.forEach((t) => t.kill());
        };
      });

      // Mobile / reduced-motion: static composition, no pinning, no parallax
      mm.add("(prefers-reduced-motion: reduce), (max-width: 767px)", () => {
        // Jet: centered, full size
        gsap.set(jetRef.current,       { opacity: 1, scale: 1, x: 0, y: 0 });
        // Headline 1: visible, no y-offset
        gsap.set(headline1Ref.current, { opacity: 1, y: 0 });
        // Headline 2: keep hidden on mobile (too cluttered)
        gsap.set(headline2Ref.current, { opacity: 0 });
        // CTA: immediately visible
        gsap.set(ctaRef.current,       { opacity: 1 });
        // Logo: immediately visible
        gsap.set(logoRef.current,      { opacity: 1, y: 0 });
        // Clouds: hide front (dense cover), hide close (stage 5 cover)
        gsap.set(cloudFrontRef.current, { opacity: 0 });
        gsap.set(cloudCloseRef.current, { opacity: 0 });
        // Back cloud: faint atmosphere
        gsap.set(cloudBackRef.current,  { opacity: 0.35 });
        // Mid cloud: hidden to keep it clean
        gsap.set(cloudMidRef.current,   { opacity: 0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stars]);

  return (
    <section
      ref={sectionRef}
      aria-label="Sky Brokers hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#0A0A0B" }}
    >
      {/* z0 — background */}
      <div className="absolute inset-0 z-[0]" style={{ background: "#0A0A0B" }} aria-hidden="true" />

      {/* z1 — stars */}
      <div ref={starsRef} className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute rounded-full"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: "#F5F2EC",
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Clouds z2–z3, z5, z7 */}
      <Clouds
        backRef={cloudBackRef}
        midRef={cloudMidRef}
        frontRef={cloudFrontRef}
        closeRef={cloudCloseRef}
        backInnerRef={cloudBackInnerRef}
        midInnerRef={cloudMidInnerRef}
      />

      {/* Jet z4 */}
      <Jet jetRef={jetRef} />

      {/* Headlines z6 */}
      <Headlines
        headline1Ref={headline1Ref}
        headline2Ref={headline2Ref}
        ctaRef={ctaRef}
      />

      {/* Mobile composition z11 — replaces all desktop absolute layers */}
      <div
        className="md:hidden absolute inset-0 z-[11] flex flex-col items-center justify-between pointer-events-none"
        style={{ padding: "14px 0" }}
        aria-hidden="true"
      >
        {/* HUD top row */}
        <div
          className="w-full flex justify-between"
          style={{
            padding: "0 14px",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "rgba(245, 242, 236, 0.6)",
          }}
        >
          <span>N° 001 — Sky Brokers</span>
        </div>

        {/* Jet + wordmark block */}
        <div className="flex flex-col items-center gap-0 w-full">
          {/* Jet image */}
          <div className="relative w-[90vw]" style={{ aspectRatio: "1800 / 720" }}>
            <img
              src="/jet/jet-main.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "right center",
                mixBlendMode: "screen",
              }}
            />
          </div>

          {/* JETAURA wordmark */}
          <span
            className="jetaura-wordmark"
            style={{
              fontFamily: "var(--font-display, 'Editorial New', 'Times New Roman', serif)",
              fontSize: "clamp(36px, 11vw, 56px)",
              fontWeight: 400,
              letterSpacing: "0.25em",
              color: "#F5F2EC",
              textTransform: "uppercase" as const,
              lineHeight: 1,
              marginTop: "8px",
            }}
          >
            JETAURA
          </span>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display, 'Editorial New', 'Times New Roman', serif)",
              fontSize: "clamp(32px, 8vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#F5F2EC",
              textAlign: "center",
              margin: "24px 0 0",
            }}
          >
            <span style={{ display: "block" }}>Beyond</span>
            <span style={{ display: "block", fontStyle: "italic", color: "rgba(245, 242, 236, 0.55)" }}>
              schedules.
            </span>
          </h1>
        </div>

        {/* CTA */}
        <div
          className="flex flex-col items-center pointer-events-auto"
          style={{ paddingBottom: "clamp(32px, 6vh, 56px)", gap: "12px" }}
        >
          <button
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#B8956A",
              background: "transparent",
              border: "0.5px solid rgba(184, 149, 106, 0.7)",
              padding: "12px 32px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            Configure your flight
          </button>

          {/* HUD bottom */}
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(245, 242, 236, 0.6)",
            }}
          >
            Est. 2026 · Frankfurt
          </span>
        </div>
      </div>

      {/* Grain overlay z8 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[8] pointer-events-none"
        style={{
          backgroundImage: "url(/textures/grain.png)",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
          opacity: 0.04,
        }}
      />

      {/* Vignette z9 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[9] pointer-events-none"
        style={{
          boxShadow: "inset 0 0 180px 40px rgba(0, 0, 0, 0.65)",
        }}
      />

      {/* HUD z10 */}
      <HUD
        hudRef={hudRef}
        flRef={flRef}
        machRef={machRef}
        progressRef={progressRef}
        tailRef={tailRef}
        logoRef={logoRef}
      />
    </section>
  );
}
