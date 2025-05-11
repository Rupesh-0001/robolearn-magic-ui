"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const faqs = [
  {
    question: "Who can join your courses?",
    answer:
      "Our courses are ideal for high school students, college students, engineering graduates, tech enthusiasts, and early professionals who want to specialize in future-ready technologies.",
  },
  {
    question: "Do I need prior experience to start learning?",
    answer:
      "Not necessarily. Most of our beginner-level courses are designed for students with little to no prior experience. For advanced courses, we recommend basic knowledge in programming or electronics, which we can also help you build.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes, upon successful completion of any course, you will receive an industry-recognized certificate that can be added to your LinkedIn profile or resume.",
  },
  {
    question: "What if I get stuck during the course?",
    answer:
      "We offer 24/7 student support, discussion forums, and weekly live doubt-clearing sessions to ensure you're never left behind.",
  },
  {
    question: "Will these courses help me get a job or internship?",
    answer:
      "Yes, we offer career counseling, resume-building support, and connections with industry partners to help you land internships and jobs.",
  },
  {
    question: "Can I access the course on mobile?",
    answer:
      "Yes, our platform is fully optimized for mobile devices, so you can learn anytime, anywhere.",
  },
  {
    question: "Will you help me build a project?",
    answer:
      "Absolutely. Every course includes guided projects and the opportunity to build your own capstone project with mentor feedback.",
  },
  {
    question: "Do you offer mentorship?",
    answer:
      "Yes, every student gets access to dedicated mentors who provide guidance, solve doubts, and help with career planning.",
  },
];

function FAQItem({ 
  question, 
  answer, 
  isOpen, 
  onClick,
  isSmallScreen
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean;
  onClick: () => void;
  isSmallScreen: boolean;
}) {
  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-4 cursor-pointer"
        onClick={onClick}
      >
        <span className={cn("font-medium text-left", isSmallScreen ? "text-base" : "text-lg")}>{question}</span>
        <ChevronDown
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180",
            isSmallScreen ? "h-4 w-4" : "h-5 w-5"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        <p className={cn("text-muted-foreground", isSmallScreen ? "text-sm" : "text-base")}>{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 md:py-24 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={cn(
          "font-bold tracking-tight text-center mb-8 sm:mb-12 md:mb-16",
          isSmallScreen ? "text-2xl" : isMediumScreen ? "text-3xl" : "text-4xl"
        )}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              isSmallScreen={isSmallScreen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
