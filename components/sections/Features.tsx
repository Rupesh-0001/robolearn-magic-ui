import { Lightbulb, Brain, Rocket, Users } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const features = [
  {
    title: "AI-Powered Learning",
    description: "Discover personalized education with AI! We tailor each lesson to fit your pace, style, and needs - making learning more engaging, effective, and uniquely designed for your success.",
    icon: Brain,
  },
  {
    title: "Interactive Exercises",
    description: "Boost your skills with hands-on robotics and coding challenges. These fun, interactive tasks reinforce key concepts and help you apply knowledge in real-world scenarios for deeper learning.",
    icon: Lightbulb,
  },
  {
    title: "Global Community",
    description: "Join a vibrant global network of young tech enthusiasts. Collaborate, share ideas, and grow together in a supportive, inspiring environment that connects learners from around the world.",
    icon: Users,
  },
  {
    title: "Accelerated Progress",
    description: "Advance faster in robotics with a balanced mix of theory, guided projects, and hands-on experimentation. Our structured approach helps you build confidence and mastery at an impressive pace.",
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