import React, { useState, useRef, useEffect, useContext } from 'react';
import { UtensilsCrossed, Search, UserCircle, ChevronDown, LayoutDashboard, Settings, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { decodeJwt } from '../utils/jwtDecode';

const Navbar: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { authToken, signout } = useContext(AuthContext);
  const decodedToken = decodeJwt(authToken);

  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        if (!(event.target as HTMLElement).closest('#mobile-menu-button')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logOut = () => {
    signout();
  };

  return (
    <header className="font-sans bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                <UtensilsCrossed className="h-8 w-8 text-orange-500" />
                <span>FoodDash</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Home</Link>
              <Link to="/resturants" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Restaurants</Link>
              {decodedToken?.role === 'merchant' && (
                <Link to="/create-restaurant" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Create Restaurant</Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 w-40 lg:w-64 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              {authToken ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-gray-100 transition-colors"
                  >
                    <UserCircle className="h-8 w-8 text-gray-500" />
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50 border">
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>My Profile</span>
                      </Link>
                      <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                      <div className="border-t">
                        <button onClick={logOut} className="w-full text-left flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors">
                          <LogOut className="h-5 w-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <Link to="/signin" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Sign In</Link>
                  <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors font-semibold">Sign Up</Link>
                </div>
              )}

              <div className="md:hidden">
                <button id="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">Home</Link>
              <Link to="/resturants" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">Restaurants</Link>
              {decodedToken?.role === 'merchant' && (
                <Link to="/create-restaurant" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">Create Restaurant</Link>
              )}
              {!authToken && (
                <>
                  <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">Sign In</Link>
                  <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

