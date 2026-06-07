import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getInquiries, getInquiryById, updateInquiry, deleteInquiry } from '../utils/api';
import { motion } from 'framer-motion';

export default function InquiriesPage() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('new');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await getInquiries();
      setInquiries(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch inquiries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setNotes(inquiry.notes || '');
    setStatus(inquiry.status || 'new');
    setShowDetails(true);
  };

  const handleUpdateInquiry = async () => {
    try {
      await updateInquiry(selectedInquiry._id, {
        status,
        notes,
      });
      setSuccess('Inquiry updated successfully');
      setShowDetails(false);
      fetchInquiries();
    } catch (err) {
      setError('Failed to update inquiry');
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteInquiry(id);
      setSuccess('Inquiry deleted successfully');
      fetchInquiries();
    } catch (err) {
      setError('Failed to delete inquiry');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-neutral-200 rounded w-1/3"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-neutral-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="mb-8">
            <h1 className="text-4xl font-light text-neutral-900">Inquiries</h1>
            <p className="text-neutral-600 mt-2">Manage client inquiries and leads</p>
          </div>

          {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}

          <div className="space-y-4">
            {inquiries.map((inquiry, index) => (
              <motion.div
                key={inquiry._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-medium text-neutral-900">{inquiry.subject}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-neutral-600 mt-2">From: {inquiry.name} ({inquiry.email})</p>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-500">Phone:</span>
                        <p className="font-medium text-neutral-900">{inquiry.phone}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Project Type:</span>
                        <p className="font-medium text-neutral-900 capitalize">{inquiry.projectType}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Date:</span>
                        <p className="font-medium text-neutral-900">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Message:</span>
                        <p className="font-medium text-neutral-900">{inquiry.message.substring(0, 30)}...</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleViewDetails(inquiry)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteInquiry(inquiry._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {inquiries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No inquiries yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {showDetails && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-light">Inquiry Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-2xl text-neutral-500 hover:text-neutral-700"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-neutral-500">Name</span>
                    <p className="font-medium text-neutral-900">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">Email</span>
                    <p className="font-medium text-neutral-900">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">Phone</span>
                    <p className="font-medium text-neutral-900">{selectedInquiry.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">Project Type</span>
                    <p className="font-medium text-neutral-900 capitalize">{selectedInquiry.projectType}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Message</h3>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="text-neutral-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  placeholder="Add notes about this inquiry..."
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-neutral-200">
                <button
                  onClick={handleUpdateInquiry}
                  className="flex-1 px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 px-6 py-2 border border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
