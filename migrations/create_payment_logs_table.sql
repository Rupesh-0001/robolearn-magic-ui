-- Create payment_logs table for tracking processed payments and preventing duplicates
CREATE TABLE IF NOT EXISTS payment_logs (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(255) UNIQUE NOT NULL,
    order_id VARCHAR(255) NOT NULL,
    student_id INTEGER NOT NULL,
    enrollment_id INTEGER,
    amount INTEGER NOT NULL,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_payment_logs_payment_id ON payment_logs(payment_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_student_id ON payment_logs(student_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_processed_at ON payment_logs(processed_at);

-- Add foreign key constraints if tables exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'students') THEN
        ALTER TABLE payment_logs ADD CONSTRAINT fk_payment_logs_student_id 
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'enrollments') THEN
        ALTER TABLE payment_logs ADD CONSTRAINT fk_payment_logs_enrollment_id 
        FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id) ON DELETE SET NULL;
    END IF;
END $$;
