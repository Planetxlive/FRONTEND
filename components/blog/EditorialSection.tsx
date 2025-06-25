'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface EditorialSectionProps {
  posts: BlogPost[];
  title: string;
  subtitle?: string;
  onBlogClick?: (id: string) => void;
}

export default function EditorialSection({
  posts,
  title,
  subtitle,
  onBlogClick,
}: EditorialSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative Elements */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-3 rounded-full mb-8">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-semibold text-sm tracking-wider uppercase">
              Editorial Excellence
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-gray-900 mb-6 tracking-tight">
            {title.split(' ')[0]}
            <span className="block font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h2>

          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Revolutionary Card Layout */}
        <div className="space-y-24">
          {posts.map((post, index) => (
            <article key={post.id} className="group">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Image Section */}
                <div
                  className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-6' : ''}`}
                >
                  {onBlogClick ? (
                    <div
                      className="relative cursor-pointer"
                      onClick={() => onBlogClick(post.id)}
                    >
                      {/* Main Image */}
                      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {/* Floating Category Badge */}
                        <div className="absolute top-6 left-6">
                          <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                            {post.category}
                          </div>
                        </div>
                        {/* Read More Button */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <ArrowRight className="w-6 h-6 text-gray-900" />
                          </div>
                        </div>
                      </div>
                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>
                  ) : (
                    <Link href={`/blog/${post.id}`}>
                      <div className="relative">
                        {/* Main Image */}
                        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 58vw"
                          />
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* Floating Category Badge */}
                          <div className="absolute top-6 left-6">
                            <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              {post.category}
                            </div>
                          </div>
                          {/* Read More Button */}
                          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                              <ArrowRight className="w-6 h-6 text-gray-900" />
                            </div>
                          </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Content Section */}
                <div
                  className={`lg:col-span-5 space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                >
                  {/* Meta Information */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                  </div>

                  {/* Title */}
                  {onBlogClick ? (
                    <h3
                      className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300 cursor-pointer"
                      onClick={() => onBlogClick(post.id)}
                    >
                      {post.title}
                    </h3>
                  ) : (
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-300">
                        {post.title}
                      </h3>
                    </Link>
                  )}

                  {/* Excerpt */}
                  <p className="text-lg text-gray-600 leading-relaxed font-light">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium hover:from-yellow-100 hover:to-orange-100 hover:text-orange-700 transition-all duration-300 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center space-x-3 text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-300 group/link"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
