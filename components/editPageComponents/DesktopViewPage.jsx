'use client';
import React, { useEffect, useState } from 'react';
import MagicDock from './dock/MagicDock';
import LeftSection from './LeftSection';
import DragAndDropContainer from './DragAndDropContainer';
import BlogEditPage from './BlogEditPage/BlogEditPage';
import FormEditPage from './FormEditPage/FormEditPage';

import { useFetch } from '@/app/contexts/FetcherContext';
import { useAuth } from '@/app/contexts/AuthContext';
import EditBannerButton from './EditBannerButton';
import CustomAvatarBox from './profile/CustomAvatarBox';
import Image from 'next/image';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DisplayModeToggle from '../dashboardComponents/DisplayModeToggle';
import NestedCardSubscriptionSettings from './NestedCardSubscriptionSettings';
export default function DesktopViewPage({ id }) {
  const { themeData, profile, items } = useFetch();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if we should render a blog by matching the current ID and type
  const isRenderBlog = items?.some(
    (item) =>
      item.type === 'nestedCard' &&
      item.nestedCardType === 'blog' &&
      item.i === (Array.isArray(id) ? id[id.length - 1] : id)
  );
  // Find the specific blog item that matches the current ID
  const blogItem = items?.find(
    (item) =>
      item.type === 'nestedCard' &&
      item.nestedCardType === 'blog' &&
      item.i === (Array.isArray(id) ? id[id.length - 1] : id)
  );
  // Check if we should render a form by matching the current ID and type
  const isRenderForm = items?.some(
    (item) =>
      item.type === 'nestedCard' &&
      item.nestedCardType === 'form' &&
      item.i === (Array.isArray(id) ? id[id.length - 1] : id)
  );

  // Get text mode for backward compatibility
  const textMode = themeData?.textMode || 'dark';
  const isDarkMode = textMode === 'light'; // Reversed because textMode "light" means dark UI
  const bgColor = themeData?.background || (isDarkMode ? '#121212' : '#ffffff');
  const textColor = themeData?.textMode === 'dark' ? 'black' : 'white';

  const mainStyle = {
    background: bgColor ? bgColor : '#ffffff',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section
      className={`flex min-h-screen w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden md:flex-row ${
        isDarkMode ? 'dark' : 'light'
      }`}
      style={mainStyle}
    >
      <MagicDock id={id} />

      {/* Left Section - Conditional rendering based on display mode */}
      {profile?.displayMode === 'profile-pic' ? (
        /* Profile Picture Mode */
        <div className="relative flex w-full flex-shrink-0 flex-col items-start justify-start border-gray-100 bg-transparent pt-16 dark:border-[#1b1b1b] md:sticky md:top-0 md:h-screen md:w-[35%]">
          {/* Background image container with proper relative positioning */}
          <motion.div
            className="absolute left-2 right-2 top-4 z-50 mx-4 mb-4 mt-2 flex w-auto items-center justify-between"
            layout
          >
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DisplayModeToggle />
            </motion.div>

            <div className="flex gap-1">
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <EditBannerButton themeData={themeData} className="" />
              </motion.div>

              {id && (
                <div className="flex gap-1">
                  <NestedCardSubscriptionSettings
                    nestedCardId={Array.isArray(id) ? id[id.length - 1] : id}
                    themeData={themeData}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{
                      duration: 0.2,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative mr-2 flex items-center gap-1 rounded-full border px-2 py-1"
                    style={
                      themeData?.textMode === 'dark'
                        ? { color: 'black', backgroundColor: 'white' }
                        : { color: 'white', backgroundColor: 'black' }
                    }
                  >
                    <ArrowBigLeft
                      style={{ color: textColor }}
                      className="cursor-pointer"
                      onClick={() => {
                        if (window.history.length > 1) {
                          router.back();
                        } else {
                          router.push('/');
                        }
                      }}
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>

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
        <div className="relative flex w-full flex-shrink-0 flex-col items-center border-gray-100 bg-transparent dark:border-[#1b1b1b] md:sticky md:top-0 md:h-screen md:w-[35%]">
          {/* Background image container with proper relative positioning */}
          <motion.div
            className="absolute left-2 right-2 top-4 z-50 mx-4 mb-4 mt-2 flex w-auto items-center justify-between"
            layout
          >
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DisplayModeToggle />
            </motion.div>

            <div className="flex gap-4">
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <EditBannerButton themeData={themeData} className="" />
              </motion.div>

              {id && (
                <div className="flex gap-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{
                      duration: 0.2,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative mr-2 flex items-center gap-2 rounded-full border px-2 py-1"
                    style={
                      themeData?.textMode === 'dark'
                        ? { color: 'black', backgroundColor: 'white' }
                        : { color: 'white', backgroundColor: 'black' }
                    }
                  >
                    <ArrowBigLeft
                      style={{ color: textColor }}
                      className="cursor-pointer"
                      onClick={() => {
                        if (window.history.length > 1) {
                          router.back();
                        } else {
                          router.push('/');
                        }
                      }}
                    />
                  </motion.div>

                  <NestedCardSubscriptionSettings
                    nestedCardId={Array.isArray(id) ? id[id.length - 1] : id}
                    themeData={themeData}
                  />
                </div>
              )}
            </div>
          </motion.div>

          <div className="relative z-0 h-[70%] w-full overflow-hidden">
            {profile?.avatarURL ? (
              <Image
                fill
                src={profile.avatarURL}
                className="absolute inset-0 h-full w-full object-cover object-center"
                alt="Profile banner"
              />
            ) : (
              <div className="absolute inset-0 h-full w-full bg-gray-200 dark:bg-gray-800" />
            )}
          </div>
          {/* Gradient overlay */}
          <div
            className="z-10"
            style={{
              position: 'absolute',
              height: '70vh',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 70%, ${
                themeData?.color || '#000000'
              } 100%)`,
              zIndex: 1,
            }}
          />

          {/* Content section with higher z-index to appear above the gradient */}
          <div className="absolute bottom-32 z-10 w-full">
            <LeftSection id={id} themeData={themeData} />
          </div>
        </div>
      )}

      {/* Right Section - Draggable Grid */}
      {mounted &&
        (!id ? (
          <div className="mb-40 flex w-full bg-transparent px-1 py-1 md:pt-3">
            <DragAndDropContainer id={id} />
          </div>
        ) : isRenderBlog ? (
          <div className="w-full overflow-hidden md:w-[65%]">
            <BlogEditPage itemId={blogItem?.i} card={blogItem} />
          </div>
        ) : isRenderForm ? (
          <div className="w-full overflow-hidden md:w-[65%]">
            <FormEditPage />
          </div>
        ) : (
          <div className="mb-40 flex w-full bg-transparent px-1 py-1 md:pt-3">
            <DragAndDropContainer id={id} />
          </div>
        ))}
    </section>
  );
}
