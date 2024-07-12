import { Check } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const SelectableCard = ({ item, isSelected, onClick, onAdd }) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-md border-2 p-4 transition-all duration-200 ${
        isSelected
          ? 'border-bento-violet shadow-lg'
          : 'border-gray-300 border-transparent'
      }`}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="mx-auto h-32 w-full rounded-md object-cover sm:h-40 sm:w-40"
      />

      {/* Title */}
      <p className="mt-2 text-center text-sm sm:text-base">{item.title}</p>

      {/* Check mark when selected */}
      {isSelected && (
        <Check className="absolute right-2 top-2 h-5 w-5 text-bento-violet" />
      )}

      {/* Add Button (Visible Only When Selected) */}
      {isSelected && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(item.type, item.sizeKey);
          }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 transform px-4"
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default SelectableCard;
