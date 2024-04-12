import { headers } from 'next/headers';

export async function detectDevice() {
  const requestHeaders = await headers(); // Await the headers function
  const userAgent = requestHeaders.get('user-agent') || ''; // Now userAgent is defined

  const isMobile =
    /iPhone|iPad|iPod|Android|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  return isMobile ? 'mobile' : 'desktop';
}
