# Ambassador System Setup Guide

This guide explains how to set up and use the College Ambassador system for RoboLearn.

## Overview

The Ambassador system allows college students to:
1. Apply to become ambassadors for RoboLearn
2. Generate referral links for the Autonomous Cars Masterclass
3. Track enrollments through their referral links
4. Earn rewards for successful referrals

## Database Setup

### 1. Initialize Ambassador Tables

**IMPORTANT**: Before using the ambassador system, you must initialize the database tables. Make a POST request to:

```
POST /api/init-ambassador-db
```

**Or use curl:**
```bash
curl -X POST http://localhost:3000/api/init-ambassador-db
```

**Note**: If you get an error saying "relation 'ambassador_applications' does not exist", it means the tables haven't been created yet. Run the initialization endpoint first.

This will create:
- `ambassador_applications` - Stores student applications
- `ambassadors` - Stores approved ambassadors
- `referral_enrollments` - Tracks enrollments through referrals

### 2. Database Schema

The system creates three main tables:

#### ambassador_applications
- Student application details
- College information
- ID proof uploads
- Application status (pending/approved/rejected)

#### ambassadors
- Approved ambassador records
- Unique referral codes
- Referral statistics

#### referral_enrollments
- Tracks all enrollments through referral links
- Links students to ambassadors
- Stores enrollment dates and course information

## User Flow

### 1. Student Application
1. Student visits `/ambassador` page
2. Fills out application form with college details
3. Uploads college ID proof
4. Submits application (status: pending)

### 2. Admin Review
1. Admin reviews applications at `/admin/ambassadors`
2. Approves or rejects applications
3. Approved students become ambassadors

### 3. Ambassador Dashboard
1. Approved ambassadors access their dashboard
2. Generate referral links for Autonomous Cars Masterclass
3. Share links with college friends
4. Track enrollment statistics

### 4. Referral Tracking
1. When someone enrolls using a referral link
2. System automatically tracks the enrollment via `/api/ambassador/track-enrollment`
3. Updates ambassador statistics and referral counts
4. Shows masterclass vs course enrollment breakdowns
5. Tracks monthly and weekly performance metrics

## API Endpoints

### Ambassador Routes
- `POST /api/ambassador/apply` - Submit application
- `GET /api/ambassador/status` - Check application status
- `POST /api/ambassador/generate-link` - Generate referral link
- `GET /api/ambassador/stats` - Get enrollment statistics
- `POST /api/ambassador/track-enrollment` - Track referral enrollment (called automatically)

### Admin Routes
- `GET /api/admin/ambassador-applications` - List all applications
- `POST /api/admin/ambassador-applications/approve` - Approve application
- `POST /api/admin/ambassador-applications/reject` - Reject application

### Setup Routes
- `POST /api/init-ambassador-db` - Initialize database tables

## Features

### Application Form
- College name and location
- Student ID and year of study
- Branch/department
- Phone number and LinkedIn profile
- Why they want to be an ambassador
- Relevant experience
- College ID proof upload

### Ambassador Dashboard
- Welcome section with personalized greeting
- Statistics cards (total, monthly, weekly enrollments)
- Referral link generation and sharing
- Social media sharing buttons (WhatsApp, Telegram, Email)
- How it works guide
- Pro tips for success

### Admin Interface
- View all applications with student details
- Approve/reject applications
- Track application statuses
- Manage ambassador approvals

## File Structure

```
app/
├── ambassador/
│   └── page.tsx                    # Ambassador landing page
├── admin/
│   └── ambassadors/
│       └── page.tsx                # Admin ambassador management
└── api/
    ├── ambassador/
    │   ├── apply/route.ts          # Submit application
    │   ├── status/route.ts         # Check status
    │   ├── generate-link/route.ts  # Generate referral link
    │   └── stats/route.ts          # Get statistics
    ├── admin/
    │   └── ambassador-applications/
    │       ├── route.ts            # List applications
    │       ├── approve/route.ts    # Approve application
    │       └── reject/route.ts     # Reject application
    └── init-ambassador-db/route.ts # Database setup

components/
├── ambassador/
│   ├── AmbassadorPageClient.tsx    # Main client component
│   ├── AmbassadorApplication.tsx   # Application form
│   ├── AmbassadorStatus.tsx        # Status display
│   └── AmbassadorDashboard.tsx     # Ambassador dashboard
└── admin/
    └── AmbassadorAdminClient.tsx   # Admin management interface

lib/
└── ambassador-db-setup.ts          # Database setup functions

types/
└── ambassador.ts                    # TypeScript interfaces
```

