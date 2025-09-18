import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateData, setUpdateData] = useState({
    status: '',
    priority: '',
    notes: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchContactDetail();
  }, [id, navigate]);

  const fetchContactDetail = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/contact/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/admin/login');
          return;
        }
        throw new Error('Failed to fetch contact details');
      }

      const data = await response.json();
      setContact(data.data);
      setUpdateData({
        status: data.data.status,
        priority: data.data.priority,
        notes: data.data.notes || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      const data = await response.json();
      setContact(data.data);
      alert('Contact updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Contact Details</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center py-10">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Contact Details</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center py-10 text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Contact Details</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center py-10 text-gray-500">Contact not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Details</h1>
          <button
            onClick={() => navigate('/admin/contacts')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Contacts
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm">Name:</span>
                    <p className="font-medium">{contact.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Email:</span>
                    <p className="font-medium">{contact.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Subject:</span>
                    <p className="font-medium">{contact.subject}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Submitted:</span>
                    <p className="font-medium">{formatDate(contact.createdAt)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Source:</span>
                    <p className="font-medium">{contact.source}</p>
                  </div>
                  {contact.ipAddress && (
                    <div>
                      <span className="text-gray-500 text-sm">IP Address:</span>
                      <p className="font-medium">{contact.ipAddress}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Status Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm">Status:</span>
                    <p className="font-medium">{contact.status.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Priority:</span>
                    <p className="font-medium">{contact.priority}</p>
                  </div>
                  {contact.repliedBy && (
                    <div>
                      <span className="text-gray-500 text-sm">Replied By:</span>
                      <p className="font-medium">{contact.repliedBy.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Message</h2>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{contact.message}</div>
            </div>

            <form onSubmit={handleSubmit} className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Update Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={updateData.status}
                    onChange={handleChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="SPAM">Spam</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={updateData.priority}
                    onChange={handleChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                  Admin Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={updateData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Add notes about this contact..."
                ></textarea>
              </div>
              
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;