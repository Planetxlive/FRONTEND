'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import GymEditor from '@/components/gym/GymEditor';
import { Gym } from '@/types/gym';
import gymsData from '@/data/gym.json';

export default function EditGymPage() {
  const params = useParams();
  const router = useRouter();
  const [gym, setGym] = useState<Gym | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundGym = gymsData.find((g: Gym) => g.id === params.id);
    setGym(foundGym || null);
    setIsLoading(false);
  }, [params.id]);

  const handleSubmit = async (
    gymData: Omit<Gym, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would update in your backend/database
      console.log('Updating gym:', { id: params.id, ...gymData });

      // Redirect to gym page
      router.push('/gym');
    } catch (error) {
      console.error('Error updating gym:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/gym');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading gym...</p>
        </div>
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Gym Not Found
          </h2>
          <p className="text-gray-600 font-light mb-8">
            The gym you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/gym')}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300"
          >
            Back to Gyms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-light text-gray-900">
              Edit{' '}
              <span className="font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Gym
              </span>
            </h1>
            <p className="text-gray-600 font-light mt-1">
              Update gym information
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GymEditor
          initialData={gym}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitButtonText="Update Gym"
        />
      </main>
    </div>
  );
}
