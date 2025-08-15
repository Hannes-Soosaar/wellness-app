CREATE TABLE IF NOT EXISTS user_profiles(
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    first_name BYTEA, --encypted
    last_name BYTEA, --encypted
    sex TEXT,
    age INT DEFAULT 0,
    height NUMERIC DEFAULT 0,
    neck_circumference NUMERIC DEFAULT 0,
    waist_circumference NUMERIC DEFAULT 0,
    hip_circumference NUMERIC DEFAULT 0,
    body_fat_percentage NUMERIC DEFAULT 0,
    current_weight NUMERIC DEFAULT 0,
    current_calories_target NUMERIC DEFAULT 0,
    user_wellness_score NUMERIC  DEFAULT 0,
    current_walking_minutes NUMERIC DEFAULT 0,
    current_pushups NUMERIC DEFAULT 0,
    current_BMI NUMERIC DEFAULT 0,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);