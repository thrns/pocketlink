import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import {
  CircleArrowOutUpRight,
  Edit,
  Link2,
  Play,
  Subtitles,
  Sliders,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useItems } from '@/app/contexts/ItemsContext';
import { useAuth } from '@/app/contexts/AuthContext';

export default function YouTubeComponent({
  itemId,
  card,
  isEditing: initialIsEditing = false,
  isTenant,
  isMobile = false,
  username,
}) {
  const { user } = useAuth();
  const { updateItemContent } = useItems();

  // Basic state
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [embedCode, setEmbedCode] = useState(card?.link || '');
  const [autoplay, setAutoplay] = useState(card?.autoplay || false);
  const [showControls, setShowControls] = useState(card?.showControls ?? true);
  const [showCaptions, setShowCaptions] = useState(card?.showCaptions ?? true);
  const [isMuted, setIsMuted] = useState(card?.isMuted ?? false);

  // States for hover tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  // Check if the current user is the owner and can edit
  const canEdit = !isTenant;

  // Handle mouse move for tooltip positioning
  const handleMouseMove = useCallback(
    (e) => {
      if (!isTenant && wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setTooltipPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top + 20,
        });
      }
    },
    [isTenant]
  );

  // Sync editing state with props
  useEffect(() => {
    setIsEditing(initialIsEditing);
  }, [initialIsEditing]);

  // Sync state with card props when they change
  useEffect(() => {
    if (card) {
      setEmbedCode(card.link || '');
      setAutoplay(card.autoplay || false);
      setShowControls(card.showControls ?? true);
      setShowCaptions(card.showCaptions ?? true);
      setIsMuted(card.isMuted ?? false);
    }
  }, [card]);

  // Handle embed code change with debounce
  const handleEmbedCodeChange = useCallback(
    (value) => {
      setEmbedCode(value);
      // Debounce the update to prevent rapid re-renders
      const timeoutId = setTimeout(() => {
        updateItemContent(itemId, {
          link: value,
          autoplay,
          showControls,
          showCaptions,
          isMuted,
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    },
    [itemId, updateItemContent, autoplay, showControls, showCaptions, isMuted]
  );

  // Handle autoplay toggle
  const handleAutoplayToggle = useCallback(() => {
    const newValue = !autoplay;
    setAutoplay(newValue);
    updateItemContent(itemId, {
      autoplay: newValue,
      showControls,
      showCaptions,
      isMuted,
    });
  }, [
    autoplay,
    itemId,
    updateItemContent,
    showControls,
    showCaptions,
    isMuted,
  ]);

  // Handle controls visibility toggle
  const handleControlsToggle = useCallback(() => {
    const newValue = !showControls;
    setShowControls(newValue);
    updateItemContent(itemId, {
      showControls: newValue,
      autoplay,
      showCaptions,
      isMuted,
    });
  }, [
    showControls,
    itemId,
    updateItemContent,
    autoplay,
    showCaptions,
    isMuted,
  ]);

  // Handle captions visibility toggle
  const handleCaptionsToggle = useCallback(() => {
    const newValue = !showCaptions;
    setShowCaptions(newValue);
    updateItemContent(itemId, {
      showCaptions: newValue,
      autoplay,
      showControls,
      isMuted,
    });
  }, [
    showCaptions,
    itemId,
    updateItemContent,
    autoplay,
    showControls,
    isMuted,
  ]);

  // Handle mute toggle
  const handleMuteToggle = useCallback(() => {
    const newValue = !isMuted;
    setIsMuted(newValue);
    updateItemContent(itemId, {
      isMuted: newValue,
      autoplay,
      showControls,
      showCaptions,
    });
  }, [
    isMuted,
    itemId,
    updateItemContent,
    autoplay,
    showControls,
    showCaptions,
  ]);

  // Toggle edit mode
  const toggleEditMode = useCallback((e) => {
    e.stopPropagation();
    setIsEditing((prev) => !prev);
  }, []);

  // Extract YouTube video ID from embed code or URL
  const getYouTubeVideoId = useCallback((code) => {
    if (!code) return null;

    // Try to find video ID in embed code
    const embedMatch = code.match(/youtube\.com\/embed\/([^?&]+)/);
    if (embedMatch) return embedMatch[1];

    // Try to find video ID in regular URL
    const urlMatch = code.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/
    );
    if (urlMatch) return urlMatch[1];

    // Try to find video ID in YouTube Shorts URL
    const shortsMatch = code.match(/youtube\.com\/shorts\/([^?&]+)/);
    if (shortsMatch) return shortsMatch[1];

    return null;
  }, []);

  // Generate embed code from video ID
  const generateEmbedCode = useCallback(
    (videoId) => {
      if (!videoId) return '';

      // Build URL parameters based on settings
      const params = new URLSearchParams();
      if (autoplay) {
        params.append('autoplay', '1');
        params.append('loop', '1'); // Enable looping when autoplay is on
        params.append('playlist', videoId); // Required for looping
      }
      if (!showControls) params.append('controls', '0');
      if (!showCaptions) params.append('cc_load_policy', '0');
      if (isMuted) params.append('mute', '1');
      params.append('rel', '0'); // Don't show related videos
      params.append('modestbranding', '1'); // Minimal YouTube branding

      // Add pointer-events disabler if not in tenant mode
      const pointerEventsStyle = !isTenant ? 'pointer-events: none;' : '';

      return `<iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/${videoId}?${params.toString()}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
      style="${pointerEventsStyle}"
    ></iframe>`;
    },
    [autoplay, showControls, showCaptions, isMuted, isTenant]
  );

  // Add custom CSS for edit mode styling
  useEffect(() => {
    if (!isTenant) {
      const style = document.createElement('style');
      style.textContent = `
        .youtube-component-wrapper.edit-mode .youtube-embed-container {
          position: relative;
        }
        
        .youtube-component-wrapper.edit-mode .youtube-embed-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 5;
          background: transparent;
          cursor: pointer;
        }
        
        .youtube-component-wrapper.edit-mode iframe,
        .youtube-component-wrapper.edit-mode video {
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }
        
        .youtube-component-wrapper.edit-mode:hover iframe,
        .youtube-component-wrapper.edit-mode:hover video {
          opacity: 0.95;
        }
        
        .cursor-tooltip {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          pointer-events: none;
          z-index: 50;
          white-space: nowrap;
        }
      `;
      document.head.appendChild(style);

      return () => {
        if (style.parentNode) {
          document.head.removeChild(style);
        }
      };
    }
  }, [isTenant]);

  // Memoize the video ID and processed code to prevent unnecessary recalculations
  const videoId = useMemo(
    () => getYouTubeVideoId(embedCode),
    [embedCode, getYouTubeVideoId]
  );
  const processedCode = useMemo(
    () => (videoId ? generateEmbedCode(videoId) : ''),
    [videoId, generateEmbedCode]
  );

  // Memoize the embed content to prevent unnecessary re-renders
  const embedContent = useMemo(() => {
    if (!processedCode) return null;
    return (
      <div
        className="youtube-embed-container h-full w-full"
        dangerouslySetInnerHTML={{ __html: processedCode }}
      />
    );
  }, [processedCode]);

  return (
    <div
      ref={wrapperRef}
      onClick={(e) => {
        if (!isEditing && canEdit && !e.target.closest('iframe')) {
          setIsEditing(true);
        }
      }}
      onMouseEnter={() => !isTenant && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
      className={`youtube-component-wrapper relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl ${
        isEditing
          ? 'cursor-move'
          : canEdit
            ? 'cursor-pointer'
            : 'cursor-default'
      } ${isTenant ? 'bg-gray-100' : 'edit-mode'}`}
      style={{ background: card?.background || 'transparent' }}
    >
      {/* YouTube embed */}
      <div className="relative h-full w-full">
        <div className="h-full w-full">
          {processedCode ? (
            embedContent
          ) : (
            <p className="text-center text-sm text-gray-500">
              {embedCode
                ? 'Invalid YouTube URL or embed code'
                : 'No YouTube URL provided'}
            </p>
          )}
        </div>
      </div>

      {/* Hover tooltip */}
      {showTooltip && !isEditing && (
        <div
          className="cursor-tooltip"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          Can interact in preview
        </div>
      )}

      {/* Edit button */}
      {!isEditing && canEdit && (
        <div className="absolute right-2 top-2 z-40">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={toggleEditMode}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit YouTube Embed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Edit controls */}
      {isEditing && (
        <div className="absolute right-2 top-2 z-50 flex items-center gap-2">
          <TooltipProvider>
            {/* YouTube URL input */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 p-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="mb-2 text-sm">Enter YouTube URL:</p>
                    <input
                      type="text"
                      value={embedCode}
                      onChange={(e) => handleEmbedCodeChange(e.target.value)}
                      className="w-full rounded-md border p-2"
                      placeholder="https://www.youtube.com/watch?v=... or https://youtube.com/shorts/..."
                    />
                    {embedCode && (
                      <div className="mt-2 text-xs">
                        <span
                          className={
                            videoId ? 'text-green-600' : 'text-red-600'
                          }
                        >
                          {videoId
                            ? '✅ Valid YouTube URL'
                            : '❌ Invalid YouTube URL'}
                        </span>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add YouTube URL</p>
              </TooltipContent>
            </Tooltip>

            {/* Player settings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Sliders className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-64 p-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Autoplay</label>
                        <Button
                          size="sm"
                          variant={autoplay ? 'default' : 'outline'}
                          onClick={handleAutoplayToggle}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Show Controls</label>
                        <Button
                          size="sm"
                          variant={showControls ? 'default' : 'outline'}
                          onClick={handleControlsToggle}
                        >
                          <Sliders className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Show Captions</label>
                        <Button
                          size="sm"
                          variant={showCaptions ? 'default' : 'outline'}
                          onClick={handleCaptionsToggle}
                        >
                          <Subtitles className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Mute</label>
                        <Button
                          size="sm"
                          variant={isMuted ? 'default' : 'outline'}
                          onClick={handleMuteToggle}
                        >
                          {isMuted ? (
                            <VolumeX className="h-3 w-3" />
                          ) : (
                            <Volume2 className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Player Settings</p>
              </TooltipContent>
            </Tooltip>

            {/* Done editing button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={toggleEditMode}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Done Editing</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
