import React, { useState, useEffect, useRef } from 'react';
import {
  PenLine,
  Check,
  X,
  PlusCircle,
  Type,
  ArrowLeftRight,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import MiscTenantCard from '@/app/[tenant]/components/tenantCards/MiscTenantCard';
import MiscCard from '../../MiscCard';
import { Marquee } from '@/components/ui/marquee';

export default function MarqueeCard({
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
  username,
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

  // Use the props if provided (for tenant mode), otherwise use context values
  const items = isTenant && propItems ? propItems : contextItems;
  const mobileItems =
    isTenant && propMobileItems ? propMobileItems : contextMobileItems;

  const containerRef = useRef(null);

  // State for settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isItemSelectorOpen, setIsItemSelectorOpen] = useState(false);
  const [speed, setSpeed] = useState(card?.speed || 40);
  const [gap, setGap] = useState(card?.gap || 20);
  const [direction, setDirection] = useState(card?.direction || 'left');
  const [pauseOnHover, setPauseOnHover] = useState(card?.pauseOnHover || false);
  const [title, setTitle] = useState(card?.title || '');
  const [editingTitle, setEditingTitle] = useState(false);

  const [isHover, setIsHover] = useState(false);
  const isVertical = direction === 'up' || direction === 'down';

  // Marquee state
  const [marqueeItems, setMarqueeItems] = useState(card?.marqueeItems || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Get background and text colors from theme
  const bgColor = isTenant
    ? themeData?.cardBackground || '#ffffff'
    : 'transparent';
  const textColor = isTenant
    ? themeData?.textMode === 'dark'
      ? 'black'
      : 'white'
    : 'inherit';

  // Update marqueeItems if card prop changes
  useEffect(() => {
    if (card?.marqueeItems) {
      setMarqueeItems(card.marqueeItems);
    }
    if (card?.title !== undefined) {
      setTitle(card.title || '');
    }
    if (card?.speed !== undefined) {
      setSpeed(card.speed);
    }
    if (card?.gap !== undefined) {
      setGap(card.gap);
    }
    if (card?.direction !== undefined) {
      setDirection(card.direction);
    }
    if (card?.pauseOnHover !== undefined) {
      setPauseOnHover(card.pauseOnHover);
    }
  }, [card]);

  // Update the card content when settings change
  const updateCardContent = (updates) => {
    updateItemContent(itemId, { ...updates });
  };

  // Handle hide settings changes
  const handleHideSettingsChange = (itemId, hideSettings) => {
    updateItemContent(itemId, hideSettings);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    updateCardContent({ speed: value });
  };

  const handleGapChange = (value) => {
    setGap(value);
    updateCardContent({ gap: value });
  };

  const handleDirectionChange = (value) => {
    setDirection(value);
    updateCardContent({ direction: value });
  };

  const handlePauseOnHoverChange = (checked) => {
    setPauseOnHover(checked);
    updateCardContent({ pauseOnHover: checked });
  };

  const handleTitleChange = (value) => {
    setTitle(value);
    updateCardContent({ title: value });
  };

  const handleSaveSettings = () => {
    updateCardContent({
      speed,
      gap,
      direction,
      pauseOnHover,
      marqueeItems,
      title,
    });
    setIsSettingsOpen(false);
  };

  // Get list of available items for selection that aren't already in marquee
  const getAvailableItems = () => {
    const allItems = isMobile ? mobileItems : items;

    return allItems.filter(
      (item) =>
        item.i !== itemId && // Not this marquee
        !marqueeItems.includes(item.i) && // Not already in the marquee
        !item.parentId // Not a child item
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

  // Group items by their display type for the item selector
  const getGroupedItems = () => {
    const filteredItems = getFilteredItems();
    const groupedItems = {};

    filteredItems.forEach((item) => {
      const type = item.displayType || item.type || 'other';

      if (!groupedItems[type]) {
        groupedItems[type] = [];
      }
      groupedItems[type].push(item);
    });

    return groupedItems;
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
                    <div className="relative mb-2 flex h-24 items-center justify-center overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
                      {item.imageUrl ||
                      item.image ||
                      item.backgroundImage ||
                      item.contentImage ? (
                        <img
                          src={
                            item.imageUrl ||
                            item.image ||
                            item.backgroundImage ||
                            item.contentImage
                          }
                          alt={item.title || 'Item preview'}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-3xl font-semibold text-gray-400 dark:text-gray-600">
                          {item.type?.charAt(0)?.toUpperCase() || '?'}
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

  // Add selected items to marquee
  const addItemsToMarquee = () => {
    const newMarqueeItems = [...marqueeItems];

    // Add only items that aren't already in the marquee
    selectedItems.forEach((itemId) => {
      if (!newMarqueeItems.includes(itemId)) {
        newMarqueeItems.push(itemId);
      }
    });

    setMarqueeItems(newMarqueeItems);
    updateCardContent({ marqueeItems: newMarqueeItems });
    setSelectedItems([]);
    setIsItemSelectorOpen(false);
  };

  // Remove item from marquee
  const removeFromMarquee = (itemId, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    const newItems = marqueeItems.filter((id) => id !== itemId);
    setMarqueeItems(newItems);
    updateCardContent({ marqueeItems: newItems });
  };

  // Find actual item objects for marquee items
  const getMarqueeItemObjects = () => {
    if (isTenant && card?.marqueeItems && Array.isArray(card.marqueeItems)) {
      // Handle tenant mode
      if (
        card.marqueeItems.length > 0 &&
        typeof card.marqueeItems[0] === 'object'
      ) {
        // If marqueeItems are already full objects, just return them
        return card.marqueeItems;
      } else {
        // Find the actual objects from the items array
        const allItems = isMobile ? mobileItems : items;
        return card.marqueeItems
          .map((itemId) => allItems?.find((item) => item.i === itemId))
          .filter(Boolean);
      }
    } else {
      // Editor mode - find items from the context
      const allItems = isMobile ? mobileItems : items;
      return marqueeItems
        .map((itemId) => allItems?.find((item) => item.i === itemId))
        .filter(Boolean);
    }
  };

  // Render the marquee items
  const renderMarqueeItems = () => {
    const itemObjects = getMarqueeItemObjects();

    if (!itemObjects || itemObjects.length === 0) {
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p
            className={`text-muted-foreground mb-2 ${themeData?.textMode === 'dark' ? 'text-black' : 'text-white'}`}
          >
            {isTenant ? 'No items in marquee' : 'Add items to the marquee'}
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

    // Prepare marquee items
    const marqueItemsList = itemObjects.map((item) => (
      <div
        key={item.i}
        className={cn(
          'relative flex-shrink-0',
          isVertical ? 'mb-4 w-full max-w-full' : 'h-full px-2',
          'marquee-item-container'
        )}
        // style={{
        //   width: isVertical ? '100%' : undefined,
        //   height: isVertical ? undefined : '100%',
        //   maxWidth: isVertical ? '100%' : isMobile ? '250px' : '300px',
        //   minWidth: isVertical ? '100%' : isMobile ? '150px' : '200px',
        //   display: 'flex',
        //   flexDirection: 'column',
        // }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && !isTenant && isEditing && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-1 top-1 z-50 h-6 w-6 rounded-full"
            onClick={(e) => removeFromMarquee(item.i, e)}
          >
            <X className="h-3 w-3" />
          </Button>
        )}

        {/* Item wrapper with proper containment - using the same approach as CarouselCard */}
        <div
          className="h-full w-full overflow-hidden rounded-xl"
          onMouseDown={(e) => e.stopPropagation()}
          onDrag={(e) => e.stopPropagation()}
          style={{
            pointerEvents: !isTenant ? 'none' : 'auto',
            aspectRatio: isVertical ? 'auto' : '1/1',
            transform: !isTenant ? 'none' : 'scale(0.98)',
            transition: !isTenant ? 'none' : 'transform 0.2s ease',
          }}
        >
          {isTenant ? (
            <MiscTenantCard
              card={item}
              isTenant={true}
              isMobile={isMobile}
              username={username}
              themeData={themeData}
              tenantTheme={themeData}
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
    ));

    // Pass direction directly to Marquee component
    const getMarqueeProps = () => {
      return {
        pauseOnHover,
        direction,
        vertical: direction === 'up' || direction === 'down',
      };
    };

    // Set custom CSS variables for the marquee
    // For MagicUI Marquee, we need to convert speed (higher = faster) to duration (lower = faster)
    // Speed range: 5-100, Duration range: 60s-3s
    const calculateDuration = () => {
      // Invert the speed scale: higher speed = lower duration
      // Map speed 5-100 to duration 60s-3s
      return (100 - speed) * 0.6 + 3; // Gives 60s at speed=5, 3s at speed=100
    };

    const cssVars = {
      '--duration': `${calculateDuration()}s`, // Convert speed to duration in seconds
      '--gap': `${gap}px`,
    };

    const marqueeProps = getMarqueeProps();

    return (
      <Marquee
        className={cn('h-full p-0', isVertical ? 'flex-col' : 'flex-row')}
        {...marqueeProps}
        style={cssVars}
      >
        {marqueItemsList}
      </Marquee>
    );
  };

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden rounded-2xl',
        isEditing && 'cursor-move',
        isMobile && 'mx-auto max-w-full'
      )}
      ref={containerRef}
    >
      {/* Marquee Content */}
      <div className="relative flex-1 overflow-hidden">
        {renderMarqueeItems()}
      </div>

      {/* Controls for editing mode */}
      {isEditing && (
        <div className="absolute right-2 top-2 z-10 flex gap-1">
          <TooltipProvider>
            {/* Add Items Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsItemSelectorOpen(true);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <PlusCircle size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
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
                      className="rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent"
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
                      Marquee Settings
                    </div>

                    {/* Scrollable Content */}
                    <div className="max-h-[calc(400px-80px)] space-y-4 overflow-y-auto p-3">
                      {/* Direction Settings */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-xs font-medium dark:text-gray-400">
                          Marquee Direction
                        </h4>
                        <div className="space-y-1">
                          <Label
                            htmlFor="direction"
                            className="text-xs dark:text-gray-300"
                          >
                            Scroll Direction
                          </Label>
                          <Select
                            value={direction}
                            onValueChange={handleDirectionChange}
                          >
                            <SelectTrigger className="h-8 w-full dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
                              <SelectValue placeholder="Select direction" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-gray-700 dark:bg-gray-800">
                              <SelectItem value="left">Left</SelectItem>
                              <SelectItem value="right">Right</SelectItem>
                              <SelectItem value="up">Up</SelectItem>
                              <SelectItem value="down">Down</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Speed Settings */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-xs font-medium dark:text-gray-400">
                          Scroll Speed
                        </h4>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="speed"
                              className="text-xs dark:text-gray-300"
                            >
                              Speed: {speed}
                            </Label>
                            <span className="text-muted-foreground text-xs dark:text-gray-400">
                              {speed < 20
                                ? 'Slow'
                                : speed > 60
                                  ? 'Fast'
                                  : 'Medium'}
                            </span>
                          </div>
                          <Slider
                            id="speed"
                            min={5}
                            max={100}
                            step={5}
                            value={[speed]}
                            onValueChange={([value]) =>
                              handleSpeedChange(value)
                            }
                            className="dark:bg-gray-700"
                          />
                        </div>
                      </div>

                      {/* Gap Settings */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-xs font-medium dark:text-gray-400">
                          Item Gap
                        </h4>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="gap"
                              className="text-xs dark:text-gray-300"
                            >
                              Gap: {gap}px
                            </Label>
                          </div>
                          <Slider
                            id="gap"
                            min={0}
                            max={100}
                            step={5}
                            value={[gap]}
                            onValueChange={([value]) => handleGapChange(value)}
                            className="dark:bg-gray-700"
                          />
                        </div>
                      </div>

                      {/* Pause on Hover */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="pauseOnHover"
                            className="text-xs dark:text-gray-300"
                          >
                            Pause on Hover
                          </Label>
                          <Switch
                            id="pauseOnHover"
                            checked={pauseOnHover}
                            onCheckedChange={handlePauseOnHoverChange}
                          />
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
              <TooltipContent>
                <p>Edit Marquee Settings</p>
              </TooltipContent>
            </Tooltip>

           
          </TooltipProvider>
        </div>
      )}

      {/* Item Selector Dialog */}
      <Dialog open={isItemSelectorOpen} onOpenChange={setIsItemSelectorOpen}>
        <DialogContent
          className={`${isMobile ? 'max-w-[95%]' : 'max-w-3xl'} flex max-h-[80vh] flex-col dark:border-gray-700 dark:bg-gray-800`}
        >
          <DialogHeader>
            <DialogTitle
              className={`${themeData?.textMode === 'dark' ? 'text-black' : 'text-white'}`}
            >
              Add Items to Marquee
            </DialogTitle>
            <p className="text-muted-foreground mt-1 text-sm">
              Note: Images and videos cannot be added to marquees
            </p>
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
                className="dark:border-gray-600 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={addItemsToMarquee}
                disabled={selectedItems.length === 0}
                className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
              >
                Add to Marquee
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
