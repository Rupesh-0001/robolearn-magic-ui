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

import '../../../types/razorpay';

export default function DroneProgrammingBootcamp() {
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
    const endDate = new Date("2025-07-21T11:59:59"); // May 19, 4 PM

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
            DRONE PROGRAMMING COURSE
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold sm:mb-12 mt-2 lg:block hidden">
            Drone Programming & ArduPilot Bootcamp
          </h1>
          <div className="mb-8 sm:mb-12">
            <Image
              src="/droneMasterClass.png"
              alt="Drone Programming"
              className="rounded-lg shadow-lg w-full h-auto"
              width={800}
              height={450}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 mt-4 sm:mt-6 lg:hidden block">
            Drone Programming & ArduPilot Bootcamp
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
              What You Will Learn (4 Key Outcomes)
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  <strong>Master ArduPilot Simulation and Communication</strong><br/>
                  Learn how to install, configure, and simulate ArduPilot environments with MAVProxy, SITL, and MAVLink protocols using Python.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  <strong>Create Intelligent Drone Missions</strong><br/>
                  Build and deploy autonomous drone missions using Python scripting with DroneKit and PyMAVLink, from basic takeoff to multi-location missions.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  <strong>Real-Time Telemetry and Vehicle Control</strong><br/>
                  Gain hands-on experience in reading real-time telemetry data, sending commands, and monitoring vehicle states.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">
                  <strong>Autopilot Customization with LUA Scripting</strong><br/>
                  Understand onboard scripting using LUA to add intelligence, automation, and custom behavior to drones directly on the autopilot system.
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
                      openLecture === "setup" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "setup" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("setup")}
                  >
                    <span className="text-sm sm:text-base">
                      1. Quickstart & Setup (Windows & Linux)
                    </span>
                    {openLecture === "setup" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "setup" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Install ArduPilot, MAVProxy, and SITL
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Build and launch a working simulation environment
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Set up development environment on your system
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "simulation" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "simulation" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("simulation")}
                  >
                    <span className="text-sm sm:text-base">
                      2. Simulation Environment
                    </span>
                    {openLecture === "simulation" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "simulation" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Launch and manage simulation sessions using shell scripts
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Automate the launch process and understand the role of proxies
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Configure simulation parameters and environments
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "mavproxy" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "mavproxy" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("mavproxy")}
                  >
                    <span className="text-sm sm:text-base">
                      3. MAVProxy Command Line GCS
                    </span>
                    {openLecture === "mavproxy" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "mavproxy" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Learn MAVProxy modules like map, horizon, graph, fence, relay, servo
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Control drone operations and monitor status via CLI
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Master command-line ground control station operations
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "operations" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "operations" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("operations")}
                  >
                    <span className="text-sm sm:text-base">
                      4. Basic Drone Operations
                    </span>
                    {openLecture === "operations" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "operations" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Arm/disarm, set flight modes, takeoff, land, and navigate
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Full vehicle lifecycle control from boot to mission completion
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Understand flight modes and safety protocols
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "mission" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "mission" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("mission")}
                  >
                    <span className="text-sm sm:text-base">
                      5. Mission Planning
                    </span>
                    {openLecture === "mission" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "mission" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Send missions, edit missions, clear and update mission waypoints
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Execute custom autonomous flight plans and monitor execution
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Create complex mission profiles and waypoint sequences
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "fencing" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "fencing" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("fencing")}
                  >
                    <span className="text-sm sm:text-base">
                      6. Fencing and Rally Points
                    </span>
                    {openLecture === "fencing" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "fencing" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Create, send, and test geofencing and rally points
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Improve safety and return logic during missions
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Implement boundary control and emergency procedures
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "mavlink" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "mavlink" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("mavlink")}
                  >
                    <span className="text-sm sm:text-base">
                      7. MAVLink Communication Basics
                    </span>
                    {openLecture === "mavlink" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "mavlink" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Understand message types, stream requests, telemetry data parsing
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Build telemetry and control pipelines using PyMAVLink
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Master MAVLink protocol for drone communication
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "python" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "python" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("python")}
                  >
                    <span className="text-sm sm:text-base">
                      8. Python Programming with DroneKit & PyMAVLink
                    </span>
                    {openLecture === "python" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "python" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Write Python scripts to control and monitor drones
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Full automation and integration into software systems
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Develop custom drone control applications
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "parameters" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "parameters" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("parameters")}
                  >
                    <span className="text-sm sm:text-base">
                      9. Reading and Writing Parameters
                    </span>
                    {openLecture === "parameters" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "parameters" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Use scripts to get/set flight speed, battery, yaw, RC inputs
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Dynamic runtime control and diagnostics of drone systems
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Configure and monitor autopilot parameters
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "lua" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "lua" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("lua")}
                  >
                    <span className="text-sm sm:text-base">
                      10. LUA Scripting (Autopilot Onboard)
                    </span>
                    {openLecture === "lua" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "lua" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Learn Lua scripting basics, write onboard logic, respond to conditions
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Embed custom logic into autopilot for advanced behavior
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Create intelligent onboard automation systems
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}
                >
                  <button
                    className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${
                      openLecture === "companion" ? "text-blue-600" : ""
                    } cursor-pointer rounded-md ${
                      openLecture === "companion" ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleLecture("companion")}
                  >
                    <span className="text-sm sm:text-base">
                      11. Companion Computer Integration
                    </span>
                    {openLecture === "companion" ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className={`px-4 py-2 ${
                      openLecture === "companion" ? "" : "hidden"
                    }`}
                  >
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                      <li className="flex items-center py-1">
                        <RocketLaunchIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Send messages between onboard computer and GCS
                      </li>
                      <li className="flex items-center py-1">
                        <CpuIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Enable smart onboard computation and interaction
                      </li>
                      <li className="flex items-center py-1">
                        <ChartBarIcon className="h-4 w-4 mr-2 text-grey-700" />
                        Integrate advanced computing capabilities with autopilot
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
                <strong>Drone Programming & ArduPilot Bootcamp</strong> is an advanced, hands-on training program
                designed for learners who want to build intelligent drones and autonomous systems using
                the ArduPilot autopilot software stack. This bootcamp combines simulation setup, Python
                programming, MAVLink protocol mastery, and real-time telemetry interaction to prepare
                you for drone R&D, robotics engineering, or defense UAV development. From writing
                mission scripts to embedding LUA onboard logic, you&apos;ll go from zero to expert in
                autonomous drone systems.
                {!showFullDescription && <span> ...</span>}
              </p>
              {showFullDescription && (
                <>
                  <div className="mb-4">
                    <strong className="text-lg font-semibold">
                      Key Learning Outcomes:
                    </strong>
                    <ul className="list-none mt-4 space-y-1">
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Master ArduPilot simulation and MAVLink communication protocols
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Build autonomous drone missions with Python and DroneKit
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Implement real-time telemetry and vehicle control systems
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Create custom LUA scripts for autopilot intelligence
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Develop companion computer integration for advanced capabilities
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Master mission planning and geofencing for safety
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Build complete autonomous drone systems from simulation to deployment
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
                    Engineering Students
                  </span>
                </div>
                <p className="text-gray-600">
                  Perfect for students in mechanical, electrical, or computer
                  science engineering who want hands-on robotics experience.
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
                    Software Engineers
                  </span>
                </div>
                <p className="text-gray-600">
                  Ideal for developers looking to transition into robotics and
                  automation engineering roles.
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
                    Robotics Enthusiasts
                  </span>
                </div>
                <p className="text-gray-600">
                  Build your first robot from scratch. No prior robotics
                  experience needed - just passion for technology.
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
                      Engineering Students
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Perfect for students in mechanical, electrical, or computer
                    science engineering who want hands-on robotics experience.
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
                      Software Engineers
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Ideal for developers looking to transition into robotics and
                    automation engineering roles.
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
                      Industry Professionals
                    </span>
                  </div>
                  <p className="text-gray-600">
                    For professionals in manufacturing, automation, or tech
                    looking to understand robotics applications in industry.
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
            <div className="my-4">
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
                href="/courses/drones"
                className="flex border border-gray-200 rounded-lg flex-col hover:shadow-lg hover:scale-103 hover:shadow-black-600 transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src="/autonomousCarMasterclassTemplate.png"
                    alt="Autonomous Systems Bootcamp"
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
                      Autonomous Systems Bootcamp
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
                <strong>275&nbsp;</strong> Learners enrolled
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
                    name: "Drone Programming & ArduPilot Course",
                    description: "Purchase of Drone Programming & ArduPilot Course",
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
                      name: "Drone Programming & ArduPilot Course",
                      description: "Purchase of Drone Programming & ArduPilot Course",
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
