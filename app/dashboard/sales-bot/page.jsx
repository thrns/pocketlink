'use client';
import { useState, useEffect } from 'react';
import { useSalesBot } from '@/app/contexts/SalesBotContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { FEATURES } from '@/constants/features';
import {
  Bot,
  CheckCircle,
  Loader,
  Upload,
  Copy,
  Check,
  Crown,
  Power,
  Lock,
  Info,
  BotIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { avatarFileUpload } from '@/lib/helpers/supabaseStorageHelpers';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

// Simplified persona template
const PERSONA_TEMPLATE = `# Bot Instructions

## About My Business
[Describe your business, products, and services]

## Key Information
[Important details the bot should know and share]

## Communication Style
[How should the bot communicate - friendly, professional, casual, etc.]

## Sample Q&A
Q: [Common customer question]
A: [How your bot should respond]`;

export default function SalesBotPage() {
  const { user } = useAuth();
  const { salesBotData, isConfigured, updateSalesBotConfig, toggleBotActive } =
    useSalesBot();
  const { canAccessFeature } = useSubscription();
  const canAccessSalesBot = canAccessFeature(FEATURES.SALES_BOT);
  const router = useRouter();

  const [config, setConfig] = useState({
    avatarUrl: '',
    dataAccess: [], // Keep for backend compatibility
    dataTables: [], // Keep for backend compatibility
    isActive: false,
  });

  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Update local state when context data changes
  useEffect(() => {
    if (salesBotData) {
      setConfig({
        persona: salesBotData.persona || '',
        avatarUrl: salesBotData.avatarUrl || '',
        isActive: salesBotData.isActive || false,
      });
    }
  }, [salesBotData]);

  // Reset save success state
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => setSaveSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  // Reset copied template state
  useEffect(() => {
    if (copiedTemplate) {
      const timer = setTimeout(() => setCopiedTemplate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedTemplate]);

  // Handle form changes
  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  // Copy template to clipboard
  const copyTemplateToClipboard = () => {
    navigator.clipboard.writeText(PERSONA_TEMPLATE);
    setCopiedTemplate(true);
    toast.success('Template copied to clipboard');
  };

  // Use template in persona field
  const useTemplate = () => {
    handleChange('persona', PERSONA_TEMPLATE);
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      toast.loading('Uploading avatar...');
      const avatarUrl = await avatarFileUpload(user.username, 'salesbot', file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      handleChange('avatarUrl', avatarUrl);
      toast.dismiss();
      toast.success('Avatar uploaded successfully');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.dismiss();
      toast.error('Failed to upload avatar');
    } finally {
      setTimeout(() => {
        setLoading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  // Save configuration
  const saveConfig = async () => {
    setLoading(true);
    const success = await updateSalesBotConfig(config);

    if (success) {
      setSaveSuccess(true);
      toast.success('Configuration saved successfully');

      if (!config.isActive && isConfigValid()) {
        await toggleBotActive(true);
        setConfig((prev) => ({ ...prev, isActive: true }));
      }
    }

    setLoading(false);
  };

  // Toggle bot activation
  const handleToggleActive = async () => {
    if (!isConfigValid()) {
      toast.error('Please add bot instructions before activating');
      return;
    }

    setLoading(true);
    const newActiveState = !config.isActive;
    const success = await toggleBotActive(newActiveState);

    if (success) {
      setConfig((prev) => ({ ...prev, isActive: newActiveState }));
      toast.success(newActiveState ? 'Bot activated' : 'Bot deactivated');
    }

    setLoading(false);
  };

  // Check if configuration is valid
  const isConfigValid = () => {
    return config?.persona?.length > 10;
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full">
      {/* Header */}
      <div className="mb-6 flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center justify-start gap-4">
          <div className="rounded-xl bg-bento-blue p-3">
            <BotIcon className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              AI Sales Assistant
            </h1>
            <p className="text-gray-600">
              Configure your AI assistant to handle customer inquiries
            </p>
          </div>
        </div>
        {canAccessSalesBot && (
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                config.isActive
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  config.isActive ? 'animate-pulse bg-green-500' : 'bg-gray-400'
                }`}
              />
              {config.isActive ? 'Active' : 'Inactive'}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleActive}
              disabled={loading || !isConfigValid()}
              className="gap-2"
            >
              <Power className="h-3.5 w-3.5" />
              {config.isActive ? 'Turn Off' : 'Turn On'}
            </Button>
          </div>
        )}
      </div>

      {!canAccessSalesBot ? (
        // Premium Gate
        <Card>
          <CardContent className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
              <Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Premium Feature</h3>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Upgrade to access AI Sales Assistant and automate customer support
            </p>
            <Button onClick={() => router.push('/pricing')}>View Plans</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Bot Instructions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Bot Instructions</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Tell your bot about your business and how to help customers
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyTemplateToClipboard}
                  >
                    {copiedTemplate ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={useTemplate}>
                    Use Template
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <textarea
                placeholder="Describe your business, products, services, and how the bot should communicate with customers..."
                value={config.persona}
                onChange={(e) => handleChange('persona', e.target.value)}
                className="min-h-[400px] w-full resize-none rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-blue-400"
              />
              <div className="mt-2 flex items-center gap-2 text-xs">
                {config.persona && config?.persona?.length < 10 ? (
                  <>
                    <Info className="h-3 w-3 text-orange-500" />
                    <span className="text-orange-500">
                      Add at least {10 - config.persona.length} more characters
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">Instructions ready</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bot Avatar */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold">Bot Avatar</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Optional: Add a profile picture for your bot
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  {config.avatarUrl ? (
                    <img
                      src={config.avatarUrl}
                      alt="Bot avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Bot className="h-7 w-7 text-gray-400" />
                  )}
                </div>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById('avatar-upload').click()
                    }
                    disabled={loading}
                  >
                    {uploadProgress > 0 && uploadProgress < 100 ? (
                      <>Uploading... {Math.round(uploadProgress)}%</>
                    ) : (
                      <>
                        <Upload className="mr-2 h-3.5 w-3.5" />
                        Upload Image
                      </>
                    )}
                  </Button>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    JPG, PNG up to 2MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon - Data Access & RAG */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
              <div className="text-center">
                <Lock className="mx-auto mb-2 h-6 w-6 text-gray-400" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Coming Soon
                </p>
                <p className="mt-1 text-xs text-gray-500">RAG & Data Access</p>
              </div>
            </div>
            <CardHeader>
              <h2 className="text-base font-semibold">Data Access</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Connect your data sources for intelligent responses
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-3 opacity-40">
                {[
                  'Product Catalog',
                  'Customer Data',
                  'Analytics',
                  'Knowledge Base',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded border border-gray-200 p-2.5 dark:border-gray-700"
                  >
                    <input
                      type="checkbox"
                      disabled
                      className="h-4 w-4 rounded"
                    />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={saveConfig} disabled={loading || !isConfigValid()}>
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                'Save Configuration'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
