import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Clock,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSalesBotChat } from '@/app/contexts/SalesBotChatContext';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Test tab component to be integrated into SalesBotPage
const TestTab = ({ user, config, isConfigValid }) => {
  const { chatHistory, isLoading, sendMessage, clearChat, setChatHistory } =
    useSalesBotChat();

  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [testMode, setTestMode] = useState('light');

  // Markdown styling
  const markdownStyles = `
    .markdown-content {
      line-height: 1.5;
    }
    .markdown-content p {
      margin-bottom: 0.75rem;
    }
    .markdown-content p:last-child {
      margin-bottom: 0;
    }
    .markdown-content ul, .markdown-content ol {
      margin-left: 1.5rem;
      margin-bottom: 0.75rem;
    }
    .markdown-content h2, .markdown-content h3, .markdown-content h4 {
      font-weight: 600;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
    .markdown-content h2 {
      font-size: 1.25rem;
    }
    .markdown-content h3 {
      font-size: 1.125rem;
    }
    .markdown-content h4 {
      font-size: 1rem;
    }
    .markdown-content code {
      background-color: rgba(0, 0, 0, 0.05);
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: monospace;
      font-size: 0.875rem;
    }
    .markdown-content pre {
      background-color: rgba(0, 0, 0, 0.05);
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin-bottom: 0.75rem;
    }
    .markdown-content blockquote {
      border-left: 3px solid #e5e7eb;
      padding-left: 1rem;
      font-style: italic;
      margin: 0.75rem 0;
    }
    .markdown-content a {
      color: #3b82f6;
      text-decoration: underline;
    }
    .dark .markdown-content code {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .dark .markdown-content pre {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .dark .markdown-content blockquote {
      border-left-color: #374151;
    }
    .dark .markdown-content a {
      color: #60a5fa;
    }
  `;

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !isConfigValid) return;

    sendMessage(userInput);
    setUserInput('');
  };

  const handleClearChat = () => {
    clearChat();
    toast.success('Chat history cleared');
  };

  const toggleTestMode = () => {
    setTestMode(testMode === 'light' ? 'dark' : 'light');
  };

  // Quick prompts for testing
  const quickPrompts = [
    'Tell me about your products',
    'What pricing options do you offer?',
    'How do I integrate your solution with my website?',
    'What makes your company different from competitors?',
  ];

  // Loading animation component
  const LoadingAnimation = () => (
    <div className="flex items-center space-x-1">
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-blue-500"
        animate={{ scale: [0.8, 1.5, 0.8] }}
        transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
      />
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-blue-500"
        animate={{ scale: [0.8, 1.5, 0.8] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-blue-500"
        animate={{ scale: [0.8, 1.5, 0.8] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
    </div>
  );

  if (!isConfigValid) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center space-y-6 p-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1, rotate: [0, 5, 0, -5, 0] }}
          transition={{
            scale: { duration: 0.3 },
            rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
          }}
          className="relative"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
            <Bot size={40} className="text-orange-500" />
          </div>
          <motion.div
            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <AlertTriangle size={18} className="text-red-500" />
          </motion.div>
        </motion.div>

        <h3 className="text-xl font-semibold">Bot Not Configured</h3>
        <p className="text-muted-foreground max-w-lg">
          You need to complete your bot configuration before you can test it.
          Please fill in all required information in the Configure tab.
        </p>

        <Button
          variant="default"
          onClick={() =>
            window.document.getElementById('configure-tab-trigger')?.click()
          }
          className="mt-4"
        >
          Complete Configuration
        </Button>
      </motion.div>
    );
  }

  return (
    <div className={`relative ${testMode === 'dark' ? 'dark' : ''}`}>
      {/* Apply markdown styles */}
      <style dangerouslySetInnerHTML={{ __html: markdownStyles }} />

      <div className="absolute right-0 top-0 flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTestMode}
          className="h-auto px-2 py-1"
        >
          {testMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearChat}
          className="h-auto px-2 py-1"
        >
          <Trash2 size={14} className="mr-1" />
          Clear Chat
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Main Chat Interface */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 lg:col-span-3">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/30">
                {config.avatarUrl ? (
                  <Image
                    src={config.avatarUrl}
                    width={40}
                    height={40}
                    alt="Bot avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Bot size={22} className="text-black dark:text-white" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium">
                  {user.username}'s{' '}
                  {config.role === 'sales person'
                    ? 'Sales Assistant'
                    : 'Spokesperson'}
                </h3>
                <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                  <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
                  Active
                </div>
              </div>
            </div>

            <div>
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {config.vibe === 'genz'
                  ? 'Gen Z'
                  : config.vibe === 'millennial'
                    ? 'Millennial'
                    : 'Professional'}
              </Badge>
            </div>
          </div>

          {/* Chat Area */}
          <ScrollArea className="h-[400px] bg-gray-50 p-4 dark:bg-gray-900">
            {chatHistory.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <motion.div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="text-blue-500 dark:text-blue-400" />
                </motion.div>
                <h3 className="mb-2 text-sm font-medium">
                  Start Testing Your Bot
                </h3>
                <p className="text-muted-foreground mb-4 max-w-xs text-xs">
                  Send a message to see how your bot responds with markdown
                  formatting. You'll see rich text with <strong>bold</strong>,{' '}
                  <em>italics</em>, and lists.
                </p>

                <motion.div
                  className="max-w-[80%] rounded-lg bg-white px-4 py-2 dark:bg-gray-700"
                  initial={{ opacity: 0, y: 10, x: -5 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                >
                  <div className="markdown-content text-sm">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                      {`**Welcome!** I'm your AI sales assistant powered by PocketLink.

### How I can help you:
* Provide information about our **products and services**
* Answer questions about *pricing* and features
* Explain integration options
* Offer personalized recommendations

> Try asking about our most popular features or special offers!

Need technical help? Just mention \`setup\` or \`installation\` in your question.
`}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className={`flex max-w-[80%] items-start ${message.sender === 'User' ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          message.sender === 'User'
                            ? 'ml-2 bg-blue-100 dark:bg-blue-900/30'
                            : 'mr-2 bg-gray-100 dark:bg-gray-800'
                        }`}
                      >
                        {message.sender === 'User' ? (
                          <User
                            size={16}
                            className="text-black dark:text-white"
                          />
                        ) : config.avatarUrl ? (
                          <Image
                            src={config.avatarUrl}
                            width={32}
                            height={32}
                            alt="Bot avatar"
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <Bot
                            size={16}
                            className="text-gray-600 dark:text-gray-400"
                          />
                        )}
                      </div>
                      <div>
                        <div
                          className={`rounded-xl p-3 ${
                            message.sender === 'User'
                              ? 'bg-blue-500 text-white'
                              : message.isError
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                : 'border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
                          }`}
                        >
                          {message.sender === 'User' ? (
                            <p className="whitespace-pre-wrap text-sm">
                              {message.text}
                            </p>
                          ) : (
                            <div className="markdown-content whitespace-pre-wrap text-sm">
                              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {message.text}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                        <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock size={10} className="mr-1" />
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex max-w-[80%] items-start">
                      <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        {config.avatarUrl ? (
                          <Image
                            src={config.avatarUrl}
                            width={32}
                            height={32}
                            alt="Bot avatar"
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <Bot
                            size={16}
                            className="text-gray-600 dark:text-gray-400"
                          />
                        )}
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <LoadingAnimation />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message to test your bot..."
                className="min-h-[60px] flex-1 resize-none text-sm focus-visible:ring-blue-500"
                disabled={isLoading}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button
                type="submit"
                disabled={isLoading || !userInput.trim()}
                className={`h-auto self-end px-3 ${isLoading || !userInput.trim() ? 'opacity-50' : ''}`}
              >
                {isLoading ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </Button>
            </form>
            <p className="text-muted-foreground mt-2 text-xs">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Sidebar with test tools */}
        <div className="space-y-6 lg:col-span-2">
          {/* Bot Configuration Panel */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 text-sm font-medium">Bot Configuration</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Role:</span>
                <span className="font-medium">{config.role}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Vibe:</span>
                <span className="font-medium">{config.vibe}</span>
              </div>
              <div className="mt-2 text-xs">
                <span className="text-muted-foreground mb-1 block">
                  Data Access:
                </span>
                <div className="flex flex-wrap gap-1">
                  {config.dataAccess.map((access) => (
                    <Badge key={access} variant="secondary" className="text-xs">
                      {access}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-800">
                <p className="text-muted-foreground line-clamp-3 text-xs italic">
                  "{config.persona}"
                </p>
              </div>
            </div>
          </div>

          {/* Quick Test Prompts */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 text-sm font-medium">Quick Test Prompts</h3>
            <div className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  className="w-full rounded-lg border border-gray-200 bg-blue-50 bg-gray-50 p-2 text-left text-sm dark:border-gray-700 dark:bg-blue-900/20 dark:bg-gray-800"
                  onClick={() => {
                    setUserInput(prompt);
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {prompt}
                </motion.button>
              ))}

              {/* Special test button for markdown example */}
              <motion.button
                className="mt-4 w-full rounded-lg border border-purple-200 bg-purple-100 bg-purple-50 p-2 text-left text-sm dark:border-purple-800 dark:bg-purple-900/20 dark:bg-purple-900/30"
                onClick={() => {
                  // Add a fake markdown-formatted message directly to the chat
                  const markdownExample = {
                    id: Date.now(),
                    sender: 'Bot',
                    text: `# Markdown Examples

**This is bold text** and *this is italicized*

## Lists
* Unordered list item 1
* Unordered list item 2
  * Nested item
  
1. Ordered list item 1
2. Ordered list item 2

## Code Example
\`\`\`javascript
// This is a code block
function sayHello() {
  console.log("Hello world!");
}
\`\`\`

> This is a blockquote that you can use for important information.

[This is a link](https://example.com)`,
                    timestamp: new Date(),
                  };

                  setChatHistory((prev) => [...prev, markdownExample]);
                }}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="flex items-center">
                  <Sparkles size={14} className="mr-2 text-purple-500" />
                  Show Markdown Examples
                </span>
              </motion.button>
            </div>
            <p className="text-muted-foreground mt-3 text-xs">
              Click on a prompt to add it to the input field
            </p>
          </div>

          {/* Testing Status */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <div className="mb-2 flex items-center">
              <CheckCircle
                size={16}
                className="mr-2 text-green-600 dark:text-green-400"
              />
              <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                Bot Ready for Testing
              </h3>
            </div>
            <p className="text-xs text-green-700 dark:text-green-400">
              Your bot is configured and ready to test. Try sending messages to
              see how it responds based on your settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTab;
