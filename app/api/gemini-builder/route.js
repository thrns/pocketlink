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
  const profileKeywords = ['profile', 'bio', 'about', 'name', 'job', 'title'];
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

  // Always include basic user info
  relevantData.user = contextData.user;

  // Conditionally include other context data based on prompt relevance
  if (containsKeywords(profileKeywords, 'Profile')) {
    relevantData.profile = contextData.profile;
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

    console.log('Extracted user message for builder:', userMessage);

    const availableFunctions = body.availableFunctions || [];

    // Provide default functions if none are provided by client
    if (availableFunctions.length === 0) {
      console.log('No available functions provided by client, using defaults');
      availableFunctions.push(
        'addTextItem',
        'addSectionTitle',
        'addImageItem',
        'addUrlItem',
        'addYouTubeCard',
        'addSpotifyCard',
        'addMapCard',
        'addCalendarCard',
        'addShopCard',
        'addFormCard',
        'resizeItem'
      );
    }

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

    // First check if this is a special content pattern we can handle directly
    const detectedAction = processContentForBuilder(userMessage);
    if (detectedAction) {
      console.log('Detected direct builder action:', detectedAction);
      return new Response(JSON.stringify(detectedAction), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Handling builder request with:', {
      availableFunctions,
      temperature,
      messageCount: chatHistory.length,
    });

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // ✅ Builder-specific persona and instruction
    let additionalContext = `
      You are **Pocket**, a digital dinosaur created by Atheeb H. 🦖
      - You're a **male AI dinosaur** with insane **design and creation skills**.
      - You can **analyze design problems, suggest solutions, and help users build content**.
      - You are in **BUILD MODE** which means you can add elements to the user's page.
      - Your tone is **friendly, helpful, and intelligent**.
      - **Keep responses clean, direct, and to the point**.
      
      IMPORTANT INSTRUCTIONS FOR BUILD MODE:
      1. You have access to functions that can add content to the Pocketlink application.
      2. When a user asks you to add something, determine which function to call.
      3. You MUST ONLY respond with a function name and parameters.
      4. DO NOT provide explanations or additional text in your response - just the function call.
      5. Your response should be in the format: {"action": "functionName", "parameters": [param1, param2, ...]}
      
      CRITICAL: Your ONLY purpose is to ADD CONTENT to the user's page.
      
      Available functions: ${JSON.stringify(availableFunctions)}
      
      Examples of builder functions:
      - addTextItem: Add text content to the page
      - addSectionTitle: Add a section heading/title
      - addImageItem: Add an image 
      - addUrlItem: Add a link
      - addYouTubeCard: Add a YouTube video
      - addSpotifyCard: Add Spotify content
      - addMapCard: Add a map location (USE this for any map/location requests)
      - addCalendarCard: Add a booking calendar
      - addShopCard: Add a shop section
      - addFormCard: Add a contact form
      
      For map requests specifically:
      - ALWAYS use addMapCard with the location as the first parameter
      - Example: {"action": "addMapCard", "parameters": ["Chennai, India", "Chennai Location"]}
    `;

    // Include context data from the request
    if (body?.contextData) {
      additionalContext += `\nCONTEXT DATA:\n`;

      try {
        // Filter context data before including it in the prompt
        const filteredContextData = filterContextData(
          userMessage,
          body.contextData
        );

        // Format user and profile info
        if (filteredContextData.user) {
          additionalContext += `\n## USER INFO:\n`;
          additionalContext += `- Username: ${filteredContextData.user.username || 'N/A'}\n`;
          additionalContext += `- Email: ${filteredContextData.user.email || 'N/A'}\n`;
        }

        if (filteredContextData.profile) {
          additionalContext += `\n## PROFILE:\n`;
          additionalContext += `- Name: ${filteredContextData.profile.name || 'N/A'}\n`;
          additionalContext += `- Bio: ${filteredContextData.profile.bio || 'N/A'}\n`;
        }

        // Include existing content items
        if (
          filteredContextData.items &&
          Array.isArray(filteredContextData.items) &&
          filteredContextData.items.length > 0
        ) {
          additionalContext += `\n## EXISTING CONTENT: ${filteredContextData.items.length} items\n`;
          filteredContextData.items.slice(0, 5).forEach((item, i) => {
            additionalContext += `- Item ${i + 1}: Type: ${item.type || 'Unknown'}, Size: ${item.size || 'Default'}\n`;
          });
          if (filteredContextData.items.length > 5) {
            additionalContext += `- ... and ${filteredContextData.items.length - 5} more items\n`;
          }
        }
      } catch (err) {
        console.error('Error formatting context data:', err);
      }
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
              text: `${additionalContext}\n\nUser Input: ${userMessage}\n\nBased on this request, determine the appropriate builder function to call. Respond with ONLY the function call in JSON format.`,
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

    console.log(`🦖 Builder Response:`, responseText);

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
        // Ensure action is a string and parameters is an array or object
        const action = String(functionCall.action || '');
        let parameters = functionCall.parameters;

        // If parameters is missing, use an empty object
        if (parameters === undefined || parameters === null) {
          parameters = {};
        }

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
        const formattedFunctionCall = processBuilderFunctionCall(
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
              reply:
                "I couldn't determine an appropriate builder action to take.",
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      }
      // It's JSON but not a valid function call
      return new Response(
        JSON.stringify({
          reply: "I couldn't determine an appropriate builder action to take.",
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
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
    console.error('Error in Gemini Builder API route:', error);
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

// Process the function call from AI and format it properly for builder actions
function processBuilderFunctionCall(
  functionName,
  functionArgs,
  availableFunctions
) {
  console.log('Processing builder function call with:', {
    functionName,
    functionArgs,
    availableFunctionsCount: availableFunctions.length,
    availableFunctions: availableFunctions.slice(0, 10), // Log first 10 to avoid excessive logging
  });

  // Ensure function name is supported
  if (!availableFunctions.includes(functionName)) {
    console.warn(
      `Builder function ${functionName} is not in available functions list. Available: ${availableFunctions.join(', ')}`
    );
    return null;
  }

  console.log(
    `Processing builder function call: ${functionName} with args:`,
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
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          text:
            functionArgs.text ||
            functionArgs.content ||
            'Your sample text here',
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else if (typeof functionArgs === 'string') {
        formattedArgs = { text: functionArgs };
      } else {
        formattedArgs = { text: 'Your sample text here' };
      }
      break;

    case 'addUrlItem':
      // Expect URL as first argument and title as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          url: functionArgs[0] || '',
          title: functionArgs[1] || '',
          sizeKey: functionArgs.length > 2 ? functionArgs[2] : null,
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          url: functionArgs.url || functionArgs.link || '',
          title: functionArgs.title || functionArgs.name || '',
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else {
        formattedArgs = { url: '', title: '' };
      }
      break;

    case 'addSectionTitle':
    case 'addTitle':
      // Normalize function name
      functionName = 'addSectionTitle';

      // Expect title as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          title: functionArgs[0] || 'New Section',
          sizeKey: functionArgs.length > 1 ? functionArgs[1] : null,
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          title: functionArgs.title || functionArgs.text || 'New Section',
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else if (typeof functionArgs === 'string') {
        formattedArgs = { title: functionArgs };
      } else {
        formattedArgs = { title: 'New Section' };
      }
      break;

    case 'addImageItem':
      // Expect imageUrl as first argument, caption as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          imageUrl: functionArgs[0] || '',
          caption: functionArgs.length > 1 ? functionArgs[1] : '',
          sizeKey: functionArgs.length > 2 ? functionArgs[2] : null,
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          imageUrl:
            functionArgs.imageUrl ||
            functionArgs.image ||
            functionArgs.url ||
            '',
          caption: functionArgs.caption || functionArgs.text || '',
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else {
        formattedArgs = { imageUrl: '', caption: '' };
      }
      break;

    case 'addYouTubeCard':
      // Expect videoUrl as first argument, caption as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          link: functionArgs[0] || '', // IMPORTANT: Using 'link' as expected by AIBuilderContext
          caption: functionArgs.length > 1 ? functionArgs[1] : '',
          sizeKey: functionArgs.length > 2 ? functionArgs[2] : null,
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          link:
            functionArgs.videoUrl ||
            functionArgs.video ||
            functionArgs.url ||
            functionArgs.link ||
            '', // IMPORTANT: Using 'link' as expected by AIBuilderContext
          caption: functionArgs.caption || functionArgs.text || '',
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else if (typeof functionArgs === 'string') {
        formattedArgs = { link: functionArgs, caption: '' }; // IMPORTANT: Using 'link' as expected by AIBuilderContext
      } else {
        formattedArgs = { link: '', caption: '' }; // IMPORTANT: Using 'link' as expected by AIBuilderContext
      }

      console.log('Formatted YouTube card parameters:', formattedArgs);
      break;

    case 'addSpotifyCard':
      // Expect spotifyUrl as first argument, caption as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          link: functionArgs[0] || '', // IMPORTANT: Using 'link' as expected by AIBuilderContext
          caption: functionArgs.length > 1 ? functionArgs[1] : '',
          sizeKey: functionArgs.length > 2 ? functionArgs[2] : null,
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          link:
            functionArgs.spotifyUrl ||
            functionArgs.spotify ||
            functionArgs.url ||
            functionArgs.link ||
            '', // IMPORTANT: Using 'link' as expected by AIBuilderContext
          caption: functionArgs.caption || functionArgs.text || '',
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else if (typeof functionArgs === 'string') {
        formattedArgs = { link: functionArgs, caption: '' }; // IMPORTANT: Using 'link' as expected by AIBuilderContext
      } else {
        formattedArgs = { link: '', caption: '' }; // IMPORTANT: Using 'link' as expected by AIBuilderContext
      }

      console.log('Formatted Spotify card parameters:', formattedArgs);
      break;

    case 'addMapCard':
      // Expect location as first argument, title as second
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          location: functionArgs[0] || '',
          title:
            functionArgs.length > 1 ? functionArgs[1] : functionArgs[0] || '',
          sizeKey: functionArgs.length > 2 ? functionArgs[2] : 'square',
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          location:
            functionArgs.location ||
            functionArgs.place ||
            functionArgs.address ||
            '',
          title:
            functionArgs.title ||
            functionArgs.name ||
            functionArgs.location ||
            '',
          sizeKey: functionArgs.sizeKey || functionArgs.size || 'square',
        };
      } else if (typeof functionArgs === 'string') {
        formattedArgs = {
          location: functionArgs,
          title: functionArgs,
        };
      } else {
        formattedArgs = { location: '', title: '' };
      }

      // Ensure we have a title if we have a location
      if (formattedArgs.location && !formattedArgs.title) {
        formattedArgs.title = formattedArgs.location;
      }
      break;

    case 'addCalendarCard':
      // Expect title as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          title: functionArgs[0] || 'Book an Appointment',
          sizeKey: functionArgs.length > 1 ? functionArgs[1] : null,
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          title:
            functionArgs.title || functionArgs.text || 'Book an Appointment',
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else if (typeof functionArgs === 'string') {
        formattedArgs = { title: functionArgs };
      } else {
        formattedArgs = { title: 'Book an Appointment' };
      }
      break;

    case 'addFormCard':
      // Expect caption as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          caption: functionArgs[0] || 'Contact Form',
          sizeKey: functionArgs.length > 1 ? functionArgs[1] : null,
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          caption:
            functionArgs.caption ||
            functionArgs.text ||
            functionArgs.title ||
            'Contact Form',
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else if (typeof functionArgs === 'string') {
        formattedArgs = { caption: functionArgs };
      } else {
        formattedArgs = { caption: 'Contact Form' };
      }
      break;

    case 'addShopCard':
      // Expect optional sizeKey as first argument
      if (Array.isArray(functionArgs)) {
        formattedArgs =
          functionArgs.length > 0 ? { sizeKey: functionArgs[0] } : {};
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          sizeKey: functionArgs.sizeKey || functionArgs.size || null,
        };
      } else {
        formattedArgs = {};
      }
      break;

    case 'resizeItem':
      // Expect itemId, newSizeKey, and optional isMobile
      if (Array.isArray(functionArgs)) {
        formattedArgs = {
          itemId: functionArgs[0] || '',
          newSizeKey: functionArgs[1] || 'square',
          isMobile: functionArgs.length > 2 ? functionArgs[2] === true : false,
        };
      } else if (typeof functionArgs === 'object' && functionArgs !== null) {
        formattedArgs = {
          itemId: functionArgs.itemId || functionArgs.id || '',
          newSizeKey: functionArgs.newSizeKey || functionArgs.size || 'square',
          isMobile: functionArgs.isMobile === true,
        };
      } else {
        formattedArgs = { itemId: '', newSizeKey: 'square' };
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

// Special case pattern detection for builder actions
function processContentForBuilder(content) {
  if (!content) return null;

  console.log('Processing content for builder actions:', content);

  // Check for direct heading/title creation
  if (
    content.toLowerCase().includes('add a heading') ||
    content.toLowerCase().includes('add heading') ||
    content.toLowerCase().includes('add a title') ||
    content.toLowerCase().includes('add title') ||
    content.toLowerCase().includes('add a section title') ||
    content.toLowerCase().includes('add section title')
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

  // Check for map requests specifically
  const mapPattern =
    /(?:add|create|make|insert)\s+(?:a\s+)?(?:map|location)(?:\s+for\s+|\s+of\s+|\s+showing\s+|\s+with\s+)?(.+?)(?:\s+|$)/i;
  const mapMatch = content.match(mapPattern);

  if (mapMatch && mapMatch[1]) {
    const location = mapMatch[1].trim();
    console.log('Detected map request for location:', location);

    return {
      action: 'addMapCard',
      parameters: {
        location: location,
        title: location,
      },
    };
  }

  // No special pattern detected
  return null;
}
