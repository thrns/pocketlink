'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Edit, Trash2, GripVertical, Plus, X, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FormFieldRenderer = ({
  field,
  isSelected,
  isEditing,
  onSelect,
  onEdit,
  onDelete,
  onUpdate,
  themeData,
  onDragStart,
  onDragEnd,
  isDragging,
  isDragOver,
}) => {
  const [editingField, setEditingField] = useState(field);
  const [showOptions, setShowOptions] = useState(false);

  // Get theme colors
  const textColor = themeData?.textMode === 'dark' ? '#000000' : '#ffffff';
  const bgColor = themeData?.cardBackground || '#ffffff';
  const borderColor = themeData?.border || '#e5e7eb';

  const handleSaveField = () => {
    onUpdate(editingField);
    onEdit(null);
  };

  const handleCancelEdit = () => {
    setEditingField(field);
    onEdit(null);
  };

  const addOption = () => {
    const newOptions = [
      ...(editingField.options || []),
      `Option ${(editingField.options?.length || 0) + 1}`,
    ];
    setEditingField({ ...editingField, options: newOptions });
  };

  const removeOption = (index) => {
    const newOptions =
      editingField.options?.filter((_, i) => i !== index) || [];
    setEditingField({ ...editingField, options: newOptions });
  };

  const updateOption = (index, value) => {
    const newOptions = [...(editingField.options || [])];
    newOptions[index] = value;
    setEditingField({ ...editingField, options: newOptions });
  };

  const renderField = () => {
    const commonProps = {
      placeholder: field.placeholder,
      className: 'w-full rounded-md border bg-transparent px-3 py-2',
      style: {
        color: textColor,
        borderColor: borderColor,
      },
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        return <Input type={field.type} {...commonProps} />;

      case 'number':
        return <Input type="number" {...commonProps} />;

      case 'date':
        return <Input type="date" {...commonProps} />;

      case 'textarea':
        return (
          <textarea
            rows={3}
            placeholder={field.placeholder}
            className="w-full resize-none rounded-md border bg-transparent px-3 py-2"
            style={{
              color: textColor,
              borderColor: borderColor,
            }}
          />
        );

      case 'select':
        return (
          <Select>
            <SelectTrigger
              className="w-full"
              style={{ borderColor: borderColor }}
            >
              <SelectValue
                placeholder={field.placeholder}
                style={{ color: textColor }}
              />
            </SelectTrigger>
            <SelectContent
              style={{ backgroundColor: bgColor, borderColor: borderColor }}
            >
              {field.options?.map((option, index) => (
                <SelectItem
                  key={index}
                  value={option}
                  style={{ color: textColor }}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border"
              style={{ borderColor: borderColor }}
            />
            <label style={{ color: textColor }}>{field.label}</label>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  className="border"
                  style={{ borderColor: borderColor }}
                />
                <label style={{ color: textColor }}>{option}</label>
              </div>
            ))}
          </div>
        );

      default:
        return <Input {...commonProps} />;
    }
  };

  const renderEditForm = () => (
    <div
      className="space-y-4 rounded-lg border p-4"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: textColor }}>
          Field Label
        </label>
        <Input
          value={editingField.label}
          onChange={(e) =>
            setEditingField({ ...editingField, label: e.target.value })
          }
          className="bg-transparent"
          style={{
            color: textColor,
            borderColor: borderColor,
          }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: textColor }}>
          Placeholder
        </label>
        <Input
          value={editingField.placeholder}
          onChange={(e) =>
            setEditingField({ ...editingField, placeholder: e.target.value })
          }
          className="bg-transparent"
          style={{
            color: textColor,
            borderColor: borderColor,
          }}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={editingField.required}
          onChange={(e) =>
            setEditingField({ ...editingField, required: e.target.checked })
          }
          className="rounded"
          style={{ borderColor: borderColor }}
        />
        <label className="text-sm" style={{ color: textColor }}>
          Required field
        </label>
      </div>

      {(field.type === 'select' || field.type === 'radio') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" style={{ color: textColor }}>
              Options
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={addOption}
              className="h-6 w-6 p-0"
              style={{ color: textColor }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {editingField.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="flex-1 bg-transparent"
                style={{
                  color: textColor,
                  borderColor: borderColor,
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeOption(index)}
                className="h-6 w-6 p-0 text-red-500 hover:bg-red-100"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={handleSaveField}
          size="sm"
          style={{
            backgroundColor: borderColor,
            color: textColor,
          }}
        >
          Save
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancelEdit}
          style={{
            borderColor: borderColor,
            color: textColor,
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  if (isEditing) {
    return renderEditForm();
  }

  return (
    <div
      className={cn(
        'group relative transition-all duration-300',
        'rounded-lg border p-4',
        isSelected && 'ring-2 ring-blue-500',
        isDragging && 'rotate-1 scale-95 opacity-30',
        isDragOver && 'scale-105 border-blue-500 bg-blue-50/10'
      )}
      style={{
        backgroundColor: bgColor,
        borderColor: isSelected ? '#3b82f6' : borderColor,
      }}
      onClick={() => onSelect(field.id)}
    >
      {/* Drag Handle */}
      <div
        className={cn(
          'absolute -left-3 top-4 h-8 w-8 cursor-grab rounded-full border-2',
          'flex items-center justify-center opacity-0 group-hover:opacity-100',
          'transition-opacity duration-200 active:cursor-grabbing',
          'bg-white hover:border-blue-500'
        )}
        style={{ borderColor: borderColor }}
        draggable
        onDragStart={(e) => onDragStart(e, field.id)}
        onDragEnd={onDragEnd}
      >
        <GripVertical className="h-4 w-4" style={{ color: textColor }} />
      </div>

      {/* Field Controls */}
      {isSelected && (
        <div className="absolute -top-3 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(field.id);
            }}
            className="h-6 w-6 border bg-white p-0 hover:bg-gray-50"
            style={{ borderColor: borderColor }}
            title="Edit Field"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(field.id);
            }}
            className="h-6 w-6 border bg-white p-0 text-red-500 hover:bg-red-50"
            style={{ borderColor: borderColor }}
            title="Delete Field"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Field Label */}
      <div className="mb-2">
        <label className="text-sm font-medium" style={{ color: textColor }}>
          {field.label}
          {field.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>

      {/* Field Input */}
      <div className="pointer-events-none">{renderField()}</div>
    </div>
  );
};
