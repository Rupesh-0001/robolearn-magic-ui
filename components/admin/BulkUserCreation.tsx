"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BulkUserCreationProps {
  onUsersCreated: () => void;
}

interface CreatedUser {
  student_id: number;
  name: string;
  email: string;
  phone_number?: string;
}

interface CreationResult {
  created: CreatedUser[];
  alreadyExists: string[];
  errors: string[];
}

export default function BulkUserCreation({ onUsersCreated }: BulkUserCreationProps) {
  const [emails, setEmails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [results, setResults] = useState<CreationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emails.trim()) {
      setError('Please enter at least one email address');
      return;
    }

    // Parse emails (split by comma, newline, or semicolon)
    const emailList = emails
      .split(/[,\n;]/)
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (emailList.length === 0) {
      setError('Please enter at least one valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setResults(null);

    try {
      const response = await fetch('/api/admin/bulk-create-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: emailList }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.results);
        setSuccess(`Bulk user creation completed. ${data.results.created.length} users created successfully.`);
        setEmails('');
        onUsersCreated(); // Refresh the parent component
      } else {
        setError(data.error || 'Failed to create users');
      }
    } catch {
      setError('An error occurred while creating users');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmails('');
    setError('');
    setSuccess('');
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Bulk User Creation</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter email addresses (one per line, comma-separated, or semicolon-separated) to create user accounts with default password &quot;pleaseChangeMe&quot;.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="emails" className="block text-sm font-medium text-gray-700 mb-2">
            Email Addresses
          </label>
          <textarea
            id="emails"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter email addresses here...&#10;Example:&#10;john.doe@example.com&#10;jane.smith@example.com&#10;user@company.com"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div className="flex space-x-2">
          <Button
            type="submit"
            disabled={loading || !emails.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Creating Users...' : 'Create Users'}
          </Button>
          <Button
            type="button"
            onClick={handleClear}
            variant="outline"
            disabled={loading}
          >
            Clear
          </Button>
        </div>
      </form>

      {/* Results Display */}
      {results && (
        <div className="mt-6 space-y-4">
          <h4 className="font-semibold">Creation Results</h4>
          
          {results.created.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h5 className="font-medium text-green-800 mb-2">
                Successfully Created ({results.created.length})
              </h5>
              <div className="space-y-1">
                {results.created.map((user, index) => (
                  <div key={index} className="text-sm text-green-700">
                    • {user.name} ({user.email})
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.alreadyExists.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h5 className="font-medium text-yellow-800 mb-2">
                Already Exists ({results.alreadyExists.length})
              </h5>
              <div className="space-y-1">
                {results.alreadyExists.map((email, index) => (
                  <div key={index} className="text-sm text-yellow-700">
                    • {email}
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h5 className="font-medium text-red-800 mb-2">
                Errors ({results.errors.length})
              </h5>
              <div className="space-y-1">
                {results.errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-700">
                    • {error}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 