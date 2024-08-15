'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Link2,
  Loader2,
  Mail,
  Instagram,
  Youtube,
  CreditCard,
  Eye,
  EyeOff,
  Edit,
  PlusCircle,
  Trash2,
  Plug,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/contexts/AuthContext';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import handler functions for each service
import handleGmailConnection from '@/app/dashboard/integrations/lib/handleGmailConnection';
import handleGmailDisconnect from '@/app/dashboard/integrations/lib/handleGmailDisconnect';
import handleYoutubeConnection from '@/app/dashboard/integrations/lib/handleYoutubeConnection';
import handleYoutubeDisconnect from '@/app/dashboard/integrations/lib/handleYoutubeDisconnect';

import PaymentGatewaysTab from './components/PaymentGatewaysTab';

// Import utility functions
import {
  updateLocalStateAndCookies,
  getPercentageColor,
  checkConnections as checkConnectionsUtil,
  checkPendingAuth,
} from '@/app/dashboard/integrations/lib/connectionsUtils';
import { FaFacebook } from 'react-icons/fa';
import { supabase } from '@/Clients/supabase/client';

export default function IntegrationsPage() {
  const { user, setUser } = useAuth();
  const {
    paymentGateways,
    loading: paymentGatewaysLoading,
    addPaymentGateway,
    editPaymentGateway,
    removePaymentGateway,
    toggleGatewayStatus,
  } = usePaymentGateway();

  // Individual processing states for each service
  const [processingStates, setProcessingStates] = useState({
    gmail: false,
    youtube: false,
    instagram: false,
  });

  // Payment Gateway State
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);

  // PaymentGatewaysTab state - removed since now using context

  const [disconnecting, setDisconnecting] = useState(false);
  const [instagramDisconnecting, setInstagramDisconnecting] = useState(false);

  const [formData, setFormData] = useState({
    gateway_name: 'EaseBuzz', // Default to EaseBuzz since it's currently the only option
    api_key: '',
    salt_value: '',
    is_active: true,
  });
  const [showKeys, setShowKeys] = useState({});

  const [connections, setConnections] = useState({
    gmail: {
      status: 'checking',
      label: 'Gmail',
      icon: <Mail className="text-red-500" size={20} />,
      canDisconnect: true,
    },
    youtube: {
      status: 'checking',
      label: 'YouTube',
      icon: <Youtube className="text-red-600" size={20} />,
      canDisconnect: true,
    },
    instagram: {
      status: 'checking',
      label: 'Instagram',
      icon: <Instagram className="text-pink-500" size={20} />,
      canDisconnect: true,
    },
  });

  const [connectionPercentage, setConnectionPercentage] = useState(0);

  // Helper function to update a specific connection's status
  const updateConnectionStatus = (platform, status) => {
    setConnections((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        status,
      },
    }));
  };

  // Helper function to set a specific platform's processing state
  const setProcessingState = (platform, isProcessing) => {
    setProcessingStates((prev) => ({
      ...prev,
      [platform]: isProcessing,
    }));
  };

  // Update the connection percentage
  const updateConnectionPercentage = () => {
    const connectedCount = Object.values(connections).filter(
      (conn) => conn.status === 'connected'
    ).length;

    setConnectionPercentage(
      Math.round((connectedCount / Object.keys(connections).length) * 100)
    );
  };

  // Wrapper for updating local state and cookies
  const updateUserData = (updatedUserData) => {
    updateLocalStateAndCookies(user, setUser, updatedUserData);
  };

  // Check connections on component mount and when user changes
  useEffect(() => {
    if (user?.username) {
      checkConnectionsUtil(
        user,
        connections,
        setConnections,
        setConnectionPercentage
      );
    }
  }, [user?.username]);

  // Check for pending auth on component mount
  useEffect(() => {
    if (user?.username) {
      // Check Gmail auth
      checkPendingAuth(
        'gmail',
        user,
        updateConnectionStatus,
        setProcessingState,
        updateConnectionPercentage
      );

      // Check YouTube auth
      checkPendingAuth(
        'youtube',
        user,
        updateConnectionStatus,
        setProcessingState,
        updateConnectionPercentage
      );

      // Check Instagram auth
      checkPendingAuth(
        'instagram',
        user,
        updateConnectionStatus,
        setProcessingState,
        updateConnectionPercentage
      );
    }
  }, [user?.username]);

  // Check Facebook and Instagram connection status on user data change
  useEffect(() => {
    if (user) {
      // Update Instagram status
      const instagramConnected = !!user?.integrations?.instagram;
      updateConnectionStatus(
        'instagram',
        instagramConnected ? 'connected' : 'disconnected'
      );

      // Update connection percentage after status updates
      setTimeout(updateConnectionPercentage, 100);
    }
  }, [user?.integrations]);

  // Payment gateway handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, is_active: checked }));
  };

  const resetForm = () => {
    setFormData({
      gateway_name: 'EaseBuzz',
      api_key: '',
      salt_value: '',
      is_active: true,
    });
    setSelectedGateway(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPaymentGateway(formData);
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to add payment gateway:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGateway) return;

    try {
      await editPaymentGateway(selectedGateway.id, formData);
      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to update payment gateway:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedGateway) return;

    try {
      await removePaymentGateway(selectedGateway.id);
      setIsDeleteDialogOpen(false);
      setSelectedGateway(null);
    } catch (error) {
      console.error('Failed to delete payment gateway:', error);
    }
  };

  const prepareEdit = (gateway) => {
    setSelectedGateway(gateway);
    setFormData({
      gateway_name: gateway.gateway_name,
      api_key: gateway.api_key,
      salt_value: gateway.salt_value,
      is_active: gateway.is_active,
    });
    setIsEditDialogOpen(true);
  };

  const prepareDelete = (gateway) => {
    setSelectedGateway(gateway);
    setIsDeleteDialogOpen(true);
  };

  // Modified to toggle only the specific field's visibility
  const toggleKeyVisibility = (id, field) => {
    setShowKeys((prev) => ({
      ...prev,
      [`${id}_${field}`]: !prev[`${id}_${field}`],
    }));
  };

  // Facebook connection handlers (from snippet 2)
  const handleConnectFacebook = () => {
    setProcessingState('instagram', true);
    updateConnectionStatus('instagram', 'connecting');

    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const loginUri = new URL(
      `https://www.facebook.com/dialog/oauth`,
      location.href
    );
    loginUri.searchParams.set('client_id', appId);
    loginUri.searchParams.set('display', 'page');
    loginUri.searchParams.set('redirect_uri', redirectUri);
    loginUri.searchParams.set('response_type', 'code');
    loginUri.searchParams.set(
      'scope',
      'instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement,business_management,ads_read'
    );
    window.open(loginUri.toString());
  };

  const handleDisconnectFacebook = async () => {
    setProcessingState('instagram', true);
    updateConnectionStatus('instagram', 'disconnecting');
    setDisconnecting(true);

    try {
      // Remove Instagram from integrations
      const newIntegrations = { ...(user.integrations || {}) };
      delete newIntegrations.instagram;

      await supabase
        .from('user_data')
        .update({
          integrations: newIntegrations,
        })
        .eq('uuid', user.uuid);

      setUser({ ...user, integrations: newIntegrations });
      updateConnectionStatus('instagram', 'disconnected');
      toast.success('Instagram disconnected successfully');
    } catch (error) {
      console.error('Failed to disconnect Instagram:', error);
      updateConnectionStatus('instagram', 'error');
      toast.error('Failed to disconnect Instagram');
    } finally {
      setDisconnecting(false);
      setProcessingState('instagram', false);
      updateConnectionPercentage();
    }
  };

  // Instagram connection handlers (from snippet 2)
  // const handleConnectInstagramDirect = () => {
  //   setProcessingState('instagram', true);
  //   updateConnectionStatus('instagram', 'connecting');

  //   const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;
  //   const appId = 2818780814969488; // Using the provided App ID
  //   const loginUri = new URL(
  //     `https://www.instagram.com/oauth/authorize`,
  //     location.href
  //   );
  //   loginUri.searchParams.set('force_reauth', 'true');
  //   loginUri.searchParams.set('client_id', appId);
  //   loginUri.searchParams.set('redirect_uri', redirectUri);
  //   loginUri.searchParams.set('response_type', 'code');
  //   loginUri.searchParams.set(
  //     'scope',
  //     'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights'
  //   );
  //   window.open(loginUri.toString());
  // };

  // const handleDisconnectInstagramDirect = async () => {
  //   setProcessingState('instagram', true);
  //   updateConnectionStatus('instagram', 'disconnecting');
  //   setInstagramDisconnecting(true);

  //   try {
  //     const newIntegrations = { ...(user.integrations || {}) };
  //     delete newIntegrations.instagram;

  //     await supabase
  //       .from('user_data')
  //       .update({
  //         integrations: newIntegrations,
  //       })
  //       .eq('uuid', user.uuid);

  //     setUser({ ...user, integrations: newIntegrations });
  //     updateConnectionStatus('instagram', 'disconnected');
  //     toast.success('Instagram disconnected successfully');
  //   } catch (error) {
  //     console.error('Failed to disconnect Instagram:', error);
  //     updateConnectionStatus('instagram', 'error');
  //     toast.error('Failed to disconnect Instagram');
  //   } finally {
  //     setInstagramDisconnecting(false);
  //     setProcessingState('instagram', false);
  //     updateConnectionPercentage();
  //   }
  // };

  // Function to handle connect/disconnect action
 
 
 
  const handleConnectionAction = async (platform) => {
    const connection = connections[platform];

    if (connection.status === 'connected') {
      // Prevent disconnection for Gmail if required
      if (!connection.canDisconnect) {
        toast.info(
          `${connection.label} cannot be disconnected as it's required for core functionality.`
        );
        return;
      }

      // Handle disconnection logic
      if (platform === 'gmail') {
        await handleGmailDisconnect({
          user,
          updateConnectionStatus,
          setProcessingState,
          updateLocalStateAndCookies: updateUserData,
          updateConnectionPercentage,
        });
      } else if (platform === 'youtube') {
        await handleYoutubeDisconnect({
          user,
          updateConnectionStatus,
          setProcessingState,
          updateLocalStateAndCookies: updateUserData,
          updateConnectionPercentage,
        });
      } else if (platform === 'instagram') {
        await handleDisconnectFacebook();
      }
    } else {
      // Handle connection logic
      if (platform === 'gmail') {
        await handleGmailConnection({
          updateConnectionStatus,
          setProcessingState,
          user, // Pass user to verify email
        });
      } else if (platform === 'youtube') {
        await handleYoutubeConnection({
          updateConnectionStatus,
          setProcessingState,
        });
      } else if (platform === 'instagram') {
        await handleConnectFacebook();
      }
    }
  };

  const renderPaymentGateways = () => {
    if (paymentGatewaysLoading) {
      return (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (paymentGateways.length === 0) {
      return (
        <div className="py-10 text-center">
          <p className="text-muted-foreground mb-4">
            You havent set up any payment gateways yet.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Gateway
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6">
        {paymentGateways.map((gateway) => (
          <Card key={gateway.id} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl">
                  {gateway.gateway_name}
                  <Badge
                    className="ml-2"
                    variant={gateway.is_active ? 'default' : 'outline'}
                  >
                    {gateway.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </CardTitle>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={gateway.is_active}
                  onCheckedChange={(checked) =>
                    toggleGatewayStatus(gateway.id, checked)
                  }
                  aria-label="Toggle gateway status"
                />
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">API Key</Label>
                  <div className="mt-1 flex items-center">
                    <div className="relative w-full">
                      <Input
                        type={
                          showKeys[`${gateway.id}_apiKey`] ? 'text' : 'password'
                        }
                        value={gateway.api_key}
                        readOnly
                        className="pr-10 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() =>
                          toggleKeyVisibility(gateway.id, 'apiKey')
                        }
                      >
                        {showKeys[`${gateway.id}_apiKey`] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Salt Value</Label>
                  <div className="mt-1 flex items-center">
                    <div className="relative w-full">
                      <Input
                        type={
                          showKeys[`${gateway.id}_saltValue`]
                            ? 'text'
                            : 'password'
                        }
                        value={gateway.salt_value}
                        readOnly
                        className="pr-10 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() =>
                          toggleKeyVisibility(gateway.id, 'saltValue')
                        }
                      >
                        {showKeys[`${gateway.id}_saltValue`] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-muted/50 border-t pt-2">
              <div className="flex w-full justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => prepareEdit(gateway)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => prepareDelete(gateway)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <div className="rounded-xl bg-bento-violet p-3">
            <Plug className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Integrations
            </h1>
            <p className="text-gray-600">
              Connect your accounts and payment providers to enhance your
              Pocketlink experience.{' '}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border bg-white p-6">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold"></h1>
          <p className="text-gray-600"></p>
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="mb-6 grid grid-cols-2">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            {/* Integrations List */}
            <div className="space-y-4">
              {Object.entries(connections).map(([key, connection]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2 rounded-lg border bg-white p-4 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      {connection.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium">{connection.label}</h3>
                      <span
                        className={`text-xs ${
                          connection.status === 'connected'
                            ? 'text-green-600'
                            : connection.status === 'disconnected'
                              ? 'text-red-600'
                              : connection.status === 'error'
                                ? 'text-orange-600'
                                : 'text-gray-600'
                        }`}
                      >
                        {connection.status === 'connected' && 'Connected'}
                        {connection.status === 'disconnected' &&
                          'Not Connected'}
                        {connection.status === 'connecting' && 'Connecting...'}
                        {connection.status === 'disconnecting' &&
                          'Disconnecting...'}
                        {connection.status === 'checking' && 'Checking...'}
                        {connection.status === 'error' && 'Connection Error'}
                      </span>
                      {!connection.canDisconnect &&
                        connection.status === 'connected' && (
                          <span className="ml-1 text-xs text-gray-500">
                            (Required)
                          </span>
                        )}
                      {key === 'gmail' &&
                        connection.status === 'connected' &&
                        user?.integrations?.gmail?.email && (
                          <div className="ml-1 truncate text-xs text-gray-500 lg:overflow-visible lg:whitespace-normal">
                            ({user.integrations.gmail.email})
                          </div>
                        )}
                      {key === 'youtube' &&
                        connection.status === 'connected' &&
                        user?.integrations?.youtube?.channel_id && (
                          <div className="ml-1 truncate text-xs text-gray-500 lg:overflow-visible lg:whitespace-normal">
                            (Channel: {user.integrations?.youtube.channel_id})
                          </div>
                        )}
                      {key === 'instagram' &&
                        connection.status === 'connected' &&
                        user?.integrations?.instagram?.username && (
                          <div className="ml-1 truncate text-xs text-gray-500 lg:overflow-visible lg:whitespace-normal">
                            (@{user.integrations.instagram.username})
                          </div>
                        )}
                      {key === 'instagram' && (
                        <div className="mt-2 rounded-md bg-blue-50 p-2 text-xs text-blue-700">
                          <div className="flex items-center gap-1">
                            <FaFacebook className="text-blue-600" size={12} />
                            <span className="font-medium">Note:</span>
                          </div>
                          <p className="mt-1">
                            Facebook connection is required for Instagram to
                            access deeper user insights and advanced analytics.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleConnectionAction(key)}
                    disabled={
                      ['checking', 'connecting', 'disconnecting'].includes(
                        connection.status
                      ) ||
                      (connection.status === 'connected' &&
                        !connection.canDisconnect) ||
                      processingStates[key]
                    }
                    variant={
                      connection.status === 'connected' ? 'outline' : 'default'
                    }
                    className={`min-w-[120px] ${
                      connection.status === 'connected'
                        ? 'border-red-200 bg-red-50 text-red-700'
                        : 'bg-gradient-to-r from-bento-violetLight to-bento-violet text-white'
                    }`}
                  >
                    {/* Show spinner for any processing state */}
                    {(connection.status === 'checking' ||
                      connection.status === 'connecting' ||
                      connection.status === 'disconnecting' ||
                      processingStates[key]) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    {/* Button text - only show one status at a time */}
                    {processingStates[key] ? (
                      'Processing...'
                    ) : (
                      <>
                        {connection.status === 'connected' &&
                          (connection.canDisconnect
                            ? 'Disconnect'
                            : 'Connected')}
                        {connection.status === 'disconnected' && 'Connect'}
                        {connection.status === 'connecting' && 'Connecting...'}
                        {connection.status === 'disconnecting' &&
                          'Disconnecting...'}
                        {connection.status === 'checking' && 'Checking...'}
                        {connection.status === 'error' && 'Retry'}
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payment">
            <PaymentGatewaysTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Payment Gateway Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Payment Gateway</DialogTitle>
            <DialogDescription>
              Enter your payment gateway credentials below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gateway-type" className="text-right">
                  Gateway
                </Label>
                <Select defaultValue="EaseBuzz" disabled>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a payment gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Gateways</SelectLabel>
                      <SelectItem value="EaseBuzz">EaseBuzz</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="api_key" className="text-right">
                  API Key
                </Label>
                <Input
                  id="api_key"
                  name="api_key"
                  className="col-span-3"
                  value={formData.api_key}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salt_value" className="text-right">
                  Salt Value
                </Label>
                <Input
                  id="salt_value"
                  name="salt_value"
                  className="col-span-3"
                  value={formData.salt_value}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="is_active" className="text-right">
                  Active
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="is_active">
                    {formData.is_active ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Gateway Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Payment Gateway</DialogTitle>
            <DialogDescription>
              Update your payment gateway credentials.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gateway-type" className="text-right">
                  Gateway
                </Label>
                <Select defaultValue={formData.gateway_name} disabled>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a payment gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Gateways</SelectLabel>
                      <SelectItem value="EaseBuzz">EaseBuzz</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_api_key" className="text-right">
                  API Key
                </Label>
                <Input
                  id="edit_api_key"
                  name="api_key"
                  className="col-span-3"
                  value={formData.api_key}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_salt_value" className="text-right">
                  Salt Value
                </Label>
                <Input
                  id="edit_salt_value"
                  name="salt_value"
                  className="col-span-3"
                  value={formData.salt_value}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_is_active" className="text-right">
                  Active
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="edit_is_active"
                    checked={formData.is_active}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="edit_is_active">
                    {formData.is_active ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsEditDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Payment Gateway</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payment gateway? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedGateway && (
              <p className="font-medium">
                Gateway: {selectedGateway.gateway_name}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
