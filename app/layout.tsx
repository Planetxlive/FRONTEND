import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreProvider } from './store/StoreProvider';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PlanetX - Your Trusted Real Estate Partner',
  description:
    'Find your dream property with PlanetX. We connect dreams with properties, making every transaction seamless and every home perfect.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <StoreProvider>
        <html lang="en">
          <body className={inter.className}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer showScrollToTop={false} />
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  );
}
