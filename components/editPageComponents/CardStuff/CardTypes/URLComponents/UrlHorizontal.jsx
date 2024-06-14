'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Eye,
  EyeOff,
  Link as LinkIcon,
  ImagePlus,
  DropletIcon,
  Loader2,
} from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import UrlMaker from '../../UrlMaker';
import { trackButtonClick } from '@/lib/analyticsTrackers/trackButtonClick';

export default function UrlHorizontal({
  cardVariants,
  itemId,
  card,
  isEditing,
  cardContent,
  handleChange,
  handleImageUpload,
  handleFaviconUpload,
  isUploading,
  isUploadingFavicon,
  isPreviewLoading,
  shouldHavePreview,
  isTenant,
  username,
  hasCustomImage,
  resetCustomImage,
  toggleshowPreview,
  themeData,
}) {
  const [isFaviconHovered, setIsFaviconHovered] = useState(false);
  const titleInputRef = useRef(null);

  const getTextColor = () => {
    // Otherwise, use the original logic
    if (cardContent && cardContent?.cardThemeBright) {
      console.log('cardContent: ', cardContent);
      return cardContent?.cardThemeBright ? 'text-white' : 'text-black';
    }
    // Fallback to themeData.textMode if available
    return themeData?.textMode === 'dark' ? 'text-black' : 'text-white';
  };

  return (
    <motion.main
      className={`relative flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-2xl p-4 ${getTextColor()} ${isEditing ? 'cursor-default' : 'cursor-pointer'} `}
      style={{
        background: card?.background || 'inherit',

        borderWidth: '0px',
      }}
      onClick={(e) =>
        isTenant && trackButtonClick(e, username, cardContent?.title)
      }
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* //======= Flex Container =======// */}
      <div className="flex h-full w-full flex-row items-start justify-between gap-2">
        {/* //======= Left Side: Title / Favicon / URL Section =======// */}
        <div className="relative z-10 mb-2 flex w-[40%] flex-col items-start justify-start">
          {/* //--- Favicon ---// */}
          {isEditing ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Set or Upload Favicon"
                  onMouseDown={(e) => e.stopPropagation()}
                  disabled={isUploadingFavicon}
                  onMouseEnter={() => setIsFaviconHovered(true)}
                  onMouseLeave={() => setIsFaviconHovered(false)}
                >
                  {isUploadingFavicon ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isFaviconHovered ? (
                    <ImagePlus className="h-5 w-5" />
                  ) : (
                    <img
                      className="aspect-square h-full w-full rounded-md"
                      src={cardContent?.favicon}
                    />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2 p-4">
                <p className="text-sm font-semibold">Favicon Options</p>
                <div className="flex flex-col gap-2">
                  <Input
                    value={cardContent.favicon}
                    onChange={(e) => handleChange('favicon', e.target.value)}
                    className="border-none bg-transparent text-sm focus:outline-none focus:ring-0"
                    placeholder="Paste favicon URL"
                  />
                  {/* //--- Upload Favicon ---// */}

                  <Button
                    size="icon"
                    variant="secondary"
                    aria-label="Upload Favicon"
                    className="w-full border-none bg-transparent text-sm focus:outline-none focus:ring-0"
                    disabled={isUploadingFavicon}
                    onClick={(e) => e.stopPropagation()} // prevents card drag or other parent clicks
                  >
                    <label
                      htmlFor={`upload-favicon-input-${itemId}`}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      {isUploadingFavicon ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <ImagePlus className="h-4 w-4" />
                          <span>Upload Favicon</span>
                        </>
                      )}
                    </label>
                    <input
                      id={`upload-favicon-input-${itemId}`}
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload}
                      className="hidden"
                    />
                  </Button>

                  <Tooltip
                    id={`upload-favicon-tooltip-${itemId}`}
                    place="top"
                    effect="solid"
                  />
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <img
              src={cardContent.favicon}
              alt="favicon"
              className="h-8 w-8 rounded object-contain"
            />
          )}

          {/* //--- Title ---// */}
          {isEditing ? (
            <Input
              value={cardContent.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              className="border-none bg-gray-200 bg-transparent text-[14px] font-medium shadow-none focus:cursor-text focus:border-none focus:bg-gray-200 focus:ring-0 dark:bg-gray-800 focus:dark:bg-gray-800"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              }}
              placeholder="Title..."
            />
          ) : (
            <h3
              className={`md:text-md mt-2 line-clamp-2 text-[14px] font-semibold`}
            >
              {' '}
              {cardContent.title}
            </h3>
          )}

          {/* //--- URL ---// */}
          {isEditing ? (
            <Input
              value={cardContent.url}
              onChange={(e) => handleChange('url', e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              className="hadow-none mt-1 border-none bg-gray-200 bg-transparent text-[12px] font-medium focus:cursor-text focus:border-none focus:bg-gray-200 focus:ring-0 dark:bg-gray-800 focus:dark:bg-gray-800"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              }}
              placeholder="https://example.com"
            />
          ) : (
            <span className={`text-[12px]`}>
              {' '}
              {cardContent?.url
                ? (() => {
                    try {
                      return new URL(cardContent.url).hostname.replace(
                        /^www\./,
                        ''
                      );
                    } catch (error) {
                      return cardContent.url;
                    }
                  })()
                : ''}
            </span>
          )}
        </div>

        {/* //======= Right Side: Image Preview =======// */}
        <div className="relative z-10 flex h-full w-[60%] flex-col items-center justify-center">
          {shouldHavePreview ? (
            isPreviewLoading ? (
              // Skeleton loading state
              <Skeleton className="h-full min-h-[120px] w-full rounded-md" />
            ) : cardContent.showPreview && cardContent.displayImage ? (
              // Preview image
              <img
                src={cardContent.displayImage}
                alt="Preview"
                className="max-h-[98%] w-full rounded-md object-cover object-top"
              />
            ) : (
              // No preview or preview is disabled
              !isTenant && (
                <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-200 dark:bg-gray-800">
                  <EyeOff className="h-8 w-8 text-gray-400 dark:text-gray-600" />
                </div>
              )
            )
          ) : null}
        </div>
      </div>

      {/* //======= Editing Overlay =======// */}
      {isEditing && (
        <div className="absolute right-2 top-2 z-[9999] flex flex-col items-end gap-1">
          {/* //--- Toggle Preview Button ---// */}
          {shouldHavePreview && (
            <div
              data-tooltip-id={`toggle-preview-tooltip-${itemId}`}
              data-tooltip-content={
                cardContent.showPreview ? 'Disable Preview' : 'Enable Preview'
              }
            >
              <Button
                size="icon"
                variant="secondary"
                className="z-50"
                aria-label={
                  cardContent.showPreview ? 'Disable Preview' : 'Enable Preview'
                }
                onClick={(e) => toggleshowPreview(e)}
              >
                {cardContent.showPreview ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
              <Tooltip
                id={`toggle-preview-tooltip-${itemId}`}
                place="top"
                effect="solid"
              />
            </div>
          )}

          {/* //--- Image URL Popover ---// */}
          <div
            data-tooltip-id={`url-image-tooltip-${itemId}`}
            data-tooltip-content="Set Image URL"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="z-50"
                  aria-label="Set Image URL"
                  disabled={isUploading}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2 p-3">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Image URL</p>
                  <Input
                    value={cardContent.displayImage || ''}
                    onChange={(e) =>
                      handleChange('displayImage', e.target.value)
                    }
                    className="w-full"
                    placeholder="Paste image URL"
                  />
                  {hasCustomImage && (
                    <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                      <span className="text-xs text-gray-500">
                        Using custom image
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetCustomImage && resetCustomImage();
                        }}
                      >
                        Reset to Auto
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <Tooltip
              id={`url-image-tooltip-${itemId}`}
              place="top"
              effect="solid"
            />
          </div>

          {/* //--- Upload Image Button ---// */}
          <div
            data-tooltip-id={`upload-image-tooltip-${itemId}`}
            data-tooltip-content="Upload Image"
          >
            <Button
              size="icon"
              variant="secondary"
              disabled={isUploading}
              aria-label="Upload Image"
              onClick={(e) => e.stopPropagation()} // prevents card drag
            >
              <label
                htmlFor={`upload-image-input-${itemId}`}
                className="cursor-pointer"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
              </label>
              <input
                id={`upload-image-input-${itemId}`}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </Button>
            <Tooltip
              id={`upload-image-tooltip-${itemId}`}
              place="top"
              effect="solid"
            />
          </div>
        </div>
      )}

      {/* //======= Extra URL Maker Placement (Below) =======// */}
      <div className="absolute bottom-0 left-0 mt-2 flex w-full items-center gap-2 break-all rounded-full px-4 py-1 text-[8px]">
        <UrlMaker links={cardContent.url} />
      </div>
    </motion.main>
  );
}
