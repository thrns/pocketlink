'use-client';
import React, { useEffect, useState } from 'react';
import { Dock, DockIcon } from '@/components/ui/dock';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import URLDockIcon from './DockIcons/URLDockIcon';
import TextDockIcon from './DockIcons/TextDockIcon';
import ImageDockIcon from './DockIcons/ImageDockIcon';
import SectionTitleDockIcon from './DockIcons/SectionTitleDockIcon';
import { isMobile } from 'react-device-detect';
import { Monitor, Smartphone, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { Tooltip } from 'react-tooltip';
import NestedCardIcon from './DockIcons/NestedCardIcon';
import { useAuth } from '@/app/contexts/AuthContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import { useController } from '@/app/contexts/ControllerContext';
import Dragger from '../../Dragger';
import MoreComponentsIcon from './DockIcons/MoreComponents/MoreComponentsIcon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MagicDock({ id }) {
  const { addItem } = useItems();
  const { viewMode, setViewMode } = useController();
  const { user, isPremium } = useAuth();

  useEffect(() => {
    if (isMobile) {
      setViewMode('mobile');
    }
  }, [isMobile]);

  const handleAdd = async (type, sizeKey, content) => {
    const parentId = id?.[0] || null;

    if (parentId) {
      console.log('Adding to nestedCard, parentId =>', parentId);
      addItem(parentId, type, sizeKey, content);
      return;
    }
    addItem(null, type, sizeKey, content);
    return;
  };

  const handleViewSwitch = (view) => {
    if (isMobile) {
      setViewMode('mobile');
    } else {
      setViewMode(view);
    }
  };

  const PremiumTag = () => (
    <div className="absolute -right-1 -top-1">
      <Crown className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    </div>
  );

  // Don't render dock on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
      <Dock
        iconMagnification={50}
        iconDistance={300}
        className={cn(
          'tour-magicdock',
          'bg-white',
          'text-black dark:bg-black dark:text-white',
          'flex min-h-max flex-row items-center gap-2 p-2',
          'rounded-lg',
          'border border-gray-300 dark:border-gray-800',
          'border-bento-violet dark:border-bento-violet'
        )}
      >
        <Button
          data-tooltip-id="more-components"
          data-tooltip-content="More Components"
          className="tour-more-components flex min-w-max cursor-pointer flex-col items-center justify-center rounded-lg bg-bento-violet text-white dark:bg-bento-violet"
        >
          <MoreComponentsIcon handleAdd={handleAdd} />
          <Tooltip id="more-components" place="top" effect="solid" />
        </Button>

        <div className="mx-2 h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* URL Widget */}
        <DockIcon
          data-tooltip-id="add-a-url"
          data-tooltip-content="Add URL"
          className="tour-url flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/10 dark:bg-white/10"
        >
          <URLDockIcon handleAdd={handleAdd} />
          <Tooltip id="add-a-url" place="top" effect="solid" />
        </DockIcon>

        {/* Image/Video Widget */}
        <DockIcon
          data-tooltip-id="add-a-img/vid"
          data-tooltip-content="Add an Image / Video"
          className="tour-image flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/10 dark:bg-white/10"
        >
          <ImageDockIcon handleAdd={handleAdd} />
          <Tooltip id="add-a-img/vid" place="top" effect="solid" />
        </DockIcon>

        {/* Text Widget */}
        <DockIcon
          data-tooltip-id="add-a-text"
          data-tooltip-content="Add Text"
          className="tour-text flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/10 dark:bg-white/10"
        >
          <TextDockIcon handleAdd={handleAdd} />
          <Tooltip id="add-a-text" place="top" effect="solid" />
        </DockIcon>

        {/* Section Title Widget */}
        <DockIcon
          data-tooltip-id="add-a-section-title"
          data-tooltip-content="Add Section Title"
          className="tour-section-title flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/10 dark:bg-white/10"
        >
          <SectionTitleDockIcon handleAdd={handleAdd} />
          <Tooltip id="add-a-section-title" place="top" effect="solid" />
        </DockIcon>

        <DockIcon
          data-tooltip-id="nested-card"
          data-tooltip-content="Add a Nestable Card"
          className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg bg-black/10 dark:bg-white/10"
        >
          <NestedCardIcon handleAdd={handleAdd} />
          <Tooltip id="nested-card" place="top" effect="solid" />
        </DockIcon>
      </Dock>
    </div>
  );
}
