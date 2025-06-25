'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GymEditor from '@/components/gym/GymEditor';
import { Gym } from '@/types/gym';

export default function CreateGymPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    gymData: Omit<Gym, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would save to your backend/database
      console.log('Creating gym:', gymData);

      // Redirect to gym page
      router.push('/gym');
    } catch (error) {
      console.error('Error creating gym:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/gym');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-light text-gray-900">
              Add{' '}
              <span className="font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                New Gym
              </span>
            </h1>
            <p className="text-gray-600 font-light mt-1">
              Create a new fitness center profile
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GymEditor
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitButtonText="Create Gym"
        />
      </main>
    </div>
  );
}
