import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../utils/api';
import { motion } from 'framer-motion';

export default function TestimonialsPage() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientTitle: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
    featured: false,
    published: false,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await getTestimonials();
      setTestimonials(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch testimonials');
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
        rating: parseInt(formData.rating),
      };

      if (editingId) {
        await updateTestimonial(editingId, data);
        setSuccess('Testimonial updated successfully');
      } else {
        await createTestimonial(data);
        setSuccess('Testimonial created successfully');
      }

      setFormData({
        clientName: '',
        clientTitle: '',
        company: '',
        content: '',
        rating: 5,
        image: '',
        featured: false,
        published: false,
      });
      setEditingId(null);
      setShowForm(false);
      fetchTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save testimonial');
      console.error(err);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      clientName: testimonial.clientName,
      clientTitle: testimonial.clientTitle,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image || '',
      featured: testimonial.featured,
      published: testimonial.published,
    });
    setEditingId(testimonial._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      setSuccess('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (err) {
      setError('Failed to delete testimonial');
      console.error(err);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
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
              <h1 className="text-4xl font-light text-neutral-900">Testimonials</h1>
              <p className="text-neutral-600 mt-2">Manage client testimonials and reviews</p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                if (showForm) {
                  setFormData({
                    clientName: '',
                    clientTitle: '',
                    company: '',
                    content: '',
                    rating: 5,
                    image: '',
                    featured: false,
                    published: false,
                  });
                }
              }}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
            >
              {showForm ? 'Cancel' : 'Add Testimonial'}
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
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Title/Position</label>
                  <input
                    type="text"
                    name="clientTitle"
                    value={formData.clientTitle}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Project Manager"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Testimonial Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="What do they have to say about your work?"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    id="featured"
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-neutral-700">
                    Mark as Featured
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    id="published"
                    className="w-4 h-4"
                  />
                  <label htmlFor="published" className="ml-2 text-sm text-neutral-700">
                    Publish on website
                  </label>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
                >
                  {editingId ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      clientName: '',
                      clientTitle: '',
                      company: '',
                      content: '',
                      rating: 5,
                      image: '',
                      featured: false,
                      published: false,
                    });
                  }}
                  className="px-6 py-2 border border-neutral-900 text-neutral-900 rounded-lg hover:bg-neutral-50 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-neutral-900">{testimonial.clientName}</h3>
                      {testimonial.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                          Featured
                        </span>
                      )}
                      {testimonial.published && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Published
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600">
                      {testimonial.clientTitle} at {testimonial.company}
                    </p>
                    <div className="mt-2">{renderStars(testimonial.rating)}</div>
                    <p className="text-neutral-700 mt-3">{testimonial.content}</p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No testimonials yet. Add your first one!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
