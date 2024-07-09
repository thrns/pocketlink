'use client';
import React, { useContext, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { FaImages } from 'react-icons/fa';
import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuth } from '@/app/contexts/AuthContext';
import { Image, Upload } from 'lucide-react';

export default function MediaDockIcon({ handleAdd }) {
  const { user } = useAuth();
  const [mediaUrl, setMediaUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Track whether the current media is an image or video.
  // This will be set when uploading a file, or inferred from the URL otherwise.
  const [uploadedFileType, setUploadedFileType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mediaUrl.trim()) return;

    // If we got the file type from the upload flow, use that.
    // Otherwise, do a quick extension check as a fallback if user typed in a direct link.
    let finalType = uploadedFileType;
    if (!finalType) {
      const isVideoUrl = mediaUrl.match(/\.(mp4|webm|ogg)$/i);
      finalType = isVideoUrl ? 'video' : 'image';
    }

    // Call the parent's add function
    handleAdd(finalType, 'horizontal', {
      [finalType]: mediaUrl,
      caption: null,
      link: null,
    });

    // Reset
    setMediaUrl('');
    setUploadedFileType(null);

    // Close the popover
    setIsOpen(false);
  };

  const handleMediaUpload = async (e) => {
    // If user picks a file
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const fileType = file.type.split('/')[0]; // "image" or "video"
      const fileSizeMB = file.size / (1024 * 1024);

      // Basic validations
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

      // Indicate we know the file is image or video
      setUploadedFileType(fileType);

      try {
        setIsUploading(true);
        // Upload to supabase and get the download URL
        const downloadURL = await uploadFileToItemsData(
          user?.username,
          'media',
          file
        );
        // Put the resulting URL in state
        setMediaUrl(downloadURL);

        // Auto-add the media after successful upload
        handleAdd(fileType, 'horizontal', {
          [fileType]: downloadURL,
          caption: null,
          link: null,
        });

        // Reset state
        setMediaUrl('');
        setUploadedFileType(null);

        // Close the popover after successful upload
        setIsOpen(false);
      } catch (error) {
        console.error('Media upload failed:', error);
        // Optionally, show an error message
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handlePasteUrl = (e) => {
    e.stopPropagation();
    setMediaUrl(e.target.value);
    // If user typed a new URL, reset the uploaded type
    setUploadedFileType(null);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="group flex h-full w-full items-center justify-center rounded-lg transition-all duration-200">
          <Image className="group-scale-110 h-5 w-5 transition-transform duration-200" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
          Media Component
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-2">
            <label
              htmlFor="mediaInput"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Media URL
            </label>
            <input
              id="mediaInput"
              type="text"
              value={mediaUrl}
              onChange={handlePasteUrl}
              placeholder="https://example.com/image.jpg or video.mp4"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              onMouseDown={(e) => e.stopPropagation()}
              disabled={isUploading}
            />
          </div>

          <div className="mt-1 space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Or Upload Media
            </label>
            <div className="relative rounded-lg border-2 border-dashed border-bento-violet border-gray-300 p-4 transition-all dark:border-bento-violet dark:border-gray-600">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Drag & drop or click to upload
                </p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>

          {/* Only show the submit button for manually entered URLs */}
          {mediaUrl && !isUploading && (
            <button
              type="submit"
              className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2"
            >
              <FaImages className="mr-2 h-4 w-4" />
              Add Media Component
            </button>
          )}

          {isUploading && (
            <div className="mt-2 flex items-center justify-center px-4 py-2.5 text-sm">
              <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </div>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
}
