'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/Clients/supabase/client';

// Create context
const TemplatesContext = createContext();

export function TemplatesProvider({ children }) {
  const [templates, setTemplates] = useState([]); // Store fetched templates
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('templates').select('*');
        if (error) throw error;
        setTemplates(data); // Update state with fetched templates
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  return (
    <TemplatesContext.Provider
      value={{ templates, setTemplates, loading, error }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}

// Hook for accessing templates context
export function useTemplates() {
  return useContext(TemplatesContext);
}
