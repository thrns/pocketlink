import React, { useState, useEffect } from 'react';
import { PenLine, Check, Clock, RotateCcw, Timer, X } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useItems } from '@/app/contexts/ItemsContext';
import { cn } from '@/lib/utils';

export default function CountdownTimerCard({
  itemId,
  card,
  isEditing,
  sizeKey,
  isTenant,
  isMobile = false,
  themeData,
}) {
  const { updateItemContent } = useItems();

  // Initialize state with default values or values from card
  const [title, setTitle] = useState(card?.title || '');
  const [subtitle, setSubtitle] = useState(card?.subtitle || '');
  const [days, setDays] = useState(card?.days || 0);
  const [hours, setHours] = useState(card?.hours || 0);
  const [minutes, setMinutes] = useState(card?.minutes || 0);
  const [seconds, setSeconds] = useState(card?.seconds || 0);
  const [isVisible, setIsVisible] = useState(card?.isVisible !== false);
  const [resetCounter, setResetCounter] = useState(0);

  const textColor = themeData?.textMode === 'dark' ? 'black' : 'white';
  const bgColor = themeData?.cardBackground;
  const themeColor = themeData?.color;
  const borderColor = themeData?.border;

  // Countdown specific states
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [endTime, setEndTime] = useState(card?.endTime || null);

  // Settings panel open state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Calculate initial end time based on the time components on first load
  useEffect(() => {
    if (card?.endTime) {
      setEndTime(card.endTime);
      const endTimeMs = new Date(card.endTime).getTime();
      const now = new Date().getTime();
      const diff = endTimeMs - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);

        setTimeLeft({
          days: d,
          hours: h,
          minutes: m,
          seconds: s,
        });
      } else {
        setIsExpired(true);
      }
    }
  }, [card?.endTime]);

  // Update countdown every second
  useEffect(() => {
    if (isExpired) return;

    // If we don't have an endTime yet (on first load), calculate it
    if (!endTime) {
      const now = new Date();
      const totalMilliseconds =
        parseInt(days) * 24 * 60 * 60 * 1000 +
        parseInt(hours) * 60 * 60 * 1000 +
        parseInt(minutes) * 60 * 1000 +
        parseInt(seconds) * 1000;

      if (totalMilliseconds <= 0) {
        setIsExpired(true);
        return;
      }

      const newEndTime = new Date(now.getTime() + totalMilliseconds);
      setEndTime(newEndTime.toISOString());
    }

    const timer = setInterval(() => {
      const endTimeMs = endTime ? new Date(endTime).getTime() : 0;
      const now = new Date().getTime();
      const diff = endTimeMs - now;

      if (diff <= 0) {
        setIsExpired(true);
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d,
        hours: h,
        minutes: m,
        seconds: s,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds, endTime, isExpired]);

  // Update card content in ItemsContext
  const updateCardContent = (updates) => {
    const newContent = { ...updates };
    updateItemContent(itemId, newContent);
  };

  // Handle hide settings changes
  const handleHideSettingsChange = (itemId, hideSettings) => {
    updateItemContent(itemId, hideSettings);
  };

  const handleTitleChange = (value) => {
    setTitle(value);
    updateCardContent({ title: value });
  };

  const handleSubtitleChange = (value) => {
    setSubtitle(value);
    updateCardContent({ subtitle: value });
  };

  // Handle number input changes with validation
  const handleNumberInput = (value, setter, max) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');

    // Convert to number and check if it's within range
    const numValue = parseInt(numericValue);

    if (!isNaN(numValue)) {
      if (max && numValue > max) {
        setter(max);
      } else {
        setter(numValue);
      }
    } else if (numericValue === '') {
      setter(0);
    }
  };

  const handleDaysChange = (value) => {
    handleNumberInput(value, setDays);
  };

  const handleHoursChange = (value) => {
    handleNumberInput(value, setHours, 23);
  };

  const handleMinutesChange = (value) => {
    handleNumberInput(value, setMinutes, 59);
  };

  const handleSecondsChange = (value) => {
    handleNumberInput(value, setSeconds, 59);
  };

  const handleSaveSettings = () => {
    // Validate inputs
    const validDays = !isNaN(days) ? parseInt(days) : 0;
    const validHours = !isNaN(hours) ? parseInt(hours) : 0;
    const validMinutes = !isNaN(minutes) ? parseInt(minutes) : 0;
    const validSeconds = !isNaN(seconds) ? parseInt(seconds) : 0;

    // Reset expired state if we have valid time values
    const totalSeconds =
      validDays * 24 * 60 * 60 +
      validHours * 60 * 60 +
      validMinutes * 60 +
      validSeconds;

    if (totalSeconds > 0) {
      setIsExpired(false);

      // Calculate new end time
      const now = new Date();
      const totalMilliseconds = totalSeconds * 1000;
      const newEndTime = new Date(now.getTime() + totalMilliseconds);

      setEndTime(newEndTime.toISOString());

      // Update card content
      updateCardContent({
        title,
        subtitle,
        days: validDays,
        hours: validHours,
        minutes: validMinutes,
        seconds: validSeconds,
        endTime: newEndTime.toISOString(),
      });
    } else {
      setIsExpired(true);
    }

    setIsSettingsOpen(false);
  };

  const handleResetTimer = () => {
    // Reset timer to original values
    if (card?.endTime) {
      const endTimeMs = new Date(card.endTime).getTime();
      const now = new Date().getTime();
      const diff = endTimeMs - now;

      if (diff > 0) {
        setIsExpired(false);
        setEndTime(card.endTime);
      } else {
        // Calculate new end time based on the initial values
        const totalSeconds =
          parseInt(card?.days || 0) * 24 * 60 * 60 +
          parseInt(card?.hours || 0) * 60 * 60 +
          parseInt(card?.minutes || 0) * 60 +
          parseInt(card?.seconds || 0);

        if (totalSeconds > 0) {
          const now = new Date();
          const newEndTime = new Date(now.getTime() + totalSeconds * 1000);

          setEndTime(newEndTime.toISOString());
          setIsExpired(false);

          // Update the card content with the new end time
          updateCardContent({
            endTime: newEndTime.toISOString(),
          });
        }
      }
    }

    setResetCounter((prev) => prev + 1);
  };

  // Determine card size based on sizeKey to adjust responsive sizing
  const cardSizeKey = card?.sizeKey || sizeKey;
  const isSmall = cardSizeKey === 'square';
  const isMedium = cardSizeKey === 'vertical' || cardSizeKey === 'horizontal';
  const isLarge =
    cardSizeKey === 'doubleHorizontal' || cardSizeKey === 'doubleVertical';

  // Determine if title should be visible (hide on small cards in mobile mode)
  const showTitle = !isSmall;

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-2xl',
        isMobile ? 'p-1' : 'p-3', // Reduced padding on mobile
        isEditing && 'cursor-move'
      )}
      style={{
        display: isVisible ? 'flex' : 'none',
        backgroundColor: bgColor || 'inherit',
      }}
    >
      {/* Countdown Display */}
      <div className="flex h-full w-full flex-col items-center justify-between gap-1 text-center">
        {/* Only show title if not a small card on mobile */}
        {title && showTitle && (
          <h3
            style={{ color: textColor }}
            className={cn(
              'mb-1 line-clamp-2 w-full font-bold',
              isMobile
                ? isSmall
                  ? 'text-lg'
                  : isLarge
                    ? 'text-base'
                    : 'text-2xl'
                : isSmall
                  ? 'text-lg'
                  : isLarge
                    ? 'text-3xl'
                    : 'text-2xl'
            )}
          >
            {isEditing ? (
              <input
                type="text"
                value={title}
                style={{ color: textColor, background: themeColor }}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-lg border-none p-2 text-center focus:outline-none"
                placeholder="Countdown Title"
              />
            ) : (
              title
            )}
          </h3>
        )}

        {/* Countdown Timer Display */}
        {isExpired ? (
          <div className="flex h-full w-full flex-1 items-center justify-center">
            <div
              className={cn(
                'font-bold text-red-500 dark:text-red-400',
                isMobile ? 'text-xl' : 'text-2xl'
              )}
            >
              Time's Up!
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-1 ${isSmall ? 'items-center justify-center' : 'items-end justify-end'} w-full`}
          >
            <div
              className={cn(
                'grid w-full gap-1',
                // Responsive grid layouts based on card size and device
                isMobile
                  ? isSmall
                    ? 'grid-cols-2'
                    : cardSizeKey === 'horizontal'
                      ? 'grid-cols-4'
                      : 'grid-cols-2'
                  : cardSizeKey === 'horizontal'
                    ? 'grid-cols-4'
                    : 'grid-cols-2',
                // Adjust gap based on size
                isMobile ? 'gap-1' : isSmall ? 'gap-1' : 'gap-2'
              )}
            >
              {/* Days */}
              <div
                style={{ borderColor: borderColor }}
                className={cn(
                  'flex flex-col items-center rounded-lg border',
                  isMobile ? 'p-1' : isSmall ? 'p-1' : 'p-2'
                )}
              >
                <span
                  style={{ color: textColor }}
                  className={cn(
                    'text-primary font-bold',
                    isMobile
                      ? isSmall
                        ? 'text-base'
                        : 'text-lg'
                      : isSmall
                        ? 'text-lg'
                        : isLarge
                          ? 'text-2xl'
                          : 'text-xl'
                  )}
                >
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span
                  style={{ color: textColor }}
                  className={cn(
                    'text-muted-foreground font-medium uppercase',
                    isMobile ? 'text-xs' : isSmall ? 'text-xs' : 'text-sm'
                  )}
                >
                  Days
                </span>
              </div>

              {/* Hours */}
              <div
                style={{ borderColor: borderColor }}
                className={cn(
                  'flex flex-col items-center rounded-lg border',
                  isMobile ? 'p-1' : isSmall ? 'p-1' : 'p-2'
                )}
              >
                <span
                  style={{ color: textColor }}
                  className={cn(
                    'text-primary font-bold',
                    isMobile
                      ? isSmall
                        ? 'text-base'
                        : 'text-lg'
                      : isSmall
                        ? 'text-lg'
                        : isLarge
                          ? 'text-2xl'
                          : 'text-xl'
                  )}
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span
                  style={{ color: textColor }}
                  className={cn(
                    'text-muted-foreground font-medium uppercase',
                    isMobile ? 'text-xs' : isSmall ? 'text-xs' : 'text-sm'
                  )}
                >
                  Hrs
                </span>
              </div>

              {/* Minutes */}
              <div
                style={{ borderColor: borderColor }}
                className={cn(
                  'flex flex-col items-center rounded-lg border',
                  isMobile ? 'p-1' : isSmall ? 'p-1' : 'p-2'
                )}
              >
                <span
                  style={{ color: textColor }}
                  className={cn(
                    'text-primary font-bold',
                    isMobile
                      ? isSmall
                        ? 'text-base'
                        : 'text-lg'
                      : isSmall
                        ? 'text-lg'
                        : isLarge
                          ? 'text-2xl'
                          : 'text-xl'
                  )}
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span
                  style={{ color: textColor }}
                  className={cn(
                    'text-muted-foreground font-medium uppercase',
                    isMobile ? 'text-xs' : isSmall ? 'text-xs' : 'text-sm'
                  )}
                >
                  Min
                </span>
              </div>

              {/* Seconds */}
              <div
                style={{ borderColor: borderColor }}
                className={cn(
                  'flex flex-col items-center rounded-lg border',
                  isMobile ? 'p-1' : isSmall ? 'p-1' : 'p-2'
                )}
              >
                <span
                  style={{ color: textColor }}
                  className={cn(
                    'text-primary font-bold',
                    isMobile
                      ? isSmall
                        ? 'text-base'
                        : 'text-lg'
                      : isSmall
                        ? 'text-lg'
                        : isLarge
                          ? 'text-2xl'
                          : 'text-xl'
                  )}
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span
                  style={{ color: textColor }}
                  className={cn(
                    'text-muted-foreground font-medium uppercase',
                    isMobile ? 'text-xs' : isSmall ? 'text-xs' : 'text-sm'
                  )}
                >
                  Sec
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls for editing mode */}
      {isEditing && (
        <div className="absolute right-2 top-2 z-10 flex gap-1">
          <TooltipProvider>
            {/* Reset timer */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    'bg-white/80 bg-white/90 dark:bg-black dark:bg-gray-800/80 dark:text-gray-300',
                    isMobile ? 'h-5 w-5' : 'h-6 w-6'
                  )}
                  onClick={handleResetTimer}
                >
                  <RotateCcw className={isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="dark:bg-gray-800 dark:text-gray-200">
                <p>Reset Timer</p>
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
                      className={cn(
                        'bg-white/80 bg-white/90 dark:bg-black dark:bg-gray-800/80 dark:text-gray-300',
                        isMobile ? 'h-5 w-5' : 'h-6 w-6'
                      )}
                    >
                      <PenLine
                        className={isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex max-h-[400px] w-80 flex-col p-0 shadow-lg dark:bg-gray-800"
                    align="end"
                    sideOffset={5}
                  >
                    {/* Fixed Header - Sticky */}
                    <div className="bg-card sticky top-0 z-20 border-b px-3 py-2 text-sm font-medium dark:bg-gray-800 dark:text-gray-200">
                      Countdown Timer Settings
                    </div>

                    {/* Scrollable Content */}
                    <div className="max-h-[calc(400px-80px)] space-y-4 overflow-y-auto p-3">
                      {/* Text Content */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-xs font-medium">
                          Text Content
                        </h4>
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <Label
                              htmlFor="title"
                              className="text-xs dark:text-gray-300"
                            >
                              Title
                            </Label>
                            <Input
                              id="title"
                              type="text"
                              value={title}
                              onChange={(e) =>
                                handleTitleChange(e.target.value)
                              }
                              className="h-8 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
                              placeholder="Main title (optional)"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor="subtitle"
                              className="text-xs dark:text-gray-300"
                            >
                              Subtitle
                            </Label>
                            <Input
                              id="subtitle"
                              type="text"
                              value={subtitle}
                              onChange={(e) =>
                                handleSubtitleChange(e.target.value)
                              }
                              className="h-8 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
                              placeholder="Description or subtitle (optional)"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Timer Settings */}
                      <div className="space-y-2">
                        <h4 className="text-muted-foreground text-xs font-medium">
                          <div className="flex items-center">
                            <Timer className="mr-2 h-3 w-3" />
                            <span>Countdown Duration</span>
                          </div>
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                          {/* Days Input */}
                          <div className="flex flex-col">
                            <Input
                              type="text"
                              value={days}
                              onChange={(e) => handleDaysChange(e.target.value)}
                              className="h-8 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            />
                            <span className="text-muted-foreground mt-1 text-center text-xs">
                              Days
                            </span>
                          </div>

                          {/* Hours Input */}
                          <div className="flex flex-col">
                            <Input
                              type="text"
                              value={hours}
                              onChange={(e) =>
                                handleHoursChange(e.target.value)
                              }
                              className="h-8 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            />
                            <span className="text-muted-foreground mt-1 text-center text-xs">
                              Hours
                            </span>
                          </div>

                          {/* Minutes Input */}
                          <div className="flex flex-col">
                            <Input
                              type="text"
                              value={minutes}
                              onChange={(e) =>
                                handleMinutesChange(e.target.value)
                              }
                              className="h-8 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            />
                            <span className="text-muted-foreground mt-1 text-center text-xs">
                              Mins
                            </span>
                          </div>

                          {/* Seconds Input */}
                          <div className="flex flex-col">
                            <Input
                              type="text"
                              value={seconds}
                              onChange={(e) =>
                                handleSecondsChange(e.target.value)
                              }
                              className="h-8 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            />
                            <span className="text-muted-foreground mt-1 text-center text-xs">
                              Secs
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="bg-card sticky bottom-0 z-20 border-t p-3 dark:bg-gray-800">
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
              <TooltipContent className="dark:bg-gray-800 dark:text-gray-200">
                <p>Edit Timer Settings</p>
              </TooltipContent>
            </Tooltip>

          
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
