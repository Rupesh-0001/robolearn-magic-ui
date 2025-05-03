import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { CTA } from "@/components/sections/CTA";
import { Reviews } from "@/components/sections/Reviews"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Reviews />
      <CTA />
      {/* Add more sections as needed */}
    </>
  );
} 