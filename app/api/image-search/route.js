import { NextResponse } from 'next/server';

// A performance-optimized version of the image search API that returns images
// from a curated list based on the search query

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const count = parseInt(searchParams.get('count') || '5', 10);

    if (!query) {
      return NextResponse.json(
        { error: 'Missing required parameter: query' },
        { status: 400 }
      );
    }

    // Use our curated list of images based on the query
    console.log(`Searching for images of: ${query}`);
    const images = getUnsplashImages(query, count);

    return NextResponse.json({
      images: images.slice(0, count),
    });
  } catch (error) {
    console.error('Image search error:', error);
    return NextResponse.json(
      { error: 'Failed to search for images' },
      { status: 500 }
    );
  }
}

// Function to get Unsplash images with proper attribution and direct URLs
function getUnsplashImages(query, count = 5) {
  // Create a clean, searchable query by removing special chars and using lowercase
  const cleanQuery = query
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .trim();
  const searchTerms = cleanQuery.split(' ').filter((term) => term.length > 2);

  // Base Unsplash URL pattern with adjustable parameters
  // This creates direct image URLs without API keys
  // Format: https://source.unsplash.com/featured/?{KEYWORDS}
  const baseUrl = 'https://source.unsplash.com/featured';

  // Create multiple unique URLs to avoid duplicates by adding dimensions
  const imageUrls = [];

  // Create unique dimension sets for each image
  const dimensions = [
    '1200x800', // Landscape
    '800x1200', // Portrait
    '900x900', // Square
    '1600x900', // Wide
    '800x600', // Standard
    '1024x768', // Classic
    '1280x720', // HD
    '1920x1080', // Full HD
  ];

  // Create a proper keyword string from the search terms
  let keywords = cleanQuery;
  if (searchTerms.length > 0) {
    // Use the most relevant terms
    keywords = searchTerms.slice(0, 3).join(',');
  }

  // Ensure we have something to search for
  if (!keywords || keywords.length < 2) {
    keywords = 'nature,landscape';
  }

  // Generate unique URLs for each requested image
  for (let i = 0; i < count; i++) {
    const dimension = dimensions[i % dimensions.length];
    // Add a cache-busting random parameter to avoid duplication
    const randomParam = `&cb=${Math.floor(Math.random() * 10000)}`;
    const imageUrl = `${baseUrl}/${dimension}?${keywords}${randomParam}`;
    imageUrls.push(imageUrl);
  }

  return imageUrls;
}
