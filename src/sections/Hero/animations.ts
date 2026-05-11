import type React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroRefs {
  sectionRef: React.RefObject<HTMLElement | null>;
  cloudBackRef: React.RefObject<HTMLDivElement | null>;
  cloudMidRef: React.RefObject<HTMLDivElement | null>;
  cloudFrontRef: React.RefObject<HTMLDivElement | null>;
  cloudCloseRef: React.RefObject<HTMLDivElement | null>;
  jetRef: React.RefObject<HTMLDivElement | null>;
  headline1Ref: React.RefObject<HTMLDivElement | null>;
  headline2Ref: React.RefObject<HTMLDivElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
  flRef: React.RefObject<HTMLSpanElement | null>;
  machRef: React.RefObject<HTMLSpanElement | null>;
  progressRef: React.RefObject<HTMLSpanElement | null>;
  tailRef: React.RefObject<HTMLDivElement | null>;
  starsRef: React.RefObject<HTMLDivElement | null>;
}

function formatFL(value: number): string {
  return `FL ${String(Math.round(value)).padStart(3, "0")}`;
}

function formatMach(value: number): string {
  return `M ${value.toFixed(2)}`;
}

function formatProgress(value: number): string {
  return `${String(Math.round(value * 100)).padStart(3, "0")}%`;
}

export function buildHeroTimeline(refs: HeroRefs): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: { ease: "none", duration: 0.25 },
    scrollTrigger: {
      trigger: refs.sectionRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (refs.progressRef.current) {
          refs.progressRef.current.textContent = formatProgress(self.progress);
        }
      },
    },
  });

  // ─── Stage 1 (0%–15%): Mist ───────────────────────────────────────
  tl.to(refs.headline1Ref.current, { y: -10, duration: 0.15 }, 0);
  tl.to(refs.starsRef.current,     { y: 5,   duration: 0.15 }, 0);

  // ─── Stage 2 (15%–40%): Emergence ────────────────────────────────
  tl.to(
    refs.cloudFrontRef.current,
    { scale: 2.6, y: 70, opacity: 0, ease: "power2.inOut", duration: 0.25 },
    0.15
  );
  tl.to(
    refs.cloudMidRef.current,
    { scale: 1.4, x: -50, y: 30, opacity: 0.4, ease: "power2.inOut", duration: 0.25 },
    0.15
  );
  tl.to(
    refs.cloudBackRef.current,
    { x: -30, y: 18, opacity: 0.55, ease: "power2.inOut", duration: 0.25 },
    0.15
  );

  // Jet enters 18%–38%
  tl.fromTo(
    refs.jetRef.current,
    { opacity: 0, scale: 0.75, x: -40 },
    { opacity: 1, scale: 1.05, x: 0, ease: "power2.out", duration: 0.20 },
    0.18
  );

  // Headline 1 fades out 25%–33%
  tl.to(
    refs.headline1Ref.current,
    { opacity: 0, ease: "power3.out", duration: 0.08 },
    0.25
  );

  // HUD ticks up 18%–55%
  const hudProxy = { fl: 0, mach: 0 };
  tl.to(
    hudProxy,
    {
      fl: 410,
      mach: 0.85,
      ease: "power1.in",
      duration: 0.37,
      onUpdate: () => {
        if (refs.flRef.current)   refs.flRef.current.textContent   = formatFL(hudProxy.fl);
        if (refs.machRef.current) refs.machRef.current.textContent = formatMach(hudProxy.mach);
      },
    },
    0.18
  );

  // ─── Stage 3 (40%–65%): Cruise ───────────────────────────────────
  tl.to(refs.jetRef.current,       { scale: 1.0, x: 22, ease: "power2.out", duration: 0.25 }, 0.40);
  tl.to(refs.cloudBackRef.current, { x: -50, y: 30, ease: "power2.inOut",   duration: 0.25 }, 0.40);
  tl.to(refs.tailRef.current,      { opacity: 0.6, ease: "power3.out",       duration: 0.15 }, 0.40);

  // Headline 2 in 55%–68%
  tl.fromTo(
    refs.headline2Ref.current,
    { opacity: 0, y: 110 },
    { opacity: 1, y: 80, ease: "power3.out", duration: 0.13 },
    0.55
  );

  // ─── Stage 4 (65%–88%): Approach ─────────────────────────────────
  // Cloud-close 65%–100%
  tl.fromTo(
    refs.cloudCloseRef.current,
    { opacity: 0, scale: 1.8 },
    { opacity: 1, scale: 1.0, ease: "power2.inOut", duration: 0.35 },
    0.65
  );

  // Jet vanish 72%–92%
  tl.to(
    refs.jetRef.current,
    { scale: 1.18, x: 55, opacity: 0, ease: "power2.inOut", duration: 0.20 },
    0.72
  );

  // Headline 2 out 72%–82%
  tl.to(
    refs.headline2Ref.current,
    { opacity: 0, ease: "power3.out", duration: 0.10 },
    0.72
  );

  // Tail out 78%–82%
  tl.to(refs.tailRef.current, { opacity: 0, ease: "power3.out", duration: 0.04 }, 0.78);

  // HUD descends 80%–100%
  const hudDescProxy = { fl: 410, mach: 0.85 };
  tl.to(
    hudDescProxy,
    {
      fl: 0,
      mach: 0,
      ease: "power1.in",
      duration: 0.20,
      onUpdate: () => {
        if (refs.flRef.current)   refs.flRef.current.textContent   = formatFL(hudDescProxy.fl);
        if (refs.machRef.current) refs.machRef.current.textContent = formatMach(hudDescProxy.mach);
      },
    },
    0.80
  );

  // ─── Stage 5 (88%–100%): Vanish + CTA ────────────────────────────
  tl.to(refs.ctaRef.current, { opacity: 1, ease: "power3.out", duration: 0.08 }, 0.88);
  tl.to(".scroll-hint",      { opacity: 0.4, ease: "power3.out", duration: 0.04 }, 0.95);

  return tl;
}

interface IdleRefs {
  cloudBackInnerRef: React.RefObject<HTMLDivElement | null>;
  cloudMidInnerRef: React.RefObject<HTMLDivElement | null>;
  starsRef: React.RefObject<HTMLDivElement | null>;
}

export function buildIdleAnimations(refs: IdleRefs): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];

  if (refs.cloudBackInnerRef.current) {
    tweens.push(
      gsap.to(refs.cloudBackInnerRef.current, {
        y: "+=8",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );
  }

  if (refs.cloudMidInnerRef.current) {
    tweens.push(
      gsap.to(refs.cloudMidInnerRef.current, {
        y: "+=8",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      })
    );
  }

  return tweens;
}

export function buildStarTwinkle(starEls: HTMLElement[]): gsap.core.Tween[] {
  return starEls.map((star) => {
    const baseOpacity = parseFloat(star.style.opacity || "0.6");
    return gsap.to(star, {
      opacity: baseOpacity * 0.4,
      duration: 2 + Math.random() * 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2,
    });
  });
}
