'use client';
import React, { useState } from 'react';
import { X, ChevronUp, ChevronDown, Lock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CardActions from './CardStuff/CardActions';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { FEATURES } from '@/constants/features';

export default function BottomDrawer({
  isOpen,
  onClose,
  card,
  isEditing,
  toggleEdit,
  themeData,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { canAccessFeature } = useSubscription();

  // Skip rendering if not open or card is undefined
  if (!isOpen || !card) {
    return null;
  }

  // Feature-based access control
  const hasAccess = canAccessFeature(FEATURES.CUSTOM_THEMES);

  // Theme variables (consistent with SidePanel)
  const textColorClass = themeData?.textMode === 'light' ? 'text-white' : 'text-black';
  const bgColor = themeData?.cardBackground || 'white';
  const borderColor = themeData?.cardBackground ? `${themeData?.cardBackground}80` : '#e5e7eb';

  const drawerVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { 
      y: isExpanded ? '0%' : '70%', 
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { 
      y: '100%', 
      opacity: 0,
      transition: { duration: 0.2 }
    },
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col w-full rounded-t-2xl shadow-2xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            style={{
              backgroundColor: bgColor,
              backdropFilter: 'blur(20px)',
              borderTop: `1px solid ${borderColor}`,
              boxShadow: themeData?.textMode === 'light' 
                ? '0 -10px 40px rgba(0,0,0,0.5), 0 -4px 20px rgba(0,0,0,0.3)'
                : '0 -10px 40px rgba(0,0,0,0.1), 0 -4px 20px rgba(0,0,0,0.05)',
              maxHeight: '80vh',
            }}
          >
            {/* Handle Bar */}
            <div 
              className="flex w-full cursor-pointer flex-col items-center py-3"
              onClick={handleToggleExpand}
            >
              <div className={cn(
                'h-1 w-12 rounded-full transition-all',
                themeData?.textMode === 'light' ? 'bg-white/30' : 'bg-gray-400'
              )} />
            </div>

            {/* Header */}
            <div className={cn(
              'flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl',
              textColorClass
            )}
            style={{
              borderBottomColor: borderColor
            }}>
              {/* Left Section - Edit Heading */}
              <div className="flex items-center gap-4">
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleExpand}
                  className={cn(
                    textColorClass,
                    'rounded-full bg-white/10 transition-all'
                  )}
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronUp className="h-5 w-5" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className={cn(
                    textColorClass,
                    'rounded-full transition-all bg-red-500/20 text-red-500'
                  )}
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            <motion.div
              className="flex-1 overflow-hidden"
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {isExpanded && (
                <ScrollArea className="relative max-h-[60vh]">
                  {/* Pattern Overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, ${themeData?.textMode === 'light' ? 'white' : 'black'} 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative p-6">
                    {/* Premium Info Banner */}
                    {!hasAccess && (
                      <div className={cn(
                        'mb-4 rounded-xl p-4',
                        'bg-gradient-to-r from-amber-500/10 to-orange-500/10',
                        'border border-amber-500/30',
                        'backdrop-blur-sm'
                      )}>
                        <div className="flex items-start gap-3">
                          <Info className="mt-0.5 h-5 w-5 text-amber-500" />
                          <div className="flex-1">
                            <p className={cn('mb-1 text-sm font-semibold', textColorClass)}>
                              Premium Features Required
                            </p>
                            <p className={cn('text-xs opacity-70', textColorClass)}>
                              Upgrade to unlock all customization options.
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

                    {/* Card Actions */}
                    <div className={cn(
                      'rounded-xl p-1',
                      themeData?.textMode === 'light' ? 'bg-gray-800/30' : 'bg-gray-50/50',
                      'backdrop-blur-sm',
                      textColorClass
                    )}>
                      <CardActions
                        cardId={card?.i}
                        isEditing={true}
                        toggleEdit={toggleEdit}
                        isMobile={true}
                        themeData={themeData}
                        inSidePanel={true}
                      />
                    </div>

                    {/* Pro Tip */}
                    <div className={cn(
                      'mt-6 rounded-xl p-4',
                      themeData?.textMode === 'light' ? 'bg-blue-500/5' : 'bg-blue-50/50',
                      'border border-blue-500/20',
                      'backdrop-blur-sm',
                      textColorClass
                    )}>
                      <div className="mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        <span className={cn('text-sm font-semibold', textColorClass)}>
                          Pro Tip
                        </span>
                      </div>
                      <p className={cn('text-xs opacity-70', textColorClass)}>
                        {card?.type === 'text' && 'Use gradients to make your text sections stand out.'}
                        {card?.type === 'image' && 'Try different fit options to perfect your image display.'}
                        {card?.type === 'counterCard' && 'Adjust animation timing for smooth counting effects.'}
                        {!['text', 'image', 'counterCard'].includes(card?.type) && 'Customize this component to match your brand.'}
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
