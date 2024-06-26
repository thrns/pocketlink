'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  ImagePlus,
  Pen,
  Link as LinkIcon,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useItems } from '@/app/contexts/ItemsContext';
import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/app/contexts/AuthContext';
import Image from 'next/image';
import { safeWindowOpen } from '@/utils/urlUtils';

export default function FormCard({
  card,
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
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('external');
  const [externalFormUrl, setExternalFormUrl] = useState('');
  const [externalFormName, setExternalFormName] = useState('');
  const [isProcessingLink, setIsProcessingLink] = useState(false);

  const [imageUrl, setImageUrl] = useState(
    card?.image ||
      [
        '/shop/gradients/shopGradient1.jpg',
        '/shop/gradients/shopGradient2.jpg',
        '/shop/gradients/shopGradient3.jpg',
        '/shop/gradients/shopGradient4.jpg',
      ][Math.floor(Math.random() * 3)]
  );
  const [caption, setCaption] = useState(card?.caption || null);
  const [formId, setFormId] = useState(card?.form_id || null);
  const [isExternalForm, setIsExternalForm] = useState(
    card?.isExternalForm || false
  );

  // --------------------------
  // Drag detection
  // --------------------------
  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);

  // --------------------------
  // Navigate to edit page on double-click
  // --------------------------
  const handleClick = () => {
    if (isEditing || isDragging) return;

    if (isExternalForm && card?.externalFormUrl) {
      // Open external form in a new tab
      safeWindowOpen(card.externalFormUrl);
      return;
    }

    // Since internal forms are removed, only external forms work
    if (!isExternalForm) {
      toast.error(
        'Internal forms are no longer supported. Please use external forms.',
        {
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
            color: 'white',
            borderRadius: '8px',
          },
        }
      );
      return;
    }
  };

  // --------------------------
  // Handle external form link submission
  // --------------------------
  const handleExternalFormSubmit = async () => {
    if (!externalFormUrl) {
      toast.error('Please enter a form URL', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
          color: 'white',
          borderRadius: '8px',
        },
      });
      return;
    }

    setIsProcessingLink(true);

    try {
      // Use a name provided by the user or extract from URL
      const formName =
        externalFormName || extractFormNameFromUrl(externalFormUrl);

      // Set the form data
      setFormId(null); // No internal form ID
      setCaption(formName);
      setIsExternalForm(true);

      // Update the item content
      updateItemContent(itemId, {
        formId: null,
        caption: formName,
        isExternalForm: true,
        externalFormUrl: externalFormUrl,
        // Keep existing image or use default
        image: card?.image || imageUrl,
      });

      toast.success('External form added successfully', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
          color: 'white',
          borderRadius: '8px',
        },
      });

      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Error processing form link', {
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } finally {
      setIsProcessingLink(false);
    }
  };

  // Extract form name from URL
  const extractFormNameFromUrl = (url) => {
    try {
      // Try to extract a meaningful name from the URL
      const urlObj = new URL(url);

      // Look for keywords in the pathname that might suggest a form name
      const pathParts = urlObj.pathname
        .split('/')
        .filter((part) => part.length > 0);

      if (pathParts.length > 0) {
        // Get the last meaningful segment
        const lastSegment = pathParts[pathParts.length - 1]
          .replace(/-|_/g, ' ') // Replace dashes and underscores with spaces
          .replace(/\.\w+$/, ''); // Remove file extensions

        if (lastSegment.length > 0) {
          // Capitalize first letter of each word
          return lastSegment
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }

      // If we can't extract a good name, use the hostname + "Form"
      return `${urlObj.hostname.replace('www.', '')} Form`;
    } catch (error) {
      // If URL parsing fails, return a generic name
      return 'External Form';
    }
  };

  const handleChange = (type, value) => {
    if (type === 'image') {
      setImageUrl(value);
      updateItemContent(itemId, { image: value });
    } else {
      updateItemContent(itemId, { [type]: value });
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
        toast.error('Only images allowed in nested card.', {
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
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
          'formCard',
          file
        );
        handleChange('image', downloadURL);
      } catch (error) {
        toast.error('Error uploading image.', {
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
            color: 'white',
            borderRadius: '8px',
          },
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <div
        className="relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 dark:bg-gray-800"
        style={{
          background: card?.showPreview ? card?.background : 'inherit',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => !tenant && setIsHovered(true)}
        onMouseLeave={(e) => !tenant && setIsHovered(false)}
        onClick={handleClick}
      >
        {sizeKey !== 'square' && (
          <div className="relative h-full max-h-[50%] w-full">
            <Image
              src={imageUrl}
              alt={caption}
              fill
              objectFit={'cover'}
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        )}

        {/* Product Details */}
        <div className="flex flex-grow flex-col p-3">
          <h3 className="line-clamp-3 text-sm font-semibold text-black dark:text-white">
            {caption || 'No form chosen'}
          </h3>
          {isExternalForm && (
            <span className="mt-1 flex items-center text-xs text-gray-500">
              <LinkIcon size={12} className="mr-1" /> External Form
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto p-3 pt-0">
          <Button
            disabled={!caption}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-black py-2 text-white"
          >
            <Pen size={12} />
            <span> Fill</span>
          </Button>
        </div>

        {/* Show "Select Form" when there's no formId */}
        {isHovered && !isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300">
            {caption ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDialogOpen(true);
                }}
                className="z-50"
                variant="default"
              >
                Change Form
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDialogOpen(true);
                }}
                className="z-50"
                variant="default"
              >
                Select Form
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Dialog for selecting a form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select or Link a Form</DialogTitle>
            <DialogDescription>
              Choose from your existing forms or add an external form link.
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="external"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="external">External Link</TabsTrigger>
            </TabsList>

            <TabsContent value="external" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="external-form-url">
                    Third-Party Form URL
                  </Label>
                  <Input
                    id="external-form-url"
                    placeholder="https://example.com/form"
                    value={externalFormUrl}
                    onChange={(e) => setExternalFormUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="external-form-name">
                    Form Name (Optional)
                  </Label>
                  <Input
                    id="external-form-name"
                    placeholder="Give your form a name"
                    value={externalFormName}
                    onChange={(e) => setExternalFormName(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    If left blank, we'll attempt to extract a name from the URL.
                  </p>
                </div>

                <Button
                  onClick={handleExternalFormSubmit}
                  className="w-full"
                  disabled={isProcessingLink || !externalFormUrl}
                >
                  {isProcessingLink ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Add External Form
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
