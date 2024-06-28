import React, { useState, useRef } from 'react';
import {
  Eye,
  EyeOff,
  ImagePlus,
  Link2,
  CircleArrowOutUpRight,
  Play,
  Pause,
  Settings2,
  Check,
  Globe,
  Video,
  Volume2,
  VolumeX,
  ExternalLink,
  PanelTop,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useItems } from '@/app/contexts/ItemsContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';
import { toast } from 'sonner';
import { safeWindowOpen } from '@/utils/urlUtils';
import { cn } from '@/lib/utils';
import { trackButtonClick } from '@/lib/analyticsTrackers/trackButtonClick';

export default function BannerCard({
  itemId,
  card,
  isEditing,
  isTenant,
  isMobile = false,
}) {
  const { user } = useAuth();
  const { updateItemContent } = useItems();
  const urlInputRef = useRef(null);
  const imageUrlInputRef = useRef(null);
  const videoUrlInputRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(
    card?.image || '/userPlaceholder.jpg'
  );
  const [videoUrl, setVideoUrl] = useState(card?.video || null);
  const [caption, setCaption] = useState(card?.caption || '');
  const [mediaLink, setMediaLink] = useState(card?.link || '');
  const [tempLinkUrl, setTempLinkUrl] = useState('');
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [tempVideoUrl, setTempVideoUrl] = useState('');
  const [showMedia, setShowMedia] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isUrlOpen, setIsUrlOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [linkUrlError, setLinkUrlError] = useState('');
  const [imageUrlError, setImageUrlError] = useState('');
  const [videoUrlError, setVideoUrlError] = useState('');
  const [videoOptions, setVideoOptions] = useState(
    card?.videoOptions || {
      autoplay: true,
      muted: true,
      showControls: false,
    }
  );
  const [activeTab, setActiveTab] = useState(videoUrl ? 'video' : 'image');

  // Get the bgFit and bgPosition properties from the card
  const bgFit = card?.bgFit || 'cover';
  const bgPosition = card?.bgPosition || 'center';

  const handleChange = (type, value) => {
    if (type === 'image') {
      setImageUrl(value);
      setVideoUrl(null); // Clear video when setting image
      updateItemContent(itemId, { image: value, video: null });
    } else if (type === 'video') {
      setVideoUrl(value);
      setImageUrl('/userPlaceholder.jpg'); // Clear image when setting video
      updateItemContent(itemId, {
        video: value,
        image: '/userPlaceholder.jpg',
      });
    }
  };

  const handleCaptionChange = (value) => {
    setCaption(value);
    updateItemContent(itemId, { caption: value });
  };

  const handleLinkUrlChange = (value) => {
    setTempLinkUrl(value);
    setLinkUrlError('');
  };

  const handleImageUrlChange = (value) => {
    setTempImageUrl(value);
    setImageUrlError('');
  };

  const handleVideoUrlChange = (value) => {
    setTempVideoUrl(value);
    setVideoUrlError('');
  };

  const applyMediaLink = () => {
    if (!tempLinkUrl) {
      setLinkUrlError('Please enter a URL');
      return;
    }

    // Basic URL validation
    const trimmedUrl = tempLinkUrl.trim();
    if (!trimmedUrl.match(/^https?:\/\/.+/i)) {
      setLinkUrlError(
        'Please enter a valid URL starting with http:// or https://'
      );
      return;
    }

    setMediaLink(trimmedUrl);
    updateItemContent(itemId, { link: trimmedUrl });
    setIsLinkOpen(false);
    toast.success('Link updated successfully');
  };

  const applyImageFromUrl = async () => {
    if (!tempImageUrl) {
      setImageUrlError('Please enter a URL');
      return;
    }

    try {
      setIsUploading(true);

      // Basic URL validation
      const trimmedUrl = tempImageUrl.trim();
      if (!trimmedUrl.match(/^https?:\/\/.+/i)) {
        setImageUrlError(
          'Please enter a valid URL starting with http:// or https://'
        );
        setIsUploading(false);
        return;
      }

      // Test if the URL is a valid image
      const img = new Image();
      img.onload = () => {
        // Image loaded successfully
        handleChange('image', trimmedUrl);
        setIsUploading(false);
        setIsUrlOpen(false);
        toast.success('Image updated from URL');
      };
      img.onerror = () => {
        setImageUrlError('URL is not a valid image');
        setIsUploading(false);
      };
      img.src = trimmedUrl;
    } catch (error) {
      console.error('Error loading image from URL:', error);
      setImageUrlError('Failed to load image from URL');
      setIsUploading(false);
    }
  };

  const applyVideoFromUrl = () => {
    if (!tempVideoUrl) {
      setVideoUrlError('Please enter a URL');
      return;
    }

    try {
      setIsUploading(true);

      // Basic URL validation
      const trimmedUrl = tempVideoUrl.trim();
      if (!trimmedUrl.match(/^https?:\/\/.+/i)) {
        setVideoUrlError(
          'Please enter a valid URL starting with http:// or https://'
        );
        setIsUploading(false);
        return;
      }

      // For video, we can't easily test if it's valid without trying to load it
      // We'll accept the URL and let the video element handle errors
      handleChange('video', trimmedUrl);
      setIsUploading(false);
      setIsUrlOpen(false);
      toast.success('Video updated from URL');
    } catch (error) {
      console.error('Error setting video from URL:', error);
      setVideoUrlError('Failed to set video from URL');
      setIsUploading(false);
    }
  };

  const handleMediaUpload = async (e) => {
    if (!user?.username) {
      console.warn('User not logged in. Cannot upload.');
      return;
    }
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const fileType = file.type.split('/')[0]; // Get 'image' or 'video'
      const fileSizeMB = file.size / (1024 * 1024); // Convert to MB

      if (fileType !== 'image' && fileType !== 'video') {
        console.warn(
          'Unsupported file type. Only images and videos are allowed.'
        );
        return;
      }
      if (fileType === 'video' && fileSizeMB > 10) {
        console.warn('Video file size exceeds the 10 MB limit.');
        return;
      }

      setIsUploading(true);
      try {
        const downloadURL = await uploadFileToItemsData(
          user.username,
          'media',
          file
        );
        handleChange(fileType, downloadURL);
        // Set active tab based on uploaded media type
        setActiveTab(fileType);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsUploading(false);
      }
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
    if (!showMedia) {
      return <p className="text-center text-sm text-gray-500">Media hidden</p>;
    }

    // If we have a direct video URL
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
        </div>
      );
    }

    // Default to image
    return (
      <div className="relative h-full w-full">
        <img
          src={imageUrl}
          alt="Card Media"
          className={cn('h-full w-full', isEditing && 'pointer-events-none')}
          style={{
            objectFit: bgFit,
            objectPosition: bgPosition,
          }}
        />
        {isEditing && (
          <div
            className="absolute inset-0 z-50 bg-transparent"
            aria-hidden="true"
          />
        )}
      </div>
    );
  };

  return (
    <div
      onClick={(e) => {
        if (!isEditing && isTenant) {
          mediaLink && safeWindowOpen(mediaLink);
        }
      }}
      className={cn(
        'relative flex h-full w-full',
        isEditing
          ? 'cursor-move'
          : isTenant && mediaLink
            ? 'cursor-pointer'
            : 'cursor-default',
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

      {isEditing && (
        <div className="absolute right-2 top-2 z-[60] flex items-end gap-2">
          <TooltipProvider>
            {/* Toggle Show/Hide Media */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMedia(!showMedia);
                  }}
                >
                  {showMedia ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showMedia ? 'Hide Media' : 'Show Media'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Upload New Media */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  size="icon"
                  variant="secondary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <label>
                    <ImagePlus className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload Media</p>
              </TooltipContent>
            </Tooltip>

            {/* Clickable Link Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover
                  open={isLinkOpen}
                  onOpenChange={(open) => {
                    setIsLinkOpen(open);
                    if (open) {
                      // Initialize with the current values when opening
                      setTempLinkUrl(mediaLink || '');
                      // Focus the input after popover opens
                      setTimeout(() => urlInputRef.current?.focus(), 100);
                    } else {
                      setLinkUrlError('');
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 p-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Clickable Link</h4>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500">
                          Link URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            ref={urlInputRef}
                            type="text"
                            value={tempLinkUrl}
                            onChange={(e) =>
                              handleLinkUrlChange(e.target.value)
                            }
                            className={`w-full rounded-md border p-2 text-sm ${linkUrlError ? 'border-red-500' : ''}`}
                            placeholder="https://example.com"
                          />
                          <Button
                            size="icon"
                            onClick={applyMediaLink}
                            title="Set link URL"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                        {linkUrlError && (
                          <p className="text-xs text-red-500">{linkUrlError}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          This is the URL users will navigate to when clicking
                          the media
                        </p>
                      </div>

                      {/* Display current link if set */}
                      {mediaLink && (
                        <div className="rounded-md bg-gray-50 p-2 text-xs">
                          <div className="font-medium text-gray-700">
                            Current Link:
                          </div>
                          <div className="truncate text-blue-600">
                            <a
                              href={mediaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {mediaLink}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Set Clickable Link</p>
              </TooltipContent>
            </Tooltip>

            {/* Media Settings Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover
                  open={isUrlOpen}
                  onOpenChange={(open) => {
                    setIsUrlOpen(open);
                    if (open) {
                      // Initialize with the current values when opening
                      setTempImageUrl(
                        imageUrl !== '/userPlaceholder.jpg' ? imageUrl : ''
                      );
                      setTempVideoUrl(videoUrl || '');
                      setActiveTab(videoUrl ? 'video' : 'image');
                    } else {
                      setImageUrlError('');
                      setVideoUrlError('');
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 p-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Media Settings</h4>

                      {/* Tabs for Image vs Video */}
                      <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                      >
                        <TabsList className="mb-2 grid grid-cols-2">
                          <TabsTrigger value="image" className="text-xs">
                            <Globe className="mr-1.5 h-3.5 w-3.5" /> Image
                          </TabsTrigger>
                          <TabsTrigger value="video" className="text-xs">
                            <Video className="mr-1.5 h-3.5 w-3.5" /> Video
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="image" className="mt-2 space-y-3">
                          <div className="space-y-2">
                            <label className="text-xs text-gray-500">
                              Image URL
                            </label>
                            <div className="flex gap-2">
                              <input
                                ref={imageUrlInputRef}
                                type="text"
                                value={tempImageUrl}
                                onChange={(e) =>
                                  handleImageUrlChange(e.target.value)
                                }
                                className={`w-full rounded-md border p-2 text-sm ${imageUrlError ? 'border-red-500' : ''}`}
                                placeholder="https://example.com/image.jpg"
                              />
                              <Button
                                size="icon"
                                onClick={applyImageFromUrl}
                                title="Set image from URL"
                                disabled={isUploading}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </div>
                            {imageUrlError && (
                              <p className="text-xs text-red-500">
                                {imageUrlError}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Load an image directly from a URL
                            </p>
                          </div>

                          {/* Current image preview */}
                          {imageUrl && imageUrl !== '/userPlaceholder.jpg' && (
                            <div className="mt-2 h-20 overflow-hidden rounded-md bg-gray-100">
                              <img
                                src={imageUrl}
                                alt="Current"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="video" className="mt-2 space-y-3">
                          <div className="space-y-2">
                            <label className="text-xs text-gray-500">
                              Video URL
                            </label>
                            <div className="flex gap-2">
                              <input
                                ref={videoUrlInputRef}
                                type="text"
                                value={tempVideoUrl}
                                onChange={(e) =>
                                  handleVideoUrlChange(e.target.value)
                                }
                                className={`w-full rounded-md border p-2 text-sm ${videoUrlError ? 'border-red-500' : ''}`}
                                placeholder="https://example.com/video.mp4"
                              />
                              <Button
                                size="icon"
                                onClick={applyVideoFromUrl}
                                title="Set video from URL"
                                disabled={isUploading}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </div>
                            {videoUrlError && (
                              <p className="text-xs text-red-500">
                                {videoUrlError}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Load a video directly from a URL
                            </p>
                          </div>

                          {/* Video options */}
                          <div className="space-y-1.5 pt-2">
                            <h5 className="text-xs font-medium text-gray-500">
                              Video Options
                            </h5>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant={
                                  videoOptions.autoplay ? 'default' : 'outline'
                                }
                                className="h-8 px-2 text-xs"
                                onClick={() => toggleVideoOption('autoplay')}
                              >
                                {videoOptions.autoplay ? (
                                  <Pause className="mr-1 h-3 w-3" />
                                ) : (
                                  <Play className="mr-1 h-3 w-3" />
                                )}
                                {videoOptions.autoplay
                                  ? 'Autoplay On'
                                  : 'Autoplay Off'}
                              </Button>

                              <Button
                                size="sm"
                                variant={
                                  videoOptions.muted ? 'default' : 'outline'
                                }
                                className="h-8 px-2 text-xs"
                                onClick={() => toggleVideoOption('muted')}
                              >
                                {videoOptions.muted ? (
                                  <VolumeX className="mr-1 h-3 w-3" />
                                ) : (
                                  <Volume2 className="mr-1 h-3 w-3" />
                                )}
                                {videoOptions.muted ? 'Muted' : 'Sound On'}
                              </Button>
                            </div>

                            <Button
                              size="sm"
                              variant={
                                videoOptions.showControls
                                  ? 'default'
                                  : 'outline'
                              }
                              className="h-8 px-2 text-xs"
                              onClick={() => toggleVideoOption('showControls')}
                            >
                              <PanelTop className="mr-1 h-3 w-3" />
                              {videoOptions.showControls
                                ? 'Controls Visible'
                                : 'Controls Hidden'}
                            </Button>
                          </div>

                          {/* Current video info */}
                          {videoUrl && (
                            <div className="mt-2 rounded-md bg-gray-50 p-2 text-xs">
                              <div className="font-medium text-gray-700">
                                Current video:
                              </div>
                              <div className="truncate text-gray-500">
                                {videoUrl}
                              </div>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>

                      {isUploading && (
                        <div className="py-2 text-center">
                          <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                          <span className="text-xs">Loading media...</span>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Media Settings</p>
              </TooltipContent>
            </Tooltip>

           
          </TooltipProvider>
        </div>
      )}

      {!isEditing && mediaLink && (
        <a
          href={mediaLink}
          target="_blank"
          onClick={(e) =>
            isTenant &&
            trackButtonClick(e, user.username, card?.title || card?.type)
          }
          rel="noopener noreferrer"
          className="absolute right-2 top-2 z-40"
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            size="icon"
          >
            <CircleArrowOutUpRight size={12} />
          </Button>
        </a>
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
