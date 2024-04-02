import { useState } from 'react';
import CategoryPickerDialog from './CategoryPickerDialog';
import { Input } from '@/components/ui/input';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  filteredTabs,
  activeTab,
  setActiveTab,
}) {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search template..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border bg-white p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white md:w-3/4"
      />

      {/* Category Picker */}
      <CategoryPickerDialog
        filteredTabs={filteredTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
