import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('demo@fooddash.com');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans">
      <div className="md:w-1/2 w-full h-64 md:h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="bg-black bg-opacity-50 h-full w-full flex flex-col justify-end p-10">
          <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight">Discover delicious eats.</h1>
          <p className="text-gray-200 mt-4 text-lg">Order from your favorite restaurants, right to your door.</p>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center md:text-left mb-8">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <UtensilsCrossed className="text-orange-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">FoodDash</h2>
            </div>
            <p className="text-gray-600">Welcome back! Please login to your account.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-orange-500 hover:text-orange-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
