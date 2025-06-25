'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Edit,
  Trash2,
  Eye,
  Search,
  MapPin,
  Star,
  Dumbbell,
  Heart,
  Shield,
  Grid3X3,
  List,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  Award,
  Clock,
} from 'lucide-react';
import { Gym } from '@/types/gym';
import gymsData from '@/data/gym.json';

const GYMS_PER_PAGE = 12;

export default function GymPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Initialize filters from URL query parameters
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || 'All';
    const urlGender = searchParams.get('gender') || 'All';
    const urlSortBy = searchParams.get('sort') || 'name';
    const urlViewMode = (searchParams.get('view') as 'grid' | 'list') || 'list';

    setSearchQuery(urlSearchQuery);
    setSelectedCategory(urlCategory);
    setSelectedGender(urlGender);
    setSortBy(urlSortBy);
    setViewMode(urlViewMode);
  }, [searchParams]);

  useEffect(() => {
    setGyms(gymsData);
  }, []);

  // Update URL when filters change
  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'All' && value !== 'name' && value !== 'list') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    params.delete('page');

    const newURL = params.toString() ? `?${params.toString()}` : '';
    router.push(`/gym${newURL}`);
  };

  const categories = useMemo(() => {
    const allCategories = gyms.flatMap(gym => gym.categories);
    return Array.from(new Set(allCategories)).sort();
  }, [gyms]);

  const genders = ['All', 'Male', 'Female', 'Mixed'];

  const filteredGyms = useMemo(() => {
    let filtered = gyms.filter(gym => !gym.isDeleted);

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        gym =>
          gym.gymName.toLowerCase().includes(query) ||
          gym.description.toLowerCase().includes(query) ||
          gym.locationName?.toLowerCase().includes(query) ||
          gym.categories.some(cat => cat.toLowerCase().includes(query)) ||
          gym.availableSports.some(sport => sport.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(gym =>
        gym.categories.includes(selectedCategory)
      );
    }

    // Filter by gender
    if (selectedGender !== 'All') {
      filtered = filtered.filter(gym => gym.gender === selectedGender);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.gymName.localeCompare(b.gymName);
      if (sortBy === 'year') return b.yearOfGym - a.yearOfGym;
      if (sortBy === 'location')
        return (a.locationName || '').localeCompare(b.locationName || '');
      if (sortBy === 'rating') return 4.8 - 4.5; // Mock rating sort
      return 0;
    });

    return filtered;
  }, [gyms, searchQuery, selectedCategory, selectedGender, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredGyms.length / GYMS_PER_PAGE);
  const startIndex = (currentPage - 1) * GYMS_PER_PAGE;
  const currentGyms = filteredGyms.slice(
    startIndex,
    startIndex + GYMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    const newURL = params.toString() ? `?${params.toString()}` : '';
    router.push(`/gym${newURL}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this gym?')) {
      setGyms(
        gyms.map(gym => (gym.id === id ? { ...gym, isDeleted: true } : gym))
      );
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedGender('All');
    setSortBy('name');
    setViewMode('list');
    router.push('/gym');
  };

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Handle filter changes with URL updates
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL({ search: value });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateURL({ category: value });
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
    updateURL({ gender: value });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateURL({ sort: value });
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    updateURL({ view: mode });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Stunning Header */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Advanced Search & Filter Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-gray-200/50 shadow-2xl">
          {/* Top Row - Search and View Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            {/* Enhanced Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-300 focus-within:border-emerald-400 focus-within:shadow-lg">
                  <div className="flex items-center">
                    <div className="pl-6 pr-4 py-4">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => handleSearchChange(e.target.value)}
                      placeholder="Search gyms, locations, sports, or categories..."
                      className="flex-1 py-4 pr-6 bg-transparent text-gray-900 placeholder-gray-500 text-lg font-medium focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => handleSearchChange('')}
                        className="pr-6 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* View Mode & Filter Toggle */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-emerald-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-emerald-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  showFilters
                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200 font-medium appearance-none"
                >
                  <option value="All">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Gender Policy
                </label>
                <select
                  value={selectedGender}
                  onChange={e => handleGenderChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200 font-medium appearance-none"
                >
                  {genders.map(gender => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={e => handleSortChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200 font-medium appearance-none"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="year">Year (Newest)</option>
                  <option value="location">Location</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Reset Filters */}
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200"
                >
                  Reset All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Dumbbell className="w-8 h-8" />
                <TrendingUp className="w-6 h-6 opacity-80" />
              </div>
              <div className="text-4xl font-black mb-2">
                {gyms.filter(g => !g.isDeleted).length}
              </div>
              <div className="text-emerald-100 font-semibold">Total Gyms</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8" />
                <Sparkles className="w-6 h-6 opacity-80" />
              </div>
              <div className="text-4xl font-black mb-2">
                {categories.length}
              </div>
              <div className="text-blue-100 font-semibold">Categories</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-8 h-8" />
                <Zap className="w-6 h-6 opacity-80" />
              </div>
              <div className="text-4xl font-black mb-2">
                {filteredGyms.length}
              </div>
              <div className="text-purple-100 font-semibold">
                Filtered Results
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8" />
                <Award className="w-6 h-6 opacity-80" />
              </div>
              <div className="text-4xl font-black mb-2">
                {gyms.filter(g => !g.isDeleted && g.lockerFacility).length}
              </div>
              <div className="text-orange-100 font-semibold">With Lockers</div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {(searchQuery ||
          selectedCategory !== 'All' ||
          selectedGender !== 'All') && (
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-gray-200/50">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse"></div>
              <p className="text-gray-700 font-semibold text-lg">
                {filteredGyms.length} gym{filteredGyms.length !== 1 ? 's' : ''}{' '}
                found
                {searchQuery && (
                  <span>
                    {' '}
                    for &quot;
                    <span className="text-emerald-600 font-bold">
                      {searchQuery}
                    </span>
                    &quot;
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Gyms Display */}
        {currentGyms.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {currentGyms.map((gym, index) => (
                  <div
                    key={gym.id}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={
                            gym.photos[0] ||
                            'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800'
                          }
                          alt={gym.gymName}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                              gym.gender === 'Male'
                                ? 'bg-blue-500 text-white'
                                : gym.gender === 'Female'
                                  ? 'bg-pink-500 text-white'
                                  : 'bg-purple-500 text-white'
                            }`}
                          >
                            {gym.gender}
                          </span>
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Est. {gym.yearOfGym}
                          </span>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-bold text-gray-900">
                              4.8
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons Overlay */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <div className="flex space-x-2">
                            <Link
                              href={`/gym/${gym.id}`}
                              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-emerald-500 hover:text-white transition-all duration-200"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                            <Link
                              href={`/gym/edit/${gym.id}`}
                              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-blue-500 hover:text-white transition-all duration-200"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(gym.id)}
                              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-red-500 hover:text-white transition-all duration-200"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-200">
                            {gym.gymName}
                          </h3>
                          <button className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-2 text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium line-clamp-1">
                            {gym.locationName}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 font-light leading-relaxed">
                          {gym.description}
                        </p>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {gym.categories.slice(0, 2).map(category => (
                            <span
                              key={category}
                              className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold"
                            >
                              {category}
                            </span>
                          ))}
                          {gym.categories.length > 2 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                              +{gym.categories.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Features & Pricing */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {gym.lockerFacility && (
                              <div className="flex items-center space-x-1">
                                <Shield className="w-4 h-4 text-green-500" />
                                <span>Lockers</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Dumbbell className="w-4 h-4 text-blue-500" />
                              <span>{gym.availableSports.length} Sports</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-600">
                              {typeof gym.pricing === 'object' &&
                              gym.pricing.monthly
                                ? `₹${gym.pricing.monthly}`
                                : 'Contact'}
                            </div>
                            <div className="text-xs text-gray-500">
                              per month
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-6 mb-12">
                {currentGyms.map((gym, index) => (
                  <div
                    key={gym.id}
                    className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Image */}
                      <div className="lg:w-80 aspect-[4/3] lg:aspect-square relative overflow-hidden">
                        <Image
                          src={
                            gym.photos[0] ||
                            'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800'
                          }
                          alt={gym.gymName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="320px"
                        />
                        <div className="absolute top-4 left-4 flex space-x-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              gym.gender === 'Male'
                                ? 'bg-blue-500 text-white'
                                : gym.gender === 'Female'
                                  ? 'bg-pink-500 text-white'
                                  : 'bg-purple-500 text-white'
                            }`}
                          >
                            {gym.gender}
                          </span>
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            {gym.yearOfGym}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                                {gym.gymName}
                              </h3>
                              <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-bold text-yellow-700">
                                  4.8
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 text-gray-600 mb-4">
                              <MapPin className="w-5 h-5 text-emerald-500" />
                              <span className="font-medium">
                                {gym.locationName}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-600 mb-1">
                              {typeof gym.pricing === 'object' &&
                              gym.pricing.monthly
                                ? `₹${gym.pricing.monthly}`
                                : 'Contact'}
                            </div>
                            <div className="text-sm text-gray-500">
                              per month
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                          {gym.description}
                        </p>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {gym.categories.map(category => (
                            <span
                              key={category}
                              className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold"
                            >
                              {category}
                            </span>
                          ))}
                        </div>

                        {/* Features & Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            {gym.lockerFacility && (
                              <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-green-500" />
                                <span>Locker Facility</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <Dumbbell className="w-5 h-5 text-blue-500" />
                              <span>
                                {gym.availableSports.length} Sports Available
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-purple-500" />
                              <span>Open Daily</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Link
                              href={`/gym/${gym.id}`}
                              className="px-6 py-3 bg-emerald-100 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-200 transition-colors duration-200"
                            >
                              View Details
                            </Link>
                            <Link
                              href={`/gym/edit/${gym.id}`}
                              className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors duration-200"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(gym.id)}
                              className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors duration-200"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Advanced Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-2 border border-gray-200/50">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                      currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 hover:shadow-lg'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`flex items-center justify-center w-12 h-12 text-sm font-bold rounded-xl transition-all duration-300 ${
                          page === currentPage
                            ? 'text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg transform scale-110'
                            : 'text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-500'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 hover:shadow-lg'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-16 h-16 text-emerald-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 animate-pulse"></div>
            </div>

            <h3 className="text-3xl font-light text-gray-900 mb-4">
              No gyms found
            </h3>
            <p className="text-xl text-gray-600 mb-12 font-light max-w-md mx-auto">
              Try adjusting your search criteria or add a new gym to get
              started.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={resetFilters}
                className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                Clear All Filters
              </button>
              <Link
                href="/gym/create"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Add New Gym
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
