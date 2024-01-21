// middleware.js
import { NextResponse } from 'next/server';
import { tenantRewriteMiddleware } from './middlewares/tenantRewriteMiddleware';
import { updateSession } from './Clients/supabase/middleware';

export default async function middleware(req) {
  try {
    const { pathname } = req.nextUrl;
    const origin = req.headers.get('origin') || '*';

    // =================== Handle CORS for API routes =================== //
    if (pathname.startsWith('/api')) {
      const headers = new Headers();
      headers.set('Access-Control-Allow-Origin', origin);
      headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      );
      headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      );
      headers.set('Access-Control-Allow-Credentials', 'true');

      if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
      }

      const response = NextResponse.next();
      headers.forEach((value, key) => response.headers.set(key, value));
      return response;
    }

    // =================== PROTECT /dashboard and /onboarding routes =================== //
    try {
      const authResponse = await updateSession(req);

      if (authResponse.status === 307) {
        return authResponse;
      }
    } catch (authError) {
      console.error('Auth middleware error:', authError);
      // Continue without auth rather than failing completely
    }

    // =================== Run tenant rewrite logic =================== //
    try {
      const tenantResponse = await tenantRewriteMiddleware(req);
      if (tenantResponse) {
        return tenantResponse;
      }
    } catch (tenantError) {
      console.error('Tenant middleware error:', tenantError);
      // Continue without tenant rewriting rather than failing
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Global middleware error:', error);
    // Return a regular response instead of crashing
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
