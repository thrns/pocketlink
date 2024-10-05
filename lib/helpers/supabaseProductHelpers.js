import { createSupabaseClient } from '@/Clients/supabase/client';

//====== SUPABASE PRODUCT HELPERS ======//

//====== UTILITY FUNCTIONS ======//

/**
 * Safely execute a Supabase query with error handling
 * @param {Function} queryFn - Function that executes a Supabase query
 * @param {Object} options - Options for error handling
 * @returns {Promise<Object>} - Returns { data, error } object
 */
async function safeSupabaseQuery(queryFn, options = {}) {
  const supabase = await createSupabaseClient();
  const {
    fallbackValue = null,
    maxRetries = 1,
    errorMessage = 'Database operation failed',
  } = options;

  let retries = 0;
  let lastError = null;

  while (retries <= maxRetries) {
    try {
      const result = await queryFn();
      return { data: result.data, error: result.error };
    } catch (error) {
      lastError = error;
      retries++;

      // Wait before retrying (exponential backoff)
      if (retries <= maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retries) * 100)
        );
      }
    }
  }

  // Return fallback if all retries failed
  return {
    data: fallbackValue,
    error: { message: errorMessage, originalError: lastError },
  };
}

/**
 * Sanitize filename to prevent path traversal and invalid characters
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
function sanitizeFilename(filename) {
  if (!filename || typeof filename !== 'string') return `file-${Date.now()}`;

  // Remove path traversal attempts and invalid characters for Supabase storage
  return filename
    .replace(/[\\/:*?"<>|\s\u00A0]/g, '_') // Replace invalid characters and spaces with underscores
    .replace(/\.\./g, '') // Remove path traversal attempts
    .replace(/[^\w.-]/g, '_') // Replace any remaining non-alphanumeric characters except dots and hyphens
    .replace(/_+/g, '_') // Replace multiple underscores with single underscore
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, 100); // Limit filename length
}

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} - { valid, error }
 */
function validateFile(file, options = {}) {
  const {
    maxSizeMB = 50, // Default max size 50MB
    allowedTypes = null, // Default: allow all types
  } = options;

  if (!file || !(typeof File !== 'undefined' && file instanceof File)) {
    return { valid: false, error: 'Invalid file object' };
  }

  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    return { valid: false, error: `File size exceeds limit of ${maxSizeMB}MB` };
  }

  // Check file type if specified
  if (allowedTypes && Array.isArray(allowedTypes) && allowedTypes.length > 0) {
    const fileType = file.type.toLowerCase();
    const fileExtension = file.name.split('.').pop().toLowerCase();

    const isTypeAllowed = allowedTypes.some((type) => {
      return fileType.includes(type) || fileExtension === type;
    });

    if (!isTypeAllowed) {
      return {
        valid: false,
        error: `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`,
      };
    }
  }

  return { valid: true, error: null };
}

//====== FILE UPLOAD FUNCTIONS ======//

/**
 * Upload a product file to Supabase storage
 * @param {string} username - User's username
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - URL of the uploaded file
 */
export async function uploadProductFile(username, file) {
  const supabase = await createSupabaseClient();

  return new Promise(async (resolve, reject) => {
    // Validate inputs
    if (!username || typeof username !== 'string') {
      return reject(new Error('No username provided'));
    }

    const validationResult = validateFile(file);
    if (!validationResult.valid) {
      return reject(new Error(validationResult.error));
    }

    try {
      // Sanitize filename
      const sanitizedFilename = sanitizeFilename(file.name);

      // Construct the path: username/files/timestamp-filename
      const filePath = `${username}/files/${Date.now()}-${sanitizedFilename}`;

      // Upload the file to Supabase storage
      const { data, error } = await safeSupabaseQuery(() =>
        supabase.storage.from('products').upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })
      );

      if (error) {
        console.error('❌ File upload failed:', error.message);
        throw new Error(error.message);
      }

      // Get the public URL of the uploaded file
      const { data: publicURLData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      if (!publicURLData?.publicUrl) {
        return reject(new Error('Failed to retrieve public URL'));
      }

      resolve(publicURLData.publicUrl);
    } catch (error) {
      reject(
        new Error(
          `Unexpected error during file upload: ${error?.message || 'Unknown error'}`
        )
      );
    }
  });
}

