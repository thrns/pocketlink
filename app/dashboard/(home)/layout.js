'use client';

import { Toaster } from 'react-hot-toast';
import NetworkStatusIndicator from '@/components/common/NetworkStatusIndicator';
import { useController } from '@/app/contexts/ControllerContext';
import MobileViewPage from '@/components/editPageComponents/MobileViewPage';
import { isMobile } from 'react-device-detect';
import { useParams } from 'next/navigation';
import HomeTopbar from './components/HomeTopbar';
import PreviewSectionTopbar from './components/PreviewSectionTopbar';
import HomeBottomNav from './components/HomeBottomNav';
export default function EditPageLayout({ children }) {
  const { isMobileArrange } = useController();
  const { id } = useParams();

  // Determine layout based on device and arrangement state
  const showMobileArrangeView = isMobile && isMobileArrange;
  const showDesktopView = !isMobile || !isMobileArrange;

  return (
    <main className="relative flex h-screen w-full overflow-hidden">
      {/* Desktop/Editor Section */}

      {showDesktopView && (
        <section className="flex h-full w-full flex-col border-r">
          <HomeTopbar />

          <section className="flex h-full w-full flex-col pb-20">{children}</section>

         
        </section>
      )}

      {/* Mobile Preview Section */}
      <section
        className={`h-full flex-col ${
          showMobileArrangeView ? 'w-full' : 'hidden w-full md:flex md:w-2/4'
        }`}
      >
        {showDesktopView && <PreviewSectionTopbar />}
        <section className="flex h-full w-full flex-col md:mt-4">
          <MobileViewPage id={id} />
        </section>
      </section>
       {/* Bottom Navigation for mobile */}
          {isMobile && <HomeBottomNav />}

      <Toaster position="top-center" />
      <NetworkStatusIndicator />
    </main>
  );
}
