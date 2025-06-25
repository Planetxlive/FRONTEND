'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check, Sparkles } from 'lucide-react';

interface EnhancedCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function EnhancedCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: EnhancedCategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 via-white to-violet-50/30 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop View - Grid Layout (No Horizontal Scroll) */}
        <div className="hidden lg:block">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50">
              <Sparkles className="w-5 h-5 text-violet-500" />
              <span className="text-gray-700 font-semibold text-sm tracking-wider uppercase">
                Explore Categories
              </span>
            </div>
          </div>

          {/* Grid Layout - No Horizontal Scrolling */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 max-w-6xl mx-auto">
            <button
              onClick={() => onCategoryChange('All')}
              onMouseEnter={() => setHoveredCategory('All')}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`relative px-6 py-4 text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-full overflow-hidden group ${
                selectedCategory === 'All'
                  ? 'text-white shadow-xl transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {/* Background for Active State */}
              {selectedCategory === 'All' && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600"></div>
              )}

              {/* Hover Background */}
              {hoveredCategory === 'All' && selectedCategory !== 'All' && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-purple-100"></div>
              )}

              {/* Shimmer Effect */}
              {selectedCategory === 'All' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              )}

              <span className="relative z-10 text-xs">ALL</span>

              {/* Active Indicator */}
              {selectedCategory === 'All' && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
              )}
            </button>

            {categories.map(category => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative px-6 py-4 text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-full overflow-hidden group ${
                  selectedCategory === category
                    ? 'text-violet-600 shadow-xl transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {/* Background for Active State */}
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-purple-100 border-2 border-violet-300"></div>
                )}

                {/* Hover Background */}
                {hoveredCategory === category &&
                  selectedCategory !== category && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200"></div>
                  )}

                {/* Shimmer Effect for Active */}
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-300/30 to-transparent animate-shimmer"></div>
                )}

                <span className="relative z-10 text-xs truncate">
                  {category.replace(/\s+/g, ' ').toUpperCase()}
                </span>

                {/* Active Indicator */}
                {selectedCategory === category && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-violet-500 rounded-full shadow-lg animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View - Dropdown Only */}
        <div className="lg:hidden" ref={dropdownRef}>
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200/50">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-gray-700 font-medium text-sm">
                Filter Articles
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between px-6 py-5 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-left transition-all duration-300 hover:border-violet-300 focus:border-violet-400 focus:bg-white shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600">
                  Category:
                </span>
                <span
                  className={`font-bold ${selectedCategory === 'All' ? 'text-gray-900' : 'text-violet-600'}`}
                >
                  {selectedCategory === 'All'
                    ? 'All Articles'
                    : selectedCategory}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-violet-500' : ''}`}
              />
            </button>

            {/* Enhanced Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                {/* Search Input */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-violet-50/50 to-purple-50/50">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="Search categories..."
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 transition-all duration-200 shadow-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Options */}
                <div className="max-h-80 overflow-y-auto">
                  <button
                    onClick={() => handleCategorySelect('All')}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 ${
                      selectedCategory === 'All'
                        ? 'bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 border-l-4 border-violet-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-semibold">All Articles</span>
                    {selectedCategory === 'All' && (
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-violet-600" />
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>

                  {filteredCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 border-l-4 border-violet-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-semibold">{category}</span>
                      {selectedCategory === category && (
                        <div className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-violet-600" />
                          <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  ))}

                  {filteredCategories.length === 0 && searchTerm && (
                    <div className="px-6 py-8 text-center text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="font-medium">No categories found</p>
                      <p className="text-sm">Try adjusting your search terms</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
