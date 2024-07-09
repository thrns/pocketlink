'use client';
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFetch } from '@/app/contexts/FetcherContext';
import { Layers2 } from 'lucide-react';

const NestedCardIcon = ({ handleAdd }) => {
  const { theme } = useFetch();
  const [caption, setCaption] = useState('');
  const [selectedType, setSelectedType] = useState('page');
  const [imageUrl] = useState(
    [
      '/shop/gradients/shopGradient1.jpg',
      '/shop/gradients/shopGradient2.jpg',
      '/shop/gradients/shopGradient3.jpg',
      '/shop/gradients/shopGradient4.jpg',
    ][Math.floor(Math.random() * 3)]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd('nestedCard', 'square', {
      caption: caption,
      nestedCardType: selectedType,
      background: '',
      showPreview: true,
      image: imageUrl,
    });
    setCaption('');
    setSelectedType('page');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="group relative flex h-full w-full items-center justify-center rounded-lg transition-all duration-200">
          <Layers2 className="group-scale-110 h-5 w-5 transition-transform duration-200" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
          Nested Card
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-2">
            <label
              htmlFor="typeSelect"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Type
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="page">New Page</SelectItem>
                <SelectItem value="form">Form</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="captionInput"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Caption
            </label>
            <textarea
              id="captionInput"
              onMouseDown={(e) => e.stopPropagation()}
              value={caption}
              onChange={(e) => {
                e.stopPropagation();
                setCaption(e.target.value);
              }}
              placeholder="Type your caption here..."
              className="min-h-[80px] w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2"
          >
            <Layers2 className="mr-2 h-4 w-4" />
            Add Nested Card
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default NestedCardIcon;
