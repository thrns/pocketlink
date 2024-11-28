import { NextResponse } from 'next/server';

export async function GET(request) {
  const headers = {};

  // Collect all headers
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // Extract location-related headers specifically
  const locationHeaders = {
    // Cloudflare
    'cf-ipcountry': request.headers.get('cf-ipcountry'),
    'cf-ipcity': request.headers.get('cf-ipcity'),
    'cf-region-code': request.headers.get('cf-region-code'),
    'cf-timezone': request.headers.get('cf-timezone'),
    'cf-latitude': request.headers.get('cf-latitude'),
    'cf-longitude': request.headers.get('cf-longitude'),
    'cf-connecting-ip': request.headers.get('cf-connecting-ip'),

    // Vercel
    'x-vercel-ip-country': request.headers.get('x-vercel-ip-country'),
    'x-vercel-ip-country-region': request.headers.get(
      'x-vercel-ip-country-region'
    ),
    'x-vercel-ip-city': request.headers.get('x-vercel-ip-city'),
    'x-vercel-ip-latitude': request.headers.get('x-vercel-ip-latitude'),
    'x-vercel-ip-longitude': request.headers.get('x-vercel-ip-longitude'),

    // AWS CloudFront
    'cloudfront-viewer-country': request.headers.get(
      'cloudfront-viewer-country'
    ),
    'cloudfront-viewer-country-region': request.headers.get(
      'cloudfront-viewer-country-region'
    ),
    'cloudfront-viewer-city': request.headers.get('cloudfront-viewer-city'),

    // Google Cloud
    'x-client-geo-location': request.headers.get('x-client-geo-location'),

    // Generic headers
    'x-country-code': request.headers.get('x-country-code'),
    'x-geo-country': request.headers.get('x-geo-country'),
    'x-city': request.headers.get('x-city'),
    'x-geo-city': request.headers.get('x-geo-city'),
    'x-region': request.headers.get('x-region'),
    'x-geo-region': request.headers.get('x-geo-region'),
    'geoip-country': request.headers.get('geoip-country'),
    'geoip-city': request.headers.get('geoip-city'),
    'geoip-region': request.headers.get('geoip-region'),

    // IP headers
    'x-forwarded-for': request.headers.get('x-forwarded-for'),
    'x-real-ip': request.headers.get('x-real-ip'),
    'true-client-ip': request.headers.get('true-client-ip'),
  };

  // Remove null values
  Object.keys(locationHeaders).forEach((key) => {
    if (locationHeaders[key] === null) {
      delete locationHeaders[key];
    }
  });

  const clientIP =
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip') ||
    'unknown';

  return NextResponse.json({
    message: 'Debug Headers Response',
    timestamp: new Date().toISOString(),
    clientIP,
    locationHeaders,
    allHeaders: headers,
    nextjsGeo: request.geo || null,
    url: request.url,
    method: request.method,
  });
}
