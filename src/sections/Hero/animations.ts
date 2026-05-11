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
    scrollTrigger: {
      trigger: refs.sectionRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        if (refs.progressRef.current) {
          refs.progressRef.current.textContent = formatProgress(p);
        }
      },
    },
  });

  // ─── Stage 1 (0%–15%): Mist ───────────────────────────────────────
  tl.to(
    refs.headline1Ref.current,
    { y: -10, ease: "none" },
    0
  );
  tl.to(
    refs.starsRef.current,
    { y: 5, ease: "none" },
    0
  );

  // ─── Stage 2 (15%–40%): Emergence ────────────────────────────────
  // Cloud-front dissolves and scales out
  tl.to(
    refs.cloudFrontRef.current,
    { scale: 2.6, y: 70, opacity: 0, ease: "none" },
    0.15
  );

  // Cloud-mid shifts
  tl.to(
    refs.cloudMidRef.current,
    { scale: 1.4, x: -50, y: 30, opacity: 0.4, ease: "none" },
    0.15
  );

  // Cloud-back drifts
  tl.to(
    refs.cloudBackRef.current,
    { x: -30, y: 18, opacity: 0.55, ease: "none" },
    0.15
  );

  // Jet enters starting at 18%, finishing at 38%
  tl.fromTo(
    refs.jetRef.current,
    { opacity: 0, scale: 0.75, x: -40 },
    { opacity: 1, scale: 1.05, x: 0, ease: "none" },
    0.18
  );
  // Mark jet entry end at 38% (relative to 18%–38% range in 0.2 units)

  // Headline 1 fades out between 25%–33%
  tl.to(
    refs.headline1Ref.current,
    { opacity: 0, ease: "none" },
    0.25
  );

  // HUD readouts tick up (FL 0→410, M 0→0.85) through stage 2-3
  const hudProxy = { fl: 0, mach: 0 };
  tl.to(
    hudProxy,
    {
      fl: 410,
      mach: 0.85,
      ease: "none",
      onUpdate: () => {
        if (refs.flRef.current) refs.flRef.current.textContent = formatFL(hudProxy.fl);
        if (refs.machRef.current) refs.machRef.current.textContent = formatMach(hudProxy.mach);
      },
    },
    0.18
  );

  // ─── Stage 3 (40%–65%): Cruise ───────────────────────────────────
  // Jet scale settles, slight cruise drift
  tl.to(
    refs.jetRef.current,
    { scale: 1.0, x: 22, ease: "none" },
    0.4
  );

  // Cloud-back continues drift
  tl.to(
    refs.cloudBackRef.current,
    { x: -50, y: 30, ease: "none" },
    0.4
  );

  // Tail number annotation appears
  tl.to(
    refs.tailRef.current,
    { opacity: 0.6, ease: "none" },
    0.4
  );

  // Headline 2 fades in at 55%–68%
  tl.fromTo(
    refs.headline2Ref.current,
    { opacity: 0, y: 110 },
    { opacity: 1, y: 80, ease: "none" },
    0.55
  );

  // ─── Stage 4 (65%–88%): Approach ─────────────────────────────────
  // Cloud-close advances from 65%
  tl.fromTo(
    refs.cloudCloseRef.current,
    { opacity: 0, scale: 1.8 },
    { opacity: 1, scale: 1.0, ease: "none" },
    0.65
  );

  // Jet disappears between 72%–92%
  tl.to(
    refs.jetRef.current,
    { scale: 1.18, x: 55, opacity: 0, ease: "none" },
    0.72
  );

  // Headline 2 fades out by 82%
  tl.to(
    refs.headline2Ref.current,
    { opacity: 0, ease: "none" },
    0.72
  );

  // Tail number fades at 80%
  tl.to(
    refs.tailRef.current,
    { opacity: 0, ease: "none" },
    0.78
  );

  // HUD descends from 80%
  const hudDescProxy = { fl: 410, mach: 0.85 };
  tl.to(
    hudDescProxy,
    {
      fl: 0,
      mach: 0,
      ease: "none",
      onUpdate: () => {
        if (refs.flRef.current) refs.flRef.current.textContent = formatFL(hudDescProxy.fl);
        if (refs.machRef.current) refs.machRef.current.textContent = formatMach(hudDescProxy.mach);
      },
    },
    0.8
  );

  // ─── Stage 5 (88%–100%): Vanish + CTA ────────────────────────────
  // CTA fades in 88%–96%
  tl.to(
    refs.ctaRef.current,
    { opacity: 1, ease: "none" },
    0.88
  );

  // Scroll hint fades in 95%–99%
  tl.to(
    ".scroll-hint",
    { opacity: 0.4, ease: "none" },
    0.95
  );

  return tl;
}

export function buildIdleAnimations(refs: Pick<HeroRefs, "cloudBackRef" | "cloudMidRef" | "starsRef">): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];

  if (refs.cloudBackRef.current) {
    tweens.push(
      gsap.to(refs.cloudBackRef.current, {
        y: "+=8",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    );
  }

  if (refs.cloudMidRef.current) {
    tweens.push(
      gsap.to(refs.cloudMidRef.current, {
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
