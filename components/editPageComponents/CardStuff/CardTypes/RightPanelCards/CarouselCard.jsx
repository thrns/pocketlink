import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  PenLine,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Type,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useItems } from '@/app/contexts/ItemsContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import Card from '../../Card';
import TenantCard from '@/app/[tenant]/components/tenantCards/TenantCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { toast } from 'sonner';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MiscTenantCard from '@/app/[tenant]/components/tenantCards/MiscTenantCard';
import MiscCard from '../../MiscCard';
import { useController } from '@/app/contexts/ControllerContext';

export default function CarouselCard({
  itemId,
  card,
  isEditing,
  sizeKey,
  isTenant,
  isMobile = false,
  onSelect,
  setIsIsolate,
  setIsEditing: setParentIsEditing,
  enableDrag,
  setEnableDrag,
  isPhone,
  allowEdit,
  parentId,
  themeData,
  items: propItems,
  mobileItems: propMobileItems,
}) {
  const { updateItemContent } = useItems();
  const { items: contextItems, mobileItems: contextMobileItems } = useFetch();
  const { viewMode } = useController();

  // Use the props if provided (for tenant mode), otherwise use context values
  const items = isTenant && propItems ? propItems : contextItems;
  const mobileItems =
    isTenant && propMobileItems ? propMobileItems : contextMobileItems;

  const containerRef = useRef(null);
  const swiperRef = useRef(null);

  // State for settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isItemSelectorOpen, setIsItemSelectorOpen] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(card?.scrollSpeed || 300);
  const [autoScroll, setAutoScroll] = useState(card?.autoScroll || false);
  const [autoScrollInterval, setAutoScrollInterval] = useState(
    card?.autoScrollInterval || 5000
  );

  const [isHover, setIsHover] = useState(false);

  // Carousel state
  const [carouselItems, setCarouselItems] = useState(card?.carouselItems || []);
  const [itemsPerSlide, setItemsPerSlide] = useState(card?.itemsPerSlide || 1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Auto scroll pause state
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);

  // Caption state
  const [caption, setCaption] = useState(card?.caption || '');
  const [editingCaption, setEditingCaption] = useState(false);
  const [activeCaptionSlideIndex, setActiveCaptionSlideIndex] = useState(0);

  console.log('card: ', card);
  // Update carouselItems if card prop changes
  useEffect(() => {
    if (card?.carouselItems) {
      setCarouselItems(card.carouselItems);
    }
    if (card?.caption !== undefined) {
      setCaption(card.caption || '');
    }
  }, [card?.carouselItems, card?.caption]);

  // Listen for video mute/unmute events to pause/resume auto scroll
  useEffect(() => {
    const handleVideoMuteToggle = (event) => {
      const { isMuted, action } = event.detail;

      if (autoScroll && swiperRef.current && swiperRef.current.swiper) {
        if (action === 'unmuted') {
          // Video was unmuted, pause auto scroll
          swiperRef.current.swiper.autoplay.stop();
          setAutoScrollPaused(true);
        } else if (action === 'muted') {
          // Video was muted, resume auto scroll
          swiperRef.current.swiper.autoplay.start();
          setAutoScrollPaused(false);
        }
      }
    };

    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('videoMuteToggle', handleVideoMuteToggle);
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('videoMuteToggle', handleVideoMuteToggle);
      }
    };
  }, [autoScroll]); // Re-run when autoScroll changes

  // Initialize container width and calculate items per slide
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;

        // START: Items per slide calculation based on responsive design
        // Default to showing 1 item per slide as fallback
        let itemsToShow = 1;

        // CAROUSEL SIZE DETECTION:
        // Determines if this is a large carousel (full-width or wide grid)
        // - card.sizeKey includes 'full' = user selected full-width size
        // - card.w >= 6 = carousel spans 6+ grid columns (considered wide)
        const isFullWidth =
          card.sizeKey?.includes('full') || (card.w && card.w >= 6);

        const cardSize = card?.sizeKey;
        console.log('cardSize: ', cardSize);

        if (isMobile) {
          // MOBILE RESPONSIVE RULES:
          // Full-width carousels: show 3 items (more content visible)
          // Regular carousels: show 2 items (better readability)
          itemsToShow = isFullWidth ? 3 : 2;

          // MOBILE OVERRIDE: Very small screens (< 480px)
          // Force single item display for better UX on tiny screens
          if (width < 480) {
            itemsToShow = 2;
          }

          if (cardSize === 'doubleHorizontal' || cardSize === 'horizontal') {
            itemsToShow = 1;
          }
        } else {
          // DESKTOP RESPONSIVE RULES:
          // Breakpoint-based sizing for optimal viewing

          if (width < 500) {
            // Small desktop containers: 2 items
            itemsToShow = 2;
          } else if (width < 768) {
            // Medium desktop containers: 2 items
            itemsToShow = 3;
          } else {
            // Large desktop containers: 4 items (maximum)
            itemsToShow = 4;
          }

          if (
            cardSize === 'square' ||
            cardSize === 'vertical' ||
            cardSize === 'horizontal' ||
            cardSize === 'doubleHorizontal'
          ) {
            itemsToShow = 1;
          }
        }
        // END: Items per slide calculation

        // STATE UPDATE SECTION:
        // Only update if the calculated value differs from current state
        if (itemsToShow !== itemsPerSlide) {
          // Update local component state for immediate UI response
          setItemsPerSlide(itemsToShow);

          // PERSISTENCE: Save to database/context if not in edit mode
          // Prevents saving temporary values during active editing
          if (!isEditing && card.itemsPerSlide !== itemsToShow) {
            updateItemContent(itemId, { itemsPerSlide: itemsToShow });
          }
        }
      }
    };

    // INITIALIZATION: Calculate on component mount
    handleResize();

    // LISTENER: Recalculate on window resize events
    window.addEventListener('resize', handleResize);

    // CLEANUP: Remove listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [card.sizeKey, card.w, isMobile, containerRef.current?.offsetWidth]);

  // Update the card content when settings change
  const updateCardContent = (updates) => {
    updateItemContent(itemId, { ...updates });
  };

  // Handle hide settings changes
  const handleHideSettingsChange = (itemId, hideSettings) => {
    updateItemContent(itemId, hideSettings);
  };

  const handleScrollSpeedChange = (value) => {
    const speed = parseInt(value);
    if (!isNaN(speed) && speed > 0) {
      setScrollSpeed(speed);
      updateCardContent({ scrollSpeed: speed });
    }
  };

  const handleAutoScrollChange = (checked) => {
    setAutoScroll(checked);
    updateCardContent({ autoScroll: checked });

    // Apply autoplay to swiper
    if (swiperRef.current && swiperRef.current.swiper) {
      if (checked && !autoScrollPaused) {
        swiperRef.current.swiper.autoplay.start();
      } else {
        swiperRef.current.swiper.autoplay.stop();
      }
    }
  };

  const handleIntervalChange = (value) => {
    const interval = parseInt(value);
    if (!isNaN(interval) && interval > 0) {
      setAutoScrollInterval(interval);
      updateCardContent({ autoScrollInterval: interval });

      // Update autoplay delay in swiper
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.params.autoplay.delay = interval;
        if (!autoScrollPaused) {
          swiperRef.current.swiper.autoplay.stop();
          swiperRef.current.swiper.autoplay.start();
        }
      }
    }
  };

  const handleCaptionChange = (value) => {
    setCaption(value);
    updateCardContent({ caption: value });
  };

  const handleSaveSettings = () => {
    updateCardContent({
      scrollSpeed,
      autoScroll,
      autoScrollInterval,
      itemsPerSlide,
      carouselItems,
      caption,
    });
    setIsSettingsOpen(false);
  };

  // Get list of available items for selection that aren't already in carousel
  const getAvailableItems = () => {
    const allItems = isMobile ? mobileItems : items;

    return allItems.filter(
      (item) =>
        item.i !== itemId && // Not this carousel
        !carouselItems.includes(item.i) && // Not already in the carousel
        !item.parentId && // Not a child item
        // Only include images and videos
        (item.type === 'image' || item.type === 'video') &&
        // Check if item is used in any other carousel
        !(
          items?.some(
            (otherItem) =>
              otherItem.type === 'carousel' &&
              otherItem.i !== itemId && // Not this carousel
              otherItem.carouselItems?.includes(item.i)
          ) ||
          mobileItems?.some(
            (otherItem) =>
              otherItem.type === 'carousel' &&
              otherItem.i !== itemId && // Not this carousel
              otherItem.carouselItems?.includes(item.i)
          )
        )
    );
  };

  // Filter items based on search term
  const getFilteredItems = () => {
    const availableItems = getAvailableItems();
    if (!searchTerm) return availableItems;

    return availableItems.filter(
      (item) =>
        (item.title &&
          item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.text &&
          item.text.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.caption &&
          item.caption.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.type &&
          item.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Group items by type for the sectioned dialog
  const getGroupedItems = () => {
    const filteredItems = getFilteredItems();

    // Group by type, but only include image and video types
    const grouped = {};
    filteredItems.forEach((item) => {
      let type = item.type || 'Other';

      // Force categorize items with media content
      if (item.videoUrl || item.videoSrc || item.video) {
        type = 'video';
      } else if (
        item.image ||
        item.imageUrl ||
        item.contentImage ||
        item.backgroundImage
      ) {
        type = 'image';
      }

      // Only include image and video sections
      if (type === 'image' || type === 'video') {
        if (!grouped[type]) {
          grouped[type] = [];
        }
        grouped[type].push(item);
      }
    });

    return grouped;
  };

  // Render the sectioned items selector
  const renderSectionedItems = () => {
    const groupedItems = getGroupedItems();
    const sections = Object.keys(groupedItems).sort();

    if (sections.length === 0) {
      return (
        <p className="text-muted-foreground py-4 text-center dark:text-gray-400">
          No items found
        </p>
      );
    }

    return (
      <div className="space-y-6">
        {sections.map((sectionTitle) => (
          <div key={sectionTitle} className="space-y-2">
            <h3 className="flex items-center border-b pb-1 text-sm font-semibold tracking-tight dark:border-gray-700 dark:text-gray-300">
              {sectionTitle === 'image' ? (
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              ) : sectionTitle === 'video' ? (
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
              ) : sectionTitle === 'text' ? (
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="17" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="12" x2="3" y2="12"></line>
                  <line x1="15" y1="18" x2="3" y2="18"></line>
                </svg>
              ) : null}
              {sectionTitle}
              <span className="text-muted-foreground ml-2 text-xs dark:text-gray-400">
                ({groupedItems[sectionTitle].length})
              </span>
            </h3>
            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-max space-x-2 py-1">
                {groupedItems[sectionTitle].map((item) => (
                  <div
                    key={item.i}
                    className={cn(
                      'flex cursor-pointer flex-col rounded-lg border p-2 transition-all',
                      'bg-gray-50 dark:border-gray-700 dark:bg-gray-700',
                      'touch-manipulation active:scale-95',
                      selectedItems.includes(item.i)
                        ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30'
                        : '',
                      isMobile ? 'w-[150px]' : 'w-[180px]'
                    )}
                    onClick={() => toggleItemSelection(item.i)}
                  >
                    <div className="group relative mb-2 flex h-24 items-center justify-center overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
                      {item.videoUrl || item.videoSrc || item.video ? (
                        <div className="relative h-full w-full">
                          <video
                            src={item.videoUrl || item.videoSrc || item.video}
                            className="h-full w-full object-cover"
                            muted
                            loop
                            onMouseOver={(e) => e.target.play()}
                            onMouseOut={(e) => e.target.pause()}
                            poster={
                              item.imageUrl ||
                              item.image ||
                              item.backgroundImage ||
                              item.contentImage
                            }
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display =
                                'flex';
                            }}
                          />
                          <div className="group-opacity-100 absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="white"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="5 3 19 12 5 21"></polygon>
                            </svg>
                          </div>
                          <div className="absolute inset-0 hidden items-center justify-center text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="23 7 16 12 23 17 23 7"></polygon>
                              <rect
                                x="1"
                                y="5"
                                width="15"
                                height="14"
                                rx="2"
                                ry="2"
                              ></rect>
                            </svg>
                          </div>
                        </div>
                      ) : item.imageUrl ||
                        item.image ||
                        item.backgroundImage ||
                        item.contentImage ? (
                        <>
                          <img
                            src={
                              item.imageUrl ||
                              item.image ||
                              item.backgroundImage ||
                              item.contentImage
                            }
                            alt={
                              item.title ||
                              item.text ||
                              item.caption ||
                              'Item preview'
                            }
                            className="group-scale-110 h-full w-full object-cover transition-transform duration-200"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23cccccc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                            }}
                          />
                          <div className="group-bg-opacity-20 absolute inset-0 bg-black bg-opacity-0 transition-all duration-200"></div>
                          {(item.videoUrl || item.videoSrc || item.video) &&
                            getMediaTypeIndicator(item)}
                        </>
                      ) : item.type === 'image' ? (
                        <div className="text-3xl font-semibold text-gray-400 dark:text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                        </div>
                      ) : item.type === 'video' ? (
                        <div className="text-3xl font-semibold text-gray-400 dark:text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect
                              x="1"
                              y="5"
                              width="15"
                              height="14"
                              rx="2"
                              ry="2"
                            ></rect>
                          </svg>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-3xl font-semibold text-gray-400 dark:text-gray-600">
                          <span>
                            {item.type?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                          {item.emoji && (
                            <span className="mt-1 text-2xl">{item.emoji}</span>
                          )}
                        </div>
                      )}

                      {selectedItems.includes(item.i) && (
                        <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white shadow">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="truncate text-sm font-medium dark:text-gray-200">
                        {item.title ||
                          item.text ||
                          item.caption ||
                          item.type ||
                          'Untitled'}
                      </p>
                      {(item.subtitle || item.description) && (
                        <p className="text-muted-foreground truncate text-xs dark:text-gray-400">
                          {item.subtitle || item.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800 dark:text-gray-400">
                        {item.type || 'Unknown'}
                      </span>
                      <Checkbox
                        id={`select-${item.i}`}
                        checked={selectedItems.includes(item.i)}
                        className="rounded-full dark:border-gray-500"
                        onCheckedChange={() => toggleItemSelection(item.i)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Toggle item selection
  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    } else {
      setSelectedItems((prev) => [...prev, itemId]);
    }
  };

  // Add selected items to carousel
  const addItemsToCarousel = () => {
    const newCarouselItems = [...carouselItems];

    // Add only items that aren't already in the carousel
    selectedItems.forEach((itemId) => {
      if (!newCarouselItems.includes(itemId)) {
        newCarouselItems.push(itemId);
      }
    });

    setCarouselItems(newCarouselItems);
    updateCardContent({ carouselItems: newCarouselItems });
    setSelectedItems([]);
    setIsItemSelectorOpen(false);
  };

  // Remove item from carousel
  const removeFromCarousel = (itemId, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    const newItems = carouselItems.filter((id) => id !== itemId);
    setCarouselItems(newItems);
    updateCardContent({ carouselItems: newItems });
  };

  // Find actual item objects for carousel items
  const getCarouselItemObjects = () => {
    if (isTenant && card?.carouselItems && Array.isArray(card.carouselItems)) {
      // In tenant mode, use card.carouselItems array directly
      // We need to check if the items are already objects or just IDs
      if (
        card.carouselItems.length > 0 &&
        typeof card.carouselItems[0] === 'object'
      ) {
        // Items are already complete objects
        return card.carouselItems;
      } else {
        // Items are IDs, so we need to find them in the items array
        const allItems = isMobile ? mobileItems : items;

        // Make sure we have items before trying to find them
        if (!allItems || allItems.length === 0) {
          console.warn('No items available to find carousel items');
          return [];
        }

        const foundItems = card.carouselItems
          .map((itemId) => {
            const found = allItems.find((item) => item.i === itemId);
            if (!found) {
              console.warn(`Item with ID ${itemId} not found in items array`);
            }
            return found;
          })
          .filter(Boolean);

        return foundItems;
      }
    } else {
      // In edit mode, continue to use the local items/mobileItems (from context or props)
      const allItems = isMobile ? mobileItems : items;

      // Make sure we have items before trying to find them
      if (!allItems || allItems.length === 0) {
        console.warn('No items available to find carousel items');
        return [];
      }

      const foundItems = carouselItems
        .map((itemId) => {
          const found = allItems.find((item) => item.i === itemId);
          if (!found) {
            console.warn(`Item with ID ${itemId} not found in items array`);
          }
          return found;
        })
        .filter(Boolean);

      return foundItems;
    }
  };

  // Render carousel items using Swiper
  const renderCarouselItems = () => {
    const itemObjects = getCarouselItemObjects();

    if (!itemObjects || itemObjects.length === 0) {
      return (
        <div className="flex h-full flex-col items-center justify-center p-0 text-center">
          <p
            className={`text-muted-foreground mb-2 ${themeData?.textMode === 'dark' ? 'text-black' : 'text-white'}`}
          >
            {isTenant ? 'No images in carousel' : 'Add images to the carousel'}
          </p>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              className={`mt-2 ${themeData?.textMode === 'dark' ? 'text-black' : 'text-white'}`}
              onClick={() => setIsItemSelectorOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Items
            </Button>
          )}
        </div>
      );
    }

    return (
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={viewMode === 'mobile' || isMobile ? 10 : 40}
        slidesPerView={itemsPerSlide}
        navigation
        pagination={{ clickable: true }}
        className={`h-full ${isMobile ? 'w-full' : 'w-full'}`}
        speed={scrollSpeed}
        autoplay={
          autoScroll && !autoScrollPaused
            ? {
                delay: autoScrollInterval,
                disableOnInteraction: false,
              }
            : false
        }
        loop={true}
        onSlideChange={(swiper) => {
          setActiveCaptionSlideIndex(swiper.realIndex);
        }}
        style={{
          '--swiper-pagination-color': '#fff',
          '--swiper-pagination-bullet-inactive-color': '#999',
          '--swiper-pagination-bullet-inactive-opacity': '0.5',
          '--swiper-navigation-color': '#fff',
          '--swiper-navigation-size': '24px',
          width: isMobile ? '100%' : undefined,
        }}
      >
        {itemObjects.map((item) => (
          <SwiperSlide
            key={item.i}
            className={`h-full cursor-grab active:cursor-grabbing ${isMobile ? 'w-full' : ''}`}
          >
            <div
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className={`relative h-full ${isMobile ? 'w-full' : ''}`}
            >
              {isHover && !isTenant && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 z-50 h-6 w-6 rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent"
                  onClick={(e) => removeFromCarousel(item.i, e)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              <div
                onMouseDown={(e) => e.stopPropagation()}
                onDrag={(e) => e.stopPropagation()}
                className={` ${isMobile ? 'h-full w-full' : 'aspect-square h-full w-full'} ${
                  !isTenant && 'pointer-events-none'
                } `}
              >
                {/* Special handling for video items when they're in the carousel */}
                {(item.videoUrl || item.videoSrc || item.video) && !isTenant ? (
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <video
                      src={item.videoUrl || item.videoSrc || item.video}
                      className="h-full w-full object-cover"
                      autoPlay={false}
                      controls={false}
                      muted={true}
                      loop={true}
                      poster={
                        item.imageUrl ||
                        item.image ||
                        item.backgroundImage ||
                        item.contentImage
                      }
                      playsInline
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                ) : isTenant ? (
                  <MiscTenantCard
                    card={{ ...item }}
                    isTenant={true}
                    isMobile={isMobile}
                    username={item.username || ''}
                    themeData={themeData}
                    items={items}
                    mobileItems={mobileItems}
                  />
                ) : (
                  <MiscCard
                    card={{ ...item }}
                    themeData={themeData}
                    isSelected={item.i === hoveredCardId}
                    onSelect={(id) => setHoveredCardId(id)}
                    isMobile={isMobile}
                    setIsIsolate={setIsIsolate}
                    isEditing={false}
                    setIsEditing={setParentIsEditing}
                    enableDrag={false}
                    setEnableDrag={setEnableDrag}
                    hoveredCardId={hoveredCardId}
                    setHoveredCardId={setHoveredCardId}
                    isPhone={isPhone}
                    allowEdit={false}
                    isTenant={isTenant}
                    parentId={parentId}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  // Display a preview indicator for video or audio items
  const getMediaTypeIndicator = (item) => {
    if (item.videoUrl || item.videoSrc || item.video) {
      return (
        <div className="absolute bottom-1 left-1 flex items-center rounded-md bg-black bg-opacity-70 px-1.5 py-0.5 text-xs text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Video
        </div>
      );
    }
    return null;
  };

  // Determine if there are multiple pages
  const hasMultiplePages = carouselItems.length > itemsPerSlide;

  // Get the appropriate carousel size class
  const getCarouselSizeClass = () => {
    return isMobile ? 'min-h-[300px]' : 'min-h-[100px]'; // Adjust height for mobile
  };

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden rounded-2xl',
        'bg-card text-card-foregrounddark:text-gray-100',
        isEditing && 'cursor-move',
        isMobile && 'mx-auto max-w-full'
      )}
      ref={containerRef}
      style={isMobile ? { width: '100%', minWidth: '100%' } : {}}
    >
      {/* Carousel Content */}
      <div
        className={`relative flex flex-1 flex-col items-center justify-center overflow-hidden ${isMobile ? 'w-full' : ''}`}
      >
        {renderCarouselItems()}

        {/* Caption */}
        <div
          style={{ maxWidth: '80%' }}
          className={`absolute bottom-2 left-2 z-[60] ${
            (caption || (isEditing && editingCaption)) && 'bg-white'
          } rounded-lg p-2 text-xs text-white`}
          onClick={(e) => e.stopPropagation()}
        >
          {isEditing && editingCaption ? (
            <input
              type="text"
              value={caption}
              placeholder="Add a caption"
              onChange={(e) => {
                e.stopPropagation();
                handleCaptionChange(e.target.value);
              }}
              onBlur={() => setEditingCaption(false)}
              autoFocus
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full min-w-[100px] border-none bg-transparent text-black focus:outline-none"
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            />
          ) : (
            caption && (
              <span className="md:text-md relative line-clamp-2 text-[12px] text-black">
                {caption}
              </span>
            )
          )}
        </div>
      </div>

      {/* Item Selector Dialog */}
      <Dialog open={isItemSelectorOpen} onOpenChange={setIsItemSelectorOpen}>
        <DialogContent
          className={`${isMobile ? 'max-w-[95%]' : 'max-w-3xl'} flex max-h-[80vh] flex-col dark:border-gray-700 dark:bg-gray-800`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold dark:text-gray-100">
              Add Images to Carousel
            </DialogTitle>
          </DialogHeader>

          <div className="mb-4 mt-2">
            <Input
              placeholder="Search items by title or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          <div className="mb-4 max-h-[60vh] flex-1 overflow-y-auto rounded-md border p-4 dark:border-gray-700">
            {renderSectionedItems()}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm dark:text-gray-400">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}{' '}
              selected
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsItemSelectorOpen(false)}
                className="dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                Cancel
              </Button>
              <Button
                onClick={addItemsToCarousel}
                disabled={selectedItems.length === 0}
                className="dark:bg-blue-600 dark:bg-blue-700"
              >
                Add to Carousel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Controls for editing mode */}
      {isEditing && (
        <div className="absolute right-2 top-2 z-10 flex gap-1">
          <TooltipProvider>
            {/* Add Caption Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/80 bg-white/90 dark:bg-black dark:bg-gray-800/80 dark:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCaption(true);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Type size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <p>{caption ? 'Edit Caption' : 'Add Caption'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Add Items Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/80 bg-white/90 dark:bg-black dark:bg-gray-800/80 dark:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsItemSelectorOpen(true);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <PlusCircle size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <p>Add Items</p>
              </TooltipContent>
            </Tooltip>

            {/* Settings popover */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/80 bg-white/90 dark:bg-black dark:bg-gray-800/80 dark:text-gray-300"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <PenLine size={16} />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="flex max-h-[400px] w-80 flex-col p-0 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                    align="end"
                    sideOffset={5}
                  >
                    {/* Fixed Header */}
                    <div className="bg-card sticky top-0 z-20 border-b px-3 py-2 text-sm font-medium dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                      Carousel Settings
                    </div>

                    {/* Scrollable Content */}
                    <div className="max-h-[calc(400px-80px)] space-y-4 overflow-y-auto p-3">
                      {/* Caption Settings */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-xs font-medium dark:text-gray-400">
                          Caption
                        </h4>
                        <div className="space-y-1">
                          <Label
                            htmlFor="caption"
                            className="text-xs dark:text-gray-300"
                          >
                            Carousel Caption
                          </Label>
                          <Input
                            id="caption"
                            type="text"
                            value={caption}
                            onChange={(e) =>
                              handleCaptionChange(e.target.value)
                            }
                            placeholder="Add a caption for all slides"
                            className="h-8 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                          />
                          <p className="text-xs text-gray-500">
                            This caption will appear on all carousel slides
                          </p>
                        </div>
                      </div>

                      {/* Scroll Settings */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-xs font-medium dark:text-gray-400">
                          Scroll Settings
                        </h4>

                        <div className="space-y-2">
                          <div className="space-y-1">
                            <Label
                              htmlFor="scrollSpeed"
                              className="text-xs dark:text-gray-300"
                            >
                              Scroll Speed (ms)
                            </Label>
                            <Input
                              id="scrollSpeed"
                              type="number"
                              value={scrollSpeed}
                              onChange={(e) =>
                                handleScrollSpeedChange(e.target.value)
                              }
                              className="h-8 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                              min="100"
                              max="2000"
                              step="100"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="autoScroll"
                              className="text-xs dark:text-gray-300"
                            >
                              Auto Scroll
                            </Label>
                            <Switch
                              id="autoScroll"
                              checked={autoScroll}
                              onCheckedChange={handleAutoScrollChange}
                            />
                          </div>

                          {autoScroll && (
                            <div className="space-y-1">
                              <Label
                                htmlFor="autoScrollInterval"
                                className="text-xs dark:text-gray-300"
                              >
                                Auto Scroll Interval (ms)
                              </Label>
                              <Input
                                id="autoScrollInterval"
                                type="number"
                                value={autoScrollInterval}
                                onChange={(e) =>
                                  handleIntervalChange(e.target.value)
                                }
                                className="h-8 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                                min="1000"
                                max="10000"
                                step="500"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="bg-card sticky bottom-0 z-20 border-t p-3 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex justify-between gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsSettingsOpen(false)}
                          className="w-1/2 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveSettings}
                          className="w-1/2 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <p>Edit Carousel Settings</p>
              </TooltipContent>
            </Tooltip>

          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
