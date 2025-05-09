import {
  CodeIcon
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const courses = [
  {
    Icon: CodeIcon,
    name: "Literature",
    description: "Explore classic and contemporary works of fiction and poetry.",
    href: "/courses/literature",
    cta: "Enroll Now",
    // background: <img src="/images/literature-bg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Literature background" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: CodeIcon,
    name: "Programming",
    description: "Learn to code with popular languages like Python and JavaScript.",
    href: "/courses/programming",
    cta: "Start Coding",
    // background: <img src="/images/programming-bg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Programming background" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: CodeIcon,
    name: "Data Science",
    description: "Master data analysis, visualization, and machine learning.",
    href: "/courses/data-science",
    cta: "Analyze Data",
    // background: <img src="/images/data-science-bg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Data Science background" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: CodeIcon,
    name: "Photography",
    description: "Capture stunning images and learn professional editing techniques.",
    href: "/courses/photography",
    cta: "Snap Away",
    // background: <img src="/images/photography-bg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Photography background" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: CodeIcon,
    name: "Chemistry",
    description: "Dive into the world of molecules, reactions, and lab experiments.",
    href: "/courses/chemistry",
    cta: "Experiment Now",
    // background: <img src="/images/chemistry-bg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Chemistry background" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
];

export function BentoDemo() {
  return (
    <div className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
          Explore Our Courses
        </h2>
        <BentoGrid className="lg:grid-cols-3 lg:grid-rows-2 gap-4">
          {courses.map((course) => (
            <BentoCard key={course.name} {...course} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
