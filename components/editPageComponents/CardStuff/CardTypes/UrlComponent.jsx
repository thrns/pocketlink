'use client';
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { motion } from 'framer-motion';
import { useItems } from '@/app/contexts/ItemsContext';
import { useAuth } from '@/app/contexts/AuthContext';

// Layout Components
import UrlSquare from './URLComponents/UrlSquare';
import UrlHorizontal from './URLComponents/UrlHorizontal';
import UrlVertical from './URLComponents/UrlVertical';
import UrlDoubleHorizontal from './URLComponents/UrlDoubleHorizontal';
import UrlHalfHorizontal from './URLComponents/UrlHalfHorizontal';

import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';

export default function UrlComponent({
  itemId,
  card,
  isEditing,
  isTenant,
  username,
  themeData,
}) {
  const { user } = useAuth();
  const { url, title } = card || {};
  const { updateItemContent } = useItems();

  // Keep track of the last URL domain to prevent unnecessary fetches
  const lastUrlDomainRef = useRef('');

  // Track upload states
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Default fallbacks
  const initialFavicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
  const initialDisplayImage = null;

  // Card state - use a function for initialization to avoid re-computation on re-renders
  const [cardContent, setCardContent] = useState(() => ({
    title: title || '',
    favicon: card?.favicon || initialFavicon,
    displayImage: card?.displayImage || initialDisplayImage,
    url: url || '',
    showPreview: card?.showPreview !== false,
    watermark: card?.watermark !== false,
    showPreview: card?.showPreview !== false, // Add preview toggle option
  }));

  // Use effect to sync props with state ONLY when props actually change
  // This prevents unnecessary re-renders from prop changes
  const urlRef = useRef(url);
  const titleRef = useRef(title);

  useEffect(() => {
    let needsUpdate = false;
    const updates = {};

    // Only update state if props actually changed
    if (url !== urlRef.current) {
      urlRef.current = url;
      updates.url = url || '';
      needsUpdate = true;
    }

    if (title !== titleRef.current) {
      titleRef.current = title;
      updates.title = title || '';
      needsUpdate = true;
    }

    if (needsUpdate) {
      setCardContent((prev) => ({
        ...prev,
        ...updates,
      }));
    }
  }, [url, title]);

  // Watermark state
  const [watermarkEnabled, setWatermarkEnabled] = useState(
    card?.watermark !== false
  );

  // Extract domain from URL - stable function with no dependencies
  const getUrlDomain = useCallback((urlString) => {
    if (!urlString) return '';
    try {
      const url = new URL(urlString);
      return url.hostname;
    } catch (error) {
      return urlString; // Return the original string if it's not a valid URL
    }
  }, []);

  // Function to check if an image is custom - stable with no dependencies
  const isCustomImageCheck = useCallback((imageUrl, siteUrl) => {
    if (!imageUrl || !siteUrl) return false;

    try {
      const imageHostname = new URL(imageUrl).hostname;
      const siteHostname = new URL(siteUrl).hostname;

      // If hostnames don't match, it's a custom image
      return !imageHostname.includes(siteHostname);
    } catch (error) {
      console.error('Error checking custom image:', error);
      return false;
    }
  }, []);

  // Initialize state to track if user has set a custom image
  const [isCustomImage, setIsCustomImage] = useState(
    () => !!card?.displayImage && isCustomImageCheck(card?.displayImage, url)
  );

  // Store custom image URL in a ref to avoid losing it during renders
  const customImageUrlRef = useRef(
    !!card?.displayImage && isCustomImageCheck(card?.displayImage, url)
      ? card?.displayImage
      : null
  );

  // Determine if the component should have preview functionality - only depends on card.sizeKey
  const shouldHavePreview = useMemo(() => {
    const layout = card?.sizeKey || 'square';
    return ['vertical', 'horizontal', 'doubleHorizontal'].includes(layout);
  }, [card?.sizeKey]);

  // Memoized current URL domain - depends only on cardContent.url
  const currentUrlDomain = useMemo(() => {
    return getUrlDomain(cardContent.url);
  }, [cardContent.url, getUrlDomain]);

  // Toggle watermark - stable with explicit dependencies
  const toggleWatermark = useCallback(
    (e) => {
      e.stopPropagation();
      setWatermarkEnabled((prevState) => {
        const newValue = !prevState;
        updateItemContent(itemId, { watermark: newValue });
        return newValue;
      });
    },
    [updateItemContent, itemId]
  );

  // Toggle preview enabled/disabled - completely turns off fetching
  const toggleshowPreview = useCallback(
    (e) => {
      e.stopPropagation();
      setCardContent((prevState) => {
        const newshowPreview = !prevState.showPreview;

        // If turning preview off, no need to update anything else
        if (!newshowPreview) {
          updateItemContent(itemId, { showPreview: false });
          return { ...prevState, showPreview: false };
        }

        // If turning preview on and we have no image, force clear lastUrlDomainRef
        // so that we'll fetch a new preview
        if (newshowPreview && !isCustomImage && !prevState.displayImage) {
          lastUrlDomainRef.current = '';
        }

        updateItemContent(itemId, { showPreview: true });
        return { ...prevState, showPreview: true };
      });
    },
    [updateItemContent, itemId, isCustomImage]
  );

  // Function to update content - stable with explicit dependencies
  const handleChange = useCallback(
    (field, value, forceCustom = null) => {
      // Special handling for URL changes to prevent unnecessary re-renders
      if (field === 'url') {
        setCardContent((prev) => {
          // Only update if the URL actually changed
          if (prev.url === value) return prev;

          const newContent = { ...prev, [field]: value };

          // If we're changing URL and it's not a custom image,
          // reset the preview data so we'll fetch a new one
          if (!isCustomImage) {
            newContent.displayImage = null;
            lastUrlDomainRef.current = '';
          }

          // Update server
          updateItemContent(itemId, newContent);

          return newContent;
        });
        return;
      }

      // Handle display image changes
      if (field === 'displayImage') {
        if (value) {
          const isCustom =
            forceCustom !== null
              ? forceCustom
              : isCustomImageCheck(value, cardContent.url);

          setIsCustomImage(isCustom);
          if (isCustom) {
            customImageUrlRef.current = value;
          }
        } else {
          setIsCustomImage(false);
          customImageUrlRef.current = null;
        }
      }

      // Handle regular field updates
      setCardContent((prev) => {
        // Skip update if value hasn't changed
        if (prev[field] === value) return prev;

        const newContent = { ...prev, [field]: value };

        // Update server
        updateItemContent(itemId, { [field]: value });

        return newContent;
      });
    },
    [updateItemContent, itemId, isCustomImageCheck, isCustomImage]
  );

  // Upload main image - stable with explicit dependencies
  const handleImageUpload = useCallback(
    async (e) => {
      if (!user?.username || !e.target.files?.[0]) return;

      setIsUploading(true);
      try {
        const file = e.target.files[0];
        const downloadURL = await uploadFileToItemsData(
          user.username,
          'url',
          file
        );

        // Always set uploaded images as custom
        customImageUrlRef.current = downloadURL;
        setIsCustomImage(true);

        setCardContent((prev) => {
          const newContent = {
            ...prev,
            displayImage: downloadURL,
            showPreview: true,
          };

          // Update server
          updateItemContent(itemId, {
            displayImage: downloadURL,
            showPreview: true,
          });

          return newContent;
        });
      } catch (error) {
        console.error('Error uploading main image:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [user?.username, updateItemContent, itemId]
  );

  // Upload favicon - stable with explicit dependencies
  const handleFaviconUpload = useCallback(
    async (e) => {
      if (!user?.username || !e.target.files?.[0]) return;

      setIsUploadingFavicon(true);
      try {
        const file = e.target.files[0];
        const downloadURL = await uploadFileToItemsData(
          user.username,
          'favicon',
          file
        );

        setCardContent((prev) => {
          const newContent = { ...prev, favicon: downloadURL };
          updateItemContent(itemId, { favicon: downloadURL });
          return newContent;
        });
      } catch (error) {
        console.error('Error uploading favicon:', error);
      } finally {
        setIsUploadingFavicon(false);
      }
    },
    [user?.username, updateItemContent, itemId]
  );

  // Function to fetch preview - separated fetch logic from state updates
  const fetchUrlPreview = useCallback(
    async (urlToFetch) => {
      if (!urlToFetch || !shouldHavePreview || isCustomImage) return null;

      try {
        // Validate URL format
        new URL(urlToFetch);

        // Skip if this is the same domain we already fetched
        const urlDomain = getUrlDomain(urlToFetch);
        if (urlDomain === lastUrlDomainRef.current) {
          return null;
        }

        // Fetch preview data
        const response = await fetch('/api/screenshot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: urlToFetch,
            username: user?.username,
            purpose: 'url',
          }),
        });

        const data = await response.json();
        lastUrlDomainRef.current = urlDomain;

        return data.imageUrl || null;
      } catch (error) {
        console.error('Failed to fetch URL preview:', error);
        return null;
      }
    },
    [shouldHavePreview, getUrlDomain, user?.username, isCustomImage]
  );

  // Track the initial URL and only re-fetch when it actually changes
  const previousUrlRef = useRef(cardContent.url);

  // Effect to trigger preview fetch - only when URL actually changes or there's no display image
  useEffect(() => {
    // Skip if:
    // - no URL domain
    // - preview functionality not supported by layout
    // - custom image is set
    // - preview is disabled by user preference
    if (
      !currentUrlDomain ||
      !shouldHavePreview ||
      isCustomImage ||
      !cardContent.showPreview
    )
      return;

    // Only run this effect if:
    // 1. URL has changed from previous render (compare with ref)
    // 2. OR there's no display image and we haven't fetched for this domain yet
    const urlChanged = previousUrlRef.current !== cardContent.url;
    const needsInitialImage =
      !cardContent.displayImage &&
      lastUrlDomainRef.current !== currentUrlDomain;

    if (!urlChanged && !needsInitialImage) return;

    // Update the previous URL ref
    previousUrlRef.current = cardContent.url;

    // Set timeout for debouncing
    let isMounted = true;
    const timer = setTimeout(async () => {
      setIsPreviewLoading(true);

      const imageUrl = await fetchUrlPreview(cardContent.url);

      if (isMounted) {
        setIsPreviewLoading(false);

        if (imageUrl) {
          // Avoid state updates if nothing changed
          if (cardContent.displayImage !== imageUrl) {
            setCardContent((prev) => {
              // Only update if the URL is still the same as when we started fetching
              if (prev.url !== cardContent.url) return prev;

              return {
                ...prev,
                displayImage: imageUrl,
                showPreview: true,
              };
            });

            // Move the updateItemContent outside of the setState call
            if (cardContent.url) {
              updateItemContent(itemId, {
                displayImage: imageUrl,
                showPreview: true,
              });
            }
          }
        } else if (cardContent.showPreview) {
          // Only update if we're changing from true to false
          setCardContent((prev) => {
            return { ...prev, showPreview: false };
          });

          // Move the updateItemContent outside of the setState call
          updateItemContent(itemId, { showPreview: false });
        }
      }
    }, 500); // Debounce to avoid too many API calls

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [
    cardContent.url,
    cardContent.displayImage,
    cardContent.showPreview,
    cardContent.showPreview, // Add dependency on preview toggle
    currentUrlDomain,
    shouldHavePreview,
    isCustomImage,
    fetchUrlPreview,
    updateItemContent,
    itemId,
  ]);

  // Reset auto-fetch preview - stable with explicit dependencies
  const resetCustomImage = useCallback(() => {
    setIsCustomImage(false);
    customImageUrlRef.current = null;

    setCardContent((prev) => {
      const newContent = { ...prev, displayImage: null };
      updateItemContent(itemId, { displayImage: null });
      return newContent;
    });

    // Reset domain to force new fetch
    lastUrlDomainRef.current = '';
  }, [updateItemContent, itemId]);

  // Handle hide settings changes
  const handleHideSettingsChange = useCallback(
    (itemId, hideSettings) => {
      updateItemContent(itemId, hideSettings);
    },
    [updateItemContent]
  );

  // Choose which layout to render
  const LAYOUTS = {
    square: UrlSquare,
    horizontal: UrlHorizontal,
    vertical: UrlVertical,
    doubleHorizontal: UrlDoubleHorizontal,
    halfHorizontal: UrlHalfHorizontal,
  };

  const Layout = LAYOUTS[card?.sizeKey] || UrlSquare;

  // Framer-motion card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative h-full w-full">
      <Layout
        themeData={themeData}
        cardVariants={cardVariants}
        itemId={itemId}
        card={card}
        isEditing={isEditing}
        watermarkEnabled={watermarkEnabled}
        toggleWatermark={toggleWatermark}
        showPreview={cardContent.showPreview}
        toggleshowPreview={toggleshowPreview}
        cardContent={cardContent}
        handleChange={handleChange}
        handleImageUpload={handleImageUpload}
        handleFaviconUpload={handleFaviconUpload}
        isUploading={isUploading}
        isUploadingFavicon={isUploadingFavicon}
        isPreviewLoading={isPreviewLoading}
        shouldHavePreview={shouldHavePreview}
        isTenant={isTenant}
        username={username}
        hasCustomImage={isCustomImage}
        resetCustomImage={resetCustomImage}
      />

    
    </div>
  );
}
