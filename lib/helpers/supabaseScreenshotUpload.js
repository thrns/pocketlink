//====== SUPABASE SCREENSHOT UPLOAD HELPERS ======//

import { createSupabaseClient } from '@/Clients/supabase/server';

//====== SCREENSHOT UPLOAD FUNCTION ======//

export async function uploadScreenshot(username, purpose, file) {
  try {
    const { fileName, fileBuffer } = file;
    const filePath = `${username}/${purpose}/${fileName}`;

    console.log(`Uploading file: ${filePath}`);

    const supabase = await createSupabaseClient();

    //====== FILE UPLOAD TO STORAGE ======//

    const { data, error } = await supabase.storage
      .from('items_data_storage')
      .upload(filePath, fileBuffer, {
        contentType: 'image/png', // Ensure PNG format
        upsert: false, // Avoid overwriting existing files
      });

    if (error) {
      console.error('Supabase Upload Error:', error.message);
      throw new Error(`Supabase Upload Failed: ${error.message}`);
    }

    //====== PUBLIC URL GENERATION ======//

    // Get the public URL of the uploaded file
    // Retrieve the public URL of the uploaded file
    const { data: publicURLData, error: urlError } = await supabase.storage
      .from('items_data_storage')
      .getPublicUrl(filePath);

    if (urlError || !publicURLData?.publicUrl) {
      console.error(
        'Error getting public URL:',
        urlError?.message || 'No URL returned'
      );
      return reject(new Error('Failed to retrieve public URL'));
    }

    const ImageUrl = publicURLData.publicUrl;

    console.log('File uploaded successfully:', ImageUrl);

    //====== RETURN RESULT ======//

    return {
      imageUrl: ImageUrl,
      filePath: filePath, // Useful for logging/tracking
    };
  } catch (error) {
    console.error('Error in uploadScreenshot function:', error.message);
    throw new Error('Failed to upload screenshot to Supabase.');
  }
}