/**
 * Upload a product file to Supabase storage with progress tracking
 * @param {string} username - User's username
 * @param {File} file - The file to upload
 * @param {Function} onProgress - Callback for upload progress updates
 * @returns {Promise<string>} - URL of the uploaded file
 */
export async function uploadProductFileWithProgress(
  username,
  file,
  onProgress
) {
  const supabase = await createSupabaseClient();
  return new Promise(async (resolve, reject) => {
    // Validate inputs
    if (!username || typeof username !== 'string') {
      return reject(new Error('No username provided'));
    }

    const validationResult = validateFile(file);
    if (!validationResult.valid) {
      return reject(new Error(validationResult.error));
    }

    try {
      // Sanitize filename
      const sanitizedFilename = sanitizeFilename(file.name);

      // Construct the path: username/files/timestamp-filename
      const filePath = `${username}/files/${Date.now()}-${sanitizedFilename}`;

      // Custom fetch with progress tracking
      const customFetch = (url, options) => {
        return new Promise((fetchResolve, fetchReject) => {
          // Check if XMLHttpRequest is available (browser environment)
          if (typeof XMLHttpRequest === 'undefined') {
            // Fallback to regular fetch in environments without XMLHttpRequest
            fetch(url, options).then(fetchResolve).catch(fetchReject);
            return;
          }

          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              onProgress?.(percentComplete);
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              fetchResolve(
                new Response(xhr.responseText, { status: xhr.status })
              );
            } else {
              fetchReject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
            }
          });

          xhr.addEventListener('error', () => {
            fetchReject(new Error('Network error'));
          });

          xhr.open(options.method || 'GET', url);

          // Set headers
          if (options.headers) {
            Object.entries(options.headers).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value);
            });
          }

          xhr.send(options.body);
        });
      };

      // Upload with custom fetch
      const { data, error } = await safeSupabaseQuery(() =>
        supabase.storage.from('products').upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })
      );

      if (error) {
        console.error('❌ File upload failed:', error.message);
        throw new Error(error.message);
      }

      // Get the public URL
      const { data: publicURLData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      if (!publicURLData?.publicUrl) {
        return reject(new Error('Failed to retrieve public URL'));
      }

      onProgress?.(100);
      resolve(publicURLData.publicUrl);
    } catch (error) {
      reject(
        new Error(
          `Unexpected error during file upload: ${error?.message || 'Unknown error'}`
        )
      );
    }
  });
}

/**
 * Upload multiple product files to Supabase storage
 * @param {string} username - User's username
 * @param {FileList|Array} files - The files to upload
 * @returns {Promise<Array>} - Array of uploaded file URLs
 */
export async function uploadMultipleProductFiles(username, files) {
  if (!files || files.length === 0) {
    throw new Error('No files provided');
  }

  try {
    const filesArray = Array.from(files);
    const uploadPromises = filesArray.map((file) =>
      uploadProductFile(username, file)
    );

    const uploadedUrls = await Promise.all(uploadPromises);
    console.log(`✅ Successfully uploaded ${uploadedUrls.length} files`);

    return uploadedUrls;
  } catch (error) {
    console.error('❌ Error uploading multiple files:', error);
    throw error;
  }
}

/**
 * Upload a product image to Supabase storage
 * @param {string} username - User's username
 * @param {File} image - The image file to upload
 * @returns {Promise<string>} - URL of the uploaded image
 */
