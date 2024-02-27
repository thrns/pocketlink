'use client';

let cachedGeo = null;

export async function getGeoOnce() {
  if (cachedGeo) return cachedGeo;
  try {
    // Replace with your existing ipinfo/ipapi call if available
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    const j = await res.json();
    cachedGeo = {
      countryCode: j.country_code,
      country: j.country_name,
      region: j.region,
      city: j.city,
      postal: j.postal,
      timezone: j.timezone,
      isp: j.org,
      asn: j.asn,
      currency: j.currency,
      callingCode: j.country_calling_code,
      coordinates: j.latitude && j.longitude ? [j.latitude, j.longitude] : null,
    };
  } catch (_) {
    cachedGeo = null;
  }
  return cachedGeo;
}
