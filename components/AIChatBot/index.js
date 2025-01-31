'use client';

// Main component export
export { default as AIChatBot } from './AIChatBot';
export { default as LayoutManager } from './LayoutManager';

// Also export utilities for use in other components
export * from './utils';
export * from './hooks';
export * from './components';

// Loading indicator is now implemented in ChatMessage.jsx
// - Added isLoading property to messages
// - Shows animated dots when message is in loading state
// - Automatically removes loading messages when AI response arrives
