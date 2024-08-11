'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  CheckCircle,
  Copy,
  Award,
  Star,
  Share2,
  Crown,
  Clock,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

const ReferralPopup = ({ children, iconOnly = false }) => {
  const { user, getReferralPremiumDetails } = useAuth();
  const [open, setOpen] = useState(false);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [openedGift, setOpenedGift] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Get referral premium details
  const referralPremiumDetails = getReferralPremiumDetails();

  // Check if reward was claimed for a specific milestone
  const isRewardClaimed = (milestoneNumber) => {
    if (!user?.reward) return false;

    switch (milestoneNumber) {
      case 12:
        return user.reward?.milestone1 === true;
      case 24:
        return user.reward?.milestone2 === true;
      case 36:
        return user.reward?.milestone3 === true;
      default:
        return false;
    }
  };

  // Check if user has active subscription (simplified)
  const hasActiveSubscription = () => {
    return (
      user?.subscription_status === 'active' ||
      user?.has_active_subscription === true
    );
  };

  // Check if premium reward is queued (earned but will activate after current subscription)
  const isPremiumRewardQueued =
    referralPremiumDetails.monthsEarned > 0 &&
    referralPremiumDetails.queuedForSubscriptionEnd &&
    !referralPremiumDetails.isActive;

  // Define the milestones and their rewards with unlock status
  const milestones = [
    {
      count: 12,
      reward: '1 Month Free Starter',
      description: 'Earn 1 month of free starter plan access',
      icon: '👑',
      color: '#FFD700',
      unlocked: user?.people_referred >= 12,
      claimed: isRewardClaimed(12),
      special: true,
    },

    {
      count: 24,
      reward: '1 Month Free Starter',
      description: 'Earn 1 month of free starter plan access',
      icon: '👑',
      color: '#FFD700',
      unlocked: user?.people_referred >= 24,
      claimed: isRewardClaimed(24),
      special: true,
    },

    {
      count: 36,
      reward: '1 Month Free Starter',
      description: 'Earn 1 month of free starter plan access',
      icon: '👑',
      color: '#FFD700',
      unlocked: user?.people_referred >= 36,
      claimed: isRewardClaimed(36),
      special: true,
    },
  ];

  const handleCopyReferral = () => {
    const referralLink = `https://pocketlink.co/signup?referral=${user?.username}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralLink);
    }
    toast.success('Referral link copied to clipboard!', {
      description: 'Share with your friends to earn rewards!',
      style: {
        backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD)',
        color: 'white',
        borderRadius: '8px',
      },
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const getNextMilestone = () => {
    for (let i = 0; i < milestones.length; i++) {
      if (user?.people_referred < milestones[i].count) {
        return {
          index: i,
          count: milestones[i].count,
          remaining: milestones[i].count - user?.people_referred,
          reward: milestones[i].reward,
          color: milestones[i].color,
        };
      }
    }
    return null;
  };

  const nextMilestone = getNextMilestone();
  const progressPercent = nextMilestone
    ? (user?.people_referred / nextMilestone.count) * 100
    : 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ||
          (iconOnly ? (
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="p-2"
              aria-label="Refer a Friend"
            >
              <Image src="/gift.webp" alt="gift" width={20} height={20} />
            </Button>
          ) : (
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Image src="/gift.webp" alt="gift" width={16} height={16} />
              Refer a Friend
            </Button>
          ))}
      </DialogTrigger>
      <DialogContent className="max-w-xl overflow-hidden border-none p-0">
        <div className="w-full overflow-hidden bg-white shadow-lg">
          <div className="max-h-[80vh] overflow-y-auto">
            {/* Header section with purple gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600">
              <div className="px-6 pb-5 pt-6 text-center">
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-white">
                    Refer Friends & Earn Rewards
                  </h2>
                  <p className="mt-1 text-sm text-purple-100">
                    Share your link and unlock exciting features when friends
                    sign up!
                  </p>
                </div>

                {/* Stats summary */}
                <div className="mt-3 flex items-center justify-center gap-6 rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-white/20 p-2">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-white/70">
                        Your Referrals
                      </div>
                      <div className="text-xl font-bold text-white">
                        {user?.people_referred}
                      </div>
                    </div>
                  </div>

                  <div className="h-10 w-px bg-white/20"></div>

                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-white/20 p-2">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-white/70">Next Reward</div>
                      <div className="text-sm font-medium text-white">
                        {nextMilestone ? nextMilestone.reward : 'All Unlocked!'}
                      </div>
                      {nextMilestone && (
                        <div className="text-xs text-indigo-200">
                          {nextMilestone.remaining} more needed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy button - now part of scrollable content */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleCopyReferral}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white bg-white/90 font-medium text-purple-700"
                >
                  <Copy className="h-4 w-4" />
                  Copy Your Referral Link
                </button>
              </div>
            </div>

            {/* Content area - now all part of one scrollable container */}
            <div className="p-6">
              {/* Premium through referrals section */}
              {referralPremiumDetails.monthsEarned > 0 && (
                <div className="mb-6 rounded-lg border border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 p-4">
                  <div className="mb-3 flex items-center">
                    <Crown className="mr-2 h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold text-amber-800">
                      Free Starter Access Earned
                    </h3>
                  </div>

                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm text-amber-700">
                      <span className="text-lg font-bold">
                        {referralPremiumDetails.monthsEarned}
                      </span>{' '}
                      month{referralPremiumDetails.monthsEarned > 1 ? 's' : ''}{' '}
                      earned through referrals
                    </div>
                  </div>

                  {/* Status indicators */}
                  <div className="space-y-2">
                    {referralPremiumDetails.isActive &&
                      referralPremiumDetails.expiryDate && (
                        <div className="flex items-center rounded-md border border-green-100 bg-green-50 p-2">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          <div>
                            <div className="text-xs font-medium text-green-700">
                              Active Free Starter
                            </div>
                            <div className="text-xs text-green-600">
                              Expires on{' '}
                              {format(
                                new Date(referralPremiumDetails.expiryDate),
                                'MMMM d, yyyy'
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                    {isPremiumRewardQueued && (
                      <div className="flex items-center rounded-md border border-amber-100 bg-amber-50 p-2">
                        <Clock className="mr-2 h-4 w-4 text-amber-500" />
                        <div>
                          <div className="text-xs font-medium text-amber-700">
                            Free Starter Queued
                          </div>
                          <div className="text-xs text-amber-600">
                            Will activate automatically after your current
                            subscription ends
                          </div>
                        </div>
                      </div>
                    )}

                    {!referralPremiumDetails.isActive &&
                      !isPremiumRewardQueued && (
                        <div className="flex items-center rounded-md border border-blue-100 bg-blue-50 p-2">
                          <AlertCircle className="mr-2 h-4 w-4 text-blue-500" />
                          <div>
                            <div className="text-xs font-medium text-blue-700">
                              Available to Use
                            </div>
                            <div className="text-xs text-blue-600">
                              Contact support to activate your earned free
                              starter access
                            </div>
                          </div>
                        </div>
                      )}

                    {hasActiveSubscription() && !isPremiumRewardQueued && (
                      <div className="mt-2 flex items-center rounded-md border border-purple-100 bg-purple-50 p-2">
                        <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                        <div className="text-xs text-purple-600">
                          You already have an active subscription. Referral
                          rewards will be used after your subscription ends.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center text-xs text-amber-600">
                    <div className="mr-2 rounded bg-amber-200/50 p-1">
                      <Gift className="h-3 w-3 text-amber-600" />
                    </div>
                    Refer 12 friends to earn another month of free starter
                    access
                  </div>
                </div>
              )}

              {/* Progress tracker with clean indicators */}
              <div className="relative mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Your Progress</h3>
                  {nextMilestone && (
                    <span className="text-xs font-medium text-purple-600">
                      {nextMilestone.remaining} more to unlock{' '}
                      {nextMilestone.reward}
                    </span>
                  )}
                </div>

                {/* Progress bar background */}
                <div className="relative mb-5 h-2 rounded-full bg-gray-100">
                  {/* Filled progress */}
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      width: `${progressPercent}%`,
                      background: 'linear-gradient(90deg, #8A2BE2, #3CB371)',
                    }}
                  />
                </div>

                {/* Milestone labels */}
                <div className="flex justify-between px-1 text-xs font-medium text-gray-500">
                  {milestones.slice(0, 5).map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex cursor-pointer flex-col items-center ${
                        user?.people_referred >= milestone.count
                          ? milestone.special
                            ? 'text-amber-600'
                            : 'text-green-600'
                          : ''
                      }`}
                      onMouseEnter={() => setHoveredMilestone(index)}
                      onMouseLeave={() => setHoveredMilestone(null)}
                    >
                      <div
                        className={`mb-1 flex h-4 w-4 items-center justify-center rounded-full ${
                          user?.people_referred >= milestone.count
                            ? milestone.special
                              ? milestone.claimed
                                ? 'border border-amber-300 bg-amber-100'
                                : 'border border-blue-300 bg-blue-100'
                              : 'border border-green-300 bg-green-100'
                            : 'border border-gray-200 bg-gray-100'
                        }`}
                      >
                        {user?.people_referred >= milestone.count && (
                          <CheckCircle
                            className={`h-3 w-3 ${
                              milestone.special
                                ? milestone.claimed
                                  ? 'text-amber-600'
                                  : 'text-blue-600'
                                : 'text-green-600'
                            }`}
                          />
                        )}
                      </div>
                      {milestone.count}

                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredMilestone === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute z-10 mt-7 w-48 rounded-lg border border-gray-200 bg-white p-2"
                          >
                            <div className="flex items-start gap-2">
                              <div
                                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-lg"
                                style={{
                                  background: `${milestone.color}15`,
                                  color: milestone.color,
                                }}
                              >
                                {milestone.icon}
                              </div>
                              <div>
                                <div
                                  className="text-sm font-medium"
                                  style={{ color: milestone.color }}
                                >
                                  {milestone.reward}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {milestone.description}
                                </div>
                                {milestone.unlocked && (
                                  <div className="mt-1 text-xs font-medium">
                                    {milestone.claimed
                                      ? '✓ Reward claimed'
                                      : '⚠️ Reward available to claim'}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="absolute left-1/2 top-0 -ml-1 -mt-1 h-2 w-2 rotate-45 transform border-l border-t border-gray-200 bg-white"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone cards */}
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">
                    Referral Milestones
                  </h3>
                  {nextMilestone && (
                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                      Next: {nextMilestone.reward}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {milestones.map((milestone, index) => {
                    const isAchieved = user?.people_referred >= milestone.count;
                    const isNext = nextMilestone?.index === index;
                    const isPremiumMilestone = milestone.special;
                    const isClaimed = milestone.claimed;

                    return (
                      <motion.div
                        key={index}
                        whileHover={{ x: 3 }}
                        className={`flex items-center rounded-lg border p-3 ${
                          isAchieved
                            ? isPremiumMilestone
                              ? isClaimed
                                ? 'border-amber-200 bg-amber-50'
                                : 'border-blue-200 bg-blue-50'
                              : 'border-green-200 bg-green-50'
                            : isNext
                              ? 'border-purple-200 bg-purple-50'
                              : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        <div
                          className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                          style={{
                            background: `${milestone.color}15`,
                            color: milestone.color,
                          }}
                        >
                          {milestone.icon}
                        </div>

                        <div className="mr-3 flex-1">
                          <div className="flex flex-wrap items-center gap-1 text-sm font-medium">
                            {milestone.reward}
                            {isNext && (
                              <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-xs text-purple-700">
                                Next
                              </span>
                            )}
                            {milestone.unlocked && !isClaimed && (
                              <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700">
                                Available
                              </span>
                            )}
                            {milestone.unlocked && isClaimed && (
                              <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                                Claimed
                              </span>
                            )}
                            {isPremiumMilestone && (
                              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">
                                Starter
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600">
                            {milestone.description}
                          </div>
                        </div>

                        <div className="flex flex-shrink-0 items-center">
                          {isAchieved ? (
                            <div className="flex items-center text-sm">
                              <CheckCircle
                                className={`mr-1 h-4 w-4 ${
                                  isPremiumMilestone
                                    ? isClaimed
                                      ? 'text-amber-600'
                                      : 'text-blue-600'
                                    : 'text-green-600'
                                }`}
                              />
                              <span
                                className={`font-medium ${
                                  isPremiumMilestone
                                    ? isClaimed
                                      ? 'text-amber-600'
                                      : 'text-blue-600'
                                    : 'text-green-600'
                                }`}
                              >
                                {isClaimed ? 'Claimed' : 'Unlocked'}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <div
                                className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold"
                                style={{
                                  background: `${milestone.color}15`,
                                  color: milestone.color,
                                }}
                              >
                                {milestone.count}
                              </div>
                              <span className="text-xs text-gray-500">
                                refs
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Tips for sharing */}
              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <h4 className="text-sm font-medium text-blue-800">Pro Tips</h4>
                <ul className="mt-1 space-y-1 text-xs text-blue-700">
                  <li className="flex items-center gap-1">
                    <span>•</span> Share on social media for best results
                  </li>
                  <li className="flex items-center gap-1">
                    <span>•</span> Add a personal note when sharing your link
                  </li>
                  <li className="flex items-center gap-1">
                    <span>•</span> Every 12 referrals earns you 1 month of free
                    starter access
                  </li>
                  <li className="flex items-center gap-1">
                    <span>•</span> Free starter rewards stack with your paid
                    subscription
                  </li>
                </ul>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                Share with your friends on social media or via direct message!
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralPopup;
