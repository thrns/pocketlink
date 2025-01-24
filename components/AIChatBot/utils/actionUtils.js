// Action utilities for the AI Chat Bot

import { kmpSearch } from './searchUtils';
import { MODE_KEYWORDS, SECTION_TITLE_KEYWORDS } from './modeUtils';
import { extractUrl, extractContent } from './searchUtils';

/**
 * Get a human-readable name for an action
 * @param {string} action - The action name
 * @returns {string} - The friendly action name
 */
export const getFriendlyActionName = (action) => {
  const actionMap = {
    addSectionTitle: 'Add a section title',
    addTitle: 'Add a section title',
    addTextItem: 'Add text content',
    addUrlItem: 'Add a URL link',
    addImageItem: 'Add an image',
    addYouTubeCard: 'Add a YouTube video',
    addSpotifyCard: 'Add Spotify content',
    addPinterestCard: 'Add Pinterest content',
    addMapCard: 'Add a map location',
    addCalendarCard: 'Add a booking calendar',
    addShopCard: 'Add a shop section',
    addFormCard: 'Add a contact form',
    resizeItem: 'Resize an element',
    navigate: 'Navigate to a page',
    switchViewMode: 'Switch view mode',
    openPreview: 'Open preview',
    copyLink: 'Copy your link',
  };

  return actionMap[action] || action;
};

/**
 * Get a user-friendly description for an action
 * @param {Object|string} action - The action object or string
 * @returns {string} - The friendly action description
 */
