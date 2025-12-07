import { cookies, headers } from 'next/headers';
import { Calendar as CalendarIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import RequestCertificateButton from '../../../components/profile/RequestCertificateButton';

interface Lesson {
  lesson_name: string;
  recording_url: string;
  resource_url?: string;
}

interface Course {
  course_name: string;
  course_start_date: string;
  lessons: Lesson[];
}

async function fetchWithAuth(url: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  const res = await fetch(url, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function CourseDetailPage({ searchParams }: { searchParams: Promise<{ course: string }> }) {
  const { course: courseName } = await searchParams;
  if (!courseName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center max-w-md w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Course Specified</h1>
          <p className="text-gray-600 text-sm sm:text-base">Please select a course to view its details.</p>
        </div>
      </div>
    );
  }

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;
  
  // Fetch all enrolled courses and find the one matching courseName
  const courses: Course[] = (await fetchWithAuth(`${baseUrl}/api/auth/my-courses`)) || [];
  const course = courses.find(c => c.course_name === courseName);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center max-w-md w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Course Not Found</h1>
          <p className="text-gray-600 text-sm sm:text-base">You are not enrolled in this course.</p>
        </div>
      </div>
    );
  }

  // Determine total lessons based on course name
  const totalLessons = course.course_name === 'MERN - FSD' ? 36 : 25;
  const completedLessons = course.lessons.filter(l => l.recording_url && l.recording_url.trim() !== '').length;
  const completion = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const startDate = course.course_start_date ? new Date(course.course_start_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }) : 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-12">
      <div className="max-w-6xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                {course.course_name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-3 sm:mb-4">
                <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#df4271] flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">Start Date: {startDate}</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Course Progress</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-800">{completion}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                  <div
                    className="h-2 sm:h-3 bg-gradient-to-r from-[#df4271] to-[#ff4164] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 gap-1 sm:gap-0">
                  <span>{completedLessons} of {totalLessons} lessons completed</span>
                  <span>{totalLessons - completedLessons} lessons remaining</span>
                </div>
              </div>
            </div>
            <div className="lg:flex-shrink-0 arrow-pointer">
              <RequestCertificateButton courseName={course.course_name} enabled={completion === 100} />
            </div>
          </div>
        </div>

        {/* Lessons Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-[#df4271] to-[#ff4164] rounded-full flex-shrink-0"></div>
              <span>Course Lessons</span>
            </h2>
          </div>
          
          {/* Mobile Cards View */}
          <div className="block lg:hidden">
            {course.lessons.map((lesson, lidx) => (
              <div key={lidx} className="border-b border-gray-100 p-4 sm:p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{lesson.lesson_name}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">Recording:</span>
                    {lesson.recording_url && lesson.recording_url.trim() !== '' ? (
                      <Link
                        href={`/profile/recording?lesson=${lidx}&course=${encodeURIComponent(course.course_name)}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded text-xs font-medium hover:bg-blue-100 transition-colors duration-200"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-xs">Not Available</span>
                    )}
                  </div>
                  {lesson.resource_url && lesson.resource_url.trim() !== '' && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">Resources:</span>
                      <a
                        href={lesson.resource_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded text-xs font-medium hover:bg-green-100 transition-colors duration-200"
                      >
                        Download ZIP
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Lesson Name</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Recording</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Resources</th>
                </tr>
              </thead>
              <tbody>
                {course.lessons.map((lesson, lidx) => (
                  <tr 
                    key={lidx} 
                    className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                      lidx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-800">{lesson.lesson_name}</div>
                    </td>
                    <td className="py-4 px-6">
                      {lesson.recording_url && lesson.recording_url.trim() !== '' ? (
                        <Link
                          href={`/profile/recording?lesson=${lidx}&course=${encodeURIComponent(course.course_name)}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Recording
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-sm">Not Available</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {lesson.resource_url && lesson.resource_url.trim() !== '' ? (
                        <a
                          href={lesson.resource_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors duration-200"
                        >
                          Download ZIP
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 