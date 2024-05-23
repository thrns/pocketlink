'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Edit3,
  X,
  Save,
  Trash,
  Copy,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';
import DisplayModeToggle from '@/components/dashboardComponents/DisplayModeToggle';

// Import necessary contexts and components
import { useFetch } from '@/app/contexts/FetcherContext';
import { useItems } from '@/app/contexts/ItemsContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useController } from '@/app/contexts/ControllerContext';
import MoreComponentsIcon from '@/components/editPageComponents/dock/DockIcons/MoreComponents/MoreComponentsIcon';
import CustomAvatarBox from '@/components/editPageComponents/profile/CustomAvatarBox';
import HideOptionsMenu from '@/components/editPageComponents/HideOptionsMenu';
import NestCardEntryButton from '@/components/editPageComponents/CardStuff/NestCardEntryButton';
import ChangeFormCardButton from '@/components/editPageComponents/CardStuff/ChangeFormCardButton';
import { getCardIcon } from '../[[...id]]/constants/ContentRowIconsMapping';
import { isMobile } from 'react-device-detect';

export default function PageEditor() {
  // Context hooks
  const { profile, mobileItems, items, themeData } = useFetch();
  const { updateProfile, addItem, updateItemContent, removeItem, copyItem } =
    useItems();
  const { user } = useAuth();
  const { setIsEditing, setEnableDrag, setSelectedId, setIsIsolate, setIsMobileArrange } =
    useController();
  // Local state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: profile?.name || '',
    description: profile?.description || '',
    avatarURL: profile?.avatarURL || '',
    links: profile?.component?.componentProps || [],
  });

  // Update profile data when profile context changes
  React.useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || '',
        description: profile.description || '',
        avatarURL: profile.avatarURL || '',
        links: profile?.component?.componentProps || [],
      });
    }
  }, [profile]);

  // Handle profile input changes
  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save profile changes
  const handleProfileSave = () => {
    updateProfile(profileData);
    setIsEditingProfile(false);
  };

  // Handle adding new card from library
  const handleAddCard = (cardType, sizeKey, content) => {
    addItem(null, cardType, sizeKey, content);
  };

  // Handle hide settings change
  const handleHideSettingsChange = (itemId, settings) => {
    updateItemContent(itemId, settings);
  };

  // Handle card delete
  const handleCardDelete = (cardId) => {
    removeItem(cardId);
  };

  // Handle card copy
  const handleCardCopy = (card) => {
    copyItem(card, card);
  };
  return (
    <div className="flex h-full w-full">
      {/* Main Content Area */}
      <div className="flex w-full flex-col overflow-y-auto">
        {/* Profile Section */}
        <div className="p-4">
          <Card>
            <CardContent className="relative p-4 sm:p-6">
              

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* Avatar */}
                <div className="flex-shrink-0 self-center sm:self-start">
                  <CustomAvatarBox
                    user={user}
                    themeData={themeData}
                    className="h-16 w-16 sm:h-20 sm:w-20"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  {isEditingProfile ? (
                    <>
                      {/* Edit Mode */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Name
                        </label>
                        <Input
                          value={profileData.name}
                          onChange={(e) =>
                            handleProfileChange('name', e.target.value)
                          }
                          placeholder="Enter your name"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bio
                        </label>
                        <Textarea
                          value={profileData.description}
                          onChange={(e) =>
                            handleProfileChange('description', e.target.value)
                          }
                          placeholder="Tell people about yourself..."
                          className="mt-1 min-h-[80px]"
                        />
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button
                          onClick={handleProfileSave}
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingProfile(false)}
                          className="w-full sm:w-auto"
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Display Mode */}
                      <div>
                        <h3 className="text-lg font-medium sm:text-xl">
                          {profileData.name || 'Enter your name'}
                        </h3>
                      </div>

                      <div>
                        <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                          {profileData.description || 'Enter your bio...'}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData?.links?.slice(0, 6).map((prop) => {
                          // Determine link type and icon based on ContactDock logic
                          let icon = (
                            <Globe size={20} className="text-gray-500" />
                          );
                          let link = prop.value;

                          if (prop.type === 'phone') {
                            icon = (
                              <Phone size={20} className="text-green-500" />
                            );
                            link = `tel:${prop.value}`;
                          } else if (prop.type === 'email') {
                            icon = <Mail size={20} className="text-blue-500" />;
                            link = `mailto:${prop.value}`;
                          } else if (
                            prop.type === 'social' ||
                            prop.type === 'calendar'
                          ) {
                            // For social/calendar links, try to get favicon
                            link = prop.link.startsWith('http')
                              ? prop.link
                              : `https://${prop.link}`;
                            try {
                              const domain = new URL(link).hostname;
                              const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
                              icon = (
                                <img
                                  src={faviconUrl}
                                  alt=""
                                  className="h-5 w-5 object-contain"
                                  onError={(e) => {
                                    // Replace with Globe icon on error
                                    const parent = e.target.parentElement;
                                    e.target.remove();
                                    const globeIcon =
                                      document.createElement('div');
                                    globeIcon.innerHTML =
                                      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m5 5 14 14"/></svg>';
                                    parent.appendChild(globeIcon);
                                  }}
                                />
                              );
                            } catch (err) {
                              icon = (
                                <Globe size={20} className="text-gray-500" />
                              );
                            }
                          }

                          const handleClick = () => {
                            window.open(link, '_blank');
                          };

                          return (
                            <div
                              key={prop.link + prop.value}
                              className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                              onClick={handleClick}
                              title={`${prop.link}: ${prop.value}`}
                            >
                              {icon}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                   <div className="flex w-full items-center gap-2 ">
                  <DisplayModeToggle />
                  <Button
                    className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50"
                    size="sm"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                  >
                    {isEditingProfile ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </span>
                    )}
                  </Button>
                </div>
                </div>
               
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cards Section */}
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {mobileItems && mobileItems.length > 0 ? (
              <>
                {mobileItems
                  .sort((a, b) => (a.y || 0) - (b.y || 0))
                  .map((card, index) => (
                    <motion.div
                      key={card.i || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      <Card
                        className={`hover:ring-bento-indigo} group relative transition-all hover:shadow-md hover:ring-2`}
                      >
                        <CardContent className="flex flex-col items-center justify-between overflow-hidden p-0 md:flex-row">
                          {/* Card Header with Edit Button */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsEditing(true);
                              setEnableDrag(true);
                              setSelectedId(card.i);
                              setIsIsolate(true);
                              setIsMobileArrange(true); // Switch to rearrange view so canvas is visible
                            }}
                            className="flex w-full items-center justify-between p-3 hover:bg-bento-indigo/5 sm:p-4"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full p-2 sm:h-10 sm:w-10"
                                style={{
                                  backgroundColor: card.background || '#4F46E5',
                                  color: card.cardThemeBright
                                    ? 'white'
                                    : 'white',
                                }}
                              >
                                {(() => {
                                  // For image cards, show the actual image if available
                                  if (card.type === 'image' && card.image) {
                                    return (
                                      <img
                                        src={card.image}
                                        alt="Card preview"
                                        className="h-4 w-4 rounded object-cover sm:h-5 sm:w-5"
                                      />
                                    );
                                  }

                                  // For URL cards, show favicon using Google's favicon service
                                  if (card.type === 'url' && card.url) {
                                    try {
                                      const domain = new URL(card.url).hostname;
                                      return (
                                        <div className="relative h-4 w-4 sm:h-5 sm:w-5">
                                          <img
                                            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                                            alt="Favicon"
                                            className="h-4 w-4 sm:h-5 sm:w-5"
                                            onError={(e) => {
                                              // Hide the image and show the fallback icon
                                              e.target.style.display = 'none';
                                              const fallbackDiv =
                                                e.target.nextElementSibling;
                                              if (fallbackDiv)
                                                fallbackDiv.style.display =
                                                  'block';
                                            }}
                                          />
                                          <div style={{ display: 'none' }}>
                                            {(() => {
                                              const IconComponent = getCardIcon(
                                                card.type
                                              );
                                              return (
                                                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                              );
                                            })()}
                                          </div>
                                        </div>
                                      );
                                    } catch (error) {
                                      // If URL parsing fails, fall back to icon
                                      const IconComponent = getCardIcon(
                                        card.type
                                      );
                                      return (
                                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                      );
                                    }
                                  }

                                  // Default: show icon
                                  const IconComponent = getCardIcon(card.type);
                                  return (
                                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                  );
                                })()}
                              </div>
                              <div className="min-w-0 flex-1 text-sm font-medium capitalize text-gray-500">
                                <h1 className="truncate text-sm font-medium text-gray-800 dark:text-gray-200 sm:text-base">
                                  {card.title ||
                                    card.content ||
                                    card.text ||
                                    card.caption ||
                                    'Card'}
                                </h1>
                                <span className="text-xs font-medium capitalize text-gray-500 sm:text-sm">
                                  {card.type || 'Card'}
                                </span>
                              </div>
                            </div>
                          </div>
                          {card.type === 'nestedCard' && (
                            <div className={`flex w-auto items-center gap-2 p-3 transition-opacity hover:bg-bento-indigo/5 sm:p-4 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                              <NestCardEntryButton cardId={card.i} />
                            </div>
                          )}

                          <div className="flex w-auto items-center gap-2 p-3 sm:p-4">
                            {/* Card Action Buttons */}
                            <HideOptionsMenu
                              itemId={card.i}
                              currentHideOnMobile={card.hideOnMobile}
                              currentHideOnDesktop={card.hideOnDesktop}
                              onHideSettingsChange={handleHideSettingsChange}
                              className={`transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            />{' '}
                            <div className={`flex w-full items-end justify-end gap-1 transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                              {card.type === 'formCard' && (
                                <ChangeFormCardButton cardId={card.i} />
                              )}

                              {/* Copy Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardCopy(card);
                                }}
                                className="h-8 w-8 rounded-full bg-green-600 p-0 text-white hover:bg-green-700"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              {/* Delete Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardDelete(card.i);
                                }}
                                className="h-8 w-8 rounded-full bg-red-600 p-0 text-white hover:bg-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                <MoreComponentsIcon
                  handleAdd={handleAddCard}
                  className="max-h-min self-center rounded-lg border-2 border-dashed border-bento-indigo bg-bento-indigo/10 px-12 py-2 text-black"
                />
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="mb-4 text-gray-400">
                  <Plus className="mx-auto mb-2 h-12 w-12" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-300">
                  No cards yet
                </h3>
                <p className="mb-4 px-4 text-sm text-gray-500 sm:text-base">
                  Start building your experience by adding your first card,
                  we'll auto design your desktop version.
                </p>
                <MoreComponentsIcon
                  className="rounded-full bg-bento-indigo p-2 text-white"
                  handleAdd={handleAddCard}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
