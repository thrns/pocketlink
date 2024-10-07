import { supabase } from '@/Clients/supabase/client';

//====== AVATAR FILE UPLOAD ======//

export async function avatarFileUpload(username, purpose, file) {
  console.log('file: ', file);
  return new Promise(async (resolve, reject) => {
    if (!username) {
      console.error('No username provided.');
      return reject(new Error('No username provided.'));
    }

    try {
      // Check if the user is authenticated
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error(
          'User not authenticated:',
          authError?.message || 'No user data'
        );
        return reject(new Error('User not authenticated'));
      }

      console.log('Authenticated User:', user);

      // Construct the storage path: "username/purpose/timestamp-filename"
      const filePath = `${username}/${purpose}/${Date.now()}-${username}`;

      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false, // Avoid overwriting existing files
        });

      if (error) {
        console.error('Supabase Upload Error:', error.message);
        return reject(new Error(`Supabase Upload Failed: ${error.message}`));
      }

      // Retrieve the public URL of the uploaded file
      const { data: publicURLData, error: urlError } = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (urlError || !publicURLData?.publicUrl) {
        console.error(
          'Error getting public URL:',
          urlError?.message || 'No URL returned'
        );
        return reject(new Error('Failed to retrieve public URL'));
      }

      console.log('File uploaded successfully:', publicURLData.publicUrl);
      resolve(publicURLData.publicUrl);
    } catch (error) {
      console.error('Unexpected error during upload:', error);
      reject(new Error('Unexpected error during file upload'));
    }
  });
}

//====== ITEMS DATA FILE UPLOAD ======//

export async function uploadFileToItemsData(username, purpose, file) {
  return new Promise(async (resolve, reject) => {
    if (!username) {
      console.error('No username provided.');
      return reject(new Error('No username provided.'));
    }

    try {
      // Check if the user is authenticated
      // const { data: user, error: authError } = await createSupabaseClient.auth.getUser();
      // if (authError || !user) {
      //   console.error("User not authenticated:", authError?.message || "No user data");
      //   return reject(new Error("User not authenticated"));
      // }

      // console.log("Authenticated User:", user);

      // Construct the storage path: "username/purpose/timestamp-filename"
      const filePath = `${username}/${purpose}/${Date.now()}-${username}`;

      // Upload the file to Supabase storage
      console.log('Uploading file to Supabase...');
      const { data, error: uploadError } = await supabase.storage
        .from('items_data_storage')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/png',
        });

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
        return reject(new Error(`Upload failed: ${uploadError.message}`));
      }

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

      console.log('File uploaded successfully:', publicURLData.publicUrl);
      resolve(publicURLData.publicUrl);
    } catch (error) {
      console.error('Unexpected error during upload:', error);
      reject(new Error('Unexpected error during file upload'));
    }
  });
}

//====== TEMPLATE FILE UPLOAD (COMMENTED) ======//

// export async function templateFileUpload(folder, category, title, file) {

//   console.log("file: ", file)
//   return new Promise(async (resolve, reject) => {
//     if (!folder) {
//       console.error("No folder provided.");
//       return reject(new Error("No folder provided."));
//     }

//     try {
//       // Check if the user is authenticated
//       const { data: user, error: authError } = await createSupabaseClient.auth.getUser();
//       if (authError || !user) {
//         console.error("User not authenticated:", authError?.message || "No user data");
//         return reject(new Error("User not authenticated"));
//       }

//       console.log("Authenticated User:", user);

//       // Construct the storage path: "folder/category/timestamp-title"
//       const filePath = `${folder}/${category}/${Date.now()}-${title}`;

//       // Upload the file to Supabase storage
//       const { data, error } = await createSupabaseClient.storage
//         .from("templates")
//         .upload(filePath, file, {
//           cacheControl: "3600",
//           upsert: false,
//         });

//       if (error) {
//         console.error("Upload error:", error.message);
//         return reject(new Error(`Upload failed: ${error.message}`));
//       }

//       // Retrieve the public URL of the uploaded file
//       const { data: publicURLData, error: urlError } = await createSupabaseClient.storage
//         .from("templates")
//         .getPublicUrl(filePath);

//       if (urlError || !publicURLData?.publicUrl) {
//         console.error("Error getting public URL:", urlError?.message || "No URL returned");
//         return reject(new Error("Failed to retrieve public URL"));
//       }

//       console.log("File uploaded successfully:", publicURLData.publicUrl);
//       resolve(publicURLData.publicUrl);
//     } catch (error) {
//       console.error("Unexpected error during upload:", error);
//       reject(new Error("Unexpected error during file upload"));
//     }
//   });
// }