export const getFriendlyActionDescription = (action) => {
  if (!action) return 'perform an action';

  // Extract action name from the action object or use the string directly
  let actionName = '';
  let parameters = null;

  try {
    if (typeof action === 'string') {
      actionName = action;
    } else if (typeof action === 'object') {
      // Support multiple formats - either action.action or action.name
      actionName = action.action || action.name || action.function_call || '';

      // Extract parameters with spread operator for flexibility
      if (typeof action.parameters === 'object') {
        parameters = { ...action.parameters };
      } else if (action.args) {
        parameters = { ...action.args };
      } else if (action.arguments) {
        parameters = { ...action.arguments };
      } else if (action.params) {
        parameters = { ...action.params };
      } else if (Array.isArray(action.parameters)) {
        parameters = [...action.parameters];
      } else if (typeof action.parameters === 'string') {
        parameters = action.parameters;
      }
    }

    // Handle various action types with specific descriptions
    if (
      actionName === 'navigate' ||
      actionName?.toLowerCase().includes('navigate')
    ) {
      let destination = '';
      if (parameters && typeof parameters === 'object' && parameters.path) {
        destination = parameters.path;
      } else if (
        parameters &&
        typeof parameters === 'object' &&
        parameters.destination
      ) {
        destination = parameters.destination;
      } else if (
        parameters &&
        typeof parameters === 'object' &&
        parameters.url
      ) {
        destination = parameters.url;
      } else if (Array.isArray(parameters) && parameters.length > 0) {
        destination = String(parameters[0]);
      } else if (typeof parameters === 'string') {
        destination = parameters;
      }

      if (destination) {
        destination = destination.replace(/^\//g, '').replace(/-/g, ' ');
        return `navigate to ${destination}`;
      }
      return 'navigate to another page';
    }
  } catch (error) {
    console.error('Error in getFriendlyActionDescription:', error);
    return 'perform an action';
  }

  // Default case - use the friendly action name
  const friendlyName = getFriendlyActionName(actionName);
  // Ensure we always return a meaningful string
  if (typeof friendlyName === 'string') {
    return friendlyName.toLowerCase();
  } else if (typeof actionName === 'string') {
    return actionName.toLowerCase();
  } else {
    // Last resort fallback
    return 'perform an action';
  }
};

/**
 * Detect a direct action from user input
 * @param {string} input - The user input
 * @returns {Object|null} - Action object or null if no action detected
 */
export const detectDirectAction = (input) => {
  if (!input) return null;
  const lowercaseInput = input.toLowerCase();

  // Define the component map - maps keywords to component types and parameters
  const componentMap = {
    spotify: {
      action: 'addSpotifyCard',
      urlPattern:
        /https?:\/\/(?:open|play)\.spotify\.com\/(track|album|playlist|show|episode)\/([a-zA-Z0-9]+)/i,
      defaultParams: {
        caption: 'Spotify content',
        theme: 'dark',
        link: '', // IMPORTANT: Using 'link' as the expected parameter key
      },
      paramKey: 'link', // IMPORTANT: This must match what's expected in AIBuilderContext
    },
    youtube: {
      action: 'addYouTubeCard',
      urlPattern:
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/i,
      defaultParams: {
        caption: 'YouTube video',
        sizeKey: 'horizontal',
        link: '', // IMPORTANT: Using 'link' as the expected parameter key
      },
      paramKey: 'link', // IMPORTANT: This must match what's expected in AIBuilderContext
    },
    pinterest: {
      action: 'addPinterestCard',
      urlPattern:
        /(?:https?:\/\/)?(?:www\.)?pinterest\.(?:com|ca|co\.uk|fr|de|es|it)\/(?:pin\/|board\/)?([a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)?)/i,
      defaultParams: {
        caption: 'Pinterest content',
        sizeKey: 'horizontal',
        link: '', // IMPORTANT: Using 'link' as the expected parameter key
      },
      paramKey: 'link', // IMPORTANT: This must match what's expected in AIBuilderContext
    },
    map: {
      action: 'addMapCard',
      defaultParams: {
        location: '', // Use 'location' not 'address' to match AIBuilderContext
        title: '',
        caption: 'Location',
      },
      paramKey: 'location',
    },
    text: {
      action: 'addTextItem',
      defaultParams: {
        text: 'Your text content here',
      },
      paramKey: 'text',
    },
    poem: {
      action: 'addTextItem',
      defaultParams: {
        text: 'Roses are red,\nViolets are blue,\nPocket is here,\nTo assist you!',
      },
      paramKey: 'text',
    },
    heading: {
      action: 'addSectionTitle',
      defaultParams: {
        title: 'New Section',
      },
      paramKey: 'title',
    },
    title: {
      action: 'addSectionTitle',
      defaultParams: {
        title: 'New Section',
      },
      paramKey: 'title',
    },
  };

  // Check for add/create action keywords
  const isAddRequest =
    lowercaseInput.includes('add') || lowercaseInput.includes('create');
  if (!isAddRequest) return null;

  // Check each component type
  for (const [keyword, config] of Object.entries(componentMap)) {
    if (lowercaseInput.includes(keyword)) {
      // Start with the default parameters
      const parameters = { ...config.defaultParams };

      // Handle URL-based components
      if (config.urlPattern) {
        const url = extractUrl(input, config.urlPattern);

        // If we need a URL but didn't find one, return null
        if (!url) {
          console.log(`No ${keyword} URL found in the input`);
          return null;
        }

        // Simply update the link parameter using the paramKey
        parameters[config.paramKey] = url;

        // For debugging
        console.log(`Detected ${keyword} URL:`, url);
        console.log(`Created action parameters:`, parameters);
      }
      // Handle text-based components
      else {
        const content = extractContent(input, keyword);
        if (content) {
          parameters[config.paramKey] = content;
        }

        // For debugging
        console.log(`Detected ${keyword} content:`, content);
        console.log(`Created action parameters:`, parameters);
      }

      return {
        action: config.action,
        parameters: parameters,
      };
    }
  }

  return null;
};

/**
 * Safely get a description for an action
 * @param {Object|string} action - The action object or string
 * @returns {string} - A safe action description
 */
export const safeGetActionDescription = (action) => {
  if (!action) return 'add content to your page';

  try {
    // Extract action and parameters with spread operator
    let actionName = '';
    let parameters = {};

    if (typeof action === 'string') {
      actionName = action;
    } else if (typeof action === 'object') {
      actionName = action.action || action.name || action.function_call || '';

      // Extract parameters with spread operator for flexibility
      if (typeof action.parameters === 'object') {
        parameters = { ...action.parameters };
      } else if (action.args) {
        parameters = { ...action.args };
      } else if (action.arguments) {
        parameters = { ...action.arguments };
      } else if (action.params) {
        parameters = { ...action.params };
      } else if (Array.isArray(action.parameters)) {
        parameters = [...action.parameters];
      } else if (typeof action.parameters === 'string') {
        parameters = action.parameters;
      }
    }

    // Special case for heading/title detection from user input
    if (
      typeof action === 'object' &&
      (actionName?.toLowerCase()?.includes('heading') ||
        actionName?.toLowerCase()?.includes('title') ||
        actionName === 'addSectionTitle' ||
        actionName === 'addTitle')
    ) {
      // Try to extract title from parameters
      let titleText = '';
      if (typeof parameters === 'object' && parameters?.title) {
        titleText = parameters.title;
      } else if (typeof parameters === 'object' && parameters?.text) {
        titleText = parameters.text;
      } else if (Array.isArray(parameters) && parameters.length > 0) {
        titleText = String(parameters[0]);
      } else if (typeof parameters === 'string') {
        titleText = parameters;
      }

      if (titleText) {
        return `add a heading: "${titleText}"`;
      } else {
        return 'add a heading to your page';
      }
    }

    // For other actions, use the standard description
    const description = getFriendlyActionDescription(action);
    return typeof description === 'string'
      ? description
      : 'add content to your page';
  } catch (error) {
    console.error('Error getting safe action description:', error);
    return 'add content to your page';
  }
};
