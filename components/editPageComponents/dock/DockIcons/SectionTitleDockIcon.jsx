'use client';
import React, { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { FaHeading } from 'react-icons/fa';
import { useFetch } from '@/app/contexts/FetcherContext';

export default function SectionTitleDockIcon({ handleAdd }) {
  const { theme } = useFetch();
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      handleAdd('section title', 'full', {
        title,
        cardThemeBright: theme.textMode == 'dark' ? false : true,
        background: '',
      });
      setTitle('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="group flex h-full w-full items-center justify-center rounded-lg transition-all duration-200">
          <FaHeading className="group-scale-110 h-5 w-5 transition-transform duration-200" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
          Section Title
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-2">
            <label
              htmlFor="titleInput"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              id="titleInput"
              type="text"
              onMouseDown={(e) => e.stopPropagation()}
              value={title}
              maxLength={50}
              onChange={(e) => {
                e.stopPropagation();
                setTitle(e.target.value);
              }}
              placeholder="Enter a section title"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            <p className="ml-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
              {title.length}/50 characters
            </p>
          </div>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2"
          >
            <FaHeading className="mr-2 h-4 w-4" />
            Add Section Title
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
