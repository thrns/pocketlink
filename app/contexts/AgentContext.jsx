'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useController } from './ControllerContext';
import { useShop } from './ShopContext';
import { useRouter } from 'next/navigation';

// Add string matching algorithms for efficient context filtering
/**
 * Builds the Boyer-Moore bad character table
 * @param {string} pattern - The pattern to search for
 * @returns {Object} - The bad character table
 */
const buildBadCharTable = (pattern) => {
  const table = {};
  const patternLength = pattern.length;

  // Initialize all characters with pattern length
  for (let i = 0; i < patternLength - 1; i++) {
    table[pattern[i]] = patternLength - 1 - i;
  }

  return table;
};

/**
 * Boyer-Moore string search algorithm
 * @param {string} text - The text to search in
 * @param {string} pattern - The pattern to search for
 * @returns {number} - Index of the first match or -1 if not found
 */
const boyerMooreSearch = (text, pattern) => {
  if (!text || !pattern || pattern.length === 0 || text.length === 0) {
    return -1;
  }

  const patternLength = pattern.length;
  const textLength = text.length;
  const badCharTable = buildBadCharTable(pattern);

  let offset = 0;

  while (offset <= textLength - patternLength) {
    let scan = patternLength - 1;

    while (scan >= 0 && pattern[scan] === text[offset + scan]) {
      scan--;
    }

    if (scan < 0) {
      return offset; // Match found at offset
    } else {
      // Calculate shift based on bad character rule
      const badCharShift = badCharTable[text[offset + scan]] || patternLength;
      offset += Math.max(1, badCharShift);
    }
  }

  return -1; // No match found
};

/**
 * Builds the KMP prefix table
 * @param {string} pattern - The pattern to search for
 * @returns {Array} - The prefix table
 */
const buildKMPTable = (pattern) => {
  const table = [0];
  let prefixLen = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[prefixLen]) {
      prefixLen++;
      table[i] = prefixLen;
      i++;
    } else if (prefixLen === 0) {
      table[i] = 0;
      i++;
    } else {
      prefixLen = table[prefixLen - 1];
    }
  }

  return table;
};

/**
 * Knuth-Morris-Pratt string search algorithm
 * @param {string} text - The text to search in
 * @param {string} pattern - The pattern to search for
 * @returns {number} - Index of the first match or -1 if not found
 */
const kmpSearch = (text, pattern) => {
  if (!text || !pattern || pattern.length === 0 || text.length === 0) {
    return -1;
  }

  const prefixTable = buildKMPTable(pattern);
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    if (pattern[patternIndex] === text[textIndex]) {
      patternIndex++;
      textIndex++;
    }

    if (patternIndex === pattern.length) {
      return textIndex - patternIndex; // Match found
    } else if (
      textIndex < text.length &&
      pattern[patternIndex] !== text[textIndex]
    ) {
      if (patternIndex !== 0) {
        patternIndex = prefixTable[patternIndex - 1];
      } else {
        textIndex++;
      }
    }
  }

  return -1; // No match found
};

/**
 * Find relevant context data by matching prompt with available context using string matching algorithms
 * @param {string} prompt - The user prompt/query
 * @param {Object} contextData - The full context data object
 * @returns {Object} - Filtered context data containing only relevant information
 */
export const findRelevantContext = (prompt, contextData) => {
  if (!prompt || !contextData) {
    return contextData;
  }

  const normalizedPrompt = prompt.toLowerCase();
  const relevantData = {};
  const matchLog = { matched: [], notMatched: [] };

  // Define common keywords to look for in the prompt
  const navigationKeywords = [
    'navigate',
    'go to',
    'open',
    'visit',
    'page',
    'link',
  ];
  const productKeywords = [
    'product',
    'item',
    'shop',
    'buy',
    'purchase',
    'sell',
    'inventory',
  ];
  const analyticsKeywords = [
    'analytics',
    'stats',
    'statistics',
    'visitors',
    'views',
    'traffic',
  ];
  const themeKeywords = [
    'theme',
    'style',
    'color',
    'appearance',
    'look',
    'design',
  ];
  const viewKeywords = ['mobile', 'desktop', 'view', 'preview', 'responsive'];

  // Check if prompt contains keywords
  const containsKeywords = (keywords, category) => {
    const matches = keywords.filter((keyword) => {
      // Use Boyer-Moore for longer keywords, KMP for shorter ones
      const matched =
        keyword.length > 3
          ? boyerMooreSearch(normalizedPrompt, keyword.toLowerCase()) >= 0
          : kmpSearch(normalizedPrompt, keyword.toLowerCase()) >= 0;

      if (matched) {
        matchLog.matched.push(`${category}: "${keyword}"`);
      }
      return matched;
    });

    if (matches.length === 0) {
      matchLog.notMatched.push(category);
    }

    return matches.length > 0;
  };

  // Always include basic user and profile info
  relevantData.user = contextData.user;
  relevantData.profile = contextData.profile;

  // Conditionally include other context data based on prompt relevance
  if (containsKeywords(navigationKeywords, 'Navigation')) {
    relevantData.username = contextData.username;
  }

  if (containsKeywords(productKeywords, 'Products')) {
    relevantData.products = contextData.products;
  }

  if (containsKeywords(analyticsKeywords, 'Analytics')) {
    relevantData.analytics = contextData.analytics;
  }

  if (containsKeywords(themeKeywords, 'Theme')) {
    relevantData.theme = contextData.theme;
  }

  if (containsKeywords(viewKeywords, 'View Mode')) {
    relevantData.viewMode = contextData.viewMode;
  }

  // Log which keywords matched and which categories were included/excluded
  console.log('Context matcher results:');
  console.log('• Prompt:', prompt);
  console.log(
    '• Matched keywords:',
    matchLog.matched.length > 0 ? matchLog.matched.join(', ') : 'None'
  );
  console.log(
    '• Categories not included:',
    matchLog.notMatched.length > 0 ? matchLog.notMatched.join(', ') : 'None'
  );
  console.log('• Included data keys:', Object.keys(relevantData).join(', '));

  return relevantData;
};

