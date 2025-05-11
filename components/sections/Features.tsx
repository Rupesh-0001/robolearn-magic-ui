import { Lightbulb, Brain, Rocket, Users } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-muted/50 flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className={`mx-auto font-bold tracking-tight ${
            isSmallScreen ? "text-2xl" : isMediumScreen ? "text-3xl" : "text-4xl"
          }`}>
            Discover how our platform transforms the way you learn.
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-3xl mx-auto ${
            isSmallScreen ? "text-base" : "text-lg"
          }`}>
            See how our approach to robotics education sparks curiosity and delivers real-world skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 flex-grow">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border flex flex-col">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <feature.icon className={`${isSmallScreen ? "h-5 w-5" : "h-6 w-6"} text-primary`} />
              </div>
              <h3 className={`font-semibold mb-2 ${isSmallScreen ? "text-lg" : "text-xl"}`}>{feature.title}</h3>
              <p className={`text-muted-foreground ${isSmallScreen ? "text-sm" : "text-base"} flex-grow`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 