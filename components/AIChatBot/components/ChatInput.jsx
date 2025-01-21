import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Mic, ImagePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Chat input component with send button and animations
 * - Supports multi-line input that expands up to 4 lines
 * - Allows scrolling when content exceeds 4 lines
 */
const ChatInput = ({
  input,
  setInput,
  onSendMessage,
  placeholder = 'Ask Pocket something...',
  disabled = false,
  isLoading = false,
  theme = 'light',
  scrollToBottom = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [isScrollable, setIsScrollable] = useState(false);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto measurement
      textareaRef.current.style.height = 'auto';

      // Calculate the number of lines
      const lineHeight = 24; // Approximate line height in pixels
      const maxHeight = lineHeight * 4; // Max 4 lines
      const scrollHeight = textareaRef.current.scrollHeight;

      // Check if content exceeds max height (needs scrolling)
      setIsScrollable(scrollHeight > maxHeight);

      // Set the height based on content, but cap at maxHeight
      const newHeight = Math.min(scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      setTextareaHeight(`${newHeight}px`);
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
    scrollToBottom();
  };

  // Determine if we should adjust the container radius based on content length
  const isMultiLine =
    textareaRef.current && textareaRef.current.scrollHeight > 48;

  // Define custom scrollbar styles based on theme
  const scrollbarStyles = `
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: ${theme === 'dark' ? '#1F2937' : '#F9FAFB'};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${theme === 'dark' ? '#4B5563' : '#D1D5DB'};
      border-radius: 20px;
    }
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 border-t p-4 ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <motion.div
        className={`flex w-full items-start gap-2 px-4 py-2 ${
          isMultiLine ? 'rounded-2xl' : 'rounded-2xl'
        } border ${
          theme === 'dark'
            ? `bg-gray-800 ${isFocused ? 'border-violet-500' : 'border-gray-700'}`
            : `bg-white ${isFocused ? 'border-violet-400' : 'border-gray-200'}`
        } transition-all duration-200`}
        whileHover={{ scale: 1.005 }}
        animate={{
          boxShadow: isFocused ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
          borderRadius: isMultiLine ? '1rem' : '9999px',
        }}
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          rows={1}
          className={`mt-1 flex-1 border-none px-0 py-2 shadow-none focus-visible:ring-0 ${isScrollable ? 'overflow-y-auto' : 'overflow-hidden'} resize-none ${theme === 'dark' ? 'bg-gray-800 text-white placeholder:text-gray-400' : 'bg-white text-gray-900 placeholder:text-gray-500'} `}
          style={{
            outline: 'none',
            boxShadow: 'none',
            minHeight: '24px',
            maxHeight: '96px', // 4 lines at 24px line height
            scrollbarWidth: 'thin',
            scrollbarColor:
              theme === 'dark' ? '#4B5563 #1F2937' : '#D1D5DB #F9FAFB',
          }}
        />

        <div className="mt-1 flex flex-shrink-0 items-center gap-1">
          {/* Image upload button - could be functional in the future */}
          <motion.button
            disabled={true || isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full p-2 ${
              theme === 'dark'
                ? 'text-gray-200 text-gray-400'
                : 'text-gray-500 text-gray-700'
            }`}
            aria-label="Upload image"
          >
            <ImagePlus size={18} />
          </motion.button>

          <AnimatePresence>
            {input.trim() && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  disabled={!input.trim() || disabled || isLoading}
                  className={`${
                    theme === 'dark' ? 'bg-violet-600' : 'bg-violet-500'
                  } rounded-lg px-4 py-2 text-white opacity-90 transition-opacity`}
                >
                  <SendHorizontal className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Add global style for scrollbar */}
      <style jsx global>{`
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        textarea::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#1F2937' : '#F9FAFB'};
        }
        textarea::-webkit-scrollbar-thumb {
          background-color: ${theme === 'dark' ? '#4B5563' : '#D1D5DB'};
          border-radius: 20px;
        }
      `}</style>
    </form>
  );
};

export default ChatInput;
