'use client';

import { MessageCircle, Users, Phone } from 'lucide-react';

const features = [
  {
    title: "Connect with Neighbors",
    description: "Chat with people in your area",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "from-yellow-400 to-orange-500",
    icon: MessageCircle
  },
  {
    title: "Join Community Groups",
    description: "Find local property groups and events",
    image: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "from-green-400 to-teal-500",
    icon: Users
  },
  {
    title: "Expert Consultation",
    description: "Get professional property advice",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "from-blue-500 to-purple-600",
    icon: Phone
  }
];

export default function FeatureCards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                {/* Image with Gradient Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Phone Mockup */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-16 h-24 bg-white/90 rounded-lg p-1">
                      <div className="w-full h-full bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}