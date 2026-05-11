import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Hero from "@/sections/Hero";

export default function HeroPlayground() {
  return (
    <SmoothScrollProvider>
      <main style={{ background: "#0A0A0B" }}>
        <Hero />
        {/* Spacer to allow scrolling past the pinned hero */}
        <div style={{ height: "100px", background: "#0A0A0B" }} />
      </main>
    </SmoothScrollProvider>
  );
}
