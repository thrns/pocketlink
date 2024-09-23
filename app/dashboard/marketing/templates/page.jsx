'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  useCampaigns, // Re-using for templates as they are managed here
} from '@/app/contexts/CampaignContext';
import { myTheme } from '@/lib/utils/TableThemes';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  DateFilterModule,
  RowSelectionModule,
  CellStyleModule,
  TextFilterModule,
} from 'ag-grid-community';
import {
  FileText as TemplateIcon,
  Edit3 as EditIcon,
  Trash2,
  PlusCircle,
  Eye,
  MoreVertical,
  AlertTriangle,
  Braces, // For code content
  Search,
  Calendar,
  Copy,
  Hash,
  File,
} from 'lucide-react';
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
]);

// Modal for Creating/Editing Email Template
const TemplateDetailsModal = ({ isOpen, onClose, onSave, template }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (template) {
      setName(template.name || '');
      setContent(template.content || '');
    } else {
      setName('');
      setContent('');
    }
  }, [template, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Template name is required.');
      return;
    }
    if (!content.trim()) {
      alert('Template content cannot be empty.');
      return;
    }
    onSave(template ? template.uuid : null, { name, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <h3 className="mb-6 text-xl font-semibold">
          {template ? 'Edit Email Template' : 'Create New Email Template'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="templateName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Template Name*
            </label>
            <input
              id="templateName"
              type="text"
              placeholder="E.g., Welcome Email, Monthly Digest"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="templateContent"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Template Content* (HTML/Text)
            </label>
            <p className="mb-1 text-xs text-gray-500">
              {
                'Use placeholders like `{{firstName}}`, `{{lastName}}`, `{{email}}`.'
              }
            </p>
            <textarea
              id="templateContent"
              placeholder="Enter your email content here... e.g., <h1>Hello {{firstName}}!</h1>"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12} // Increased rows for better editing experience
              className="w-full rounded-md border p-2 font-mono text-sm" // Monospace for code-like content
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border bg-gray-100 px-4 py-2 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center rounded-lg bg-bento-violet px-4 py-2 text-white"
            >
              <PlusCircle size={16} className="mr-2" />
              {template ? 'Save Changes' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TemplatesPage = () => {
  const {
    emailTemplates,
    loadingTemplates,
    errorTemplates,
    createEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
    campaigns, // To check if a template is in use
  } = useCampaigns();

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [gridApi, setGridApi] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setEditingTemplate(null);
    setIsDetailsModalOpen(true);
  };

  const handleOpenEditModal = useCallback((template, event) => {
    event?.stopPropagation();
    setEditingTemplate(template);
    setIsDetailsModalOpen(true);
  }, []);

  const handleSaveTemplate = async (templateId, data) => {
    try {
      if (templateId) {
        await updateEmailTemplate(templateId, data);
        toast.success('Template updated successfully');
      } else {
        await createEmailTemplate(data);
        toast.success('Template created successfully');
      }
    } catch (error) {
      toast.error('Failed to save template');
    }
  };

  const handleDeleteClick = useCallback((template, event) => {
    event?.stopPropagation();
    setTemplateToDelete(template);
    setDeleteDialogOpen(true);
  }, []);

  const handleCopyContent = useCallback(async (template, event) => {
    event?.stopPropagation();
    try {
      await navigator.clipboard.writeText(template.content);
      toast.success('Template content copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy content');
    }
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

  // Check if template is in use
  const isTemplateInUse = useCallback(
    (templateId) => {
      return campaigns.some((campaign) => campaign.template_id === templateId);
    },
    [campaigns]
  );

  // Get usage count for template
  const getTemplateUsageCount = useCallback(
    (templateId) => {
      return campaigns.filter((campaign) => campaign.template_id === templateId)
        .length;
    },
    [campaigns]
  );

  // Filter templates based on search text
  const filteredTemplates = useMemo(() => {
    if (!emailTemplates) return [];

    if (!searchText.trim()) {
      return emailTemplates;
    }

    const searchLower = searchText.toLowerCase().trim();
    return emailTemplates.filter((template) => {
      const name = template.name || 'Untitled Template';
      const content = template.content || '';

      return (
        name.toLowerCase().includes(searchLower) ||
        content.toLowerCase().includes(searchLower)
      );
    });
  }, [emailTemplates, searchText]);

  // Handle selection changes
  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      setSelectedRows(selectedNodes.map((node) => node.data));
    }
  }, [gridApi]);

  // Check if any selected templates are in use
  const hasSelectedTemplatesInUse = useMemo(() => {
    return selectedRows.some((template) => isTemplateInUse(template.uuid));
  }, [selectedRows, isTemplateInUse]);

  // Get deletable templates from selection
  const deletableTemplates = useMemo(() => {
    return selectedRows.filter((template) => !isTemplateInUse(template.uuid));
  }, [selectedRows, isTemplateInUse]);

  // Handle bulk delete
  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      // Delete only templates that are not in use
      const deletePromises = deletableTemplates.map((template) =>
        deleteEmailTemplate(template.uuid)
      );

      await Promise.all(deletePromises);

      const deletedCount = deletableTemplates.length;
      const skippedCount = selectedRows.length - deletedCount;

      if (skippedCount > 0) {
        toast.success(
          `Deleted ${deletedCount} templates. ${skippedCount} templates were in use and skipped.`
        );
      } else {
        toast.success(`Successfully deleted ${deletedCount} templates`);
      }

      // Clear selection
      if (gridApi) {
        gridApi.deselectAll();
      }
      setSelectedRows([]);
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete some templates');
    } finally {
      setIsDeleting(false);
    }
  };

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
        cellRenderer: (params) => {
          // Disable checkbox if template is in use
          const inUse = isTemplateInUse(params.data.uuid);
          if (inUse) {
            return '<input type="checkbox" disabled style="cursor: not-allowed; opacity: 0.5;" title="Template is in use" />';
          }
          return undefined; // Let AG-Grid handle the checkbox
        },
      },
      {
        headerName: 'Template',
        field: 'name',
        flex: 2,
        minWidth: 200,
        cellRenderer: (params) => {
          const template = params.data;
          const usageCount = getTemplateUsageCount(template.uuid);
          return (
            <div className="flex items-center py-2">
              <TemplateIcon className="mr-3 h-5 w-5 flex-shrink-0 text-teal-600" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-gray-900">
                  {template.name || 'Untitled Template'}
                </div>
                <div className="truncate text-sm text-gray-500">
                  {template.content
                    ? `${template.content.substring(0, 80)}...`
                    : 'No content'}
                </div>
                {usageCount > 0 && (
                  <div className="mt-1 flex items-center">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Used in {usageCount} campaign{usageCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        },
      },
      {
        headerName: 'Content Length',
        field: 'content',
        width: 140,
        cellRenderer: (params) => {
          const length = params.value?.length || 0;
          return (
            <div className="py-2 text-center">
              <span className="font-medium text-gray-900">
                {length.toLocaleString()}
              </span>
              <div className="text-xs text-gray-500">characters</div>
            </div>
          );
        },
      },
      {
        headerName: 'Updated',
        field: 'updated_at',
        width: 150,
        cellRenderer: (params) => (
          <div className="py-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              Updated
            </div>
            <div className="text-xs">{formatDate(params.value)}</div>
          </div>
        ),
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 160,
        pinned: 'right',
        cellRenderer: (params) => {
          const template = params.data;
          const inUse = isTemplateInUse(template.uuid);

          return (
            <div className="flex items-center justify-center gap-1 py-2">
              <button
                onClick={(e) => handleCopyContent(template, e)}
                className="rounded-md bg-gray-50 p-1.5 text-gray-600 transition-colors"
                title="Copy content"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={(e) => handleOpenEditModal(template, e)}
                className="rounded-md bg-blue-50 p-1.5 text-blue-600 transition-colors"
                title="Edit template"
              >
                <EditIcon size={16} />
              </button>
              <button
                onClick={(e) => handleDeleteClick(template, e)}
                className={`rounded-md p-1.5 transition-colors ${
                  inUse
                    ? 'cursor-not-allowed text-gray-400'
                    : 'bg-red-50 text-red-600'
                }`}
                title={inUse ? 'Template is in use' : 'Delete template'}
                disabled={inUse}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        },
      },
    ],
    [
      getTemplateUsageCount,
      isTemplateInUse,
      handleOpenEditModal,
      handleDeleteClick,
      handleCopyContent,
    ]
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  const onRowClicked = (event) => {
    // Don't open edit modal if clicking on checkbox or action buttons
    if (
      event.event.target.type === 'checkbox' ||
      event.event.target.closest('button')
    ) {
      return;
    }
    const template = event.data;
    handleOpenEditModal(template, event);
  };

  // Check if row is selectable (not in use)
  const isRowSelectable = useCallback(
    (node) => {
      return !isTemplateInUse(node.data.uuid);
    },
    [isTemplateInUse]
  );

  return (
    <PremiumGate
      featureKey={FEATURES.EMAIL_MARKETING}
      featureName="Email Marketing Templates"
      description="Design and save reusable email templates to streamline your marketing campaigns."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6">
          <div className="pointer-events-none flex h-full w-full flex-col opacity-60">
            <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <h1 className="text-2xl font-semibold text-gray-800">
                Email Templates
              </h1>
              <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white">
                Create Template
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Welcome Email',
                  type: 'Onboarding',
                  updated: '2 days ago',
                },
                {
                  name: 'Product Launch',
                  type: 'Announcement',
                  updated: '1 week ago',
                },
                { name: 'Newsletter', type: 'Weekly', updated: '3 days ago' },
                {
                  name: 'Sales Promotion',
                  type: 'Marketing',
                  updated: '5 days ago',
                },
                {
                  name: 'Event Invitation',
                  type: 'Event',
                  updated: '1 day ago',
                },
                { name: 'Thank You', type: 'Follow-up', updated: '4 days ago' },
              ].map((template, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 h-24 rounded bg-gradient-to-br from-gray-100 to-gray-200"></div>
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500">
                    {template.type} • Updated {template.updated}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      Edit
                    </button>
                    <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="flex h-full flex-col p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-start justify-start gap-4 sm:items-center">
            <div className="rounded-xl bg-bento-violet p-3">
              <File className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Email Templates
              </h1>
              <p className="text-gray-600">
                Build and Manage your email templates.
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center rounded-lg bg-black px-4 py-2 font-medium text-white"
            >
              <PlusCircle size={18} className="mr-2" /> Create Template
            </button>
          </div>
        </div>

        {loadingTemplates && (
          <p className="py-8 text-center text-gray-500">Loading templates...</p>
        )}
        {errorTemplates && (
          <p className="py-8 text-center text-red-500">
            Error: {errorTemplates}
          </p>
        )}

        {!loadingTemplates &&
          !errorTemplates &&
          emailTemplates?.length === 0 && (
            <div className="flex flex-grow flex-col items-center justify-center rounded-lg bg-white py-12 text-center">
              <TemplateIcon size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-xl font-medium text-gray-700">
                No Email Templates Created Yet
              </h3>
              <p className="mb-6 max-w-md text-sm text-gray-500">
                Create reusable email templates for your campaigns. You can use
                HTML or plain text.
              </p>
              <button
                onClick={handleOpenCreateModal}
                className="flex items-center rounded-lg bg-black px-5 py-2.5 font-medium text-white shadow-sm"
              >
                <PlusCircle size={18} className="mr-2" /> Create Your First
                Template
              </button>
            </div>
          )}

        {!loadingTemplates && !errorTemplates && emailTemplates?.length > 0 && (
          <div className="flex w-full flex-grow flex-col gap-2">
            <div className="flex flex-col gap-3 rounded-lg border bg-white p-4">
              {/* Search and bulk actions */}
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="w-full sm:w-2/3 lg:w-1/2">
                  <Input
                    type="text"
                    placeholder={`Search ${emailTemplates?.length || 0} templates... (Name, Content)`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:ring-teal-500"
                  />
                  {searchText.trim() && (
                    <p className="mt-1 text-sm text-gray-600">
                      Showing {filteredTemplates?.length || 0} of{' '}
                      {emailTemplates?.length || 0} templates
                    </p>
                  )}
                </div>

                {/* Bulk delete button */}
                {selectedRows.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {selectedRows.length} selected
                    </span>
                    <button
                      onClick={() => setBulkDeleteDialogOpen(true)}
                      className="flex items-center rounded-lg bg-red-600 bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
                      disabled={deletableTemplates.length === 0}
                    >
                      <Trash2 size={16} className="mr-1.5" />
                      Delete Selected
                      {hasSelectedTemplatesInUse && (
                        <span className="ml-1">
                          ({deletableTemplates.length})
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AG-Grid Table */}
            <div className="flex-grow overflow-hidden rounded-lg border border-gray-200 bg-white">
              {filteredTemplates.length === 0 && searchText.trim() ? (
                <div className="py-10 text-center">
                  <Search size={32} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600">
                    No templates found matching "{searchText}"
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your search terms to see all{' '}
                    {emailTemplates?.length || 0} templates.
                  </p>
                </div>
              ) : (
                <div className="ag-theme-alpine h-full min-h-[70vh]">
                  <AgGridReact
                    rowData={filteredTemplates}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    onRowClicked={onRowClicked}
                    onSelectionChanged={onSelectionChanged}
                    rowHeight={80}
                    headerHeight={50}
                    defaultColDef={defaultColDef}
                    theme={myTheme}
                    modules={[
                      ClientSideRowModelModule,
                      ValidationModule,
                      RowSelectionModule,
                      TextFilterModule,
                    ]}
                    rowSelection="multiple"
                    isRowSelectable={isRowSelectable}
                    animateRows={true}
                    className="h-full w-full"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Template Details Modal */}
        <TemplateDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onSave={handleSaveTemplate}
          template={editingTemplate}
        />

        {/* Single Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Template</AlertDialogTitle>
              <AlertDialogDescription>
                {`Are you sure you want to delete "${
                  templateToDelete?.name || 'this template'
                }"? This action cannot be undone.`}
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
                    await deleteEmailTemplate(templateToDelete.uuid);
                    toast.success(
                      `Template "${templateToDelete?.name || ''}" deleted successfully`
                    );
                    setDeleteDialogOpen(false);
                  } catch (error) {
                    toast.error('Failed to delete template');
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
              <AlertDialogTitle>Delete Multiple Templates</AlertDialogTitle>
              <AlertDialogDescription>
                {hasSelectedTemplatesInUse ? (
                  <>
                    <p className="mb-2">
                      You have selected {selectedRows.length} templates.{' '}
                      {selectedRows.length - deletableTemplates.length} of them
                      are in use and cannot be deleted.
                    </p>
                    <p>
                      Are you sure you want to delete the remaining{' '}
                      {deletableTemplates.length} templates? This action cannot
                      be undone.
                    </p>
                  </>
                ) : (
                  `Are you sure you want to delete ${selectedRows.length} templates? This action cannot be undone.`
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleBulkDelete}
                disabled={isDeleting || deletableTemplates.length === 0}
                className="bg-red-600 bg-red-700 focus:ring-red-600"
              >
                {isDeleting
                  ? 'Deleting...'
                  : `Delete ${deletableTemplates.length} Template${deletableTemplates.length !== 1 ? 's' : ''}`}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PremiumGate>
  );
};

export default TemplatesPage;
