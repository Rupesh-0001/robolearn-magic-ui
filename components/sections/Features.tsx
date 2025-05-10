import { Lightbulb, Brain, Rocket, Users } from "lucide-react";

const features = [
  {
    title: "AI-Powered Learning",
    description: "Customized learning powered by Al - we tailor the experience to match each student's pace and understanding.",
    icon: Brain,
  },
  {
    title: "Interactive Exercises",
    description: "Build real-world skills through fun, hands-on robotics challenges and coding tasks that reinforce key concepts.",
    icon: Lightbulb,
  },
  {
    title: "Global Community",
    description: "Be part of a vibrant, global community of young tech enthusiasts. Share ideas, collaborate, and grow together.",
    icon: Users,
  },
  {
    title: "Accelerated Progress",
    description: "Master robotics faster through a structured blend of theory, experimentation, and guided projects.",
    icon: Rocket,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50 h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl mx-auto font-bold tracking-tight sm:text-4xl">
            Discover how our platform transforms the way you learn.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            See how our approach to robotics education sparks curiosity and delivers real-world skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 