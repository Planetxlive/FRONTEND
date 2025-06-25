'use client';
import Link from 'next/link';
import FuzzyText from '@/components/ui/fuzzyText';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <FuzzyText 
          baseIntensity={0.2} 
          hoverIntensity={0.8} 
          enableHover={true}
          fontSize="clamp(4rem, 15vw, 12rem)"
          color="#000000"
        >
          404
        </FuzzyText>
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-700 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link 
            href="/" 
            className="inline-block mt-6 px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
} 