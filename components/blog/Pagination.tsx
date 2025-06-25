'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationInfo } from '@/types/blog';

interface PaginationProps {
  paginationInfo: PaginationInfo;
  baseUrl?: string;
}

export default function Pagination({
  paginationInfo,
  baseUrl = '/blog',
}: PaginationProps) {
  const { currentPage, totalPages } = paginationInfo;

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

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl;
    return `${baseUrl}?page=${page}`;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center mt-20 mb-12"
      aria-label="Blog pagination"
    >
      <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-2 border border-gray-200/50">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="flex items-center justify-center w-12 h-12 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-600 rounded-xl transition-all duration-300 group"
            aria-label="Go to previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 text-gray-300 cursor-not-allowed rounded-xl">
            <ChevronLeft className="w-5 h-5" />
          </div>
        )}

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map(page => (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={`flex items-center justify-center w-12 h-12 text-sm font-bold rounded-xl transition-all duration-300 ${
                page === currentPage
                  ? 'text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-violet-400 hover:to-purple-500'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Link>
          ))}
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="flex items-center justify-center w-12 h-12 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-600 rounded-xl transition-all duration-300 group"
            aria-label="Go to next page"
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 text-gray-300 cursor-not-allowed rounded-xl">
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>
    </nav>
  );
}
