import Link from "next/link";
import { Stats } from "@/components/sections/Stats";

export function Hero() {
  return (
    <section id="home" className="relative flex flex-col justify-between h-screen 2xl:py-36">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
        <div className="gap-12 items-center px-20 pt-8 text-center">
          <div className="flex flex-col gap-6">
            <span className="text-4xl sm:text-5xl 2xl:text-6xl tracking-tight">
              <span className="font-bold">Inspire Young Innovators with</span>{" "}
              <br /> <span className="font-bold">the</span>
              <span className="italic bg-gradient-to-r from-[#ff4164] via-[#ff7e42] to-[#ffb74d] bg-clip-text text-transparent w-fit px-[3px]">
                {" "}
                Power of Robotics
              </span>
            </span>
            <span className="text-lg text-muted-foreground">
              <div className="max-w-3/5 mx-auto">
                At RoboLearn, we bridge imagination and engineering to empower
                students with future-ready skills. Join us in shaping a world of
                creators through engaging, hands-on robotics education from
                beginner to advanced levels.
              </div>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
        <Link
          href="/get-started"
          className="rounded border border-solid border-transparent transition-colors flex items-center justify-center bg-[#ff4164] text-background gap-2 hover:bg-[#ff1c46]/90 dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
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
            className="h-6 w-6"
          >
            <rect width="7" height="7" x="14" y="3" rx="1"></rect>
            <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
          </svg>
          Explore Free Masterclass
        </Link>
      </div>

      <div className="w-full pb-8">
        <Stats />
      </div>
    </section>
  );
}
