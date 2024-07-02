import React, { useState, useEffect, useRef } from 'react';
import {
  PenLine,
  Check,
  ArrowUp,
  ArrowDown,
  Clock,
  RotateCcw,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useItems } from '@/app/contexts/ItemsContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useFetch } from '@/app/contexts/FetcherContext';

// Number Ticker Component
const NumberTicker = ({
  value = 0,
  direction = 'up',
  delay = 0,
  decimalPlaces = 0,
  startValue = 0,
  duration = 2000,
  className,
  textSize = 'text-4xl',
  textColor,
  fontFamily = 'var(--font-onest), sans-serif',
  fontWeight = 'normal',
  fontStyle = 'normal',
  textDecoration = 'none',
  textAlign = 'center',
}) => {
  const [displayValue, setDisplayValue] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Set initial display value
    setDisplayValue(startValue);
    setIsAnimating(true);

    // Delay the animation if needed
    const timer = setTimeout(() => {
      startTimeRef.current = null;
      animateValue();
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, startValue, direction, delay, duration, decimalPlaces]);

  const animateValue = () => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    const elapsedTime = performance.now() - startTimeRef.current;
    const progress = Math.min(elapsedTime / duration, 1);

    // Use easeOutExpo for smooth animation that slows down near the end
    const easeOutExpo = (x) => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const easedProgress = easeOutExpo(progress);

    // Calculate current value based on direction
    let currentValue;
    if (direction === 'up') {
      currentValue = startValue + (value - startValue) * easedProgress;
    } else {
      currentValue = startValue - (startValue - value) * easedProgress;
    }

    // Round to specified decimal places
    const factor = Math.pow(10, decimalPlaces);
    const roundedValue = Math.round(currentValue * factor) / factor;

    setDisplayValue(roundedValue);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animateValue);
    } else {
      setDisplayValue(value);
      setIsAnimating(false);
    }
  };

  // Format the number with proper decimal places and commas
  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(displayValue);

  return (
    <div
      className={cn(
        'font-mono tabular-nums tracking-tight',
        textSize,
        className
      )}
      style={{
        color: textColor,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        textDecoration: textDecoration,
        textAlign: textAlign,
      }}
    >
      {formattedValue}
    </div>
  );
};

