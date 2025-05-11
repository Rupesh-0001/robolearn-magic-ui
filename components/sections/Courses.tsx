import { CodeIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import aiAgent from "@/public/aiAgent.png";
import drone from "@/public/drone.png";
import robotics from "@/public/roboticArm.png";
import autonomous from "@/public/autonomousCar.png";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Ripple } from "@/components/magicui/ripple";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

type ImagePosition = "right" | "bottom";

const courses = [
  {
    Icon: CodeIcon,
    name: "Drone Technology & Applications",
    description: "Design, build, and operate drones with a focus on flight control, autonomy, and practical uses.",
    href: "/features/ai-algorithms",
    cta: "Learn More",
    className: "col-span-1 row-span-1",
    imagePosition: "right" as ImagePosition,
    image: (
      <WarpBackground className="p-0 border-0 flex items-center justify-center">
        <Image src={drone} alt="Drone Technology & Applications" className="max-h-96 scale-230 object-contain" />
      </WarpBackground>
    ),
  },
  {
    Icon: CodeIcon,
    name: "AI Agents Mastery",
    description: "Learn to build intelligent AI agents that make decisions, automate tasks, and solve real-world problems.",
    href: "/features/security",
    cta: "Explore Security",
    className: "col-span-1 row-span-1",
    imagePosition: "right" as ImagePosition,
    image: (
      <WarpBackground className="p-0 border-0 flex items-center justify-center">
        <Image src={aiAgent} alt="AI Agents Mastery" className="max-h-96 scale-190 object-contain" />
      </WarpBackground>
    ),
  },
  {
    Icon: CodeIcon,
    name: "Industrial Robotics Essentials",
    description: "Master robotic arms, automation systems, and programming for modern industrial manufacturing environments.",
    href: "/features/integration",
    cta: "See Integration",
    className: "col-span-1 row-span-2",
    imagePosition: "right" as ImagePosition,
    image: (
      <Image src={robotics} alt="Industrial Robotics Essentials" className="max-h-96 scale-360 object-contain" />
    ),
  },
  {
    Icon: CodeIcon,
    name: "Autonomous Vehicles Engineering",
    description: "Explore the tech behind self-driving cars, including sensors, perception, and autonomous navigation systems.",
    href: "/features/customization",
    cta: "Customize Now",
    className: "col-span-2 row-span-1",
    imagePosition: "bottom" as ImagePosition,
    image: (
      <Image src={autonomous} alt="Autonomous Vehicles Engineering" className="max-h-48 scale-200 object-contain" />
    ),
  },
];

export function BentoDemo() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  return (
    <div id="courses" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-8 sm:mb-10 lg:mb-12">
          Explore Our Courses
        </h2>
        <BentoGrid className={`grid-cols-1 ${isMediumScreen ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4 sm:gap-5 lg:gap-6 auto-rows-[18rem]`}>
          {courses.slice(0, 2).map((course) => (
            <BentoCard 
              key={course.name} 
              {...course} 
              background="light" 
              className={`${isSmallScreen ? 'col-span-1' : course.className}`}
            />
          ))}
          
          {/* Robotics card with flickering grid */}
          <div className={`relative ${isSmallScreen ? 'col-span-1' : isMediumScreen ? 'col-span-2' : 'col-span-1 row-span-2'} rounded-xl overflow-hidden border border-neutral-100 h-full`}>
            <FlickeringGrid
              className="absolute inset-0 z-0"
              squareSize={isSmallScreen ? 2 : 4}
              gridGap={isSmallScreen ? 3 : 6}
              color="#6B7280"
              maxOpacity={0.3}
              flickerChance={0.1}
            />
            <div className="relative z-10 h-full">
              <BentoCard 
                {...courses[2]}
                className="bg-transparent border-0 h-full [box-shadow:none]"
                background="transparent"
              />
            </div>
          </div>
          
          {/* Autonomous card with ripple background */}
          <div className={`relative ${isSmallScreen ? 'col-span-1' : 'col-span-2'} rounded-xl overflow-hidden border border-neutral-100 h-full`}>
            <Ripple 
              className="opacity-40 z-0" 
              mainCircleSize={isSmallScreen ? 150 : 250} 
              numCircles={isSmallScreen ? 5 : 10}
              mainCircleOpacity={0.15}
            />
            <div className="relative z-10 h-full">
              <BentoCard 
                {...courses[3]}
                className="bg-transparent h-full border-0 [box-shadow:none]"
                background="transparent"
              />
            </div>
          </div>
        </BentoGrid>
      </div>
    </div>
  );
}
