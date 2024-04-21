import React from 'react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-current border-t-transparent text-bento-violet ${sizeClass} ${className}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