export default function CounterCard({
  itemId,
  card,
  isEditing,
  isTenant,
  isMobile = false,
  themeData,
}) {
  const { user } = useAuth();
  const { updateItemContent } = useItems();
  const { theme } = useFetch();

  // Font and styling properties
  const fontFamily = card?.fontFamily || 'var(--font-onest), sans-serif';
  const fontWeight = card?.fontWeight || 'normal';
  const fontStyle = card?.fontStyle || 'normal';
  const textDecoration = card?.textDecoration || 'none';
  const customBgColor = card?.background || '';
  const customTextColor = card?.textColor || '';
  const textAlign = card?.textAlign || 'center';

  const textColor =
    customTextColor || (themeData?.textMode === 'dark' ? 'black' : 'white');
  const bgColor = customBgColor || themeData?.cardBackground;
  const borderColor = themeData?.border;
  const themeColor = themeData?.color;

  // Initialize state with default values or values from card
  const [title, setTitle] = useState(card?.title || '');
  const [subtitle, setSubtitle] = useState(card?.subtitle || '');
  const [targetValue, setTargetValue] = useState(card?.targetValue || 100);
  const [startValue, setStartValue] = useState(card?.startValue || 0);
  const [direction, setDirection] = useState(card?.direction || 'up');
  const [decimalPlaces, setDecimalPlaces] = useState(card?.decimalPlaces || 0);
  const [delay, setDelay] = useState(card?.delay || 0);
  const [duration, setDuration] = useState(card?.duration || 2000);
  const [autoRestart, setAutoRestart] = useState(card?.autoRestart || false);
  const [restartInterval, setRestartInterval] = useState(
    card?.restartInterval || 5
  );
  const [animation, setAnimation] = useState(card?.animation || 'default');
  const [isVisible, setIsVisible] = useState(card?.isVisible !== false);
  const [resetCounter, setResetCounter] = useState(0);

  // Settings panel open state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Effect to handle auto-restart
  useEffect(() => {
    if (!isEditing && isVisible && autoRestart) {
      const interval = setInterval(() => {
        setResetCounter((prev) => prev + 1);
      }, restartInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [isEditing, isVisible, autoRestart, restartInterval]);

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

  const handleTargetValueChange = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setTargetValue(numValue);
      updateCardContent({ targetValue: numValue });
    }
  };

  const handleStartValueChange = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setStartValue(numValue);
      updateCardContent({ startValue: numValue });
    }
  };

  const handleDirectionChange = (value) => {
    setDirection(value);
    updateCardContent({ direction: value });
  };

  const handleDecimalPlacesChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setDecimalPlaces(numValue);
      updateCardContent({ decimalPlaces: numValue });
    }
  };

  const handleDelayChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setDelay(numValue);
      updateCardContent({ delay: numValue });
    }
  };

  const handleDurationChange = (value) => {
    const numValue = parseInt(value[0]);
    if (!isNaN(numValue) && numValue >= 500) {
      setDuration(numValue);
      updateCardContent({ duration: numValue });
    }
  };

  const handleAutoRestartChange = (checked) => {
    setAutoRestart(checked);
    updateCardContent({ autoRestart: checked });
  };

  const handleRestartIntervalChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setRestartInterval(numValue);
      updateCardContent({ restartInterval: numValue });
    }
  };

  const handleResetAnimation = () => {
    setResetCounter((prev) => prev + 1);
  };

  // Determine card size based on card.sizeKey to adjust responsive sizing
  const isSmall = card?.sizeKey === 'square';
  const isMedium =
    card?.sizeKey === 'vertical' || card?.sizeKey === 'horizontal';
  const isLarge =
    card?.sizeKey === 'doubleHorizontal' ||
    card?.sizeKey === 'doubleHorizontal';

  // Determine text size based on card size and content length
  const getTitleSize = () => {
    if (isSmall) {
      if (title.length > 15) return 'text-sm';
      return 'text-base';
    }

    if (isMedium) {
      if (title.length > 30) return 'text-lg';
      if (title.length > 20) return 'text-xl';
      return 'text-2xl';
    }

    // Large cards
    if (title.length > 30) return 'text-xl';
    if (title.length > 20) return 'text-2xl';
    return 'text-3xl';
  };

  const getSubtitleSize = () => {
    if (isSmall) return 'text-xs';

    if (isMedium) {
      if (subtitle.length > 30) return 'text-xs';
      return 'text-sm';
    }

    // Large cards
    if (subtitle.length > 50) return 'text-xs';
    if (subtitle.length > 30) return 'text-sm';
    return 'text-base';
  };

  const getNumberSize = () => {
    let numLength = targetValue.toString().length;
    if (decimalPlaces > 0) numLength += decimalPlaces + 1; // +1 for decimal point

    if (isSmall) {
      if (numLength > 6) return 'text-xl';
      return 'text-3xl';
    }

    if (isMedium) {
      if (numLength > 8) return 'text-2xl';
      if (numLength > 6) return 'text-3xl';
      return 'text-4xl';
    }

    // Large cards
    if (numLength > 10) return 'text-3xl';
    if (numLength > 8) return 'text-4xl';
    return 'text-5xl';
  };

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl p-3',
        isEditing && 'cursor-move'
      )}
      style={{
        display: isVisible ? 'flex' : 'none',
        background: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
    >
      {/* Counter Display */}
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-1"
        style={{ textAlign }}
      >
        {/* Number Ticker */}
        <div
          className="flex w-full flex-1 items-center justify-center"
          style={{ textAlign }}
        >
          <NumberTicker
            key={resetCounter} // Force remount when reset
            value={targetValue}
            startValue={startValue}
            direction={direction}
            decimalPlaces={decimalPlaces}
            delay={delay}
            duration={duration}
            textSize={getNumberSize()}
            textColor={textColor}
            bgColor={bgColor}
            borderColor={borderColor}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fontStyle={fontStyle}
            textDecoration={textDecoration}
            textAlign={textAlign}
          />
        </div>
        {title && (
          <h3
            className={cn(
              getTitleSize(),
              'line-clamp-2 w-full text-xl font-bold'
            )}
            style={{
              color: textColor,
              fontFamily: fontFamily,
              fontWeight: fontWeight,
              fontStyle: fontStyle,
              textDecoration: textDecoration,
              textAlign: textAlign,
            }}
          >
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-lg border-none p-2 text-center focus:outline-none"
                placeholder="Counter Title"
                style={{
                  color: textColor,
                  fontFamily: fontFamily,
                  fontWeight: fontWeight,
                  fontStyle: fontStyle,
                  textDecoration: textDecoration,
                  background: 'transparent',
                  textAlign: textAlign,
                }}
              />
            ) : (
              title
            )}
          </h3>
        )}
        {subtitle && (
          <div
            className={cn(getSubtitleSize(), 'line-clamp-2 w-full')}
            style={{
              color: textColor,
              fontFamily: fontFamily,
              fontWeight: fontWeight,
              fontStyle: fontStyle,
              textDecoration: textDecoration,
              textAlign: textAlign,
            }}
          >
            {isEditing ? (
              <input
                type="text"
                value={subtitle}
                onChange={(e) => handleSubtitleChange(e.target.value)}
                className="w-full border-none bg-transparent text-center focus:outline-none"
                style={{
                  color: textColor,
                  fontFamily: fontFamily,
                  fontWeight: fontWeight,
                  fontStyle: fontStyle,
                  textDecoration: textDecoration,
                  textAlign: textAlign,
                }}
                placeholder="Counter Description"
              />
            ) : (
              subtitle
            )}
          </div>
        )}
      </div>

      {/* Controls for editing mode */}
      {isEditing && (
        <div className="absolute right-2 top-2 z-10 flex gap-1">
          <TooltipProvider>
            {/* Settings popover */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      style={{
                        background: `${bgColor}80`,
                        color: textColor,
                      }}
                    >
                      <PenLine className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex max-h-[400px] w-80 flex-col p-0 shadow-lg"
                    align="end"
                    sideOffset={5}
                  >
                    {/* Fixed Header - Sticky */}
                    <div className="sticky top-0 z-20 border-b px-3 py-2 text-sm font-medium">
                      Counter Settings
                    </div>

                    {/* Scrollable Content */}
                    <div
                      className="max-h-[calc(400px-80px)] space-y-4 overflow-y-auto p-3"
                      style={{ color: textColor }}
                    >
                      {/* Text Content */}
                      <div className="space-y-2">
                        <h4
                          className="text-xs font-medium"
                          style={{ opacity: 0.7 }}
                        >
                          Text Content
                        </h4>
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <Label
                              htmlFor="title"
                              className="text-xs"
                              style={{ color: textColor }}
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
                              className="h-8"
                              placeholder="Main title (optional)"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor="subtitle"
                              className="text-xs"
                              style={{ color: textColor }}
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
                              className="h-8"
                              placeholder="Description or subtitle (optional)"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Counter Values */}
                      <div className="space-y-2">
                        <h4
                          className="text-xs font-medium"
                          style={{ opacity: 0.7 }}
                        >
                          Counter Values
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label
                              htmlFor="targetValue"
                              className="text-xs"
                              style={{ color: textColor }}
                            >
                              Target Value
                            </Label>
                            <Input
                              id="targetValue"
                              type="number"
                              value={targetValue}
                              onChange={(e) =>
                                handleTargetValueChange(e.target.value)
                              }
                              className="h-8"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor="startValue"
                              className="text-xs"
                              style={{ color: textColor }}
                            >
                              Start Value
                            </Label>
                            <Input
                              id="startValue"
                              type="number"
                              value={startValue}
                              onChange={(e) =>
                                handleStartValueChange(e.target.value)
                              }
                              className="h-8"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Animation Settings */}
                      <div className="space-y-2">
                        <h4
                          className="text-xs font-medium"
                          style={{ opacity: 0.7 }}
                        >
                          Animation
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label
                              htmlFor="direction"
                              className="text-xs"
                              style={{ color: textColor }}
                            >
                              Direction
                            </Label>
                            <Select
                              value={direction}
                              onValueChange={handleDirectionChange}
                            >
                              <SelectTrigger id="direction" className="h-8">
                                <SelectValue placeholder="Direction" />
                              </SelectTrigger>
                              <SelectContent className="dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                                <SelectItem
                                  value="up"
                                  className="dark:text-white"
                                >
                                  <div className="flex items-center">
                                    <ArrowUp className="mr-2 h-3 w-3" />
                                    <span>Count Up</span>
                                  </div>
                                </SelectItem>
                                <SelectItem
                                  value="down"
                                  className="dark:text-white"
                                >
                                  <div className="flex items-center">
                                    <ArrowDown className="mr-2 h-3 w-3" />
                                    <span>Count Down</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor="decimalPlaces"
                              className="text-xs"
                              style={{ color: textColor }}
                            >
                              Decimal Places
                            </Label>
                            <Input
                              id="decimalPlaces"
                              type="number"
                              min="0"
                              max="10"
                              value={decimalPlaces}
                              onChange={(e) =>
                                handleDecimalPlacesChange(e.target.value)
                              }
                              className="h-8"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <Label
                              htmlFor="duration"
                              className="text-xs"
                              style={{ color: textColor }}
                            >
                              Animation Duration (ms)
                            </Label>
                            <span className="text-muted-foreground text-xs dark:text-gray-300">
                              {duration}ms
                            </span>
                          </div>
                          <Slider
                            id="duration"
                            min={500}
                            max={5000}
                            step={100}
                            value={[duration]}
                            onValueChange={handleDurationChange}
                            className="dark:bg-gray-700"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label
                            htmlFor="delay"
                            className="text-xs"
                            style={{ color: textColor }}
                          >
                            Start Delay (ms)
                          </Label>
                          <Input
                            id="delay"
                            type="number"
                            min="0"
                            value={delay}
                            onChange={(e) => handleDelayChange(e.target.value)}
                            className="h-8"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="autoRestart"
                              checked={autoRestart}
                              onCheckedChange={handleAutoRestartChange}
                            />
                            <Label
                              htmlFor="autoRestart"
                              className="text-xs"
                              style={{ color: textColor }}
                            >
                              Auto Restart Animation
                            </Label>
                          </div>
                        </div>

                        {autoRestart && (
                          <div className="space-y-1 pl-6">
                            <Label
                              htmlFor="restartInterval"
                              className="text-xs"
                              style={{ color: textColor }}
                            >
                              Restart Every (seconds)
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="restartInterval"
                                type="number"
                                min="1"
                                value={restartInterval}
                                onChange={(e) =>
                                  handleRestartIntervalChange(e.target.value)
                                }
                                className="h-8 w-20"
                                style={{
                                  background: `${bgColor}90`,
                                  color: textColor,
                                  borderColor: borderColor,
                                }}
                              />
                              <Clock className="text-muted-foreground h-3 w-3 dark:text-gray-300" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="bg-card sticky bottom-0 z-20 border-t p-3 dark:border-gray-700 dark:bg-gray-800">
                      <Button
                        onClick={() => setIsSettingsOpen(false)}
                        className="w-full dark:bg-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Apply Settings
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent
                style={{
                  background: bgColor,
                  color: textColor,
                  borderColor: borderColor,
                }}
              >
                <p>Counter Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
