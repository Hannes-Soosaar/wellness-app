
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_id TEXT UNIQUE,
    github_id TEXT UNIQUE,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret TEXT,
    failed_attempts INT DEFAULT 0,
    locked_until TIMESTAMPTZ,
    user_name BYTEA,
    email BYTEA NOT NULL, -- encrypt
    password TEXT ,             
    verification_token TEXT,
    verification_token_expires TIMESTAMPTZ,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMPTZ,
    refresh_token TEXT,
    refresh_token_created TEXT,
    password_reset_token TEXT,
    role TEXT DEFAULT 'user', 
    status TEXT DEFAULT 'active', 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
