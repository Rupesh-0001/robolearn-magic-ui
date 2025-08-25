-- Setup test ambassador for referral tracking testing
-- Run this in your database to create a test ambassador

-- First, ensure we have a test student
INSERT INTO students (name, email, phone_number, password) 
VALUES ('Test Ambassador', 'ambassador@test.com', '9876543210', 'password123')
ON CONFLICT (email) DO NOTHING;

-- Get the student ID
DO $$
DECLARE
    student_id INTEGER;
BEGIN
    SELECT student_id INTO student_id FROM students WHERE email = 'ambassador@test.com';
    
    -- Create ambassador application
    INSERT INTO ambassador_applications (
        student_id, 
        college_name, 
        college_location, 
        student_id_number, 
        year_of_study, 
        branch, 
        phone_number, 
        why_ambassador, 
        status
    ) VALUES (
        student_id,
        'Test University',
        'Test City',
        'TEST123',
        '3rd Year',
        'Computer Science',
        '9876543210',
        'I want to help students learn AI',
        'approved'
    ) ON CONFLICT (student_id, status) DO NOTHING;
    
    -- Create ambassador record with referral code
    INSERT INTO ambassadors (
        student_id, 
        referral_code, 
        status, 
        total_referrals
    ) VALUES (
        student_id,
        'TEST123',
        'active',
        0
    ) ON CONFLICT (student_id) DO NOTHING;
    
    RAISE NOTICE 'Test ambassador created with ID: % and referral code: TEST123', student_id;
END $$;

-- Verify the setup
SELECT 
    s.name,
    s.email,
    aa.status as application_status,
    a.referral_code,
    a.status as ambassador_status,
    a.total_referrals
FROM students s
LEFT JOIN ambassador_applications aa ON s.student_id = aa.student_id
LEFT JOIN ambassadors a ON s.student_id = a.student_id
WHERE s.email = 'ambassador@test.com';


