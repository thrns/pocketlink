import LeftPanel from '../components/LeftPanel';
import ResponsiveGridClient from '../components/ResponsiveGridClient';
import { detectDevice } from '../utils/detectDevice';
import NotFoundPage from '../components/NotFoundPage';
import Image from 'next/image';
import TenantSubscribeButton from '../components/TenantSubscribeButton';
import MobileScrollWrapper from '../components/MobileScrollWrapper';
import SubscribeAndBackBtn from '../components/SubscribeAndBackBtn';
import { fetchClaimById } from '../lib/actions';
import InfoDisclaimer from '../components/InfoDisclaimer';
import { createSupabaseClient } from '@/Clients/supabase/server';

// ==================== data?.claim_username PAGE ==================== //
export async function generateMetadata({ params }) {
  const { id } = await params;
  const claimId = id[0]; // Extract the first element from the id array

  const supabase = await createSupabaseClient();

  const { data, error: dataError } = await supabase
    .from('claim_data')
    .select('*')
    .eq('uuid', claimId)
    .single();

  try {
    // Use optional chaining to safely access tenant
    if (!data) {
      return {
        title: 'Cannot claim, Pocketlink not Found',
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
    const ogImageUrl = `https://pocketlink.co/api/og?uuid=${encodeURIComponent(id)}`;

    // Construct metadata object with safe values
    return {
      metadataBase: new URL('https://pocketlink.co'),
      title: name,
      description: description,
      openGraph: {
        title: name,
        description: description,
        url: `https://pocketlink.co/${encodeURIComponent(id)}`,
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
    console.error('Error generating metadata:', error);
    // Fallback metadata in case of any errors
    return {
      title: 'Pocketlink',
      description: 'Create your online shop in minutes',
    };
  }
}

export default async function Page({ params }) {
  try {
    const { id } = await params;
    const claimId = id[0];
    if (!claimId) {
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
    const isPremium = true;
    try {
      data = await fetchClaimById(claimId);
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
    const textColor = theme.textMode === 'dark' ? 'black' : 'white';

    // Mobile View with Scroll Effects
    if (deviceType === 'mobile') {
      return (
        <MobileScrollWrapper
          theme={theme}
          profile={profile}
          tenant={data?.claim_username}
          isPremium={isPremium}
        >
          <main
            style={{ background: theme.color }}
            className={`flex min-h-screen w-full flex-col items-start justify-start ${
              isDarkTheme ? 'dark' : 'light'
            }`}
          >
            <InfoDisclaimer />

            {/* Mobile Left Panel with scroll effects */}
            <div className="relative flex h-[90vh] w-full flex-shrink-0 flex-col items-center">
              {profile?.subscribeButtonOn && (
                <div className="absolute right-2 top-4 z-50">
                  <TenantSubscribeButton
                    username={data?.claim_username}
                    tenantTheme={theme}
                  />
                </div>
              )}

              <div className="mobile-image-container relative z-0 h-[70vh] w-full overflow-hidden">
                <Image
                  fill
                  src={profile?.avatarURL}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  alt="Profile banner"
                />
              </div>

              {/* Gradient overlay */}
              <div
                className="mobile-gradient-overlay z-10 h-[70vh]"
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

              <div className="absolute bottom-10 z-10 w-full">
                <LeftPanel
                  profile={profile}
                  username={data?.claim_username}
                  tenantTheme={theme}
                  isPremium={isPremium}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="relative flex w-full items-start justify-start px-1 py-1">
              <ResponsiveGridClient
                username={data?.claim_username}
                tenantTheme={theme}
                items={items}
                mobileItems={mobileItems}
              />
            </div>
          </main>
        </MobileScrollWrapper>
      );
    }

    // Regular Desktop View or Mobile with ID
    return (
      <>
        <main
          style={{ background: theme.color }}
          className={`flex h-screen w-full flex-col items-start justify-start overflow-y-auto md:flex-row ${
            isDarkTheme ? 'dark' : 'light'
          }`}
        >
          {/* Left Panel for Desktop and Mobile with ID */}
          <div
            className={`relative flex h-[70vh] w-full flex-shrink-0 flex-col items-center text-black dark:text-white md:sticky md:top-0 md:h-full md:w-[35%]`}
          >
            {/* Subscribe Button */}
            <SubscribeAndBackBtn
              profile={profile}
              tenant={data?.claim_username}
              theme={theme}
            />

            <InfoDisclaimer />

            {/* Profile Banner */}

            <div className="relative z-0 h-[50vh] w-full overflow-hidden md:h-[80vh]">
              <Image
                fill
                src={profile?.avatarURL}
                className="absolute inset-0 h-full w-full object-cover object-center"
                alt="Profile banner"
              />
            </div>

            {/* Gradient overlay */}
            <div
              className="z-10 h-[50vh] md:h-[80vh]"
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

            <div className="absolute bottom-0 z-10 w-full md:bottom-24">
              <LeftPanel
                profile={profile}
                username={data?.claim_username}
                tenantTheme={theme}
                isPremium={isPremium}
                items={data?.items}
                mobileItems={data?.mobileItems}
                theme={data?.theme}
                ogPreviewType={data?.ogPreviewType}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative flex h-full w-full items-start justify-start px-1 py-1 text-black dark:text-white md:pt-3">
            <ResponsiveGridClient
              username={data?.claim_username}
              tenantTheme={theme}
              items={items}
              mobileItems={mobileItems}
            />
          </div>
        </main>
      </>
    );
  } catch (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <NotFoundPage />
      </div>
    );
  }
}
