'use client';

import { useState, useEffect } from 'react';
import { ChevronUp as ChevronUpIcon, ChevronDown as ChevronDownIcon, CheckCircle as CheckIcon, Clock as ClockIcon, Users as UsersIcon, Rocket as RocketLaunchIcon, Cpu as CpuIcon, ChartBar as ChartBarIcon, BarChart3 as LevelIcon, Clock3 as DurationIcon, Languages as LanguageIcon, Calendar as AccessIcon, Award as CertificateIcon } from 'lucide-react';
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function AutonomousCarMasterclass() {
    const [openLecture, setOpenLecture] = useState<string | null>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0
    });

    useEffect(() => {
        const endDate = new Date('2025-05-19T16:00:00'); // May 19, 4 PM

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = endDate.getTime() - now.getTime();

            if (difference > 0) {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft({ hours, minutes });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000);

        return () => clearInterval(timer);
    }, []);

    const toggleLecture = (lectureId: string) => {
        setOpenLecture(openLecture === lectureId ? null : lectureId);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <main className="container mx-auto px-4 pt-16 mt-6 2xl:pb-8 pb-24">
            <div className="flex flex-col lg:flex-row gap-11">
                <div className="w-full lg:w-7/10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 mt-4 sm:mt-6 lg:block hidden">Autonomous Car Masterclass</h1>
                    <div className="mb-8 sm:mb-12">
                        <img 
                            src="/autonomousCarMasterclassTemplate.jpeg"
                            alt="Autonomous Car" 
                            className="rounded-lg shadow-lg w-full h-auto"
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 mt-4 sm:mt-6 lg:hidden block">Autonomous Car Masterclass</h1>

                    <div className="lg:hidden my-8">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Details</h2>
                            <ul className="space-y-4">
                              
                                <li className="flex items-center text-sm sm:text-base">
                                    <LevelIcon className="w-4 h-4 mr-3 text-gray-700" />
                                    <span>Advanced Level</span>
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <DurationIcon className="w-4 h-4 mr-3 text-gray-700" />
                                    <span>1 hr of Content</span>
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <LanguageIcon className="w-4 h-4 mr-3 text-gray-700" />
                                    <span>Tamil</span>
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <AccessIcon className="w-4 h-4 mr-3 text-gray-700" />
                                    <span>1 Year Access</span>
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <CertificateIcon className="w-4 h-4 mr-3 text-gray-700" />
                                    <span>Certificate of Completion</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 my-8">
                        <h2 className="text-xl pb-4 sm:text-2xl font-semibold mb-5">What You&apos;ll Learn</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                                    <CheckIcon className="h-3 w-3 text-black" />
                                </span>
                                <span className="text-sm sm:text-base">How to build a full perception-planning-control loop using real-world tools like ROS2, Carla, and Python</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                                    <CheckIcon className="h-3 w-3 text-black" />
                                </span>
                                <span className="text-sm sm:text-base">Apply sensor fusion, object detection, and path planning using state-of-the-art AI and robotics techniques</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                                    <CheckIcon className="h-3 w-3 text-black" />
                                </span>
                                <span className="text-sm sm:text-base">Master vehicle control systems using PID and MPC to simulate real actuation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-1 bg-blue-200 rounded-full p-1">
                                    <CheckIcon className="h-3 w-3 text-black" />
                                </span>
                                <span className="text-sm sm:text-base">Design Tesla-style neural pipelines with BEV + Transformer models for AI-first FSD systems</span>
                            </li>
                        </ul>
                    </div>

                    <div className="my-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Overview</h2>
                        <div className="p-3">
                            <div className="space-y-4">
                                <div className={`border rounded-lg p-1 shadow-md`}>
                                    <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${openLecture === 'intro' ? 'text-blue-600' : ''} cursor-pointer  ${openLecture === 'intro' ? 'bg-blue-100' : ''}`} onClick={() => toggleLecture('intro')}>
                                        <span className="text-sm sm:text-base">1. Introduction to Autonomous Vehicles</span>
                                        {openLecture === 'intro' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                    </button>
                                    <div className={`px-4 py-2 ${openLecture === 'intro' ? '' : 'hidden'}`}>
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
                                <div className={`border rounded-lg p-1 shadow-md`}>
                                    <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${openLecture === 'perception' ? 'text-blue-600' : ''} cursor-pointer  ${openLecture === 'perception' ? 'bg-blue-100' : ''}`} onClick={() => toggleLecture('perception')}>
                                        <span className="text-sm sm:text-base">2. Perception and Computer Vision</span>
                                        {openLecture === 'perception' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                    </button>
                                    <div className={`px-4 py-2 ${openLecture === 'perception' ? '' : 'hidden'}`}>
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
                                <div className={`border rounded-lg p-1 shadow-md`}>
                                    <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${openLecture === 'planning' ? 'text-blue-600' : ''} cursor-pointer  ${openLecture === 'planning' ? 'bg-blue-100' : ''}`} onClick={() => toggleLecture('planning')}>
                                        <span className="text-sm sm:text-base">3. Path Planning and Decision Making</span>
                                        {openLecture === 'planning' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                    </button>
                                    <div className={`px-4 py-2 ${openLecture === 'planning' ? '' : 'hidden'}`}>
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
                                <div className={`border rounded-lg p-1 shadow-md`}>
                                    <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${openLecture === 'control' ? 'text-blue-600' : ''} cursor-pointer  ${openLecture === 'control' ? 'bg-blue-100' : ''}`} onClick={() => toggleLecture('control')}>
                                        <span className="text-sm sm:text-base">4. Vehicle Control Systems</span>
                                        {openLecture === 'control' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                    </button>
                                    <div className={`px-4 py-2 ${openLecture === 'control' ? '' : 'hidden'}`}>
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
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">About the Bootcamp</h2>
                        <p className="text-base text-gray-700 leading-relaxed mb-4 pl-2">
                            This is a complete, structured program to help you build a production-grade self-driving car stack from scratch, step-by-step. With live projects, recorded lectures, and professional tools, you&apos;ll graduate with real skills and a full portfolio.
                            {showFullDescription ? (
                                <>
                                    <br /><br />
                                    <strong className="text-lg">Top Projects You Will Build:</strong>
                                    <ul className="list-none mt-4 space-y-1">
                                        <li className="flex items-center"><span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>Lane Detection & Following (Level 1)</li>
                                        <li className="flex items-center"><span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>Traffic Light and Sign Handling (Level 2)</li>
                                        <li className="flex items-center"><span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>Lidar + Camera Obstacle Detection (Level 3)</li>
                                        <li className="flex items-center"><span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>Localization & SLAM System (Level 4)</li>
                                        <li className="flex items-center"><span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>Agent Prediction + Path Planning Stack (Level 5–6)</li>
                                        <li className="flex items-center"><span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>MPC Control Simulator (Level 7)</li>
                                        <li className="flex items-center"><span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>Tesla-Style End-to-End Neural Driving Stack (Level 8)</li>
                                    </ul>
                                    <br />
                                    <strong className="text-lg">Who Is This Bootcamp For:</strong>
                                    <ul className="list-none mt-4 space-y-2">
                                        <li className="flex items-center">
                                            <span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>
                                            <div><span className="text-sm sm:text-base sm:font-bold">Students</span> - <span className="text-sm text-gray-600">Learn robotics, AI, and perception hands-on</span></div>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>
                                            <div><span className="text-sm sm:text-base sm:font-bold">Working Engineers</span> - <span className="text-sm text-gray-600">Upgrade to autonomy, AI-first planning, and ROS2 stacks</span></div>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>
                                            <div><span className="text-sm sm:text-base sm:font-bold">Career Changers</span> - <span className="text-sm text-gray-600">Build a real self-driving portfolio</span></div>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="hidden sm:inline text-green-500 mr-2">✅</span><span className="sm:hidden text-black mr-2">•</span>
                                            <div><span className="text-sm sm:text-base sm:font-bold">Entrepreneurs</span> - <span className="text-sm text-gray-600">Understand what it takes to prototype FSD systems</span></div>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <> ...</>
                            )}
                        </p>
                        <button 
                            onClick={toggleDescription} 
                            className="mt-2 text-base text-blue-400 rounded-md transition pl-2 cursor-pointer"
                        >
                            {showFullDescription ? 'Show Less' : 'Show More'}
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">👨‍🏫 Meet Your Instructor</h2>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Harpreet Singh</h3>
                        <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center pl-2"><ClockIcon className="w-4 h-4 mr-2" /><strong>5+ Years Experience</strong></p>
                        <p className="text-sm sm:text-base text-gray-500 mb-2 flex items-center pl-2"><UsersIcon className="w-4 h-4 mr-2" /><strong>35,466+ Learners</strong></p>
                        <p className="text-sm sm:text-base text-gray-700 pt-1">
                        Lead FSD Engineer with experience across robotics startups, AI research, and simulation engineering. Harpreet brings a hands-on, project-first style to make advanced self-driving tech intuitive and fun to build.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-8">Learners Also Bought</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <img 
                                    src="/aiAgentTemplate.jpeg" 
                                    alt="AI Agent Masterclass"
                                    className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
                                />
                                <div className="mt-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base">AI Agent Masterclass</p>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1">1275 learners • by Harpreet Singh</p>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">₹999</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <img 
                                    src="/industrialRobotTemplate.jpeg"
                                    alt="Robotic Arm Masterclass" 
                                    className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
                                />
                                <div className="mt-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base">Robotic Arm Masterclass</p>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1">1275 learners • by Harpreet Singh</p>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">₹999</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-3/10 hidden lg:block">
                    <div className="bg-white p-6 mt-20 rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-22">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Course Details</h2>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center text-sm sm:text-base">
                                <UsersIcon className="w-4 h-4 mr-3 text-gray-700" />
                                2,968 Learners enrolled
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <LevelIcon className="w-4 h-4 mr-3 text-gray-700" />
                                Advanced Level
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <DurationIcon className="w-4 h-4 mr-3 text-gray-700" />
                                1 hr of Content
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <LanguageIcon className="w-4 h-4 mr-3 text-gray-700" />
                                Tamil
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <AccessIcon className="w-4 h-4 mr-3 text-gray-700" />
                                1 Year Access
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <CertificateIcon className="w-4 h-4 mr-3 text-gray-700" />
                                Certificate of Completion
                            </li>
                        </ul>
                        <div className="mb-2">
                            <span className="text-xl sm:text-2xl font-bold text-green-600">₹4,999</span>
                            <span className="text-lg sm:text-xl text-gray-500 line-through ml-2">₹7,999</span>
                        </div>
                        <div className="text-sm text-red-500 mb-4">
                            Offer ends in {timeLeft.hours}hr {timeLeft.minutes}mins
                        </div>
                        <ShimmerButton className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base cursor-pointer">
                            Buy Now
                        </ShimmerButton>
                    </div>
                </div>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0">
                <div className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <div className="h-8 bg-red-100 mb-3 flex items-center justify-center">
                        <div className="text-md text-red-500">
                            {timeLeft.hours}hr {timeLeft.minutes}min left
                        </div>
                    </div>
                    <div className="flex p-2">
                        <div className="w-[40%] flex flex-col justify-center items-end pr-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-green-600">₹4,999</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 line-through">₹7,999</span>
                                <span className="text-xs text-green-600">38% off</span>
                            </div>
                        </div>
                        <div className="w-[60%]">
                            <ShimmerButton className="w-full bg-blue-600 text-white py-2 px-4 rounded-none hover:bg-blue-700 transition duration-300 text-lg font-medium cursor-pointer">
                                Buy Now
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}