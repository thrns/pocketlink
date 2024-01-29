# BlogEditPage Refactor Documentation

## Overview
The BlogEditPage is a comprehensive rich text editor for creating and editing blog content with drag-and-drop functionality, multimedia support, and real-time formatting tools.

## Architecture

### Component Structure
```
BlogEditPage/
├── BlogEditPage.jsx (Main container)
├── BlogEditPageComponents/
│   ├── Editor.jsx (Legacy wrapper)
│   ├── RowBasedEditor.jsx (Core editor logic)
│   ├── EditorToolbar.jsx (Text formatting toolbar)
│   └── ContentInsertionMenu.jsx (Content type insertion menu)
└── BlogEditPageHooks/
    └── use-toast.js (Toast notifications)
```

## Core Features

### 1. Row-Based Content Management
- **Section Types**: text, image, code, quote, video
- **Dynamic Sections**: Add/remove sections dynamically
- **Section Navigation**: Focus management and keyboard navigation
- **Content Persistence**: Auto-save to database as JSON array

### 2. Text Editing Capabilities
- **Rich Text**: Bold, italic, underline, strikethrough
- **Headings**: H1, H2, H3 support
- **Lists**: Bulleted and numbered lists
- **Links**: Insert and edit hyperlinks
- **Text Alignment**: Left, center, right, justify
- **Font Styling**: Color picker, font size adjustment
- **Quotes**: Blockquote formatting

### 3. Multimedia Support
- **Image Upload**: File upload with Supabase storage
- **Image URL**: Insert images from external URLs
- **Video Upload**: Video file support (max 5MB)
- **Image Editing**: Resize, reposition, alignment controls
- **Drag Handles**: Visual indicators for draggable content

### 4. Drag and Drop Functionality
- **React DnD**: HTML5 backend for drag operations
- **Section Reordering**: Drag sections to reorder content
- **Visual Feedback**: Hover states and drop indicators
- **Touch Support**: Mobile-friendly drag operations

### 5. Content Insertion Menu
- **Context Menu**: Right-click or plus button activation
- **Content Types**: Text, headings, images, code, quotes, videos, lists
- **Smart Positioning**: Viewport-aware menu positioning
- **Keyboard Shortcuts**: Enter for new sections, Backspace for deletion

### 6. Real-time Formatting Toolbar
- **Text Selection**: Appears on text selection
- **Format Options**: Bold, italic, color, alignment
- **Link Creation**: URL input with validation
- **Smart Positioning**: Follows text selection

## Technical Implementation

### State Management
```javascript
// Core state structure
const [sections, setSections] = useState([]);
const [activeSectionId, setActiveSectionId] = useState(null);
const [selectedText, setSelectedText] = useState('');
const [toolbarPosition, setToolbarPosition] = useState(null);
const [showToolbar, setShowToolbar] = useState(false);
const [showInsertionMenu, setShowInsertionMenu] = useState(false);
const [insertionMenuPosition, setInsertionMenuPosition] = useState(null);
const [isUploading, setIsUploading] = useState(false);
const [selectedImageId, setSelectedImageId] = useState(null);
```

### Section Data Structure
```javascript
const sectionSchema = {
  id: 'section-{timestamp}-{random}', // Unique identifier
  type: 'text|image|code|quote|video', // Section type
  content: 'HTML content or URL', // Section content
  placeholder: 'Placeholder text', // Empty state text
  // Image-specific properties
  width: '100%', // Image width
  height: 'auto', // Image height
  position: 'none|left|center|right', // Image alignment
  // Code-specific properties
  language: 'javascript|html|css|python|etc' // Syntax highlighting
};
```

### Key Functions

#### Content Management
- `parseHTMLToSections()`: Convert legacy HTML to section array
- `generateSectionId()`: Create unique section identifiers
- `handleSectionInput()`: Update section content on input
- `handleSectionFocus()`: Manage active section state
- `insertContent()`: Add new sections at cursor position
- `deleteSection()`: Remove sections with validation

#### Drag and Drop
- `moveSection()`: Reorder sections via drag operation
- `DraggableSection`: Wrapper component with drag/drop hooks
- `useDrag()`: React DnD drag functionality
- `useDrop()`: React DnD drop target functionality

