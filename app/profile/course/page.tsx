import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import { Calendar as CalendarIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import RequestCertificateButton from '../../../components/profile/RequestCertificateButton';

interface Lesson {
  lesson_name: string;
  recording_url: string;
}

interface Course {
  course_name: string;
  course_start_date: string;
  lessons: Lesson[];
}

const courseImages: Record<string, string> = {
  'Autonomous Car': '/autonomousCar.png',
  'AI Agent': '/aiAgent.png',
  'Robotic Arm': '/roboticArm.png',
  'Drones': '/drone.png',
};

async function fetchWithAuth(url: string) {
  const cookieHeader = cookies().toString();
  const res = await fetch(url, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function CourseDetailPage({ searchParams }: { searchParams: { course: string } }) {
  const courseName = searchParams.course;
  if (!courseName) {
    return <div className="flex items-center justify-center h-96 text-xl">No course specified.</div>;
  }
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;
  // Fetch all enrolled courses and find the one matching courseName
  const courses: Course[] = (await fetchWithAuth(`${baseUrl}/api/auth/my-courses`)) || [];
  const course = courses.find(c => c.course_name === courseName);
  if (!course) {
    return <div className="flex items-center justify-center h-96 text-xl">You are not enrolled in this course.</div>;
  }
  const totalLessons = course.lessons.length;
  const completedLessons = course.lessons.filter(l => l.recording_url && l.recording_url.trim() !== '').length;
  const completion = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const imageSrc = courseImages[course.course_name] || '/autonomousCar.png';
  const startDate = course.course_start_date ? new Date(course.course_start_date).toLocaleDateString() : 'N/A';

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-full md:w-64 h-40 rounded-xl overflow-hidden shadow-lg">
          <Image src={imageSrc} alt={course.course_name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{course.course_name}</h1>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <CalendarIcon className="h-4 w-4 text-[#df4271]" />
            Start Date: {startDate}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-[#df4271] to-[#ff4164] rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 min-w-[40px] text-right">{completion}% Complete</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <RequestCertificateButton courseName={course.course_name} enabled={completion === 100} />
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Lessons</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Lesson Name</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Recording</th>
            </tr>
          </thead>
          <tbody>
            {course.lessons.map((lesson, lidx) => (
              <tr key={lidx} className={lidx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 font-medium text-gray-800">{lesson.lesson_name}</td>
                <td className="py-2 px-4">
                  {lesson.recording_url && lesson.recording_url.trim() !== '' ? (
                    <Link
                      href={`/profile/recording?lesson=${lidx}&course=${encodeURIComponent(course.course_name)}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline focus:outline-none"
                    >
                      View Recording <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="text-gray-400">Not Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 