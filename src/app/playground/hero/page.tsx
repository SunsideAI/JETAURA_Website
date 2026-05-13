import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Hero         from "@/sections/Hero";
import Benefits     from "@/sections/Benefits";
import FlightSearch from "@/sections/FlightSearch";
import Fleet        from "@/sections/Fleet";
import Experience   from "@/sections/Experience";
import Destinations from "@/sections/Destinations";
import Footer       from "@/sections/Footer";

export default function HeroPlayground() {
  return (
    <SmoothScrollProvider>
      <main style={{ background: "#0A0A0B" }}>
        <Hero />
        <Benefits />
        <FlightSearch />
        <Fleet />
        <Experience />
        <Destinations />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
