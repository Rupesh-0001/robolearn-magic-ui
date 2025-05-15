'use client';

import { useState } from 'react';
import { ChevronUp as ChevronUpIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';

export default function AutonomousCarMasterclass() {
    const [openLecture, setOpenLecture] = useState<string | null>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleLecture = (lectureId: string) => {
        setOpenLecture(openLecture === lectureId ? null : lectureId);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <main className="container mx-auto px-4 pt-16 mt-6 2xl:pb-8 pb-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Autonomous Car Masterclass</h1>
                    
                    <div className="mb-6 sm:mb-8 md:mb-12">
                        <img 
                            src="/autonomousCarMasterclassTemplate.jpeg"
                            alt="Autonomous Car" 
                            className="rounded-lg shadow-lg w-full h-auto"
                        />
                    </div>

                    <div className="lg:hidden mb-6 sm:mb-8">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Course Details</h2>
                            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                <li className="flex items-center text-sm sm:text-base">
                                    <span className="mr-2">•</span>
                                    2,968 Learners enrolled
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <span className="mr-2">•</span>
                                    Advanced Level
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <span className="mr-2">•</span>
                                    1 hr of Content
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <span className="mr-2">•</span>
                                    Tamil
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <span className="mr-2">•</span>
                                    1 Year Access
                                </li>
                                <li className="flex items-center text-sm sm:text-base">
                                    <span className="mr-2">•</span>
                                    Certificate of Completion
                                </li>
                            </ul>
                            <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">₹999</div>
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">👨‍🏫 Meet Your Instructor</h2>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Harpreet Singh</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-2"><strong>5+ Years Experience</strong> • <strong>35,466+ Learners</strong></p>
                        <p className="text-sm sm:text-base text-gray-700">
                            FSD & Robotics Engineer with expertise in AI-first planning, computer vision, and simulation. Harpreet has taught self-driving concepts globally through project-based learning.
                        </p>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">What You'll Learn</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <li className="flex items-start">
                                <span className="mr-2 mt-1 text-blue-500">✓</span>
                                <span className="text-sm sm:text-base">How to build a lane detection system from scratch using only raw Python + NumPy</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 mt-1 text-blue-500">✓</span>
                                <span className="text-sm sm:text-base">Fundamentals of computer vision and image processing techniques used in FSD systems</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 mt-1 text-blue-500">✓</span>
                                <span className="text-sm sm:text-base">Principles of trajectory generation and basic path planning for vehicle movement</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 mt-1 text-blue-500">✓</span>
                                <span className="text-sm sm:text-base">Introduction to deep learning approaches used in Tesla-style perception pipelines, and basics of sensor fusion</span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Course Overview</h2>
                        <div className="space-y-3 sm:space-y-4 ml-2">
                            <div className="border rounded-lg p-1">
                                <button className={`w-full text-left px-3 sm:px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${openLecture === 'intro' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('intro')}>
                                    <span className="text-sm sm:text-base">Introduction to Autonomous Vehicles</span>
                                    {openLecture === 'intro' ? <ChevronUpIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
                                </button>
                                <div className={`px-3 sm:px-4 py-2 ${openLecture === 'intro' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base">
                                        <li>Overview of autonomous vehicle technology</li>
                                        <li>Key components and systems</li>
                                        <li>Current state of the industry</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border rounded-lg p-1">
                                <button className={`w-full text-left px-3 sm:px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${openLecture === 'perception' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('perception')}>
                                    <span className="text-sm sm:text-base">Perception and Computer Vision</span>
                                    {openLecture === 'perception' ? <ChevronUpIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
                                </button>
                                <div className={`px-3 sm:px-4 py-2 ${openLecture === 'perception' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base">
                                        <li>Image processing techniques</li>
                                        <li>Object detection and tracking</li>
                                        <li>Lane detection algorithms</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border rounded-lg p-1">
                                <button className={`w-full text-left px-3 sm:px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${openLecture === 'planning' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('planning')}>
                                    <span className="text-sm sm:text-base">Path Planning and Decision Making</span>
                                    {openLecture === 'planning' ? <ChevronUpIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
                                </button>
                                <div className={`px-3 sm:px-4 py-2 ${openLecture === 'planning' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base">
                                        <li>Route planning algorithms</li>
                                        <li>Obstacle avoidance strategies</li>
                                        <li>Decision-making in complex scenarios</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border rounded-lg p-1">
                                <button className={`w-full text-left px-3 sm:px-4 py-2 font-semibold focus:outline-none flex justify-between items-center ${openLecture === 'control' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('control')}>
                                    <span className="text-sm sm:text-base">Vehicle Control Systems</span>
                                    {openLecture === 'control' ? <ChevronUpIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
                                </button>
                                <div className={`px-3 sm:px-4 py-2 ${openLecture === 'control' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base">
                                        <li>Steering and acceleration control</li>
                                        <li>PID controllers</li>
                                        <li>Advanced control techniques</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">About the Course</h2>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            This comprehensive masterclass will take you through the exciting world of autonomous vehicles. 
                            From understanding basic concepts to implementing advanced algorithms, you'll gain hands-on 
                            experience with industry-standard tools and technologies. Whether you're a beginner or an 
                            experienced engineer, this course will help you develop the skills needed to contribute to 
                            the future of autonomous transportation.
                            {showFullDescription ? (
                                <>
                                    Harpreet's unique teaching approach combines theoretical knowledge with practical 
                                    applications, ensuring you not only understand the concepts but can also apply them 
                                    in real-world scenarios. You'll work on projects inspired by actual challenges faced 
                                    in the autonomous vehicle industry, giving you valuable experience that translates 
                                    directly to your career.
                                </>
                            ) : (
                                <> ...</>
                            )}
                        </p>
                        <button 
                            onClick={toggleDescription} 
                            className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 hover:text-blue-800 transition duration-300"
                        >
                            {showFullDescription ? 'Show Less' : 'Show More'}
                        </button>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Learners Also Bought</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <img 
                                    src="/aiAgentTemplate.jpeg" 
                                    alt="AI Agent Masterclass"
                                    className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
                                />
                                <div className="mt-2 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base">AI Agent Masterclass</p>
                                        <p className="text-xs sm:text-sm text-gray-500">1275 learners • by Harpreet Singh</p>
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
                                <div className="mt-2 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base">Robotic Arm Masterclass</p>
                                        <p className="text-xs sm:text-sm text-gray-500">1275 learners • by Harpreet Singh</p>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">₹999</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/3 hidden lg:block">
                    <div className="bg-white p-4 sm:p-6 mt-6 lg:mt-20 rounded-lg shadow mb-6 sm:mb-8 lg:sticky lg:top-22">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Course Details</h2>
                        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            <li className="flex items-center text-sm sm:text-base">
                                <span className="mr-2">•</span>
                                2,968 Learners enrolled
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <span className="mr-2">•</span>
                                Advanced Level
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <span className="mr-2">•</span>
                                1 hr of Content
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <span className="mr-2">•</span>
                                Tamil
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <span className="mr-2">•</span>
                                1 Year Access
                            </li>
                            <li className="flex items-center text-sm sm:text-base">
                                <span className="mr-2">•</span>
                                Certificate of Completion
                            </li>
                        </ul>
                        <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">₹999</div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}