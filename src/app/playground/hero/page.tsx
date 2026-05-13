import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Hero from "@/sections/Hero";
import Benefits from "@/sections/Benefits";

export default function HeroPlayground() {
  return (
    <SmoothScrollProvider>
      <main style={{ background: "#0A0A0B" }}>
        <Hero />
        <Benefits />
        <div style={{ height: "100px", background: "#0D0D0F" }} />
      </main>
    </SmoothScrollProvider>
  );
}
