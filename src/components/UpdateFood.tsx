
import React, { useState } from 'react';
import { X, Utensils, DollarSign, List } from 'lucide-react';

interface UpdateFoodProps {
  foodItem: {
    id: string;
    name: string;
    price: number;
    ingredients: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateFood: React.FC<UpdateFoodProps> = ({ foodItem, isOpen, onClose }) => {
  const [name, setName] = useState(foodItem.name);
  const [price, setPrice] = useState(foodItem.price.toString());
  const [ingredients, setIngredients] = useState(foodItem.ingredients.join(', '));
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !price || !ingredients) {
      setError('Name, price, and ingredients are required.');
      return;
    }

    try {
      const response = await fetch(`/api/food/update/food/${foodItem.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, price: parseFloat(price), ingredients: ingredients.split(',').map(i => i.trim()) }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to update food item.');
      } else {
        setSuccess('Food item updated successfully!');
        setTimeout(() => {
          onClose();
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
            <h2 className="text-3xl font-extrabold text-center text-gray-800">Update Food Item</h2>
            {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</p>}
            {success && <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">{success}</p>}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Food Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Utensils className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., Classic Burger"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
                Price
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="price"
                  type="number"
                  placeholder="e.g., 9.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ingredients">
                Ingredients (comma-separated)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <List className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="ingredients"
                  type="text"
                  placeholder="e.g., Beef patty, lettuce, tomato"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
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
                Update Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
