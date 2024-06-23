'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { FormToolbar } from './FormToolbar';
import { FormFieldRenderer } from './FormFieldRenderer';
import { cn } from '@/lib/utils';
import { useFetch } from '@/app/contexts/FetcherContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus, Eye, EyeOff } from 'lucide-react';

// Default form structure
const getDefaultForm = () => ({
  title: 'Contact Form',
  description: 'Please fill out this form',
  submitText: 'Submit',
  successMessage: 'Thank you for your submission!',
  fields: [
    {
      id: 'field-1',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    {
      id: 'field-2',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      id: 'field-3',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Enter your message',
      required: false,
    },
  ],
});

export const FormBuilder = ({
  initialFormData = '',
  onFormChange,
  className,
  card,
  themeData,
}) => {
  const { theme } = useFetch();
  const { user } = useAuth();

  // Parse initial form data or use default
  const [formData, setFormData] = useState(() => {
    if (initialFormData && initialFormData.trim()) {
      try {
        return JSON.parse(initialFormData);
      } catch (e) {
        console.warn('Failed to parse form data, using default:', e);
        return getDefaultForm();
      }
    }
    return getDefaultForm();
  });

  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [draggedFieldId, setDraggedFieldId] = useState(null);
  const [dragOverFieldId, setDragOverFieldId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const formRef = useRef(null);

  // Get theme colors similar to BlogEditPage
  const textColor = card?.background
    ? card?.cardThemeBright
      ? 'white'
      : 'black'
    : themeData?.textMode === 'dark'
      ? 'black'
      : 'white';
  const bgColor = card?.background
    ? card.background
    : themeData?.cardBackground;

  // Update form content when formData changes
  useEffect(() => {
    const formJSON = JSON.stringify(formData);
    onFormChange?.(formJSON);
  }, [formData, onFormChange]);

  // Generate unique field ID
  const generateFieldId = () =>
    `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleFormClick = useCallback(
    (e) => {
      if (previewMode) return;

      const rect = formRef.current.getBoundingClientRect();
      setToolbarPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 60,
      });
      setShowToolbar(true);
      setSelectedFieldId(null);
    },
    [previewMode]
  );

  const handleAddField = useCallback((fieldConfig) => {
    const newField = {
      ...fieldConfig,
      id: generateFieldId(),
    };

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));

    setShowToolbar(false);
    // Auto-select the new field
    setTimeout(() => {
      setSelectedFieldId(newField.id);
    }, 100);
  }, []);

  const handleSelectField = useCallback(
    (fieldId) => {
      if (previewMode) return;
      setSelectedFieldId(fieldId);
      setShowToolbar(false);
    },
    [previewMode]
  );

  const handleEditField = useCallback(
    (fieldId) => {
      if (previewMode) return;
      setEditingFieldId(fieldId);
      setSelectedFieldId(null);
    },
    [previewMode]
  );

  const handleDeleteField = useCallback((fieldId) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));
    setSelectedFieldId(null);
  }, []);

  const handleUpdateField = useCallback((updatedField) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      ),
    }));
    setEditingFieldId(null);
  }, []);

  const handleUpdateFormSettings = useCallback((settings) => {
    setFormData((prev) => ({ ...prev, ...settings }));
  }, []);

  const handleSaveForm = useCallback(() => {
    // This would typically save to a backend
    console.log('Saving form:', formData);
    // For now, just show a toast or similar feedback
  }, [formData]);

  const handlePreviewToggle = useCallback(() => {
    setPreviewMode(!previewMode);
    setSelectedFieldId(null);
    setEditingFieldId(null);
    setShowToolbar(false);
  }, [previewMode]);

  // Drag and Drop handlers
  const handleDragStart = useCallback((e, fieldId) => {
    setDraggedFieldId(fieldId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedFieldId(null);
    setDragOverFieldId(null);
  }, []);

  const handleDragOver = useCallback(
    (e, fieldId) => {
      e.preventDefault();
      if (draggedFieldId && draggedFieldId !== fieldId) {
        setDragOverFieldId(fieldId);
      }
    },
    [draggedFieldId]
  );

  const handleDrop = useCallback(
    (e, targetFieldId) => {
      e.preventDefault();
      if (!draggedFieldId || draggedFieldId === targetFieldId) return;

      setFormData((prev) => {
        const fields = [...prev.fields];
        const draggedIndex = fields.findIndex((f) => f.id === draggedFieldId);
        const targetIndex = fields.findIndex((f) => f.id === targetFieldId);

        if (draggedIndex === -1 || targetIndex === -1) return prev;

        // Remove dragged field and insert at target position
        const [draggedField] = fields.splice(draggedIndex, 1);
        fields.splice(targetIndex, 0, draggedField);

        return { ...prev, fields };
      });

      setDraggedFieldId(null);
      setDragOverFieldId(null);
    },
    [draggedFieldId]
  );

  const renderFormPreview = () => (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold" style={{ color: textColor }}>
          {formData.title}
        </h2>
        {formData.description && (
          <p className="text-opacity-80" style={{ color: textColor }}>
            {formData.description}
          </p>
        )}
      </div>

      {/* Form Fields */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {formData.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="text-sm font-medium" style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                placeholder={field.placeholder}
                required={field.required}
                rows={3}
                className="w-full resize-none rounded-md border bg-transparent px-3 py-2"
                style={{
                  color: textColor,
                  borderColor: themeData?.border || '#e5e7eb',
                }}
              />
            ) : field.type === 'select' ? (
              <select
                required={field.required}
                className="w-full rounded-md border bg-transparent px-3 py-2"
                style={{
                  color: textColor,
                  borderColor: themeData?.border || '#e5e7eb',
                }}
              >
                <option value="">{field.placeholder}</option>
                {field.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  required={field.required}
                  className="rounded"
                  style={{ borderColor: themeData?.border || '#e5e7eb' }}
                />
                <span style={{ color: textColor }}>{field.label}</span>
              </div>
            ) : field.type === 'radio' ? (
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={field.id}
                      value={option}
                      required={field.required && index === 0}
                      style={{ borderColor: themeData?.border || '#e5e7eb' }}
                    />
                    <span style={{ color: textColor }}>{option}</span>
                  </div>
                ))}
              </div>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full rounded-md border bg-transparent px-3 py-2"
                style={{
                  color: textColor,
                  borderColor: themeData?.border || '#e5e7eb',
                }}
              />
            )}
          </div>
        ))}

        <Button
          type="submit"
          className="w-full"
          style={{
            backgroundColor: themeData?.border || '#3b82f6',
            color: textColor,
          }}
        >
          {formData.submitText}
        </Button>
      </form>
    </div>
  );

  const renderFormBuilder = () => (
    <div
      className="relative min-h-[400px] space-y-4"
      ref={formRef}
      onClick={handleFormClick}
    >
      {/* Form Title Section */}
      <div
        className={cn(
          'space-y-2 rounded-lg border p-4 text-center',
          selectedFieldId === 'header' && 'ring-2 ring-blue-500'
        )}
        style={{
          backgroundColor: bgColor,
          borderColor: themeData?.border || '#e5e7eb',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedFieldId('header');
          setShowToolbar(false);
        }}
      >
        <h2 className="text-2xl font-bold" style={{ color: textColor }}>
          {formData.title}
        </h2>
        {formData.description && (
          <p className="text-opacity-80" style={{ color: textColor }}>
            {formData.description}
          </p>
        )}
      </div>

      {/* Form Fields */}
      {formData.fields.map((field, index) => (
        <div
          key={field.id}
          onDragOver={(e) => handleDragOver(e, field.id)}
          onDrop={(e) => handleDrop(e, field.id)}
        >
          <FormFieldRenderer
            field={field}
            isSelected={selectedFieldId === field.id}
            isEditing={editingFieldId === field.id}
            onSelect={handleSelectField}
            onEdit={handleEditField}
            onDelete={handleDeleteField}
            onUpdate={handleUpdateField}
            themeData={themeData}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            isDragging={draggedFieldId === field.id}
            isDragOver={dragOverFieldId === field.id}
          />
        </div>
      ))}

      {/* Add Field Prompt */}
      {formData.fields.length === 0 && (
        <div
          className="rounded-lg border-2 border-dashed p-8 text-center"
          style={{ borderColor: themeData?.border || '#e5e7eb' }}
        >
          <Plus
            className="mx-auto mb-2 h-8 w-8 opacity-50"
            style={{ color: textColor }}
          />
          <p className="text-opacity-70" style={{ color: textColor }}>
            Click anywhere to add your first form field
          </p>
        </div>
      )}

      {/* Submit Button Preview */}
      <div className="pt-4">
        <Button
          className="w-full"
          disabled
          style={{
            backgroundColor: themeData?.border || '#3b82f6',
            color: textColor,
            opacity: 0.7,
          }}
        >
          {formData.submitText}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cn('relative w-full', className)}>
      {/* Preview Toggle */}
      <div className="absolute right-4 top-4 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePreviewToggle}
          className="border bg-white/90 backdrop-blur"
          style={{ borderColor: themeData?.border || '#e5e7eb' }}
        >
          {previewMode ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Edit
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </>
          )}
        </Button>
      </div>

      <div
        className={cn(
          'min-h-[600px] w-full rounded-2xl p-6 transition-all duration-200'
        )}
        style={{
          backgroundColor: bgColor,
        }}
      >
        {previewMode ? renderFormPreview() : renderFormBuilder()}
      </div>

      {/* Form Toolbar */}
      {showToolbar && !previewMode && (
        <FormToolbar
          position={toolbarPosition}
          onAddField={handleAddField}
          onPreview={handlePreviewToggle}
          onSave={handleSaveForm}
          onClose={() => setShowToolbar(false)}
          themeData={themeData}
          formSettings={formData}
          onUpdateSettings={handleUpdateFormSettings}
        />
      )}
    </div>
  );
};
