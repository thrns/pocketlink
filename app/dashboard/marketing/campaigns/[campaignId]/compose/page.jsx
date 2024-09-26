'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCampaigns } from '@/app/contexts/CampaignContext';
import SendOptionsModal from './components/SendOptionsModal';
import TemplatesDialog from './components/TemplatesDialog';
import {
  ArrowLeft,
  Save,
  Send,
  Mail,
  Users,
  FileText,
  AlertCircle,
  Loader2,
  BookOpen,
  Target,
  Info,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/app/contexts/AuthContext';
import { FaMessage } from 'react-icons/fa6';

// Dynamic import for Editor to avoid SSR issues
const Editor = dynamic(() => import('./components/Editor'), { ssr: false });

const ComposePage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { campaignId } = params;

  const draftId = searchParams.get('draftId');
  const emailId = searchParams.get('emailId');
  const isEditing = !!(draftId || emailId);
  const isEditingEmail = !!emailId;

  const { user } = useAuth();

  const {
    getCampaignById,
    lists,
    emailTemplates,
    setEmailTemplates,
    campaignEmails,
    campaignDrafts,
    createDraftInCampaign,
    updateDraftInCampaign,
    createEmailInCampaign,
    updateEmailInCampaign,
    convertDraftToEmail,
    loadingEmails,
    createEmailTemplate,
  } = useCampaigns();

  const [campaignDetails, setCampaignDetails] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    body: '',
    email_list_id: '',
    template_id: null,
  });
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);

  useEffect(() => {
    // Get campaign details
    const campaign = getCampaignById(campaignId);
    if (campaign) {
      setCampaignDetails(campaign);
    }

    // Load existing data if editing
    if (isEditing) {
      let existingItem = null;

      if (draftId) {
        const drafts = campaignDrafts[campaignId] || [];
        existingItem = drafts.find((draft) => draft.uuid === draftId);
      } else if (emailId) {
        const emails = campaignEmails[campaignId] || [];
        existingItem = emails.find((email) => email.uuid === emailId);
      }

      if (existingItem) {
        setFormData({
          subject: existingItem.subject || '',
          body: existingItem.body || '',
          email_list_id: existingItem.email_list_id || '',
          template_id: existingItem.template_id || null,
        });
      }
    }
  }, [
    campaignId,
    draftId,
    emailId,
    getCampaignById,
    campaignEmails,
    campaignDrafts,
    isEditing,
  ]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationError) setValidationError('');
  };

  // New handler specifically for the Editor component
  const handleEditorChange = (content) => {
    handleInputChange('body', content);
  };

  const validateForm = () => {
    if (!formData.subject.trim()) {
      setValidationError('Subject is required.');
      return false;
    }
    if (!formData.body.trim()) {
      setValidationError('Email body is required.');
      return false;
    }
    if (!formData.email_list_id) {
      setValidationError('Please select an email list.');
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (draftId) {
        // Update existing draft
        await updateDraftInCampaign(campaignId, draftId, formData);
        toast.success('Draft updated successfully');
      } else {
        // Create new draft
        await createDraftInCampaign(campaignId, formData);
        toast.success('Draft saved successfully');
      }
      router.push(`/dashboard/marketing/campaigns/${campaignId}`);
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!validateForm()) return;
    setIsSavingTemplate(true);
    try {
      const payload = {
        username: user?.username,
        name: formData.subject,
        content: formData.body,
        thumbnail_url: formData.thumbnail_url || null,
        updated_at: new Date().toISOString(),
      };
      await createEmailTemplate(payload);
      setEmailTemplates && setEmailTemplates((prev) => [payload, ...prev]);
      toast.success('Email template saved successfully');
    } catch (error) {
      console.error('error: ', error);
      toast.error('Failed to save template');
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const handleSendClick = () => {
    if (!validateForm()) return;
    setSendModalOpen(true);
  };

  const handleSendImmediate = async (sentAtTimestamp, sendingSchedule) => {
    setIsSubmitting(true);
    try {
      if (draftId) {
        // Convert draft to email (send immediately)
        await convertDraftToEmail(
          campaignId,
          draftId,
          sentAtTimestamp,
          sendingSchedule
        );
        toast.success('Email campaign scheduled successfully');
      } else if (emailId) {
        // Update existing email and mark as sent
        await updateEmailInCampaign(campaignId, emailId, {
          ...formData,
          sent_at: sentAtTimestamp,
        });
        toast.success('Email updated and sent successfully');
      } else {
        // Create new email and send immediately
        await createEmailInCampaign(
          campaignId,
          {
            ...formData,
            sent_at: sentAtTimestamp,
          },
          sendingSchedule
        );
        toast.success('Email campaign scheduled successfully');
      }
      setSendModalOpen(false);
      router.push(`/dashboard/marketing/campaigns/${campaignId}`);
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleEmail = async (scheduledTimestamp, sendingSchedule) => {
    setIsSubmitting(true);
    try {
      if (draftId) {
        // First update the draft, then convert to scheduled email
        await updateDraftInCampaign(campaignId, draftId, formData);
        // Convert to email with scheduled time
        const newEmail = await convertDraftToEmail(
          campaignId,
          draftId,
          scheduledTimestamp,
          sendingSchedule
        );
        if (newEmail) {
          // Email creation with schedule is handled in convertDraftToEmail
          toast.success('Email campaign scheduled successfully');
        }
      } else if (emailId) {
        // Update existing email with scheduled time
        await updateEmailInCampaign(campaignId, emailId, {
          ...formData,
          sent_at: scheduledTimestamp,
        });
        toast.success('Email updated and scheduled successfully');
      } else {
        // Create new email with scheduled time
        await createEmailInCampaign(
          campaignId,
          {
            ...formData,
            sent_at: scheduledTimestamp,
          },
          sendingSchedule
        );
        toast.success('Email campaign scheduled successfully');
      }
      setSendModalOpen(false);
      router.push(`/dashboard/marketing/campaigns/${campaignId}`);
    } catch (error) {
      toast.error('Failed to schedule email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadTemplate = (template) => {
    setFormData((prev) => ({
      ...prev,
      body: template.content || '',
      template_id: template.uuid,
    }));
    setTemplatesDialogOpen(false);
    toast.success('Template loaded');
  };

  const selectedList = lists.find(
    (list) => list.uuid === formData.email_list_id
  );
  const subscriberCount = selectedList?.list?.length || 0;

  if (!campaignDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-bento-violet"></div>
          <p className="text-gray-600">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full width container */}
      <div className="w-full">
        {/* Main content area */}
        <div className="px-6 py-6">
          {/* Page header */}
          <div className="mx-auto mb-6 max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href={`/dashboard/marketing/campaigns/${campaignId}`}
                  className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-bento-violet"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Campaign
                </Link>
                <div className="flex items-center justify-start gap-4">
                  <div className="rounded-xl bg-bento-blue p-3">
                    <FaMessage className="h-8 w-8 text-white" />
                  </div>
                  <div className="fkex flex-col items-start justify-start">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {isEditing
                        ? `Edit ${isEditingEmail ? 'Email' : 'Draft'}`
                        : 'Compose New Email'}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Target size={14} />
                      <span>Campaign:</span>
                      <span className="font-medium text-gray-900">
                        {campaignDetails.campaign_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="mx-auto mb-6 max-w-7xl">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-center">
                  <AlertCircle className="mr-3 h-5 w-5 text-red-600" />
                  <p className="text-sm font-medium text-red-800">
                    {validationError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main compose form */}
          <div className="mx-auto max-w-7xl">
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              {/* Top action bar */}
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTemplatesDialogOpen(true)}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Use Template
                  </button>
                  <button
                    onClick={handleSaveTemplate}
                    disabled={isSavingTemplate}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isSavingTemplate ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <BookOpen className="mr-2 h-4 w-4" />
                    )}
                    Save as Template
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveDraft}
                    disabled={isSubmitting || isEditingEmail}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {draftId ? 'Update Draft' : 'Save as Draft'}
                  </button>
                  <button
                    onClick={handleSendClick}
                    disabled={isSubmitting}
                    className="inline-flex items-center rounded-lg bg-bento-violet px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-bento-violet/90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Send Email
                  </button>
                </div>
              </div>

              {/* Email form fields */}
              <div className="space-y-6">
                {/* Email List Selection */}
                <div>
                  <label
                    htmlFor="email-list"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Recipients
                  </label>
                  <select
                    id="email-list"
                    value={formData.email_list_id}
                    onChange={(e) =>
                      handleInputChange('email_list_id', e.target.value)
                    }
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-bento-violet focus:outline-none focus:ring-1 focus:ring-bento-violet"
                  >
                    <option value="">Select an email list...</option>
                    {lists.map((list) => (
                      <option key={list.uuid} value={list.uuid}>
                        {list.list_name} ({list.list?.length || 0} subscribers)
                      </option>
                    ))}
                  </select>
                  {selectedList && (
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4" />
                      This email will reach {subscriberCount} subscribers
                    </div>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Subject Line
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Enter email subject..."
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange('subject', e.target.value)
                    }
                    disabled={isSubmitting}
                    className="h-10 rounded-lg border-gray-300 focus:border-bento-violet focus:ring-bento-violet"
                  />
                </div>

                {/* Email Body */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="body"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Content
                    </label>
                    <span className="text-xs text-gray-500">
                      Rich text format
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Available variables: {'{{'}first_name{'}}, {{'}last_name
                    {'}}, {{'}subscribed_date{'}}'} (formatted as dd-mm-yyyy)
                  </div>
                  <div className="rounded-lg border border-gray-300 focus-within:border-bento-violet focus-within:ring-1 focus-within:ring-bento-violet">
                    <Editor
                      value={formData.body}
                      onChange={handleEditorChange}
                      readOnly={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign info card */}
            {campaignDetails.campaign_description && (
              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start">
                  <Info className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      Campaign Description
                    </p>
                    <p className="text-sm text-gray-600">
                      {campaignDetails.campaign_description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Send Options Modal */}
      <SendOptionsModal
        isOpen={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        onSendImmediate={handleSendImmediate}
        onSchedule={handleScheduleEmail}
        isSubmitting={isSubmitting}
        emailSubject={formData.subject || 'this email'}
        recipientCount={subscriberCount}
        isWorkspaceAccount={user?.workspace_account || false}
        campaignEmails={campaignEmails[campaignId] || []}
      />

      {/* Templates Dialog */}
      <TemplatesDialog
        isOpen={templatesDialogOpen}
        onClose={() => setTemplatesDialogOpen(false)}
        templates={emailTemplates}
        onSelectTemplate={loadTemplate}
      />
    </div>
  );
};

export default ComposePage;
