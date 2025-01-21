'use client';

import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { analyticsRealDb } from '@/Clients/analyticsDB';
import { supabase } from '@/Clients/supabase/client';
import { ref, get } from 'firebase/database';
import { isMobile } from 'react-device-detect';
import { useTheme } from '@/app/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

// Import contexts
import { useAuth } from '@/app/contexts/AuthContext';
import { useItems } from '@/app/contexts/ItemsContext';
import { useController } from '@/app/contexts/ControllerContext';
import { useShop } from '@/app/contexts/ShopContext';
import { useAnalytics } from '@/app/contexts/AnalyticsContext';
import { useAudience } from '@/app/contexts/AudienceContext';
import { useExternalProduct } from '@/app/contexts/ExternalProductContext';
import { useTemplates } from '@/app/contexts/TemplatesContext';
import { useCalendar } from '@/app/contexts/CalendarContext';

// Import components
import {
  ChatHeader,
  ChatInput,
  ChatContainer,
  ActionConfirmationDialog,
} from './components';

// Import hooks
import { useChatState, useActionExecution } from './hooks';

// Import utilities
import { detectDirectAction } from './utils/actionUtils';
import { generatePlaceholderImage, imageAesthetics } from './utils/imageUtils';
import {
  safeGetActionDescription,
  getFriendlyActionName,
} from './utils/actionUtils';

