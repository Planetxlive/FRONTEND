import '../../globals.css';
import { Inter } from 'next/font/google';
import { StoreProvider } from '../../store/StoreProvider';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <StoreProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  );
}
