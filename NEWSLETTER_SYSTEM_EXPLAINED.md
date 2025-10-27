# 📧 RoboLearn Newsletter System - Complete Guide

## 🎯 What You Have Built

You have a **complete automated newsletter system** with 3 main components:

### 1. **Public Newsletter Page** (`/newsletter`)
   - Shows robotics news from the **last 30 days only**
   - Users can filter by category (Robotics, AI, Autonomous Vehicles, etc.)
   - Users can subscribe with their email
   - Beautiful, mobile-responsive design

### 2. **Email Subscription System**
   - Users enter their email to subscribe
   - Emails are stored in the database
   - Users can unsubscribe anytime
   - Tracks subscription preferences

### 3. **Automated Weekly Email Digest**
   - **Automatically sends emails every week** to all subscribers
   - Contains the **top 5 important news from the past week**
   - Beautifully formatted HTML emails
   - Includes article images, summaries, and "Read More" links

---

## 🔄 How The Complete System Works

### **User Journey:**

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER VISITS /newsletter PAGE                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. SEES LATEST ROBOTICS NEWS                                │
│    • Only news from last 30 days                            │
│    • Can filter by category                                  │
│    • Can click "Read More" to see full article              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. USER SUBSCRIBES WITH EMAIL                               │
│    • Enters email in subscription form                       │
│    • POST /api/newsletter/subscribe                          │
│    • Email saved to database                                 │
│    • Confirmation message shown                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. EVERY MONDAY (AUTOMATED)                                 │
│    • System fetches top 5 news from past week               │
│    • Creates beautiful HTML email                            │
│    • Sends to ALL subscribed users                           │
│    • User receives "Weekly Robotics Update" email            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Key Files & Their Purpose

### **Frontend (What Users See)**
```
/app/newsletter/page.tsx
├─ Hero section with subscription benefits
├─ Newsletter subscription form
├─ Latest news articles (filtered by date)
└─ Category filters

/components/ui/NewsletterSubscription.tsx
└─ The subscription form component

/components/ui/NewsArticles.tsx
└─ Displays news articles in a grid
```

### **Backend (APIs)**
```
/api/newsletter/subscribe         → Subscribe user
/api/newsletter/articles          → Get news (max 1 month old) ✅ FIXED
/api/newsletter/fetch-daily-news  → Fetch new articles from APIs ✅ FIXED
/api/newsletter/send              → Send newsletter manually
/api/newsletter/cron/send-weekly  → AUTOMATED weekly email sender
```

---

## 🤖 How News is Fetched & Managed

### **Admin Fetches News:**
```
1. Admin goes to /admin → Newsletter tab
2. Clicks "Fetch Daily News"
3. System calls NewsAPI & GNews APIs
4. Fetches robotics/AI/autonomous vehicle news
5. Validates URLs (only valid http/https links) ✅ FIXED
6. Removes duplicates
7. Stores in database
```

### **Database Stores:**
- Article title, content, summary
- Source name & URL
- Category (robotics, ai, drones, etc.)
- Published date
- Is it featured? (for highlighting important news)
- Tags

---

## 📧 How Weekly Emails Work

### **Automated Weekly Email Process:**

**File:** `/api/newsletter/cron/send-weekly/route.ts`

```
EVERY MONDAY MORNING:
├─ 1. Check if email already sent this week
├─ 2. Get TOP 5 FEATURED articles from past 7 days
├─ 3. If no featured articles, get latest 5 articles
├─ 4. Create newsletter issue with title:
│     "Weekly Robotics Update - January 1, 2025"
├─ 5. Get ONLY ENROLLED subscribers from database ✅ NEW
│     • Joins newsletter_subscriptions with students table
│     • Joins with enrollments table (must have enrollment)
│     • Checks is_active = true
│     • If student deleted, they won't appear
├─ 6. Generate beautiful HTML email with:
│     • Article images
│     • Titles & summaries
│     • "Read Full Article" buttons
│     • Unsubscribe link
├─ 7. Send email to all enrolled subscribers in batches
└─ 8. Mark newsletter as "sent"
```

### **Email Content Includes:**
✅ **Header:** "🤖 RoboLearn Weekly Newsletter"  
✅ **Greeting:** "Hello [Name]!"  
✅ **5 News Articles** with images, summaries, and links  
✅ **CTA:** "Explore Our Courses" link  
✅ **Footer:** Unsubscribe link  

---

## 🚀 How To Use Your System

### **Step 1: Initialize Database (One Time Only)**
```bash
curl -X POST http://localhost:3000/api/init-newsletter-db
```
This creates all necessary tables.

### **Step 2: Fetch News Articles**
**Option A: Manual (Admin)**
1. Go to `/admin`
2. Click "Newsletter" tab
3. Click "Fetch Daily News"
4. System fetches latest news from APIs

**Option B: Automated Daily Fetch**
Set up a cron job to call:
```
GET /api/newsletter/cron/daily-news
Header: Authorization: Bearer YOUR_CRON_SECRET
```

### **Step 3: Set Up Weekly Email Automation**

**You need to set up a cron job that calls:**
```
GET /api/newsletter/cron/send-weekly
Header: Authorization: Bearer YOUR_CRON_SECRET
Environment: CRON_SECRET=your-secret-key
```

**Options for Automation:**

