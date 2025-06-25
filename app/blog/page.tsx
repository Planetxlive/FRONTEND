'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import EditorialSection from '@/components/blog/EditorialSection';
import Pagination from '@/components/blog/Pagination';
import { BlogPost, PaginationInfo } from '@/types/blog';
import postsData from '@/data/post.json';

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Filter posts based on category
  const filteredPosts = useMemo(() => {
    let filtered = postsData as BlogPost[];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    return filtered;
  }, [selectedCategory]);

  // Pagination calculations
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages,
    totalPosts,
    postsPerPage: POSTS_PER_PAGE
  };

  // Reset filters when no results
  const resetFilters = () => {
    setSelectedCategory('All');
    router.push('/blog');
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Results Summary */}
        {selectedCategory !== 'All' && (
          <div className="py-8 bg-gradient-to-r from-violet-50/50 via-white to-purple-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-gray-200/50">
                <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-pulse"></div>
                <p className="text-gray-700 font-semibold text-lg">
                  {totalPosts} result{totalPosts !== 1 ? 's' : ''} found
                  {selectedCategory !== 'All' && (
                    <span> in <span className="text-violet-600 font-bold">{selectedCategory}</span></span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts */}
        {currentPosts.length > 0 ? (
          <>
            <EditorialSection 
              posts={currentPosts} 
              title="LATEST ARTICLES"
              subtitle="Discover exceptional real estate insights, market analysis, and luxury property features curated by our team of industry experts."
            />

            {/* Enhanced Category Filter - moved below articles */}
            {/* <EnhancedCategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            /> */}

            {/* Pagination */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <Pagination paginationInfo={paginationInfo} />
            </div>
          </>
        ) : (
          // No results
          <div className="py-24 bg-gradient-to-br from-violet-50/30 via-white to-purple-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-200 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-16 h-16 text-violet-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                </div>
                
                <h3 className="text-3xl font-light text-gray-900 mb-4">
                  No articles found
                </h3>
                <p className="text-xl text-gray-600 mb-12 font-light max-w-md mx-auto">
                  Try adjusting your search terms or explore all categories.
                </p>
                
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-lg rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span>Clear All Filters</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}