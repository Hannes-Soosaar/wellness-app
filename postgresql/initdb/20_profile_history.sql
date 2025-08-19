CREATE TABLE IF NOT EXISTS profile_history (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    body_fat_percentage NUMERIC DEFAULT 0,
    wellness_score NUMERIC DEFAULT 0,
    neck_circumference NUMERIC DEFAULT 0,
    waist_circumference NUMERIC DEFAULT 0,
    hip_circumference NUMERIC DEFAULT 0,
    max_pushups NUMERIC DEFAULT 0,
    max_walking_time NUMERIC DEFAULT 0,
    weight NUMERIC DEFAULT 0,
    calories_required NUMERIC DEFAULT 0,
    BMI NUMERIC DEFAULT 0,
    date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    note TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_date UNIQUE (user_id, date)
);