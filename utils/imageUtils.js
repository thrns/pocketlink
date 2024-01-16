// utils/imageUtils.js

import sharp from 'sharp';

/**
 * Process and normalize image with specific dimensions
 * This helps with problematic image formats like AVIF
 */
export async function processImage(imageUrl, width = 400, height = 300) {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process with Sharp to handle various formats including AVIF
    const processedImage = await sharp(buffer)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat('png') // Convert to PNG for better compatibility
      .toBuffer();

    return processedImage;
  } catch (error) {
    console.error('Image processing failed:', error);
    return null;
  }
}

/**
 * Get a favicon URL from a website URL
 */
export function getFaviconUrl(url) {
  if (!url) return null;
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
  } catch (e) {
    return null;
  }
}

/**
 * Get an OG image URL from a website URL
 */
export function getOgImageUrl(url) {
  if (!url) return null;
  try {
    const domain = new URL(url).hostname;
    return `https://api.urlmeta.org/?url=${url}`; // Adjust based on the service you want to use
  } catch (e) {
    return null;
  }
}

/**
 * Create a data URL from an image buffer
 */
export function createDataUrl(buffer, mimeType = 'image/png') {
  if (!buffer) return null;
  const base64 = buffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

/**
 * Generate a fallback avatar based on username
 */
export function generateAvatarUrl(username) {
  if (!username) return null;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;
}
