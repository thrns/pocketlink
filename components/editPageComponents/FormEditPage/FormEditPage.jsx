'use client';
import { useState, useEffect, useCallback } from 'react';
import { Editor } from './FormEditPageComponents/Editor';
import { useToast } from './FormEditPageHooks/use-toast';
import { useItems } from '@/app/contexts/ItemsContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import { cn } from '@/lib/utils';

const FormEditPage = ({ itemId, card, className }) => {
  const { updateItemContent } = useItems();
  const { theme } = useFetch();
  const [content, setContent] = useState(card?.formContent || '');

  // Get theme data similar to TextComponent
  const themeData = theme?.data;

  // Auto-save content changes
  const handleContentChange = useCallback(
    (newContent) => {
      setContent(newContent);
      if (itemId) {
        updateItemContent(itemId, { ...card, formContent: newContent });
      }
    },
    [itemId, updateItemContent, card]
  );

  return (
    <div
      className={cn(
        'min-h-screen w-full transition-all duration-200',
        className
      )}
      style={{ backgroundColor: themeData?.pageBackground }}
    >
      <main className="w-full px-4 md:px-6 lg:px-8">
        <Editor
          initialContent={content}
          onContentChange={handleContentChange}
          className="bg-editor-background shadow-soft my-8 w-full rounded-lg"
          card={card}
          themeData={themeData}
        />
      </main>
    </div>
  );
};

export default FormEditPage;
