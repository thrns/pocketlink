'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useAudience } from "@/app/contexts/AudienceContext"; // Keep for future use
import { useCampaigns } from '@/app/contexts/CampaignContext';
import {
  PlusCircle,
  AlertTriangle,
  Mail,
  Edit3 as EditIcon,
  Trash2,
  Send,
  Eye,
  MoreVertical,
  ListChecks,
  Filter,
  ChevronDown,
  FolderOpen,
  Users, // Added for card view
  Search,
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  EyeIcon,
} from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  DateFilterModule,
  CellStyleModule,
  TextFilterModule,
  RowSelectionModule,
} from 'ag-grid-community';
import CampaignDetailsModal from './components/CampaignDetailsModal';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
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
import { toast } from 'sonner';
import { myTheme } from '@/lib/utils/TableThemes';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES } from '@/constants/features';
import { FaMessage } from 'react-icons/fa6';

// Register AG-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  PaginationModule,
  CellStyleModule,
  DateFilterModule,
  RowSelectionModule,
]);

const CampaignsPage = () => {
  const {
    campaigns,
    loadingCampaigns,
    errorCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    lists,
    loadingLists,
    getCampaignTotalCount,
    getCampaignEmailCount,
    getCampaignDraftCount,
  } = useCampaigns();
  const router = useRouter();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setEditingCampaign(null);
    setIsDetailsModalOpen(true);
  };

  const handleOpenEditModal = (campaign, e) => {
    e.stopPropagation();
    setEditingCampaign(campaign);
    setIsDetailsModalOpen(true);
  };

  const handleSaveCampaign = async (campaignId, data) => {
    try {
      if (campaignId) {
        await updateCampaign(campaignId, data);
        toast.success('Campaign updated successfully');
      } else {
        const newCampaign = await createCampaign(data);
        if (!newCampaign) {
          toast.error('Failed to create campaign');
          return;
        }
        toast.success('Campaign created successfully');
      }
    } catch (error) {
      toast.error('Failed to save campaign');
    }
  };

  const handleDeleteClick = useCallback((campaign, event) => {
    event.stopPropagation();
    setCampaignToDelete(campaign);
    setDeleteDialogOpen(true);
  }, []);

  const handleEditClick = useCallback((campaign, event) => {
    event.stopPropagation();
    handleOpenEditModal(campaign, event);
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Filter campaigns based on search text
  const filteredCampaigns = useMemo(() => {
    if (!campaigns) return [];

    if (!searchText.trim()) {
      return campaigns;
    }

    const searchLower = searchText.toLowerCase().trim();

    return campaigns.filter((campaign) => {
      const name = campaign.campaign_name || 'Untitled Campaign';
      const description = campaign.campaign_description || '';

      return (
        name.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower)
      );
    });
  }, [campaigns, searchText]);

  // Handle selection changes
  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      setSelectedRows(selectedNodes.map((node) => node.data));
    }
  }, [gridApi]);

  // Handle bulk delete
  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      const deletePromises = selectedRows.map((campaign) =>
        deleteCampaign(campaign.uuid)
      );

      await Promise.all(deletePromises);

      toast.success(`Successfully deleted ${selectedRows.length} campaigns`);

      // Clear selection
      if (gridApi) {
        gridApi.deselectAll();
      }
      setSelectedRows([]);
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete some campaigns');
    } finally {
      setIsDeleting(false);
    }
  };

  // Campaign name cell renderer with click handler
  const campaignNameRenderer = useCallback(
    (params) => {
      const campaign = params.data;
      const name = campaign.campaign_name || 'Untitled Campaign';
      const description = campaign.campaign_description || '';
      return (
        <div
          className="cursor-pointer py-1"
          onClick={() => {
            router.push(`/dashboard/marketing/campaigns/${campaign.uuid}`);
          }}
        >
          <h1 className="truncate font-semibold text-blue-800">{name}</h1>
          {description && (
            <p className="max-w-xs truncate text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>
      );
    },
    [router]
  );

  // AG-Grid Column Definitions
  const columnDefs = useMemo(
    () => [
      {
        headerName: '',
        field: 'checkbox',
        width: 50,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        pinned: 'left',
        sortable: false,
        filter: false,
        resizable: false,
        suppressMenu: true,
      },
      {
        headerName: 'Campaign',
        field: 'campaign_name',
        flex: 2,
        minWidth: 200,
        cellRenderer: campaignNameRenderer,
        cellClass: 'bg-blue-50',
      },
      {
        headerName: 'Content',
        field: 'content_count',
        flex: 1,
        minWidth: 150,
        cellRenderer: (params) => {
          const campaign = params.data;
          const emailCount = getCampaignEmailCount(campaign.uuid);
          const draftCount = getCampaignDraftCount(campaign.uuid);
          const totalCount = getCampaignTotalCount(campaign.uuid);

          return (
            <div className="py-2">
              <div className="flex items-center font-medium text-gray-900">
                <FileText className="mr-1 h-4 w-4 text-gray-400" />
                {totalCount} total
              </div>
              <div className="text-sm text-gray-500">
                {emailCount} sent • {draftCount} drafts
              </div>
            </div>
          );
        },
      },
      {
        headerName: 'Created',
        field: 'created_at',
        width: 120,
        cellRenderer: (params) => (
          <div className="py-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {formatDate(params.value)}
            </div>
          </div>
        ),
      },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
        minWidth: 150,
        cellRenderer: (params) => {
          const campaign = params.data;
          const emailCount = getCampaignEmailCount(campaign.uuid);
          const draftCount = getCampaignDraftCount(campaign.uuid);

          // Get the latest expected final date from email_ids
          let latestExpectedDate = null;
          if (campaign.email_ids && campaign.email_ids.length > 0) {
            // Handle new format with expected_final_date
            if (typeof campaign.email_ids[0] === 'object') {
              const dates = campaign.email_ids
                .map((item) => item.expected_final_date)
                .filter((date) => date)
                .map((date) => new Date(date));

              if (dates.length > 0) {
                latestExpectedDate = new Date(Math.max(...dates));
              }
            }
          }

          return (
            <div className="py-2">
              <div className="flex items-center font-medium text-gray-900">
                <FileText className="mr-1 h-4 w-4 text-gray-400" />
                {emailCount > 0
                  ? 'Active'
                  : draftCount > 0
                    ? 'In Progress'
                    : 'Empty'}
              </div>
              <div className="text-sm text-gray-500">
                {emailCount} sent • {draftCount} drafts
              </div>
              {latestExpectedDate && new Date() < latestExpectedDate && (
                <div className="mt-1 text-xs text-green-600">
                  Completing by{' '}
                  {latestExpectedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>
          );
        },
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 120,
        pinned: 'right',
        cellRenderer: (params) => {
          const campaign = params.data;
          return (
            <div className="flex items-center justify-center gap-1 py-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    `/dashboard/marketing/campaigns/${campaign.uuid}`
                  );
                }}
                className="rounded-md bg-blue-50 p-1.5 text-blue-600 transition-colors"
                title="Manage emails"
              >
                <Mail size={16} />
              </button>
              <button
                onClick={(e) => handleEditClick(campaign, e)}
                className="rounded-md bg-gray-50 p-1.5 text-gray-600 transition-colors"
                title="Edit campaign"
              >
                <EditIcon size={16} />
              </button>
              <button
                onClick={(e) => handleDeleteClick(campaign, e)}
                className="rounded-md bg-red-50 p-1.5 text-red-600 transition-colors"
                title="Delete campaign"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        },
      },
    ],
    [
      getCampaignEmailCount,
      getCampaignDraftCount,
      getCampaignTotalCount,
      handleEditClick,
      handleDeleteClick,
      router,
      campaignNameRenderer,
    ]
  );

  const defaultColDef = useMemo(
    () => ({
      width: 150,
      resizable: true,
    }),
    []
  );

  const gridOptions = useMemo(
    () => ({
      rowHeight: 80,
      suppressRowClickSelection: true,
      rowSelection: 'multiple',
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  const onRowClicked = (event) => {
    // Don't navigate if clicking on checkbox or action buttons
    if (
      event.event.target.type === 'checkbox' ||
      event.event.target.closest('button')
    ) {
      return;
    }
    router.push(`/dashboard/marketing/campaigns/${event.data.uuid}`);
  };

  return (
    <PremiumGate
      featureKey={FEATURES.EMAIL_MARKETING}
      featureName="Email Marketing Campaigns"
      description="Create, manage, and track email campaigns to engage your audience and drive conversions."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6">
          <div className="pointer-events-none flex h-full w-full flex-col opacity-60">
            <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <h1 className="text-2xl font-semibold text-gray-800">
                Campaigns (8)
              </h1>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                Create Campaign
              </button>
            </div>

            <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4">
              <div className="space-y-3">
                {[
                  {
                    name: 'Summer Sale 2024',
                    status: 'Sent',
                    openRate: '42.3%',
                    recipients: 2340,
                  },
                  {
                    name: 'Product Launch',
                    status: 'Draft',
                    openRate: '-',
                    recipients: 1250,
                  },
                  {
                    name: 'Weekly Newsletter #12',
                    status: 'Scheduled',
                    openRate: '-',
                    recipients: 890,
                  },
                  {
                    name: 'Welcome Series Part 1',
                    status: 'Sent',
                    openRate: '67.8%',
                    recipients: 156,
                  },
                  {
                    name: 'Black Friday Prep',
                    status: 'Draft',
                    openRate: '-',
                    recipients: 3400,
                  },
                  {
                    name: 'Customer Feedback',
                    status: 'Sent',
                    openRate: '38.9%',
                    recipients: 567,
                  },
                  {
                    name: 'New Feature Announcement',
                    status: 'Scheduled',
                    openRate: '-',
                    recipients: 2100,
                  },
                ].map((campaign, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-100 py-3"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-gray-500">
                        {campaign.recipients} recipients • Created 2 days ago
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {campaign.openRate}
                        </p>
                        <p className="text-xs text-gray-500">Open Rate</p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          campaign.status === 'Sent'
                            ? 'bg-green-100 text-green-800'
                            : campaign.status === 'Draft'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {campaign.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        •••
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex h-full flex-col p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-start justify-start gap-4 sm:items-center">
            <div className="rounded-xl bg-bento-blue p-3">
              <FaMessage className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Campaigns
              </h1>
              <p className="text-gray-600">
                Build and Manage your email campaigns.
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center rounded-lg bg-black px-4 py-2 font-medium text-white"
            >
              <PlusCircle size={18} className="mr-2" /> Create Campaign
            </button>
          </div>
        </div>

        {loadingCampaigns && (
          <div className="flex flex-grow items-center justify-center">
            <p className="text-gray-500">Loading campaign folders...</p>
          </div>
        )}
        {errorCampaigns && (
          <div className="flex flex-grow flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6">
            <AlertTriangle size={40} className="mb-3 text-red-500" />
            <p className="font-medium text-red-700">Error loading campaigns:</p>
            <p className="text-sm text-red-600">{errorCampaigns}</p>
          </div>
        )}

        {!loadingCampaigns && !errorCampaigns && campaigns.length === 0 && (
          <div className="flex flex-grow flex-col items-center justify-center rounded-lg bg-white py-12 text-center">
            <FolderOpen size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-xl font-medium text-gray-700">
              No Campaign Folders Yet
            </h3>
            <p className="mb-6 max-w-md text-sm text-gray-500">
              Organize your emails into campaign folders. Create your first
              folder to get started.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center rounded-lg bg-black px-5 py-2.5 font-medium text-white"
            >
              <PlusCircle size={18} className="mr-2" /> Create Your First
              Campaign
            </button>
          </div>
        )}

        {!loadingCampaigns && !errorCampaigns && campaigns.length > 0 && (
          <div className="flex w-full flex-grow flex-col gap-2">
            <div className="flex flex-col gap-3 rounded-lg border bg-white p-4">
              {/* Search and bulk actions */}
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="w-full sm:w-2/3 lg:w-1/2">
                  <Input
                    type="text"
                    placeholder={`Search ${
                      campaigns?.length || 0
                    } campaigns... (Name, Description)`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {searchText.trim() && (
                    <p className="mt-1 text-sm text-gray-600">
                      Showing {filteredCampaigns?.length || 0} of{' '}
                      {campaigns?.length || 0} campaigns
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Bulk delete button */}
                  {selectedRows.length > 0 && (
                    <>
                      <span className="text-sm text-gray-600">
                        {selectedRows.length} selected
                      </span>
                      <button
                        onClick={() => setBulkDeleteDialogOpen(true)}
                        className="flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
                      >
                        <Trash2 size={16} className="mr-1.5" />
                        Delete Selected
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* AG-Grid Table */}
            <div
              className="ag-theme-alpine flex-grow"
              style={{ width: '100%', height: '600px' }}
            >
              {filteredCampaigns.length === 0 && searchText.trim() ? (
                <div className="py-10 text-center">
                  <Search size={32} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600">
                    No campaigns found matching "{searchText}"
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your search terms or clear the search to see
                    all {campaigns?.length || 0} campaigns.
                  </p>
                </div>
              ) : (
                <AgGridReact
                  rowData={filteredCampaigns}
                  columnDefs={columnDefs}
                  gridOptions={gridOptions}
                  onGridReady={onGridReady}
                  onRowClicked={onRowClicked}
                  onSelectionChanged={onSelectionChanged}
                  theme={myTheme}
                  modules={[
                    ClientSideRowModelModule,
                    ValidationModule,
                    PaginationModule,
                    RowSelectionModule,
                  ]}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                  noRowsOverlayComponent={() => (
                    <div className="p-6 text-center text-gray-500">
                      {searchText.trim() ? (
                        <div>
                          <p>No campaigns found matching "{searchText}"</p>
                          <p className="mt-2 text-sm">
                            Try adjusting your search terms or clear the search
                            to see all {campaigns?.length || 0} campaigns.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p>No campaigns found.</p>
                          <p className="mt-2 text-sm">
                            Create your first campaign to get started.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                />
              )}
            </div>
          </div>
        )}

        {/* Campaign Details Modal */}
        <CampaignDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onSave={handleSaveCampaign}
          campaign={editingCampaign}
        />

        {/* Single Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
              <AlertDialogDescription>
                <span>
                  {`Are you sure you want to delete "${
                    campaignToDelete?.campaign_name || 'this campaign'
                  }"? This will also delete all emails and drafts in this campaign. This action cannot be undone.`}
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async (e) => {
                  e.stopPropagation();
                  setIsDeleting(true);
                  try {
                    await deleteCampaign(campaignToDelete.uuid);
                    toast.success(
                      `Campaign ${campaignToDelete?.campaign_name || ''} deleted successfully`
                    );
                    setDeleteDialogOpen(false);
                  } catch (error) {
                    toast.error('Failed to delete campaign');
                  } finally {
                    setIsDeleting(false);
                  }
                }}
                disabled={isDeleting}
                className="bg-red-600 focus:ring-red-600"
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
              <AlertDialogTitle>Delete Multiple Campaigns</AlertDialogTitle>
              <AlertDialogDescription>
                <span>
                  Are you sure you want to delete {selectedRows.length}{' '}
                  campaigns? This will also delete all emails and drafts in
                  these campaigns. This action cannot be undone.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="bg-red-600 focus:ring-red-600"
              >
                {isDeleting
                  ? 'Deleting...'
                  : `Delete ${selectedRows.length} Campaign${selectedRows.length !== 1 ? 's' : ''}`}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PremiumGate>
  );
};

export default CampaignsPage;
