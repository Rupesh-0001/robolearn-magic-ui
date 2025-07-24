import jwt from 'jsonwebtoken';
import { sql, User, StudentWithPassword } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthToken {
  user: User;
  iat: number;
  exp: number;
}

// Re-export User type from db.ts
export type { User } from './db';

// Generate JWT token
export function generateToken(user: User): string {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch {
    return null;
  }
}

// Authenticate user from database (using students table)
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const students = await sql`
      SELECT student_id, email, password, name, phone_number
      FROM students 
      WHERE email = ${email}
    ` as StudentWithPassword[];

    if (students.length === 0) {
      return null;
    }

    const student = students[0];

    // In production, you should hash passwords and compare hashes
    // For now, we'll do plain text comparison
    if (student.password === password) {
      // Determine role based on email (you can modify this logic)
      const role = student.email === 'admin@example.com' ? 'admin' : 'student';
      
      return {
        id: student.student_id,
        email: student.email,
        name: student.name,
        role: role,
        phone_number: student.phone_number
      };
    }

    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

// Get user by ID from database (using students table)
export async function getUserById(id: string): Promise<User | null> {
  try {
    const students = await sql`
      SELECT student_id, email, name, phone_number
      FROM students 
      WHERE student_id = ${parseInt(id)}
    ` as StudentWithPassword[];

    if (students.length === 0) {
      return null;
    }

    const student = students[0];
    const role = student.email === 'admin@example.com' ? 'admin' : 'student';
    
    return {
      id: student.student_id,
      email: student.email,
      name: student.name,
      role: role,
      phone_number: student.phone_number
    };
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}

// Create new student
export async function createUser(email: string, password: string, name: string, role: 'student' | 'admin' = 'student'): Promise<User | null> {
  try {
    const result = await sql`
      INSERT INTO students (email, password, name, phone_number)
      VALUES (${email}, ${password}, ${name}, '+1234567890')
      RETURNING student_id, email, name, phone_number
    ` as StudentWithPassword[];

    if (result.length === 0) {
      return null;
    }

    const student = result[0];
    return {
      id: student.student_id,
      email: student.email,
      name: student.name,
      role: role,
      phone_number: student.phone_number
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

// Update student
export async function updateUser(id: string): Promise<User | null> {
  try {
    // For now, just return the user as is since we're using a simple structure
    return getUserById(id);
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

// Delete student
export async function deleteUser(id: string): Promise<boolean> {
  try {
    await sql`
      DELETE FROM students WHERE student_id = ${parseInt(id)}
    `;
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
} 