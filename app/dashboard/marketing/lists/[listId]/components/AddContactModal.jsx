'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Users,
  Plus,
  X,
  Search,
  ChevronRight,
  ChevronLeft,
  MapPin,
  AlertTriangle,
} from 'lucide-react';

const AddContactModal = ({
  isOpen,
  onClose,
  onAddContact,
  onAddExisting,
  existingContacts,
  currentListEmails,
  listName,
  contactLimit,
  currentCount,
  isWorkspaceAccount,
}) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [step, setStep] = useState(1); // Step 1: Select contacts, Step 2: Map fields
  const [fieldMapping, setFieldMapping] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setFirstName('');
      setLastName('');
      setSearchTerm('');
      setSelectedEmails(new Set());
      setActiveTab('manual');
      setStep(1);
      setFieldMapping({
        email: '',
        first_name: '',
        last_name: '',
      });
    }
  }, [isOpen]);

  const availableContacts = useMemo(() => {
    if (!existingContacts || existingContacts.length === 0) return [];

    return existingContacts.filter((contact) => {
      // Filter out contacts already in the current list
      if (
        currentListEmails.some((item) => {
          if (typeof item === 'object' && item !== null) {
            return item.email === contact.email;
          }
          return item === contact.email;
        })
      )
        return false;

      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        // Search across all fields in the contact
        return Object.entries(contact).some(([key, value]) => {
          if (value && typeof value === 'string') {
            return value.toLowerCase().includes(searchLower);
          }
          return false;
        });
      }
      return true;
    });
  }, [existingContacts, currentListEmails, searchTerm]);

  // Get all unique fields from existing contacts
  const availableFields = useMemo(() => {
    if (!existingContacts || existingContacts.length === 0) return [];

    // Get all unique fields from all contacts
    const allFields = new Set();
    existingContacts.forEach((contact) => {
      Object.keys(contact).forEach((field) => allFields.add(field));
    });

    return Array.from(allFields).sort();
  }, [existingContacts]);

  // Set smart defaults for field mapping when available fields change
  useEffect(() => {
    if (availableFields.length > 0 && activeTab === 'existing' && step === 1) {
      const newMapping = {
        email: '',
        first_name: '',
        last_name: '',
      };

      // Try to find common email field names
      const emailFields = [
        'email',
        'Email',
        'Email Address',
        'email_address',
        'emailAddress',
      ];
      for (const field of emailFields) {
        if (availableFields.includes(field)) {
          newMapping.email = field;
          break;
        }
      }

      // Try to find common first name field names
      const firstNameFields = [
        'first_name',
        'firstName',
        'First Name',
        'Your Name',
        'Name',
        'name',
      ];
      for (const field of firstNameFields) {
        if (availableFields.includes(field)) {
          newMapping.first_name = field;
          break;
        }
      }

      // Try to find common last name field names
      const lastNameFields = [
        'last_name',
        'lastName',
        'Last Name',
        'Surname',
        'surname',
      ];
      for (const field of lastNameFields) {
        if (availableFields.includes(field)) {
          newMapping.last_name = field;
          break;
        }
      }

      setFieldMapping(newMapping);
    }
  }, [availableFields, activeTab, step]);

  // Calculate available slots
  const availableSlots = Math.max(0, contactLimit - currentCount);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    // Check contact limit
    if (availableSlots <= 0) {
      toast.error(
        `Cannot add contact. List limit of ${contactLimit.toLocaleString()} contacts reached.`
      );
      return;
    }

    const emailToAdd = email.trim().toLowerCase();

    // Check if email already exists in the list
    const emailExists = currentListEmails.some((item) => {
      if (typeof item === 'object' && item !== null) {
        return item.email.toLowerCase() === emailToAdd;
      }
      return item.toLowerCase() === emailToAdd;
    });

    if (emailExists) {
      toast.error('Email already exists in this list');
      return;
    }

    // Pass full contact object
    onAddContact({
      email: emailToAdd,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    });
    onClose();
  };

  const toggleEmailSelection = (email) => {
    setSelectedEmails((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(email)) {
        newSet.delete(email);
      } else {
        newSet.add(email);
      }
      return newSet;
    });
  };

  const handleProceedToMapping = () => {
    if (selectedEmails.size === 0) {
      toast.error('No contacts selected');
      return;
    }

    // Check contact limit
    if (selectedEmails.size > availableSlots) {
      toast.error(
        `Cannot add ${selectedEmails.size} contacts. Only ${availableSlots} slots available (limit: ${contactLimit.toLocaleString()}).`
      );
      return;
    }

    setStep(2);
  };

  const handleAddSelected = () => {
    if (selectedEmails.size === 0) {
      toast.error('No contacts selected');
      return;
    }

    if (!fieldMapping.email) {
      toast.error('Please select a field for email address');
      return;
    }

    // Check contact limit
    if (selectedEmails.size > availableSlots) {
      toast.error(
        `Cannot add ${selectedEmails.size} contacts. Only ${availableSlots} slots available.`
      );
      return;
    }

    // Map the selected contacts according to field mapping
    const mappedContacts = Array.from(selectedEmails)
      .map((email) => {
        const contact = existingContacts.find((c) => c.email === email);
        if (!contact) return null;

        return {
          email: contact[fieldMapping.email] || '',
          first_name:
            fieldMapping.first_name && fieldMapping.first_name !== ''
              ? contact[fieldMapping.first_name] || ''
              : '',
          last_name:
            fieldMapping.last_name && fieldMapping.last_name !== ''
              ? contact[fieldMapping.last_name] || ''
              : '',
        };
      })
      .filter((contact) => contact && contact.email); // Filter out null contacts and those without email

    if (mappedContacts.length === 0) {
      toast.error('No valid contacts to add after mapping');
      return;
    }

    onAddExisting(mappedContacts);
    onClose();
  };

  const selectAll = () => {
    const allEmails = new Set(availableContacts.map((c) => c.email));
    setSelectedEmails(allEmails);
  };

  const deselectAll = () => {
    setSelectedEmails(new Set());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add Contacts to <span className="text-blue-600">{listName}</span>
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {availableSlots} of {contactLimit.toLocaleString()} slots
              available
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contact limit warning */}
        {availableSlots <= 0 && (
          <div className="border-b border-orange-200 bg-orange-50 p-4">
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-orange-800">
                  Contact limit reached
                </p>
                <p className="text-xs text-orange-700">
                  This list has reached the maximum of{' '}
                  {contactLimit.toLocaleString()} contacts. Remove some contacts
                  to add new ones.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab('manual');
              setStep(1);
            }}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'manual'
                ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-600'
                : 'text-gray-500 text-gray-700'
            }`}
          >
            <Plus className="mr-2 inline-block h-4 w-4" />
            Add Manually
          </button>
          <button
            onClick={() => {
              setActiveTab('existing');
              setStep(1);
            }}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'existing'
                ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-600'
                : 'text-gray-500 text-gray-700'
            }`}
          >
            <Users className="mr-2 inline-block h-4 w-4" />
            From Subscriptions {step === 2 && '(Step 2: Map Fields)'}
          </button>
        </div>

        <div className="max-h-[calc(90vh-160px)] overflow-y-auto p-6">
          {activeTab === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              {/* Contact limit info for manual tab */}
              {availableSlots <= 10 && availableSlots > 0 && (
                <div className="rounded-lg bg-yellow-50 p-3">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Only {availableSlots} contact slots remaining
                  </p>
                </div>
              )}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@example.com"
                  required
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Optional"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Optional"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={availableSlots <= 0}
                  className="rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add Contact
                </button>
              </div>
            </form>
          )}

          {activeTab === 'existing' && step === 1 && (
            <div className="space-y-4">
              {/* Contact limit info for existing tab */}
              {availableSlots <= 10 && availableSlots > 0 && (
                <div className="rounded-lg bg-yellow-50 p-3">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Only {availableSlots} contact slots remaining
                  </p>
                </div>
              )}

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search existing contacts..."
                  className="w-full pl-10"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {selectedEmails.size} of {availableContacts.length} contacts
                  selected
                  {selectedEmails.size > availableSlots && (
                    <span className="ml-2 text-red-600">
                      (Exceeds limit by {selectedEmails.size - availableSlots})
                    </span>
                  )}
                </p>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      const limitedEmails = new Set(
                        availableContacts
                          .slice(0, availableSlots)
                          .map((c) => c.email)
                      );
                      setSelectedEmails(limitedEmails);
                    }}
                    disabled={availableSlots <= 0}
                    className="text-sm text-blue-600 text-blue-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Select Max ({availableSlots})
                  </button>
                  <span className="text-gray-400">|</span>
                  <button
                    type="button"
                    onClick={deselectAll}
                    className="text-sm text-blue-600 text-blue-800 transition-colors"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-200">
                {availableContacts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <Users className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-sm">
                      {searchTerm
                        ? 'No contacts found matching your search'
                        : 'No available contacts to add'}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {availableContacts.map((contact, index) => {
                      // Display the contact with available info
                      const displayName =
                        contact.first_name ||
                        contact.last_name ||
                        contact['Your Name'] ||
                        contact.Name ||
                        contact.name ||
                        '';
                      const displayEmail =
                        contact.email ||
                        contact['Email Address'] ||
                        contact.email_address ||
                        '';

                      return (
                        <label
                          key={`${contact.email}-${index}`}
                          className={`flex cursor-pointer items-center bg-gray-50 p-4 transition-colors ${
                            selectedEmails.has(contact.email)
                              ? 'bg-blue-50'
                              : ''
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedEmails.has(contact.email)}
                            onChange={() => toggleEmailSelection(contact.email)}
                            className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {displayEmail}
                            </p>
                            {displayName && (
                              <p className="text-xs text-gray-500">
                                {displayName}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">
                            {contact.source || 'Unknown'}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleProceedToMapping}
                  disabled={
                    selectedEmails.size === 0 ||
                    selectedEmails.size > availableSlots
                  }
                  className="inline-flex items-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next: Map Fields
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'existing' && step === 2 && (
            <div className="space-y-4">
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start">
                  <MapPin className="mr-2 mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Field Mapping
                    </p>
                    <p className="mt-1 text-xs text-blue-700">
                      Map the fields from your subscriptions to the email list
                      fields. This allows you to control how contact data is
                      imported.
                    </p>
                    {availableFields.length > 0 && (
                      <p className="mt-2 text-xs text-blue-600">
                        Available fields:{' '}
                        {availableFields.slice(0, 5).join(', ')}
                        {availableFields.length > 5 &&
                          `, and ${availableFields.length - 5} more`}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <select
                    value={fieldMapping.email}
                    onChange={(e) =>
                      setFieldMapping((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select field for email</option>
                    {availableFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <select
                    value={fieldMapping.first_name}
                    onChange={(e) =>
                      setFieldMapping((prev) => ({
                        ...prev,
                        first_name: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Don't import</option>
                    {availableFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <select
                    value={fieldMapping.last_name}
                    onChange={(e) =>
                      setFieldMapping((prev) => ({
                        ...prev,
                        last_name: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Don't import</option>
                    {availableFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Preview
                </h4>
                <p className="text-xs text-gray-600">
                  Sample of how your contacts will be imported:
                </p>
                {fieldMapping.email &&
                  Array.from(selectedEmails)
                    .slice(0, 2)
                    .map((email, idx) => {
                      const contact = existingContacts.find(
                        (c) => c.email === email
                      );
                      if (!contact) return null;

                      return (
                        <div
                          key={idx}
                          className="mt-2 rounded border border-gray-200 bg-white p-2 text-xs"
                        >
                          <span className="font-medium">Email:</span>{' '}
                          {contact[fieldMapping.email] || '-'}
                          {fieldMapping.first_name && (
                            <>
                              , <span className="font-medium">First:</span>{' '}
                              {contact[fieldMapping.first_name] || '-'}
                            </>
                          )}
                          {fieldMapping.last_name && (
                            <>
                              , <span className="font-medium">Last:</span>{' '}
                              {contact[fieldMapping.last_name] || '-'}
                            </>
                          )}
                        </div>
                      );
                    })}
                {!fieldMapping.email && (
                  <p className="mt-2 text-xs text-amber-600">
                    Please select a field for email address to see preview
                  </p>
                )}
                {fieldMapping.email && selectedEmails.size > 2 && (
                  <p className="mt-2 text-xs text-gray-500">
                    ...and {selectedEmails.size - 2} more contacts
                  </p>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 transition-colors"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleAddSelected}
                  disabled={!fieldMapping.email}
                  className="rounded-lg bg-green-600 bg-green-700 px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add {selectedEmails.size} Contacts
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
