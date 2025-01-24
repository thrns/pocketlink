// Search and pattern matching utilities

/**
 * Build a KMP table for pattern matching
 * @param {string} pattern - The pattern to build the table for
 * @returns {Array} - The KMP table
 */
export const buildKMPTable = (pattern) => {
  const table = [0];
  let i = 1;
  let j = 0;

  while (i < pattern.length) {
    if (pattern[i] === pattern[j]) {
      table[i] = j + 1;
      i++;
      j++;
    } else if (j > 0) {
      j = table[j - 1];
    } else {
      table[i] = 0;
      i++;
    }
  }

  return table;
};

/**
 * KMP search algorithm for pattern matching
 * @param {string} text - The text to search in
 * @param {string} pattern - The pattern to search for
 * @returns {Array} - Array of match positions
 */
export const kmpSearch = (text, pattern) => {
  if (pattern.length === 0) return [];

  const table = buildKMPTable(pattern);
  const matches = [];

  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;

      if (j === pattern.length) {
        matches.push(i - j);
        j = table[j - 1];
      }
    } else if (j > 0) {
      j = table[j - 1];
    } else {
      i++;
    }
  }

  return matches;
};

/**
 * Extract URL from input text
 * @param {string} input - The input text
 * @param {RegExp} pattern - Regular expression pattern to match URL
 * @returns {string|null} - Extracted URL or null if not found
 */
export const extractUrl = (input, pattern) => {
  // First check for standard URL
  const urlMatch = input.match(pattern);

  // Also check for URLs that might be stuck to text (like "add a spotify cardhttps://...")
  const stuckUrlMatch =
    !urlMatch &&
    input.match(
      new RegExp(
        `${pattern.source.replace(/^https?/i, '(?:card)?(?:\\s+)?https?')}`,
        'i'
      )
    );

  // Extract just the URL part if it's stuck to text
  const extractedUrl =
    stuckUrlMatch && stuckUrlMatch[0].match(/https?:\/\/[^\s]+/i);

  // Return whichever match we found
  return urlMatch ? urlMatch[0] : extractedUrl ? extractedUrl[0] : null;
};

/**
 * Extract content from input text based on keyword
 * @param {string} input - The input text
 * @param {string} keyword - The keyword to extract content around
 * @returns {string} - Extracted content
 */
export const extractContent = (input, keyword) => {
  // Remove the triggering phrases to extract just the content
  const content = input
    .replace(
      new RegExp(
        `(?:add|create)(?:\\s+a)?(?:\\s+)(?:${keyword})(?:\\s+)(?:saying|that\\s+says|called|named|titled)?(?:\\s+)`,
        'i'
      ),
      ''
    )
    .trim();

  return content;
};

// Export all search utilities
export default {
  buildKMPTable,
  kmpSearch,
  extractUrl,
  extractContent,
};
