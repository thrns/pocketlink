'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCampaigns } from '@/app/contexts/CampaignContext';
import { myTheme } from '@/lib/utils/TableThemes';
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
import {
  ListPlus,
  Edit3 as EditIcon,
  Trash2,
  Users,
  Eye,
  MoreVertical,
  Search,
  ArrowRight,
} from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES } from '@/constants/features';
import { useAuth } from '@/app/contexts/AuthContext';

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

// Helper function to get contact limit based on workspace account
const getContactLimit = (isWorkspaceAccount) => {
  return 5000;
};

// Modal for Creating/Editing List Details
const ListDetailsModal = ({ isOpen, onClose, onSave, list }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();

  // Get contact limit for this user
  const contactLimit = getContactLimit(user?.workspace_account);

  useEffect(() => {
    if (list) {
      setName(list?.list_name || '');
      setDescription(list?.list_description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [list, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('List name is required.');
    onSave(list ? list.uuid : null, { name, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h3 className="mb-4 text-xl font-semibold">
          {list ? 'Edit List Details' : 'Create New List'}
        </h3>

        {/* Contact limit info */}
        <div className="mb-4 rounded-lg bg-blue-50 p-3">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Contact Limit:</span>{' '}
            {contactLimit.toLocaleString()} contacts per list
          </p>
          {list && (
            <p className="mt-1 text-xs text-blue-600">
              Current: {list.list?.length || 0} /{' '}
              {contactLimit.toLocaleString()} contacts
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="List Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border p-2"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-md border p-2"
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border bg-gray-100 px-4 py-2 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              {list ? 'Save Changes' : 'Create List'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ListsPage = () => {
  const {
    lists,
    loadingLists,
    errorLists,
    createList,
    updateListDetails,
    deleteList,
    campaigns,
    campaignEmails,
    campaignDrafts,
  } = useCampaigns();

  const router = useRouter();
  const { user } = useAuth();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [gridApi, setGridApi] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setEditingList(null);
    setIsDetailsModalOpen(true);
  };

  const handleOpenEditModal = (list, e) => {
    e.stopPropagation();
    setEditingList(list);
    setIsDetailsModalOpen(true);
  };

  const handleSaveList = async (listId, data) => {
    try {
      if (listId) {
        await updateListDetails(listId, data);
        toast.success('List updated successfully');
      } else {
        await createList(data);
        toast.success('List created successfully');
      }
    } catch (error) {
      toast.error('Failed to save list');
    }
  };

  const handleDeleteClick = useCallback((list, event) => {
    event.stopPropagation();
    setListToDelete(list);
    setDeleteDialogOpen(true);
  }, []);

  const handleEditClick = useCallback((list, event) => {
    event.stopPropagation();
    handleOpenEditModal(list, event);
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Check if list is in use in any campaign emails or drafts
  const isListInUse = useCallback(
    (listId) => {
      // Check all campaigns for emails or drafts using this list
      return campaigns.some((campaign) => {
        const emails = campaignEmails[campaign.uuid] || [];
        const drafts = campaignDrafts[campaign.uuid] || [];
        const allItems = [...emails, ...drafts];
        return allItems.some((item) => item.email_list_id === listId);
      });
    },
    [campaigns, campaignEmails, campaignDrafts]
  );

  // Get usage count for list
  const getListUsageCount = useCallback(
    (listId) => {
      let count = 0;
      campaigns.forEach((campaign) => {
        const emails = campaignEmails[campaign.uuid] || [];
        const drafts = campaignDrafts[campaign.uuid] || [];
        const allItems = [...emails, ...drafts];
        count += allItems.filter(
          (item) => item.email_list_id === listId
        ).length;
      });
      return count;
    },
    [campaigns, campaignEmails, campaignDrafts]
  );

  // Filter lists based on search text
  const filteredLists = useMemo(() => {
    if (!lists) return [];

    if (!searchText.trim()) {
      return lists;
    }

    const searchLower = searchText.toLowerCase().trim();

    return lists.filter((list) => {
      const name = list.list_name || 'Untitled List';
      const description = list.list_description || '';

      return (
        name.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower)
      );
    });
  }, [lists, searchText]);

  // Handle selection changes
  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      setSelectedRows(selectedNodes.map((node) => node.data));
    }
  }, [gridApi]);

  // Check if any selected lists are in use
  const hasSelectedListsInUse = useMemo(() => {
    return selectedRows.some((list) => isListInUse(list.uuid));
  }, [selectedRows, isListInUse]);

  // Get deletable lists from selection
  const deletableLists = useMemo(() => {
    return selectedRows.filter((list) => !isListInUse(list.uuid));
  }, [selectedRows, isListInUse]);

  // Handle bulk delete
  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      // Delete only lists that are not in use
      const deletePromises = deletableLists.map((list) =>
        deleteList(list.uuid)
      );

      await Promise.all(deletePromises);

      const deletedCount = deletableLists.length;
      const skippedCount = selectedRows.length - deletedCount;

      if (skippedCount > 0) {
        toast.success(
          `Deleted ${deletedCount} lists. ${skippedCount} lists were in use and skipped.`
        );
      } else {
        toast.success(`Successfully deleted ${deletedCount} lists`);
      }

      // Clear selection
      if (gridApi) {
        gridApi.deselectAll();
      }
      setSelectedRows([]);
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete some lists');
    } finally {
      setIsDeleting(false);
    }
  };

  // Check if row is selectable (not in use)
  const isRowSelectable = useCallback(
    (node) => {
      return !isListInUse(node.data.uuid);
    },
    [isListInUse]
  );

  // List name cell renderer with click handler
  const listNameRenderer = useCallback(
    (params) => {
      const name = params.value || 'Untitled List';
      const description = params.data.list_description;
      const usageCount = getListUsageCount(params.data.uuid);
      const contactCount = params.data.list?.length || 0;
      const contactLimit = getContactLimit(user?.workspace_account);

      return (
        <div
          className="cursor-pointer py-1"
          onClick={() => {
            router.push(`/dashboard/marketing/lists/${params.data.uuid}`);
          }}
        >
          <h1 className="font-medium text-blue-800">{name}</h1>
          {description && (
            <p className="max-w-xs truncate text-xs text-gray-500">
              {description}
            </p>
          )}
          <div className="mt-1 flex items-center gap-2">
            {usageCount > 0 && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                Used in {usageCount} email{usageCount !== 1 ? 's' : ''}
              </span>
            )}
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                contactCount >= contactLimit * 0.9
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {contactCount}/{contactLimit.toLocaleString()} contacts
            </span>
          </div>
        </div>
      );
    },
    [router, getListUsageCount, user?.workspace_account]
  );

  // Column definitions for AG-Grid
  const columnDefs = useMemo(
    () => [
      {
        headerName: '',
        field: 'checkbox',
        width: 50,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        pinned: 'left',
        sortable: false,
        filter: false,
        resizable: false,
        cellRenderer: (params) => {
          // Disable checkbox if list is in use
          const inUse = isListInUse(params.data.uuid);
          if (inUse) {
            return '<input type="checkbox" disabled style="cursor: not-allowed; opacity: 0.5;" title="List is in use" />';
          }
          return undefined; // Let AG-Grid handle the checkbox
        },
      },
      {
        headerName: 'List Name',
        field: 'list_name',
        sortable: true,
        filter: 'agTextColumnFilter',
        flex: 2,
        cellRenderer: listNameRenderer,
        cellClass: 'bg-blue-50',
      },
      {
        headerName: 'Contacts',
        field: 'list',
        sortable: true,
        filter: 'agNumberColumnFilter',
        flex: 1,
        cellClass: 'text-center',
        valueGetter: (params) => params.data.list?.length || 0,
        cellRenderer: (params) => {
          const count = params.value || 0;
          return (
            <div className="flex items-center justify-center">
              <span className="font-medium text-gray-900">
                {count.toLocaleString()}
              </span>
            </div>
          );
        },
      },
      {
        headerName: 'Created',
        field: 'created_at',
        sortable: true,
        filter: 'agDateColumnFilter',
        flex: 1.2,
        cellClass: 'text-center',
        valueFormatter: (params) => formatDate(params.value),
      },
      {
        headerName: 'Actions',
        field: 'actions',
        sortable: false,
        filter: false,
        width: 120,
        cellClass: 'text-center',
        cellRenderer: (params) => {
          const inUse = isListInUse(params.data.uuid);
          return (
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleEditClick(params.data, e);
                }}
                className="inline-flex items-center justify-center rounded-md bg-blue-50 p-2 text-blue-600 transition-colors"
                aria-label="Edit list"
              >
                <EditIcon className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDeleteClick(params.data, e);
                }}
                className={`inline-flex items-center justify-center rounded-md p-2 transition-colors ${
                  inUse
                    ? 'cursor-not-allowed text-gray-400'
                    : 'bg-red-50 text-red-600'
                }`}
                aria-label="Delete list"
                disabled={inUse}
                title={inUse ? 'List is in use' : 'Delete list'}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        },
      },
    ],
    [handleDeleteClick, handleEditClick, listNameRenderer, isListInUse]
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
    router.push(`/dashboard/marketing/lists/${event.data.uuid}`);
  };

  return (
    <PremiumGate
      featureKey={FEATURES.EMAIL_MARKETING}
      featureName="Email Marketing Lists"
      description="Build and manage subscriber lists to organize your audience for targeted email campaigns."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6">
          <div className="pointer-events-none flex h-full w-full flex-col opacity-60">
            <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <h1 className="text-2xl font-semibold text-gray-800">
                Email Lists
              </h1>
              <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white">
                Create List
              </button>
            </div>

            <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4">
              <div className="space-y-3">
                {[
                  {
                    name: 'Newsletter Subscribers',
                    count: 1247,
                    status: 'Active',
                    growth: '+12%',
                  },
                  {
                    name: 'VIP Customers',
                    count: 89,
                    status: 'Active',
                    growth: '+5%',
                  },
                  {
                    name: 'Product Updates',
                    count: 567,
                    status: 'Active',
                    growth: '+8%',
                  },
                  {
                    name: 'Event Attendees',
                    count: 234,
                    status: 'Active',
                    growth: '+15%',
                  },
                  {
                    name: 'Beta Testers',
                    count: 45,
                    status: 'Active',
                    growth: '+3%',
                  },
                  {
                    name: 'Weekly Digest',
                    count: 892,
                    status: 'Active',
                    growth: '+7%',
                  },
                  {
                    name: 'Promotional Offers',
                    count: 1456,
                    status: 'Active',
                    growth: '+18%',
                  },
                ].map((list, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-100 py-3"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{list.name}</h3>
                      <p className="text-sm text-gray-500">
                        {list.count} subscribers • Created 5 days ago
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {list.growth}
                        </p>
                        <p className="text-xs text-gray-500">This month</p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          list.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {list.status}
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
            <div className="rounded-xl bg-bento-pink p-3">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Email Lists
              </h1>
              <p className="text-gray-600">
                Manage your contact lists for targeted campaigns.
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center rounded-lg bg-black px-4 py-2 font-medium text-white"
            >
              <ListPlus size={18} className="mr-2" /> Create List
            </button>
          </div>
        </div>

        {loadingLists && (
          <p className="py-8 text-center text-gray-500">Loading lists...</p>
        )}
        {errorLists && (
          <p className="py-8 text-center text-red-500">Error: {errorLists}</p>
        )}

        {!loadingLists && !errorLists && lists?.length === 0 && (
          <div className="flex flex-grow flex-col items-center justify-center rounded-lg bg-white py-12 text-center">
            <Users size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-xl font-medium text-gray-700">
              No Lists Created Yet
            </h3>
            <p className="mb-6 max-w-md text-sm text-gray-500">
              Lists are static collections of contacts. You can use them to send
              targeted email campaigns.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center rounded-lg bg-black px-5 py-2.5 font-medium text-white"
            >
              <ListPlus size={18} className="mr-2" /> Create Your First List
            </button>
          </div>
        )}

        {!loadingLists && !errorLists && lists?.length > 0 && (
          <div className="flex w-full flex-grow flex-col gap-2">
            <div className="flex flex-col gap-3 rounded-lg border bg-white p-4">
              {/* Search and bulk actions */}
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="w-full sm:w-2/3 lg:w-1/2">
                  <Input
                    type="text"
                    placeholder={`Search ${
                      lists?.length || 0
                    } lists... (Name, Description)`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {searchText.trim() && (
                    <p className="mt-1 text-sm text-gray-600">
                      Showing {filteredLists?.length || 0} of{' '}
                      {lists?.length || 0} lists
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
                        disabled={deletableLists.length === 0}
                      >
                        <Trash2 size={16} className="mr-1.5" />
                        Delete Selected
                        {hasSelectedListsInUse && (
                          <span className="ml-1">
                            ({deletableLists.length})
                          </span>
                        )}
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
              <AgGridReact
                rowData={filteredLists}
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
                  TextFilterModule,
                ]}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection="multiple"
                isRowSelectable={isRowSelectable}
                noRowsOverlayComponent={() => (
                  <div className="p-6 text-center text-gray-500">
                    {searchText.trim() ? (
                      <div>
                        <p>No lists found matching "{searchText}"</p>
                        <p className="mt-2 text-sm">
                          Try adjusting your search terms or clear the search to
                          see all {lists?.length || 0} lists.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>No lists found.</p>
                        <p className="mt-2 text-sm">
                          Create your first list to get started.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        )}

        {/* List Details Modal */}
        <ListDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onSave={handleSaveList}
          list={editingList}
        />

        {/* Single Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete List</AlertDialogTitle>
              <AlertDialogDescription>
                {`Are you sure you want to delete "${
                  listToDelete?.list_name || 'this list'
                }"? Contacts will be removed from it but not deleted entirely. This action cannot be undone.`}
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
                    await deleteList(listToDelete.uuid);
                    toast.success(
                      `List ${listToDelete?.list_name || ''} deleted successfully`
                    );
                    setDeleteDialogOpen(false);
                  } catch (error) {
                    toast.error('Failed to delete list');
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
              <AlertDialogTitle>Delete Multiple Lists</AlertDialogTitle>
              <AlertDialogDescription>
                {hasSelectedListsInUse ? (
                  <>
                    <p className="mb-2">
                      You have selected {selectedRows.length} lists.{' '}
                      {selectedRows.length - deletableLists.length} of them are
                      in use and cannot be deleted.
                    </p>
                    <p>
                      Are you sure you want to delete the remaining{' '}
                      {deletableLists.length} lists? This action cannot be
                      undone.
                    </p>
                  </>
                ) : (
                  `Are you sure you want to delete ${selectedRows.length} lists? This action cannot be undone.`
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleBulkDelete}
                disabled={isDeleting || deletableLists.length === 0}
                className="bg-red-600 focus:ring-red-600"
              >
                {isDeleting
                  ? 'Deleting...'
                  : `Delete ${deletableLists.length} List${deletableLists.length !== 1 ? 's' : ''}`}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PremiumGate>
  );
};

export default ListsPage;
