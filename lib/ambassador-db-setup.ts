import { sql } from './db';

export async function setupAmbassadorTables() {
  try {
    console.log('Setting up ambassador tables...');

    // Create ambassador_applications table
    await sql`
      CREATE TABLE IF NOT EXISTS ambassador_applications (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(student_id),
        college_name VARCHAR(255) NOT NULL,
        college_location VARCHAR(255) NOT NULL,
        student_id_number VARCHAR(100) NOT NULL,
        year_of_study VARCHAR(50) NOT NULL,
        branch VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        linkedin_profile VARCHAR(255),
        why_ambassador TEXT NOT NULL,
        experience TEXT,
        id_proof_url VARCHAR(500),
        status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, status)
      )
    `;

    // Create ambassadors table
    await sql`
      CREATE TABLE IF NOT EXISTS ambassadors (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(student_id),
        referral_code VARCHAR(100) UNIQUE,
        status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        total_referrals INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id)
      )
    `;

    // Create referral_enrollments table
    await sql`
      CREATE TABLE IF NOT EXISTS referral_enrollments (
        id SERIAL PRIMARY KEY,
        ambassador_id INTEGER NOT NULL REFERENCES ambassadors(id),
        student_id INTEGER NOT NULL REFERENCES students(student_id),
        course_name VARCHAR(100) NOT NULL,
        enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        referral_code VARCHAR(100) NOT NULL
      )
    `;

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_ambassador_applications_student_id ON ambassador_applications(student_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_ambassador_applications_status ON ambassador_applications(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_ambassadors_student_id ON ambassadors(student_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_ambassadors_referral_code ON ambassadors(referral_code)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_referral_enrollments_ambassador_id ON referral_enrollments(ambassador_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_referral_enrollments_enrollment_date ON referral_enrollments(enrollment_date)`;

    console.log('Ambassador tables setup completed successfully!');
  } catch (error) {
    console.error('Error setting up ambassador tables:', error);
    throw error;
  }
}

// Function to approve an ambassador application (for admin use)
export async function approveAmbassadorApplication(applicationId: number) {
  try {
    // Get application details
    const application = await sql`
      SELECT student_id FROM ambassador_applications 
      WHERE id = ${applicationId} AND status = 'pending'
    `;

    if (application.length === 0) {
      throw new Error('Application not found or not pending');
    }

    const studentId = application[0].student_id;

    // Update application status to approved
    await sql`
      UPDATE ambassador_applications 
      SET status = 'approved', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${applicationId}
    `;

    // Create ambassador record
    await sql`
      INSERT INTO ambassadors (student_id, status, created_at, updated_at)
      VALUES (${studentId}, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    console.log(`Ambassador application ${applicationId} approved successfully`);
    return true;
  } catch (error) {
    console.error('Error approving ambassador application:', error);
    throw error;
  }
}

// Function to reject an ambassador application (for admin use)
export async function rejectAmbassadorApplication(applicationId: number, _reason?: string) {
  try {
    await sql`
      UPDATE ambassador_applications 
      SET status = 'rejected', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${applicationId}
    `;

    console.log(`Ambassador application ${applicationId} rejected`);
    return true;
  } catch (error) {
    console.error('Error rejecting ambassador application:', error);
    throw error;
  }
}

// Function to track referral enrollment
export async function trackReferralEnrollment(ambassadorId: number, studentId: number, courseName: string, referralCode: string) {
  try {
    await sql`
      INSERT INTO referral_enrollments (ambassador_id, student_id, course_name, referral_code)
      VALUES (${ambassadorId}, ${studentId}, ${courseName}, ${referralCode})
    `;

    // Update ambassador's total referrals count
    await sql`
      UPDATE ambassadors 
      SET total_referrals = total_referrals + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${ambassadorId}
    `;

    console.log(`Referral enrollment tracked for ambassador ${ambassadorId}`);
    return true;
  } catch (error) {
    console.error('Error tracking referral enrollment:', error);
    throw error;
  }
}