const AIChatBot = () => {
  // Get contexts
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { theme: currentTheme, setTheme } = useTheme() || {};
  const theme = currentTheme || 'default';

  // Use hooks for state management
  const {
    messages,
    setMessages,
    input,
    setInput,
    loading,
    fetchLoading,
    setFetchLoading,
    hasOpenedBefore,
    setHasOpenedBefore,
    enableInput,
    chatContainerRef,
    messagesEndRef,
    scrollToBottom,
    setLoadingState,
    saveMessageToFirebase,
    getChatHistoryForContext,
    addUserMessage,
    addAIMessage,
    isThinking,
    setIsThinking,
  } = useChatState();

  const {
    agentAction,
    setAgentAction,
    showConfirmation,
    setShowConfirmation,
    executeAgentAction,
    executeBuilderAction,
    executeSelectedAction,
    cancelAgentAction,
    handleAIThemeToggle,
  } = useActionExecution(addAIMessage, setLoadingState);

  // Additional state for UI
  const [open, setOpen] = useState(false);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [userAnalyticsData, setUserAnalyticsData] = useState(null);
  const [userLinkInBioAndAnalyticsData, setUserLinkInBioAndAnalyticsData] =
    useState(null);
  const [isContextFiltered, setIsContextFiltered] = useState(false);
  const [contextDataStats, setContextDataStats] = useState({
    totalFullSize: 0,
    totalFilteredSize: 0,
    requestCount: 0,
    currentReductionPercent: '0.00',
  });

  // Handle context data from various contexts
  const username = user?.username;
  const { items = [], mobileItems = [], profile = {} } = useItems() || {};
  let viewMode = 'desktop';
  let products = [];
  let categories = [];
  let analytics = {};
  let analyticsData = {};
  let audiences = [];
  let calendarEvents = [];
  let bookings = [];
  let externalProducts = [];
  let templates = [];

  // Safely access context data with try/catch blocks
  try {
    const controllerData = useController() || {};
    viewMode = controllerData.viewMode || 'desktop';
  } catch (e) {
    console.error('Error accessing Controller context:', e);
  }

  try {
    const shopData = useShop() || {};
    products = shopData.products || [];
    categories = shopData.categories || [];
  } catch (e) {
    console.error('Error accessing Shop context:', e);
  }

  try {
    const analyticsContextData = useAnalytics() || {};
    analytics = analyticsContextData.analytics || {};
    analyticsData = analyticsContextData.analyticsData || {};
  } catch (e) {
    console.error('Error accessing Analytics context:', e);
  }

  try {
    const audienceData = useAudience() || {};
    audiences = audienceData.audiences || [];
  } catch (e) {
    console.error('Error accessing Audience context:', e);
  }

  try {
    const calendarData = useCalendar() || {};
    calendarEvents = calendarData.calendarEvents || [];
    bookings = calendarData.bookings || [];
  } catch (e) {
    console.error('Error accessing Calendar context:', e);
  }

  try {
    const externalProductData = useExternalProduct() || {};
    externalProducts = externalProductData.externalProducts || [];
  } catch (e) {
    console.error('Error accessing ExternalProduct context:', e);
  }

  try {
    const templateData = useTemplates() || {};
    templates = templateData.templates || [];
  } catch (e) {
    console.error('Error accessing Templates context:', e);
  }

  // Add a function to update the data savings stats
  const updateContextDataStats = (fullSize, filteredSize) => {
    const percentReduction =
      fullSize > 0
        ? (((fullSize - filteredSize) / fullSize) * 100).toFixed(2)
        : '0.00';

    setContextDataStats((prevStats) => ({
      totalFullSize: prevStats.totalFullSize + fullSize,
      totalFilteredSize: prevStats.totalFilteredSize + filteredSize,
      requestCount: prevStats.requestCount + 1,
      currentReductionPercent: percentReduction,
    }));
  };

  // Function to handle UI state changes
  const toggleFullScreen = () => {
    setFullScreenMode(!fullScreenMode);
  };

  const handleOpenChange = (newOpenState) => {
    setOpen(newOpenState);
  };

  // Get the correct placeholder text based on the mode
  const getPlaceholderText = () => {
    return 'Ask Pocket something...';
  };

  // Add a function to check for contextual suggestions based on the current page
  const getContextualSuggestions = () => {
    const suggestions = [];

    // Check the current pathname to see what page we're on
    if (pathname.includes('/analytics')) {
      suggestions.push('Analyze my page performance');
      suggestions.push('Show me visitor trends');
    } else if (pathname.includes('/shop')) {
      suggestions.push('Add a new product');
      suggestions.push('Update product descriptions');
    } else if (pathname.includes('/edit')) {
      suggestions.push('Add a section title');
      suggestions.push('Add my social media links');
    }

    return suggestions;
  };

  // Main function to handle sending a message
  const handleSendMessage = async (message) => {
    if (!message.trim() || loading) return;

    try {
      setLoadingState(true);
      setIsThinking(true);

      // Add user message to chat
      await addUserMessage(message);

      // Get chat history for context
      const chatHistory = getChatHistoryForContext();

      // Simplified context - only analytics related data
      const cleanContext = {
        username,
        analytics: analytics || {},
        analyticsData: analyticsData || {},
      };

      // Prepare request body with clean data
      const requestBody = {
        userInput: message,
        userLinkInBioAndAnalyticsData: cleanContext,
        chatHistory: chatHistory || [],
        enhancedFormatting: true,
      };

      const response = await fetch('/api/gemini-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      setFetchLoading(false);

      // Clean up the AI response
      let aiReply = data.reply || "Sorry, I couldn't process that request.";

      // If message contains build/agent related keywords, respond with learning message
      const agentKeywords = [
        'build',
        'create',
        'layout',
        'design',
        'generate',
        'modify',
        'update',
        'change',
      ];
      if (
        agentKeywords.some((keyword) => message.toLowerCase().includes(keyword))
      ) {
        aiReply =
          "I'm still learning to help with building and modifying layouts. For now, I can help you understand your analytics and provide insights about your performance. What would you like to know about your analytics?";
      }

      // Fix chart syntax if present
      aiReply = aiReply.replace(/({{CHART:.*?)}}+/g, '$1}}');

      await addAIMessage(aiReply);
    } catch (error) {
      console.error('Error in message handling:', error);
      await addAIMessage('Sorry, something went wrong! Please try again.');
    } finally {
      setLoadingState(false);
      setIsThinking(false);
    }
  };

  // Refresh all context data when the chatbot is opened
  useEffect(() => {
    if (open) {
      console.log('Refreshing context data for AI chatbot');

      // Only fetch new data if chatbot was previously closed
      if (!hasOpenedBefore) {
        setHasOpenedBefore(true);
        setMessages((prev) => prev.map((msg) => ({ ...msg, isRead: true })));
      }
    }
  }, [open, hasOpenedBefore, setMessages, setHasOpenedBefore]);

  // Fetch user data for analytics and profile
  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;

      const analyticsRef = ref(analyticsRealDb, `analytics/${username}`);

      try {
        const snapshot = await get(analyticsRef);

        if (snapshot.exists()) {
          setUserAnalyticsData(snapshot.val());
        }

        const { data: supabaseData, error } = await supabase
          .from('items_data')
          .select('items, profile, theme, ogPreviewType')
          .eq('username', username)
          .single();

        if (!error) {
          setUserLinkInBioAndAnalyticsData({
            analytics: snapshot.exists() ? snapshot.val() : null,
            items: supabaseData?.items || null,
            profile: supabaseData?.profile || null,
            theme: supabaseData?.theme || null,
            ogPreviewType: supabaseData?.ogPreviewType || null,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  // Scroll to bottom when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(scrollToBottom, 100);
    }
  }, [open]);

  return (
    <>
      {/* Floating Pocket Button */}
      {!open && (
        <button
          className={`fixed bottom-4 right-4 z-[9999] hidden items-center justify-center rounded-full p-4 shadow-lg md:flex ${
            theme === 'dark'
              ? 'border-2 border-violet-600 bg-gray-800'
              : 'border-2 border-bento-violetLight bg-white'
          }`}
          onClick={() => setOpen(true)}
        >
          <Avatar>
            <AvatarImage src={'/AI/pocket.png'} />
          </Avatar>
        </button>
      )}

      {/* Chatbot Sheet - Adjusted to open from bottom on mobile */}
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={`max-h-[80vh] w-full md:max-h-screen ${
            fullScreenMode ? 'md:max-w-[80vw]' : 'md:w-[600px]'
          } flex flex-col ${
            theme === 'dark'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900'
          }`}
        >
          {/* Header Component */}
          <ChatHeader
            fullScreenMode={fullScreenMode}
            theme={theme}
            onToggleFullScreen={toggleFullScreen}
            onToggleTheme={() => handleAIThemeToggle(theme, setTheme)}
          />

          {/* Chat Container Component */}
          <ChatContainer
            messages={messages}
            theme={theme}
            chatContainerRef={chatContainerRef}
            messagesEndRef={messagesEndRef}
            showScrollButton={showScrollButton}
            onScrollToBottom={setShowScrollButton}
            isThinking={isThinking}
          />

          {/* Chat Input Component */}
          <ChatInput
            input={input}
            setInput={setInput}
            onSendMessage={handleSendMessage}
            placeholder={getPlaceholderText()}
            disabled={!enableInput}
            isLoading={loading}
            theme={theme}
            scrollToBottom={scrollToBottom}
          />

          {/* Action Confirmation Dialog */}
          {showConfirmation && (
            <ActionConfirmationDialog
              open={showConfirmation}
              onClose={() => setShowConfirmation(false)}
              onConfirm={executeSelectedAction}
              action={agentAction}
              theme={theme}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AIChatBot;
