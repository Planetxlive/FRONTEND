import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'ripple' | 'orbit';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'blue' | 'green' | 'purple';
  className?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  className,
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-purple-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-500 border-t-transparent',
    blue: 'border-blue-600 border-t-transparent',
    green: 'border-green-500 border-t-transparent',
    purple: 'border-purple-600 border-t-transparent'
  };

  const dotColorClasses = {
    primary: 'bg-blue-500',
    secondary: 'bg-purple-500',
    white: 'bg-white',
    gray: 'bg-gray-500',
    blue: 'bg-blue-600',
    green: 'bg-green-500',
    purple: 'bg-purple-600'
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className={cn(
            'animate-spin rounded-full border-2',
            sizeClasses[size],
            colorClasses[color],
            className
          )} />
        );

      case 'dots':
        return (
          <div className={cn('flex space-x-1', className)}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full animate-bounce',
                  sizeClasses[size],
                  dotColorClasses[color]
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={cn(
            'rounded-full animate-pulse',
            sizeClasses[size],
            dotColorClasses[color],
            className
          )} />
        );

      case 'wave':
        return (
          <div className={cn('flex space-x-1', className)}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  'w-1 rounded-full animate-pulse',
                  dotColorClasses[color]
                )}
                style={{
                  height: size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '24px',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );

      case 'ripple':
        return (
          <div className={cn('relative', sizeClasses[size], className)}>
            <div className={cn(
              'absolute inset-0 rounded-full border-2 animate-ping',
              colorClasses[color].replace('border-t-transparent', '')
            )} />
            <div className={cn(
              'absolute inset-0 rounded-full border-2 animate-ping',
              colorClasses[color].replace('border-t-transparent', '')
            )} style={{ animationDelay: '0.5s' }} />
            <div className={cn(
              'absolute inset-0 rounded-full border-2',
              colorClasses[color]
            )} />
          </div>
        );

      case 'orbit':
        return (
          <div className={cn('relative', sizeClasses[size], className)}>
            <div className={cn(
              'absolute inset-0 rounded-full border-2 border-t-transparent animate-spin',
              colorClasses[color]
            )} />
            <div className={cn(
              'absolute inset-1 rounded-full border-2 border-b-transparent animate-spin',
              colorClasses[color]
            )} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            <div className={cn(
              'absolute inset-2 rounded-full border-2 border-l-transparent animate-spin',
              colorClasses[color]
            )} style={{ animationDuration: '2s' }} />
          </div>
        );

      default:
        return (
          <div className={cn(
            'animate-spin rounded-full border-2',
            sizeClasses[size],
            colorClasses[color],
            className
          )} />
        );
    }
  };

  if (text) {
    return (
      <div className="flex flex-col items-center space-y-3">
        {renderLoader()}
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      </div>
    );
  }

  return renderLoader();
};

export default Loader; 