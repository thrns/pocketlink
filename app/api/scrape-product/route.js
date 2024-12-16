// /api/scrape-product/route.js

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// Helper function to resolve relative URLs to absolute ones
function resolveUrl(baseUrl, relativeUrl) {
  if (!relativeUrl || typeof relativeUrl !== 'string') return null;
  // If already absolute, return it
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl;
  }
  // If protocol-relative, add protocol from base
  if (relativeUrl.startsWith('//')) {
    try {
      const baseProto = new URL(baseUrl).protocol;
      return `${baseProto}${relativeUrl}`;
    } catch (e) {
      return null; // Invalid base URL
    }
  }
  // Otherwise, resolve against the base URL
  try {
    return new URL(relativeUrl, baseUrl).href;
  } catch (e) {
    console.warn(`Failed to resolve URL: ${relativeUrl} with base ${baseUrl}`);
    // Return null if resolution fails completely
    return null;
  }
}

// Helper function to parse srcset attribute and get a suitable image URL (e.g., the first one)
function parseSrcset(srcset) {
  if (!srcset) return null;
  const sources = srcset.split(',').map((s) => s.trim().split(/\s+/));
  // Find the first URL (often a good default or high-res)
  return sources.length > 0 ? sources[0][0] : null;
}

// --- Extraction Helpers ---

function extractName($) {
  let name =
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('h1').first().text().trim();

  // Fallback to title, but try to remove site name if present (common pattern: "Product Name | Site Name")
  if (!name) {
    const title = $('title').first().text().trim();
    if (title.includes('|')) {
      name = title.split('|')[0].trim();
    } else if (title.includes('–')) {
      name = title.split('–')[0].trim();
    } else if (title.includes('-')) {
      name = title.split('-')[0].trim();
    } else {
      name = title;
    }
  }
  return name || 'Name not found';
}

function extractPrice($) {
  const price =
    $('meta[property="og:price:amount"]').attr('content') ||
    $('meta[property="product:price:amount"]').attr('content') ||
    $('meta[itemprop="price"]').attr('content');

  if (price) return price.replace(/[^0-9.,]/g, '').trim(); // Clean price from meta tags

  // Try common element selectors
  const priceSelectors = [
    '[itemprop="price"]', // Schema.org inside elements
    '.price',
    '[class*="price"]', // Common class names
    '[data-testid*="price"]', // Test IDs often contain 'price'
    '.product-price',
    '.offer-price',
    '.sales-price',
    '.current-price',
    '.product-detail-price',
    // Add more specific selectors if you know target site patterns
    // e.g., '#priceblock_ourprice', '#prcIsum' (Amazon, eBay examples - may change)
  ];

  for (const selector of priceSelectors) {
    const priceText = $(selector).first().text().trim();
    if (priceText) {
      // Basic cleaning: remove currency symbols, text, keep numbers and separators
      const cleanedPrice = priceText.replace(/[^0-9.,]/g, '').trim();
      if (cleanedPrice) return cleanedPrice;
    }
  }

  return 'Price not found';
}

function extractImage($, baseUrl) {
  // 1. Try Meta Tags first
  let imageUrl =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    $('meta[property="og:image:secure_url"]').attr('content'); // Some sites provide secure URL

  if (imageUrl) return resolveUrl(baseUrl, imageUrl);

  // 2. Try common image selectors, prioritizing attributes often used for main images
  const imgSelectors = [
    '.product-image img', // Container with img
    'img.product-image', // Direct img with class
    '[data-testid*="product-image"] img', // Test IDs
    '.product-main-image img',
    '.gallery-image img', // Common gallery patterns
    '.product-gallery__image img',
    '[itemprop="image"]', // Schema.org (might be a meta tag or an img tag)
    '#main-image', // Common IDs
    '.product img', // Generic product container + img
    'img[alt*="product"]', // Img with alt text containing 'product' (less reliable)
    'img[class*="product"]',
  ];

  for (const selector of imgSelectors) {
    const img = $(selector).first();
    if (img.length) {
      // Prioritize attributes: data-srcset > srcset > data-src > src
      const srcset = img.attr('data-srcset') || img.attr('srcset');
      if (srcset) {
        const parsedSrc = parseSrcset(srcset);
        imageUrl = resolveUrl(baseUrl, parsedSrc);
        if (imageUrl) return imageUrl;
      }

      const dataSrc = img.attr('data-src');
      if (dataSrc) {
        imageUrl = resolveUrl(baseUrl, dataSrc);
        if (imageUrl) return imageUrl;
      }

      const src = img.attr('src');
      if (src) {
        imageUrl = resolveUrl(baseUrl, src);
        // Avoid tiny placeholder images (common issue)
        if (
          imageUrl &&
          !imageUrl.includes('data:image') &&
          !imageUrl.includes('placeholder')
        ) {
          return imageUrl;
        }
      }
    }
    // Special case for itemprop="image" being a meta tag
    else if (selector === '[itemprop="image"]' && img.is('meta')) {
      imageUrl = resolveUrl(baseUrl, img.attr('content'));
      if (imageUrl) return imageUrl;
    }
  }

  // 3. Fallback: Try finding the largest image on the page (heuristic)
  let largestImageSrc = null;
  let maxSize = 0;
  $('img').each((_, element) => {
    const img = $(element);
    const src = img.attr('src') || img.attr('data-src');
    const width = parseInt(img.attr('width') || '0', 10);
    const height = parseInt(img.attr('height') || '0', 10);
    const currentSize = width * height;

    if (
      src &&
      currentSize > maxSize &&
      !src.includes('data:image') &&
      !src.includes('logo') &&
      !src.includes('icon') &&
      !src.includes('avatar')
    ) {
      const resolved = resolveUrl(baseUrl, src);
      if (resolved) {
        maxSize = currentSize;
        largestImageSrc = resolved;
      }
    }
  });
  if (largestImageSrc) return largestImageSrc;

  return 'Image not found';
}

