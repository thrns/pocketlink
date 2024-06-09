// components/CardStuff/CardActions.js
import React, { useContext, useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useItems } from '@/app/contexts/ItemsContext';
import {
  Edit2Icon,
  SaveIcon,
  TrashIcon,
  Scale3D,
  SunIcon,
  MoonIcon,
  Droplet,
  Paintbrush2,
  AlignCenterHorizontal,
  AlignCenter,
  AlignStartHorizontal,
  AlignEndHorizontal,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
  AlignJustify,
  Type,
  Strikethrough,
  LockIcon,
} from 'lucide-react';
import {
  IoColorFill,
  IoColorPalette,
  IoImage,
  IoVideocam,
  IoSettingsSharp,
  IoTextSharp,
  IoText,
} from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import { deleteFileFromSupabase } from '@/lib/helpers/supabaseDeleteFileFromStorageHelpers';
import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';
import { useAuth } from '@/app/contexts/AuthContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { FEATURES } from '@/constants/features';

export default function CardActions({
  cardId,
  isEditing,
  toggleEdit,
  isMobile,
  themeData,
  inSidePanel = false, // New prop to determine if this is being rendered in the side panel
}) {
  // ======================= HOOKS ======================= //
  const { items, mobileItems } = useFetch();

  const { updateItemContent } = useItems();

  const { user } = useAuth();
  const { canAccessFeature } = useSubscription();

  // ======================= CONSTANTS ======================= //

  let card;
  if (isMobile) {
    card = mobileItems.find((item) => item.i === cardId);
  } else {
    card = items.find((item) => item.i === cardId);
  }

  const cardType = card?.type || 'unknown';

  // Feature-based access control for customization features
  const hasAccess = canAccessFeature(FEATURES.CUSTOM_THEMES);

  // Available font families
  const fontOptions = [
    { value: 'var(--font-onest), sans-serif', label: 'Onest' },
    { value: "'Roboto', sans-serif", label: 'Roboto' },
    { value: "'Montserrat', sans-serif", label: 'Montserrat' },
    { value: "'Playfair Display', serif", label: 'Playfair Display' },
    { value: "'Oswald', sans-serif", label: 'Oswald' },
    { value: "'Lato', sans-serif", label: 'Lato' },
    { value: "'Raleway', sans-serif", label: 'Raleway' },
    { value: "'Source Sans Pro', sans-serif", label: 'Source Sans Pro' },
    { value: "'Inter', sans-serif", label: 'Inter' },
    { value: "'Nunito', sans-serif", label: 'Nunito' },
    { value: "'Ubuntu', sans-serif", label: 'Ubuntu' },
    { value: "'Merriweather', serif", label: 'Merriweather' },
    { value: "'Playfair Display', serif", label: 'Playfair Display' },
    { value: "'Georgia', serif", label: 'Georgia' },
    { value: "'Garamond', serif", label: 'Garamond' },
    { value: "'Times New Roman', serif", label: 'Times New Roman' },
    { value: "'Arial', sans-serif", label: 'Arial' },
    { value: "'Verdana', sans-serif", label: 'Verdana' },
    { value: "'Tahoma', sans-serif", label: 'Tahoma' },
    { value: "'Trebuchet MS', sans-serif", label: 'Trebuchet MS' },
    { value: "'Roboto Mono', monospace", label: 'Roboto Mono' },
    { value: "'Courier New', monospace", label: 'Courier New' },
    { value: "'Courier', monospace", label: 'Courier' },
    { value: "'Dancing Script', cursive", label: 'Dancing Script' },
    { value: "'Pacifico', cursive", label: 'Pacifico' },
    { value: "'Bebas Neue', cursive", label: 'Bebas Neue' },
    { value: "'Abril Fatface', display", label: 'Abril Fatface' },
    { value: "'Lobster', cursive", label: 'Lobster' },
    { value: "'Caveat', cursive", label: 'Caveat' },
    { value: "'Shadows Into Light', cursive", label: 'Shadows Into Light' },
    { value: "'Permanent Marker', cursive", label: 'Permanent Marker' },
    { value: "'Satisfy', cursive", label: 'Satisfy' },
    { value: "'Russo One', sans-serif", label: 'Russo One' },
    { value: "'Comfortaa', cursive", label: 'Comfortaa' },
    { value: "'Quicksand', sans-serif", label: 'Quicksand' },
    { value: "'Indie Flower', cursive", label: 'Indie Flower' },
    { value: "'Fredoka One', cursive", label: 'Fredoka One' },
    { value: "'Righteous', cursive", label: 'Righteous' },
    { value: "'Sacramento', cursive", label: 'Sacramento' },
    { value: "'Architects Daughter', cursive", label: 'Architects Daughter' },
    { value: "'Amatic SC', cursive", label: 'Amatic SC' },
    { value: "'Bangers', cursive", label: 'Bangers' },
    { value: "'Creepster', cursive", label: 'Creepster' },
    { value: "'Monoton', cursive", label: 'Monoton' },
    { value: "'Press Start 2P', cursive", label: 'Press Start 2P' },
    { value: "'Special Elite', cursive", label: 'Special Elite' },
    { value: "'Instrument Serif', serif", label: 'Instrument Serif' },
  ];

  // ======================= STATE ======================= //

  // Local state for color, gradient, image, and video inputs
  const [color1, setColor1] = useState('#ffffff');
  const [color2, setColor2] = useState('#000000');
  const [img, setImg] = useState('');
  const [cardThemeBright, setCardThemeBright] = useState(
    card?.background
      ? card.cardThemeBright
      : themeData?.textMode === 'dark'
        ? false
        : true
  );
  const [background, setBackground] = useState('');
  const [uploading, setUploading] = useState(false);
  const [bgFit, setBgFit] = useState(card?.bgFit || 'cover');
  const [bgPosition, setBgPosition] = useState(card?.bgPosition || 'center');

  // Text formatting state
  const [textAlign, setTextAlign] = useState(card?.textAlign || 'left');
  const [textSize, setTextSize] = useState(
    card?.textSize || (cardType === 'section title' ? 'xl' : 'md')
  );
  const [fontWeight, setFontWeight] = useState(
    card?.fontWeight || (cardType === 'section title' ? 'bold' : 'normal')
  );
  const [verticalAlign, setVerticalAlign] = useState(
    card?.verticalAlign || 'center'
  );
  const [fontStyle, setFontStyle] = useState(card?.fontStyle || 'normal');
  const [textDecoration, setTextDecoration] = useState(
    card?.textDecoration || 'none'
  );
  const [fontFamily, setFontFamily] = useState(
    card?.fontFamily || 'var(--font-onest), sans-serif'
  );

  // ======================= DELETE CARD (FIREBASE STORAGE CLEANUP INCLUDED) ======================= //

  const handleSave = (newBackground) => {
    updateItemContent(cardId, { background: newBackground });
  };

  const handleThemeToggle = (newTheme) => {
    updateItemContent(cardId, { cardThemeBright: newTheme });
  };

  const handleBgFitChange = (newFit) => {
    updateItemContent(cardId, { bgFit: newFit });
    setBgFit(newFit);
  };

  const handleBgPositionChange = (newPosition) => {
    updateItemContent(cardId, { bgPosition: newPosition });
    setBgPosition(newPosition);
  };

  // Text formatting handlers
  const handleTextAlignChange = (newAlign) => {
    updateItemContent(cardId, { textAlign: newAlign });
    setTextAlign(newAlign);
  };

  const handleTextSizeChange = (newSize) => {
    updateItemContent(cardId, { textSize: newSize });
    setTextSize(newSize);
  };

  const handleFontWeightChange = (newWeight) => {
    updateItemContent(cardId, { fontWeight: newWeight });
    setFontWeight(newWeight);
  };

  const handleVerticalAlignChange = (newAlign) => {
    updateItemContent(cardId, { verticalAlign: newAlign });
    setVerticalAlign(newAlign);
  };

  const handleFontStyleChange = (newStyle) => {
    updateItemContent(cardId, { fontStyle: newStyle });
    setFontStyle(newStyle);
  };

  const handleTextDecorationChange = (newDecoration) => {
    updateItemContent(cardId, { textDecoration: newDecoration });
    setTextDecoration(newDecoration);
  };

  const handleFontFamilyChange = (newFamily) => {
    updateItemContent(cardId, { fontFamily: newFamily });
    setFontFamily(newFamily);
  };

  // ======================= APPLY BACKGROUND ======================= //

  const applyBackground = (type) => {
    if (!hasAccess) return;

    switch (type) {
      case 'color':
        setBackground(color1);
        handleSave(color1);
        break;
      case 'gradient':
        const gradient = `linear-gradient(to bottom, ${color1}, ${color2})`;
        setBackground(gradient);
        handleSave(gradient);
        break;
      case 'image':
        const imageUrl = `url(${img})`;
        setBackground(imageUrl);
        handleSave(imageUrl);
        break;
      default:
        break;
    }
  };

  // ======================= UPLOAD IMAGE ======================= //

  const handleImageUpload = async (event) => {
    if (!hasAccess) return;

    const file = event.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        const imageUrl = await uploadFileToItemsData(user?.username, file);
        setImg(imageUrl);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  };

  // Counter Card specific handlers
  const handleCounterValueChange = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateItemContent(cardId, { targetValue: numValue });
    }
  };

  const handleCounterStartValueChange = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateItemContent(cardId, { startValue: numValue });
    }
  };

  const handleCounterDirectionChange = (value) => {
    updateItemContent(cardId, { direction: value });
  };

  const handleCounterDecimalPlacesChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      updateItemContent(cardId, { decimalPlaces: numValue });
    }
  };

  const handleCounterDelayChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      updateItemContent(cardId, { delay: numValue });
    }
  };

  const handleCounterDurationChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 500) {
      updateItemContent(cardId, { duration: numValue });
    }
  };

  const handleCounterAutoRestartChange = (checked) => {
    updateItemContent(cardId, { autoRestart: checked });
  };

  const handleCounterRestartIntervalChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateItemContent(cardId, { restartInterval: numValue });
    }
  };

  // If we're rendering in the side panel, use the enhanced layout
  if (inSidePanel) {
    return (
      <div className="space-y-6 p-4">
        {/* Background Settings */}
        {['text'].includes(cardType) && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Background</h3>

            <div className="space-y-4">
              {/* Background Color */}
              <div className="space-y-3">
                <Label className="text-xs">Background Color</Label>
                
                {/* Quick Color Options */}
                <div className="space-y-2">
                  <div className="grid grid-cols-8 gap-2">
                    {[
                      '#ffffff', '#d1d5db', '#6b7280', '#374151',
                      '#1f2937', '#111827', '#000000', '#8b4513',
                      '#ff0000', '#ff4500', '#ffa500', '#ffff00',
                      '#9acd32', '#00ff00', '#00ffff', '#0000ff'
                    ].map((color) => (
                      <button
                        key={color}
                        className="h-8 w-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          if (!hasAccess) return;
                          setColor1(color);
                          setBackground(color);
                          handleSave(color);
                        }}
                        disabled={!hasAccess}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom Color Picker */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Custom Color</div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                        style={{
                          background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                          padding: '2px'
                        }}
                        disabled={!hasAccess}
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => applyBackground('color')}
                      disabled={!hasAccess}
                      className="flex-1"
                    >
                      Apply Custom
                    </Button>
                  </div>
                </div>

                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Gradient */}
              <div className="space-y-3">
                
                {/* Quick Gradient Options */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Quick Gradients</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Sunset', gradient: 'linear-gradient(135deg, #ff6b6b, #feca57)' },
                      { name: 'Ocean', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
                      { name: 'Forest', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' },
                      { name: 'Purple', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
                      { name: 'Pink', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
                      { name: 'Blue', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
                      { name: 'Orange', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
                      { name: 'Green', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
                      { name: 'Dark', gradient: 'linear-gradient(135deg, #2c3e50, #4a6741)' }
                    ].map((item) => (
                      <button
                        key={item.name}
                        className="h-12 w-full rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors relative overflow-hidden"
                        style={{ background: item.gradient }}
                        onClick={() => {
                          if (!hasAccess) return;
                          setBackground(item.gradient);
                          handleSave(item.gradient);
                        }}
                        disabled={!hasAccess}
                        title={item.name}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                          <span className="text-xs text-white font-medium opacity-0 hover:opacity-100 transition-opacity">
                            {item.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Gradient */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Custom Gradient</div>
                  <div className="mb-2 grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="h-8 w-full cursor-pointer rounded border p-1"
                        disabled={!hasAccess}
                      />
                    </div>
                    <div>
                      <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="h-8 w-full cursor-pointer rounded border p-1"
                        disabled={!hasAccess}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => applyBackground('gradient')}
                    disabled={!hasAccess}
                  >
                    Apply Custom Gradient
                  </Button>
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Background Image */}
              {/* <div className="space-y-2">
                <Label className="text-xs">Background Image</Label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs"
                    disabled={uploading || !hasAccess}
                  />
                  {img && (
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 overflow-hidden rounded bg-gray-100">
                        <img
                          src={img}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button
                        size="sm"
                        onClick={() => applyBackground('image')}
                        disabled={uploading || !hasAccess}
                      >
                        {uploading ? 'Uploading...' : 'Apply Image'}
                      </Button>
                    </div>
                  )}
                  {!hasAccess && (
                    <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                      <LockIcon className="h-4 w-4" />
                      Premium feature
                    </p>
                  )}
                </div>
              </div> */}

              {/* Theme Toggle */}
              {card?.background && (
                <div className="space-y-2">
                  <Label className="text-xs">Text Theme</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant={cardThemeBright ? 'outline' : 'default'}
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        if (!hasAccess) return;
                        setCardThemeBright(false);
                        handleThemeToggle(false);
                      }}
                      disabled={!hasAccess}
                    >
                      <MoonIcon className="mr-2 h-4 w-4" />
                      Dark Text
                    </Button>
                    <Button
                      variant={cardThemeBright ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        if (!hasAccess) return;
                        setCardThemeBright(true);
                        handleThemeToggle(true);
                      }}
                      disabled={!hasAccess}
                    >
                      <SunIcon className="mr-2 h-4 w-4" />
                      Light Text
                    </Button>
                  </div>
                  {!hasAccess && (
                    <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                      <LockIcon className="h-4 w-4" />
                      Premium feature
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Text Formatting Options */}
        {['text', 'section title'].includes(cardType) && (
          <div className="space-y-4">
            <Separator />
            <h3 className="text-sm font-medium">Text Formatting</h3>

            <div className="space-y-4">
              {/* Font Family */}
              <div className="space-y-2">
                <Label className="text-xs">Font Family</Label>
                <Select
                  value={fontFamily}
                  onValueChange={handleFontFamilyChange}
                  disabled={!hasAccess}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>
                          {font.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Text Size */}
              <div className="space-y-2">
                <Label className="text-xs">Text Size</Label>
                <div className="grid grid-cols-3 gap-2">
                  {cardType === 'text'
                    ? ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
                        <Button
                          key={size}
                          variant={textSize === size ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleTextSizeChange(size)}
                          disabled={!hasAccess}
                          className="text-xs capitalize"
                        >
                          {size}
                        </Button>
                      ))
                    : ['md', 'lg', 'xl', '2xl', '3xl', '4xl'].map((size) => (
                        <Button
                          key={size}
                          variant={textSize === size ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleTextSizeChange(size)}
                          disabled={!hasAccess}
                          className="text-xs capitalize"
                        >
                          {size}
                        </Button>
                      ))}
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Text Styles */}
              <div className="space-y-2">
                <Label className="text-xs">Text Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Bold toggle */}
                  <Button
                    variant={fontWeight === 'bold' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() =>
                      handleFontWeightChange(
                        fontWeight === 'bold' ? 'normal' : 'bold'
                      )
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>

                  {/* Italic toggle */}
                  <Button
                    variant={fontStyle === 'italic' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() =>
                      handleFontStyleChange(
                        fontStyle === 'italic' ? 'normal' : 'italic'
                      )
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>

                  {/* Strikethrough toggle */}
                  <Button
                    variant={
                      textDecoration === 'line-through' ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      handleTextDecorationChange(
                        textDecoration === 'line-through'
                          ? 'none'
                          : 'line-through'
                      )
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Strikethrough"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Text Alignment */}
              <div className="space-y-2">
                <Label className="text-xs">Text Alignment</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'left', icon: <AlignLeft className="h-4 w-4" /> },
                    {
                      value: 'center',
                      icon: <AlignCenter className="h-4 w-4" />,
                    },
                    {
                      value: 'right',
                      icon: <AlignRight className="h-4 w-4" />,
                    },
                    {
                      value: 'justify',
                      icon: <AlignJustify className="h-4 w-4" />,
                    },
                  ].map(({ value, icon }) => (
                    <Button
                      key={value}
                      variant={textAlign === value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTextAlignChange(value)}
                      disabled={!hasAccess}
                      className="text-xs"
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Vertical Alignment */}
              <div className="space-y-2">
                <Label className="text-xs">Vertical Alignment</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      value: 'top',
                      icon: <AlignStartHorizontal className="h-4 w-4" />,
                    },
                    {
                      value: 'center',
                      icon: <AlignCenterHorizontal className="h-4 w-4" />,
                    },
                    {
                      value: 'bottom',
                      icon: <AlignEndHorizontal className="h-4 w-4" />,
                    },
                  ].map(({ value, icon }) => (
                    <Button
                      key={value}
                      variant={verticalAlign === value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleVerticalAlignChange(value)}
                      disabled={!hasAccess}
                      className="text-xs"
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image/Video Card Styling Options */}
        {['image', 'video', 'bannerCard'].includes(cardType) && (
          <div className="space-y-4 p-4">
            <h3 className="text-sm font-medium">Media Display</h3>

            <div className="space-y-4">
              {/* Fit options */}
              <div className="space-y-2">
                <Label className="text-xs">Image Fit</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['cover', 'contain', 'fill', 'none'].map((fit) => (
                    <Button
                      key={fit}
                      variant={bgFit === fit ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleBgFitChange(fit)}
                      disabled={!hasAccess}
                      className="text-xs capitalize"
                    >
                      {fit}
                    </Button>
                  ))}
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Position options */}
              <div className="space-y-2">
                <Label className="text-xs">Image Position</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['top', 'center', 'bottom'].map((pos) => (
                    <Button
                      key={pos}
                      variant={bgPosition === pos ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleBgPositionChange(pos)}
                      disabled={!hasAccess}
                      className="text-xs capitalize"
                    >
                      {pos}
                    </Button>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {['left', 'center', 'right'].map((pos) => (
                    <Button
                      key={pos}
                      variant={bgPosition.includes(pos) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        // Keep vertical position, change horizontal
                        const vertical = bgPosition.split(' ')[0] || 'center';
                        handleBgPositionChange(`${vertical} ${pos}`);
                      }}
                      disabled={!hasAccess}
                      className="text-xs capitalize"
                    >
                      {pos}
                    </Button>
                  ))}
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Counter Card Styling Options */}
        {cardType === 'counterCard' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Counter Card Styling</h3>

            <div className="space-y-4">
              {/* Font Family */}
              <div className="space-y-2">
                <Label className="text-xs">Font Family</Label>
                <Select
                  value={card?.fontFamily || 'var(--font-onest), sans-serif'}
                  onValueChange={(value) =>
                    updateItemContent(cardId, { fontFamily: value })
                  }
                  disabled={!hasAccess}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>
                          {font.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Text Styles */}
              <div className="space-y-2">
                <Label className="text-xs">Text Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Bold toggle */}
                  <Button
                    variant={
                      (card?.fontWeight || 'normal') === 'bold'
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      updateItemContent(cardId, {
                        fontWeight:
                          (card?.fontWeight || 'normal') === 'bold'
                            ? 'normal'
                            : 'bold',
                      })
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>

                  {/* Italic toggle */}
                  <Button
                    variant={
                      (card?.fontStyle || 'normal') === 'italic'
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      updateItemContent(cardId, {
                        fontStyle:
                          (card?.fontStyle || 'normal') === 'italic'
                            ? 'normal'
                            : 'italic',
                      })
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>

                  {/* Strikethrough toggle */}
                  <Button
                    variant={
                      (card?.textDecoration || 'none') === 'line-through'
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      updateItemContent(cardId, {
                        textDecoration:
                          (card?.textDecoration || 'none') === 'line-through'
                            ? 'none'
                            : 'line-through',
                      })
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Strikethrough"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Text Alignment */}
              <div className="space-y-2">
                <Label className="text-xs">Text Alignment</Label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Left alignment */}
                  <Button
                    variant={
                      (card?.textAlign || 'center') === 'left'
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      updateItemContent(cardId, { textAlign: 'left' })
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Align Left"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>

                  {/* Center alignment */}
                  <Button
                    variant={
                      (card?.textAlign || 'center') === 'center'
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      updateItemContent(cardId, { textAlign: 'center' })
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Align Center"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>

                  {/* Right alignment */}
                  <Button
                    variant={
                      (card?.textAlign || 'center') === 'right'
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      updateItemContent(cardId, { textAlign: 'right' })
                    }
                    disabled={!hasAccess}
                    className="text-xs"
                    title="Align Right"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Custom Background Color */}
              <div className="space-y-2">
                <Label className="text-xs">Custom Background Color</Label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={card?.background || '#ffffff'}
                    onChange={(e) =>
                      updateItemContent(cardId, { background: e.target.value })
                    }
                    className="h-8 w-full cursor-pointer rounded border p-1"
                    disabled={!hasAccess}
                  />
                  <div
                    className="h-8 w-8 rounded-md border"
                    style={{
                      background: card?.background || themeData?.cardBackground,
                    }}
                  />
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>

              {/* Custom Text Color */}
              <div className="space-y-2">
                <Label className="text-xs">Custom Text Color</Label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={card?.textColor || '#000000'}
                    onChange={(e) =>
                      updateItemContent(cardId, { textColor: e.target.value })
                    }
                    className="h-8 w-full cursor-pointer rounded border p-1"
                    disabled={!hasAccess}
                  />
                  <div
                    className="h-8 w-8 rounded-md border"
                    style={{
                      background:
                        card?.textColor ||
                        (themeData?.textMode === 'dark' ? 'black' : 'white'),
                    }}
                  />
                </div>
                {!hasAccess && (
                  <p className="flex w-full items-center justify-start gap-2 text-xs text-amber-500">
                    <LockIcon className="h-4 w-4" />
                    Premium feature
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Original implementation for non-side panel use
  return (
    <div
      className="z-50 flex items-center space-x-2"
      onClick={(e) => e.stopPropagation()} // Prevent click propagation
    >
      {/* Background picker */}
      {isEditing && ['text'].includes(cardType) && (
        <>
          {/*CARD THEME */}
          <div
            data-tooltip-id="toggle-theme-tooltip"
            data-tooltip-content={
              !hasAccess
                ? 'Premium Only'
                : !card?.background
                  ? 'Only allowed when background is selected'
                  : 'Toggle Theme'
            }
          >
            <Button
              variant="default"
              disabled={!hasAccess || !card?.background}
              size="sm"
              onClick={(e) => {
                if (!hasAccess) return;
                setCardThemeBright(!cardThemeBright);
                handleThemeToggle(!cardThemeBright);
              }}
              className="flex items-center space-x-2"
            >
              {cardThemeBright ? <SunIcon /> : <MoonIcon />}
            </Button>
            <Tooltip id="toggle-theme-tooltip" place="top" effect="solid" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div
                data-tooltip-id="background-tooltip"
                data-tooltip-content={
                  !hasAccess ? 'Premium Only' : 'Change Background'
                }
              >
                <Button variant="secondary" size="sm" disabled={!hasAccess}>
                  <Paintbrush2 />
                </Button>
                <Tooltip id="background-tooltip" place="top" effect="solid" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto space-x-2 p-4">
              {/* Color Picker Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    data-tooltip-id="color-picker-tooltip"
                    data-tooltip-content={
                      !hasAccess ? 'Premium Only' : 'Pick Color'
                    }
                  >
                    <Button variant="secondary" size="sm" disabled={!hasAccess}>
                      <IoColorPalette />
                    </Button>
                    <Tooltip
                      id="color-picker-tooltip"
                      place="top"
                      effect="solid"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="flex w-48 flex-col space-y-2 p-4">
                  <label className="text-sm font-medium">Pick a Color</label>
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="rounded border border-gray-300"
                    disabled={!hasAccess}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => applyBackground('color')}
                    disabled={!hasAccess}
                  >
                    Apply
                  </Button>
                </PopoverContent>
              </Popover>

              {/* Gradient Picker Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    data-tooltip-id="gradient-picker-tooltip"
                    data-tooltip-content={
                      !hasAccess ? 'Premium Only' : 'Pick Gradient'
                    }
                  >
                    <Button variant="secondary" size="sm" disabled={!hasAccess}>
                      <Scale3D className="text-lg" />
                    </Button>
                    <Tooltip
                      id="gradient-picker-tooltip"
                      place="top"
                      effect="solid"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="flex w-48 flex-col space-y-2 p-4">
                  <label className="text-sm font-medium">Gradient Colors</label>
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="rounded border border-gray-300"
                    disabled={!hasAccess}
                  />
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="rounded border border-gray-300"
                    disabled={!hasAccess}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => applyBackground('gradient')}
                    disabled={!hasAccess}
                  >
                    Apply
                  </Button>
                </PopoverContent>
              </Popover>

              {/* Image Picker Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    data-tooltip-id="image-picker-tooltip"
                    data-tooltip-content={
                      !hasAccess ? 'Premium Only' : 'Upload Image'
                    }
                  >
                    <Button variant="secondary" size="sm" disabled={!hasAccess}>
                      <IoImage />
                    </Button>
                    <Tooltip
                      id="image-picker-tooltip"
                      place="top"
                      effect="solid"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="flex w-48 flex-col space-y-2 p-4">
                  <label className="text-sm font-medium">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="rounded border border-gray-300 p-1"
                    disabled={uploading || !hasAccess} // Disable input while uploading or not premium
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => applyBackground('image')}
                    disabled={uploading || !hasAccess} // Disable button while uploading or not premium
                  >
                    {uploading ? 'Uploading...' : 'Apply'}
                  </Button>
                </PopoverContent>
              </Popover>

              {/* Image Styling Options */}
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    data-tooltip-id="image-options-tooltip"
                    data-tooltip-content={
                      !hasAccess ? 'Premium Only' : 'Image Options'
                    }
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={
                        !hasAccess || !card?.background?.includes('url(')
                      }
                    >
                      <IoSettingsSharp />
                    </Button>
                    <Tooltip
                      id="image-options-tooltip"
                      place="top"
                      effect="solid"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="flex w-60 flex-col space-y-4 p-4">
                  {/* Fit options */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Image Fit
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['cover', 'contain', 'fill', 'none'].map((fit) => (
                        <Button
                          key={fit}
                          variant={bgFit === fit ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleBgFitChange(fit)}
                          disabled={!hasAccess}
                          className="text-xs capitalize"
                        >
                          {fit}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Position options */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Image Position
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['top', 'center', 'bottom'].map((pos) => (
                        <Button
                          key={pos}
                          variant={bgPosition === pos ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleBgPositionChange(pos)}
                          disabled={!hasAccess}
                          className="text-xs capitalize"
                        >
                          {pos}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {['left', 'center', 'right'].map((pos) => (
                        <Button
                          key={pos}
                          variant={
                            bgPosition.includes(pos) ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => {
                            // Keep vertical position, change horizontal
                            const vertical =
                              bgPosition.split(' ')[0] || 'center';
                            handleBgPositionChange(`${vertical} ${pos}`);
                          }}
                          disabled={!hasAccess}
                          className="text-xs capitalize"
                        >
                          {pos}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </PopoverContent>
          </Popover>
        </>
      )}

      {/* Text Formatting Options */}
      {isEditing && ['text', 'section title'].includes(cardType) && (
        // Text formatting options (same implementation as in original code)
        // ...
        <Popover>
          <PopoverTrigger asChild>
            <div
              data-tooltip-id="text-format-tooltip"
              data-tooltip-content={
                !hasAccess ? 'Premium Only' : 'Text Formatting'
              }
            >
              <Button variant="secondary" size="sm" disabled={!hasAccess}>
                <IoTextSharp />
              </Button>
              <Tooltip id="text-format-tooltip" place="top" effect="solid" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex w-60 flex-col space-y-4 p-4">
            {/* Font Family */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Font Family
              </label>
              <Select
                value={fontFamily}
                onValueChange={handleFontFamilyChange}
                disabled={!hasAccess}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>
                        {font.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Text alignment */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Text Alignment
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'left', icon: <AlignLeft className="h-4 w-4" /> },
                  {
                    value: 'center',
                    icon: <AlignCenter className="h-4 w-4" />,
                  },
                  {
                    value: 'right',
                    icon: <AlignRight className="h-4 w-4" />,
                  },
                  {
                    value: 'justify',
                    icon: <AlignJustify className="h-4 w-4" />,
                  },
                ].map(({ value, icon }) => (
                  <Button
                    key={value}
                    variant={textAlign === value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleTextAlignChange(value)}
                    disabled={!hasAccess}
                    className="text-xs"
                  >
                    {icon}
                  </Button>
                ))}
              </div>
            </div>

            {/* Text size */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Text Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {cardType === 'text'
                  ? ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
                      <Button
                        key={size}
                        variant={textSize === size ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleTextSizeChange(size)}
                        disabled={!hasAccess}
                        className="text-xs capitalize"
                      >
                        {size}
                      </Button>
                    ))
                  : ['md', 'lg', 'xl', '2xl', '3xl', '4xl'].map((size) => (
                      <Button
                        key={size}
                        variant={textSize === size ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleTextSizeChange(size)}
                        disabled={!hasAccess}
                        className="text-xs capitalize"
                      >
                        {size}
                      </Button>
                    ))}
              </div>
            </div>

            {/* Text styles: Bold, Italic, Strikethrough */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Text Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {/* Bold toggle */}
                <Button
                  variant={fontWeight === 'bold' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    handleFontWeightChange(
                      fontWeight === 'bold' ? 'normal' : 'bold'
                    )
                  }
                  disabled={!hasAccess}
                  className="text-xs"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>

                {/* Italic toggle */}
                <Button
                  variant={fontStyle === 'italic' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    handleFontStyleChange(
                      fontStyle === 'italic' ? 'normal' : 'italic'
                    )
                  }
                  disabled={!hasAccess}
                  className="text-xs"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>

                {/* Strikethrough toggle */}
                <Button
                  variant={
                    textDecoration === 'line-through' ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() =>
                    handleTextDecorationChange(
                      textDecoration === 'line-through'
                        ? 'none'
                        : 'line-through'
                    )
                  }
                  disabled={!hasAccess}
                  className="text-xs"
                  title="Strikethrough"
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Vertical alignment */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Vertical Alignment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    value: 'top',
                    icon: <AlignStartHorizontal className="h-4 w-4" />,
                  },
                  {
                    value: 'center',
                    icon: <AlignCenterHorizontal className="h-4 w-4" />,
                  },
                  {
                    value: 'bottom',
                    icon: <AlignEndHorizontal className="h-4 w-4" />,
                  },
                ].map(({ value, icon }) => (
                  <Button
                    key={value}
                    variant={verticalAlign === value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleVerticalAlignChange(value)}
                    disabled={!hasAccess}
                    className="text-xs"
                  >
                    {icon}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Image Card Styling Options */}
      {isEditing && ['image', 'video', 'bannerCard'].includes(cardType) && (
        // Image/video options (same implementation as in original code)
        <Popover>
          <PopoverTrigger asChild>
            <div
              data-tooltip-id="image-card-options-tooltip"
              data-tooltip-content={
                !hasAccess ? 'Premium Only' : 'Image Display Options'
              }
            >
              <Button variant="secondary" size="sm" disabled={!hasAccess}>
                <IoSettingsSharp />
              </Button>
              <Tooltip
                id="image-card-options-tooltip"
                place="top"
                effect="solid"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex w-60 flex-col space-y-4 p-4">
            {/* Fit options */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Image Fit
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['cover', 'contain', 'fill', 'none'].map((fit) => (
                  <Button
                    key={fit}
                    variant={bgFit === fit ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleBgFitChange(fit)}
                    disabled={!hasAccess}
                    className="text-xs capitalize"
                  >
                    {fit}
                  </Button>
                ))}
              </div>
            </div>

            {/* Position options */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Image Position
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['top', 'center', 'bottom'].map((pos) => (
                  <Button
                    key={pos}
                    variant={bgPosition === pos ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleBgPositionChange(pos)}
                    disabled={!hasAccess}
                    className="text-xs capitalize"
                  >
                    {pos}
                  </Button>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {['left', 'center', 'right'].map((pos) => (
                  <Button
                    key={pos}
                    variant={bgPosition.includes(pos) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      // Keep vertical position, change horizontal
                      const vertical = bgPosition.split(' ')[0] || 'center';
                      handleBgPositionChange(`${vertical} ${pos}`);
                    }}
                    disabled={!hasAccess}
                    className="text-xs capitalize"
                  >
                    {pos}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}