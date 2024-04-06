'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResponsiveGridClient from '@/app/[tenant]/components/ResponsiveGridClient';
import { useAuth } from '@/app/contexts/AuthContext';
import SaveTemplateButton from '../lib/SaveTemplateButton';
import { useTemplates } from '../context/TemplatesContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function TemplateDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();
  const { getTemplateById, loading: templatesLoading } = useTemplates();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    // Get template from context
    const templateData = getTemplateById(id);

    if (templateData) {
      setTemplate(templateData);
      setLoading(false);
    } else if (!templatesLoading) {
      // If templates are loaded but we don't have this template, redirect to templates page
      router.push('/templates');
    }

    // Detect device type
    const isMobile = window.innerWidth < 768;
    setDeviceType(isMobile ? 'mobile' : 'desktop');

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDeviceType(isMobile ? 'mobile' : 'desktop');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [id, router, getTemplateById, templatesLoading]);

  if (loading || templatesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Template Not Found</h2>
        <Button onClick={() => router.push('/templates')}>
          Back to Templates
        </Button>
      </div>
    );
  }

  // Default theme values if not provided in the template
  let theme = template?.theme;
  try {
    theme = typeof theme === 'string' ? JSON.parse(theme) : theme;
  } catch (error) {
    console.error('Error parsing theme:', error);
    theme = {
      textMode: 'dark',
      color: '#ffffff',
    };
  }

  // Ensure profile data exists
  const profile = template?.profile || {};
  const textColor = theme?.textMode === 'dark' ? 'black' : 'white';
  const descriptionColor = theme?.textMode === 'dark' ? '#1c1c1b' : '#f0f0ed';

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-start justify-start overflow-y-auto md:flex-row`}
      style={{ background: theme?.color }}
    >
      {/* Left Panel - Template Info */}
      <div className="flex w-full flex-shrink-0 flex-col p-6 md:sticky md:top-0 md:h-screen md:w-[35%]">
        {/* Back button */}
        <div className={`mb-4`}>
          <Link href="/templates">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Back to Templates
            </Button>
          </Link>
        </div>

        <main className="relative mt-6 flex h-full w-full flex-col items-center justify-start rounded-md p-4">
          <div className="flex w-full flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-4 flex flex-col items-center">
              <Avatar className="h-[128px] w-[128px] border">
                {profile?.avatarURL ? (
                  <AvatarImage
                    src={profile.avatarURL}
                    alt={template.template_name}
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-4xl text-white">
                    {template.template_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            {/* Template Name */}
            <div className="flex w-full flex-col items-center">
              <h1
                className="mb-2 text-center text-2xl font-semibold"
                style={{ color: textColor }}
              >
                {template.template_name}
              </h1>
            </div>

            {/* Category */}
            <div
              className={`mb-4 text-center text-lg ${
                theme?.textMode === 'dark' ? 'text-gray-800' : 'text-gray-200'
              }`}
            >
              {template.category}
            </div>

            {/* Description */}
            <div className="relative flex w-full flex-col items-center">
              <p
                className="mb-6 w-full whitespace-pre-wrap break-words text-center text-base"
                style={{ color: descriptionColor }}
                dangerouslySetInnerHTML={{
                  __html: profile?.description
                    ? profile.description
                        .replace(
                          /(https?:\/\/[^\s]+)/g,
                          '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>'
                        )
                        .replace(/\n/g, '<br>')
                    : template.description || '',
                }}
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-6 mt-4 w-full rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/30">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Disclaimer:</strong> This is just a visual example and not
              the actual brand's template. The content is for demonstration
              purposes only.
            </p>
          </div>

          {/* Use Template Button */}
          <SaveTemplateButton
            username={user?.username}
            items={template.items || []}
            mobileItems={template.mobileItems || []}
            theme={theme}
          />
        </main>
      </div>

      {/* Right Side - Template Preview */}
      <div className="relative flex h-full w-full items-start justify-start px-1 py-1 md:pt-10">
        {template.items && (
          <ResponsiveGridClient
            username="template-preview"
            tenantTheme={theme}
            items={template.items || []}
            mobileItems={template.mobileItems || []}
          />
        )}

        {!template.items && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="max-w-md rounded-xl bg-gray-100 p-8 text-center dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-300">
                This template doesn't have any preview content available.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
