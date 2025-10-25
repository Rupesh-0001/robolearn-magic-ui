"use client";

import { useEffect, useMemo, useState } from 'react';

interface Token {
  uuid: string;
  course_name: string;
  batch_id: number;
  price: number;
  currency: string;
  active: boolean;
  expires_at: string | null;
  created_at?: string;
}

interface CourseOption {
  name: string;
  batchId: number;
  tokenPath: string;
  defaultPrice: number;
}

const COURSE_OPTIONS: CourseOption[] = [
  {
    name: 'Autonomous Car Course',
    batchId: 6,
    tokenPath: '/bootcamp/autonomous-cars/token/',
    defaultPrice: 501,
  },
  {
    name: 'MERN - FSD',
    batchId: 7,
    tokenPath: '/bootcamp/mern-stack/token/',
    defaultPrice: 501,
  },
];

export default function TokenManager() {
  const [courseName, setCourseName] = useState('Autonomous Car Course');
  const [batchId, setBatchId] = useState<number>(6);
  const [price, setPrice] = useState<number>(501);
  const [currency, setCurrency] = useState('INR');
  const [expiresAt, setExpiresAt] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const selectedCourse = useMemo(() => 
    COURSE_OPTIONS.find(c => c.name === courseName) || COURSE_OPTIONS[0],
    [courseName]
  );

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/tokens');
      if (res.ok) {
        const data = await res.json();
        setTokens(data.tokens || []);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleCourseChange = (newCourseName: string) => {
    const course = COURSE_OPTIONS.find(c => c.name === newCourseName);
    if (course) {
      setCourseName(course.name);
      setBatchId(course.batchId);
      setPrice(course.defaultPrice);
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const res = await fetch('/api/admin/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseName, batchId, price, currency, expiresAt: expiresAt || null }),
      });
      if (res.ok) {
        await fetchTokens();
        setCourseName('Autonomous Car Course');
        setBatchId(6);
        setPrice(501);
        setCurrency('INR');
        setExpiresAt('');
      }
    } catch {}
    setCreating(false);
  };

  const toggleActive = async (uuid: string, active: boolean) => {
    try {
      const res = await fetch('/api/admin/tokens', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid, active }),
      });
      if (res.ok) {
        await fetchTokens();
      }
    } catch {}
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Token Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end bg-gray-50 p-4 rounded border border-gray-200 mb-6">
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Course Name</label>
          <select 
            className="border rounded px-2 py-1 bg-white cursor-pointer" 
            value={courseName} 
            onChange={e => handleCourseChange(e.target.value)}
          >
            {COURSE_OPTIONS.map(course => (
              <option key={course.name} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Batch ID</label>
          <input 
            className="border rounded px-2 py-1 bg-gray-100" 
            type="number" 
            value={batchId} 
            onChange={e => setBatchId(parseInt(e.target.value || '0', 10))}
            readOnly
            title="Auto-set based on course selection"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Price ({currency})</label>
          <input className="border rounded px-2 py-1" type="number" value={price} onChange={e => setPrice(parseInt(e.target.value || '0', 10))} />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Expires At (optional)</label>
          <input className="border rounded px-2 py-1" type="datetime-local" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} />
        </div>
        <div>
          <button onClick={handleCreate} disabled={creating} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-60">
            {creating ? 'Creating...' : 'Create Token'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Recent Tokens</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tokens.map(t => {
                  const tokenCourse = COURSE_OPTIONS.find(c => c.name === t.course_name) || COURSE_OPTIONS[0];
                  const tokenUrl = `${origin}${tokenCourse.tokenPath}${t.uuid}`;
                  return (
                    <tr key={t.uuid}>
                      <td className="px-4 py-2 text-sm">
                        <a className="text-blue-600 hover:underline" href={tokenUrl} target="_blank" rel="noopener noreferrer">{tokenUrl}</a>
                      </td>
                      <td className="px-4 py-2 text-sm">{t.course_name}</td>
                      <td className="px-4 py-2 text-sm">{t.batch_id}</td>
                      <td className="px-4 py-2 text-sm">{t.currency} {t.price}</td>
                      <td className="px-4 py-2 text-sm">{t.active ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-2 text-sm">
                        <button onClick={() => toggleActive(t.uuid, !t.active)} className="px-3 py-1 bg-gray-800 text-white rounded text-xs">
                          {t.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}



