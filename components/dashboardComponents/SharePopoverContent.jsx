import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'sonner';
import { Check, ChevronRight, Copy, ExternalLink, EyeOff } from 'lucide-react';

const SharePopoverContent = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const username = user?.username;

  const [ogImgUrl, setOgImgUrl] = useState('');
  const [isLoadingOg, setIsLoadingOg] = useState(false);

  // Fetch OG image when component mounts or user changes
  useEffect(() => {
    const fetchOgImage = async () => {
      if (!user?.username) return;

      setIsLoadingOg(true);
      try {
        const response = await fetch(
          `https://pocketlink.co/api/og?username=${user.username}`
        );
        if (response.ok) {
          console.log('response: ', response);
          const imageUrl = response.url;
          setOgImgUrl(imageUrl);
        } else {
          // Fallback to default image if API fails
          setOgImgUrl('https://pocketlink.co/openGraph.png');
        }
      } catch (error) {
        console.error('Failed to fetch OG image:', error);
        // Fallback to default image
        setOgImgUrl('https://pocketlink.co/openGraph.png');
      } finally {
        setIsLoadingOg(false);
      }
    };

    fetchOgImage();

    // Cleanup blob URL when component unmounts
    return () => {
      if (ogImgUrl && ogImgUrl.startsWith('blob:')) {
        URL.revokeObjectURL(ogImgUrl);
      }
    };
  }, []);

  // Generate the profile URL
  const profileUrl = user?.username
    ? `https://${user.username}.pocketlink.co/`
    : '';

  // Use the passed ogImgUrl or fallback to default
  const ogImageUrl = ogImgUrl;

  const handleCopyToClipboard = async () => {
    if (!profileUrl) return;

    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');

      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy link');
    }
  };

  const handleOpenLink = () => {
    if (!profileUrl) return;
    window.open(profileUrl, '_blank', 'noopener,noreferrer');
  };

  if (!user?.username) {
    return null; // Don't render if no user
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Share Profile</h3>
      </div>

      {/* OG Image Preview */}
      <div className="mb-6">
        <div className="relative aspect-[1.91/1] overflow-hidden rounded-lg border bg-gray-100">
          {isLoadingOg ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
            </div>
          ) : (
            ogImageUrl && (
              <>
                <img
                  src={ogImageUrl}
                  alt="Profile preview"
                  className={`h-full w-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>

      {/* Profile URL */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Profile Link
        </label>
        <div className="flex items-center rounded-lg border bg-gray-50 p-3">
          <span className="flex-1 truncate text-sm text-gray-600">
            {profileUrl}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleCopyToClipboard}
          className="flex flex-1 items-center justify-between gap-4 rounded-lg font-medium text-black"
        >
          <span className="flex items-center justify-center gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}{' '}
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          onClick={handleOpenLink}
          className="flex flex-1 items-center justify-between gap-2 font-medium"
        >
          <span className="flex items-center justify-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Open
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SharePopoverContent;
