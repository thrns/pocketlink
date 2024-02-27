'use client';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { toast } from 'sonner';
import { supabase } from '@/Clients/supabase/client';

// Create the SalesBotChatContext
export const SalesBotChatContext = createContext(null);

// Safe supabase query wrapper
const safeSupabaseQuery = async (query) => {
  try {
    const result = await query;
    return result;
  } catch (error) {
    // Create a structured error response similar to what supabase returns
    return {
      data: null,
      error: {
        message: error.message || 'Database query failed',
        details: error.details || null,
        hint: 'This is a client-side error, not from Supabase directly',
        code: 'CLIENT_ERROR',
      },
    };
  }
};

export const SalesBotChatProvider = ({ children, tenantUsername }) => {
  // Basic state for the chat
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [botAvatar, setBotAvatar] = useState('');
  const [isBotAvailable, setIsBotAvailable] = useState(false);
  const [salesBotData, setSalesBotData] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [fetchError, setFetchError] = useState(null);

  // Convert chat history to string format for AI context - memoized
  const formatChatHistory = useCallback(() => {
    if (!Array.isArray(chatHistory)) return '';

    try {
      return chatHistory
        .filter(
          (message) =>
            message &&
            typeof message.sender === 'string' &&
            typeof message.text === 'string'
        )
        .map((message) => `${message.sender}: ${message.text}`)
        .join('\n');
    } catch (error) {
      return '';
    }
  }, [chatHistory]);

  // Fetch sales bot data from Supabase with retries
  useEffect(() => {
    let isMounted = true;
    let retryTimeout = null;

    const fetchSalesBotData = async () => {
      if (!tenantUsername) {
        if (isMounted) {
          setIsBotAvailable(false);
          setSalesBotData(null);
        }
        return;
      }

      try {
        if (isMounted) {
          setSalesBotData((prev) => ({ ...(prev || {}), loading: true }));
        }

        const { data, error } = await safeSupabaseQuery(
          supabase
            .from('sales_bot_data')
            .select('*')
            .eq('username', tenantUsername)
            .single()
        );

        if (error) {
          if (error.code !== 'PGRST116') {
            // PGRST116 is "no rows returned" error
            if (isMounted) {
              setFetchError(error);

              // Retry logic - maximum 3 retries with exponential backoff
              if (retryCount < 3) {
                const nextRetry = Math.pow(2, retryCount) * 1000; // Exponential backoff
                retryTimeout = setTimeout(() => {
                  if (isMounted) {
                    setRetryCount((prev) => prev + 1);
                  }
                }, nextRetry);
              } else {
                toast.error('Failed to load Sales Bot configuration');
              }
            }
          }

          // Set default data even on error
          if (isMounted) {
            setSalesBotData({
              is_active: false,
              role: 'sales person',
              vibe: 'modern professional',
              persona: '',
              avatar_url: '',
              data_access: [],
              loading: false,
            });
            setIsBotAvailable(false);
          }
          return;
        }

        // Reset retries on success
        if (isMounted) {
          setRetryCount(0);
          setFetchError(null);
        }

        if (data && isMounted) {
          // Validate data and provide fallbacks for missing fields
          const validatedData = {
            is_active: Boolean(data.is_active),
            role: data.role || 'sales person',
            vibe: data.vibe || 'modern professional',
            persona: data.persona || '',
            avatar_url: data.avatar_url || '',
            data_access: Array.isArray(data.data_access)
              ? data.data_access
              : [],
            loading: false,
          };

          setSalesBotData(validatedData);
          setBotAvatar(validatedData.avatar_url);
          setIsBotAvailable(true);
        } else if (isMounted) {
          // Default values when no data is found
          setSalesBotData({
            is_active: false,
            role: 'sales person',
            vibe: 'modern professional',
            persona: '',
            avatar_url: '',
            data_access: [],
            loading: false,
          });
          setIsBotAvailable(false);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error);
          setSalesBotData((prev) => ({ ...(prev || {}), loading: false }));
          setIsBotAvailable(false);
        }
      }
    };

    fetchSalesBotData();

    // Cleanup function
    return () => {
      isMounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [tenantUsername, retryCount]);

  // Reset retry counter if tenant changes
  useEffect(() => {
    setRetryCount(0);
    setFetchError(null);
  }, [tenantUsername]);

  // Safe API call with timeout and retry
  const callSalesBotAPI = async (userMessage, retryCount = 0) => {
    try {
      // Create an abort controller with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

      const response = await fetch('/api/sales-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: userMessage,
          tenantUsername,
          chatHistory: formatChatHistory(),
          enhancedFormatting: true,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      // Retry logic for network errors or timeouts
      if (
        (error.name === 'AbortError' || error.name === 'TypeError') &&
        retryCount < 2
      ) {
        // Wait 2^retryCount seconds before retrying
        await new Promise((r) => setTimeout(r, Math.pow(2, retryCount) * 1000));
        return callSalesBotAPI(userMessage, retryCount + 1);
      }
      throw error;
    }
  };

  // Send message to the sales bot API - memoized
  const sendMessage = useCallback(
    async (userMessage) => {
      if (!userMessage?.trim()) return;

      try {
        // Add user message to chat history with validation
        const newUserMessage = {
          id: Date.now(),
          sender: 'User',
          text: userMessage.slice(0, 2000), // Limit message length
          timestamp: new Date(),
        };

        const updatedChatHistory = [
          ...(Array.isArray(chatHistory) ? chatHistory : []),
          newUserMessage,
        ];
        setChatHistory(updatedChatHistory);

        setIsLoading(true);

        // Call the API with tenant username and chat history
        const data = await callSalesBotAPI(userMessage);

        // Validate response
        if (!data || typeof data.reply !== 'string') {
          throw new Error('Invalid response from server');
        }

        // Add bot response to chat history
        const botResponse = {
          id: Date.now() + 1,
          sender: 'Bot',
          text: data.reply,
          timestamp: new Date(),
        };

        setChatHistory((prev) => [
          ...(Array.isArray(prev) ? prev : []),
          botResponse,
        ]);
      } catch (error) {
        // Add error message to chat history
        const errorMessage = {
          id: Date.now() + 1,
          sender: 'Bot',
          text: 'Sorry, I encountered an error processing your request. Please try again later.',
          timestamp: new Date(),
          isError: true,
        };

        setChatHistory((prev) => [
          ...(Array.isArray(prev) ? prev : []),
          errorMessage,
        ]);

        // Show toast only if the chat is open to avoid confusion
        if (isChatOpen) {
          toast.error('Failed to get response from sales bot');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [chatHistory, formatChatHistory, tenantUsername, isChatOpen]
  );

  // Toggle chat window open/closed - memoized
  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  // Clear chat history - memoized
  const clearChat = useCallback(() => {
    setChatHistory([]);
  }, []);

  // Memoize context value to prevent unnecessary renders
  const contextValue = useMemo(
    () => ({
      chatHistory: Array.isArray(chatHistory) ? chatHistory : [],
      isChatOpen,
      isLoading,
      botAvatar,
      isBotAvailable,
      salesBotData: salesBotData || {
        is_active: false,
        role: 'sales person',
        vibe: 'modern professional',
        loading: false,
      },
      sendMessage,
      toggleChat,
      clearChat,
      setChatHistory,
    }),
    [
      chatHistory,
      isChatOpen,
      isLoading,
      botAvatar,
      isBotAvailable,
      salesBotData,
      sendMessage,
      toggleChat,
      clearChat,
    ]
  );

  return (
    <SalesBotChatContext.Provider value={contextValue}>
      {children}
    </SalesBotChatContext.Provider>
  );
};

// Custom hook with error handling
export const useSalesBotChat = () => {
  try {
    const context = useContext(SalesBotChatContext);
    if (context === undefined) {
      return {
        chatHistory: [],
        isChatOpen: false,
        isLoading: false,
        botAvatar: '',
        isBotAvailable: false,
        salesBotData: {
          is_active: false,
          role: 'sales person',
          vibe: 'modern professional',
          loading: false,
        },
        sendMessage: () => {},
        toggleChat: () => {},
        clearChat: () => {},
        setChatHistory: () => {},
      };
    }
    return context;
  } catch (error) {
    // Provide fallback values if context access fails
    return {
      chatHistory: [],
      isChatOpen: false,
      isLoading: false,
      botAvatar: '',
      isBotAvailable: false,
      salesBotData: {
        is_active: false,
        role: 'sales person',
        vibe: 'modern professional',
        loading: false,
      },
      sendMessage: () => {},
      toggleChat: () => {},
      clearChat: () => {},
      setChatHistory: () => {},
    };
  }
};
