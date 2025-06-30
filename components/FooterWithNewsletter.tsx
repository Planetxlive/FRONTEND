'use client';

import Footer from './Footer';
import Newsletter from './NewsLetter';

interface FooterWithNewsletterProps {
  className?: string;
  showScrollToTop?: boolean;
  newsletterVariant?: 'default' | 'compact';
}

export default function FooterWithNewsletter({
  className = '',
  showScrollToTop = true,
  newsletterVariant = 'default',
}: FooterWithNewsletterProps) {
  return (
    <>
      <Newsletter variant={newsletterVariant} />
      <Footer className={className} showScrollToTop={showScrollToTop} />
    </>
  );
}
