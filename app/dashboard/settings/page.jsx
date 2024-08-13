'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  UserCog,
  Mail,
  LogOut,
  Trash2,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Zap,
  Clock,
  Download,
  Crown,
  ArrowUp,
  ArrowDown,
  Globe,
  Shield,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { useSettings } from '@/app/contexts/SettingsContext';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { TiSpanner } from 'react-icons/ti';
import { signout } from '@/lib/actions/auth-actions';
import { supabase } from '@/Clients/supabase/client';
import PlanChangeButton from '@/components/PlanChangeButton';
import { exchangeRates } from '@/constants/countryCurrency';
import { PLAN_PRICING } from '@/constants/pricing';
import { useRouter } from 'next/navigation';
import { FEATURES, FEATURE_NAMES } from '@/constants/features';
import DomainDialogButton from '@/components/editPageComponents/dock/DockIcons/DomainDialogButton';

export default function SettingsPage() {
  const { user, setUser } = useAuth();
  const {
    isPremium,
    isActive,
    inFreeTrial,
    plan,
    cycle,
    amount,
    currency: subscriptionCurrency,
    billingCycle,
    paymentMethod,
    getFormattedExpiryDate,
    canAccessFeature,
  } = useSubscription();
  const { settings, updateSettings, isUpdating } = useSettings();
  const router = useRouter();

  // Billing related states
  const [currency, setCurrency] = useState(subscriptionCurrency || 'USD');
  const [invoices, setInvoices] = useState([]);
  const [isCancelled, setIsCancelled] = useState(false);
  const [accessUntil, setAccessUntil] = useState(null);

  // Section refs for scrolling
  const profileRef = useRef(null);
  const preferencesRef = useRef(null);
  const billingRef = useRef(null);
  const domainRef = useRef(null);
  const accountRef = useRef(null);

  // Define sections with refs
  const sections = [
    { id: 'profile', label: 'Profile', icon: UserCog, ref: profileRef },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: TiSpanner,
      ref: preferencesRef,
    },
    { id: 'billing', label: 'Billing', icon: CreditCard, ref: billingRef },
    { id: 'domain', label: 'Domain', icon: Globe, ref: domainRef },
    { id: 'account', label: 'Account', icon: Settings, ref: accountRef },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Active section state
  const [activeSection, setActiveSection] = useState('profile');

  // Currency symbols mapping
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
    CHF: 'CHF',
    SEK: 'kr',
    NOK: 'kr',
    DKK: 'kr',
    PLN: 'zł',
    CZK: 'Kč',
    HUF: 'Ft',
    RON: 'lei',
    BGN: 'лв',
    HRK: 'kn',
    RSD: 'дин',
    BAM: 'KM',
    MKD: 'ден',
    ALL: 'L',
    ISK: 'kr',
    MDL: 'L',
    UAH: '₴',
    BYN: 'Br',
    RUB: '₽',
    GEL: '₾',
    AMD: '֏',
    AZN: '₼',
    KZT: '₸',
    KGS: 'с',
    UZS: 'soʻm',
    TJS: 'ЅМ',
    TMT: 'T',
    MNT: '₮',
    CNY: '¥',
    KRW: '₩',
    TWD: 'NT$',
    HKD: 'HK$',
    SGD: 'S$',
    MYR: 'RM',
    THB: '฿',
    PHP: '₱',
    IDR: 'Rp',
    VND: '₫',
    INR: '₹',
    PKR: '₨',
    LKR: '₨',
    BDT: '৳',
    NPR: '₨',
    BTN: 'Nu.',
    MVR: 'Rf',
    AFN: '؋',
    IRR: '﷼',
    IQD: 'ع.د',
    JOD: 'د.ا',
    KWD: 'د.ك',
    LBP: 'ل.ل',
    OMR: 'ر.ع.',
    QAR: 'ر.ق',
    SAR: 'ر.س',
    SYP: '£',
    AED: 'د.إ',
    YER: '﷼',
    BHD: '.د.ب',
    EGP: '£',
    LYD: 'ل.د',
    MAD: 'د.م.',
    TND: 'د.ت',
    DZD: 'د.ج',
    SDG: 'ج.س.',
    SOS: 'S',
    ETB: 'Br',
    KES: 'KSh',
    UGX: 'USh',
    TZS: 'TSh',
    RWF: 'FRw',
    BIF: 'FBu',
    DJF: 'Fdj',
    ERN: 'Nfk',
    MGA: 'Ar',
    MUR: '₨',
    SCR: '₨',
    KMF: 'CF',
    SZL: 'L',
    LSL: 'L',
    BWP: 'P',
    ZAR: 'R',
    NAD: 'N$',
    AOA: 'Kz',
    ZMW: 'ZK',
    ZWL: 'Z$',
    MWK: 'MK',
    MZN: 'MT',
    GMD: 'D',
    GNF: 'FG',
    LRD: 'L$',
    SLL: 'Le',
    GHS: '₵',
    NGN: '₦',
    XOF: 'CFA',
    XAF: 'FCFA',
    CVE: '$',
    STD: 'Db',
    CDF: 'FC',
    XPF: '₣',
    FJD: 'FJ$',
    SBD: 'SI$',
    TOP: 'T$',
    VUV: 'VT',
    WST: 'WS$',
    PGK: 'K',
    NCR: '₣',
    NZD: 'NZ$',
    CLP: '$',
    ARS: '$',
    UYU: '$U',
    PYG: '₲',
    BOB: 'Bs',
    PEN: 'S/',
    COP: '$',
    VES: 'Bs',
    GYD: 'G$',
    SRD: '$',
    BRL: 'R$',
    TTD: 'TT$',
    JMD: 'J$',
    BBD: 'Bds$',
    BZD: 'BZ$',
    GTQ: 'Q',
    HNL: 'L',
    NIO: 'C$',
    CRC: '₡',
    PAB: 'B/.',
    CUP: '₱',
    DOP: 'RD$',
    HTG: 'G',
    MXN: '$',
  };

  // Format monetary amounts with appropriate currency symbol
  const formatAmount = (amount, currencyCode = currency) => {
    return `${currencySymbols[currencyCode] || '$'}${parseFloat(amount).toFixed(2)}`;
  };

  // Get display price based on plan and billing cycle
  const getDisplayPrice = () => {
    if (!plan || plan === 'free') return null;

    const planKey = plan === 'premium' ? 'business' : plan; // Handle legacy 'premium' plan name
    const cycleKey = (billingCycle || cycle || 'monthly').toLowerCase();

    if (PLAN_PRICING[planKey] && PLAN_PRICING[planKey][cycleKey]) {
      const usdPrice = PLAN_PRICING[planKey][cycleKey];
      const convertedPrice = parseFloat(
        usdPrice *
          (exchangeRates[subscriptionCurrency] || exchangeRates[currency] || 1)
      );
      return convertedPrice;
    }

    // Fallback to raw amount if pricing structure doesn't match
    return amount ? parseFloat(amount) : null;
  };

  const calculatePeriod = (bill) => {
    if (!bill.period_start || !bill.period_end) return 'N/A';

    const startDate = new Date(bill.period_start);
    const endDate = new Date(bill.period_end);

    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  const getTransactionType = (bill) => {
    return bill.action_type || bill.payment_type || 'payment';
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'upgrade':
        return <ArrowUp className="h-3 w-3 text-green-600" />;
      case 'downgrade':
        return <ArrowDown className="h-3 w-3 text-orange-600" />;
      case 'new_subscription':
        return <Crown className="h-3 w-3 text-purple-600" />;
      case 'renewal':
        return <CheckCircle className="h-3 w-3 text-blue-600" />;
      case 'cancellation':
        return <AlertCircle className="h-3 w-3 text-red-600" />;
      default:
        return <CreditCard className="h-3 w-3 text-blue-600" />;
    }
  };

  const handleDownloadInvoice = async (invoice) => {
    try {
      toast.loading('Downloading invoice...', { id: 'invoice-download' });

      const response = await fetch('/api/billing/download-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId: invoice.id,
          paymentId: invoice.id, // Use the payment_id from billing_details
        }),
      });

      if (response.ok) {
        // Get the PDF blob
        const blob = await response.blob();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice-${invoice.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success('Invoice downloaded successfully!', {
          id: 'invoice-download',
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to download invoice', {
          id: 'invoice-download',
        });
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error('Failed to download invoice. Please try again.', {
        id: 'invoice-download',
      });
    }
  };

  const handleCancelSubscription = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period."
    );

    if (confirmed) {
      try {
        const response = await fetch('/api/subscription/cancel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: 'User requested cancellation via billing page',
          }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success(
            "Your subscription has been cancelled. You'll retain access until " +
              new Date(data.access_until).toLocaleDateString()
          );
          // Refresh the page to show updated status
          window.location.reload();
        } else {
          toast.error(
            data.error ||
              'Failed to cancel subscription. Please contact support.'
          );
        }
      } catch (error) {
        console.error('Error cancelling subscription:', error);
        toast.error('Failed to cancel subscription. Please contact support.');
      }
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      const response = await fetch('/api/subscription/reactivate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Your subscription has been reactivated!');
        // Refresh the page to show updated status
        window.location.reload();
      } else {
        toast.error(
          data.error ||
            'Failed to reactivate subscription. Please contact support.'
        );
      }
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      toast.error('Failed to reactivate subscription. Please contact support.');
    }
  };

  // useEffect hooks for billing functionality
  useEffect(() => {
    const detectCountryAndCurrency = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;

        const currencyMap = {
          US: 'USD',
          IN: 'INR',
          GB: 'GBP',
          AU: 'AUD',
          CA: 'USD',
          DE: 'EUR',
          FR: 'EUR',
          IT: 'EUR',
          ES: 'EUR',
          NL: 'EUR',
        };

        setCurrency(currencyMap[countryCode] || 'USD');
      } catch (error) {
        console.error('Error detecting country:', error);
        setCurrency('USD');
      }
    };

    detectCountryAndCurrency();
  }, []);

  useEffect(() => {
    const fetchBillingHistory = async () => {
      if (!user?.id || user?.plan !== 'premium') return;

      try {
        const { data, error } = await supabase
          .from('billing_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setInvoices(data || []);
      } catch (error) {
        console.error('Error fetching billing history:', error);
      }
    };

    fetchBillingHistory();
  }, [user]);

  useEffect(() => {
    const checkCancellationStatus = async () => {
      if (!user?.id || user?.plan !== 'premium') return;

      try {
        const { data, error } = await supabase
          .from('subscription_status')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setIsCancelled(data.is_cancelled || false);
          setAccessUntil(data.access_until);
        }
      } catch (error) {
        console.error('Error checking cancellation status:', error);
      }
    };

    checkCancellationStatus();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateSettings({ [name]: value });
  };

  const handleNameBlur = () => {
    // Name is updated on blur
  };

  const handleToggleChange = (key, value) => {
    updateSettings({
      preferences: {
        ...settings.preferences,
        [key]: value,
      },
    });
  };

  const runDelete = async () => {
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        toast.success('Account deleted successfully');
        setUser(null);
        localStorage.removeItem('user');
        await signout();
        router.push('/');
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    }
  };

  // Helper to render a loading spinner for specific preference toggle
  const renderSpinner = (prefKey) => {
    if (isUpdating[prefKey]) {
      return (
        <div className="absolute -right-6 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-bento-violet"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="sticky z-10 mx-auto max-w-4xl rounded-xl border-b border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <span>Jump to</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <DropdownMenuItem
                      key={section.id}
                      onClick={() => scrollToSection(section.ref)}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{section.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-8">
        {/* Profile Section */}
        <section ref={profileRef} className="scroll-mt-20">
          <ProfileSection />
        </section>

        <Separator className="my-12" />

        {/* Preferences Section */}
        <section ref={preferencesRef} className="scroll-mt-20">
          <PreferencesSection />
        </section>

        <Separator className="my-12" />

        {/* Billing Section */}
        <section ref={billingRef} className="scroll-mt-20">
          <BillingSection />
        </section>

        <Separator className="my-12" />

        {/* Domain Section */}
        <section ref={domainRef} className="scroll-mt-20">
          <DomainSection />
        </section>

        <Separator className="my-12" />

        {/* Account Section */}
        <section ref={accountRef} className="scroll-mt-20">
          <AccountSection />
        </section>
      </div>
    </div>
  );

  // Profile Section Component
  function ProfileSection() {
    return (
      <div>
        <div className="mb-6">
          <div className="mb-4 flex items-center">
            <UserCog className="mr-2 text-bento-violet" size={22} />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={settings.name}
                  onChange={handleInputChange}
                  onBlur={handleNameBlur}
                  className="mt-1"
                  disabled={isUpdating.name}
                />
                {isUpdating.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-bento-violet"></div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                value={user?.email || ''}
                disabled
                className="mt-1 bg-gray-50"
              />
              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Preferences Section Component
  function PreferencesSection() {
    return (
      <div>
        <div className="mb-4 flex items-center">
          <TiSpanner className="mr-2 text-bento-violet" size={22} />
          <h2 className="text-xl font-semibold">Preferences</h2>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-2">
            <div>
              <Label
                htmlFor="subscription-button"
                className="text-base font-medium"
              >
                Allow Subscriptions on Profile
              </Label>
              <p className="text-sm text-gray-500">
                Show a subscription button on your public profile for supporters
              </p>
            </div>
            <div className="relative">
              <Switch
                id="subscription-button"
                checked={settings.preferences.subscribeButtonOn}
                onCheckedChange={(checked) =>
                  handleToggleChange('subscribeButtonOn', checked)
                }
                disabled={isUpdating.subscribeButtonOn}
              />
              {renderSpinner('subscribeButtonOn')}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between p-2">
            <div>
              <Label
                htmlFor="email-notifications"
                className="text-base font-medium"
              >
                Email Notifications
              </Label>
              <p className="text-sm text-gray-500">
                Receive important account updates via email
              </p>
            </div>
            <div className="relative">
              <Switch
                id="email-notifications"
                checked={settings.preferences.email}
                onCheckedChange={(checked) =>
                  handleToggleChange('email', checked)
                }
                disabled={isUpdating.email}
              />
              {renderSpinner('email')}
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <div>
              <Label
                htmlFor="analytics-notifications"
                className="text-base font-medium"
              >
                Analytics Updates
              </Label>
              <p className="text-sm text-gray-500">
                Receive weekly analytics reports for your links
              </p>
            </div>
            <div className="relative">
              <Switch
                id="analytics-notifications"
                checked={settings.preferences.analytics}
                onCheckedChange={(checked) =>
                  handleToggleChange('analytics', checked)
                }
                disabled={isUpdating.analytics}
              />
              {renderSpinner('analytics')}
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <div>
              <Label
                htmlFor="marketing-notifications"
                className="text-base font-medium"
              >
                Marketing Communications
              </Label>
              <p className="text-sm text-gray-500">
                Receive updates about new features and promotions
              </p>
            </div>
            <div className="relative">
              <Switch
                id="marketing-notifications"
                checked={settings.preferences.marketing}
                onCheckedChange={(checked) =>
                  handleToggleChange('marketing', checked)
                }
                disabled={isUpdating.marketing}
              />
              {renderSpinner('marketing')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Billing Section Component
  function BillingSection() {
    return (
      <div>
        <div className="mb-4 flex items-center">
          <CreditCard className="mr-2 text-bento-violet" size={22} />
          <h2 className="text-xl font-semibold">Billing & Subscription</h2>
        </div>

        {/* Subscription Status */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-bento-violet" />
                Subscription Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-bento-violet to-purple-600">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {plan === 'free'
                        ? 'Free Plan'
                        : plan === 'starter'
                          ? 'Starter Plan'
                          : plan === 'business'
                            ? 'Business Plan'
                            : plan === 'premium'
                              ? 'Premium Plan'
                              : 'Unknown Plan'}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={isActive ? 'default' : 'secondary'}
                        className={
                          isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }
                      >
                        {isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      {isCancelled && (
                        <Badge variant="destructive">
                          Cancelled - Access until{' '}
                          {new Date(accessUntil).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {isActive && plan !== 'free' ? (
                    <div>
                      <p className="text-2xl font-bold">
                        {formatAmount(getDisplayPrice(plan), currency)}
                      </p>
                      <p className="text-sm text-gray-500">
                        per {billingCycle || cycle || 'month'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-2xl font-bold">Free</p>
                      <p className="text-sm text-gray-500">forever</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-2">
                {plan === 'free' && (
                  <Button
                    onClick={() => router.push('/pricing')}
                    className="bg-gradient-to-r from-bento-violet to-purple-600"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Button>
                )}

                {isActive && plan !== 'free' && !isCancelled && (
                  <Button
                    variant="outline"
                    onClick={handleCancelSubscription}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Cancel Subscription
                  </Button>
                )}

                {isCancelled && (
                  <Button
                    onClick={handleReactivateSubscription}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Reactivate Subscription
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Features Overview */}
        <div className="mb-8">
          <div className="mb-4 flex items-center">
            <CheckCircle className="mr-2 text-bento-violet" size={22} />
            <h2 className="text-xl font-semibold">Premium Features Overview</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's Included</CardTitle>
                <CardDescription>
                  Features available with your current plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Starter Features */}
                  <div>
                    <h4 className="mb-2 flex items-center text-sm font-semibold text-purple-600">
                      <Crown className="mr-1 h-3 w-3 fill-purple-400 text-purple-400" />
                      Starter Plan
                    </h4>
                    <div className="space-y-2">
                      <TierFeature feature={FEATURES.BASIC_ANALYTICS} />
                      <TierFeature feature={FEATURES.ADVANCED_ANALYTICS} />
                      <TierFeature feature={FEATURES.CUSTOM_DOMAIN} />
                      <TierFeature feature={FEATURES.REMOVE_BRANDING} />
                    </div>
                  </div>

                  {/* Business Features */}
                  <div>
                    <h4 className="mb-2 flex items-center text-sm font-semibold text-yellow-600">
                      <Crown className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      Business Plan
                    </h4>
                    <div className="space-y-2">
                      <TierFeature feature={FEATURES.AI_FEATURES} />
                      <TierFeature feature={FEATURES.SALES_BOT} />
                      <TierFeature feature={FEATURES.ECOMMERCE_SHOP} />
                      <TierFeature feature={FEATURES.EMAIL_MARKETING} />
                      <TierFeature feature={FEATURES.INTEGRATIONS} />
                      <TierFeature feature={FEATURES.PREMIUM_THEMES} />
                      <TierFeature feature={FEATURES.PRIORITY_SUPPORT} />
                    </div>
                  </div>
                </div>

                {!isPremium && (
                  <div className="mt-4">
                    <Button
                      onClick={() => router.push('/pricing')}
                      className="w-full bg-gradient-to-r from-bento-violet to-purple-600"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      View Pricing Plans
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Plan Management */}
        {isActive && (
          <div className="mb-8">
            <div className="mb-4 flex items-center">
              <Crown className="mr-2 text-bento-violet" size={22} />
              <h2 className="text-xl font-semibold">Plan Management</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Change Your Plan</CardTitle>
                <CardDescription>
                  Upgrade your subscription to better fit your needs. For
                  downgrades, please contact support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Starter Plan Option */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Starter Plan</h3>
                      {plan === 'starter' && (
                        <Badge className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="mb-3 text-sm text-gray-600">
                      Advanced analytics, custom domain, priority support
                    </p>
                    {plan !== 'starter' && (
                      <PlanChangeButton
                        currentPlan={plan}
                        targetPlan="starter"
                        billingCycle={billingCycle || cycle || 'monthly'}
                        className="w-full"
                      />
                    )}
                  </div>

                  {/* Business Plan Option */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold">Business Plan</h3>
                      {plan === 'business' && (
                        <Badge className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="mb-3 text-sm text-gray-600">
                      Everything in Starter plus AI features, e-commerce,
                      marketing tools
                    </p>
                    {plan !== 'business' && (
                      <PlanChangeButton
                        currentPlan={plan}
                        targetPlan="business"
                        billingCycle={billingCycle || cycle || 'monthly'}
                        className="w-full"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    • <strong>Upgrades</strong> take effect immediately with
                    prorated billing
                  </p>
                  <p>
                    • <strong>Downgrades</strong> are handled through support -
                    please contact us for assistance
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Billing History */}
        <div>
          <div className="mb-4 flex items-center">
            <Clock className="mr-2 text-bento-violet" size={22} />
            <h2 className="text-xl font-semibold">Billing History</h2>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <div className="grid grid-cols-5 gap-4 bg-gray-50 p-3 font-medium">
              <div>Date</div>
              <div>Type</div>
              <div>Period</div>
              <div>Amount</div>
              <div>Status</div>
            </div>

            {invoices.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No billing history available
              </div>
            ) : (
              <div className="divide-y">
                {invoices.map((invoice) => {
                  const transactionType = getTransactionType(invoice);

                  return (
                    <div
                      key={invoice.id}
                      className="grid grid-cols-5 items-center gap-4 p-3"
                    >
                      <div className="text-gray-600">
                        {new Date(
                          invoice.date || invoice.created * 1000
                        ).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">
                          {getTransactionIcon(transactionType)}
                        </span>
                        <span className="text-sm capitalize">
                          {transactionType}
                        </span>
                      </div>
                      <div>
                        {invoice.period ||
                          calculatePeriod(invoice.created * 1000)}
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {formatAmount(
                            invoice.amount || invoice.amount_paid / 100,
                            invoice.currency || currency
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {invoice.status === 'success' ||
                          invoice.status === 'paid' ? (
                            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="mr-1 h-4 w-4 text-amber-500" />
                          )}
                          <span
                            className={`text-sm ${
                              invoice.status === 'success' ||
                              invoice.status === 'paid'
                                ? 'text-green-600'
                                : 'text-amber-600'
                            }`}
                          >
                            {invoice.status.charAt(0).toUpperCase() +
                              invoice.status.slice(1)}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                          onClick={() =>
                            handleDownloadInvoice(
                              invoice.invoice_pdf || invoice
                            )
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Domain Section Component
  function DomainSection() {
    return (
      <div>
        <div className="mb-4 flex items-center">
          <Globe className="mr-2 text-bento-violet" size={22} />
          <h2 className="text-xl font-semibold">Custom Domain</h2>
        </div>

        <div className="mb-6">
          <p className="mb-4 text-gray-600">
            Connect your own domain to your PocketLink profile for a
            professional look.
          </p>
          <DomainDialogButton />
        </div>
      </div>
    );
  }

  // Account Section Component
  function AccountSection() {
    return (
      <div>
        <div className="mb-4 flex items-center">
          <Settings className="mr-2 text-bento-violet" size={22} />
          <h2 className="text-xl font-semibold">Account Actions</h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="outline"
              className="flex items-center border-amber-300 bg-amber-50 text-amber-700"
              onClick={async () => {
                setUser(null);
                localStorage.removeItem('user');
                await signout();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center border-red-300 bg-red-50 text-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your data across all tables,
                    storage buckets, and Firebase username registry. This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={runDelete}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    );
  }
}

// Tier-specific feature component
function TierFeature({ feature }) {
  const { canAccessFeature } = useSubscription();
  const hasAccess = canAccessFeature(feature);
  const featureName = FEATURE_NAMES[feature] || feature;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{featureName}</span>
      <div className="flex items-center">
        {hasAccess ? (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        ) : (
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        )}
      </div>
    </div>
  );
}
