export interface AmbassadorApplication {
  id?: number;
  student_id: number;
  college_name: string;
  college_location: string;
  student_id_number: string;
  year_of_study: string;
  branch: string;
  phone_number: string;
  linkedin_profile?: string;
  why_ambassador: string;
  experience?: string;
  id_proof_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: Date;
  updated_at: Date;
}

export interface Ambassador {
  id: number;
  student_id: number;
  referral_code: string;
  status: 'active' | 'inactive';
  total_referrals: number;
  created_at: Date;
  updated_at: Date;
}

export interface ReferralEnrollment {
  id: number;
  ambassador_id: number;
  student_id: number;
  course_name: string;
  enrollment_date: Date;
  referral_code: string;
}

export interface AmbassadorStats {
  totalEnrollments: number;
  thisMonth: number;
  thisWeek: number;
}

export interface AmbassadorApplicationFormData {
  collegeName: string;
  collegeLocation: string;
  studentId: string;
  yearOfStudy: string;
  branch: string;
  phoneNumber: string;
  linkedinProfile?: string;
  whyAmbassador: string;
  experience?: string;
  idProofFile: File | null;
}


