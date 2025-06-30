'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Star,
  Clock,
  Globe,
  Edit,
  ArrowLeft,
  Play,
  Heart,
  Share2,
  CheckCircle,
  X,
} from 'lucide-react';
import { Gym } from '@/types/gym';
import fetchGymById from '@/app/api/gyms/fetchGymById';

export default function GymDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [gym, setGym] = useState<Gym | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // const foundGym = gymsData.find((g: Gym) => g.id === params.id);
    // if (foundGym) {
    //   setGym(foundGym);
    // }
    const fetchAll = async () => {
      const gym = await fetchGymById(params.id?.toString() || '');
      setGym(gym);
    };
    fetchAll();
  }, [params.id]);

  if (!gym) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading gym details...</p>
        </div>
      </div>
    );
  }

  const formatTiming = (timing: {
    [key: string]: { open: string; close: string };
  }) => {
    if (typeof timing === 'object') {
      return Object.entries(timing).map(([day, time]) => (
        <div key={day} className="flex justify-between">
          <span className="font-medium capitalize">{day}:</span>
          <span>
            {time.open} - {time.close}{' '}
          </span>
        </div>
      ));
    }
    return timing;
  };

  const formatPricing = (pricing: { [key: string]: string | number }) => {
    if (typeof pricing === 'object') {
      return Object.entries(pricing).map(([plan, price]) => (
        <div
          key={plan}
          className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl"
        >
          <span className="font-semibold capitalize">{plan}</span>
          <span className="text-emerald-600 font-bold">₹{price}</span>
        </div>
      ));
    }
    return pricing;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Gyms</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isFavorite
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
                />
              </button>

              <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200">
                <Share2 className="w-5 h-5" />
              </button>

              <Link
                href={`/gym/edit/${gym.id}`}
                className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        {/* Main Image */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <Image
            src={
              gym.photos[selectedImageIndex] ||
              'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200'
            }
            alt={gym.gymName}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* Image Navigation */}
          {gym.photos.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {gym.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Gym Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      gym.gender === 'Male'
                        ? 'bg-blue-500'
                        : gym.gender === 'Female'
                          ? 'bg-pink-500'
                          : 'bg-purple-500'
                    }`}
                  >
                    {gym.gender}
                  </span>
                  <span className="bg-emerald-500 px-3 py-1 rounded-full text-sm font-bold">
                    Est. {gym.yearOfGym}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light mb-4">
                  {gym.gymName}
                </h1>

                <div className="flex items-center space-x-6 text-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{gym.locationName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span>4.5 (120 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Videos */}
              {gym.videos.length > 0 && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Tour</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                About This Gym
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                {gym.description}
              </p>
            </section>

            {/* Categories & Sports */}
            <section>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Categories & Sports
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {gym.categories.map(category => (
                      <span
                        key={category}
                        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Available Sports
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {gym.availableSports.map(sport => (
                      <span
                        key={sport}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Equipment */}
            <section>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Equipment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Strength Equipment
                  </h3>
                  <ul className="space-y-2">
                    {gym.strengthEquipments.map(equipment => (
                      <li
                        key={equipment}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-gray-700">{equipment}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Cardio Equipment
                  </h3>
                  <ul className="space-y-2">
                    {gym.cardioEquipments.map(equipment => (
                      <li
                        key={equipment}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-gray-700">{equipment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Services & Benefits */}
            <section>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Services & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Services
                  </h3>
                  <ul className="space-y-2">
                    {gym.services.map(service => (
                      <li key={service} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {gym.benefits.map(benefit => (
                      <li key={benefit} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gym.amenities.map(amenity => (
                  <div
                    key={amenity}
                    className="flex items-center space-x-2 p-4 bg-gray-50 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Rules */}
            {gym.rules.length > 0 && (
              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-6">
                  Gym Rules
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                  <ul className="space-y-3">
                    {gym.rules.map((rule, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-600 font-bold">
                          {index + 1}.
                        </span>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Pricing */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Pricing Plans
              </h3>
              <div className="space-y-4">{formatPricing(gym.pricing)}</div>
            </div>

            {/* Timing */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-emerald-500" />
                <span>Opening Hours</span>
              </h3>
              <div className="space-y-3 text-sm">
                {formatTiming(gym.timing)}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{gym.locationName}</span>
                </div>

                {gym.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a
                      href={gym.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Features
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Locker Facility</span>
                  {gym.lockerFacility ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && gym.videos.length > 0 && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Gym Tour</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video">
              <video
                src={gym.videos[selectedVideoIndex]}
                controls
                className="w-full h-full"
                autoPlay
              />
            </div>
            {gym.videos.length > 1 && (
              <div className="p-6 border-t">
                <div className="flex space-x-4 overflow-x-auto">
                  {gym.videos.map((video, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVideoIndex(index)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        index === selectedVideoIndex
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Video {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
