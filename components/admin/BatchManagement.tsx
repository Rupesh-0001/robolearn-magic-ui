"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
  lessons: Lesson[];
  student_count: number;
}

interface Lesson {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
}

interface BatchEnrollment {
  enrollment_id: number;
  student_id: number;
  batch_id: number;
  payment_amount: number;
  joined_date: string;
  student_name: string;
  student_email: string;
  student_phone?: string;
  course_name: string;
}

export default function BatchManagement() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [batchEnrollments, setBatchEnrollments] = useState<BatchEnrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showEditLesson, setShowEditLesson] = useState(false);
  const [showManageEnrollments, setShowManageEnrollments] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  
  const [newBatch, setNewBatch] = useState({
    course_name: '',
    course_start_date: ''
  });

  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: ''
  });

  const [selectedStudent, setSelectedStudent] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch batches
      const batchesResponse = await fetch('/api/admin/batches');
      if (batchesResponse.ok) {
        const batchesData = await batchesResponse.json();
        setBatches(batchesData.batches);
      }

      // Fetch students
      const studentsResponse = await fetch('/api/admin/students');
      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json();
        setStudents(studentsData.students);
      }
    } catch {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBatchEnrollments = async (batchId: number) => {
    try {
      const response = await fetch(`/api/admin/batch-enrollments?batch_id=${batchId}`);
      if (response.ok) {
        const data = await response.json();
        setBatchEnrollments(data.enrollments);
      }
    } catch {
      setError('Failed to fetch batch enrollments');
    }
  };

  const createBatch = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/admin/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBatch)
      });

      if (response.ok) {
        setShowCreateBatch(false);
        setNewBatch({ course_name: '', course_start_date: '' });
        await fetchData();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create batch');
      }
    } catch {
      setError('Failed to create batch');
    } finally {
      setLoading(false);
    }
  };

  const addLesson = async () => {
    if (!selectedBatch) return;

    try {
      setLoading(true);
      setError('');

      const lesson: Lesson = {
        id: Date.now().toString(),
        title: newLesson.title,
        description: newLesson.description,
        videoUrl: newLesson.videoUrl,
        duration: parseInt(newLesson.duration) || 0
      };

      const response = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch_id: selectedBatch.batch_id,
          lesson
        })
      });

      if (response.ok) {
        setShowAddLesson(false);
        setNewLesson({ title: '', description: '', videoUrl: '', duration: '' });
        await fetchData();
        const updatedBatch = batches.find(b => b.batch_id === selectedBatch.batch_id);
        if (updatedBatch) {
          setSelectedBatch(updatedBatch);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add lesson');
      }
    } catch {
      setError('Failed to add lesson');
    } finally {
      setLoading(false);
    }
  };

  const editLesson = async () => {
    if (!selectedBatch || !editingLesson) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/admin/lessons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch_id: selectedBatch.batch_id,
          lesson_id: editingLesson.id,
          updated_lesson: {
            title: newLesson.title,
            description: newLesson.description,
            videoUrl: newLesson.videoUrl,
            duration: parseInt(newLesson.duration) || 0
          }
        })
      });

      if (response.ok) {
        setShowEditLesson(false);
        setEditingLesson(null);
        setNewLesson({ title: '', description: '', videoUrl: '', duration: '' });
        await fetchData();
        const updatedBatch = batches.find(b => b.batch_id === selectedBatch.batch_id);
        if (updatedBatch) {
          setSelectedBatch(updatedBatch);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update lesson');
      }
    } catch {
      setError('Failed to update lesson');
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (lessonId: string) => {
    if (!selectedBatch) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/admin/lessons', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch_id: selectedBatch.batch_id,
          lesson_id: lessonId
        })
      });

      if (response.ok) {
        await fetchData();
        const updatedBatch = batches.find(b => b.batch_id === selectedBatch.batch_id);
        if (updatedBatch) {
          setSelectedBatch(updatedBatch);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete lesson');
      }
    } catch {
      setError('Failed to delete lesson');
    } finally {
      setLoading(false);
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setNewLesson({
      title: lesson.title,
      description: lesson.description || '',
      videoUrl: lesson.videoUrl || '',
      duration: lesson.duration?.toString() || ''
    });
    setShowEditLesson(true);
  };

  const enrollStudent = async () => {
    if (!selectedBatch || !selectedStudent) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/admin/batch-enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: parseInt(selectedStudent),
          batch_id: selectedBatch.batch_id,
          payment_amount: parseFloat(paymentAmount) || 0
        })
      });

      if (response.ok) {
        setShowManageEnrollments(false);
        setSelectedStudent('');
        setPaymentAmount('');
        await fetchBatchEnrollments(selectedBatch.batch_id);
        await fetchData();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to enroll student');
      }
    } catch {
      setError('Failed to enroll student');
    } finally {
      setLoading(false);
    }
  };

  const removeEnrollment = async (studentId: number) => {
    if (!selectedBatch) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/admin/batch-enrollments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          batch_id: selectedBatch.batch_id
        })
      });

      if (response.ok) {
        await fetchBatchEnrollments(selectedBatch.batch_id);
        await fetchData();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to remove enrollment');
      }
    } catch {
      setError('Failed to remove enrollment');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchSelect = (batch: Batch) => {
    setSelectedBatch(batch);
    fetchBatchEnrollments(batch.batch_id);
  };

  if (loading && batches.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Batch Management</h2>
        <Button
          onClick={() => setShowCreateBatch(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create New Batch
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Batches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {batches.map((batch) => (
          <div
            key={batch.batch_id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedBatch?.batch_id === batch.batch_id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleBatchSelect(batch)}
          >
            <h3 className="font-semibold text-gray-900">{batch.course_name}</h3>
            <p className="text-sm text-gray-600">
              Start Date: {new Date(batch.course_start_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Students: {batch.student_count}
            </p>
            <p className="text-sm text-gray-600">
              Lessons: {batch.lessons?.length || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Batch Details */}
      {selectedBatch && (
        <div className="border rounded-lg p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{selectedBatch.course_name}</h3>
            <div className="space-x-2">
              <Button
                onClick={() => setShowAddLesson(true)}
                variant="outline"
                size="sm"
              >
                Add Lesson
              </Button>
              <Button
                onClick={() => setShowManageEnrollments(true)}
                variant="outline"
                size="sm"
              >
                Manage Enrollments
              </Button>
            </div>
          </div>

          {/* Lessons */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Lessons ({selectedBatch.lessons?.length || 0})</h4>
            <div className="space-y-2">
                             {selectedBatch.lessons?.map((lesson: Lesson) => (
                 <div key={lesson.id} className="border rounded p-3 bg-gray-50">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-medium">{lesson.title}</p>
                       {lesson.description && (
                         <p className="text-sm text-gray-600">{lesson.description}</p>
                       )}
                       {lesson.duration && (
                         <p className="text-sm text-gray-500">Duration: {lesson.duration} minutes</p>
                       )}
                       {lesson.videoUrl && (
                         <p className="text-sm text-blue-600 truncate">{lesson.videoUrl}</p>
                       )}
                     </div>
                     <div className="flex space-x-2">
                       <Button
                         onClick={() => handleEditLesson(lesson)}
                         variant="outline"
                         size="sm"
                       >
                         Edit
                       </Button>
                       <Button
                         onClick={() => deleteLesson(lesson.id)}
                         variant="destructive"
                         size="sm"
                       >
                         Delete
                       </Button>
                     </div>
                   </div>
                 </div>
               ))}
              {(!selectedBatch.lessons || selectedBatch.lessons.length === 0) && (
                <p className="text-gray-500 text-sm">No lessons added yet.</p>
              )}
            </div>
          </div>

          {/* Enrollments */}
          <div>
            <h4 className="font-semibold mb-3">Enrolled Students ({batchEnrollments.length})</h4>
            <div className="space-y-2">
              {batchEnrollments.map((enrollment) => (
                <div key={enrollment.enrollment_id} className="border rounded p-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{enrollment.student_name}</p>
                      <p className="text-sm text-gray-600">{enrollment.student_email}</p>
                      <p className="text-sm text-gray-500">
                        Payment: ₹{enrollment.payment_amount} | Joined: {new Date(enrollment.joined_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => removeEnrollment(enrollment.student_id)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              {batchEnrollments.length === 0 && (
                <p className="text-gray-500 text-sm">No students enrolled yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Batch Modal */}
      {showCreateBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Batch</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  value={newBatch.course_name}
                  onChange={(e) => setNewBatch({ ...newBatch, course_name: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={newBatch.course_start_date}
                  onChange={(e) => setNewBatch({ ...newBatch, course_start_date: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                onClick={() => setShowCreateBatch(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={createBatch}
                disabled={!newBatch.course_name || !newBatch.course_start_date}
              >
                Create Batch
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showAddLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Lesson</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter lesson title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  rows={3}
                  placeholder="Enter lesson description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  value={newLesson.videoUrl}
                  onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter video URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newLesson.duration}
                  onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter duration in minutes"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                onClick={() => setShowAddLesson(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={addLesson}
                disabled={!newLesson.title}
              >
                Add Lesson
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lesson Modal */}
      {showEditLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Lesson</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter lesson title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  rows={3}
                  placeholder="Enter lesson description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  value={newLesson.videoUrl}
                  onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter video URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newLesson.duration}
                  onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter duration in minutes"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                onClick={() => {
                  setShowEditLesson(false);
                  setEditingLesson(null);
                  setNewLesson({ title: '', description: '', videoUrl: '', duration: '' });
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={editLesson}
                disabled={!newLesson.title}
              >
                Update Lesson
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Enrollments Modal */}
      {showManageEnrollments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Enroll Student</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Student
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Choose a student</option>
                  {students.map((student) => (
                    <option key={student.student_id} value={student.student_id}>
                      {student.name} ({student.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter payment amount"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                onClick={() => setShowManageEnrollments(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={enrollStudent}
                disabled={!selectedStudent}
              >
                Enroll Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 