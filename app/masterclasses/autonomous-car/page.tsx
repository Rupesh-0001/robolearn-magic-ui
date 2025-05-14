'use client';

import { useState } from 'react';

export default function AutonomousCarMasterclass() {
    const [openLecture, setOpenLecture] = useState<string | null>(null);

    const toggleLecture = (lectureId: string) => {
        setOpenLecture(openLecture === lectureId ? null : lectureId);
    };

    return (
        <div className="container mx-auto px-4 pt-16 mt-6 2xl:pb-8 pb-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <h1 className="text-4xl font-bold mb-8">Autonomous Car Masterclass</h1>
                    
                    <div className="mb-12">
                        <img 
                            src="/autonomousCarMasterclassTemplate.jpeg"
                            alt="Autonomous Car" 
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="flex items-start">
                                <span className="mr-2 mt-1">•</span>
                                <span>How to build a lane detection system from scratch using only raw Python + NumPy</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 mt-1">•</span>
                                <span>Fundamentals of computer vision and image processing techniques used in FSD systems</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 mt-1">•</span>
                                <span>Principles of trajectory generation and basic path planning for vehicle movement</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 mt-1">•</span>
                                <span>Introduction to deep learning approaches used in Tesla-style perception pipelines, and basics of sensor fusion</span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg  mb-8">
                        <h2 className="text-2xl  font-semibold mb-4">Course Overview</h2>
                        <div className="space-y-4 ml-2">
                            <div className="border rounded-lg p-1">
                                <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none ${openLecture === 'intro' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('intro')}>
                                    Introduction to Autonomous Vehicles
                                </button>
                                <div className={`px-4 py-2 ${openLecture === 'intro' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-5">
                                        <li>Overview of autonomous vehicle technology</li>
                                        <li>Key components and systems</li>
                                        <li>Current state of the industry</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border rounded-lg">
                                <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none ${openLecture === 'perception' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('perception')}>
                                    Perception Systems
                                </button>
                                <div className={`px-4 py-2 ${openLecture === 'perception' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-5">
                                        <li>Computer vision techniques</li>
                                        <li>Sensor fusion algorithms</li>
                                        <li>Object detection and tracking</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border rounded-lg">
                                <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none ${openLecture === 'planning' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('planning')}>
                                    Path Planning and Decision Making
                                </button>
                                <div className={`px-4 py-2 ${openLecture === 'planning' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-5">
                                        <li>Route planning algorithms</li>
                                        <li>Behavior prediction</li>
                                        <li>Decision-making frameworks</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border rounded-lg">
                                <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none ${openLecture === 'control' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('control')}>
                                    Vehicle Control Systems
                                </button>
                                <div className={`px-4 py-2 ${openLecture === 'control' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-5">
                                        <li>Steering and acceleration control</li>
                                        <li>Vehicle dynamics</li>
                                        <li>Safety systems integration</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border rounded-lg">
                                <button className={`w-full text-left px-4 py-2 font-semibold focus:outline-none ${openLecture === 'ethics' ? 'text-blue-600' : ''}`} onClick={() => toggleLecture('ethics')}>
                                    Ethics and Regulations
                                </button>
                                <div className={`px-4 py-2 ${openLecture === 'ethics' ? '' : 'hidden'}`}>
                                    <ul className="list-disc pl-5">
                                        <li>Ethical considerations in autonomous driving</li>
                                        <li>Current and future regulations</li>
                                        <li>Societal impact of autonomous vehicles</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h2 className="text-2xl font-semibold mb-4">About the Course</h2>
                        <p className="text-gray-700 leading-relaxed">
                            This comprehensive masterclass will take you through the exciting world of autonomous vehicles. 
                            From understanding basic concepts to implementing advanced algorithms, you'll gain hands-on 
                            experience with industry-standard tools and technologies. Whether you're a beginner or an 
                            experienced engineer, this course will help you develop the skills needed to contribute to 
                            the future of autonomous transportation.
                        </p>
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow mb-8 lg:sticky lg:top-8">
                        <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center">
                                <span className="mr-2">•</span>
                                2,968 Learners enrolled
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Advanced Level
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">•</span>
                                1 hr of Content
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Tamil
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">•</span>
                                1 Year Access
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Certificate of Completion
                            </li>
                        </ul>
                        <div className="text-2xl font-bold mb-4">₹999</div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}