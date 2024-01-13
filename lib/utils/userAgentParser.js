/**
 * Parse user agent string to extract useful information
 * @param {string} userAgent - Raw user agent string
 * @returns {Object} - Parsed user agent info
 */
export function parseUserAgent(userAgent) {
  if (!userAgent || userAgent === 'unknown') {
    return {
      browser: 'Unknown',
      browserVersion: 'Unknown',
      os: 'Unknown',
      osVersion: 'Unknown',
      device: 'Unknown',
      isMobile: false,
      isBot: false,
      raw: userAgent,
    };
  }

  const ua = userAgent.toLowerCase();

  // Detect bots/crawlers
  const botPatterns = [
    'bot',
    'crawler',
    'spider',
    'scraper',
    'curl',
    'wget',
    'postman',
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
  ];

  const isBot = botPatterns.some((pattern) => ua.includes(pattern));

  // Browser detection
  let browser = 'Unknown';
  let browserVersion = 'Unknown';

  if (ua.includes('chrome') && !ua.includes('edg')) {
    browser = 'Chrome';
    const match = ua.match(/chrome\/([\\d.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('firefox')) {
    browser = 'Firefox';
    const match = ua.match(/firefox\/([\\d.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'Safari';
    const match = ua.match(/version\/([\\d.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('edg')) {
    browser = 'Edge';
    const match = ua.match(/edg\/([\\d.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('opera') || ua.includes('opr')) {
    browser = 'Opera';
    const match = ua.match(/(?:opera|opr)\/([\\d.]+)/);
    browserVersion = match ? match[1] : 'Unknown';
  }

  // OS detection
  let os = 'Unknown';
  let osVersion = 'Unknown';

  if (ua.includes('windows nt')) {
    os = 'Windows';
    const match = ua.match(/windows nt ([\\d.]+)/);
    if (match) {
      const version = match[1];
      if (version === '10.0') os = 'Windows 10/11';
      else if (version === '6.3') os = 'Windows 8.1';
      else if (version === '6.2') os = 'Windows 8';
      else if (version === '6.1') os = 'Windows 7';
      else osVersion = version;
    }
  } else if (ua.includes('mac os x') || ua.includes('macos')) {
    os = 'macOS';
    const match = ua.match(/mac os x ([\\d_]+)/);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  } else if (ua.includes('android')) {
    os = 'Android';
    const match = ua.match(/android ([\\d.]+)/);
    osVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('iphone') || ua.includes('ipad')) {
    os = ua.includes('ipad') ? 'iPadOS' : 'iOS';
    const match = ua.match(/os ([\\d_]+)/);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  }

  // Device detection
  let device = 'Desktop';
  const isMobile =
    ua.includes('mobile') || ua.includes('iphone') || ua.includes('android');

  if (ua.includes('ipad')) {
    device = 'Tablet (iPad)';
  } else if (ua.includes('tablet')) {
    device = 'Tablet';
  } else if (isMobile) {
    device = 'Mobile';
  }

  return {
    browser,
    browserVersion,
    os,
    osVersion,
    device,
    isMobile,
    isBot,
    raw: userAgent,
  };
}

/**
 * Get a human-readable summary of the user agent
 * @param {string} userAgent - Raw user agent string
 * @returns {string} - Human-readable summary
 */
export function getUserAgentSummary(userAgent) {
  const parsed = parseUserAgent(userAgent);

  if (parsed.isBot) {
    return `Bot/Crawler (${parsed.browser})`;
  }

  const parts = [];

  if (parsed.browser !== 'Unknown') {
    parts.push(parsed.browser);
    if (parsed.browserVersion !== 'Unknown') {
      parts.push(`v${parsed.browserVersion.split('.')[0]}`);
    }
  }

  if (parsed.os !== 'Unknown') {
    parts.push(`on ${parsed.os}`);
  }

  if (parsed.device !== 'Desktop') {
    parts.push(`(${parsed.device})`);
  }

  return parts.length > 0 ? parts.join(' ') : 'Unknown Client';
}

/**
 * Common user agent analysis queries for your database
 */
export const userAgentQueries = {
  // Get browser distribution
  browserStats: `
    SELECT 
      CASE 
        WHEN user_agent ILIKE '%chrome%' AND user_agent NOT ILIKE '%edg%' THEN 'Chrome'
        WHEN user_agent ILIKE '%firefox%' THEN 'Firefox'
        WHEN user_agent ILIKE '%safari%' AND user_agent NOT ILIKE '%chrome%' THEN 'Safari'
        WHEN user_agent ILIKE '%edg%' THEN 'Edge'
        WHEN user_agent ILIKE '%opera%' OR user_agent ILIKE '%opr%' THEN 'Opera'
        ELSE 'Other'
      END as browser,
      COUNT(*) as download_count
    FROM download_logs 
    WHERE downloaded_at > NOW() - INTERVAL '30 days'
    GROUP BY browser
    ORDER BY download_count DESC;
  `,

  // Detect suspicious bot activity
  botActivity: `
    SELECT customer_email, ip_address, user_agent, COUNT(*) as download_count
    FROM download_logs 
    WHERE user_agent ILIKE ANY (ARRAY['%bot%', '%crawler%', '%spider%', '%curl%', '%wget%'])
    GROUP BY customer_email, ip_address, user_agent
    ORDER BY download_count DESC;
  `,

  // Mobile vs desktop usage
  deviceStats: `
    SELECT 
      CASE 
        WHEN user_agent ILIKE '%mobile%' OR user_agent ILIKE '%iphone%' OR user_agent ILIKE '%android%' THEN 'Mobile'
        WHEN user_agent ILIKE '%ipad%' OR user_agent ILIKE '%tablet%' THEN 'Tablet'
        ELSE 'Desktop'
      END as device_type,
      COUNT(*) as download_count
    FROM download_logs 
    GROUP BY device_type
    ORDER BY download_count DESC;
  `,
};
