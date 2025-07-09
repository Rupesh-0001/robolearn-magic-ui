'use client';
import { User as UserIcon, Calendar as CalendarIcon, BookOpen, GraduationCap, ChevronDown, ChevronUp, ExternalLink, X as XIcon, UserCircle2 } from 'lucide-react';
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
  user: User | null,
  courses: Course[],
  courseImages: Record<string, string>
}) {
  const router = useRouter();

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return <div className="flex justify-center items-center h-64">Redirecting to login...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      {/* Profile Header */}
      {/* <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] shadow flex flex-col sm:flex-row items-center gap-6 border border-gray-100">
        <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#df4271]/80 to-[#ff4164]/80 shadow-lg">
          <UserCircle2 className="h-14 w-14 text-white drop-shadow" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-2xl flex items-center gap-2 text-gray-800 mb-1">
            {user.name}
          </div>
          <div className="text-gray-600 flex items-center gap-2 mb-1">
            <UserIcon className="h-4 w-4 text-gray-400" />
            {user.email}
          </div>
          <div className="text-sm text-gray-500 capitalize flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-gray-400" />
            {user.role}
          </div>
        </div>
      </div> */}
      {/* Courses Section */}
      <div className="flex items-center gap-2">
        {/* <BookOpen className="h-6 w-6 text-[#df4271]" /> */}
        <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
      </div>
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          {/* <div className="mb-6">
            <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="60" fill="#f3f4f6" />
              <path d="M40 80c0-11 9-20 20-20s20 9 20 20" stroke="#df4271" strokeWidth="3" strokeLinecap="round" />
              <circle cx="60" cy="54" r="10" fill="#fff" stroke="#df4271" strokeWidth="3" />
            </svg>
          </div> */}
          <h3 className="text-xl font-semibold mb-2 text-gray-800">You are not enrolled in any courses yet.</h3>
          <p className="mb-6 text-gray-600">Start your learning journey by enrolling in one of our top courses!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-6">
            {/* Autonomous Car */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col mt-20">
              <div className="relative w-full h-48">
                <Image
                  src="/autonomousCar.png"
                  alt="Autonomous Car Course"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="font-bold text-xl mb-1 text-gray-800 flex items-center gap-2">
                  Autonomous Car Course
                </div>
                <div className="text-gray-500 mb-2 text-sm">Learn the future of mobility with hands-on projects and expert guidance.</div>
                <a
                  href="/courses/autonomous-car"
                  className="mt-4 inline-block bg-[#df4271] hover:bg-[#c41b4e] text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors text-center"
                >
                  Explore & Enroll
                </a>
              </div>
            </div>
            {/* AI Agent */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src="/aiAgent.png"
                  alt="AI Agent Course"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="font-bold text-xl mb-1 text-gray-800 flex items-center gap-2">
                  AI Agent Bootcamp
                </div>
                <div className="text-gray-500 mb-2 text-sm">Build full AI agents with perception, memory, reasoning, and planning.</div>
                <a
                  href="/courses/ai-agent"
                  className="mt-4 inline-block bg-[#df4271] hover:bg-[#c41b4e] text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors text-center"
                >
                  Explore & Enroll
                </a>
              </div>
            </div>
            {/* Robotic Arm */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src="/roboticArm.png"
                  alt="Robotic Arm Course"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="font-bold text-xl mb-1 text-gray-800 flex items-center gap-2">
                  Robotic Arm Bootcamp
                </div>
                <div className="text-gray-500 mb-2 text-sm">Design and build complete robots from mechanical body to control panel.</div>
                <a
                  href="/courses/robotic-arm"
                  className="mt-4 inline-block bg-[#df4271] hover:bg-[#c41b4e] text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors text-center"
                >
                  Explore & Enroll
                </a>
              </div>
            </div>
            {/* Drones */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src="/drone.png"
                  alt="Drones Course"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="font-bold text-xl mb-1 text-gray-800 flex items-center gap-2">
                  Drones Bootcamp
                </div>
                <div className="text-gray-500 mb-2 text-sm">Master drone technology, flight control, and real-world applications.</div>
                <a
                  href="/courses/drones"
                  className="mt-4 inline-block bg-[#df4271] hover:bg-[#c41b4e] text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors text-center"
                >
                  Explore & Enroll
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, idx) => {
            const imageSrc = courseImages[course.course_name] || '/autonomousCar.png';
            const startDate = course.course_start_date ? new Date(course.course_start_date).toLocaleDateString() : 'N/A';
            // Calculate completion percentage
            const totalLessons = course.lessons.length;
            const completedLessons = course.lessons.filter(l => l.recording_url && l.recording_url.trim() !== '').length;
            const completion = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:shadow-2xl transition-shadow duration-200 cursor-pointer"
                onClick={() => router.push(`/profile/course?course=${encodeURIComponent(course.course_name)}`)}
              >
                {/* Progress Bar */}
                <div className="px-5 pt-5 flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-gradient-to-r from-[#df4271] to-[#ff4164] rounded-full transition-all duration-500"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 min-w-[40px] text-right">{completion}%</span>
                </div>
                <div className="relative w-full h-48 group">
                  <Image
                    src={imageSrc}
                    alt={course.course_name}
                    fill
                    className="object-cover group-hover:brightness-90 transition"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between">
                    <span className="text-white font-bold text-lg drop-shadow flex items-center gap-2">
                      {course.course_name}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-gray-500 mb-2 text-sm flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-[#df4271]" />
                    Start Date: {startDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 