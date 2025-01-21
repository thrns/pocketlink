import { useState, useEffect, useRef } from 'react';
import { ref, get, push, set } from 'firebase/database';
import { aiRealDb } from '@/Clients/AIDB';
import { useAuth } from '@/app/contexts/AuthContext';

// Constant for chat history limit
export const CHAT_HISTORY_LIMIT = 50;

/**
 * Hook for managing chat state and interactions with Firebase
 * @returns {Object} - Chat state and functions
 */
export const useChatState = () => {
  const { user } = useAuth();
  const username = user?.username;

  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: 'puddles',
      text: "Hello! I'm Pocket. How can I assist you?",
      isRead: false,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [enableInput, setEnableInput] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  // Refs for scrolling
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  /**
   * Initialize chat by creating a new one or fetching existing
   */
  useEffect(() => {
    const initializeChat = async () => {
      if (!username) return;

      try {
        // Check if there's an active chat in localStorage
        const storedChatId = localStorage.getItem(`pocket_chat_${username}`);

        if (storedChatId) {
          // Fetch existing chat history
          const chatRef = ref(aiRealDb, `chats/${username}/${storedChatId}`);
          const snapshot = await get(chatRef);

          if (snapshot.exists()) {
            const chatData = snapshot.val();
            if (chatData.messages) {
              // Convert object to array and sort by timestamp
              const messageArray = Object.values(chatData.messages).sort(
                (a, b) => a.timestamp - b.timestamp
              );

              // Mark all messages as read when fetching previous chat history
              const readMessages = messageArray.map((msg) => ({
                ...msg,
                isRead: true,
              }));

              setMessages(readMessages);
              setChatId(storedChatId);
              return;
            }
          }
        }

        // Create a new chat if no valid chat exists
        const newChatRef = push(ref(aiRealDb, `chats/${username}`));
        const newChatId = newChatRef.key;

        // Store welcome message with markdown formatting
        const welcomeMessage = {
          sender: 'puddles',
          text: "# Hello! I'm Pocket 👋\nI can help you with your analytics, create visualizations, and answer questions about your link in bio. What would you like to know?",
          isRead: false,
          timestamp: Date.now(),
        };

        await set(
          ref(aiRealDb, `chats/${username}/${newChatId}/messages/welcome`),
          welcomeMessage
        );
        await set(
          ref(aiRealDb, `chats/${username}/${newChatId}/created`),
          Date.now()
        );

        // Save chat ID to localStorage
        localStorage.setItem(`pocket_chat_${username}`, newChatId);
        setChatId(newChatId);
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();
  }, [username]);

  /**
   * Save message to Firebase
   * @param {Object} message - The message to save
   */
  const saveMessageToFirebase = async (message) => {
    if (!username || !chatId) return;

    try {
      const messageRef = push(
        ref(aiRealDb, `chats/${username}/${chatId}/messages`)
      );
      await set(messageRef, message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  /**
   * Get chat history for context
   * @returns {string} - Formatted chat history
   */
  const getChatHistoryForContext = () => {
    // Get the last CHAT_HISTORY_LIMIT messages
    const recentMessages = messages.slice(-CHAT_HISTORY_LIMIT);

    // Format messages for context
    return recentMessages
      .map(
        (msg) => `${msg.sender === 'puddles' ? 'Pocket' : 'User'}: ${msg.text}`
      )
      .join('\n');
  };

  /**
   * Scroll to bottom of the chat
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Set loading state and disable/enable input
   * @param {boolean} isLoading - Whether loading is active
   */
  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
    setEnableInput(!isLoading);
    setIsThinking(isLoading);
  };

  /**
   * Add a user message to the chat
   * @param {string} text - The message text
   */
  const addUserMessage = async (text) => {
    const userMessage = {
      sender: 'user',
      text,
      isRead: true,
      timestamp: Date.now(),
    };

    setMessages((msgs) => [...msgs, userMessage]);
    await saveMessageToFirebase(userMessage);
    return userMessage;
  };

  /**
   * Add an AI message to the chat
   * @param {string} text - The message text
   * @param {Object} options - Additional message options
   */
  const addAIMessage = async (text, options = {}) => {
    // Set isThinking to false when we receive a response
    setIsThinking(false);

    const aiMessage = {
      sender: 'puddles',
      text,
      isRead: false,
      timestamp: Date.now(),
      ...options,
    };

    // Remove any loading messages before adding the actual response
    setMessages((msgs) => {
      const filteredMessages = msgs.filter((msg) => !msg.isLoading);
      return [...filteredMessages, aiMessage];
    });

    await saveMessageToFirebase(aiMessage);
    return aiMessage;
  };

  // Set up useEffect for reading messages, but DON'T scroll automatically
  useEffect(() => {
    // Mark the most recent AI message as read after 2 seconds
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage &&
      lastMessage.sender === 'puddles' &&
      !lastMessage.isRead
    ) {
      const timer = setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 ? { ...msg, isRead: true } : msg
          )
        );
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  return {
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
  };
};

export default useChatState;
