import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_ZzGJF9NIW5gX@ep-patient-wildflower-a89s31e9-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require');

export { sql };

// Database schema types based on your existing tables
export interface Student {
  student_id: number;
  name: string;
  email: string;
  phone_number?: string;
  password?: string;
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
      SELECT email FROM students WHERE email IN ('student@example.com', 'admin@example.com')
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

    // Insert some sample batches
    const existingBatches = await sql`
      SELECT course_name FROM batches WHERE course_name IN ('Autonomous Car Course', 'AI Agent Course')
    `;

    const existingBatchNames = existingBatches.map((batch: Record<string, unknown>) => batch.course_name as string);

    if (!existingBatchNames.includes('Autonomous Car Course')) {
      await sql`
        INSERT INTO batches (course_name, course_start_date, lessons)
        VALUES ('Autonomous Car Course', CURRENT_DATE, '[]'::jsonb)
      `;
    }

    if (!existingBatchNames.includes('AI Agent Course')) {
      await sql`
        INSERT INTO batches (course_name, course_start_date, lessons)
        VALUES ('AI Agent Course', CURRENT_DATE, '[]'::jsonb)
      `;
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
} 