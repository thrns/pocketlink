'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTemplates } from './context/TemplatesContext';
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import TemplateGrid from './components/TemplateGrid';
import { Button } from '@/components/ui/button';
import { FaChevronRight } from 'react-icons/fa';

export default function Templates() {
  // State variables
  const { templates, loading, getCategories } = useTemplates();
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleTemplatesCount, setVisibleTemplatesCount] = useState({});
  const categoryRefs = useRef({});

  // Initialize visibleTemplatesCount when templates are loaded
  useEffect(() => {
    if (templates.length > 0) {
      const initialCounts = {};
      templates.forEach((template) => {
        const category = template.category || 'Uncategorized';
        initialCounts[category] = 6; // Show 2 rows of 3 templates initially
      });
      initialCounts['All'] = 6;
      setVisibleTemplatesCount(initialCounts);
    }
  }, [templates]);

  // Group templates by category
  const groupedTemplates = {};
  filteredTemplates.forEach((template) => {
    if (!template.category) {
      template.category = 'Uncategorized';
    }

    if (!groupedTemplates[template.category]) {
      groupedTemplates[template.category] = [];
    }

    groupedTemplates[template.category].push(template);
  });

  // Create list of unique categories for tabs
  const categories = getCategories();

  // Add "All" category at the beginning
  const filteredTabs = [{ category: 'All' }, ...categories];

  // Filter templates based on search query and active tab
  useEffect(() => {
    let filtered = templates;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((template) =>
        template.template_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeTab && activeTab !== 'All') {
      filtered = filtered.filter((template) => template.category === activeTab);
    }

    setFilteredTemplates(filtered);
  }, [searchQuery, activeTab, templates]);

  // Scroll to category when active tab changes
  useEffect(() => {
    if (activeTab && categoryRefs.current[activeTab]) {
      categoryRefs.current[activeTab].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [activeTab]);

  // Handle loading more templates
  const handleLoadMore = (category) => {
    setVisibleTemplatesCount((prev) => ({
      ...prev,
      [category]: prev[category] + 6,
    }));
  };

  // Render templates by category
  const renderTemplatesByCategory = () => {
    if (activeTab !== 'All') {
      // When a specific category is selected
      const templates = groupedTemplates[activeTab] || [];
      const visibleTemplates = templates.slice(
        0,
        visibleTemplatesCount[activeTab]
      );
      const hasMore = templates.length > visibleTemplatesCount[activeTab];

      return (
        <div
          key={activeTab}
          ref={(el) => (categoryRefs.current[activeTab] = el)}
          className="mb-12"
        >
          <h2 className="mb-4 text-2xl font-bold">{activeTab}</h2>
          <TemplateGrid templates={visibleTemplates} />

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => handleLoadMore(activeTab)}
                className="bg-blue-500 bg-blue-600 text-white"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      );
    } else {
      // When "All" is selected, show all categories
      return Object.keys(groupedTemplates).map((category) => {
        const templates = groupedTemplates[category];
        const visibleTemplates = templates.slice(
          0,
          visibleTemplatesCount[category]
        );
        const hasMore = templates.length > visibleTemplatesCount[category];

        return (
          <div
            key={category}
            ref={(el) => (categoryRefs.current[category] = el)}
            className="mb-12"
          >
            <h2 className="mb-4 text-2xl font-bold">{category}</h2>
            <TemplateGrid templates={visibleTemplates} />

            {hasMore && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => handleLoadMore(category)}
                  className="bg-blue-500 bg-blue-600 text-white"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        );
      });
    }
  };

  return (
    <div className="relative font-onest">
      {/* Gradient background with texture - only at the top */}
      <div
        className="absolute left-0 right-0 top-0 z-0 h-80"
        style={{
          background:
            'linear-gradient(135deg, #6363F7 0%, #D754AE 50%, #6363F7 100%)',
        }}
      />

      {/* Coarse texture overlay */}
      <div
        className="absolute left-0 right-0 top-0 z-0 h-80 opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Bottom fade to white overlay */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-40 z-0 h-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)',
        }}
      />

      <main className="container relative z-10 mx-auto px-4 py-8">
        <div className="mt-36 flex flex-col gap-8 md:flex-row">
          {/* Mini side map for desktop */}
          <aside className="sticky top-24 hidden h-fit w-64 rounded-lg bg-gray-100 p-4 dark:bg-gray-800 md:block">
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              {filteredTabs.map((tab) => (
                <li
                  key={tab.category}
                  className={`flex cursor-pointer items-center rounded-md p-2 transition-all ${
                    activeTab === tab.category
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.category)}
                >
                  <span>{tab.category}</span>
                  {activeTab === tab.category && (
                    <FaChevronRight className="ml-auto" />
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <h1 className="mb-6 text-3xl font-bold text-white">Templates</h1>

            {/* Search and category picker */}
            <div className="mb-4">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredTabs={filteredTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Tabs for mobile */}
            <div className="mb-6 md:hidden">
              <Tabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                filteredTabs={filteredTabs}
              />
            </div>

            {/* Templates */}
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center">
                <p className="text-xl text-gray-500">No templates found</p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('All');
                  }}
                  className="mt-4 bg-blue-500 bg-blue-600 text-white"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="mt-8">{renderTemplatesByCategory()}</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
