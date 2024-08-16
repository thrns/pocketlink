// PaymentGatewaysTab.jsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Loader2, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/app/contexts/AuthContext';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';

const PAYMENT_GATEWAYS = [
  {
    key: 'razorpay',
    label: 'Razorpay',
    icon: (
      <img
        src="/paymentProviders/razorpay.png"
        alt="Razorpay"
        className="h-full w-full rounded-full"
      />
    ),
    comingSoon: false,
  },
  {
    key: 'easebuzz',
    label: 'Easebuzz',
    icon: (
      <img
        src="/paymentProviders/easebuzz.png"
        alt="Easebuzz"
        className="border-200 h-full w-full rounded-full border"
      />
    ),
    comingSoon: false,
  },
  {
    key: 'cashfree',
    label: 'Cashfree',
    icon: (
      <img
        src="/paymentProviders/cashfree.png"
        alt="Cashfree"
        className="border-200 h-full w-full rounded-full border"
      />
    ),
    comingSoon: true,
  },
  {
    key: 'payu',
    label: 'PayU',
    icon: (
      <img
        src="/paymentProviders/payu.png"
        alt="PayU"
        className="border-200 h-full w-full rounded-full border"
      />
    ),
    comingSoon: true,
  },
  {
    key: 'stripe',
    label: 'Stripe',
    icon: (
      <img
        src="/paymentProviders/stripe.png"
        alt="Stripe"
        className="border-200 h-full w-full rounded-full border"
      />
    ),
    comingSoon: true,
  },
  {
    key: 'paypal',
    label: 'PayPal',
    icon: (
      <img
        src="/paymentProviders/paypal.png"
        alt="PayPal"
        className="border-200 h-full w-full rounded-full border"
      />
    ),
    comingSoon: true,
  },
  {
    key: 'phonepe',
    label: 'PhonePe',
    icon: (
      <img
        src="/paymentProviders/phonepe.png"
        alt="PhonePe"
        className="border-200 h-full w-full rounded-full border"
      />
    ),
    comingSoon: true,
  },
];

