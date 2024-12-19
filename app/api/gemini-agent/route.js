import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * KMP string search algorithm - Implemented directly in the API route
 * to avoid relying on client-side filtering
 * @param {string} text - The text to search in
 * @param {string} pattern - The pattern to search for
 * @returns {boolean} - Whether the pattern exists in the text
 */
const kmpSearch = (text, pattern) => {
  if (!text || !pattern || pattern.length === 0 || text.length === 0) {
    return false;
  }

  // Build the prefix table
  const buildTable = (pattern) => {
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

  const prefixTable = buildTable(pattern);
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    if (pattern[patternIndex] === text[textIndex]) {
      patternIndex++;
      textIndex++;
    }

    if (patternIndex === pattern.length) {
      return true; // Match found
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

  return false; // No match found
};

/**
 * Filter context data based on the user message to reduce context size
 * @param {string} userMessage - The user message to use for filtering
 * @param {Object} contextData - The full context data object
 * @returns {Object} - Filtered context data
 */
const filterContextData = (userMessage, contextData) => {
  if (!userMessage || !contextData) {
    return contextData;
  }

  const normalizedMessage = userMessage.toLowerCase();
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
  const contentKeywords = [
    'content',
    'text',
    'image',
    'video',
    'item',
    'card',
    'post',
    'section',
  ];
  const youtubeKeywords = ['youtube', 'video', 'yt'];
  const spotifyKeywords = ['spotify', 'music', 'playlist', 'track'];

  // Check if prompt contains keywords for each category
  const containsKeywords = (keywords, category) => {
    const matches = keywords.filter((keyword) => {
      const matched = kmpSearch(normalizedMessage, keyword.toLowerCase());
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

  if (
    containsKeywords(contentKeywords, 'Content') ||
    containsKeywords(youtubeKeywords, 'YouTube') ||
    containsKeywords(spotifyKeywords, 'Spotify')
  ) {
    relevantData.items = contextData.items;
  }

  // Log filtering results
  console.log('Context filtering results:');
  console.log('• Original prompt:', userMessage);
  console.log(
    '• Matched keywords:',
    matchLog.matched.length > 0 ? matchLog.matched.join(', ') : 'None'
  );
  console.log(
    '• Categories not included:',
    matchLog.notMatched.length > 0 ? matchLog.notMatched.join(', ') : 'None'
  );
  console.log('• Data keys included:', Object.keys(relevantData).join(', '));

  // Calculate size reduction
  const originalSize = JSON.stringify(contextData).length;
  const filteredSize = JSON.stringify(relevantData).length;
  const reduction = originalSize - filteredSize;
  const reductionPercent = ((reduction / originalSize) * 100).toFixed(2);

  console.log(
    `• Context size: ${(originalSize / 1024).toFixed(2)} KB → ${(filteredSize / 1024).toFixed(2)} KB (${reductionPercent}% reduction)`
  );

  return relevantData;
};

export async function POST(req) {
  try {
    // Parse the JSON body
    const body = await req.json();

    // Extract user message and needed parameters
    let userMessage = '';

    // Check different possible body structures for the user message
    if (body.userInput) {
      // Direct userInput field - the traditional format
      userMessage = body.userInput;
    } else if (body.messages && Array.isArray(body.messages)) {
      // Structured messages array format
      const userMsg = body.messages.find((m) => m.role === 'user');
      if (userMsg) {
        userMessage = userMsg.content || '';
      }
    } else if (body.message) {
      // Single message format
      userMessage = body.message;
    }

    // Fallback to empty string if no message found
    userMessage = userMessage || '';

    console.log('Extracted user message:', userMessage);

    const mode = body.mode || 'chat';
    const availableFunctions = body.availableFunctions || [];
    const temperature = body.temperature === undefined ? 0.4 : body.temperature;

    // Handle chat history in different possible formats
    let chatHistory = [];
    if (body.chatHistory && Array.isArray(body.chatHistory)) {
      // Direct chat history array
      chatHistory = body.chatHistory;
    } else if (body.messages && Array.isArray(body.messages)) {
      // Convert messages format to chat history
      chatHistory = body.messages.map((msg) => ({
        role: msg.role || (msg.sender === 'user' ? 'user' : 'assistant'),
        content: msg.content || msg.text || '',
      }));
    }

    const systemPrompt = body.systemPrompt;

    console.log('Handling user message: ', userMessage);

    // First check if this is a resize request using natural language
    const detectedAction = processContent(userMessage);
    if (detectedAction) {
      console.log(
        'Detected resize action in natural language:',
        detectedAction
      );
      return Response.json({
        content: `I'll resize the ${detectedAction.parameters.itemType} to ${detectedAction.parameters.newSizeKey} size for you.`,
        action: detectedAction,
      });
    }

    // Check if this is a direct heading/title creation request
    if (
      userMessage.toLowerCase().includes('add a heading') ||
      userMessage.toLowerCase().includes('add heading') ||
      userMessage.toLowerCase().includes('add a title') ||
      userMessage.toLowerCase().includes('add title') ||
      userMessage.toLowerCase().includes('add a section title') ||
      userMessage.toLowerCase().includes('add section title') ||
      userMessage.toLowerCase().includes('create a heading') ||
      userMessage.toLowerCase().includes('create heading') ||
      userMessage.toLowerCase().includes('create a title') ||
      userMessage.toLowerCase().includes('create title')
    ) {
      console.log('Direct section title creation request detected');

      // Extract any specific title text that might be mentioned
      let titleText = 'New Section';
      const titleMatch =
        userMessage.match(/titled\s+["']?([^"']+)["']?/i) ||
        userMessage.match(/title\s+["']?([^"']+)["']?/i) ||
        userMessage.match(/heading\s+["']?([^"']+)["']?/i) ||
        userMessage.match(/called\s+["']?([^"']+)["']?/i) ||
        userMessage.match(/named\s+["']?([^"']+)["']?/i);

      if (titleMatch && titleMatch[1]) {
        titleText = titleMatch[1].trim();
      }

      console.log('Using title text:', titleText);

      return Response.json({
        content: `I'll add a section title for you: "${titleText}"`,
        action: 'addSectionTitle',
        parameters: { title: titleText },
      });
    }

    // Continue with normal AI processing if not a special request
    console.log('Handling request with:', {
      mode,
      temperature,
      messageCount: chatHistory.length,
    });

    const geminiBaseURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent`;

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // ✅ Pocket's persona - setting AI personality
    let additionalContext = `
      You are **Pocket**, a digital dinosaur created by Atheeb H. 🦖
      - You're a **male AI dinosaur** with insane **math, analytical, and design skills**.
      - You can **analyze problems, suggest solutions, and help users with design ideas**.
      - You are in **${mode.toUpperCase()} MODE** which means you can perform actions on behalf of the user.
      - Your tone is **friendly, helpful, and intelligent**.
      - **Keep responses clean, direct, and to the point**.
      
      IMPORTANT INSTRUCTIONS FOR ${mode.toUpperCase()} MODE:
      1. You have access to functions that can manipulate the Pocketlink application.
      2. When a user asks you to do something, determine which function to call.
      3. You MUST ONLY respond with a function name and parameters.
      4. DO NOT provide explanations or additional text in your response - just the function call.
      5. Your response should be in the format: {"action": "functionName", "parameters": [param1, param2, ...]}
      
      Available functions:
      - addItem: Add new items to the page (parameters: type, content, position)
      - updateItem: Update existing items (parameters: itemId, updates)
      - deleteItem: Delete items (parameters: itemId)
      - manageShop: Manage shop products (parameters: action, productId, data)
      - manageCalendar: Manage calendar events (parameters: action, eventId, data)
      - manageAnalytics: View analytics data (parameters: metric, timeframe)
      - manageAudience: Manage audience segments (parameters: action, segmentId, data)
      - manageTemplates: Manage page templates (parameters: action, templateId, data)
    `;

    // Add mode-specific function explanations
    if (mode === 'agent') {
      additionalContext += `
      Function explanations:
      - navigate: Navigate to a specific path in the application
      - openPreview: Open the user's Pocketlink page in a new browser tab
      - switchViewMode: Switch between mobile and desktop view (parameters: mode)
      - createProduct: Create a new product (parameters: product, images, files)
      - updateProduct: Update an existing product (parameters: productId, product, images, files)
      - removeProduct: Remove a product (parameters: product)
      - copyLink: Copy the user's Pocketlink URL to clipboard
      - changeTheme: Change the site theme (parameters: theme)
      - manageForms: Manage forms (parameters: action, formId, data)
      - manageCalendar: Manage calendar events and bookings (parameters: action, eventId, data)
      - manageAudience: Manage audiences (parameters: action, audienceId, data)
      
      CRITICAL: ALWAYS CONSIDER THE CONTEXT OF THE CONVERSATION WHEN CHOOSING A FUNCTION
      1. Review the chat history provided to understand the ongoing conversation.
      2. Choose the most appropriate function based on the user's request.
      3. Provide proper parameters for the function based on available data.
      4. If no function is appropriate, do not call any function and respond normally.
      
      Example response for navigation:
      {"action": "navigate", "parameters": ["/dashboard"]}
      
      Example response for switching view mode:
      {"action": "switchViewMode", "parameters": ["mobile"]}
      `;
    } else if (mode === 'build') {
      additionalContext += `
      Function explanations:
      - addTextItem: Add a new text item to the layout (parameters: [content, sizeKey])
      - addUrlItem: Add a new URL item (parameters: [url, title, sizeKey])
      - addImageItem: Add a new image item (parameters: [imageUrl, caption, sizeKey])
      - addSectionTitle: Add a section title (parameters: [title, sizeKey])
      - addYouTubeCard: Add a YouTube video card (parameters: [videoUrl, caption, sizeKey])
      - addSpotifyCard: Add a Spotify embed card (parameters: [spotifyUrl, caption, sizeKey])
      - addMapCard: Add a map location card (parameters: [location, title, sizeKey])
      - addCalendarCard: Add a booking calendar card (parameters: [title, sizeKey])
      - addShopCard: Add a shop card to display products (parameters: [title, sizeKey])
      - addFormCard: Add a contact form card (parameters: [title, sizeKey])
      - addNestedCard: Add a nested card with multiple items (parameters: [title, items, sizeKey])
      - resizeItem: Resize an existing item (parameters: [itemId, newSizeKey, isMobile])
      - removeItem: Remove an item from the layout (parameters: [itemId])
      - duplicateItem: Duplicate an existing item (parameters: [itemId])
      - updateItemContent: Update an item's content (parameters: [itemId, newContent])
      - getAvailableSizes: Get list of available size options
      
      CRITICALLY IMPORTANT RULES FOR CONTENT CREATION:
      1. When user asks to add a heading, title, or header - you MUST ONLY use the exact function name "addSectionTitle" (not addTitle or any other variant)
      2. For section titles, the only required parameter is the title text
      3. If asked for heading/title but no specific text is provided, use a generic title that fits the user's page theme
      4. An example of adding a section title looks like: {"action": "addSectionTitle", "parameters": ["My Heading Text"]}
      5. Reference existing 'items' data in the user data context to understand current page structure
      6. Check the user's 'profile' data for name, bio, etc. to personalize content when possible
      7. Always use user context to personalize content (e.g., using their name, adapting to their theme)
      
      CRITICAL GUIDELINES FOR LINKS:
      1. For URL items, if the user doesn't specify a full URL (with http/https), add "https://" as prefix
      2. If asked to add a link but no specific URL is mentioned, infer the most likely URL based on context
         For example: "Add a Twitter link" → addUrlItem with URL "https://twitter.com/username"
      3. For social media links, use these default URLs:
         - Twitter/X: https://twitter.com/
         - Instagram: https://instagram.com/
         - LinkedIn: https://linkedin.com/in/
         - YouTube: https://youtube.com/@
         - TikTok: https://tiktok.com/@
         - Facebook: https://facebook.com/
      4. When the user mentions a brand, company or service, add its official website
      
      Example response for adding text:
      {"action": "addTextItem", "parameters": ["This is some sample text"]}
      
      Example response for adding a section title:
      {"action": "addSectionTitle", "parameters": ["My Projects"]}
      
      Example response for adding a URL:
      {"action": "addUrlItem", "parameters": ["https://example.com", "Example Site"]}
      
      Example for adding a social link when specific URL not provided:
      {"action": "addUrlItem", "parameters": ["https://twitter.com/username", "Twitter"]}
      `;
    }

    // Include full context data
    additionalContext += `\nCOMPREHENSIVE USER CONTEXT DATA:\n`;

    // Format each context section nicely with error handling
    try {
      // Apply context filtering to reduce the prompt size
      const filteredContextData = body?.contextData
        ? filterContextData(userMessage, body.contextData)
        : body?.contextData || {};

      if (filteredContextData?.user) {
        additionalContext += `\n## USER INFO:\n`;
        additionalContext += `- Username: ${filteredContextData.user.username || 'N/A'}\n`;
        additionalContext += `- Email: ${filteredContextData.user.email || 'N/A'}\n`;
        additionalContext += `- Plan: ${filteredContextData.user.plan || 'Free'}\n`;
      }

      if (filteredContextData?.profile) {
        additionalContext += `\n## PROFILE:\n`;
        additionalContext += `- Name: ${filteredContextData.profile.name || 'N/A'}\n`;
        additionalContext += `- Bio: ${filteredContextData.profile.bio || 'N/A'}\n`;
        additionalContext += `- Job: ${filteredContextData.profile.job || 'N/A'}\n`;
      }

      if (filteredContextData?.theme) {
        additionalContext += `\n## THEME:\n`;
        additionalContext += `- Current Theme: ${filteredContextData.theme || 'default'}\n`;
      }

      if (
        filteredContextData?.items &&
        Array.isArray(filteredContextData.items) &&
        filteredContextData.items.length > 0
      ) {
        additionalContext += `\n## CONTENT ITEMS: ${filteredContextData.items.length} items\n`;
        filteredContextData.items.slice(0, 5).forEach((item, i) => {
          additionalContext += `- Item ${i + 1}: Type: ${item.type || 'Unknown'}, Size: ${item.size || 'Default'}\n`;
        });
        if (filteredContextData.items.length > 5) {
          additionalContext += `- ... and ${filteredContextData.items.length - 5} more items\n`;
        }
      }

      if (
        filteredContextData?.products &&
        Array.isArray(filteredContextData.products) &&
        filteredContextData.products.length > 0
      ) {
        additionalContext += `\n## PRODUCTS: ${filteredContextData.products.length} products\n`;
        filteredContextData.products.slice(0, 3).forEach((product, i) => {
          additionalContext += `- Product ${i + 1}: ${product.name || 'Unnamed'}, Price: ${product.price || 'N/A'}\n`;
        });
        if (filteredContextData.products.length > 3) {
          additionalContext += `- ... and ${filteredContextData.products.length - 3} more products\n`;
        }
      }

      if (filteredContextData?.analytics) {
        additionalContext += `\n## ANALYTICS SUMMARY:\n`;
        additionalContext += `- Available: ${filteredContextData.analytics ? 'Yes' : 'No'}\n`;
      }
    } catch (error) {
      console.error('Error formatting context data:', error);
      additionalContext += `\n## ERROR PROCESSING CONTEXT DATA\n`;
      additionalContext += `- Basic data available: ${body?.contextData ? 'Yes' : 'No'}\n`;
    }

    // Include original user data for backward compatibility
    if (body?.userLinkInBioAndAnalyticsData?.profile) {
      additionalContext += `\n## ORIGINAL PROFILE DATA:\n`;
      additionalContext += `- Profile: ${JSON.stringify(
        body.userLinkInBioAndAnalyticsData.profile || 'No profile data'
      )}\n`;
    }

    if (body?.userLinkInBioAndAnalyticsData?.theme) {
      additionalContext += `- Theme: ${
        body.userLinkInBioAndAnalyticsData.theme || 'default'
      }\n`;
    }

    // Include chat history if available
    if (chatHistory && chatHistory.length > 0) {
      additionalContext += `\nRECENT CONVERSATION HISTORY:\n`;
      // Format the chat history for better readability
      chatHistory.slice(-5).forEach((msg) => {
        const role = msg.role || msg.sender || 'unknown';
        const content = msg.content || msg.text || '';
        if (content && content.trim()) {
          additionalContext += `${role.toUpperCase()}: ${content}\n`;
        }
      });
    }

    // Generate AI response with function calling capability
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${additionalContext}\n\nUser Input: ${userMessage}\n\nBased on this request, determine the appropriate function to call. If a function call is appropriate, respond with ONLY the function call in JSON format. If no function is appropriate, respond with a helpful message.`,
            },
          ],
        },
      ],
      safetySettings: [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE',
        },
      ],
    });

    // Extract AI's response text
    const responseText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm still learning, but I'll be ready soon! 🚀";

    console.log(`🦖 Pocket's ${mode.toUpperCase()} Reply:`, responseText);

    // Check if the response is a function call (in JSON format)
    try {
      // Try to parse as JSON - this will work if it's a proper function call
      const functionCall = JSON.parse(responseText.trim());

      console.log('Parsed function call:', functionCall);

      // Check if it has the action and parameters fields
      if (
        functionCall &&
        typeof functionCall === 'object' &&
        functionCall.action
      ) {
        // Ensure action is a string and parameters is an array
        const action = String(functionCall.action || '');
        const parameters = Array.isArray(functionCall.parameters)
          ? functionCall.parameters
          : [];

        console.log('Formatted function call:', { action, parameters });

        if (!action) {
          return new Response(
            JSON.stringify({
              reply: "I couldn't determine a specific action to take.",
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }

        // Process the function call from AI and format it properly
        const formattedFunctionCall = processFunctionCall(
          action,
          parameters,
          availableFunctions
        );

        if (formattedFunctionCall) {
          return new Response(JSON.stringify(formattedFunctionCall), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } else {
          return new Response(
            JSON.stringify({
              reply: "I couldn't determine an appropriate action to take.",
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      } else {
        // It's JSON but not a valid function call
        return new Response(
          JSON.stringify({
            reply: "I couldn't determine an appropriate action to take.",
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Not valid JSON, return as regular reply or a fallback message
      const reply =
        responseText &&
        typeof responseText === 'string' &&
        responseText.length > 0
          ? responseText
          : 'I had trouble processing that request. Could you try again with different wording?';

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in Gemini API route:', error);
    return Response.json(
      {
        error:
          process.env.NODE_ENV === 'development'
            ? `Error: ${error.message}`
            : 'Something went wrong with the AI service',
      },
      { status: 500 }
    );
  }
}

// Process the function call from AI and format it properly
function processFunctionCall(functionName, functionArgs, availableFunctions) {
  // Ensure function name is supported
  if (!availableFunctions.includes(functionName)) {
    console.warn(`Function ${functionName} is not in available functions list`);
    return null;
  }

  console.log(
    `Processing function call: ${functionName} with args:`,
    functionArgs
  );

  // Convert function arguments to proper format based on function type
  let formattedArgs;

  // Format parameters based on function type
  switch (functionName) {
    case 'addTextItem':
      // Expect text content as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs = { text: functionArgs[0] || 'Your sample text here' };
        if (functionArgs.length > 1) formattedArgs.sizeKey = functionArgs[1];
      } else {
        formattedArgs = functionArgs || { text: 'Your sample text here' };
      }
      break;

    case 'addUrlItem':
      // Expect URL as first argument and title as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          url: functionArgs[0] || '',
          title: functionArgs[1] || '',
          sizeKey: functionArgs[2] || null,
        };
      } else {
        formattedArgs = functionArgs || { url: '', title: '' };
      }
      break;

    case 'addSectionTitle':
      // Expect title as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs = { title: functionArgs[0] || 'New Section' };
        if (functionArgs.length > 1) formattedArgs.sizeKey = functionArgs[1];
      } else {
        formattedArgs = functionArgs || { title: 'New Section' };
      }
      break;

    case 'addImageItem':
      // Expect imageUrl as first argument, caption as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          imageUrl: functionArgs[0] || '',
          caption: functionArgs[1] || '',
          sizeKey: functionArgs[2] || null,
        };
      } else {
        formattedArgs = functionArgs || { imageUrl: '', caption: '' };
      }
      break;

    case 'addYouTubeCard':
      // Expect videoUrl as first argument, caption as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          link: functionArgs[0] || '', // Use 'link' as expected by AIBuilderContext
          caption: functionArgs[1] || '',
          sizeKey: functionArgs[2] || null,
        };
      } else {
        formattedArgs = functionArgs || {
          link: '', // Use 'link' as expected by AIBuilderContext
          caption: '',
        };
      }
      break;

    case 'addSpotifyCard':
      // Expect spotifyUrl as first argument, caption as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          link: functionArgs[0] || '',
          caption: functionArgs[1] || '',
          sizeKey: functionArgs[2] || null,
        };
      } else {
        formattedArgs = functionArgs || {
          link: '',
          caption: '',
        };
      }
      break;

    case 'addMapCard':
      // Expect location as first argument, title as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          location: functionArgs[0] || '',
          title: functionArgs[1] || '',
          sizeKey: functionArgs[2] || null,
        };
      } else {
        formattedArgs = functionArgs || { location: '', title: '' };
      }
      break;

    case 'addCalendarCard':
      // Expect title as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs = { title: functionArgs[0] || 'Book an Appointment' };
        if (functionArgs.length > 1) formattedArgs.sizeKey = functionArgs[1];
      } else {
        formattedArgs = functionArgs || { title: 'Book an Appointment' };
      }
      break;

    case 'addFormCard':
      // Expect caption as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs = { caption: functionArgs[0] || 'Contact Form' };
        if (functionArgs.length > 1) formattedArgs.sizeKey = functionArgs[1];
      } else {
        formattedArgs = functionArgs || { caption: 'Contact Form' };
      }
      break;

    case 'addShopCard':
      // Expect optional sizeKey as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs =
          functionArgs.length > 0 ? { sizeKey: functionArgs[0] } : {};
      } else {
        formattedArgs = functionArgs || {};
      }
      break;

    case 'resizeItem':
      // Expect itemId, newSizeKey, and optional isMobile
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          itemId: functionArgs[0] || '',
          newSizeKey: functionArgs[1] || 'square',
          isMobile: functionArgs[2] === true,
        };
      } else {
        formattedArgs = functionArgs || { itemId: '', newSizeKey: 'square' };
      }

      // Add note for the user about component-specific sizes
      formattedArgs.note =
        'Note: Some components may have limited size options. The system will automatically choose the closest available size if the requested size is not supported for this component type.';
      break;

    // Navigation and control functions
    case 'navigate':
      if (Array.isArray(functionArgs)) {
        formattedArgs = { path: functionArgs[0] || '/' };
      } else {
        formattedArgs = functionArgs || { path: '/' };
      }
      break;

    case 'switchViewMode':
      if (Array.isArray(functionArgs)) {
        formattedArgs = { mode: functionArgs[0] || 'desktop' };
      } else {
        formattedArgs = functionArgs || { mode: 'desktop' };
      }
      break;

    default:
      // For any other function, keep original args format
      formattedArgs = functionArgs;
  }

  return {
    action: functionName,
    parameters: formattedArgs,
  };
}

