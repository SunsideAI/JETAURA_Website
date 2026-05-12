import type React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoHeroRefs {
  sectionRef: React.RefObject<HTMLElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  headline1Ref: React.RefObject<HTMLDivElement | null>;
  logoRef: React.RefObject<HTMLDivElement | null>;
  flRef: React.RefObject<HTMLSpanElement | null>;
  machRef: React.RefObject<HTMLSpanElement | null>;
  progressRef: React.RefObject<HTMLSpanElement | null>;
  tailRef: React.RefObject<HTMLDivElement | null>;
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

export function buildVideoHeroTimeline(refs: VideoHeroRefs): void {
  const tl = gsap.timeline({ defaults: { ease: "none" } });

  // headline1: in 0–12%, fades out 30–45%
  tl.fromTo(
    refs.headline1Ref.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 },
    0
  );
  tl.to(
    refs.headline1Ref.current,
    { opacity: 0, ease: "power2.in", duration: 0.15 },
    0.30
  );

  // Tail annotation: in 5–20%, out 70–80%
  tl.fromTo(
    refs.tailRef.current,
    { opacity: 0 },
    { opacity: 0.6, ease: "power2.out", duration: 0.15 },
    0.05
  );
  tl.to(refs.tailRef.current, { opacity: 0, ease: "power2.in", duration: 0.10 }, 0.70);

  // HUD ascent: FL 000→410, M 0.00→0.85 over 10–65%
  const hudUp = { fl: 0, mach: 0 };
  tl.to(
    hudUp,
    {
      fl: 410,
      mach: 0.85,
      ease: "power1.inOut",
      duration: 0.55,
      onUpdate: () => {
        if (refs.flRef.current)   refs.flRef.current.textContent   = formatFL(hudUp.fl);
        if (refs.machRef.current) refs.machRef.current.textContent = formatMach(hudUp.mach);
      },
    },
    0.10
  );

  // HUD descent: FL 410→0, M 0.85→0 over 80–95%
  const hudDown = { fl: 410, mach: 0.85 };
  tl.to(
    hudDown,
    {
      fl: 0,
      mach: 0,
      ease: "power1.out",
      duration: 0.15,
      onUpdate: () => {
        if (refs.flRef.current)   refs.flRef.current.textContent   = formatFL(hudDown.fl);
        if (refs.machRef.current) refs.machRef.current.textContent = formatMach(hudDown.mach);
      },
    },
    0.80
  );

  // JETAURA wordmark rises through last-frame clouds, 82–95%
  tl.fromTo(
    refs.logoRef.current,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, ease: "power3.out", duration: 0.13 },
    0.82
  );

  ScrollTrigger.create({
    trigger: refs.sectionRef.current,
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: true,
    anticipatePin: 1,
    animation: tl,
    onUpdate: (self) => {
      const video = refs.videoRef.current;
      if (video && video.readyState >= 1 && video.duration) {
        video.currentTime = self.progress * video.duration;
      }
      if (refs.progressRef.current) {
        refs.progressRef.current.textContent = formatProgress(self.progress);
      }
    },
  });
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
