"use client";

import { useState, useEffect } from "react";
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
  GraduationCap as StudentIcon,
  Award as CertificateIcon,
  X as XIcon,
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShineBorder } from "@/components/magicui/shine-border";

import Link from "next/link";
import Image from "next/image";

import '../../../types/razorpay';

export default function AutonomousCarMasterclass() {
  const [openLecture, setOpenLecture] = useState<string | null>(null);

  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const coursePrice = 2999;

  // User details form state
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Check session storage for user details on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("userEmail");
      const storedName = sessionStorage.getItem("userName");
      const storedPhone = sessionStorage.getItem("userPhone");
      
      setUserDetails((prev: typeof userDetails) => ({
        ...prev,
        email: storedEmail || prev.email,
        name: storedName || prev.name,
        phone: storedPhone || prev.phone,
      }));
    }
  }, []);


  useEffect(() => {
    const endDate = new Date("2025-10-12T23:59:59");

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



  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
    setFormErrors({ name: "", email: "", phone: "" });
  };

  const validateForm = () => {
    const errors = { name: "", email: "", phone: "" };
    let isValid = true;

    // Name validation
    if (!userDetails.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    } else if (userDetails.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userDetails.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(userDetails.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!userDetails.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(userDetails.phone.replace(/\s+/g, ''))) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (field: keyof typeof userDetails, value: string) => {
    setUserDetails((prev: typeof userDetails) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev: typeof formErrors) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Create order
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: coursePrice
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
          name: "Autonomous Car Course",
          description: "Purchase of Autonomous Car Course",
          order_id: order.id,
          handler: function (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            // Immediately show thank you modal for better UX
            setShowUserDetailsModal(false);
            setShowThankYouModal(true);
            setIsLoading(false);
            
            // Save user details to session storage for future use
            if (typeof window !== "undefined") {
              sessionStorage.setItem("userEmail", userDetails.email);
              sessionStorage.setItem("userName", userDetails.name);
              sessionStorage.setItem("userPhone", userDetails.phone);
            }

            // Process post-payment operations in background (non-blocking)
            fetch('/api/post-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                                  amount: coursePrice,
                batchId: 6 // Autonomous car course batch ID
              }),
            })
            .then(async (postPaymentResponse) => {
              const postPaymentResult = await postPaymentResponse.json();
              if (postPaymentResponse.ok) {
                console.log('Post-payment processing successful:', postPaymentResult);
              } else {
                console.error('Post-payment processing failed:', postPaymentResult);
              }
            })
            .catch((error) => {
              console.error('Error in post-payment processing:', error);
            });
          },
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.phone,
          },
          theme: {
            color: "#000000",
          },
        };

        try {
          const rzp = new window.Razorpay(options);
          rzp.open();
          setIsLoading(false);
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
      console.error("Error purchasing course:", error);
      setIsLoading(false);
    }
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
        <div className="w-full lg:w-7/10" style={{ minHeight: '100vh' }}>
          <span className="bg-[#fae3ea] text-[#df4271] px-3 py-1 text-sm lg:block hidden w-fit rounded font-semibold">
            AUTONOMOUS CAR COURSE
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold sm:mb-12 mt-2 lg:block hidden">
            Autonomous System Revolution Program
          </h1>
          <div className="mb-8 sm:mb-12">
            <Image
              src="/CarCourse.jpg"
              alt="Autonomous Car"
              className="rounded-lg shadow-lg w-full h-auto"
              width={800}
              height={450}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 lg:hidden block">
            Autonomous System Revolution Program
          </h1>

          <div className="lg:hidden mb-8 mt-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Course Details
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center text-xs sm:text-sm lg:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3 flex-shrink-0">
                    <LevelIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Advanced Level</span>
                </li>
                <li className="flex items-center text-xs sm:text-sm lg:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3 flex-shrink-0">
                    <DurationIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>1.5 Months Mentorship</span>
                </li>
                <li className="flex items-center text-xs sm:text-sm lg:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3 flex-shrink-0">
                    <LanguageIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Hindi, English</span>
                </li>
                <li className="flex items-center text-xs sm:text-sm lg:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3 flex-shrink-0">
                    <StudentIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Specially for students</span>
                </li>
                <li className="flex items-center text-xs sm:text-sm lg:text-base">
                  <div className="bg-gray-100 rounded-full p-1.5 mr-3 flex-shrink-0">
                    <CertificateIcon className="w-3 h-3 text-gray-700" />
                  </div>
                  <span>Certificate of Completion</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white my-8 sm:my-12">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6">
              What You&apos;ll Learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    How to build a full perception-planning-control loop using real-world tools like ROS2, Carla, and Python
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Apply sensor fusion, object detection, and path planning using state-of-the-art AI and robotics techniques
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Master vehicle control systems using PID and MPC to simulate real actuation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Design Tesla-style neural pipelines with BEV + Transformer models for AI-first FSD systems
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="my-8 sm:my-12">
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <span className="whitespace-nowrap">Exclusive Bonuses You Get</span>
                <span className="text-sm sm:text-base text-gray-600 font-normal">(Worth ₹11,999+)</span>
              </h2>
              <div className="space-y-4">
                {/* <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Complete Code Repository</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Access to our private GitHub repository with all 8 project implementations, 
                      including Tesla-style neural networks, Carla simulations, and ROS2 packages. 
                      Ready-to-run code worth ₹5,000.
                    </p>
                  </div>
                </div> */}

                {/* <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">1-on-1 Mentorship Sessions</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Two personalized 30-minute sessions with Harpreet Singh to review your projects, 
                      career guidance, and technical troubleshooting. Direct access to industry expert worth ₹3,000.
                    </p>
                  </div>
                </div> */}

                {/* <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Industry Case Studies Package</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Exclusive access to 50+ real-world autonomous vehicle case studies from Tesla, Waymo, 
                      Cruise, and other leading companies. Learn from actual implementations and failures worth ₹2,500.
                    </p>
                  </div>
                </div> */}

                {/* <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 10v4a3 3 0 01-3 3H4a3 3 0 01-3-3v-4a5 5 0 0110 0c0 .34.024.673.07 1H12.93z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Job Placement Support</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Resume review, interview preparation, and direct referrals to our network of 
                      50+ autonomous vehicle companies. Career guidance package worth ₹2,000.
                    </p>
                  </div>
                </div> */}

                

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">AI Interview Companion</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Interactive AI tool where you can practice interviews by selecting topics and difficulty levels. 
                      Get realistic interview questions and instant feedback to ace your AV job interviews worth ₹2,000.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Resource File</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Comprehensive cheat sheet with all autonomous vehicle topics described precisely by industry experts. 
                      Perfect for last-minute study and quick reference during interviews worth ₹1,500.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Exclusive Industry Expert Session</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      One-on-one session with top autonomous vehicle industry experts. Get insider insights and career guidance worth ₹3,500.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-100">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 10v4a3 3 0 01-3 3H4a3 3 0 01-3-3v-4a5 5 0 0110 0c0 .34.024.673.07 1H12.93z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">1:1 Interview Training</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Personalized interview preparation with mock interviews, technical questions, 
                      and feedback from autonomous vehicle hiring managers worth ₹3,000.
                    </p>
                  </div>
                </div>


                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Lifetime Community Access</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Join our exclusive WhatsApp community with 500+ autonomous vehicle engineers. 
                      Get instant help, share projects, and network with industry professionals worth ₹1,000.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Certificate of Excellence</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Professional certificate endorsed by industry experts, perfect for LinkedIn 
                      and portfolio. Includes project showcase and skills verification worth ₹999.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

          {/* Why Choose This Bootcamp Section */}
          <div className="my-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
                Why Choose This Bootcamp
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Industry-Standard Tools</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Learn with the same tools used by Tesla, Waymo, and Cruise - ROS2, Carla simulator, 
                      and Python. Get hands-on experience with real autonomous vehicle development.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Project-Based Learning</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Build 8 real projects from lane detection to Tesla-style neural networks. 
                      Each project builds on the previous one, creating a complete autonomous system.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Mentorship</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Learn directly from Harpreet Singh, who has mentored 10,000+ students and 
                      founded award-winning robotics startups. Get personalized guidance and career advice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Career Ready Skills</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Graduate with a complete portfolio, industry connections, and the skills needed 
                      to land jobs in autonomous vehicle companies or start your own robotics venture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8 sm:my-12 rounded-lg">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6">
              About the Bootcamp
            </h2>
            <div className="text-base text-gray-700 leading-relaxed mb-1">
              <p className="mb-4">
                This is a complete, structured program to help you build a
                production-grade self-driving car stack from scratch,
                step-by-step. With live projects, recorded lectures, and
                professional tools, you&apos;ll graduate with real skills and a
                full portfolio.
              </p>
                  <div className="mb-4">
                    <strong className="text-lg font-semibold">
                      Top Projects You Will Build:
                    </strong>
                    <ul className="list-none mt-4 space-y-1">
                      <li className="flex items-center">
                        <span className="hidden sm:inline text-green-500 mr-2">
                          ✅
                        </span>
                    <span className="sm:hidden text-green-500 mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Lane Detection & Following (Level 1)
                        </span>
                      </li>
                      <li className="flex items-center">
                    <span className="hidden sm:inline text-blue-500 mr-2">
                          ✅
                        </span>
                    <span className="sm:hidden text-blue-500 mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Traffic Light and Sign Handling (Level 2)
                        </span>
                      </li>
                      <li className="flex items-center">
                    <span className="hidden sm:inline text-purple-500 mr-2">
                          ✅
                        </span>
                    <span className="sm:hidden text-purple-500 mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Lidar + Camera Obstacle Detection (Level 3)
                        </span>
                      </li>
                      <li className="flex items-center">
                    <span className="hidden sm:inline text-orange-500 mr-2">
                          ✅
                        </span>
                    <span className="sm:hidden text-orange-500 mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Localization & SLAM System (Level 4)
                        </span>
                      </li>
                      <li className="flex items-center">
                    <span className="hidden sm:inline text-red-500 mr-2">
                          ✅
                        </span>
                    <span className="sm:hidden text-red-500 mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Agent Prediction + Path Planning Stack (Level 5–6)
                        </span>
                      </li>
                      <li className="flex items-center">
                    <span className="hidden sm:inline text-indigo-500 mr-2">
                          ✅
                        </span>
                    <span className="sm:hidden text-indigo-500 mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          MPC Control Simulator (Level 7)
                        </span>
                      </li>
                      <li className="flex items-center">
                    <span className="hidden sm:inline text-pink-500 mr-2">
                          ✅
                        </span>
                    <span className="sm:hidden text-pink-500 mr-2">•</span>
                        <span className="text-sm sm:text-base">
                          Tesla-Style End-to-End Neural Driving Stack (Level 8)
                        </span>
                      </li>
                    </ul>
                  </div>
            </div>
          </div>

          <div className="my-8 sm:my-12">
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
              Who Is This Bootcamp For
            </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 border border-blue-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-bold text-gray-800 mb-3 text-sm sm:text-base">🎓 Students & Learners</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1 font-bold">•</span>
                      <span>Computer Science & Engineering students</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1 font-bold">•</span>
                      <span>Robotics & AI enthusiasts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1 font-bold">•</span>
                      <span>Tech hobbyists with no prior experience</span>
                    </li>
                  </ul>
              </div>

                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 border border-green-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-bold text-gray-800 mb-3 text-sm sm:text-base">💼 Working Professionals</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1 font-bold">•</span>
                      <span>Software Engineers & Developers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1 font-bold">•</span>
                      <span>AI & Robotics professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1 font-bold">•</span>
                      <span>Career changers to AV industry</span>
                    </li>
                  </ul>
            </div>

                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4 border border-purple-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-bold text-gray-800 mb-3 text-sm sm:text-base">🚀 Entrepreneurs & Innovators</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1 font-bold">•</span>
                      <span>Startup founders & product managers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1 font-bold">•</span>
                      <span>Researchers & academics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1 font-bold">•</span>
                      <span>Anyone building the future of mobility</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 border border-orange-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-bold text-gray-800 mb-3 text-sm sm:text-base">🎯 Perfect For</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1 font-bold">•</span>
                      <span>Building real autonomous systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1 font-bold">•</span>
                      <span>Getting industry-ready skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1 font-bold">•</span>
                      <span>Advancing your career in AV</span>
                    </li>
                  </ul>
                  </div>
                </div>
            </div>
          </div>

          <div className="my-8">
            <div className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              <Image
                src="/instructor.svg"
                alt="Instructor"
                width={24}
                height={24}
                className="w-6 h-6 sm:w-8 sm:h-8"
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
                <strong>312&nbsp;</strong> Learners enrolled
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
                  <StudentIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                Specially for students
              </li>
              <li className="flex items-center text-sm sm:text-base">
                <div className="bg-gray-100 rounded-full p-1.5 mr-3">
                  <CertificateIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                Certificate of Completion
              </li>
            </ul>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">
                ₹2,999
              </span>
                <span className="text-sm sm:text-lg text-gray-500 line-through">
                ₹5,999
              </span>
                <span className="text-xs sm:text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
                  SAVE 50%
              </span>
            </div>
              <div className="text-xs sm:text-sm text-gray-600 mb-2">
                <span className="text-black">+ ₹11,999 worth of bonuses included</span>
              </div>
              <div className="text-sm">
              <span className="text-black">Offer ends in</span>{" "}
                <span className="text-[#df4271] font-semibold">{formatTimeLeft()}</span>
              </div>
            </div>
            <ShimmerButton
              className="w-full bg-white-600 text-white py-2 px-4 rounded-lg hover:bg-white-700 transition duration-300 text-sm sm:text-base cursor-pointer"
              onClick={() => setShowUserDetailsModal(true)}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Buy Now"
              )}
            </ShimmerButton>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 w-full">
        <div className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] w-full">
          <div className="h-6 bg-[#fae3ea] mb-3 flex items-center justify-center">
            <div className="text-sm text-[#df4271] px-2">
              Offer ends in {formatTimeLeft()}
            </div>
          </div>
          <div className="flex p-2 w-full">
            <div className="w-[40%] flex flex-col justify-center items-end pr-2 sm:pr-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl font-bold text-black-600">₹2,999</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  ₹5,999
                </span>
                <span className="text-xs text-green-600 bg-green-100 px-1 rounded">50% off</span>
              </div>
              {/* <div className="text-xs text-gray-600 mt-1">
                + ₹11,999 bonuses
              </div> */}
            </div>
            <div className="w-[60%] sm:w-[70%]">
              <ShimmerButton
                borderRadius="8px"
                className="w-full bg-white-600 text-white py-2 px-4 hover:bg-white-700 transition duration-300 text-lg font-medium cursor-pointer"
                onClick={() => setShowUserDetailsModal(true)}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Buy Now"
                )}
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetailsModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-neutral-500 bg-opacity-30 flex items-center justify-center z-50 p-4"
          onClick={handleCloseUserDetailsModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Almost There!</h2>
                <p className="text-sm text-gray-600 mt-1">Please provide your details to proceed</p>
              </div>
              <button
                onClick={handleCloseUserDetailsModal}
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <form className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={userDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-sm placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-sm placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) => {
                        // Only allow numbers and limit to 10 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        handleInputChange('phone', value);
                      }}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-sm placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center">
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </form>

              {/* Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleCloseUserDetailsModal}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none cursor-pointer focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-3 text-sm font-medium bg-black text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
                  onClick={handleFormSubmit}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="hidden lg:block">Proceed to Payment</span>
                      <span className="lg:hidden">Proceed</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>

              {/* Security Note */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 text-center">
                  🔒 Your information is secure and will only be used for this purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  href="https://chat.whatsapp.com/GNeeXh1iR0r4ffdULe1WAn"
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
