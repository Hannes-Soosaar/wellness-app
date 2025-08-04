CREATE TABLE IF NOT EXISTS user_settings(
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret TEXT DEFAULT gen_random_uuid()::TEXT, -- auto-generated UUID for MFA
    account_status TEXT DEFAULT 'active',
    account_deleted_at TIMESTAMP WITH TIME ZONE,
    account_suspended_at TIMESTAMP WITH TIME ZONE,
    notification_active BOOLEAN DEFAULT FALSE ,
    email_notifications BOOLEAN DEFAULT FALSE ,
    privacy_accepted BOOLEAN DEFAULT FALSE,
    cookies_allowed BOOLEAN DEFAULT TRUE,  
    ai_enabled BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);