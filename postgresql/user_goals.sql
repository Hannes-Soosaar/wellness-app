CREATE TABLE IF NOT EXISTS user_goals (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    goal_type TEXT NOT NULL,  -- e.g., 'weight_loss', 'muscle_gain', 'maintenance'
    target_weight INT NOT NULL,
    fat_percentage_target INT NOT NULL,
    target_weekly_weight_loss INT NOT NULL,
    target_weekly_calories INT NOT NULL,
    target_daily_calories INT NOT NULL,
    target_BMI INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
); 