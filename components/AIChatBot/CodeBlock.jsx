import { Check, Copy, Moon, Sun } from 'lucide-react';
import React, { useState, useRef } from 'react';

export const CodeBlock = ({ children, className, language }) => {
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const codeRef = useRef(null);

  const copyToClipboard = () => {
    if (codeRef.current) {
      const code = codeRef.current.textContent;
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Split code into lines for line numbers
  const codeLines = children?.toString().split('\n') || [];

  return (
    <div
      className={`relative my-4 overflow-hidden rounded-md border ${darkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg`}
    >
      <div
        className={`flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} px-4 py-2`}
      >
        <div className="flex items-center space-x-2">
          <span
            className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
          >
            {language || 'code'}
          </span>
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} rounded-md p-1 text-gray-100 transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={copyToClipboard}
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-md p-1 transition-colors`}
            title="Copy code"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>
      <div
        className={`flex ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}
      >
        <div
          className={`hidden select-none px-3 py-4 text-right sm:block ${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
        >
          {codeLines.map((_, i) => (
            <div key={i} className="font-mono text-xs">
              {i + 1}
            </div>
          ))}
        </div>
        <pre
          className={`${className || ''} w-full overflow-x-auto p-4 font-mono text-sm`}
        >
          <code ref={codeRef}>{children}</code>
        </pre>
      </div>
      {copied && (
        <div className="absolute bottom-3 right-3 rounded bg-green-500 px-2 py-1 text-xs font-medium text-white">
          Copied!
        </div>
      )}
    </div>
  );
};
