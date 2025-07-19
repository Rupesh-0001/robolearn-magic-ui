"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Clock as ClockIcon,
  Users as UsersIcon,
  X as XIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from 'next/image';

export default function FutureProofingMasterclass() {
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Carousel state
  const carouselRef = useRef<HTMLDivElement>(null);

  // Add countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
  };

  // Check if scroll buttons should be visible
  const checkScrollButtons = () => {
    if (carouselRef.current) {
      // setCanScrollLeft(scrollLeft > 0); // Removed
      // setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // Removed
    }
  };

  // Initialize scroll check
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  // Add countdown timer effect
  useEffect(() => {
    const countDownDate = new Date("July 20, 2025 17:00:00").getTime(); 
    // Update the countdown every 1 second
    const interval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the countdown date
      const distance = countDownDate - now;

      // If the countdown is finished, clear the interval
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update state with new values
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    // Call once immediately to avoid delay
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance >= 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }

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
              src="/future_profing.jpg"
              alt="Future Proofing Masterclass"
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
              <span className="text-sm md:text-base">
                {timeLeft.days > 0
                  ? `Starts in ${timeLeft.days} Days : ${timeLeft.hours} Hours : ${timeLeft.minutes} Min : ${timeLeft.seconds} Sec`
                  : `Starts in ${timeLeft.hours} Hours : ${timeLeft.minutes} Min : ${timeLeft.seconds} Sec`}
              </span>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:block hidden lg:w-3/5 p-8 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <h1 className="text-2xl font-bold mb-4">
              Future-Proof Your Career: Master the Skills That Will
              <span className="text-black-600"> Dominate the Future</span>
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
                <span>20th July, 2025</span>
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
                <span>05:00 pm to 06:30 pm</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-green-500">₹9</span>
              <span className="text-gray-500 line-through">₹399</span>
              <span className="text-gray-500">(97% OFF)</span>
            </div>

            <div className="flex items-center">
              <ShimmerButton
                borderRadius="5px"
                className="text-white text-sm sm:text-base font-semibold w-1/3 cursor-pointer mr-4 group"
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    // First create order
                    const orderResponse = await fetch('/api/create-order', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        amount: 9 // ₹9 in rupees
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
                        setIsLoading(false);
                        return;
                      }

                      const options = {
                        key: razorpayKey,
                        amount: order.amount,
                        currency: "INR",
                        name: "Future-Proofing Masterclass",
                        description: "Purchase of Future-Proofing Masterclass",
                        order_id: order.id,
                        handler: function (response: {
                          razorpay_payment_id: string;
                          razorpay_order_id: string;
                          razorpay_signature: string;
                        }) {
                          console.log(response);
                          setShowThankYouModal(true);
                          setIsLoading(false);
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
                        setIsLoading(false);
                        rzp.open();
                      } catch (error) {
                        console.error("Error initializing Razorpay:", error);
                        setIsLoading(false);
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
                    console.error("Error purchasing masterclass:", error);
                    setIsLoading(false);
                  }
                }}
              >
                <span className="flex items-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </span>
              </ShimmerButton>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Image
                      key={i}
                      src={`/indianPerson${i}.jpg`}
                      alt={`Person ${i}`}
                      width={64}
                      height={64}
                      quality={100}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white text-xs font-semibold flex items-center justify-center">
                    +50
                  </div>
                </div>
                <span className="text-[#df4271]">Limited Seats</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 w-full">
          <div className="bg-white my-6 block md:hidden">
            <span className="font-bold">Future-Proofing Masterclass</span>
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
                <span className="text-gray-800 font-medium">20th July, 2025</span>
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
                <span className="text-gray-800 font-medium">05:00 pm to 06:30 pm</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="text-gray-500 w-6 flex-shrink-0">
                  <Image
                    src="/beginner-icon.svg"
                    alt="Beginner"
                    className="w-4 h-4"
                    width={16}
                    height={16}
                  />
                </div>
                <span className="text-gray-800 font-medium">All Levels</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="text-gray-500 w-6 flex-shrink-0">
                  <Image
                    src="/people-icon.svg"
                    alt="People"
                    className="w-4 h-4"
                    width={16}
                    height={16}
                  />
                </div>
                <span className="text-gray-800 font-medium">50+ participants</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Image
                      key={i}
                      src={`/indianPerson${i}.jpg`}
                      alt={`Person ${i}`}
                      width={64}
                      height={64}
                      quality={100}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white text-xs font-semibold flex items-center justify-center">
                    +50
                  </div>
                </div>
                <span className="text-[#df4271]">Limited Seats</span>
            </div>
            </div>
          </div>

          {/* What You'll Learn Section */}
          <div className="bg-white my-12">
            <h2 className="text-xl pb-4 sm:text-2xl font-semibold">
              What You&apos;ll Learn
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="bg-blue-50 border border-blue-200 rounded-lg p-4 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-blue-900">AI Tools Mastery</h3>
                </div>
                <p className="text-sm text-blue-900">
                  Best AI Tools for Professionals – ChatGPT, Gemini, Claude, Perplexity, and more
                </p>
              </li>
              <li className="bg-green-50 border border-green-200 rounded-lg p-4 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-green-900">Productivity Boost</h3>
                </div>
                <p className="text-sm text-green-900">
                  AI for Productivity – Automate emails, reports, presentations & meetings
                </p>
              </li>
              <li className="bg-purple-50 border border-purple-200 rounded-lg p-4 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-purple-900">Career Growth</h3>
                </div>
                <p className="text-sm text-purple-900">
                  AI for Career Growth – Optimize resumes, cover letters & LinkedIn with AI
                </p>
              </li>
              <li className="bg-orange-50 border border-orange-200 rounded-lg p-4 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-orange-900">High-Income Skills</h3>
                </div>
                <p className="text-sm text-orange-900">
                  AI for High-Income Skills – Coding, marketing, sales, content & design
                </p>
              </li>
            </ul>
          </div>

           {/* Who Should Attend Section */}
           <div className="my-12">
           
           
           <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
           <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
             Who Should Attend
           </h2>
             <div className="space-y-4">
               <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-white font-bold text-sm">1</span>
                 </div>
                 <div className="flex-1">
                   <p className="text-sm text-gray-700 leading-relaxed">Employees looking to enhance productivity and advance their careers with AI skills.</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-white font-bold text-sm">2</span>
                 </div>
                 <div className="flex-1">
                   <p className="text-sm text-gray-700 leading-relaxed">Recent graduates preparing for the AI-driven job market and future opportunities.</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-white font-bold text-sm">3</span>
                 </div>
                 <div className="flex-1">
                   <p className="text-sm text-gray-700 leading-relaxed">Individuals looking to transition into AI-powered roles with high earning potential.</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-white font-bold text-sm">4</span>
                 </div>
                 <div className="flex-1">
                   <p className="text-sm text-gray-700 leading-relaxed">Business owners wanting to leverage AI for business growth and efficiency.</p>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Bonuses Section */}
         <div className="my-12">
           <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 flex items-center gap-2">
                 {/* <span className="text-yellow-500">🎁</span> */}
                 <span className="whitespace-nowrap">Exclusive Bonuses</span>
                 <span className="text-sm sm:text-base text-gray-600 font-normal">(Worth ₹6000+)</span>
               </h2>
             <div className="space-y-4">
                              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                 <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                   </svg>
                 </div>
                 <div className="flex-1">
                   <h3 className="font-semibold text-gray-900 mb-1">AI Tools Cheatsheet</h3>
                   <p className="text-sm text-gray-700 leading-relaxed">
                     Comprehensive guide showing which AI tool is best for which specific purpose. 
                     Save hours of research and get the right tool for every task.
                   </p>
                 </div>
               </div>

               <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                 <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                   </svg>
                 </div>
                 <div className="flex-1">
                   <h3 className="font-semibold text-gray-900 mb-1">Free AI Tools Guide</h3>
                   <p className="text-sm text-gray-700 leading-relaxed">
                     Learn how to use powerful AI tools completely free. 
                     Discover hidden gems and free alternatives to expensive AI services.
                   </p>
                 </div>
               </div>

               <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
                 <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                   </svg>
                 </div>
                 <div className="flex-1">
                   <h3 className="font-semibold text-gray-900 mb-1">Custom GPTs Access</h3>
                   <p className="text-sm text-gray-700 leading-relaxed">
                     Access to specialized Custom GPTs that help you learn and prepare for interviews. 
                     Get personalized AI assistance for your career growth.
                   </p>
                 </div>
               </div>

               <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
                 <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                   </svg>
                 </div>
                 <div className="flex-1">
                   <h3 className="font-semibold text-gray-900 mb-1">Career Growth Roadmap</h3>
                   <p className="text-sm text-gray-700 leading-relaxed">
                     AI-powered personalized career strategy that maps your journey from current role to dream position. 
                     Get step-by-step action plan with skill development timeline, salary progression, and industry insights.
                   </p>
                 </div>
               </div>

             </div>
           </div>
         </div>

         

          {/* About the Masterclass Section */}
          <div className="my-12 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              About the Masterclass
            </h2>
            <div className="text-base text-gray-700 leading-relaxed mb-1">
              <p className="mb-4">
                In today&apos;s fast-changing job market, <strong>AI skills are no longer optional</strong>&mdash;they&apos;re essential. Whether you want to work smarter, get promotions, or increase your income, this masterclass will teach you how to leverage AI tools like <strong>ChatGPT, Gemini, Claude</strong>, and more to future-proof your career.
              </p>
              
              <p className="mb-4">
                <strong>Transform Your Daily Work:</strong> Learn how to use AI to write emails in seconds, create professional presentations, analyze data without Excel formulas, draft reports, and even handle customer queries automatically. Stop spending hours on repetitive tasks and start focusing on what really matters.
              </p>

              <p className="mb-4">
                <strong>Real Office Scenarios:</strong> Whether you&apos;re writing a project proposal, preparing for a meeting, creating marketing content, or just organizing your daily tasks - AI can help you do it faster and better. We&apos;ll show you exactly how to use these tools for your specific job role.
              </p>

              <p className="mb-4">
                <strong>No Technical Knowledge Required:</strong> You don&apos;t need to be a programmer or tech expert. We&apos;ll teach you simple, practical ways to use AI that anyone can understand and apply immediately. From writing better emails to creating stunning presentations - you&apos;ll learn it all.
              </p>

              <p className="mb-4">
                <strong>Save Time, Boost Results:</strong> Imagine finishing your daily reports in minutes instead of hours, creating professional presentations in seconds, and having AI help you research and analyze information for your projects. This masterclass will show you how to make this your reality.
              </p>
        </div>
          </div>


           

         
     

          {/* Mentor Section */}
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
              <div className="md:flex md:gap-6">
                <div className="flex-shrink-0 md:block flex flex-col items-center mb-6 md:mb-0">
                  <Image
                    src="/Rupesh.jpg"
                    alt="Rupesh Ahuja"
                    width={100}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:flex md:flex-col">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      Rupesh Ahuja
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <strong>4+ Years Experience</strong>
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center justify-center md:justify-start">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      <strong>5,000+ Learners</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 pt-1">
              With <span className="font-semibold text-black-700">4+ years</span> of industry expertise and <span className="font-semibold text-black-700">100+ webinars</span> conducted, Rupesh Ahuja is a seasoned <span className="font-semibold text-black-700">AI and career growth specialist</span>. His practical, no-fluff approach helps professionals harness AI tools to boost productivity, skills, and earnings. Join his masterclass to learn from an experienced mentor who delivers real, actionable results.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/3 hidden md:block">
          <div className="sticky top-20 bg-white shadow-xl rounded-xl p-6 border border-gray-100 transition-all duration-300 m-12">
            <ShineBorder />
            <div className="space-y-4">
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
                  <span className="text-gray-800">20th July, 2025</span>
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
                  <span className="text-gray-800">05:00 pm to 06:30 pm</span>
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
                  <span className="text-gray-800">Hindi, English</span>
                </div>
              </div>

                              <div className=" rounded-lg p-3 ">
                  <div className="space-y-2">
                  <div>
                      <span className="text-md font-bold font-medium">Enroll Now</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">Original Price:</span>
                      <span className="text-sm text-gray-500 line-through">₹399</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">Discount:</span>
                      <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">97% OFF</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-md font-medium font-bold">Final Price:</span>
                        <span className="text-2xl font-bold text-green-600">₹9</span>
                      </div>
                    </div>
                    
                  </div>
                </div>

              <ShimmerButton
                borderRadius="5px"
                className="text-white text-sm sm:text-base font-semibold w-full cursor-pointer mr-4 group"
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    // First create order
                    const orderResponse = await fetch('/api/create-order', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        amount: 9 // ₹9 in rupees
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
                        setIsLoading(false);
                        return;
                      }

                      const options = {
                        key: razorpayKey,
                        amount: order.amount,
                        currency: "INR",
                        name: "Future-Proofing Masterclass",
                        description: "Purchase of Future-Proofing Masterclass",
                        order_id: order.id,
                        handler: function (response: {
                          razorpay_payment_id: string;
                          razorpay_order_id: string;
                          razorpay_signature: string;
                        }) {
                          console.log(response);
                          setShowThankYouModal(true);
                          setIsLoading(false);
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
                        setIsLoading(false);
                        rzp.open();
                        
                      } catch (error) {
                        console.error("Error initializing Razorpay:", error);
                        setIsLoading(false);
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
                    console.error("Error purchasing masterclass:", error);
                    setIsLoading(false);
                  }
                }}
              >
                <span className="flex items-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </span>
              </ShimmerButton>

              <div className="pt-4">
                <p className="text-center text-gray-700 font-medium mb-3">
                  Masterclass Starts In f
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

      {/* Mobile Bottom Section */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="h-6 bg-[#fae3ea] mb-3 flex items-center justify-center">
            <div className="text-sm text-[#df4271]">
              Masterclass starts in {timeLeft.days > 0 ? `${timeLeft.days}d : ` : ""}
              {String(timeLeft.hours).padStart(2, "0")}h :{" "}
              {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
              {String(timeLeft.seconds).padStart(2, "0")}s
            </div>
          </div>
          <div className="flex p-2">
            <div className="w-[40%] flex flex-col justify-center items-end pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-green-500">₹9</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 line-through">
                  ₹399
                </span>
                <span className="text-xs text-green-500">97% off</span>
              </div>
            </div>
            <div className="w-[70%]">
              <ShimmerButton
                borderRadius="8px"
                className="w-full bg-white-600 text-white py-2 px-4 hover:bg-white-700 transition duration-300 text-lg font-medium cursor-pointer"
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    // First create order mobile
                    const orderResponse = await fetch('/api/create-order', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        amount: 9 // ₹9 in rupees
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
                        setIsLoading(false);
                        return;
                      }

                      const options = {
                        key: razorpayKey,
                        amount: order.amount,
                        currency: "INR",
                        name: "Future-Proofing Masterclass",
                        description: "Purchase of Future-Proofing Masterclass",
                        order_id: order.id,
                        handler: function (response: {
                          razorpay_payment_id: string;
                          razorpay_order_id: string;
                          razorpay_signature: string;
                        }) {
                          console.log(response);
                          setShowThankYouModal(true);
                          setIsLoading(false);
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
                        setIsLoading(false);
                        rzp.open();
                      } catch (error) {
                        console.error("Error initializing Razorpay:", error);
                        setIsLoading(false);
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
                    console.error("Error purchasing masterclass:", error);
                    setIsLoading(false);
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Enroll Now"
                )}
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
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
                Join our WhatsApp community to know more about the masterclass
                and get notified when it&apos;s live.
              </p>

              {/* Buttons */}
              <div className="space-y-3">
                <a
                  href="https://chat.whatsapp.com/HoB203LKpun5HNd624oyri?"
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
    </div>
  );
}