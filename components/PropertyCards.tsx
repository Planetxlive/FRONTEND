'use client';

import { Heart, MapPin, Bed, Bath, Square, Star, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const properties = [
  {
    id: 1,
    title: 'Luxury 3BHK Apartment',
    location: 'Bandra West, Mumbai',
    price: '₹2.5 Cr',
    originalPrice: '₹2.8 Cr',
    image:
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
    beds: 3,
    baths: 2,
    area: '1450 sq ft',
    rating: 4.8,
    reviews: 24,
    tag: 'PREMIUM',
    photos: 15,
    isLiked: false,
  },
  {
    id: 2,
    title: 'Modern 2BHK with Amenities',
    location: 'Koramangala, Bangalore',
    price: '₹85 Lac',
    originalPrice: '₹95 Lac',
    image:
      'https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=400',
    beds: 2,
    baths: 2,
    area: '1200 sq ft',
    rating: 4.6,
    reviews: 18,
    tag: 'HOT DEAL',
    photos: 12,
    isLiked: true,
  },
  {
    id: 3,
    title: 'Spacious 4BHK Villa',
    location: 'Gurgaon Sector 47',
    price: '₹3.2 Cr',
    originalPrice: '₹3.5 Cr',
    image:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    beds: 4,
    baths: 3,
    area: '2200 sq ft',
    rating: 4.9,
    reviews: 31,
    tag: 'NEW LAUNCH',
    photos: 20,
    isLiked: false,
  },
  {
    id: 4,
    title: 'Studio Apartment',
    location: 'Andheri East, Mumbai',
    price: '₹45 Lac',
    originalPrice: '₹50 Lac',
    image:
      'https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=400',
    beds: 1,
    baths: 1,
    area: '650 sq ft',
    rating: 4.4,
    reviews: 12,
    tag: 'AFFORDABLE',
    photos: 8,
    isLiked: false,
  },
  {
    id: 5,
    title: 'Penthouse with Terrace',
    location: 'CP, New Delhi',
    price: '₹5.5 Cr',
    originalPrice: '₹6 Cr',
    image:
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
    beds: 5,
    baths: 4,
    area: '3500 sq ft',
    rating: 5.0,
    reviews: 8,
    tag: 'LUXURY',
    photos: 25,
    isLiked: true,
  },
  {
    id: 6,
    title: 'Family 3BHK Flat',
    location: 'HSR Layout, Bangalore',
    price: '₹1.2 Cr',
    originalPrice: '₹1.4 Cr',
    image:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    beds: 3,
    baths: 2,
    area: '1350 sq ft',
    rating: 4.7,
    reviews: 22,
    tag: 'FAMILY FRIENDLY',
    photos: 14,
    isLiked: false,
  },
];

const getTagColor = (tag: string) => {
  switch (tag) {
    case 'PREMIUM':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'HOT DEAL':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'NEW LAUNCH':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'AFFORDABLE':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'LUXURY':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'FAMILY FRIENDLY':
      return 'bg-pink-100 text-pink-800 border-pink-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function PropertyCards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover handpicked properties that match your dreams and budget
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div className="relative w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700">
                  <Image
                    src={property.image}
                    alt={property.title}
                    className="object-cover"
                    fill
                  />
                </div>

                {/* Overlays */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <Badge
                    className={`${getTagColor(property.tag)} border font-medium`}
                  >
                    {property.tag}
                  </Badge>
                  <div className="flex space-x-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex items-center space-x-1">
                      <Camera className="w-4 h-4 text-white" />
                      <span className="text-white text-xs font-medium">
                        {property.photos}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`rounded-full p-2 backdrop-blur-sm transition-all duration-300 ${
                        property.isLiked
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${property.isLiked ? 'fill-current' : ''}`}
                      />
                    </Button>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 text-white">
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-xs font-medium">
                        {property.rating}
                      </span>
                      <span className="text-xs">({property.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {property.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>

                {/* Property Features */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4" />
                    <span>{property.area}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {property.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {property.originalPrice}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-6 hover:shadow-lg transition-all duration-300 group">
                    <span>View Details</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300">
            Load More Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