export async function uploadProductImage(username, image) {
  const supabase = await createSupabaseClient();

  return new Promise(async (resolve, reject) => {
    // Validate inputs
    if (!username || typeof username !== 'string') {
      return reject(new Error('No username provided'));
    }

    const validationResult = validateFile(image, {
      maxSizeMB: 10, // Smaller limit for images
      allowedTypes: ['image', 'jpg', 'jpeg', 'png', 'gif', 'webp'],
    });

    if (!validationResult.valid) {
      return reject(new Error(validationResult.error));
    }

    try {
      // Sanitize filename
      const sanitizedFilename = sanitizeFilename(image.name);

      // Construct the path: username/images/timestamp-filename
      const imagePath = `${username}/images/${Date.now()}-${sanitizedFilename}`;

      console.log('🔄 Uploading image to:', imagePath);

      // Upload the image to Supabase storage
      const { data, error } = await safeSupabaseQuery(() =>
        supabase.storage.from('products').upload(imagePath, image, {
          cacheControl: '3600',
          upsert: false,
        })
      );

      if (error) {
        console.error('❌ Image upload failed:', error.message);
        throw new Error(error.message);
      }

      // Get the public URL of the uploaded image
      const { data: publicURLData } = supabase.storage
        .from('products')
        .getPublicUrl(imagePath);

      if (!publicURLData?.publicUrl) {
        return reject(new Error('Failed to retrieve public URL for image'));
      }

      console.log('✅ Image upload successful:', publicURLData.publicUrl);
      resolve(publicURLData.publicUrl);
    } catch (error) {
      console.error('❌ Unexpected error during image upload:', error);
      reject(
        new Error(
          `Unexpected error during image upload: ${error?.message || 'Unknown error'}`
        )
      );
    }
  });
}

//====== PRODUCT CRUD OPERATIONS ======//

/**
 * Create a new product in the database
 * @param {Object} productData - The product data to create
 * @returns {Promise<Object>} - The created product data
 */
export async function createProduct(productData) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Creating product:', productData.name);

    const { data, error } = await safeSupabaseQuery(() =>
      supabase.from('products_data').insert([productData]).select().single()
    );

    if (error) {
      console.error('❌ Product creation failed:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Product created successfully:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Error creating product:', error);
    throw error;
  }
}

/**
 * Update an existing product in the database
 * @param {string} productId - The ID of the product to update
 * @param {Object} productData - The updated product data
 * @returns {Promise<Object>} - The updated product data
 */
export async function updateProduct(productId, productData) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Updating product:', productId);

    // Remove id from productData to avoid conflicts
    const { id, ...updateData } = productData;

    const { data, error } = await safeSupabaseQuery(() =>
      supabase
        .from('products_data')
        .update(updateData)
        .eq('id', productId)
        .select()
        .single()
    );

    if (error) {
      console.error('❌ Product update failed:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Product updated successfully');
    return data;
  } catch (error) {
    console.error('❌ Error updating product:', error);
    throw error;
  }
}

//====== ITEMS INTEGRATION FUNCTIONS ======//

/**
 * Update a product in the user's items array
 * @param {string} username - User's username
 * @param {string} productId - Product ID to update
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} - Updated items data
 */
export async function updateProductInItems(username, productId, productData) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Updating product in items array for user:', username);

    // Fetch current items data
    const { data: currentData, error: fetchError } = await safeSupabaseQuery(
      () =>
        supabase
          .from('items_data')
          .select('items')
          .eq('username', username)
          .single()
    );

    if (fetchError) {
      console.error('❌ Failed to fetch current items:', fetchError.message);
      throw new Error(fetchError.message);
    }

    const updateProductInArray = (itemsArray) => {
      return itemsArray.map((item) => {
        if (item.type === 'shopCard' && item.id === productId) {
          return {
            ...item,
            ...productData,
            id: productId, // Ensure product id is preserved
          };
        }
        return item;
      });
    };

    let updatedItems;
    if (Array.isArray(currentData.items)) {
      updatedItems = updateProductInArray(currentData.items);
    } else {
      console.log('Items is not an array, initializing as empty array');
      updatedItems = [];
    }

    // Update the items in the database
    const { data, error } = await safeSupabaseQuery(() =>
      supabase
        .from('items_data')
        .update({ items: updatedItems })
        .eq('username', username)
        .select()
        .single()
    );

    if (error) {
      console.error('❌ Failed to update items array:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Product updated in items array successfully');
    return data;
  } catch (error) {
    console.error('❌ Error updating product in items:', error);
    throw error;
  }
}

