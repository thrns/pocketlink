'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Cropper from 'react-easy-crop';
import { avatarFileUpload } from '@/lib/helpers/supabaseStorageHelpers';
import {
  ImageIcon,
  Link,
  Edit,
  ZoomIn,
  MoveHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import { toast } from 'sonner';
import { useFetch } from '@/app/contexts/FetcherContext';
import {useAuth} from "@/app/contexts/AuthContext"

// Minimum dimensions for banner images (portrait aspect ratio)
const MIN_WIDTH = 500;
const MIN_HEIGHT = 800;
const ASPECT_RATIO = 2 / 3; // Portrait aspect ratio

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

// Function to validate image dimensions
const validateImageDimensions = async (src) => {
  try {
    const img = await createImage(src);

    return {
      valid: true,
      width: img.width,
      height: img.height,
      needsCropping: img.width / img.height !== ASPECT_RATIO,
    };
  } catch (error) {
    return {
      valid: false,
      message: 'Failed to validate image dimensions',
    };
  }
};

export default function EditBannerButton({ themeData }) {
  const { profile, setProfile } = useFetch();
  const {user} = useAuth()
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageDimensions, setImageDimensions] = useState(null);
  const [cropReady, setCropReady] = useState(false);
  const fileInputRef = useRef(null);

  const buttonColor = themeData?.buttonColor || '#6366f1';
  const textColor = themeData?.textColor || '#ffffff';

  // Reset crop position when image source changes
  useEffect(() => {
    if (imageSrc) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCropReady(false);

      // Add a small delay to let the cropper initialize
      const timer = setTimeout(() => {
        setCropReady(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [imageSrc]);

  // Handle file selection and show cropping dialog
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        // Validate image dimensions
        const result = await validateImageDimensions(reader.result);

        if (!result.valid) {
          toast.error(result.message);
          setIsLoading(false);
          return;
        }

        setImageDimensions({
          width: result.width,
          height: result.height,
          aspectRatio: result.width / result.height,
        });

        setImageSrc(reader.result);
        setIsCropDialogOpen(true);
      } catch (error) {
        toast.error('Error processing image');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // Handle cropping completion
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Upload cropped image to Supabase
  const handleCropAndUpload = async () => {
    if (!croppedAreaPixels) {
      toast.error('Please select an area to crop');
      return;
    }

    try {
      setIsLoading(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Calculate dimensions of cropped image to ensure it meets minimum requirements
      const url = URL.createObjectURL(croppedImageBlob);
      const result = await validateImageDimensions(url);
      URL.revokeObjectURL(url);

      // Check if cropped dimensions meet minimum requirements
      if (
        croppedAreaPixels.width < MIN_WIDTH ||
        croppedAreaPixels.height < MIN_HEIGHT
      ) {
        toast.error(
          `Cropped area is too small. Please select a larger area (minimum ${MIN_WIDTH}x${MIN_HEIGHT}px)`
        );
        setIsLoading(false);
        return;
      }

      // Proceed with upload if dimensions are valid
      const uploadedUrl = await avatarFileUpload(
        user?.username,
        'banner',
        croppedImageBlob
      );

      setProfile((prevProfile) => ({
        ...prevProfile,
        avatarURL: uploadedUrl,
      }));

      // Reset states
      setIsCropDialogOpen(false);
      setImageSrc(null);
      setImageDimensions(null);

      toast.success('Banner uploaded successfully!', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD)',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } catch (error) {
      console.error('Error cropping and uploading image:', error);
      toast.error('Failed to upload banner image.', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
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

      // Check if URL is valid
      const isValidUrl = /^https?:\/\//i.test(trimmedUrl);
      if (!isValidUrl) {
        setUrlError(
          'Please enter a valid URL starting with http:// or https://'
        );
        setIsLoading(false);
        return;
      }

      // Validate image dimensions
      const result = await validateImageDimensions(trimmedUrl);

      if (!result.valid) {
        setUrlError(result.message || 'Invalid image');
        setIsLoading(false);
        return;
      }

      setImageDimensions({
        width: result.width,
        height: result.height,
        aspectRatio: result.width / result.height,
      });

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

  // Get text color based on theme
  const getTextColor = () => {
    return themeData?.textMode === 'dark'
      ? { color: 'black' }
      : { color: 'white' };
  };

  const getBackgroundColor = () => {
    return themeData?.textMode === 'dark'
      ? { backgroundColor: 'white' }
      : { backgroundColor: 'black' };
  };

  return (
    <>
      <Button
        style={{ ...getTextColor(), ...getBackgroundColor() }}
        onClick={() => setIsLinkDialogOpen(true)}
        variant="ghost"
        className="bg-opacity-800 relative flex items-center gap-2 rounded-full border px-4 py-2"
      >
        <Edit size={16} className="animate-pulse" />
        <p style={getTextColor()} className="text-sm">
          Edit Banner
        </p>
      </Button>

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
        <DialogContent className="w-[95%] rounded-lg md:max-w-md">
          <DialogTitle>Add Banner Image</DialogTitle>
          <div className="mt-2 space-y-4">
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => fileInputRef.current.click()}
                className="w-full border-2 border-dashed border-gray-300 border-gray-400 bg-gray-50 bg-transparent py-6 text-gray-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
                ) : (
                  <>
                    <ImageIcon size={24} className="mr-2" />
                    Upload from Device
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">- or -</div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Add image from URL
                </p>
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

                <Button
                  onClick={handleUrlSubmit}
                  className="w-full"
                  disabled={isLoading || !imageUrl}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Loading</span>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </>
                  ) : (
                    'Use this URL'
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-blue-800">
              <div className="flex-shrink-0">
                <ImageIcon size={18} />
              </div>
              <p className="text-xs">
                You'll be able to select the portrait area you want to use in
                your banner. Best results with images larger than {MIN_WIDTH}x
                {MIN_HEIGHT}px.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Cropper Dialog */}
      <Dialog
        open={isCropDialogOpen}
        onOpenChange={(open) => {
          if (!open && !isLoading) {
            setIsCropDialogOpen(false);
            setImageSrc(null);
            setImageDimensions(null);
          }
        }}
      >
        <DialogContent className="w-[95%] md:max-w-md">
          <DialogTitle>Choose Banner Area</DialogTitle>

          {imageSrc && (
            <>
              <div className="mb-2 px-1">
                <p className="text-sm text-gray-500">
                  Select the portion of your image to use as your portrait
                  banner
                </p>
              </div>

              <div className="relative h-80 w-full overflow-hidden rounded-md bg-gray-100">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={ASPECT_RATIO} // Force portrait aspect ratio
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={true}
                  cropShape="rect"
                  objectFit="contain"
                />
              </div>

              {/* Controls for better UX */}
              <div className="mt-2 space-y-4">
                {/* Zoom control */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1 text-xs font-medium">
                      <ZoomIn size={14} />
                      Zoom
                    </label>
                    <span className="text-xs text-gray-500">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.01}
                    onValueChange={(values) => setZoom(values[0])}
                    className="w-full"
                  />
                </div>

                {/* Position indicator */}
                {imageDimensions && (
                  <div className="rounded-md bg-gray-50 p-2 text-xs text-gray-600">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <ArrowUpDown size={12} />
                        Position
                      </span>
                      {cropReady && croppedAreaPixels && (
                        <span>
                          {Math.round(croppedAreaPixels.width)} ×{' '}
                          {Math.round(croppedAreaPixels.height)} px
                        </span>
                      )}
                    </div>
                    <p>
                      {imageDimensions.aspectRatio < ASPECT_RATIO
                        ? 'Drag horizontally to position your banner.'
                        : 'Drag vertically to position your banner.'}
                    </p>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  Banner will be cropped to portrait format (
                  {ASPECT_RATIO.toFixed(1)}) automatically
                </p>
              </div>
            </>
          )}

          <DialogFooter className="mt-4 flex justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsCropDialogOpen(false);
                setImageSrc(null);
                setImageDimensions(null);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCropAndUpload}
              disabled={isLoading || !cropReady || !croppedAreaPixels}
              className="min-w-24"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Saving</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              ) : (
                'Set as Banner'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
