import {
  CodeIcon
} from "@radix-ui/react-icons";
import Image from "next/image";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import aiAgent from "@/public/aiAgent.png";
import drone from "@/public/drone.png";
import robotics from "@/public/roboticArm.png";
import autonomous from "@/public/autonomousCar.png";
import { WarpBackground } from "@/components/magicui/warp-background";
import { Ripple } from "@/components/magicui/ripple";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const courses = [
  {
    Icon: CodeIcon,
    name: "Drone Technology & Applications",
    description: "Design, build, and operate drones with a focus on flight control, autonomy, and practical uses.",
    href: "/features/ai-algorithms",
    cta: "Learn More",
    className: "lg:col-span-1 lg:row-span-1",
    image: (
      <WarpBackground className="p-0 border-0 flex items-center justify-center">
        <Image src={drone} alt="Drone Technology & Applications" className="max-h-96 object-contain" />
      </WarpBackground>
    ),
  },
  {
    Icon: CodeIcon,
    name: "AI Agents Mastery",
    description: "Learn to build intelligent AI agents that make decisions, automate tasks, and solve real-world problems.",
    href: "/features/security",
    cta: "Explore Security",
    className: "lg:col-span-1 lg:row-span-1",
    image: (
      <WarpBackground className="p-0 border-0 flex items-center justify-center">
        <Image src={aiAgent} alt="AI Agents Mastery" className="max-h-96 object-contain" />
      </WarpBackground>
    ),
  },
  {
    Icon: CodeIcon,
    name: "Industrial Robotics Essentials",
    description: "Master robotic arms, automation systems, and programming for modern industrial manufacturing environments.",
    href: "/features/integration",
    cta: "See Integration",
    className: "lg:col-span-1 lg:row-span-2",
    image: (
      <Image src={robotics} alt="Industrial Robotics Essentials" className="max-h-96 object-contain" />
    ),
  },
  {
    Icon: CodeIcon,
    name: "Autonomous Vehicles Engineering",
    description: "Explore the tech behind self-driving cars, including sensors, perception, and autonomous navigation systems.",
    href: "/features/customization",
    cta: "Customize Now",
    className: "lg:col-span-2 lg:row-span-1",
    image: (
      <Image src={autonomous} alt="Autonomous Vehicles Engineering" className="max-h-48 object-contain" />
    ),
  },
];

export function BentoDemo() {
  return (
    <div id="courses" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
          Explore Our Courses
        </h2>
        <BentoGrid className="lg:grid-cols-3 lg:grid-rows-2 gap-6">
          {courses.slice(0, 2).map((course) => (
            <BentoCard 
              key={course.name} 
              {...course} 
              background="light" 
            />
          ))}
          
          {/* Robotics card with flickering grid */}
          <div className="relative lg:col-span-1 lg:row-span-2 rounded-xl overflow-hidden border border-neutral-100 h-full">
            <FlickeringGrid
              className="absolute inset-0 z-0"
              squareSize={4}
              gridGap={6}
              color="#6B7280"
              maxOpacity={0.3}
              flickerChance={0.1}
            />
            <div className="relative z-10 h-full">
              <BentoCard 
                {...courses[2]}
                className="lg:col-span-1 lg:row-span-2 bg-transparent border-0 h-full [box-shadow:none]"
                background="transparent"
              />
            </div>
          </div>
          
          {/* Autonomous card with ripple background */}
          <div className="relative lg:col-span-2 lg:row-span-1 rounded-xl overflow-hidden border border-neutral-100 h-full">
            <Ripple 
              className="opacity-40 z-0" 
              mainCircleSize={250} 
              numCircles={10}
              mainCircleOpacity={0.15}
            />
            <div className="relative z-10 h-full">
              <BentoCard 
                {...courses[3]}
                className="lg:col-span-2 lg:row-span-1 bg-transparent h-full border-0 [box-shadow:none]"
                background="transparent"
              />
            </div>
          </div>
        </BentoGrid>
      </div>
    </div>
  );
}
