// sessionUtils.js - Utility functions for managing user sessions

/**
 * Creates a minimal session object with only essential fields for cookies
 * This prevents HTTP 431 errors caused by large cookie sizes
 */
export function createMinimalSession(userData) {
  if (!userData) return null;

  return {
    uuid: userData.uuid,
    email: userData.email,
    username: userData.username,
    is_premium: userData.is_premium,
    onboarding: userData.onboarding,
    name: userData.name,
    avatarURL: userData.avatarURL,
    // Add any other essential fields that are frequently checked
    people_referred: userData.people_referred || 0,
    loggedin_at: userData.loggedin_at,
  };
}

/**
 * Stores user data using a hybrid approach:
 * - Full user data in localStorage (client-side only)
 * - Minimal session data in cookies (for SSR and auth checks)
 */
export function storeUserData(userData, Cookies) {
  if (!userData) return;

  // Store full user data in localStorage (client-side only)
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // Store minimal session data in cookies
  const minimalSession = createMinimalSession(userData);
  if (minimalSession) {
    Cookies.set('user_session', JSON.stringify(minimalSession), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }
}

/**
 * Server-side version of storeUserData for Next.js API routes
 * Uses Next.js cookies() API instead of js-cookie
 */
export async function storeUserDataServer(userData, cookiesInstance) {
  if (!userData) return;

  // Store minimal session data in cookies
  const minimalSession = createMinimalSession(userData);
  if (minimalSession) {
    cookiesInstance.set('user_session', JSON.stringify(minimalSession), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }
}

/**
 * Retrieves user data using the hybrid approach:
 * - Tries localStorage first (full data)
 * - Falls back to cookies (minimal session data)
 * - Returns null if neither is available
 */
export function getUserData(Cookies) {
  // Try localStorage first (client-side only)
  if (typeof window !== 'undefined') {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      try {
        return JSON.parse(localUser);
      } catch (error) {
        console.error('Error parsing localStorage user data:', error);
        localStorage.removeItem('user');
      }
    }
  }

  // Fall back to new user_session cookie (minimal session data)
  const sessionData = Cookies.get('user_session');
  if (sessionData) {
    try {
      return JSON.parse(sessionData);
    } catch (error) {
      console.error('Error parsing cookie session data:', error);
      Cookies.remove('user_session');
    }
  }

  // Legacy fallback to old cookie names for backward compatibility
  const legacyUserData = Cookies.get('user_data');
  if (legacyUserData) {
    try {
      const userData = JSON.parse(legacyUserData);
      // Migrate to new format
      storeUserData(userData, Cookies);
      // Remove legacy cookie
      Cookies.remove('user_data');
      return userData;
    } catch (error) {
      console.error('Error parsing legacy user_data cookie:', error);
      Cookies.remove('user_data');
    }
  }

  const legacyFallbackData = Cookies.get('fallback_user_data');
  if (legacyFallbackData) {
    try {
      const userData = JSON.parse(legacyFallbackData);
      // Migrate to new format
      storeUserData(userData, Cookies);
      // Remove legacy cookie
      Cookies.remove('fallback_user_data');
      return userData;
    } catch (error) {
      console.error('Error parsing legacy fallback_user_data cookie:', error);
      Cookies.remove('fallback_user_data');
    }
  }

  return null;
}

/**
 * Clears all user data from both localStorage and cookies
 */
export function clearUserData(Cookies) {
  // Clear localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }

  // Clear cookies
  Cookies.remove('user_session');
  Cookies.remove('user_data'); // Legacy cookie
  Cookies.remove('fallback_user_data'); // Legacy cookie
}

/**
 * Updates user data in both localStorage and cookies
 */
export function updateUserData(updatedUserData, Cookies) {
  storeUserData(updatedUserData, Cookies);
}
