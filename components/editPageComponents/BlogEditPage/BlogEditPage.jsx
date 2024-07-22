import React, { useState, useEffect } from 'react';
import { useItems } from '@/app/contexts/ItemsContext';
import { useFetch } from '@/app/contexts/FetcherContext.jsx';
import RowBasedEditor from './BlogEditPageComponents/RowBasedEditor';

const BlogEditPage = ({ card }) => {
  const { updateItemContent } = useItems();
  const { themeData } = useFetch();
  const [initialContent, setInitialContent] = useState([]);

  // Parse blog content from database
  useEffect(() => {
    if (card?.blogContent) {
      try {
        // Try to parse as JSON array (new format)
        const parsedContent = JSON.parse(card.blogContent);
        if (Array.isArray(parsedContent)) {
          setInitialContent(parsedContent);
        } else {
          // Fallback to single section for non-array content
          setInitialContent([{
            id: `section-${Date.now()}`,
            type: 'text',
            content: card.blogContent,
            placeholder: 'Start writing...'
          }]);
        }
      } catch (error) {
        // If JSON parsing fails, treat as HTML content (legacy format)
        setInitialContent([{
          id: `section-${Date.now()}`,
          type: 'text',
          content: card.blogContent,
          placeholder: 'Start writing...'
        }]);
      }
    } else {
      // Initialize with empty section
      setInitialContent([{
        id: `section-${Date.now()}`,
        type: 'text',
        content: '',
        placeholder: 'Start writing...'
      }]);
    }
  }, [card?.blogContent]);

  // Handle content changes and save to database
  const handleContentChange = (sections) => {
    if (updateItemContent && card?.id) {
      // Convert sections array to JSON string for database storage
      const contentString = JSON.stringify(sections);
      updateItemContent(card.id, { blogContent: contentString });
    }
  };

  return (
    <div className="blog-edit-page">
      <RowBasedEditor
        initialContent={initialContent}
        onContentChange={handleContentChange}
        card={card}
        themeData={themeData}
        className="blog-editor"
      />
    </div>
  );
};

export default BlogEditPage;