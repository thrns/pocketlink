/**
 * Cloudflare for SaaS API Client
 * Handles custom hostname management for custom domains
 */

class CloudflareClient {
  constructor() {
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN;
    this.zoneId = process.env.CLOUDFLARE_ZONE_ID;
    this.baseUrl = 'https://api.cloudflare.com/client/v4';

    console.log('Cloudflare Client Debug:', {
      hasApiToken: !!this.apiToken,
      apiTokenLength: this.apiToken?.length,
      hasZoneId: !!this.zoneId,
      zoneIdLength: this.zoneId?.length,
    });

    if (!this.apiToken || !this.zoneId) {
      throw new Error('Missing Cloudflare API credentials');
    }
  }

  /**
   * Get headers for Cloudflare API requests
   */
  getHeaders() {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Create a custom hostname in Cloudflare
   * @param {string} hostname - The custom domain to add
   * @param {Object} options - Additional options for the hostname
   * @returns {Promise<Object>} - Cloudflare API response
   */
  async createCustomHostname(hostname, options = {}) {
    const url = `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames`;

    const payload = {
      hostname,
      origin_server: 'pocketlink.co', // Set the origin server to handle requests
      ssl: {
        method: 'http',
        type: 'dv',
        settings: {
          http2: 'on',
          min_tls_version: '1.2',
          tls_1_3: 'on',
        },
      },
      ...options,
    };

    try {
      console.log('Creating custom hostname:', {
        url,
        headers: this.getHeaders(),
        payload,
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log('Cloudflare API Response:', {
        status: response.status,
        statusText: response.statusText,
        data,
      });

      if (!response.ok) {
        console.error('Cloudflare API Error Details:', data);
        throw new Error(
          `Cloudflare API error: ${data.errors?.[0]?.message || 'Unknown error'}`
        );
      }

      return data.result;
    } catch (error) {
      console.error('Error creating custom hostname:', error);
      throw error;
    }
  }

  /**
   * Get custom hostname details from Cloudflare
   * @param {string} hostnameId - The Cloudflare custom hostname ID
   * @returns {Promise<Object>} - Hostname details
   */
  async getCustomHostname(hostnameId) {
    const url = `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames/${hostnameId}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Cloudflare API error: ${data.errors?.[0]?.message || 'Unknown error'}`
        );
      }

      return data.result;
    } catch (error) {
      console.error('Error getting custom hostname:', error);
      throw error;
    }
  }

  /**
   * List all custom hostnames for the zone
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} - Array of hostnames
   */
  async listCustomHostnames(filters = {}) {
    const url = new URL(
      `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames`
    );

    // Add query parameters if filters are provided
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined) {
        url.searchParams.append(key, filters[key]);
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Cloudflare API error: ${data.errors?.[0]?.message || 'Unknown error'}`
        );
      }

      return data.result;
    } catch (error) {
      console.error('Error listing custom hostnames:', error);
      throw error;
    }
  }

  /**
   * Delete a custom hostname from Cloudflare
   * @param {string} hostnameId - The Cloudflare custom hostname ID
   * @returns {Promise<boolean>} - Success status
   */
  async deleteCustomHostname(hostnameId) {
    const url = `${this.baseUrl}/zones/${this.zoneId}/custom_hostnames/${hostnameId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Cloudflare API error: ${data.errors?.[0]?.message || 'Unknown error'}`
        );
      }

      return data.success;
    } catch (error) {
      console.error('Error deleting custom hostname:', error);
      throw error;
    }
  }

  /**
   * Get SSL verification details for a custom hostname
   * @param {string} hostnameId - The Cloudflare custom hostname ID
   * @returns {Promise<Object>} - SSL verification details
   */
  async getSSLVerification(hostnameId) {
    const hostname = await this.getCustomHostname(hostnameId);

    return {
      status: hostname.ssl?.status,
      method: hostname.ssl?.method,
      validation_errors: hostname.ssl?.validation_errors,
      validation_records: hostname.ssl?.validation_records,
      certificate_authority: hostname.ssl?.certificate_authority,
    };
  }

  /**
   * Check if a hostname is valid for Cloudflare
   * @param {string} hostname - The hostname to validate
   * @returns {boolean} - Whether the hostname is valid
   */
  isValidHostname(hostname) {
    // Basic hostname validation
    const hostnameRegex =
      /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/;

    if (!hostnameRegex.test(hostname)) {
      return false;
    }

    // Check for reserved domains
    const reservedDomains = ['localhost', 'pocketlink.co'];
    if (reservedDomains.some((domain) => hostname.includes(domain))) {
      return false;
    }

    return true;
  }

  /**
   * Get DNS records needed for domain verification
   * @param {string} hostname - The custom domain
   * @returns {Object} - DNS records to be added
   */
  getDNSRecords(hostname) {
    // Check if this is an apex domain (no subdomain)
    const isApexDomain = hostname.split('.').length === 2;

    const records = {
      cname: {
        type: 'CNAME',
        name: hostname,
        value: 'pocketlink.co',
        ttl: 300,
      },
    };

    // For apex domains, also provide A record option
    if (isApexDomain) {
      records.a = {
        type: 'A',
        name: hostname,
        value: process.env.FALLBACK_ORIGIN_IP || '104.21.14.42', // IP address for pocketlink.co - should match your origin server
        ttl: 300,
      };
    }

    return records;
  }
}

// Export singleton instance
const cloudflareClient = new CloudflareClient();
export default cloudflareClient;

// Export class for testing
export { CloudflareClient };
