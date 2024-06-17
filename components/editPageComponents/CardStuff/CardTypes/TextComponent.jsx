'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useItems } from '@/app/contexts/ItemsContext';
import { useFetch } from '@/app/contexts/FetcherContext';

export default function TextComponent({
  itemId,
  card,
  themeData,
  isEditing,
  isMobile = false,
  isTenant = false,
}) {
  const { updateItemContent } = useItems();
  const [text, setText] = useState(card?.content || 'Sample text content...');
  const textRef = useRef(null);
  const containerRef = useRef(null);

  // Text styling properties
  const textAlign = card?.textAlign || 'left';
  const textSize = card?.textSize || 'md';
  const fontWeight = card?.fontWeight || 'normal';
  const verticalAlign = card?.verticalAlign || 'center';
  const fontStyle = card?.fontStyle || 'normal';
  const textDecoration = card?.textDecoration || 'none';
  const fontFamily = card?.fontFamily || 'var(--font-onest), sans-serif';

  const textColor = card?.background
    ? card?.cardThemeBright
      ? 'white'
      : 'black'
    : themeData?.textMode === 'dark'
      ? 'black'
      : 'white';
  const bgColor = card?.background
    ? card.background
    : themeData?.cardBackground;
  const borderColor = themeData?.border;

  // Calculate font size based on textSize
  const getFontSize = () => {
    switch (textSize) {
      case 'xs':
        return '0.75rem';
      case 'sm':
        return '0.875rem';
      case 'md':
        return '1rem';
      case 'lg':
        return '1.125rem';
      case 'xl':
        return '1.25rem';
      case '2xl':
        return '1.5rem';
      default:
        return '1rem';
    }
  };

  // Auto-save changes while typing
  const handleChange = (value) => {
    setText(value);
    updateItemContent(itemId, { ...card, content: value });
  };

  // Handle hide settings changes
  const handleHideSettingsChange = (itemId, hideSettings) => {
    updateItemContent(itemId, hideSettings);
  };

  // Get horizontal alignment styles
  const getHorizontalAlignmentStyles = () => {
    let justifyContent = 'flex-start';

    if (textAlign === 'center') {
      justifyContent = 'center';
    } else if (textAlign === 'right') {
      justifyContent = 'flex-end';
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

  // Combined alignment styles
  const alignmentStyles = {
    alignItems: getVerticalAlignmentStyles(),
    justifyContent: getHorizontalAlignmentStyles().justifyContent,
    textAlign,
  };

  return (
    <div
      ref={containerRef}
      className={`flex h-full w-full rounded-2xl transition-all duration-200 ease-in-out`}
      style={{
        background: bgColor,
        ...alignmentStyles,
      }}
    >
      {isEditing ? (
        <>
          <Textarea
            value={text}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter text content..."
            className="md:text-md h-full w-full cursor-pointer resize-none overflow-auto rounded-2xl border border-none bg-transparent p-2 text-[14px] shadow-none focus:cursor-text focus:border-none focus:ring-0"
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              color: textColor,
              display: 'flex',
              alignItems: getVerticalAlignmentStyles(),
              justifyContent: getHorizontalAlignmentStyles().justifyContent,
              textAlign,
              fontSize: getFontSize(),
              fontWeight: fontWeight,
              fontStyle: fontStyle,
              textDecoration: textDecoration,
              fontFamily: fontFamily,
            }}
            ref={textRef}
          />

       
        </>
      ) : (
        <div
          ref={textRef}
          className={`h-full w-full whitespace-pre-wrap break-words rounded-2xl p-4 text-[14px]`}
          style={{
            color: textColor,
            lineHeight: '1.5',
            overflowY: 'auto', // Ensure scrolling works
            overflowX: 'hidden', // Prevent horizontal scroll
            display: 'flex',
            alignItems: getVerticalAlignmentStyles(),
            justifyContent: getHorizontalAlignmentStyles().justifyContent,
            maxHeight: '100%', // Prevent content from overflowing in tenant mode
            wordBreak: 'break-word', // Ensure text wraps correctly
            textAlign,
            fontSize: getFontSize(),
            fontWeight: fontWeight,
            fontStyle: fontStyle,
            textDecoration: textDecoration,
            fontFamily: fontFamily,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
