CREATE TABLE IF NOT EXISTS user_profiles(
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    first_name BYTEA, --encypted
    last_name BYTEA, --encypted
    sex TEXT,
    age INT,
    height NUMERIC,
    neck_circumference NUMERIC,
    waist_circumference NUMERIC,
    hip_circumference NUMERIC,
    body_fat_percentage NUMERIC,
    current_weight NUMERIC,
    current_calories_target NUMERIC,
    current_BMI NUMERIC,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);