'use client';
import SearchBox from './SearchBarComp/SearchBox';

export default function Hero() {
  return (
    <section className="relative mt-16 sm:mt-20 px-3 sm:px-4">
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl sm:rounded-3xl px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto shadow-lg overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Animated dots - adjusted for mobile */}
          <div className="absolute top-16 sm:top-20 lg:top-32 right-6 sm:right-10 lg:right-20 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-24 sm:top-32 lg:top-48 right-12 sm:right-20 lg:right-32 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-32 sm:top-48 lg:top-64 right-4 sm:right-8 lg:right-16 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute top-40 sm:top-56 lg:top-80 right-16 sm:right-24 lg:right-40 w-2 h-2 sm:w-3 sm:h-3 lg:w-5 lg:h-5 bg-pink-400 rounded-full animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute top-48 sm:top-64 lg:top-96 right-8 sm:right-12 lg:right-24 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: '1.5s' }}
          ></div>

          {/* Border circles - hidden on mobile for cleaner look */}
          <div className="hidden sm:block absolute top-40 right-8 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/20 rounded-full"></div>
          <div className="hidden sm:block absolute top-72 right-12 w-4 h-4 sm:w-6 sm:h-6 border-2 border-white/30 rounded-full"></div>
          <div className="hidden sm:block absolute bottom-40 right-20 w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/25 rounded-full"></div>

          {/* Desktop floating cards */}
          <div className="hidden lg:block absolute top-32 right-20 animate-float">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-700">
              <div className="w-16 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-800">Modern Villa</p>
              <p className="text-xs text-gray-600">Mumbai, India</p>
            </div>
          </div>

          <div className="hidden lg:block absolute top-96 right-32 animate-float-delayed">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform -rotate-12 hover:-rotate-6 transition-transform duration-700">
              <div className="w-16 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-800">
                Luxury Apartment
              </p>
              <p className="text-xs text-gray-600">Delhi, India</p>
            </div>
          </div>

          <div className="hidden lg:block absolute bottom-40 right-10 animate-float">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform rotate-6 hover:rotate-3 transition-transform duration-700">
              <div className="w-16 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-800">
                Commercial Space
              </p>
              <p className="text-xs text-gray-600">Bangalore, India</p>
            </div>
          </div>

          {/* Mobile floating cards - simplified and better positioned */}
          <div className="lg:hidden absolute top-20 sm:top-24 right-3 sm:right-4 animate-float">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg transform rotate-6 sm:rotate-12">
              <div className="w-6 h-4 sm:w-8 sm:h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-1"></div>
              <p className="text-xs font-medium text-gray-800">Villa</p>
            </div>
          </div>

          <div className="lg:hidden absolute top-36 sm:top-48 right-6 sm:right-8 animate-float-delayed">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg transform -rotate-6 sm:-rotate-12">
              <div className="w-6 h-4 sm:w-8 sm:h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded mb-1"></div>
              <p className="text-xs font-medium text-gray-800">Apartment</p>
            </div>
          </div>

          {/* Chat Bubbles - hidden on mobile for cleaner look */}
          <div className="hidden md:block absolute top-32 sm:top-40 right-20 sm:right-32 bg-white/90 backdrop-blur-sm rounded-2xl p-2 sm:p-3 shadow-lg animate-float">
            <p className="text-xs font-medium text-gray-800">
              Property tour, 3pm?
            </p>
          </div>

          <div className="hidden md:block absolute top-56 sm:top-80 right-8 sm:right-16 bg-white/90 backdrop-blur-sm rounded-2xl p-2 sm:p-3 shadow-lg animate-float-delayed">
            <p className="text-xs text-gray-600">Anyone else here</p>
            <p className="text-xs text-gray-600">looking for 2BHK?</p>
          </div>

          <div className="hidden lg:block absolute bottom-60 right-28 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg animate-float">
            <p className="text-xs text-gray-600">Who&lsquo;s up for</p>
            <p className="text-xs text-gray-600">the property visit?</p>
          </div>
        </div>

        {/* Main Heading & Text */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            Find your dream <span className="text-white">property.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-purple-100 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
            Choose where to live and we&lsquo;ll show you the perfect home!
          </p>

          {/* Dashed Arrow - hidden on mobile for cleaner look */}
          <div className="hidden sm:flex justify-center my-4 sm:my-6">
            <svg
              width="120"
              height="60"
              viewBox="0 0 120 60"
              className="text-white/60"
            >
              <path
                d="M10 50 Q 40 10, 80 30 T 110 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
              />
              <path
                d="M105 15 L110 20 L105 25"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-white">
              <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs sm:text-sm lg:text-base font-medium leading-tight">
                Free Consultation & Flexible Booking available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Box - adjusted positioning for mobile */}
      <div className="relative max-w-4xl mx-auto -mt-6 sm:-mt-8 lg:-mt-10 z-10 px-2 sm:px-4">
        <SearchBox />
      </div>
    </section>
  );
}
