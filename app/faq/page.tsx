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
  {
    question: "What technologies do you teach?",
    answer:
      "We specialize in cutting-edge technologies including Artificial Intelligence, Machine Learning, Robotics, IoT, Blockchain, and Autonomous Systems. Our curriculum is regularly updated to match industry demands.",
  },
  {
    question: "How long are the courses?",
    answer:
      "Course duration varies from 4 weeks for basic workshops to 6 months for comprehensive programs. Each course is designed to fit different learning schedules and career goals.",
  },
  {
    question: "Do you provide job placement assistance?",
    answer:
      "Yes, we have partnerships with leading tech companies and startups. We provide interview preparation, portfolio building, and direct referrals to our hiring partners.",
  },
  {
    question: "Are there any prerequisites for advanced courses?",
    answer:
      "For advanced courses, we recommend basic programming knowledge (Python/C++) and fundamental understanding of mathematics. However, we offer foundation courses to help you build these skills.",
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
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-5 cursor-pointer hover:bg-gray-50 px-6 rounded-lg transition-colors"
        onClick={onClick}
      >
        <span className={cn("font-semibold text-left text-gray-900", isSmallScreen ? "text-base" : "text-lg")}>{question}</span>
        <ChevronDown
          className={cn(
            "transition-transform duration-300 text-gray-600",
            isOpen && "rotate-180",
            isSmallScreen ? "h-5 w-5" : "h-6 w-6"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 px-6",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className={cn("text-gray-700 leading-relaxed", isSmallScreen ? "text-sm" : "text-base")}>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="container mx-auto px-4 pt-16 mt-6 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={cn(
            "font-bold tracking-tight mb-4",
            isSmallScreen ? "text-3xl" : isMediumScreen ? "text-4xl" : "text-5xl"
          )}>
            Frequently Asked Questions
          </h1>
          <p className={cn(
            "text-gray-600 max-w-2xl mx-auto",
            isSmallScreen ? "text-base" : "text-lg"
          )}>
            Find answers to common questions about our courses, learning process, and career support services.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6">
            <div className="space-y-2">
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
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h2 className={cn(
            "font-bold text-gray-900 mb-4",
            isSmallScreen ? "text-xl" : "text-2xl"
          )}>
            Still have questions?
          </h2>
          <p className={cn(
            "text-gray-600 mb-6",
            isSmallScreen ? "text-sm" : "text-base"
          )}>
            Can&apos;t find the answer you&apos;re looking for? Please get in touch with our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors",
                isSmallScreen ? "text-sm" : "text-base"
              )}
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/917696433339?text=Hi%2C%20I%20have%20a%20question%20about%20your%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors",
                isSmallScreen ? "text-sm" : "text-base"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 