/**
 * Remove a product from the user's items array
 * @param {string} username - User's username
 * @param {string} productId - Product ID to remove
 * @returns {Promise<Object>} - Updated items data
 */
export async function removeProductFromItems(username, productId) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Removing product from items array for user:', username);

    // Fetch current items data (both items and mobileItems)
    const { data: currentData, error: fetchError } = await safeSupabaseQuery(
      () =>
        supabase
          .from('items_data')
          .select('items, mobileItems')
          .eq('username', username)
          .single()
    );

    if (fetchError) {
      console.error('❌ Failed to fetch current items:', fetchError.message);
      throw new Error(fetchError.message);
    }

    console.log('🔍 Raw data from database:', currentData);
    console.log('🔍 Items array:', currentData?.items);
    console.log('🔍 MobileItems array:', currentData?.mobileItems);

    // Filter function to remove the product
    const filterProduct = (itemsArray, arrayName) => {
      if (!Array.isArray(itemsArray)) {
        console.log(`🔍 ${arrayName} is not an array:`, itemsArray);
        return [];
      }

      console.log(`🔍 Filtering ${arrayName}, total items:`, itemsArray.length);
      console.log(`🔍 Looking for productId:`, productId);

      // Log all shopCard items for debugging
      const shopCards = itemsArray.filter((item) => item.type === 'shopCard');
      console.log(
        `🔍 Found ${shopCards.length} shopCard items in ${arrayName}:`
      );
      shopCards.forEach((item) => {
        console.log(
          `  - Type: ${item.type}, ID: ${item.id}, ProductID: ${item.productId}, Title: ${item.title || item.name}`
        );
        console.log(`  - Full item:`, item);
      });

      const filteredArray = itemsArray.filter((item) => {
        // Remove if it's a shopCard with matching id (not productId!)
        if (item.type === 'shopCard' && item.id === productId) {
          console.log(`🗑️ Removing product from ${arrayName}:`, {
            type: item.type,
            id: item.id,
            title: item.title || item.name,
          });
          return false;
        }
        return true;
      });

      console.log(
        `🔍 After filtering ${arrayName}: ${itemsArray.length} -> ${filteredArray.length} items`
      );
      return filteredArray;
    };

    // Update both items and mobileItems arrays
    const updatedItems = filterProduct(currentData.items, 'items');
    const updatedMobileItems = filterProduct(
      currentData.mobileItems,
      'mobileItems'
    );

    console.log('🔄 Updating items and mobileItems in database');

    // Update both items and mobileItems in the database
    const { data, error } = await safeSupabaseQuery(() =>
      supabase
        .from('items_data')
        .update({
          items: updatedItems,
          mobileItems: updatedMobileItems,
        })
        .eq('username', username)
        .select()
        .single()
    );

    if (error) {
      console.error('❌ Failed to update items array:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Product removed from items array successfully');
    return data;
  } catch (error) {
    console.error('❌ Error removing product from items:', error);
    throw error;
  }
}

//====== PRODUCT DELETE FUNCTIONS ======//

