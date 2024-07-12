'use client';
import React, { useState, useCallback, useMemo } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { FaLink } from 'react-icons/fa';
import { useFetch } from '@/app/contexts/FetcherContext';
import { Loader2Icon, PlusCircle, LinkIcon } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

export default function URLDockIcon({ handleAdd }) {
  const { user } = useAuth();
  const { theme } = useFetch();
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  // Extract domain from URL to track domain changes
  const getUrlDomain = useCallback((urlString) => {
    if (!urlString) return '';
    try {
      const url = new URL(urlString);
      return url.hostname;
    } catch (error) {
      return urlString; // Return the original string if it's not a valid URL
    }
  }, []);

  // Memoized current URL domain
  const currentUrlDomain = useMemo(() => {
    return getUrlDomain(url);
  }, [url, getUrlDomain]);

  // Sanitize and correct URL
  const sanitizeURL = useCallback((inputUrl) => {
    let sanitizedUrl = inputUrl.trim();

    // Common URL patterns and corrections
    const commonDomains = {
      google: 'google.com',
      fb: 'facebook.com',
      insta: 'instagram.com',
      yt: 'youtube.com',
      amzn: 'amazon.com',
      wiki: 'wikipedia.org',
      tw: 'twitter.com',
      x: 'x.com',
    };

    // Add https:// if no protocol specified
    if (!sanitizedUrl.match(/^[a-zA-Z]+:\/\//)) {
      sanitizedUrl = 'https://' + sanitizedUrl;
    }

    try {
      const urlObj = new URL(sanitizedUrl);

      // Check for common misspellings in domain
      for (const [short, full] of Object.entries(commonDomains)) {
        if (
          urlObj.hostname.includes(short) &&
          !urlObj.hostname.includes(full)
        ) {
          // This is a simplified correction, would need more sophisticated logic for production
          urlObj.hostname = full;
          return urlObj.toString();
        }
      }

      return sanitizedUrl;
    } catch (err) {
      // If URL parsing fails, return the sanitized URL anyway
      return sanitizedUrl;
    }
  }, []);

  // Validate the URL format
  const validateURL = useCallback((inputUrl) => {
    try {
      new URL(inputUrl);
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  // Screenshot the preview image
  const getPreviewImage = useCallback(async ({ url, username, purpose }) => {
    try {
      // Make the POST request to your API endpoint
      setLoading(true);
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, username, purpose }),
      });

      const data = await response.json();
      setLoading(false);

      console.log('data: ', data?.imageUrl);

      if (data.imageUrl) {
        // If an image URL is returned, return the image URL
        return { imageUrl: data.imageUrl, showPreview: true };
      } else {
        // If no image is returned, return null and showPreview as false
        return { imageUrl: null, showPreview: false };
      }
    } catch (error) {
      console.error('####Request failed:', error);
      return { imageUrl: null, showPreview: false }; // Handle failure gracefully
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!title.trim()) {
        setError('Title cannot be empty.');
        return;
      }

      // Sanitize and potentially correct the URL first
      const sanitizedUrl = sanitizeURL(url);

      // Update the URL field with the sanitized version
      if (sanitizedUrl !== url) {
        setUrl(sanitizedUrl);
      }

      // Validate the sanitized URL
      if (!validateURL(sanitizedUrl)) {
        setError('Please enter a valid URL.');
        return;
      }

      // // Inside your function where you're calling handleAdd
      // const { imageUrl, showPreview } = await getPreviewImage({
      //   url: sanitizedUrl,
      //   username: user?.username,
      //   purpose: "url",
      // });

      // Now, you can use these values when calling handleAdd
      handleAdd('url', 'vertical', {
        url: sanitizedUrl,
        title,
        watermark: false,
        background: '',
        showPreview: true,
        displayImage: null,
      });

      setUrl('');
      setTitle('');
      setError(''); // Clear errors
    },
    [
      title,
      url,
      sanitizeURL,
      validateURL,
      getPreviewImage,
      user?.username,
      handleAdd,
      theme,
    ]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="group flex h-full w-full items-center justify-center rounded-lg transition-all duration-200">
          <LinkIcon className="group-scale-110 h-5 w-5 transition-transform duration-200" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl border border-gray-200 p-5 shadow-lg dark:border-gray-700">
        <h3 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
          URL Component
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(''); // Clear error as user types
              }}
              placeholder="Enter a descriptive title"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="urlInput"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              URL
            </label>
            <input
              id="urlInput"
              type="text"
              onMouseDown={(e) => e.stopPropagation()}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError(''); // Clear error as user types
              }}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-2 text-sm font-medium text-red-500 dark:bg-red-900/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FaLink className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Processing...' : 'Add URL Component'}
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
