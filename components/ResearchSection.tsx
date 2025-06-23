'use client';

import { TrendingUp, MapPin, Search, BarChart3, FileText, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const insights = [
  {
    icon: TrendingUp,
    title: "Price Trends",
    description: "Find property rates & price trends of top locations",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "from-blue-500 to-purple-600"
  },
  {
    icon: MapPin,
    title: "City Insights",
    description: "Get to know about top cities before you invest",
    image: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "from-green-500 to-blue-500"
  },
  {
    icon: Search,
    title: "Market Research",
    description: "Find reports on Indian residential market",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "from-purple-500 to-pink-500"
  }
];

const tools = [
  {
    icon: Calculator,
    title: "EMI Calculator",
    description: "Calculate your monthly EMI",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    icon: BarChart3,
    title: "Price Comparison",
    description: "Compare property prices",
    color: "bg-green-50 text-green-600 border-green-200"
  },
  {
    icon: FileText,
    title: "Legal Documents",
    description: "Verify property papers",
    color: "bg-purple-50 text-purple-600 border-purple-200"
  }
];

export default function ResearchSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Research and Insights */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Research and Insights
            </h2>
            <p className="text-xl text-gray-600">
              Explore useful real estate insights to make informed decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                  {/* Image with Gradient Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <div className='relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'>
                      <Image
                        src={insight.image}
                        alt={insight.title}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>

                    {/* Icon */}
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <insight.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute bottom-4 right-4">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full"></div>
                    </div>
                    <div className="absolute top-4 right-8">
                      <div className="w-4 h-4 bg-white/30 backdrop-blur-sm rounded-full"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {insight.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 h-auto font-semibold group-hover:translate-x-2 transition-transform duration-300"
                    >
                      Explore →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quick Tools
            </h2>
            <p className="text-xl text-gray-600">
              Essential tools to help you with your property journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-6 rounded-2xl border-2 ${tool.color} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{tool.title}</h3>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to find your dream property?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of satisfied customers who found their perfect home with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg">
                Start Your Search
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                Talk to Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}