'use client';

import React, { useState } from 'react';
import { X, Search, FileText, Clock } from 'lucide-react';

const TemplatesDialog = ({ isOpen, onClose, templates, onSelectTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredTemplates = templates.filter(
    (template) =>
      template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Email Templates
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 p-2 text-gray-400 text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search bar */}
        <div className="border-b px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-bento-violet focus:outline-none focus:ring-1 focus:ring-bento-violet"
            />
          </div>
        </div>

        {/* Templates list */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTemplates.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredTemplates.map((template) => (
                <button
                  key={template.uuid}
                  onClick={() => onSelectTemplate(template)}
                  className="group relative rounded-lg border border-bento-violet border-gray-200 bg-gray-50 bg-white p-4 text-left transition-all"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="line-clamp-1 font-semibold text-gray-900">
                        {template.name || 'Untitled Template'}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{formatDate(template.updated_at)}</span>
                      </div>
                    </div>
                    <div className="group-bg-gray-200 ml-3 rounded-lg bg-gray-100 p-2">
                      <FileText className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <p className="line-clamp-3 text-sm text-gray-600">
                    {template.content || 'No content available'}
                  </p>
                  <div className="group-ring-opacity-100 pointer-events-none absolute inset-0 rounded-lg ring-2 ring-bento-violet ring-opacity-0 transition-all"></div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-3">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="mb-1 font-medium text-gray-600">
                {searchTerm ? 'No templates found' : 'No templates available'}
              </p>
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? 'Try adjusting your search'
                  : 'Save your first template to see it here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesDialog;
