//====== SUPABASE FILE DELETION HELPERS ======//

import { supabase } from '@/Clients/supabase/client';

//====== UTILITY FUNCTIONS ======//

// Helper function to extract the storage path from a Supabase public URL
export const extractStoragePath = (url) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL;
    console.log('baseUrl: ', baseUrl);
    if (url.startsWith(baseUrl)) {
      return url.replace(`${baseUrl}/storage/v1/object/public/`, '');
    }
  } catch (error) {
    console.error('Error extracting storage path:', error);
  }
  return null;
};

//====== FILE DELETION FUNCTIONS ======//

// Function to delete an image by URL
export const deleteFileFromSupabase = async (url) => {
  if (!url) {
    console.error('No URL provided for deletion.');
    return;
  }

  try {
    const storagePath = extractStoragePath(url);
    if (!storagePath) {
      console.error('Unable to extract storage path from image URL:', url);
      return;
    }

    // Extract bucket name and file path
    const [bucket, ...pathParts] = storagePath.split('/');
    const filePath = pathParts.join('/');

    // Delete the image from Supabase storage
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      throw error;
    }

    console.log(`File deleted successfully: ${url}`);
    return true;
  } catch (error) {
    console.error(`Error deleting file (${url}):`, error.message);
    return false;
  }
};
