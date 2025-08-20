import React, { useState } from 'react';
import { UtensilsCrossed, User, AtSign, Lock, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const results = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await results.json();
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        console.log(data);
        return;
      }
      setLoading(false);
      setError(null);
      // console.log(data);
      navigate("/signin");
    } catch (error) {
      console.log("Error is: ", error);
      setLoading(false);
      // setError(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans">
      <div className="md:w-1/2 lg:w-3/5 w-full hidden md:block">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1887&auto=format&fit=crop')" }}>
          <div className="bg-black bg-opacity-40 h-full w-full flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-3">
              <UtensilsCrossed size={32} />
              <span className="text-2xl font-bold">FoodDash</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Join the Feast.
              </h1>
              <p className="text-lg lg:text-xl text-gray-200">
                Discover and order from the best restaurants in your area. Quick, easy, and delicious.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 lg:w-2/5 w-full flex items-center justify-center p-6 md:p-10 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900">Create an Account</h2>
            <p className="mt-2 text-gray-600">
              Already have an account?{' '}
              <Link to={'/signin'} className="font-medium text-orange-600 hover:text-orange-500">Signin here</Link>
            </p>
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

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name" type="text" placeholder="John Doe"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username" type="text" placeholder="johndoe"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AtSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email" type="email" placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-orange-600">
              Terms of Service
            </Link>
            {' and '}
            <Link to="/privacy" className="underline hover:text-orange-600">
              Privacy Policy
            </Link>.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;

