'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { useCampaigns } from '@/app/contexts/CampaignContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Modal for Creating/Editing Campaign Details
export default function CampaignDetailsModal({
  isOpen,
  onClose,
  onSave,
  campaign, // Existing campaign object for editing, or null for new
}) {
  const [campaignName, setCampaignName] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset fields when modal opens
      setValidationError('');
      if (campaign) {
        setCampaignName(campaign.campaign_name || '');
        setCampaignDescription(campaign.campaign_description || '');
      } else {
        setCampaignName('');
        setCampaignDescription('');
      }
    }
  }, [campaign, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!campaignName.trim()) {
      setValidationError('Campaign Name is required.');
      return;
    }

    if (campaignName.trim().length < 2) {
      setValidationError('Campaign Name must be at least 2 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(campaign?.uuid, {
        name: campaignName.trim(),
        description: campaignDescription.trim(),
      });
      onClose();
    } catch (error) {
      console.error('Error saving campaign:', error);
      setValidationError('Failed to save campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <h3 className="mb-6 text-xl font-semibold">
          {campaign ? 'Edit Campaign Details' : 'Create New Campaign'}
        </h3>

        {validationError && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {validationError}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="campaignModalName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Campaign Name*
            </label>
            <input
              id="campaignModalName"
              type="text"
              placeholder="E.g., Monthly Newsletters, Product Updates"
              value={campaignName}
              onChange={(e) => {
                setCampaignName(e.target.value);
                if (validationError) setValidationError('');
              }}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={isSubmitting}
              maxLength={100}
            />
          </div>

          <div>
            <label
              htmlFor="campaignModalDescription"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Campaign Description (Optional)
            </label>
            <textarea
              id="campaignModalDescription"
              placeholder="A brief description of this campaign's purpose and goals."
              value={campaignDescription}
              onChange={(e) => setCampaignDescription(e.target.value)}
              className="h-24 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              disabled={isSubmitting}
              maxLength={500}
            />
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Email lists will be selected individually
              for each email when you compose them within this campaign.
            </p>
          </div>

          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting || !campaignName.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  {campaign ? 'Saving...' : 'Creating...'}
                </>
              ) : (
                <>
                  <PlusCircle size={16} className="mr-2" />
                  {campaign ? 'Save Changes' : 'Create Campaign'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
