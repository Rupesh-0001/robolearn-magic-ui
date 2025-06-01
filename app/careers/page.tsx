import { Metadata } from "next";
import { Users, Rocket, Heart, Zap, ArrowRight, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | RoboLearn",
  description: "Join our team at RoboLearn and help shape the future of education through AI technology.",
};

export default function CareersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-20">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-6 mt-15">
          <Briefcase className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Join Our Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Help us revolutionize education through AI technology. We&apos;re looking for passionate 
          individuals who want to make a difference.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur transition-all group-hover:blur-lg"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Diverse Team</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Work with talented people from around the world
            </p>
          </div>
        </div>
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur transition-all group-hover:blur-lg"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Growth</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Continuous learning and career development
            </p>
          </div>
        </div>
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur transition-all group-hover:blur-lg"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Benefits</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Competitive compensation and comprehensive benefits
            </p>
          </div>
        </div>
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur transition-all group-hover:blur-lg"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Impact</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Make a real difference in education
            </p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
        <div className="space-y-6">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur transition-all group-hover:blur-lg"></div>
            <div className="relative bg-card p-8 rounded-lg shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Senior AI Engineer</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Join our AI team to develop and improve our learning algorithms and recommendation systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Full-time</span>
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Remote</span>
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Engineering</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur transition-all group-hover:blur-lg"></div>
            <div className="relative bg-card p-8 rounded-lg shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Product Designer</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Help shape the future of our platform by creating intuitive and engaging user experiences.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Full-time</span>
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Hybrid</span>
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Design</span>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur transition-all group-hover:blur-lg"></div>
            <div className="relative bg-card p-8 rounded-lg shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Content Strategist</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Create and optimize educational content that engages and inspires learners.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Full-time</span>
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Remote</span>
                <span className="px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary">Content</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-3xl"></div>
        <div className="relative bg-card p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold mb-6">Don&apos;t see the right role?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We&apos;re always looking for talented individuals to join our team. Send us your resume and 
            we&apos;ll keep you in mind for future opportunities.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-xl"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
} 