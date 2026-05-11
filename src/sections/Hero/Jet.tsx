"use client";

import Image from "next/image";
import type { JetProps } from "./types";

export default function Jet({ jetRef }: JetProps) {
  return (
    <div
      ref={jetRef}
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center z-[4] pointer-events-none opacity-0"
    >
      <div className="relative w-[90vw] md:w-[60vw] max-w-[1080px]" style={{ aspectRatio: "1800 / 720" }}>
        <Image
          src="/jet/jet-main.png"
          alt=""
          fill
          priority
          sizes="60vw"
          style={{ objectFit: "contain", objectPosition: "right center", mixBlendMode: "screen" }}
        />
      </div>
    </div>
  );
}
