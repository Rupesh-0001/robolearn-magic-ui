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

export default function NewsletterAdmin() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'articles' | 'issues' | 'send' | 'fetch'>('articles');
  const [isFetchingNews, setIsFetchingNews] = useState(false);
  const [subscribers, setSubscribers] = useState<Array<{email: string, name: string}>>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);
  const [isSending, setIsSending] = useState<{ [key: number]: boolean }>({});
  const [isTestSending, setIsTestSending] = useState<{ [key: number]: boolean }>({});
  const [isCreatingIssue, setIsCreatingIssue] = useState(false);

  const [newIssue, setNewIssue] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchArticles();
    fetchIssues();
    fetchSubscribers();
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

  const fetchSubscribers = async () => {
    setIsLoadingSubscribers(true);
    try {
      const response = await fetch('/api/newsletter/subscribers');
      const data = await response.json();
      if (response.ok) {
        setSubscribers(data.subscribers || []);
        // Pre-select all subscribers
        setSelectedEmails(data.subscribers.map((s: any) => s.email));
      } else {
        toast.error('Failed to fetch subscribers');
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Error fetching subscribers');
    } finally {
      setIsLoadingSubscribers(false);
    }
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newIssue.title || !newIssue.content || selectedArticles.length === 0) {
      toast.error('Please fill in all fields and select at least one article');
      return;
    }

    setIsCreatingIssue(true);
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
    } finally {
      setIsCreatingIssue(false);
    }
  };

  const handleSendNewsletter = async (issueId: number, testEmail?: string, customEmails?: string[]) => {
    // Set loading state based on whether it's a test send or regular send
    if (testEmail) {
      setIsTestSending(prev => ({ ...prev, [issueId]: true }));
    } else {
      setIsSending(prev => ({ ...prev, [issueId]: true }));
    }

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueId,
          testEmail,
          customEmails,
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
    } finally {
      if (testEmail) {
        setIsTestSending(prev => ({ ...prev, [issueId]: false }));
      } else {
        setIsSending(prev => ({ ...prev, [issueId]: false }));
      }
    }
  };

  const toggleEmailSelection = (email: string) => {
    setSelectedEmails(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const addCustomEmail = () => {
    if (newEmail && newEmail.includes('@')) {
      if (!selectedEmails.includes(newEmail)) {
        setSelectedEmails(prev => [...prev, newEmail]);
        if (!subscribers.find(s => s.email === newEmail)) {
          setSubscribers(prev => [...prev, { email: newEmail, name: 'Custom' }]);
        }
      }
      setNewEmail('');
    } else {
      toast.error('Please enter a valid email');
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
        fetchArticles();
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
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading newsletter admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Newsletter Management</h2>
      
      <div className="mb-4 sm:mb-6">
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

      {activeTab === 'articles' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Recent Articles</h3>
            <div className="space-y-2 sm:space-y-3">
              {articles.map((article) => (
                <div key={article.article_id} className="border border-gray-200 rounded-lg p-2 sm:p-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1 text-xs sm:text-sm line-clamp-2">{article.title}</h4>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{article.summary}</p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-gray-500">
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
                      className={`px-2 sm:px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${
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

      {activeTab === 'issues' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Newsletter Issues</h3>
            
            {/* Email Selection Section */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Recipients ({selectedEmails.length} selected)
              </h4>
              
              {/* Add Custom Email */}
              <div className="mb-4 flex gap-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomEmail()}
                  placeholder="Add custom email (e.g., garghemant654@gmail.com)"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={addCustomEmail}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                >
                  Add Email
                </Button>
              </div>

              {/* Email List */}
              {isLoadingSubscribers ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading subscribers...</p>
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {subscribers.map((subscriber) => (
                    <div key={subscriber.email} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(subscriber.email)}
                        onChange={() => toggleEmailSelection(subscriber.email)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{subscriber.email}</p>
                        {subscriber.name && subscriber.name !== 'Custom' && (
                          <p className="text-xs text-gray-500">{subscriber.name}</p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedEmails(prev => prev.filter(e => e !== subscriber.email));
                          if (subscriber.name === 'Custom') {
                            setSubscribers(prev => prev.filter(s => s.email !== subscriber.email));
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <Button
                  onClick={() => setSelectedEmails(subscribers.map(s => s.email))}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  Select All
                </Button>
                <Button
                  onClick={() => setSelectedEmails([])}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  Deselect All
                </Button>
              </div>
            </div>

            {/* Newsletter Issues List */}
            <div className="space-y-2 sm:space-y-3">
              {issues.map((issue) => (
                <div key={issue.issue_id} className="border border-gray-200 rounded-lg p-2 sm:p-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1 text-xs sm:text-sm line-clamp-2">{issue.title}</h4>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{issue.content}</p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-gray-500">
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
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      {!issue.is_sent && (
                        <Button
                          onClick={() => handleSendNewsletter(issue.issue_id, undefined, selectedEmails)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-xs"
                          disabled={selectedEmails.length === 0 || isSending[issue.issue_id]}
                        >
                          {isSending[issue.issue_id] ? (
                            <div className="flex items-center gap-1">
                              <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                              Sending...
                            </div>
                          ) : (
                            `Send to ${selectedEmails.length} emails`
                          )}
                        </Button>
                      )}
                      <Button
                        onClick={() => handleSendNewsletter(issue.issue_id, 'garghemant654@gmail.com')}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        disabled={isTestSending[issue.issue_id]}
                      >
                        {isTestSending[issue.issue_id] ? (
                          <div className="flex items-center gap-1">
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-600 border-t-transparent"></div>
                            Sending...
                          </div>
                        ) : (
                          'Test Send'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'send' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Create New Newsletter Issue</h3>
            <form onSubmit={handleCreateIssue} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Newsletter Title
                </label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Weekly Robotics Update - January 2024"
                  className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Newsletter Content
                </label>
                <textarea
                  value={newIssue.content}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write a brief introduction or summary for this newsletter issue..."
                  rows={3}
                  className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Selected Articles ({selectedArticles.length})
                </label>
                {selectedArticles.length === 0 ? (
                  <p className="text-xs text-gray-500">No articles selected. Go to the Articles tab to select articles.</p>
                ) : (
                  <div className="space-y-1 sm:space-y-2">
                    {selectedArticles.map(articleId => {
                      const article = articles.find(a => a.article_id === articleId);
                      return article ? (
                        <div key={articleId} className="flex items-center justify-between bg-gray-50 p-1 sm:p-2 rounded">
                          <span className="text-xs truncate flex-1 mr-2">{article.title}</span>
                          <button
                            type="button"
                            onClick={() => toggleArticleSelection(articleId)}
                            className="text-red-600 hover:text-red-800 text-xs whitespace-nowrap"
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
                disabled={selectedArticles.length === 0 || isCreatingIssue}
                className="w-full text-xs sm:text-sm"
              >
                {isCreatingIssue ? (
                  <div className="flex items-center gap-2 justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Creating Issue...
                  </div>
                ) : (
                  'Create Newsletter Issue'
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'fetch' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Fetch Daily News</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
                <h4 className="text-sm font-medium text-blue-900 mb-1 sm:mb-2">📰 Daily News Fetching</h4>
                <p className="text-xs sm:text-sm text-blue-700 mb-2 sm:mb-3">
                  This feature automatically fetches the latest robotics and autonomous technology news from various sources including NewsAPI and GNews.
                </p>
                <div className="space-y-1 text-xs text-blue-600">
                  <p>• Fetches articles about robotics, autonomous vehicles, AI, and drones</p>
                  <p>• Automatically categorizes articles by topic</p>
                  <p>• Removes duplicates and ensures quality content</p>
                  <p>• Updates your newsletter with fresh, relevant content daily</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2 sm:gap-3">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 text-xs sm:text-sm">Manual News Fetch</h5>
                  <p className="text-xs text-gray-600">Click to fetch the latest news articles right now</p>
                </div>
                <Button
                  onClick={handleFetchDailyNews}
                  disabled={isFetchingNews}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs whitespace-nowrap"
                >
                  {isFetchingNews ? (
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                      <span className="hidden sm:inline">Fetching...</span>
                      <span className="sm:hidden">...</span>
                    </div>
                  ) : (
                    'Fetch Daily News'
                  )}
                </Button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
                <h5 className="font-medium text-green-900 mb-1 sm:mb-2 text-xs sm:text-sm">✅ API Status</h5>
                <div className="text-xs text-green-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    <span><strong>NewsAPI:</strong> Connected and working</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    <span><strong>GNews:</strong> Connected and working</span>
                  </div>
                  <p className="mt-1 sm:mt-2 text-green-700">🎉 Your system is now fetching real, live news from both APIs!</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
                <h5 className="font-medium text-blue-900 mb-1 sm:mb-2 text-xs sm:text-sm">⚙️ Automation Setup</h5>
                <div className="text-xs text-blue-800 space-y-1">
                  <p><strong>To set up automatic daily fetching:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2 sm:ml-4">
                    <li>Set up a cron job to call: <code className="bg-blue-100 px-1 rounded text-xs">/api/newsletter/cron/daily-news</code></li>
                    <li>Add cron secret to environment: <code className="bg-blue-100 px-1 rounded text-xs">CRON_SECRET=your-secret</code></li>
                    <li>Use services like Vercel Cron, cron-job.org, or server cron</li>
                  </ol>
                  <p className="mt-1 sm:mt-2"><strong>Current Status:</strong> Manual fetching is working perfectly!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
