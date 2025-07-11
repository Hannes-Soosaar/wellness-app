CREATE TABLE IF NOT EXISTS user_meals (
    id SERIAL PRIMARY KEY,
    calories_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    type_id TEXT NOT NULL,
    calories INT NOT NULL,
    date DATE NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);