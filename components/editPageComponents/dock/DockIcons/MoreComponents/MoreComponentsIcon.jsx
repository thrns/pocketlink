'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  PlusSquare,
  Search,
  X,
  LinkIcon,
  Image,
  TypeOutline,
  Layers2,
} from 'lucide-react';
import { FaHeading } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import { useFetch } from '@/app/contexts/FetcherContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useController } from '@/app/contexts/ControllerContext';
import { itemsRightPanel } from './constants/rightItems';

// LibraryContent component defined within the same file
const LibraryContent = ({ closeModal, handleSelectItem, isSmallScreen }) => {
  const { theme } = useFetch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUrlPopup, setShowUrlPopup] = useState(false);
  const [showMediaPopup, setShowMediaPopup] = useState(false);
  const [showTextPopup, setShowTextPopup] = useState(false);
  const [showHeadingPopup, setShowHeadingPopup] = useState(false);
  const [showNestedPopup, setShowNestedPopup] = useState(false);

  // Form states for each component type
  const [urlData, setUrlData] = useState({ url: '', title: '' });
  const [mediaData, setMediaData] = useState({ url: '' });
  const [textData, setTextData] = useState({ content: '' });
  const [headingData, setHeadingData] = useState({ title: '' });
  const [nestedData, setNestedData] = useState({ title: '', type: 'page' });

  // Fixed options for basic components
  const fixedOptions = [
    {
      id: 'url-fixed',
      title: 'URL',
      type: 'url',
      sizeKey: 'vertical',
      icon: LinkIcon,
      content: {
        url: '',
        title: '',
        favicon: '',
        displayImage: '',
        showPreview: true,
        watermark: true,
      },
    },
    {
      id: 'media-fixed',
      title: 'Media',
      type: 'image',
      sizeKey: 'horizontal',
      icon: Image,
      content: {
        image: '',
        caption: null,
        link: null,
      },
    },
    {
      id: 'text-fixed',
      title: 'Text',
      type: 'text',
      sizeKey: 'square',
      icon: TypeOutline,
      content: {
        content: 'Your text here',
        cardThemeBright: theme?.textMode === 'dark' ? false : true,
        background: '',
      },
    },
    {
      id: 'heading-fixed',
      title: 'Heading',
      type: 'section title',
      sizeKey: 'full',
      icon: FaHeading,
      content: {
        title: 'Section Title',
        cardThemeBright: theme?.textMode === 'dark' ? false : true,
        background: '',
      },
    },
    {
      id: 'nested-page-fixed',
      title: 'Nested Page',
      type: 'nestedCard',
      sizeKey: 'square',
      icon: Layers2,
      content: {
        nestedCardType: 'page',
        title: 'New Page',
        description: '',
        image: '',
      },
    },
  ];

  // Filter items based on search only - show all components
  const filteredItems = useMemo(() => {
    let allItems = [...itemsRightPanel];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      allItems = allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.type && item.type.toLowerCase().includes(query))
      );
    }

    return allItems;
  }, [searchQuery]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Handle popup submissions
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlData.title.trim() && urlData.url.trim()) {
      handleSelectItem({
        type: 'url',
        sizeKey: 'vertical',
        content: {
          url: urlData.url,
          title: urlData.title,
          watermark: false,
          background: '',
          showPreview: true,
          displayImage: null,
        },
      });
      setUrlData({ url: '', title: '' });
      setShowUrlPopup(false);
    }
  };

  const handleMediaSubmit = (e) => {
    e.preventDefault();
    if (mediaData.url.trim()) {
      const isVideo = mediaData.url.match(/\.(mp4|webm|ogg)$/i);
      const mediaType = isVideo ? 'video' : 'image';
      handleSelectItem({
        type: mediaType,
        sizeKey: 'horizontal',
        content: {
          [mediaType]: mediaData.url,
          caption: null,
          link: null,
        },
      });
      setMediaData({ url: '' });
      setShowMediaPopup(false);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textData.content.trim()) {
      handleSelectItem({
        type: 'text',
        sizeKey: 'square',
        content: {
          content: textData.content,
          cardThemeBright: theme?.textMode === 'dark' ? false : true,
          background: '',
        },
      });
      setTextData({ content: '' });
      setShowTextPopup(false);
    }
  };

  const handleHeadingSubmit = (e) => {
    e.preventDefault();
    if (headingData.title.trim()) {
      handleSelectItem({
        type: 'section title',
        sizeKey: 'full',
        content: {
          title: headingData.title,
          cardThemeBright: theme?.textMode === 'dark' ? false : true,
          background: '',
        },
      });
      setHeadingData({ title: '' });
      setShowHeadingPopup(false);
    }
  };

  const handleNestedSubmit = (e) => {
    e.preventDefault();
    if (nestedData.title.trim()) {
      const imageUrl = [
        '/shop/gradients/shopGradient1.jpg',
        '/shop/gradients/shopGradient2.jpg',
        '/shop/gradients/shopGradient3.jpg',
        '/shop/gradients/shopGradient4.jpg',
      ][Math.floor(Math.random() * 4)];

      handleSelectItem({
        type: 'nestedCard',
        sizeKey: 'square',
        content: {
          caption: nestedData.title,
          nestedCardType: nestedData.type,
          background: '',
          showPreview: true,
          image: imageUrl,
        },
      });
      setNestedData({ title: '', type: 'page' });
      setShowNestedPopup(false);
    }
  };

  // Handle fixed option clicks
  const handleFixedOptionClick = (item) => {
    switch (item.id) {
      case 'url-fixed':
        setShowUrlPopup(true);
        break;
      case 'media-fixed':
        setShowMediaPopup(true);
        break;
      case 'text-fixed':
        setShowTextPopup(true);
        break;
      case 'heading-fixed':
        setShowHeadingPopup(true);
        break;
      case 'nested-page-fixed':
        setShowNestedPopup(true);
        break;
      default:
        handleSelectItem(item);
    }
  };

  return (
    <div className="flex h-full max-h-[60vh] bg-white dark:bg-gray-950">
      {/* Single Content Area - No Sidebar */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Add Components
          </h2>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Paste or search a link"
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Fixed Options Section */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Quick Add
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {fixedOptions.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Popover
                    key={item.id}
                    open={
                      (item.id === 'url-fixed' && showUrlPopup) ||
                      (item.id === 'media-fixed' && showMediaPopup) ||
                      (item.id === 'text-fixed' && showTextPopup) ||
                      (item.id === 'heading-fixed' && showHeadingPopup) ||
                      (item.id === 'nested-page-fixed' && showNestedPopup)
                    }
                    onOpenChange={(open) => {
                      if (!open) {
                        setShowUrlPopup(false);
                        setShowMediaPopup(false);
                        setShowTextPopup(false);
                        setShowHeadingPopup(false);
                        setShowNestedPopup(false);
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-left transition-all hover:border-gray-300 hover:shadow-sm active:scale-[0.98] dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                        onClick={() => handleFixedOptionClick(item)}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-500">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {item.type}
                          </p>
                        </div>
                      </button>
                    </PopoverTrigger>

                    {/* URL Popup */}
                    {item.id === 'url-fixed' && (
                      <PopoverContent className="w-72 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
                        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                          URL Component
                        </h3>
                        <form
                          onSubmit={handleUrlSubmit}
                          className="flex flex-col gap-3"
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Title
                            </label>
                            <input
                              type="text"
                              value={urlData.title}
                              onChange={(e) =>
                                setUrlData({
                                  ...urlData,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Enter a descriptive title"
                              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              URL
                            </label>
                            <input
                              type="text"
                              value={urlData.url}
                              onChange={(e) =>
                                setUrlData({ ...urlData, url: e.target.value })
                              }
                              placeholder="https://example.com"
                              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                            />
                          </div>
                          <button
                            type="submit"
                            className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2"
                          >
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Add URL Component
                          </button>
                        </form>
                      </PopoverContent>
                    )}

                    {/* Media Popup */}
                    {item.id === 'media-fixed' && (
                      <PopoverContent className="w-72 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
                        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                          Media Component
                        </h3>
                        <form
                          onSubmit={handleMediaSubmit}
                          className="flex flex-col gap-3"
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Media URL
                            </label>
                            <input
                              type="text"
                              value={mediaData.url}
                              onChange={(e) =>
                                setMediaData({
                                  ...mediaData,
                                  url: e.target.value,
                                })
                              }
                              placeholder="https://example.com/image.jpg or video.mp4"
                              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                            />
                          </div>
                          <button
                            type="submit"
                            className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2"
                          >
                            <Image className="mr-2 h-4 w-4" />
                            Add Media Component
                          </button>
                        </form>
                      </PopoverContent>
                    )}

                    {/* Text Popup */}
                    {item.id === 'text-fixed' && (
                      <PopoverContent className="w-72 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
                        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                          Text Component
                        </h3>
                        <form
                          onSubmit={handleTextSubmit}
                          className="flex flex-col gap-3"
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Your Text
                            </label>
                            <textarea
                              value={textData.content}
                              onChange={(e) =>
                                setTextData({
                                  ...textData,
                                  content: e.target.value,
                                })
                              }
                              placeholder="Type your text here..."
                              className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                            />
                          </div>
                          <button
                            type="submit"
                            className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2"
                          >
                            <TypeOutline className="mr-2 h-4 w-4" />
                            Add Text Component
                          </button>
                        </form>
                      </PopoverContent>
                    )}

                    {/* Heading Popup */}
                    {item.id === 'heading-fixed' && (
                      <PopoverContent className="w-72 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
                        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                          Section Title
                        </h3>
                        <form
                          onSubmit={handleHeadingSubmit}
                          className="flex flex-col gap-3"
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Title
                            </label>
                            <input
                              type="text"
                              value={headingData.title}
                              onChange={(e) =>
                                setHeadingData({
                                  ...headingData,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Enter a section title"
                              maxLength={50}
                              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                            />
                            <p className="ml-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {headingData.title.length}/50 characters
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
                    )}

                    {/* Nested Page Popup */}
                    {item.id === 'nested-page-fixed' && (
                      <PopoverContent className="w-80 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
                        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                          Nested Card
                        </h3>
                        <form
                          onSubmit={handleNestedSubmit}
                          className="flex flex-col gap-3"
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Type
                            </label>
                            <select
                              value={nestedData.type}
                              onChange={(e) =>
                                setNestedData({
                                  ...nestedData,
                                  type: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                            >
                              <option value="page">New Page</option>
                              <option value="form">Form</option>
                              <option value="blog">Blog</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Caption
                            </label>
                            <textarea
                              value={nestedData.title}
                              onChange={(e) =>
                                setNestedData({
                                  ...nestedData,
                                  title: e.target.value,
                                })
                              }
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
                    )}
                  </Popover>
                );
              })}
            </div>
          </div>

          {/* Components List */}
          {filteredItems.length > 0 ? (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                All Components
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-left transition-all hover:border-gray-300 hover:shadow-sm active:scale-[0.98] dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-pink-500">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {item.type}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                <Search
                  size={32}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                No components found
              </p>
              <p className="max-w-sm text-center text-sm text-gray-500 dark:text-gray-400">
                {searchQuery
                  ? `No results found for "${searchQuery}". Try a different search term.`
                  : 'No components available.'}
              </p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main component
export default function MoreComponentsIcon({ className, handleAdd }) {
  const { setProfile, profile } = useFetch();
  const { theme } = useTheme();
  const { viewMode } = useController();
  const [open, setOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Memoized select handler
  const handleSelectItem = useCallback(
    (item) => {
      handleAdd(item.type, item.sizeKey, { ...item.content });
      setOpen(false);
    },
    [handleAdd]
  );

  // Render different components based on screen size
  return isSmallScreen ? (
    // Mobile: Drawer component
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div
          className={`${className} flex h-full cursor-pointer items-center justify-center gap-2 text-bento-indigo`}
        >
          <PlusSquare /> Add Content
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[60vh] w-full max-w-full overflow-hidden rounded-t-2xl border-0 p-0 shadow-2xl"
      >
        <LibraryContent
          closeModal={() => setOpen(false)}
          handleSelectItem={handleSelectItem}
          isSmallScreen={isSmallScreen}
        />
      </SheetContent>
    </Sheet>
  ) : (
    // Desktop: Dialog component
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`${className} flex h-full cursor-pointer items-center justify-center gap-2 text-bento-indigo`}
        >
          <PlusSquare /> Add Content
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border-0 p-0 shadow-2xl">
        <LibraryContent
          closeModal={() => setOpen(false)}
          handleSelectItem={handleSelectItem}
          isSmallScreen={isSmallScreen}
        />
      </DialogContent>
    </Dialog>
  );
}
