'use client';

import { FetchProvider } from '@/app/contexts/FetcherContext';
import { ItemsProvider } from '@/app/contexts/ItemsContext';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { AnalyticsProvider } from '../contexts/AnalyticsContext';
import { ControllerProvider } from '@/app/contexts/ControllerContext';
import { AgentProvider } from '@/app/contexts/AgentContext';
import { AIBuilderProvider } from '@/app/contexts/AIBuilderContext';
import { TourProvider } from '@/app/contexts/TourContext';
import { SettingsProvider } from '@/app/contexts/SettingsContext';
import { SubscriptionProvider } from '@/app/contexts/SubscriptionContext';
import Tour from '@/components/tour/Tour';

// Other auth providers if needed
import Sidebar from '@/components/dashboardComponents/sidebar/Sidebar';
import TopBar from '@/components/dashboardComponents/TopBar/TopBar';
import { usePathname } from 'next/navigation';
import { AudienceProvider } from '../contexts/AudienceContext';
import { ShopProvider } from '../contexts/ShopContext';
import { ExternalProductProvider } from '../contexts/ExternalProductContext';
import AIChatBot from '@/components/AIChatBot/AIChatBot';
import { CartProvider } from '../contexts/CartContext';
import { CheckoutProvider } from '../contexts/CheckoutContext';
import { CheckoutAuthProvider } from '../contexts/CheckoutAuthContext';
import { TemplatesProvider } from '../contexts/TemplatesContext';
import { CalendarProvider } from '../contexts/CalendarContext';
import InstagramTokenHandler from '../contexts/InstagramTokenHandler';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import MobileNotificationModal from './components/MobileNotificationModal';
import FeedbackModal from './components/FeedbackModal';
import LayoutManager from '@/components/AIChatBot/LayoutManager';
import { PaymentGatewayProvider } from '@/app/contexts/PaymentGatewayContext';
import { CampaignProvider } from '@/app/contexts/CampaignContext';
import BottomNavigation from '@/components/dashboardComponents/BottomNavigation';

export default function DashboardClientLayout({ children }) {
  const pathname = usePathname();

  const HomePageTop =
    pathname === '/dashboard' ||
    /^\/dashboard\/\d+$/.test(pathname) ||
    pathname === '/dashboard/theme' ||
    pathname === '/dashboard/templates' ||
    pathname === '/dashboard/more';

  const HomePageBottom =
    pathname === '/dashboard' ||
    /^\/dashboard\/\d+$/.test(pathname) ||
    pathname === '/dashboard/theme' ||
    pathname === '/dashboard/templates';

  return (
    <>
      <ControllerProvider>
        <FetchProvider>
          <ItemsProvider>
            <ThemeProvider>
              <AnalyticsProvider>
                <TourProvider>
                  <TemplatesProvider>
                    <AudienceProvider>
                      <ShopProvider>
                        <ExternalProductProvider>
                          <AgentProvider>
                            <AIBuilderProvider>
                              <PaymentGatewayProvider>
                                <CalendarProvider>
                                  <CampaignProvider>
                                    <CartProvider>
                                      <CheckoutAuthProvider>
                                        <CheckoutProvider>
                                          <SubscriptionProvider>
                                            <SettingsProvider>
                                              <div className="flex w-full overflow-hidden bg-gray-50">
                                                {/* Render the Sidebar only for dashboard-related routes */}
                                                {!isMobile && <Sidebar />}
                                                <div className="flex w-full max-w-full flex-col overflow-hidden md:pb-0 pb-20">
                                                  {!HomePageTop && <TopBar />}
                                                  {/* {
                                                    isEditPage && (
                                                      <LayoutManager />
                                                    )
                                                    : (
                                                      // <AIChatBot />
                                                    )
                                                  } */}
                                                  <div
                                                    className={`w-full ${pathname === '/dashboard' || pathname.match(/^\/dashboard\/\d+$/) ? 'overflow-hidden' : 'overflow-auto'}`}
                                                  >
                                                    {children}
                                                  </div>
                                                  <MobileNotificationModal />
                                                  <FeedbackModal />
                                                  {/* Bottom Navigation for mobile */}
                                                  {isMobile &&
                                                    !HomePageBottom && (
                                                      <BottomNavigation />
                                                    )}
                                                </div>
                                              </div>
                                              <Tour />
                                            </SettingsProvider>
                                          </SubscriptionProvider>
                                        </CheckoutProvider>
                                      </CheckoutAuthProvider>
                                    </CartProvider>
                                  </CampaignProvider>
                                </CalendarProvider>
                              </PaymentGatewayProvider>
                            </AIBuilderProvider>
                          </AgentProvider>
                        </ExternalProductProvider>
                      </ShopProvider>
                    </AudienceProvider>
                  </TemplatesProvider>
                </TourProvider>
              </AnalyticsProvider>
            </ThemeProvider>
          </ItemsProvider>
        </FetchProvider>
      </ControllerProvider>
      <InstagramTokenHandler />
    </>
  );
}
