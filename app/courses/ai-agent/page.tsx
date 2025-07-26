'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle as CheckIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Import SVG sources instead of treating them as components
import levelIconSrc from '@/public/beginner-icon.svg';
import durationIconSrc from '@/public/clock-icon.svg';
import languageIconSrc from '@/public/globe-icon.svg';
import accessIconSrc from '@/public/accessIcon.svg';
import certificateIconSrc from '@/public/certificate-icon.svg';

import { ShineBorder } from '@/components/magicui/shine-border';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

// Define the Razorpay type on the window object for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function AIAgentBootcamp() {
  const [openLecture, setOpenLecture] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };
  
  // Set up timer
  useEffect(() => {
    // Note: The original end date was in the past. This is a placeholder for a future date.
    const endDate = new Date("2025-12-31T23:59:59");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set up carousel scroll listeners
  useEffect(() => {
    const currentCarouselRef = carouselRef.current;
    checkScrollButtons();
    if (currentCarouselRef) {
      currentCarouselRef.addEventListener("scroll", checkScrollButtons);
    }
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      if (currentCarouselRef) {
        currentCarouselRef.removeEventListener("scroll", checkScrollButtons);
      }
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleLecture = (lectureId: string) => {
    setOpenLecture(openLecture === lectureId ? null : lectureId);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const formatTimeLeft = () => {
    let timeString = "";
    if (timeLeft.days > 0) timeString += `${timeLeft.days.toString().padStart(2, "0")}d : `;
    timeString += `${timeLeft.hours.toString().padStart(2, "0")}h : `;
    timeString += `${timeLeft.minutes.toString().padStart(2, "0")}m : ${timeLeft.seconds.toString().padStart(2, "0")}s`;
    return timeString;
  };
  
  const handlePayment = () => {
    const initializeRazorpay = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_esTSJZdYt8HwVK",
        amount: 499900,
        currency: "INR",
        name: "AI Agent Bootcamp",
        description: "Purchase of AI Agent Bootcamp",
        handler: function (response: any) {
          console.log(response);
          // Handle success
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#000000",
        },
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error initializing Razorpay:", error);
      }
    };

    if (typeof window !== "undefined" && window.Razorpay) {
      initializeRazorpay();
    } else {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = initializeRazorpay;
      document.body.appendChild(script);
    }
  };

  return (
    <main className="container mx-auto px-4 pt-16 mt-6 2xl:pb-8 pb-32">
      <div className="flex flex-col lg:flex-row gap-11">
        {/* Main Content */}
        <div className="w-full lg:w-[70%]">
          <span className="bg-[#fae3ea] text-[#df4271] px-3 py-1 text-sm lg:block hidden w-fit rounded font-semibold">
            AI AGENT BOOTCAMP
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold sm:mb-12 mt-2 lg:block hidden">
            Build a Full Agentic System
          </h1>
          <div className="mb-8 sm:mb-12">
            <Image
              src="/AIMasterClass.png"
              alt="AI Agent Bootcamp"
              className="rounded-lg shadow-lg w-full h-auto"
              width={800}
              height={450}
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 mt-4 sm:mt-6 lg:hidden block">
            Build a Full Agentic System
          </h1>

          <div className="lg:hidden my-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Details</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={levelIconSrc} alt="Level" width={14} height={14} /></div>
                  <span>Beginner to Advanced</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={durationIconSrc} alt="Duration" width={14} height={14} /></div>
                  <span>8 Weeks Self-paced</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={languageIconSrc} alt="Language" width={14} height={14} /></div>
                  <span>Hindi, English</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={accessIconSrc} alt="Access" width={14} height={14} /></div>
                  <span>Lifetime Access</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={certificateIconSrc} alt="Certificate" width={14} height={14} /></div>
                  <span>Industry-recognized Certificate</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 my-8">
            <h2 className="text-xl pb-4 sm:text-2xl font-semibold mb-2">What You&apos;ll Learn</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start"><span className="mr-3 mt-1 bg-blue-200 rounded-full p-1"><CheckIcon className="h-3 w-3 text-black" /></span><span className="text-sm sm:text-base">Build full AI agents with perception, memory, reasoning, and planning</span></li>
              <li className="flex items-start"><span className="mr-3 mt-1 bg-blue-200 rounded-full p-1"><CheckIcon className="h-3 w-3 text-black" /></span><span className="text-sm sm:text-base">Master the stack: embedding search, tool use, RAG, and LangGraph</span></li>
              <li className="flex items-start"><span className="mr-3 mt-1 bg-blue-200 rounded-full p-1"><CheckIcon className="h-3 w-3 text-black" /></span><span className="text-sm sm:text-base">Learn to simulate autonomous agents that interact with APIs, documents, and humans</span></li>
              <li className="flex items-start"><span className="mr-3 mt-1 bg-blue-200 rounded-full p-1"><CheckIcon className="h-3 w-3 text-black" /></span><span className="text-sm sm:text-base">Design your own Tesla-style AI-first planning system — but for general-purpose reasoning</span></li>
            </ul>
          </div>
          
          {/* == Course Overview Section == */}
          <div className="my-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Overview</h2>
            <div className="p-3">
              <div className="space-y-4">
                {/* Accordion items... */}
                {['intro', 'tools', 'memory', 'advanced'].map((item, index) => (
                  <div key={item} className="border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200">
                    <button onClick={() => toggleLecture(item)} className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center cursor-pointer rounded-md ${openLecture === item ? "text-blue-600 bg-blue-100" : ""}`}>
                      <span className="text-sm sm:text-base">{index + 1}. {
                          {intro: "Introduction to AI Agents", tools: "Tool-Using Agents", memory: "Memory and Retrieval Systems", advanced: "Advanced Agent Frameworks"}[item]
                      }</span>
                      {openLecture === item ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openLecture === item ? "max-h-96" : "max-h-0 py-0"}`}>
                        <div className="px-4 py-2">
                             <ul className="list-disc pl-5 text-sm sm:text-base">
                                {
                                    {
                                        intro: ["Agent fundamentals and architecture", "Reflex agents and rule engines", "Setting up development environment"],
                                        tools: ["CLI agent development", "Function calling and tool integration", "API interactions and data processing"],
                                        memory: ["Embedding search and FAISS", "RAG (Retrieval Augmented Generation)", "Memory-augmented assistants"],
                                        advanced: ["LangChain multi-step planning", "LangGraph multi-agent systems", "Full-stack AI SaaS deployment"]
                                    }[item]?.map(point => <li key={point} className="py-1">{point}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* == About the Bootcamp Section == */}
          <div className="my-8 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">About the Bootcamp</h2>
            <div className="text-base text-gray-700 leading-relaxed mb-1">
              <p className="mb-4">A complete, industry-level AI Agent Development Program — from zero to fully autonomous LLM-powered systems. You&apos;ll go from understanding basic logic to deploying agents that act independently using tools, memory, and reasoning.{!showFullDescription && <span> ...</span>}</p>
              {showFullDescription && (
                <>
                  <div className="mb-4">
                    <strong className="text-lg font-semibold">Top Projects You&apos;ll Build:</strong>
                    <ul className="list-none mt-4 space-y-1">
                      {["Reflex Agent + Rule Engine (Level 1)", "Tool-Using CLI Agent (Level 2)", "Embedding Search + Retrieval Bot (Level 3)", "Memory-Augmented Assistant (Level 4)", "LangChain Agent with Multi-Step Planning (Level 5)", "LangGraph with Multi-Agent Roles (Level 6)", "API-Enhanced Reasoning Agent (Level 7)", "Full-stack AI SaaS Agent App (Level 8)"].map(project => (
                        <li key={project} className="flex items-center">
                          <span className="hidden sm:inline text-green-500 mr-2">✅</span>
                          <span className="sm:hidden text-black mr-2">•</span>
                          <span className="text-sm sm:text-base">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
            <button onClick={toggleDescription} className="mt-1 text-sm sm:text-base text-[#3e48ce] rounded-md transition cursor-pointer font-semibold">
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* == Who Is This Bootcamp For Section == */}
          <div className="my-12">
            <h2 className="text-xl sm:text-2xl font-semibold md:mb-6 mb-3">Who Is This Bootcamp For</h2>
            {/* Mobile View */}
            <div className="block md:hidden space-y-3">
              <div className="w-full flex-shrink-0 rounded-xl border border-gray-200 shadow-sm p-4 bg-gray-100"><div className="flex items-center mb-2"><Image src="/college-student.svg" alt="Students" width={32} height={32} /><span className="text-lg font-semibold ml-2">Students & New Engineers</span></div><p className="text-gray-600">Learn the most practical AI skills of 2025 and get ahead in the AI revolution.</p></div>
              <div className="w-full flex-shrink-0 rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100"><div className="flex items-center mb-2"><Image src="/working-engineer.svg" alt="Working Professionals" width={32} height={32} /><span className="text-lg font-bold ml-2">Working Professionals</span></div><p className="text-gray-600">Get upskilled in LLM engineering and agentic systems to advance your career.</p></div>
              <div className="w-full flex-shrink-0 rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100"><div className="flex items-center mb-2"><Image src="/startup-founder.svg" alt="Career Switchers" width={32} height={32} /><span className="text-lg font-bold ml-2">Career Switchers</span></div><p className="text-gray-600">Go from novice to job-ready in under 2 months with hands-on projects.</p></div>
            </div>

            {/* Desktop Carousel */}
            <div className="relative hidden md:block">
              <button onClick={() => scroll("left")} className={`absolute left-0 top-1/2 cursor-pointer ml-2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-label="Scroll left"><ChevronLeft className="h-6 w-6 text-gray-700" /></button>
              <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}><style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                <div className="min-w-[calc(40%-1rem)] w-[calc(40%-0.5rem)] flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-4 bg-gray-100"><div className="flex items-center mb-2"><Image src="/college-student.svg" alt="Students" width={32} height={32} /><span className="text-lg font-semibold ml-2">Students & New Engineers</span></div><p className="text-gray-600">Learn the most practical AI skills of 2025 and get ahead in the AI revolution.</p></div>
                <div className="min-w-[calc(40%-1rem)] w-[calc(40%-0.5rem)] flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100"><div className="flex items-center mb-2"><Image src="/working-engineer.svg" alt="Working Professionals" width={32} height={32} /><span className="text-lg font-bold ml-2">Working Professionals</span></div><p className="text-gray-600">Get upskilled in LLM engineering and agentic systems to advance your career.</p></div>
                <div className="min-w-[calc(40%-1rem)] w-[calc(40%-0.5rem)] flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100"><div className="flex items-center mb-2"><Image src="/startup-founder.svg" alt="Builders & Hackers" width={32} height={32} /><span className="text-lg font-bold ml-2">Builders & Hackers</span></div><p className="text-gray-600">Launch your own AI tool, app, or startup prototype with cutting-edge agent technology.</p></div>
              </div>
              <button onClick={() => scroll("right")} className={`absolute right-0 top-1/2 cursor-pointer mr-2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-label="Scroll right"><ChevronRight className="h-6 w-6 text-gray-700" /></button>
            </div>
          </div>
          
          {/* == Meet Your Instructor Section (with commented out block preserved) == */}
          {/* <div className="bg-white my-8"> ... original commented block ... </div> */}
          <div className="my-12">
            <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2"><Image src="/instructor.svg" alt="Instructor" width={32} height={32} /> Meet Your Instructor</div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-4">
              <div className="md:flex md:gap-6">
                <div className="flex-shrink-0 md:block flex flex-col items-center mb-6 md:mb-0"><Image src="/Rupesh.jpg" alt="Rupesh Ahuja" width={100} height={120} className="rounded-lg" /></div>
                <div className="md:flex md:flex-col"><div className="text-center md:text-left"><h3 className="text-lg sm:text-xl font-semibold mb-2">Rupesh Ahuja</h3><p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start"><ClockIcon className="w-4 h-4 mr-2" /><strong>4+ Years Experience</strong></p><p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start"><UsersIcon className="w-4 h-4 mr-2" /><strong>5,000+ Learners</strong></p></div></div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 pt-1">With <span className="font-semibold text-black">4+ years</span> of industry expertise and <span className="font-semibold text-black">5000+ learners</span> conducted, Rupesh Ahuja is a seasoned <span className="font-semibold text-black">AI and career growth specialist</span>. His practical, no-fluff approach helps professionals harness AI tools to boost productivity, skills, and earnings. Join his masterclass to learn from an experienced mentor who delivers real, actionable results.</p>
            </div>
          </div>

          {/* == Learners also bought Section == */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Learners also bought</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Link href="/courses/autonomous-car" className="flex border border-gray-200 rounded-lg flex-col hover:shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="relative"><Image src="/autonomousCarMasterclassTemplate.png" alt="Autonomous Car Bootcamp" className="w-full object-cover rounded-t-lg" width={400} height={250} /></div>
                <div className="mt-3 px-3 pb-2 flex justify-between items-center"><p className="font-semibold text-sm sm:text-base">Autonomous Car Bootcamp</p><div className="text-right"><p className="text-xs sm:text-sm text-gray-600 font-semibold">₹4,999</p><p className="text-xs text-[#df4271]"><span className="line-through text-gray-700">₹9,999</span> Save 50%</p></div></div>
              </Link>
              <Link href="/courses/robotic-arm" className="flex border border-gray-200 rounded-lg flex-col hover:shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="relative"><Image src="/robotMasterClass.png" alt="Robotic Arm Bootcamp" className="w-full object-cover rounded-t-lg" width={400} height={250} /></div>
                <div className="mt-3 px-3 pb-2 flex justify-between items-center"><p className="font-semibold text-sm sm:text-base">Robotic Arm Bootcamp</p><div className="text-right"><p className="text-xs sm:text-sm text-gray-600 font-semibold">₹4,999</p><p className="text-xs text-[#df4271]"><span className="line-through text-gray-700">₹9,999</span> Save 50%</p></div></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[30%] hidden lg:block">
          <div className="bg-white p-6 lg:mt-[100px] rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-24">
            <ShineBorder shineColor="#808080" className="w-full" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Details</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm sm:text-base"><div className="bg-gray-100 rounded-full p-1.5 mr-3"><UsersIcon className="w-3.5 h-3.5 text-gray-700" /></div><strong>127&nbsp;</strong> Learners enrolled</li>
              <li className="flex items-center text-sm sm:text-base"><div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={levelIconSrc} alt="Level" width={14} height={14} /></div>Beginner to Advanced</li>
              <li className="flex items-center text-sm sm:text-base"><div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={durationIconSrc} alt="Duration" width={14} height={14} /></div>8 Weeks Self-paced</li>
              <li className="flex items-center text-sm sm:text-base"><div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={languageIconSrc} alt="Language" width={14} height={14} /></div>Hindi, English</li>
              <li className="flex items-center text-sm sm:text-base"><div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={accessIconSrc} alt="Access" width={14} height={14} /></div>Lifetime Access</li>
              <li className="flex items-center text-sm sm:text-base"><div className="bg-gray-100 rounded-full p-1.5 mr-3"><Image src={certificateIconSrc} alt="Certificate" width={14} height={14} /></div>Industry-recognized Certificate</li>
            </ul>
            <div className="mb-2">
              <span className="text-xl sm:text-2xl font-bold text-black">₹4,999</span>
              <span className="text-lg text-gray-500 line-through ml-2">₹9,999</span>
              <span className="text-sm font-semibold text-[#df4271] ml-2">SAVE 50%</span>
            </div>
            <div className="text-sm mb-4">
              <span className="text-black">Offer ends in</span>{" "}
              <span className="text-[#df4271] font-semibold">{formatTimeLeft()}</span>
            </div>
            <ShimmerButton className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 text-base font-semibold" onClick={handlePayment}>
              Buy Now
            </ShimmerButton>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="h-6 bg-[#fae3ea] mb-3 flex items-center justify-center">
            <div className="text-sm text-[#df4271] font-semibold">Offer ends in {formatTimeLeft()}</div>
          </div>
          <div className="flex items-center p-2">
            <div className="w-[40%] flex flex-col justify-center items-center">
              <p className="text-xl font-bold text-black">₹4,999</p>
              <p><span className="text-sm text-gray-500 line-through">₹9,999</span> <span className="text-xs text-green-600 font-semibold">50% off</span></p>
            </div>
            <div className="w-[60%]">
              <ShimmerButton borderRadius="8px" className="w-full bg-black text-white py-3 px-4 text-lg font-medium" onClick={handlePayment}>
                Buy Now
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}