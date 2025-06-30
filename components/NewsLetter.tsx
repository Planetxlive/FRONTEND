'use client';

import { useState } from 'react';

interface NewsletterProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export default function Newsletter({
  className = '',
  variant = 'default',
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically make an API call to subscribe
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-gray-800 border-t border-gray-700 ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-semibold text-white mb-2">
                Stay Updated with Latest Properties
              </h4>
              <p className="text-gray-300 text-sm">
                Get exclusive property listings and market insights
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-3 min-w-0 flex-1 sm:max-w-xs"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-400 text-white placeholder-gray-400 text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          {isSubscribed && (
            <div className="mt-3 text-center sm:text-left">
              <p className="text-emerald-400 text-sm">
                Thank you for subscribing!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-800 border-t border-gray-700 ${className}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-white mb-3">
            Stay Updated with Latest Properties
          </h4>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter for exclusive property listings and
            market insights
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-400 text-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
          {isSubscribed && (
            <div className="mt-3">
              <p className="text-emerald-400 text-sm">
                Thank you for subscribing to our newsletter!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
