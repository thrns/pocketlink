'use client';
import { useOnboarding } from '@/app/contexts/OnboardingContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ref, set } from 'firebase/database';
import { realDb } from '@/Clients/FireUserNameDb';
import { supabase } from '@/Clients/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/app/contexts/AuthContext';
import Cookies from 'js-cookie';
import {
  defaultItems,
  defaultMobileItems,
  defaultTheme,
} from '@/app/onboarding/constants/defaultLayout';

export default function OnboardingLoading({ nextStep }) {
  const { user, setUser } = useAuth();

  const {
    username,
    socialLinks,
    items,
    setItems,
    mobileItems,
    setMobileItems,
    setProfile,
    selectedTopics,
    bio,
    selectedLinks,
    inputValues,
    name,
    theme,
    setTheme,
    generatedLayout,
  } = useOnboarding();

  const router = useRouter();
  const [currentOperation, setCurrentOperation] = useState('Initializing');
  const [progress, setProgress] = useState(0);
  const [rocketPosition, setRocketPosition] = useState(0);
  const [stars, setStars] = useState([]);

  // Generate stars with random positions
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 20 + 10,
    }));
    setStars(newStars);
  }, []);

  // Update rocket position based on progress
  useEffect(() => {
    setRocketPosition(progress);
  }, [progress]);

  useEffect(() => {
    const setupUserProfile = async () => {
      try {
        // Step 1: Set username in Firebase
        setCurrentOperation('Setting up your username');
        setProgress(10);
        const firstLetter = username.charAt(0).toLowerCase();
        const usernameRef = ref(realDb, `usernames/${firstLetter}/${username}`);
        await set(usernameRef, username);

        // Simulate Firebase operation
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Step 2: Use hardcoded default layout instead of AI generation
        setCurrentOperation('Setting up your layout');
        setProgress(30);

        // Set items and theme with our hardcoded defaults, and add URL items from selectedLinks
        const urlItems = selectedLinks.map((link, index) => {
          // Generate positions for desktop layout
          return {
            h: 3,
            i: crypto.randomUUID(),
            w: 3,
            x: 0,
            y: 0,
            url: link.url,
            type: 'url',
            title: link.name,
            favicon: `https://www.google.com/s2/favicons?sz=64&domain_url=${link.url}`,
            sizeKey: 'square',
            showPreview: false,
            displayImage: null,
          };
        });

        // Generate mobile URL items
        const mobileUrlItems = selectedLinks.map((link, index) => {
          // Position them at the top after the welcome image

          return {
            h: 4,
            i: crypto.randomUUID(),
            w: 1,
            x: 0,
            y: 0,
            url: link.url,
            type: 'url',
            title: link.name,
            favicon: `https://www.google.com/s2/favicons?sz=64&domain_url=${link.url}`,
            sizeKey: 'square',
            showPreview: false,
            displayImage: null,
          };
        });

        // Combine default items with URL items
        const combinedItems = [...defaultItems, ...urlItems];
        const combinedMobileItems = [...defaultMobileItems, ...mobileUrlItems];

        setItems(combinedItems);
        setMobileItems(combinedMobileItems);
        setTheme(defaultTheme);

        // Add a small delay to simulate processing
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Step 3: Update user in Supabase "user_data"
        setCurrentOperation('Updating your profile');
        setProgress(50);

        // Create welcome notification
        const welcomeNotification = {
          id: `welcome-${Date.now()}`,
          title: 'Welcome to Pocketlink!',
          message:
            'Thanks for joining! Refer friends to unlock premium features for free.',
          time: new Date().toISOString(),
          read: false,
        };

        const now = new Date();
        const trialEndDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days from now

        // Check if user already has subscription data (edge case protection)
        const { data: existingUser } = await supabase
          .from('user_data')
          .select('subscription_tier, is_premium, trial_used')
          .eq('uuid', user.uuid)
          .single();

        // Only set up trial for users without existing subscription data
        const shouldSetupTrial =
          !existingUser?.subscription_tier && !existingUser?.is_premium;

        const userData = {
          ...user,
          username: username,
          loggedin_at: now.toISOString(),
          created_at: now.toISOString(),
          onboarding: true,
          notifications: [welcomeNotification],
        };

        // Only add trial data for truly new free users
        if (shouldSetupTrial) {
          userData.subscription_tier = 'free';
          userData.trial_used = true;
          userData.trial_start_date = now.toISOString();
          userData.trial_end_date = trialEndDate.toISOString();
        }

        const { error: userDataErr } = await supabase
          .from('user_data')
          .upsert(userData, { onConflict: ['uuid'] })
          .select()
          .single();

        if (userDataErr) {
          throw new Error(userDataErr.message);
        }

        //simulate supabase operation
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Step 3.5: Set up default subscription group
        setCurrentOperation('Setting up email lists');
        setProgress(60);
        const { error: subscriptionGroupError } = await supabase
          .from('subscriptions')
          .upsert({
            username: username,
            subscription_name: 'My Subscribers',
            subscription_description: 'My default list of email subscribers.',
            subscribed: [
              {
                name: name || user?.name || '',
                email: user?.email,
                subscribed_at: new Date().toISOString(),
                source: 'onboarding',
              },
            ],
            unsubscribed: [],
            form_fields: [
              {
                id: 'email',
                label: 'Email Address',
                type: 'email',
                required: true,
                apearance: 'email',
              },
              {
                id: 'first_name',
                label: 'First Name',
                type: 'text',
                required: false,
                apearance: 'text',
              },
              {
                id: 'last_name',
                label: 'Last Name',
                type: 'text',
                required: false,
                apearance: 'text',
              },
            ],
            updated_at: new Date().toISOString(),
          });

        if (subscriptionGroupError) {
          // It's often better to log this error but not necessarily block onboarding
          // unless this step is absolutely critical.
          console.error(
            'Error setting up default subscription group:',
            subscriptionGroupError.message
          );
          // Optionally, you could toast a non-critical error here
          // toast.warn("Could not set up default email list.", { description: subscriptionGroupError.message });
        }
        // Simulate operation
        await new Promise((resolve) => setTimeout(resolve, 300));

        // ================== UPDATE REFERRER ================== //

        const referralParam = Cookies.get('referral_username');

        if (referralParam) {
          // 1. Get the referrer's user data
          const { data: referrerData, error: referrerError } = await supabase
            .from('user_data')
            .select('*')
            .eq('username', referralParam)
            .single();

          if (referrerError || !referrerData) {
            console.error('❌ Error finding referrer:', referrerError);
            Cookies.remove('referral_username');
            return;
          }

          // 2. Increment people_referred count
          const currentReferrals = referrerData.people_referred || 0;

          const { error: updateError } = await supabase
            .from('user_data')
            .update({ people_referred: currentReferrals + 1 })
            .eq('username', referralParam);

          if (updateError) {
            console.error('❌ Error updating referrer count:', updateError);
          }

          // 3. Add notification for the referrer
          const { error: notifError } = await supabase
            .from('user_data')
            .update({
              notifications: [
                ...(referrerData?.notifications || []),
                {
                  id: `referrer-${Date.now()}`,
                  title: 'referral',
                  message: 'Someone signed up using your referral link!',
                  read: false,
                  time: new Date().toISOString(),
                  read: false,
                },
              ],
            })
            .eq('username', referralParam);

          if (notifError) {
            console.error(
              'Error adding notification for referrer:',
              notifError
            );
          }

          // 4. Remove the referral cookie after processing

          localStorage.removeItem('referral_username');
          Cookies.remove('referral_username');
        }

        // Step 4: Set up items, mobileItems, theme, and profile
        setCurrentOperation('Setting up your Pocketlink');
        setProgress(70);

        // Prepare social links for contact dock
        const componentProps = selectedLinks.map((link) => ({
          id: crypto.randomUUID(),
          link: link.url,
          type: 'social',
          label: link.name,
          iconUrl: `https://www.google.com/s2/favicons?sz=64&domain_url=${
            new URL(link.platform).hostname
          }`,
        }));

        const updatedProfile = {
          name: name || user.name,
          avatarURL: user.avatarURL,
          component: {
            name: 'contactDock',
            componentProps,
          },
          description: bio,
          subscribeButtonOn: true,
        };

        // Use our combined items with generated URL cards
        const finalItems = combinedItems;
        const finalMobileItems = combinedMobileItems;
        const finalTheme = defaultTheme;

        const { error: itemsDataErr } = await supabase
          .from('items_data')
          .upsert(
            {
              username,
              uuid: user?.uuid,
              items: finalItems,
              mobileItems: finalMobileItems,
              theme: finalTheme,
              profile: updatedProfile,
            },
            { onConflict: ['uuid'] }
          );

        if (itemsDataErr) {
          console.error('Error in onboarding:', itemsDataErr);
          toast.error('Something went wrong', {
            description: itemsDataErr.message,
          });
        }
        // Step 5: Update local user context with complete user data
        setCurrentOperation('Finalizing setup');
        setProgress(90);

        // Create the complete updated user object including trial data
        const updatedUser = {
          ...user,
          username,
          subscription_tier: shouldSetupTrial ? 'free' : user.subscription_tier,
          trial_used: shouldSetupTrial ? true : user.trial_used,
          trial_start_date: shouldSetupTrial
            ? now.toISOString()
            : user.trial_start_date,
          trial_end_date: shouldSetupTrial
            ? trialEndDate.toISOString()
            : user.trial_end_date,
          onboarding: true,
          loggedin_at: now.toISOString(),
          created_at: now.toISOString(),
          notifications: [welcomeNotification],
        };

        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Step 6: Update local "fetch" context data
        setProfile(updatedProfile);

        // Step 7: Navigate to dashboard
        setCurrentOperation('Setup complete');
        setProgress(100);
        toast.success('Success!', {
          description: 'Redirecting to the dashboard...',
          style: {
            backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
            color: 'white',
            borderRadius: '8px',
          },
        });

        // Simulate a delay before redirecting
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push('/dashboard');
      } catch (error) {
        console.error('Error in onboarding:', error);
        toast.error('Something went wrong', {
          description: error.message,
        });
      }
    };

    setupUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6">
      {/* Stars background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #6363F7 0%, #D754AE 50%, #6363F7 100%)',
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s infinite ease-in-out`,
            }}
          ></div>
        ))}
      </div>

      {/* Rocket and path */}
      <div className="relative mb-12 w-full max-w-md">
        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <motion.div
          className="absolute top-0 -translate-y-full transform"
          style={{
            left: `${rocketPosition}%`,
            rotate: progress < 5 ? -15 : progress > 95 ? 15 : 0,
          }}
          animate={{
            y: [0, -5, 0],
            rotate: progress < 5 ? -15 : progress > 95 ? 15 : 0,
          }}
          transition={{
            y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
            rotate: { duration: 0.5 },
          }}
        >
          <div className="relative -left-8">
            <img src="/rocket.webp" alt="Rocket" className="h-12 w-12" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="mb-2 text-3xl font-bold text-white">
          Setting Up Your Pocketlink
        </h1>
        <p className="mb-8 text-lg text-purple-200">{currentOperation}...</p>

        <div className="flex flex-col items-center">
          <div className="relative mb-6 h-16 w-16">
            <div className="h-full w-full animate-spin rounded-full border-4 border-b-transparent border-l-transparent border-r-transparent border-t-purple-500"></div>
            <div
              className="absolute left-0 top-0 h-full w-full animate-spin rounded-full border-4 border-b-transparent border-l-transparent border-r-purple-300 border-t-transparent"
              style={{ animationDuration: '1.5s' }}
            ></div>
          </div>

          <div className="max-w-xs text-sm text-white text-opacity-80">
            <p>
              We're setting up your personalized Pocketlink. This will just take
              a moment...
            </p>
          </div>
        </div>
      </motion.div>

      {/* CSS for twinkling stars and rocket */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes flame {
          0%,
          100% {
            height: 10px;
            opacity: 0.8;
          }
          50% {
            height: 14px;
            opacity: 1;
          }
        }

        @keyframes innerFlame {
          0%,
          100% {
            height: 7px;
            opacity: 0.6;
          }
          50% {
            height: 9px;
            opacity: 0.9;
          }
        }

        @keyframes particle1 {
          0% {
            transform: translate(-3px, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-5px, 10px) scale(0);
            opacity: 0;
          }
        }

        @keyframes particle2 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(0, 12px) scale(0);
            opacity: 0;
          }
        }

        @keyframes particle3 {
          0% {
            transform: translate(3px, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(5px, 10px) scale(0);
            opacity: 0;
          }
        }

        .animate-flame {
          animation: flame 0.6s infinite alternate ease-in-out;
        }

        .animate-innerFlame {
          animation: innerFlame 0.4s infinite alternate ease-in-out;
        }

        .animate-particle1 {
          animation: particle1 1.2s infinite linear;
        }

        .animate-particle2 {
          animation: particle2 1s infinite linear;
        }

        .animate-particle3 {
          animation: particle3 1.4s infinite linear;
        }
      `}</style>
    </div>
  );
}
