'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  GripVertical,
  PlusCircle,
  Trash2,
  Edit2,
  Save,
  X,
  CheckSquare,
  Square,
} from 'lucide-react';

const ItemTypes = {
  FIELD: 'field',
};

const DraggableFormField = ({
  field,
  index,
  moveField,
  onEdit,
  onDelete,
  onToggleRequired,
}) => {
  const ref = React.useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.FIELD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.FIELD,
    item: () => ({ id: field.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={preview} // Use preview for the entire draggable item
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="mb-2 flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-3"
      data-handler-id={handlerId}
    >
      <div className="flex items-center">
        <div ref={ref} className="mr-3 cursor-move text-gray-500 text-gray-700">
          {' '}
          {/* Attach drag handle here */}
          <GripVertical size={20} />
        </div>
        <div className="flex-grow">
          <span className="font-medium text-gray-800">{field.label}</span>
          <span className="ml-2 text-xs text-gray-500">({field.type})</span>
          {field.placeholder && (
            <p className="text-xs text-gray-500">
              Placeholder: {field.placeholder}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleRequired(field.id, !field.required)}
          title={field.required ? 'Mark as optional' : 'Mark as required'}
          className="text-gray-600 text-gray-800"
        >
          {field.required ? (
            <CheckSquare size={18} className="text-blue-600" />
          ) : (
            <Square size={18} />
          )}
        </button>
        <button
          onClick={() => onEdit(field)}
          className="text-blue-600 text-blue-800"
          title="Edit Field"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(field.id)}
          className="text-red-500 text-red-700"
          title="Delete Field"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const FormFieldEditorModal = ({ isOpen, onClose, group, onSaveFormFields }) => {
  const [fields, setFields] = useState([]);
  const [isEditingField, setIsEditingField] = useState(false);
  const [currentField, setCurrentField] = useState(null); // For adding new or editing existing

  useEffect(() => {
    if (group && group.form_fields) {
      setFields(
        group.form_fields.map((f) => ({
          ...f,
          id: f.id || `field-${Date.now()}-${Math.random()}`,
        }))
      );
    } else {
      setFields([]);
    }
  }, [group]);

  const moveField = useCallback((dragIndex, hoverIndex) => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      const [draggedItem] = newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, draggedItem);
      return newFields;
    });
  }, []);

  const handleAddNewField = () => {
    setCurrentField({
      id: null,
      type: 'text',
      label: '',
      required: false,
      placeholder: '',
    });
    setIsEditingField(true);
  };

  const handleEditField = (fieldToEdit) => {
    setCurrentField(fieldToEdit);
    setIsEditingField(true);
  };

  const handleDeleteField = (fieldId) => {
    setFields((prev) => prev.filter((f) => f.id !== fieldId));
  };

  const handleToggleRequired = (fieldId, isRequired) => {
    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, required: isRequired } : f))
    );
  };

  const handleSaveField = (fieldData) => {
    if (fieldData.id) {
      // Editing existing
      setFields((prev) =>
        prev.map((f) => (f.id === fieldData.id ? fieldData : f))
      );
    } else {
      // Adding new
      setFields((prev) => [
        ...prev,
        { ...fieldData, id: `field-${Date.now()}-${Math.random()}` },
      ]);
    }
    setIsEditingField(false);
    setCurrentField(null);
  };

  const handleSaveForm = () => {
    onSaveFormFields(group.id, fields);
    onClose();
  };

  if (!isOpen || !group) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black bg-opacity-60 p-4 sm:p-6">
        <div className="my-auto w-full max-w-2xl rounded-lg bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              Edit Form Fields for:{' '}
              <span className="text-blue-600">{group.name}</span>
            </h3>
            <button onClick={onClose} className="text-gray-500 text-gray-700">
              <X size={24} />
            </button>
          </div>

          {!isEditingField ? (
            <>
              <div className="mb-4 min-h-[200px]">
                {fields.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">
                    No form fields yet. Add your first one!
                  </p>
                ) : (
                  fields.map((field, index) => (
                    <DraggableFormField
                      key={field.id}
                      index={index}
                      field={field}
                      moveField={moveField}
                      onEdit={handleEditField}
                      onDelete={handleDeleteField}
                      onToggleRequired={handleToggleRequired}
                    />
                  ))
                )}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handleAddNewField}
                  className="flex items-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 font-medium text-white"
                >
                  <PlusCircle size={18} className="mr-2" /> Add New Field
                </button>
                <button
                  onClick={handleSaveForm}
                  className="flex items-center rounded-lg bg-green-600 bg-green-700 px-4 py-2 font-medium text-white"
                >
                  <Save size={18} className="mr-2" /> Save Form
                </button>
              </div>
            </>
          ) : (
            <FieldEditForm
              field={currentField}
              onSave={handleSaveField}
              onCancel={() => {
                setIsEditingField(false);
                setCurrentField(null);
              }}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
};

const FieldEditForm = ({ field: initialField, onSave, onCancel }) => {
  const [field, setField] = useState({
    type: 'text',
    label: '',
    required: false,
    placeholder: '',
  });

  useEffect(() => {
    if (initialField) {
      setField(initialField);
    } else {
      // Reset for new field
      setField({ type: 'text', label: '', required: false, placeholder: '' });
    }
  }, [initialField]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!field.label) return alert('Field label is required.');
    onSave(field);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-md bg-gray-50 p-4"
    >
      <h4 className="mb-3 text-lg font-medium text-gray-700">
        {field.id ? 'Edit Field' : 'Add New Field'}
      </h4>
      <div>
        <label
          htmlFor="label"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Label*
        </label>
        <input
          type="text"
          name="label"
          id="label"
          value={field.label}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="type"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Field Type
        </label>
        <select
          name="type"
          id="type"
          value={field.type}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="textarea">Text Area</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="placeholder"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Placeholder (Optional)
        </label>
        <input
          type="text"
          name="placeholder"
          id="placeholder"
          value={field.placeholder || ''}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="required"
          id="required"
          checked={field.required}
          onChange={handleChange}
          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="required" className="text-sm font-medium text-gray-700">
          Required
        </label>
      </div>
      <div className="flex justify-end space-x-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white"
        >
          <Save size={16} className="mr-2" />{' '}
          {field.id ? 'Save Changes' : 'Add Field'}
        </button>
      </div>
    </form>
  );
};

export default FormFieldEditorModal;