// --- JSON-LD Extraction ---
function extractJsonLdProduct($) {
  let productJson = null;
  $('script[type="application/ld+json"]').each((_, element) => {
    try {
      const scriptContent = $(element).html();
      if (!scriptContent) return;

      const jsonData = JSON.parse(scriptContent);

      // Function to find product data within potentially nested JSON-LD
      const findProduct = (data) => {
        if (!data) return null;
        if (Array.isArray(data)) {
          for (const item of data) {
            const found = findProduct(item);
            if (found) return found;
          }
        } else if (typeof data === 'object') {
          // Check common product types
          const type = data['@type'];
          if (
            type &&
            (type === 'Product' ||
              type === 'ProductGroup' ||
              type.includes('Product'))
          ) {
            return data;
          }
          // Check if it's within a graph
          if (data['@graph'] && Array.isArray(data['@graph'])) {
            for (const item of data['@graph']) {
              const found = findProduct(item);
              if (found) return found;
            }
          }
        }
        return null;
      };

      const foundProduct = findProduct(jsonData);
      if (foundProduct) {
        productJson = foundProduct;
        return false; // Stop searching once a product is found
      }
    } catch (e) {
      console.warn('Failed to parse JSON-LD:', e.message);
    }
  });

  if (productJson) {
    const name = productJson.name;
    // Image can be an object or a string or an array
    let image = productJson.image;
    if (typeof image === 'object' && image !== null) {
      image =
        image.url || (Array.isArray(image) ? image[0]?.url || image[0] : null);
    } else if (Array.isArray(image)) {
      image = image[0];
    }

    // Price is often nested within 'offers'
    let price = null;
    const offers = productJson.offers;
    if (offers) {
      const offer = Array.isArray(offers) ? offers[0] : offers; // Take the first offer
      if (offer) {
        price = offer.price || offer.lowPrice || offer.highPrice; // Check common price properties
        // Sometimes price is within priceSpecification
        if (!price && offer.priceSpecification) {
          price = offer.priceSpecification.price;
        }
      }
    }
    // Fallback: check top level price (less common for Product schema)
    price = price || productJson.price;

    return {
      name: typeof name === 'string' ? name.trim() : null,
      price: price
        ? String(price)
            .replace(/[^0-9.,]/g, '')
            .trim()
        : null,
      image: typeof image === 'string' ? image : null, // URL should be resolved later
    };
  }

  return null;
}

// --- Main API Route ---

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL format (basic check)
    try {
      new URL(url);
    } catch (_) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the HTML content with improved headers
    const response = await fetch(url, {
      headers: {
        // Use a common, recent User-Agent
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br', // Optional: Handle compressed responses if needed server-side
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none', // Or 'cross-site' if appropriate
        'Sec-Fetch-User': '?1',
      },
      // Optional: Handle redirects
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: Status ${response.status}`);
      return NextResponse.json(
        { error: `Failed to fetch product page (Status: ${response.status})` },
        { status: response.status > 499 ? 500 : response.status } // Return appropriate status code
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // --- Data Extraction Strategy ---
    const productData = { name: null, price: null, image: null, url: url };

    // 1. Try JSON-LD (often the most reliable)
    const jsonLdData = extractJsonLdProduct($);
    if (jsonLdData) {
      productData.name = jsonLdData.name;
      productData.price = jsonLdData.price;
      productData.image = resolveUrl(url, jsonLdData.image); // Resolve potentially relative URL from JSON-LD
    }

    // 2. Try Meta Tags & HTML Elements (fill gaps or use as primary if JSON-LD failed)
    productData.name = productData.name || extractName($);
    productData.price = productData.price || extractPrice($);
    productData.image = productData.image || extractImage($, url); // extractImage already resolves URLs

    // 3. Final check & Default values
    productData.name = productData.name || 'Name not found';
    productData.price = productData.price || 'Price not found';
    productData.image = productData.image || 'Image not found';

    return NextResponse.json(productData);
  } catch (error) {
    console.error('Error scraping product:', error);
    // Distinguish between network/fetch errors and scraping errors if possible
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error while fetching the URL' },
        { status: 502 } // Bad Gateway might be appropriate
      );
    }
    return NextResponse.json(
      {
        error:
          'Failed to process product details. The website structure might be unsupported.',
      },
      { status: 500 }
    );
  }
}
