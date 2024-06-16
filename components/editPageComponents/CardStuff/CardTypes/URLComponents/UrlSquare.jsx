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

export default function UrlSquare({
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
  isTenant,
  username,
  hasCustomImage,
  resetCustomImage,
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
      {/* //======= Title / Favicon / URL Section =======// */}
      <div className="relative z-10 mb-2 flex w-full flex-col items-start justify-start">
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
            className="mt-1 border-none bg-gray-200 bg-transparent text-[12px] font-medium shadow-none focus:cursor-text focus:border-none focus:bg-gray-200 focus:ring-0 dark:bg-gray-800 focus:dark:bg-gray-800"
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

      {/* //======= Extra URL Maker Placement (Below) =======// */}
      <div className="mt-2 flex w-full items-center gap-2 break-all rounded-full px-4 py-1 text-[8px]">
        <UrlMaker links={cardContent.url} />
      </div>
    </motion.main>
  );
}
