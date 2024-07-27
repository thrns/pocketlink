import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    // Auto remove toast after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((message, options = {}) => {
    return addToast(message, options.type || 'info', options.duration || 3000);
  }, [addToast]);

  // Convenience methods
  toast.success = (message, options = {}) => addToast(message, 'success', options.duration || 3000);
  toast.error = (message, options = {}) => addToast(message, 'error', options.duration || 5000);
  toast.warning = (message, options = {}) => addToast(message, 'warning', options.duration || 4000);
  toast.info = (message, options = {}) => addToast(message, 'info', options.duration || 3000);

  return {
    toast,
    toasts,
    removeToast
  };
};