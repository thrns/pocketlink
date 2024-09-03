import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useExternalProduct } from '@/app/contexts/ExternalProductContext';
import { Pencil } from 'lucide-react';

const ExternalLinkModal = ({ isOpen, onClose, productToEdit = null }) => {
  const { addExternalProduct, updateExternalProduct } = useExternalProduct();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // Form fields for editable product data
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Reset the state when modal is opened or closed
  useEffect(() => {
    if (isOpen && productToEdit) {
      // We're in edit mode
      setIsEditing(true);

      // Get the image URL - handle both cases where image is in images array or directly in image property
      const imageUrl = productToEdit.images?.[0] || productToEdit.image || '';

      setProductData({
        name: productToEdit.title || productToEdit.name,
        price: productToEdit.price,
        image: imageUrl,
        url: productToEdit.access_url?.[0] || '',
      });

      setProductName(productToEdit.title || productToEdit.name);
      setProductPrice(productToEdit.price);
      setProductImage(imageUrl);
      setImagePreview(imageUrl);
      setUrl(productToEdit.access_url?.[0] || '');
      setSelectedImage(null);
    } else if (isOpen) {
      // Reset for new product mode
      setIsEditing(false);
      setUrl('');
      setProductData(null);
      setProductName('');
      setProductPrice('');
      setProductImage('');
      setImagePreview('');
      setSelectedImage(null);
    }
  }, [isOpen, productToEdit]);

  const handleSubmit = async () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      new URL(url); // Validate URL format

      setLoading(true);
      setProductData(null); // Reset any previous product data

      // Call the API endpoint to fetch product details
      const response = await fetch('/api/scrape-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      // Store the product data in state
      setProductData(data);

      // Pre-fill the editable fields
      setProductName(data.name);
      setProductPrice(data.price !== 'Price not found' ? data.price : '');
      setProductImage(data.image !== 'Image not found' ? data.image : '');
      setImagePreview(data.image !== 'Image not found' ? data.image : '');

      toast.success('Product details extracted successfully');
    } catch (e) {
      console.error(e);
      toast.error(e.message || 'Please enter a valid URL');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setProductImage(''); // Clear the URL image when a file is selected
    };
    reader.readAsDataURL(file);

    // Store the file for upload
    setSelectedImage(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAddProduct = async () => {
    if (!productName || !productPrice) {
      toast.error('Product name and price are required');
      return;
    }

    try {
      setLoading(true);

      const externalProduct = {
        title: productName,
        price: productPrice,
        image: productImage,
        url: url,
        type: 'shopCard',
        product_type: 'external_link',
        imageFile: selectedImage, // Pass the selected image file
      };

      if (isEditing && productToEdit) {
        // Update existing product
        await updateExternalProduct(productToEdit.id, externalProduct);
        toast.success('External product updated successfully');
      } else {
        // Add new product
        await addExternalProduct(externalProduct);
        toast.success('External product added to inventory');
      }

      // Reset form and close modal
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error saving external product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductData(null);
    setUrl('');
    setProductName('');
    setProductPrice('');
    setProductImage('');
    setImagePreview('');
    setSelectedImage(null);
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? 'Edit External Product' : 'Add External Product'}
          </DialogTitle>
        </DialogHeader>

        {!productData && !isEditing ? (
          <div className="py-4">
            <p className="mb-4 text-sm text-gray-600">
              Share the URL of any product from your favorite brands that you'd
              like to promote and sell.
            </p>
            <Input
              placeholder="https://example.com/product"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="group relative h-40 w-40 overflow-hidden rounded-md border">
                {imagePreview ? (
                  <div className="relative h-full w-full">
                    <img
                      src={imagePreview}
                      alt={productName}
                      className="h-full w-full object-contain"
                    />
                    <div
                      className="group-opacity-100 absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity"
                      onClick={triggerFileInput}
                    >
                      <Pencil className="h-6 w-6 text-white" />
                      <span className="ml-1 text-xs text-white">Edit</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex h-full w-full cursor-pointer items-center justify-center bg-gray-100"
                    onClick={triggerFileInput}
                  >
                    <Pencil className="h-6 w-6 text-gray-400" />
                    <span className="ml-1 text-sm text-gray-400">
                      Add image
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="w-full flex-1 space-y-4">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <Label htmlFor="productPrice">Product Price</Label>
                  <Input
                    id="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="0.00"
                    type="number"
                  />
                </div>

                {!isEditing && (
                  <p className="truncate text-xs text-gray-500" title={url}>
                    Source: {new URL(url).hostname}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {!productData && !isEditing ? (
            <>
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Loading...' : 'Extract Details'}
              </Button>
            </>
          ) : (
            <>
              {!isEditing && (
                <Button variant="outline" onClick={resetForm}>
                  Try Another URL
                </Button>
              )}
              <Button onClick={handleAddProduct} disabled={loading}>
                {loading
                  ? 'Saving...'
                  : isEditing
                    ? 'Update Product'
                    : 'Add To Inventory'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExternalLinkModal;
