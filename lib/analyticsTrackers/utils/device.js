'use client';

export function getDeviceInfo() {
  if (typeof window === 'undefined') return { type: 'unknown', userAgent: '' };
  const ua = navigator.userAgent || '';
  const width = window.innerWidth;
  const type = width <= 768 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop';
  return {
    type,
    userAgent: ua,
    viewport: { width, height: window.innerHeight },
  };
}

export function getTenantFromHost() {
  if (typeof window === 'undefined') return null;
  const host = window.location.hostname;
  // localhost: atheeb.localhost
  if (host.endsWith('.localhost') || host.includes('localhost')) {
    const parts = host.split('.');
    return parts[0];
  }
  // pocketlink.co subdomain
  const parts = host.split('.');
  if (parts.length >= 3) return parts[0];
  return null;
}

export function isTenantHost(tenant) {
  const current = getTenantFromHost();
  return current ? current === tenant : true;
}
