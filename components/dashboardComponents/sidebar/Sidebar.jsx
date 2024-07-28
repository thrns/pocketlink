'use client';
import SidebarHeaderComponent from './SidebarHeader';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useController } from '@/app/contexts/ControllerContext';
import { SidebarFooterComponent } from './SidebarFooter';
import { SidebarLinks } from './SidebarLinks';
import { isMobile, isTablet } from 'react-device-detect';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const { open, setOpen } = useController();
  const pathname = usePathname();

  // Use client-side detection as fallback to avoid hydration mismatch
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Set mobile view based on window width after component mounts
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  //Automatically close sidebar on mobile view when secion is switched
  // Removed automatic closing functionality

  // Use both react-device-detect and window size
  const shouldUseMobileView = isMobile || isMobileView;

  if (!open) return null;

  return (
    <>
      {shouldUseMobileView ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="left"
            className="flex h-full w-[80vw] max-w-[300px] flex-col justify-between overflow-hidden p-0"
          >
            <SidebarHeaderComponent />
            <SidebarContent className="overflow-y-auto">
              <SidebarLinks />
            </SidebarContent>
            <SidebarFooterComponent />
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar
          collapsible="offcanvas"
          className="fixed left-0 top-0 z-40 h-screen w-64 text-black"
        >
          <SidebarHeaderComponent />

          <SidebarContent className="overflow-y-auto p-4">
            <SidebarLinks />
          </SidebarContent>

          <SidebarFooterComponent />
        </Sidebar>
      )}
    </>
  );
}
