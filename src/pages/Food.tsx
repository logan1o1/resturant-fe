
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CreateFood } from '../components/CreateFood';
import { UpdateFood } from '../components/UpdateFood';
import { AuthContext } from '../context/AuthContext';
import { decodeJwt } from '../utils/jwtDecode';
import { Plus, Edit } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  price: string;
  ingredients: string[];
  restId: string;
}

export const Food: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const { id } = useParams<{ id: string }>();
  const { authToken } = useContext(AuthContext);
  const decodedToken = decodeJwt(authToken);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('/api/food/getfood');
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to fetch food items.');
      } else {
        const filteredFood = data.filter((item: FoodItem) => item.restId === id);
        setFoodItems(filteredFood);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchFoodItems();
    }
  }, [id]);

  const handleUpdateClick = (food: FoodItem) => {
    setSelectedFood(food);
  };

  const handleCloseModal = () => {
    setSelectedFood(null);
    setIsCreateModalOpen(false);
    fetchFoodItems();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">Menu</h1>
          {/* TODO: Show this button only to the restaurant owner */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors shadow-lg"
          >
            <Plus />
            Add Food Item
          </button>
        </div>
        {error && <p className="bg-red-100 text-red-700 p-4 rounded-lg mb-8 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((food) => (
            <div key={food.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/featured/?food,${food.name.split(' ').join(',')}')` }}></div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-orange-500 transition-colors">{food.name}</h3>
                  <p className="text-xl font-bold text-orange-500">${food.price}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{food.ingredients}</p>
                {/* TODO: Show this button only to the restaurant owner */}
                <div className="pt-4 border-t">
                  <button
                    onClick={() => handleUpdateClick(food)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
                  >
                    <Edit className="h-5 w-5" />
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {id && (
        <CreateFood
          restId={id}
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {selectedFood && (
        <UpdateFood
          foodItem={selectedFood}
          isOpen={!!selectedFood}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
