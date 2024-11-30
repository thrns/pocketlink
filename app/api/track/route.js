// Deprecated legacy Firebase endpoint. Keeping a small stub to avoid breaking old clients.
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      message: 'This endpoint is deprecated. Use Supabase analytics endpoints.',
    },
    { status: 410 }
  );
}
