import React from 'react';
import { TypewriterEffect } from './TypewriterEffect';
import { MessageContent } from './MessageContent';
import { ChartComponent } from './ChartComponent';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({
  message,
  theme = 'light',
  isTyping = false,
  isLatest = false,
}) => {
  const isUser = message?.sender === 'user';

  // Determine message background color based on sender and theme
  const getBgColorClass = () => {
    if (isUser) {
      return 'bg-blue-500 text-white';
    } else if (theme === 'dark') {
      return 'bg-gray-800 text-white';
    } else {
      return 'bg-gray-100 text-gray-900';
    }
  };

  const renderMessageContent = (text) => {
    // Find chart data with regex
    const chartRegex = /{{CHART:(.*?)}}/g;
    const parts = text.split(chartRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is chart data
        try {
          const chartData = JSON.parse(part);
          return <ChartComponent key={index} {...chartData} />;
        } catch (e) {
          console.error('Error parsing chart data:', e);
          return null;
        }
      }
      // Regular text
      return <ReactMarkdown key={index}>{part}</ReactMarkdown>;
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg p-3 ${getBgColorClass()}`}>
        {isTyping ? (
          <TypewriterEffect isLatest={true} />
        ) : (
          renderMessageContent(message?.text || '')
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
