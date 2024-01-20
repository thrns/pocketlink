// getTenantNameMiddleware.js

// Cache for custom domain lookups to reduce API calls
const domainCache = new Map();
const DOMAIN_CACHE_TTL = 1000 * 60 * 30; // 30 minutes

export async function getTenantName(req) {
  try {
    const hostname = req.headers.get('host') || '';
    console.log('Processing hostname:', hostname);

    // Remove port number if present for consistent caching
    const cleanHostname = hostname.split(':')[0];

    // Special handling for local development
    if (cleanHostname.includes('localhost')) {
      // Handle both localhost:3000 and subdomain.localhost:3000
      const parts = cleanHostname.split('.');
      if (parts.length >= 2) {
        // For atheeb.localhost:3000, return "atheeb"
        const possibleTenant = parts[0];
        if (possibleTenant !== 'localhost' && possibleTenant !== 'www') {
          console.log('Local development subdomain detected:', possibleTenant);
          return possibleTenant;
        }
      }
      console.log('Regular localhost detected, no tenant');
      return null;
    }

    // Handle pocketlink.co domains
    if (
      cleanHostname === 'pocketlink.co' ||
      cleanHostname === 'www.pocketlink.co'
    ) {
      console.log('Main domain detected, no tenant');
      return null;
    }

    // Split hostname into parts for subdomain check
    const hostnameParts = cleanHostname.split('.');

    // Check if it's a tenant subdomain (e.g., tenant.pocketlink.co)
    const isTenantSubdomain =
      hostnameParts.length > 1 &&
      hostnameParts[hostnameParts.length - 2] === 'pocketlink' &&
      hostnameParts[hostnameParts.length - 1] === 'co';

    console.log('Is tenant subdomain:', isTenantSubdomain);

    if (isTenantSubdomain) {
      const tenant = hostnameParts[0];
      // Ignore www as a tenant
      if (tenant === 'www') {
        console.log('WWW subdomain detected, treating as main domain');
        return null;
      }
      console.log('Tenant subdomain detected:', tenant);
      return tenant;
    }

    // Handle custom domains
    // Skip API call for local development to reduce errors
    if (!cleanHostname.includes('localhost')) {
      // Check cache first to reduce API calls
      const cachedDomain = domainCache.get(cleanHostname);
      if (cachedDomain && cachedDomain.expires > Date.now()) {
        console.log(
          `Using cached domain tenant: ${cachedDomain.tenant || 'none'} (verified: ${cachedDomain.verified})`
        );
        // Only return cached tenant if domain is verified
        return cachedDomain.verified ? cachedDomain.tenant : null;
      }

      try {
        console.log('Checking for custom domain tenant...');

        // Use proper AbortController for timeout in Edge environment
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // Increased timeout for Cloudflare checks

        const res = await fetch(
          `https://pocketlink.co/api/getCustomDomainTenant`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              hostname: cleanHostname,
              checkCloudflareStatus: true, // Request Cloudflare verification status
            }),
            signal: controller.signal,
          }
        );

        // Clear the timeout
        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }

        const data = await res.json();

        // Enhanced caching with verification status
        const isVerified =
          data.cloudflare_verification_status === 'active' &&
          data.cloudflare_ssl_status === 'active';

        // Cache the result with verification status
        domainCache.set(cleanHostname, {
          tenant: data.tenant || null,
          verified: isVerified,
          cloudflareStatus: {
            verification: data.cloudflare_verification_status,
            ssl: data.cloudflare_ssl_status,
          },
          expires: Date.now() + (isVerified ? DOMAIN_CACHE_TTL : 60 * 1000), // Cache verified domains longer
        });

        if (data.tenant && isVerified) {
          console.log('✅ Verified custom domain tenant found:', data.tenant);
          return data.tenant;
        } else if (data.tenant && !isVerified) {
          console.log('⚠️ Custom domain found but not fully verified:', {
            tenant: data.tenant,
            verification: data.cloudflare_verification_status,
            ssl: data.cloudflare_ssl_status,
          });
          return null; // Don't serve unverified domains
        } else {
          console.log('❌ No tenant found for custom domain.');
          return null;
        }
      } catch (error) {
        // Cache failed attempts to prevent repeated API calls
        domainCache.set(cleanHostname, {
          tenant: null,
          verified: false,
          expires: Date.now() + 60 * 1000, // Only cache errors for 1 minute
        });

        console.error('🔥 Error fetching tenant via API:', error.message);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getTenantName:', error);
    return null; // Fail gracefully
  }
}