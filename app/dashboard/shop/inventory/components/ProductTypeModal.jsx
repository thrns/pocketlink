import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, ShoppingBag, ExternalLink, AlertCircle } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { hasActivePaymentGateway } from '@/lib/helpers/supabasePaymentGatewayHelpers';

const ProductTypeModal = ({ isOpen, onClose, onSelectType }) => {
  const { user } = useAuth();
  const [hasPaymentGateway, setHasPaymentGateway] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check payment gateway status
  useEffect(() => {
    const checkPaymentGateway = async () => {
      if (!user?.username) {
        setHasPaymentGateway(false);
        setIsLoading(false);
        return;
      }

      try {
        const hasGateway = await hasActivePaymentGateway(user.username);
        setHasPaymentGateway(hasGateway);
      } catch (error) {
        console.error('Error checking payment gateway:', error);
        setHasPaymentGateway(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      checkPaymentGateway();
    }
  }, [user?.username, isOpen]);

  const productTypes = [
    {
      id: 'digital',
      title: 'Digital Product',
      description: 'Upload files or provide links to digital content',
      icon: FileText,
      disabled: false,
    },
    {
      id: 'physical',
      title: 'Physical Product',
      description: hasPaymentGateway
        ? 'Products that require shipping to customers'
        : 'Requires payment gateway integration',
      icon: ShoppingBag,
      disabled: !hasPaymentGateway,
    },
    {
      id: 'external_link',
      title: 'External Product',
      description: 'Link and promote products from other websites',
      icon: ExternalLink,
      disabled: false,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-[90%] px-4 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Select Product Type</DialogTitle>
        </DialogHeader>

        {/* Payment Gateway Warning */}
        {!hasPaymentGateway && !isLoading && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-amber-800">
                  Limited Product Types Available
                </h4>
                <p className="mt-1 text-sm text-amber-700">
                  Paid products require payment gateway integration. Set up a
                  payment method to unlock all product types.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-4 overflow-x-hidden py-4">
          {productTypes.map((type) => (
            <div
              key={type.id}
              onClick={() =>
                !type.disabled && !isLoading && onSelectType(type.id)
              }
              className={`h-auto rounded-md border p-3 text-left transition-colors sm:p-4 ${
                type.disabled || isLoading
                  ? 'cursor-not-allowed opacity-60'
                  : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {/* The inner Grid layout stays the same */}
              <div className="grid grid-cols-[auto_1fr] items-start gap-x-4">
                <div className="rounded-md bg-blue-100 p-3">
                  <type.icon className="h-5 w-5 text-blue-600" />
                </div>
                {/* Note: The "flex-1 min-w-0" div is simplified to just a div */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{type.title}</h3>
                    {type.disabled && (
                      <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                        {type.id === 'physical'
                          ? 'Gateway Required'
                          : 'Coming Soon'}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {type.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductTypeModal;
