// tenantRewriteMiddleware.js
import { NextResponse } from 'next/server';
import { getTenantName } from './getTenantNameMiddleware';

// Simple in-memory cache for tenant lookups
const tenantCache = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export async function tenantRewriteMiddleware(req) {
  try {
    const url = req.nextUrl;
    const { pathname } = url;
    const hostname = req.headers.get('host') || '';

    console.log(`Processing request for ${hostname}${pathname}`);

    if (!hostname) {
      return NextResponse.next();
    }

    // Check if this is a static asset request or API route that shouldn't be rewritten
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/static') ||
      pathname.startsWith('/images') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/favicon') ||
      pathname.includes('.') // Any file with extension (css, js, png, etc.)
    ) {
      return NextResponse.next();
    }

    // Check cache first for better performance
    const cacheKey = `${hostname}:${pathname}`;
    const cachedTenant = tenantCache.get(cacheKey);
    if (cachedTenant) {
      if (cachedTenant.expires > Date.now()) {
        // Call analytics tracking asynchronously without waiting
        try {
          // Only track analytics if tenant exists
          if (cachedTenant.tenant) {
            console.log(`Using cached tenant: ${cachedTenant.tenant}`);
            return NextResponse.rewrite(
              new URL(`/${cachedTenant.tenant}${pathname}`, req.url)
            );
          }
        } catch (error) {
          console.error('Error using cached tenant:', error);
        }
        return NextResponse.next();
      } else {
        // Cache expired, remove it
        tenantCache.delete(cacheKey);
      }
    }

    // Get tenant name if not in cache
    console.log('Tenant not in cache, determining tenant name...');
    let tenant;
    try {
      tenant = await getTenantName(req);
    } catch (error) {
      console.error('Error getting tenant name:', error);
      tenant = null;
    }

    // Cache the result
    tenantCache.set(cacheKey, {
      tenant,
      expires: Date.now() + CACHE_TTL,
    });

    if (!tenant) {
      console.log('No tenant found, skipping rewrite.');
      return NextResponse.next();
    }

    console.log('Detected Tenant:', tenant);

    // Rewrite the request to the tenant-specific path
    console.log(`Rewriting to /${tenant}${pathname}`);

    // Call analytics tracking asynchronously

    return NextResponse.rewrite(new URL(`/${tenant}${pathname}`, req.url));
  } catch (error) {
    console.error('Error in tenantRewriteMiddleware:', error);
    // Always return a response, never throw
    return NextResponse.next();
  }
}
