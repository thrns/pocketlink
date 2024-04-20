import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="flex flex-col items-center">
        {/* Spinning loader */}
        <div className="relative h-16 w-16">
          <div className="absolute left-0 top-0 h-full w-full animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-blue-500"></div>
          <div className="animate-spin-reverse absolute left-2 top-2 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 border-t-blue-300"></div>
        </div>
        {/* Loading text */}
        <p className="mt-4 animate-pulse text-lg font-semibold text-white">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
