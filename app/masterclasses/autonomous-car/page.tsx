"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Clock as ClockIcon,
  CheckCircle as CheckIcon,
  Users as UsersIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AIAgentMasterclass() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Carousel state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Add countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 10,
    minutes: 56,
    seconds: 8,
  });

  // Check if scroll buttons should be visible
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

  // Handle carousel scrolling
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

  // Add countdown timer effect
  useEffect(() => {
    // Set the date we're counting down to (May 25, 2025 at 5:00 PM)
    const countDownDate = new Date("May 25, 2025 17:00:00").getTime();

    const updateCountdown = () => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the countdown date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update state with new values
      setTimeLeft({ days, hours, minutes, seconds });

      // If the countdown is finished, clear the interval
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Call once immediately
    updateCountdown();

    // Update the countdown every 1 second
    const interval = setInterval(updateCountdown, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 pt-16 mt-6 2xl:pb-8 pb-10">
      <div className="inline-block border border-[#df4271] bg-[#fae3ea] font-medium text-[#df4271] text-sm px-3 py-1 rounded-md md:mb-4 mb-2">
        Live Masterclass
      </div>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full lg:w-1/3 rounded-lg relative bg-[#f8f9fa] mr-4">
            <Image
              src="/autonomousCarMasterclassTemplate.jpeg"
              alt="Autonomous Car Masterclass"
              className="w-full h-auto object-contain rounded-lg"
              width={500}
              height={300}
            />
            <div className="absolute bottom-0 w-full bg-black/80 text-white px-4 py-2 rounded-b-md text-center flex items-center justify-center gap-2">
              <Image
                src="/calendar-icon-white.svg"
                alt="Calendar"
                className="h-4 w-4"
                width={16}
                height={16}
              />
              <span>
                {timeLeft.days > 0
                  ? `Starts in ${timeLeft.days} Days : ${timeLeft.hours} Hours : ${timeLeft.minutes} Min : ${timeLeft.seconds} Sec`
                  : `Starts in ${timeLeft.hours} Hours : ${timeLeft.minutes} Min : ${timeLeft.seconds} Sec`}
              </span>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:block hidden lg:w-3/5 p-8 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <h1 className="text-2xl font-bold mb-4">
              Autonomous Vehicles Engineering Masterclass
            </h1>

            <div className="flex items-center gap-4 mb-6 bg-gray-100 w-fit rounded p-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/calendar-icon.svg"
                  alt="Calendar"
                  className="w-5 h-5 bg-white border border-gray-300 rounded-full p-0.5"
                  width={20}
                  height={20}
                />
                <span>25th May, 2025</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Image
                  src="/clock-icon.svg"
                  alt="Clock"
                  className="w-5 h-5 bg-white border border-gray-300 rounded-full p-0.5"
                  width={20}
                  height={20}
                />
                <span>5:00 pm to 6:00 pm</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold">FREE</span>
              <span className="text-gray-500 line-through">₹399</span>
              <span className="text-gray-500">(100% OFF)</span>
            </div>

            <div className="flex items-center">
              <ShimmerButton
                borderRadius="5px"
                className="text-white text-sm sm:text-base font-semibold w-1/3 cursor-pointer mr-4 group"
              >
                <span className="flex items-center">
                  Enroll Now
                  <svg
                    className="w-4 h-4 ml-1 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </ShimmerButton>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-[#df4271]">Limited Seats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 w-full">
          <div className="bg-white my-6 block md:hidden">
            <span className="font-bold">Autonomous Vehicles Masterclass</span>
            <div className="space-y-3 border border-gray-200 bg-gray-100 py-3 px-4 rounded-lg mt-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="text-gray-500 w-6 flex-shrink-0">
                  <Image
                    src="/calendar-icon.svg"
                    alt="Calendar"
                    className="w-4 h-4"
                    width={16}
                    height={16}
                  />
                </div>
                <span className="text-gray-800 font-medium">
                  25th May, 2025
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="text-gray-500 w-6 flex-shrink-0">
                  <Image
                    src="/clock-icon.svg"
                    alt="Clock"
                    className="w-4 h-4"
                    width={16}
                    height={16}
                  />
                </div>
                <span className="text-gray-800 font-medium">5 pm to 6 pm</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-[#df4271]">Limited Seats</span>
              </div>
            </div>
          </div>
          <div className="bg-white my-12">
            <h2 className="text-xl pb-4 sm:text-2xl font-semibold">
              What You&apos;ll Learn
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <span className="mr-3 mt-1 rounded-full">
                  <CheckIcon className="h-4 w-4 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  How to build a full perception-planning-control loop using
                  real-world tools like ROS2, Carla, and Python
                </span>
              </li>
              <li className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <span className="mr-3 mt-1 rounded-full">
                  <CheckIcon className="h-4 w-4 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Apply sensor fusion, object detection, and path planning using
                  state-of-the-art AI and robotics techniques
                </span>
              </li>
              <li className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <span className="mr-3 mt-1 rounded-full">
                  <CheckIcon className="h-4 w-4 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Master vehicle control systems using PID and MPC to simulate
                  real actuation
                </span>
              </li>
              <li className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <span className="mr-3 mt-1 rounded-full">
                  <CheckIcon className="h-4 w-4 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  Design Tesla-style neural pipelines with BEV + Transformer
                  models for AI-first FSD systems
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl pb-4 sm:text-2xl font-semibold">
              Key Highlight:
            </h2>
            <div className="block md:hidden bg-white shadow-md rounded-lg p-6 border border-gray-100 transition-all duration-300 relative overflow-hidden">
              <ShineBorder className="w-full h-full absolute" />
              <div className="space-y-4 relative z-10">
                {/* Date and Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-500 w-6 flex-shrink-0">
                      <Image
                        src="/calendar-icon.svg"
                        alt="Calendar"
                        className="w-5 h-5"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-gray-800">25th May, 2025</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-gray-500 w-6 flex-shrink-0">
                      <Image
                        src="/clock-icon.svg"
                        alt="Clock"
                        className="w-5 h-5"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-gray-800">5:00 pm to 6:00 pm</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-gray-500 w-6 flex-shrink-0">
                      <Image
                        src="/globe-icon.svg"
                        alt="Globe"
                        className="w-5 h-5"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-gray-800">Hindi</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-gray-500 w-6 flex-shrink-0">
                      <Image
                        src="/certificate-icon.svg"
                        alt="Certificate"
                        className="w-5 h-5"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-gray-800">
                      Certificate of Participation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-12 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              About the Masterclass
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-1">
              This is a complete, structured program to help you build a
              production-grade self-driving car stack from scratch,
              step-by-step. With live projects, recorded lectures, and
              professional tools, you&apos;ll graduate with real skills and a
              full portfolio.
              {showFullDescription ? (
                <>
                  <br />
                  <br />
                  <strong className="text-lg">
                    Top Projects You Will Build:
                  </strong>
                  <ul className="list-none mt-4 space-y-1">
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>Lane
                      Detection & Following (Level 1)
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>
                      Traffic Light and Sign Handling (Level 2)
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>Lidar
                      + Camera Obstacle Detection (Level 3)
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>
                      Localization & SLAM System (Level 4)
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>Agent
                      Prediction + Path Planning Stack (Level 5–6)
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>MPC
                      Control Simulator (Level 7)
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>
                      Tesla-Style End-to-End Neural Driving Stack (Level 8)
                    </li>
                  </ul>
                  <br />
                  <strong className="text-lg">
                    Who Is This Masterclass For:
                  </strong>
                  <ul className="list-none mt-4 space-y-2">
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>
                      <div>
                        <span className="text-sm sm:text-base sm:font-bold">
                          Students
                        </span>{" "}
                        -{" "}
                        <span className="text-sm text-gray-600">
                          Learn robotics, AI, and perception hands-on
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>
                      <div>
                        <span className="text-sm sm:text-base sm:font-bold">
                          Working Engineers
                        </span>{" "}
                        -{" "}
                        <span className="text-sm text-gray-600">
                          Upgrade to autonomy, AI-first planning, and ROS2
                          stacks
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>
                      <div>
                        <span className="text-sm sm:text-base sm:font-bold">
                          Career Changers
                        </span>{" "}
                        -{" "}
                        <span className="text-sm text-gray-600">
                          Build a real self-driving portfolio
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="hidden sm:inline text-green-500 mr-2">
                        ✅
                      </span>
                      <span className="sm:hidden text-black mr-2">•</span>
                      <div>
                        <span className="text-sm sm:text-base sm:font-bold">
                          Entrepreneurs
                        </span>{" "}
                        -{" "}
                        <span className="text-sm text-gray-600">
                          Understand what it takes to prototype FSD systemss
                        </span>
                      </div>
                    </li>
                  </ul>
                </>
              ) : (
                <> ...</>
              )}
            </p>
            <button
              onClick={toggleDescription}
              className="text-base text-[#3e48ce] rounded-md transition cursor-pointer"
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          </div>
          <div className="my-12">
            <h2 className="text-xl sm:text-2xl font-semibold md:mb-6 mb-3">
              Who Is This Masterclass For
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
                    Working Engineers & Developers
                  </span>
                </div>
                <p className="text-gray-600">
                  Ideal for software engineers, mechanical engineers, or
                  roboticists looking to transition into autonomous vehicles.
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
                  <span className="text-lg font-bold ml-2">
                    Startup Founders & Innovators
                  </span>
                </div>
                <p className="text-gray-600">
                  For founders and product managers looking to understand the
                  technical foundations of autonomous systems.
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
                      Working Engineers & Developers
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Ideal for software engineers, mechanical engineers, or
                    roboticists looking to transition into autonomous vehicles.
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
                      Startup Founders & Innovators
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
          <div className="my-12">
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
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Harpreet Singh
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center pl-2">
                <ClockIcon className="w-4 h-4 mr-2" />
                <strong>5+ Years Experience</strong>
              </p>
              <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center pl-2">
                <UsersIcon className="w-4 h-4 mr-2" />
                <strong>35,466+ Learners</strong>
              </p>
              <p className="text-sm sm:text-base text-gray-700 pt-1">
                Lead FSD Engineer with experience across robotics startups, AI
                research, and simulation engineering. Harpreet brings a
                hands-on, project-first style to make advanced self-driving tech
                intuitive and fun to build.
              </p>
            </div>
          </div>
          <div className="my-12">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Have More Questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-500 md:flex items-center">
                You can email us at&nbsp;
                <a
                  href="mailto:no-reply@robolearn.in"
                  className="text-[#3e48ce] underline"
                >
                  no-reply@robolearn.in
                </a>
                &nbsp; or contact us on &nbsp;
                <a
                  href="tel:+919878555767"
                  className="text-[#3e48ce] underline"
                >
                  +91 987 855 5767
                </a>
              </p>
              <a
                href="https://wa.me/919878555767"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 px-6 py-3 bg-white hover:bg-gray-900 text-gray-900 border border-gray-900 hover:text-white font-medium rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get in Touch
              </a>
            </div>
          </div>
        </div>
        <div className="w-1/3 hidden md:block">
          <div className="sticky top-20 bg-white shadow-xl rounded-xl p-6 border border-gray-100 transition-all duration-300 m-12">
            <ShineBorder />
            <div className="space-y-4">
              {/* Date and Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="text-gray-500 w-6 flex-shrink-0">
                    <Image
                      src="/calendar-icon.svg"
                      alt="Calendar"
                      className="w-5 h-5"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="text-gray-800">25th May, 2025</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-gray-500 w-6 flex-shrink-0">
                    <Image
                      src="/clock-icon.svg"
                      alt="Clock"
                      className="w-5 h-5"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="text-gray-800">5:00 pm to 6:00 pm</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-gray-500 w-6 flex-shrink-0">
                    <Image
                      src="/globe-icon.svg"
                      alt="Globe"
                      className="w-5 h-5"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="text-gray-800">Hindi</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-gray-500 w-6 flex-shrink-0">
                    <Image
                      src="/certificate-icon.svg"
                      alt="Certificate"
                      className="w-5 h-5"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="text-gray-800">
                    Certificate of Participation
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex space-x-2 pt-2">
                <span className="text-xl font-bold text-gray-800">FREE</span>
                <span className="line-through text-gray-500">₹99</span>
                <span className="text-gray-500 text-sm">(100% OFF)</span>
              </div>

              {/* Enroll Button */}
              <ShimmerButton
                borderRadius="5px"
                className="text-white text-sm sm:text-base font-semibold w-full cursor-pointer mr-4 group"
              >
                <span className="flex items-center">
                  Enroll Now
                  <svg
                    className="w-4 h-4 ml-1 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </ShimmerButton>

              {/* Countdown Timer */}
              <div className="pt-4">
                <p className="text-center text-gray-700 font-medium mb-3">
                  Webinar Starts In
                </p>
                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner transition-all duration-300 hover:bg-gray-200">
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Days</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner transition-all duration-300 hover:bg-gray-200">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Hours</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner transition-all duration-300 hover:bg-gray-200">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Min</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner transition-all duration-300 hover:bg-gray-200">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Sec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 pb-3 md:hidden z-50 bg-white">
        <div className="bg-[#fae3ea] text-[#df4271] px-3 py-1 flex justify-center items-center">
          <span className="text-sm font-medium">
            Webinar starts in {timeLeft.days > 0 ? `${timeLeft.days}d : ` : ""}
            {String(timeLeft.hours).padStart(2, "0")}h :{" "}
            {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
            {String(timeLeft.seconds).padStart(2, "0")}s
          </span>
        </div>
        <div className="flex items-center justify-between bg-white border-t pt-3 px-3 border-gray-200 md:hidden z-50">
          <ShimmerButton
            borderRadius="5px"
            className="text-white w-full text-sm font-semibold cursor-pointer group px-4 py-2"
          >
            <span className="flex items-center">
              Enroll Now
              <svg
                className="w-4 h-4 ml-1 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
}
