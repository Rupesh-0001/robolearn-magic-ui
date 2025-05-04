"use client";

import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews"
import { FAQ } from "@/components/sections/FAQ"
import { Stats } from "@/components/sections/Stats"
import { Particles } from "@/components/magicui/particles";

export default function Home() {

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={20}
        color="#000000"
        refresh
        staticity={50}
        size={1}
      />
      <div className="relative z-10">
        <Hero />
        <Stats />
        <Features />
        <Reviews />
      <FAQ />
        <CTA />
      </div>
    </div>
  );
} 