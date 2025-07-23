import Link from "next/link";
import { Stats } from "@/components/sections/Stats";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export function Hero() {
  return (
    <section id="home" className="relative flex flex-col justify-between min-h-screen py-12 sm:py-16 lg:py-24 2xl:py-36">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20 lg:pt-24">
        <div className="text-center">
          <div className="flex flex-col gap-4 sm:gap-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl tracking-tight font-bold">
              Inspire Young Innovators with
              <br className="hidden sm:block" /> the{" "}
              <span className="italic bg-gradient-to-r from-[#ff4164] via-[#ff7e42] to-[#ffb74d] bg-clip-text text-transparent w-fit px-[3px]">
                <TypewriterText text="Power of Robotics" delay={80} />
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              At RoboLearn, we bridge imagination and engineering to empower
              students with future-ready skills. Join us in shaping a world of
              creators through engaging, hands-on robotics education from
              beginner to advanced levels.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 sm:mt-12">
        <Link href="/masterclasses">
          <ShimmerButton
            className="flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            background="rgba(255, 65, 100, 1)"
            shimmerColor="#ffffff"
            borderRadius="8px"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              <rect width="7" height="7" x="14" y="3" rx="1"></rect>
              <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
            </svg>
            Explore Free Masterclass
          </ShimmerButton>
        </Link>
      </div>

      <div className="w-full mt-8 sm:mt-12 lg:mt-16">
        <Stats />
      </div>
    </section>
  );
}
