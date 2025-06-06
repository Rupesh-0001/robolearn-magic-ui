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
} from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function AutonomousCarMasterclass() {
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
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  // Initialize scroll check
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);
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
    const endDate = new Date("2025-06-15T16:00:00"); // May 19, 4 PM

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
          <span className="bg-[#fae3ea] text-[#df4271] px-3 py-1 text-sm lg:block hidden w-fit rounded font-semibold">
            AUTONOMOUS CAR COURSE
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold sm:mb-12 mt-2 lg:block hidden">
            Autonomous Car Bootcamp
          </h1>
          <div className="mb-8 sm:mb-12">
            <Image
              src="/autonomousCarMasterclassTemplate.png"
              alt="Autonomous Car"
              className="rounded-lg shadow-lg w-full h-auto"
              width={800}
              height={450}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 mt-4 sm:mt-6 lg:hidden block">
            Autonomous Car Bootcamp
          </h1>

          <div className="lg:hidden my-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Course Details
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <LevelIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Advanced Level</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <DurationIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>1.5 Months Mentorship</span>
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
                  How to build a full perception-planning-control loop using
                  real-world tools like ROS2, Carla, and Python
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Apply sensor fusion, object detection, and path planning using
                  state-of-the-art AI and robotics techniques
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Master vehicle control systems using PID and MPC to simulate
                  real actuation
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Design Tesla-style neural pipelines with BEV + Transformer
                  models for AI-first FSD systems
                </span>
              </li>
            </ul>
          </div>

          <div className="my-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Course Overview
            </h2>
            <div className="p-3">
              <div className="space-y-4">
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "intro" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "intro" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("intro")}
                  >
                    <span className="text-sm sm:text-base">
                      1. Introduction to Autonomous Vehicles
                    </span>
                    {openLecture === "intro" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "intro" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Overview
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Key components and systems
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Current state of the industry
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "perception" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "perception" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("perception")}
                  >
                    <span className="text-sm sm:text-base">
                      2. Perception and Computer Vision
                    </span>
                    {openLecture === "perception" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "perception" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Sensor fusion techniques
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Object detection and tracking
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Lane detection algorithms
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "planning" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "planning" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("planning")}
                  >
                    <span className="text-sm sm:text-base">
                      3. Path Planning and Decision Making
                    </span>
                    {openLecture === "planning" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "planning" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Route planning algorithms
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Behavior prediction
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Decision-making frameworks
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "control" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "control" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("control")}
                  >
                    <span className="text-sm sm:text-base">
                      4. Vehicle Control Systems
                    </span>
                    {openLecture === "control" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "control" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        PID controllers
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Model Predictive Control (MPC)
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Actuator control and simulation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              About the Bootcamp
            </h2>
            <div className="text-base text-gray-700 leading-relaxed mb-1">
              <p className="mb-4">
                This is a complete, structured program to help you build a
                production-grade self-driving car stack from scratch,
                step-by-step. With live projects, recorded lectures, and
                professional tools, you&apos;ll graduate with real skills and a
                full portfolio.
                {!showFullDescription && <span> ...</span>}
              </p>
              {showFullDescription && (
                <>
                  <div className="mb-4">
                    <strong className="text-lg font-semibold">
                      Top Projects You Will Build:
                    </strong>
                    <ul className="list-none mt-4 space-y-1">
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Lane Detection & Following (Level 1)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Traffic Light and Sign Handling (Level 2)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Lidar + Camera Obstacle Detection (Level 3)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Localization & SLAM System (Level 4)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Agent Prediction + Path Planning Stack (Level 5–6)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          MPC Control Simulator (Level 7)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Tesla-Style End-to-End Neural Driving Stack (Level 8)
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
              Who Is This Bootcamp For
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
                    College Students
                  </span>
                </div>
                <p className="text-gray-600">
                  Perfect if you&apos;re studying engineering, computer science
                  or robotics and want hands-on experience with autonomous
                  systems.
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
                    Working Engineers
                  </span>
                </div>
                <p className="text-gray-600">
                  Ideal for software engineers, or roboticists looking to
                  transition into autonomous vehicles.
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
                  <span className="text-lg font-bold ml-2">Tech Hobbyists</span>
                </div>
                <p className="text-gray-600">
                  Build your first autonomous car logic from scratch. No prior
                  experience needed.
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
                      College Students
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Perfect if you&apos;re studying engineering, computer
                    science or robotics and want hands-on experience with
                    autonomous systems.
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
                      Working Engineers
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Ideal for software engineers, or roboticists looking to
                    transition into autonomous vehicles.
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
                      Founders & Innovators
                    </span>
                  </div>
                  <p className="text-gray-600">
                    For founders and product managers looking to understand the
                    technical foundations of autonomous systems.
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
                  <Image
                    src="/instructorImage.png"
                    alt="Harpreet Singh"
                    width={100}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:flex md:flex-col">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Harpreet Singh
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <strong>5+ Years Experience</strong>
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      <strong>10,000+ Learners</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 pt-1">
                <strong>Harpreet Singh</strong> is a <strong>Full Self-Driving (FSD) & Robotics Engineer</strong> with <strong>5+ years of expertise</strong> in AI-driven autonomy, specializing in motion planning, computer vision, and simulation, who has <strong>mentored 10,000+ students</strong> globally while founding <strong>two award-winning Robotics/AI startups</strong> recognized by <strong>Startup India and Punjab Government</strong>, combining deep technical knowledge in <strong>AI decision-making and sensor fusion</strong> with a passion for advancing intelligent systems through engineering, education and entrepreneurship.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Learners also bought
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Link
                href="/courses/ai-agent"
                className="flex border border-gray-200 rounded-lg flex-col hover:shadow-lg hover:scale-103 hover:shadow-black-600 transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src="/AIMasterClass.png"
                    alt="AI Agent Bootcamp"
                    className="w-full object-cover rounded-t-lg"
                    width={400}
                    height={250}
                  />
                  {/* <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                        Popular
                                    </div> */}
                </div>
                <div className="mt-3 px-3 pb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      AI Agent Bootcamp
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      127 learners • by Harpreet Singh
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                      ₹4,999
                    </p>
                    <p className="text-xs text-[#df4271]">
                      <span className="line-through text-gray-700">₹9,999</span>{" "}
                      Save 50%
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
                    alt="Robotic Arm Bootcamp"
                    className="w-full object-cover rounded-t-lg"
                    width={400}
                    height={250}
                  />
                  {/* <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        New
                                    </div> */}
                </div>
                <div className="mt-3 px-3 pb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      Robotic Arm Bootcamp
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      275 learners • by Harpreet Singh
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                      ₹4,999
                    </p>
                    <p className="text-xs text-[#df4271]">
                      <span className="line-through text-gray-700">₹9,999</span>{" "}
                      Save 50%
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            {/* <div className="mt-8 text-center">
                            <Link 
                                href="/courses" 
                                className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            >
                                View All Courses
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div> */}
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
                <strong>296&nbsp;</strong> Learners enrolled
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <LevelIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                Advanced Level
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <DurationIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                1.5 Months Mentorship
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
                ₹4,999
              </span>
              <span className="text-sm sm:text-xl text-gray-500 line-through ml-2">
                ₹9,999
              </span>
              <span className="text-sm sm:text-base text-black-600 ml-2">
                {" "}
                SAVE 50%
              </span>
            </div>
            <div className="text-sm mb-4">
              <span className="text-black">Offer ends in</span>{" "}
              <span className="text-[#df4271]">{formatTimeLeft()}</span>
            </div>
            <ShimmerButton
              className="w-full bg-white-600 text-white py-2 px-4 rounded-lg hover:bg-white-700 transition duration-300 text-sm sm:text-base cursor-pointer"
              onClick={() => {
                const initializeRazorpay = () => {
                  const razorpayKey = "rzp_live_esTSJZdYt8HwVK";

                  if (!razorpayKey) {
                    console.error("Razorpay key is not defined");
                    return;
                  }

                  const options = {
                    key: razorpayKey,
                    amount: 499900,
                    currency: "INR",
                    name: "Autonomous Car Course",
                    description: "Purchase of Autonomous Car Course",
                    handler: function (response: {
                      razorpay_payment_id: string;
                      razorpay_order_id: string;
                      razorpay_signature: string;
                    }) {
                      console.log(response);
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
                <span className="text-xl font-bold text-black-600">₹4,999</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 line-through">
                  ₹9,999
                </span>
                <span className="text-xs text-black-600">50% off</span>
              </div>
            </div>
            <div className="w-[70%]">
              <ShimmerButton
                borderRadius="8px"
                className="w-full bg-white-600 text-white py-2 px-4 hover:bg-white-700 transition duration-300 text-lg font-medium cursor-pointer"
                onClick={() => {
                  const initializeRazorpay = () => {
                    const razorpayKey = "rzp_live_esTSJZdYt8HwVK";

                    if (!razorpayKey) {
                      console.error("Razorpay key is not defined");
                      return;
                    }

                    const options = {
                      key: razorpayKey,
                      amount: 499900,
                      currency: "INR",
                      name: "Autonomous Car Course",
                      description: "Purchase of Autonomous Car Course",
                      handler: function (response: {
                        razorpay_payment_id: string;
                        razorpay_order_id: string;
                        razorpay_signature: string;
                      }) {
                        console.log(response);
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
                }}
              >
                Buy Now
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
