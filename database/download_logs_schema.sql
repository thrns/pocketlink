-- Download logs table for tracking file downloads
-- This table should be created in your Supabase database

CREATE TABLE IF NOT EXISTS download_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    file_path TEXT NOT NULL,
    order_id TEXT,
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_download_logs_product_id ON download_logs(product_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_email ON download_logs(customer_email);
CREATE INDEX IF NOT EXISTS idx_download_logs_order_id ON download_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_downloaded_at ON download_logs(downloaded_at);
CREATE INDEX IF NOT EXISTS idx_download_logs_ip_address ON download_logs(ip_address);

-- Partial index for bot detection (more efficient for bot queries)
CREATE INDEX IF NOT EXISTS idx_download_logs_user_agent_bots ON download_logs(user_agent) 
WHERE user_agent ILIKE '%bot%' OR user_agent ILIKE '%crawler%' OR user_agent ILIKE '%spider%';

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to insert/select (for API usage)
CREATE POLICY "Allow service role access" ON download_logs
    FOR ALL USING (auth.role() = 'service_role');

-- Policy to allow users to view their own download history (if needed)
CREATE POLICY "Users can view own downloads" ON download_logs
    FOR SELECT USING (customer_email = auth.jwt() ->> 'email');