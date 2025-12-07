// import VideoModal from '../../components/ui/VideoModal';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
// import Image from 'next/image';
import ProfilePageClient from '../../components/profile/ProfilePageClient';

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

const courseImages: Record<string, string> = {
  'Autonomous Car': '/CarCourse.png',
  'Autonomous Car Course': '/autonomousCar.png',
  'MERN - FSD': '/mernCourse.JPG',
  'AI Agent Course': '/aiAgent.png',
  'Robotic Arm Course': '/roboticArm.png',
  'Drones Course': '/drone.png',
  // Add more course name to image mappings here
};

export default async function ProfilePage() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const userData = await fetchWithAuth(`${baseUrl}/api/auth/me`);
  
  // If no user is authenticated, redirect to login
  if (!userData?.user) {
    redirect('/');
  }

  const courses: Course[] = (await fetchWithAuth(`${baseUrl}/api/auth/my-courses`)) || [];
  const user: User = userData.user;

  return <ProfilePageClient user={user} courses={courses} courseImages={courseImages} />;
} 