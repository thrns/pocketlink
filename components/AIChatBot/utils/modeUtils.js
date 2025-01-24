// Mode detection utilities

// Additional mode keywords for better detection
export const MODE_KEYWORDS = {
  build: [
    'add',
    'create',
    'insert',
    'put',
    'make',
    'build',
    'design',
    'layout',
    'text',
    'image',
    'video',
    'link',
    'button',
    'section',
    'header',
    'heading',
    'title',
    'youtube',
    'spotify',
    'map',
    'location',
    'calendar',
    'resize',
    'card',
    'content',
    'subtitle',
    'subheading',
    'photo',
    'picture',
    'banner',
    'gallery',
    'icon',
  ],
  agent: [
    'navigate',
    'go to',
    'open',
    'show',
    'preview',
    'view',
    'switch',
    'change',
    'product',
    'copy link',
    'mobile',
    'desktop',
    'mode',
    'shop',
    'analyze',
    'get status',
    'statistics',
    'take me',
    'get analytics',
    'summarize',
    'report',
    'export',
    'refresh',
    'update',
    'check',
    'look up',
    'find',
    'search',
    'list',
    'fetch',
  ],
  chat: [
    'what',
    'how',
    'why',
    'when',
    'where',
    'who',
    'explain',
    'tell me',
    'question',
    'answer',
    'help',
    'analytics',
    'stats',
    'data',
    'info',
    'describe',
    'summarize',
    'elaborate',
    'discuss',
    'detail',
    'advise',
    'suggest',
    'recommend',
    'opinion',
    'thoughts',
    'ideas',
    'advice',
  ],
};

// Keywords to detect section title requests specifically
export const SECTION_TITLE_KEYWORDS = [
  'heading',
  'header',
  'title',
  'section',
  'subtitle',
  'subheading',
];

/**
 * Helper function to determine the AI mode based on user input text
 */
export const detectModeFromInput = (text) => {
  if (!text) return 'chat';

  const lowercaseText = text.toLowerCase();

  // Special case - if asking for a heading/title, ensure we use build mode
  if (
    SECTION_TITLE_KEYWORDS.some((keyword) => lowercaseText.includes(keyword))
  ) {
    console.log('Heading/title keyword detected - using build mode');
    return 'build';
  }

  // Special case for maps and locations
  if (
    (lowercaseText.includes('map') || lowercaseText.includes('location')) &&
    (lowercaseText.includes('add') ||
      lowercaseText.includes('create') ||
      lowercaseText.includes('insert') ||
      lowercaseText.includes('make'))
  ) {
    console.log('Map/location request detected - using build mode');
    return 'build';
  }

  // Count matches for each mode
  const counts = {
    build: 0,
    agent: 0,
    chat: 0,
  };

  Object.keys(MODE_KEYWORDS).forEach((mode) => {
    MODE_KEYWORDS[mode].forEach((keyword) => {
      if (lowercaseText.includes(keyword)) {
        counts[mode] += 1;
      }
    });
  });

  // Find mode with highest count
  const bestMatch = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]; // Sort by count descending

  // Return the mode with most keyword matches, defaulting to chat if tie or no matches
  return bestMatch[1] > 0 ? bestMatch[0] : 'chat';
};
