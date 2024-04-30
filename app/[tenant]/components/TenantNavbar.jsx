'use client';

import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function TenantNavbar({ data, id, themeData }) {
  const router = useRouter();
  const [caption, setCaption] = useState('');

  // Find the matching item from the data
  useEffect(() => {
    if (id && data) {
      const item = data.items.find((item) => item.i == id);
      if (item) {
        setCaption(item.caption); // Set the caption if the item is found
      }
    }
  }, [id, data]);

  const backgroundColor = themeData?.color;
  const textColor = themeData?.textMode === 'dark' ? 'black' : 'white';

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className="sticky top-0 z-50 mb-10 flex w-full items-center justify-start p-4"
    >
      <ArrowBigLeft
        style={{ color: textColor }}
        size={28}
        className="cursor-pointer"
        onClick={() => {
          if (window.history.length > 1) {
            router.back(); // Go back if history exists
          } else {
            router.push('/');
          }
        }}
      />
      {caption && (
        <span
          style={{ color: textColor }}
          className="ml-4 block max-w-[80vw] truncate text-lg font-semibold"
        >
          {caption}
        </span>
      )}
    </div>
  );
}
