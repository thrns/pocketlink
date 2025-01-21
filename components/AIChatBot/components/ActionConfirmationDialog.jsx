import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { imageAesthetics, generatePlaceholderImage } from '../utils/imageUtils';
import {
  safeGetActionDescription,
  getFriendlyActionName,
} from '../utils/actionUtils';
import {
  Check,
  AlertTriangle,
  Info,
  Eye,
  Image as ImageIcon,
  Link2,
  FileText,
} from 'lucide-react';

/**
 * Component for displaying action confirmation dialog with enhanced UI and detailed information
 */
const ActionConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  action,
  theme = 'light',
}) => {
  const [selectedAesthetic, setSelectedAesthetic] = useState(null);

  // Check if this is an image selection action
  const isImageSelection =
    action?.action === 'addImageItem' && action?.isImageSelection;

  // Get friendly details about the action
  const actionDescription = safeGetActionDescription(action);
  const actionName = getFriendlyActionName(action?.action);

  // Determine appropriate icon for action type
  const getActionIcon = () => {
    if (!action?.action) return <Info className="h-5 w-5" />;

    const actionType = action.action.toLowerCase();

    if (actionType.includes('image')) return <ImageIcon className="h-5 w-5" />;
    if (actionType.includes('link')) return <Link2 className="h-5 w-5" />;
    if (actionType.includes('file') || actionType.includes('text'))
      return <FileText className="h-5 w-5" />;

    return <Eye className="h-5 w-5" />;
  };

  // Format parameters to show relevant details
  const getActionDetails = () => {
    if (!action?.parameters) return null;

    const params = action.parameters;
    const details = [];

    // Extract relevant information based on parameter keys
    if (params.url) details.push({ label: 'URL', value: params.url });
    if (params.title) details.push({ label: 'Title', value: params.title });
    if (params.text) details.push({ label: 'Text', value: params.text });
    if (params.imageUrl)
      details.push({ label: 'Image', value: params.imageUrl });

    return details.length > 0 ? details : null;
  };

  const actionDetails = getActionDetails();

  // Handle image aesthetic selection
  const handleAestheticSelect = (aesthetic) => {
    const imageUrl = generatePlaceholderImage(imageAesthetics[aesthetic]);

    // Update the action with the selected image URL
    const updatedAction = {
      ...action,
      parameters: {
        ...action.parameters,
        imageUrl: imageUrl,
        caption: `${aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)} style image`,
      },
    };

    setSelectedAesthetic(aesthetic);
    onConfirm(updatedAction);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent
        className={`overflow-hidden border p-0 ${
          theme === 'dark'
            ? 'border-gray-700 bg-gray-800 text-white'
            : 'border-gray-200'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AlertDialogHeader className="p-6 pb-3">
            <div className="mb-2 flex items-center gap-3">
              {!isImageSelection && (
                <div
                  className={`flex-shrink-0 rounded-full p-2 ${
                    theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-100'
                  }`}
                >
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
              )}
              <AlertDialogTitle
                className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              >
                {isImageSelection
                  ? 'Select an image style'
                  : actionName || 'Confirm Action'}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-base`}
            >
              {isImageSelection
                ? 'Choose an aesthetic style for your generated image:'
                : `Are you sure you want to ${actionDescription}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {isImageSelection ? (
            // Image aesthetic selection with enhanced UI
            <div className="px-6 pb-6">
              <div className="mb-4">
                <p
                  className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}
                >
                  This will generate an AI image with your selected aesthetic
                  style
                </p>
              </div>
              <div className="my-4 grid grid-cols-2 gap-3">
                {Object.keys(imageAesthetics).map((aesthetic, index) => (
                  <motion.button
                    key={aesthetic}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    onClick={() => handleAestheticSelect(aesthetic)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between rounded-lg border p-3 text-sm ${
                      selectedAesthetic === aesthetic
                        ? `border-violet-700 bg-violet-600 text-white ${theme === 'dark' ? 'shadow-inner shadow-black/30' : 'shadow-inner shadow-violet-700/20'}`
                        : theme === 'dark'
                          ? 'border-gray-600 bg-gray-600 bg-gray-700 text-white'
                          : 'border-gray-200 bg-gray-100 bg-gray-50 text-gray-800'
                    } transition-all duration-200`}
                  >
                    <span className="font-medium">
                      {aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)}
                    </span>
                    {selectedAesthetic === aesthetic && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </motion.button>
                ))}
              </div>
              <div
                className={`mt-4 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <p>
                  Images are AI-generated based on the selected style. Results
                  may vary.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Action details section */}
              {actionDetails && (
                <div
                  className={`mb-2 px-6 py-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}
                >
                  <div
                    className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className={`rounded-full p-1 ${
                          theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                        }`}
                      >
                        {getActionIcon()}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        Action Details
                      </span>
                    </div>
                    <div className="space-y-2">
                      {actionDetails.map((detail, index) => (
                        <div key={index} className="flex flex-col">
                          <span
                            className={`text-xs ${
                              theme === 'dark'
                                ? 'text-gray-400'
                                : 'text-gray-500'
                            }`}
                          >
                            {detail.label}:
                          </span>
                          <span
                            className={`truncate text-sm ${
                              theme === 'dark'
                                ? 'text-gray-200'
                                : 'text-gray-800'
                            }`}
                          >
                            {detail.value.length > 50
                              ? `${detail.value.substring(0, 50)}...`
                              : detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Standard action confirmation with improved buttons */}
              <AlertDialogFooter className="flex flex-col gap-3 p-6 pt-3 sm:flex-row">
                <AlertDialogCancel
                  className={`mt-0 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-600 bg-gray-700 text-white'
                      : 'border-gray-200 bg-white'
                  } transition-colors`}
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onConfirm(action)}
                  className="rounded-lg bg-violet-600 bg-violet-700 text-white transition-colors"
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm
                  </motion.button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionConfirmationDialog;
