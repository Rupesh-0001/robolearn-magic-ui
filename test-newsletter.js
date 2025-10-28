// Test script for newsletter functionality
// Run with: node test-newsletter.js

const BASE_URL = 'http://localhost:3000';

async function testNewsletterAPI() {
  console.log('🧪 Testing Newsletter API...\n');

  try {
    // 1. Initialize database
    console.log('1. Initializing newsletter database...');
    const initResponse = await fetch(`${BASE_URL}/api/init-newsletter-db`, {
      method: 'POST'
    });
    const initData = await initResponse.json();
    console.log('✅ Database initialized:', initData.message);

    // 2. Subscribe to newsletter
    console.log('\n2. Testing newsletter subscription...');
    const subscribeResponse = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'garghemant654@gmail.com',
        name: 'Test User',
        preferences: {
          frequency: 'weekly',
          categories: ['robotics', 'autonomous-vehicles'],
          include_promotions: true
        }
      })
    });
    const subscribeData = await subscribeResponse.json();
    console.log('✅ Subscription result:', subscribeData.message);

    // 3. Fetch news articles
    console.log('\n3. Testing news articles fetch...');
    const articlesResponse = await fetch(`${BASE_URL}/api/newsletter/articles?limit=5`);
    const articlesData = await articlesResponse.json();
    console.log('✅ Articles fetched:', articlesData.articles?.length || 0, 'articles');

    // 4. Create newsletter issue
    console.log('\n4. Testing newsletter issue creation...');
    const issueResponse = await fetch(`${BASE_URL}/api/newsletter/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Newsletter Issue',
        content: 'This is a test newsletter issue for testing purposes.',
        articleIds: articlesData.articles?.slice(0, 3).map(a => a.article_id) || []
      })
    });
    const issueData = await issueResponse.json();
    console.log('✅ Issue created:', issueData.message);

    // 5. Test newsletter sending (test mode)
    console.log('\n5. Testing newsletter sending (test mode)...');
    const sendResponse = await fetch(`${BASE_URL}/api/newsletter/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issueId: issueData.issue?.issue_id,
        testEmail: 'garghemant654@gmail.com'
      })
    });
    const sendData = await sendResponse.json();
    console.log('✅ Newsletter sent:', sendData.message);

    // 6. Fetch news from external source
    console.log('\n6. Testing news fetching...');
    const fetchNewsResponse = await fetch(`${BASE_URL}/api/newsletter/fetch-news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: 'test' })
    });
    const fetchNewsData = await fetchNewsResponse.json();
    console.log('✅ News fetched:', fetchNewsData.message);

    console.log('\n🎉 All tests completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Visit http://localhost:3000/newsletter to see the newsletter page');
    console.log('2. Visit http://localhost:3000/admin/newsletter to manage newsletters');
    console.log('3. Set up cron job for automated weekly sending');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Make sure the development server is running on port 3000');
  }
}

// Run the test
testNewsletterAPI();
