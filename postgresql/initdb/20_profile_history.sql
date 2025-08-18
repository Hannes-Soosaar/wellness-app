CREATE TABLE IF NOT EXISTS profile_history (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    body_fat_percentage NUMERIC DEFAULT NULL,
    wellness_score NUMERIC DEFAULT NULL,
    neck_circumference NUMERIC DEFAULT NULL,
    waist_circumference NUMERIC DEFAULT NULL,
    hip_circumference NUMERIC DEFAULT NULL,
    max_pushups NUMERIC DEFAULT NULL,
    max_walking_time NUMERIC DEFAULT NULL,
    weight NUMERIC DEFAULT NULL,
    calories_required NUMERIC DEFAULT NULL,
    BMI NUMERIC DEFAULT NULL,
    date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);