// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/pricing',
          '/features',
          '/features/*',
          '/about-us',
          '/contact',
          '/login',
          '/signup',
          '/ai-bio-generator',
          '/terms',
          '/privacy',
          '/refund-policy',
          '/link-card',
          '/analytics',
        ],
        
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/pricing',
          '/features',
          '/features/*',
          '/about-us',
          '/contact',
          '/login',
          '/signup',
          '/ai-bio-generator',
          '/terms',
          '/privacy',
          '/refund-policy',
          '/link-card',
          '/analytics',
        ],
        disallow: [
          '/dashboard',
          '/dashboard/*',
          '/api/*',
          '/admin/*',
          '/user/*',
          '/settings/*',
          '/edit/*',
          '/logout',
        ],
      },
    ],
    sitemap: 'https://pocketlink.co/sitemap.xml',
    host: 'https://pocketlink.co',
  };
}
