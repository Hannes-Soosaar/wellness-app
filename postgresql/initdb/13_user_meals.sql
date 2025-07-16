CREATE TABLE IF NOT EXISTS user_meals (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    meal_id INT NOT NULL,
    calories NUMERIC NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    consumed_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (meal_id) REFERENCES meals(id) 
);