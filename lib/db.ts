import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_ZzGJF9NIW5gX@ep-jolly-cherry-a8gnw1pc-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require');

export { sql };

// Database schema types based on your existing tables
export interface Student {
  student_id: number;
  name: string;
  email: string;
  phone_number?: string;
  password?: string;
  reset_token?: string;
  reset_token_expiry?: Date;
}

export interface StudentWithPassword extends Student {
  password: string;
}

export interface Batch {
  batch_id: number;
  course_name: string;
  course_start_date: Date;
  lessons: Lesson[]; // JSONB field - array of lessons
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  resourceUrl?: string;
}

export interface Enrollment {
  enrollment_id: number;
  student_id: number;
  batch_id: number;
  payment_amount: number;
  joined_date: Date;
  masterclass_date?: Date;
}

// For authentication, we'll use the students table
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'student' | 'admin';
  phone_number?: string;
}

export interface UserWithPassword extends User {
  password: string;
}

// Database query result types
export interface StudentQueryResult {
  email: string;
}

export interface BatchQueryResult {
  course_name: string;
}

// Initialize database with default data
export async function initDatabase() {
  try {
    // Insert default students if they don't exist
    const existingStudents = await sql`
      SELECT email FROM students WHERE email IN ('student@example.com', 'admin@example.com', 'hemant@example.com')
    `;

    const existingEmails = existingStudents.map((student: Record<string, unknown>) => student.email as string);

    if (!existingEmails.includes('student@example.com')) {
      await sql`
        INSERT INTO students (name, email, phone_number, password)
        VALUES ('John Student', 'student@example.com', '+1234567890', 'password123')
      `;
    }

    if (!existingEmails.includes('admin@example.com')) {
      await sql`
        INSERT INTO students (name, email, phone_number, password)
        VALUES ('Admin User', 'admin@example.com', '+1234567891', 'admin123')
      `;
    }

    if (!existingEmails.includes('hemant@example.com')) {
      await sql`
        INSERT INTO students (name, email, phone_number, password)
        VALUES ('Hemant Garg', 'hemant@example.com', '+1234567892', 'password123')
      `;
    }

    // Insert some sample batches with lessons
    const existingBatches = await sql`
      SELECT course_name FROM batches WHERE course_name IN ('Autonomous Car Course', 'AI Agent Course', 'MERN - FSD')
    `;

    const existingBatchNames = existingBatches.map((batch: Record<string, unknown>) => batch.course_name as string);

    let autonomousCarBatchId: number;
    if (!existingBatchNames.includes('Autonomous Car Course')) {
      const autonomousCarBatch = await sql`
        INSERT INTO batches (course_name, course_start_date, lessons)
        VALUES ('Autonomous Car Course', CURRENT_DATE, '[]'::jsonb)
        RETURNING batch_id
      `;
      autonomousCarBatchId = autonomousCarBatch[0].batch_id;
    } else {
      const existingBatch = await sql`
        SELECT batch_id FROM batches WHERE course_name = 'Autonomous Car Course'
      `;
      autonomousCarBatchId = existingBatch[0].batch_id;
    }

    let aiAgentBatchId: number;
    if (!existingBatchNames.includes('AI Agent Course')) {
      const aiAgentBatch = await sql`
        INSERT INTO batches (course_name, course_start_date, lessons)
        VALUES ('AI Agent Course', CURRENT_DATE, '[]'::jsonb)
        RETURNING batch_id
      `;
      aiAgentBatchId = aiAgentBatch[0].batch_id;
    } else {
      const existingBatch = await sql`
        SELECT batch_id FROM batches WHERE course_name = 'AI Agent Course'
      `;
      aiAgentBatchId = existingBatch[0].batch_id;
    }

    let mernStackBatchId: number;
    if (!existingBatchNames.includes('MERN - FSD')) {
      const mernStackBatch = await sql`
        INSERT INTO batches (course_name, course_start_date, lessons)
        VALUES ('MERN - FSD', CURRENT_DATE, '[]'::jsonb)
        RETURNING batch_id
      `;
      mernStackBatchId = mernStackBatch[0].batch_id;
    } else {
      const existingBatch = await sql`
        SELECT batch_id FROM batches WHERE course_name = 'MERN - FSD'
      `;
      mernStackBatchId = existingBatch[0].batch_id;
    }

    // Add sample lessons to Autonomous Car Course (24 lessons)
    // const autonomousCarLessons = [
    //   {
    //     id: '1',
    //     title: 'Introduction to Autonomous Vehicles',
    //     description: 'Overview of autonomous vehicle technology and applications',
    //     videoUrl: 'https://example.com/video1.mp4',
    //     duration: 45
    //   },
    //   {
    //     id: '2',
    //     title: 'Sensor Systems and Perception',
    //     description: 'Understanding lidar, radar, and camera systems',
    //     videoUrl: 'https://example.com/video2.mp4',
    //     duration: 60
    //   },
    //   {
    //     id: '3',
    //     title: 'Path Planning and Navigation',
    //     description: 'Algorithms for route planning and obstacle avoidance',
    //     videoUrl: 'https://example.com/video3.mp4',
    //     duration: 75
    //   },
    //   {
    //     id: '4',
    //     title: 'Computer Vision Fundamentals',
    //     description: 'Image processing and object detection techniques',
    //     videoUrl: 'https://example.com/video4.mp4',
    //     duration: 50
    //   },
    //   {
    //     id: '5',
    //     title: 'Machine Learning for Autonomous Systems',
    //     description: 'Neural networks and deep learning applications',
    //     videoUrl: 'https://example.com/video5.mp4',
    //     duration: 65
    //   },
    //   {
    //     id: '6',
    //     title: 'Control Systems and PID Controllers',
    //     description: 'Understanding feedback control mechanisms',
    //     videoUrl: 'https://example.com/video6.mp4',
    //     duration: 55
    //   },
    //   {
    //     id: '7',
    //     title: 'Localization and Mapping (SLAM)',
    //     description: 'Simultaneous localization and mapping techniques',
    //     videoUrl: 'https://example.com/video7.mp4',
    //     duration: 70
    //   },
    //   {
    //     id: '8',
    //     title: 'Vehicle Dynamics and Kinematics',
    //     description: 'Understanding vehicle motion and physics',
    //     videoUrl: 'https://example.com/video8.mp4',
    //     duration: 60
    //   },
    //   {
    //     id: '9',
    //     title: 'Traffic Sign Recognition',
    //     description: 'Detecting and interpreting road signs',
    //     videoUrl: 'https://example.com/video9.mp4',
    //     duration: 45
    //   },
    //   {
    //     id: '10',
    //     title: 'Lane Detection and Tracking',
    //     description: 'Identifying and following road lanes',
    //     videoUrl: 'https://example.com/video10.mp4',
    //     duration: 55
    //   },
    //   {
    //     id: '11',
    //     title: 'Obstacle Detection and Avoidance',
    //     description: 'Identifying and avoiding obstacles',
    //     videoUrl: 'https://example.com/video11.mp4',
    //     duration: 65
    //   },
    //   {
    //     id: '12',
    //     title: 'Trajectory Planning',
    //     description: 'Planning optimal paths for autonomous vehicles',
    //     videoUrl: 'https://example.com/video12.mp4',
    //     duration: 70
    //   },
    //   {
    //     id: '13',
    //     title: 'Vehicle-to-Vehicle Communication',
    //     description: 'Communication protocols between autonomous vehicles',
    //     videoUrl: 'https://example.com/video13.mp4',
    //     duration: 50
    //   },
    //   {
    //     id: '14',
    //     title: 'Safety Systems and Fail-Safes',
    //     description: 'Implementing safety mechanisms and backup systems',
    //     videoUrl: 'https://example.com/video14.mp4',
    //     duration: 60
    //   },
    //   {
    //     id: '15',
    //     title: 'Testing and Validation',
    //     description: 'Methods for testing autonomous vehicle systems',
    //     videoUrl: 'https://example.com/video15.mp4',
    //     duration: 55
    //   },
    //   {
    //     id: '16',
    //     title: 'Regulatory Compliance',
    //     description: 'Understanding legal requirements for autonomous vehicles',
    //     videoUrl: 'https://example.com/video16.mp4',
    //     duration: 45
    //   },
    //   {
    //     id: '17',
    //     title: 'Ethical Considerations in AI',
    //     description: 'Ethical implications of autonomous vehicle decisions',
    //     videoUrl: 'https://example.com/video17.mp4',
    //     duration: 50
    //   },
    //   {
    //     id: '18',
    //     title: 'Data Management and Privacy',
    //     description: 'Handling sensitive data in autonomous systems',
    //     videoUrl: 'https://example.com/video18.mp4',
    //     duration: 55
    //   },
    //   {
    //     id: '19',
    //     title: 'System Integration',
    //     description: 'Integrating multiple subsystems into a cohesive whole',
    //     videoUrl: 'https://example.com/video19.mp4',
    //     duration: 70
    //   },
    //   {
    //     id: '20',
    //     title: 'Environmental Impact Assessment',
    //     description: 'Evaluating the environmental impact of autonomous vehicles',
    //     videoUrl: 'https://example.com/video20.mp4',
    //     duration: 45
    //   },
    //   {
    //     id: '21',
    //     title: 'Future Trends in Autonomous Technology',
    //     description: 'Exploring emerging technologies and future developments',
    //     videoUrl: 'https://example.com/video21.mp4',
    //     duration: 65
    //   },
    //   {
    //     id: '22',
    //     title: 'Industry Case Studies',
    //     description: 'Real-world applications and success stories',
    //     videoUrl: 'https://example.com/video22.mp4',
    //     duration: 70
    //   },
    //   {
    //     id: '23',
    //     title: 'Capstone Project Planning',
    //     description: 'Planning and designing your final autonomous vehicle project',
    //     videoUrl: 'https://example.com/video23.mp4',
    //     duration: 75
    //   },
    //   {
    //     id: '24',
    //     title: 'Final Project Implementation',
    //     description: 'Building and testing your complete autonomous vehicle system',
    //     videoUrl: 'https://example.com/video24.mp4',
    //     duration: 80
    //   }
    // ];

    // await sql`
    //   UPDATE batches 
    //   SET lessons = ${JSON.stringify(autonomousCarLessons)}::jsonb
    //   WHERE batch_id = ${autonomousCarBatchId}
    // `;

    // Add sample lessons to AI Agent Course
    const aiAgentLessons = [
      {
        id: '1',
        title: 'Introduction to AI Agents',
        description: 'Fundamentals of artificial intelligence and agent systems',
        videoUrl: 'https://example.com/ai-video1.mp4',
        duration: 50
      },
      {
        id: '2',
        title: 'Natural Language Processing',
        description: 'Building conversational AI capabilities',
        videoUrl: 'https://example.com/ai-video2.mp4',
        duration: 65
      },
      {
        id: '3',
        title: 'Reinforcement Learning',
        description: 'Training agents through trial and error',
        videoUrl: 'https://example.com/ai-video3.mp4',
        duration: 80
      }
    ];

    await sql`
      UPDATE batches 
      SET lessons = ${JSON.stringify(aiAgentLessons)}::jsonb
      WHERE batch_id = ${aiAgentBatchId}
    `;

    // Add sample lessons to MERN Stack Course
    const mernStackLessons = [
      {
        id: '1',
        title: 'Introduction to MERN Stack',
        description: 'Overview of MongoDB, Express, React, and Node.js',
        videoUrl: 'https://example.com/mern-video1.mp4',
        duration: 50
      },
      {
        id: '2',
        title: 'Frontend Development with React',
        description: 'Building modern user interfaces with React',
        videoUrl: 'https://example.com/mern-video2.mp4',
        duration: 65
      },
      {
        id: '3',
        title: 'Backend Development with Node.js and Express',
        description: 'Creating RESTful APIs and server-side logic',
        videoUrl: 'https://example.com/mern-video3.mp4',
        duration: 80
      }
    ];

    await sql`
      UPDATE batches 
      SET lessons = ${JSON.stringify(mernStackLessons)}::jsonb
      WHERE batch_id = ${mernStackBatchId}
    `;

    // Create enrollment for hemant@example.com in Autonomous Car Course
    const hemantStudent = await sql`
      SELECT student_id FROM students WHERE email = 'hemant@example.com'
    `;

    if (hemantStudent.length > 0) {
      const existingEnrollment = await sql`
        SELECT enrollment_id FROM enrollments 
        WHERE student_id = ${hemantStudent[0].student_id} AND batch_id = ${autonomousCarBatchId}
      `;

      if (existingEnrollment.length === 0) {
        await sql`
          INSERT INTO enrollments (student_id, batch_id, payment_amount, joined_date)
          VALUES (${hemantStudent[0].student_id}, ${autonomousCarBatchId}, 9999, CURRENT_DATE)
        `;
      }
    }

    console.log('Database initialized successfully with sample data');
    console.log('Batch IDs:', { autonomousCarBatchId, aiAgentBatchId, mernStackBatchId });

  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
} 
