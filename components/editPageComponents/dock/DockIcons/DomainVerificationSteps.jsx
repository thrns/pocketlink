'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Copy,
  ExternalLink,
  Shield,
  Globe,
  Settings,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';

const DomainVerificationSteps = ({
  domain,
  dnsRecords = [],
  sslStatus = 'pending',
  verificationStatus = 'pending',
  verificationErrors = [],
  onRefresh,
  isRefreshing = false,
}) => {
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied!', {
        description: `${label} copied to clipboard`,
        style: {
          backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD)',
          color: 'white',
          borderRadius: '8px',
        },
      });
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
      case 'pending_validation':
      case 'initializing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'pending_validation':
      case 'initializing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStepStatus = (stepIndex) => {
    if (stepIndex === 0) {
      // DNS Configuration step
      return verificationStatus === 'active' ? 'completed' : 'pending';
    } else if (stepIndex === 1) {
      // SSL Certificate step
      return sslStatus === 'active'
        ? 'completed'
        : verificationStatus === 'active'
          ? 'pending'
          : 'waiting';
    } else if (stepIndex === 2) {
      // Domain Active step
      return verificationStatus === 'active' && sslStatus === 'active'
        ? 'completed'
        : 'waiting';
    }
    return 'waiting';
  };

  const steps = [
    {
      title: 'Configure DNS Records',
      description: 'Add the required DNS records to your domain provider',
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: 'SSL Certificate Provisioning',
      description: 'Cloudflare will automatically provision an SSL certificate',
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: 'Domain Active',
      description: 'Your custom domain is ready to use',
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Current Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Domain Status: {domain}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="ml-2"
            >
              {isRefreshing ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                'Refresh Status'
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Domain Verification Status */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(verificationStatus)}
                <div>
                  <p className="text-sm font-medium">Domain Verification</p>
                  <p className="text-xs text-gray-600">
                    {verificationStatus === 'active'
                      ? 'DNS records verified'
                      : 'Checking DNS configuration'}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(verificationStatus)}>
                {verificationStatus || 'pending'}
              </Badge>
            </div>

            {/* SSL Status */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(sslStatus)}
                <div>
                  <p className="text-sm font-medium">SSL Certificate</p>
                  <p className="text-xs text-gray-600">
                    {sslStatus === 'active'
                      ? 'Certificate issued'
                      : 'Provisioning certificate'}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(sslStatus)}>
                {sslStatus || 'pending'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : status === 'pending'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : status === 'pending' ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        step.icon
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{step.title}</h3>
                    <p className="mt-1 text-xs text-gray-600">
                      {step.description}
                    </p>
                    {status === 'completed' && (
                      <p className="mt-1 text-xs font-medium text-green-600">
                        ✓ Completed
                      </p>
                    )}
                    {status === 'pending' && (
                      <p className="mt-1 text-xs font-medium text-blue-600">
                        ⏳ In Progress
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* DNS Records Configuration */}
      {dnsRecords && dnsRecords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              DNS Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Add these DNS records to your domain provider's control panel.
                For apex domains (root domains), you can choose either the CNAME
                or A record option - both will work. Changes may take up to 24
                hours to propagate.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {dnsRecords.map((record, index) => (
                <div key={index} className="rounded-lg border bg-gray-50 p-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wide text-gray-600">
                        Type
                      </label>
                      <div className="mt-1 flex items-center justify-between">
                        <code className="rounded border bg-white px-2 py-1 font-mono text-sm">
                          {record.type}
                        </code>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium uppercase tracking-wide text-gray-600">
                        Name
                      </label>
                      <div className="mt-1 flex items-center justify-between">
                        <code className="break-all rounded border bg-white px-2 py-1 font-mono text-sm">
                          {record.name}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(record.name, 'Name')}
                          className="ml-2 h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-medium uppercase tracking-wide text-gray-600">
                        Value
                      </label>
                      <div className="mt-1 flex items-center justify-between">
                        <code className="flex-1 break-all rounded border bg-white px-2 py-1 font-mono text-sm">
                          {record.value}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(record.value, 'Value')}
                          className="ml-2 h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {record.ttl && (
                    <div className="mt-3 border-t pt-3">
                      <label className="text-xs font-medium uppercase tracking-wide text-gray-600">
                        TTL (Time To Live)
                      </label>
                      <div className="mt-1">
                        <code className="rounded border bg-white px-2 py-1 font-mono text-sm">
                          {record.ttl} seconds (or Auto)
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Make sure to add these records
                exactly as shown. Some DNS providers may automatically add your
                domain to the name field - if so, you may need to use just the
                subdomain part (e.g., "www" instead of "www.yourdomain.com").
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Verification Errors */}
      {verificationErrors && verificationErrors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Verification Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {verificationErrors.map((error, index) => (
                <Alert key={index} className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              ))}
            </div>

            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                If you're experiencing issues, try:
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Double-check that DNS records are added correctly</li>
                  <li>Wait for DNS propagation (up to 24 hours)</li>
                  <li>Use a DNS checker tool to verify record propagation</li>
                  <li>Contact your DNS provider if records aren't updating</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Help Links */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                window.open('https://www.whatsmydns.net/', '_blank')
              }
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Check DNS Propagation
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                window.open(
                  'https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/',
                  '_blank'
                )
              }
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Cloudflare SSL Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainVerificationSteps;
