'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useItems } from './ItemsContext';
import { useRouter } from 'next/navigation';
import { shapePresets, mobileShapePresets } from '@/constants/shapePresets';
import { findRelevantContext } from './AgentContext';

// Create the context
const AIBuilderContext = createContext();

export function AIBuilderProvider({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const itemsFunctions = useItems();
  const { items = [], mobileItems = [] } = itemsFunctions || {};
  const username = user?.username;

  // Create the builder actions object
  const builderActions = useMemo(() => {
    // Destructure needed functions from contexts
    const { addItem, updateItemContent, removeItem, changeItemSize, copyItem } =
      itemsFunctions;

    /**
     * Helper to recommend appropriate size key based on content type
     * @param {string} type - Type of content item
     * @param {object} content - The content object
     * @returns {string} - The recommended sizeKey
     */
    const recommendSizeKey = (type, text = '') => {
      // Default recommendations based on type
      switch (type) {
        case 'image':
          return recommendBasedOnContent(text, [
            'square',
            'vertical',
            'halfHorizontal',
            'horizontal',
          ]);
        case 'url':
          return recommendBasedOnContent(text, [
            'square',
            'vertical',
            'halfHorizontal',
            'horizontal',
          ]);
        case 'formCard':
          return 'vertical';
        case 'text':
          if (text && text.length > 150) return 'doubleHorizontal';
          return 'horizontal';
        case 'section title':
          return 'halfHorizontal';
        case 'nestedCard':
          return 'doubleHorizontal';
        case 'shopCard':
          return 'vertical';
        case 'calendarCard':
          return 'vertical';
        case 'mapCard':
          return 'square';
        case 'youtubeCard':
          return 'doubleHorizontal';
        case 'spotifyCard':
          return 'horizontal';
        case 'driveCard':
          return 'horizontal';
        default:
          return 'square';
      }
    };

    // Return the actions object
    return {
      /**
       * Add a new text item to the layout
       * @param {string|Object} content - The text content or an object with {text, sizeKey}
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addTextItem: (content, sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        let textContent = 'Your sample text here';
        let size = sizeKey;

        // Handle different parameter formats
        if (typeof content === 'object' && content !== null) {
          // Object format: {text, sizeKey}
          textContent = content.text || 'Your sample text here';
          size = content.sizeKey || size;
        } else if (typeof content === 'string') {
          // String format: direct text content
          textContent = content || 'Your sample text here';
        }

        const recommendedSize = size || recommendSizeKey('text', textContent);

        addItem(null, 'text', recommendedSize, {
          text: textContent,
          caption: '',
          background: '',
        });

        return `Added new text item with size ${recommendedSize}`;
      },

      /**
       * Add a new URL item to the layout
       * @param {string} url - The URL to add
       * @param {string} title - Optional title for the URL
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addUrlItem: (url, title = '', sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('url');

        addItem(null, 'url', recommendedSize, {
          url: url,
          title: title || new URL(url).hostname,
          showPreview: true,
          watermark: true,
        });

        return `Added new URL item: ${url}`;
      },

      /**
       * Add a new image item to the layout
       * @param {string} imageUrl - The image URL
       * @param {string} caption - Optional caption for the image
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addImageItem: (imageUrl, caption = '', sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('image');

        addItem(null, 'image', recommendedSize, {
          image: imageUrl,
          caption: caption,
          background: '',
          showMedia: true,
          videoOptions: {
            autoplay: true,
            muted: true,
            showControls: false,
          },
        });

        return `Added new image item with size ${recommendedSize}`;
      },

      /**
       * Add a section title to the layout
       * @param {string} title - The section title text
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addSectionTitle: (title, sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('section title');

        addItem(null, 'section title', recommendedSize, {
          title: title,
          background: '',
        });

        return `Added new section title: ${title}`;
      },

      /**
       * Add a YouTube video card to the layout
       * @param {string} videoUrl - YouTube video URL
       * @param {string} caption - Optional caption
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addYouTubeCard: (videoUrl, caption = '', sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('youtubeCard');

        addItem(null, 'youtubeCard', recommendedSize, {
          link: videoUrl,
          caption: caption,
          background: '',
        });

        return `Added new YouTube card for: ${videoUrl}`;
      },

      /**
       * Add a Spotify card to the layout
       * @param {string} spotifyUrl - Spotify embed URL
       * @param {string} caption - Optional caption
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addSpotifyCard: (spotifyUrl, caption = '', sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('spotifyCard');

        addItem(null, 'spotifyCard', recommendedSize, {
          link: spotifyUrl,
          caption: caption,
          theme: 'dark',
          compactView: false,
          showCaptions: true,
        });

        return `Added new Spotify card for: ${spotifyUrl}`;
      },

      /**
       * Add a Map card to the layout
       * @param {string} location - Location name or address
       * @param {string} title - Optional title
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addMapCard: (location, title = '', sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('mapCard');

        addItem(null, 'mapCard', recommendedSize, {
          location: location,
          mapUrl: '',
          title: title || location,
          mapStyle: 'roadmap',
        });

        return `Added new Map card for location: ${location}`;
      },

      /**
       * Add a Calendar/booking card to the layout
       * @param {string} title - Appointment title
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addCalendarCard: (title, sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('calendarCard');

        addItem(null, 'calendarCard', recommendedSize, {
          title: title,
          duration: '30',
          calendarType: 'popup',
          redirectAfterBooking: false,
        });

        return `Added new Calendar card: ${title}`;
      },

      /**
       * Add a Shop card to the layout
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addShopCard: (sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('shopCard');

        addItem(null, 'shopCard', recommendedSize, {});

        return `Added new Shop card`;
      },

      /**
       * Add a form card to the layout
       * @param {string} caption - Form caption
       * @param {string} sizeKey - Optional size key, will default to recommended
       * @returns {string} - Message about the action taken
       */
      addFormCard: (caption = 'Contact Form', sizeKey = null) => {
        if (!addItem) return 'Add item function not available';

        const recommendedSize = sizeKey || recommendSizeKey('formCard');

        addItem(null, 'formCard', recommendedSize, {
          caption: caption,
          background: '',
          showPreview: false,
          isExternalForm: true,
          externalFormUrl: '',
          image: '',
        });

        return `Added new Form card: ${caption}`;
      },

      /**
       * Get information about available shape presets
       * @param {boolean} isMobile - Whether to get mobile or desktop presets
       * @returns {object} - Shape presets information
       */
      getShapePresets: (isMobile = false) => {
        return isMobile ? mobileShapePresets : shapePresets;
      },

      /**
       * Generate a suggested layout based on content description
       * @param {string} description - Description of the desired layout
       * @returns {string} - Message about the action taken
       */
      generateLayout: (description) => {
        // This would ideally connect to an LLM to generate a complete layout
        // For now we'll return a message
        return `Layout generation based on "${description}" is not yet implemented`;
      },

      /**
       * Resize an item in the layout
       * @param {string} itemId - The ID of the item to resize
       * @param {string} newSizeKey - The new size key to apply
       * @param {boolean} isMobile - Whether to resize in mobile view
       * @returns {string} - Message about the action taken
       */
      resizeItem: (itemId, newSizeKey, isMobile = false) => {
        if (!changeItemSize) return 'Resize function not available';

        // Handle case when items array isn't available
        if (
          (!items || !items.length) &&
          (!mobileItems || !mobileItems.length)
        ) {
          console.error('Items arrays not available for resize operation');
          return `Could not access items data. Please try again.`;
        }

        try {
          // Find the item to determine its type
          const itemsToSearch = isMobile ? mobileItems : items;
          const item = itemsToSearch.find((item) => item.i === itemId);

          if (!item) {
            console.warn(`Could not find item with ID ${itemId}`);

            // Try to resize anyway with the provided size
            changeItemSize(itemId, newSizeKey, isMobile);
            return `Applied ${newSizeKey} size to item${isMobile ? ' in mobile view' : ''}`;
          }

          // Get the available sizes for this component type
          const availableSizes = getAvailableSizesForType(item.type);

          // If the requested size is available for this component, use it
          if (availableSizes.includes(newSizeKey)) {
            changeItemSize(itemId, newSizeKey, isMobile);
            return `Resized item to ${newSizeKey} size${isMobile ? ' in mobile view' : ''}`;
          }

          // If the requested size is not available, find the closest available size
          const closestSize = findClosestSize(newSizeKey, availableSizes);
          changeItemSize(itemId, closestSize, isMobile);
          return `Resized item to ${closestSize} size (closest available)${isMobile ? ' in mobile view' : ''}`;
        } catch (error) {
          console.error('Error during resize operation:', error);

          // Fallback: try to resize with the provided size directly
          try {
            changeItemSize(itemId, newSizeKey, isMobile);
            return `Applied size change${isMobile ? ' in mobile view' : ''}`;
          } catch (fallbackError) {
            return `Could not resize item: ${fallbackError.message || 'unknown error'}`;
          }
        }
      },

      /**
       * Get list of available size options for items
       * @returns {object} - Object containing available size options
       */
      getAvailableSizes: () => {
        return {
          square: 'Square (1x1)',
          horizontal: 'Horizontal Rectangle (2x1)',
          vertical: 'Vertical Rectangle (1x2)',
          doubleHorizontal: 'Double Square (2x2)',
          doubleHorizontal: 'Double Horizontal (4x1)',
          halfHorizontal: 'Half Horizontal (1x0.5)',
        };
      },
    };
  }, [itemsFunctions, username]);

  /**
   * Get available sizes for a specific component type
   * @param {string} componentType - The type of component
   * @returns {Array} - Array of available size keys for the component type
   */
  const getAvailableSizesForType = (componentType) => {
    switch (componentType) {
      case 'youtubeCard':
        return [
          'vertical',
          'horizontal',
          'doubleHorizontal',
          'doubleHorizontal',
        ];
      case 'spotifyCard':
        return ['horizontal', 'doubleHorizontal'];
      case 'driveCard':
        return ['doubleHorizontal', 'doubleHorizontal'];
      case 'section title':
        return ['wider', 'full'];
      case 'shopCard':
      case 'formCard':
      case 'calendarCard':
      case 'mapCard':
        return ['square', 'vertical', 'doubleHorizontal'];
      default:
        // Default for most items: url, image, video, text, etc.
        return [
          'square',
          'vertical',
          'halfHorizontal',
          'horizontal',
          'doubleHorizontal',
          'doubleHorizontal',
        ];
    }
  };

  /**
   * Find the closest available size for a component
   * @param {string} requestedSize - The size key requested
   * @param {Array} availableSizes - Array of available size keys
   * @returns {string} - The closest available size key
   */
  const findClosestSize = (requestedSize, availableSizes) => {
    if (availableSizes.includes(requestedSize)) {
      return requestedSize;
    }

    // Prioritize sizes based on common substitutions
    const sizePriorities = {
      square: ['vertical', 'horizontal', 'doubleHorizontal'],
      vertical: ['square', 'doubleHorizontal', 'horizontal'],
      horizontal: ['halfHorizontal', 'square', 'doubleHorizontal'],
      doubleHorizontal: ['doubleHorizontal', 'vertical', 'horizontal'],
      doubleHorizontal: ['doubleHorizontal', 'horizontal', 'vertical'],
      halfHorizontal: ['horizontal', 'square'],
      wider: ['full', 'horizontal'],
      full: ['wider', 'horizontal'],
    };

    // Try to find a substitute size based on priorities
    const priorities = sizePriorities[requestedSize] || [];

    for (const size of priorities) {
      if (availableSizes.includes(size)) {
        return size;
      }
    }

    // If no priority match, just return the first available size
    return availableSizes[0];
  };

  /**
   * Execute a builder action with proper error handling
   * @param {Object} builderAction - The action object {action, parameters}
   * @returns {Object} Result object with success status and message
   */
  const executeAction = (builderAction) => {
    if (!builderAction) {
      return {
        success: false,
        message: 'No action provided',
      };
    }

    try {
      const { action, parameters } = builderAction;

      // Check if action is defined and exists in builderActions
      if (!action || typeof action !== 'string') {
        return {
          success: false,
          message: `Invalid action: ${String(action)}`,
        };
      }

      const fn = builderActions[action];

      if (!fn) {
        return {
          success: false,
          message: `Unknown function: ${action}`,
        };
      }

      // Extract prompt/text from parameters for context filtering
      let prompt = '';
      if (typeof parameters === 'object' && !Array.isArray(parameters)) {
        prompt =
          parameters.prompt ||
          parameters.text ||
          parameters.content ||
          parameters.query ||
          '';
      } else if (typeof parameters === 'string') {
        prompt = parameters;
      } else if (
        Array.isArray(parameters) &&
        parameters.length > 0 &&
        typeof parameters[0] === 'string'
      ) {
        prompt = parameters[0];
      }

      // Apply context filtering if prompt is available and window.__contextData exists
      if (prompt && typeof window !== 'undefined' && window.__contextData) {
        window.__filteredContextData = findRelevantContext(
          prompt,
          window.__contextData
        );
        console.log('Using filtered context data for builder actions');
      }

      // Special handling for different parameter formats
      let executionResult;

      // For YouTube card, handle parameter formats properly
      if (action === 'addYouTubeCard') {
        if (
          typeof parameters === 'object' &&
          parameters !== null &&
          !Array.isArray(parameters)
        ) {
          // Extract link/url/videoUrl parameter plus other parameters with fallbacks
          const { link, url, videoUrl, video } = parameters;
          const videoLink = link || url || videoUrl || video || '';
          const caption = parameters.caption || parameters.title || '';
          const sizeKey = parameters.sizeKey || parameters.size || null;

          console.log(
            'Executing YouTube card action with formatted parameters:',
            {
              link: videoLink,
              caption: caption,
              sizeKey: sizeKey,
            }
          );

          executionResult = fn(videoLink, caption, sizeKey);
        } else if (Array.isArray(parameters)) {
          executionResult = fn(...parameters);
        } else {
          executionResult = fn(parameters); // Fallback for string input
        }
      }
      // For Spotify card, handle parameter formats properly
      else if (action === 'addSpotifyCard') {
        if (
          typeof parameters === 'object' &&
          parameters !== null &&
          !Array.isArray(parameters)
        ) {
          // Extract link/url/spotifyUrl parameter plus other parameters with fallbacks
          const { link, url, spotifyUrl, spotify } = parameters;
          const spotifyLink = link || url || spotifyUrl || spotify || '';
          const caption = parameters.caption || parameters.title || '';
          const sizeKey = parameters.sizeKey || parameters.size || null;

          console.log(
            'Executing Spotify card action with formatted parameters:',
            {
              link: spotifyLink,
              caption: caption,
              sizeKey: sizeKey,
            }
          );

          executionResult = fn(spotifyLink, caption, sizeKey);
        } else if (Array.isArray(parameters)) {
          executionResult = fn(...parameters);
        } else {
          executionResult = fn(parameters); // Fallback for string input
        }
      }
      // For Map card, handle parameter formats properly
      else if (action === 'addMapCard') {
        if (
          typeof parameters === 'object' &&
          parameters !== null &&
          !Array.isArray(parameters)
        ) {
          // Extract location parameter plus other parameters with fallbacks
          const location =
            parameters.location || parameters.place || parameters.address || '';
          const title = parameters.title || parameters.name || location || '';
          const sizeKey = parameters.sizeKey || parameters.size || null;

          executionResult = fn(location, title, sizeKey);
        } else if (Array.isArray(parameters)) {
          executionResult = fn(...parameters);
        } else {
          executionResult = fn(parameters); // Fallback for string input
        }
      }
      // Handle text items
      else if (action === 'addTextItem') {
        // For text items, we can pass parameters directly if it's an object
        if (
          typeof parameters === 'object' &&
          parameters !== null &&
          !Array.isArray(parameters)
        ) {
          const text =
            parameters.text || parameters.content || 'Your sample text here';
          const sizeKey = parameters.sizeKey || parameters.size || null;

          executionResult = fn(text, sizeKey);
        } else if (Array.isArray(parameters)) {
          // If it's an array, extract the parameters
          executionResult = fn(
            parameters[0],
            parameters.length > 1 ? parameters[1] : null
          );
        } else {
          // Fall back to default value
          executionResult = fn(parameters || 'Your sample text here');
        }
      }
      // Handle image items specially
      else if (action === 'addImageItem') {
        if (
          typeof parameters === 'object' &&
          parameters !== null &&
          !Array.isArray(parameters)
        ) {
          // If we have an object with imageUrl, use it
          const imageUrl =
            parameters.imageUrl || parameters.image || parameters.url || '';
          const caption = parameters.caption || parameters.title || '';
          const sizeKey = parameters.sizeKey || parameters.size || null;

          executionResult = fn(imageUrl, caption, sizeKey);
        } else if (Array.isArray(parameters)) {
          // If array format, extract up to 3 parameters
          executionResult = fn(
            parameters[0] || '',
            parameters.length > 1 ? parameters[1] : '',
            parameters.length > 2 ? parameters[2] : null
          );
        } else {
          // Fall back to empty values
          executionResult = fn(parameters || '', '');
        }
      }
      // Section title handling
      else if (action === 'addSectionTitle' || action === 'addTitle') {
        if (
          typeof parameters === 'object' &&
          parameters !== null &&
          !Array.isArray(parameters)
        ) {
          // Object format
          const title = parameters.title || parameters.text || 'New Section';
          const sizeKey = parameters.sizeKey || parameters.size || null;

          executionResult = fn(title, sizeKey);
        } else if (Array.isArray(parameters)) {
          // Array format
          executionResult = fn(
            parameters[0] || 'New Section',
            parameters.length > 1 ? parameters[1] : null
          );
        } else if (typeof parameters === 'string') {
          // Direct string
          executionResult = fn(parameters || 'New Section');
        } else {
          // Fall back to default
          executionResult = fn('New Section');
        }
      }
      // Handle URL items
      else if (action === 'addUrlItem') {
        if (
          typeof parameters === 'object' &&
          parameters !== null &&
          !Array.isArray(parameters)
        ) {
          const url = parameters.url || parameters.link || '';
          const title = parameters.title || parameters.caption || '';
          const sizeKey = parameters.sizeKey || parameters.size || null;

          executionResult = fn(url, title, sizeKey);
        } else if (Array.isArray(parameters)) {
          executionResult = fn(...parameters);
        } else {
          executionResult = fn(parameters || ''); // Fallback for string input
        }
      }
      // Handle the default case for all other actions
      else {
        // For other actions, pass the parameters as is
        if (Array.isArray(parameters)) {
          // Spread array elements as arguments
          executionResult = fn(...parameters);
        } else if (typeof parameters === 'object' && parameters !== null) {
          // For object parameters, try to spread the values as separate arguments
          // This handles cases where we might have missed specific component types
          const paramValues = Object.values(parameters);
          executionResult = fn(...paramValues);
        } else {
          // Pass the parameter directly
          executionResult = fn(parameters);
        }
      }

      return {
        success: true,
        message: executionResult || `Action ${action} completed`,
      };
    } catch (error) {
      console.error('Error executing builder action:', error);
      return {
        success: false,
        message: error.message || 'Error executing action',
      };
    }
  };

  // Provide both the builder actions and the execute function
  return (
    <AIBuilderContext.Provider value={{ builderActions, executeAction }}>
      {children}
    </AIBuilderContext.Provider>
  );
}

// Hook for accessing builder context
export function useAIBuilder() {
  return useContext(AIBuilderContext);
}
