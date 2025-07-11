CREATE TABLE IF NOT EXISTS user_settings{
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    is_2fa_enabled BOOLEAN DEFAULT FALSE,
    account_status TEXT DEFAULT 'active', -- e.g., 'active', 'suspended', 'deleted'
    account_deleted_at TIMESTAMP,
    account_suspended_at TIMESTAMP,
    notification_preferences JSONB,
    privacy_settings JSONB,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
}