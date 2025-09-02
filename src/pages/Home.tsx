import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Restaurant {
  id: string;
  name: string;
  location: string;
}

interface FoodItem {
  id: string;
  name: string;
  price: number;
  ingredients: string[];
}

export const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const [resResponse, foodResponse] = await Promise.all([
          fetch('/api/resturant/get'),
          fetch('/api/food/getfood'),
        ]);

        const resData = await resResponse.json();
        const foodData = await foodResponse.json();

        if (!resResponse.ok) {
          setError(resData.message || 'Failed to fetch restaurants.');
        } else {
          setRestaurants(resData.slice(0, 3));
        }

        if (!foodResponse.ok) {
          setError(foodData.message || 'Failed to fetch food items.');
        } else {
          setFoodItems(foodData.slice(0, 3));
        }
      } catch (error) {
        setError('An unexpected error occurred.');
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-cover bg-center h-96" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">FoodDash</h1>
          <p className="text-xl mb-8">Discover the best food & drinks near you</p>
          <div className="w-full max-w-md">
            {/* <div className="relative">
              <input
                type="text"
                placeholder="Search for restaurants or dishes"
                className="w-full bg-white text-gray-900 rounded-full py-3 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-0 top-0 mt-2 mr-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Featured Restaurants Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Restaurants</h2>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Link to={`/food/${restaurant.id}`} key={restaurant.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Food Items Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Dishes</h2>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((food) => (
              <div key={food.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{food.name}</h3>
                  <p className="text-gray-800 font-semibold">${food.price}</p>
                  <p className="text-gray-600">{food.ingredients.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};