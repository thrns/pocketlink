'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Settings,
  Eye,
  Save,
  Download,
  Share2,
  Palette,
  Layout,
  X,
  CheckSquare,
  FileText,
  Mail,
  Phone,
  Calendar,
  Hash,
  Link,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const FormToolbar = ({
  position,
  onAddField,
  onPreview,
  onSave,
  onClose,
  themeData,
  formSettings,
  onUpdateSettings,
}) => {
  const [showFieldMenu, setShowFieldMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);

  // Get theme colors
  const bgColor = themeData?.cardBackground || '#ffffff';
  const textColor = themeData?.textMode === 'dark' ? '#000000' : '#ffffff';
  const borderColor = themeData?.border || '#e5e7eb';

  const fieldTypes = [
    {
      type: 'text',
      icon: FileText,
      label: 'Text Input',
      description: 'Single line text input',
    },
    {
      type: 'email',
      icon: Mail,
      label: 'Email',
      description: 'Email address input',
    },
    {
      type: 'phone',
      icon: Phone,
      label: 'Phone',
      description: 'Phone number input',
    },
    {
      type: 'textarea',
      icon: FileText,
      label: 'Text Area',
      description: 'Multi-line text input',
    },
    {
      type: 'number',
      icon: Hash,
      label: 'Number',
      description: 'Numeric input',
    },
    {
      type: 'date',
      icon: Calendar,
      label: 'Date',
      description: 'Date picker',
    },
    {
      type: 'checkbox',
      icon: CheckSquare,
      label: 'Checkbox',
      description: 'Single checkbox option',
    },
    {
      type: 'select',
      icon: Layout,
      label: 'Dropdown',
      description: 'Dropdown selection',
    },
    {
      type: 'radio',
      icon: Star,
      label: 'Radio Group',
      description: 'Multiple choice (single select)',
    },
    {
      type: 'url',
      icon: Link,
      label: 'URL',
      description: 'Website link input',
    },
  ];

  // Calculate safe positioning to prevent toolbar from going off-screen
  const getAdjustedPosition = () => {
    const toolbarWidth = 500;
    const toolbarHeight = 60;
    const padding = 10;

    let adjustedX = position.x;
    let adjustedY = position.y;
    let transform = 'translateX(-50%)';

    if (position.x + toolbarWidth / 2 > window.innerWidth - padding) {
      adjustedX = window.innerWidth - toolbarWidth - padding;
      transform = 'translateX(0)';
    }

    if (position.x - toolbarWidth / 2 < padding) {
      adjustedX = padding;
      transform = 'translateX(0)';
    }

    if (position.y < padding) {
      adjustedY = position.y + 60;
    }

    if (position.y + toolbarHeight > window.innerHeight - padding) {
      adjustedY = position.y - toolbarHeight - 10;
    }

    return { x: adjustedX, y: adjustedY, transform };
  };

  const adjustedPosition = getAdjustedPosition();

  const handleAddField = (fieldType) => {
    const fieldConfig = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `${fieldTypes.find((f) => f.type === fieldType)?.label || 'Field'}`,
      placeholder: `Enter ${fieldType}...`,
      required: false,
      options:
        fieldType === 'select' || fieldType === 'radio'
          ? ['Option 1', 'Option 2']
          : undefined,
    };

    onAddField(fieldConfig);
    setShowFieldMenu(false);
  };

  return (
    <div
      className={cn(
        'absolute z-50 flex items-center gap-2 p-3',
        'shadow-strong rounded-lg border backdrop-blur-sm',
        'animate-fade-in'
      )}
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        transform: adjustedPosition.transform,
        backgroundColor: bgColor,
        borderColor: borderColor,
        minWidth: '480px',
      }}
    >
      {/* Add Field Button */}
      <Popover open={showFieldMenu} onOpenChange={setShowFieldMenu}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 px-3 transition-all duration-200 hover:bg-gray-500 hover:bg-opacity-10',
              showFieldMenu && 'bg-gray-500 bg-opacity-20'
            )}
            style={{ color: textColor }}
          >
            <Layout className="mr-2 h-4 w-4" />
            Add Field
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-72 border p-2 backdrop-blur-sm"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          <div className="space-y-1">
            <div
              className="mb-2 text-sm font-medium"
              style={{ color: textColor }}
            >
              Form Fields
            </div>
            {fieldTypes.map((field) => {
              const Icon = field.icon;
              return (
                <Button
                  key={field.type}
                  variant="ghost"
                  className="h-auto w-full justify-start p-2 hover:bg-gray-500 hover:bg-opacity-10"
                  onClick={() => handleAddField(field.type)}
                  style={{ color: textColor }}
                >
                  <div className="flex items-start gap-2">
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{field.label}</div>
                      <div className="text-xs opacity-70">
                        {field.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      <div className="mx-1 h-4 w-px" style={{ backgroundColor: borderColor }} />

      {/* Form Settings */}
      <Popover open={showSettings} onOpenChange={setShowSettings}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 w-8 p-0 transition-all duration-200 hover:bg-gray-500 hover:bg-opacity-10',
              showSettings && 'bg-gray-500 bg-opacity-20'
            )}
            style={{ color: textColor }}
            title="Form Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 border p-3 backdrop-blur-sm"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          <div className="space-y-3">
            <div className="text-sm font-medium" style={{ color: textColor }}>
              Form Settings
            </div>

            <div className="space-y-2">
              <label
                className="text-xs font-medium"
                style={{ color: textColor }}
              >
                Form Title
              </label>
              <Input
                placeholder="Contact Form"
                value={formSettings?.title || ''}
                onChange={(e) =>
                  onUpdateSettings({ ...formSettings, title: e.target.value })
                }
                className="bg-transparent"
                style={{
                  color: textColor,
                  borderColor: borderColor,
                }}
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-xs font-medium"
                style={{ color: textColor }}
              >
                Submit Button Text
              </label>
              <Input
                placeholder="Submit"
                value={formSettings?.submitText || ''}
                onChange={(e) =>
                  onUpdateSettings({
                    ...formSettings,
                    submitText: e.target.value,
                  })
                }
                className="bg-transparent"
                style={{
                  color: textColor,
                  borderColor: borderColor,
                }}
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-xs font-medium"
                style={{ color: textColor }}
              >
                Success Message
              </label>
              <Input
                placeholder="Thank you for your submission!"
                value={formSettings?.successMessage || ''}
                onChange={(e) =>
                  onUpdateSettings({
                    ...formSettings,
                    successMessage: e.target.value,
                  })
                }
                className="bg-transparent"
                style={{
                  color: textColor,
                  borderColor: borderColor,
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Style Settings */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowStyleMenu(!showStyleMenu)}
        className={cn(
          'h-8 w-8 p-0 transition-all duration-200 hover:bg-gray-500 hover:bg-opacity-10',
          showStyleMenu && 'bg-gray-500 bg-opacity-20'
        )}
        style={{ color: textColor }}
        title="Form Styles"
      >
        <Palette className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-4 w-px" style={{ backgroundColor: borderColor }} />

      {/* Preview Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onPreview}
        className="h-8 px-3 transition-all duration-200 hover:bg-gray-500 hover:bg-opacity-10"
        style={{ color: textColor }}
        title="Preview Form"
      >
        <Eye className="mr-2 h-4 w-4" />
        Preview
      </Button>

      {/* Save Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSave}
        className="h-8 px-3 transition-all duration-200 hover:bg-gray-500 hover:bg-opacity-10"
        style={{ color: textColor }}
        title="Save Form"
      >
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>

      <div className="mx-1 h-4 w-px" style={{ backgroundColor: borderColor }} />

      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="h-8 w-8 p-0 transition-all duration-200 hover:bg-gray-500 hover:bg-opacity-10"
        style={{ color: textColor }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
