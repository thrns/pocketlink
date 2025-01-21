import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowDown } from 'lucide-react';
import ChatMessage from './ChatMessage';
import PremiumGate from '@/components/PremiumGate';

const ChatContainer = ({
  messages = [],
  theme = 'light',
  chatContainerRef,
  messagesEndRef,
  showScrollButton,
  onScrollToBottom,
  isThinking = false,
}) => {
  const containerRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  // Stable scroll element getter
  const getScrollElement = useCallback(() => containerRef.current, []);

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement,
    estimateSize: useCallback(() => 120, []),
    overscan: 5,
    getItemKey: (index) => messages[index]?.id || `msg-${index}`,
  });

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 20;
    setIsScrolledUp(!isAtBottom);

    if (typeof onScrollToBottom === 'function') {
      onScrollToBottom(!isAtBottom);
    }
  }, [onScrollToBottom]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    console.log('📦 ChatContainer re-rendered');
  });

  return (
    <PremiumGate
      featureName="Premium Feature"
      description="Your AI Chatbot is ready to help you with your daily tasks, automation and customer support."
    >
      <div
        className={`relative w-full flex-1 space-y-4 overflow-y-auto p-3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
        ref={(el) => {
          containerRef.current = el;
          if (chatContainerRef) chatContainerRef.current = el;
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const msg = messages[virtualRow.index];
            const key = msg?.id || `chat-${virtualRow.index}`;

            if (process.env.NODE_ENV === 'development') {
            }

            return (
              <div
                key={msg.id || virtualRow.index}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="mb-3">
                  {' '}
                  {/* 👈 This adds the gap */}
                  <ChatMessage
                    message={msg}
                    index={virtualRow.index}
                    theme={theme}
                    isLatest={
                      virtualRow.index === messages.length - 1 &&
                      msg.sender === 'puddles' &&
                      !msg.isRead
                    }
                    isThinking={
                      isThinking &&
                      virtualRow.index === messages.length - 1 &&
                      msg.sender === 'puddles'
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div ref={messagesEndRef} />

        {isScrolledUp && (
          <div className="fixed bottom-24 right-8 z-10">
            <div className="absolute inset-0 animate-ping rounded-full bg-violet-400 opacity-30"></div>
            <button
              className="relative rounded-full bg-violet-500 bg-violet-600 p-2 text-white transition-opacity duration-300"
              onClick={() =>
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
              aria-label="Scroll to bottom"
            >
              <ArrowDown size={20} />
            </button>
          </div>
        )}
      </div>
    </PremiumGate>
  );
};

export default ChatContainer;
