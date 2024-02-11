'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/Clients/supabase/client';

const TemplatesContext = createContext();

export function TemplatesProvider({ children }) {
  const [templates, setTemplates] = useState([]);
  const [templatesMap, setTemplatesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.from('templates').select('*');

        if (error) throw error;

        setTemplates(data || []);

        // Create a map for quick lookup of templates by ID
        const templatesById = {};
        data?.forEach((template) => {
          templatesById[template.uuid] = template;
        });
        setTemplatesMap(templatesById);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  // Get a specific template by ID
  const getTemplateById = (id) => {
    return templatesMap[id] || null;
  };

  // Group templates by category
  const getTemplatesByCategory = () => {
    const grouped = {};

    templates.forEach((template) => {
      const category = template.category || 'Uncategorized';

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push(template);
    });

    return grouped;
  };

  // Get list of unique categories
  const getCategories = () => {
    const categories = new Set();

    templates.forEach((template) => {
      const category = template.category || 'Uncategorized';
      categories.add(category);
    });

    return Array.from(categories).map((category) => ({ category }));
  };

  return (
    <TemplatesContext.Provider
      value={{
        templates,
        loading,
        error,
        getTemplateById,
        getTemplatesByCategory,
        getCategories,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplates() {
  const context = useContext(TemplatesContext);
  if (context === undefined) {
    throw new Error('useTemplates must be used within a TemplatesProvider');
  }
  return context;
}
