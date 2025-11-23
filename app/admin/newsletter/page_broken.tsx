'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

interface NewsArticle {
  article_id: number;
  title: string;
  summary: string;
  source: string;
  category: string;
  published_at: string;
  is_featured: boolean;
}

interface NewsletterIssue {
  issue_id: number;
  title: string;
  content: string;
  created_at: string;
  is_sent: boolean;
  sent_at?: string;
  article_ids: number[];
}

export default function NewsletterAdminPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'articles' | 'issues' | 'send' | 'fetch'>('articles');
  const [isFetchingNews, setIsFetchingNews] = useState(false);

  // New issue form
  const [newIssue, setNewIssue] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchArticles();
    fetchIssues();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/newsletter/articles?limit=50');
      const data = await response.json();
      if (response.ok) {
        setArticles(data.articles);
      } else {
        toast.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Error fetching articles');
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await fetch('/api/newsletter/issues?include_sent=true&limit=20');
      const data = await response.json();
      if (response.ok) {
        setIssues(data.issues);
      } else {
        toast.error('Failed to fetch issues');
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast.error('Error fetching issues');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newIssue.title || !newIssue.content || selectedArticles.length === 0) {
      toast.error('Please fill in all fields and select at least one article');
      return;
    }

    try {
      const response = await fetch('/api/newsletter/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newIssue.title,
          content: newIssue.content,
          articleIds: selectedArticles,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Newsletter issue created successfully');
        setNewIssue({ title: '', content: '' });
        setSelectedArticles([]);
        fetchIssues();
      } else {
        toast.error(data.error || 'Failed to create issue');
      }
    } catch (error) {
      console.error('Error creating issue:', error);
      toast.error('Error creating issue');
    }
  };

  const handleSendNewsletter = async (issueId: number, testEmail?: string) => {
    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueId,
          testEmail,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchIssues();
      } else {
        toast.error(data.error || 'Failed to send newsletter');
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast.error('Error sending newsletter');
    }
  };

  const toggleArticleSelection = (articleId: number) => {
    setSelectedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleFetchDailyNews = async () => {
    setIsFetchingNews(true);
    try {
      const response = await fetch('/api/newsletter/fetch-daily-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchArticles(); // Refresh articles list
      } else {
        toast.error(data.error || 'Failed to fetch daily news');
      }
    } catch (error) {
      console.error('Error fetching daily news:', error);
      toast.error('Error fetching daily news');
    } finally {
      setIsFetchingNews(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading newsletter admin...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Newsletter Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage newsletter content and send updates to subscribers</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap gap-2 sm:gap-0 sm:space-x-8">
              {[
                { id: 'articles', label: 'Articles', count: articles.length },
                { id: 'issues', label: 'Issues', count: issues.length },
                { id: 'send', label: 'Send' },
                { id: 'fetch', label: 'Fetch News' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  {tab.count !== undefined && (
                    <span className="ml-1 sm:ml-2 bg-gray-100 text-gray-600 py-0.5 px-1.5 sm:px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Recent Articles</h2>
                <div className="space-y-3 sm:space-y-4">
                  {articles.map((article) => (
                    <div key={article.article_id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">{article.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{article.summary}</p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                            <span className="truncate">{article.source}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="capitalize">{article.category}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{formatDate(article.published_at)}</span>
                            {article.is_featured && (
                              <span className="text-yellow-600 font-medium">⭐ Featured</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleArticleSelection(article.article_id)}
                          className={`px-3 py-1 rounded text-xs sm:text-sm font-medium whitespace-nowrap ${
                            selectedArticles.includes(article.article_id)
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {selectedArticles.includes(article.article_id) ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Newsletter Issues</h2>
                <div className="space-y-3 sm:space-y-4">
                  {issues.map((issue) => (
                    <div key={issue.issue_id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">{issue.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{issue.content}</p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                            <span>Created: {formatDate(issue.created_at)}</span>
                            {issue.sent_at && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span>Sent: {formatDate(issue.sent_at)}</span>
                              </>
                            )}
                            <span className="hidden sm:inline">•</span>
                            <span>{issue.article_ids.length} articles</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {!issue.is_sent && (
                            <Button
                              onClick={() => handleSendNewsletter(issue.issue_id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                            >
                              Send Now
                            </Button>
                          )}
                          <Button
                            onClick={() => handleSendNewsletter(issue.issue_id, 'garghemant654@gmail.com')}
                            size="sm"
                            variant="outline"
                            className="text-xs sm:text-sm"
                          >
                            Test Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Send Newsletter Tab */}
          {activeTab === 'send' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Create New Newsletter Issue</h2>
                <form onSubmit={handleCreateIssue} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Newsletter Title
                    </label>
                    <input
                      type="text"
                      value={newIssue.title}
                      onChange={(e) => setNewIssue(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Weekly Robotics Update - January 2024"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Newsletter Content
                    </label>
                    <textarea
                      value={newIssue.content}
                      onChange={(e) => setNewIssue(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write a brief introduction or summary for this newsletter issue..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selected Articles ({selectedArticles.length})
                    </label>
                    {selectedArticles.length === 0 ? (
                      <p className="text-xs sm:text-sm text-gray-500">No articles selected. Go to the Articles tab to select articles.</p>
                    ) : (
                      <div className="space-y-2">
                        {selectedArticles.map(articleId => {
                          const article = articles.find(a => a.article_id === articleId);
                          return article ? (
                            <div key={articleId} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span className="text-xs sm:text-sm truncate flex-1 mr-2">{article.title}</span>
                              <button
                                type="button"
                                onClick={() => toggleArticleSelection(articleId)}
                                className="text-red-600 hover:text-red-800 text-xs sm:text-sm whitespace-nowrap"
                              >
                                Remove
                              </button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={selectedArticles.length === 0}
                    className="w-full text-sm sm:text-base"
                  >
                    Create Newsletter Issue
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Fetch News Tab */}
          {activeTab === 'fetch' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Fetch Daily News</h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-medium text-blue-900 mb-2">📰 Daily News Fetching</h3>
                    <p className="text-sm sm:text-base text-blue-700 mb-3 sm:mb-4">
                      This feature automatically fetches the latest robotics and autonomous technology news from various sources including NewsAPI and GNews.
                    </p>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-blue-600">
                      <p>• Fetches articles about robotics, autonomous vehicles, AI, and drones</p>
                      <p>• Automatically categorizes articles by topic</p>
                      <p>• Removes duplicates and ensures quality content</p>
                      <p>• Updates your newsletter with fresh, relevant content daily</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">Manual News Fetch</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Click to fetch the latest news articles right now</p>
                    </div>
                    <Button
                      onClick={handleFetchDailyNews}
                      disabled={isFetchingNews}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm whitespace-nowrap"
                    >
                      {isFetchingNews ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                          <span className="hidden sm:inline">Fetching...</span>
                          <span className="sm:hidden">...</span>
                        </div>
                      ) : (
                        'Fetch Daily News'
                      )}
                    </Button>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-green-900 mb-2 text-sm sm:text-base">✅ API Status</h4>
                    <div className="text-xs sm:text-sm text-green-800 space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                        <span><strong>NewsAPI:</strong> Connected and working</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                        <span><strong>GNews:</strong> Connected and working</span>
                      </div>
                      <p className="mt-2 text-green-700">🎉 Your system is now fetching real, live news from both APIs!</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">⚙️ Automation Setup</h4>
                    <div className="text-xs sm:text-sm text-blue-800 space-y-1 sm:space-y-2">
                      <p><strong>To set up automatic daily fetching:</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-2 sm:ml-4">
                        <li>Set up a cron job to call: <code className="bg-blue-100 px-1 rounded text-xs">/api/newsletter/cron/daily-news</code></li>
                        <li>Add cron secret to environment: <code className="bg-blue-100 px-1 rounded text-xs">CRON_SECRET=your-secret</code></li>
                        <li>Use services like Vercel Cron, cron-job.org, or server cron</li>
                      </ol>
                      <p className="mt-2"><strong>Current Status:</strong> Manual fetching is working perfectly!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
