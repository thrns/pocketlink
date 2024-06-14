'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Skeleton } from '@/components/ui/skeleton';

export default function UrlHalfHorizontal({
  cardVariants,
  itemId,
  card,
  isEditing,
  watermarkEnabled,
  toggleWatermark,
  cardContent,
  handleChange,
  handleImageUpload,
  handleFaviconUpload,
  isUploading,
  isUploadingFavicon,
  isTenant,
  username,
  hasCustomImage,
  resetCustomImage,
  themeData,
  shouldHavePreview,
  isPreviewLoading,
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
      className={`flex h-full w-full flex-row items-center justify-between gap-4 overflow-hidden rounded-2xl p-4 ${getTextColor()} ${isEditing ? 'cursor-default' : 'cursor-pointer'} `}
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
      {/* //======= Title / Favicon / URL Section =======// */}
      <div className="z-10 flex w-full flex-col items-start justify-start gap-2">
        <div className="flex w-full items-center gap-3">
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
                  <Button
                    variant="secondary"
                    asChild
                    disabled={isUploadingFavicon}
                  >
                    <label className="flex cursor-pointer items-center space-x-2">
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
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFaviconUpload}
                        className="hidden"
                      />
                    </label>
                  </Button>
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
            <h3 className={`md:text-md line-clamp-1 text-[14px] font-semibold`}>
              {' '}
              {cardContent.title}
            </h3>
          )}
        </div>
      </div>
      {/* //======= Main Image Preview Section =======// */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-end">
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
    </motion.main>
  );
}
