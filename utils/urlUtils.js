/**
 * Ensures a URL has a proper protocol (http:// or https://)
 * Only adds protocol to URLs that look like external domains
 * @param {string} url - The URL to normalize
 * @returns {string} - The normalized URL with protocol
 */
export function normalizeUrl(url) {
  if (!url || typeof url !== 'string') {
    return '';
  }

  // Trim whitespace
  const trimmedUrl = url.trim();

  // If already has protocol, return as is
  if (trimmedUrl.match(/^https?:\/\//i)) {
    return trimmedUrl;
  }

  // Preserve legitimate relative URLs and other protocols
  if (
    trimmedUrl.startsWith('/') || // Absolute paths: /dashboard
    trimmedUrl.startsWith('#') || // Anchor links: #section
    trimmedUrl.startsWith('?') || // Query strings: ?param=value
    trimmedUrl.startsWith('./') || // Relative paths: ./file
    trimmedUrl.startsWith('../') || // Parent paths: ../parent
    trimmedUrl.includes(':') || // Other protocols: mailto:, tel:, ftp:, data:
    !trimmedUrl.includes('.') // No dots = likely not a domain
  ) {
    return trimmedUrl;
  }

  // If starts with //, add https:
  if (trimmedUrl.startsWith('//')) {
    return `https:${trimmedUrl}`;
  }

  // For URLs that look like domains (contain dots), add https://
  return `https://${trimmedUrl}`;
}

/**
 * Safely opens a URL in a new tab with proper protocol
 * @param {string} url - The URL to open
 * @param {string} target - The target window (default: '_blank')
 */
export function safeWindowOpen(url, target = '_blank') {
  if (!url) return;

  const normalizedUrl = normalizeUrl(url);
  if (normalizedUrl) {
    window.open(normalizedUrl, target);
  }
}
