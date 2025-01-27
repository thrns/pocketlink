import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { ChartComponent } from './ChartComponent';
import { createSafeChartConfig, processChartConfig } from './chartUtils';
/**
 * MessageContent component with comprehensive markdown formatting support
 * Handles all formatting features typical of language model outputs
 */
export const MessageContent = ({ content }) => {
  // Check if the content contains special chart JSON markers
  const hasChart = content.includes('{{CHART:');

  // Define comprehensive markdown components with both inline styles and classes
  // Using !important for critical formatting to override potential conflicts
  const markdownComponents = {
    // Code handling
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');

      if (!inline && match) {
        // Actual code blocks with language spec
        return (
          <CodeBlock language={match[1]} className={className} {...props}>
            {String(children).replace(/\n$/, '')}
          </CodeBlock>
        );
      }

      // For inline code or code blocks without language
      return (
        <code
          className={`${
            className || ''
          } rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-800`}
          style={{ fontFamily: 'monospace !important' }}
          {...props}
        >
          {children}
        </code>
      );
    },

    // Text formatting elements
    em({ node, children, ...props }) {
      return (
        <em
          className="italic"
          style={{ fontStyle: 'italic !important' }}
          {...props}
        >
          {children}
        </em>
      );
    },
    strong({ node, children, ...props }) {
      return (
        <strong
          className="font-bold"
          style={{ fontWeight: 'bold !important' }}
          {...props}
        >
          {children}
        </strong>
      );
    },
    delete({ node, children, ...props }) {
      return (
        <del
          className="line-through"
          style={{ textDecoration: 'line-through !important' }}
          {...props}
        >
          {children}
        </del>
      );
    },

    // Paragraphs and headings
    p({ node, children, ...props }) {
      return (
        <p className="my-3 text-base leading-relaxed" {...props}>
          {children}
        </p>
      );
    },
    h1({ node, children, ...props }) {
      return (
        <h1
          className="mb-4 mt-6 border-b border-gray-200 pb-2 text-3xl font-bold dark:border-gray-700"
          style={{ fontWeight: 'bold !important' }}
          {...props}
        >
          {children}
        </h1>
      );
    },
    h2({ node, children, ...props }) {
      return (
        <h2
          className="mb-3 mt-5 text-2xl font-bold"
          style={{ fontWeight: 'bold !important' }}
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3({ node, children, ...props }) {
      return (
        <h3
          className="mb-2 mt-4 text-xl font-bold"
          style={{ fontWeight: 'bold !important' }}
          {...props}
        >
          {children}
        </h3>
      );
    },
    h4({ node, children, ...props }) {
      return (
        <h4
          className="mb-2 mt-3 text-lg font-bold"
          style={{ fontWeight: 'bold !important' }}
          {...props}
        >
          {children}
        </h4>
      );
    },
    h5({ node, children, ...props }) {
      return (
        <h5
          className="mb-1 mt-3 text-base font-bold"
          style={{ fontWeight: 'bold !important' }}
          {...props}
        >
          {children}
        </h5>
      );
    },
    h6({ node, children, ...props }) {
      return (
        <h6
          className="mb-1 mt-3 text-sm font-bold"
          style={{ fontWeight: 'bold !important' }}
          {...props}
        >
          {children}
        </h6>
      );
    },

    // Lists
    ul({ node, children, depth, ordered, ...props }) {
      const listStyle = depth > 0 ? 'list-circle' : 'list-disc';
      return (
        <ul
          className={`${listStyle} my-2 py-1 pl-8`}
          style={{ listStyleType: depth > 0 ? 'circle' : 'disc' }}
          {...props}
        >
          {children}
        </ul>
      );
    },
    ol({ node, children, depth, ...props }) {
      return (
        <ol
          className="my-2 list-decimal py-1 pl-8"
          style={{ listStyleType: 'decimal' }}
          {...props}
        >
          {children}
        </ol>
      );
    },
    li({ node, children, ordered, ...props }) {
      return (
        <li className="my-1 pl-1" {...props}>
          {children}
        </li>
      );
    },

    // Links and images
    a({ node, children, href, ...props }) {
      return (
        <a
          href={href}
          className="text-black underline dark:text-white"
          style={{
            color: 'rgb(37, 99, 235) !important',
            textDecoration: 'none',
          }}
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    img({ node, src, alt, ...props }) {
      return (
        <img
          src={src}
          alt={alt || ''}
          className="my-4 h-auto max-w-full rounded"
          {...props}
        />
      );
    },

    // Blockquotes, horizontal rules, tables
    blockquote({ node, children, ...props }) {
      return (
        <blockquote
          className="my-4 border-l-4 border-gray-300 py-1 pl-4 italic text-gray-700 dark:border-gray-600 dark:text-gray-300"
          style={{
            borderLeftWidth: '4px !important',
            borderLeftColor: 'rgb(209, 213, 219) !important',
            fontStyle: 'italic !important',
          }}
          {...props}
        >
          {children}
        </blockquote>
      );
    },
    hr({ node, ...props }) {
      return (
        <hr
          className="my-6 border-t border-gray-300 dark:border-gray-700"
          style={{ borderTopWidth: '1px !important' }}
          {...props}
        />
      );
    },

    // Tables
    table({ node, children, ...props }) {
      return (
        <div className="my-6 w-full overflow-x-auto">
          <table
            className="min-w-full border-collapse divide-y divide-gray-200 dark:divide-gray-700"
            style={{ borderCollapse: 'collapse !important' }}
            {...props}
          >
            {children}
          </table>
        </div>
      );
    },
    thead({ node, children, ...props }) {
      return (
        <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
          {children}
        </thead>
      );
    },
    tbody({ node, children, ...props }) {
      return (
        <tbody
          className="divide-y divide-gray-200 dark:divide-gray-700"
          {...props}
        >
          {children}
        </tbody>
      );
    },
    tr({ node, children, isHeader, ...props }) {
      return (
        <tr
          className={isHeader ? '' : 'bg-gray-50 dark:bg-gray-800'}
          {...props}
        >
          {children}
        </tr>
      );
    },
    th({ node, children, ...props }) {
      return (
        <th
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:text-gray-300"
          style={{
            textAlign: 'left !important',
            fontWeight: '600 !important',
            borderWidth: '1px !important',
          }}
          {...props}
        >
          {children}
        </th>
      );
    },
    td({ node, children, ...props }) {
      return (
        <td
          className="border border-gray-200 px-6 py-4 text-sm dark:border-gray-700"
          style={{ borderWidth: '1px !important' }}
          {...props}
        >
          {children}
        </td>
      );
    },

    // Details/summary
    details({ node, children, ...props }) {
      return (
        <details
          className="my-3 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700"
          {...props}
        >
          {children}
        </details>
      );
    },
    summary({ node, children, ...props }) {
      return (
        <summary
          className="cursor-pointer bg-gray-100 bg-gray-50 p-2 font-medium dark:bg-gray-700 dark:bg-gray-800"
          style={{ cursor: 'pointer !important' }}
          {...props}
        >
          {children}
        </summary>
      );
    },

    // Misc elements
    pre({ node, children, ...props }) {
      // Only apply styling for pre tags that don't contain our CodeBlock
      return (
        <pre
          className="m-0 overflow-auto bg-transparent p-0"
          style={{
            background: 'transparent !important',
            padding: '0 !important',
            margin: '0 !important',
          }}
          {...props}
        >
          {children}
        </pre>
      );
    },
    sup({ node, children, ...props }) {
      return (
        <sup
          className="align-super text-xs"
          style={{
            fontSize: '0.75em !important',
            verticalAlign: 'super !important',
          }}
          {...props}
        >
          {children}
        </sup>
      );
    },
    sub({ node, children, ...props }) {
      return (
        <sub
          className="align-sub text-xs"
          style={{
            fontSize: '0.75em !important',
            verticalAlign: 'sub !important',
          }}
          {...props}
        >
          {children}
        </sub>
      );
    },
    kbd({ node, children, ...props }) {
      return (
        <kbd
          className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 text-xs font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          {...props}
        >
          {children}
        </kbd>
      );
    },
    // Additional elements for comprehensive markdown support
    input({ node, type, checked, ...props }) {
      if (type === 'checkbox') {
        return (
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            style={{ cursor: 'default' }}
            {...props}
          />
        );
      }
      return <input type={type} {...props} />;
    },

    // Math formatting - useful for scientific content
    math({ node, value, ...props }) {
      return (
        <div
          className="my-1 overflow-x-auto rounded bg-gray-50 px-2 py-1 font-mono dark:bg-gray-800"
          style={{ fontFamily: 'monospace !important' }}
          {...props}
        >
          {value}
        </div>
      );
    },
    inlineMath({ node, value, ...props }) {
      return (
        <span
          className="rounded bg-gray-50 px-1 font-mono dark:bg-gray-800"
          style={{ fontFamily: 'monospace !important' }}
          {...props}
        >
          {value}
        </span>
      );
    },

    // Additional semantic elements
    abbr({ node, title, children, ...props }) {
      return (
        <abbr
          title={title}
          className="cursor-help border-b border-dotted"
          style={{
            borderBottomStyle: 'dotted !important',
            cursor: 'help !important',
          }}
          {...props}
        >
          {children}
        </abbr>
      );
    },
    cite({ node, children, ...props }) {
      return (
        <cite
          className="italic"
          style={{ fontStyle: 'italic !important' }}
          {...props}
        >
          {children}
        </cite>
      );
    },
    mark({ node, children, ...props }) {
      return (
        <mark
          className="rounded bg-yellow-200 px-1 dark:bg-yellow-700"
          style={{ background: 'rgb(254, 240, 138) !important' }}
          {...props}
        >
          {children}
        </mark>
      );
    },
  };
  function tryFixJson(raw) {
    // Simple heuristic: count `{` vs `}`
    const open = (raw.match(/{/g) || []).length;
    const close = (raw.match(/}/g) || []).length;

    if (open > close) {
      raw += '}'.repeat(open - close); // patch missing closing braces
    }

    return raw;
  }

  // Function to render markdown content
  const renderContent = (content) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );

  // Apply preprocessor for special markdown syntax if needed
  const preprocessContent = (content) => {
    // Handle any special syntax transformations here if needed
    return content;
  };

  // Main component rendering
  if (!hasChart) {
    // Render normal markdown content
    return (
      <div
        className="max-w-none overflow-auto break-words text-base leading-normal"
        style={{ wordWrap: 'break-word !important' }}
      >
        {renderContent(preprocessContent(content))}
      </div>
    );
  } else {
    // Extract chart configurations and other content
    const parts = [];
    let lastIndex = 0;
    // Use non-greedy regex to avoid capturing across multiple chart blocks
    const chartRegex = /\{\{CHART:([\s\S]*?)\}\}/g;
    let match;

    // Process all chart markers in the content
    while ((match = chartRegex.exec(content)) !== null) {
      // Add text content before the chart
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index),
        });
      }

      // Try to parse the chart configuration with improved error handling
      try {
        const rawConfig = match[1].trim();

        // Validate JSON before passing to createSafeChartConfig
        let parsedConfig;
        try {
          const rawJson = tryFixJson(match[1].trim());
          const safeConfig = createSafeChartConfig(rawJson);

          if (safeConfig.type === 'error') {
            parts.push({
              type: 'error',
              content: `${safeConfig.title}: ${safeConfig.message}`,
            });
          } else {
            const processedConfig = processChartConfig(safeConfig);
            parts.push({
              type: 'chart',
              config: processedConfig,
            });
          }
        } catch (err) {
          parts.push({
            type: 'error',
            content: `Chart Parse Error: ${err.message}`,
          });
        }
      } catch (error) {
        console.error('Failed to process chart config:', error);
        parts.push({
          type: 'error',
          content: `Processing Error: ${error.message}`,
        });
      }

      lastIndex = match.index + match[0].length;
    }
    // Add remaining text after the last chart
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex),
      });
    }

    // Render the mixed content
    return (
      <div
        className="max-w-none overflow-auto break-words text-base leading-normal"
        style={{ wordWrap: 'break-word !important' }}
      >
        {parts.map((part, index) => {
          if (part.type === 'text') {
            return (
              <div key={`text-${index}`} className="markdown-content">
                {renderContent(preprocessContent(part.content))}
              </div>
            );
          } else if (part.type === 'chart') {
            return (
              <div key={`chart-${index}`} className="my-4 h-80 w-full">
                <ChartComponent config={part.config} />
              </div>
            );
          } else {
            return (
              <div
                key={`error-${index}`}
                className="my-2 rounded border border-red-300 p-2 text-red-500"
              >
                {part.content}
              </div>
            );
          }
        })}
      </div>
    );
  }
};
