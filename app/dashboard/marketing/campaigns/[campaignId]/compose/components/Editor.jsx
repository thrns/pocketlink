'use client';

import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';

const Editor = forwardRef(({ readOnly = false, value, onChange }, ref) => {
  const containerRef = useRef(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  useLayoutEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );
    const quill = new Quill(editorContainer, {
      theme: 'snow',
      readOnly,
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        clipboard: {
          matchVisual: false,
        },
        mention: {
          allowedChars: /^[A-Za-z_]*$/,
          mentionDenotationChars: ['{{'],
          spaceAfterInsert: false,
          source: function (searchTerm, renderList, mentionChar) {
            // Update variables without id
            const variables = [
              { value: 'first_name' },
              { value: 'last_name' },
              { value: 'subscribed_date' },
            ];
            if (searchTerm.length === 0) {
              renderList(variables, searchTerm);
            } else {
              const matches = [];
              for (let i = 0; i < variables.length; i++) {
                if (
                  variables[i].value
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase()) >= 0
                ) {
                  matches.push(variables[i]);
                }
              }
              renderList(matches, searchTerm);
            }
          },
          renderItem: (item) => item.value,
          onSelect: (item, insertItem) => {
            insertItem(
              { denotationChar: '', value: '{{' + item.value + '}}' },
              true
            );
          },
        },
      },
    });

    // Set consistent height for the editor
    const editorElement = editorContainer.querySelector('.ql-editor');
    if (editorElement) {
      editorElement.style.minHeight = '350px';
      editorElement.style.height = '350px';
    }

    if (ref) ref.current = quill;

    if (valueRef.current) {
      const isHTML = /^<([a-z]+)[^>]*>[\S\s]*<\/\1>$/.test(valueRef.current);
      const contentValue = isHTML
        ? quill.clipboard.convert({ html: valueRef.current })
        : { ops: [{ insert: valueRef.current }] };
      quill.setContents(contentValue);
    }

    quill.on(Quill.events.TEXT_CHANGE, () => {
      onChangeRef.current?.(quill.root.innerHTML);
    });

    return () => {
      if (ref) ref.current = null;
      container.innerHTML = '';
    };
  }, [ref, readOnly]);

  useEffect(() => {
    const quill = ref?.current;
    if (quill && value !== quill.root.innerHTML) {
      const isHTML = /^<([a-z]+)[^>]*>[\S\s]*<\/\1>$/.test(value);
      const contentValue = isHTML
        ? quill.clipboard.convert({ html: value })
        : { ops: [{ insert: value || '' }] };
      quill.setContents(contentValue, 'silent');
    }
  }, [value, ref]);

  return (
    <div
      ref={containerRef}
      className=""
      style={{
        '& .ql-container': {
          height: 'calc(100% - 42px)',
        },
        '& .ql-editor': {
          height: '100%',
          minHeight: '350px',
        },
      }}
    />
  );
});

Editor.displayName = 'Editor';

export default Editor;
