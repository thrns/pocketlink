'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTwitter } from 'react-icons/fa';
import OnboardingGreeting from './sections/OnboardingGreeting';
import OnboardingUsername from './sections/OnboardingUsername';
import OnboardingSocials from './sections/OnboardingSocials';
import OnboardingLoading from './sections/OnboardingLoading';
import OnboardingTemplates from './sections/OnboardingTemplates';
import OnboardingFinalPage from './sections/OnboardingFinalPage';
import { useOnboarding } from '@/app/contexts/OnboardingContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Akash Pai",
    handle: "@akashpai",
    content: "A very good website to easily display your work, made a quick portfolio in less than 30 mins.",
    avatar: "https://pbs.twimg.com/profile_images/1496951793523503106/_hHnLOSe_400x400.jpg"
  },
  {
    id: 2,
    name: "Xtremlite",
    handle: "@xtremlite",
    content: "It feels good and its free. Overall, 8/10",
    avatar: "https://pbs.twimg.com/profile_images/1916855623641448448/-QFZ54kG_400x400.jpg"
  },
  {
    id: 3,
    name: "Gargii Chatterjee",
    handle: "@gargiii",
    content: "My profile looks soooooo good!! My conversions and sales shot up since I started using it.",
    avatar: "https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/avatars/user/banner/1746765468499-user"
  },
  {
    id: 4,
    name: "Sonal",
    handle: "@sonal",
    content: "Pocketlink allows me showcase all of my social media accounts while maintaining my aesthetics.",
    avatar: "https://pbs.twimg.com/profile_images/1886454721285906433/dwY1tlG1_400x400.jpg"
  },
  {
    id: 5,
    name: "Aashir",
    handle: "@aashir",
    content: "I don't have to maintain a separate website to showcase my portfolio. Simplified yet premium.",
    avatar: "https://pbs.twimg.com/profile_images/1759205247992418304/Fv3lPgjT_400x400.jpg"
  },
  {
    id: 6,
    name: "Avantika Madhur",
    handle: "@avantika",
    content: "I absolutely loved it. It's so easy to use and so customisable. JUST A WOW.",
    avatar: "https://pbs.twimg.com/profile_images/1789598238229536768/bZ76j9Y4_400x400.jpg"
  },
  {
    id: 7,
    name: "Arjun Sethi",
    handle: "@arjun",
    content: "I ditched my wix made portfolio site for this.",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQGauteu5yXwyA/profile-displayphoto-shrink_800_800/B56ZToAevIGoAg-/0/1739059228054?e=1752105600&v=beta&t=9MF6VUiUHpCUVPlHGNr2AtiQrQitwAml0sdgMvrsAGw"
  }
];

export default function OnboardingController() {
  const { user } = useAuth();
  const {
    step,
    setStep,
    username,
    setUsername,
    socialLinks,
    setSocialLinks,
    topics,
    setTopics,
    items,
    setItems,
    mobileItems,
    setMobileItems,
    profile,
    setProfile,
    totalSteps,
    progress,
    nextStep,
    prevStep,
  } = useOnboarding();

  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (user && user?.username) {
      router.push('/dashboard');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full">
      {/* Progress Bar */}
      <div className="absolute left-0 top-0 z-50 h-2 w-full bg-gray-300">
        <div
          className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Desktop Split Layout */}
      <div className="hidden md:flex w-full h-screen">
        {/* Left Side - Image and Testimonials */}
        <div className={`${step === 4 ? 'hidden' : 'w-1/2'} bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8 relative overflow-y-auto`}>
          {/* Main Image */}
          <div className="relative z-10 mb-8">
            <Image
              src="/AI/pocket.png"
              alt="PocketLink AI"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          {/* Testimonial Cards */}
          <div className="relative w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {testimonials[currentTestimonial].handle}
                      </span>
                      <FaTwitter className="text-blue-400 text-sm flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {testimonials[currentTestimonial].content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-blue-500 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Onboarding Steps */}
        <div className={`${step === 4 ? 'w-full' : 'w-1/2'} flex flex-col items-center justify-center bg-white ${step === 4 ? 'relative' : 'fixed right-0 top-0'} h-screen`}>
          {step === 0 && <OnboardingGreeting nextStep={nextStep} />}
          {step === 1 && <OnboardingUsername />}
          {step === 2 && (
            <OnboardingSocials
              nextStep={nextStep}
              setSocialLinks={setSocialLinks}
            />
          )}
          {step === 3 && <OnboardingFinalPage nextStep={nextStep} />}
          {step === 4 && <OnboardingLoading nextStep={nextStep} />}
        </div>
      </div>

      {/* Mobile Layout - Original Design */}
      <div className="md:hidden flex min-h-screen w-full flex-col items-center justify-center">
        {step === 0 && <OnboardingGreeting nextStep={nextStep} />}
        {step === 1 && <OnboardingUsername />}
        {step === 2 && (
          <OnboardingSocials
            nextStep={nextStep}
            setSocialLinks={setSocialLinks}
          />
        )}
        {step === 3 && <OnboardingFinalPage nextStep={nextStep} />}
        {step === 4 && <OnboardingLoading nextStep={nextStep} />}
      </div>
    </div>
  );
}
