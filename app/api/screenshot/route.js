import { NextResponse } from 'next/server';
import ogs from 'open-graph-scraper';
import { uploadScreenshot } from '@/lib/helpers/supabaseScreenshotUpload';

export async function POST(request) {
  try {
    // 1️⃣ Parse JSON body
    const { url, username, purpose } = await request.json();

    if (!url || !username || !purpose) {
      return NextResponse.json(
        { error: 'Missing url, username, or purpose' },
        { status: 400 }
      );
    }

    // 2️⃣ Use open-graph-scraper to fetch metadata

    const options = {
      url: url,
      timeout: 10000,
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    };

    const { result } = await ogs(options);

    if (!result.ogImage || result.ogImage.length === 0) {
      return NextResponse.json(
        { error: 'No Open Graph image found on the specified URL' },
        { status: 404 }
      );
    }

    const ogImageUrl = result.ogImage[0].url;

    // 5️⃣ Return the original image URL and additional metadata
    return NextResponse.json(
      {
        imageUrl: ogImageUrl,
        metadata: {
          title: result.ogTitle || null,
          description: result.ogDescription || null,
          siteName: result.ogSiteName || null,
          url: result.ogUrl || url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during metadata extraction:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to extract metadata' },
      { status: 500 }
    );
  }
}
