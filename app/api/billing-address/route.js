import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { validateAddress } from '@/constants/countries';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET - Fetch user's billing addresses
 */
export async function GET(req) {
  try {
    const supabase = await createSupabaseClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user data to find email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('email')
      .eq('email', user.email)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch user billing addresses
    const { data: addresses, error: addressError } = await supabase
      .from('billing_addresses')
      .select('*')
      .eq('user_email', user.email)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (addressError) {
      console.error('Error fetching addresses:', addressError);
      return NextResponse.json(
        { error: 'Failed to fetch addresses' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      addresses: addresses || [],
    });
  } catch (error) {
    console.error('Billing address GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create or update billing address
 */
export async function POST(req) {
  try {
    const supabase = await createSupabaseClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { addressData, setAsDefault = false } = body;

    // Validate the address data
    const validation = validateAddress(addressData);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Invalid address data',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Get user data
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('email')
      .eq('email', user.email)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if this address already exists (to avoid duplicates)
    const { data: existingAddresses, error: checkError } = await supabase
      .from('billing_addresses')
      .select('*')
      .eq('user_email', user.email)
      .eq('line1', addressData.line1)
      .eq('city', addressData.city)
      .eq('postal_code', addressData.postal_code)
      .eq('country', addressData.country);

    if (checkError) {
      console.error('Error checking existing addresses:', checkError);
    }

    // If address exists, update it
    if (!checkError && existingAddresses && existingAddresses.length > 0) {
      const existingAddress = existingAddresses.find(
        (addr) => (addr.line2 || null) === (addressData.line2 || null)
      );

      if (existingAddress) {
        // Update existing address
        const { data: updatedAddress, error: updateError } = await supabase
          .from('billing_addresses')
          .update({
            name: addressData.name,
            phone: addressData.phone || null,
            is_default: setAsDefault,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingAddress.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating address:', updateError);
          return NextResponse.json(
            { error: 'Failed to update address' },
            { status: 500 }
          );
        }

        // If setting as default, unset other defaults
        if (setAsDefault) {
          await supabase
            .from('billing_addresses')
            .update({ is_default: false })
            .eq('user_email', user.email)
            .neq('id', existingAddress.id);
        }

        return NextResponse.json({
          success: true,
          address: updatedAddress,
          message: 'Address updated successfully',
        });
      }
    }

    // Create new address
    const newAddress = {
      id: uuidv4(),
      user_email: user.email,
      name: addressData.name,
      line1: addressData.line1,
      line2: addressData.line2 || null,
      city: addressData.city,
      state: addressData.state || null,
      postal_code: addressData.postal_code,
      country: addressData.country,
      phone: addressData.phone || null,
      is_default: setAsDefault,
      created_at: new Date().toISOString(),
    };

    // If setting as default, unset other defaults first
    if (setAsDefault) {
      await supabase
        .from('billing_addresses')
        .update({ is_default: false })
        .eq('user_email', user.email);
    }

    // Insert new address
    const { data: createdAddress, error: createError } = await supabase
      .from('billing_addresses')
      .insert(newAddress)
      .select()
      .single();

    if (createError) {
      console.error('Error creating address:', createError);
      return NextResponse.json(
        { error: 'Failed to create address' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      address: createdAddress,
      message: 'Address created successfully',
    });
  } catch (error) {
    console.error('Billing address POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete a billing address
 */
export async function DELETE(req) {
  try {
    const supabase = await createSupabaseClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get('id');

    if (!addressId) {
      return NextResponse.json(
        { error: 'Address ID is required' },
        { status: 400 }
      );
    }

    // Verify the address belongs to this user
    const { data: address, error: fetchError } = await supabase
      .from('billing_addresses')
      .select('*')
      .eq('id', addressId)
      .eq('user_email', user.email)
      .single();

    if (fetchError || !address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // Delete the address
    const { error: deleteError } = await supabase
      .from('billing_addresses')
      .delete()
      .eq('id', addressId);

    if (deleteError) {
      console.error('Error deleting address:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete address' },
        { status: 500 }
      );
    }

    // If this was the default address, set another one as default
    if (address.is_default) {
      const { data: remainingAddresses } = await supabase
        .from('billing_addresses')
        .select('id')
        .eq('user_email', user.email)
        .limit(1);

      if (remainingAddresses && remainingAddresses.length > 0) {
        await supabase
          .from('billing_addresses')
          .update({ is_default: true })
          .eq('id', remainingAddresses[0].id);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    console.error('Billing address DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
