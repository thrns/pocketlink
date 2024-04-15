'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Content component that uses searchParams
const PaymentErrorContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get transaction data from URL parameters
  const txnid = searchParams.get('txnid') || '';
  const error = searchParams.get('error') || 'An unexpected error occurred';

  const [hasOpener, setHasOpener] = useState(false);

  // Safe client-side initialization
  useEffect(() => {
    setHasOpener(typeof window !== 'undefined' && !!window.opener);
  }, []);

  // Effect to communicate back to the opener window
  useEffect(() => {
    // Check if this window was opened by another window
    if (hasOpener) {
      try {
        // Send message to parent window
        window.opener.postMessage(
          {
            paymentStatus: 'error',
            txnid,
            error,
          },
          window.opener.location.origin
        );

        // Auto-close after a delay
        const timer = setTimeout(() => {
          window.close();
        }, 5000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error communicating with parent window:', error);
      }
    }
  }, [txnid, error, hasOpener]);

  // Handle manual window closing
  const handleClose = () => {
    if (hasOpener) {
      window.close();
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <AlertTriangle className="h-12 w-12 text-orange-600" />
      </div>

      <h1 className="mb-3 text-2xl font-bold text-gray-800">Payment Error</h1>

      <p className="mb-6 text-gray-600">
        There was an error processing your payment. This could be due to a
        technical issue on our end.
      </p>

      <div className="mb-6 w-full rounded-lg bg-orange-50 p-4">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Transaction ID:</span>
          <span className="font-medium">{txnid || 'Not available'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Error:</span>
          <span className="max-w-[60%] text-right font-medium text-orange-600">
            {error}
          </span>
        </div>
      </div>

      <Button onClick={handleClose} className="w-full">
        {hasOpener ? 'Close Window' : 'Return to Dashboard'}
      </Button>

      {hasOpener && (
        <p className="mt-4 text-sm text-gray-500">
          This window will close automatically in a few seconds...
        </p>
      )}
    </div>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex h-full items-center justify-center">
    <p className="text-gray-600">Loading payment error details...</p>
  </div>
);

// Main component with Suspense
const PaymentErrorPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {isClient ? (
          <Suspense fallback={<LoadingFallback />}>
            <PaymentErrorContent />
          </Suspense>
        ) : (
          <LoadingFallback />
        )}
      </div>
    </div>
  );
};

export default PaymentErrorPage;
