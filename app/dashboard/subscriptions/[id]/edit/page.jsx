'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { supabase } from '@/Clients/supabase/client';
import { useAuth } from '@/app/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Type,
  Mail,
  Phone,
  Calendar,
  Hash,
  ToggleLeft,
  List,
  CreditCard,
  FileText,
  Globe,
  Trash2,
  GripVertical,
  Settings,
  X,
  Loader2,
} from 'lucide-react';
import { useAudience } from '@/app/contexts/AudienceContext';
import { toast } from 'sonner';

// Field types configuration
const FIELD_TYPES = [
  { type: 'text', label: 'Text Input', icon: Type },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'phone', label: 'Phone', icon: Phone },
  { type: 'date', label: 'Date', icon: Calendar },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'textarea', label: 'Text Area', icon: FileText },
  { type: 'select', label: 'Dropdown', icon: List },
  { type: 'checkbox', label: 'Checkbox', icon: ToggleLeft },
  { type: 'url', label: 'URL', icon: Globe },
  { type: 'payment', label: 'Payment', icon: CreditCard },
];

// Payment providers
const PAYMENT_PROVIDERS = [
  { value: 'stripe', label: 'Stripe' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'square', label: 'Square' },
  { value: 'razorpay', label: 'Razorpay' },
];

