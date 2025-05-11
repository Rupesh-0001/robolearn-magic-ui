"use client";

import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews"
import { FAQ } from "@/components/sections/FAQ"
import { Particles } from "@/components/magicui/particles";
import { BentoDemo } from "@/components/sections/Courses";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Home() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={isSmallScreen ? 100 : isMediumScreen ? 150 : 200}
        ease={isSmallScreen ? 10 : 20}
        color="#000000"
        refresh
        staticity={50}
        size={isSmallScreen ? 0.5 : 1}
      />
      <div className="relative z-10">
        <Hero />
        <Features />
        <BentoDemo />
        <Reviews />
        <FAQ />
        <CTA />
      </div>
    </div>
  );
} 