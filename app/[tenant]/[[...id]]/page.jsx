import {
  CheckPremiumStatus,
  getCustomDomainTenant,
  ReadTenantData,
} from '@/lib/actions/ReadTenantData';
import LeftPanel from '../components/LeftPanel';
import ResponsiveGridClient from '../components/ResponsiveGridClient';
import TenantNavbar from '../components/TenantNavbar';
import { detectDevice } from '../utils/detectDevice';
import NotFoundPage from '../components/NotFoundPage';
import CreateYourPocketlinkButton from '../components/CreateYourPocketlinkButton';
import Image from 'next/image';
import TenantSubscribeButton from '../components/TenantSubscribeButton';
import MobileScrollWrapper from '../components/MobileScrollWrapper';
import DockContainer from '@/components/editPageComponents/ContactDock';
import SubscribeAndBackBtn from '../components/SubscribeAndBackBtn';
import HeatmapInitializer from '../components/HeatmapInitializer';
import AnalyticsInitializer from '../components/AnalyticsInitializer';
import { TenantSubscriptionProvider } from '@/app/contexts/TenantSubscriptionContext';
import { isMobile } from 'react-device-detect';
import { headers } from 'next/headers';
// ==================== META DATA ==================== //
export async function generateMetadata({ params }) {
  const { tenant } = await params;

  try {
    // Use optional chaining to safely access tenant

    if (!tenant) {
      return {
        title: 'Not Found - Pocketlink',
        description: 'The requested page could not be found.',
      };
    }

    // Safely fetch tenant data
    let data;
    try {
      data = await ReadTenantData(tenant);
    } catch (error) {
      // Return generic metadata if data fetching fails
      return {
        title: 'Pocketlink',
        description: 'Create your online shop in minutes',
      };
    }

    // If no data was returned, show Not Found metadata
    if (!data) {
      return {
        title: 'Not Found - Pocketlink',
        description: 'The requested page could not be found.',
      };
    }

    // Extract profile safely with fallbacks
    const profile = data.profile || {};
    const name = profile?.name || 'Pocketlink';
    const description =
      profile?.description || 'Create your online shop in minutes';
    const avatarURL = profile?.avatarURL || 'https://pocketlink.co/ogImg.png';

    // Construct OG image URL safely
    const ogImageUrl = tenant
      ? `https://pocketlink.co/api/og?username=${encodeURIComponent(tenant)}`
      : 'https://pocketlink.co/openGraph.png';

    // Construct metadata object with safe values
    return {
      metadataBase: new URL('https://pocketlink.co'),
      title: name,
      description: description,
      openGraph: {
        title: name,
        description: description,
        url: `https://pocketlink.co/${encodeURIComponent(tenant)}`,
        images: [
          {
            url: ogImageUrl,
            alt: `${name}'s avatar`,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: name,
        description: description,
        images: [ogImageUrl],
      },
      icons: {
        icon: avatarURL,
        apple: avatarURL,
      },
    };
  } catch (error) {
    // Fallback metadata in case of any errors
    return {
      title: 'Pocketlink',
      description: 'Create your online shop in minutes',
    };
  }
}

// ==================== TENANT PAGE ==================== //
export default async function Page({ params }) {
  try {
    const { tenant, id } = await params;
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const isCustomDomain =
      !host.includes('pocketlink.co') && !host.includes('localhost');
    const RawTenant = isCustomDomain ? getCustomDomainTenant(tenant) : tenant;

    if (!tenant) {
      return (
        <div className="h-full w-full">
          <NotFoundPage />
        </div>
      );
    }

    let deviceType = 'desktop';
    try {
      deviceType = await detectDevice();
    } catch (error) {
      deviceType = 'desktop';
    }

    let data;
    let isPremium;
    try {
      data = await ReadTenantData(tenant);

      isPremium = await CheckPremiumStatus(RawTenant);
    } catch (error) {
      return (
        <div className="h-full w-full">
          <NotFoundPage />
        </div>
      );
    }

    if (!data) {
      return (
        <div className="h-full w-full">
          <NotFoundPage />
        </div>
      );
    }

    const theme = data?.theme || {
      name: 'Light',
      color: '#ffffff',
      textMode: 'dark',
      background: '#ffffff',
      cardBackground: '#ffffff',
    };

    const isDarkTheme = theme.textMode === 'light';
    const items = data?.items || [];
    const mobileItems = data?.mobileItems || [];
    const profile = data?.profile || {};
    const hideLeftPanelOnMobile = deviceType === 'mobile' && id ? true : false;
    const textColor = theme.textMode === 'dark' ? 'black' : 'white';

    // Mobile View with Scroll Effects
    if (deviceType === 'mobile' && !id) {
      return (
        <TenantSubscriptionProvider username={tenant}>
          <MobileScrollWrapper
            theme={theme}
            profile={profile}
            tenant={tenant}
            isPremium={isPremium}
          >
          {/* Initialize analytics and heatmap tracking */}
          <AnalyticsInitializer tenant={tenant} />
          <HeatmapInitializer username={tenant} />

          <main
            style={{
              background: theme.color,
              color: theme.textMode === 'dark' ? 'black' : 'white',
              '--theme-background': theme.cardBackground || '#ffffff',
              '--theme-color': theme.color || '#ffffff',
              '--theme-text-color':
                theme.textMode === 'dark' ? 'black' : 'white',
            }}
            className={`flex min-h-screen w-full flex-col items-start justify-start ${
              isDarkTheme ? 'dark' : 'light'
            }`}
          >
            {!isPremium && (
              <div className="fixed bottom-10 z-[9999] flex w-full justify-center">
                <CreateYourPocketlinkButton />
              </div>
            )}

            {/* Mobile Left Panel with scroll effects */}
            <div
              className={`relative flex ${profile?.displayMode === 'profile-pic' ? 'h-auto' : 'h-[90vh]'} w-full flex-shrink-0 flex-col items-center`}
            >
              {profile?.subscribeButtonOn && (
                <div className="absolute right-2 top-4 z-50">
                  <TenantSubscribeButton
                    username={tenant}
                    tenantTheme={theme}
                  />
                </div>
              )}

              {profile?.displayMode === 'profile-pic' ? (
                /* Profile Picture Mode */
                <div
                  style={{
                    position: 'relative',
                  }}
                  className="flex h-auto w-full flex-shrink-0 flex-col items-start justify-start pb-4 pt-16"
                >
                  {/* Profile Picture */}
                  <div className="mb-8 flex w-full justify-center">
                    <div className="relative flex flex-col items-center">
                      <img
                        src={
                          profile?.avatarURL ||
                          'https://via.placeholder.com/150?text=Avatar'
                        }
                        alt="Profile"
                        className="h-[128px] w-[128px] rounded-full border object-cover"
                        style={{ borderColor: theme?.border || '#000000' }}
                      />
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="w-full px-2">
                    <LeftPanel
                      profile={profile}
                      id={id}
                      username={tenant}
                      tenantTheme={theme}
                      isPremium={isPremium}
                    />
                  </div>
                </div>
              ) : (
                /* Banner Mode */
                <>
                  <div
                    className={`mobile-image-container relative z-0 w-full overflow-hidden ${isMobile ? 'h-auto' : 'h-[70vh]'}`}
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
                    className={`mobile-gradient-overlay z-10 ${isMobile ? 'h-auto' : 'h-[70vh]'}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 70%, ${
                        theme?.color || '#000000'
                      } 100%)`,
                      zIndex: 1,
                    }}
                  />

                  <div className="absolute bottom-16 z-10 w-full">
                    <LeftPanel
                      profile={profile}
                      id={id}
                      username={tenant}
                      tenantTheme={theme}
                      isPremium={isPremium}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Main Content */}
            <div className="relative flex w-full items-start justify-start px-1 py-1">
              <ResponsiveGridClient
                username={tenant}
                id={id}
                tenantTheme={theme}
                items={items}
                mobileItems={mobileItems}
              />
            </div>
          </main>
        </MobileScrollWrapper>
        </TenantSubscriptionProvider>
      );
    }

    // Regular Desktop View or Mobile with ID
    return (
      <TenantSubscriptionProvider username={tenant}>
        {/* Initialize analytics and heatmap tracking */}
        <AnalyticsInitializer tenant={tenant} />
        <HeatmapInitializer username={tenant} />

        <main
          style={{
            background: theme.color,
            color: theme.textMode === 'dark' ? 'black' : 'white',
            '--theme-background': theme.cardBackground || '#ffffff',
            '--theme-color': theme.color || '#ffffff',
            '--theme-text-color': theme.textMode === 'dark' ? 'black' : 'white',
          }}
          className={`flex h-screen w-full flex-col items-start justify-start overflow-y-auto md:flex-row ${
            isDarkTheme ? 'dark' : 'light'
          }`}
        >
          {/* Mobile Navigation Bar */}
          {id && (
            <div className="block w-full md:hidden">
              <TenantNavbar data={data} id={id} />
            </div>
          )}

          {!isPremium && (
            <div className="absolute bottom-10 z-[9999] flex w-full justify-center">
              <CreateYourPocketlinkButton />
            </div>
          )}

          {/* Left Panel for Desktop and Mobile with ID */}
          <div
            className={`relative h-[80vh] w-full text-black dark:text-white md:sticky md:top-0 md:h-full md:w-[35%] ${
              hideLeftPanelOnMobile ? 'hidden' : 'flex'
            } flex-shrink-0 flex-col items-center`}
          >
            {/* Subscribe Button */}
            <SubscribeAndBackBtn
              profile={profile}
              id={id}
              tenant={tenant}
              theme={theme}
            />

            {/* Profile Section - Conditional rendering based on display mode */}
            {profile?.displayMode === 'profile-pic' ? (
              /* Profile Picture Mode */
              <div className="relative flex w-full flex-shrink-0 flex-col items-start justify-start border-gray-100 bg-transparent pt-16 dark:border-[#1b1b1b]">
                {/* Profile Picture */}
                <div className="mb-8 flex w-full justify-center">
                  <div className="relative flex flex-col items-center">
                    <img
                      src={
                        profile?.avatarURL ||
                        'https://via.placeholder.com/150?text=Avatar'
                      }
                      alt="Profile"
                      className="h-[128px] w-[128px] rounded-full border object-cover"
                      style={{ borderColor: theme?.border || '#000000' }}
                    />
                  </div>
                </div>

                {/* Profile Content */}
                <div className="w-full">
                  <LeftPanel
                    profile={profile}
                    id={id}
                    username={tenant}
                    tenantTheme={theme}
                    isPremium={isPremium}
                  />

                  <div
                    className={`${
                      hideLeftPanelOnMobile ? 'hidden' : 'block'
                    } w-full md:hidden`}
                  >
                    <DockContainer
                      component={profile?.component}
                      tenant={tenant}
                      themeData={theme}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Banner Mode */
              <>
                <div className="relative z-0 h-[60vh] w-full overflow-hidden md:h-[80vh]">
                  <Image
                    fill
                    src={profile?.avatarURL}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    alt="Profile banner"
                  />
                </div>

                {/* Gradient overlay */}
                <div
                  className="z-10 h-[60vh] md:h-[80vh]"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 70%, ${
                      theme?.color || '#000000'
                    } 100%)`,
                    zIndex: 1,
                  }}
                />

                <div className="absolute bottom-8 z-10 w-full md:bottom-16">
                  <LeftPanel
                    profile={profile}
                    id={id}
                    username={tenant}
                    tenantTheme={theme}
                    isPremium={isPremium}
                  />

                  <div
                    className={`${
                      hideLeftPanelOnMobile ? 'hidden' : 'block'
                    } w-full md:hidden`}
                  >
                    <DockContainer
                      component={profile?.component}
                      tenant={tenant}
                      themeData={theme}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Main Content */}
          <div className="relative flex h-full w-full items-start justify-start px-1 py-1 text-black dark:text-white md:pt-3">
            <ResponsiveGridClient
              username={tenant}
              id={id}
              tenantTheme={theme}
              items={items}
              mobileItems={mobileItems}
            />
          </div>
        </main>
      </TenantSubscriptionProvider>
    );
  } catch (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <NotFoundPage />
      </div>
    );
  }
}