## Usage Instructions

### For Students
1. Visit `/ambassador` page
2. Log in to your account
3. Fill out the application form
4. Upload college ID proof
5. Submit and wait for approval (2-3 working days)
6. Once approved, access your dashboard
7. Generate and share referral links

### For Admins
1. Access `/admin/ambassadors` page
2. Review pending applications
3. Approve or reject applications
4. Monitor ambassador performance

### For Developers
1. Run database initialization
2. Test the application flow
3. Customize referral tracking logic
4. Add additional features as needed

## Customization

### Referral Link Format
The system generates referral links in the format:
```
/masterclasses/autonomous-car?ref=AMB{studentId}{timestamp}
```

### Implementing Referral Tracking
To track enrollments through referral links, integrate the tracking system:

#### **Method 1: Automatic URL Detection (Recommended)**
```typescript
import { extractReferralCodeFromCurrentPage } from '@/lib/referral-tracking';

// Extract referral code from current page URL
const referralCode = extractReferralCodeFromCurrentPage();

// Pass to your enrollment API
const response = await fetch('/api/post-payment', {
  method: 'POST',
  body: JSON.stringify({
    // ... other enrollment data
    referralCode: referralCode // Will be null if no referral code
  })
});
```

#### **Method 2: Manual Tracking**
```typescript
import { trackReferralEnrollment } from '@/lib/referral-tracking';

// Call this when a user enrolls in a course
await trackReferralEnrollment(referralCode, studentId, 'Autonomous Cars Masterclass');
```

**Integration Points:**
- Course enrollment completion
- User registration after clicking referral link
- Payment confirmation
- Course access activation

**Already Integrated:**
✅ Autonomous Cars Masterclass (Bootcamp page)
✅ Post-payment API endpoint
✅ Referral code extraction from URLs

### Statistics Tracking
Enrollment statistics are calculated and categorized:
- **Total Enrollments**: All time referrals
- **Masterclass Enrollments**: Autonomous Cars Masterclass referrals
- **Course Enrollments**: Other course referrals
- **Monthly**: Current month enrollments
- **Weekly**: Current week enrollments
- **Earnings**: Calculated based on tier (₹500-₹1000 per referral)

### File Uploads
Currently stores file paths. In production, integrate with:
- AWS S3
- Google Cloud Storage
- Azure Blob Storage

## Security Considerations

1. **Authentication**: All routes require user authentication
2. **Authorization**: Admin routes should check admin privileges
3. **File Uploads**: Validate file types and sizes
4. **Rate Limiting**: Implement on application submission
5. **Data Validation**: Validate all form inputs

## Future Enhancements

1. **Email Notifications**: Send status updates via email
2. **Reward System**: Implement commission/reward tracking
3. **Analytics Dashboard**: Detailed performance metrics
4. **Social Features**: Ambassador leaderboards
5. **Mobile App**: Native mobile application
6. **Integration**: Connect with existing CRM systems

## Troubleshooting

### Common Issues
1. **Database Tables Not Created**: Run `/api/init-ambassador-db`
   - Error: `relation "ambassador_applications" does not exist`
   - Solution: Initialize database tables first
2. **File Upload Failures**: Check file size and type restrictions
3. **Authentication Errors**: Ensure user is logged in
4. **Referral Links Not Working**: Check ambassador approval status
5. **Referral Counts Not Increasing**: 
   - Ensure referral tracking is implemented in enrollment flow
   - Check if `/api/ambassador/track-enrollment` is being called
   - Verify referral codes are being passed correctly in URLs

### Quick Fix Commands
```bash
# Initialize ambassador database tables
curl -X POST http://localhost:3000/api/init-ambassador-db

# Check if tables exist (will show error if not)
curl http://localhost:3000/api/ambassador/status
```

### Testing Referral System
```bash
# Test referral tracking with sample data
curl -X POST http://localhost:3000/api/ambassador/track-enrollment \
  -H "Content-Type: application/json" \
  -d '{"referralCode":"AMB123ABC","studentId":999,"courseName":"Test Course"}'

# Visit test page to verify referral code extraction
# http://localhost:3000/test-referral?ref=AMB123ABC
```

### Debug Mode
Enable console logging for debugging:
- Check browser console for errors
- Monitor network requests
- Verify database connections

## Support

For technical support or questions:
- Email: support@robolearn.in
- Check the application logs
- Review database connection settings
- Verify API endpoint configurations
