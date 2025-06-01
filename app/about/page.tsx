import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | RoboLearn",
  description: "Learn about RoboLearn&apos;s mission to revolutionize education through AI-powered learning.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-20 mt-15">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          About RoboLearn
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Transforming education through the power of artificial intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At RoboLearn, we&apos;re on a mission to make personalized education accessible to everyone. 
              We believe that every learner is unique, and their education should adapt to their individual 
              needs, pace, and learning style.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              We envision a world where quality education is not limited by geographical boundaries or 
              economic constraints. Through our AI-powered platform, we&apos;re creating a future where 
              learning is truly personalized, engaging, and effective for everyone.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-muted to-muted/50 p-12 rounded-2xl mb-20 shadow-xl">
        <h2 className="text-3xl font-semibold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Innovation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Constantly pushing the boundaries of what&apos;s possible in education technology
            </p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
            <p className="text-muted-foreground leading-relaxed">
              Making quality education available to learners worldwide
            </p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Excellence</h3>
            <p className="text-muted-foreground leading-relaxed">
              Committed to delivering the highest quality learning experience
            </p>
          </div>
        </div>
      </div>

      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-3xl"></div>
        <div className="relative bg-card p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold mb-6">Join Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you&apos;re a student, educator, or lifelong learner, we invite you to be part of 
            our mission to transform education through technology.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-xl"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
} 