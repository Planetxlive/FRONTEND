'use client';
import React, { useState } from 'react';
import {
  User as UserIcon,
  MapPin,
  Phone,
  MessageSquare,
  Edit3,
  Save,
  X,
  Camera,
} from 'lucide-react';
import { User } from '../store/features/user/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [editData] = useState<User | null>(user);

  const handleSave = () => {
    // onUpdateUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // setEditData({
    //   name: user.name || '',
    //   whatsappMobile: user.whatsappMobile,
    //   mobile: user.mobile || '',
    //   state: user.state,
    //   city: user.city,
    //   coverURL: user.coverURL || ''
    // });
    setIsEditing(false);
  };

  // const getRoleBadgeColor = (role: string) => {
  //   switch (role.toLowerCase()) {
  //     case "admin":
  //       return "bg-red-100 text-red-800 border-red-200";
  //     case "moderator":
  //       return "bg-purple-100 text-purple-800 border-purple-200";
  //     case "premium":
  //       return "bg-yellow-100 text-yellow-800 border-yellow-200";
  //     default:
  //       return "bg-gray-100 text-gray-800 border-gray-200";
  //   }
  // };

  // const formatDate = (date: Date) => {
  //   return new Intl.DateTimeFormat("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   }).format(new Date(date));
  // };

  return (
    <div className="max-w-4xl mt-20 mx-auto p-6 space-y-6">
      {/* Cover Section */}
      <div className="relative">
        <div
          className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg overflow-hidden"
          style={{
            backgroundImage: user?.coverURL
              ? `url(${user?.coverURL})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {isEditing && (
            <div className="absolute top-4 right-4">
              <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                <Camera size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full shadow-lg border-4 border-white flex items-center justify-center">
              <UserIcon size={48} className="text-gray-400" />
            </div>
            {isEditing && (
              <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Camera size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white transition-colors shadow-lg"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-colors shadow-lg"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-600 transition-colors shadow-lg"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            {/* Name and Role */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData?.name}
                    // onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user?.name || 'Anonymous User'}
                  </h1>
                )}
              </div>

              {/* <div className="flex items-center gap-3"> */}
              {/* {user?.isSubscribed && (
                  <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full border border-green-200">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Subscribed</span>
                  </div>
                )} */}

              {/* <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${getRoleBadgeColor(user.role)}`}>
                  {user.role.toLowerCase() === 'admin' && <Shield size={16} />}
                  {user.role.toLowerCase() === 'premium' && <Crown size={16} />}
                  <span className="text-sm font-medium capitalize">{user.role}</span>
                </div> */}
              {/* </div> */}
            </div>

            {/* User ID and Join Date */}
            {/* <div className="flex items-center gap-4 text-gray-600 mb-6"> */}
            {/* <span className="text-sm">ID: {user?.id}</span> */}
            {/* <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span className="text-sm">
                  Joined {formatDate(user?.created_at)}
                </span>
            //   </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Phone className="text-blue-500" size={20} />
            Contact Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  //   value={editData.mobile}
                  //   onChange={(e) =>
                  // setEditData({ ...editData, mobile: e.target.value })
                  //   }
                  placeholder="Enter mobile number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {user?.mobile || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare size={16} className="text-green-500" />
                WhatsApp Mobile
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  //   value={editData.whatsappMobile}
                  //   onChange={(e) =>
                  //     setEditData({ ...editData, whatsappMobile: e.target.value })
                  //   }
                  placeholder="Enter WhatsApp number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {user?.whatsappMobile || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="text-red-500" size={20} />
            Location
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              {isEditing ? (
                <input
                  type="text"
                  //   value={editData.state}
                  //   onChange={(e) =>
                  //     setEditData({ ...editData, state: e.target.value })
                  //   }
                  placeholder="Enter state"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {user?.state || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  //   value={editData.city}
                  //   onChange={(e) =>
                  //     setEditData({ ...editData, city: e.target.value })
                  //   }
                  placeholder="Enter city"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {user?.city || 'Not provided'}
                </p>
              )}
            </div>

            {user?.latitude && user?.longitude && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Coordinates:</strong> {user?.latitude},{' '}
                  {user?.longitude}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cover URL Section */}
      {isEditing && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Cover Image
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              //   value={editData.coverURL}
              //   onChange={(e) =>
              //     setEditData({ ...editData, coverURL: e.target.value })
              //   }
              placeholder="Enter cover image URL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