#### **Option A: Vercel Cron (Recommended)**
Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/newsletter/cron/send-weekly",
    "schedule": "0 9 * * 1"
  }]
}
```
Schedule: Every Monday at 9 AM

#### **Option B: External Cron Service**
Use services like:
- **cron-job.org**
- **EasyCron.com**
- **Your own server cron**

Set to call your endpoint every Monday at 9 AM.

### **Step 4: Test Email Sending**
```bash
# Send test email to specific address
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Content-Type: application/json" \
  -d '{
    "issueId": 1,
    "testEmail": "your-email@example.com"
  }'
```

---

## ✅ What I Fixed Today

### **1. News Articles Repeating** ✅ FIXED
- **Problem:** SQL queries were broken, causing duplicates
- **Solution:** Rewrote queries with proper Neon syntax

### **2. Broken "Read More" Links** ✅ FIXED
- **Problem:** Some articles had invalid URLs
- **Solution:** Added strict URL validation before storing

### **3. Show Only Recent News** ✅ FIXED
- **Problem:** Showing all news, including old ones
- **Solution:** Added 30-day filter to all queries

### **4. Database Constraint Error** ✅ FIXED
- **Problem:** `ON CONFLICT` clause failing
- **Solution:** Check for existing articles before inserting

### **5. Newsletter Only to Enrolled Students** ✅ FIXED
- **Problem:** Sending to all subscribers, even non-enrolled
- **Solution:** Added JOIN with enrollments table to only send to students with active enrollments
- **Benefits:**
  - Only pays enrolled students get newsletters
  - Deleted students automatically excluded
  - Must have `is_active = true` in newsletter_subscriptions

---

## 🎨 What Your Users See

### **Public Page (`/newsletter`):**

```
╔════════════════════════════════════════════╗
║   🤖 RoboLearn Newsletter                  ║
║   Latest in Robotics & Tech                 ║
║   ----------------------------------------  ║
║   [Email Input] [Subscribe Button]         ║
╚════════════════════════════════════════════╝

╔════════════════════════════════════════════╗
║   Latest Industry News                     ║
║   ----------------------------------------  ║
║   [Filters: All | Robotics | AI | Drones]  ║
║                                            ║
║   📰 Article 1 with image                  ║
║   📰 Article 2 with image                  ║
║   📰 Article 3 with image                  ║
║                                            ║
║   [Load More Articles]                     ║
╚════════════════════════════════════════════╝
```

### **Weekly Email They Receive:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     🤖 ROBOLEARN WEEKLY NEWSLETTER
     Your weekly dose of robotics news
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hello [Name]!

Here are this week's most important 
developments in robotics:

┌────────────────────────────────────┐
│ [Article Image]                    │
│ Tesla's New Autopilot Update      │
│ Source: TechCrunch | Jan 1, 2025  │
│ Summary: Tesla releases...         │
│ [Read Full Article]                │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ [Article Image]                    │
│ Boston Dynamics Robot Walks        │
│ Summary: Boston Dynamics...        │
│ [Read Full Article]                │
└────────────────────────────────────┘

... 3 more articles ...

🎓 Ready to Build the Future?
[Explore Our Courses]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Unsubscribe | Manage Preferences
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔐 Environment Variables Needed

```env
# Database
DATABASE_URL=your_neon_database_url

# News APIs
NEWS_API_KEY=your_newsapi_key
GNEWS_API_KEY=your_gnews_key

# Email (Already configured)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=no-reply@robolearn.in
SMTP_PASS=RoboLearn@2412

# Cron Security
CRON_SECRET=your-secure-random-string
```

---

## 📊 Database Tables

### **newsletter_subscriptions**
Stores who subscribed:
- email
- name (optional)
- is_active (can unsubscribe)
- subscribed_at
- preferences (frequency, categories)

### **news_articles**
Stores all news:
- title, content, summary
- source, source_url
- category, tags
- published_at (for filtering)
- is_featured (for highlighting)

### **newsletter_issues**
Tracks sent newsletters:
- title, content
- article_ids (which articles were included)
- sent_at, is_sent

---

## 🎯 Summary

**You have a complete system where:**

1. ✅ Users visit `/newsletter` and see **recent robotics news (max 1 month old)**
2. ✅ Users can **subscribe with their email**
3. ✅ **Every Monday**, system automatically:
   - Selects top 5 news from past week
   - Generates beautiful HTML email
   - Sends ONLY to **enrolled students** who subscribed ✅ NEW
   - Skips deleted or non-enrolled users
4. ✅ Admin can fetch fresh news from NewsAPI/GNews
5. ✅ All "Read More" links work (only valid URLs stored)
6. ✅ No duplicate articles shown
7. ✅ Newsletter only sent to students with active course enrollments

**Everything is working!** 🎉

**Who Gets Newsletter Emails:**
- ✅ Must be in `newsletter_subscriptions` with `is_active = true`
- ✅ Must exist in `students` table (not deleted)
- ✅ Must have at least one enrollment in `enrollments` table
- ❌ Random subscribers without enrollment = NO EMAIL
- ❌ Deleted students = NO EMAIL
- ❌ Unsubscribed users (`is_active = false`) = NO EMAIL

**Next Step:** Set up the weekly cron job (see Step 3 above) to automate Monday emails.

