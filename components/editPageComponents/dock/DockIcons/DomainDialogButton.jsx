'use client';
import React, { useContext, useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Card, CardContent } from '@/components/ui/card';
import PremiumGate from '@/components/PremiumGate';
import {
  Globe,
  Trash,
  CheckCircle,
  Loader2,
  Clipboard,
  Info,
  HelpCircle,
  ExternalLink,
  Crown,
  Shield,
  AlertTriangle,
  Clock,
} from 'lucide-react';
// Firebase imports removed - now using direct Supabase approach
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '@/app/contexts/AuthContext';
import { useController } from '@/app/contexts/ControllerContext';
import { supabase } from '@/Clients/supabase/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { FEATURES } from '@/constants/features';
import { updateUserData } from '@/lib/utils/sessionUtils';

export default function DomainDialogButton() {
  const { user, setUser } = useAuth();
  const [customDomain, setCustomDomain] = useState(user?.customDomain || '');
  const [isVerified, setIsVerified] = useState(
    user?.customDomainLinked || false
  );
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [checkingLinking, setCheckingLinking] = useState(false);
  const [isDomainSaved, setIsDomainSaved] = useState(!!user?.customDomain);
  const [sslStatus, setSslStatus] = useState(
    user?.cloudflare_ssl_status || 'pending'
  );
  const [verificationStatus, setVerificationStatus] = useState(
    user?.cloudflare_verification_status || 'pending'
  );
  const [dnsRecords, setDnsRecords] = useState(user?.dns_records || null);
  const [verificationErrors, setVerificationErrors] = useState(
    user?.domain_verification_errors || []
  );
  const [isCreatingHostname, setIsCreatingHostname] = useState(false);
  const [isDeletingDomain, setIsDeletingDomain] = useState(false);
  const { viewMode } = useController();
  const router = useRouter();
  const { canAccessFeature } = useSubscription();
  const canUseCustomDomain = canAccessFeature(FEATURES.CUSTOM_DOMAIN);

  useEffect(() => {
    // Auto-refresh verification status for pending domains
    // Stop polling when both verification and SSL are active
    const isFullyActive =
      verificationStatus === 'active' && sslStatus === 'active';

    if (
      customDomain &&
      isDomainSaved &&
      !isFullyActive &&
      (sslStatus !== 'active' || verificationStatus !== 'active')
    ) {
      const interval = setInterval(() => {
        handleVerifyDomain();
      }, 15000); // Check every 15 seconds
      return () => clearInterval(interval);
    }
  }, [customDomain, isDomainSaved, sslStatus, verificationStatus]);

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setCustomDomain(user.customDomain || '');
      setIsDomainSaved(!!user.customDomain);
      setIsVerified(user.customDomainLinked || false);
      setSslStatus(user.cloudflare_ssl_status || 'pending');
      setVerificationStatus(user.cloudflare_verification_status || 'pending');
      setDnsRecords(user.dns_records || null);
      setVerificationErrors(user.domain_verification_errors || []);
    }
  }, [user]);

  // Function to update local state and cookies
  const updateLocalStateAndCookies = (updatedUserData) => {
    // Update local state
    setUser({
      ...user,
      ...updatedUserData,
    });

    // Update user data using hybrid storage approach
    const updatedUserDataFull = {
      ...user,
      ...updatedUserData,
    };
    updateUserData(updatedUserDataFull, Cookies);
  };

  const handleSaveCustomDomain = async () => {
    if (!customDomain) {
      toast.error('Domain Required', {
        description: 'Please enter a domain name.',
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
          color: 'white',
          borderRadius: '8px',
        },
      });
      return;
    }

    // Basic domain validation
    const domainRegex =
      /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!domainRegex.test(customDomain)) {
      toast.error('Invalid Domain', {
        description: 'Please enter a valid domain name (e.g., yourdomain.com).',
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
          color: 'white',
          borderRadius: '8px',
        },
      });
      return;
    }

    setIsCreatingHostname(true);

    try {
      console.log('customDomain: ', customDomain, 'userId: ');
      // Create custom hostname via Cloudflare API
      const response = await axios.post('/api/cloudflare/create-hostname', {
        hostname: customDomain,
        userId: user.uuid,
      });

      if (response.data.success) {
        const { data: hostnameData } = response.data;

        // Update local state
        setIsDomainSaved(true);
        setSslStatus(hostnameData.ssl_status || 'pending');
        setVerificationStatus(hostnameData.verification_status || 'pending');
        setDnsRecords(hostnameData.dns_records);
        setVerificationErrors([]);

        // Domain mapping now handled directly in Supabase user_data table
        // No additional Firebase operations needed

        // Update local state and cookies
        updateLocalStateAndCookies({
          customDomain: customDomain,
          cloudflare_ssl_status: hostnameData.ssl_status,
          cloudflare_verification_status: hostnameData.verification_status,
          dns_records: hostnameData.dns_records,
        });

        toast.success('Domain Created', {
          description:
            'Your custom domain has been created. Please configure DNS records.',
          style: {
            backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
            color: 'white',
            borderRadius: '8px',
          },
        });
      } else {
        throw new Error(response.data.error || 'Failed to create hostname');
      }
    } catch (error) {
      console.error('Error creating custom hostname:', error);

      let errorMessage =
        'Could not create the custom domain. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error('Creation Failed', {
        description: errorMessage,
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } finally {
      setIsCreatingHostname(false);
    }
  };

  const handleDeleteCustomDomain = async () => {
    if (!customDomain) return;

    setIsDeletingDomain(true);

    try {
      // Delete from Cloudflare via API
      const response = await axios.delete('/api/cloudflare/delete-hostname', {
        data: {
          userId: user.uuid,
          confirmDeletion: true,
        },
      });

      if (response.data.success) {
        // Domain mapping deletion now handled directly in Supabase user_data table
        // No additional Firebase operations needed

        // Reset local state
        setCustomDomain('');
        setIsDomainSaved(false);
        setIsVerified(false);
        setSslStatus('pending');
        setVerificationStatus('pending');
        setDnsRecords(null);
        setVerificationErrors([]);

        // Update local state and cookies
        updateLocalStateAndCookies({
          customDomain: null,
          usingCustomDomain: false,
          customDomainLinked: false,
          cloudflare_ssl_status: null,
          cloudflare_verification_status: null,
          dns_records: null,
          domain_verification_errors: null,
        });

        toast.success('Domain Deleted', {
          description: 'Your custom domain has been removed from Cloudflare.',
          style: {
            backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
            color: 'white',
            borderRadius: '8px',
          },
        });

        // Show warnings if any
        if (response.data.warnings && response.data.warnings.length > 0) {
          setTimeout(() => {
            toast.warning('Note', {
              description: response.data.warnings[0],
              style: {
                backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                borderRadius: '8px',
              },
            });
          }, 2000);
        }
      } else {
        throw new Error(response.data.error || 'Failed to delete domain');
      }
    } catch (error) {
      console.error('Error deleting domain:', error);

      let errorMessage = 'Could not delete the domain. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error('Delete Failed', {
        description: errorMessage,
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } finally {
      setIsDeletingDomain(false);
    }
  };

  const handleVerifyDomain = async () => {
    if (!customDomain) return;

    setVerificationLoading(true);

    try {
      const response = await axios.post('/api/cloudflare/verify-hostname', {
        userId: user.uuid,
      });

      if (response.data.success) {
        const { ssl_status, verification_status, validation_records } =
          response.data.data;
        const { next_steps } = response.data;

        // Update local state with latest status
        setSslStatus(ssl_status);
        setVerificationStatus(verification_status);
        if (validation_records) {
          setDnsRecords(validation_records);
        }

        // Check if domain is fully verified and SSL is active
        const isFullyVerified =
          verification_status === 'active' && ssl_status === 'active';
        setIsVerified(isFullyVerified);

        // Update local state and cookies
        updateLocalStateAndCookies({
          customDomainLinked: isFullyVerified,
          usingCustomDomain: isFullyVerified,
          cloudflare_ssl_status: ssl_status,
          cloudflare_verification_status: verification_status,
          dns_records: validation_records,
        });

        if (isFullyVerified) {
          toast.success('Domain Verified', {
            description: 'Your custom domain is now active with SSL!',
            style: {
              backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
              color: 'white',
              borderRadius: '8px',
            },
          });
        } else {
          // Show status update
          let statusMessage = '';
          if (verification_status === 'pending') {
            statusMessage =
              'Domain verification is still pending. Please ensure DNS records are configured correctly.';
          } else if (ssl_status === 'pending') {
            statusMessage =
              'Domain verified! SSL certificate is being provisioned.';
          } else if (ssl_status === 'initializing') {
            statusMessage = 'SSL certificate provisioning in progress...';
          }

          toast.info('Status Update', {
            description: statusMessage || next_steps,
            style: {
              backgroundImage: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              borderRadius: '8px',
            },
          });
        }
      } else {
        // Handle verification errors
        if (
          response.data.data?.validation_errors &&
          response.data.data.validation_errors.length > 0
        ) {
          setVerificationErrors(response.data.data.validation_errors);
        }

        toast.error('Verification Failed', {
          description: response.data.error || 'Domain verification failed.',
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
            color: 'white',
            borderRadius: '8px',
          },
        });
      }
    } catch (error) {
      console.error('Error verifying domain:', error);

      let errorMessage = 'Could not verify the domain. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error('Verification Failed', {
        description: errorMessage,
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } finally {
      setVerificationLoading(false);
    }
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied', {
      description: message,
      style: {
        backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
        color: 'white',
        borderRadius: '8px',
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group min-w-max relative flex gap-2 border-2 py-2 px-2 rounded-xl h-full w-full items-center justify-center transition-all duration-200">
          {isVerified ? (
            <CheckCircle className="group-scale-110 h-5 w-5 text-green-500 transition-transform duration-200" />
          ) : (
            <Globe className="group-scale-110 h-5 w-5 transition-transform duration-200" />
          )}
          {isVerified && customDomain ? customDomain : 'Custom Domain'}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] rounded-lg border border-gray-200 shadow-lg dark:border-gray-700 md:max-w-md">
        {!canUseCustomDomain ? (
          <div className="space-y-6 p-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-gradient-to-br from-amber-100 to-amber-50 p-3 dark:from-amber-900/20 dark:to-amber-800/10">
                <Globe className="h-6 w-6 text-amber-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Custom Domain</h3>
                <p className="max-w-md text-sm text-gray-600 dark:text-gray-400">
                  Take your brand to the next level with a custom domain.
                  Connect your own domain and create a professional presence.
                </p>
              </div>

              <div className="grid w-full max-w-lg grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div className="text-left">
                    <h4 className="text-sm font-medium">Custom Domains</h4>
                    <p className="text-xs text-gray-500">
                      Connect your own domain
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div className="text-left">
                    <h4 className="text-sm font-medium">SSL Security</h4>
                    <p className="text-xs text-gray-500">
                      Free SSL certificates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div className="text-left">
                    <h4 className="text-sm font-medium">DNS Management</h4>
                    <p className="text-xs text-gray-500">Easy DNS setup</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <div className="text-left">
                    <h4 className="text-sm font-medium">Domain Privacy</h4>
                    <p className="text-xs text-gray-500">
                      Keep your info private
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => router.push('/pricing')}
                className="bg-gradient-to-r from-amber-500 from-amber-600 to-amber-600 to-amber-700 text-white"
                size="lg"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </div>
          </div>
        ) : (
          <PremiumGate
            featureName="Premium Feature"
            description="Unlock this feature with 30 referrals!"
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Custom Domain Setup
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="custom-domain"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Domain Name
                </Label>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full text-gray-500 text-gray-700 dark:text-gray-200 dark:text-gray-400"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        How to Add Your Custom Domain
                      </h4>
                      <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                        <li>Enter your domain (e.g., example.com)</li>
                        <li>Click "Save Domain"</li>
                        <li>
                          Log in to your domain registrar (GoDaddy, Namecheap,
                          etc.)
                        </li>
                        <li>Add the DNS records shown below</li>
                        <li>Click "Verify Domain" when finished</li>
                      </ol>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              <Input
                id="custom-domain"
                placeholder="yourdomain.com"
                value={customDomain}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => setCustomDomain(e.target.value)}
                disabled={isDomainSaved}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bento-violet dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />

              {!isDomainSaved ? (
                <Button
                  className="w-full rounded-lg bg-bento-violet px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bento-violet focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleSaveCustomDomain}
                  disabled={isCreatingHostname || !customDomain.trim()}
                >
                  {isCreatingHostname ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Domain...
                    </>
                  ) : (
                    'Save Domain'
                  )}
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="w-full rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                  onClick={handleDeleteCustomDomain}
                  disabled={isDeletingDomain}
                >
                  {isDeletingDomain ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Domain
                    </>
                  )}
                </Button>
              )}

              {isDomainSaved && (
                <>
                  <Separator className="my-4" />

                  {/* Status indicators */}
                  <div className="space-y-3">
                    {/* SSL Status */}
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          SSL Certificate
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {sslStatus === 'active' && (
                          <>
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              Active
                            </span>
                          </>
                        )}
                        {(sslStatus === 'pending' ||
                          sslStatus === 'pending_validation') && (
                          <>
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                              Pending
                            </span>
                          </>
                        )}
                        {sslStatus === 'initializing' && (
                          <>
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              Initializing
                            </span>
                          </>
                        )}
                        {(!sslStatus || sslStatus === 'failed') && (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-red-600 dark:text-red-400">
                              Failed
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Verification Status */}
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Domain Verification
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {verificationStatus === 'active' && (
                          <>
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              Verified
                            </span>
                          </>
                        )}
                        {verificationStatus === 'pending' && (
                          <>
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                              Pending
                            </span>
                          </>
                        )}
                        {(!verificationStatus ||
                          verificationStatus === 'failed') && (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-red-600 dark:text-red-400">
                              Failed
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Verification Errors */}
                  {verificationErrors && verificationErrors.length > 0 && (
                    <Alert className="border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          <p className="font-medium">Verification Issues:</p>
                          <ul className="space-y-1 text-sm">
                            {verificationErrors.map((error, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{error}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Card className="rounded-xl border border-gray-200 dark:border-gray-700">
                    <CardContent className="pb-4 pt-6">
                      <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                        <Info className="h-4 w-4 text-blue-500" />
                        DNS Configuration
                      </h3>

                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center justify-between rounded-md bg-gray-50 p-2 transition-colors duration-200 dark:bg-gray-800">
                            <div>
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                CNAME Record
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Point your domain to our servers
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="cursor-pointer border-gray-300 bg-gray-100 text-gray-700 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                              onClick={() =>
                                copyToClipboard(
                                  `${user?.username}.pocketlink.co`,
                                  'CNAME copied to clipboard.'
                                )
                              }
                            >
                              {user?.username}.pocketlink.co{' '}
                              <Clipboard className="ml-1 h-3 w-3" />
                            </Badge>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                              CNAME Record Setup
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Add a CNAME record in your DNS settings with:
                            </p>
                            <div className="rounded-md bg-gray-100 p-2 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                              <p>
                                <strong>Type:</strong> CNAME
                              </p>
                              <p>
                                <strong>Name:</strong> www
                              </p>
                              <p>
                                <strong>Value:</strong> {user?.username}
                                .pocketlink.co
                              </p>
                              <p>
                                <strong>TTL:</strong> Automatic or 3600
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </CardContent>
                  </Card>

                  <Button
                    className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleVerifyDomain}
                    disabled={
                      verificationLoading ||
                      (isVerified && sslStatus === 'active')
                    }
                  >
                    {verificationLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : isVerified && sslStatus === 'active' ? (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    {verificationLoading
                      ? 'Verifying...'
                      : isVerified && sslStatus === 'active'
                        ? 'Domain Active'
                        : 'Check Status'}
                  </Button>

                  {checkingLinking && (
                    <Alert className="mt-2 rounded-lg border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
                      <AlertDescription>
                        Checking domain linking...
                      </AlertDescription>
                    </Alert>
                  )}

                  {isVerified && (
                    <Alert className="mt-2 rounded-lg border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
                      <AlertDescription className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Domain is properly linked! Your custom domain is now
                        active.
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            </div>
          </PremiumGate>
        )}
      </DialogContent>
    </Dialog>
  );
}
