'use client';

// ==== IMPORTS ==== //
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { supabase } from '@/Clients/supabase/client';
import { useAuth } from './AuthContext';

// ==== CONTEXT CREATION ==== //
const CampaignContext = createContext();

const stripVariableStyling = (html) => {
  if (!html || typeof html !== 'string') return '';
  // Remove denotation char spans and keep text
  let out = html.replace(
    /<span[^>]*class="[^"]*ql-mention-denotation-char[^"]*"[^>]*>(.*?)<\/span>/gi,
    '$1'
  );
  // Remove mention wrapper spans while preserving inner content
  out = out.replace(
    /<span[^>]*class="[^"]*ql-mention[^"]*"[^>]*>(.*?)<\/span>/gi,
    '$1'
  );
  // Also handle any custom ql-variable wrappers if present
  out = out.replace(
    /<span[^>]*class="[^"]*ql-variable[^"]*"[^>]*>(.*?)<\/span>/gi,
    '$1'
  );
  return out;
};

const replacePlaceholders = (text, subscriber) => {
  if (!text) return '';

  return text.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    const trimmedKey = key.trim().toLowerCase();

    if (trimmedKey === 'subscribed_date' && subscriber.subscribed_date) {
      const date = new Date(subscriber.subscribed_date);
      return date
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\//g, '-');
    }

    return subscriber[trimmedKey] || match;
  });
};

