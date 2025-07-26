"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Clock as ClockIcon,
  Users as UsersIcon,
  X as XIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from 'next/image';

// Import the JSON file from the same directory.
import masterclassData from './future-proofing.json';

export default function FutureProofingMasterclassPage() {
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleCloseThankYouModal = () => setShowThankYouModal(false);

  useEffect(() => {
    // The current date in the JSON is July 27, 2025.
    // The masterclass is happening tomorrow!
    const countDownDate = new Date(masterclassData.dateTime).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEnrollNow = async () => {
    setIsLoading(true);
    try {
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: masterclassData.price.discounted }),
      });
      const { order } = await orderResponse.json();
      if (!order) throw new Error('Failed to create order');

      const initializeRazorpay = () => {
        const options = {
          key: masterclassData.razorpay.key,
          amount: order.amount,
          currency: "INR",
          name: masterclassData.razorpay.name,
          description: masterclassData.razorpay.description,
          order_id: order.id,
          handler: (response: any) => {
            setShowThankYouModal(true);
            setIsLoading(false);
          },
          prefill: { name: "", email: "", contact: "" },
          theme: { color: "#000000" },
        };
        try {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error("Error initializing Razorpay:", error);
        } finally {
          setIsLoading(false);
        }
      };

      if (typeof window !== "undefined" && (window as any).Razorpay) {
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
  };
  
  const renderIcon = (iconName: string, colorClass: string) => {
    const baseClass = "h-4 w-4 text-white";
    const iconProps = { className: baseClass, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" };
    switch (iconName) {
        case "idea": return <div className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center mr-3`}><svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg></div>;
        case "bolt": return <div className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center mr-3`}><svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>;
        case "briefcase": return <div className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center mr-3`}><svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"/></svg></div>;
        case "cash": return <div className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center mr-3`}><svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/></svg></div>;
    }
  };

  const enrollButton = (isMobile = false) => (
    <ShimmerButton
        borderRadius={isMobile ? "8px" : "5px"}
        className="text-white text-sm sm:text-base font-semibold w-full cursor-pointer group"
        onClick={handleEnrollNow}
    >
        <span className="flex items-center justify-center">
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
                    <svg className="w-4 h-4 ml-1 transition-transform duration-200 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </>
            )}
        </span>
    </ShimmerButton>
  );

  const learnItems = [
    { ...masterclassData.whatYouWillLearn[0], bgColor: 'bg-blue-50', borderColor: 'border-blue-200', iconColor: 'bg-blue-600', textColor: 'text-blue-900' },
    { ...masterclassData.whatYouWillLearn[1], bgColor: 'bg-green-50', borderColor: 'border-green-200', iconColor: 'bg-green-600', textColor: 'text-green-900' },
    { ...masterclassData.whatYouWillLearn[2], bgColor: 'bg-purple-50', borderColor: 'border-purple-200', iconColor: 'bg-purple-600', textColor: 'text-purple-900' },
    { ...masterclassData.whatYouWillLearn[3], bgColor: 'bg-orange-50', borderColor: 'border-orange-200', iconColor: 'bg-orange-600', textColor: 'text-orange-900' },
  ];
  
  const bonusItems = [
    { ...masterclassData.bonuses.items[0], gradient: 'from-blue-50 to-indigo-50', borderColor: 'border-blue-100', iconColor: 'bg-blue-500', iconPath: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/> },
    { ...masterclassData.bonuses.items[1], gradient: 'from-green-50 to-emerald-50', borderColor: 'border-green-100', iconColor: 'bg-green-500', iconPath: <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/> },
    { ...masterclassData.bonuses.items[2], gradient: 'from-purple-50 to-violet-50', borderColor: 'border-purple-100', iconColor: 'bg-purple-500', iconPath: <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/> },
    { ...masterclassData.bonuses.items[3], gradient: 'from-orange-50 to-amber-50', borderColor: 'border-orange-100', iconColor: 'bg-orange-500', iconPath: <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/> },
  ];

  return (
    <div className="container mx-auto px-4 pt-16 mt-6 2xl:pb-8 pb-10">
      <div className="inline-block border border-[#df4271] bg-[#fae3ea] font-medium text-[#df4271] text-sm px-3 py-1 rounded-md md:mb-4 mb-2">
        {masterclassData.tag}
      </div>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full lg:w-1/3 rounded-lg relative bg-[#f8f9fa] mr-4">
            <Image
              src={masterclassData.image}
              alt={masterclassData.title}
              className="w-full h-auto object-contain rounded-lg"
              width={500}
              height={300}
              priority
            />
            <div className="absolute bottom-0 w-full bg-black/80 text-white px-4 py-2 rounded-b-md text-center flex items-center justify-center gap-2">
              <Image src="/calendar-icon-white.svg" alt="Calendar" className="h-4 w-4" width={16} height={16} />
              <span className="text-sm md:text-base">
                {`Starts in ${timeLeft.days}D : ${timeLeft.hours}H : ${timeLeft.minutes}M : ${timeLeft.seconds}S`}
              </span>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full hidden lg:w-3/5 p-8 rounded-lg shadow-lg border border-gray-200 overflow-hidden md:flex flex-col">
            <h1 className="text-2xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: masterclassData.title }}></h1>
            <div className="flex items-center gap-4 mb-6 bg-gray-100 w-fit rounded p-2">
              <div className="flex items-center gap-2">
                <Image src="/calendar-icon.svg" alt="Calendar" className="w-5 h-5 bg-white border border-gray-300 rounded-full p-0.5" width={20} height={20}/>
                <span>{masterclassData.displayDate}</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Image src="/clock-icon.svg" alt="Clock" className="w-5 h-5 bg-white border border-gray-300 rounded-full p-0.5" width={20} height={20}/>
                <span>{masterclassData.displayTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-green-500">₹{masterclassData.price.discounted}</span>
              <span className="text-gray-500 line-through">₹{masterclassData.price.original}</span>
              <span className="text-gray-500">({masterclassData.price.discountPercentage}% OFF)</span>
            </div>
            <div className="flex items-center">
              <div className="w-1/3 mr-4">{enrollButton()}</div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (<Image key={i} src={`/indianPerson${i}.jpg`} alt={`Person ${i}`} width={64} height={64} quality={100} className="w-8 h-8 rounded-full border-2 border-white object-cover"/>))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white text-xs font-semibold flex items-center justify-center">+50</div>
                </div>
                <span className="text-[#df4271]">Limited Seats</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-6">
        {/* Main Content Area */}
        {/* CHANGE: Width adjusted to 70% */}
        <div className="md:w-[70%] w-full">
          {/* Mobile Title and Details */}
          <div className="bg-white my-6 block md:hidden">
            <h1 className="font-bold text-lg" dangerouslySetInnerHTML={{ __html: masterclassData.title }}></h1>
            <div className="space-y-3 border border-gray-200 bg-gray-100 py-3 px-4 rounded-lg mt-2">
                <div className="flex items-center gap-2 text-sm">
                    <Image src="/calendar-icon.svg" alt="Calendar" className="w-4 h-4" width={16} height={16}/>
                    <span className="text-gray-800 font-medium">{masterclassData.displayDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Image src="/clock-icon.svg" alt="Clock" className="w-4 h-4" width={16} height={16}/>
                    <span className="text-gray-800 font-medium">{masterclassData.displayTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Image src="/beginner-icon.svg" alt="Beginner" className="w-4 h-4" width={16} height={16}/>
                    <span className="text-gray-800 font-medium">{masterclassData.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Image src="/people-icon.svg" alt="People" className="w-4 h-4" width={16} height={16}/>
                    <span className="text-gray-800 font-medium">{masterclassData.participants} participants</span>
                </div>
            </div>
          </div>

          {/* What You'll Learn Section */}
          <div className="bg-white my-12">
            <h2 className="text-xl pb-4 sm:text-2xl font-semibold">What You&apos;ll Learn</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {learnItems.map((item, index) => (
                <li key={index} className={`${item.bgColor} border ${item.borderColor} rounded-lg p-4 transition-colors`}>
                  <div className="flex items-center mb-2">
                    {renderIcon(item.icon, item.iconColor)}
                    <h3 className={`text-base font-semibold ${item.textColor}`}>{item.title}</h3>
                  </div>
                  <p className={`text-sm ${item.textColor}`}>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Who Should Attend Section */}
          <div className="my-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Who Should Attend</h2>
              <div className="space-y-4">
                {masterclassData.whoShouldAttend.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-8 h-8 bg-${['blue','green','purple','orange'][index]}-400 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bonuses Section */}
          <div className="my-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="whitespace-nowrap">Exclusive Bonuses</span>
                <span className="text-sm sm:text-base text-gray-600 font-normal">(Worth ₹{masterclassData.bonuses.totalValue})</span>
              </h2>
              <div className="space-y-4">
                {bonusItems.map((bonus, index) => (
                  <div key={index} className={`flex items-start gap-4 p-4 bg-gradient-to-r ${bonus.gradient} rounded-lg border ${bonus.borderColor}`}>
                    <div className={`w-10 h-10 ${bonus.iconColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">{bonus.iconPath}</svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{bonus.title}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{bonus.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About the Masterclass Section */}
          <div className="my-12 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">About the Masterclass</h2>
            <div className="text-base text-gray-700 leading-relaxed space-y-4">
              {masterclassData.about.map((paragraph, index) => (<p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>))}
            </div>
          </div>

          {/* Instructor Section */}
          <div className="mt-12"> 
            <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
              <Image src="/instructor.svg" alt="Instructor" width={32} height={32}/> Meet Your Instructor
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-4">
              <div className="md:flex md:gap-6">
                <div className="flex-shrink-0 md:block flex flex-col items-center mb-6 md:mb-0">
                  <Image src={masterclassData.instructor.image} alt={masterclassData.instructor.name} width={100} height={120} className="rounded-lg"/>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{masterclassData.instructor.name}</h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center"><ClockIcon className="w-4 h-4 mr-2" /><strong>{masterclassData.instructor.experience}</strong></p>
                  <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center"><UsersIcon className="w-4 h-4 mr-2" /><strong>{masterclassData.instructor.learners}</strong></p>
                  <p className="text-sm sm:text-base text-gray-700 pt-1" dangerouslySetInnerHTML={{ __html: masterclassData.instructor.bio }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        {/* CHANGE: Width adjusted to 30% */}
        <div className="md:w-[30%] hidden md:block md:pl-8">
            <div className="sticky top-20 bg-white shadow-xl rounded-xl p-6 border border-gray-100 transition-all duration-300">
                <ShineBorder />
                <div className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2"><Image src="/calendar-icon.svg" alt="Calendar" className="w-5 h-5" width={20} height={20}/><span className="text-gray-800">{masterclassData.displayDate}</span></div>
                        <div className="flex items-center gap-2"><Image src="/clock-icon.svg" alt="Clock" className="w-5 h-5" width={20} height={20}/><span className="text-gray-800">{masterclassData.displayTime}</span></div>
                        <div className="flex items-center gap-2"><Image src="/globe-icon.svg" alt="Globe" className="w-5 h-5" width={20} height={20}/><span className="text-gray-800">{masterclassData.languages.join(', ')}</span></div>
                    </div>
                    <div className=" rounded-lg p-3 ">
                        <div className="space-y-2">
                            <div><span className="text-md font-bold font-medium">Enroll Now</span></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-gray-600 font-medium">Original Price:</span><span className="text-sm text-gray-500 line-through">₹{masterclassData.price.original}</span></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-gray-600 font-medium">Discount:</span><span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">{masterclassData.price.discountPercentage}% OFF</span></div>
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="flex justify-between items-center"><span className="text-md font-medium font-bold">Final Price:</span><span className="text-2xl font-bold text-green-600">₹{masterclassData.price.discounted}</span></div>
                            </div>
                        </div>
                    </div>
                    {enrollButton()}
                    <div className="pt-4">
                        <p className="text-center text-gray-700 font-medium mb-3">Masterclass Starts In</p>
                        <div className="flex justify-between">
                            <div className="text-center"><div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner">{String(timeLeft.days).padStart(2, "0")}</div><p className="text-xs text-gray-500 mt-1">Days</p></div>
                            <div className="text-center"><div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner">{String(timeLeft.hours).padStart(2, "0")}</div><p className="text-xs text-gray-500 mt-1">Hours</p></div>
                            <div className="text-center"><div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner">{String(timeLeft.minutes).padStart(2, "0")}</div><p className="text-xs text-gray-500 mt-1">Min</p></div>
                            <div className="text-center"><div className="bg-gray-100 rounded-lg w-14 h-14 flex items-center justify-center text-xl font-bold text-gray-800 shadow-inner">{String(timeLeft.seconds).padStart(2, "0")}</div><p className="text-xs text-gray-500 mt-1">Sec</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
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
                        <div className="flex items-center gap-2"><span className="text-xl font-bold text-green-500">₹{masterclassData.price.discounted}</span></div>
                        <div className="flex items-center gap-2"><span className="text-sm text-gray-500 line-through">₹{masterclassData.price.original}</span><span className="text-xs text-green-500">{masterclassData.price.discountPercentage}% off</span></div>
                    </div>
                    <div className="w-[70%]">{enrollButton(true)}</div>
                </div>
            </div>
        </div>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-neutral-500 bg-opacity-30 flex items-center justify-center z-50 p-4" onClick={handleCloseThankYouModal}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end p-4 pb-0"><button onClick={handleCloseThankYouModal} className="text-gray-400 hover:text-gray-600 transition-colors"><XIcon className="h-6 w-6 cursor-pointer" /></button></div>
            <div className="px-8 pb-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6"><svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for joining</h2>
              <p className="text-gray-600 mb-8">Join our WhatsApp community to know more about the masterclass and get notified when it&apos;s live.</p>
              <div className="space-y-3">
                <a href={masterclassData.communityLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
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