'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import { useAnalytics } from '@/app/contexts/AnalyticsContext';
const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const { analyticsData } = useAnalytics();
  const hasVisits = analyticsData?.overview?.totalVisits || null;
  const hasReferrers = analyticsData?.referrers || null;

  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [tourSteps, setTourSteps] = useState([]);
  const [tourCompleted, setTourCompleted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check localStorage on mount to see if tour has been completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tourDone = localStorage.getItem('tourCompleted') === 'true';
      setTourCompleted(tourDone);

      // Start tour if first time user and on dashboard (only for non-mobile devices)
      if (!tourDone && pathname === '/dashboard' && !isMobile) {
        // Small delay to ensure components are rendered
        setTimeout(() => {
          setIsTourOpen(true);
        }, 1200);
      }
    }
  }, []);

  // Update current path and handle navigation state
  useEffect(() => {
    setCurrentPath(pathname);

    // If we were navigating and now the path has changed, resume the tour
    if (isNavigating) {
      setIsNavigating(false);

      // Reset tour step and resume tour with slight delay to ensure components are mounted
      setTimeout(() => {
        setTourStep(0);
        setIsTourOpen(true);
      }, 800);
    }
  }, [pathname]);

  // Define steps based on current path
  useEffect(() => {
    if (currentPath === '/dashboard') {
      setTourSteps([
        {
          target: '.tour-magicdock',
          content:
            'Welcome to Pocketlink! This is your component library with various elements to add to your page.',
          disableBeacon: true,
          disableScrolling: true,
        },
        {
          target: '[data-tooltip-id="more-components"]',
          content: 'Use AI tools to generate or optimize your page layout.',
          disableBeacon: true,
          disableScrolling: true,
        },
        {
          target: '[data-tooltip-id="share"]',
          content: 'Share your Pocketlink page with others.',
          disableBeacon: true,
        },
        {
          target: '[data-tooltip-id="preview"]',
          content: 'Preview how your page looks to visitors.',
          disableBeacon: true,
        },
        {
          target: '[data-tooltip-id="mobile-view"]',
          content: 'See how your page looks on mobile devices.',
          disableBeacon: true,
        },
        {
          target: '[data-tooltip-id="desktop-view"]',
          content: 'View how your page appears on desktop screens.',
          disableBeacon: true,
        },
        {
          target: '[data-tooltip-id="save-status"]',
          content: 'View the status of your changes.',
          disableBeacon: true,
        },
        {
          target: '.tour-sidebar-toggle',
          content: "Let's explore the sidebar features.",
          disableBeacon: true,
          // spotlightClicks: true,
        },
        {
          target: '.tour-sidebar-analytics', //there is suppsoed to be a delay here.
          content:
            'This is where you can see complete analytics for your page.',
          disableBeacon: true,
          disableScrolling: true,
        },
        {
          target: '.tour-menu-analytics-traffic',
          content: "Let's check out your traffic statistics.",
          disableBeacon: true,
          disableScrolling: true,
          // spotlightClicks: true,
        },
      ]);
    } else if (
      pathname.includes('/dashboard/analytics') &&
      !pathname.includes('/performance')
    ) {
      {
        setTourSteps([
          ...(hasVisits
            ? [
                {
                  target: '.tour-stats-visits',
                  content: 'See how many visitors have viewed your page.',
                  disableBeacon: true,
                },
                {
                  target: '.tour-stats-clicks',
                  content: 'Track how many times your links have been clicked.',
                  disableBeacon: true,
                },
                {
                  target: '.tour-stats-ctr',
                  content:
                    'Monitor your click-through rate to optimize engagement.',
                  disableBeacon: true,
                },
              ]
            : [
                {
                  target: '.tour-stats-overview',
                  content: 'Monitor your visitors engagement.',
                  disableBeacon: true,
                },
              ]),
          {
            target: '.tour-analytics-map',
            content:
              'Visualize where your visitors are coming from around the world.',
            disableBeacon: true,
          },
          {
            target: hasVisits
              ? '.tour-device-distribution'
              : '.tour-device-distribution-backup',
            content:
              'Understand what devices your audience is using to access your page.',
            disableBeacon: true,
            placement: 'bottom',
          },
          {
            target: hasReferrers
              ? '.tour-referrers-chart-backup'
              : '.tour-referrers-chart',
            content:
              'See which websites and platforms are driving traffic to your page.',
            disableBeacon: true,
          },
          {
            target: '.tour-sidebar-performance',
            content:
              "Let's explore performance analytics for even deeper insights.",
            disableBeacon: true,
            disableScrolling: true,
            // spotlightClicks: true,
          },
        ]);
      }
    } else if (pathname.includes('/dashboard/analytics/performance')) {
      setTourSteps([
        {
          target: '.tour-daily-performance-chart',
          content:
            'Track your daily performance with visitors and clicks over time.',
          disableBeacon: true,
        },
        {
          target: '.tour-button-clicks-scatter-plot',
          content:
            'See which buttons are getting the most engagement and when.',
          disableBeacon: true,
        },
        {
          target: '.tour-link-performance-chart',
          content: 'Compare the performance of different links on your page.',
          disableBeacon: true,
        },
        {
          target: '.tour-sidebar-chatbot',
          content:
            'Train your own custom chatbot to engage with visitors and answer questions about your offerings. This powerful sales tool can help convert visitors into customers 24/7.',
          disableBeacon: true,
          disableScrolling: true,
          // spotlightClicks: true,
        },
        {
          target: '.tour-sidebar-products',
          content:
            'Coming soon! Set up your own storefront to sell digital or physical products directly through your Pocketlink page.',
          disableBeacon: true,
          disableScrolling: true,
        },
        {
          target: '.tour-sidebar-integrations',
          content:
            'Connect your Pocketlink with other platforms and services to enhance your page functionality.',
          disableBeacon: true,
          disableScrolling: true,
        },
        {
          target: '.tour-sidebar-footer',
          content:
            'Click on your profile to access Account Settings, Billing and Logout options.',
          disableBeacon: true,
          spotlightClicks: true,
          disableScrolling: true,
        },
      ]);
    }
  }, [currentPath]);

  // Handle tour navigation between pages
  const handleJoyrideCallback = (data) => {
    const { action, index, type, status } = data;
    // Always handle end/skip/close
    if (
      type === 'tour:end' ||
      status === 'finished' ||
      status === 'skipped' ||
      (action === 'close' && (type === 'step:after' || type === 'tour:end'))
    ) {
      handleTourEnd();
      return;
    }
    if (type === 'step:after') {
      if (action === 'next') {
        // Open sidebar when reaching the sidebar step
        if (currentPath === '/dashboard' && index === 7) {
          const sidebarToggle = document.querySelector('.tour-sidebar-toggle');
          if (sidebarToggle && !sidebarOpen) {
            sidebarToggle.click();
            setSidebarOpen(true);
            setTimeout(() => {
              setTourStep(index + 1);
            }, 500);
          } else {
            setTourStep(index + 1);
          }
          return;
        }

        // Open analytics submenu when reaching the analytics menu step
        if (currentPath === '/dashboard' && index === 8) {
          const analyticsMenu = document.querySelector('.tour-menu-analytics');
          if (analyticsMenu && !analyticsOpen) {
            analyticsMenu.click();
            setAnalyticsOpen(true);
            // Wait for submenu animation before moving to the next step
            setTimeout(() => {
              setTourStep(index + 1);
            }, 500); // Adjust delay as needed (500ms is typical for UI animation)
          } else {
            setTourStep(index + 1);
          }
          return;
        }

        // Navigate to analytics page after traffic menu item step
        if (currentPath === '/dashboard' && index === 9) {
          setIsTourOpen(false);
          setIsNavigating(true);
          router.push('/dashboard/analytics');
          return;
        }
        // totalTargets holds the no. of steps in the analytics section as it varies when the user has profile visits 0 and more than 0
        let totalTargets = hasVisits ? 5 : 3;
        if (
          currentPath.includes('/dashboard/analytics') &&
          !currentPath.includes('performance') &&
          index === totalTargets &&
          type === 'step:after'
        ) {
          //pause the tour for few secs
          setIsTourOpen(false);
          // then scroll to the top
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          // and then resume the tour
          setTimeout(() => {
            setTourStep(index + 1);
            setIsTourOpen(true);
          }, 700);
        }
        // Navigate to performance page after referrers chart step
        if (
          currentPath.includes('/dashboard/analytics') &&
          !currentPath.includes('performance') &&
          index === totalTargets + 1
        ) {
          // First pause the tour during navigation
          setIsTourOpen(false);
          setIsNavigating(true);
          router.push('/dashboard/analytics/performance');
          return;
        }
        if (
          currentPath.includes('/dashboard/analytics') &&
          currentPath.includes('performance') &&
          index === 2 &&
          type === 'step:after'
        ) {
          //pause the tour for few secs
          setIsTourOpen(false);
          // then scroll to the top
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          // and then resume the tour
          setTimeout(() => {
            setTourStep(index + 1);
            setIsTourOpen(true);
          }, 700);
        }
        // Open profile dropdown when reaching the footer step in performance analytics
        // if (currentPath.includes('/dashboard/analytics/performance') && index === 5) {
        //   const footerButton = document.querySelector('.tour-sidebar-footer');
        //   if (footerButton) {
        //     footerButton.click();
        //     // Wait for dropdown animation before moving to the next step
        //     setTimeout(() => {
        //       setTourStep(index + 1);
        //     }, 800);
        //   } else {
        //     setTourStep(index + 1);
        //   }
        //   return;
        // }

        setTourStep(index + 1);
      } else if (action === 'prev') {
        // Handle back button click
        if (
          currentPath.includes('/dashboard/analytics') &&
          !currentPath.includes('performance') &&
          index === 0
        ) {
          setIsTourOpen(false);
          setIsNavigating(true);
          router.push('/dashboard');
          // We'll set the tour step in the useEffect when the path changes
          return;
        }

        if (
          currentPath.includes('/dashboard/analytics/performance') &&
          index === 0
        ) {
          setIsTourOpen(false);
          setIsNavigating(true);
          router.push('/dashboard/analytics');
          // We'll set the tour step in the useEffect when the path changes
          return;
        }

        setTourStep(index - 1);
      }
    }
  };

  // End the tour and mark as completed
  const handleTourEnd = () => {
    setIsTourOpen(false);
    localStorage.setItem('tourCompleted', 'true');
    setTourCompleted(true);
    setSidebarOpen(false);
  };

  // Manually restart tour (for testing)
  const startTour = () => {
    // Don't start tour on mobile devices
    if (isMobile) {
      return;
    }
    localStorage.removeItem('tourCompleted');
    setTourCompleted(false);
    setTourStep(0);
    setIsTourOpen(true);
  };

  const value = {
    isTourOpen,
    tourStep,
    tourSteps,
    tourCompleted,
    sidebarOpen,
    setIsTourOpen,
    setTourStep,
    setSidebarOpen,
    startTour,
    handleJoyrideCallback,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTour = () => useContext(TourContext);
