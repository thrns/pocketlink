'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { useAudience } from '@/app/contexts/AudienceContext';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES } from '@/constants/features';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

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
];


// Draggable field type component
const FieldTypeItem = ({ fieldType }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'field',
    item: { ...fieldType, id: `new-${Date.now()}-${Math.random()}` },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !fieldType.disabled,
  });

  const Icon = fieldType.icon;

  return (
    <div
      ref={fieldType.disabled ? null : drag}
      className={`rounded-lg border p-3 transition-all ${
        fieldType.disabled
          ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60'
          : isDragging
            ? 'scale-95 opacity-50'
            : 'cursor-move hover:border-purple-500'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={`h-4 w-4 ${fieldType.disabled ? 'text-gray-400' : 'text-gray-600'}`}
        />
        <div className="flex flex-col">
          <span
            className={`text-sm font-medium ${fieldType.disabled ? 'text-gray-400' : ''}`}
          >
            {fieldType.label}
          </span>
          {fieldType.comingSoon && (
            <span className="text-xs text-gray-400">Coming Soon</span>
          )}
        </div>
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

// Main page component
const CreateSubscriptionPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { setSubscriptions } = useAudience();
  const { paymentGateways, loading: gatewaysLoading } = usePaymentGateway();

  // Debug payment gateways
  useEffect(() => {
    console.log('Payment gateways:', paymentGateways);
    console.log('Gateways loading:', gatewaysLoading);
    if (paymentGateways && paymentGateways.length > 0) {
      console.log('First gateway object:', paymentGateways[0]);
      console.log('Gateway keys:', Object.keys(paymentGateways[0]));
    }
  }, [paymentGateways, gatewaysLoading]);
  const [loading, setLoading] = useState(false);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isPaidSubscription, setIsPaidSubscription] = useState(false);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState('');
  const [subscriptionPrice, setSubscriptionPrice] = useState('');
  const [subscriptionCurrency, setSubscriptionCurrency] = useState('INR');

  // Initialize with default email field
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fields: [
      {
        id: 'default-email-field',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email address',
        required: true,
        isDefault: true,
      },
    ],
  });

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a subscription name');
      return;
    }

    if (formData.fields.length === 0) {
      alert('Please add at least one field to your form');
      return;
    }

    // Validate paid subscription has payment gateway and price
    if (isPaidSubscription && !selectedPaymentGateway) {
      alert('Please select a payment gateway for paid subscription');
      setIsPaidSubscription(false); // Turn off toggle if no gateway selected
      return;
    }

    if (isPaidSubscription && (!subscriptionPrice || parseFloat(subscriptionPrice) <= 0)) {
      alert('Please enter a valid price for paid subscription');
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

      const subscriptionData = {
        username: user?.username,
        subscription_name: formData.name,
        subscription_description: formData.description,
        form_fields: formFields,
        subscribed: {},
        unsubscribed: {},
        is_paid: isPaidSubscription,
        ...(isPaidSubscription && selectedPaymentGateway && {
          payment_gateway: selectedPaymentGateway,
          price: parseFloat(subscriptionPrice),
          currency: subscriptionCurrency,
          payment_type: 'one_time'
        }),
      };

      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscriptionData)
        .select()
        .single();

      if (error) {
        console.error('Error creating subscription:', error);
        alert('Failed to create subscription. Please try again.');
      } else {
        setSubscriptions((prevSubscriptions) => [...prevSubscriptions, data]);
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    router.push('/dashboard/subscriptions');
  };

  return (
    <PremiumGate
      featureKey={FEATURES.PAID_SUBSCRIPTIONS}
      featureName="Create Paid Subscription"
      description="Build custom subscription forms with drag-and-drop field builder. Collect subscriber information, process payments, and grow your community with powerful form tools."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-6">
          <div className="pointer-events-none mx-auto max-w-7xl opacity-60">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Create Subscription
              </h1>
              <p className="mt-1 text-gray-600">
                Build a custom form to collect subscriber information
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Panel - Field Types */}
              <div className="lg:col-span-1">
                <div className="sticky top-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <h2 className="mb-4 font-semibold">Field Types</h2>
                  <div className="space-y-2">
                    {[
                      { icon: Type, label: 'Text Input' },
                      { icon: Mail, label: 'Email' },
                      { icon: Phone, label: 'Phone' },
                      { icon: Calendar, label: 'Date' },
                      { icon: Hash, label: 'Number' },
                      { icon: FileText, label: 'Text Area' },
                      { icon: List, label: 'Dropdown' },
                      { icon: ToggleLeft, label: 'Checkbox' },
                      { icon: Globe, label: 'URL' },
                      { icon: CreditCard, label: 'Payment' },
                    ].map((fieldType, i) => (
                      <div
                        key={i}
                        className="cursor-move rounded-lg border p-3 transition-all hover:border-purple-500 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <fieldType.icon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">
                            {fieldType.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Form Builder */}
              <div className="space-y-6 lg:col-span-2">
                {/* Basic Info */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-4 font-semibold">Basic Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Subscription Name
                      </label>
                      <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                        <span className="text-gray-500">
                          e.g., Newsletter Signup
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="h-20 rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                        <span className="text-gray-500">
                          Describe what this subscription is for...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Builder */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-4 font-semibold">Form Fields</h2>
                  <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> An email field is required for all
                      subscription forms and cannot be removed.
                    </p>
                  </div>

                  {/* Form Fields Preview */}
                  <div className="space-y-3">
                    {/* Default Email Field */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-600" />
                              <span className="font-medium">Email Address</span>
                              <span className="text-red-500">*</span>
                              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                Default
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="rounded p-1 hover:bg-gray-100">
                                <Settings className="h-4 w-4 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sample Additional Fields */}
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Type className="h-4 w-4 text-gray-600" />
                              <span className="font-medium">Full Name</span>
                              <span className="text-red-500">*</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="rounded p-1 hover:bg-gray-100">
                                <Settings className="h-4 w-4 text-gray-500" />
                              </button>
                              <button className="rounded p-1 hover:bg-red-50">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-gray-600" />
                              <span className="font-medium">Payment</span>
                              <span className="text-red-500">*</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="rounded p-1 hover:bg-gray-100">
                                <Settings className="h-4 w-4 text-gray-500" />
                              </button>
                              <button className="rounded p-1 hover:bg-red-50">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Drop zone for new fields */}
                    <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-4">
                      <div className="text-center text-gray-500">
                        <p className="text-sm">
                          Drag additional fields here to expand your form
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="rounded-lg bg-black px-4 py-2 text-white">
                    Create Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <DndProvider backend={HTML5Backend}>
        <div className="mx-auto max-w-7xl p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Subscription
            </h1>
            <p className="mt-1 text-gray-600">
              Build a custom form to collect subscriber information
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
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">Basic Information</h2>
                  <div className="flex items-center gap-3">
                    <Label htmlFor="paid-toggle" className="text-sm font-medium">
                      Paid Subscription
                    </Label>
                    <Switch
                      id="paid-toggle"
                      checked={isPaidSubscription}
                      onCheckedChange={setIsPaidSubscription}
                    />
                    {isPaidSubscription && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Paid
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Payment Gateway Selection */}
                {isPaidSubscription && (
                  <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="mb-3">
                      <Label htmlFor="payment-gateway" className="text-sm font-medium">
                        Payment Gateway <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={selectedPaymentGateway}
                        onValueChange={setSelectedPaymentGateway}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a payment gateway" />
                        </SelectTrigger>
                        <SelectContent>
                          {gatewaysLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading payment gateways...
                            </SelectItem>
                          ) : paymentGateways && paymentGateways.length > 0 ? (
                            paymentGateways.map((gateway) => (
                              <SelectItem key={gateway.id} value={gateway.id}>
                                {gateway.gateway_name || gateway.name}
                                {(gateway.gateway_type || gateway.type) && ` (${gateway.gateway_type || gateway.type})`}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No payment gateways configured
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price and Currency */}
                    <div className="mb-3 grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="price" className="text-sm font-medium">
                          Price <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {subscriptionCurrency === 'INR' ? '₹' : '$'}
                          </span>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={subscriptionPrice}
                            onChange={(e) => setSubscriptionPrice(e.target.value)}
                            placeholder="0.00"
                            className="pl-8"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="currency" className="text-sm font-medium">
                          Currency
                        </Label>
                        <Select
                          value={subscriptionCurrency}
                          onValueChange={setSubscriptionCurrency}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">INR (₹)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        One-time Payment
                      </Badge>
                    </div>

                    {!gatewaysLoading && paymentGateways && paymentGateways.length === 0 && (
                      <p className="text-sm text-amber-700">
                        You need to configure a payment gateway first. 
                        <Link href="/dashboard/integrations" className="ml-1 underline">
                          Set up payment gateway
                        </Link>
                      </p>
                    )}
                    
                    {/* Debug info - remove this later */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="mt-2 rounded bg-gray-100 p-2 text-xs">
                        <p>Debug: Loading: {gatewaysLoading ? 'Yes' : 'No'}</p>
                        <p>Debug: Gateways count: {paymentGateways?.length || 0}</p>
                        <p>Debug: User: {user?.username}</p>
                      </div>
                    )}
                  </div>
                )}

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
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
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

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Link href="/dashboard/subscriptions" variant="outline">
                  Cancel
                </Link>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Subscription'}
                </Button>
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
                <AlertDialogTitle>Subscription Created!</AlertDialogTitle>
                <AlertDialogDescription>
                  Your subscription form has been created successfully. You can
                  now share it with your audience to start collecting data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleSuccessClose}>
                  Go to Subscriptions
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DndProvider>
    </PremiumGate>
  );
};

export default CreateSubscriptionPage;