/**
 * Delete a product and remove it from the user's items
 * @param {string} username - User's username
 * @param {string} productId - Product ID to delete
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteProduct(username, productId) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Deleting product:', productId);

    // First, remove the product from the user's items array
    await removeProductFromItems(username, productId);

    // Then delete the product from the products table
    const { error: deleteError } = await safeSupabaseQuery(() =>
      supabase.from('products_data').delete().eq('id', productId)
    );

    if (deleteError) {
      console.error('❌ Product deletion failed:', deleteError.message);
      throw new Error(deleteError.message);
    }

    console.log('✅ Product deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    throw error;
  }
}

//====== PRODUCT FETCH FUNCTIONS ======//

/**
 * Fetch all products for a user
 * @param {string} username - User's username
 * @returns {Promise<Array>} - Array of products
 */
export async function fetchProducts(username) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Fetching products for user:', username);

    const { data, error } = await safeSupabaseQuery(() =>
      supabase.from('products_data').select('*').eq('username', username)
    );

    if (error) {
      console.error('❌ Failed to fetch products:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Products fetched successfully:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a specific product by ID
 * @param {string} productId - Product ID to fetch
 * @returns {Promise<Object>} - Product data
 */
export async function fetchProductById(productId) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Fetching product by ID:', productId);

    const { data, error } = await safeSupabaseQuery(() =>
      supabase.from('products_data').select('*').eq('id', productId).single()
    );

    if (error) {
      console.error('❌ Failed to fetch product:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Product fetched successfully');
    return data;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    throw error;
  }
}

//====== FILE MANAGEMENT FUNCTIONS ======//

/**
 * Extract file path from Supabase URL
 * @param {string} url - Supabase storage URL
 * @returns {string} - Extracted file path
 */
function extractPathFromUrl(url) {
  if (!url || typeof url !== 'string') return '';

  try {
    // Handle both old and new Supabase storage URL formats
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');

    // Find the path after 'object/public/products/' or 'storage/v1/object/public/products/'
    const productsIndex = pathParts.findIndex((part) => part === 'products');
    if (productsIndex !== -1 && productsIndex < pathParts.length - 1) {
      return pathParts.slice(productsIndex + 1).join('/');
    }

    // Fallback: try to extract everything after '/products/'
    const match = url.match(/\/products\/(.+)$/);
    return match ? match[1] : '';
  } catch (error) {
    console.error('Error extracting path from URL:', error);
    return '';
  }
}

/**
 * Delete a file from Supabase storage
 * @param {string} path - File path in storage
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteFromSupabase(path) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Deleting file from storage:', path);

    const { error } = await safeSupabaseQuery(() =>
      supabase.storage.from('products').remove([path])
    );

    if (error) {
      console.error('❌ File deletion failed:', error.message);
      return false;
    }

    console.log('✅ File deleted successfully from storage');
    return true;
  } catch (error) {
    console.error('❌ Error deleting file from storage:', error);
    return false;
  }
}

/**
 * Delete an image by username and image path
 * @param {string} username - User's username
 * @param {string} imagePath - Image path or URL
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteImage(username, imagePath) {
  try {
    // Extract the actual path from URL if needed
    const actualPath = extractPathFromUrl(imagePath) || imagePath;

    // Ensure the path belongs to the user for security
    if (!actualPath.startsWith(`${username}/`)) {
      console.error('❌ Unauthorized: Image path does not belong to user');
      return false;
    }

    return await deleteFromSupabase(actualPath);
  } catch (error) {
    console.error('❌ Error deleting image:', error);
    return false;
  }
}

/**
 * Delete a file by username and file path
 * @param {string} username - User's username
 * @param {string} filePath - File path or URL
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteFile(username, filePath) {
  try {
    // Extract the actual path from URL if needed
    const actualPath = extractPathFromUrl(filePath) || filePath;

    // Ensure the path belongs to the user for security
    if (!actualPath.startsWith(`${username}/`)) {
      console.error('❌ Unauthorized: File path does not belong to user');
      return false;
    }

    return await deleteFromSupabase(actualPath);
  } catch (error) {
    console.error('❌ Error deleting file:', error);
    return false;
  }
}

//====== DISCOUNT MANAGEMENT FUNCTIONS ======//

/**
 * Create a new discount in the database
 * @param {Object} discountData - The discount data to create
 * @returns {Promise<Object>} - The created discount data
 */
export async function createDiscount(discountData) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Creating discount:', discountData.code);

    const { data, error } = await safeSupabaseQuery(() =>
      supabase.from('discounts_data').insert([discountData]).select().single()
    );

    if (error) {
      console.error('❌ Discount creation failed:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Discount created successfully:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Error creating discount:', error);
    throw error;
  }
}

