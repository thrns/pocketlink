import { createSupabaseClient } from '@/Clients/supabase/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { tenantUsername } = body;

    console.log('Checking bot availability for tenant:', tenantUsername);

    if (!tenantUsername) {
      return new Response(
        JSON.stringify({ error: 'Tenant username is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = await createSupabaseClient();

    // Fetch sales bot data from Supabase
    const { data: salesBotData, error: salesBotError } = await supabase
      .from('sales_bot_data')
      .select('*')
      .eq('username', tenantUsername)
      .single();

    if (salesBotError && salesBotError.code !== 'PGRST116') {
      console.error('Error fetching sales bot data:', salesBotError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch sales bot configuration.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if sales bot is available and active
    const isAvailable = salesBotData && salesBotData.is_active;

    return new Response(
      JSON.stringify({
        available: isAvailable,
        avatarUrl: isAvailable ? salesBotData.avatar_url : null,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Error checking sales bot availability:', error);
    return new Response(
      JSON.stringify({
        available: false,
        error: 'Failed to check sales bot availability.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
