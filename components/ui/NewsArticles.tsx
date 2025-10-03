'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './button';
import { toast } from 'react-hot-toast';

interface NewsArticle {
  article_id: number;
  title: string;
  content: string;
  summary: string;
  source: string;
  source_url: string;
  image_url?: string;
  category: string;
  published_at: string;
  is_featured: boolean;
  tags: string[];
}

interface NewsArticlesProps {
  category?: string;
  featured?: boolean;
  limit?: number;
  showLoadMore?: boolean;
  className?: string;
}

export default function NewsArticles({ 
  category, 
  featured, 
  limit = 6, 
  showLoadMore = true,
  className = '' 
}: NewsArticlesProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchArticles = useCallback(async (reset = false) => {
    try {
      if (reset) {
        setIsFilterLoading(true);
      }
      
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: reset ? '0' : offset.toString(),
      });

      if (category) params.append('category', category);
      if (featured) params.append('featured', 'true');

      const response = await fetch(`/api/newsletter/articles?${params}`);
      const data = await response.json();

      if (response.ok) {
        if (reset) {
          setArticles(data.articles);
        } else {
          setArticles(prev => [...prev, ...data.articles]);
        }
        setHasMore(data.pagination.hasMore);
        setOffset(reset ? limit : prev => prev + limit);
      } else {
        toast.error(data.error || 'Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('An error occurred while fetching articles');
    } finally {
      setIsLoading(false);
      setIsFilterLoading(false);
    }
  }, [category, featured, limit]);

  useEffect(() => {
    fetchArticles(true);
  }, [fetchArticles]);

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0);
  }, [category, featured]);

  const handleLoadMore = () => {
    fetchArticles(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'robotics': 'bg-blue-100 text-blue-800',
      'autonomous-vehicles': 'bg-green-100 text-green-800',
      'ai': 'bg-purple-100 text-purple-800',
      'drones': 'bg-orange-100 text-orange-800',
      'industrial-robotics': 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading && articles.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center py-12">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading articles...</p>
          <p className="text-gray-500 text-sm mt-2">Fetching the latest robotics news</p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Articles Found</h3>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          {category ? `No articles found in the ${category} category. Try selecting a different category.` : 'No articles available at the moment. Please check back later.'}
        </p>
      </div>
    );
  }


  return (
    <div className={`relative ${className}`}>
      {isFilterLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-black mx-auto mb-3"></div>
            <p className="text-gray-600 font-medium">Applying filters...</p>
          </div>
        </div>
      )}
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {articles.map((article) => (
          <article 
            key={article.article_id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col"
          >
            {article.image_url && (
              <div className="h-48 sm:h-56 overflow-hidden">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category.replace('-', ' ').toUpperCase()}
                </span>
                {article.is_featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                <a 
                  href={article.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#ff4164] transition-colors duration-200"
                  onClick={(e) => {
                    if (!article.source_url || article.source_url === '') {
                      e.preventDefault();
                      alert('Article URL not available');
                    }
                  }}
                >
                  {article.title}
                </a>
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow line-clamp-3">
                {article.summary || article.content.substring(0, 150) + '...'}
              </p>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                    <span className="font-medium truncate">{article.source}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{formatDate(article.published_at)}</span>
                  </div>
                </div>
                
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200"
                  onClick={(e) => {
                    if (!article.source_url || article.source_url === '') {
                      e.preventDefault();
                      alert('Article URL not available');
                    }
                  }}
                >
                  Read More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {article.tags && article.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1 sm:gap-2">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                    {article.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{article.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center pt-8 mt-8">
          <Button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-6 sm:px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Loading...
              </div>
            ) : (
              'Load More Articles'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
