'use client';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = ({ style }) => {
  const router = useRouter();
  return (
    <ArrowBigLeft
      className={style}
      onClick={() => {
        if (window.history.length > 1) {
          router.back(); // Go back if history exists
        } else {
          router.push('/');
        }
      }}
    />
  );
};

export default BackButton;
