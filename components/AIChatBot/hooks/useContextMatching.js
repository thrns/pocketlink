import { useCallback } from 'react';
import { useAgent } from '@/app/contexts/AgentContext';

/**
 * Custom hook for context data matching and filtering
 * @returns {Object} - Functions for context matching
 */
export const useContextMatching = () => {
  const { findRelevantContext } = useAgent();

  /**
   * Filter context data based on a prompt using Boyer-Moore and KMP algorithms
   * @param {string} prompt - The prompt to match against
   * @param {Object} contextData - The full context data object
   * @returns {Object} - Filtered context data
   */
  const filterContextData = useCallback(
    (prompt, contextData) => {
      if (!findRelevantContext) {
        console.warn('findRelevantContext function not available');
        return contextData;
      }

      return findRelevantContext(prompt, contextData);
    },
    [findRelevantContext]
  );

  /**
   * Store filtered context data in window object for later use
   * @param {string} prompt - The prompt to match against
   */
  const setFilteredContextData = useCallback(
    (prompt) => {
      if (typeof window === 'undefined' || !window.__contextData) {
        console.warn('No context data available to filter');
        return;
      }

      if (!findRelevantContext) {
        console.warn('findRelevantContext function not available');
        return;
      }

      window.__filteredContextData = findRelevantContext(
        prompt,
        window.__contextData
      );
      console.log('Context data filtered based on prompt');
    },
    [findRelevantContext]
  );

  /**
   * Clear the filtered context data
   */
  const clearFilteredContextData = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.__filteredContextData = null;
    }
  }, []);

  return {
    filterContextData,
    setFilteredContextData,
    clearFilteredContextData,
  };
};

export default useContextMatching;
