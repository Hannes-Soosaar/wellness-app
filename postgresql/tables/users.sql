
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_id TEXT UNIQUE,
    github_id TEXT UNIQUE,
    2fa_enabled BOOLEAN DEFAULT FALSE,
    failed_attempts INT DEFAULT 0,
    locked_until TIMESTAMP,
    email TEXT UNIQUE NOT NULL,
    password TEXT ,
    verification_token TEXT,
    verification_token_expires TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    refresh_token TEXT,
    refresh_token_created TEXT,
    password_reset_token TEXT,
    password_reset_expires TIMESTAMP,
    role TEXT DEFAULT 'user', 
    status TEXT DEFAULT 'active' 
);
