'use client';
import React, { useEffect, useState } from 'react';
import {
  X,
  Settings,
  Palette,
  Type,
  Layout,
  Sparkles,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Save,
  RotateCcw,
  Info,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CardActions from './CardStuff/CardActions';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { FEATURES } from '@/constants/features';

export default function SidePanel({
  isOpen,
  onClose,
  card,
  isEditing,
  toggleEdit,
  isMobile,
  themeData,
  sidePanelOpen,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { canAccessFeature } = useSubscription();

  // Skip rendering if not open
  if (!sidePanelOpen || !card) {
    return null;
  }

  // Feature-based access control for customization features
  const hasAccess = canAccessFeature(FEATURES.CUSTOM_THEMES);

  // Theme variables
  const textColorClass =
    themeData?.textMode === 'light' ? 'text-white' : 'text-black';
  const bgColor = themeData?.cardBackground || 'white';

  const panelStyle = {
    backgroundColor: bgColor,
    backdropFilter: 'blur(12px)',
    boxShadow:
      themeData?.textMode === 'light'
        ? '0 0 40px rgba(0,0,0,0.5), -4px 0 20px rgba(0,0,0,0.3)'
        : '0 0 40px rgba(0,0,0,0.1), -4px 0 20px rgba(0,0,0,0.05)',
    borderLeft: themeData?.cardBackground
      ? `1px solid ${themeData?.cardBackground}80`
      : '1px solid #e5e7eb',
  };


  // Get component capabilities
  const getComponentCapabilities = (type) => {
    const capabilities = {
      text: ['Background', 'Typography', 'Alignment', 'Styling'],
      'section title': ['Typography', 'Alignment', 'Styling'],
      image: ['Display', 'Positioning', 'Effects'],
      video: ['Display', 'Positioning', 'Controls'],
      bannerCard: ['Display', 'Positioning', 'Effects'],
      counterCard: ['Animation', 'Styling', 'Values'],
      // Add more as needed
    };
    return capabilities[type] || ['General Settings'];
  };

  const capabilities = getComponentCapabilities(card?.type);

  return (
    <>
      {/* Side Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full flex-col transition-all duration-500 ease-out w-1/4',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={panelStyle}
      >
        {/* We've removed the animated gradient border as it's now handled by the borderLeft in panelStyle */}

        {/* Panel Header with Glass Effect */}
        <div
          className={cn(
            'relative flex items-center justify-between px-6 py-5',
            'border-b backdrop-blur-xl',
            textColorClass
          )}
          style={{
            borderBottomColor: themeData?.cardBackground
              ? `${themeData?.cardBackground}80`
              : '#e5e7eb',
          }}
        >
          {/* Left Section - Edit Heading */}
          <div className="flex items-center gap-4">
            {/* Back Button on Mobile - Removed */}
            {/* Mobile back button removed - no closing options */}

            {/* Edit Heading */}
            <h2 className={cn('text-xl font-semibold', textColorClass)}>
              Edit
            </h2>

            {/* Premium Badge */}
            {!hasAccess && (
              <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1">
                <Lock className="h-3 w-3 text-white" />
                <span className="text-xs font-semibold text-white">
                  Premium
                </span>
              </div>
            )}
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Action buttons removed - no closing options */}
          </div>
        </div>

        {/* Main Content Area with Pattern Background */}
        <ScrollArea className="relative flex-1">
          {/* Subtle Pattern Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${themeData?.textMode === 'light' ? 'white' : 'black'} 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Content Container */}
          <div className="relative p-6">
            {/* Info Banner for Non-Premium Users */}
            {!hasAccess && (
              <div
                className={cn(
                  'mb-4 rounded-xl p-4',
                  'bg-gradient-to-r from-amber-500/10 to-orange-500/10',
                  'border border-amber-500/30',
                  'backdrop-blur-sm'
                )}
              >
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <p
                      className={cn(
                        'mb-1 text-sm font-semibold',
                        textColorClass
                      )}
                    >
                      Premium Features Required
                    </p>
                    <p className={cn('text-xs opacity-70', textColorClass)}>
                      Upgrade to unlock all customization options for this
                      component.
                    </p>
                    <Button
                      size="sm"
                      className="mt-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white opacity-90"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Card Actions Component */}
            <div
              className={cn(
                'rounded-xl p-1',
                themeData?.textMode === 'light'
                  ? 'bg-gray-800/30'
                  : 'bg-gray-50/50',
                'backdrop-blur-sm',
                textColorClass
              )}
            >
              <CardActions
                cardId={card?.i}
                isEditing={true}
                toggleEdit={toggleEdit}
                isMobile={isMobile}
                themeData={themeData}
                inSidePanel={true}
              />
            </div>

            {/* Quick Tips Section */}
            <div
              className={cn(
                'mt-6 rounded-xl p-4',
                themeData?.textMode === 'light'
                  ? 'bg-blue-500/5'
                  : 'bg-blue-50/50',
                'border border-blue-500/20',
                'backdrop-blur-sm',
                textColorClass
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                <span className={cn('text-sm font-semibold', textColorClass)}>
                  Pro Tip
                </span>
              </div>
              <p className={cn('text-xs opacity-70', textColorClass)}>
                {card?.type === 'text' &&
                  'Use gradients to make your text sections stand out.'}
                {card?.type === 'image' &&
                  'Try different fit options to perfect your image display.'}
                {card?.type === 'counterCard' &&
                  'Adjust animation timing for smooth counting effects.'}
                {!['text', 'image', 'counterCard'].includes(card?.type) &&
                  'Customize this component to match your brand.'}
              </p>
            </div>
          </div>
        </ScrollArea>

        {/* Footer with Actions */}
        <div
          className={cn('border-t px-6 py-4 backdrop-blur-xl', textColorClass)}
          style={{
            borderTopColor: themeData?.cardBackground
              ? `${themeData?.cardBackground}80`
              : '#e5e7eb',
          }}
        >
          <div className="flex gap-3">
            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'flex-1 gap-2',
                themeData?.textMode === 'light'
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-gray-100',
                textColorClass
              )}
              disabled={!hasUnsavedChanges}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>

            {/* Save Button - Close functionality removed */}
            <Button
              size="sm"
              className="flex-1 gap-2 bg-bento-violet text-white"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
