import React, { useState } from 'react';
import { Share2, Copy, ExternalLink, Check } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'sonner';

const SharePopover = ({ children, className = '' }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate the profile URL and OG image URL
  const profileUrl = user?.username ? `https://pocketlink.io/${user.username}` : '';
  const ogImageUrl = user?.username ? `/api/og?username=${user.username}` : '';

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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Close popover when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!user?.username) {
    return null; // Don't render if no user
  }

  return (
    <div className="relative">
      {/* Trigger */}
      <div onClick={handleToggle} className={className}>
        {children}
      </div>

      {/* Popover */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md w-full mx-4 transform transition-all duration-200 scale-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Share Profile</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* OG Image Preview */}
            <div className="mb-6">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[1.91/1] border">
                {ogImageUrl && (
                  <>
                    <img
                      src={ogImageUrl}
                      alt="Profile preview"
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Profile URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Link
              </label>
              <div className="flex items-center bg-gray-50 rounded-lg border p-3">
                <span className="text-sm text-gray-600 flex-1 truncate">
                  {profileUrl}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCopyToClipboard}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
              
              <button
                onClick={handleOpenLink}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePopover;