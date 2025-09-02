import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { decodeJwt } from '../utils/jwtDecode';
import { UpdateRestaurant } from '../components/UpdateRestaurant';
import { CreateRestaurant } from '../components/CreateRestaurant';
import { Plus } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  location: string;
  ownerId: string;
}

export const Resturants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { authToken } = useContext(AuthContext);
  const decodedToken = decodeJwt(authToken);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/resturant/get');
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to fetch restaurants.');
      } else {
        setRestaurants(data);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleUpdateClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
    setIsCreateModalOpen(false);
    fetchRestaurants();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-white font-bold">Restaurants</h2>
        {decodedToken?.role === 'merchant' && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
          >
            <Plus size={20} />
            Create Restaurant
          </button>
        )}
      </div>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link to={`/food/${restaurant.id}`} >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.location}</p>
              </div>
            </Link>
            {decodedToken?.role === 'merchant' && decodedToken.id === restaurant.ownerId && (
              <div className="p-4 bg-gray-50 border-t">
                <button
                  onClick={() => handleUpdateClick(restaurant)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <CreateRestaurant isOpen={isCreateModalOpen} onClose={handleCloseModal} />

      {selectedRestaurant && (
        <UpdateRestaurant
          restaurant={selectedRestaurant}
          isOpen={!!selectedRestaurant}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
