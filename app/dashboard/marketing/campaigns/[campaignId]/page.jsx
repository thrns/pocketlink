'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCampaigns } from '@/app/contexts/CampaignContext';
import {
  PlusCircle,
  ArrowLeft,
  Mail,
  Edit3 as EditIcon,
  Trash2,
  Send,
  Eye,
  AlertTriangle,
  Calendar,
  Clock,
  Users,
  FileText,
  Search,
  Filter,
  MailOpen,
  FilePenLine,
} from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  RowSelectionModule,
  ValidationModule,
} from 'ag-grid-community';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

// Register AG-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowSelectionModule,
  ValidationModule,
]);

const CampaignEmailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { campaignId } = params;

  const {
    getCampaignById,
    getListById,
    campaignEmails,
    campaignDrafts,
    loadingEmails,
    errorEmails,
    fetchCampaignEmails,
    fetchCampaignDrafts,
    deleteEmailFromCampaign,
    deleteDraftFromCampaign,
    convertDraftToEmail,
  } = useCampaigns();

  const [campaignDetails, setCampaignDetails] = useState(null);
  const [allContent, setAllContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, emails, drafts
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [itemToPreview, setItemToPreview] = useState(null);

  useEffect(() => {
    if (campaignId) {
      setIsLoading(true);
      setError(null);

      // Get campaign details
      const campaign = getCampaignById(campaignId);
      if (campaign) {
        setCampaignDetails(campaign);
        // Fetch both emails and drafts for this campaign
        Promise.all([
          fetchCampaignEmails(campaignId),
          fetchCampaignDrafts(campaignId),
        ]).then(() => {
          setIsLoading(false);
        });
      } else {
        setError('Campaign not found.');
        setIsLoading(false);
      }
    }
  }, [campaignId, getCampaignById, fetchCampaignEmails, fetchCampaignDrafts]);

  useEffect(() => {
    // Combine emails and drafts when they change
    const emails = campaignEmails[campaignId] || [];
    const drafts = campaignDrafts[campaignId] || [];

    // Add type and derive status from actual schema fields
    const emailsWithType = emails.map((email) => {
      let derivedStatus = 'draft';

      if (email.sent_at) {
        const sentDate = new Date(email.sent_at);
        const now = new Date();

        // Reset time components for accurate date comparison
        const sentDateOnly = new Date(
          sentDate.getFullYear(),
          sentDate.getMonth(),
          sentDate.getDate()
        );
        const nowDateOnly = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        if (sentDateOnly > nowDateOnly) {
          // Scheduled for future date
          derivedStatus = 'scheduled';
        } else if (sentDateOnly.getTime() === nowDateOnly.getTime()) {
          // Scheduled for today - check if time has passed
          if (sentDate <= now) {
            derivedStatus = 'sent';
          } else {
            derivedStatus = 'scheduled';
          }
        } else {
          // Past date
          derivedStatus = 'sent';
        }
      }

      // Additional check for expected_final_date
      if (email.expected_final_date && derivedStatus === 'sent') {
        const expectedDate = new Date(email.expected_final_date);
        const now = new Date();

        if (expectedDate > now) {
          // Still within expected completion window
          derivedStatus = 'scheduled';
        }
      }

      return {
        ...email,
        type: 'email',
        derivedStatus,
      };
    });

    const draftsWithType = drafts.map((draft) => ({
      ...draft,
      type: 'draft',
      // Drafts are always in draft status
      derivedStatus: 'draft',
    }));

    const combined = [...emailsWithType, ...draftsWithType].sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    setAllContent(combined);
  }, [campaignEmails, campaignDrafts, campaignId]);

  const handleCreateEmail = () => {
    router.push(`/dashboard/marketing/campaigns/${campaignId}/compose`);
  };

  const handleEditItem = useCallback(
    (item, event) => {
      event.stopPropagation();
      if (item.type === 'draft') {
        router.push(
          `/dashboard/marketing/campaigns/${campaignId}/compose?draftId=${item.uuid}`
        );
      } else {
        router.push(
          `/dashboard/marketing/campaigns/${campaignId}/compose?emailId=${item.uuid}`
        );
      }
    },
    [campaignId, router]
  );

  const handleDeleteClick = useCallback((item, event) => {
    event.stopPropagation();

    // Check if item is scheduled or currently sending
    if (
      item.derivedStatus === 'scheduled' ||
      item.derivedStatus === 'sending'
    ) {
      toast.error(
        `Cannot delete ${item.type} "${item.subject || 'Untitled'}" - it is currently ${item.derivedStatus}`
      );
      return;
    }

    setItemToDelete(item);
    setDeleteDialogOpen(true);
  }, []);

  const handleBulkDelete = useCallback(async () => {
    if (selectedRows.length === 0) return;

    // Check if any selected items are scheduled or sending
    const scheduledItems = selectedRows.filter(
      (item) =>
        item.derivedStatus === 'scheduled' || item.derivedStatus === 'sending'
    );

    if (scheduledItems.length > 0) {
      toast.error(
        `Cannot delete ${scheduledItems.length} item(s) that are scheduled or currently sending. Please wait for them to complete or reschedule them first.`
      );
      return;
    }

    setIsDeleting(true);
    try {
      // Group selected items by type for more efficient deletion
      const draftsToDelete = selectedRows.filter(
        (item) => item.type === 'draft'
      );
      const emailsToDelete = selectedRows.filter(
        (item) => item.type === 'email'
      );

      // Delete drafts
      await Promise.all(
        draftsToDelete.map((draft) =>
          deleteDraftFromCampaign(campaignId, draft.uuid)
        )
      );

      // Delete emails
      await Promise.all(
        emailsToDelete.map((email) =>
          deleteEmailFromCampaign(campaignId, email.uuid)
        )
      );

      setSelectedRows([]);
      setBulkDeleteDialogOpen(false);
      toast.success(
        `Successfully deleted ${selectedRows.length} item${selectedRows.length > 1 ? 's' : ''}`
      );
    } catch (error) {
      console.error('Error during bulk delete:', error);
      toast.error('Failed to delete some items');
    } finally {
      setIsDeleting(false);
    }
  }, [
    selectedRows,
    campaignId,
    deleteDraftFromCampaign,
    deleteEmailFromCampaign,
  ]);

  const handleSendDraft = useCallback(
    async (draft, event) => {
      event.stopPropagation();
      try {
        await convertDraftToEmail(campaignId, draft.uuid);
        toast.success(`Draft "${draft.subject}" sent successfully`);
      } catch (error) {
        toast.error('Failed to send draft');
      }
    },
    [campaignId, convertDraftToEmail]
  );

  const handleViewItem = useCallback((item, event) => {
    event.stopPropagation();
    setItemToPreview(item);
    setPreviewDialogOpen(true);
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (derivedStatus, type) => {
    const statusConfig = {
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' },
      sent: { color: 'bg-green-100 text-green-800', label: 'Sent' },
      sending: { color: 'bg-indigo-100 text-indigo-800', label: 'Sending' },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed' },
    };

    const config = statusConfig[derivedStatus] || statusConfig.draft;
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  // Filter content based on search text and type filter
  const filteredContent = useMemo(() => {
    let filtered = allContent;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter((item) => {
        if (filterType === 'emails') return item.type === 'email';
        if (filterType === 'drafts') return item.type === 'draft';
        return true;
      });
    }

    // Filter by search text
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase().trim();
      filtered = filtered.filter((item) => {
        const subject = item.subject || 'Untitled';
        const body = item.body || '';
        const derivedStatus = item.derivedStatus || 'draft';

        return (
          subject.toLowerCase().includes(searchLower) ||
          body.toLowerCase().includes(searchLower) ||
          derivedStatus.toLowerCase().includes(searchLower)
        );
      });
    }

    return filtered;
  }, [allContent, searchText, filterType]);

  // AG-Grid Column Definitions
  const columnDefs = useMemo(
    () => [
      {
        headerName: '',
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        pinned: 'left',
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: 'Content',
        field: 'subject',
        flex: 2,
        minWidth: 200,
        cellRenderer: (params) => {
          const item = params.data;
          const isEmail = item.type === 'email';
          return (
            <div className="flex items-center py-2">
              {isEmail ? (
                <MailOpen className="mr-3 h-5 w-5 flex-shrink-0 text-green-600" />
              ) : (
                <FilePenLine className="mr-3 h-5 w-5 flex-shrink-0 text-yellow-600" />
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-gray-900">
                  {item.subject || 'Untitled'}
                </div>
                <div className="truncate text-sm text-gray-500">
                  {item.body
                    ? `${item.body.substring(0, 100)}...`
                    : 'No content'}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        headerName: 'Type',
        field: 'type',
        width: 100,
        cellRenderer: (params) => {
          const item = params.data;
          return (
            <div className="py-2">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  item.type === 'email'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {item.type === 'email' ? 'Email' : 'Draft'}
              </span>
            </div>
          );
        },
      },
      {
        headerName: 'Status',
        field: 'derivedStatus',
        width: 120,
        cellRenderer: (params) => (
          <div className="py-2">
            {getStatusBadge(params.value, params.data.type)}
          </div>
        ),
      },
      {
        headerName: 'List',
        field: 'email_list_id',
        width: 150,
        cellRenderer: (params) => {
          const list = getListById(params.value);
          const count = list?.list?.length || 0;
          return (
            <div className="py-2">
              <div className="text-sm font-medium text-gray-900">
                {list?.list_name || 'No list'}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="mr-1 h-3 w-3" />
                {count} subscribers
              </div>
            </div>
          );
        },
      },
      {
        headerName: 'Updated',
        field: 'updated_at',
        width: 180,
        cellRenderer: (params) => {
          const item = params.data;
          const isScheduled = item.derivedStatus === 'scheduled';
          const displayDate = isScheduled ? item.sent_at : item.updated_at;
          const label = isScheduled ? 'Scheduled' : 'Updated';

          return (
            <div className="py-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {label}
              </div>
              <div className="text-xs">{formatDate(displayDate)}</div>
            </div>
          );
        },
      },
      {
        headerName: 'Expected Completion',
        field: 'expected_final_date',
        width: 180,
        cellRenderer: (params) => {
          const item = params.data;
          const isEmail = item.type === 'email';
          const expectedDate = item.expected_final_date;

          if (!isEmail || !expectedDate) {
            return (
              <div className="py-2 text-sm text-gray-400">
                <div className="text-xs">N/A</div>
              </div>
            );
          }

          const isMultiDay =
            expectedDate &&
            item.sent_at &&
            new Date(expectedDate) > new Date(item.sent_at || item.updated_at);

          return (
            <div className="py-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                Expected
              </div>
              <div className="text-xs font-medium text-green-700">
                {formatDate(expectedDate)}
              </div>
              {isMultiDay && (
                <div className="mt-0.5 text-xs text-blue-600">
                  Multi-day campaign
                </div>
              )}
            </div>
          );
        },
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 160,
        pinned: 'right',
        cellRenderer: (params) => {
          const item = params.data;
          const isDraft = item.type === 'draft';
          const isScheduledOrSending =
            item.derivedStatus === 'scheduled' ||
            item.derivedStatus === 'sending';

          return (
            <div className="flex items-center justify-center gap-1 py-2">
              <button
                onClick={(e) => handleViewItem(item, e)}
                className="rounded-md bg-gray-50 p-1.5 text-gray-600 transition-colors"
                title="Preview"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={(e) => handleEditItem(item, e)}
                className={`rounded-md p-1.5 transition-colors ${
                  isScheduledOrSending
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'bg-blue-50 text-blue-600'
                }`}
                title={
                  isScheduledOrSending
                    ? `Cannot edit - ${item.type} is ${item.derivedStatus}`
                    : isDraft
                      ? 'Edit draft'
                      : 'Edit email'
                }
                disabled={isScheduledOrSending}
              >
                <EditIcon size={16} />
              </button>
              {isDraft && (
                <button
                  onClick={(e) => handleSendDraft(item, e)}
                  className="rounded-md bg-black p-1.5 text-white transition-colors"
                  title="Send draft"
                >
                  <Send size={16} />
                </button>
              )}
              <button
                onClick={(e) => handleDeleteClick(item, e)}
                className={`rounded-md p-1.5 transition-colors ${
                  isScheduledOrSending
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'bg-red-50 text-red-600'
                }`}
                title={
                  isScheduledOrSending
                    ? `Cannot delete - ${item.type} is ${item.derivedStatus}`
                    : isDraft
                      ? 'Delete draft'
                      : 'Delete email'
                }
                disabled={isScheduledOrSending}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        },
      },
    ],
    [
      getListById,
      handleViewItem,
      handleEditItem,
      handleSendDraft,
      handleDeleteClick,
    ]
  );

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onRowClicked = (event) => {
    const item = event.data;
    handleEditItem(item, event);
  };

  const onSelectionChanged = useCallback((params) => {
    const selectedNodes = params.api.getSelectedNodes();
    setSelectedRows(selectedNodes.map((node) => node.data));
  }, []);

  if (isLoading || loadingEmails) {
    return (
      <div className="p-6 text-center">Loading content for campaign...</div>
    );
  }

  if (error || errorEmails) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle size={40} className="mx-auto mb-3 text-red-500" />
        <p className="mb-4 text-red-600">{error || errorEmails}</p>
        <Link
          href="/dashboard/marketing/campaigns"
          className="text-blue-600 underline"
        >
          Back to Campaigns
        </Link>
      </div>
    );
  }

  if (!campaignDetails) {
    return (
      <div className="p-6 text-center">Campaign details not available.</div>
    );
  }

  const emailCount = (campaignEmails[campaignId] || []).length;
  const draftCount = (campaignDrafts[campaignId] || []).length;

  return (
    <div className="flex h-full flex-col p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/marketing/campaigns"
          className="mb-2 flex items-center text-sm text-blue-600 text-blue-800"
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Campaigns
        </Link>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {campaignDetails.campaign_name}
            </h1>
            {campaignDetails.campaign_description && (
              <p className="mt-1 text-sm text-gray-600">
                {campaignDetails.campaign_description}
              </p>
            )}
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <MailOpen className="mr-1 h-4 w-4" />
                {emailCount} emails sent
              </span>
              <span className="flex items-center">
                <FilePenLine className="mr-1 h-4 w-4" />
                {draftCount} drafts
              </span>
            </div>
          </div>
          <button
            onClick={handleCreateEmail}
            className="flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm"
          >
            <PlusCircle size={16} className="mr-2" /> Create New Email
          </button>
        </div>
      </div>

      {/* Content Management Section */}
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col gap-3 rounded-lg border bg-white p-4">
          {/* Search and Filter */}
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="w-full sm:w-auto">
                <Input
                  type="text"
                  placeholder={`Search ${allContent?.length || 0} items... (Subject, Content, Status)`}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                />
                {searchText.trim() && (
                  <p className="mt-1 text-sm text-gray-600">
                    Showing {filteredContent?.length || 0} of{' '}
                    {allContent?.length || 0} items
                  </p>
                )}
              </div>
              {selectedRows.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete Selected ({selectedRows.length})
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All ({allContent.length})</option>
                <option value="emails">Emails ({emailCount})</option>
                <option value="drafts">Drafts ({draftCount})</option>
              </select>
            </div>
          </div>
        </div>

        {/* AG-Grid Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {allContent.length === 0 && !isLoading ? (
            <div className="py-10 text-center">
              <FileText size={40} className="mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600">
                No content created in this campaign yet.
              </p>
              <button
                onClick={handleCreateEmail}
                className="bg-600 mx-auto mt-4 flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
              >
                <PlusCircle size={16} className="mr-2" />
                Create First Email
              </button>
            </div>
          ) : filteredContent.length === 0 &&
            (searchText.trim() || filterType !== 'all') ? (
            <div className="py-10 text-center">
              <Search size={32} className="mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600">
                No content found{' '}
                {searchText.trim()
                  ? `matching "${searchText}"`
                  : `for ${filterType}`}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your search terms or filter to see all{' '}
                {allContent?.length || 0} items.
              </p>
            </div>
          ) : (
            <div
              className="ag-theme-alpine w-full"
              style={{
                height: `${Math.max(400, filteredContent.length * 70 + 50)}px`,
              }}
            >
              <AgGridReact
                rowData={filteredContent}
                columnDefs={columnDefs}
                onGridReady={onGridReady}
                onRowClicked={onRowClicked}
                onSelectionChanged={onSelectionChanged}
                rowHeight={70}
                headerHeight={50}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                animateRows={true}
                domLayout="autoHeight"
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {itemToDelete?.type === 'draft' ? 'Draft' : 'Email'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to delete "${
                itemToDelete?.subject || 'this item'
              }"? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.stopPropagation();
                setIsDeleting(true);
                try {
                  if (itemToDelete?.type === 'draft') {
                    await deleteDraftFromCampaign(
                      campaignId,
                      itemToDelete.uuid
                    );
                  } else {
                    await deleteEmailFromCampaign(
                      campaignId,
                      itemToDelete.uuid
                    );
                  }
                  toast.success(
                    `${itemToDelete?.type === 'draft' ? 'Draft' : 'Email'} "${itemToDelete?.subject || ''}" deleted successfully`
                  );
                  setDeleteDialogOpen(false);
                } catch (error) {
                  toast.error(
                    `Failed to delete ${itemToDelete?.type === 'draft' ? 'draft' : 'email'}`
                  );
                } finally {
                  setIsDeleting(false);
                }
              }}
              disabled={isDeleting}
              className="bg-red-600 bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Items</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to delete ${selectedRows.length} selected item${selectedRows.length > 1 ? 's' : ''}? This will permanently delete:`}
              <div className="mt-2 space-y-1">
                {selectedRows.slice(0, 5).map((item, index) => (
                  <div key={index} className="text-sm">
                    • {item.subject || 'Untitled'} ({item.type})
                  </div>
                ))}
                {selectedRows.length > 5 && (
                  <div className="text-sm text-gray-500">
                    ... and {selectedRows.length - 5} more items
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-red-600">
                This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="bg-red-600 bg-red-700 focus:ring-red-600"
            >
              {isDeleting
                ? 'Deleting...'
                : `Delete ${selectedRows.length} Item${selectedRows.length > 1 ? 's' : ''}`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {itemToPreview?.type === 'email' ? (
                <MailOpen className="h-5 w-5 text-black" />
              ) : (
                <FilePenLine className="h-5 w-5 text-yellow-600" />
              )}
              {itemToPreview?.type === 'email'
                ? 'Email Preview'
                : 'Draft Preview'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            {itemToPreview && (
              <div className="space-y-4">
                {/* Email Details */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <div className="mt-1 rounded-md border bg-gray-50 p-2 text-sm">
                      {itemToPreview.subject || 'No subject'}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(
                        itemToPreview.derivedStatus,
                        itemToPreview.type
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email List
                    </label>
                    <div className="mt-1 rounded-md border bg-gray-50 p-2 text-sm">
                      {getListById(itemToPreview.email_list_id)?.list_name ||
                        'No list selected'}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {itemToPreview.derivedStatus === 'scheduled'
                        ? 'Scheduled for'
                        : 'Last Updated'}
                    </label>
                    <div className="mt-1 rounded-md border bg-gray-50 p-2 text-sm">
                      {formatDate(
                        itemToPreview.derivedStatus === 'scheduled'
                          ? itemToPreview.sent_at
                          : itemToPreview.updated_at
                      )}
                    </div>
                  </div>

                  {/* Expected Final Date for emails with batches */}
                  {itemToPreview.type === 'email' &&
                    itemToPreview.expected_final_date &&
                    new Date(itemToPreview.expected_final_date) >
                      new Date(
                        itemToPreview.sent_at || itemToPreview.updated_at
                      ) && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                          Expected Completion Date
                        </label>
                        <div className="mt-1 rounded-md border bg-green-50 p-2 text-sm">
                          <div className="flex items-center text-green-700">
                            <Clock className="mr-2 h-4 w-4" />
                            All emails in this campaign expected to be delivered
                            by{' '}
                            <span className="ml-1 font-medium">
                              {formatDate(itemToPreview.expected_final_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                {/* Email Content */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <div className="mt-1 max-h-96 overflow-y-auto rounded-md border bg-white p-4">
                    {itemToPreview.body ? (
                      <div className="prose prose-sm max-w-none">
                        {/* Always render as HTML since we're now using rich text editor */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: itemToPreview.body,
                          }}
                          className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-em:text-gray-700"
                        />
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <FileText className="mx-auto mb-2 h-8 w-8" />
                        <p>No content available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recipients Info */}
                {itemToPreview.email_list_id && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Recipients
                    </label>
                    <div className="mt-1 rounded-md border bg-gray-50 p-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="mr-2 h-4 w-4" />
                        {getListById(itemToPreview.email_list_id)?.list
                          ?.length || 0}{' '}
                        subscribers will receive this {itemToPreview.type}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              {itemToPreview?.type === 'draft' && (
                <Button
                  onClick={() => {
                    setPreviewDialogOpen(false);
                    handleSendDraft(itemToPreview, {
                      stopPropagation: () => {},
                    });
                  }}
                  className="bg-bento-violet"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Now
                </Button>
              )}
              <Button
                onClick={() => {
                  setPreviewDialogOpen(false);
                  handleEditItem(itemToPreview, { stopPropagation: () => {} });
                }}
                variant="outline"
              >
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <Button
              onClick={() => setPreviewDialogOpen(false)}
              variant="outline"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignEmailsPage;
