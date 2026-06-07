import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../utils/api';
import { motion } from 'framer-motion';

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    duration: 60,
    subject: '',
    notes: '',
    appointmentType: 'consultation',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAppointments();
      setAppointments(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        duration: parseInt(formData.duration),
      };

      if (editingId) {
        await updateAppointment(editingId, data);
        setSuccess('Appointment updated successfully');
      } else {
        await createAppointment(data);
        setSuccess('Appointment created successfully');
      }

      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        appointmentDate: '',
        appointmentTime: '',
        duration: 60,
        subject: '',
        notes: '',
        appointmentType: 'consultation',
      });
      setEditingId(null);
      setShowForm(false);
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save appointment');
      console.error(err);
    }
  };

  const handleEdit = (appointment) => {
    setFormData({
      clientName: appointment.clientName,
      clientEmail: appointment.clientEmail,
      clientPhone: appointment.clientPhone,
      appointmentDate: appointment.appointmentDate?.split('T')[0],
      appointmentTime: appointment.appointmentTime,
      duration: appointment.duration,
      subject: appointment.subject,
      notes: appointment.notes || '',
      appointmentType: appointment.appointmentType,
    });
    setEditingId(appointment._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await deleteAppointment(id);
      setSuccess('Appointment deleted successfully');
      fetchAppointments();
    } catch (err) {
      setError('Failed to delete appointment');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-yellow-100 text-yellow-800';
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-light text-neutral-900">Appointments</h1>
              <p className="text-neutral-600 mt-2">Manage client appointments and consultations</p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                if (showForm) {
                  setFormData({
                    clientName: '',
                    clientEmail: '',
                    clientPhone: '',
                    appointmentDate: '',
                    appointmentTime: '',
                    duration: 60,
                    subject: '',
                    notes: '',
                    appointmentType: 'consultation',
                  });
                }
              }}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
            >
              {showForm ? 'Cancel' : 'Schedule Appointment'}
            </button>
          </div>

          {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}

          {showForm && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-8 rounded-lg shadow-sm mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Client Email</label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Client Phone</label>
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Appointment Type</label>
                  <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="project-review">Project Review</option>
                    <option value="proposal">Proposal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Time</label>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
                >
                  {editingId ? 'Update Appointment' : 'Schedule'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      clientName: '',
                      clientEmail: '',
                      clientPhone: '',
                      appointmentDate: '',
                      appointmentTime: '',
                      duration: 60,
                      subject: '',
                      notes: '',
                      appointmentType: 'consultation',
                    });
                  }}
                  className="px-6 py-2 border border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-50 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-medium text-neutral-900">{appointment.subject}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-neutral-600 mt-2">{appointment.clientName} - {appointment.clientEmail}</p>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-500">Date:</span>
                        <p className="font-medium text-neutral-900">{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Time:</span>
                        <p className="font-medium text-neutral-900">{appointment.appointmentTime}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Duration:</span>
                        <p className="font-medium text-neutral-900">{appointment.duration} min</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Type:</span>
                        <p className="font-medium text-neutral-900 capitalize">{appointment.appointmentType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No appointments scheduled</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
