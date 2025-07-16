CREATE TABLE IF NOT EXISTS user_restrictions (
    id TEXT primary key,
    user_id  TEXT NOT NULL,
    type_id TEXT NOT NULL,
    note TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    FOREIGN KEY (type_id) REFERENCES restriction_types(id) ON DELETE CASCADE
)