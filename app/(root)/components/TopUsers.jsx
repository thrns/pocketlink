'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/Clients/supabase/client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopUsers() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Use React's useInView hook
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: false
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Auto-slide functionality with manual control override
  const startAutoSlide = useCallback(() => {
    if (profiles.length > 0 && inView && !isManualControl) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
      }, 4000);
    }
  }, [profiles.length, inView, isManualControl]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopAutoSlide();
    setIsManualControl(true);
    
    // Reset manual control after 8 seconds of inactivity
    setTimeout(() => {
      setIsManualControl(false);
    }, 8000);
  }, [stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  // Manual navigation functions
  const goToNext = useCallback(() => {
    resetTimer();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  }, [profiles.length, resetTimer]);

  const goToPrevious = useCallback(() => {
    resetTimer();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
    );
  }, [profiles.length, resetTimer]);

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Mouse event handlers for desktop drag functionality
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (touchStartX.current) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftDrag = distance > 50;
    const isRightDrag = distance < -50;

    if (isLeftDrag) {
      goToNext();
    } else if (isRightDrag) {
      goToPrevious();
    }

    // Reset mouse positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const fetchProfiles = async () => {
    try {
      // Fetch from display_profiles table with desktop_image, mobile_image, and profile data
      const { data, error } = await supabase
        .from('display_profiles')
        .select('*');

      setProfiles(data || []);

      if (error) {
        console.error('Error fetching display profiles:', error);
        setProfiles([]);
        return;
      }
    } catch (error) {
      console.error('Error in fetchProfiles:', error);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if file is a video
  const isVideoFile = (url) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv', '.m4v'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="text-lg text-gray-600">Loading top users...</div>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="text-lg text-gray-600">No profiles to display</div>
      </div>
    );
  }

  // Render first 3 profiles by default, then all when in view
  const profilesToRender = inView ? profiles : profiles.slice(0, 3);

  return (
    <div ref={ref} className="w-full overflow-hidden bg-gray-50 py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-medium text-gray-900 md:text-5xl">
            Awesome Looking Profiles, 
            <motion.span className="relative inline-block animate-shine bg-gradient-to-r from-bento-violet to-bento-indigo bg-clip-text pr-2 italic text-transparent">
               {" "} that WORK.
            </motion.span>
          </h2>
        </div>

        <div className="relative w-full">
          <style jsx>{`
            .swiper-container {
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              height: 600px;
              overflow: hidden;
              user-select: none;
              cursor: grab;
            }

            .swiper-container:active {
              cursor: grabbing;
            }

            .profile-card-wrapper {
              position: absolute;
              transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              transform-origin: center;
              cursor: pointer;
            }

            .profile-card-wrapper.center {
              transform: translateX(0) scale(1);
              opacity: 1;
              z-index: 3;
            }

            .profile-card-wrapper.left {
              transform: translateX(-100%) scale(0.8);
              opacity: 0.6;
              z-index: 2;
            }

            .profile-card-wrapper.right {
              transform: translateX(100%) scale(0.8);
              opacity: 0.6;
              z-index: 2;
            }

            .profile-card-wrapper.far-left {
              transform: translateX(-200%) scale(0.6);
              opacity: 0.3;
              z-index: 1;
            }

            .profile-card-wrapper.far-right {
              transform: translateX(200%) scale(0.6);
              opacity: 0.3;
              z-index: 1;
            }

            .profile-card-wrapper.far-right {
              transform: translateX(200%) scale(0.6);
              opacity: 0.3;
              z-index: 1;
            }

            .profile-card-wrapper.hidden {
              transform: translateX(300%) scale(0.4);
              opacity: 0;
              z-index: 0;
            }

            .mobile-mockup {
              transition: all 0.3s ease;
              position: relative;
            }

            .mobile-mockup:hover {
              transform: translateY(-8px);
              filter: drop-shadow(0 20px 40px rgba(99, 102, 241, 0.3));
            }

            .mobile-mockup::before {
              content: '';
              position: absolute;
              top: -10px;
              left: -10px;
              right: -10px;
              bottom: -10px;
              background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
              border-radius: 2rem;
              opacity: 0;
              transition: opacity 0.3s ease;
              z-index: -1;
            }

            .mobile-mockup:hover::before {
              opacity: 1;
            }

            .nav-button {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              z-index: 10;
              background: rgba(255, 255, 255, 0.9);
              border: 1px solid rgba(0, 0, 0, 0.1);
              border-radius: 50%;
              width: 48px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
            }

            .nav-button:hover {
              background: rgba(255, 255, 255, 1);
              transform: translateY(-50%) scale(1.1);
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }

            .nav-button.left {
              left: 20px;
            }

            .nav-button.right {
              right: 20px;
            }

            @media (max-width: 768px) {
              .nav-button {
                display: none;
              }
            }
          `}</style>

          <div 
            className="swiper-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Navigation Buttons - Hidden on mobile */}
            <button 
              className="nav-button left"
              onClick={goToPrevious}
              aria-label="Previous profile"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            
            <button 
              className="nav-button right"
              onClick={goToNext}
              aria-label="Next profile"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
            {profilesToRender.map((profile, index) => {
              const getPositionClass = () => {
                const diff = index - currentIndex;
                const totalProfiles = profilesToRender.length;

                // Handle circular positioning
                let normalizedDiff = diff;
                if (Math.abs(diff) > totalProfiles / 2) {
                  normalizedDiff =
                    diff > 0 ? diff - totalProfiles : diff + totalProfiles;
                }

                if (normalizedDiff === 0) return 'center';
                if (normalizedDiff === -1) return 'left';
                if (normalizedDiff === 1) return 'right';
                if (normalizedDiff === -2) return 'far-left';
                if (normalizedDiff === 2) return 'far-right';
                return 'hidden';
              };

              const handleCardClick = () => {
                // Only redirect if allow_redirect is true
                if (profile.allow_redirect) {
                  window.open(
                    `https://${profile.username}.pocketlink.co`,
                    '_blank'
                  );
                }
              };

              return (
                <div
                  key={`profile-${profile.id || profile.username}-${index}`}
                  className={`profile-card-wrapper ${getPositionClass()}`}
                  onClick={handleCardClick}
                  style={{ cursor: profile.allow_redirect ? 'pointer' : 'default' }}
                >
                  <ProfileCard
                    profile={profile}
                    isActive={index === currentIndex}
                    username={profile.username}
                    isVideoFile={isVideoFile}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Card Component
function ProfileCard({ profile, isActive, username, isVideoFile }) {
  const { profile: profileData, desktop_image, mobile_image } = profile;

  // Media rendering component
  const MediaRenderer = ({ src, alt, className, isMobile = false }) => {
    if (!src) {
      return (
        <div className={`flex h-full w-full items-center justify-center bg-gray-200 ${className}`}>
          <p className={`text-gray-500 ${isMobile ? 'text-xs' : ''}`}>
            {isMobile ? 'No mobile preview' : 'No desktop preview available'}
          </p>
        </div>
      );
    }

    if (isVideoFile(src)) {
      return (
        <video
          src={src}
          alt={alt}
          className={className}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
      />
    );
  };

  return (
    <div className="profile-card relative w-full">
      {/* Desktop Mockup - Hidden on mobile */}
      <div className="hidden min-w-max gap-2 md:flex">
        <div className="relative h-[350px] w-full overflow-hidden rounded-2xl border-8 border-gray-800 bg-gray-100 shadow-lg md:scale-110">
          <MediaRenderer
            src={desktop_image}
            alt={`${profileData?.name || username} desktop view`}
            className="h-full w-full object-cover object-left-top"
          />
        </div>

        {/* Mobile Mockup - Positioned on the right side for desktop */}
        <div className="z-10 min-w-max">
          <div className="mobile-mockup relative aspect-[9/16] w-[200px] rounded-3xl bg-gray-900 p-2 shadow-xl">
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-20 h-4 w-16 -translate-x-1/2 transform rounded-b-2xl bg-black" />

            {/* Screen */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white">
              <MediaRenderer
                src={mobile_image}
                alt={`${profileData?.name || username} mobile view`}
                className="h-full w-full object-cover object-top"
                isMobile={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only view - Show only mobile mockup */}
      <div className="flex justify-center md:hidden">
        <div className="mobile-mockup relative aspect-[9/16] w-[250px] rounded-3xl bg-gray-900 p-2 shadow-xl">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-20 h-4 w-16 -translate-x-1/2 transform rounded-b-2xl bg-black" />

          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white">
            <MediaRenderer
              src={mobile_image}
              alt={`${profileData?.name || username} mobile view`}
              className="h-full w-full object-cover object-left-top"
              isMobile={true}
            />
          </div>
        </div>
      </div>

      {/* Profile Info - Only show for active (center) card */}
      {isActive && (
        <div className="mt-6 text-center">
          <h3 className="cursor-pointer text-xl font-semibold text-gray-900 hover:text-bento-pink">
            @{username}
          </h3>
          <p className="mt-2 text-gray-600">
            {profileData?.description && profileData.description.length > 80
              ? profileData.description.slice(0, 80) + '...'
              : profileData?.description || 'No description available'}
          </p>
        </div>
      )}
    </div>
  );
}
