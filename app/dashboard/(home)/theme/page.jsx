'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { THEMES } from '@/app/contexts/FetcherContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { Check, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/app/contexts/SubscriptionContext';

export default function ThemePage() {
  const { themeData, updateTheme } = useFetch();
  const { user } = useAuth();
  const { isPremium } = useSubscription();

  const freeThemes = Object.values(THEMES);

  // Premium themes will be implemented later
  const premiumThemes = [];

  const handleThemeSelect = (theme) => {
    updateTheme(theme);
    toast.success(`Theme updated to ${theme.name}`);
  };

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Choose a Theme</h1>
        <p className="text-gray-600">
          Customize the look and feel of your Pocketlink
        </p>
      </div>

      {/* Theme Selection */}
      <Tabs
        defaultValue="free"
        className="flex flex-1 flex-col overflow-hidden"
      >
        <TabsList className="mb-6 grid w-fit grid-cols-2">
          <TabsTrigger value="free">Free Themes</TabsTrigger>
          <TabsTrigger value="premium" className="relative">
            Premium Themes
            <Crown size={12} className="ml-1 text-yellow-500" />
          </TabsTrigger>
        </TabsList>

        {/* Free Themes Tab */}
        <TabsContent
          value="free"
          className="flex-1 space-y-4 overflow-y-auto pb-4"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
            {freeThemes.map((theme) => (
              <ThemeCard
                key={theme.name}
                theme={theme}
                isSelected={themeData.name === theme.name}
                onClick={() => handleThemeSelect(theme)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Premium Themes Tab */}
        <TabsContent
          value="premium"
          className="flex-1 space-y-4 overflow-y-auto pb-4"
        >
          {!isPremium ? (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-gray-300 p-8">
              <Crown size={48} className="text-yellow-500" />
              <h3 className="text-center text-lg font-semibold">
                Premium Themes Are Exclusive to Pro Users
              </h3>
              <p className="max-w-md text-center text-gray-500">
                Upgrade to Pro to unlock beautiful premium themes and other
                exclusive features.
              </p>
              <Button
                className="rounded-lg bg-gradient-to-r from-bento-violetLight to-bento-violet px-4 py-2 text-white"
                onClick={() => window.open('/pricing', '_blank')}
              >
                Upgrade to Pro
              </Button>
            </div>
          ) : premiumThemes.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
              <Badge
                variant="outline"
                className="border-amber-500 px-3 py-1 text-amber-500"
              >
                Coming Soon
              </Badge>
              <h3 className="text-lg font-semibold">
                Premium Themes Are On The Way!
              </h3>
              <p className="max-w-md text-gray-500">
                We're designing beautiful premium themes exclusively for Pro
                users. Check back soon to be among the first to use them!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {premiumThemes.map((theme) => (
                <ThemeCard
                  key={theme.name}
                  theme={theme}
                  isSelected={themeData.name === theme.name}
                  onClick={() => handleThemeSelect(theme)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Individual theme card component
function ThemeCard({ theme, isSelected, onClick }) {
  return (
    <div
      className={`relative flex cursor-pointer flex-col items-center rounded-lg border p-4 transition-all hover:shadow-md ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      {/* Theme color preview */}
      <div
        className="mb-3 flex h-32 w-full items-center justify-center rounded-md"
        style={{ background: theme.color }}
      >
        <span
          className="text-lg font-medium"
          style={{ color: theme.textMode === 'light' ? 'white' : 'black' }}
        >
          Aa
        </span>
      </div>

      {/* Theme name */}
      <span className="text-sm font-medium">{theme.name}</span>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
}