import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CTA() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`font-bold tracking-tight mb-4 sm:mb-6 ${
          isSmallScreen ? "text-2xl" : isMediumScreen ? "text-3xl" : "text-4xl"
        }`}>
          Ready to transform your learning experience?
        </h2>
        <p className={`max-w-2xl mx-auto mb-6 sm:mb-8 opacity-90 ${
          isSmallScreen ? "text-base" : "text-lg"
        }`}>
          Join thousands of learners who have accelerated their education with
          our AI-powered platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/masterclasses"
            className={`rounded-full border border-solid border-primary-foreground transition-colors flex items-center justify-center bg-primary-foreground text-primary gap-2 hover:bg-primary-foreground/90 font-medium ${
              isSmallScreen ? "text-sm h-10 px-4" : "text-base h-12 px-6 sm:px-8"
            }`}
          >
            Get Started for Free
          </Link>
          <Link
            href="https://wa.me/919878555767?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20project"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full border border-solid border-primary-foreground/30 transition-colors flex items-center justify-center hover:bg-primary-foreground/10 font-medium ${
              isSmallScreen ? "text-sm h-10 px-4" : "text-base h-12 px-6 sm:px-8"
            }`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
