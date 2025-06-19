'use client';

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>

      {/* Floating Property Cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Property Cards scattered around */}
        <div className="absolute top-20 left-20 transform rotate-12 animate-float">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
            <div className="w-12 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg mb-1"></div>
            <p className="text-xs font-medium text-gray-800">Casa Gracia</p>
            <p className="text-xs text-gray-600">Barcelona, Spain</p>
          </div>
        </div>

        <div className="absolute top-32 right-32 transform -rotate-6 animate-float-delayed">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
            <div className="w-12 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg mb-1"></div>
            <p className="text-xs font-medium text-gray-800">Salty Jackal</p>
            <p className="text-xs text-gray-600">Swakopmund, Namibia</p>
          </div>
        </div>

        <div className="absolute bottom-32 left-32 transform rotate-6 animate-float">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
            <div className="w-12 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mb-1"></div>
            <p className="text-xs font-medium text-gray-800">Casa Angel Hostel</p>
            <p className="text-xs text-gray-600">Oaxaca, Mexico</p>
          </div>
        </div>

        <div className="absolute bottom-20 right-20 transform -rotate-12 animate-float-delayed">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg mb-1"></div>
            <p className="text-xs font-medium text-gray-800">Viajero Tayrona</p>
            <p className="text-xs text-gray-600">Buritaca, Colombia</p>
          </div>
        </div>

        <div className="absolute top-1/2 left-16 transform rotate-3 animate-float">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
            <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg mb-1"></div>
            <p className="text-xs font-medium text-gray-800">Generator</p>
            <p className="text-xs text-gray-600">Barcelona, Spain</p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              The world's best properties,
              <br />
              with over <span className="text-green-300">13 million</span>
              <br />
              <span className="text-green-300">reviews.</span>
            </h2>
            <p className="text-xl text-purple-100 leading-relaxed">
              With over 16,500 properties in 180 countries, there's always
              room for a new adventure!
            </p>
          </div>

          {/* Right Content - Empty for floating cards */}
          <div className="relative">
            {/* This space is intentionally left for the floating cards */}
          </div>
        </div>
      </div>
    </section>
  );
}