// Draggable field type component
const FieldTypeItem = ({ fieldType }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'field',
    item: { ...fieldType, id: `new-${Date.now()}-${Math.random()}` },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const Icon = fieldType.icon;

  return (
    <div
      ref={drag}
      className={`cursor-move rounded-lg border p-3 transition-all ${
        isDragging
          ? 'scale-95 opacity-50'
          : 'hover:border-purple-500 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium">{fieldType.label}</span>
      </div>
    </div>
  );
};

// Form field component in the builder
const FormField = ({ field, index, onUpdate, onDelete, moveField }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localField, setLocalField] = useState(field);

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'form-field',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'form-field',
    hover: (item) => {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  });

  const handleSave = () => {
    onUpdate(index, localField);
    setIsEditing(false);
  };

  const Icon = FIELD_TYPES.find((ft) => ft.type === field.type)?.icon || Type;

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`rounded-lg border bg-white p-4 ${
        isDragging ? 'opacity-50' : ''
      } ${field.isDefault ? 'border-blue-200 bg-blue-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div ref={preview} className="cursor-move pt-1">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>

        <div className="flex-1">
          {!isEditing ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gray-600" />
                <span className="font-medium">{field.label}</span>
                {field.required && <span className="text-red-500">*</span>}
                {field.isDefault && (
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                    Default
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4 text-gray-500" />
                </button>
                {!field.isDefault && (
                  <button
                    onClick={() => onDelete(index)}
                    className="rounded p-1 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Edit Field</h4>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor={`label-${index}`}>Label</Label>
                  <Input
                    id={`label-${index}`}
                    value={localField.label}
                    onChange={(e) =>
                      setLocalField({ ...localField, label: e.target.value })
                    }
                    placeholder="Field label"
                  />
                </div>

                <div>
                  <Label htmlFor={`placeholder-${index}`}>Placeholder</Label>
                  <Input
                    id={`placeholder-${index}`}
                    value={localField.placeholder || ''}
                    onChange={(e) =>
                      setLocalField({
                        ...localField,
                        placeholder: e.target.value,
                      })
                    }
                    placeholder="Placeholder text"
                  />
                </div>

                {field.type === 'select' && (
                  <div>
                    <Label htmlFor={`options-${index}`}>
                      Options (one per line)
                    </Label>
                    <Textarea
                      id={`options-${index}`}
                      value={localField.options?.join('\n') || ''}
                      onChange={(e) =>
                        setLocalField({
                          ...localField,
                          options: e.target.value
                            .split('\n')
                            .filter((o) => o.trim()),
                        })
                      }
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                      rows={3}
                    />
                  </div>
                )}

                {field.type === 'payment' && (
                  <div>
                    <Label htmlFor={`provider-${index}`}>
                      Payment Provider
                    </Label>
                    <Select
                      value={localField.paymentProvider || ''}
                      onValueChange={(value) =>
                        setLocalField({ ...localField, paymentProvider: value })
                      }
                    >
                      <SelectTrigger id={`provider-${index}`}>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_PROVIDERS.map((provider) => (
                          <SelectItem
                            key={provider.value}
                            value={provider.value}
                          >
                            {provider.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`required-${index}`}
                    checked={localField.required || false}
                    onChange={(e) =>
                      setLocalField({
                        ...localField,
                        required: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={`required-${index}`} className="font-normal">
                    Required field
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    size="sm"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main form builder component
const FormBuilder = ({ fields, setFields }) => {
  const [, drop] = useDrop({
    accept: 'field',
    drop: (item) => {
      const newField = {
        id: item.id,
        type: item.type,
        label: item.label,
        placeholder: '',
        required: false,
        isDefault: false,
      };

      if (item.type === 'select') {
        newField.options = ['Option 1', 'Option 2', 'Option 3'];
      }

      if (item.type === 'payment') {
        newField.paymentProvider = '';
      }

      setFields([...fields, newField]);
    },
  });

  const moveField = useCallback(
    (fromIndex, toIndex) => {
      const updatedFields = [...fields];
      const [movedField] = updatedFields.splice(fromIndex, 1);
      updatedFields.splice(toIndex, 0, movedField);
      setFields(updatedFields);
    },
    [fields, setFields]
  );

  const updateField = useCallback(
    (index, updatedField) => {
      const updatedFields = [...fields];
      updatedFields[index] = updatedField;
      setFields(updatedFields);
    },
    [fields, setFields]
  );

  const deleteField = useCallback(
    (index) => {
      // Prevent deletion of default fields
      const fieldToDelete = fields[index];
      if (fieldToDelete.isDefault) {
        return;
      }
      setFields(fields.filter((_, i) => i !== index));
    },
    [fields, setFields]
  );

  return (
    <div
      ref={drop}
      className="min-h-[400px] rounded-lg border-2 border-dashed border-transparent p-4"
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            field={field}
            index={index}
            onUpdate={updateField}
            onDelete={deleteField}
            moveField={moveField}
          />
        ))}

        {fields.length === 1 && fields[0].isDefault && (
          <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-4">
            <div className="text-center text-gray-500">
              <p className="text-sm">
                Drag additional fields here to expand your form
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main edit page component
const EditSubscriptionPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { subscriptions, setSubscriptions } = useAudience();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [originalSubscription, setOriginalSubscription] = useState(null);

  // Initialize with empty state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fields: [],
  });

  // Fetch subscription data on mount
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('uuid', params.id)
          .eq('username', user?.username)
          .single();

        if (error) {
          console.error('Error fetching subscription:', error);
          toast.error('Failed to load subscription');
          router.push('/dashboard/subscriptions');
          return;
        }

        if (!data) {
          toast.error('Subscription not found');
          router.push('/dashboard/subscriptions');
          return;
        }

        // Store original subscription data
        setOriginalSubscription(data);

        // Convert form_fields object to array for the form builder
        const fieldsArray = [];
        if (data.form_fields) {
          Object.entries(data.form_fields).forEach(([fieldId, fieldData]) => {
            fieldsArray.push({
              id: fieldId,
              ...fieldData,
            });
          });
        }

        // If no fields exist, add default email field
        if (fieldsArray.length === 0) {
          fieldsArray.push({
            id: 'default-email-field',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email address',
            required: true,
            isDefault: true,
          });
        }

        setFormData({
          name: data.subscription_name || '',
          description: data.subscription_description || '',
          fields: fieldsArray,
        });
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast.error('An error occurred while loading the subscription');
        router.push('/dashboard/subscriptions');
      } finally {
        setLoadingData(false);
      }
    };

    if (user?.username && params.id) {
      fetchSubscription();
    }
  }, [user?.username, params.id, router]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a subscription name');
      return;
    }

    if (formData.fields.length === 0) {
      toast.error('Please add at least one field to your form');
      return;
    }

    // Validate payment fields have providers
    const invalidPaymentFields = formData.fields.filter(
      (field) => field.type === 'payment' && !field.paymentProvider
    );

    if (invalidPaymentFields.length > 0) {
      toast.error('Please select a payment provider for all payment fields');
      return;
    }

    setLoading(true);

    try {
      // Convert fields array to object format for the database
      const formFields = {};
      formData.fields.forEach((field) => {
        formFields[field.id] = {
          type: field.type,
          label: field.label,
          placeholder: field.placeholder,
          required: field.required,
          isDefault: field.isDefault,
          ...(field.options && { options: field.options }),
          ...(field.paymentProvider && {
            paymentProvider: field.paymentProvider,
          }),
        };
      });

      // Check if there are any payment fields and add is_paid flag
      const hasPaymentField = formData.fields.some(
        (field) => field.type === 'payment'
      );

      const updateData = {
        subscription_name: formData.name,
        subscription_description: formData.description,
        form_fields: formFields,
        updated_at: new Date().toISOString(),
        ...(hasPaymentField && { is_paid: true }),
      };

      const { data, error } = await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('uuid', params.id)
        .eq('username', user?.username)
        .select()
        .single();

      if (error) {
        console.error('Error updating subscription:', error);
        toast.error('Failed to update subscription');
      } else {
        // Update the subscriptions in context
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.map((sub) => (sub.uuid === params.id ? data : sub))
        );
        toast.success('Subscription updated successfully');
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    router.push('/dashboard/subscriptions');
  };

  if (loadingData) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Subscription
          </h1>
          <p className="mt-1 text-gray-600">
            Modify your subscription form and settings
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Panel - Field Types */}
          <div className="lg:col-span-1">
            <Card className="sticky top-0 p-4">
              <h2 className="mb-4 font-semibold">Field Types</h2>
              <div className="space-y-2">
                {FIELD_TYPES.map((fieldType) => (
                  <FieldTypeItem key={fieldType.type} fieldType={fieldType} />
                ))}
              </div>
            </Card>
          </div>

          {/* Right Panel - Form Builder */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info */}
            <Card className="p-6">
              <h2 className="mb-4 font-semibold">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Subscription Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Newsletter Signup"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe what this subscription is for..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Form Builder */}
            <Card className="p-6">
              <h2 className="mb-4 font-semibold">Form Fields</h2>
              <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> An email field is required for all
                  subscription forms and cannot be removed.
                </p>
              </div>
              <FormBuilder
                fields={formData.fields}
                setFields={(fields) => setFormData({ ...formData, fields })}
              />
            </Card>

            {/* Subscription Stats (if available) */}
            {originalSubscription && (
              <Card className="p-6">
                <h2 className="mb-4 font-semibold">Subscription Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Subscribed</p>
                    <p className="text-2xl font-semibold">
                      {originalSubscription.subscribed
                        ? Object.keys(originalSubscription.subscribed).length
                        : 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Unsubscribed</p>
                    <p className="text-2xl font-semibold">
                      {originalSubscription.unsubscribed
                        ? Object.keys(originalSubscription.unsubscribed).length
                        : 0}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Last updated:{' '}
                {originalSubscription?.updated_at
                  ? new Date(
                      originalSubscription.updated_at
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Never'}
              </div>
              <div className="flex gap-3">
                <Link href="/dashboard/subscriptions">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Dialog */}
        <AlertDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Changes Saved!</AlertDialogTitle>
              <AlertDialogDescription>
                Your subscription has been updated successfully. All changes are
                now live.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleSuccessClose}>
                Back to Subscriptions
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DndProvider>
  );
};

export default EditSubscriptionPage;
