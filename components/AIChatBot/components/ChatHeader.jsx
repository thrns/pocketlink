import React from 'react';
import {
  Maximize2,
  Minimize2,
  X,
  Settings,
  Layers,
  Sun,
  Moon,
} from 'lucide-react';
import { SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

/**
 * Component for the chat header with controls
 */
const ChatHeader = ({
  fullScreenMode,
  theme,
  onToggleFullScreen,
  onToggleTheme,
}) => {
  return (
    <SheetHeader
      className={`flex w-full flex-row items-center justify-between gap-3 border-b pb-2 ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={'/AI/pocket.png'} />
        </Avatar>
        <div className="flex flex-col">
          <SheetTitle className="text-xl font-bold">Pocket</SheetTitle>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleFullScreen}
          className={`rounded-full p-2 ${
            theme === 'dark'
              ? 'bg-gray-700 bg-gray-800 text-white'
              : 'bg-gray-100 bg-gray-200 text-gray-800'
          }`}
          aria-label={fullScreenMode ? 'Collapse chat' : 'Expand chat'}
        >
          {fullScreenMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
    </SheetHeader>
  );
};

export default ChatHeader;
