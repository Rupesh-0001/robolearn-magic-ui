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

export default function RoboticsEngineeringBootcamp() {
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
            ROBOTICS ENGINEERING BOOTCAMP
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold sm:mb-12 mt-2 lg:block hidden">
            Build Real Robots from Scratch
          </h1>
          <div className="mb-8 sm:mb-12">
            <Image
              src="/robotMasterClass.png"
              alt="Robotics Engineering Bootcamp"
              className="rounded-lg shadow-lg w-full h-auto"
              width={800}
              height={450}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 mt-4 sm:mt-6 lg:hidden block">
            Build Real Robots from Scratch
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
                  <span>Beginner to Advanced</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <DurationIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>8 Weeks Self-paced</span>
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
                  <span>Industry-recognized Certificate</span>
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
                  Design and build complete robots from mechanical body to control panel
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Implement PLC logic, kinematics, control theory, and GUIs
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Program microcontrollers and simulate full robotic systems
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Understand how to build industrial-grade robotics systems from scratch
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
                      1. Electrical Panels & PLC Fundamentals
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
                        Relay-based logic machines and control circuits
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        PLC programming and sensor integration
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        VFD motor control systems
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "tools" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "tools" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("tools")}
                  >
                    <span className="text-sm sm:text-base">
                      2. HMI & Automation Systems
                    </span>
                    {openLecture === "tools" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "tools" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Panel wiring and HMI interface design
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Conveyor systems and automation lines
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Industrial communication protocols
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "memory" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "memory" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("memory")}
                  >
                    <span className="text-sm sm:text-base">
                      3. Robotic Arm Design & Kinematics
                    </span>
                    {openLecture === "memory" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "memory" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        3-DOF and 6-DOF robotic arm simulation
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Forward and inverse kinematics programming
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        CAD design and mechanical assembly
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "advanced" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "advanced" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("advanced")}
                  >
                    <span className="text-sm sm:text-base">
                      4. Embedded Control & GUI Development
                    </span>
                    {openLecture === "advanced" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "advanced" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Microcontroller programming with ESP32
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Qt GUI development for robot control
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Full robot panel integration and deployment
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
                This is a complete, project-first bootcamp where you&apos;ll build real robotic systems from the ground up. By the end, you&apos;ll know how to go from CAD design to embedded firmware to real-world robot motion.
                {!showFullDescription && <span> ...</span>}
              </p>
              {showFullDescription && (
                <>
                  <div className="mb-4">
                    <strong className="text-lg font-semibold">
                      Top Projects You&apos;ll Build:
                    </strong>
                    <ul className="list-none mt-4 space-y-1">
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Relay-Based Logic Machine (Level 1)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Sensor-Controlled PLC Conveyor (Level 2)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Panel-Wired VFD Motor System (Level 3)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          HMI-Integrated Automation Line (Level 4)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          3-DOF Robotic Arm Simulator (Level 5)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          6-DOF Robotic Arm (CAD + Control) (Level 6)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Full Robot Panel with Microcontroller + Drivers (Level 7)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Qt GUI-Controlled Robotic Arm with Inverse Kinematics (Level 8)
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
                    alt="Students"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-semibold ml-2">
                    Students & Engineers
                  </span>
                </div>
                <p className="text-gray-600">
                  Learn robotics from real-world problems and get ahead in the automation revolution.
                </p>
              </div>

              {/* Carousel Card 2 */}
              <div className="w-full my-3 flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100">
                <div className="flex items-center mb-2">
                  <Image
                    src="/working-engineer.svg"
                    alt="Working Professionals"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-bold ml-2">
                    Working Professionals
                  </span>
                </div>
                <p className="text-gray-600">
                  Get industry-grade practical knowledge in robotics and automation systems.
                </p>
              </div>

              {/* Carousel Card 3 */}
              <div className="w-full my-3 flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100">
                <div className="flex items-center mb-2">
                  <Image
                    src="/startup-founder.svg"
                    alt="Career Switchers"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-bold ml-2">Career Switchers</span>
                </div>
                <p className="text-gray-600">
                  Go from 0 to job-ready robotics developer in under 2 months with hands-on projects.
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
                      alt="Students"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-semibold ml-2">
                      Students & Engineers
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Learn robotics from real-world problems and get ahead in the automation revolution.
                  </p>
                </div>

                {/* Carousel Card 2 */}
                <div className="min-w-[calc(40%-1rem)] w-[calc(40%-0.5rem)] flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100">
                  <div className="flex items-center mb-2">
                    <Image
                      src="/working-engineer.svg"
                      alt="Working Professionals"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-bold ml-2">
                      Working Professionals
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Get industry-grade practical knowledge in robotics and automation systems.
                  </p>
                </div>

                {/* Carousel Card 3 */}
                <div className="min-w-[calc(40%-1rem)] w-[calc(40%-0.5rem)] flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-6 bg-gray-100">
                  <div className="flex items-center mb-2">
                    <Image
                      src="/startup-founder.svg"
                      alt="Makers & Hackers"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-bold ml-2">
                      Makers & Hackers
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Build and deploy working robots from scratch with cutting-edge robotics technology.
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

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-8">
            <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
              <Image
                src="/instructor.svg"
                alt="Instructor"
                width={32}
                height={32}
              />{" "}
              Meet Your Instructor
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Harpreet Singh
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center pl-2">
              <ClockIcon className="w-4 h-4 mr-2" />
              <strong>Veteran Robotics Instructor | 200+ Projects Built</strong>
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center pl-2">
              <UsersIcon className="w-4 h-4 mr-2" />
              <strong>10,000+ Learners</strong>
            </p>
            <p className="text-sm sm:text-base text-gray-700 pt-1">
              Harpreet brings deep industrial experience and builds each concept by solving real problems — so learners understand why each component or theory exists, not just how to use it. With expertise in robotics engineering and automation systems, he&apos;ll guide you through building production-ready robotic systems.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Learners also bought
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Link
                href="/courses/autonomous-car"
                className="flex border border-gray-200 rounded-lg flex-col hover:shadow-lg hover:scale-103 hover:shadow-black-600 transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src="/autonomousCarMasterclassTemplate.png"
                    alt="Autonomous Car Bootcamp"
                    className="w-full object-cover rounded-t-lg"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="mt-3 px-3 pb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      Autonomous Car Bootcamp
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      296 learners • by Harpreet Singh
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
                <strong>275&nbsp;</strong> Learners enrolled
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
                8 Weeks Self-paced
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
                Industry-recognized Certificate
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
                    name: "Robotics Engineering Bootcamp",
                    description: "Purchase of Robotics Engineering Bootcamp",
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

      <div className="lg:hidden fixed bottom-0 left-0 right-0">
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
                      name: "Robotics Engineering Bootcamp",
                      description: "Purchase of Robotics Engineering Bootcamp",
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