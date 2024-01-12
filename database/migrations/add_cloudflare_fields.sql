-- Migration: Add Cloudflare integration fields to user_data table
-- This migration adds fields needed for Cloudflare for SaaS custom domain management

-- Add new columns for Cloudflare integration
ALTER TABLE user_data 
ADD COLUMN IF NOT EXISTS cloudflare_hostname_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS cloudflare_ssl_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS cloudflare_verification_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS cloudflare_created_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS cloudflare_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS dns_records JSONB,
ADD COLUMN IF NOT EXISTS ssl_certificate_authority VARCHAR(100),
ADD COLUMN IF NOT EXISTS domain_verification_errors JSONB,
ADD COLUMN IF NOT EXISTS ownership_verification JSONB,
ADD COLUMN IF NOT EXISTS ownership_verification_http JSONB;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_data_cloudflare_hostname_id ON user_data(cloudflare_hostname_id);
CREATE INDEX IF NOT EXISTS idx_user_data_cloudflare_ssl_status ON user_data(cloudflare_ssl_status);
CREATE INDEX IF NOT EXISTS idx_user_data_custom_domain_linked ON user_data(customDomainLinked);

-- Add comments for documentation
COMMENT ON COLUMN user_data.cloudflare_hostname_id IS 'Cloudflare custom hostname ID for the domain';
COMMENT ON COLUMN user_data.cloudflare_ssl_status IS 'SSL certificate status from Cloudflare (pending, active, error)';
COMMENT ON COLUMN user_data.cloudflare_verification_status IS 'Domain verification status (pending, active, error)';
COMMENT ON COLUMN user_data.cloudflare_created_at IS 'Timestamp when the custom hostname was created in Cloudflare';
COMMENT ON COLUMN user_data.cloudflare_updated_at IS 'Timestamp when the Cloudflare data was last updated';
COMMENT ON COLUMN user_data.dns_records IS 'JSON object containing DNS records needed for domain verification';
COMMENT ON COLUMN user_data.ssl_certificate_authority IS 'Certificate authority used for SSL certificate';
COMMENT ON COLUMN user_data.domain_verification_errors IS 'JSON array of any domain verification errors from Cloudflare';
COMMENT ON COLUMN user_data.ownership_verification IS 'JSON object containing ownership verification details from Cloudflare';
COMMENT ON COLUMN user_data.ownership_verification_http IS 'JSON object containing HTTP ownership verification details from Cloudflare';

-- Update existing records to have default values
UPDATE user_data 
SET 
  cloudflare_ssl_status = 'pending',
  cloudflare_verification_status = 'pending',
  cloudflare_updated_at = CURRENT_TIMESTAMP
WHERE customDomain IS NOT NULL AND customDomain != '';

-- Create a trigger to automatically update cloudflare_updated_at
CREATE OR REPLACE FUNCTION update_cloudflare_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.cloudflare_updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cloudflare_updated_at
  BEFORE UPDATE ON user_data
  FOR EACH ROW
  WHEN (OLD.cloudflare_hostname_id IS DISTINCT FROM NEW.cloudflare_hostname_id OR
        OLD.cloudflare_ssl_status IS DISTINCT FROM NEW.cloudflare_ssl_status OR
        OLD.cloudflare_verification_status IS DISTINCT FROM NEW.cloudflare_verification_status)
  EXECUTE FUNCTION update_cloudflare_updated_at();

-- Add constraint to ensure valid SSL status values
ALTER TABLE user_data 
ADD CONSTRAINT check_cloudflare_ssl_status 
CHECK (cloudflare_ssl_status IN ('pending', 'initializing', 'pending_validation', 'active', 'error'));

-- Add constraint to ensure valid verification status values
ALTER TABLE user_data 
ADD CONSTRAINT check_cloudflare_verification_status 
CHECK (cloudflare_verification_status IN ('pending', 'active', 'error', 'blocked'));

-- Create a view for easier querying of custom domain status
CREATE OR REPLACE VIEW custom_domain_status AS
SELECT 
  id,
  email,
  customDomain,
  customDomainLinked,
  usingCustomDomain,
  cloudflare_hostname_id,
  cloudflare_ssl_status,
  cloudflare_verification_status,
  cloudflare_created_at,
  cloudflare_updated_at,
  dns_records,
  ssl_certificate_authority,
  domain_verification_errors,
  CASE 
    WHEN cloudflare_ssl_status = 'active' AND cloudflare_verification_status = 'active' THEN 'fully_active'
    WHEN cloudflare_ssl_status = 'error' OR cloudflare_verification_status = 'error' THEN 'error'
    ELSE 'pending'
  END as overall_status
FROM user_data
WHERE customDomain IS NOT NULL AND customDomain != '';

COMMENT ON VIEW custom_domain_status IS 'View showing the status of all custom domains with Cloudflare integration';