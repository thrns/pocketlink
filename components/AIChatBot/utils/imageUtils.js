// Image-related utilities

/**
 * Generate a placeholder image URL based on provided options
 * @param {Object} options - Options for the image generation
 * @returns {string} - The generated image URL
 */
export const generatePlaceholderImage = (options = {}) => {
  const {
    width = 800,
    height = 600,
    id = null,
    seed = null,
    grayscale = false,
    blur = 0,
    random = Math.floor(Math.random() * 10000),
  } = options;

  let baseUrl = 'https://picsum.photos';

  // Handle specific image or seed
  if (id) {
    // For IDs, add randomization by getting a random ID if not specified
    const actualId =
      typeof id === 'string' && id.toLowerCase() === 'random'
        ? Math.floor(Math.random() * 1000) // Random ID between 0-999
        : id;
    baseUrl += `/id/${actualId}`;
  } else if (seed) {
    // For seeds, append a random number to make it unique each time
    const randomizedSeed = `${seed}-${Date.now() % 10000}`;
    baseUrl += `/seed/${randomizedSeed}`;
  }

  // Add dimensions
  baseUrl += height === width ? `/${width}` : `/${width}/${height}`;

  // Add effects as query parameters
  const queryParams = [];
  if (grayscale) queryParams.push('grayscale');
  if (blur > 0 && blur <= 10) queryParams.push(`blur=${blur}`);

  // Always add a random parameter to prevent caching
  queryParams.push(`random=${random}-${Date.now()}`);

  // Add query parameters if any
  if (queryParams.length > 0) {
    baseUrl += `?${queryParams.join('&')}`;
  }

  return baseUrl;
};

/**
 * Predefined image aesthetics presets
 */
export const imageAesthetics = {
  modern: { seed: 'modern', width: 800, height: 600 },
  vintage: { seed: 'vintage', grayscale: true, width: 800, height: 600 },
  minimal: { seed: 'minimal', width: 800, height: 800 },
  colorful: { seed: 'colorful', width: 800, height: 600 },
  abstract: { seed: 'abstract', blur: 2, width: 800, height: 600 },
  nature: { id: 'random', width: 800, height: 600 }, // Use random ID
  urban: { id: 'random', width: 800, height: 600 }, // Use random ID
  portrait: { seed: 'portrait', width: 600, height: 800 },
  food: { id: 'random', width: 800, height: 600 }, // Use random ID
  tech: { seed: 'tech', width: 800, height: 450 },
};

/**
 * Search for images using external API or fallback to direct Unsplash URLs
 * @param {string} query - The search query
 * @param {number} count - Number of images to return
 * @returns {Promise<Array>} - Promise resolving to array of image URLs
 */
export const searchImagesFromWeb = async (query, count = 5) => {
  try {
    console.log(`Searching for images of: ${query}`);
    const response = await fetch(
      `/api/image-search?query=${encodeURIComponent(query)}&count=${count}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    const data = await response.json();

    if (!data.images || !data.images.length) {
      throw new Error('No images returned from search');
    }

    console.log(`Found ${data.images.length} images for query "${query}"`);
    return data.images;
  } catch (error) {
    console.error('Error searching for images:', error);

    // Create direct Unsplash URLs as fallback - this works without API keys
    const fallbackUrls = [];
    const cleanQuery = query
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .trim();

    // Create a few different dimensions to get varied images
    const dimensions = [
      '1200x800',
      '800x1200',
      '900x900',
      '1600x900',
      '800x600',
    ];

    for (let i = 0; i < count; i++) {
      const dimension = dimensions[i % dimensions.length];
      const randomParam = `&cb=${Math.floor(Math.random() * 10000)}`;
      const url = `https://source.unsplash.com/featured/${dimension}?${cleanQuery}${randomParam}`;
      fallbackUrls.push(url);
    }

    console.log('Using fallback URLs:', fallbackUrls);
    return fallbackUrls;
  }
};
