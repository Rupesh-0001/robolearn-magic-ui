import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews"
import { FAQ } from "@/components/sections/FAQ"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Reviews />
      <FAQ />
      <CTA />
      {/* Add more sections as needed */}
    </>
  );
} 