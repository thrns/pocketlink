import {
  fetchProductById,
  fetchDiscountById,
} from '@/lib/helpers/supabaseProductHelpers.server';
import ProductDetails from './ProductDetails';

// ==================== META DATA ==================== //

export async function generateMetadata({ params }) {
  try {
    // Safely extract params with fallbacks
    const { id, tenant } = (await params) || {};

    if (!id || !tenant) {
      return {
        title: 'Product Not Found',
        description:
          "The product you're looking for doesn't exist or has been removed.",
      };
    }

    // Safely fetch product data
    let product;
    try {
      product = await fetchProductById(id);
    } catch (error) {
      // Return default metadata if product fetch fails
      return {
        title: 'Product - Pocketlink',
        description: 'Explore our products and find what you need.',
      };
    }

    // Return not found metadata if no product exists
    if (!product) {
      return {
        title: 'Product Not Found',
        description:
          "The product you're looking for doesn't exist or has been removed.",
      };
    }

    // Calculate final price considering discounts with error handling
    const originalPrice = typeof product.price === 'number' ? product.price : 0;
    let finalPrice = originalPrice;
    let discountLabel = '';

    if (product.discount_id) {
      try {
        const discountData = await fetchDiscountById(product.discount_id);
        if (discountData) {
          if (
            discountData.type === 'percentage' &&
            typeof discountData.value === 'number'
          ) {
            finalPrice =
              originalPrice - originalPrice * (discountData.value / 100);
            discountLabel = `${discountData.value}% OFF`;
          } else if (
            discountData.type === 'fixed' &&
            typeof discountData.value === 'number'
          ) {
            finalPrice = originalPrice - discountData.value;
            discountLabel = `$${discountData.value} OFF`;
          }
        }
      } catch (error) {
        // Continue without discount data rather than failing
      }
    }

    // Format prices for display (ensure they're valid numbers first)
    const formattedOriginalPrice = (
      isFinite(originalPrice) ? originalPrice : 0
    ).toFixed(2);
    const formattedFinalPrice = (isFinite(finalPrice) ? finalPrice : 0).toFixed(
      2
    );

    // Get the primary image URL for social sharing with fallback
    const productImages = Array.isArray(product.images)
      ? product.images
      : typeof product.images === 'string'
        ? product.images.startsWith('[')
          ? JSON.parse(product.images)
          : [product.images]
        : [];
    const primaryImage = productImages[0] || '/placeholderImg.png';

    // Ensure primaryImage is an absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://pocketlink.co';
    const absoluteImageUrl = primaryImage.startsWith('http')
      ? primaryImage
      : `${baseUrl}${primaryImage.startsWith('/') ? '' : '/'}${primaryImage}`;

    // Safely get product name and description with fallbacks
    const productName = product.name || 'Product';
    const productDescription = product.description
      ? typeof product.description === 'string' &&
        product.description.length > 160
        ? product.description.substring(0, 157) + '...'
        : product.description
      : `Shop ${productName} and more great products.`;

    const priceDisplay = product.discount_id
      ? `$${formattedFinalPrice} (was $${formattedOriginalPrice})`
      : `$${formattedOriginalPrice}`;

    // Build metadata object with validation
    const productMetadata = {
      metadataBase: new URL('https://pocketlink.co'),
      title: `${productName} - ${priceDisplay}`,
      description:
        typeof productDescription === 'string'
          ? productDescription
          : `Shop ${productName}`,
      openGraph: {
        title: `${productName} - ${priceDisplay}`,
        description: productDescription,
        url: `https://pocketlink.co/${encodeURIComponent(tenant)}/${encodeURIComponent(id)}`,
        images: [
          {
            url: absoluteImageUrl,
            width: 1200,
            height: 630,
            alt: productName,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: productName,
        description:
          typeof productDescription === 'string'
            ? productDescription
            : `Shop ${productName}`,
        images: [absoluteImageUrl],
      },
      icons: {
        icon: absoluteImageUrl,
        apple: absoluteImageUrl,
      },
    };

    // Validate the metadata before returning
    try {
      JSON.stringify(productMetadata);
      return productMetadata;
    } catch (error) {
      // Return simplified metadata if serialization fails
      return {
        title: productName,
        description: 'View this product and more on Pocketlink',
      };
    }
  } catch (error) {
    // Fallback metadata in case of any uncaught errors
    return {
      title: 'Product - Pocketlink',
      description: 'Explore our products and find what you need.',
    };
  }
}

// ========== This is a server component (no "use client" directive) ========== //
export default async function ProductPage({ params }) {
  try {
    // Get product ID and tenant from route parameters with validation
    const { id, tenant } = (await params) || {};

    if (!id || !tenant) {
      return renderNotFound();
    }

    // Fetch product data server-side
    let product = null;
    try {
      // First fetch the product data
      product = await fetchProductById(id);

      if (!product) {
        return renderNotFound();
      }

      // Safely process fields that might be JSON strings
      product = safelyProcessProductData(product);

      // If product has a discount_id, fetch the discount data separately
      if (product.discount_id) {
        try {
          const discountData = await fetchDiscountById(product.discount_id);
          if (discountData) {
            // Format the discount data to match the expected client-side format
            product.discount = {
              type: discountData.type,
              value: discountData.value,
            };
          }
        } catch (discountError) {
          // Continue without discount data rather than failing
        }
      }

      // Validate that product can be serialized
      try {
        JSON.stringify(product);
      } catch (error) {
        // Sanitize product data to ensure it can be serialized
        product = sanitizeProductForSerialization(product);
      }
    } catch (error) {
      return renderNotFound();
    }

    return <ProductDetails initialProduct={product} productId={id} />;
  } catch (error) {
    // Final fallback for any uncaught error
    return renderNotFound();
  }
}

// Update the safelyProcessProductData function to maintain arrays

function safelyProcessProductData(product) {
  // Guard against null or undefined product
  if (!product) return null;

  // Create a new object to avoid mutating the original
  const processedProduct = { ...product };

  // Process access_url - keep as array
  if (processedProduct.access_url) {
    try {
      if (
        typeof processedProduct.access_url === 'string' &&
        processedProduct.access_url.startsWith('[') &&
        processedProduct.access_url.endsWith(']')
      ) {
        const parsed = JSON.parse(processedProduct.access_url);
        processedProduct.access_url = Array.isArray(parsed)
          ? parsed
          : [processedProduct.access_url];
      } else if (typeof processedProduct.access_url === 'string') {
        processedProduct.access_url = [processedProduct.access_url];
      } else if (!Array.isArray(processedProduct.access_url)) {
        processedProduct.access_url = [];
      }
    } catch (error) {
      processedProduct.access_url = [];
    }
  } else {
    processedProduct.access_url = [];
  }

  // Process file_url - keep as array
  if (processedProduct.file_url) {
    try {
      if (
        typeof processedProduct.file_url === 'string' &&
        processedProduct.file_url.startsWith('[') &&
        processedProduct.file_url.endsWith(']')
      ) {
        const parsed = JSON.parse(processedProduct.file_url);
        processedProduct.file_url = Array.isArray(parsed)
          ? parsed
          : [processedProduct.file_url];
      } else if (typeof processedProduct.file_url === 'string') {
        processedProduct.file_url = [processedProduct.file_url];
      } else if (!Array.isArray(processedProduct.file_url)) {
        processedProduct.file_url = [];
      }
    } catch (error) {
      processedProduct.file_url = [];
    }
  } else {
    processedProduct.file_url = [];
  }

  // Process images
  if (processedProduct.images) {
    try {
      if (
        typeof processedProduct.images === 'string' &&
        processedProduct.images.startsWith('[') &&
        processedProduct.images.endsWith(']')
      ) {
        try {
          const parsed = JSON.parse(processedProduct.images);
          processedProduct.imageString =
            Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : '';
          processedProduct.images = Array.isArray(parsed) ? parsed : [];
        } catch (jsonError) {
          processedProduct.imageString = '';
          processedProduct.images = [];
        }
      } else if (Array.isArray(processedProduct.images)) {
        processedProduct.imageString =
          processedProduct.images.length > 0 ? processedProduct.images[0] : '';
      } else if (typeof processedProduct.images === 'string') {
        processedProduct.imageString = processedProduct.images;
        processedProduct.images = [processedProduct.images];
      } else {
        processedProduct.imageString = '';
        processedProduct.images = [];
      }
    } catch (error) {
      processedProduct.imageString = '';
      processedProduct.images = [];
    }
  } else {
    processedProduct.imageString = '';
    processedProduct.images = [];
  }

  // Ensure price is a number
  if (
    typeof processedProduct.price !== 'number' ||
    isNaN(processedProduct.price)
  ) {
    processedProduct.price = 0;
  }

  return processedProduct;
}

// Sanitize product data to ensure it can be serialized
function sanitizeProductForSerialization(product) {
  // Guard against null or undefined product
  if (!product) return {};

  const sanitizedProduct = {};

  // Go through each key and ensure it can be serialized
  for (const key in product) {
    if (!Object.prototype.hasOwnProperty.call(product, key)) continue;

    try {
      // Test if this property can be serialized
      JSON.stringify({ [key]: product[key] });
      sanitizedProduct[key] = product[key];
    } catch (error) {
      // Handle different data types appropriately
      if (typeof product[key] === 'string') {
        sanitizedProduct[key] = product[key].substring(0, 1000); // Limit string length
      } else if (typeof product[key] === 'number') {
        sanitizedProduct[key] = isFinite(product[key]) ? product[key] : 0;
      } else if (product[key] === null) {
        sanitizedProduct[key] = null;
      } else if (Array.isArray(product[key])) {
        // Try to sanitize array elements
        try {
          const safeArray = [];
          for (let i = 0; i < Math.min(product[key].length, 100); i++) {
            // Limit array size
            const item = product[key][i];
            if (typeof item === 'object' && item !== null) {
              safeArray.push(JSON.stringify(item));
            } else if (
              typeof item === 'string' ||
              typeof item === 'number' ||
              item === null
            ) {
              safeArray.push(item);
            }
            // Skip other types
          }
          sanitizedProduct[key] = safeArray;
        } catch (arrayError) {
          sanitizedProduct[key] = [];
        }
      } else if (typeof product[key] === 'object' && product[key] !== null) {
        // For objects, convert to string representation
        try {
          const safeObj = {};
          const objKeys = Object.keys(product[key]).slice(0, 50); // Limit number of keys
          for (const objKey of objKeys) {
            const value = product[key][objKey];
            if (
              typeof value === 'string' ||
              typeof value === 'number' ||
              value === null
            ) {
              safeObj[objKey] = value;
            }
            // Skip other types
          }
          sanitizedProduct[key] = safeObj;
        } catch (objError) {
          sanitizedProduct[key] = {};
        }
      } else if (typeof product[key] === 'boolean') {
        sanitizedProduct[key] = product[key];
      } else {
        // For other problematic types, use null
        sanitizedProduct[key] = null;
      }
    }
  }

  // Ensure required fields have fallback values
  const requiredFields = {
    name: 'Product',
    description: '',
    price: 0,
    images: [],
    imageString: '',
  };

  for (const [field, defaultValue] of Object.entries(requiredFields)) {
    if (sanitizedProduct[field] === undefined) {
      sanitizedProduct[field] = defaultValue;
    }
  }

  return sanitizedProduct;
}

// Helper function to render the "Not Found" UI
function renderNotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
      <p className="mb-6 text-center">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <a href="/" className="text-blue-600 underline">
        Return to Home
      </a>
    </div>
  );
}
