"use client";

import { useState, useEffect } from "react";
import {
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  CheckCircle as CheckIcon,
  Clock as ClockIcon,
  Users as UsersIcon,
  BarChart3 as LevelIcon,
  Clock3 as DurationIcon,
  Languages as LanguageIcon,
  Calendar as AccessIcon,
  Award as CertificateIcon,
} from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShineBorder } from "@/components/magicui/shine-border";

import Link from "next/link";
import Image from "next/image";

import '../../../types/razorpay';

export default function InteractiveCourseContent({ data }: { data: any }) {
  const [openLecture, setOpenLecture] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endDate = new Date("2025-07-21T11:59:59");

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
            {data.subtitle}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold sm:mb-12 mt-2 lg:block hidden">
            {data.title}
          </h1>
          <div className="mb-8 sm:mb-12">
            <Image
              src={data.image}
              alt={data.title}
              className="rounded-lg shadow-lg w-full h-auto"
              width={800}
              height={450}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 mt-4 sm:mt-6 lg:hidden block">
            {data.title}
          </h1>

          <div className="lg:hidden my-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Details</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <LevelIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>{data.level}</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <DurationIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>{data.duration}</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <LanguageIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>{data.languages.join(", ")}</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <AccessIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>{data.access}</span>
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                    <CertificateIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>{data.certificate}</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl pb-4 sm:text-2xl font-semibold mb-2">What You'll Learn</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.details.map((item: string, idx: number) => (
              <li className="flex items-start" key={idx}>
                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <span className="text-sm sm:text-base">{item}</span>
              </li>
            ))}
            </ul>

          <div className="my-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Overview</h2>
            <div className="p-3">
              <div className="space-y-4">
                {data.overview.map((section: any) => (
                  <div key={section.id} className={`border rounded-lg p-1 shadow-md hover:bg-gray-50 transition-colors duration-200`}>
                  <button
                      className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center cursor-pointer rounded-md`}
                      onClick={() => toggleLecture(section.id)}
                    >
                      <span className="text-sm sm:text-base">{section.title}</span>
                      {openLecture === section.id ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                    <div className={`px-4 py-2 ${openLecture === section.id ? "" : "hidden"}`}>
                    <ul className="list-disc pl-5 text-sm sm:text-base">
                        {section.points.map((point: string, i: number) => (
                          <li className="flex items-center py-1" key={i}>
                            {point}
                      </li>
                        ))}
                    </ul>
                  </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-8 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">About the Bootcamp</h2>
            <div className="text-base text-gray-700 leading-relaxed mb-1">
              <p className="mb-4">{data.about}{!showFullDescription && <span> ...</span>}</p>
              {showFullDescription && (
                <>
                  <strong className="text-lg font-semibold">Top Projects You'll Build:</strong>
                    <ul className="list-none mt-4 space-y-1">
                    {data.projects.map((project: string, idx: number) => (
                      <li className="flex items-center" key={idx}>
                        <span className="hidden sm:inline text-green-500 mr-2">✅</span>
                        <span className="sm:hidden text-black mr-2">•</span>
                        <span className="text-sm sm:text-base">{project}</span>
                      </li>
                    ))}
                    </ul>
                </>
              )}
            </div>
            <button onClick={toggleDescription} className="text-base text-[#3e48ce] rounded-md transition cursor-pointer">
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          </div>

          <div className="my-12">
            <h2 className="text-xl sm:text-2xl font-semibold md:mb-6 mb-3">Who Is This Bootcamp For</h2>
            <div className="block md:hidden">
              {data.whoIsThisFor.map((who: any, idx: number) => (
                <div key={idx} className="w-full my-3 flex-shrink-0 snap-start rounded-xl border border-gray-200 shadow-sm p-4 bg-gray-100">
                  <div className="flex items-center mb-2">
                    <Image src={who.icon} alt={who.title} width={32} height={32} />
                    <span className="text-lg font-semibold ml-2">{who.title}</span>
                  </div>
                  <p className="text-gray-600">{who.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white my-8">
            <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
              <Image src="/instructor.svg" alt="Instructor" width={32} height={32} /> Meet Your Instructor
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-4">
              <div className="md:flex md:gap-6">
                <div className="flex-shrink-0 md:block flex flex-col items-center mb-6 md:mb-0">
                  <Image src={data.instructor.image} alt={data.instructor.name} width={100} height={120} className="rounded-lg" />
                </div>
                <div className="md:flex md:flex-col">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{data.instructor.name}</h3>
                    <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <strong>{data.instructor.experience}</strong>
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      <strong>{data.instructor.learners}</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700 text-sm sm:text-base">{data.instructor.bio}</p>
            </div>
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
                <strong>{data.learners}&nbsp;</strong> Learners enrolled
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <LevelIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                {data.level}
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <DurationIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                {data.duration}
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <LanguageIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                {data.languages.join(", ")}
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <AccessIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                {data.access}
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <CertificateIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                {data.certificate}
              </li>
            </ul>
            <div className="mb-2">
              <span className="text-xl sm:text-2xl font-bold text-black-600">
                ₹{data.currentPrice}
              </span>
              <span className="text-sm sm:text-xl text-gray-500 line-through ml-2">
                ₹{data.originalPrice}
              </span>
              <span className="text-sm sm:text-base text-black-600 ml-2">
                {" "}
                SAVE {data.discount}
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
                    amount: data.currentPrice * 100,
                    currency: "INR",
                    name: data.title,
                    description: `Purchase of ${data.title}`,
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
    </main>
  );
} 