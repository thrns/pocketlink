import { useState, useCallback } from 'react';
import { useAgent } from '@/app/contexts/AgentContext';
import { useAIBuilder } from '@/app/contexts/AIBuilderContext';

/**
 * Hook for handling action execution in different modes
 * @param {Function} addAIMessage - Function to add AI messages to the chat
 * @param {Function} setLoadingState - Function to update loading state
 * @returns {Object} - Action execution state and functions
 */
export const useActionExecution = (addAIMessage, setLoadingState) => {
  const [mode, setMode] = useState('chat'); // "chat", "agent", or "build"
  const [agentAction, setAgentAction] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [autoSwitchMode, setAutoSwitchMode] = useState(true); // Auto-switch mode enabled by default

  // Get agent and builder execution functions with error handling
  let executeAgentAction = () => ({
    success: false,
    message: 'Agent action execution failed',
  });

  let executeBuilderAction = () => ({
    success: false,
    message: 'Builder action execution failed',
  });

  // Get builder action execution function
  try {
    const { executeAction: builderExecuteAction } = useAIBuilder() || {};
    executeBuilderAction = (action) => {
      try {
        console.log('Executing builder action:', action);
        return (
          builderExecuteAction(action) || {
            success: false,
            message: 'Action execution failed or returned no result',
          }
        );
      } catch (error) {
        console.error('Error during builder action execution:', error);
        return {
          success: false,
          message: error?.message || 'Error during action execution',
        };
      }
    };
  } catch (e) {
    console.error('Error accessing AI Builder:', e);
  }

  // Get agent action execution function
  try {
    const { executeAction: agentExecuteAction } = useAgent() || {};
    executeAgentAction = (action) => {
      try {
        console.log('Executing agent action:', action);
        return (
          agentExecuteAction(action) || {
            success: false,
            message: 'Action execution failed or returned no result',
          }
        );
      } catch (error) {
        console.error('Error during agent action execution:', error);
        return {
          success: false,
          message: error?.message || 'Error during action execution',
        };
      }
    };
  } catch (e) {
    console.error('Error accessing Agent:', e);
  }

  /**
   * Execute the currently selected action based on mode
   */
  const executeSelectedAction = async () => {
    if (!agentAction) {
      console.error('No agent action to execute');
      setLoadingState(false);
      setShowConfirmation(false);
      return;
    }

    const { action, parameters } = agentAction;

    console.log('Executing selected action:', action);
    console.log('With parameters:', parameters);

    try {
      // Special handling for Spotify and YouTube cards to ensure parameters are correct
      if (
        action === 'addSpotifyCard' ||
        action === 'addYouTubeCard' ||
        action === 'addPinterestCard'
      ) {
        // Extract the important parameters with fallbacks
        const { link, spotifyUrl, videoUrl, pinterestUrl, url } =
          parameters || {};
        const mediaUrl =
          link || spotifyUrl || videoUrl || pinterestUrl || url || '';
        const caption =
          parameters?.caption || parameters?.title || 'Media content';
        const sizeKey = parameters?.sizeKey || parameters?.size || null;

        // Create properly formatted parameters
        const formattedParams = {
          link: mediaUrl, // IMPORTANT: Use 'link' as the parameter name expected by AIBuilderContext
          caption: caption,
          sizeKey: sizeKey,
        };

        // For Spotify cards specifically
        if (action === 'addSpotifyCard') {
          formattedParams.theme = parameters?.theme || 'dark';
        }

        // For Pinterest cards specifically (boardLayout for boards)
        if (action === 'addPinterestCard') {
          formattedParams.boardLayout = parameters?.boardLayout || 'boardWidth';
          formattedParams.autoplay = parameters?.autoplay || false;
        }

        console.log(
          `Executing ${action} action with formatted parameters:`,
          formattedParams
        );

        try {
          // Execute the action and get result
          const result = executeBuilderAction({
            action: action,
            parameters: formattedParams,
          });

          // Log the result
          console.log(`${action} action result:`, result);

          // Create success message
          await addAIMessage(
            `${result.success ? '✅' : '❌'} ${
              result.message ||
              `Added ${
                action === 'addSpotifyCard'
                  ? 'Spotify'
                  : action === 'addYouTubeCard'
                    ? 'YouTube'
                    : 'Pinterest'
              } card to your page.`
            }`,
            { isAction: true }
          );

          // Reset the action state
          setAgentAction(null);
          setShowConfirmation(false);
          setLoadingState(false); // Ensure loading is reset after action execution
          return;
        } catch (error) {
          console.error(`Error executing ${action}:`, error);
          // Show error message to the user
          await addAIMessage(
            `Error: ${error.message || `Failed to execute ${action}`}`,
            { isAction: false }
          );

          // Reset states
          setAgentAction(null);
          setShowConfirmation(false);
          setLoadingState(false); // Ensure loading is reset after error
          return;
        }
      }

      // Handle image selection action specially
      if (action === 'addImageItem' && agentAction.isImageSelection) {
        console.log(
          'Executing image selection action with URL:',
          parameters.imageUrl
        );

        try {
          const result = executeBuilderAction({
            action: action,
            parameters: parameters,
          });

          // Show result message
          await addAIMessage(
            result.success
              ? `✅ Added image to your page: ${parameters.caption || 'Image'}`
              : `❌ Failed to add image: ${result.message || 'Unknown error'}`,
            { isAction: true }
          );
        } catch (error) {
          console.error('Error executing image action:', error);

          await addAIMessage(
            `Error adding image: ${error.message || 'Unknown error'}`,
            { isAction: false }
          );
        }

        // Always reset states, regardless of success or failure
        setAgentAction(null);
        setShowConfirmation(false);
        setLoadingState(false);
        return;
      }

      // Handle other action types or fallback
      if (mode === 'agent' && executeAgentAction) {
        // Executing agent actions
        console.log('Executing agent action:', action);
        console.log('With parameters:', parameters);

        const result = executeAgentAction(agentAction);
        console.log('Agent action result:', result);

        // Show result message
        await addAIMessage(result.message || 'Action completed.', {
          isAction: true,
        });
      } else if (mode === 'build' && executeBuilderAction) {
        // Executing builder actions
        console.log('Executing builder action:', action);
        console.log('With parameters:', parameters);

        // Process different parameter formats consistently
        const processedParams = { ...parameters };

        // For URL items, ensure correct parameter names
        if (
          action === 'addUrlItem' &&
          processedParams.link &&
          !processedParams.url
        ) {
          processedParams.url = processedParams.link;
        }

        const result = executeBuilderAction({
          action: action,
          parameters: processedParams,
        });

        console.log('Builder action result:', result);

        // Show result message
        await addAIMessage(result.message || 'Action completed.', {
          isAction: true,
        });
      } else {
        console.error('No action executor available for mode:', mode);

        // Show error message
        await addAIMessage(
          "I couldn't perform that action right now. Please try again later.",
          { isAction: false }
        );
      }

      // Always reset the state after action completion
      setAgentAction(null);
      setShowConfirmation(false);
      setLoadingState(false);
    } catch (error) {
      console.error('Error executing action:', error);

      // Show error message
      await addAIMessage(`Error: ${error.message || 'Something went wrong'}`, {
        isAction: false,
      });

      // Always ensure loading is reset in the outer catch block
      setLoadingState(false);
    }
  };

  /**
   * Cancel the current action
   */
  const cancelAgentAction = async () => {
    console.log('Cancelling agent action');

    // Create a cancellation message
    await addAIMessage('Action cancelled.');

    // Reset the action state
    setAgentAction(null);
    // Ensure the dialog is closed
    setShowConfirmation(false);
  };

  /**
   * Toggle the theme
   * @param {string} currentTheme - The current theme
   * @param {Function} setTheme - Function to set the theme
   */
  const handleAIThemeToggle = useCallback(
    (currentTheme, setTheme) => {
      if (typeof setTheme === 'function') {
        try {
          const newTheme = currentTheme === 'dark' ? 'default' : 'dark';
          setTheme(newTheme);

          // Create a message to inform the user about the theme change
          addAIMessage(
            `I've switched to ${
              newTheme === 'dark' ? 'dark' : 'light'
            } mode for you.`,
            {
              isAction: true,
            }
          );

          return true;
        } catch (error) {
          console.error('Error in AI theme toggle:', error);
        }
      }
      return false;
    },
    [addAIMessage]
  );

  return {
    mode,
    setMode,
    agentAction,
    setAgentAction,
    showConfirmation,
    setShowConfirmation,
    autoSwitchMode,
    setAutoSwitchMode,
    executeAgentAction,
    executeBuilderAction,
    executeSelectedAction,
    cancelAgentAction,
    handleAIThemeToggle,
  };
};

export default useActionExecution;
