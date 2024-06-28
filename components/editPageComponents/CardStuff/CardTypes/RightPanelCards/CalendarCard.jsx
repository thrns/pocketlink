'use client';

import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Edit, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useItems } from '@/app/contexts/ItemsContext';
import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/app/contexts/AuthContext';
import Image from 'next/image';
import { safeWindowOpen } from '@/utils/urlUtils';

export default function CalendarCard({
  card = {}, // Provide default empty object to prevent undefined errors
  itemId,
  isEditing,
  isMobile,
  tenant = false,
  isTenantHovered,
  handleAdd,
}) {
  const { updateItemContent } = useItems();
  const { user } = useAuth();
  const router = useRouter();
  const sizeKey = card?.sizeKey;

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calendlyScriptLoaded, setCalendlyScriptLoaded] = useState(false);

  // Handle hide settings changes
  const handleHideSettingsChange = (itemId, hideSettings) => {
    updateItemContent(itemId, hideSettings);
  };

  // Initialize state with safe defaults
  const defaultGradients = [
    '/shop/gradients/shopGradient1.jpg',
    '/shop/gradients/shopGradient2.jpg',
    '/shop/gradients/shopGradient3.jpg',
    '/shop/gradients/shopGradient4.jpg',
  ];

  const randomGradient =
    defaultGradients[Math.floor(Math.random() * defaultGradients.length)];
  console.log('card image: ', card?.image);

  const [imageUrl, setImageUrl] = useState(card?.image || randomGradient);
  const [appointmentTitle, setAppointmentTitle] = useState(
    card?.title || 'Untitled Appointment'
  );
  const [appointmentPrice, setAppointmentPrice] = useState(card?.price || '');
  const [appointmentDuration, setAppointmentDuration] = useState(
    card?.duration || '30'
  );
  const [calendarType, setCalendarType] = useState(
    card?.calendarType || 'popup'
  );
  const [calendlyUrl, setCalendlyUrl] = useState(card?.calendlyUrl || '');
  const [redirectAfterBooking, setRedirectAfterBooking] = useState(
    card?.redirectAfterBooking || false
  );
  const [redirectUrl, setRedirectUrl] = useState(card?.redirectUrl || '');

  // Helper function to check if URL is Calendly
  const isCalendlyUrl = (url) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('calendly.com');
    } catch {
      return false;
    }
  };

  // Effect to auto-switch to redirect mode for non-Calendly URLs
  useEffect(() => {
    if (calendlyUrl && !isCalendlyUrl(calendlyUrl)) {
      // If URL is not Calendly and current mode is popup, switch to redirect
      if (calendarType === 'popup') {
        setCalendarType('redirect');
      }
    }
  }, [calendlyUrl, calendarType]);

  // Load Calendly widget script when needed
  useEffect(() => {
    if (isBookingDialogOpen && !calendlyScriptLoaded) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setCalendlyScriptLoaded(true);
      document.body.appendChild(script);

      return () => {
        // Clean up script if component unmounts during loading
        if (!script.onload) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isBookingDialogOpen, calendlyScriptLoaded]);

  // --------------------------
  // Drag detection
  // --------------------------
  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);

  // --------------------------
  // Handle booking
  // --------------------------
  const handleBooking = () => {
    if (!calendlyUrl) {
      toast.error('No calendar URL configured for this appointment.', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
      return;
    }

    // For Calendly URLs, check the calendar type preference
    if (isCalendlyUrl(calendlyUrl) && calendarType === 'popup') {
      setIsBookingDialogOpen(true);
    } else {
      // For non-Calendly URLs or redirect preference, always redirect
      safeWindowOpen(calendlyUrl);
    }
  };

  // --------------------------
  // Update calendar settings
  // --------------------------
  const handleSaveSettings = () => {
    try {
      updateItemContent(itemId, {
        title: appointmentTitle,
        price: appointmentPrice,
        duration: appointmentDuration,
        calendarType,
        calendlyUrl,
        redirectAfterBooking,
        redirectUrl,
        image: imageUrl,
      });

      setIsDialogOpen(false);
      toast.success('Calendar settings saved!', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #22c96e, #038a4e)',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings. Please try again.', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
    }
  };

  // --------------------------
  // Upload a new image
  // --------------------------
  const handleMediaUpload = async (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const fileType = file.type.split('/')[0];

      if (fileType !== 'image') {
        toast.error('Only images allowed in calendar card.', {
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
            color: 'white',
            borderRadius: '8px',
          },
        });
        return;
      }

      setIsUploading(true);
      try {
        const downloadURL = await uploadFileToItemsData(
          user?.username,
          'calendarCard',
          file
        );
        setImageUrl(downloadURL);
        updateItemContent(itemId, { image: downloadURL });
      } catch (error) {
        toast.error('Error uploading image.', {
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
            color: 'white',
            borderRadius: '8px',
          },
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // --------------------------
  // Render calendar card
  // --------------------------
  const safeCard = card || {};
  const isMobileView =
    typeof useMediaQuery === 'function'
      ? useMediaQuery('(max-width: 640px)')
      : false;

  return (
    <>
      <div
        className="relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 dark:bg-gray-800"
        style={{
          background: safeCard.showPreview ? safeCard.background : 'inherit',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !tenant && setIsHovered(true)}
        onMouseLeave={() => !tenant && setIsHovered(false)}
      >
        {sizeKey !== 'square' && (
          <div className="relative h-full max-h-[50%] w-full">
            <Image
              src={imageUrl || randomGradient}
              alt={appointmentTitle || 'Appointment image'}
              fill
              objectFit={'cover'}
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        )}

        {/* Appointment Details */}
        <div className="flex flex-grow flex-col p-3">
          <h3 className="line-clamp-3 text-sm font-semibold text-black dark:text-white">
            {appointmentTitle || 'Untitled Appointment'}
          </h3>

          {appointmentPrice && (
            <p className="mt-1 text-lg font-bold text-black dark:text-white">
              ₹{parseFloat(appointmentPrice).toLocaleString()}
            </p>
          )}

          {appointmentDuration && (
            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              <span>{appointmentDuration} minutes</span>
            </div>
          )}
        </div>

        {/* Schedule Button */}
        <div className="mt-auto p-2 pt-0 sm:p-3">
          <Button
            className="flex w-full items-center justify-center gap-1 rounded-md bg-black py-1 text-xs text-white sm:gap-2 sm:py-2 sm:text-sm"
            onClick={handleBooking}
            disabled={isLoading || isUploading}
          >
            <Calendar size={14} className="sm:h-4 sm:w-4" />
            <span className="whitespace-nowrap">SCHEDULE A CALL</span>
          </Button>
        </div>

        {/* Edit overlay when hovered */}
        {isHovered && !isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsDialogOpen(true);
              }}
              className="z-50 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
              variant="default"
            >
              <Edit className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="xs:inline hidden">Edit Calendar Settings</span>
              <span className="xs:hidden">Edit</span>
            </Button>
          </div>
        )}

        {/* Upload image button when editing */}
        {isEditing && (
          <div className="absolute right-2 top-2 flex gap-2">
            <label htmlFor={`upload-media-${itemId}`}>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black bg-black/70">
                <ImagePlus size={16} className="text-white" />
              </div>
            </label>
            <input
              id={`upload-media-${itemId}`}
              type="file"
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                e.stopPropagation();
                handleMediaUpload(e);
              }}
              className="hidden"
            />
            
          
          </div>
        )}
      </div>

      {/* Calendar Settings Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Calendar Settings</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={appointmentTitle}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  setAppointmentTitle(e.target.value);
                }}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                value={appointmentPrice}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  setAppointmentPrice(e.target.value);
                }}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration (min)
              </Label>
              <Select
                value={appointmentDuration}
                onValueChange={setAppointmentDuration}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="calendly-url">Calendar URL</Label>
                <Input
                  id="calendly-url"
                  placeholder="https://calendly.com/yourusername/30min or other calendar service URL"
                  value={calendlyUrl}
                  onMouseDown={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    e.stopPropagation();
                    setCalendlyUrl(e.target.value);
                  }}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Calendly: https://calendly.com/username/30min | Other: Any
                  calendar booking URL
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="display-type" className="text-right">
                Display Type
              </Label>
              <Select value={calendarType} onValueChange={setCalendarType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select display type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="popup"
                    disabled={calendlyUrl && !isCalendlyUrl(calendlyUrl)}
                  >
                    Show in Popup{' '}
                    {calendlyUrl &&
                      !isCalendlyUrl(calendlyUrl) &&
                      '(Calendly only)'}
                  </SelectItem>
                  <SelectItem value="redirect">Redirect to URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {calendlyUrl && !isCalendlyUrl(calendlyUrl) && (
              <div className="rounded bg-amber-50 p-2 text-sm text-amber-600">
                ⚠️ Popup mode is only available for Calendly URLs. Other
                calendar services will redirect to the URL.
              </div>
            )}

            {calendarType === 'redirect' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="redirect-url" className="text-right">
                  Redirect URL
                </Label>
                <Input
                  id="redirect-url"
                  placeholder="https://example.com/thankyou"
                  onMouseDown={(e) => e.stopPropagation()}
                  value={redirectUrl}
                  onChange={(e) => {
                    e.stopPropagation();
                    setRedirectUrl(e.target.value);
                  }}
                  className="col-span-3"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleSaveSettings();
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calendly Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-[800px]">
          <DialogHeader className="border-b p-4">
            <DialogTitle>Book {appointmentTitle || 'Appointment'}</DialogTitle>
          </DialogHeader>

          <div className="calendly-container h-[700px] w-full">
            {calendlyUrl ? (
              <div
                className="calendly-inline-widget"
                data-url={calendlyUrl}
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">No Calendly URL configured</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
