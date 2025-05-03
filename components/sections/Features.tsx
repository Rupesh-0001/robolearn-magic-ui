import { Lightbulb, Brain, Rocket, Users } from "lucide-react";

const features = [
  {
    title: "AI-Powered Learning",
    description: "Our advanced AI algorithms adapt to your learning style and pace, providing personalized guidance.",
    icon: Brain,
  },
  {
    title: "Interactive Exercises",
    description: "Engage with hands-on exercises that reinforce concepts and build practical skills.",
    icon: Lightbulb,
  },
  {
    title: "Global Community",
    description: "Connect with learners worldwide to share insights, collaborate on projects, and grow together.",
    icon: Users,
  },
  {
    title: "Accelerated Progress",
    description: "Learn faster with our proven methodology that combines theory with practical application.",
    icon: Rocket,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features for Effective Learning
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how our platform transforms the way you learn with these innovative features.
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