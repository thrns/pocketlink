'use client';

import { FormBuilder } from './FormBuilder';

// Legacy Editor component - now uses FormBuilder
// This maintains backward compatibility while providing the new form builder interface

export const Editor = ({
  initialContent = '',
  onContentChange,
  className,
  card,
  themeData,
}) => {
  return (
    <FormBuilder
      initialFormData={initialContent}
      onFormChange={onContentChange}
      className={className}
      card={card}
      themeData={themeData}
    />
  );
};
