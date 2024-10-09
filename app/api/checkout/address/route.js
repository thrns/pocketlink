import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// For checkout visitors, we need service role to bypass RLS
// since they're not authenticated via Supabase auth
function createServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * GET - Fetch user's checkout addresses by email
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createServiceSupabase();

    // Fetch user addresses for checkout
    const { data: addresses, error: addressError } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_email', email)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (addressError) {
      console.error('Error fetching checkout addresses:', addressError);
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
    console.error('Checkout address GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create or update checkout address for visitor
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { addressData, email, setAsDefault = false } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (
      !addressData ||
      !addressData.name ||
      !addressData.line1 ||
      !addressData.city
    ) {
      return NextResponse.json(
        { error: 'Required address fields missing (name, line1, city)' },
        { status: 400 }
      );
    }

    const supabase = createServiceSupabase();

    // Check if this address already exists (to avoid duplicates)
    const { data: existingAddresses, error: checkError } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_email', email)
      .eq('line1', addressData.line1)
      .eq('city', addressData.city)
      .eq('postal_code', addressData.postal_code || '')
      .eq('country', addressData.country || 'US');

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
          .from('user_addresses')
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
          console.error('Error updating checkout address:', updateError);
          return NextResponse.json(
            { error: 'Failed to update address' },
            { status: 500 }
          );
        }

        // If setting as default, unset other defaults
        if (setAsDefault) {
          await supabase
            .from('user_addresses')
            .update({ is_default: false })
            .eq('user_email', email)
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
      user_email: email,
      name: addressData.name,
      line1: addressData.line1,
      line2: addressData.line2 || null,
      city: addressData.city,
      state: addressData.state || null,
      postal_code: addressData.postal_code || '',
      country: addressData.country || 'US',
      phone: addressData.phone || null,
      is_default: setAsDefault,
      created_at: new Date().toISOString(),
    };

    // If setting as default, unset other defaults first
    if (setAsDefault) {
      await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_email', email);
    }

    // Insert new address
    const { data: createdAddress, error: createError } = await supabase
      .from('user_addresses')
      .insert(newAddress)
      .select()
      .single();

    if (createError) {
      console.error('Error creating checkout address:', createError);
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
    console.error('Checkout address POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete a checkout address
 */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get('id');
    const email = searchParams.get('email');

    if (!addressId || !email) {
      return NextResponse.json(
        { error: 'Address ID and email are required' },
        { status: 400 }
      );
    }

    const supabase = createServiceSupabase();

    // Verify the address belongs to this email
    const { data: address, error: fetchError } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('id', addressId)
      .eq('user_email', email)
      .single();

    if (fetchError || !address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // Delete the address
    const { error: deleteError } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', addressId);

    if (deleteError) {
      console.error('Error deleting checkout address:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete address' },
        { status: 500 }
      );
    }

    // If this was the default address, set another one as default
    if (address.is_default) {
      const { data: remainingAddresses } = await supabase
        .from('user_addresses')
        .select('id')
        .eq('user_email', email)
        .limit(1);

      if (remainingAddresses && remainingAddresses.length > 0) {
        await supabase
          .from('user_addresses')
          .update({ is_default: true })
          .eq('id', remainingAddresses[0].id);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    console.error('Checkout address DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
