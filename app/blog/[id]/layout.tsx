import '../../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={inter.className}>{children}</main>;
}
