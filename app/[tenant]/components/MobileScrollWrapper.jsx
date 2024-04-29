'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import TenantSubscribeButton from './TenantSubscribeButton';

export default function MobileScrollWrapper({
  children,
  theme,
  profile,
  tenant,
  isPremium,
}) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [showNavbar, setShowNavbar] = useState(false);

  const textColor = theme?.textMode == 'dark' ? 'black' : 'white';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerHeight = 300;

      // Calculate opacity
      const opacity = Math.max(0, 1 - scrollPosition / triggerHeight);
      setScrollOpacity(opacity);

      // Show navbar when scrolled past threshold
      if (scrollPosition > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply styles to mobile elements
  useEffect(() => {
    const imageContainer = document.querySelector('.mobile-image-container');
    const gradientOverlay = document.querySelector('.mobile-gradient-overlay');

    if (imageContainer) {
      imageContainer.style.opacity = scrollOpacity;
    }

    if (gradientOverlay) {
      const baseGradient = `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,${
        0.5 * scrollOpacity
      }) 70%, ${theme?.color || '#000000'} 100%)`;
      gradientOverlay.style.background = baseGradient;
    }
  }, [scrollOpacity, theme]);

  return (
    <div className="relative">
      {/* Fixed Navbar - Shows on scroll */}
      <div
        style={{ backgroundColor: theme?.color }}
        className={`fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between shadow-lg transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img
              src={profile?.avatarURL}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span style={{ color: textColor }} className="font-semibold">
              {profile?.name || 'Profile'}
            </span>
          </div>
        </div>

        <TenantSubscribeButton username={tenant} tenantTheme={theme} />
      </div>

      {children}
    </div>
  );
}
