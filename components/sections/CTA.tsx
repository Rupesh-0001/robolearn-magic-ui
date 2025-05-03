import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Ready to transform your learning experience?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
          Join thousands of learners who have accelerated their education with our AI-powered platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="rounded-full border border-solid border-primary-foreground transition-colors flex items-center justify-center bg-primary-foreground text-primary gap-2 hover:bg-primary-foreground/90 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
          >
            Get Started for Free
          </Link>
          <Link
            href="/demo"
            className="rounded-full border border-solid border-primary-foreground/30 transition-colors flex items-center justify-center hover:bg-primary-foreground/10 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </section>
  );
} 