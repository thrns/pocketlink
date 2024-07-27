import React from 'react';
import RowBasedEditor from './RowBasedEditor';

// Legacy wrapper component for backward compatibility
const Editor = (props) => {
  return <RowBasedEditor {...props} />;
};

export default Editor;