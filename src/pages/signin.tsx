import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Signin: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up with:', { name, username, email, password });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans">
      {/* Left Side - Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center md:text-left mb-8">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <UtensilsCrossed className="text-orange-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
            </div>
            <p className="text-gray-600">Join FoodDash and start ordering today!</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name" type="text" placeholder="John Doe" value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username" type="text" placeholder="johndoe" value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email" type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password" type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-orange-500 hover:text-orange-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
      {/* Right Side - Image */}
      <div className="md:w-1/2 w-full h-64 md:h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop')" }}>
        <div className="bg-black bg-opacity-50 h-full w-full flex flex-col justify-end p-10">
          <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight text-right">Your next favorite meal is just a click away.</h1>
        </div>
      </div>
    </div>
  );
};

export default Signin;
