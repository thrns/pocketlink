'use client';

import React, { useState } from 'react';
import { EyeOff, Smartphone, Monitor, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const HideOptionsMenu = ({ 
  itemId, 
  currentHideOnMobile = false, 
  currentHideOnDesktop = false, 
  onHideSettingsChange ,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideOnMobile, setHideOnMobile] = useState(currentHideOnMobile);
  const [hideOnDesktop, setHideOnDesktop] = useState(currentHideOnDesktop);

  const handleSave = () => {
    onHideSettingsChange(itemId, {
      hideOnMobile,
      hideOnDesktop
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setHideOnMobile(currentHideOnMobile);
    setHideOnDesktop(currentHideOnDesktop);
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Button
          size="sm"
          variant="secondary"
          className= {`${className}  rounded-full bg-gray-800 text-white`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(true);
          }}
          title="Hide Options"
        >
          Hide
        </Button>
      </div>

      <Dialog 
        open={isOpen} 
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            handleReset(); // Reset changes if dialog is closed without saving
          }
        }}
      >
        <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <EyeOff className="h-5 w-5" />
              Visibility Settings
            </DialogTitle>
            <DialogDescription>
              Choose where this card should be visible
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Mobile Hide Option */}
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Smartphone className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="hide-mobile" className="text-sm font-medium">
                    Hide on Mobile
                  </Label>
                  <p className="text-xs text-gray-500">
                    Card won't appear on mobile devices
                  </p>
                </div>
              </div>
              <Switch
                id="hide-mobile"
                checked={hideOnMobile}
                onCheckedChange={setHideOnMobile}
              />
            </div>

            {/* Desktop Hide Option */}
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-green-100 p-2">
                  <Monitor className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="hide-desktop" className="text-sm font-medium">
                    Hide on Desktop
                  </Label>
                  <p className="text-xs text-gray-500">
                    Card won't appear on desktop/laptop
                  </p>
                </div>
              </div>
              <Switch
                id="hide-desktop"
                checked={hideOnDesktop}
                onCheckedChange={setHideOnDesktop}
              />
            </div>

            {/* Warning if both are hidden */}
            {hideOnMobile && hideOnDesktop && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-amber-600" />
                  <p className="text-sm text-amber-700">
                    Warning: This card will be hidden on all devices
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HideOptionsMenu;