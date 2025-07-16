CREATE TABLE IF NOT EXISTS user_meals(
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    meal_type_id INT NOT NULL,
    calories INT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (meal_type_id) REFERENCES meals(id) ON DELETE CASCADE
);