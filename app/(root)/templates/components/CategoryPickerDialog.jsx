'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function CategoryPickerDialog({
  filteredTabs,
  setActiveTab,
  activeTab,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Ensure filteredTabs is an array
  const categories = Array.isArray(filteredTabs) ? filteredTabs : [];

  // Filter categories based on search query
  const filteredCategories = categories.filter((tab) =>
    tab.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full w-full max-w-md px-4 py-2 text-center transition">
          {activeTab ? `Category: ${activeTab}` : 'Pick a category'}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 md:w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Pick a Category
          </DialogTitle>
        </DialogHeader>

        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />

        {/* Category Grid - Fixes Text Wrapping */}
        <div className="mt-4 grid max-h-64 grid-cols-2 gap-4 overflow-y-auto md:grid-cols-3">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((tab) => (
              <Button
                key={tab.category}
                variant="ghost"
                className={`flex h-auto w-full flex-col items-center justify-center rounded-md border bg-gray-200 p-3 text-center transition-all dark:bg-gray-700 ${
                  activeTab === tab.category ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setActiveTab(tab.category)}
              >
                {/* Category Name (Now Wraps Properly) */}
                <span className="mt-2 w-full break-words text-center text-sm font-medium leading-tight">
                  {tab.category}
                </span>
              </Button>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500 md:col-span-3">
              No categories found
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
