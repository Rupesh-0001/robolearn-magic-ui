"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  CheckCircle as CheckIcon,
  Clock as ClockIcon,
  Users as UsersIcon,
  Rocket as RocketLaunchIcon,
  Cpu as CpuIcon,
  ChartBar as ChartBarIcon,
  BarChart3 as LevelIcon,
  Clock3 as DurationIcon,
  Languages as LanguageIcon,
  Calendar as AccessIcon,
  Award as CertificateIcon,
  X as XIcon,
  Play as PlayIcon,
} from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";
import Image from "next/image";

import '../../../types/razorpay';

export default function MERNStackCourse() {
  const { user, loading } = useAuth();
  const [openLecture, setOpenLecture] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isEnrolled] = useState(false);
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
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  // Initialize scroll check
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  // Check enrollment status
  useEffect(() => {
    

   
  }, [user, loading]);
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll by 80% of viewport width

      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Update button visibility after scrolling
      setTimeout(checkScrollButtons, 400);
    }
  };
  useEffect(() => {
    const endDate = new Date("2025-11-20T23:59:59");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
      else{
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleLecture = (lectureId: string) => {
    setOpenLecture(openLecture === lectureId ? null : lectureId);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    // Remove hash fragment when closing modal
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showVideoModal) {
        setShowVideoModal(false);
      }
    };

    if (showVideoModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showVideoModal]);

  const formatTimeLeft = () => {
    let timeString = "";
    if (timeLeft.days > 0)
      timeString += `${timeLeft.days.toString().padStart(2, "0")}d : `;
    if (timeLeft.days > 0 || timeLeft.hours > 0)
      timeString += `${timeLeft.hours.toString().padStart(2, "0")}h : `;
    timeString += `${timeLeft.minutes
      .toString()
      .padStart(2, "0")}m : ${timeLeft.seconds.toString().padStart(2, "0")}s`;
    return timeString;
  };

  return (
    <main className="container mx-auto px-4 pt-16 mt-6 2xl:pb-8 pb-24">
      <div className="flex flex-col lg:flex-row gap-11">
        <div className="w-full lg:w-7/10">
          <div className="flex items-center gap-3 mb-4">
          <span className="bg-[#fae3ea] text-[#df4271] px-3 py-1 text-sm lg:block hidden w-fit rounded font-semibold">
            MERN STACK COURSE
          </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold sm:mb-12 mt-2 lg:block hidden">
            Full Stack Development Mastery Program
          </h1>
          <div className="mb-8 sm:mb-12">
            <Image
              src="/mernCourse.JPG"
              alt="MERN Stack Course"
              className="rounded-lg shadow-lg w-full h-auto"
              width={800}
              height={450}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 lg:hidden block">
            Full Stack Development Mastery Program
          </h1>

          <div className="lg:hidden mb-8 mt-4">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Course Details
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <LevelIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Beginner to Advanced</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <DurationIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>2 Months Mentorship</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <LanguageIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Hindi, English</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <AccessIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Lifetime Access</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <CertificateIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Certificate of Completion</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 my-8">
            <h2 className="text-xl pb-4 sm:text-2xl font-semibold mb-2">
              What You&apos;ll Learn
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Master React.js with hooks, context API, and state management to build dynamic, responsive user interfaces
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Build production-ready REST APIs using Node.js and Express.js with authentication and authorization
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Design and manage MongoDB databases with Mongoose ODM for scalable data persistence
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Deploy full stack applications to cloud platforms with Docker containerization and CI/CD pipelines
                </span>
              </li>
            </ul>
          </div>

          <div className="my-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
              Course Overview
            </h2>
            </div>
            <div className="p-3">
              <div className="space-y-4">
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "frontend" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "frontend" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("frontend")}
                  >
                    <span className="text-sm sm:text-base">
                      1. Frontend Fundamentals (HTML, CSS, JavaScript)
                    </span>
                    {openLecture === "frontend" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "frontend" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        HTML5 semantics and structure
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        CSS3, Flexbox, and Grid layouts
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        JavaScript ES6+ features and DOM manipulation
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "react" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "react" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("react")}
                  >
                    <span className="text-sm sm:text-base">
                      2. React.js Mastery
                    </span>
                    {openLecture === "react" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "react" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Components, Props, and State
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        React Hooks and Custom Hooks
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Context API and State Management
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "backend" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "backend" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("backend")}
                  >
                    <span className="text-sm sm:text-base">
                      3. Backend with Node.js & Express.js
                    </span>
                    {openLecture === "backend" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "backend" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        RESTful API design and development
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Authentication & Authorization (JWT, OAuth)
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Middleware and Error Handling
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "database" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "database" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("database")}
                  >
                    <span className="text-sm sm:text-base">
                      4. MongoDB & Database Design
                    </span>
                    {openLecture === "database" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "database" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        MongoDB fundamentals and Mongoose ODM
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Schema design and data relationships
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Query optimization and indexing
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "deployment" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "deployment" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("deployment")}
                  >
                    <span className="text-sm sm:text-base">
                      5. Deployment & DevOps (GitHub & Docker)
                    </span>
                    {openLecture === "deployment" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "deployment" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Git & GitHub workflow and collaboration
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Docker containerization and deployment
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Cloud deployment (AWS, Heroku, Vercel)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              About the Course
            </h2>
            <div className="text-base text-gray-700 leading-relaxed mb-1">
              <p className="mb-4">
                This is a comprehensive, hands-on program designed to transform you into an 
                industry-ready full stack developer. With live classes, recorded lectures, 
                and real-world projects, you&apos;ll master the complete MERN stack.
                {!showFullDescription && <span> ...</span>}
              </p>
              {showFullDescription && (
                <>
                  <div className="mb-4">
                    <strong className="text-lg font-semibold">
                      Real Projects You Will Build:
                    </strong>
                    <ul className="list-none mt-4 space-y-1">
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          E-commerce Platform with Payment Integration
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Social Media Application with Real-time Features
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Task Management System (Trello Clone)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Real-time Chat Application with WebSockets
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Blog Platform with Authentication & CMS
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Video Streaming Platform (Netflix Clone)
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={toggleDescription}
              className="mt-1 text-sm sm:text-base text-[#3e48ce] rounded-md transition cursor-pointer"
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          </div>

          <div className="my-12">
            <h2 className="text-xl sm:text-2xl font-semibold md:mb-6 mb-3">
              Who Is This Course For
            </h2>
            <div className="block md:hidden">
              <div className="w-full my-3 flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-4 bg-gray-100">
                <div className="flex items-center mb-2">
                  <Image
                    src="/college-student.svg"
                    alt="College Student"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-semibold ml-2">
                    Students & Beginners
                  </span>
                </div>
                <p className="text-gray-600">
                  Perfect if you&apos;re new to web development and want to learn 
                  the complete stack from scratch with hands-on projects.
                </p>
              </div>

              {/* Carousel Card 2 */}
              <div className="w-full my-3 flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100">
                <div className="flex items-center mb-2">
                  <Image
                    src="/working-engineer.svg"
                    alt="Working Engineer"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-bold ml-2">
                    Working Professionals
                  </span>
                </div>
                <p className="text-gray-600">
                  Ideal for developers looking to expand their skills or 
                  transition into full stack development roles.
                </p>
              </div>

              {/* Carousel Card 3 */}
              <div className="w-full my-3 flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100">
                <div className="flex items-center mb-2">
                  <Image
                    src="/startup-founder.svg"
                    alt="Startup Founder"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-bold ml-2">Entrepreneurs</span>
                </div>
                <p className="text-gray-600">
                  Build your MVP from scratch. Perfect for founders who want to 
                  understand the technical side of their product.
                </p>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative hidden md:block">
              {/* Left Arrow Button */}
              <button
                onClick={() => scroll("left")}
                className={`absolute left-0 top-1/2 cursor-pointer ml-2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all ${
                  canScrollLeft
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>

              {/* Carousel */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onScroll={checkScrollButtons}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {/* Carousel Card 1 */}
                <div className="min-w-[calc(40%-1rem)] w-[calc(40%-0.5rem)] flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-4 bg-gray-100">
                  <div className="flex items-center mb-2">
                    <Image
                      src="/college-student.svg"
                      alt="College Student"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-semibold ml-2">
                      Students & Beginners
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Perfect if you&apos;re new to web development and want to learn 
                    the complete stack from scratch with hands-on projects.
                  </p>
                </div>

                {/* Carousel Card 2 */}
                <div className="min-w-[calc(40%-1rem)] w-[calc(40%-0.5rem)] flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100">
                  <div className="flex items-center mb-2">
                    <Image
                      src="/working-engineer.svg"
                      alt="Working Engineer"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-bold ml-2">
                      Working Professionals
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Ideal for developers looking to expand their skills or 
                    transition into full stack development roles.
                  </p>
                </div>

                {/* Carousel Card 3 */}
                <div className="min-w-[calc(40%-1rem)] w-[calc(40%-0.5rem)] flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100">
                  <div className="flex items-center mb-2">
                    <Image
                      src="/startup-founder.svg"
                      alt="Startup Founder"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-bold ml-2">
                      Entrepreneurs & Founders
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Build your MVP from scratch. Perfect for founders who want to 
                    understand the technical side of their product.
                  </p>
                </div>
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => scroll("right")}
                className={`absolute right-0 top-1/2 cursor-pointer mr-2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all ${
                  canScrollRight
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="my-8">
            <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
              <Image
                src="/instructor.svg"
                alt="Instructor"
                width={32}
                height={32}
              />{" "}
              Meet Your Instructor
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-4">
              <div className="md:flex md:gap-6">
                <div className="flex-shrink-0 md:block flex flex-col items-center mb-6 md:mb-0">
                  <div className="w-[100px] h-[120px] relative overflow-hidden rounded-lg">
                    <Image
                      src="/rupal.jpeg"
                      alt="Rupal Singla"
                      width={100}
                      height={120}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="md:flex md:flex-col">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Rupal Singla
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <strong>4+ Years Experience</strong>
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      <strong>Software Engineer</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 pt-1">
                My name is <strong>Rupal Singla</strong>, and I&apos;m a <strong>Software Engineer</strong> with <strong>4 years of hands-on experience in Full Stack Development</strong>. Over the years, I&apos;ve worked on real-world projects that span frontend, backend, databases, APIs, and deployment, which helped me understand how all layers of modern applications connect together.
                <br /><br />
                Through this course, I want to share my practical knowledge with you — not just theory, but the actual skills you&apos;ll need to build scalable, production-level applications. We&apos;ll start by understanding the core building blocks of full stack development — how frontend and backend interact, how data flows, and how to design and deploy a complete app from scratch.
                <br /><br />
                My goal is to make you <strong>industry-ready</strong>, help you think like a developer, and make sure you understand the <strong>&quot;why&quot;</strong> behind every concept, not just the <strong>&quot;how&quot;</strong>.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Learners also bought
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Link
                href="/bootcamp/autonomous-cars"
                className="flex border border-gray-200 rounded-lg flex-col hover:shadow-lg hover:scale-103 hover:shadow-black-600 transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src="/CarCourse.jpg"
                    alt="Autonomous Car Course"
                    className="w-full object-cover rounded-t-lg"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="mt-3 px-3 pb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      Autonomous Car Course
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      312 learners • by Harpreet Singh
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                      ₹5,999
                    </p>
                    <p className="text-xs text-[#df4271]">
                      <span className="line-through text-gray-700">₹9,999</span>{" "}
                      Save 40%
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/courses/robotic-arm"
                className="flex border border-gray-200 rounded-lg flex-col hover:shadow-lg hover:scale-103 hover:shadow-black-600 transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src="/robotMasterClass.png"
                    alt="Robotic Arm Course"
                    className="w-full object-cover rounded-t-lg"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="mt-3 px-3 pb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      Robotic Arm Course
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      275 learners • by Harpreet Singh
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                      ₹5,999
                    </p>
                    <p className="text-xs text-[#df4271]">
                      <span className="line-through text-gray-700">₹9,999</span>{" "}
                      Save 40%
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/10 hidden lg:block">
          <div className="bg-white p-6 mt-30 rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-22">
            <ShineBorder shineColor="#808080" className="w-full"></ShineBorder>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Course Details
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <UsersIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                <strong>150+&nbsp;</strong> Learners enrolled
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <LevelIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                Beginner to Advanced
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <DurationIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                2 Months Mentorship
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <LanguageIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                Hindi, English
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <AccessIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                Lifetime Access
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <CertificateIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                Certificate of Completion
              </li>
            </ul>
            <div className="mb-2">
              <span className="text-xl sm:text-2xl font-bold text-black-600">
                ₹5,999
              </span>
              <span className="text-sm sm:text-xl text-gray-500 line-through ml-2">
                ₹9,999
              </span>
              <span className="text-sm sm:text-base text-black-600 ml-2">
                {" "}
                SAVE 40%
              </span>
            </div>
            <div className="text-sm mb-4">
              <span className="text-black">Offer ends in</span>{" "}
              <span className="text-[#df4271]">{formatTimeLeft()}</span>
            </div>
            <ShimmerButton
              className="w-full bg-white-600 text-white py-2 px-4 rounded-lg hover:bg-white-700 transition duration-300 text-sm sm:text-base cursor-pointer"
              onClick={async () => {
                try {
                  // First create order
                  const orderResponse = await fetch('/api/create-order', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      amount: 5999                      
                    }),
                  });
                  const { order } = await orderResponse.json();

                  if (!order) {
                    throw new Error('Failed to create order');
                  }

                  const initializeRazorpay = () => {
                    const razorpayKey = "rzp_live_esTSJZdYt8HwVK";

                    if (!razorpayKey) {
                      console.error("Razorpay key is not defined");
                      return;
                    }

                    const options = {
                      key: razorpayKey,
                      amount: order.amount,
                      currency: "INR",
                      name: "MERN Stack Course",
                      description: "Purchase of MERN Stack Full Development Course",
                      order_id: order.id,
                      handler: function (response: {
                        razorpay_payment_id: string;
                        razorpay_order_id: string;
                        razorpay_signature: string;
                      }) {
                        console.log(response);
                        setShowThankYouModal(true);
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

                  if (typeof window !== "undefined" && "Razorpay" in window) {
                    initializeRazorpay();
                  } else {
                    const script = document.createElement("script");
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.async = true;
                    script.onload = initializeRazorpay;
                    document.body.appendChild(script);
                  }
                } catch (error) {
                  console.error("Error purchasing course:", error);
                }
              }}
            >
              Buy Now
            </ShimmerButton>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="h-6 bg-[#fae3ea] mb-3 flex items-center justify-center">
            <div className="text-sm text-[#df4271]">
              Offer ends in {formatTimeLeft()}
            </div>
          </div>
          <div className="flex p-2">
            <div className="w-[40%] flex flex-col justify-center items-end pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-black-600">₹5,999</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 line-through">
                  ₹9,999
                </span>
                <span className="text-xs text-black-600">40% off</span>
              </div>
            </div>
            <div className="w-[70%]">
              <ShimmerButton
                borderRadius="8px"
                className="w-full bg-white-600 text-white py-2 px-4 hover:bg-white-700 transition duration-300 text-lg font-medium cursor-pointer"
                onClick={async () => {
                  try {
                    // First create order
                    const orderResponse = await fetch('/api/create-order', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json', 
                      },
                      body: JSON.stringify({ 
                        amount: 5999
                      }),
                    });
                    const { order } = await orderResponse.json();

                    if (!order) {
                      throw new Error('Failed to create order');
                    }

                    const initializeRazorpay = () => {
                      const razorpayKey = "rzp_live_esTSJZdYt8HwVK";

                      if (!razorpayKey) {
                        console.error("Razorpay key is not defined");
                        return;
                      }

                      const options = {
                        key: razorpayKey,
                        amount: order.amount,
                        currency: "INR",
                        name: "MERN Stack Course",
                        description: "Purchase of MERN Stack Full Development Course",
                        order_id: order.id,
                        handler: function (response: {
                          razorpay_payment_id: string;
                          razorpay_order_id: string;
                          razorpay_signature: string;
                        }) {
                          console.log(response);
                          setShowThankYouModal(true);
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

                    if (typeof window !== "undefined" && "Razorpay" in window) {
                      initializeRazorpay();
                    } else {
                      const script = document.createElement("script");
                      script.src = "https://checkout.razorpay.com/v1/checkout.js";
                      script.async = true;
                      script.onload = initializeRazorpay;
                      document.body.appendChild(script);
                    }
                  } catch (error) {
                    console.error("Error purchasing course:", error);
                  }
                }}
              >
                Buy Now
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>

      {showThankYouModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-neutral-500 bg-opacity-30 flex items-center justify-center z-50 p-4"
          onClick={handleCloseThankYouModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Close Button */}
            <div className="flex justify-end p-4 pb-0">
              <button
                onClick={handleCloseThankYouModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XIcon className="h-6 w-6 cursor-pointer" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 pb-8 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Thank You Message */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Thank you for joining
              </h2>
              <p className="text-gray-600 mb-8">
                Join our WhatsApp community to connect with fellow developers
                and get course updates.
              </p>

              {/* Buttons */}
              <div className="space-y-3">
                <a
                  href="https://chat.whatsapp.com/FJ4guBwP9zV5X9Jsh85a4P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Join WhatsApp Community
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

