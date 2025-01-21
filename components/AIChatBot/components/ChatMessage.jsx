import React, { useMemo, memo, useEffect } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { TypewriterEffect } from '../TypewriterEffect';
import { ChartComponent } from '../ChartComponent';
import { createSafeChartConfig, processChartConfig } from '../chartUtils';
import isEqual from 'lodash.isequal';

const ChatMessage = memo(
  ({ message, theme = 'light', index, isLatest, isThinking }) => {
    const {
      sender,
      text,
      isRead,
      isPreview,
      isTable,
      isChart,
      chartType,
      chartConfig,
      chartUrl,
      chartHtml,
      chartHeight,
      caption,
      isAction,
      isLoading,
    } = message;

    const isUser = sender !== 'puddles';

    // Show thinking animation if this is the latest message and AI is thinking
    const showThinkingAnimation = isThinking && isLatest && !isUser;

    // Log only when this ChatMessage is truly re-rendered
    useEffect(() => {
      console.log(`🧠 Memo: Rendering ChatMessage at index ${index}`);
    }, []);

    const safeConfig = useMemo(
      () => createSafeChartConfig(chartConfig),
      [chartConfig]
    );
    const processedChartConfig = useMemo(
      () => processChartConfig(safeConfig),
      [safeConfig]
    );

    return (
      <div
        className={`flex w-full items-start gap-2 overflow-x-hidden ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        {!isUser && (
          <Avatar className="mt-1 h-8 w-8 shrink-0">
            <AvatarImage src="/AI/pocket.png" />
          </Avatar>
        )}
        <div
          className={`max-w-[75%] rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-blue-600 text-white'
              : theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-900'
          } ${isAction ? 'border-l-4 border-green-500' : ''}`}
        >
          {isUser ? (
            <div>{text}</div>
          ) : isLoading || showThinkingAnimation ? (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-gray-400"
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-gray-400"
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>
          ) : isPreview ? (
            <div className="w-full">
              <img
                src={text.match(/\(([^)]+)\)/)?.[1] || ''}
                alt="Preview"
                className="max-h-64 w-full rounded-md object-cover"
              />
            </div>
          ) : isTable ? (
            <div className="w-full overflow-x-auto">
              <div
                className={`table-wrapper ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                dangerouslySetInnerHTML={{ __html: text }}
                style={{ maxWidth: '100%' }}
              />
              <style jsx global>{`
                .table-wrapper table {
                  border-collapse: collapse;
                  width: 100%;
                  margin: 0.5rem 0;
                  font-size: 0.9rem;
                }

                .table-wrapper th,
                .table-wrapper td {
                  border: 1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'};
                  padding: 0.5rem;
                  text-align: left;
                }

                .table-wrapper th {
                  background-color: ${theme === 'dark' ? '#374151' : '#f3f4f6'};
                  font-weight: 600;
                }

                .table-wrapper tr:nth-child(even) {
                  background-color: ${theme === 'dark' ? '#1f2937' : '#f9fafb'};
                }
              `}</style>
            </div>
          ) : isChart ? (
            <div className="w-full">
              {chartConfig && (
                <div
                  className="chart-container"
                  style={{ height: chartHeight || '300px' }}
                >
                  <ChartComponent config={processedChartConfig} />
                </div>
              )}
              {!chartConfig && chartType === 'iframe' && (
                <div
                  className="w-full overflow-hidden rounded-md"
                  style={{ height: chartHeight || '300px' }}
                  dangerouslySetInnerHTML={{ __html: chartHtml }}
                />
              )}
              {!chartConfig && chartType === 'url' && (
                <iframe
                  src={chartUrl}
                  className="w-full rounded-md border-0"
                  style={{ height: chartHeight || '300px' }}
                  sandbox="allow-same-origin allow-scripts"
                  loading="lazy"
                />
              )}
              {caption && (
                <p
                  className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {caption}
                </p>
              )}
            </div>
          ) : (
            <TypewriterEffect text={text} isLatest={isLatest} />
          )}
        </div>
      </div>
    );
  }
);

// ✅ Custom memo comparator

export default React.memo(ChatMessage, (prev, next) => {
  const same =
    isEqual(prev.message, next.message) &&
    prev.theme === next.theme &&
    prev.index === next.index &&
    prev.isLatest === next.isLatest &&
    prev.isThinking === next.isThinking;

  if (!same) {
    console.log(`🔄 Memo: Rendering ChatMessage at index ${next.index}`);
  }

  return same;
});