export default function PaymentGatewaysTab() {
  const { user } = useAuth();
  const { paymentGateways, addPaymentGateway, removePaymentGateway, editPaymentGateway } =
    usePaymentGateway();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({ key: '', salt: '' });
  const [editForm, setEditForm] = useState({ key: '', salt: '' });
  const [editingGateway, setEditingGateway] = useState(null);
  const [connectingGateway, setConnectingGateway] = useState(null);
  const [showCredentials, setShowCredentials] = useState({});

  // Helper function to check if a gateway is connected
  const isGatewayConnected = (gatewayKey) => {
    return paymentGateways.some(
      (gateway) =>
        gateway.gateway_name.toLowerCase() === gatewayKey.toLowerCase() &&
        gateway.is_active
    );
  };

  // Get connected gateway for a specific type
  const getConnectedGateway = (gatewayKey) => {
    return paymentGateways.find(
      (gateway) =>
        gateway.gateway_name.toLowerCase() === gatewayKey.toLowerCase() &&
        gateway.is_active
    );
  };

  // Handle connect/disconnect
  const handleConnect = (gateway) => {
    if (gateway.key === 'easebuzz' || gateway.key === 'razorpay') {
      setConnectingGateway(gateway);
      setIsDialogOpen(true);
    }
  };

  const handleDisconnect = async (gateway) => {
    setProcessing(true);
    try {
      const connectedGateway = getConnectedGateway(gateway.key);
      if (connectedGateway) {
        await removePaymentGateway(connectedGateway.id);
      }
    } catch (error) {
      console.error('Error disconnecting gateway:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDialogSubmit = async (e) => {
    e.preventDefault();
    if (!connectingGateway) return;
    
    setProcessing(true);
    try {
      // Save credentials to database using context
      const gatewayData = {
        gateway_name: connectingGateway.key === 'easebuzz' ? 'EaseBuzz' : 'Razorpay',
        api_key: form.key,
        salt_value: form.salt,
        is_active: true,
      };

      await addPaymentGateway(gatewayData);

      // Reset form and close dialog
      setForm({ key: '', salt: '' });
      setConnectingGateway(null);
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(
        `Failed to connect ${connectingGateway.label}: ` + (err.message || 'Unknown error')
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleEdit = (gateway) => {
    const connectedGateway = getConnectedGateway(gateway.key);
    if (connectedGateway) {
      setEditingGateway(connectedGateway);
      setEditForm({
        key: connectedGateway.api_key || '',
        salt: connectedGateway.salt_value || ''
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingGateway) return;
    
    setProcessing(true);
    try {
      await editPaymentGateway(editingGateway.id, {
        api_key: editForm.key,
        salt_value: editForm.salt
      });
      
      setEditForm({ key: '', salt: '' });
      setEditingGateway(null);
      setIsEditDialogOpen(false);
      toast.success('Gateway credentials updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update credentials: ' + (err.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  };

  const toggleCredentialVisibility = (gatewayKey) => {
    setShowCredentials(prev => ({
      ...prev,
      [gatewayKey]: !prev[gatewayKey]
    }));
  };

  return (
    <TabsContent value="payment">
      <div className="space-y-4">
        {PAYMENT_GATEWAYS.map((gateway) => {
          const isConnected = isGatewayConnected(gateway.key);
          const isAnyConnected = paymentGateways.some((g) => g.is_active);
          const connectedGateway = getConnectedGateway(gateway.key);
          
          return (
            <div
              key={gateway.key}
              className={`rounded-lg border bg-white transition-all duration-200 ${
                isConnected ? 'border-bento-violet bg-bento-violet/5' : ''
              }`}
            >
              <div className={`flex items-center justify-between p-4 ${isConnected ? 'pb-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    {gateway.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{gateway.label}</h3>
                    {gateway.comingSoon && (
                      <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                        Coming Soon
                      </span>
                    )}
                    {isConnected && (
                      <span className="ml-2 text-xs text-green-600">
                        Connected
                      </span>
                    )}
                  </div>
                </div>
                {/* Button logic */}
                {gateway.comingSoon ? (
                  <Button variant="outline" disabled>
                    Coming Soon
                  </Button>
                ) : isConnected ? (
                  <Button
                    variant="destructive"
                    onClick={() => handleDisconnect(gateway)}
                    disabled={processing}
                    className="border-red-500 bg-red-500 text-white hover:bg-red-600"
                  >
                    {processing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleConnect(gateway)}
                    disabled={isAnyConnected}
                    className="bg-gradient-to-r from-bento-violetLight to-bento-violet text-white"
                  >
                    Connect
                  </Button>
                )}
              </div>

              {/* Extended section for connected gateways */}
              {isConnected && connectedGateway && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Credentials</h4>
                    
                    {/* API Key */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-16">Key:</span>
                      <code className="flex-1 rounded bg-gray-100 px-2 py-1 text-sm font-mono">
                        {showCredentials[`${gateway.key}_key`] 
                          ? connectedGateway.api_key 
                          : '••••••••••••••••'}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCredentialVisibility(`${gateway.key}_key`)}
                      >
                        {showCredentials[`${gateway.key}_key`] ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />
                        }
                      </Button>
                    </div>

                    {/* Salt */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-16">Salt:</span>
                      <code className="flex-1 rounded bg-gray-100 px-2 py-1 text-sm font-mono">
                        {showCredentials[`${gateway.key}_salt`] 
                          ? connectedGateway.salt_value 
                          : '••••••••••••••••'}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCredentialVisibility(`${gateway.key}_salt`)}
                      >
                        {showCredentials[`${gateway.key}_salt`] ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />
                        }
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(gateway)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment Gateway Credentials Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setConnectingGateway(null);
          setForm({ key: '', salt: '' });
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {connectingGateway?.label || 'Payment Gateway'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDialogSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                {connectingGateway?.key === 'razorpay' ? 'Key ID' : 'Key'}
              </label>
              <Input
                required
                value={form.key}
                onChange={(e) =>
                  setForm((f) => ({ ...f, key: e.target.value }))
                }
                placeholder={connectingGateway?.key === 'razorpay' ? 'Enter Razorpay Key ID' : 'Enter EaseBuzz Key'}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                {connectingGateway?.key === 'razorpay' ? 'Key Secret' : 'Salt'}
              </label>
              <Input
                required
                value={form.salt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, salt: e.target.value }))
                }
                placeholder={connectingGateway?.key === 'razorpay' ? 'Enter Razorpay Key Secret' : 'Enter EaseBuzz Salt'}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setConnectingGateway(null);
                  setForm({ key: '', salt: '' });
                }}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={processing || !form.key || !form.salt}
              >
                {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Connect
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Gateway Credentials Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingGateway?.gateway_name} Credentials</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Key</label>
              <Input
                required
                value={editForm.key}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, key: e.target.value }))
                }
                placeholder="Enter Key"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Salt</label>
              <Input
                required
                value={editForm.salt}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, salt: e.target.value }))
                }
                placeholder="Enter Salt"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={processing || !editForm.key || !editForm.salt}
              >
                {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
}
