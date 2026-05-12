"use client";

import type { VideoScrubProps } from "./types";

export default function VideoScrub({ videoRef }: VideoScrubProps) {
  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
      style={{ objectFit: "cover" }}
    >
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}
