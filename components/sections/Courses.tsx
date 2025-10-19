import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import aiAgent from "@/public/aiAgent.png";
import mernStack from "@/public/mernCourse.JPG";
import drone from "@/public/drone.png";
import robotics from "@/public/roboticArm.png";
import autonomous from "@/public/autonomousCar.png";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Ripple } from "@/components/magicui/ripple";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const courses = [
  {
    name: "MERN Stack Development",
    description:
      "Master full stack web development with MongoDB, Express.js, React, and Node.js. Build production-ready applications.",
    href: "/courses/mern-stack",
    cta: "Start Learning",
    className: "col-span-1 row-span-1",
    imageClassName: "translate-y-[-70px] translate-x-[10%]",
    hoverClassName: "group-hover:bg-blue-500/10",
    descriptionClassName: "max-w-2/3",
    image: (
      <Image
        src={mernStack}
        alt="MERN Stack Development"
        className="max-h-96 scale-200 object-contain"
      />
    ),
  },
  // {
  //   name: "AI Agents Mastery",
  //   description:
  //     "Learn to build intelligent AI agents that make decisions, automate tasks, and solve real-world problems.",
  //   href: "/courses/ai-agent",
  //   cta: "Explore Security",
  //   className: "col-span-1 row-span-1",
  //   imageClassName: "translate-y-[-115px] translate-x-[22%]",
  //   hoverClassName: "group-hover:bg-blue-500/10",
  //   descriptionClassName: "max-w-1/2",
  //   image: (
  //     <Image
  //       src={aiAgent}
  //       alt="AI Agents Mastery"
  //       className="max-h-96 scale-250 object-contain"
  //     />
  //   ),
  // },
  {
    name: "Drone Technology & Applications",
    description:
      "Design, build, and operate drones with a focus on flight control, autonomy, and practical uses.",
    href: "/courses/drones",
    cta: "Learn More",
    className: "col-span-1 row-span-1",
    imageClassName: "translate-y-[-50px] translate-x-[5%]",
    hoverClassName: "group-hover:bg-red-500/10",
    descriptionClassName: "max-w-2/3",
    image: (
      <Image
        src={drone}
        alt="Drone Technology & Applications"
        className="max-h-96 scale-250 object-contain"
      />
    ),
  },
  {
    name: "Industrial Robotics Essentials",
    description:
      "Master robotic arms, automation systems, and programming for modern industrial manufacturing environments.",
    href: "/courses/robotic-arm",
    cta: "See Integration",
    className: "col-span-1 row-span-2",
    imageClassName: "xl:translate-x-[5%] xl:translate-y-[-10px] translate-x-[23%] translate-y-[-80px]",
    descriptionClassName: "xl:max-w-full max-w-1/2",
    hoverClassName: "group-hover:bg-orange-500/10",
    image: (
      <Image
        src={robotics}
        alt="Industrial Robotics Essentials"
        className="max-h-96 xl:scale-390 scale-210 object-contain"
      />
    ),
  },
  {
    name: "Autonomous Vehicles Engineering",
    description:
      "Explore the tech behind self-driving cars, including sensors, perception, and autonomous navigation systems.",
    href: "/courses/autonomous-car",
    cta: "Customize Now",
    className: "col-span-2 row-span-1",
    imageClassName: "xl:translate-x-[20%] xl:translate-y-[-30%]",
    descriptionClassName: "xl:max-w-1/3 max-w-full",
    hoverClassName: "group-hover:bg-green-500/10",
    image: (
      <Image
        src={autonomous}
        alt="Autonomous Vehicles Engineering"
        className="max-h-48 xl:scale-250 scale-170 object-contain"
      />
    ),
  },
];

export function BentoDemo() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  return (
    <div
      id="courses"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-8 sm:mb-10 lg:mb-12">
          Explore Our Courses
        </h2>
        <BentoGrid
          className={`grid-cols-1 ${
            isMediumScreen ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
          } gap-4 sm:gap-5 lg:gap-6 auto-rows-[18rem]`}
        >
          {courses.slice(0, 2).map((course) => (
            <div 
              key={course.name}
              className={`relative ${
                isSmallScreen
                  ? "col-span-1"
                  : isMediumScreen
                  ? "col-span-2"
                  : "col-span-1 row-span-1"
              } rounded-xl overflow-hidden border border-neutral-100 h-full`}
            >
              <AnimatedGridPattern
                numSquares={10}
                maxOpacity={0.1}
                duration={3}
                className={cn(
                  "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                  "inset-x-0 inset-y-[-10%] h-[150%] skew-y-12 absolute inset-0 z-0 overflow-hidden"
                )}
              />
              <BentoCard
                key={course.name}
                {...course}
                background="transparent"
                className={`${isSmallScreen ? "col-span-1" : course.className}`}
              />
            </div>
          ))}

          {/* Robotics card with flickering grid */}
          <div
            className={`relative ${
              isSmallScreen
                ? "col-span-1"
                : isMediumScreen
                ? "col-span-2"
                : "col-span-1 row-span-2"
            } rounded-xl overflow-hidden border border-neutral-100 h-full`}
          >
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
          <div
            className={`relative ${
              isSmallScreen ? "col-span-1" : "col-span-2"
            } rounded-xl overflow-hidden border border-neutral-100 h-full`}
          >
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
