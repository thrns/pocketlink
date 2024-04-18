import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const EmptyState = ({ title, text, buttonText, image, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      {/* Fixed Image (Replace with Your Own) */}
      <Image
        src={image || '/empty-state.jpg'}
        alt="No Data"
        width={180}
        height={180}
        className="mb-4"
      />

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      {/* Description */}
      <p className="mt-1 text-sm text-gray-500">{text}</p>

      {/* Action Button */}
      {buttonText && onClick && (
        <Button onClick={onClick} className="mt-4">
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
