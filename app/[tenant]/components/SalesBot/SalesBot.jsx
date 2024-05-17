'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Bot,
  User,
  Trash2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSalesBotChat } from '@/app/contexts/SalesBotChatContext';

// Enhanced three-dot loading animation
const ThreeDotsAnimation = () => (
  <div className="flex items-center space-x-1 py-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="h-2 w-2 rounded-full bg-gray-500 text-gray-200"
        animate={{
          scale: [0.6, 1, 0.6],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          delay: i * 0.2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

export default function SalesBot() {
  const {
    chatHistory = [],
    isChatOpen = false,
    isLoading = false,
    botAvatar = null,
    isBotAvailable = false,
    salesBotData = {},
    sendMessage = () => {},
    toggleChat = () => {},
    clearChat = () => {},
  } = useSalesBotChat() || {};

  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const isBotActive = salesBotData?.is_active === true;
  const botRole = salesBotData?.role || 'Sales Assistant';
  const formattedRole =
    typeof botRole === 'string'
      ? botRole.charAt(0).toUpperCase() + botRole.slice(1)
      : 'Sales Assistant';

  useEffect(() => {
    setIsComponentMounted(true);
    return () => setIsComponentMounted(false);
  }, []);

  // Handle click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isChatOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target) &&
        !event.target.closest('[data-chat-button]')
      ) {
        toggleChat();
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isChatOpen, toggleChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current && chatHistory.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && !isMinimized && inputRef.current) {
      const focusTimeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(focusTimeout);
    }
  }, [isChatOpen, isMinimized]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput?.trim() || isLoading || typeof sendMessage !== 'function') {
      return;
    }

    try {
      sendMessage(userInput);
      setUserInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const formatTime = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return '';
    }
  };

  if (!isBotAvailable || !isBotActive || !isComponentMounted) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
      >
        <Button
          onClick={toggleChat}
          data-chat-button="true"
          size="lg"
          className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${isChatOpen ? 'bg-red-500 hover:bg-red-500/90' : 'bg-bento-violet hover:bg-bento-violet/90'} `}
        >
          <motion.div
            initial={false}
            animate={{
              rotate: isChatOpen ? 180 : 0,
              scale: isChatOpen ? 0.9 : 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {isChatOpen ? (
              <div className="rounded-full">
                <X size={24} />
              </div>
            ) : botAvatar ? (
              <div className="rounded-full border border-bento-purple bg-white p-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={botAvatar} alt={formattedRole} />
                  <AvatarFallback>
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <MessageCircle size={24} />
            )}
          </motion.div>
        </Button>

        {/* Notification Badge */}
        {!isChatOpen && chatHistory.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-2 -top-2"
          >
            <Badge
              variant="destructive"
              className="flex h-6 w-6 items-center justify-center rounded-full p-0 text-xs"
            >
              {chatHistory.length > 99 ? '99+' : chatHistory.length}
            </Badge>
          </motion.div>
        )}
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isChatOpen && (
          <motion.div
            ref={chatContainerRef}
            className="fixed bottom-24 right-6 z-40 w-[380px] max-w-[calc(100vw-2rem)]"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
              transformOrigin: 'bottom right',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            <Card className="border-border/50 dark:bg-background/90 overflow-hidden border bg-white/95 shadow-2xl backdrop-blur-md">
              {/* Header */}
              <CardHeader className="border-border/50 border-b bg-white/80 pb-3 backdrop-blur-md">
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <Avatar className="border-primary/20 h-10 w-10 border-2 shadow-sm">
                        <AvatarImage src={botAvatar} alt={formattedRole} />
                        <AvatarFallback className="bg-primary/10 border-primary/20 border text-bento-violet">
                          <Bot size={20} />
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-foreground truncate text-sm font-semibold">
                        {formattedRole}
                      </h3>
                      <p className="flex items-center text-xs text-gray-500">
                        <motion.div
                          className="mr-2 h-2 w-2 rounded-full bg-green-500 shadow-sm"
                          animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(34, 197, 94, 0.7)',
                              '0 0 0 4px rgba(34, 197, 94, 0)',
                              '0 0 0 0 rgba(34, 197, 94, 0)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        Online • Ready to help
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {chatHistory.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearChat}
                        className="hover:text-foreground h-8 w-8 p-0 text-gray-500 hover:text-gray-200/80"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={16} />
                        </motion.div>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleChat}
                      className="hover:text-foreground h-8 w-8 p-0 text-gray-500 hover:text-gray-200/80"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <X size={16} />
                      </motion.div>
                    </Button>
                  </div>
                </motion.div>
              </CardHeader>

              {/* Chat Area */}
              <AnimatePresence mode="wait">
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <CardContent className="bg-bg-white/50 p-0 backdrop-blur-sm">
                      <ScrollArea className="h-80 px-4 py-2">
                        {!Array.isArray(chatHistory) ||
                        chatHistory.length === 0 ? (
                          <motion.div
                            className="flex h-full flex-col items-center justify-center py-8 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <motion.div
                              animate={{
                                y: [0, -8, 0],
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="mb-4"
                            >
                              <Bot className="h-12 w-12 text-gray-500/60" />
                            </motion.div>
                            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                              Hi there! 👋 I'm your {botRole.toLowerCase()}. Ask
                              me anything about our products or services.
                            </p>
                          </motion.div>
                        ) : (
                          <div className="space-y-4 py-2">
                            {chatHistory.map((message, index) => {
                              if (!message || typeof message !== 'object')
                                return null;

                              const { id, sender, text, isError, timestamp } =
                                message;
                              if (!id || !sender || !text) return null;

                              const isUser = sender === 'User';

                              return (
                                <motion.div
                                  key={id || index}
                                  initial={{
                                    opacity: 0,
                                    y: 20,
                                    x: isUser ? 20 : -20,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    x: 0,
                                  }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 25,
                                    delay: Math.min(index * 0.05, 0.5),
                                  }}
                                  className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                                >
                                  <motion.div
                                    className={`max-w-[85%] flex-1 rounded-lg px-3 py-2 text-sm shadow-sm ${
                                      isUser
                                        ? 'ml-auto bg-bento-violet text-white'
                                        : isError
                                          ? 'border-destructive/20 shadow-destructive/10 border bg-red-500/10 text-red-500'
                                          : 'border border-gray-200 text-black/80 shadow-black/5 backdrop-blur-sm'
                                    } `}
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    transition={{
                                      type: 'spring',
                                      stiffness: 400,
                                      damping: 25,
                                    }}
                                  >
                                    <div className="prose prose-sm max-w-none [&>ol]:mb-1 [&>p:last-child]:mb-0 [&>p]:mb-1 [&>ul]:mb-1">
                                      <ReactMarkdown
                                        rehypePlugins={[rehypeRaw]}
                                      >
                                        {typeof text === 'string'
                                          ? text
                                          : String(text)}
                                      </ReactMarkdown>
                                    </div>
                                    <div
                                      className={`mt-1 text-xs ${isUser ? 'text-white/70' : 'text-gray-500'}`}
                                    >
                                      {formatTime(timestamp)}
                                    </div>
                                  </motion.div>
                                </motion.div>
                              );
                            })}

                            {isLoading && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-start space-x-2"
                              >
                                <Avatar className="border-border/30 h-7 w-7 border">
                                  <AvatarImage src={botAvatar} />
                                  <AvatarFallback className="border-border/30 border text-xs text-gray-200/80">
                                    <Bot size={14} />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg border border-gray-200 px-3 py-2 text-gray-200/80 shadow-sm backdrop-blur-sm">
                                  <ThreeDotsAnimation />
                                </div>
                              </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                          </div>
                        )}
                      </ScrollArea>

                      <Separator className="bg-border/50" />

                      {/* Input Area */}
                      <div className="bg-white/80 p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <Input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value || '')}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                              }
                            }}
                            placeholder="Type your message..."
                            className="border-border/50 focus:border-primary/50 focus:ring-primary/20 flex-1 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:ring-2"
                            disabled={isLoading}
                            maxLength={1000}
                          />
                          <Button
                            onClick={handleSendMessage}
                            size="sm"
                            disabled={isLoading || !userInput.trim()}
                            className="px-3 shadow-sm transition-all duration-200"
                          >
                            <motion.div
                              whileHover={
                                !isLoading && userInput.trim()
                                  ? { scale: 1.1, rotate: -10 }
                                  : {}
                              }
                              whileTap={
                                !isLoading && userInput.trim()
                                  ? { scale: 0.9 }
                                  : {}
                              }
                            >
                              <Send size={16} />
                            </motion.div>
                          </Button>
                        </div>

                        {userInput && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-xs text-gray-500"
                          >
                            {userInput.length}/1000 characters
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
