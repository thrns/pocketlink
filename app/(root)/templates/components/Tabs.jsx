import React from 'react';

export default function Tabs({ activeTab, setActiveTab, filteredTabs }) {
  return (
    <div className="hide-scrollbar flex overflow-x-auto pb-2">
      <div className="flex min-w-full space-x-2">
        {filteredTabs.map((tab) => (
          <div
            key={tab?.category}
            className="flex-shrink-0"
            onClick={() => setActiveTab(tab?.category)}
          >
            {/* Tab Button */}
            <button
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab?.category
                  ? 'bg-blue-100 font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                  : 'bg-gray-100 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {tab?.category
                ? tab.category.charAt(0).toUpperCase() + tab.category.slice(1)
                : 'Untitled'}
            </button>
          </div>
        ))}
      </div>

      {/* Add custom style to hide scrollbar but keep functionality */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
