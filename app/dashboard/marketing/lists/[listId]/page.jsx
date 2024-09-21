'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCampaigns } from '@/app/contexts/CampaignContext';
import { useAudience } from '@/app/contexts/AudienceContext';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { myTheme } from '@/lib/utils/TableThemes';
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
import AddContactModal from './components/AddContactModal';
import CsvUploadModal from './components/CsvUploadModal';
import { useAuth } from '@/app/contexts/AuthContext';

import {
  ClientSideRowModelModule,
  ValidationModule,
  RowSelectionModule,
  PaginationModule,
  CellStyleModule,
  TextFilterModule,
} from 'ag-grid-community';

// Register AG-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowSelectionModule,
  ValidationModule,
  PaginationModule,
  CellStyleModule,
  TextFilterModule,
]);

import {
  Users,
  UserPlus,
  Upload,
  Trash2,
  ChevronLeft,
  Mail,
  Search,
  Plus,
  X,
  FileSpreadsheet,
  AlertTriangle,
} from 'lucide-react';

// Helper function to get contact limit based on workspace account
const getContactLimit = (isWorkspaceAccount) => {
  return 5000;
};

const ListDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const listId = params.listId;

  // Use both contexts
  const {
    lists,
    addSubscriberToList,
    removeSubscriberFromList,
    addMultipleSubscribersToList,
    updateListDetails,
    loadingLists,
  } = useCampaigns();

  const { subscriptions } = useAudience();
  const { user } = useAuth();

  // Get contact limit for this user
  const contactLimit = getContactLimit(user?.workspace_account);

  const [currentList, setCurrentList] = useState(null);
  const [listContacts, setListContacts] = useState([]);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isCsvUploadModalOpen, setIsCsvUploadModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Get all available contacts from subscriptions
  const availableContacts = useMemo(() => {
    if (!subscriptions || subscriptions.length === 0) return [];

    const allContacts = [];
    subscriptions.forEach((subscription) => {
      if (subscription.subscribed) {
        Object.values(subscription.subscribed).forEach((contact) => {
          if (contact && contact.email) {
            // Include all fields from the contact
            allContacts.push({
              ...contact,
              source: subscription.subscription_name || 'Subscription',
            });
          }
        });
      }
    });

    // Remove duplicates based on email
    const uniqueContacts = allContacts.filter(
      (contact, index, self) =>
        index ===
        self.findIndex(
          (c) => c.email.toLowerCase() === contact.email.toLowerCase()
        )
    );

    return uniqueContacts;
  }, [subscriptions]);

  useEffect(() => {
    if (listId && lists?.length > 0) {
      const foundList = lists.find((l) => l.uuid === listId);
      setCurrentList(foundList);
      if (!foundList && !loadingLists) {
        console.warn('List not found');
      }
    }
  }, [listId, lists, loadingLists]);

  useEffect(() => {
    if (currentList && currentList.list) {
      // Handle both old format (array of strings) and new format (array of objects)
      const contacts = currentList.list.map((item, index) => {
        // Check if it's an object or string
        if (typeof item === 'object' && item !== null) {
          // New format: object with email, first_name, last_name
          return {
            id: `${item.email}-${index}`,
            email: item.email,
            first_name: item.first_name || '',
            last_name: item.last_name || '',
            status: 'subscribed',
            source: 'List',
          };
        } else {
          // Old format: just email string
          const email = item;
          const contactInfo = availableContacts.find(
            (c) => c.email.toLowerCase() === email.toLowerCase()
          );
          return {
            id: `${email}-${index}`,
            email: email,
            first_name: contactInfo?.first_name || '',
            last_name: contactInfo?.last_name || '',
            status: 'subscribed',
            source: contactInfo?.source || 'Manual',
          };
        }
      });
      setListContacts(contacts);
    } else {
      setListContacts([]);
    }
  }, [currentList, availableContacts]);

  const filteredContacts = useMemo(() => {
    if (!searchText.trim()) return listContacts;

    const searchLower = searchText.toLowerCase();
    return listContacts.filter((contact) => {
      return (
        (contact.email || '').toLowerCase().includes(searchLower) ||
        (contact.first_name || '').toLowerCase().includes(searchLower) ||
        (contact.last_name || '').toLowerCase().includes(searchLower)
      );
    });
  }, [listContacts, searchText]);

  const currentListEmails = useMemo(() => {
    if (!currentList?.list) return [];

    // Handle both old format (strings) and new format (objects)
    return currentList.list.map((item) => {
      if (typeof item === 'object' && item !== null) {
        return item.email;
      }
      return item; // It's already a string
    });
  }, [currentList]);

  const handleAddContact = async (contactData) => {
    if (!currentList) return;

    // Check if adding this contact would exceed the limit
    const currentCount = currentList.list?.length || 0;
    if (currentCount >= contactLimit) {
      toast.error(
        `Cannot add contact. List limit of ${contactLimit.toLocaleString()} contacts reached.${
          user?.workspace_account ? ' (Google Workspace limit)' : ''
        }`
      );
      return;
    }

    try {
      // Pass the full contact object
      await addSubscriberToList(contactData, currentList.uuid);
      toast.success('Contact added to list');
    } catch (error) {
      toast.error('Failed to add contact');
      console.error('Add contact error:', error);
    }
  };

  const handleAddExistingContacts = async (contacts) => {
    if (!currentList) return;

    // Check if adding these contacts would exceed the limit
    const currentCount = currentList.list?.length || 0;
    const availableSlots = contactLimit - currentCount;

    if (availableSlots <= 0) {
      toast.error(
        `Cannot add contacts. List limit of ${contactLimit.toLocaleString()} contacts reached.${
          user?.workspace_account ? ' (Google Workspace limit)' : ''
        }`
      );
      return;
    }

    if (contacts.length > availableSlots) {
      toast.warning(
        `Can only add ${availableSlots} more contacts to stay within the ${contactLimit.toLocaleString()} contact limit. Please select fewer contacts.`
      );
      return;
    }

    try {
      // Pass the full contact objects to the context function
      const result = await addMultipleSubscribersToList(
        contacts, // Now passing full objects with email, first_name, last_name
        currentList.uuid
      );

      if (result.success) {
        if (result.added === 0 && result.duplicates > 0) {
          toast.info(
            `All ${result.duplicates} contacts were already in the list`
          );
        } else if (result.added > 0 && result.duplicates > 0) {
          toast.success(
            `Added ${result.added} contacts. ${result.duplicates} were already in the list.`
          );
        } else {
          toast.success(
            `Successfully added ${result.added} contacts to the list`
          );
        }
      } else {
        throw new Error('Failed to add contacts');
      }
    } catch (error) {
      toast.error('Failed to add contacts');
      console.error('Add existing contacts error:', error);
    }
  };

  const handleCsvUpload = async (contactsData) => {
    if (!currentList) return;

    // Check if adding these contacts would exceed the limit
    const currentCount = currentList.list?.length || 0;
    const availableSlots = contactLimit - currentCount;

    if (availableSlots <= 0) {
      toast.error(
        `Cannot import contacts. List limit of ${contactLimit.toLocaleString()} contacts reached.${
          user?.workspace_account ? ' (Google Workspace limit)' : ''
        }`
      );
      throw new Error('Contact limit reached');
    }

    try {
      // Pass the full contact objects (already includes email, first_name, last_name)
      const validContacts = contactsData.filter(
        (contact) => contact.email && contact.email.includes('@')
      );

      if (validContacts.length === 0) {
        toast.error('No valid email addresses found');
        return;
      }

      if (validContacts.length > availableSlots) {
        toast.warning(
          `Can only import ${availableSlots} more contacts to stay within the ${contactLimit.toLocaleString()} contact limit. Only the first ${availableSlots} contacts will be imported.`
        );
        // Trim the contacts to fit within the limit
        validContacts.splice(availableSlots);
      }

      const result = await addMultipleSubscribersToList(
        validContacts, // Pass full objects
        currentList.uuid
      );

      if (result.success) {
        if (result.added === 0 && result.duplicates > 0) {
          toast.info(
            `All ${result.duplicates} contacts were already in the list`
          );
        } else if (result.added > 0 && result.duplicates > 0) {
          toast.success(
            `Added ${result.added} new contacts. ${result.duplicates} duplicates were skipped.`
          );
        } else {
          toast.success(
            `Successfully added ${result.added} contacts to the list`
          );
        }
      } else {
        throw new Error('Bulk operation failed');
      }
    } catch (error) {
      toast.error('Failed to import contacts');
      console.error('CSV upload error:', error);
      throw error; // Re-throw to be caught by modal
    }
  };

  const handleRemoveContact = useCallback(
    async (contact) => {
      if (!currentList) return;

      try {
        // Pass the full contact object or just email based on your API
        await removeSubscriberFromList(contact, currentList.uuid);
        toast.success('Contact removed from list');
      } catch (error) {
        toast.error('Failed to remove contact');
        console.error('Remove contact error:', error);
      }
    },
    [currentList, removeSubscriberFromList]
  );

  const handleDeleteClick = useCallback((contact, event) => {
    event.stopPropagation();
    setContactToDelete(contact);
    setDeleteDialogOpen(true);
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Email',
        field: 'email',
        filter: 'agTextColumnFilter',
        sortable: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        flex: 2,
        cellClass: 'font-medium',
      },
      {
        headerName: 'First Name',
        field: 'first_name',
        sortable: true,
        filter: 'agTextColumnFilter',
        flex: 1,
        cellRenderer: (params) => params.value || '-',
      },
      {
        headerName: 'Last Name',
        field: 'last_name',
        sortable: true,
        filter: 'agTextColumnFilter',
        flex: 1,
        cellRenderer: (params) => params.value || '-',
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 120,
        cellRenderer: (params) => (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            {params.value || 'subscribed'}
          </span>
        ),
      },
      {
        headerName: 'Source',
        field: 'source',
        width: 130,
        cellRenderer: (params) => (
          <span className="text-sm text-gray-600">
            {params.value || 'Manual'}
          </span>
        ),
      },
      {
        headerName: 'Actions',
        width: 100,
        pinned: 'right',
        cellRenderer: (params) => (
          <button
            onClick={(e) => handleDeleteClick(params.data, e)}
            className="rounded-full bg-red-100 p-1 text-red-500 text-red-700 transition-colors"
            title="Remove from this list"
          >
            <Trash2 size={16} />
          </button>
        ),
      },
    ],
    [handleDeleteClick]
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
      rowHeight: 50,
      suppressRowClickSelection: true,
    }),
    []
  );

  const onSelectionChanged = useCallback((params) => {
    const selectedNodes = params.api.getSelectedNodes();
    setSelectedRows(selectedNodes.map((node) => node.data));
  }, []);

  if (loadingLists && !currentList) {
    return (
      <div className="p-6 text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-gray-500">Loading list details...</p>
      </div>
    );
  }

  if (!currentList && !loadingLists) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
        <h2 className="mb-2 text-xl font-semibold text-red-700">
          List Not Found
        </h2>
        <p className="mb-6 text-gray-600">
          The requested list could not be found or you do not have permission to
          view it.
        </p>
        <Link
          href="/dashboard/marketing/lists"
          className="inline-flex items-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors"
        >
          <ChevronLeft size={16} className="mr-2" />
          Back to Lists
        </Link>
      </div>
    );
  }

  return (
    <main className="h-full w-full space-y-4 overflow-y-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/marketing/lists"
          className="mb-3 inline-flex items-center text-sm text-blue-600 text-blue-800 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Email Lists
        </Link>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {currentList?.list_name}
          </h1>
          <p className="text-gray-600">
            {currentList?.list_description || 'No description provided.'}
          </p>

          {/* Contact limit info */}
          <div className="mt-3 flex items-center gap-4">
            <div
              className={`rounded-lg px-3 py-1 text-sm ${
                (listContacts?.length || 0) >= contactLimit * 0.9
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {listContacts?.length || 0} / {contactLimit.toLocaleString()}{' '}
              contacts
            </div>
            {user?.workspace_account && (
              <span className="text-xs text-gray-500">
                Google Workspace Limit
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center">
            <Users className="mr-3 h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Contacts
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {listContacts?.length || 0}
              </p>
              <p className="text-xs text-gray-500">
                Limit: {contactLimit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center">
            <Mail className="mr-3 h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">
                Available to Add
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.max(0, contactLimit - (listContacts?.length || 0))}
              </p>
              <p className="text-xs text-gray-500">Remaining slots</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-400">Campaign metrics</p>
              <p className="text-sm text-gray-400">coming soon...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions and Search */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="max-w-md flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                type="text"
                placeholder="Search contacts..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAddContactModalOpen(true)}
              disabled={(listContacts?.length || 0) >= contactLimit}
              className="inline-flex items-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              title={
                (listContacts?.length || 0) >= contactLimit
                  ? `Contact limit of ${contactLimit.toLocaleString()} reached`
                  : 'Add contacts to this list'
              }
            >
              <UserPlus size={16} className="mr-2" />
              Add Contacts
            </button>
            <button
              onClick={() => setIsCsvUploadModalOpen(true)}
              disabled={(listContacts?.length || 0) >= contactLimit}
              className="inline-flex items-center rounded-lg bg-green-600 bg-green-700 px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              title={
                (listContacts?.length || 0) >= contactLimit
                  ? `Contact limit of ${contactLimit.toLocaleString()} reached`
                  : 'Import contacts from CSV'
              }
            >
              <Upload size={16} className="mr-2" />
              Import CSV
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="flex-grow overflow-hidden rounded-lg border border-gray-200 bg-white">
        {listContacts?.length === 0 ? (
          <div className="p-8 text-center">
            <Users size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No contacts yet
            </h3>
            <p className="mb-6 text-gray-500">
              Start building your email list by adding contacts.
            </p>
            <button
              onClick={() => setIsAddContactModalOpen(true)}
              className="inline-flex items-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors"
            >
              <UserPlus size={16} className="mr-2" />
              Add Your First Contact
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Contacts ({filteredContacts?.length})
              </h2>
              {searchText && (
                <p className="text-sm text-gray-500">
                  Showing {filteredContacts?.length} of {listContacts?.length}{' '}
                  contacts
                </p>
              )}
            </div>
            <div
              className="ag-theme-alpine"
              style={{ height: 500, width: '100%' }}
            >
              <AgGridReact
                rowData={filteredContacts}
                columnDefs={columnDefs}
                gridOptions={gridOptions}
                theme={myTheme}
                modules={[
                  ClientSideRowModelModule,
                  ValidationModule,
                  RowSelectionModule,
                ]}
                rowSelection="multiple"
                defaultColDef={defaultColDef}
                animateRows={true}
                onSelectionChanged={onSelectionChanged}
                suppressRowClickSelection={true}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddContactModal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        onAddContact={handleAddContact}
        onAddExisting={handleAddExistingContacts}
        existingContacts={availableContacts}
        currentListEmails={currentList?.list || []}
        listName={currentList?.list_name || ''}
        contactLimit={contactLimit}
        currentCount={listContacts?.length || 0}
        isWorkspaceAccount={user?.workspace_account}
      />

      <CsvUploadModal
        isOpen={isCsvUploadModalOpen}
        onClose={() => setIsCsvUploadModalOpen(false)}
        onUpload={handleCsvUpload}
        listName={currentList?.list_name || ''}
        contactLimit={contactLimit}
        currentCount={listContacts?.length || 0}
        isWorkspaceAccount={user?.workspace_account}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Contact</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to remove "${contactToDelete?.email}" from this list? 
              The contact will remain in your subscriptions but won't receive emails sent to this list.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (contactToDelete) {
                  await handleRemoveContact(contactToDelete); // Pass full object
                  setDeleteDialogOpen(false);
                }
              }}
              className="bg-red-600 bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default ListDetailPage;
