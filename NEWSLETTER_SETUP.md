# Newsletter Feature Setup Guide

This guide explains how to set up and use the newsletter feature for the RoboLearn application.

## Features

- **Newsletter Subscription**: Users can subscribe to weekly robotics and autonomous technology news
- **News Articles Management**: Admin can manage news articles and create newsletter issues
- **Automated Email Sending**: Weekly automated newsletter distribution
- **News API Integration**: Fetch latest news from external sources
- **Responsive UI**: Mobile-friendly newsletter subscription and display

## Database Setup

1. **Initialize Newsletter Database Tables**:
   ```bash
   curl -X POST http://localhost:3000/api/init-newsletter-db
   ```

   This creates the following tables:
   - `newsletter_subscriptions` - User subscription data
   - `news_articles` - News articles storage
   - `newsletter_issues` - Newsletter issue management

## API Endpoints

### Newsletter Subscription
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `DELETE /api/newsletter/subscribe` - Unsubscribe from newsletter

### News Articles
- `GET /api/newsletter/articles` - Fetch articles (with filters)
- `POST /api/newsletter/articles` - Create new article

### Newsletter Issues
- `GET /api/newsletter/issues` - Fetch newsletter issues
- `POST /api/newsletter/issues` - Create newsletter issue
- `PUT /api/newsletter/issues` - Update newsletter issue

### Newsletter Sending
- `POST /api/newsletter/send` - Send newsletter to subscribers
- `GET /api/newsletter/cron/send-weekly` - Automated weekly sending

### News Fetching
- `POST /api/newsletter/fetch-news` - Fetch news from external APIs

## Pages

### Public Pages
- `/newsletter` - Newsletter subscription and news display page
- `/newsletter/unsubscribe` - Unsubscribe page (to be implemented)
- `/newsletter/preferences` - Manage subscription preferences (to be implemented)

### Admin Pages
- `/admin/newsletter` - Newsletter management dashboard

## Components

### NewsletterSubscription
- `variant="default"` - Full subscription form with benefits
- `variant="inline"` - Compact inline subscription form
- `variant="modal"` - Modal popup subscription form

### NewsArticles
- Displays news articles with filtering and pagination
- Supports category filtering and featured articles
- Responsive design with image support

## Email Configuration

The newsletter uses the existing Nodemailer configuration:
- **SMTP Host**: smtp.hostinger.com
- **Port**: 465 (SSL)
- **From**: no-reply@robolearn.in

## Automated Weekly Sending

### Setup Cron Job

1. **Using Vercel Cron Jobs** (Recommended):
   ```javascript
   // vercel.json
   {
     "crons": [
       {
         "path": "/api/newsletter/cron/send-weekly",
         "schedule": "0 9 * * 1"
       }
     ]
   }
   ```

2. **Using External Cron Service**:
   - Set up a cron job to call: `https://yourdomain.com/api/newsletter/cron/send-weekly`
   - Schedule: Every Monday at 9 AM
   - Add authentication header: `Authorization: Bearer your-cron-secret`

3. **Manual Trigger**:
   ```bash
   curl -X GET "https://yourdomain.com/api/newsletter/cron/send-weekly" \
        -H "Authorization: Bearer your-cron-secret"
   ```

## Environment Variables

Add these to your `.env.local`:
```env
CRON_SECRET=your-secure-cron-secret
NEWS_API_KEY=your-news-api-key (optional)
```

## News API Integration

### Current Implementation
- Uses mock data for demonstration
- Articles are manually curated for quality

### Real News API Integration
To use real news APIs, uncomment the code in `/api/newsletter/fetch-news/route.ts` and:

1. **NewsAPI** (Recommended):
   - Sign up at https://newsapi.org/
   - Get your API key
   - Update the fetch-news endpoint

2. **GNews API**:
   - Alternative free news API
   - Similar integration process

3. **Custom News Sources**:
   - RSS feeds
   - Custom APIs
   - Web scraping (with proper permissions)

## Usage Examples

### Subscribe to Newsletter
```javascript
const response = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe',
    preferences: {
      frequency: 'weekly',
      categories: ['robotics', 'autonomous-vehicles'],
      include_promotions: true
    }
  })
});
```

### Create Newsletter Issue
```javascript
const response = await fetch('/api/newsletter/issues', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Weekly Robotics Update - January 2024',
    content: 'This week\'s top stories...',
    articleIds: [1, 2, 3, 4, 5]
  })
});
```

### Send Newsletter
```javascript
const response = await fetch('/api/newsletter/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    issueId: 1,
    testEmail: 'test@example.com' // Optional for testing
  })
});
```

## Customization

### Email Templates
- Modify templates in `/api/newsletter/send/route.ts`
- Update HTML/CSS for branding
- Add unsubscribe links and preferences

### Categories
- Add new categories in the database
- Update category filters in components
- Modify email templates for new categories

### Styling
- Update Tailwind classes in components
- Modify color schemes and layouts
- Add custom animations and effects

## Monitoring and Analytics

### Email Delivery
- Monitor SMTP logs for delivery status
- Track bounce rates and unsubscribes
- Set up email delivery monitoring

### User Engagement
- Track newsletter open rates
- Monitor click-through rates
- Analyze subscription patterns

### Performance
- Monitor API response times
- Track database query performance
- Set up error alerting

## Troubleshooting

### Common Issues

1. **Email Not Sending**:
   - Check SMTP credentials
   - Verify email limits
   - Check spam folders

2. **Database Errors**:
   - Ensure tables are created
   - Check database connection
   - Verify data types

3. **Cron Job Not Working**:
   - Check authentication
   - Verify URL accessibility
   - Monitor cron logs

### Debug Mode
Enable debug logging by adding to your environment:
```env
DEBUG_NEWSLETTER=true
```

## Security Considerations

1. **Rate Limiting**: Implement rate limiting for subscription endpoints
2. **Input Validation**: Validate all user inputs
3. **Email Verification**: Consider adding email verification
4. **Unsubscribe Security**: Secure unsubscribe links
5. **API Authentication**: Protect admin endpoints

## Future Enhancements

- [ ] Email verification for subscriptions
- [ ] Advanced analytics dashboard
- [ ] A/B testing for email content
- [ ] Multi-language support
- [ ] Advanced personalization
- [ ] Social media integration
- [ ] Mobile app notifications
- [ ] Advanced filtering options
- [ ] Newsletter archive
- [ ] User preference management

## Support

For issues or questions about the newsletter feature:
- Check the logs for error messages
- Verify database setup
- Test API endpoints individually
- Contact the development team

---

**Note**: This newsletter feature is designed to be scalable and maintainable. Regular updates and monitoring are recommended for optimal performance.
