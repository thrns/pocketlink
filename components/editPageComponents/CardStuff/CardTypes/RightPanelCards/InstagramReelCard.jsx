import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Video,
  Volume2,
  VolumeX,
  PanelTop,
  Settings,
  User,
  ExternalLink,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ScrollArea } from '@/components/ui/scroll-area';

import { useItems } from '@/app/contexts/ItemsContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useUserInstagramReels } from '@/hooks/useUserInstagramReels';
import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function InstagramReelCard({
  itemId,
  card,
  isEditing,
  isTenant,
  isMobile = false,
}) {
  const { user } = useAuth();
  const { updateItemContent } = useItems();
  const {
    reels,
    isLoading: isLoadingReels,
    error: reelsError,
    hasInstagramIntegration,
    refreshReels,
  } = useUserInstagramReels();
  
  const [videoUrl, setVideoUrl] = useState(card?.video || null);
  const [caption, setCaption] = useState(card?.caption || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [videoOptions, setVideoOptions] = useState(
    card?.videoOptions || {
      autoplay: true,
      muted: true,
      showControls: false,
    }
  );

  // Filter reels based on search query
  const filteredReels = reels.filter(reel => 
    reel.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(reel.timestamp).toLocaleDateString().includes(searchQuery)
  );

  // Get the bgFit and bgPosition properties from the card
  const bgFit = card?.bgFit || 'cover';
  const bgPosition = card?.bgPosition || 'center';

  const handleChange = (value) => {
    setVideoUrl(value);
    updateItemContent(itemId, { video: value });
  };

  const handleCaptionChange = (value) => {
    setCaption(value);
    updateItemContent(itemId, { caption: value });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const selectUserReel = async (reel) => {
    if (!user?.username) {
      console.warn('User not logged in. Cannot upload.');
      return;
    }

    setIsUploading(true);
    try {
      // Download the video directly from Instagram media URL
      const response = await fetch(reel.media_url, {
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Failed to download Instagram reel');
      }

      const blob = await response.blob();
      const file = new File([blob], `instagram-reel-${reel.id}.mp4`, {
        type: 'video/mp4',
      });

      // Upload to Supabase
      const downloadURL = await uploadFileToItemsData(
        user.username,
        'media',
        file
      );

      // Update the video URL and caption
      handleChange(downloadURL);
      if (reel.caption && reel.caption !== caption) {
        handleCaptionChange(reel.caption);
      }

      toast.success('Instagram reel added successfully!');
    } catch (error) {
      console.error('Error selecting user reel:', error);
      toast.error('Failed to add Instagram reel. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const toggleVideoOption = (option) => {
    const newOptions = {
      ...videoOptions,
      [option]: !videoOptions[option],
    };

    setVideoOptions(newOptions);
    updateItemContent(itemId, { videoOptions: newOptions });
  };

  // Handle hide settings changes
  const handleHideSettingsChange = (itemId, hideSettings) => {
    updateItemContent(itemId, hideSettings);
  };

  const renderMedia = () => {
    // If we have a video URL
    if (videoUrl) {
      return (
        <div className="relative h-full w-full">
          <div className="pointer-events-none absolute inset-0 h-full w-full">
            <video
              src={videoUrl}
              autoPlay={videoOptions.autoplay}
              loop
              muted={videoOptions.muted}
              controls={videoOptions.showControls}
              playsInline
              className="h-full w-full"
              style={{
                objectFit: bgFit,
                objectPosition: bgPosition,
              }}
            />
          </div>
          {isEditing && (
            <div
              className="absolute inset-0 z-50 bg-transparent"
              aria-hidden="true"
            />
          )}

          {/* Change Video Button - Top Right */}
          {isEditing && (
            <div className="absolute right-2 top-2 z-[60]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="secondary" className="rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent text-white">
                    <Settings className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium leading-none">
                        Your Instagram Reels
                      </h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Select from your own Instagram reels to replace the current video
                      </p>
                    </div>
                    
                    {!hasInstagramIntegration ? (
                      <div className="text-center py-4">
                        <User className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Connect your Instagram account to access your reels</p>
                        <Button size="sm" variant="outline" onClick={() => window.open('/dashboard/integrations', '_blank')}>
                          Connect Instagram
                        </Button>
                      </div>
                    ) : (
                      <>
                        {/* Search Bar */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="Search reels..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        
                        {isLoadingReels ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                            <span className="ml-2 text-sm text-gray-600">Loading reels...</span>
                          </div>
                        ) : reelsError ? (
                          <div className="text-center py-4">
                            <p className="text-sm text-red-500 mb-2">{reelsError}</p>
                            <Button onClick={refreshReels} size="sm" variant="outline">
                              Try Again
                            </Button>
                          </div>
                        ) : filteredReels.length === 0 ? (
                          <div className="text-center py-4">
                            <Video className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              {searchQuery ? 'No reels match your search' : 'No reels found'}
                            </p>
                          </div>
                        ) : (
                          <ScrollArea className="h-64">
                            <div className="grid grid-cols-2 gap-2">
                              {filteredReels.map((reel) => (
                                <div
                                  key={reel.id}
                                  className="relative cursor-pointer rounded-lg border border-gray-200 p-2 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50"
                                  onClick={() => !isUploading && selectUserReel(reel)}
                                >
                                  {reel.thumbnail_url && (
                                    <img
                                      src={reel.thumbnail_url}
                                      alt="Reel thumbnail"
                                      className="aspect-video w-full rounded object-cover"
                                    />
                                  )}
                                  <div className="mt-1">
                                    <p className="text-xs text-gray-600 line-clamp-2">
                                      {reel.caption || 'No caption'}
                                    </p>
                                    <div className="mt-1 flex items-center justify-between">
                                      <span className="text-xs text-gray-400">
                                        {new Date(reel.timestamp).toLocaleDateString()}
                                      </span>
                                      <ExternalLink className="h-3 w-3 text-gray-400" />
                                    </div>
                                  </div>
                                  {isUploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        )}
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              
              
            </div>
          )}
          {/* Mute/Unmute button for video - visible only when not in editing mode */}
          {!isEditing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVideoOption('muted');
              }}
              className="absolute left-2 top-2 z-50 rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent p-1.5 transition-colors"
              title={videoOptions.muted ? 'Unmute' : 'Mute'}
              aria-label={videoOptions.muted ? 'Unmute' : 'Mute'}
            >
              {videoOptions.muted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </button>
          )}
        </div>
      );
    }

    // Default placeholder for no video - show popover button to get URL
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gray-100">
        {isEditing ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4 p-4">
            <Video className="h-12 w-12 text-gray-400" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Video className="mr-2 h-4 w-4" />
                  Add Instagram Video
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium leading-none">
                      Your Instagram Reels
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      Select from your own Instagram reels to add a video
                    </p>
                  </div>
                  
                  {!hasInstagramIntegration ? (
                    <div className="text-center py-4">
                      <User className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Connect your Instagram account to access your reels</p>
                      <Button size="sm" variant="outline" onClick={() => window.open('/dashboard/integrations', '_blank')}>
                        Connect Instagram
                      </Button>
                    </div>
                  ) : (
                    <>
                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search reels..."
                          value={searchQuery}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      
                      {isLoadingReels ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                          <span className="ml-2 text-sm text-gray-600">Loading reels...</span>
                        </div>
                      ) : reelsError ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-red-500 mb-2">{reelsError}</p>
                          <Button onClick={refreshReels} size="sm" variant="outline">
                            Try Again
                          </Button>
                        </div>
                      ) : filteredReels.length === 0 ? (
                        <div className="text-center py-4">
                          <Video className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            {searchQuery ? 'No reels match your search' : 'No reels found'}
                          </p>
                        </div>
                      ) : (
                        <ScrollArea className="h-64">
                          <div className="grid grid-cols-2 gap-2">
                            {filteredReels.map((reel) => (
                              <div
                                key={reel.id}
                                className="relative cursor-pointer rounded-lg border border-gray-200 p-2 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50"
                                onClick={() => !isUploading && selectUserReel(reel)}
                              >
                                {reel.thumbnail_url && (
                                  <img
                                    src={reel.thumbnail_url}
                                    alt="Reel thumbnail"
                                    className="aspect-video w-full rounded object-cover"
                                  />
                                )}
                                <div className="mt-1">
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {reel.caption || 'No caption'}
                                  </p>
                                  <div className="mt-1 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                      {new Date(reel.timestamp).toLocaleDateString()}
                                    </span>
                                    <ExternalLink className="h-3 w-3 text-gray-400" />
                                  </div>
                                </div>
                                {isUploading && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <p className="text-center text-sm text-gray-500">
              No video uploaded
            </p>
          </div>
        ) : (
          <div className="text-center">
            <Video className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No video uploaded</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'relative flex h-full w-full',
        isEditing ? 'cursor-move' : 'cursor-default',
        'items-center justify-center overflow-hidden rounded-2xl bg-gray-100'
      )}
      style={{ background: card?.background || 'transparent' }}
    >
      {renderMedia()}

      {/* Caption */}
      <div
        style={{ maxWidth: '80%' }}
        className={`absolute bottom-2 left-2 z-[60] ${
          (caption || isEditing) && 'bg-white'
        } rounded-lg p-2 text-xs text-white`}
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing ? (
          <input
            type="text"
            value={caption}
            placeholder="Add a caption"
            onChange={(e) => handleCaptionChange(e.target.value)}
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

      {/* Video Controls */}
      {isEditing && videoUrl && (
        <div className="absolute right-2 top-14 z-[60] flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVideoOption('autoplay');
                  }}
                >
                  {videoOptions.autoplay ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {videoOptions.autoplay
                    ? 'Disable Autoplay'
                    : 'Enable Autoplay'}
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                                    className="rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVideoOption('muted');
                  }}
                >
                  {videoOptions.muted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{videoOptions.muted ? 'Unmute Video' : 'Mute Video'}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                                    className="rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent text-white"

                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVideoOption('showControls');
                  }}
                >
                  <PanelTop className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {videoOptions.showControls
                    ? 'Hide Controls'
                    : 'Show Controls'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Loading Indicator */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <p className="text-sm text-white">Uploading...</p>
        </div>
      )}
    </div>
  );
}