/**
 * Update an existing discount in the database
 * @param {string} discountId - The ID of the discount to update
 * @param {Object} discountData - The updated discount data
 * @returns {Promise<Object>} - The updated discount data
 */
export async function updateDiscount(discountId, discountData) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Updating discount:', discountId);

    // Remove id from discountData to avoid conflicts
    const { id, ...updateData } = discountData;

    const { data, error } = await safeSupabaseQuery(() =>
      supabase
        .from('discounts_data')
        .update(updateData)
        .eq('id', discountId)
        .select()
        .single()
    );

    if (error) {
      console.error('❌ Discount update failed:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Discount updated successfully');
    return data;
  } catch (error) {
    console.error('❌ Error updating discount:', error);
    throw error;
  }
}

/**
 * Delete a discount from the database
 * @param {string} discountId - Discount ID to delete
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteDiscount(discountId) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Deleting discount:', discountId);

    const { error } = await safeSupabaseQuery(() =>
      supabase.from('discounts_data').delete().eq('id', discountId)
    );

    if (error) {
      console.error('❌ Discount deletion failed:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Discount deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Error deleting discount:', error);
    throw error;
  }
}

/**
 * Fetch all discounts for a user
 * @param {string} username - User's username
 * @returns {Promise<Array>} - Array of discounts
 */
export async function fetchDiscounts(username) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Fetching discounts for user:', username);

    const { data, error } = await safeSupabaseQuery(() =>
      supabase.from('discounts_data').select('*').eq('username', username)
    );

    // If the discounts table doesn't exist, Supabase returns an error with
    // Postgres error code `42P01` and a message similar to
    // "relation \"public.discounts\" does not exist". In that scenario we
    // **silently** return an empty array so that the rest of the application
    // can continue to work without showing an error toast.
    if (error) {
      const missingRelation =
        error?.code === '42P01' ||
        (typeof error?.message === 'string' &&
          error.message.includes('does not exist'));

      if (missingRelation) {
        console.warn(
          '⚠️  Discounts table not found in database. Skipping discounts fetch.'
        );
        return [];
      }

      console.error('❌ Failed to fetch discounts:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Discounts fetched successfully:', data?.length || 0);
    return data || [];
  } catch (error) {
    // If the outer try/catch is reached it means something unexpected
    // happened while talking to Supabase. We still apply the same missing
    // table safeguard just to be extra safe.
    const missingRelation =
      error?.code === '42P01' ||
      (typeof error?.message === 'string' &&
        error.message.includes('does not exist'));

    if (missingRelation) {
      console.warn(
        '⚠️  Discounts table not found in database. Returning empty list.'
      );
      return [];
    }

    console.error('❌ Error fetching discounts:', error);
    throw error;
  }
}

/**
 * Fetch a specific discount by ID
 * @param {string} discountId - Discount ID to fetch
 * @returns {Promise<Object>} - Discount data
 */
export async function fetchDiscountById(discountId) {
  const supabase = await createSupabaseClient();

  try {
    console.log('🔄 Fetching discount by ID:', discountId);

    const { data, error } = await safeSupabaseQuery(() =>
      supabase.from('discounts_data').select('*').eq('id', discountId).single()
    );

    if (error) {
      console.error('❌ Failed to fetch discount:', error.message);
      throw new Error(error.message);
    }

    console.log('✅ Discount fetched successfully');
    return data;
  } catch (error) {
    console.error('❌ Error fetching discount:', error);
    throw error;
  }
}
