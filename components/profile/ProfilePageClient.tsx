'use client';
import { User as UserIcon, Calendar as CalendarIcon, BookOpen, GraduationCap, ChevronDown, ChevronUp, ExternalLink, X as XIcon, UserCircle2, Play, Clock, Award, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

interface Lesson {
  lesson_name: string;
  recording_url: string;
}

interface Course {
  course_name: string;
  course_start_date: string;
  lessons: Lesson[];
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function ProfilePageClient({ user, courses, courseImages }: {
  user: User,
  courses: Course[],
  courseImages: Record<string, string>
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-20">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#df4271] via-[#ff4164] to-[#df4271] p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
                    <UserCircle2 className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
                  <div className="flex flex-col sm:flex-row items-center gap-3 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <UserIcon className="h-3 w-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Sparkles className="h-3 w-3 text-white" />
                  <span className="text-white font-medium text-sm">Active Learner</span>
                </div>
              </div>
            </div>
            {/* <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#df4271] mb-1">{courses.length}</div>
                  <div className="text-gray-600 text-sm">Enrolled Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#df4271] mb-1">
                    {courses.reduce((total, course) => total + course.lessons.length, 0)}
                  </div>
                  <div className="text-gray-600 text-sm">Total Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#df4271] mb-1">
                    {courses.reduce((total, course) => {
                      const completed = course.lessons.filter(l => l.recording_url && l.recording_url.trim() !== '').length;
                      return total + completed;
                    }, 0)}
                  </div>
                  <div className="text-gray-600 text-sm">Completed Lessons</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-[#df4271] to-[#ff4164] rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">My Learning Journey</h2>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#df4271] to-[#ff4164] rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-[#df4271] to-[#ff4164] rounded-full flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Start Your Learning Journey?</h3>
                <p className="text-gray-600 mb-8 text-lg">Choose from our cutting-edge robotics and AI courses to begin your transformation.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Autonomous Car */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#df4271]/20">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src="/autonomousCar.png"
                      alt="Autonomous Car Course"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                        <h4 className="font-bold text-gray-800 text-lg mb-1">Autonomous Car</h4>
                        <p className="text-gray-600 text-sm">Future of Mobility</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#df4271]" />
                        <span className="text-gray-600">8 Weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#df4271]" />
                        <span className="text-gray-600">Certificate</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">Learn the future of mobility with hands-on projects and expert guidance.</p>
                    <a
                      href="/courses/autonomous-car"
                      className="w-full bg-gradient-to-r from-[#df4271] to-[#ff4164] hover:from-[#c41b4e] hover:to-[#df4271] text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
                    >
                      Explore Course
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* AI Agent */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#df4271]/20">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src="/aiAgent.png"
                      alt="AI Agent Course"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                        <h4 className="font-bold text-gray-800 text-lg mb-1">AI Agent</h4>
                        <p className="text-gray-600 text-sm">Intelligent Systems</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#df4271]" />
                        <span className="text-gray-600">10 Weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#df4271]" />
                        <span className="text-gray-600">Certificate</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">Build full AI agents with perception, memory, reasoning, and planning.</p>
                    <a
                      href="/courses/ai-agent"
                      className="w-full bg-gradient-to-r from-[#df4271] to-[#ff4164] hover:from-[#c41b4e] hover:to-[#df4271] text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
                    >
                      Explore Course
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Robotic Arm */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#df4271]/20">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src="/roboticArm.png"
                      alt="Robotic Arm Course"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                        <h4 className="font-bold text-gray-800 text-lg mb-1">Robotic Arm</h4>
                        <p className="text-gray-600 text-sm">Industrial Automation</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#df4271]" />
                        <span className="text-gray-600">12 Weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#df4271]" />
                        <span className="text-gray-600">Certificate</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">Design and build complete robots from mechanical body to control panel.</p>
                    <a
                      href="/courses/robotic-arm"
                      className="w-full bg-gradient-to-r from-[#df4271] to-[#ff4164] hover:from-[#c41b4e] hover:to-[#df4271] text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
                    >
                      Explore Course
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Drones */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#df4271]/20">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src="/drone.png"
                      alt="Drones Course"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                        <h4 className="font-bold text-gray-800 text-lg mb-1">Drones</h4>
                        <p className="text-gray-600 text-sm">Aerial Technology</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#df4271]" />
                        <span className="text-gray-600">6 Weeks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#df4271]" />
                        <span className="text-gray-600">Certificate</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">Master drone technology, flight control, and real-world applications.</p>
                    <a
                      href="/courses/drones"
                      className="w-full bg-gradient-to-r from-[#df4271] to-[#ff4164] hover:from-[#c41b4e] hover:to-[#df4271] text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
                    >
                      Explore Course
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => {
              const imageSrc = courseImages[course.course_name] || '/CarCourse.jpg';
              const startDate = course.course_start_date ? new Date(course.course_start_date).toLocaleDateString() : 'N/A';
              const totalLessons = course.lessons.length;
              const completedLessons = course.lessons.filter(l => l.recording_url && l.recording_url.trim() !== '').length;
              const completion = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
              
              return (
                                 <div 
                   key={idx} 
                   className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#df4271]/20 cursor-pointer transform hover:-translate-y-1 mb-4"
                   onClick={() => router.push(`/profile/course?course=${encodeURIComponent(course.course_name)}`)}
                 >
                   {/* Course Image */}
                   <div className="relative w-full h-48 overflow-hidden">
                     <Image
                       src={imageSrc}
                       alt={course.course_name}
                       fill
                       className="object-cover group-hover:scale-110 transition-transform duration-300"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                   </div>

                   {/* Progress Bar */}
                   <div className="p-6 pb-2">
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-sm font-semibold text-gray-700">Progress</span>
                       <span className="text-sm font-bold text-[#df4271]">{completion}%</span>
                     </div>
                     <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                       <div
                         className="h-3 bg-gradient-to-r from-[#df4271] to-[#ff4164] rounded-full transition-all duration-500 ease-out"
                         style={{ width: `${completion}%` }}
                       />
                     </div>
                     <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                       <span>{completedLessons} of {totalLessons} lessons completed</span>
                     </div>
                   </div>

                   {/* Course Info */}
                   {/* <div className="px-6 pb-4">
                     <h3 className="font-bold text-gray-800 text-lg mb-2">{course.course_name}</h3>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <Play className="h-4 w-4 text-[#df4271]" />
                       <span>{totalLessons} Lessons</span>
                     </div>
                   </div> */}

                   {/* Course Details */}
                   <div className="p-4">
                     <div className="flex items-center gap-2 text-gray-600 mb-4">
                       <CalendarIcon className="h-4 w-4 text-[#df4271]" />
                       <span className="text-sm">Started: {startDate}</span>
                     </div>
                     
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                         <Award className="h-4 w-4 text-[#df4271]" />
                         <span>Certificate Ready</span>
                       </div>
                       <div className="flex items-center gap-2 text-[#df4271] group-hover:translate-x-1 transition-transform">
                         <span className="text-sm font-semibold">Continue Learning</span>
                         <ArrowRight className="h-4 w-4" />
                       </div>
                     </div>
                   </div>
                 </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 