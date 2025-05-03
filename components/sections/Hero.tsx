import { Globe } from "@/components/magicui/globe";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Learn with <span className="text-primary">AI-powered</span> assistance
            </h1>
            <p className="text-lg text-muted-foreground max-w-prose">
              RoboLearn combines cutting-edge AI with interactive learning experiences to help you master new skills faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/get-started"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              >
                Get Started
              </Link>
              <Link
                href="/learn-more"
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            <Globe className="opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
} 