"use client";

import Image from "next/image";
import type { CloudLayerProps } from "./types";

interface CloudsProps {
  backRef: React.RefObject<HTMLDivElement | null>;
  midRef: React.RefObject<HTMLDivElement | null>;
  frontRef: React.RefObject<HTMLDivElement | null>;
  closeRef: React.RefObject<HTMLDivElement | null>;
  backInnerRef: React.RefObject<HTMLDivElement | null>;
  midInnerRef: React.RefObject<HTMLDivElement | null>;
}

function CloudLayer({ src, alt = "", className = "", layerRef }: CloudLayerProps) {
  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}

export default function Clouds({ backRef, midRef, frontRef, closeRef, backInnerRef, midInnerRef }: CloudsProps) {
  return (
    <>
      {/* z2 — back cloud: outer div receives scroll transforms, inner div receives idle breath */}
      <div ref={backRef} aria-hidden="true" className="absolute inset-0 z-[2] pointer-events-none">
        <div ref={backInnerRef} className="absolute inset-0">
          <Image src="/clouds/back.webp" alt="" fill priority sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
      </div>

      {/* z3 — mid cloud: outer div receives scroll transforms, inner div receives idle breath */}
      <div ref={midRef} aria-hidden="true" className="absolute inset-0 z-[3] pointer-events-none">
        <div ref={midInnerRef} className="absolute inset-0">
          <Image src="/clouds/mid.webp" alt="" fill priority sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
      </div>

      {/* z5 — front cloud, densest, covers stage 1-2 (no idle animation needed) */}
      <CloudLayer src="/clouds/front.webp" layerRef={frontRef} className="z-[5]" />

      {/* z7 — close cloud, final cover at stage 5 (no idle animation needed) */}
      <CloudLayer src="/clouds/close.webp" layerRef={closeRef} className="z-[7] opacity-0" />
    </>
  );
}