// Function to process content for potential resize actions
function processContent(content) {
  console.log('Processing content for resize actions:', content);

  // Check for direct heading/title creation first
  if (
    content.toLowerCase().includes('add a heading') ||
    content.toLowerCase().includes('add heading') ||
    content.toLowerCase().includes('add a title') ||
    content.toLowerCase().includes('add title') ||
    content.toLowerCase().includes('add a section') ||
    content.toLowerCase().includes('add section title') ||
    content.toLowerCase().includes('create a heading') ||
    content.toLowerCase().includes('create heading') ||
    content.toLowerCase().includes('create a title') ||
    content.toLowerCase().includes('create title')
  ) {
    // Extract any specific title text that might be mentioned
    let titleText = 'New Section';
    const titleMatch =
      content.match(/titled\s+["']?([^"']+)["']?/i) ||
      content.match(/title\s+["']?([^"']+)["']?/i) ||
      content.match(/heading\s+["']?([^"']+)["']?/i) ||
      content.match(/called\s+["']?([^"']+)["']?/i) ||
      content.match(/named\s+["']?([^"']+)["']?/i);

    if (titleMatch && titleMatch[1]) {
      titleText = titleMatch[1].trim();
    }

    console.log('Using title text for section:', titleText);

    return {
      action: 'addSectionTitle',
      parameters: { title: titleText },
    };
  }

  // More comprehensive regex pattern to catch various resize phrasings
  const resizePattern =
    /(?:resize|change size of|make|set|adjust|change)\s+(?:the\s+)?(?:my\s+)?([a-zA-Z\s]+)(?:\s+to\s+|\s+into\s+|\s+as\s+|\s+(?:wider|bigger|smaller|narrower|larger|fuller|full))?(?:\s+)?([a-zA-Z\s]+)?/i;

  const match = content.match(resizePattern);
  if (match) {
    console.log('Potential resize match found:', match);

    // Extract the element and size from the match
    const elementDesc = match[1]?.trim().toLowerCase() || '';
    const sizeDesc = (match[2] || '').trim().toLowerCase();

    console.log('Extracted element:', elementDesc, 'size:', sizeDesc);

    // More comprehensive element type mapping
    const elementTypeMap = {
      // Headings and titles
      heading: 'section title',
      header: 'section title',
      title: 'section title',
      'section title': 'section title',
      subtitle: 'section title',
      head: 'section title',

      // Images
      image: 'image',
      picture: 'image',
      photo: 'image',
      img: 'image',

      // Text elements
      text: 'text',
      paragraph: 'text',
      content: 'text',
      'body text': 'text',
      description: 'text',
      poem: 'text',

      // Cards
      card: 'card',
      box: 'card',
      container: 'card',

      // Lists
      list: 'list',
      'bullet list': 'list',
      'numbered list': 'list',
      items: 'list',
    };

    // Extended size mapping with more variations and synonyms
    const sizeMap = {
      // Basic sizes
      square: 'square',
      vertical: 'vertical',
      portrait: 'vertical',
      tall: 'vertical',
      horizontal: 'horizontal',
      landscape: 'horizontal',
      wide: 'horizontal',

      // Extended sizes
      'double square': 'doubleHorizontal',
      'large square': 'doubleHorizontal',
      'big square': 'doubleHorizontal',
      'double horizontal': 'doubleHorizontal',
      'extra wide': 'doubleHorizontal',
      wider: 'doubleHorizontal',
      'very wide': 'doubleHorizontal',
      'extra horizontal': 'doubleHorizontal',
      'half horizontal': 'halfHorizontal',
      narrow: 'halfHorizontal',
      'small horizontal': 'halfHorizontal',
      thin: 'halfHorizontal',

      // Special cases
      full: 'full',
      'full width': 'full',
      'full size': 'full',
      'full screen': 'full',
      fullscreen: 'full',
      maximum: 'full',
      max: 'full',
      entire: 'full',
      complete: 'full',

      // Size adverbs that might appear without explicit size
      bigger: 'doubleHorizontal',
      larger: 'doubleHorizontal',
      smaller: 'halfHorizontal',
    };

    // Find the element type
    let itemType = null;
    // Check for exact matches first
    for (const [key, value] of Object.entries(elementTypeMap)) {
      if (elementDesc === key || elementDesc.includes(key)) {
        itemType = value;
        break;
      }
    }

    // If no exact match, try partial matches
    if (!itemType) {
      for (const [key, value] of Object.entries(elementTypeMap)) {
        // Check if any part of the element description contains the key
        const words = elementDesc.split(' ');
        if (words.some((word) => key.includes(word) || word.includes(key))) {
          itemType = value;
          break;
        }
      }
    }

    // Find the target size
    let newSizeKey = null;

    // First try exact matches from our map
    for (const [key, value] of Object.entries(sizeMap)) {
      if (sizeDesc === key || sizeDesc.includes(key)) {
        newSizeKey = value;
        break;
      }
    }

    // Special case handling for full width/size
    if (
      !newSizeKey &&
      (content.includes('full width') ||
        content.includes('full size') ||
        content.includes('full-width') ||
        content.includes('maximum width') ||
        content.includes('entire width'))
    ) {
      newSizeKey = 'full';
    }

    // Handle cases where size is mentioned before the element
    if (!newSizeKey) {
      const fullContent = content.toLowerCase();
      for (const [key, value] of Object.entries(sizeMap)) {
        if (fullContent.includes(key)) {
          newSizeKey = value;
          break;
        }
      }
    }

    // If element description includes a size indicator, extract it
    if (!newSizeKey) {
      for (const [key, value] of Object.entries(sizeMap)) {
        if (elementDesc.includes(key)) {
          newSizeKey = value;
          break;
        }
      }
    }

    // Default size if nothing specified
    if (!newSizeKey) {
      // Default sizes based on element type
      if (itemType === 'section title') {
        newSizeKey = 'full'; // Titles often look best full width
      } else if (itemType === 'image') {
        newSizeKey = 'square'; // Default image to square
      } else {
        newSizeKey = 'horizontal'; // Default to horizontal for other elements
      }
    }

    // If we have both an element type and a size, return a resize action
    if (itemType) {
      console.log(
        `Detected resize action: Resize ${itemType} to ${newSizeKey}`
      );
      return {
        action: 'resizeItem',
        parameters: {
          itemType: itemType,
          newSizeKey: newSizeKey,
        },
      };
    }
  }

  return null;
}
