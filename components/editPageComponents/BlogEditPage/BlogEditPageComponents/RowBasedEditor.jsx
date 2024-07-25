import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useFetch } from '@/app/contexts/FetcherContext.jsx';
import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';
import EditorToolbar from './EditorToolbar';
import ContentInsertionMenu from './ContentInsertionMenu';
import { useToast } from '../BlogEditPageHooks/use-toast';

const SECTION_TYPE = 'section';

// Generate unique section ID
const generateSectionId = () =>
  `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Draggable Section Component
const DraggableSection = ({
  section,
  index,
  moveSection,
  children,
  isActive,
  onFocus,
  themeData,
  onShowInsertionMenu,
}) => {
  const ref = useRef(null);
  const dragHandleRef = useRef(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: SECTION_TYPE,
    item: { id: section.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: SECTION_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  // Only attach drag to the drag handle
  drag(dragHandleRef);
  drop(ref);

  // Get theme-based colors
  const getThemeColors = () => {
    const isDarkMode = themeData?.textMode === 'light';
    return {
      borderColor: isActive ? (isDarkMode ? '#60a5fa' : '#3b82f6') : 'transparent',
      backgroundColor: isActive ? (isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)') : 'transparent',
      textColor: isDarkMode ? '#ffffff' : '#000000',
      plusButtonBg: isDarkMode ? '#374151' : '#f3f4f6',
      plusButtonHoverBg: isDarkMode ? '#4b5563' : '#e5e7eb',
      plusButtonColor: isDarkMode ? '#ffffff' : '#374151',
      dragHandleColor: isDarkMode ? '#9ca3af' : '#6b7280',
    };
  };

  const colors = getThemeColors();

  return (
    <div
      ref={preview}
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: 'relative',
        marginBottom: '1rem',
      }}
    >
      <div
        ref={ref}
        style={{
          position: 'relative',
          padding: '0.75rem',
          border: `2px solid ${colors.borderColor}`,
          borderRadius: '8px',
          backgroundColor: colors.backgroundColor,
          transition: 'all 0.2s ease-in-out',
        }}
        onClick={onFocus}
      >
        {/* Plus button - Left side */}
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowInsertionMenu(section.id, e);
            }}
            style={{
              position: 'absolute',
              left: '-12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: `1px solid ${themeData?.border || '#e5e7eb'}`,
              backgroundColor: colors.plusButtonBg,
              color: colors.plusButtonColor,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.plusButtonHoverBg;
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = colors.plusButtonBg;
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            +
          </button>
        )}

        {/* Drag Handle - Right side */}
        {isActive && (
          <div
            ref={dragHandleRef}
            style={{
              position: 'absolute',
              right: '-12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '32px',
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.dragHandleColor,
              fontSize: '12px',
              userSelect: 'none',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = themeData?.textMode === 'light' ? '#ffffff' : '#000000';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.dragHandleColor;
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ⋮⋮
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};

const RowBasedEditor = ({
  initialContent = [],
  onContentChange,
  card,
  themeData,
  className,
}) => {
  const fetchContext = useFetch();
  const { toast } = useToast();

  // Core state
  const [sections, setSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [toolbarPosition, setToolbarPosition] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showInsertionMenu, setShowInsertionMenu] = useState(false);
  const [insertionMenuPosition, setInsertionMenuPosition] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  // Initialize sections from props
  useEffect(() => {
    if (initialContent && initialContent.length > 0) {
      setSections(initialContent);
    } else {
      // Create initial empty section
      const initialSection = {
        id: generateSectionId(),
        type: 'text',
        content: '',
        placeholder: 'Start writing...',
      };
      setSections([initialSection]);
    }
  }, [initialContent]);

  // Notify parent of content changes
  useEffect(() => {
    if (sections.length > 0 && onContentChange) {
      onContentChange(sections);
    }
  }, [sections, onContentChange]);

  // Move section for drag and drop
  const moveSection = useCallback((fromIndex, toIndex) => {
    setSections((prev) => {
      const newSections = [...prev];
      const [movedSection] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, movedSection);
      return newSections;
    });
  }, []);

  // Handle section input
  const handleSectionInput = useCallback((sectionId, content) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, content } : section
      )
    );
  }, []);

  // Handle section focus
  const handleSectionFocus = useCallback((sectionId) => {
    setActiveSectionId(sectionId);
    setShowInsertionMenu(false);
    setShowToolbar(false);
  }, []);

  // Handle text selection for toolbar
  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText(selection.toString());
      setToolbarPosition({
        top: rect.top - 50,
        left: rect.left + rect.width / 2,
      });
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
      setSelectedText('');
    }
  }, []);

  // Handle key press events
  const handleKeyPress = useCallback(
    (e, sectionId) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        insertNewSection(sectionId, 'after');
      } else if (e.key === 'Backspace') {
        const section = sections.find((s) => s.id === sectionId);
        if (section && section.content === '') {
          e.preventDefault();
          deleteSection(sectionId);
        }
      }
    },
    [sections]
  );

  // Insert new section
  const insertNewSection = useCallback(
    (afterSectionId, position = 'after', type = 'text') => {
      const newSection = {
        id: generateSectionId(),
        type,
        content: '',
        placeholder: getPlaceholderForType(type),
      };

      setSections((prev) => {
        const index = prev.findIndex((s) => s.id === afterSectionId);
        const insertIndex = position === 'after' ? index + 1 : index;
        const newSections = [...prev];
        newSections.splice(insertIndex, 0, newSection);
        return newSections;
      });

      // Focus new section
      setTimeout(() => {
        setActiveSectionId(newSection.id);
        const element = document.querySelector(
          `[data-section-id="${newSection.id}"]`
        );
        if (element) {
          element.focus();
        }
      }, 0);
    },
    []
  );

  // Delete section
  const deleteSection = useCallback((sectionId) => {
    setSections((prev) => {
      if (prev.length <= 1) return prev; // Keep at least one section

      const index = prev.findIndex((s) => s.id === sectionId);
      const newSections = prev.filter((s) => s.id !== sectionId);

      // Focus previous or next section
      if (newSections.length > 0) {
        const focusIndex = Math.max(0, index - 1);
        const focusSection = newSections[focusIndex];
        setTimeout(() => {
          setActiveSectionId(focusSection.id);
          const element = document.querySelector(
            `[data-section-id="${focusSection.id}"]`
          );
          if (element) {
            element.focus();
          }
        }, 0);
      }

      return newSections;
    });
  }, []);

  // Get placeholder text for section type
  const getPlaceholderForType = (type) => {
    const placeholders = {
      text: 'Start writing...',
      image: 'Click to add an image',
      code: 'Enter your code here',
      quote: 'Enter a quote',
      video: 'Click to add a video',
    };
    return placeholders[type] || 'Enter content';
  };

  // Handle file upload
  const handleFileUpload = useCallback(
    async (file, sectionId) => {
      if (!file) return;

      // Validate file size (5MB limit for videos)
      const maxSize = file.type.startsWith('video/')
        ? 5 * 1024 * 1024
        : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(
          `File size too large. Maximum ${file.type.startsWith('video/') ? '5MB' : '10MB'} allowed.`
        );
        return;
      }

      setIsUploading(true);
      try {
        const uploadResult = await uploadFileToItemsData(file, card.id);
        if (uploadResult && uploadResult.publicUrl) {
          handleSectionInput(sectionId, uploadResult.publicUrl);
          toast.success('File uploaded successfully!');
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload file. Please try again.');
      } finally {
        setIsUploading(false);
      }
    },
    [card?.id, handleSectionInput, toast]
  );

  // Apply text formatting
  const applyFormatting = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    setShowToolbar(false);
  }, []);

  // Insert link
  const insertLink = useCallback(
    (url) => {
      if (selectedText && url) {
        const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`;
        document.execCommand('insertHTML', false, link);
        setShowToolbar(false);
      }
    },
    [selectedText]
  );

  // Show insertion menu
  const showInsertionMenuAt = useCallback((sectionId, event) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setInsertionMenuPosition({
      top: rect.bottom + 10,
      left: rect.left,
    });
    setShowInsertionMenu(true);
    setActiveSectionId(sectionId);
  }, []);

  // Render section based on type
  const renderSection = (section, index) => {
    const isActive = activeSectionId === section.id;

    return (
      <DraggableSection
        key={section.id}
        section={section}
        index={index}
        moveSection={moveSection}
        isActive={isActive}
        onFocus={() => handleSectionFocus(section.id)}
        themeData={themeData}
        onShowInsertionMenu={showInsertionMenuAt}
      >
        {section.type === 'text' && (
          <div
            data-section-id={section.id}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleSectionInput(section.id, e.target.innerHTML)}
            onFocus={() => handleSectionFocus(section.id)}
            onKeyDown={(e) => handleKeyPress(e, section.id)}
            onMouseUp={handleSelectionChange}
            onKeyUp={handleSelectionChange}
            onContextMenu={(e) => showInsertionMenuAt(section.id, e)}
            style={{
              minHeight: '1.5rem',
              padding: '0.5rem',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              lineHeight: '1.5',
              color: themeData?.textMode === 'light' ? '#ffffff' : '#000000',
            }}
            dangerouslySetInnerHTML={{ __html: section.content || '' }}
            placeholder={section.placeholder}
          />
        )}

        {section.type === 'image' && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            {section.content ? (
              <img
                src={section.content}
                alt="Uploaded content"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '4px',
                }}
                onClick={() => setSelectedImageId(section.id)}
              />
            ) : (
              <div
                style={{
                  border: `2px dashed ${themeData?.border || '#ccc'}`,
                  padding: '2rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: themeData?.textMode === 'light' ? '#ffffff' : '#666666',
                }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleFileUpload(file, section.id);
                    }
                  };
                  input.click();
                }}
              >
                {isUploading ? 'Uploading...' : section.placeholder}
              </div>
            )}
          </div>
        )}

        {section.type === 'video' && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            {section.content ? (
              <video
                src={section.content}
                controls
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '4px',
                }}
              />
            ) : (
              <div
                style={{
                  border: `2px dashed ${themeData?.border || '#ccc'}`,
                  padding: '2rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: themeData?.textMode === 'light' ? '#ffffff' : '#666666',
                }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'video/*';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleFileUpload(file, section.id);
                    }
                  };
                  input.click();
                }}
              >
                {isUploading ? 'Uploading...' : section.placeholder}
              </div>
            )}
          </div>
        )}

        {section.type === 'code' && (
          <pre
            data-section-id={section.id}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) =>
              handleSectionInput(section.id, e.target.textContent)
            }
            onFocus={() => handleSectionFocus(section.id)}
            onKeyDown={(e) => handleKeyPress(e, section.id)}
            style={{
              backgroundColor: themeData?.textMode === 'light' ? '#1f2937' : '#f5f5f5',
              color: themeData?.textMode === 'light' ? '#ffffff' : '#000000',
              padding: '1rem',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: 'none',
              outline: 'none',
              whiteSpace: 'pre-wrap',
              minHeight: '3rem',
            }}
            placeholder={section.placeholder}
          >
            {section.content}
          </pre>
        )}

        {section.type === 'quote' && (
          <blockquote
            data-section-id={section.id}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleSectionInput(section.id, e.target.innerHTML)}
            onFocus={() => handleSectionFocus(section.id)}
            onKeyDown={(e) => handleKeyPress(e, section.id)}
            style={{
              borderLeft: `4px solid ${themeData?.textMode === 'light' ? '#60a5fa' : '#3b82f6'}`,
              paddingLeft: '1rem',
              margin: '1rem 0',
              fontStyle: 'italic',
              color: themeData?.textMode === 'light' ? '#d1d5db' : '#666666',
              border: 'none',
              outline: 'none',
              minHeight: '1.5rem',
            }}
            dangerouslySetInnerHTML={{ __html: section.content || '' }}
            placeholder={section.placeholder}
          />
        )}
      </DraggableSection>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={className}
        style={{
          position: 'relative',
          padding: '2rem',
          backgroundColor: themeData?.cardBackground || '#fff',
          minHeight: '500px',
        }}
      >
        {sections.map((section, index) => renderSection(section, index))}

        {/* Editor Toolbar */}
        {showToolbar && toolbarPosition && (
          <EditorToolbar
            position={toolbarPosition}
            selectedText={selectedText}
            onFormat={applyFormatting}
            onInsertLink={insertLink}
            onClose={() => setShowToolbar(false)}
          />
        )}

        {/* Content Insertion Menu */}
        {showInsertionMenu && insertionMenuPosition && (
          <ContentInsertionMenu
            position={insertionMenuPosition}
            onInsert={(type) => {
              insertNewSection(activeSectionId, 'after', type);
              setShowInsertionMenu(false);
            }}
            onClose={() => setShowInsertionMenu(false)}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default RowBasedEditor;
