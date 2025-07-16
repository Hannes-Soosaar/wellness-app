CREATE TABLE IF NOT EXISTS user_settings{
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    2fa_enabled BOOLEAN DEFAULT FALSE,
    2fa_secret TEXT,
    account_status TEXT DEFAULT 'active',
    account_deleted_at TIMESTAMP WITH TIME ZONE,
    account_suspended_at TIMESTAMP WITH TIME ZONE,
    notification_active BOOLEAN DEFAULT FALSE ,
    privacy_accepted BOOLEAN DEFAULT FALSE,
    cookies_allowed BOOLEAN DEFAULT FALSE,  
    ai_enabled BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
}