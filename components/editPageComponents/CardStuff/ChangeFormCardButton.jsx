'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useItems } from '@/app/contexts/ItemsContext';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link as LinkIcon, Loader2 } from 'lucide-react';

export default function ChangeFormCardButton({ card, itemId }) {
  const { updateItemContent } = useItems();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [externalFormUrl, setExternalFormUrl] = useState('');
  const [externalFormName, setExternalFormName] = useState('');
  const [isProcessingLink, setIsProcessingLink] = useState(false);

  // Handle external form link submission
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

      // Update the item content
      updateItemContent(itemId, {
        formId: null,
        caption: formName,
        isExternalForm: true,
        externalFormUrl: externalFormUrl,
        // Keep existing image
        image: card?.image,
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
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname
        .split('/')
        .filter((part) => part.length > 0);

      if (pathParts.length > 0) {
        const lastSegment = pathParts[pathParts.length - 1]
          .replace(/-|_/g, ' ')
          .replace(/\.\w+$/, '');

        if (lastSegment.length > 0) {
          return lastSegment
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }

      return `${urlObj.hostname.replace('www.', '')} Form`;
    } catch (error) {
      return 'External Form';
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        variant="outline"
        size="sm"
        className="w-full"
      >
        Change Form
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Form</DialogTitle>
            <DialogDescription>
              Add an external form link (internal forms are no longer
              supported).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="external-form-url">Third-Party Form URL</Label>
              <Input
                id="external-form-url"
                placeholder="https://example.com/form"
                value={externalFormUrl}
                onChange={(e) => setExternalFormUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="external-form-name">Form Name (Optional)</Label>
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
                  Update Form
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
