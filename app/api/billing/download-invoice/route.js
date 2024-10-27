import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { dodoPaymentsService } from '@/lib/dodo-payments-utils';

export async function POST(req) {
  try {
    const { invoiceId, paymentId } = await req.json();

    const supabase = await createSupabaseClient();

    // Get user from Supabase auth
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

    // Validate input
    if (!invoiceId && !paymentId) {
      return NextResponse.json(
        { error: 'Invoice ID or Payment ID is required' },
        { status: 400 }
      );
    }

    // Get user's billing info to verify ownership
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('username, email')
      .eq('email', user.email)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User data not found' },
        { status: 404 }
      );
    }

    // Verify user owns this invoice/payment
    const { data: billingData, error: billingError } = await supabase
      .from('billing_details')
      .select('*')
      .eq('username', userData.username)
      .or(
        `payment_id.eq.${invoiceId || paymentId},subscription_id.eq.${invoiceId || paymentId}`
      )
      .single();

    if (billingError || !billingData) {
      return NextResponse.json(
        { error: 'Invoice not found or access denied' },
        { status: 404 }
      );
    }

    // Get the payment ID from billing_details table
    let dodoPaymentId = paymentId || billingData.payment_id;

    if (!dodoPaymentId) {
      return NextResponse.json(
        { error: 'Payment ID not found for this invoice' },
        { status: 400 }
      );
    }

    // Download invoice from Dodo Payments
    try {
      const invoicePdf =
        await dodoPaymentsService.downloadInvoice(dodoPaymentId);

      // Convert blob to array buffer
      const arrayBuffer = await invoicePdf.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Return PDF file
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="invoice-${invoiceId || dodoPaymentId}.pdf"`,
          'Content-Length': buffer.length.toString(),
        },
      });
    } catch (dodoError) {
      console.error('Error downloading invoice from Dodo Payments:', dodoError);
      return NextResponse.json(
        {
          error:
            'Failed to download invoice. Please try again or contact support.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing invoice download:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
