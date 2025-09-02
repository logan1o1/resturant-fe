
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { decodeJwt } from '../utils/jwtDecode';
import { useNavigate } from 'react-router-dom';
import { X, Building, MapPin } from 'lucide-react';

interface CreateRestaurantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRestaurant: React.FC<CreateRestaurantProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { authToken } = useContext(AuthContext);
  const decodedToken = decodeJwt(authToken);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !location) {
      setError('Name and location are required.');
      return;
    }

    if (!decodedToken) {
      setError('You must be logged in to create a restaurant.');
      return;
    }

    try {
      const response = await fetch(`/api/resturant/create/${decodedToken.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, location }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create restaurant.');
      } else {
        setSuccess('Restaurant created successfully!');
        setTimeout(() => {
          onClose();
          navigate('/resturants');
        }, 1500);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-gray-800">Create Your Restaurant</h2>
            {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</p>}
            {success && <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">{success}</p>}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Restaurant Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., The Golden Spoon"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">
                Location
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  type="text"
                  placeholder="e.g., 123 Main St, Anytown, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4">
              <button
                onClick={onClose}
                type="button"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
              >
                Create Restaurant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
