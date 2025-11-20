import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    // You can use NewsAPI, GNews, or any other news API
    // For this example, I'll create a mock implementation
    // In production, replace this with actual API calls

    const mockArticles = [
      {
        title: "Tesla's Full Self-Driving Beta Shows Significant Progress in Urban Navigation",
        content: "Tesla's Full Self-Driving (FSD) beta has made remarkable strides in urban navigation, with recent updates showing improved handling of complex traffic scenarios, pedestrian detection, and intersection navigation. The latest version demonstrates enhanced decision-making capabilities in real-world driving conditions, marking a significant milestone in autonomous vehicle technology.",
        summary: "Tesla's FSD beta shows improved urban navigation with better traffic handling and pedestrian detection.",
        source: "TechCrunch",
        source_url: "https://techcrunch.com/tesla-fsd-beta-progress",
        image_url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=400&fit=crop",
        category: "autonomous-vehicles",
        published_at: new Date(),
        is_featured: true,
        tags: ["tesla", "autonomous-driving", "fsd", "urban-navigation"]
      },
      {
        title: "Boston Dynamics Unveils Next-Generation Humanoid Robot with Enhanced AI Capabilities",
        content: "Boston Dynamics has introduced their latest humanoid robot featuring advanced AI capabilities, improved mobility, and enhanced dexterity. The new robot demonstrates unprecedented ability to perform complex tasks in dynamic environments, marking a significant milestone in robotics development. The robot can now handle delicate objects, navigate uneven terrain, and adapt to changing conditions in real-time.",
        summary: "Boston Dynamics reveals advanced humanoid robot with improved AI and mobility capabilities.",
        source: "IEEE Spectrum",
        source_url: "https://spectrum.ieee.org/boston-dynamics-humanoid-robot",
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        category: "robotics",
        published_at: new Date(),
        is_featured: true,
        tags: ["boston-dynamics", "humanoid-robot", "ai", "mobility"]
      },
      {
        title: "Waymo Expands Autonomous Ride-Hailing Service to New Cities",
        content: "Waymo has announced the expansion of its autonomous ride-hailing service to three additional cities, bringing the total to 15 metropolitan areas. The expansion includes improved safety protocols and enhanced passenger experience features. The company has also introduced new features like weather-adaptive driving and improved accessibility options for passengers with disabilities.",
        summary: "Waymo expands autonomous ride-hailing to new cities with enhanced safety features.",
        source: "The Verge",
        source_url: "https://theverge.com/waymo-expansion-autonomous-ride-hailing",
        image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
        category: "autonomous-vehicles",
        published_at: new Date(),
        is_featured: false,
        tags: ["waymo", "ride-hailing", "autonomous-vehicles", "expansion"]
      },
      {
        title: "New AI-Powered Surgical Robot Achieves 99.7% Accuracy in Complex Procedures",
        content: "A revolutionary AI-powered surgical robot has achieved unprecedented accuracy in complex medical procedures, with a 99.7% success rate in recent trials. The robot combines advanced computer vision, machine learning algorithms, and precision mechanics to perform delicate surgeries with minimal human intervention. This breakthrough could revolutionize medical procedures and improve patient outcomes worldwide.",
        summary: "AI-powered surgical robot achieves 99.7% accuracy in complex medical procedures.",
        source: "Medical Robotics Today",
        source_url: "https://medicalrobotics.com/ai-surgical-robot-accuracy",
        image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
        category: "robotics",
        published_at: new Date(),
        is_featured: true,
        tags: ["medical-robotics", "ai", "surgery", "precision"]
      },
      {
        title: "Drone Swarm Technology Enables Coordinated Search and Rescue Operations",
        content: "Researchers have developed a new drone swarm technology that enables coordinated search and rescue operations in disaster-stricken areas. The system uses advanced algorithms to coordinate multiple drones, allowing them to work together efficiently while avoiding collisions and optimizing coverage areas. This technology has already been successfully deployed in several natural disaster scenarios.",
        summary: "Drone swarm technology enables coordinated search and rescue operations in disaster areas.",
        source: "Drone Technology Weekly",
        source_url: "https://dronetech.com/swarm-search-rescue",
        image_url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=400&fit=crop",
        category: "drones",
        published_at: new Date(),
        is_featured: false,
        tags: ["drones", "swarm-technology", "search-rescue", "disaster-response"]
      },
      {
        title: "Industrial Robotics Market Reaches $50 Billion with Smart Factory Integration",
        content: "The global industrial robotics market has reached $50 billion, driven by increased adoption of smart factory technologies and Industry 4.0 initiatives. Companies are increasingly integrating collaborative robots (cobots) into their manufacturing processes, leading to improved efficiency, reduced costs, and enhanced worker safety. The trend is expected to continue growing as more industries embrace automation.",
        summary: "Industrial robotics market hits $50B with smart factory integration driving growth.",
        source: "Industry Week",
        source_url: "https://industryweek.com/industrial-robotics-market-growth",
        image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop",
        category: "industrial-robotics",
        published_at: new Date(),
        is_featured: false,
        tags: ["industrial-robotics", "smart-factory", "automation", "industry-4.0"]
      }
    ];

    // Insert articles into database
    const insertedArticles = [];
    for (const article of mockArticles) {
      try {
        const result = await sql`
          INSERT INTO news_articles (title, content, summary, source, source_url, image_url, category, published_at, is_featured, tags)
          VALUES (${article.title}, ${article.content}, ${article.summary}, ${article.source}, ${article.source_url}, ${article.image_url}, ${article.category}, ${article.published_at}, ${article.is_featured}, ${article.tags})
          ON CONFLICT (title) DO NOTHING
          RETURNING article_id, title
        `;
        
        if (result.length > 0) {
          insertedArticles.push(result[0]);
        }
      } catch (error) {
        console.error('Error inserting article:', error);
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `Successfully processed ${mockArticles.length} articles`,
        inserted: insertedArticles.length,
        articles: insertedArticles
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

// Real implementation with NewsAPI (uncomment and configure when ready)
/*
export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Fetch news from NewsAPI
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=robotics OR "autonomous vehicles" OR "artificial intelligence"&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`,
      {
        headers: {
          'User-Agent': 'RoboLearn-Newsletter/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`NewsAPI error: ${data.message}`);
    }

    // Process and categorize articles
    const processedArticles = data.articles.map((article: any) => {
      // Categorize based on keywords
      let category = 'robotics';
      const title = article.title.toLowerCase();
      const description = article.description?.toLowerCase() || '';
      
      if (title.includes('autonomous') || title.includes('self-driving') || title.includes('tesla') || title.includes('waymo')) {
        category = 'autonomous-vehicles';
      } else if (title.includes('drone') || title.includes('uav')) {
        category = 'drones';
      } else if (title.includes('industrial') || title.includes('manufacturing')) {
        category = 'industrial-robotics';
      } else if (title.includes('ai') || title.includes('artificial intelligence') || title.includes('machine learning')) {
        category = 'ai';
      }

      return {
        title: article.title,
        content: article.content || article.description || '',
        summary: article.description || '',
        source: article.source.name,
        source_url: article.url,
        image_url: article.urlToImage,
        category,
        published_at: new Date(article.publishedAt),
        is_featured: false,
        tags: extractTags(article.title, article.description)
      };
    });

    // Insert articles into database
    const insertedArticles = [];
    for (const article of processedArticles) {
      try {
        const result = await sql`
          INSERT INTO news_articles (title, content, summary, source, source_url, image_url, category, published_at, is_featured, tags)
          VALUES (${article.title}, ${article.content}, ${article.summary}, ${article.source}, ${article.source_url}, ${article.image_url}, ${article.category}, ${article.published_at}, ${article.is_featured}, ${article.tags})
          ON CONFLICT (title) DO NOTHING
          RETURNING article_id, title
        `;
        
        if (result.length > 0) {
          insertedArticles.push(result[0]);
        }
      } catch (error) {
        console.error('Error inserting article:', error);
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `Successfully processed ${processedArticles.length} articles`,
        inserted: insertedArticles.length,
        articles: insertedArticles
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

function extractTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags = [];
  
  const tagKeywords = {
    'tesla': ['tesla', 'elon musk'],
    'waymo': ['waymo', 'google'],
    'boston-dynamics': ['boston dynamics'],
    'medical-robotics': ['medical', 'surgery', 'healthcare'],
    'drones': ['drone', 'uav', 'quadcopter'],
    'ai': ['ai', 'artificial intelligence', 'machine learning', 'neural network'],
    'autonomous': ['autonomous', 'self-driving', 'driverless'],
    'industrial': ['industrial', 'manufacturing', 'factory'],
    'research': ['research', 'study', 'university', 'lab']
  };

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      tags.push(tag);
    }
  }

  return tags.slice(0, 5); // Limit to 5 tags
}
*/
