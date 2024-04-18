'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const CustomModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && event.target.id === 'modal-overlay') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="flex h-[80%] w-[80%] flex-col rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Content (scrollable) */}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