// Create the context
const AgentContext = createContext();

export function AgentProvider({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const controllerFunctions = useController();
  const shopFunctions = useShop();
  const username = user?.username;

  // Create the agent actions object
  const agentActions = useMemo(() => {
    // Destructure needed functions from contexts
    const { viewMode, setViewMode } = controllerFunctions;

    const { addProduct, editProduct, deleteProduct } = shopFunctions;

    // Return the actions object
    return {
      // Navigation functions
      navigate: (path) => {
        router.push(path);
        return `Navigated to ${path}`;
      },

      openPreview: () => {
        window.open(`https://${username}.pocketlink.co/`);
        return 'Opened preview in new tab';
      },

      // View mode functions
      switchViewMode: (mode) => {
        if (!setViewMode) return 'View mode function not available';
        if (mode === 'mobile' || mode === 'desktop') {
          setViewMode(mode);
          return `Switched to ${mode} view`;
        }
        return 'Invalid view mode';
      },

      // Product management
      createProduct: (product, images, files) => {
        if (!addProduct) return 'Add product function not available';
        addProduct(product, images, files);
        return 'Created new product';
      },

      updateProduct: (productId, product, images, files) => {
        if (!editProduct) return 'Edit product function not available';
        editProduct(productId, product, images, files);
        return `Updated product ${productId}`;
      },

      removeProduct: (product) => {
        if (!deleteProduct) return 'Delete product function not available';
        deleteProduct(product);
        return `Removed product ${product.id}`;
      },

      // Copying
      copyLink: () => {
        const url = `https://${username}.pocketlink.co`;
        navigator.clipboard.writeText(url);
        return 'Copied your Pocketlink URL to clipboard';
      },

      // Analytics and data
      getAnalyticsSummary: () => {
        try {
          // This is just a simple example - you would replace this with actual analytics data retrieval logic
          const visitorData = {
            summary: 'Analytics summary for your Pocketlink',
            totalVisits: Math.floor(Math.random() * 10000),
            uniqueVisitors: Math.floor(Math.random() * 5000),
            topSources: ['Google', 'Direct', 'Twitter'],
            popularPages: ['/', '/about', '/contact'],
          };

          return JSON.stringify(visitorData);
        } catch (error) {
          console.error('Error getting analytics summary:', error);
          return 'Failed to retrieve analytics summary';
        }
      },

      // Theme and appearance
      changeTheme: (themeName) => {
        try {
          // You would replace this with actual theme changing logic
          return `Changed theme to ${themeName}`;
        } catch (error) {
          console.error('Error changing theme:', error);
          return 'Failed to change theme';
        }
      },

      // System and status
      getSystemStatus: () => {
        try {
          const status = {
            online: true,
            version: '2.0',
            lastUpdated: new Date().toISOString(),
          };

          return JSON.stringify(status);
        } catch (error) {
          console.error('Error getting system status:', error);
          return 'Failed to retrieve system status';
        }
      },
    };
  }, [controllerFunctions, shopFunctions, router, username]);

  /**
   * Execute an agent action with proper error handling
   * @param {Object} agentAction - The action object {action, parameters}
   * @returns {Object} Result object with success status and message
   */
  const executeAction = (agentAction) => {
    if (!agentAction) {
      return {
        success: false,
        message: 'No action provided',
      };
    }

    try {
      const { action, parameters } = agentAction;

      // Check if action is defined and exists in agentActions
      if (!action || typeof action !== 'string') {
        return {
          success: false,
          message: `Invalid action: ${String(action)}`,
        };
      }

      const fn = agentActions[action];

      if (!fn) {
        return {
          success: false,
          message: `Unknown function: ${action}`,
        };
      }

      // Get the prompt from parameters if available for context filtering
      let prompt = '';
      if (typeof parameters === 'object' && parameters?.prompt) {
        prompt = parameters.prompt;
      } else if (typeof parameters === 'object' && parameters?.query) {
        prompt = parameters.query;
      } else if (typeof parameters === 'object' && parameters?.text) {
        prompt = parameters.text;
      } else if (typeof parameters === 'string') {
        prompt = parameters;
      }

      // Filter context data using string matching algorithms if prompt is available
      if (prompt && typeof window !== 'undefined' && window.__contextData) {
        window.__filteredContextData = findRelevantContext(
          prompt,
          window.__contextData
        );
        console.log('Using filtered context data for efficiency');
      }

      // Execute the function with the provided parameters
      const result = fn(...(parameters || []));

      return {
        success: true,
        message: result || `Action ${action} completed`,
      };
    } catch (error) {
      console.error('Error executing agent action:', error);
      return {
        success: false,
        message: error.message || 'Error executing action',
      };
    }
  };

  // Provide both the agent actions and the execute function
  return (
    <AgentContext.Provider
      value={{ agentActions, executeAction, findRelevantContext }}
    >
      {children}
    </AgentContext.Provider>
  );
}

// Hook for accessing agent context
export function useAgent() {
  return useContext(AgentContext);
}