#### File Handling
- `handleFileUpload()`: Process image/video uploads
- `uploadFileToItemsData()`: Supabase storage integration
- File validation and size limits
- Progress indicators during upload

#### Text Formatting
- `applyFormatting()`: Apply rich text formatting
- `handleSelectionChange()`: Track text selection
- `insertLink()`: Insert hyperlinks with validation
- Format preservation during content updates

## Database Integration

### Data Flow
1. **Content Loading**: Parse `card.blogContent` from database
2. **Format Detection**: Support both JSON array and legacy HTML
3. **Real-time Updates**: Auto-save changes via `updateItemContent()`
4. **Storage Format**: JSON string in database for compatibility

### Context Dependencies
- **ItemsContext**: `updateItemContent()` for data persistence
- **FetcherContext**: Theme data and global state
- **AuthContext**: User authentication for uploads

### Storage Schema
```javascript
// Database storage format
{
  blogContent: JSON.stringify([
    {
      id: 'section-1',
      type: 'text',
      content: '<h1>Title</h1>',
      placeholder: 'Start writing...'
    },
    {
      id: 'section-2', 
      type: 'image',
      content: 'https://storage.url/image.jpg',
      width: '100%',
      height: 'auto',
      position: 'center'
    }
  ])
}
```

## Theme Integration

### Theme Properties
- `themeData.cardBackground`: Editor background color
- `themeData.textMode`: Light/dark text mode
- `themeData.pageBackground`: Page background
- `themeData.border`: Border colors
- `card.background`: Card-specific background
- `card.cardThemeBright`: Brightness indicator

### Dynamic Styling
- CSS-in-JS for theme-aware components
- Real-time color updates
- Responsive design patterns
- Accessibility considerations

## Error Handling

### Upload Errors
- File size validation (5MB limit for videos)
- File type validation
- Network error recovery
- User feedback via toast notifications

### Content Validation
- Empty section handling
- Malformed HTML sanitization
- URL validation for links and images
- Graceful degradation for unsupported content

### State Recovery
- Automatic content backup
- Undo/redo functionality consideration
- Session persistence
- Conflict resolution for concurrent edits

## Performance Optimizations

### Rendering Optimizations
- `useCallback()` for event handlers
- `useMemo()` for expensive calculations
- Debounced auto-save
- Virtual scrolling for large documents

### Memory Management
- Cleanup event listeners
- Image lazy loading
- Component unmounting cleanup
- File upload progress tracking

## Accessibility Features

### Keyboard Navigation
- Tab order management
- Arrow key navigation between sections
- Keyboard shortcuts for common actions
- Screen reader compatibility

### ARIA Support
- Proper labeling for interactive elements
- Role definitions for custom components
- Live regions for dynamic content updates
- Focus management

## Browser Compatibility

### Supported Features
- ContentEditable API
- Drag and Drop API
- File API for uploads
- Modern CSS features
- ES6+ JavaScript features

### Fallbacks
- Graceful degradation for older browsers
- Polyfills for missing features
- Alternative input methods
- Progressive enhancement

## Security Considerations

### Content Sanitization
- HTML input sanitization
- XSS prevention
- URL validation
- File upload security

### Data Protection
- Secure file storage
- Authentication validation
- CSRF protection
- Input validation

## Future Enhancements

### Planned Features
- Collaborative editing
- Version history
- Advanced formatting options
- Plugin architecture
- Export functionality
- SEO optimization tools

### Technical Improvements
- Performance monitoring
- Error tracking
- Analytics integration
- A/B testing framework
- Automated testing suite

## Testing Strategy

### Unit Tests
- Component rendering
- State management
- Event handling
- Utility functions

### Integration Tests
- Drag and drop functionality
- File upload process
- Database integration
- Theme switching

### E2E Tests
- Complete user workflows
- Cross-browser compatibility
- Mobile responsiveness
- Performance benchmarks

## Deployment Considerations

### Build Process
- Code splitting
- Asset optimization
- Bundle analysis
- Environment configuration

### Monitoring
- Error tracking
- Performance metrics
- User analytics
- Feature usage statistics