'use client';
import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useItems } from '@/app/contexts/ItemsContext';
import { useFetch } from '@/app/contexts/FetcherContext';

export default function SectionHeading({
  itemId,
  card,
  isEditing,
  isMobile = false,
  isTenant = false,
  themeData,
}) {
  const [heading, setHeading] = useState(card?.title || 'Section Heading');
  const { theme } = useFetch();
  const { updateItemContent } = useItems();

  // Text styling properties
  const textAlign = card?.textAlign || 'left';
  const textSize = card?.textSize || 'xl';
  const fontWeight = card?.fontWeight || 'bold';
  const verticalAlign = card?.verticalAlign || 'center';
  const fontStyle = card?.fontStyle || 'normal';
  const textDecoration = card?.textDecoration || 'none';
  const fontFamily = card?.fontFamily || 'var(--font-onest), sans-serif';

  const textColor = themeData?.textMode === 'dark' ? 'black' : 'white';
  const bgColor = themeData?.cardBackground;
  const borderColor = themeData?.border;

  // Calculate font size based on textSize
  const getFontSize = () => {
    switch (textSize) {
      case 'md':
        return '1.125rem';
      case 'lg':
        return '1.25rem';
      case 'xl':
        return '1.5rem';
      case '2xl':
        return '1.75rem';
      case '3xl':
        return '2rem';
      case '4xl':
        return '2.25rem';
      default:
        return '1.5rem';
    }
  };

  // Get horizontal alignment styles
  const getHorizontalAlignmentStyles = () => {
    let justifyContent = 'flex-start';

    if (textAlign === 'center') {
      justifyContent = 'center';
    } else if (textAlign === 'right') {
      justifyContent = 'flex-end';
    } else if (textAlign === 'justify') {
      justifyContent = 'space-between';
    }

    return {
      textAlign,
      justifyContent,
    };
  };

  // Get vertical alignment styles
  const getVerticalAlignmentStyles = () => {
    if (verticalAlign === 'top') {
      return 'flex-start';
    } else if (verticalAlign === 'bottom') {
      return 'flex-end';
    }
    return 'center';
  };

  // Auto-save changes while typing
  const handleChange = (value) => {
    setHeading(value);
    updateItemContent(itemId, { ...card, title: value });
  };

  // Handle hide settings changes
  const handleHideSettingsChange = (itemId, hideSettings) => {
    updateItemContent(itemId, hideSettings);
  };

  return (
    <div
      className={`relative flex h-full w-full rounded-2xl transition-all duration-200 ease-in-out`}
      style={{
        alignItems: getVerticalAlignmentStyles(),
        justifyContent: getHorizontalAlignmentStyles().justifyContent,
        color: textColor,
      }}
    >
      {isEditing ? (
        <>
          <Input
            value={heading}
            maxLength={50}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              isMobile && e.target.select();
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter section heading..."
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              lineHeight: '1.5',
              textAlign: textAlign,
              fontSize: getFontSize(),
              fontWeight: fontWeight,
              fontStyle: fontStyle,
              textDecoration: textDecoration,
              fontFamily: fontFamily,
              color: textColor,
            }}
            className="md:text-md h-full w-full cursor-pointer resize-none overflow-auto rounded-2xl border border-none bg-transparent p-2 text-[16px] shadow-none focus:cursor-text focus:border-none focus:ring-0"
          />
          
         
        </>
      ) : (
        <h2
          className={[
            'flex h-full w-full overflow-hidden break-words font-bold transition-all',
            isMobile ? 'text-[16px]' : 'text-[18px]',
            !isTenant && `rounded-2xl p-2`,
          ].join(' ')}
          style={{
            padding: isMobile ? '0.25rem 0.5rem' : '0.5rem 1rem',
            lineHeight: '1.5',
            whiteSpace: 'normal', // Allows text wrapping
            overflowWrap: 'break-word',
            textAlign: textAlign,
            fontSize: getFontSize(),
            fontWeight: fontWeight,
            alignItems: getVerticalAlignmentStyles(),
            justifyContent: getHorizontalAlignmentStyles().justifyContent,
            fontStyle: fontStyle,
            textDecoration: textDecoration,
            fontFamily: fontFamily,
            color: textColor,
          }}
        >
          {heading}
        </h2>
      )}
    </div>
  );
}
