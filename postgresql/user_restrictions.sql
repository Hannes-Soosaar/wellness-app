CREATE TABLE IF NOT EXISTS user_restrictions (
    id SERIAL PRIMARY KEY,
    user_id  UUID NOT NULL,
    type_id INT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES restriction_types(id) ON DELETE CASCADE
)