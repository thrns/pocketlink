import React, { useRef, useEffect } from 'react';

const ContentInsertionMenu = ({ position, onInsert, onClose }) => {
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const menuStyle = {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    padding: '8px',
    minWidth: '200px',
    maxHeight: '300px',
    overflowY: 'auto',
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    cursor: 'pointer',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#333',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
    transition: 'background-color 0.2s',
  };

  const menuItems = [
    {
      type: 'text',
      icon: '📝',
      label: 'Text',
      description: 'Add a text paragraph'
    },
    {
      type: 'heading1',
      icon: 'H1',
      label: 'Heading 1',
      description: 'Large section heading'
    },
    {
      type: 'heading2',
      icon: 'H2',
      label: 'Heading 2',
      description: 'Medium section heading'
    },
    {
      type: 'heading3',
      icon: 'H3',
      label: 'Heading 3',
      description: 'Small section heading'
    },
    {
      type: 'image',
      icon: '🖼️',
      label: 'Image',
      description: 'Upload or embed an image'
    },
    {
      type: 'code',
      icon: '💻',
      label: 'Code Block',
      description: 'Add a code snippet'
    },
    {
      type: 'quote',
      icon: '💬',
      label: 'Quote',
      description: 'Add a blockquote'
    },
    {
      type: 'video',
      icon: '🎥',
      label: 'Video',
      description: 'Upload a video file'
    },
    {
      type: 'bulleted-list',
      icon: '•',
      label: 'Bulleted List',
      description: 'Create a bulleted list'
    },
    {
      type: 'numbered-list',
      icon: '1.',
      label: 'Numbered List',
      description: 'Create a numbered list'
    },
  ];

  const handleItemClick = (type) => {
    // Convert heading types to text with appropriate HTML
    if (type.startsWith('heading')) {
      const level = type.charAt(type.length - 1);
      onInsert('text', `<h${level}>Heading ${level}</h${level}>`);
    } else if (type === 'bulleted-list') {
      onInsert('text', '<ul><li>List item</li></ul>');
    } else if (type === 'numbered-list') {
      onInsert('text', '<ol><li>List item</li></ol>');
    } else {
      onInsert(type);
    }
  };

  return (
    <div ref={menuRef} style={menuStyle}>
      <div style={{ 
        fontSize: '12px', 
        color: '#666', 
        padding: '8px 16px 12px', 
        borderBottom: '1px solid #eee',
        marginBottom: '4px'
      }}>
        Add content
      </div>
      
      {menuItems.map((item) => (
        <button
          key={item.type}
          style={menuItemStyle}
          onClick={() => handleItemClick(item.type)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <span style={{ 
            fontSize: '16px', 
            minWidth: '20px',
            fontWeight: item.type.startsWith('heading') ? 'bold' : 'normal'
          }}>
            {item.icon}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '500', marginBottom: '2px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {item.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ContentInsertionMenu;