'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'sonner';

const TenantSubscribeButton = ({ username, tenantTheme }) => {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch audience data to determine form fields
  useEffect(() => {
    const fetchAudienceStructure = async () => {
      try {
        const { data, error } = await supabase
          .from('audience_data')
          .select('audience')
          .eq('username', username)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching audience structure:', error);
          return;
        }

        if (data && data.audience && data.audience.length > 0) {
          // Extract keys from the first audience member
          const audienceMember = data.audience[0];
          const fields = Object.keys(audienceMember).map((key) => ({
            key,
            required: ['name', 'email', 'phone'].includes(key.toLowerCase()),
          }));

          setFormFields(fields);

          // Initialize form data with empty values
          const initialData = {};
          fields.forEach((field) => {
            initialData[field.key] = '';
          });
          setFormData(initialData);
        } else {
          // Default fields if no audience data exists
          const defaultFields = [
            { key: 'name', required: true },
            { key: 'email', required: true },
          ];
          setFormFields(defaultFields);
          setFormData({ name: '', email: '' });
        }
      } catch (error) {
        console.error('Failed to fetch audience structure:', error);
      }
    };

    if (open) {
      fetchAudienceStructure();
    }
  }, [username, open]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubscribe = async () => {
    // Validate required fields
    const missingFields = formFields
      .filter((field) => field.required && !formData[field.key])
      .map((field) => field.key);

    if (missingFields.length > 0) {
      toast.error('Missing Required Fields', {
        description: `Please fill in the following fields: ${missingFields.join(
          ', '
        )}`,
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
      return;
    }

    setLoading(true);
    try {
      // Check if user already exists in the database
      const { data, error: fetchError } = await supabase
        .from('audience_data')
        .select('*')
        .eq('username', username)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      if (data) {
        // Check if email already exists
        const emailExists = data.audience?.some(
          (entry) => entry.email === formData.email
        );

        if (emailExists) {
          toast.error('Already Subscribed', {
            description: 'This email is already subscribed.',
            style: {
              backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
              color: 'white',
              borderRadius: '8px',
            },
          });
          setLoading(false);
          return;
        }

        // Update audience with new entry
        const updatedAudience = [...(data.audience || []), formData];

        const { error: updateError } = await supabase
          .from('audience_data')
          .update({ audience: updatedAudience })
          .eq('username', username);

        if (updateError) throw updateError;
      } else {
        // User does not exist, insert a new row
        const { error: insertError } = await supabase
          .from('audience_data')
          .insert([{ username, audience: [formData] }]);

        if (insertError) throw insertError;
      }

      toast.success('Subscription Successful', {
        description: 'You have been subscribed successfully!',
        style: {
          backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD)',
          color: 'white',
          borderRadius: '8px',
        },
      });

      setOpen(false);
    } catch (error) {
      console.error('Subscription failed:', error);
      toast.error('Subscription Failed', {
        description: 'Something went wrong. Please try again.',
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            style={
              tenantTheme?.textMode === 'dark'
                ? { color: 'black', backgroundColor: 'white' }
                : { color: 'white', backgroundColor: 'black' }
            }
            variant="ghost"
            className="relative flex items-center gap-2 rounded-full border px-4 py-2"
          >
            <Bell size={16} className="animate-pulse" />
            <p className="text-sm">Subscribe</p>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[95vw] rounded-lg p-6 md:max-w-md">
          <DialogTitle>
            <h2 className="text-lg font-semibold">Subscribe for Updates</h2>
            <p className="text-sm text-gray-500">
              Enter your details to stay updated.
            </p>
          </DialogTitle>

          <div className="mt-4 space-y-4">
            {formFields.map((field) => (
              <div key={field.key} >
                <Label htmlFor={field.key}>
                  {field.key.charAt(0).toUpperCase() + field.key.slice(1)}
                  {field.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </Label>
                <Input
                  id={field.key}
                  type={
                    field.key.toLowerCase() === 'email'
                      ? 'email'
                      : field.key.toLowerCase() === 'phone'
                        ? 'tel'
                        : 'text'
                  }
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={`Enter your ${field.key.toLowerCase()}`}
                  required={field.required}
                />
              </div>
            ))}

            <Button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-gradient-to-r from-bento-violetLight to-bento-violet text-white"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TenantSubscribeButton;
