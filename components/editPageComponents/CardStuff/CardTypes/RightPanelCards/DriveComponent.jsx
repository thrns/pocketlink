import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  CircleArrowOutUpRight,
  Edit,
  Link2,
  File,
  Sliders,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useItems } from '@/app/contexts/ItemsContext';
import { useAuth } from '@/app/contexts/AuthContext';

export default function DriveComponent({
  itemId,
  card,
  isEditing: initialIsEditing = false,
  isTenant,
  isMobile = false,
  isTenantHovered,
  username,
}) {
  const { user } = useAuth();
  const { updateItemContent } = useItems();

  // Basic state
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [embedCode, setEmbedCode] = useState(card?.link || '');
  const [viewMode, setViewMode] = useState(card?.viewMode || 'preview'); // preview, embed

  // Check if the current user is the owner and can edit
  const canEdit = !isTenant || (isTenant && user?.username);

  // Sync editing state with props
  useEffect(() => {
    setIsEditing(initialIsEditing);
  }, [initialIsEditing]);

  // Sync state with card props when they change
  useEffect(() => {
    if (card) {
      setEmbedCode(card.link || '');
      setViewMode(card.viewMode || 'preview');
    }
  }, [card]);

  // Handle embed code change with debounce
  const handleEmbedCodeChange = useCallback(
    (value) => {
      setEmbedCode(value);
      // Debounce the update to prevent rapid re-renders
      const timeoutId = setTimeout(() => {
        updateItemContent(itemId, {
          link: value,
          viewMode,
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    },
    [itemId, updateItemContent, viewMode]
  );

  // Handle view mode toggle
  const handleViewModeChange = useCallback(
    (newMode) => {
      setViewMode(newMode);
      updateItemContent(itemId, {
        viewMode: newMode,
      });
    },
    [itemId, updateItemContent]
  );

  // Toggle edit mode
  const toggleEditMode = useCallback((e) => {
    e.stopPropagation();
    setIsEditing((prev) => !prev);
  }, []);

  // Extract Google Drive file ID from URL or share link
  const getDriveFileInfo = useCallback((link) => {
    if (!link) return null;

    let fileId = null;
    let fileType = 'document'; // Default type

    // Match patterns for different Google Drive URL formats
    const fileRegex =
      /(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=|docs\.google\.com\/file\/d\/)([^/&?#]+)/;
    const docsRegex =
      /docs\.google\.com\/(?:document|presentation|spreadsheets|forms)\/d\/([^/&?#]+)/;
    const sharingRegex =
      /drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([^?&]+)/;

    const fileMatch = link.match(fileRegex);
    const docsMatch = link.match(docsRegex);
    const sharingMatch = link.match(sharingRegex);

    if (fileMatch) {
      fileId = fileMatch[1];
      // Try to determine file type from URL
      if (link.includes('spreadsheets')) fileType = 'spreadsheet';
      else if (link.includes('presentation')) fileType = 'presentation';
      else if (link.includes('document')) fileType = 'document';
      else if (link.includes('form')) fileType = 'form';
      else fileType = 'file'; // Generic file
    } else if (docsMatch) {
      fileId = docsMatch[1];
      if (link.includes('spreadsheets')) fileType = 'spreadsheet';
      else if (link.includes('presentation')) fileType = 'presentation';
      else if (link.includes('document')) fileType = 'document';
      else if (link.includes('forms')) fileType = 'form';
    } else if (sharingMatch) {
      fileId = sharingMatch[1];
      fileType = 'folder';
    }

    return { fileId, fileType };
  }, []);

  // Generate embed code from Google Drive file ID and type
  const generateEmbedCode = useCallback(
    (driveInfo) => {
      if (!driveInfo || !driveInfo.fileId) return '';

      const { fileId, fileType } = driveInfo;

      // Determine height based on size of card
      const isHorizontal = card?.sizeKey === 'horizontal';
      const height = isHorizontal ? 152 : isMobile ? 300 : 400;

      // Build the appropriate embed URL based on file type and view mode
      let embedUrl = '';

      // For preview mode - Google Drive Viewer
      if (viewMode === 'preview') {
        if (fileType === 'folder') {
          embedUrl = `https://drive.google.com/embeddedfolderview?id=${fileId}#list`;
        } else {
          embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        }
      }
      // For embed mode - Google Docs direct embed
      else if (viewMode === 'embed') {
        switch (fileType) {
          case 'document':
            embedUrl = `https://docs.google.com/document/d/${fileId}/embedded`;
            break;
          case 'spreadsheet':
            embedUrl = `https://docs.google.com/spreadsheets/d/${fileId}/embedded/sheet?headers=false&chrome=false`;
            break;
          case 'presentation':
            embedUrl = `https://docs.google.com/presentation/d/${fileId}/embed?start=false&loop=false&delayms=3000`;
            break;
          case 'form':
            embedUrl = `https://docs.google.com/forms/d/${fileId}/embedded`;
            break;
          case 'folder':
            embedUrl = `https://drive.google.com/embeddedfolderview?id=${fileId}#grid`;
            break;
          default:
            embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        }
      }

      return `<iframe 
      src="${embedUrl}" 
      width="100%" 
      height="${height}" 
      frameborder="0"
      allowfullscreen="true"
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
    ></iframe>`;
    },
    [viewMode, card?.sizeKey, isMobile]
  );

  // Memoize the Drive info and processed code to prevent unnecessary recalculations
  const driveInfo = useMemo(
    () => getDriveFileInfo(embedCode),
    [embedCode, getDriveFileInfo]
  );
  const processedCode = useMemo(
    () => (driveInfo?.fileId ? generateEmbedCode(driveInfo) : ''),
    [driveInfo, generateEmbedCode]
  );

  // Memoize the embed content to prevent unnecessary re-renders
  const embedContent = useMemo(() => {
    if (!processedCode) return null;
    return (
      <div
        className="h-full w-full"
        dangerouslySetInnerHTML={{ __html: processedCode }}
      />
    );
  }, [processedCode]);

  return (
    <div
      onClick={(e) => {
        if (!isEditing && canEdit && !e.target.closest('iframe')) {
          setIsEditing(true);
        }
      }}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl ${
        isEditing
          ? 'cursor-move'
          : canEdit
            ? 'cursor-pointer'
            : 'cursor-default'
      } ${isTenant ? 'bg-gray-100' : ''}`}
      style={{ background: card?.background || 'transparent' }}
    >
      {/* Google Drive embed */}
      <div className="relative h-full w-full">
        <div className="h-full w-full">
          {processedCode ? (
            embedContent
          ) : (
            <p className="text-center text-sm text-gray-500">
              {embedCode
                ? 'Invalid Google Drive URL'
                : 'No Google Drive URL provided'}
            </p>
          )}
        </div>
      </div>

      {/* Edit button */}
      {!isEditing && canEdit && (
        <div
          className={`absolute ${isMobile ? 'right-1 top-1' : 'right-2 top-2'} z-40`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={isMobile ? 'sm' : 'icon'}
                  variant="secondary"
                  onClick={toggleEditMode}
                >
                  <Edit className={isMobile ? 'h-3 w-3' : 'h-4 w-4'} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Google Drive Embed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Edit controls */}
      {isEditing && (
        <div
          className={`absolute ${isMobile ? 'right-1 top-1 flex flex-col items-end gap-1' : 'right-2 top-2 flex items-center gap-2'} z-50`}
        >
          <TooltipProvider>
            {/* Google Drive URL input */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size={isMobile ? 'sm' : 'icon'}
                      variant="secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link2 className={isMobile ? 'h-3 w-3' : 'h-4 w-4'} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className={`${isMobile ? 'w-64' : 'w-80'} p-2`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="mb-2 text-sm">Enter Google Drive URL:</p>
                    <input
                      type="text"
                      value={embedCode}
                      onChange={(e) => handleEmbedCodeChange(e.target.value)}
                      className="w-full rounded-md border p-2"
                      placeholder="https://drive.google.com/file/d/..."
                    />
                    {embedCode && (
                      <div className="mt-2 text-xs">
                        <span
                          className={
                            driveInfo?.fileId
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {driveInfo?.fileId
                            ? `✅ Valid Google Drive ${driveInfo.fileType || 'file'}`
                            : '❌ Invalid Google Drive URL'}
                        </span>
                      </div>
                    )}
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Supported formats: documents, spreadsheets,
                        presentations, forms, folders, and files
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Google Drive URL</p>
              </TooltipContent>
            </Tooltip>

            {/* Player settings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size={isMobile ? 'sm' : 'icon'}
                      variant="secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Sliders className={isMobile ? 'h-3 w-3' : 'h-4 w-4'} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className={`${isMobile ? 'w-52' : 'w-64'} p-2`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">View Mode</label>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant={
                              viewMode === 'preview' ? 'default' : 'outline'
                            }
                            onClick={() => handleViewModeChange('preview')}
                          >
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              viewMode === 'embed' ? 'default' : 'outline'
                            }
                            onClick={() => handleViewModeChange('embed')}
                          >
                            Embed
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Embed Settings</p>
              </TooltipContent>
            </Tooltip>

            {/* Done editing button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={isMobile ? 'sm' : 'icon'}
                  variant="secondary"
                  onClick={toggleEditMode}
                >
                  <Edit className={isMobile ? 'h-3 w-3' : 'h-4 w-4'} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Done Editing</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
