import React, { useState, useRef, useEffect } from 'react';

const EditorToolbar = ({ position, selectedText, onFormat, onInsertLink, onClose }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const toolbarRef = useRef(null);
  const linkInputRef = useRef(null);

  // Close toolbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Focus link input when shown
  useEffect(() => {
    if (showLinkInput && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [showLinkInput]);

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      onInsertLink(linkUrl.trim());
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const handleColorChange = (color) => {
    onFormat('foreColor', color);
    setShowColorPicker(false);
  };

  const handleFontSizeChange = (size) => {
    onFormat('fontSize', size);
    setShowFontSize(false);
  };

  const toolbarStyle = {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    transform: 'translateX(-50%)',
    backgroundColor: '#333',
    color: '#fff',
    padding: '8px',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    padding: '6px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#333',
    borderRadius: '4px',
    padding: '4px',
    marginTop: '4px',
    minWidth: '120px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div ref={toolbarRef} style={toolbarStyle}>
      {/* Bold */}
      <button
        style={buttonStyle}
        onClick={() => onFormat('bold')}
        title="Bold"
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <strong>B</strong>
      </button>

      {/* Italic */}
      <button
        style={buttonStyle}
        onClick={() => onFormat('italic')}
        title="Italic"
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <em>I</em>
      </button>

      {/* Underline */}
      <button
        style={buttonStyle}
        onClick={() => onFormat('underline')}
        title="Underline"
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <u>U</u>
      </button>

      {/* Strikethrough */}
      <button
        style={buttonStyle}
        onClick={() => onFormat('strikeThrough')}
        title="Strikethrough"
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <s>S</s>
      </button>

      {/* Separator */}
      <div style={{ width: '1px', height: '20px', backgroundColor: '#555', margin: '0 4px' }} />

      {/* Link */}
      <div style={{ position: 'relative' }}>
        <button
          style={showLinkInput ? activeButtonStyle : buttonStyle}
          onClick={() => setShowLinkInput(!showLinkInput)}
          title="Insert Link"
          onMouseEnter={(e) => !showLinkInput && (e.target.style.backgroundColor = '#555')}
          onMouseLeave={(e) => !showLinkInput && (e.target.style.backgroundColor = 'transparent')}
        >
          🔗
        </button>
        
        {showLinkInput && (
          <form onSubmit={handleLinkSubmit} style={dropdownStyle}>
            <input
              ref={linkInputRef}
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              style={{
                width: '100%',
                padding: '4px 8px',
                border: '1px solid #555',
                borderRadius: '4px',
                backgroundColor: '#444',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              <button
                type="submit"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#007bff',
                  fontSize: '12px',
                  padding: '4px 8px',
                }}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowLinkInput(false)}
                style={{
                  ...buttonStyle,
                  fontSize: '12px',
                  padding: '4px 8px',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Color Picker */}
      <div style={{ position: 'relative' }}>
        <button
          style={showColorPicker ? activeButtonStyle : buttonStyle}
          onClick={() => setShowColorPicker(!showColorPicker)}
          title="Text Color"
          onMouseEnter={(e) => !showColorPicker && (e.target.style.backgroundColor = '#555')}
          onMouseLeave={(e) => !showColorPicker && (e.target.style.backgroundColor = 'transparent')}
        >
          🎨
        </button>
        
        {showColorPicker && (
          <div style={dropdownStyle}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'].map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: color,
                    border: '1px solid #555',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Font Size */}
      <div style={{ position: 'relative' }}>
        <button
          style={showFontSize ? activeButtonStyle : buttonStyle}
          onClick={() => setShowFontSize(!showFontSize)}
          title="Font Size"
          onMouseEnter={(e) => !showFontSize && (e.target.style.backgroundColor = '#555')}
          onMouseLeave={(e) => !showFontSize && (e.target.style.backgroundColor = 'transparent')}
        >
          A
        </button>
        
        {showFontSize && (
          <div style={dropdownStyle}>
            {[1, 2, 3, 4, 5, 6, 7].map(size => (
              <button
                key={size}
                onClick={() => handleFontSizeChange(size)}
                style={{
                  ...buttonStyle,
                  width: '100%',
                  justifyContent: 'flex-start',
                  padding: '4px 8px',
                  fontSize: `${10 + size * 2}px`,
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Size {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Separator */}
      <div style={{ width: '1px', height: '20px', backgroundColor: '#555', margin: '0 4px' }} />

      {/* Alignment */}
      <button
        style={buttonStyle}
        onClick={() => onFormat('justifyLeft')}
        title="Align Left"
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        ⬅
      </button>

      <button
        style={buttonStyle}
        onClick={() => onFormat('justifyCenter')}
        title="Align Center"
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        ↔
      </button>

      <button
        style={buttonStyle}
        onClick={() => onFormat('justifyRight')}
        title="Align Right"
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        ➡
      </button>
    </div>
  );
};

export default EditorToolbar;