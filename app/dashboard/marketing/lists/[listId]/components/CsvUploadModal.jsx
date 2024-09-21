'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { X, FileSpreadsheet, AlertTriangle } from 'lucide-react';

const CsvUploadModal = ({
  isOpen,
  onClose,
  onUpload,
  listName,
  contactLimit,
  currentCount,
  isWorkspaceAccount,
}) => {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [mapping, setMapping] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState([]);

  // Calculate available slots
  const availableSlots = Math.max(0, contactLimit - currentCount);

  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setStep(1);
      setMapping({ email: '', first_name: '', last_name: '' });
      setCsvHeaders([]);
      setParsedData([]);
      setIsUploading(false);
    }
  }, [isOpen]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);

      try {
        // Read and parse CSV file
        const text = await selectedFile.text();
        const lines = text.split('\n').filter((line) => line.trim());

        if (lines.length === 0) {
          toast.error('CSV file is empty');
          return;
        }

        // Get headers from first line
        const headers = lines[0]
          .split(',')
          .map((h) => h.trim().replace(/"/g, ''));
        setCsvHeaders(headers);

        // Parse data
        const data = lines.slice(1).map((line) => {
          const values = line.split(',').map((v) => v.trim().replace(/"/g, ''));
          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          return row;
        });

        setParsedData(data);

        // Set smart defaults for mapping
        const newMapping = { email: '', first_name: '', last_name: '' };

        // Try to find email field
        const emailFields = [
          'email',
          'Email',
          'Email Address',
          'email_address',
          'emailAddress',
        ];
        for (const field of emailFields) {
          if (headers.includes(field)) {
            newMapping.email = field;
            break;
          }
        }

        // Try to find first name field
        const firstNameFields = [
          'first_name',
          'firstName',
          'First Name',
          'Your Name',
          'Name',
          'name',
        ];
        for (const field of firstNameFields) {
          if (headers.includes(field)) {
            newMapping.first_name = field;
            break;
          }
        }

        // Try to find last name field
        const lastNameFields = [
          'last_name',
          'lastName',
          'Last Name',
          'Surname',
          'surname',
        ];
        for (const field of lastNameFields) {
          if (headers.includes(field)) {
            newMapping.last_name = field;
            break;
          }
        }

        setMapping(newMapping);
        toast.success(`Parsed ${data.length} rows from CSV`);
      } catch (error) {
        toast.error('Error parsing CSV file');
        setFile(null);
        setCsvHeaders([]);
        setParsedData([]);
      }
    } else {
      toast.error('Please select a valid CSV file');
      setFile(null);
      setCsvHeaders([]);
      setParsedData([]);
    }
  };

  const handleUpload = async () => {
    if (!file || !mapping.email || parsedData.length === 0) {
      toast.error('File, email mapping, and valid data are required');
      return;
    }

    // Check contact limit
    if (availableSlots <= 0) {
      toast.error(
        `Cannot import contacts. List limit of ${contactLimit.toLocaleString()} contacts reached.`
      );
      return;
    }

    setIsUploading(true);
    try {
      const contactsToAdd = parsedData
        .map((row) => ({
          email: row[mapping.email]?.toLowerCase()?.trim(),
          first_name: mapping.first_name ? row[mapping.first_name]?.trim() : '',
          last_name: mapping.last_name ? row[mapping.last_name]?.trim() : '',
        }))
        .filter((contact) => contact.email && contact.email.includes('@'));

      if (contactsToAdd.length === 0) {
        toast.error('No valid email addresses found in CSV');
        return;
      }

      // Warn if exceeding limit and trim if necessary
      if (contactsToAdd.length > availableSlots) {
        toast.warning(
          `Can only import ${availableSlots} more contacts to stay within the ${contactLimit.toLocaleString()} contact limit. Only the first ${availableSlots} contacts will be imported.`
        );
        contactsToAdd.splice(availableSlots);
      }

      await onUpload(contactsToAdd);
      onClose();
    } catch (error) {
      toast.error('Failed to import contacts');
      console.error('CSV import error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Import CSV to <span className="text-blue-600">{listName}</span>
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

        <div className="p-6">
          {/* Contact limit warning */}
          {availableSlots <= 0 && (
            <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    Contact limit reached
                  </p>
                  <p className="text-xs text-orange-700">
                    This list has reached the maximum of{' '}
                    {contactLimit.toLocaleString()} contacts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-blue-400 border-gray-300 p-6 text-center transition-colors">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <FileSpreadsheet className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                  <p className="text-sm font-medium text-gray-600">
                    {file ? file.name : 'Click to upload CSV file'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">CSV files only</p>
                </label>
              </div>

              {parsedData.length > 0 && (
                <div className="space-y-2 text-center text-sm">
                  <div className="text-green-600">
                    ✓ Found {parsedData.length} rows in CSV
                  </div>
                  {parsedData.length > availableSlots && (
                    <div className="text-orange-600">
                      ⚠️ Only {availableSlots} contacts can be imported due to
                      list limit
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={
                    !file || csvHeaders.length === 0 || availableSlots <= 0
                  }
                  className="rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next: Map Fields
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Contact limit warning for step 2 */}
              {parsedData.length > availableSlots && availableSlots > 0 && (
                <div className="rounded-lg bg-yellow-50 p-3">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Your CSV contains {parsedData.length} contacts, but only{' '}
                    {availableSlots} can be imported due to the list limit.
                  </p>
                </div>
              )}

              <p className="mb-4 text-sm text-gray-600">
                Map your CSV columns to contact fields. Email is required.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <select
                    value={mapping.email}
                    onChange={(e) =>
                      setMapping((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select CSV Column</option>
                    {csvHeaders.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <select
                    value={mapping.first_name}
                    onChange={(e) =>
                      setMapping((prev) => ({
                        ...prev,
                        first_name: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select CSV Column (Optional)</option>
                    {csvHeaders.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <select
                    value={mapping.last_name}
                    onChange={(e) =>
                      setMapping((prev) => ({
                        ...prev,
                        last_name: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select CSV Column (Optional)</option>
                    {csvHeaders.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preview section */}
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Preview
                </h4>
                <p className="mb-2 text-xs text-gray-600">
                  Sample of how your contacts will be imported:
                </p>
                {mapping.email &&
                  parsedData.slice(0, 2).map((row, idx) => (
                    <div
                      key={idx}
                      className="mt-2 rounded border border-gray-200 bg-white p-2 text-xs"
                    >
                      <span className="font-medium">Email:</span>{' '}
                      {row[mapping.email] || '-'}
                      {mapping.first_name && (
                        <>
                          , <span className="font-medium">First:</span>{' '}
                          {row[mapping.first_name] || '-'}
                        </>
                      )}
                      {mapping.last_name && (
                        <>
                          , <span className="font-medium">Last:</span>{' '}
                          {row[mapping.last_name] || '-'}
                        </>
                      )}
                    </div>
                  ))}
                {!mapping.email && (
                  <p className="text-xs text-amber-600">
                    Please select a field for email address to see preview
                  </p>
                )}
                {mapping.email && parsedData.length > 2 && (
                  <p className="mt-2 text-xs text-gray-500">
                    ...and {parsedData.length - 2} more contacts
                  </p>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleUpload}
                  disabled={
                    !mapping.email || isUploading || availableSlots <= 0
                  }
                  className="rounded-lg bg-green-600 bg-green-700 px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploading
                    ? 'Importing...'
                    : `Import ${Math.min(parsedData.length, availableSlots)} Contacts`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CsvUploadModal;