export function CampaignProvider({ children }) {
  const { user } = useAuth();
  const username = user?.username;

  // ==== STATE MANAGEMENT ==== //
  // Core data states
  const [campaigns, setCampaigns] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [lists, setLists] = useState([]);
  const [campaignEmails, setCampaignEmails] = useState({}); // Store emails by campaign ID
  const [campaignDrafts, setCampaignDrafts] = useState({}); // Store drafts by campaign ID

  // Loading states
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [loadingLists, setLoadingLists] = useState(true);
  const [loadingEmails, setLoadingEmails] = useState(false);

  // Error states
  const [errorCampaigns, setErrorCampaigns] = useState(null);
  const [errorTemplates, setErrorTemplates] = useState(null);
  const [errorLists, setErrorLists] = useState(null);
  const [errorEmails, setErrorEmails] = useState(null);

  // ==== FETCHING FUNCTIONS ==== ///

  // Email Templates Fetching
  const fetchEmailTemplates = useCallback(async () => {
    if (!username) {
      setLoadingTemplates(false);
      setErrorTemplates('User not identified for fetching templates.');
      return;
    }
    setLoadingTemplates(true);
    setErrorTemplates(null);
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('username', username)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmailTemplates(data || []);
    } catch (err) {
      console.error('Error fetching email templates:', err);
      setErrorTemplates(`Failed to fetch email templates: ${err.message}`);
    } finally {
      setLoadingTemplates(false);
    }
  }, [username]);

  // Campaigns Fetching
  const fetchCampaigns = useCallback(async () => {
    if (!username) {
      setLoadingCampaigns(false);
      setErrorCampaigns('User not identified for fetching campaigns.');
      return;
    }
    setLoadingCampaigns(true);
    setErrorCampaigns(null);
    try {
      const { data: campaignsData, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('username', username)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(campaignsData);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setErrorCampaigns(`Failed to fetch campaigns: ${err.message}`);
    } finally {
      setLoadingCampaigns(false);
    }
  }, [username]);

  // Lists Fetching
  const fetchLists = useCallback(async () => {
    if (!username) {
      setLoadingLists(false);
      setErrorLists('User not identified for fetching lists.');
      return;
    }
    setLoadingLists(true);
    setErrorLists(null);
    try {
      const { data: listData, error } = await supabase
        .from('email_list')
        .select('*')
        .eq('username', username)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLists(listData);
    } catch (err) {
      console.error('Error fetching lists:', err);
      setErrorLists(`Failed to fetch lists: ${err.message}`);
    } finally {
      setLoadingLists(false);
    }
  }, [username]);

  // Campaign Emails Fetching
  const fetchCampaignEmails = useCallback(
    async (campaignId) => {
      if (!username || !campaignId) {
        setErrorEmails('User or campaign not identified for fetching emails.');
        return [];
      }
      setLoadingEmails(true);
      setErrorEmails(null);
      try {
        // Get campaign to access email_ids
        const { data: campaign, error: campaignError } = await supabase
          .from('campaigns')
          .select('email_ids')
          .eq('uuid', campaignId)
          .eq('username', username)
          .single();

        if (campaignError) throw campaignError;

        const emailIdsData = campaign?.email_ids || [];

        // Handle both old format (array of strings) and new format (array of objects)
        let emailIds = [];
        if (emailIdsData.length > 0) {
          if (typeof emailIdsData[0] === 'string') {
            // Old format: array of strings
            emailIds = emailIdsData;
          } else {
            // New format: array of objects with email_id and expected_final_date
            emailIds = emailIdsData.map((item) => item.email_id);
          }
        }

        if (emailIds.length === 0) {
          setCampaignEmails((prev) => ({ ...prev, [campaignId]: [] }));
          return [];
        }

        // Fetch emails from the emails table
        const { data: emails, error: emailsError } = await supabase
          .from('emails')
          .select('*')
          .in('uuid', emailIds)
          .eq('username', username)
          .order('updated_at', { ascending: false });

        if (emailsError) throw emailsError;

        // Enhance emails with expected final dates from campaign data
        const enhancedEmails = emails.map((email) => {
          const emailData = emailIdsData.find((item) =>
            typeof item === 'object'
              ? item.email_id === email.uuid
              : item === email.uuid
          );

          return {
            ...email,
            expected_final_date:
              typeof emailData === 'object'
                ? emailData.expected_final_date
                : null,
          };
        });

        setCampaignEmails((prev) => ({
          ...prev,
          [campaignId]: enhancedEmails || [],
        }));
        return enhancedEmails || [];
      } catch (err) {
        console.error('Error fetching campaign emails:', err);
        setErrorEmails(`Failed to fetch emails: ${err.message}`);
        return [];
      } finally {
        setLoadingEmails(false);
      }
    },
    [username]
  );

  // Campaign Drafts Fetching
  const fetchCampaignDrafts = useCallback(
    async (campaignId) => {
      if (!username || !campaignId) {
        setErrorEmails('User or campaign not identified for fetching drafts.');
        return [];
      }
      setLoadingEmails(true);
      setErrorEmails(null);
      try {
        // Get campaign to access draft_ids
        const { data: campaign, error: campaignError } = await supabase
          .from('campaigns')
          .select('draft_ids')
          .eq('uuid', campaignId)
          .eq('username', username)
          .single();

        if (campaignError) throw campaignError;

        const draftIds = campaign?.draft_ids || [];

        if (draftIds.length === 0) {
          setCampaignDrafts((prev) => ({ ...prev, [campaignId]: [] }));
          return [];
        }

        // Fetch drafts from the drafts table
        const { data: drafts, error: draftsError } = await supabase
          .from('drafts')
          .select('*')
          .in('uuid', draftIds)
          .eq('username', username)
          .order('updated_at', { ascending: false });

        if (draftsError) throw draftsError;

        setCampaignDrafts((prev) => ({ ...prev, [campaignId]: drafts || [] }));
        return drafts || [];
      } catch (err) {
        console.error('Error fetching campaign drafts:', err);
        setErrorEmails(`Failed to fetch drafts: ${err.message}`);
        return [];
      } finally {
        setLoadingEmails(false);
      }
    },
    [username]
  );

  // ==== INITIAL DATA LOADING ==== //
  useEffect(() => {
    if (username) fetchEmailTemplates();
  }, [username, fetchEmailTemplates]);

  useEffect(() => {
    if (username) fetchCampaigns();
  }, [username, fetchCampaigns]);

  useEffect(() => {
    if (username) fetchLists();
  }, [username, fetchLists]);

  // ==== EMAIL TEMPLATE CRUD OPERATIONS ==== //

  const createEmailTemplate = useCallback(
    async (templateData) => {
      if (!username) {
        setErrorTemplates('User not identified. Cannot create template.');
        return null;
      }
      setLoadingTemplates(true);
      try {
        const payload = {
          username: username,
          name: templateData.name,
          content: templateData.content,
          thumbnail_url: templateData.thumbnail_url || null,
          updated_at: new Date().toISOString(),
        };
        const { data: newTemplate, error } = await supabase
          .from('email_templates')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        setEmailTemplates((prev) => [newTemplate, ...prev]);
        return newTemplate;
      } catch (err) {
        setErrorTemplates(`Failed to create email template: ${err.message}`);
        return null;
      } finally {
        setLoadingTemplates(false);
      }
    },
    [username]
  );

  const updateEmailTemplate = useCallback(
    async (templateId, updateData) => {
      if (!username) {
        setErrorTemplates('User not identified. Cannot update template.');
        return null;
      }
      setLoadingTemplates(true);
      try {
        const payload = {
          name: updateData.name,
          content: updateData.content,
          thumbnail_url: updateData.thumbnail_url || null,
          updated_at: new Date().toISOString(),
        };
        const { data: updatedTemplate, error } = await supabase
          .from('email_templates')
          .update(payload)
          .eq('uuid', templateId)
          .eq('username', username)
          .select()
          .single();
        if (error) throw error;
        setEmailTemplates((prev) =>
          prev.map((tmpl) =>
            tmpl.uuid === templateId ? updatedTemplate : tmpl
          )
        );
        return updatedTemplate;
      } catch (err) {
        setErrorTemplates(`Failed to update email template: ${err.message}`);
        return null;
      } finally {
        setLoadingTemplates(false);
      }
    },
    [username]
  );

  const deleteEmailTemplate = useCallback(
    async (templateId) => {
      if (!username) {
        setErrorTemplates('User not identified. Cannot delete template.');
        return false;
      }
      setLoadingTemplates(true);
      try {
        const { error } = await supabase
          .from('email_templates')
          .delete()
          .eq('uuid', templateId)
          .eq('username', username);
        if (error) throw error;
        setEmailTemplates((prev) =>
          prev.filter((tmpl) => tmpl.uuid !== templateId)
        );
        return true;
      } catch (err) {
        setErrorTemplates(`Failed to delete email template: ${err.message}`);
        return false;
      } finally {
        setLoadingTemplates(false);
      }
    },
    [username]
  );

  // ==== CAMPAIGN CRUD OPERATIONS ==== //

  const createCampaign = useCallback(
    async (campaignData) => {
      if (!username) {
        setErrorCampaigns('User not identified. Cannot create campaign.');
        return null;
      }
      setLoadingCampaigns(true);
      try {
        const payload = {
          username: username,
          campaign_name: campaignData.name,
          campaign_description: campaignData.description,
          email_ids: [], // Start with empty email array
          draft_ids: [], // Start with empty draft array
        };
        const { data: newCampaign, error } = await supabase
          .from('campaigns')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;

        setCampaigns((prev) => [newCampaign, ...prev]);
        return newCampaign;
      } catch (err) {
        setErrorCampaigns(`Failed to create campaign: ${err.message}`);
        return null;
      } finally {
        setLoadingCampaigns(false);
      }
    },
    [username]
  );

  const updateCampaign = useCallback(
    async (campaignId, updateData) => {
      if (!username) {
        setErrorCampaigns('User not identified. Cannot update campaign.');
        return null;
      }
      setLoadingCampaigns(true);
      try {
        const payload = {
          campaign_name: updateData.name,
          campaign_description: updateData.description,
          updated_at: new Date().toISOString(),
        };
        const { data: updatedCampaign, error } = await supabase
          .from('campaigns')
          .update(payload)
          .eq('uuid', campaignId)
          .eq('username', username)
          .select()
          .single();
        if (error) throw error;

        setCampaigns((prev) =>
          prev.map((camp) =>
            camp.uuid === campaignId ? updatedCampaign : camp
          )
        );
        return updatedCampaign;
      } catch (err) {
        setErrorCampaigns(`Failed to update campaign: ${err.message}`);
        return null;
      } finally {
        setLoadingCampaigns(false);
      }
    },
    [username]
  );

  const deleteCampaign = useCallback(
    async (campaignId) => {
      if (!username) {
        setErrorCampaigns('User not identified. Cannot delete campaign.');
        return false;
      }
      setLoadingCampaigns(true);
      try {
        // First get the campaign to find associated email and draft IDs
        const { data: campaign, error: fetchError } = await supabase
          .from('campaigns')
          .select('email_ids, draft_ids')
          .eq('uuid', campaignId)
          .eq('username', username)
          .single();

        if (fetchError) throw fetchError;

        // Handle email_ids - extract UUIDs from both old and new formats
        if (campaign?.email_ids && campaign.email_ids.length > 0) {
          let emailUuids = [];

          // Check if it's the new format (array of objects) or old format (array of strings)
          if (typeof campaign.email_ids[0] === 'object') {
            // New format: extract email_id from objects
            emailUuids = campaign.email_ids
              .map((item) => item.email_id)
              .filter(Boolean);
          } else {
            // Old format: direct array of UUIDs
            emailUuids = campaign.email_ids.filter(Boolean);
          }

          if (emailUuids.length > 0) {
            const { error: emailDeleteError } = await supabase
              .from('emails')
              .delete()
              .in('uuid', emailUuids)
              .eq('username', username);

            if (emailDeleteError) throw emailDeleteError;
          }
        }

        // Handle draft_ids - should be simple array of strings
        if (campaign?.draft_ids && campaign.draft_ids.length > 0) {
          // Filter out any null/undefined values
          const draftUuids = campaign.draft_ids.filter(Boolean);

          if (draftUuids.length > 0) {
            const { error: draftDeleteError } = await supabase
              .from('drafts')
              .delete()
              .in('uuid', draftUuids)
              .eq('username', username);

            if (draftDeleteError) throw draftDeleteError;
          }
        }

        // Delete the campaign
        const { error } = await supabase
          .from('campaigns')
          .delete()
          .eq('uuid', campaignId)
          .eq('username', username);
        if (error) throw error;

        setCampaigns((prev) => prev.filter((camp) => camp.uuid !== campaignId));
        setCampaignEmails((prev) => {
          const newEmails = { ...prev };
          delete newEmails[campaignId];
          return newEmails;
        });
        setCampaignDrafts((prev) => {
          const newDrafts = { ...prev };
          delete newDrafts[campaignId];
          return newDrafts;
        });
        return true;
      } catch (err) {
        setErrorCampaigns(`Failed to delete campaign: ${err.message}`);
        return false;
      } finally {
        setLoadingCampaigns(false);
      }
    },
    [username]
  );

  // ==== DRAFT MANAGEMENT OPERATIONS ==== //

  const createDraftInCampaign = useCallback(
    async (campaignId, draftData) => {
      if (!username) {
        setErrorEmails('User not identified. Cannot create draft.');
        return null;
      }
      setLoadingEmails(true);
      try {
        // Create draft with exact schema fields
        const draftPayload = {
          username: username,
          template_id: draftData.template_id || null,
          subject: draftData.subject || '',
          body: draftData.body || '',
          email_list_id: draftData.email_list_id,
          saved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { data: newDraft, error: draftError } = await supabase
          .from('drafts')
          .insert(draftPayload)
          .select()
          .single();

        if (draftError) throw draftError;

        // Update campaign to include this draft ID
        const { data: campaign, error: campaignFetchError } = await supabase
          .from('campaigns')
          .select('draft_ids')
          .eq('uuid', campaignId)
          .eq('username', username)
          .single();

        if (campaignFetchError) throw campaignFetchError;

        const currentDraftIds = campaign?.draft_ids || [];
        const updatedDraftIds = [...currentDraftIds, newDraft.uuid];

        const { error: campaignUpdateError } = await supabase
          .from('campaigns')
          .update({
            draft_ids: updatedDraftIds,
            updated_at: new Date().toISOString(),
          })
          .eq('uuid', campaignId)
          .eq('username', username);

        if (campaignUpdateError) throw campaignUpdateError;

        // Update local state
        setCampaignDrafts((prev) => ({
          ...prev,
          [campaignId]: [...(prev[campaignId] || []), newDraft],
        }));

        setCampaigns((prev) =>
          prev.map((camp) =>
            camp.uuid === campaignId
              ? {
                  ...camp,
                  draft_ids: updatedDraftIds,
                  updated_at: new Date().toISOString(),
                }
              : camp
          )
        );

        return newDraft;
      } catch (err) {
        setErrorEmails(`Failed to create draft: ${err.message}`);
        return null;
      } finally {
        setLoadingEmails(false);
      }
    },
    [username]
  );

  const updateDraftInCampaign = useCallback(
    async (campaignId, draftId, updateData) => {
      if (!username) {
        setErrorEmails('User not identified. Cannot update draft.');
        return null;
      }
      setLoadingEmails(true);
      try {
        // Update draft with exact schema fields
        const payload = {
          template_id: updateData.template_id || null,
          subject: updateData.subject || '',
          body: updateData.body || '',
          email_list_id: updateData.email_list_id,
          updated_at: new Date().toISOString(),
        };

        const { data: updatedDraft, error } = await supabase
          .from('drafts')
          .update(payload)
          .eq('uuid', draftId)
          .eq('username', username)
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setCampaignDrafts((prev) => ({
          ...prev,
          [campaignId]: (prev[campaignId] || []).map((draft) =>
            draft.uuid === draftId ? updatedDraft : draft
          ),
        }));

        return updatedDraft;
      } catch (err) {
        setErrorEmails(`Failed to update draft: ${err.message}`);
        return null;
      } finally {
        setLoadingEmails(false);
      }
    },
    [username]
  );

  const deleteDraftFromCampaign = useCallback(
    async (campaignId, draftId) => {
      if (!username) {
        setErrorEmails('User not identified. Cannot delete draft.');
        return false;
      }
      setLoadingEmails(true);
      try {
        // Get campaign to update draft_ids
        const { data: campaign, error: campaignFetchError } = await supabase
          .from('campaigns')
          .select('draft_ids')
          .eq('uuid', campaignId)
          .eq('username', username)
          .single();

        if (campaignFetchError) throw campaignFetchError;

        const currentDraftIds = campaign?.draft_ids || [];
        const updatedDraftIds = currentDraftIds.filter((id) => id !== draftId);

        // Update campaign to remove draft ID
        const { error: campaignUpdateError } = await supabase
          .from('campaigns')
          .update({
            draft_ids: updatedDraftIds,
            updated_at: new Date().toISOString(),
          })
          .eq('uuid', campaignId)
          .eq('username', username);

        if (campaignUpdateError) throw campaignUpdateError;

        // Delete the draft
        const { error: draftDeleteError } = await supabase
          .from('drafts')
          .delete()
          .eq('uuid', draftId)
          .eq('username', username);

        if (draftDeleteError) throw draftDeleteError;

        // Update local state
        setCampaignDrafts((prev) => ({
          ...prev,
          [campaignId]: (prev[campaignId] || []).filter(
            (draft) => draft.uuid !== draftId
          ),
        }));

        setCampaigns((prev) =>
          prev.map((camp) =>
            camp.uuid === campaignId
              ? {
                  ...camp,
                  draft_ids: updatedDraftIds,
                  updated_at: new Date().toISOString(),
                }
              : camp
          )
        );

        return true;
      } catch (err) {
        setErrorEmails(`Failed to delete draft: ${err.message}`);
        return false;
      } finally {
        setLoadingEmails(false);
      }
    },
    [username]
  );

  // ==== EMAIL MANAGEMENT OPERATIONS ==== //

  const createEmailInCampaign = useCallback(
    async (campaignId, emailData, sendingSchedule = null) => {
      if (!username) {
        setErrorEmails('User not identified. Cannot create email.');
        return null;
      }

      // Check if Gmail integration is connected
      const gmailIntegration = user?.integrations?.gmail;
      if (!gmailIntegration || !gmailIntegration.connected) {
        setErrorEmails('Please connect your Gmail in integrations first.');
        return null;
      }

      const refreshToken = gmailIntegration.refresh_token;
      if (!refreshToken) {
        setErrorEmails(
          'Gmail refresh token not found. Please reconnect your Gmail.'
        );
        return null;
      }

      // Validate email_list_id is provided
      if (!emailData.email_list_id) {
        setErrorEmails('Email list is required to send emails.');
        return null;
      }

      setLoadingEmails(true);
      try {
        // First, fetch the email list to get recipients
        const { data: emailListData, error: listError } = await supabase
          .from('email_list')
          .select('list')
          .eq('uuid', emailData.email_list_id)
          .eq('username', username)
          .single();

        if (listError) throw listError;

        const recipients = emailListData?.list || [];

        if (recipients.length === 0) {
          setErrorEmails('No recipients found in the selected email list.');
          return null;
        }

        // Calculate expected final date - this will be the date of the last batch
        let expectedFinalDate = new Date();
        if (sendingSchedule && sendingSchedule.endDate) {
          expectedFinalDate = new Date(sendingSchedule.endDate);
          // If we have sent_at time, preserve the time for the final date
          if (emailData.sent_at) {
            const originalTime = new Date(emailData.sent_at);
            expectedFinalDate.setHours(
              originalTime.getHours(),
              originalTime.getMinutes(),
              originalTime.getSeconds()
            );
          }
        } else if (emailData.sent_at) {
          expectedFinalDate = new Date(emailData.sent_at);
        }

        // Create a single email record first - this represents the entire campaign email
        const mainEmailUuid = crypto.randomUUID();
        const emailPayload = {
          uuid: mainEmailUuid,
          username: username,
          email_list_id: emailData.email_list_id,
          template_id: emailData.template_id || null,
          subject: emailData.subject || '', // No day indicator here
          body: emailData.body || '',
          sent_at: emailData.sent_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { data: newEmail, error: emailError } = await supabase
          .from('emails')
          .insert(emailPayload)
          .select()
          .single();

        if (emailError) {
          throw emailError;
        }

        // If sendingSchedule is provided, distribute recipients across days
        let recipientBatches = [];
        if (sendingSchedule && sendingSchedule.schedule) {
          let currentIndex = 0;

          for (const daySchedule of sendingSchedule.schedule) {
            const batchRecipients = recipients.slice(
              currentIndex,
              currentIndex + daySchedule.emails
            );
            if (batchRecipients.length > 0) {
              recipientBatches.push({
                recipients: batchRecipients,
                scheduledDate: daySchedule.date,
                day: daySchedule.day,
              });
              currentIndex += daySchedule.emails;
            }
          }
        } else {
          // Single batch for immediate sending or simple scheduling
          const sendDate = emailData.sent_at
            ? new Date(emailData.sent_at)
            : new Date();
          recipientBatches = [
            {
              recipients: recipients,
              scheduledDate: sendDate,
              day: 1,
            },
          ];
        }

        // Process each batch - create email-server entries only
        for (const batch of recipientBatches) {
          // Create email-server entries for each recipient in this batch
          for (const recipient of batch.recipients) {
            const recipientEmail =
              typeof recipient === 'string' ? recipient : recipient.email;

            if (!recipientEmail || !recipientEmail.includes('@')) {
              console.warn(`Invalid email address: ${recipientEmail}`);
              continue;
            }

            // Get full subscriber data (if object) or create minimal
            const subscriber =
              typeof recipient === 'object'
                ? recipient
                : {
                    email: recipientEmail,
                    first_name: '',
                    last_name: '',
                    subscribed_date: '',
                  };

            // Replace placeholders
            const replacedSubject = replacePlaceholders(
              emailData.subject,
              subscriber
            );

            // Body might be HTML from the editor; remove mention styling first, then replace
            const cleanedBodyHtml = stripVariableStyling(emailData.body || '');
            const replacedBody = replacePlaceholders(
              cleanedBodyHtml,
              subscriber
            );

            // Use replacedSubject and replacedBody in payload
            try {
              // Generate a unique UUID for email-server entry
              const emailServerUuid = crypto.randomUUID();

              // Set the scheduled time (keep same time, just change date)
              const scheduledDateTime = new Date(batch.scheduledDate);
              if (emailData.sent_at) {
                const originalTime = new Date(emailData.sent_at);
                scheduledDateTime.setHours(
                  originalTime.getHours(),
                  originalTime.getMinutes(),
                  originalTime.getSeconds()
                );
              }

              // Create email-server entry
              const emailServerPayload = {
                uuid: emailServerUuid,
                username: username,
                type: 'user-google',
                send_at: scheduledDateTime.toISOString(),
                refreshToken: refreshToken,
                from: user?.email,
                to: recipientEmail,
                cc: emailData.cc || null,
                bcc: emailData.bcc || null,
                subject: replacedSubject, // No day indicator here
                body: replacedBody,
                html: emailData.html || null,
                attachment_links: emailData.attachment_links || null,
              };

              const { error: emailServerError } = await supabase
                .from('email-server')
                .insert(emailServerPayload);

              if (emailServerError) {
                console.error(
                  `Failed to create email-server entry for ${recipientEmail}:`,
                  emailServerError
                );
                continue;
              }
            } catch (recipientError) {
              console.error(
                `Error processing recipient ${recipientEmail}:`,
                recipientError
              );
              continue;
            }
          }
        }

        // Update campaign to include this one email ID with expected final date
        const { data: campaign, error: campaignFetchError } = await supabase
          .from('campaigns')
          .select('email_ids')
          .eq('uuid', campaignId)
          .eq('username', username)
          .single();

        if (campaignFetchError) throw campaignFetchError;

        const currentEmailIds = campaign?.email_ids || [];

        // Handle both old and new format when updating
        let updatedEmailIds = [];

        // Convert existing email_ids to new format if needed
        if (currentEmailIds.length > 0) {
          if (typeof currentEmailIds[0] === 'string') {
            // Old format: convert to new format with null expected dates
            updatedEmailIds = currentEmailIds.map((emailId) => ({
              email_id: emailId,
              expected_final_date: null,
            }));
          } else {
            // Already new format
            updatedEmailIds = [...currentEmailIds];
          }
        }

        // Add new email with its expected final date
        updatedEmailIds.push({
          email_id: newEmail.uuid,
          expected_final_date: expectedFinalDate.toISOString(),
        });

        const { error: campaignUpdateError } = await supabase
          .from('campaigns')
          .update({
            email_ids: updatedEmailIds,
            updated_at: new Date().toISOString(),
          })
          .eq('uuid', campaignId)
          .eq('username', username);

        if (campaignUpdateError) throw campaignUpdateError;

        // Update local state
        // Add the expected_final_date to the newEmail object before adding it to state
        newEmail.expected_final_date = expectedFinalDate.toISOString();

        setCampaignEmails((prev) => ({
          ...prev,
          [campaignId]: [...(prev[campaignId] || []), newEmail],
        }));

        setCampaigns((prev) =>
          prev.map((camp) =>
            camp.uuid === campaignId
              ? {
                  ...camp,
                  email_ids: updatedEmailIds,
                  updated_at: new Date().toISOString(),
                }
              : camp
          )
        );

        // Log success information
        console.log(
          `Successfully created email record for campaign:`,
          campaignId,
          `Expected final delivery: ${expectedFinalDate.toISOString()}`
        );

        return newEmail;
      } catch (err) {
        setErrorEmails(`Failed to create email: ${err.message}`);
        return null;
      } finally {
        setLoadingEmails(false);
      }
    },
    [username, user]
  );

  const updateEmailInCampaign = useCallback(
    async (campaignId, emailId, updateData) => {
      if (!username) {
        setErrorEmails('User not identified. Cannot update email.');
        return null;
      }
      setLoadingEmails(true);
      try {
        // Update email with exact schema fields
        const payload = {
          email_list_id: updateData.email_list_id,
          template_id: updateData.template_id || null,
          subject: updateData.subject || '',
          body: updateData.body || '',
          sent_at: updateData.sent_at || null,
          updated_at: new Date().toISOString(),
        };

        const { data: updatedEmail, error } = await supabase
          .from('emails')
          .update(payload)
          .eq('uuid', emailId)
          .eq('username', username)
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setCampaignEmails((prev) => ({
          ...prev,
          [campaignId]: (prev[campaignId] || []).map((email) =>
            email.uuid === emailId ? updatedEmail : email
          ),
        }));

        return updatedEmail;
      } catch (err) {
        setErrorEmails(`Failed to update email: ${err.message}`);
        return null;
      } finally {
        setLoadingEmails(false);
      }
    },
    [username]
  );

  const deleteEmailFromCampaign = useCallback(
    async (campaignId, emailId) => {
      if (!username) {
        setErrorEmails('User not identified. Cannot delete email.');
        return false;
      }
      setLoadingEmails(true);
      try {
        // Get campaign to update email_ids
        const { data: campaign, error: campaignFetchError } = await supabase
          .from('campaigns')
          .select('email_ids')
          .eq('uuid', campaignId)
          .eq('username', username)
          .single();

        if (campaignFetchError) throw campaignFetchError;

        const currentEmailIds = campaign?.email_ids || [];

        // Handle both old and new format when removing
        let updatedEmailIds = [];
        if (currentEmailIds.length > 0) {
          if (typeof currentEmailIds[0] === 'string') {
            // Old format: simple array filter
            updatedEmailIds = currentEmailIds.filter((id) => id !== emailId);
          } else {
            // New format: filter by email_id property
            updatedEmailIds = currentEmailIds.filter(
              (item) => item.email_id !== emailId
            );
          }
        }

        // Update campaign to remove email ID
        const { error: campaignUpdateError } = await supabase
          .from('campaigns')
          .update({
            email_ids: updatedEmailIds,
            updated_at: new Date().toISOString(),
          })
          .eq('uuid', campaignId)
          .eq('username', username);

        if (campaignUpdateError) throw campaignUpdateError;

        // Delete the email
        const { error: emailDeleteError } = await supabase
          .from('emails')
          .delete()
          .eq('uuid', emailId)
          .eq('username', username);

        if (emailDeleteError) throw emailDeleteError;

        // Update local state
        setCampaignEmails((prev) => ({
          ...prev,
          [campaignId]: (prev[campaignId] || []).filter(
            (email) => email.uuid !== emailId
          ),
        }));

        setCampaigns((prev) =>
          prev.map((camp) =>
            camp.uuid === campaignId
              ? {
                  ...camp,
                  email_ids: updatedEmailIds,
                  updated_at: new Date().toISOString(),
                }
              : camp
          )
        );

        return true;
      } catch (err) {
        setErrorEmails(`Failed to delete email: ${err.message}`);
        return false;
      } finally {
        setLoadingEmails(false);
      }
    },
    [username]
  );

  // ==== DRAFT TO EMAIL CONVERSION ==== //

  const convertDraftToEmail = useCallback(
    async (campaignId, draftId, sentAt = null, sendingSchedule = null) => {
      if (!username) {
        setErrorEmails('User not identified. Cannot convert draft to email.');
        return null;
      }
      setLoadingEmails(true);
      try {
        // Get the draft
        const { data: draft, error: draftError } = await supabase
          .from('drafts')
          .select('*')
          .eq('uuid', draftId)
          .eq('username', username)
          .single();

        if (draftError) throw draftError;

        // Create email from draft using the same logic as createEmailInCampaign
        const emailData = {
          email_list_id: draft.email_list_id,
          template_id: draft.template_id,
          subject: draft.subject,
          body: draft.body,
          sent_at: sentAt || new Date().toISOString(),
        };

        const newEmail = await createEmailInCampaign(
          campaignId,
          emailData,
          sendingSchedule
        );

        if (!newEmail) {
          throw new Error('Failed to create email from draft');
        }

        // Update campaign IDs to remove draft
        const { data: campaign, error: campaignFetchError } = await supabase
          .from('campaigns')
          .select('draft_ids')
          .eq('uuid', campaignId)
          .eq('username', username)
          .single();

        if (campaignFetchError) throw campaignFetchError;

        const currentDraftIds = campaign?.draft_ids || [];
        const updatedDraftIds = currentDraftIds.filter((id) => id !== draftId);

        const { error: campaignUpdateError } = await supabase
          .from('campaigns')
          .update({
            draft_ids: updatedDraftIds,
            updated_at: new Date().toISOString(),
          })
          .eq('uuid', campaignId)
          .eq('username', username);

        if (campaignUpdateError) throw campaignUpdateError;

        // Delete the draft
        const { error: draftDeleteError } = await supabase
          .from('drafts')
          .delete()
          .eq('uuid', draftId)
          .eq('username', username);

        if (draftDeleteError) throw draftDeleteError;

        // Update local state
        setCampaignDrafts((prev) => ({
          ...prev,
          [campaignId]: (prev[campaignId] || []).filter(
            (draft) => draft.uuid !== draftId
          ),
        }));

        setCampaigns((prev) =>
          prev.map((camp) =>
            camp.uuid === campaignId
              ? {
                  ...camp,
                  draft_ids: updatedDraftIds,
                  updated_at: new Date().toISOString(),
                }
              : camp
          )
        );

        return newEmail;
      } catch (err) {
        setErrorEmails(`Failed to convert draft to email: ${err.message}`);
        return null;
      } finally {
        setLoadingEmails(false);
      }
    },
    [username, createEmailInCampaign]
  );

  // ==== EMAIL LIST CRUD OPERATIONS ==== //

  const createList = useCallback(
    async (listData) => {
      if (!username) {
        setErrorLists('User not identified. Cannot create list.');
        return null;
      }
      setLoadingLists(true);
      try {
        const newListPayload = {
          username: username,
          list_name: listData.name,
          list_description: listData.description || '',
          list: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const { data: newListFromDb, error } = await supabase
          .from('email_list')
          .insert(newListPayload)
          .select()
          .single();

        if (error) throw error;

        setLists((prev) => [newListFromDb, ...prev]);
        return newListFromDb;
      } catch (err) {
        setErrorLists(`Failed to create list: ${err.message}`);
        return null;
      } finally {
        setLoadingLists(false);
      }
    },
    [username]
  );

  const updateListDetails = useCallback(
    async (listId, updateData) => {
      if (!username) {
        setErrorLists('User not identified. Cannot update list.');
        return null;
      }
      setLoadingLists(true);
      try {
        const updatesToApply = {
          list_name: updateData.name,
          list_description: updateData.description,
          updated_at: new Date().toISOString(),
        };

        // Only update the list array if provided
        if (updateData.list !== undefined) {
          updatesToApply.list = updateData.list;
        }

        const { data: updatedListFromDb, error } = await supabase
          .from('email_list')
          .update(updatesToApply)
          .eq('uuid', listId)
          .eq('username', username)
          .select()
          .single();

        if (error) throw error;

        setLists((prev) =>
          prev.map((list) => (list.uuid === listId ? updatedListFromDb : list))
        );
        return updatedListFromDb;
      } catch (err) {
        setErrorLists(`Failed to update list details: ${err.message}`);
        return null;
      } finally {
        setLoadingLists(false);
      }
    },
    [username]
  );

  const deleteList = useCallback(
    async (listId) => {
      if (!username) {
        setErrorLists('User not identified. Cannot delete list.');
        return false;
      }
      setLoadingLists(true);
      try {
        const { error } = await supabase
          .from('email_list')
          .delete()
          .eq('uuid', listId)
          .eq('username', username);

        if (error) throw error;
        setLists((prev) => prev.filter((list) => list.uuid !== listId));
        return true;
      } catch (err) {
        setErrorLists(`Failed to delete list: ${err.message}`);
        return false;
      } finally {
        setLoadingLists(false);
      }
    },
    [username]
  );

  // ==== SUBSCRIBER MANAGEMENT OPERATIONS ==== //

  const addSubscriberToList = useCallback(
    async (contactData, listId) => {
      if (!username) {
        setErrorLists('User not identified. Cannot add subscriber to list.');
        return false;
      }

      // Validate contact data
      if (!contactData || typeof contactData !== 'object') {
        setErrorLists('Invalid contact data provided.');
        return false;
      }

      const email =
        typeof contactData === 'string' ? contactData : contactData.email;

      if (!email || !email.includes('@')) {
        setErrorLists('Invalid email address provided.');
        return false;
      }

      setLoadingLists(true);
      try {
        const { data: listData, error: listError } = await supabase
          .from('email_list')
          .select('*')
          .eq('username', username)
          .eq('uuid', listId)
          .single();

        if (listError) throw listError;

        const currentList = listData.list || [];

        // Check for duplicates (handle both old and new formats)
        const emailExists = currentList.some((item) => {
          if (typeof item === 'object' && item !== null) {
            return item.email.toLowerCase() === email.toLowerCase();
          }
          return item.toLowerCase() === email.toLowerCase(); // Old format
        });

        if (emailExists) {
          setLoadingLists(false);
          return true; // Consider this a success since the email is already in the list
        }

        // Prepare contact object
        const contactToAdd =
          typeof contactData === 'string'
            ? {
                email: email.toLowerCase().trim(),
                first_name: '',
                last_name: '',
                subscribed_date: new Date().toISOString(),
              }
            : {
                email: email.toLowerCase().trim(),
                first_name: contactData.first_name || '',
                last_name: contactData.last_name || '',
                subscribed_date: new Date().toISOString(),
              };

        // Add the contact object to the list
        currentList.push(contactToAdd);

        const { error: updateListError } = await supabase
          .from('email_list')
          .update({
            list: currentList,
            updated_at: new Date().toISOString(),
          })
          .eq('uuid', listId)
          .eq('username', username);

        if (updateListError) throw updateListError;

        // Update local state
        setLists((prev) =>
          prev.map((list) =>
            list.uuid === listId
              ? {
                  ...list,
                  list: currentList,
                  updated_at: new Date().toISOString(),
                }
              : list
          )
        );

        return true;
      } catch (error) {
        console.error('Error adding subscriber to list:', error);
        setErrorLists(`Error adding subscriber to list: ${error.message}`);
        return false;
      } finally {
        setLoadingLists(false);
      }
    },
    [username]
  );

  const removeSubscriberFromList = useCallback(
    async (contact, listId) => {
      if (!username) {
        setErrorLists(
          'User not identified. Cannot remove subscriber from list.'
        );
        return false;
      }

      // Extract email from contact (handle both string and object)
      const emailToRemove =
        typeof contact === 'object' ? contact.email : contact;

      if (!emailToRemove) {
        setErrorLists('Email address is required.');
        return false;
      }

      setLoadingLists(true);
      try {
        const { data: listData, error: listError } = await supabase
          .from('email_list')
          .select('*')
          .eq('username', username)
          .eq('uuid', listId)
          .single();

        if (listError) throw listError;

        let currentList = listData.list || [];
        const initialLength = currentList.length;
        const emailLower = emailToRemove.toLowerCase().trim();

        // Remove the contact (handle both formats)
        currentList = currentList.filter((item) => {
          if (typeof item === 'object' && item !== null) {
            return item.email.toLowerCase() !== emailLower;
          }
          return item.toLowerCase() !== emailLower; // Old format
        });

        if (currentList.length === initialLength) {
          setLoadingLists(false);
          return true; // Consider this a success since the email is no longer in the list
        }

        const { error: updateListError } = await supabase
          .from('email_list')
          .update({
            list: currentList,
            updated_at: new Date().toISOString(),
          })
          .eq('uuid', listId)
          .eq('username', username);

        if (updateListError) throw updateListError;

        // Update local state
        setLists((prev) =>
          prev.map((list) =>
            list.uuid === listId
              ? {
                  ...list,
                  list: currentList,
                  updated_at: new Date().toISOString(),
                }
              : list
          )
        );

        return true;
      } catch (error) {
        console.error('Error removing subscriber from list:', error);
        setErrorLists(`Error removing subscriber from list: ${error.message}`);
        return false;
      } finally {
        setLoadingLists(false);
      }
    },
    [username]
  );

  const addMultipleSubscribersToList = useCallback(
    async (contacts, listId) => {
      if (!username) {
        setErrorLists('User not identified. Cannot add subscribers to list.');
        return { success: false, added: 0, duplicates: 0 };
      }

      if (!Array.isArray(contacts) || contacts.length === 0) {
        setErrorLists('No valid contacts provided.');
        return { success: false, added: 0, duplicates: 0 };
      }

      setLoadingLists(true);
      try {
        const { data: listData, error: listError } = await supabase
          .from('email_list')
          .select('*')
          .eq('username', username)
          .eq('uuid', listId)
          .single();

        if (listError) throw listError;

        const currentList = listData.list || [];

        // Get existing emails (handle both formats)
        const existingEmails = new Set(
          currentList.map((item) => {
            if (typeof item === 'object' && item !== null) {
              return item.email.toLowerCase();
            }
            return item.toLowerCase(); // Old format
          })
        );

        let addedCount = 0;
        let duplicateCount = 0;

        // Process each contact
        contacts.forEach((contact) => {
          // Handle both string emails and contact objects
          const email =
            typeof contact === 'string'
              ? contact.toLowerCase().trim()
              : contact.email?.toLowerCase().trim();

          if (email && email.includes('@')) {
            if (!existingEmails.has(email)) {
              // Add as contact object
              const contactToAdd =
                typeof contact === 'string'
                  ? {
                      email: email,
                      first_name: '',
                      last_name: '',
                      subscribed_date: new Date().toISOString(),
                    }
                  : {
                      email: email,
                      first_name: contact.first_name || '',
                      last_name: contact.last_name || '',
                      subscribed_date: new Date().toISOString(),
                    };

              currentList.push(contactToAdd);
              existingEmails.add(email);
              addedCount++;
            } else {
              duplicateCount++;
            }
          }
        });

        if (addedCount > 0) {
          const { error: updateListError } = await supabase
            .from('email_list')
            .update({
              list: currentList,
              updated_at: new Date().toISOString(),
            })
            .eq('uuid', listId)
            .eq('username', username);

          if (updateListError) throw updateListError;

          // Update local state
          setLists((prev) =>
            prev.map((list) =>
              list.uuid === listId
                ? {
                    ...list,
                    list: currentList,
                    updated_at: new Date().toISOString(),
                  }
                : list
            )
          );
        }

        return { success: true, added: addedCount, duplicates: duplicateCount };
      } catch (error) {
        console.error('Error in bulk add operation:', error);
        setErrorLists(`Error adding subscribers to list: ${error.message}`);
        return { success: false, added: 0, duplicates: 0 };
      } finally {
        setLoadingLists(false);
      }
    },
    [username]
  );

  // ==== HELPER FUNCTIONS ==== //

  const getCampaignById = useCallback(
    (campaignId) => {
      return campaigns.find((campaign) => campaign.uuid === campaignId);
    },
    [campaigns]
  );

  const getListById = useCallback(
    (listId) => {
      return lists.find((list) => list.uuid === listId);
    },
    [lists]
  );

  const getCampaignEmailCount = useCallback(
    (campaignId) => {
      const emails = campaignEmails[campaignId];
      if (Array.isArray(emails)) return emails.length;

      // fallback: if campaigns contain embedded email_ids (old/new formats)
      const campaign = campaigns.find((c) => c.uuid === campaignId);
      if (!campaign) return 0;

      if (Array.isArray(campaign.email_ids)) {
        // email_ids may be array of ids or objects with metadata
        return campaign.email_ids.length;
      }

      return 0;
    },
    [campaignEmails, campaigns]
  );

  const getCampaignDraftCount = useCallback(
    (campaignId) => {
      const drafts = campaignDrafts[campaignId];
      if (Array.isArray(drafts)) return drafts.length;

      const campaign = campaigns.find((c) => c.uuid === campaignId);
      if (!campaign) return 0;

      if (Array.isArray(campaign.draft_ids)) return campaign.draft_ids.length;

      return 0;
    },
    [campaignDrafts, campaigns]
  );

  const getCampaignTotalCount = useCallback(
    (campaignId) => {
      return (
        getCampaignEmailCount(campaignId) + getCampaignDraftCount(campaignId)
      );
    },
    [getCampaignEmailCount, getCampaignDraftCount]
  );

  const getDraftById = useCallback(
    (campaignId, draftId) => {
      const drafts = campaignDrafts[campaignId] || [];
      return drafts.find((draft) => draft.uuid === draftId);
    },
    [campaignDrafts]
  );

  const getEmailById = useCallback(
    (campaignId, emailId) => {
      const emails = campaignEmails[campaignId] || [];
      return emails.find((email) => email.uuid === emailId);
    },
    [campaignEmails]
  );

  const getTemplateById = useCallback(
    (templateId) => {
      return emailTemplates.find((template) => template.uuid === templateId);
    },
    [emailTemplates]
  );

  const getItemById = useCallback(
    (campaignId, itemId, type) => {
      if (type === 'draft') {
        return getDraftById(campaignId, itemId);
      } else if (type === 'email') {
        return getEmailById(campaignId, itemId);
      }
      return null;
    },
    [getDraftById, getEmailById]
  );

  useEffect(() => {
    if (!username || campaigns.length === 0) return;

    campaigns.forEach((c) => {
      const id = c.uuid;
      // only fetch if we don't already have them cached
      if (!campaignEmails[id]) {
        fetchCampaignEmails(id).catch(() => {});
      }
      if (!campaignDrafts[id]) {
        fetchCampaignDrafts(id).catch(() => {});
      }
    });
  }, [
    username,
    campaigns,
    campaignEmails,
    campaignDrafts,
    fetchCampaignEmails,
    fetchCampaignDrafts,
  ]);

  // ==== CONTEXT PROVIDER VALUE ==== //

  const value = useMemo(
    () => ({
      // Campaign data and operations
      campaigns,
      loadingCampaigns,
      errorCampaigns,
      fetchCampaigns,
      createCampaign,
      updateCampaign,
      deleteCampaign,
      getCampaignById,
      getCampaignEmailCount,
      getCampaignDraftCount,
      getCampaignTotalCount,

      // Email template data and operations
      emailTemplates,
      loadingTemplates,
      errorTemplates,
      fetchEmailTemplates,
      createEmailTemplate,
      updateEmailTemplate,
      deleteEmailTemplate,
      getTemplateById,

      // Email list data and operations
      lists,
      loadingLists,
      errorLists,
      fetchLists,
      createList,
      updateListDetails,
      deleteList,
      getListById,
      addSubscriberToList,
      removeSubscriberFromList,
      addMultipleSubscribersToList,

      // Campaign emails and drafts
      campaignEmails,
      campaignDrafts,
      loadingEmails,
      errorEmails,
      fetchCampaignEmails,
      fetchCampaignDrafts,

      // Email operations
      createEmailInCampaign,
      updateEmailInCampaign,
      deleteEmailFromCampaign,
      getEmailById,

      // Draft operations
      createDraftInCampaign,
      updateDraftInCampaign,
      deleteDraftFromCampaign,
      getDraftById,

      // Conversion operations
      convertDraftToEmail,
      getItemById,

      // User context
      username,
    }),
    [
      campaigns,
      loadingCampaigns,
      errorCampaigns,
      fetchCampaigns,
      createCampaign,
      updateCampaign,
      deleteCampaign,
      getCampaignById,
      getCampaignEmailCount,
      getCampaignDraftCount,
      getCampaignTotalCount,
      emailTemplates,
      setEmailTemplates,
      loadingTemplates,
      errorTemplates,
      fetchEmailTemplates,
      createEmailTemplate,
      updateEmailTemplate,
      deleteEmailTemplate,
      lists,
      loadingLists,
      errorLists,
      fetchLists,
      createList,
      updateListDetails,
      deleteList,
      getListById,
      addSubscriberToList,
      removeSubscriberFromList,
      addMultipleSubscribersToList,
      campaignEmails,
      campaignDrafts,
      loadingEmails,
      errorEmails,
      fetchCampaignEmails,
      fetchCampaignDrafts,
      createEmailInCampaign,
      updateEmailInCampaign,
      deleteEmailFromCampaign,
      getEmailById,
      createDraftInCampaign,
      updateDraftInCampaign,
      deleteDraftFromCampaign,
      getDraftById,
      convertDraftToEmail,
      getItemById,
      username,
    ]
  );

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

// ==== CONTEXT HOOK ==== //

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
}
