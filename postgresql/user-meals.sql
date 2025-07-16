CREATE TABLE IF NOT EXISTS user_meals (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    meal_type_id TEXT NOT NULL,
    calories INT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);