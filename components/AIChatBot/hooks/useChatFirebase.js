import { useState, useCallback } from 'react';
import { ref, get, push, set } from 'firebase/database';
import { analyticsRealDb } from '@/Clients/analyticsDB';
import { useAuth } from '@/app/contexts/AuthContext';
import { CHAT_HISTORY_LIMIT } from '../utils';

/**
 * Custom hook for Firebase chat operations
 */
export const useChatFirebase = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'puddles',
      text: "Hello! I'm Pocket. How can I assist you?",
      isRead: false,
      timestamp: Date.now(),
    },
  ]);
  const [chatId, setChatId] = useState(null);
  const { user } = useAuth();

  /**
   * Save a message to Firebase
   */
  const saveMessageToFirebase = useCallback(
    async (message) => {
      if (!user?.uid) return { success: false, error: 'No user authenticated' };

      try {
        const chatRef = ref(analyticsRealDb, `chats/${user.uid}`);
        const newMessageRef = push(chatRef);
        await set(newMessageRef, message);
        return { success: true, messageId: newMessageRef.key };
      } catch (error) {
        console.error('Error saving message to Firebase:', error);
        return { success: false, error: error.message };
      }
    },
    [user]
  );

  /**
   * Initialize the chat and load existing messages
   */
  const initializeChat = useCallback(async () => {
    if (!user?.uid) return;

    try {
      // Load chat history
      const chatRef = ref(analyticsRealDb, `chats/${user.uid}`);
      const snapshot = await get(chatRef);

      if (snapshot.exists()) {
        // Transform Firebase object to array
        const chatData = snapshot.val();
        const chatMessages = Object.entries(chatData)
          .map(([id, message]) => ({ ...message, id }))
          .sort((a, b) => a.timestamp - b.timestamp);

        // Limit the number of messages to display
        const limitedMessages = chatMessages.slice(-CHAT_HISTORY_LIMIT);

        if (limitedMessages.length > 0) {
          setMessages(limitedMessages);
          return { success: true, messageCount: limitedMessages.length };
        }
      }

      // If no messages or error, keep the default welcome message
      return { success: true, messageCount: 1 };
    } catch (error) {
      console.error('Error initializing chat:', error);
      return { success: false, error: error.message };
    }
  }, [user]);

  /**
   * Add a message to the state and optionally save to Firebase
   */
  const addMessage = useCallback(
    async (message, saveToFirebase = true) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      if (saveToFirebase) {
        return await saveMessageToFirebase(message);
      }

      return { success: true };
    },
    [saveMessageToFirebase]
  );

  return {
    messages,
    setMessages,
    chatId,
    setChatId,
    saveMessageToFirebase,
    initializeChat,
    addMessage,
  };
};

export default useChatFirebase;
