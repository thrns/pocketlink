import { MessageContent } from './MessageContent';
import React, { useState, useEffect } from 'react';

export const TypewriterEffect = ({ text, speed = 30, isLatest = false }) => {
  // If no text is provided, show a simple loading indicator
  if (!text) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
        <div
          className="h-2 w-2 animate-pulse rounded-full bg-gray-400"
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div
          className="h-2 w-2 animate-pulse rounded-full bg-gray-400"
          style={{ animationDelay: '0.4s' }}
        ></div>
      </div>
    );
  }

  // Skip animation for non-latest messages
  if (!isLatest) {
    return <MessageContent content={text} />;
  }

  // Use useState with a callback to avoid unnecessary re-renders
  const [displayedText, setDisplayedText] = useState('');

  // Run the effect only once for latest messages
  useEffect(() => {
    // Reset when new message arrives
    setDisplayedText('');

    // Skip animation for very long messages to improve performance
    if (text.length > 500) {
      setDisplayedText(text);
      return;
    }

    // Characters processed per iteration - increasing this improves performance
    const charsPerTick = 3;
    let position = 0;

    const interval = setInterval(() => {
      if (position < text.length) {
        // Add multiple characters per tick for better performance
        const nextChunk = text.substring(position, position + charsPerTick);
        setDisplayedText((current) => current + nextChunk);
        position += charsPerTick;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <MessageContent content={displayedText} />;
};
