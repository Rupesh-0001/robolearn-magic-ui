"use client";

// import { Particles } from "@/components/magicui/particles";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";

export default function ExplorePage() {
  // const isSmallScreen = useMediaQuery("(max-width: 640px)");
  // const isMediumScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative w-full overflow-hidden">
      {/* <Particles
        className="absolute inset-0 z-0"
        quantity={isSmallScreen ? 100 : isMediumScreen ? 150 : 200}
        ease={isSmallScreen ? 10 : 20}
        color="#000000"
        refresh
        staticity={50}
        size={isSmallScreen ? 0.5 : 1}
      /> */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 pb-8 sm:pb-10 2xl:pb-8">
        <div className="my-4 sm:my-6">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold">Upcoming Masterclasses</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">


          {/* Course Block 1 */}


          {/* <Link href="/masterclasses/future-proofing-masterclass" className="block transition-transform hover:scale-[1.02]">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow h-full flex flex-col">
            <div className="h-56 md:h-64 bg-gray-200 relative">
                <Image
                  src="/future_profing.jpg"
                  alt="Future Proofing Masterclass"
                  className="w-full h-full object-cover"
                  width={400}
                  height={256}
                />
              </div>
              <div className="p-4 sm:p-6 flex-grow flex flex-col">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">20th July 2025 • 7:00pm</p>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                    Future Proofing Your Career Using AI Tools
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">by Rupesh Ahuja</p>
                <div className="flex items-center mt-auto">
                  <span className="text-[#0e8144] border border-solid border-[#0e8144] rounded px-2 py-1 bg-[#0e8144]/10 font-medium text-sm">₹9</span>
                  <span className="ml-2 line-through text-gray-400 text-sm">₹399</span>
                </div>
              </div>
            </div>
          </Link> */}


          
          <Link href="/masterclasses/autonomous-car?utm_medium=landing" className="block transition-transform hover:scale-[1.02]">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="h-56 md:h-64 bg-gray-200 relative">
                <Image
                  src="/autonomousCarMasterclassTemplate.png"
                  alt="Autonomous Car Masterclass"
                  className="w-full h-full object-cover"
                  width={400}
                  height={256}
                />
              </div>
              <div className="p-4 sm:p-6 flex-grow flex flex-col">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  26th October 2025 • 7:00pm
                </p>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                  Building Your Own Autonomous Car
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">by Harpreet Singh</p>
                <div className="flex items-center mt-auto">
                  <span className="text-[#0e8144] border border-solid border-[#0e8144] rounded px-2 py-1 bg-[#0e8144]/10 font-medium text-sm">FREE</span>
                  <span className="ml-2 line-through text-gray-400 text-sm">₹399</span>
                </div>
              </div>
            </div>
          </Link>

          {/* MERN Stack Masterclass */}
          <Link href="/masterclasses/mern-stack?utm_medium=landing" className="block transition-transform hover:scale-[1.02]">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="h-56 md:h-64 bg-gray-200 relative">
                <Image
                  src="/mernStackMasterclass.JPG"
                  alt="MERN Stack Masterclass"
                  className="w-full h-full object-cover"
                  width={400}
                  height={256}
                />
              </div>
              <div className="p-4 sm:p-6 flex-grow flex flex-col">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  26th October 2025 • 7:00pm
                </p>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                  Full Stack Development with MERN
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">by Rupal Singla</p>
                <div className="flex items-center mt-auto">
                  <span className="text-[#0e8144] border border-solid border-[#0e8144] rounded px-2 py-1 bg-[#0e8144]/10 font-medium text-sm">FREE</span>
                  <span className="ml-2 line-through text-gray-400 text-sm">₹499</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Course Block 2 - AI Agent Masterclass (Commented Out) */}
          {/* <Link href="/masterclasses/ai-agent" className="block transition-transform hover:scale-[1.02]">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow h-full flex flex-col">
            <div className="h-56 md:h-64 bg-gray-200 relative">
                <Image
                  src="/AIMasterClass.png"
                  alt="AI Agent Masterclass"
                  className="w-full h-full object-cover"
                  width={400}
                  height={256}
                />
              </div>
              <div className="p-4 sm:p-6 flex-grow flex flex-col">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">Coming Soon</p>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                  Build Your First AI Agent From Scratch
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">by Harpreet Singh</p>
                <div className="flex items-center mt-auto">
                  <span className="text-[#0e8144] border border-solid border-[#0e8144] rounded px-2 py-1 bg-[#0e8144]/10 font-medium text-sm">FREE</span>
                  <span className="ml-2 line-through text-gray-400 text-sm">₹99</span>
                </div>
              </div>
            </div>
          </Link> */}

         

          {/* Course Block 3 */}
          <Link href="/masterclasses/robotic-arm" className="block transition-transform hover:scale-[1.02]">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow h-full flex flex-col">
            <div className="h-56 md:h-64 bg-gray-200 relative">
                <Image
                  src="/robotMasterClass.png"
                  alt="Robotic Arm Masterclass"
                  className="w-full h-full object-cover"
                  width={400}
                  height={256}
                />
              </div>
              <div className="p-4 sm:p-6 flex-grow flex flex-col">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">Coming Soon</p>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                  Build Your First Robotic Arm
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">by Harpreet Singh</p>
                <div className="flex items-center mt-auto">
                  <span className="text-[#0e8144] border border-solid border-[#0e8144] rounded px-2 py-1 bg-[#0e8144]/10 font-medium text-sm">FREE</span>
                  <span className="ml-2 line-through text-gray-400 text-sm">₹99</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Course Block 4 */}
          {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              Image placeholder
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">20 May 2025 • 4:00pm</p>
              <h2 className="text-2xl font-semibold mb-2">
                Machine Learning for Robots
              </h2>
              <p className="text-gray-600 mb-4">by Prof. David Lee, PhD</p>
              <div className="flex items-center">
                <span className="text-[#0e8144] border border-solid border-[#0e8144] rounded px-2 bg-[#0e8144]/10 font-medium">Free</span>
                <span className="ml-2 line-through text-gray-400">₹99</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
