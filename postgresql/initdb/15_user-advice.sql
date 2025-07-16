CREATE TABLE IF NOT EXISTS user_advice(
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    advice_markdown TEXT NOT NULL,
    advice_metadata JSONB,
    advice_category_id INT NOT NULL,
    user_input TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (advice_category_id) REFERENCES advice_categories(id) ON DELETE CASCADE
);