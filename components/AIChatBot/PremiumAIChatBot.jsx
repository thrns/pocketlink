'use client';

import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { AIChatBot } from './index';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES, FEATURE_NAMES } from '@/constants/features';
import { MessageCircle, Sparkles, Clock } from 'lucide-react';
import { useSubscription } from '@/app/contexts/SubscriptionContext';

/**
 * Premium wrapper for AIChatBot that gates advanced features
 * behind premium subscription
 */
const PremiumAIChatBot = (props) => {
  const { user } = useAuth();
  const { isPremium } = useSubscription();

  // Sample conversation for the dummy preview
  const dummyConversation = (
    <div className="pointer-events-none flex h-full flex-col overflow-hidden rounded-lg bg-white opacity-80 dark:bg-gray-900">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500">
            <MessageCircle size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium">Pocket AI</h3>
            <p className="text-xs text-gray-500">Premium Assistant</p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* AI message */}
        <div className="flex max-w-[80%] items-start">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500">
            <Sparkles size={14} className="text-white" />
          </div>
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <p className="text-sm">
              Hello! I'm Pocket AI. How can I help you today?
            </p>
          </div>
        </div>

        {/* User message */}
        <div className="flex items-start justify-end">
          <div className="max-w-[80%] rounded-lg bg-blue-500 p-3 text-white">
            <p className="text-sm">
              Can you help me optimize my layout for better conversions?
            </p>
          </div>
        </div>

        {/* AI message */}
        <div className="flex max-w-[80%] items-start">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500">
            <Sparkles size={14} className="text-white" />
          </div>
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <p className="text-sm">
              I'd be happy to help optimize your layout! I can analyze your
              current design and suggest improvements based on best practices
              and your audience data.
            </p>
          </div>
        </div>

        {/* User message */}
        <div className="flex items-start justify-end">
          <div className="max-w-[80%] rounded-lg bg-blue-500 p-3 text-white">
            <p className="text-sm">
              That sounds great! What do you need from me?
            </p>
          </div>
        </div>

        {/* AI message */}
        <div className="flex max-w-[80%] items-start">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500">
            <Clock size={14} className="text-white" />
          </div>
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <p className="text-sm">
              Upgrade to premium to unlock AI assistant features including
              layout optimization, content suggestions, and automated tasks.
            </p>
          </div>
        </div>
      </div>

      {/* Chat input */}
      <div className="border-t p-4 dark:border-gray-700">
        <div className="flex items-center rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border-none bg-transparent px-2 text-sm focus:outline-none"
            disabled
          />
          <button className="rounded-full bg-violet-500 p-2 text-white opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <PremiumGate
      featureKey={FEATURES.AI_FEATURES}
      featureName={FEATURE_NAMES[FEATURES.AI_FEATURES]}
      description="Get personalized help with AI-powered layout optimization, content creation, and task automation."
      dummyData={dummyConversation}
    >
      <AIChatBot {...props} />
    </PremiumGate>
  );
};

export default PremiumAIChatBot;
