'use client';

import React, { useState } from 'react';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import { useAuth } from '@/app/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2, PlusCircle, Trash2, Eye, EyeOff, Edit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function PaymentGatewayPage() {
  const { user } = useAuth();
  const {
    paymentGateways,
    loading,
    addPaymentGateway,
    editPaymentGateway,
    removePaymentGateway,
    toggleGatewayStatus,
  } = usePaymentGateway();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [formData, setFormData] = useState({
    gateway_name: 'EaseBuzz', // Default to EaseBuzz since it's currently the only option
    api_key: '',
    salt_value: '',
    is_active: true,
  });
  const [showKeys, setShowKeys] = useState({});

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

  const toggleKeyVisibility = (id) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderPaymentGateways = () => {
    if (loading) {
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
            You haven&#39;t set up any payment gateways yet.
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
                        type={showKeys[gateway.id] ? 'text' : 'password'}
                        value={gateway.api_key}
                        readOnly
                        className="pr-10 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => toggleKeyVisibility(gateway.id)}
                      >
                        {showKeys[gateway.id] ? (
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
                        type={showKeys[gateway.id] ? 'text' : 'password'}
                        value={gateway.salt_value}
                        readOnly
                        className="pr-10 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => toggleKeyVisibility(gateway.id)}
                      >
                        {showKeys[gateway.id] ? (
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
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Gateways</h1>
          <p className="text-muted-foreground mt-1">
            Manage your payment gateway integrations
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Gateway
        </Button>
      </div>

      <Separator className="my-6" />

      {renderPaymentGateways()}

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
