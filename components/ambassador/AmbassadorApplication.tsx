'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface AmbassadorApplicationProps {
  onSubmit: (formData: any) => Promise<{ success: boolean; error?: string }>;
}

export function AmbassadorApplication({ onSubmit }: AmbassadorApplicationProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    collegeName: '',
    collegeLocation: '',
    studentId: '',
    yearOfStudy: '',
    branch: '',
    phoneNumber: user?.phone_number || '',
    linkedinProfile: '',
    whyAmbassador: '',
    experience: '',
    idProofFile: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, idProofFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('collegeName', formData.collegeName);
      formDataToSend.append('collegeLocation', formData.collegeLocation);
      formDataToSend.append('studentId', formData.studentId);
      formDataToSend.append('yearOfStudy', formData.yearOfStudy);
      formDataToSend.append('branch', formData.branch);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      if (formData.linkedinProfile) {
        formDataToSend.append('linkedinProfile', formData.linkedinProfile);
      }
      formDataToSend.append('whyAmbassador', formData.whyAmbassador);
      if (formData.experience) {
        formDataToSend.append('experience', formData.experience);
      }
      if (formData.idProofFile) {
        formDataToSend.append('idProofFile', formData.idProofFile);
      }

      const result = await onSubmit(formDataToSend);
      if (result.success) {
        setMessage({ type: 'success', text: 'Application submitted successfully! We will review it within 2-3 working days.' });
        setFormData({
          collegeName: '',
          collegeLocation: '',
          studentId: '',
          yearOfStudy: '',
          branch: '',
          phoneNumber: user?.phone_number || '',
          linkedinProfile: '',
          whyAmbassador: '',
          experience: '',
          idProofFile: null,
        });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit application.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while submitting your application.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply to Become an Ambassador</h2>
        <p className="text-gray-600">
          Fill out the form below to apply for our college ambassador program. 
          Verification takes 2-3 working days.
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
              College/University Name *
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your college name"
            />
          </div>

          <div>
            <label htmlFor="collegeLocation" className="block text-sm font-medium text-gray-700 mb-2">
              College Location *
            </label>
            <input
              type="text"
              id="collegeLocation"
              name="collegeLocation"
              value={formData.collegeLocation}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City, State"
            />
          </div>

          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
              Student ID Number *
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your student ID"
            />
          </div>

          <div>
            <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
              Year of Study *
            </label>
            <select
              id="yearOfStudy"
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="5th Year">5th Year</option>
            </select>
          </div>

          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
              Branch/Department *
            </label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Computer Science, Mechanical"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div>
          <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile (Optional)
          </label>
          <input
            type="url"
            id="linkedinProfile"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label htmlFor="whyAmbassador" className="block text-sm font-medium text-gray-700 mb-2">
            Why do you want to become an ambassador? *
          </label>
          <textarea
            id="whyAmbassador"
            name="whyAmbassador"
            value={formData.whyAmbassador}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us why you'd be a great ambassador..."
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Relevant Experience (Optional)
          </label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any relevant experience in organizing events, leadership roles, etc."
          />
        </div>

        <div>
          <label htmlFor="idProofFile" className="block text-sm font-medium text-gray-700 mb-2">
            College ID Proof *
          </label>
          <input
            type="file"
            id="idProofFile"
            name="idProofFile"
            onChange={handleFileChange}
            required
            accept=".jpg,.jpeg,.png,.pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload your college ID card, student ID, or any official document proving your enrollment
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• We'll review your application within 2-3 working days</li>
            <li>• You'll receive an email notification about the status</li>
            <li>• If approved, you'll get access to your ambassador dashboard</li>
            <li>• You can start generating referral links and tracking enrollments</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}
