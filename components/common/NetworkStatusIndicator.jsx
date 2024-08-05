'use client';

import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { WifiOff } from 'lucide-react'; // Assuming you use lucide-react

let toastId = null; // To keep track of the current toast

const NetworkStatusIndicator = () => {
  const [isConnectionWeak, setIsConnectionWeak] = useState(false);

  const updateNetworkStatus = useCallback(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    let weakConnection = false;

    if (connection) {
      // Prioritize effectiveType if available
      if (connection.effectiveType) {
        if (
          ['slow-2g', '2g', '3g', 'slow-3g', 'slow-4g'].includes(
            connection.effectiveType
          )
        ) {
          weakConnection = true;
        }
      }
      // Fallback to downlink and rtt if effectiveType is not one of the above, or not available
      // These thresholds might need adjustment based on your app\'s needs
      else {
        if (
          typeof connection.downlink !== 'undefined' &&
          connection.downlink < 0.5
        ) {
          // Less than 0.5 Mbps
          weakConnection = true;
        }
        if (typeof connection.rtt !== 'undefined' && connection.rtt > 1000) {
          // Round trip time > 1000ms
          weakConnection = true;
        }
      }

      // Also consider navigator.onLine as a hard offline indicator
      if (!navigator.onLine) {
        weakConnection = true;
      }
    } else if (!navigator.onLine) {
      // Fallback for browsers not supporting navigator.connection but do support navigator.onLine
      weakConnection = true;
    }
    // If no specific weak signals, but browser is offline, mark as weak.
    else if (!navigator.onLine) {
      weakConnection = true;
    }

    setIsConnectionWeak(weakConnection);

    if (weakConnection) {
      const toastContent = (
        <div
          className="flex items-center rounded-md border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700 shadow-lg"
          role="alert"
        >
          <WifiOff size={28} className="mr-3 animate-pulse text-yellow-600" />
          <div>
            <p className="font-bold">Weak Connection</p>
            <p className="text-sm">
              Changes might not be saved due to an unstable network.
            </p>
          </div>
        </div>
      );

      if (toastId) {
        // To update content with toast.custom, it's often easier to dismiss and re-show
        // or ensure the initial render of toast.custom has everything needed.
        // For simplicity with toast.custom, if we need to update, we might re-trigger it.
        // However, since the content is static once weak, we can just ensure it shows.
        // If it was dismissed by user interaction (not possible with duration: Infinity without a close button),
        // this would re-show it.
        toast.custom(toastContent, { id: toastId, duration: Infinity });
      } else {
        toastId = toast.custom(toastContent, { duration: Infinity });
      }
    } else {
      if (toastId) {
        toast.dismiss(toastId);
        toastId = null;
      }
    }
  }, []);

  useEffect(() => {
    // Initial check
    updateNetworkStatus();

    // Listen for overall online/offline changes
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Listen for changes in connection quality if API is available
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
      // Dismiss any active toast on component unmount
      if (toastId) {
        toast.dismiss(toastId);
        toastId = null;
      }
    };
  }, [updateNetworkStatus]);

  return null; // This component only renders toasts
};

export default NetworkStatusIndicator;
