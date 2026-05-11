"use client";

import Image from "next/image";
import type { CloudLayerProps } from "./types";

interface CloudsProps {
  backRef: React.RefObject<HTMLDivElement | null>;
  midRef: React.RefObject<HTMLDivElement | null>;
  frontRef: React.RefObject<HTMLDivElement | null>;
  closeRef: React.RefObject<HTMLDivElement | null>;
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

export default function Clouds({ backRef, midRef, frontRef, closeRef }: CloudsProps) {
  return (
    <>
      {/* z2 — back cloud, slowest parallax */}
      <CloudLayer
        src="/clouds/back.webp"
        layerRef={backRef}
        className="z-[2]"
      />

      {/* z3 — mid cloud, medium parallax */}
      <CloudLayer
        src="/clouds/mid.webp"
        layerRef={midRef}
        className="z-[3]"
      />

      {/* z5 — front cloud, densest, covers stage 1-2 */}
      <CloudLayer
        src="/clouds/front.webp"
        layerRef={frontRef}
        className="z-[5]"
      />

      {/* z7 — close cloud, final cover at stage 5 */}
      <CloudLayer
        src="/clouds/close.webp"
        layerRef={closeRef}
        className="z-[7] opacity-0"
      />
    </>
  );
}
