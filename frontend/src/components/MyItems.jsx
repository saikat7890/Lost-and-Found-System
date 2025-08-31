import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import { useAuth } from '../context/AuthContext';

const MyItems = () => {
  const {token} = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      const response = await axiosInstance.get('/api/items/my-items', config);
      if (response.data.success) {
        setItems(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axiosInstance.delete(`/api/items/${itemId}`, config);
        if (response.data.success) {
          setItems(items.filter(item => item._id !== itemId));
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item');
      }
    }
  };

  const handleStatusUpdate = async (itemId, newStatus) => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      const response = await axiosInstance.put(`/api/items/${itemId}`, {
        status: newStatus
      }, config);
      if (response.data.success) {
        setItems(items.map(item => 
          item._id === itemId ? { ...item, status: newStatus } : item
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Posted Items</h1>
          <p className="text-gray-600 mt-2">Manage your lost and found posts</p>
        </div>
        <Link
          to="/post-item"
          className="btn-primary"
        >
          Post New Item
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'all', label: 'All Items', count: items.length },
              { key: 'lost', label: 'Lost Items', count: items.filter(item => item.type === 'lost').length },
              { key: 'found', label: 'Found Items', count: items.filter(item => item.type === 'found').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items posted yet</h3>
          <p className="text-gray-600 mb-4">Start by posting your first lost or found item</p>
          <Link to="/post-item" className="btn-primary">
            Post Item
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div key={item._id} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Image */}
                <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0">
                  {item.images && item.images[0] ? (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-lg">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.type === 'lost' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'active' 
                          ? 'bg-blue-100 text-blue-800'
                          : item.status === 'resolved'
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                    <div>
                      <span className="font-medium">Category:</span> {item.category}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {item.location}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {formatDate(item.dateOccurred)}
                    </div>
                    <div>
                      <span className="font-medium">Posted:</span> {formatDate(item.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/items/${item._id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View Details
                    </Link>
                    
                    {item.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(item._id, 'resolved')}
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          Mark as Resolved
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(item._id, 'pending')}
                          className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                        >
                          Mark as Pending
                        </button>
                      </>
                    )}
                    
                    {item.status !== 'active' && (
                      <button
                        onClick={() => handleStatusUpdate(item._id, 'active')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Mark as Active
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyItems;