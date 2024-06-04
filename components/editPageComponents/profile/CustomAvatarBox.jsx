'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import Cropper from 'react-easy-crop';
import { avatarFileUpload } from '@/lib/helpers/supabaseStorageHelpers';
import { Trash, Camera, Link } from 'lucide-react';
import { toast } from 'sonner';
import { useFetch } from '@/app/contexts/FetcherContext';
import EditBannerButton from '../EditBannerButton';

// Helper function to create image from URL
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });

// Function to get cropped image blob
const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg');
  });
};

export default function CustomAvatarBox({ user, themeData }) {
  const { profile, setProfile } = useFetch();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const borderColor = themeData?.border || '#000000';

  // Handle file selection and show cropping dialog
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    console.log('Selected file:', file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setIsCropDialogOpen(true);
    };
    reader.onerror = (error) => console.error('Error reading file:', error);
    reader.readAsDataURL(file);
  };

  // Handle cropping completion
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Upload cropped image to Supabase
  const handleCropAndUpload = async () => {
    if (!croppedAreaPixels) {
      toast.error('No cropped area selected.');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Cropping image...');
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      console.log('Uploading cropped image...');
      const uploadedUrl = await avatarFileUpload(
        user?.username,
        'avatar',
        croppedImageBlob
      );

      setProfile((prevProfile) => ({
        ...prevProfile,
        avatarURL: uploadedUrl,
      }));

      // Reset states
      setIsCropDialogOpen(false);
      setImageSrc(null);
      toast.success('Image uploaded successfully!', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } catch (error) {
      console.error('Error cropping and uploading image:', error);
      toast.error('Failed to upload image.', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle URL image submission
  const handleUrlSubmit = async () => {
    if (!imageUrl) {
      setUrlError('Please enter an image URL');
      return;
    }

    try {
      setIsLoading(true);
      setUrlError('');

      // Trim the URL to remove any leading/trailing spaces
      const trimmedUrl = imageUrl.trim();

      // Check if URL is valid - more flexible validation
      const isValidUrl = /^https?:\/\//i.test(trimmedUrl);
      if (!isValidUrl) {
        setUrlError(
          'Please enter a valid URL starting with http:// or https://'
        );
        setIsLoading(false);
        return;
      }

      // Load the image from URL to validate it works
      console.log('Attempting to load image from URL:', trimmedUrl);
      await createImage(trimmedUrl);

      // Set the image source for cropping
      setImageSrc(trimmedUrl);

      // Close the URL dialog and open the crop dialog
      setIsLinkDialogOpen(false);
      setIsCropDialogOpen(true);
    } catch (error) {
      console.error('Error loading image from URL:', error);
      setUrlError(
        'Failed to load image from URL. Please check the URL and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Direct upload URL image without cropping
  const handleDirectUrlUpload = async () => {
    if (!imageUrl) {
      setUrlError('Please enter an image URL');
      return;
    }

    try {
      setIsLoading(true);
      setUrlError('');

      // Trim the URL to remove any leading/trailing spaces
      const trimmedUrl = imageUrl.trim();

      // More flexible URL validation
      const isValidUrl = /^https?:\/\//i.test(trimmedUrl);
      if (!isValidUrl) {
        setUrlError(
          'Please enter a valid URL starting with http:// or https://'
        );
        setIsLoading(false);
        return;
      }

      // Test if image can be loaded
      try {
        await createImage(trimmedUrl);
      } catch (err) {
        console.error('Image load test failed:', err);
        setUrlError(
          "The URL doesn't appear to be a valid image. Please try a different URL."
        );
        setIsLoading(false);
        return;
      }

      // Upload the URL directly to profile
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatarURL: trimmedUrl,
      }));

      // Close dialog and reset
      setIsLinkDialogOpen(false);
      setImageUrl('');

      toast.success('Profile image updated successfully!', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } catch (error) {
      console.error('Error setting image from URL:', error);
      setUrlError(
        'Failed to use this image. Please check the URL and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image deletion
  const handleDeleteAvatar = () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to remove your profile picture?'
    );

    if (confirmed) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatarURL: null,
      }));

      toast.success('Profile picture removed', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
          color: 'white',
          borderRadius: '8px',
        },
      });
    }
  };

  return (
    <div className="group relative mb-4 flex flex-col items-center">
      <img
        src={profile?.avatarURL ?? '/avatar-placeholder.png'}
        alt="Avatar"
        className={`h-[128px] w-[128px] ${profile.displayMode === 'profile-pic' ? 'rounded-full' : 'rounded-lg'} border object-cover transition-all duration-300`}
        style={{ borderColor: borderColor }}
      />

      {/* Icon overlay, shown on hover */}
      <div className={`absolute inset-0 z-50 flex items-center justify-center  ${profile.displayMode === 'profile-pic' ? 'rounded-full' : 'rounded-lg'} bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
        <div className="relative h-full w-full">
          {/* Camera Icon (Top Left) */}
          <div
            className="absolute"
            style={{
              left: '10%',
              top: '15%',
            }}
          >
            <Button
              variant="ghost"
              className="rounded-full bg-white bg-white/90 p-2"
              onClick={() => fileInputRef.current.click()}
            >
              <Camera className="h-5 w-5 text-gray-800" />
            </Button>
          </div>

          {/* URL Link Icon (Top Right) */}
          <div
            className="absolute"
            style={{
              right: '10%',
              top: '15%',
            }}
          >
            <Button
              variant="ghost"
              className="rounded-full bg-white bg-white/90 p-2"
              onClick={() => setIsLinkDialogOpen(true)}
            >
              <Link className="h-5 w-5 text-gray-800" />
            </Button>
          </div>

          {/* Edit Banner Button (Center) */}
          <div
            className="absolute"
            style={{
              left: 'calc(50% - 50px)',
              top: 'calc(50% - 20px)',
            }}
          ></div>

          {/* Delete Icon (Bottom) */}
          {profile?.avatarURL && (
            <div
              className="absolute"
              style={{
                left: 'calc(50% - 20px)',
                bottom: '15%',
              }}
            >
              <Button
                variant="ghost"
                className="rounded-full bg-red-100 bg-white/90 p-2"
                onClick={handleDeleteAvatar}
              >
                <Trash className="h-5 w-5 text-red-600" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* URL Dialog */}
      <Dialog
        open={isLinkDialogOpen}
        onOpenChange={(open) => {
          setIsLinkDialogOpen(open);
          if (!open) {
            setImageUrl('');
            setUrlError('');
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogTitle>Add image from URL</DialogTitle>
          <div className="mt-2 space-y-4">
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setUrlError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUrlSubmit();
                }
              }}
              className={urlError ? 'border-red-500' : ''}
            />

            {urlError && <p className="text-sm text-red-500">{urlError}</p>}

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Button
                onClick={handleUrlSubmit}
                className="flex-1"
                disabled={isLoading || !imageUrl}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Loading</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </>
                ) : (
                  'Crop & Upload'
                )}
              </Button>

              <Button
                onClick={handleDirectUrlUpload}
                variant="outline"
                className="flex-1"
                disabled={isLoading || !imageUrl}
              >
                {isLoading ? 'Processing...' : 'Use Directly'}
              </Button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              For best results, use a square image from a direct image URL
              (ending in .jpg, .png, etc.)
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cropper Dialog */}
      <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>Crop Your Image</DialogTitle>
          {imageSrc && (
            <div className="relative h-64 w-full">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setIsCropDialogOpen(false);
                setImageSrc(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCropAndUpload} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2">Saving</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </>
              ) : (
                'Save Image'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
