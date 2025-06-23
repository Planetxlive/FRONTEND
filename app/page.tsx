'use client';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import ChatSection from '@/components/ChatSection';
import StatsSection from '@/components/StatsSection';
import Destination from '@/components/Destination/Destination';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Destination />
      {/* <Hotel /> */}
      <FeatureCards />
      <ChatSection />
      <StatsSection />
    </main>
  );
}
