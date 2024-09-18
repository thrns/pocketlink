'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import Papa from 'papaparse';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'sonner';
import { Upload, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { useAudience } from '@/app/contexts/AudienceContext';

export default function ImportSubscribersModal() {
  const { subscriptions, setSubscriptions } = useAudience();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [columnMappings, setColumnMappings] = useState({});
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStats, setImportStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
  });

  // Get form fields for selected subscription
  const selectedSubscriptionData = useMemo(() => {
    return subscriptions.find((sub) => sub.uuid === selectedSubscription);
  }, [selectedSubscription, subscriptions]);

  const formFields = useMemo(() => {
    if (!selectedSubscriptionData?.form_fields) return [];

    return Object.entries(selectedSubscriptionData.form_fields).map(
      ([id, field]) => ({
        id,
        ...field,
      })
    );
  }, [selectedSubscriptionData]);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);

      // Parse CSV to get headers
      Papa.parse(file, {
        preview: 1,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            setCsvHeaders(results.data[0]);

            // Auto-map columns based on similar names
            const autoMappings = {};
            formFields.forEach((field) => {
              const matchingHeader = results.data[0].find(
                (header) =>
                  header.toLowerCase().includes(field.label.toLowerCase()) ||
                  field.label.toLowerCase().includes(header.toLowerCase())
              );
              if (matchingHeader) {
                autoMappings[field.id] = matchingHeader;
              }
            });
            setColumnMappings(autoMappings);
          }
        },
      });

      // Parse full CSV
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCsvData(results.data);
        },
      });
    } else {
      toast.error('Please upload a valid CSV file');
    }
  };

  // Handle import
  const handleImport = async () => {
    if (!csvData || !selectedSubscriptionData) return;

    setImporting(true);
    setCurrentStep(4); // Move to progress step

    const stats = { total: csvData.length, success: 0, failed: 0 };
    setImportStats(stats);

    try {
      // Get current subscribed data
      const currentSubscribed = selectedSubscriptionData.subscribed || {};
      const updatedSubscribed = { ...currentSubscribed };

      // Process each row
      for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];
        const subscriberData = {
          source: 'import',
          imported_at: new Date().toISOString(),
        };

        // Map CSV columns to form fields
        let hasRequiredFields = true;
        for (const [fieldId, field] of Object.entries(
          selectedSubscriptionData.form_fields
        )) {
          const csvColumn = columnMappings[fieldId];
          if (csvColumn && row[csvColumn]) {
            subscriberData[fieldId] = row[csvColumn];
          } else if (field.required) {
            hasRequiredFields = false;
            break;
          }
        }

        if (
          hasRequiredFields &&
          subscriberData[
            Object.keys(subscriberData).find(
              (key) =>
                selectedSubscriptionData.form_fields[key]?.type === 'email'
            )
          ]
        ) {
          // Use email as the key for the subscriber
          const emailFieldId = Object.keys(subscriberData).find(
            (key) => selectedSubscriptionData.form_fields[key]?.type === 'email'
          );
          const email = subscriberData[emailFieldId];

          updatedSubscribed[email] = subscriberData;
          stats.success++;
        } else {
          stats.failed++;
        }

        // Update progress
        setImportProgress(((i + 1) / csvData.length) * 100);
        setImportStats({ ...stats });
      }

      // Update subscription in database
      const { error } = await supabase
        .from('subscriptions')
        .update({
          subscribed: updatedSubscribed,
          updated_at: new Date().toISOString(),
        })
        .eq('uuid', selectedSubscription);

      if (error) {
        throw error;
      }

      // Update local state
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.uuid === selectedSubscription
            ? { ...sub, subscribed: updatedSubscribed }
            : sub
        )
      );

      toast.success(`Successfully imported ${stats.success} subscribers`);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import subscribers');
    } finally {
      setImporting(false);
    }
  };

  // Step navigation
  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return !!selectedSubscription;
      case 2:
        return !!csvFile && csvData && csvData.length > 0;
      case 3:
        // Check if all required fields are mapped
        const requiredFields = formFields.filter((f) => f.required);
        return requiredFields.every((field) => !!columnMappings[field.id]);
      default:
        return false;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled variant="outline" onClick={() => setCurrentStep(1)}>
          Import Subscribers
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Subscribers</DialogTitle>
          <DialogDescription>
            Import subscribers from a CSV file in 3 easy steps
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="mb-6 flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > step ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step
                )}
              </div>
              {step < 3 && (
                <div
                  className={`mx-2 h-1 w-24 ${
                    currentStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-4">
          {/* Step 1: Select Subscription */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="subscription">Select Subscription</Label>
                <Select
                  value={selectedSubscription}
                  onValueChange={setSelectedSubscription}
                >
                  <SelectTrigger id="subscription" className="mt-2">
                    <SelectValue placeholder="Choose a subscription" />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptions.map((sub) => (
                      <SelectItem key={sub.uuid} value={sub.uuid}>
                        {sub.subscription_name || 'Untitled'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSubscriptionData && (
                <Card className="p-4">
                  <h4 className="mb-2 font-medium">Subscription Details</h4>
                  <p className="mb-2 text-sm text-gray-600">
                    {selectedSubscriptionData.subscription_description ||
                      'No description'}
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>Form fields: {formFields.length}</p>
                    <p>
                      Current subscribers:{' '}
                      {
                        Object.keys(selectedSubscriptionData.subscribed || {})
                          .length
                      }
                    </p>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Step 2: Upload CSV */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="csv-upload">Upload CSV File</Label>
                <div className="mt-2">
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="file:bg-primary file:text-primary-foreground file:bg-primary/90 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
                  />
                </div>
              </div>

              {csvFile && (
                <Alert>
                  <FileSpreadsheet className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <p className="font-medium">{csvFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {csvData
                          ? `${csvData.length} rows found`
                          : 'Processing...'}
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {csvHeaders.length > 0 && (
                <Card className="p-4">
                  <h4 className="mb-2 font-medium">CSV Headers Detected</h4>
                  <div className="flex flex-wrap gap-2">
                    {csvHeaders.map((header, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-gray-100 px-2 py-1 text-sm"
                      >
                        {header}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Step 3: Map Columns */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="mb-4 font-medium">
                  Map CSV Columns to Form Fields
                </h4>
                <div className="space-y-3">
                  {formFields.map((field) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-2 items-center gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                      </div>
                      <Select
                        value={columnMappings[field.id] || ''}
                        onValueChange={(value) =>
                          setColumnMappings({
                            ...columnMappings,
                            [field.id]: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select CSV column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {csvHeaders.map((header) => (
                            <SelectItem key={header} value={header}>
                              {header}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  Required fields must be mapped to proceed with the import.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Step 4: Import Progress */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-4 text-center">
                <Upload className="mx-auto h-12 w-12 animate-pulse text-gray-400" />
                <div>
                  <h4 className="mb-2 font-medium">
                    {importing
                      ? 'Importing subscribers...'
                      : 'Import Complete!'}
                  </h4>
                  <Progress value={importProgress} className="mb-4" />
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Total rows: {importStats.total}</p>
                    <p className="text-green-600">
                      Successfully imported: {importStats.success}
                    </p>
                    {importStats.failed > 0 && (
                      <p className="text-red-600">
                        Failed: {importStats.failed}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {currentStep < 4 && (
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Cancel</Button>
              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNext()}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleImport} disabled={!canProceedToNext()}>
                  Import
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
