"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the AI-powered learning work?",
    answer: "Our AI system analyzes your learning patterns, progress, and areas of difficulty to create a personalized learning path. It adapts in real-time to provide the most effective content and exercises for your specific needs."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial that gives you full access to all platform features. No credit card required to start."
  },
  {
    question: "Can I learn at my own pace?",
    answer: "Absolutely. Our platform is designed to be flexible and self-paced. You can learn whenever it's convenient for you and take as much time as you need with each concept."
  },
  {
    question: "What kind of support is available?",
    answer: "We provide 24/7 technical support, access to our community forums, and regular office hours with expert instructors. You're never alone in your learning journey."
  },
  {
    question: "Are there any prerequisites?",
    answer: "No prerequisites are required. Our courses are designed to accommodate learners at all levels, from complete beginners to advanced practitioners."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-40 pb-4" : "max-h-0"
        )}
      >
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
