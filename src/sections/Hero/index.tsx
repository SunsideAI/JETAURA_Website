"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import VideoScrub from "./VideoScrub";
import HUD from "./HUD";
import Headlines from "./Headlines";
import HeroNav from "./HeroNav";
import { buildVideoHeroTimeline } from "./animations";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { lang, toggleLang } = useLanguage();
  const sectionRef   = useRef<HTMLElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const flRef        = useRef<HTMLSpanElement>(null);
  const machRef      = useRef<HTMLSpanElement>(null);
  const progressRef  = useRef<HTMLSpanElement>(null);
  const tailRef      = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const navRef       = useRef<HTMLDivElement>(null);
  const hudRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        // buildVideoHeroTimeline returns a cleanup fn if it had to defer via loadedmetadata.
        // Returning it here lets gsap.matchMedia propagate it when the condition changes.
        return buildVideoHeroTimeline({
          sectionRef,
          videoRef,
          headline1Ref,
          logoRef,
          navRef,
          flRef,
          machRef,
          progressRef,
          tailRef,
        });
      });

      // Mobile / reduced-motion: pause video at last frame, static overlay handles layout
      mm.add("(prefers-reduced-motion: reduce), (max-width: 767px)", () => {
        const video = videoRef.current;
        if (video) {
          const seekToEnd = () => {
            if (video.duration) video.currentTime = video.duration;
          };
          if (video.readyState >= 1 && video.duration) seekToEnd();
          else video.addEventListener("loadedmetadata", seekToEnd, { once: true });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    {/* Nav lives OUTSIDE the pinned section so position:fixed works correctly.
        GSAP pin applies transforms to the section element, creating a new
        containing block that breaks fixed positioning for any child inside it. */}
    <HeroNav navRef={navRef} />

    <section
      ref={sectionRef}
      aria-label="Sky Brokers hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#0A0A0B" }}
    >
      {/* z0 — background */}
      <div className="absolute inset-0 z-[0]" style={{ background: "#0A0A0B" }} aria-hidden="true" />

      {/* z2 — hero video, scroll-scrubbed on desktop */}
      <VideoScrub videoRef={videoRef} />

      {/* Headlines z6 — desktop only (hidden md:flex in component) */}
      <Headlines
        headline1Ref={headline1Ref}
        headline2Ref={headline2Ref}
        ctaRef={ctaRef}
      />

      {/* Mobile static overlay z11 */}
      <div
        className="md:hidden absolute inset-0 z-[11] flex flex-col items-center justify-between pointer-events-none"
        style={{ padding: "14px 0" }}
        aria-hidden="true"
      >
        {/* HUD top */}
        <div
          className="w-full flex justify-between items-center"
          style={{ padding: "0 14px" }}
        >
          <span style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(245, 242, 236, 0.6)" }}>
            N° 001 — Sky Brokers
          </span>
          {/* Language toggle — mobile */}
          <button
            onClick={toggleLang}
            className="pointer-events-auto"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(245, 242, 236, 0.6)", background: "none", border: "none", cursor: "pointer", display: "flex", gap: "4px" }}
          >
            <span style={{ opacity: lang === "en" ? 1 : 0.35 }}>EN</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span style={{ opacity: lang === "de" ? 1 : 0.35 }}>DE</span>
          </button>
        </div>

        {/* Center: wordmark + headline */}
        <div className="flex flex-col items-center gap-6 px-6 text-center">
          <span
            className="jetaura-wordmark"
            style={{
              fontFamily: "var(--font-display, 'Editorial New', 'Times New Roman', serif)",
              fontWeight: 400,
              letterSpacing: "0.25em",
              color: "#F5F2EC",
              textTransform: "uppercase" as const,
              lineHeight: 1,
            }}
          >
            JETAURA
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display, 'Editorial New', 'Times New Roman', serif)",
              fontSize: "clamp(28px, 7vw, 40px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#F5F2EC",
              margin: 0,
            }}
          >
            <span style={{ display: "block" }}>Sky is not</span>
            <span style={{ display: "block", fontStyle: "italic", color: "rgba(245, 242, 236, 0.55)" }}>
              the limit.
            </span>
          </h1>
        </div>

        {/* Nav + bottom */}
        <div
          className="flex flex-col items-center pointer-events-auto"
          style={{ paddingBottom: "clamp(32px, 6vh, 56px)", gap: "20px" }}
        >
          {/* Mobile nav */}
          <nav>
            <ul className="flex flex-wrap justify-center list-none m-0 p-0" style={{ gap: "16px 24px" }}>
              {(lang === "en"
                ? ["Fleet", "Charter", "Experience", "News", "Blog", "About Us"]
                : ["Flotte", "Charter", "Erlebnis", "News", "Blog", "Über uns"]
              ).map((item) => (
                <li key={item}>
                  <a href="#" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 242, 236, 0.55)", textDecoration: "none" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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

      {/* HUD z10 — desktop only (hidden md:block in component) */}
      <HUD
        hudRef={hudRef}
        flRef={flRef}
        machRef={machRef}
        progressRef={progressRef}
        tailRef={tailRef}
        logoRef={logoRef}
      />
    </section>
    </>
  );
}
