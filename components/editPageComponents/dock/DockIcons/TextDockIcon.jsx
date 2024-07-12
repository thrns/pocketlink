'use client';
import React, { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { FaRegFileAlt } from 'react-icons/fa';
import { useFetch } from '@/app/contexts/FetcherContext';
import { TypeOutline } from 'lucide-react';

export default function TextDockIcon({ handleAdd }) {
  const { theme } = useFetch();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // Ensure text retains its format
      handleAdd('text', 'square', {
        content: text,
        cardThemeBright: theme.textMode == 'dark' ? false : true,
        background: '',
      });
      setText('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="group flex h-full w-full items-center justify-center rounded-lg transition-all duration-200">
          <TypeOutline className="group-scale-110 h-5 w-5 transition-transform duration-200" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
          Text Component
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-2">
            <label
              htmlFor="textInput"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Text
            </label>
            <textarea
              id="textInput"
              onMouseDown={(e) => e.stopPropagation()}
              value={text}
              onChange={(e) => {
                e.stopPropagation();
                setText(e.target.value);
              }}
              placeholder="Type your text here..."
              className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2"
          >
            <FaRegFileAlt className="mr-2 h-4 w-4" />
            Add Text Component
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
