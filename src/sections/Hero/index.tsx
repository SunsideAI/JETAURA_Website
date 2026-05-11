"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Clouds from "./Clouds";
import Jet from "./Jet";
import HUD from "./HUD";
import Headlines from "./Headlines";
import { buildHeroTimeline, buildIdleAnimations, buildStarTwinkle } from "./animations";

gsap.registerPlugin(ScrollTrigger);

const STAR_COUNT = 60;

function generateStars() {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    top: Math.random() * 60,
    left: Math.random() * 100,
    opacity: 0.2 + Math.random() * 0.5,
    size: 1 + Math.random() * 1.5,
  }));
}

const stars = generateStars();

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudBackRef = useRef<HTMLDivElement>(null);
  const cloudMidRef = useRef<HTMLDivElement>(null);
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
  const starsRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          starsRef,
        });

        const idleTweens = buildIdleAnimations({ cloudBackRef, cloudMidRef, starsRef });

        const starEls = starsRef.current
          ? Array.from(starsRef.current.querySelectorAll<HTMLElement>(".star"))
          : [];
        const starTweens = buildStarTwinkle(starEls);

        return () => {
          idleTweens.forEach((t) => t.kill());
          starTweens.forEach((t) => t.kill());
        };
      });

      // Reduced-motion / mobile fallback: static composition
      mm.add("(prefers-reduced-motion: reduce), (max-width: 767px)", () => {
        if (jetRef.current) gsap.set(jetRef.current, { opacity: 1, scale: 1, x: 0 });
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 });
        if (cloudFrontRef.current) gsap.set(cloudFrontRef.current, { opacity: 0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      />

      {/* Jet z4 */}
      <Jet jetRef={jetRef} />

      {/* Headlines z6 */}
      <Headlines
        headline1Ref={headline1Ref}
        headline2Ref={headline2Ref}
        ctaRef={ctaRef}
      />

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
          boxShadow: "inset 0 0 120px 60px #0A0A0B",
        }}
      />

      {/* HUD z10 */}
      <HUD
        hudRef={hudRef}
        flRef={flRef}
        machRef={machRef}
        progressRef={progressRef}
        tailRef={tailRef}
      />
    </section>
  );
}
