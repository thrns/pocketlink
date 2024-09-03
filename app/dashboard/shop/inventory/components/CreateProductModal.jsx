'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Upload,
  Link,
  Trash2,
  Image,
  X,
  Check,
  ChevronRight,
  FileText,
  Package,
  DollarSign,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { hasActivePaymentGateway } from '@/lib/helpers/supabasePaymentGatewayHelpers';
import { toast } from 'sonner';

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
  onEdit,
  productToEdit,
  setProductToEdit,
  productType = 'digital',
  discounts = [],
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [hasPaymentGateway, setHasPaymentGateway] = useState(false);
  const [isFreeProduct, setIsFreeProduct] = useState(false);
  const [forcedFreeMode, setForcedFreeMode] = useState(false);

  const MAX_FILES = 6;
  const MAX_IMAGES = 6;
  const totalSteps = productType === 'physical' ? 2 : 3;

  const [product, setProduct] = useState({
    id: Date.now().toString(),
    title: '',
    description: '',
    price: '',
    discount_id: null,
    images: [],
    file_url: [],
    access_url: [],
    type: productType || 'digital',
  });

  // Check payment gateway on modal open
  useEffect(() => {
    const checkPaymentGateway = async () => {
      if (!user?.username) {
        setHasPaymentGateway(false);
        setForcedFreeMode(false);
        return;
      }

      try {
        const hasGateway = await hasActivePaymentGateway(user.username);
        setHasPaymentGateway(hasGateway);

        // Force free mode for digital products if no payment gateway
        if (!hasGateway && productType === 'digital') {
          setForcedFreeMode(true);
          setIsFreeProduct(true);
          setProduct((prev) => ({
            ...prev,
            price: '0',
            discount_id: null,
          }));
        } else {
          setForcedFreeMode(false);
        }
      } catch (error) {
        console.error('Error checking payment gateway:', error);
        setHasPaymentGateway(false);
        if (productType === 'digital') {
          setForcedFreeMode(true);
          setIsFreeProduct(true);
          setProduct((prev) => ({
            ...prev,
            price: '0',
            discount_id: null,
          }));
        }
      }
    };

    if (isOpen) {
      checkPaymentGateway();
    }
  }, [user?.username, isOpen, productType]);

  // Mock functions for demo
  const uploadFileWithProgress = async (file) => {
    console.log('🚀 uploadFileWithProgress started');

    if (!user?.username) {
      console.error('❌ No username available:', user);
      throw new Error('Username not available for file upload');
    }

    console.log('👤 Username:', user.username);

    return new Promise(async (resolve, reject) => {
      try {
        console.log('📦 Importing Supabase client...');
        // Import Supabase client
        const { supabase } = await import('@/Clients/supabase/client');
        console.log('✅ Supabase client imported:', !!supabase);

        // Sanitize filename to prevent issues
        const sanitizedFilename = file.name
          .replace(/[\\/:*?"<>|\s\u00A0]/g, '_')
          .replace(/\.\./g, '')
          .replace(/[^\w.-]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '')
          .substring(0, 100);

        console.log('🧹 Original filename:', file.name);
        console.log('🧹 Sanitized filename:', sanitizedFilename);

        // Construct file path: username/files/timestamp-filename
        const filePath = `${user.username}/files/${Date.now()}-${sanitizedFilename}`;
        console.log('📍 File path:', filePath);

        // Simulate progress for better UX
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress > 90) progress = 90; // Don't reach 100% until actual completion
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: Math.round(progress),
          }));
        }, 200);

        console.log('⏱️ Progress interval started');

        // Upload file to Supabase storage
        console.log('📤 Uploading file to path:', filePath);
        const { data: uploadData, error } = await supabase.storage
          .from('products')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        clearInterval(progressInterval);

        if (error) {
          console.error('❌ Upload error:', error);
          throw new Error(error.message);
        }

        console.log('✅ Upload successful:', uploadData);

        // Get public URL
        const { data: publicURLData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        console.log('🔗 Public URL data:', publicURLData);

        if (!publicURLData?.publicUrl) {
          throw new Error('Failed to get public URL');
        }

        // Complete progress
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 100,
        }));

        console.log('✅ File uploaded successfully:', publicURLData.publicUrl);
        resolve(publicURLData.publicUrl);
      } catch (error) {
        console.error('💥 CRITICAL ERROR in uploadFileWithProgress:', error);
        console.error('💥 Error name:', error.name);
        console.error('💥 Error message:', error.message);
        console.error('💥 Error stack:', error.stack);
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
        reject(error);
      }
    });
  };

  useEffect(() => {
    if (productToEdit) {
      const fileUrls = Array.isArray(productToEdit.file_url)
        ? productToEdit.file_url
        : productToEdit.file_url
          ? [productToEdit.file_url]
          : [];

      const accessUrls = Array.isArray(productToEdit.access_url)
        ? productToEdit.access_url
        : productToEdit.access_url
          ? JSON.parse(productToEdit.access_url)
          : [];

      const productImages =
        productToEdit.images ||
        (productToEdit.image ? [productToEdit.image] : []);

      const productPrice = parseFloat(productToEdit.price) || 0;
      setProduct({
        ...productToEdit,
        title: productToEdit.title || productToEdit.name || '',
        file_url: fileUrls,
        access_url: accessUrls,
        images: productImages,
        type: productToEdit.type || productType || 'digital',
        discount_id: productToEdit.discount_id || null,
      });
      setIsFreeProduct(productPrice === 0);

      setImagesPreviews(productImages);
      setLinks(accessUrls);
      setSelectedFiles([]);
      setSelectedImages([]);
    } else {
      resetForm();
    }
  }, [productToEdit, isOpen, productType]);

  const resetForm = async (cleanupUploads = false) => {
    // Clean up uploaded files if requested and not saving
    if (cleanupUploads && uploadedFileUrls.length > 0) {
      try {
        const { deleteFileFromSupabase } = await import(
          '@/lib/helpers/supabaseDeleteFileFromStorageHelpers'
        );

        console.log('🧹 Cleaning up uploaded files:', uploadedFileUrls);
        const deletePromises = uploadedFileUrls.map((url) =>
          deleteFileFromSupabase(url)
        );
        await Promise.all(deletePromises);
        console.log('✅ Uploaded files cleaned up successfully');
      } catch (error) {
        console.warn('⚠️ Failed to clean up uploaded files:', error);
      }
    }

    setProduct({
      id: Date.now().toString(),
      title: '',
      description: '',
      price: '',
      discount_id: null,
      images: [],
      file_url: [],
      access_url: [],
      type: productType || 'digital',
    });
    setImagePreview(null);
    setImagesPreviews([]);
    setSelectedFiles([]);
    setUploadedFileUrls([]);
    setSelectedImages([]);
    setLinks([]);
    setNewLink('');
    setCurrentStep(1);
    setUploadProgress({});
    setIsFreeProduct(false);
    setForcedFreeMode(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (
      selectedImages.length + files.length + imagesPreviews.length >
      MAX_IMAGES
    ) {
      toast.error(`You can upload a maximum of ${MAX_IMAGES} images`);
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagesPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleFileUpload = async (e) => {
    console.log('🎯 handleFileUpload triggered');
    const files = Array.from(e.target.files);
    console.log('📁 Files selected:', files.length);
    if (!files.length) return;

    const fileToUpload = files[0];
    console.log(
      '📤 Uploading file:',
      fileToUpload.name,
      fileToUpload.size,
      'bytes'
    );
    setSelectedFiles((prev) => [...prev, fileToUpload]);

    try {
      const fileUrl = await uploadFileWithProgress(fileToUpload);
      console.log('✅ Upload completed, got URL:', fileUrl);

      if (fileUrl) {
        setSelectedFiles((prev) =>
          prev.filter((f) => f.name !== fileToUpload.name)
        );
        setUploadedFileUrls((prev) => [...prev, fileUrl]);
        toast.success(`${fileToUpload.name} uploaded successfully!`);
      } else {
        console.warn('⚠️ Upload returned no URL');
        toast.error(`Failed to upload ${fileToUpload.name}`);
      }
    } catch (error) {
      console.error('❌ Upload error in handleFileUpload:', error);
      toast.error(`Upload failed: ${error.message}`);
      // Remove from selectedFiles on error
      setSelectedFiles((prev) =>
        prev.filter((f) => f.name !== fileToUpload.name)
      );
    }
  };

  const removeUploadedFile = (index) => {
    setUploadedFileUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(imagesPreviews[selectedImages.length + index]);
    setImagesPreviews((prev) =>
      prev.filter((_, i) => i !== index + product.images.length)
    );
  };

  const addLink = () => {
    if (!newLink) return;
    try {
      new URL(newLink);
      setLinks((prev) => [...prev, newLink]);
      setNewLink('');
    } catch (e) {
      toast.error('Please enter a valid URL');
    }
  };

  const removeLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFreeToggle = (isFree) => {
    // Don't allow toggling if in forced free mode (no payment gateway)
    if (forcedFreeMode) return;

    setIsFreeProduct(isFree);
    if (isFree) {
      setProduct((prev) => ({
        ...prev,
        price: '0',
        discount_id: null,
      }));
    }
  };

  const handlePriceChange = (newPrice) => {
    // Don't allow price changes if in forced free mode (no payment gateway)
    if (forcedFreeMode) return;

    const price = parseFloat(newPrice) || 0;
    setProduct((prev) => ({
      ...prev,
      price: newPrice,
      discount_id: price === 0 ? null : prev.discount_id,
    }));
    setIsFreeProduct(price === 0);
  };

  const handleSubmit = async () => {
    // Prevent physical product creation without payment gateway
    if (productType === 'physical' && !hasPaymentGateway) {
      toast.error(
        'Payment gateway required! Please set up a payment integration first to create physical products.'
      );
      return;
    }

    const hasValidTitle = product.title && product.title.trim().length > 0;
    const hasValidPrice =
      product.price !== '' &&
      product.price !== null &&
      product.price !== undefined;

    if (!hasValidTitle || !hasValidPrice) {
      toast.error('Title and Price are required!');
      return;
    }

    // Check if payment gateway is required
    const price = parseFloat(product.price) || 0;
    const requiresPaymentGateway =
      productType === 'physical' || (productType === 'digital' && price > 0);

    if (requiresPaymentGateway && !hasPaymentGateway) {
      toast.error(
        'Payment gateway required! Please set up a payment integration first for paid products.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const updatedProduct = {
        ...product,
        file_url: [...product.file_url, ...uploadedFileUrls],
        access_url: links,
      };

      if (productToEdit) {
        await onEdit(productToEdit.id, updatedProduct, selectedImages, []);
      } else {
        await onCreate(updatedProduct, selectedImages, []);
      }

      await resetForm(false); // Don't clean up uploads when successfully saving
      setProductToEdit(null);
      onClose();
    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error('Failed to submit product');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceedToNext = () => {
    if (currentStep === 1) {
      return product.title.trim() && product.price !== '';
    }
    return true;
  };

  const stepConfig = [
    {
      number: 1,
      label: 'Details',
      icon: <Package className="h-4 w-4" />,
      description: 'Basic information',
    },
    {
      number: 2,
      label: 'Media',
      icon: <Image className="h-4 w-4" />,
      description: 'Product images',
    },
    ...(productType !== 'physical'
      ? [
          {
            number: 3,
            label: 'Content',
            icon: <FileText className="h-4 w-4" />,
            description: 'Digital files & links',
          },
        ]
      : []),
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="p-6 text-black">
          <button
            onClick={async () => {
              await resetForm(true); // Clean up uploads when closing
              setProductToEdit(null);
              onClose();
            }}
            className="absolute right-4 top-4 rounded-lg bg-gray-100 bg-gray-200 p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">
              {productToEdit
                ? 'Edit Product'
                : `Create ${productType === 'physical' ? 'Physical' : 'Digital'} Product`}
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            {productType === 'physical'
              ? 'Set up a physical product for shipping'
              : 'Create downloadable or accessible digital content'}
          </p>

          {/* Payment Gateway Warning */}
          {!hasPaymentGateway && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-amber-800">
                    Payment Gateway Required
                  </h4>
                  <p className="mt-1 text-sm text-amber-700">
                    {productType === 'physical'
                      ? 'Physical products require payment integration. Please set up a payment gateway to create paid physical products.'
                      : 'Without payment integration, you can only create free digital products. Set up a payment gateway to offer paid digital products.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Steps - Full Width */}
        <div className="relative px-6 pb-6">
          <div className="relative flex items-center justify-between">
            {/* Progress Line Background */}
            <div className="absolute left-0 right-0 top-[20px] h-[2px] bg-gray-200" />

            {/* Active Progress Line */}
            <div
              className="absolute left-0 top-[20px] h-[2px] bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            />

            {/* Step Indicators */}
            {stepConfig.map((step, index) => (
              <div
                key={step.number}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Step Circle and Content */}
                <div
                  className={`flex items-center gap-3 rounded-full px-4 py-2 transition-all ${
                    currentStep === step.number
                      ? 'bg-gradient-to-r from-violet-100 to-purple-100'
                      : currentStep > step.number
                        ? 'bg-green-50'
                        : 'bg-white'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      currentStep === step.number
                        ? 'border-violet-500 bg-violet-500 text-white'
                        : currentStep > step.number
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">
                        {step.number}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${index === 0 ? 'block' : 'hidden md:block'}`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        currentStep === step.number
                          ? 'text-violet-700'
                          : currentStep > step.number
                            ? 'text-green-700'
                            : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </div>
                    <div
                      className={`text-xs ${
                        currentStep === step.number
                          ? 'text-violet-600'
                          : currentStep > step.number
                            ? 'text-green-600'
                            : 'text-gray-400'
                      }`}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6 pt-0">
          {/* Step 1: Basic Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a catchy product name"
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Describe what makes your product special"
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      <DollarSign className="mr-1 inline h-4 w-4" />
                      Price <span className="text-red-500">*</span>
                    </label>
                    {productType === 'digital' && !forcedFreeMode && (
                      <button
                        type="button"
                        onClick={() => handleFreeToggle(!isFreeProduct)}
                        className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                          isFreeProduct
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {isFreeProduct ? '✓ Free' : 'Make Free'}
                      </button>
                    )}
                    {forcedFreeMode && (
                      <span className="rounded-md bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                        Free (No Payment Gateway)
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={product.price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    disabled={isFreeProduct || forcedFreeMode}
                    className={`w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200 ${
                      isFreeProduct || forcedFreeMode
                        ? 'bg-gray-50 text-gray-500'
                        : ''
                    }`}
                  />
                  {/* Payment Gateway Warning */}
                  {(productType === 'physical' ||
                    (productType === 'digital' &&
                      parseFloat(product.price) > 0)) &&
                    !hasPaymentGateway && (
                      <div className="mt-2 flex items-center gap-2 rounded-md bg-amber-50 p-2 text-amber-800">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs">
                          Payment gateway required for paid products
                        </span>
                      </div>
                    )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Discount (Optional)
                    {(isFreeProduct || forcedFreeMode) && (
                      <span className="ml-2 text-xs text-gray-500">
                        {forcedFreeMode
                          ? '(Requires payment gateway)'
                          : '(Not available for free products)'}
                      </span>
                    )}
                  </label>
                  <select
                    value={product.discount_id || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        discount_id: e.target.value || null,
                      })
                    }
                    disabled={isFreeProduct || forcedFreeMode}
                    className={`w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200 ${
                      isFreeProduct || forcedFreeMode
                        ? 'bg-gray-50 text-gray-500'
                        : ''
                    }`}
                  >
                    <option value="">
                      {forcedFreeMode
                        ? 'No discount (Payment gateway required)'
                        : isFreeProduct
                          ? 'No discount (Free product)'
                          : 'No discount'}
                    </option>
                    {!isFreeProduct &&
                      !forcedFreeMode &&
                      discounts.map((discount) => (
                        <option key={discount.id} value={discount.id}>
                          {discount.name} (
                          {discount.type === 'percentage'
                            ? `${discount.value}%`
                            : `$${discount.value}`}{' '}
                          off)
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Product Images */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Product Images
                  </label>
                  <span className="text-sm text-gray-500">
                    {imagesPreviews.length} / {MAX_IMAGES} images
                  </span>
                </div>

                {/* Image Grid */}
                <div className="mb-4 grid grid-cols-3 gap-4">
                  {imagesPreviews.map((src, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg bg-gray-100"
                    >
                      <img
                        src={src}
                        alt={`Product ${index + 1}`}
                        className="h-32 w-full object-cover"
                      />
                      <div className="group-opacity-100 absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity">
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="rounded-lg bg-red-500 bg-red-600 p-2 text-white transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {imagesPreviews.length < MAX_IMAGES && (
                    <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 border-violet-400 bg-violet-50 transition-all">
                      <Image className="mb-2 h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Add Image</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Digital Content */}
          {currentStep === 3 && productType !== 'physical' && (
            <div className="space-y-6">
              {/* Files Section */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Digital Files
                  </label>
                  <span className="text-sm text-gray-500">
                    {uploadedFileUrls.length + selectedFiles.length} /{' '}
                    {MAX_FILES} files
                  </span>
                </div>

                {/* Uploaded Files */}
                {uploadedFileUrls.map((url, index) => (
                  <div
                    key={index}
                    className="mb-2 flex items-center justify-between rounded-lg bg-green-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-green-100 p-2">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">
                        File {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeUploadedFile(index)}
                      className="rounded-lg bg-red-100 p-1.5 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}

                {/* Uploading Files */}
                {selectedFiles.map((file, index) => (
                  <div
                    key={file.name}
                    className="mb-2 rounded-lg bg-blue-50 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                          <Upload className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress[file.name] || 0}%` }}
                      />
                    </div>
                    <span className="mt-1 text-xs text-blue-600">
                      {uploadProgress[file.name] || 0}% uploaded
                    </span>
                  </div>
                ))}

                {/* Upload Button */}
                {uploadedFileUrls.length + selectedFiles.length < MAX_FILES && (
                  <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 border-violet-400 bg-violet-50 p-4 transition-all">
                    <div className="text-center">
                      <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload files
                      </span>
                      <p className="mt-1 text-xs text-gray-400">
                        Max 100MB per file
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      onClick={() => console.log('🖱️ File input clicked')}
                    />
                  </label>
                )}
              </div>

              {/* Links Section */}
              <div>
                <label className="mb-4 block text-sm font-medium text-gray-700">
                  Access Links
                </label>

                {links.map((link, index) => (
                  <div
                    key={index}
                    className="mb-2 flex items-center justify-between rounded-lg bg-purple-50 p-3"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex-shrink-0 rounded-lg bg-purple-100 p-2">
                        <Link className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="truncate text-sm">{link}</span>
                    </div>
                    <button
                      onClick={() => removeLink(index)}
                      className="ml-2 flex-shrink-0 rounded-lg bg-red-100 p-1.5 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/product"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addLink())
                    }
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                  />
                  <button
                    onClick={addLink}
                    className="rounded-lg bg-violet-600 bg-violet-700 px-4 py-3 text-white transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex w-full items-center justify-between border-t bg-gray-50 px-6 py-4">
          <button
            onClick={async () => {
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
              } else {
                await resetForm(true); // Clean up uploads when canceling
                setProductToEdit(null);
                onClose();
              }
            }}
            className="px-6 py-2.5 text-gray-600 text-gray-800 transition-colors"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceedToNext()}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-medium transition-all ${
                canProceedToNext()
                  ? 'bg-violet-600 bg-violet-700 text-white'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              } `}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-bento-violet px-6 py-2.5 font-medium text-white transition-all"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  {productToEdit ? 'Update Product' : 'Create Product'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
