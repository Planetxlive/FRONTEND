'use client';
import SearchBox from './SearchBarComp/SearchBox';

export default function Hero() {
  return (
    <section className="relative mt-20 px-4">

      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl px-6 sm:px-10 py-16 sm:py-24 max-w-7xl mx-auto shadow-lg overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 sm:top-32 right-10 sm:right-20 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 sm:top-48 right-20 sm:right-32 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-48 sm:top-64 right-8 sm:right-16 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-56 sm:top-80 right-24 sm:right-40 w-3 h-3 sm:w-5 sm:h-5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-64 sm:top-96 right-12 sm:right-24 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

          <div className="hidden sm:block absolute top-40 right-8 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/20 rounded-full"></div>
          <div className="hidden sm:block absolute top-72 right-12 w-4 h-4 sm:w-6 sm:h-6 border-2 border-white/30 rounded-full"></div>
          <div className="hidden sm:block absolute bottom-40 right-20 w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/25 rounded-full"></div>

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
              <p className="text-xs font-medium text-gray-800">Luxury Apartment</p>
              <p className="text-xs text-gray-600">Delhi, India</p>
            </div>
          </div>

          <div className="hidden lg:block absolute bottom-40 right-10 animate-float">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform rotate-6 hover:rotate-3 transition-transform duration-700">
              <div className="w-16 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-800">Commercial Space</p>
              <p className="text-xs text-gray-600">Bangalore, India</p>
            </div>
          </div>

          <div className="lg:hidden absolute top-24 right-4 animate-float">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg transform rotate-12">
              <div className="w-8 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-1"></div>
              <p className="text-xs font-medium text-gray-800">Villa</p>
            </div>
          </div>

          <div className="lg:hidden absolute top-48 right-8 animate-float-delayed">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg transform -rotate-12">
              <div className="w-8 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded mb-1"></div>
              <p className="text-xs font-medium text-gray-800">Apartment</p>
            </div>
          </div>

          {/* Chat Bubbles */}
          <div className="hidden md:block absolute top-32 sm:top-40 right-20 sm:right-32 bg-white/90 backdrop-blur-sm rounded-2xl p-2 sm:p-3 shadow-lg animate-float">
            <p className="text-xs font-medium text-gray-800">Property tour, 3pm?</p>
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find your dream <span className="text-white">property.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto px-4">
            Choose where to live and we&lsquo;ll show you the perfect home!
          </p>

          {/* Dashed Arrow */}
          <div className="hidden sm:flex justify-center my-6">
            <svg width="120" height="60" viewBox="0 0 120 60" className="text-white/60">
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
          
          <div className="mt-8 sm:mt-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 text-white">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm sm:text-base font-medium">Free Consultation & Flexible Booking available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto -mt-10 z-10">
        <SearchBox />
      </div>
    </section>
  );
}
