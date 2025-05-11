"use client";

import { Particles } from "@/components/magicui/particles";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ExplorePage() {
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
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          Explore RoboLearn
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your explore page content here */}
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground">
              Discover our curated collection of robotics courses
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Learning Paths</h2>
            <p className="text-muted-foreground">
              Follow structured paths to master robotics
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Community Projects</h2>
            <p className="text-muted-foreground">
              See what others are building and get inspired
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 