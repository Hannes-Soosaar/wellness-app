CREATE TABLE IF NOT EXISTS user_meals {
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL
    meal_id TEXT NOT NULL,
    calories NUMERIC NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    consumed_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    FOREIGN KEY (meal_id) REFERENCES meals(id) 
}