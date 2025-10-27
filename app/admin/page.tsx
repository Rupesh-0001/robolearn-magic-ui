"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import BatchManagement from '@/components/admin/BatchManagement';
import BulkUserCreation from '@/components/admin/BulkUserCreation';
import TokenManager from '@/components/admin/TokenManager';

interface Student {
  student_id: number;
  name: string;
  email: string;
  phone_number?: string;
}

interface Batch {
  batch_id: number;
  course_name: string;
  course_start_date: string;
}

interface Enrollment {
  enrollment_id: number;
  student_id: number;
  batch_id: number;
  payment_amount: number;
  joined_date: string;
  student_name: string;
  course_name: string;
}

interface CertificateRequest {
  id: number;
  student_name: string;
  student_email: string;
  course_name: string;
  requested_at: string;
  status: string;
  updated_at: string;
  admin_note: string | null;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificateRequests, setCertificateRequests] = useState<CertificateRequest[]>([]);
  const [certReqLoading, setCertReqLoading] = useState(false);
  const [certReqError, setCertReqError] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'batches' | 'enrollments' | 'certificates' | 'batch-management' | 'bulk-users' | 'ambassadors' | 'tokens'>('students');
  // const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  // const [newUser, setNewUser] = useState({
  //   name: '',
  //   email: '',
  //   phone_number: '',
  //   password: '',
  //   role: 'student' as 'student' | 'admin'
  // });
  // const [isCreating, setIsCreating] = useState(false);
  const [rowLoading, setRowLoading] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch students
      const studentsResponse = await fetch('/api/admin/students');
      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json();
        setStudents(studentsData.students);
      }

      // Fetch batches
      const batchesResponse = await fetch('/api/admin/batches');
      if (batchesResponse.ok) {
        const batchesData = await batchesResponse.json();
        setBatches(batchesData.batches);
      }

      // Fetch enrollments
      const enrollmentsResponse = await fetch('/api/admin/enrollments');
      if (enrollmentsResponse.ok) {
        const enrollmentsData = await enrollmentsResponse.json();
        setEnrollments(enrollmentsData.enrollments);
      }

      // Fetch certificate requests
      setCertReqLoading(true);
      setCertReqError('');
      const certReqRes = await fetch('/api/admin/certificate-requests');
      if (certReqRes.ok) {
        const certReqData = await certReqRes.json();
        setCertificateRequests(certReqData.requests);
      } else {
        setCertReqError('Failed to fetch certificate requests');
      }
      setCertReqLoading(false);
    } catch {
      setCertReqError('Failed to fetch certificate requests');
      setCertReqLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  const handleStatusChange = async (id: number, status: string, admin_note: string) => {
    setRowLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch('/api/admin/certificate-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, admin_note }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch {}
    setRowLoading((prev) => ({ ...prev, [id]: false }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome, {user.name}</p>
              </div>
              <button
                onClick={refreshData}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Students ({students.length})
              </button>
              <button
                onClick={() => setActiveTab('batches')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'batches'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Batches ({batches.length})
              </button>
              <button
                onClick={() => setActiveTab('enrollments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'enrollments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Enrollments ({enrollments.length})
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'certificates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Certificate Requests ({certificateRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('batch-management')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'batch-management'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Batch Management
              </button>
              <button
                onClick={() => setActiveTab('bulk-users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bulk-users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bulk User Creation
              </button>
              <button
                onClick={() => setActiveTab('ambassadors')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ambassadors'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ambassadors
              </button>
              <button
                onClick={() => setActiveTab('tokens')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tokens'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tokens
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'students' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Students</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.student_id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.student_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.phone_number || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'batches' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Batches</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {batches.map((batch) => (
                        <tr key={batch.batch_id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {batch.batch_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {batch.course_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(batch.course_start_date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'enrollments' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Enrollments</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enrollments.map((enrollment) => (
                        <tr key={enrollment.enrollment_id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {enrollment.enrollment_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {enrollment.student_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {enrollment.course_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{enrollment.payment_amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(enrollment.joined_date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'certificates' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Certificate Requests</h2>
                {certReqLoading ? (
                  <div>Loading...</div>
                ) : certReqError ? (
                  <div className="text-red-500">{certReqError}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested At</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Note</th>
                          <th className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {certificateRequests.map((req) => (
                          <tr key={req.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.student_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.student_email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.course_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(req.requested_at).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{req.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(req.updated_at).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <input
                                type="text"
                                className="border rounded px-2 py-1 text-sm w-32"
                                defaultValue={req.admin_note || ''}
                                onBlur={e => {
                                  if (e.target.value !== (req.admin_note || '')) {
                                    handleStatusChange(req.id, req.status, e.target.value);
                                  }
                                }}
                                disabled={rowLoading[req.id]}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {req.status === 'pending' && (
                                <button
                                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs mr-2 disabled:opacity-50"
                                  disabled={rowLoading[req.id]}
                                  onClick={() => handleStatusChange(req.id, 'approved', req.admin_note || '')}
                                >
                                  {rowLoading[req.id] ? 'Approving...' : 'Approve'}
                                </button>
                              )}
                              {req.status === 'approved' && (
                                <button
                                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs mr-2 disabled:opacity-50"
                                  disabled={rowLoading[req.id]}
                                  onClick={() => handleStatusChange(req.id, 'issued', req.admin_note || '')}
                                >
                                  {rowLoading[req.id] ? 'Marking...' : 'Mark as Issued'}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'batch-management' && (
              <div>
                <BatchManagement />
              </div>
            )}

            {activeTab === 'bulk-users' && (
              <div>
                <BulkUserCreation onUsersCreated={refreshData} />
              </div>
            )}

            {activeTab === 'ambassadors' && (
              <div>
                <iframe 
                  src="/admin/ambassadors" 
                  className="w-full h-96 border-0"
                  title="Ambassador Management"
                />
              </div>
            )}

            {activeTab === 'tokens' && (
              <div>
                <TokenManager />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 