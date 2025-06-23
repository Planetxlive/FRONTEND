'use client';

import { MessageCircle, Users } from 'lucide-react';
import Image from 'next/image';

export default function ChatSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>

            <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8">
              <div className="w-full h-80 object-cover rounded-2xl relative">
                <Image
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="People chatting"
                  className="object-cover"
                  fill
                />
              </div>

              {/* Chat Overlay */}
              <div className="absolute top-12 right-12 bg-white rounded-2xl p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">C</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Celia</p>
                    <p className="text-xs text-gray-500">Active 3 mins ago</p>
                  </div>
                </div>
                <div className="bg-purple-500 text-white rounded-2xl p-3 mb-2">
                  <p className="text-sm">
                    Hi there! I just see that you&lsquo;ll be at the Property
                    Tour!
                  </p>
                </div>
                <p className="text-xs text-gray-500">10:22pm</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Say <span className="text-purple-600">hello</span>
              <br />
              <span className="text-gray-900">(before you go!)</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Plan a visit with neighbors, or gather a group for a property
              tour!
            </p>

            {/* Chat Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Property Chat</h3>
                  <p className="text-sm text-gray-600">
                    Connect with potential neighbors
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Community Groups
                  </h3>
                  <p className="text-sm text-gray-600">
                    Join local property discussions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
