import { AuthProvider } from './contexts/AuthContext';
import { FetchProvider } from './contexts/FetcherContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { SalesBotProvider } from './contexts/SalesBotContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import './globals.css';
import '../components/styles.css'; // Import component styles
import { SidebarProvider } from '@/components/ui/sidebar';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { TemplatesProvider } from './(root)/templates/context/TemplatesContext';
import JsonLd, { OrganizationJsonLd } from '@/components/JSONLD';
import { Toaster } from 'sonner';
import { Onest } from 'next/font/google';
import { DodoPaymentsProvider } from './contexts/DodoPaymentsContext';
import { PostHogProvider } from '@/components/PostHogProvider';

// Load Onest font
const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-onest',
  display: 'swap',
});

// Define static fallback metadata values for immediate availabilityy
const SITE_NAME = 'Pocketlink';
const BASE_URL = 'https://pocketlink.co';
const DEFAULT_TITLE = 'Pocketlink - AI powered Creator Tool kit';
const DEFAULT_DESCRIPTION =
  'Automate your brand, grow your audience, and turn clicks into sales, all from one beautiful, customizable link.';
const DEFAULT_KEYWORDS =
  'link in bio, monetization, creator tools, AI bio links, instagram bio link, tiktok link, social media marketing, affiliate marketing, e-commerce, shopify alternative, conversion optimization, social commerce, digital storefront, landing page builder, AI-powered links';
const DEFAULT_OG_IMAGE = `${BASE_URL}/openGraph.png`;

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  author: 'Pocketlink',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  creator: 'Pocketlink',
  publisher: 'Pocketlink',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 800,
        height: 600,
        alt: 'Pocketlink - AI powered Creator Tool kit.',
      },
    ],
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: 'Pocketlink - AI powered Creator Tool kit.',
      },
    ],
    site: '@pocketlink_co',
    creator: '@pocketlink_co',
  },
  category: 'technology',
  icons: {
    icon: [
      { url: `${BASE_URL}/favicon.ico` },
      {
        url: `${BASE_URL}/favicon-16x16.png`,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: `${BASE_URL}/favicon-32x32.png`,
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: `${BASE_URL}/apple-touch-icon.png`,
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': BASE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: `${BASE_URL}/manifest.json`,
  verification: {
    google: 'MBi5YrR4WFxo0thAr1V8jqxyrolU20rKAuWtscoH_Tg',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'PocketLink',
    'application-name': 'PocketLink',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#000000',
  },
};

export default function RootLayout({ children }) {
  // Suppress console errors in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0];
      if (
        typeof message === 'string' &&
        (message.includes('Encountered two children with the same key') ||
          message.includes('Keys should be unique') ||
          message.includes(
            'Non-unique keys may cause children to be duplicated'
          ) ||
          message.includes(
            'Warning: Each child in a list should have a unique "key" prop'
          ) ||
          message.includes('Warning: validateDOMNesting') ||
          message.includes('Warning: React does not recognize'))
      ) {
        // Suppress these specific React warnings
        return;
      }
      originalError.apply(console, args);
    };
  }

  return (
    <html lang="en" className={`${onest.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-onest antialiased">
        <PostHogProvider>
          <JsonLd />
          <OrganizationJsonLd />
          <LoadingProvider>
            <AuthProvider>
              <DodoPaymentsProvider>
                <SubscriptionProvider>
                  <FetchProvider>
                    <ThemeProvider>
                      <OnboardingProvider>
                        <TemplatesProvider>
                          <SalesBotProvider>
                            <SidebarProvider>{children}</SidebarProvider>
                          </SalesBotProvider>
                        </TemplatesProvider>
                      </OnboardingProvider>
                    </ThemeProvider>
                  </FetchProvider>
                </SubscriptionProvider>
              </DodoPaymentsProvider>
            </AuthProvider>
          </LoadingProvider>
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              duration: 2000,
              className: 'pocketlink-toast',
            }}
          />
        </PostHogProvider>
      </body>
    </html>
  );
}
