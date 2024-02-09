'use client';
import React from 'react';
import Joyride from 'react-joyride';
import { useTour } from '@/app/contexts/TourContext';
import { usePathname } from 'next/navigation';
import { isMobile } from 'react-device-detect';

const Tour = () => {
  const { isTourOpen, tourSteps, handleJoyrideCallback, tourStep } = useTour();
  const pathname = usePathname();

  // Don't render the tour component on mobile devices
  if (isMobile || !isTourOpen || tourSteps.length === 0) {
    return null;
  }

  //Lets not show skip button for the first step.
  const isFirstStep = tourStep === 0;

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous={true}
      run={isTourOpen}
      scrollToFirstStep={true}
      showProgress={true}
      showSkipButton={!isFirstStep}
      steps={tourSteps}
      stepIndex={tourStep}
      disableOverlayClose={true}
      disableCloseOnEsc={false}
      styles={{
        options: {
          arrowColor: '#fff',
          backgroundColor: '#fff',
          overlayColor: 'rgba(0, 0, 0, 0.65)',
          primaryColor: '#8b5cf6',
          textColor: '#4b5563', // Slightly darker text for better readability
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: '#8b5cf6',
          padding: '10px 16px',
          fontSize: '14px',
          fontWeight: 500,
          borderRadius: '6px',
          boxShadow: '0 2px 4px rgba(139, 92, 246, 0.25)',
          transition: 'all 0.2s ease',
        },
        buttonBack: {
          marginRight: 12,
          color: '#8b5cf6',
          padding: '8px 12px',
          fontSize: '14px',
          fontWeight: 500,
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
          transition: 'all 0.2s ease',
        },
        tooltip: {
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          padding: '16px 20px',
          maxWidth: '420px',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '8px',
          color: '#1f2937', // Darker title for emphasis
          lineHeight: 1.3,
        },
        tooltipContent: {
          fontSize: '15px',
          lineHeight: 1.6,
          color: '#4b5563',
          marginBottom: '12px',
        },
        buttonSkip: {
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: 500,
        },
        tooltipFooter: {
          marginTop: '16px',
        },
        spotlight: {
          borderRadius: 8,
          boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.2)',
        },
      }}
      locale={{
        last: 'Finish',
        next: 'Next',
        back: 'Back',
        skip: 'Skip tour',
      }}
    />
  );
};

export default Tour;
