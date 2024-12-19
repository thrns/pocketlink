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
  const themeKeywords = [
    'theme',
    'style',
    'color',
    'appearance',
    'look',
    'design',
  ];
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
  const analyticsKeywords = [
    'analytics',
    'stats',
    'statistics',
    'visitors',
    'views',
    'traffic',
    'data',
    'referrer',
    'device',
  ];

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

  // Conditionally include context data based on prompt relevance
  if (containsKeywords(profileKeywords, 'Profile')) {
    relevantData.profile = contextData.profile;
  }

  if (containsKeywords(themeKeywords, 'Theme')) {
    relevantData.theme = contextData.theme;
  }

  if (containsKeywords(contentKeywords, 'Content')) {
    relevantData.items = contextData.items;
  }

  if (containsKeywords(analyticsKeywords, 'Analytics')) {
    relevantData.analytics = contextData.analytics;
    relevantData.dailyStats = contextData.dailyStats;
    relevantData.deviceDistribution = contextData.deviceDistribution;
    relevantData.referrers = contextData.referrers;
    relevantData.topCountries = contextData.topCountries;
    relevantData.overview = contextData.overview;
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

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userInput,
      userLinkInBioAndAnalyticsData,
      chatHistory,
      enhancedFormatting,
    } = body;

    if (!userInput) {
      return new Response(
        JSON.stringify({ error: 'User input is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Filter context data to reduce prompt size
    const filteredUserData = userLinkInBioAndAnalyticsData
      ? filterContextData(userInput, userLinkInBioAndAnalyticsData)
      : userLinkInBioAndAnalyticsData;

    console.log('filteredUserData: ', filteredUserData.analyticsData);

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // ✅ Pocket's persona - setting AI personality
    let additionalContext = `
      You are **Pocket**, a digital dinosaur created by Atheeb H. 🦖
      - You're a **male AI dinosaur** with insane **math, analytical, and design skills**.
      - You can **analyze problems, suggest solutions, and help users with design ideas**.
      - Your tone is **friendly, helpful, smart, and intelligent**.
      - **Keep responses clean, direct, and to the point**. Only provide **additional details if explicitly asked**.
      
      CORE INSTRUCTIONS:
      - You are an intelligent data analyst assistant
      - Your goal is to provide actionable insights without exposing raw data structures
      - Prioritize user privacy and data protection
      - Deliver concise, meaningful analysis

      ### Practical Application Notes
      1. Replace direct data references with semantic, generalized descriptions
      2. Use statistical techniques to provide insights without exposing raw data
      3. Implement role-based access and dynamic context generation
      4. Create a flexible, adaptive analysis framework

      ## Recommended Implementation Steps
      1. Develop a robust data anonymization layer
      2. Create abstract mapping between raw data and insight generation
      3. Implement flexible, context-aware response generation
      4. Build a comprehensive recommendation engine
      
      PROHIBITED ACTIONS:
      - Never reveal exact visitor counts
      - Do not expose geographic or device-specific granular details
      - Avoid direct quotation of source data
      - Prevent reconstruction of original data structure



      IMPORTANT INSTRUCTIONS FOR DATA USAGE:
      1. When users ask questions about themselves or their profile, ALWAYS check the userLinkInBioAndAnalyticsData object.
      2. For profile information: reference userLinkInBioAndAnalyticsData.profile
      3. For theme settings: reference userLinkInBioAndAnalyticsData.theme
      4. For user interests: reference userLinkInBioAndAnalyticsData.items array
      5. For analytics or analysis of data: reference userLinkInBioAndAnalyticsData.analytics object
      6. For link in bio questions: userLinkInBioAndAnalyticsData.items array, userLinkInBioAndAnalyticsData.theme, and userLinkInBioAndAnalyticsData.profile are relevant.
      
      CRITICAL: ALWAYS CONSIDER THE CONTEXT OF THE CONVERSATION WHEN ANSWERING QUESTIONS
      1. Review the chat history provided to understand the ongoing conversation.
      2. Maintain continuity by referencing previous discussions when appropriate.
      3. If a user question seems ambiguous, check the chat history for clarifying context.
      4. Answer follow-up questions with awareness of the previous conversation.
      
      If the user asks something you don't know, FIRST check if the answer might be in their userLinkInBioAndAnalyticsData or chat history before saying you don't have the information.
      
      Example: If they ask "How many visitors did I get last week?" - check userLinkInBioAndAnalyticsData.analytics for that information.

      RECOMMENDATION ENGINE:
      - Generate 3-5 strategic recommendations
      - Base suggestions on detected patterns
      - Provide actionable, forward-looking advice
      - Use probabilistic language to indicate confidence levels

    `;

    // 🔹 Include user profile & theme details with clear labeling
    additionalContext += `\nAVAILABLE USER DATA:\n`;
    additionalContext += `- User Profile: ${JSON.stringify(
      filteredUserData?.profile || 'No profile data'
    )}\n`;
    additionalContext += `- Theme: ${filteredUserData?.theme || 'default'}\n`;

    if (filteredUserData?.items?.length > 0) {
      additionalContext += `- User Interests: ${filteredUserData.items.join(
        ', '
      )}\n`;
    }

    // Modified analytics data handling to ensure all properties are accessible
    if (filteredUserData) {
      // Check for analytics data in different possible locations
      const analyticsData = filteredUserData.analytics || filteredUserData;

      // Add daily stats if available
      if (analyticsData.dailyStats) {
        additionalContext += `- Daily Stats Available: true\n`;
        additionalContext += `- Daily Stats Sample: ${JSON.stringify(
          Object.keys(analyticsData.dailyStats)
            .slice(0, 3)
            .reduce((obj, key) => {
              obj[key] = analyticsData.dailyStats[key];
              return obj;
            }, {})
        )}\n`;
      }

      // Add other analytics data if available
      if (analyticsData.deviceDistribution) {
        additionalContext += `- Device Distribution: ${JSON.stringify(
          analyticsData.deviceDistribution
        )}\n`;
      }

      if (analyticsData.overview) {
        additionalContext += `- Overview: ${JSON.stringify(
          analyticsData.overview
        )}\n`;
      }

      if (analyticsData.referrers) {
        additionalContext += `- Top Referrers: ${JSON.stringify(
          Object.keys(analyticsData.referrers)
            .slice(0, 5)
            .reduce((obj, key) => {
              obj[key] = analyticsData.referrers[key];
              return obj;
            }, {})
        )}\n`;
      }

      if (analyticsData.topCountries) {
        additionalContext += `- Top Countries: ${JSON.stringify(
          Object.keys(analyticsData.topCountries)
            .slice(0, 5)
            .reduce((obj, key) => {
              obj[key] = analyticsData.topCountries[key];
              return obj;
            }, {})
        )}\n`;
      }
    }

    // Add formatting capabilities information if enhanced formatting is requested
    if (enhancedFormatting) {
      additionalContext += `
  You can now use Markdown formatting in your responses. Additionally, you can create data visualizations by embedding chart data in your response using the following format:
  
  {{CHART:{"type":"line|bar|pie|scatter|radar|area|composed","title":"Chart Title","data":[...],"xKey":"date","yKey":"value|[array of keys for multiple series]","colors":["#8884d8","#82ca9d"]}}}
  
  CHART TYPES & CONFIGURATIONS:
  
  1. LINE CHARTS - Best for time series data and trends:
     {{CHART:{"type":"line","title":"Daily Visits","data":[{"date":"2023-01-01","visits":150}],"xKey":"date","yKey":"visits","colors":["#8884d8"],"showGrid":true}}}
  
  2. BAR CHARTS - Best for comparing categories:
     {{CHART:{"type":"bar","title":"Traffic Sources","subtitle":"Top 5 referrers","data":[{"source":"Instagram","visits":350}],"xKey":"source","yKey":"visits","colors":["#8884d8","#82ca9d"],"stacked":false}}}
  
  3. PIE CHARTS - Best for showing proportions:
     {{CHART:{"type":"pie","title":"Device Distribution","data":[{"name":"Desktop","value":65}],"nameKey":"name","dataKey":"value","colors":["#0088FE","#00C49F","#FFBB28"]}}}
  
  4. SCATTER PLOTS - Best for correlation analysis:
     {{CHART:{"type":"scatter","title":"Link Clicks vs Time Spent","data":[{"clicks":10,"timeSpent":120}],"xKey":"clicks","yKey":"timeSpent"}}}
  
  5. RADAR CHARTS - Best for multivariate data:
     {{CHART:{"type":"radar","title":"Performance Metrics","data":[{"metric":"Engagement","value":80}],"xKey":"metric","yKey":"value"}}}
  
  6. AREA CHARTS - Best for cumulative totals over time:
     {{CHART:{"type":"area","title":"Cumulative Views","data":[{"date":"2023-01-01","views":150}],"xKey":"date","yKey":"views"}}}
  
  7. RING CHARTS - Modified pie chart with inner radius:
     {{CHART:{"type":"pie","title":"Visitor Types","innerRadius":60,"outerRadius":100,"data":[{"name":"New","value":65}],"nameKey":"name","dataKey":"value"}}}
  
  DATA SOURCES FOR COMMON CHARTS:
  
  1. Traffic Over Time (Line/Area Chart):
     - Data: userLinkInBioAndAnalyticsData.dailyStats
     - Transform: Convert object to array with date keys
  
  2. Traffic Sources (Bar Chart):
     - Data: userLinkInBioAndAnalyticsData.referrers
     - Transform: Convert to array of {source, visits} objects, sort by visits
  
  3. Visitor Countries (Bar/Pie Chart):
     - Data: userLinkInBioAndAnalyticsData.topCountries
     - Transform: Convert to array of {country, visits} objects
  
  4. Device Distribution (Pie/Ring Chart):
     - Data: userLinkInBioAndAnalyticsData.deviceDistribution
     - Transform: Convert to array of {name, value} objects
  
  5. Link Click Analysis (Bar Chart):
     - Data: userLinkInBioAndAnalyticsData.items
     - Transform: Extract click data for each link
  
  STYLING OPTIONS:
  
  - colors: Array of color hex codes (["#8884d8", "#82ca9d", "#ffc658"])
  - theme: "light" or "dark"
  - showGrid: true or false
  - stacked: true or false (for bar/area charts with multiple series)
  - aspectRatio: 16/9, 4/3, 1 (square), etc.
  - showLegend: true or false
  - showTooltip: true or false
  - animationDuration: milliseconds (default 500)
  - margin: {"top":20,"right":30,"bottom":20,"left":30}
  
  When asked to create a chart or visualization, ALWAYS check for the appropriate data source first and transform it into the correct format for the chart type. Format your data objects correctly based on the chart type requirements.
  
  BEST PRACTICES:
  
  1. For data transformations, convert object data to arrays when needed
  2. For time series, ensure dates are sorted chronologically
  3. For bar charts, limit to top 5-10 items and sort by value
  4. For pie charts, combine small segments into "Other" category
  5. Always provide clear titles, labels, and brief explanations
  `;
    }
    // Include chat history if available
    if (chatHistory) {
      additionalContext += `\nRECENT CONVERSATION HISTORY:\n${chatHistory}\n`;
    }

    // Generate AI response with explicit instruction to reference data and context
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${additionalContext}\n\nUser Input: ${userInput}\n\n
IMPORTANT: The analytics data IS AVAILABLE to you. The data has been provided in the userLinkInBioAndAnalyticsData object.

When asked about analytics or to create charts:
1. DO NOT say the data is unavailable - you have access to all this data in userLinkInBioAndAnalyticsData
2. Use the data that has been provided to you in the context above
3. Transform the data appropriately for visualizations as needed
4. For daily stats, use userLinkInBioAndAnalyticsData.dailyStats
5. For device distribution, use userLinkInBioAndAnalyticsData.deviceDistribution 
6. For referrers, use userLinkInBioAndAnalyticsData.referrers
7. For countries, use userLinkInBioAndAnalyticsData.topCountries
8. For overview stats, use userLinkInBioAndAnalyticsData.overview

Remember to check the conversation history for context first, then check the userLinkInBioAndAnalyticsData before saying you don't know something. Provide answers based on the available data and previous conversation context whenever possible.

When asked to create charts or visualizations, always use the available data in userLinkInBioAndAnalyticsData. Transform the data appropriately for the chart type requested:
              
- For referrer data: Convert userLinkInBioAndAnalyticsData.referrers object to an array of {source, visits} objects
- For country data: Convert userLinkInBioAndAnalyticsData.topCountries to an array of {country, visits} objects
- For daily stats: Convert userLinkInBioAndAnalyticsData.dailyStats dates and visits to a chronological array
- For device data: Convert userLinkInBioAndAnalyticsData.deviceDistribution to a suitable format for pie/ring charts
- For link clicks: Extract relevant metrics from userLinkInBioAndAnalyticsData.items

NEVER say you don't have data if userLinkInBioAndAnalyticsData contains relevant information. Use the appropriate chart type for the data being visualized.`,
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

    console.log("🦖 Pocket's Reply:", responseText);

    return new Response(JSON.stringify({ reply: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in Gemini API:', error);
    return new Response(
      JSON.stringify({ error: "Sorry, I couldn't process that request." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
