import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from '../context/AuthContext';


const Signup: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signin } = useAuthContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const results = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await results.json();
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      signin(data.token);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log("The error is: ", error);
    }
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

          <button
            type="button"
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
          >
            <FcGoogle />
            Sign up with Google
          </button>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm font-medium text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Username
              </label>
              <input
                id="username"
                type="username"
                placeholder="username"
                onChange={handleChange}
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
                onChange={handleChange}
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



