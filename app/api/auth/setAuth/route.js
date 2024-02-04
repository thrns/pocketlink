import { NextResponse } from 'next/server';

export async function POST(request) {
  const { accessToken, refreshToken } = await request.json();

  const response = NextResponse.json({ success: true });

  // Set the authCookies in the response headers
  response.cookies.set(
    'authCookies',
    JSON.stringify({ accessToken, refreshToken }),
    {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === 'production', // Only over HTTPS in production
      sameSite: 'strict', // CSRF protection
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
    }
  );

  return response;
}
