# 📰 Daily News Fetching Setup Guide

## Overview
Your newsletter system now supports automatic daily news fetching from real news APIs. This ensures your newsletter always has fresh, relevant content about robotics and autonomous technology.

## 🚀 Features

### ✅ What's Already Working
- **Manual News Fetching**: Click "Fetch Daily News" in admin dashboard
- **Fallback Articles**: System works without API keys using curated content
- **Duplicate Prevention**: Automatically removes duplicate articles
- **Smart Categorization**: Automatically categorizes articles by topic
- **Admin Interface**: Easy-to-use dashboard for managing news

### 🔧 What You Can Add
- **Real News APIs**: Connect to NewsAPI or GNews for live news
- **Automatic Scheduling**: Set up daily cron jobs
- **More News Sources**: Add RSS feeds or other APIs

## 📋 Setup Instructions

### 1. Get API Keys (Optional but Recommended)

#### NewsAPI (Free tier: 1000 requests/day)
1. Go to [newsapi.org](https://newsapi.org)
2. Sign up for a free account
3. Get your API key
4. Add to your `.env` file:
```bash
NEWS_API_KEY=your_news_api_key_here
```

#### GNews (Free tier: 100 requests/day)
1. Go to [gnews.io](https://gnews.io)
2. Sign up for a free account
3. Get your API key
4. Add to your `.env` file:
```bash
GNEWS_API_KEY=your_gnews_api_key_here
```

### 2. Set Up Automatic Daily Fetching

#### Option A: Using Vercel Cron Jobs (Recommended for Vercel deployment)
1. Add to your `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/newsletter/cron/daily-news",
      "schedule": "0 9 * * *"
    }
  ]
}
```

#### Option B: Using External Cron Service
1. Use services like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com)
2. Set up a daily job to call:
```
https://yourdomain.com/api/newsletter/cron/daily-news
```
3. Add authentication header:
```
Authorization: Bearer your-cron-secret
```

#### Option C: Server Cron Job (For VPS/Dedicated servers)
1. Add to your server's crontab:
```bash
0 9 * * * curl -X GET "https://yourdomain.com/api/newsletter/cron/daily-news" -H "Authorization: Bearer your-cron-secret"
```

### 3. Environment Variables

Add these to your `.env.local` file:
```bash
# News API Keys
NEWS_API_KEY=your_news_api_key_here
GNEWS_API_KEY=your_gnews_api_key_here

# Cron Security
CRON_SECRET=your-secure-random-string

# Base URL (for cron jobs)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## 🎯 How It Works

### News Fetching Process
1. **API Calls**: Fetches from NewsAPI and GNews
2. **Keyword Search**: Searches for robotics, AI, autonomous vehicles, etc.
3. **Content Processing**: Cleans and categorizes articles
4. **Duplicate Removal**: Removes similar articles
5. **Database Storage**: Saves new articles to database
6. **Newsletter Integration**: Articles appear in newsletter immediately

### Fallback System
- If APIs fail, uses curated fallback articles
- Ensures newsletter always has content
- No interruption to your newsletter schedule

## 📊 Admin Dashboard

### New "Fetch News" Tab
- **Manual Fetch**: Click to fetch news immediately
- **Status Display**: Shows API key status
- **Setup Instructions**: Built-in guidance
- **Real-time Feedback**: Loading states and success messages

### Features
- ✅ One-click news fetching
- ✅ Real-time status updates
- ✅ API key validation
- ✅ Setup instructions
- ✅ Error handling

## 🔍 Monitoring

### Check News Fetching Status
```bash
# Check recent articles
curl -X GET "http://localhost:3000/api/newsletter/articles?limit=5"

# Manual fetch
curl -X POST "http://localhost:3000/api/newsletter/fetch-daily-news"

# Test cron endpoint
curl -X GET "http://localhost:3000/api/newsletter/cron/daily-news" \
  -H "Authorization: Bearer your-cron-secret"
```

## 🎨 Customization

### Add More Keywords
Edit `/app/api/newsletter/fetch-daily-news/route.ts`:
```typescript
const keywords = [
  'robotics',
  'autonomous vehicles',
  'your-custom-keyword',
  // Add more keywords here
];
```

### Add More Categories
Edit the `getCategoryFromKeyword` function:
```typescript
function getCategoryFromKeyword(keyword: string): string {
  const categoryMap: { [key: string]: string } = {
    'your-keyword': 'your-category',
    // Add more mappings
  };
  return categoryMap[keyword.toLowerCase()] || 'robotics';
}
```

### Add RSS Feeds
You can extend the system to parse RSS feeds:
```typescript
// Add RSS parsing logic
const feed = await parser.parseURL('https://robotics-blog.com/feed');
```

## 🚨 Troubleshooting

### Common Issues

1. **No articles fetched**
   - Check API keys in environment variables
   - Verify API quotas haven't been exceeded
   - Check network connectivity

2. **Cron job not working**
   - Verify cron secret matches
   - Check URL is accessible
   - Review server logs

3. **Duplicate articles**
   - System automatically prevents duplicates
   - If issues persist, check title similarity logic

### Debug Commands
```bash
# Test API connectivity
curl -X POST "http://localhost:3000/api/newsletter/fetch-daily-news"

# Check database
curl -X GET "http://localhost:3000/api/newsletter/articles?limit=1"

# Test cron endpoint
curl -X GET "http://localhost:3000/api/newsletter/cron/daily-news" \
  -H "Authorization: Bearer your-cron-secret"
```

## 📈 Next Steps

1. **Get API Keys**: Sign up for NewsAPI and/or GNews
2. **Set Environment Variables**: Add keys to your `.env` file
3. **Test Manual Fetch**: Use the admin dashboard
4. **Set Up Cron Job**: Choose your preferred method
5. **Monitor Results**: Check articles are being fetched daily

## 🎉 Benefits

- **Fresh Content**: Always up-to-date news
- **Automated**: No manual work required
- **Reliable**: Fallback system ensures content
- **Scalable**: Easy to add more sources
- **Professional**: Real news from reputable sources

Your newsletter will now automatically stay current with the latest robotics and autonomous technology news! 🚀
