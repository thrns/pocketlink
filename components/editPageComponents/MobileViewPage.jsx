'use client';
import React, { useEffect, useRef, useState } from 'react';
import LeftSection from './LeftSection';
import MagicDock from './dock/MagicDock';
import { useFetch } from '@/app/contexts/FetcherContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useController } from '@/app/contexts/ControllerContext';
import DragAndDropContainer from './DragAndDropContainer';
import { ArrowBigLeft, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IconCancel } from '@tabler/icons-react';
import { isMobile } from 'react-device-detect';
import EditBannerButton from './EditBannerButton';
import CustomAvatarBox from './profile/CustomAvatarBox';
import DisplayModeToggle from '../dashboardComponents/DisplayModeToggle';
import Image from 'next/image';
import NestedCardSubscriptionSettings from './NestedCardSubscriptionSettings';

export default function MobileViewPage({ id }) {
  const { themeData, items, profile } = useFetch();
  const { user } = useAuth();
  const containerRef = useRef(null);
  const { mobileViewContainerRef, isMobileArrange } = useController();
  const [allowEdit, setAllowEdit] = useState(isMobileArrange);
  const [caption, setCaption] = useState();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setAllowEdit(isMobileArrange);
  }, [isMobileArrange]);

  // Set up theme variables for styling
  const textMode = themeData?.textMode || 'dark';
  const isDarkMode = textMode === 'light'; // Reversed because textMode "light" means dark UI
  const bgColor = themeData?.color || (isDarkMode ? '#121212' : '#ffffff');
  const textColor = themeData?.textMode === 'dark' ? 'black' : 'white';

  const mainStyle = {
    background: bgColor,
  };

  // Find the matching item from the dataa
  useEffect(() => {
    if (id && items) {
      const item = items.find((item) => item.i == id);
      if (item) {
        setCaption(item.caption); // Set the caption if the item is found
      }
    }
  }, [id]);

  return (
    <main
      className={`flex flex-col overflow-hidden${
        isDarkMode ? 'dark' : 'light'
      } h-full w-full items-center ${isMobile ? '' : 'rounded-xl'} justify-start`}
    >
      <section
        ref={mobileViewContainerRef}
        className={`relative flex min-h-screen items-center w-full flex-col overflow-y-auto overflow-x-hidden  md:w-[90%] 2xl:w-2/3 md:rounded-xl`}
        style={mainStyle}
      >
       
        {id && (
          <div className="sticky top-0 z-50 flex w-full items-center justify-between p-4">
            <div className="flex items-center">
              <ArrowBigLeft
                size={28}
                className="cursor-pointer"
                style={{ color: textColor }}
                onClick={() => {
                  if (window.history.length > 1) {
                    router.back(); // Go back if history exists
                  } else {
                    router.push('/');
                  }
                }}
              />
              {caption && (
                <span
                  style={{ color: textColor }}
                  className="ml-4 block max-w-[60vw] truncate text-lg font-semibold text-gray-800 dark:text-white"
                >
                  {caption}
                </span>
              )}
            </div>

            <NestedCardSubscriptionSettings
              nestedCardId={Array.isArray(id) ? id[id.length - 1] : id}
              themeData={themeData}
            />
          </div>
        )}
        {/* Left Section - Conditional rendering based on display mode */}
        {!id && (
          <>
            {profile?.displayMode === 'profile-pic' ? (
              /* Profile Picture Mode */
              <div
                style={{
                  position: 'relative',
                }}
                className={`flex w-full flex-shrink-0 flex-col items-start justify-start pt-16`}
              >
                {/* Profile Picture */}
                <div className="mb-8 flex w-full justify-center">
                  <CustomAvatarBox user={user} themeData={themeData} />
                </div>

                {/* Profile Content */}
                <div className="w-full px-4">
                  <LeftSection id={id} themeData={themeData} />
                </div>
              </div>
            ) : (
              /* Banner Mode */
              <div
                style={{
                  position: 'relative',
                }}
                className={`flex w-full flex-shrink-0 flex-col items-center ${isMobile ? 'h-auto' : 'h-[70vh]'}`}
              >
                {/* Background image as a separate div */}
                <div
                  className={`relative z-0 ${isMobile ? 'h-[80vh]' : 'h-[70vh]'} w-full overflow-hidden`}
                >
                  <Image
                    fill
                    src={profile?.avatarURL}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    alt="Profile banner"
                  />
                </div>


                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: isMobile ? '80vh' : '70vh',
                    background: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 70%, ${
                      themeData?.color || '#000000'
                    } 100%)`,
                    zIndex: 1,
                  }}
                />
                <div className="absolute bottom-8 z-10 w-full">
                  <LeftSection id={id} themeData={themeData} />
                </div>
              </div>
            )}
          </>
        )}

        {/* Right Section - Draggable Grid */}
        <div className="mb-60 mt-3 flex w-full items-center justify-center">
          {mounted && (
            <DragAndDropContainer
              containerRef={containerRef}
              allowEdit={allowEdit}
              id={id}
            />
          )}
        </div>
      </section>

      {/* {isMobile && !isMobileArrange && (
        <button
          onClick={() => setAllowEdit(!allowEdit)}
          className={`fixed bottom-32 right-4 z-50 rounded-full bg-bento-violet p-3 text-white shadow-lg transition-all ${
            allowEdit ? 'bg-red-500' : 'bg-bento-violet'
          }`}
        >
          {allowEdit ? <IconCancel /> : <Pencil />}
        </button>
      )} */}

    </main>
  );
}
