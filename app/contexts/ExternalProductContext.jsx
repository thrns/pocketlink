'use client';

import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { useShop } from './ShopContext';
import {
  createProduct,
  updateProduct,
  uploadProductImage,
} from '@/lib/helpers/supabaseProductHelpers';

// Create the context explicitly
const ExternalProductContext = createContext({
  loading: false,
  addExternalProduct: async () => {},
  updateExternalProduct: async () => {},
});

export function ExternalProductProvider({ children }) {
  const { user } = useAuth();
  const { loadProducts } = useShop();
  const [loading, setLoading] = useState(false);

  // Helper function to download image from URL and convert to File object
  const downloadImageFromUrl = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');

      const blob = await response.blob();
      const filename =
        imageUrl.split('/').pop() || 'external-product-image.jpg';
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error('Error downloading image:', error);
      return null;
    }
  };

  const addExternalProduct = async (productData) => {
    if (!user?.username) {
      toast.error('You must be logged in to add products');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;

      // Check if there's a selected image file
      if (productData.imageFile) {
        // Use the uploaded file
        imageUrl = await uploadProductImage(
          user.username,
          productData.imageFile
        );
      } else if (productData.image && productData.image !== 'Image not found') {
        // Download from URL only if no file is uploaded
        const imageFile = await downloadImageFromUrl(productData.image);
        if (imageFile) {
          imageUrl = await uploadProductImage(user.username, imageFile);
        }
      }

      // Prepare product data for database
      const dbProductData = {
        username: user?.username,
        name: productData.title,
        price: productData.price,
        description: '',
        file_url: [],
        type: 'shopCard',
        product_type: 'external_link',
        images: imageUrl ? [imageUrl] : [],
        access_url: [productData.url], // Store original product URL
      };

      // Create the product
      await createProduct(dbProductData);

      // Refresh product list
      loadProducts();

      return true;
    } catch (error) {
      console.error('Error adding external product:', error);
      toast.error('Failed to add external product');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateExternalProduct = async (productId, productData) => {
    if (!user?.username) {
      toast.error('You must be logged in to update products');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;

      // Check if there's a selected image file
      if (productData.imageFile) {
        // Use the uploaded file
        imageUrl = await uploadProductImage(
          user.username,
          productData.imageFile
        );
      } else if (productData.image) {
        // Keep existing image if it's from storage
        if (productData.image.includes('supabase.co/storage')) {
          imageUrl = productData.image;
        }
        // Or download external image if it's a new URL
        else if (productData.image !== 'Image not found') {
          const imageFile = await downloadImageFromUrl(productData.image);
          if (imageFile) {
            imageUrl = await uploadProductImage(user.username, imageFile);
          }
        }
      }

      // Prepare product data for update
      const dbProductData = {
        name: productData.title,
        price: productData.price,
        // Only update images if we have a new image
        ...(imageUrl ? { images: [imageUrl] } : {}),
        access_url: [productData.url], // Update the original URL
      };

      // Update the product
      await updateProduct(productId, dbProductData);

      // Refresh product list
      loadProducts();

      return true;
    } catch (error) {
      console.error('Error updating external product:', error);
      toast.error('Failed to update external product');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    loading,
    addExternalProduct,
    updateExternalProduct,
  };

  return (
    <ExternalProductContext.Provider value={contextValue}>
      {children}
    </ExternalProductContext.Provider>
  );
}

export function useExternalProduct() {
  const context = useContext(ExternalProductContext);
  if (context === undefined) {
    throw new Error(
      'useExternalProduct must be used within an ExternalProductProvider'
    );
  }
  return context;
}
