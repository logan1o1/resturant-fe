import React, { useEffect, useState } from 'react';
import { UserCircle, Mail, AtSign, ShieldCheck, CalendarDays, ChefHat, Edit, Lock } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { decodeJwt } from '../utils/jwtDecode';

interface Resturant {
  id: string;
  name: string;
}

interface AccDetails {
  name: string;
  username: string;
  email: string;
  role: "user" | "admin" | "merchant";
  createdAt: string;
  restOwned: Resturant[];
}

const ProfileDetail: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <div className="bg-gray-100 p-2 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const Profile: React.FC = () => {
  const [accDetails, setAccDetails] = useState<AccDetails | null>(null)
  const { authToken } = useAuthContext()

  const memberSince = accDetails?.createdAt ? new Date(accDetails?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : "Not available"

  const decodedToken = decodeJwt(authToken)

  const getAccDetails = async () => {
    if (!authToken) {
      return
    }
    try {
      const resp = await fetch(`/api/auth/acc_details/${decodedToken?.id}`);
      const data = await resp.json();

      if (data.success == false) {
        console.log(data);
      }

      setAccDetails(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAccDetails()
  }, [authToken])

  if (!accDetails) {
    return <div className='bg-gray-50 font-sans flex items-center justify-center p-4'>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-8">

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <UserCircle className="w-32 h-32 text-gray-300" strokeWidth={1} />
            <div className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full border-4 border-white">
              <Edit className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{accDetails.name}</h1>
            <p className="text-gray-500">@{accDetails.username}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileDetail
              icon={<Mail className="w-5 h-5 text-gray-600" />}
              label="Email Address"
              value={accDetails.email}
            />
            <ProfileDetail
              icon={<ShieldCheck className="w-5 h-5 text-gray-600" />}
              label="Role"
              value={accDetails.role.charAt(0).toUpperCase() + accDetails.role.slice(1)}
            />
            <ProfileDetail
              icon={<CalendarDays className="w-5 h-5 text-gray-600" />}
              label="Member Since"
              value={memberSince}
            />
          </div>
        </div>

        {accDetails.role == "merchant" && accDetails.restOwned.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Owned Restaurants</h2>
            <div className="space-y-4">
              {accDetails.restOwned.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                  <ChefHat className="w-6 h-6 text-orange-500" />
                  <p className="font-semibold text-gray-800">{restaurant.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
            <Lock className="w-4 h-4" />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

