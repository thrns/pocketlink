import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { dodoPaymentsService } from '@/lib/dodo-payments-utils';

export async function POST(req) {
  console.log('[ValidateDiscount] Starting discount validation...');

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

    // Parse request body
    const body = await req.json();
    const { discountCode, productId } = body;

    if (!discountCode) {
      return NextResponse.json(
        { error: 'Discount code is required' },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    console.log('[ValidateDiscount] Validating discount:', {
      discountCode,
      productId,
      userEmail: user.email,
    });

    // Validate discount using Dodo Payments service
    const validationResult = await dodoPaymentsService.validateDiscount(
      discountCode,
      productId
    );

    console.log('[ValidateDiscount] Validation result:', {
      success: validationResult.success,
      isValid: validationResult.isValid,
      error: validationResult.error,
      discountText: validationResult.discountText,
    });

    return NextResponse.json(validationResult);
  } catch (error) {
    console.error('[ValidateDiscount] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to validate discount code',
        isValid: false,
        reason: 'Server error',
      },
      { status: 500 }
    );
  }
}
