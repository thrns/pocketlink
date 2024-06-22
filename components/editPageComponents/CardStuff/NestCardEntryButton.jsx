'use client';

import { useRouter, usePathname } from 'next/navigation';
import { DoorOpen, SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Adjust import based on your setup

const NestCardEntryButton = ({ cardId }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  return (
    <Button
      className="rounded-full bg-transparent text-bento-indigo shadow-none"
      onClick={() => router.push(`${pathname}/${cardId}`)} // Navigate to currentPath + cardId
    >
      <SquareArrowOutUpRight size={16} />
    </Button>
  );
};

export default NestCardEntryButton;
