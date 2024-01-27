# PocketLink - Subscription and Referral System

## Overview

PocketLink is a link management platform with premium features available through both paid subscriptions and referral rewards. This README focuses on the subscription and referral systems implementation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Subscription System

### Core Components

1. **SubscriptionContext**: Manages subscription state, checks for subscription expiry, and syncs premium status
2. **AuthContext**: Handles user authentication, referral tracking, and referral-based premium rewards
3. **Billing Tables**: `user_data` and `billing_info` tables store subscription and billing information

### Key Features

- **Automatic Premium Status Updates**: System regularly checks subscription status and updates premium access
- **Trial Period Management**: New users receive a 15-day free trial
- **Billing History**: Tracks all subscription payments and referral rewards
- **Subscription Management**: Handles subscription creation, cancellation, and renewal

### Implementation Details

#### Premium Status Determination

Premium status is determined by:

1. Active paid subscription
2. Active referral-based premium rewards
3. Free trial period (first 15 days)

#### Trial Period Handling

- New users automatically get a 15-day trial
- Trial expiry is calculated from account creation date

#### Subscription Expiry Check

- System regularly checks if subscriptions have expired
- When a subscription expires, it checks for queued referral rewards to activate

## Referral Rewards System

### Key Features

- **Premium Access Through Referrals**: Users earn 1 month of premium access for every 12 successful referrals
- **Milestone Tracking**: The system tracks referral milestones (12, 24, 36 referrals)
- **Reward Queueing**: If a user has an active subscription, earned rewards are queued to activate after the subscription ends
- **Automatic Activation**: Queued rewards automatically activate when a subscription expires
- **Visual Progress Indicators**: UI components show progress toward next referral milestone

### Implementation Details

#### Referral Premium Rewards

- Each milestone of 12 referrals earns 1 month of premium access
- Rewards stack - more referrals mean more months of premium
- Premium access from referrals has an expiry date

#### Reward Queueing Logic

- If user has an active subscription, rewards are queued
- System creates a record in the billing_info table when rewards are earned
- When subscription ends, queued rewards automatically activate

#### Premium Status Synchronization

- The `isPremiumUnlockedByReferrals()` function checks if a user has active premium access through referrals
- The `checkReferralPremiumStatus()` function verifies and updates referral rewards
- The `checkSubscriptionExpiry()` function activates queued rewards when subscriptions end

## Database Schema

### user_data Table

- `username`: Primary key
- `email`: User email
- `is_premium`: Boolean indicating premium status
- `has_subscription`: Boolean indicating active subscription
- `people_referred`: Count of successful referrals
- `referral_premium_info`: JSON object containing referral reward details:
  - `isActive`: Whether referral premium is currently active
  - `expiryDate`: When the referral premium expires
  - `monthsEarned`: Total months earned through referrals
  - `queuedForSubscriptionEnd`: Whether rewards are queued for activation
  - `rewardedMilestones`: Record of milestones that have been rewarded

### billing_info Table

- `username`: Foreign key to user_data
- `subscription_id`: Unique identifier for the subscription
- `amount`: Payment amount
- `currency`: Payment currency
- `billing_cycle`: Frequency of billing
- `current_period_start`: Start of current billing period
- `current_period_end`: End of current billing period
- `payment_method`: Method used for payment (including "referral_reward")
- `meta_data`: Additional information about the transaction

## Usage Examples

### Checking Premium Status

```jsx
const { isPremium, inFreeTrial } = useSubscription();
const { isPremiumUnlockedByReferrals } = useAuth();

// Check if user has any form of premium access
const hasPremiumAccess =
  isPremium || inFreeTrial || isPremiumUnlockedByReferrals();
```

### Premium Gate Component

```jsx
<PremiumGate
  featureName="Analytics Dashboard"
  description="Access detailed analytics for your links"
  referralUnlock={15}
>
  <AnalyticsDashboard />
</PremiumGate>
```

### Referral Reward Progress

```jsx
const { getReferralPremiumDetails } = useAuth();
const details = getReferralPremiumDetails();
```

## Best Practices

1. **Always Check Premium Status**: Use the appropriate context hooks to verify premium access
2. **Gate Premium Features**: Use the PremiumGate component to restrict access to premium features
3. **Handle Subscription Changes**: Listen for subscription changes to update UI accordingly
4. **Encourage Referrals**: Promote the referral program as an alternative path to premium features
5. **Provide Clear Feedback**: Show users their referral progress and rewards status

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# admin-dashboard
